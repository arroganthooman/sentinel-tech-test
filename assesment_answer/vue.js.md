# Vue js

Questions:
- Explain Vue.js reactivity and common issues when tracking changes.
- Describe data flow between components in a Vue.js app
- List the most common cause of memory leaks in Vue.js apps and how they can be solved.
- What have you used for state management
- What’s the difference between pre-rendering and server side rendering?

<br>
Answers:

### 1. Vue.js Reactivity and Common Issues
Vue’s reactivity system ensures that the view automatically updates when the underlying data changes.  
- In Vue 2, this is implemented with `Object.defineProperty` getters/setters.  
- In Vue 3, the system is built on ES6 Proxies, which provide more complete coverage.  

**Common issues faced:**  
- Adding new properties to an object in Vue 2 doesn’t make them reactive unless using `Vue.set`.  
- Assigning values directly to an array index is not reactive.  
- Deeply nested objects may require special handling to ensure changes are tracked.  

---

### 2. Data Flow Between Components
Vue uses a **unidirectional data flow** model:  
- **Parent → Child**: Passing data through props. 
- **Child → Parent**: Communication can be triggered via custom event (`$emit`).  
- **Siblings**: Coordinated through shared parents or global state managements.  
- For larger applications, centralized state management (e.g. Vuex) helps simplify complex data flows.  

---

### 3. Common Causes of Memory Leaks in Vue.js Apps and Solutions
**Typical causes include:**  
- Event listeners not cleaned.  
- Timers or intervals (`setTimeout`, `setInterval`) not cleared.  
- Retaining references to destroyed components or unused large data structures.  

**Solutions:**  
- Always clean up listeners and timers in lifecycle hooks such as `beforeUnmount` / `onUnmounted`.  
- Use Vue’s Composition API utilities (`watchEffect`, `onUnmounted`) which provide automatic cleanup patterns.  
- Keep global state lean and avoid unnecessary references.  

---

### 4. State Management Experience
I have used different approaches depending on the scale of the application:  
- **Vuex**: Suitable for large applications requiring a structured and centralized store.  
- **Local state**: For isolated or small-scale features where global state isn’t required.  

---

### 5. Difference Between Pre-rendering and Server-Side Rendering
- **Pre-rendering (Static Generation):**  
  - Pages are generated at build time into static HTML.  
  - Extremely fast and cache-friendly, but content is fixed until the site is rebuilt.  
  - Ideal for blogs, marketing pages, and documentation.  

- **Server-Side Rendering (SSR):**  
  - Pages are rendered dynamically on each request.  
  - Supports real-time data and personalization.  
  - Offers flexibility for interactive apps but has higher server overhead compared to static rendering.  
