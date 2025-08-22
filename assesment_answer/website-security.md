# Website Security Best Practises
**Question:**

Tell me all the security best practices you can think of - start with the most important ones first.


**Answer:**
1. **Authentication & Authorization**  
   - Enforce strong passwords and Multi-Factor Authentication (MFA).  
   - Apply minimal privilege to a system with RBAC (role-based access control)

2. **Data Protection**  
   - Encrypt sensitive data in transit (TLS/HTTPS) and at database level using AES-256.
   - Never store passwords in plain text — always hash with bcrypt/argon2.  

3. **Input Validation & Output Encoding**  
   - Sanitize all user input to prevent SQL Injection and XSS.  
   - Use parameterized queries and escape user content before rendering.  

4. **Session & Token Security**  
   - Use secure, HTTP-only, same-site cookies.  
   - Protect against CSRF with tokens or cookie policies.  

5. **Monitoring & Patch Management**  
   - Keep dependencies and systems updated to patch vulnerabilities.  
   - Enable logging and alerts for suspicious activity.

6. **API & Backend Security**
    - Implement **rate limiting** and throttling to mitigate brute-force or DDoS attacks.  
    - Require authentication (e.g., JWT, OAuth) for all API endpoints.  
    - Validate request payloads against a schema.  

7. **Secure Development Practice**
    - Implement automated dynamic security scan (DAST)
    - Attention to Top 10 OWASP Common Vuln when doing development.