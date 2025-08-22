# Website Performance Best Practices

// TODO
**Question:**

Tell me all the performance best practices you can think of - start with the most important ones first.


**Answer:**

1. **Optimize Critical Rendering Path**  
   - Minimize render-blocking CSS/JS.  
   - Inline critical CSS and defer non-essential scripts.  

2. **Minimize HTTP Requests**  
   - Combine CSS/JS files and reduce the number of fonts and third-party scripts.  
   - Use CSS sprites or inline SVGs for small icons.  

3. **Use Efficient Resource Loading**  
   - Lazy-load images, videos, and offscreen content.  
   - Preload critical resources and defer non-critical scripts.  

4. **Caching & CDN**  
   - Enable browser caching with `Cache-Control` and `ETag`.  
   - Serve static assets via a CDN for faster delivery.  

5. **Compress & Optimize Assets**  
   - Minify CSS, JS, and HTML.  
   - Enable Gzip/Brotli compression and use optimized image formats (WebP/AVIF). 
