# Website Performance Best Practices

**Question:**

Tell me all the performance best practices you can think of - start with the most important ones first.


**Answer:**

1. **Use Efficient Resource Loading**  
   - Lazy-load images, videos, and offscreen content.  
   - Preload critical resources and defer non-critical scripts.
   - Serve static assets via a CDN for faster delivery.  
   - Use optimized image formats (WebP/AVIF). 

2. **Caching & CDN**  
   - Enable caching by browser caching or backend caching
   - Serve static assets via a CDN for faster delivery.  

3. **Compress & Optimize Assets**  
   - Minify CSS, JS, and HTML.  
   - Enable Gzip/Brotli compression and use optimized image formats (WebP/AVIF). 

4. **Efficient Database & API Usage**
   - Index queries properly.
   - Avoid over-fetching (can utilize GraphQL).
   - Batch requests where possible.
   - Know when to normalize or denormalize database table