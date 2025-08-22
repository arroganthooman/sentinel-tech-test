# Question
Imagine you're building a website that allows users to submit photos. One of the requirements is that each photo must be reviewed by a moderator before it can be published. How would you design the logic for this process? What technologies would you use? Do you have any data structure in mind to support this based on your technology of choice to handle those data?
<br><br>
# Answer
## 1. Main Flow

Mermaid code:
```mermaid
flowchart TD
    U([User Uploads Photo])
    API[Backend API (Upload Endpoint)]
    Storage[(Object Storage: S3/GCS/MinIO)]
    DB[(Database: Postgres/MySQL)]
    Q[[Queue (Redis/RabbitMQ/SQS)]]
    Worker[Worker Service]
    Mod[Moderator Dashboard]
    FE[Frontend Website]

    U --> API
    API -->|Save File| Storage
    API -->|Insert Record (status=PENDING)| DB
    API -->|Push Job| Q
    Q --> Worker
    Worker -->|Resize, AI Moderation, Metadata| DB
    Worker -->|Update Status: READY_FOR_REVIEW| DB
    Mod -->|Review Approve/Reject| DB
    DB -->|Approved Photos| FE
```

## 2. Key Components
* Frontend (React/Next.js/Vue)
    * Upload form → calls backend upload API.
    * Moderator dashboard → shows photos with status READY_FOR_REVIEW.

* Backend API (Express/FastAPI/Spring Boot)
    * /upload-photo endpoint:
        * Store file in Object Storage.
        * Insert record into DB with status = PENDING.
        * Push job to Queue.

* Queue (Redis/RabbitMQ/SQS/Minio)
    * Decouples user upload from heavy processing.
    * Each job:
        ```json
        {
          "photoId": 123,
          "fileUrl": "s3://bucket/photo123.jpg"
        }
        ```
* Worker
    * Consumes queue jobs.
    * Executes:
        * Resize (thumbnail, medium, large).
        * AI moderation (e.g., NSFW detection).
        * Extract metadata (format, resolution, size).
    * Updates DB → status = READY_FOR_REVIEW.

* Database (Postgres/MySQL)
    * Central state manager for photos.

* Moderator Dashboard
    * Queries status = READY_FOR_REVIEW.
    * Moderator approves or rejects.
    * Updates DB:
        `APPROVED` → visible on public website.
        `REJECTED` → hidden.

## 3. Table Schema
`photos` table
```sql
CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    file_url TEXT NOT NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN (
        'PENDING',
        'READY_FOR_REVIEW',
        'APPROVED',
        'REJECTED'
    )),
    metadata JSONB,
    role INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_photos_status ON photos(status);

```

`users` table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

`moderation_logs` table
```sql
CREATE TABLE moderation_logs (
    id SERIAL PRIMARY KEY,
    photo_id BIGINT NOT NULL REFERENCES photos(id),
    moderator_id BIGINT NOT NULL REFERENCES users(id),
    action VARCHAR(32) NOT NULL CHECK (action IN ('APPROVED', 'REJECTED')),
    reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

```

## 4. Status Lifecycle
1. `PENDING`
2. `READY_FOR_REVIEW`
3. `APPROVED`
4. `REJECTED`

## 5. Scalability Notes
1. Using Object Storage for files
2. Using queue to tackle high traffic upload activity. It can be replaced by direct processing if the system scale is small.
3. We can optionally introduce CDN