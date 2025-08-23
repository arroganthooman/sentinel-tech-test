# Javascript/Typescript Questions

## Level 1
Make a javascript or typescript function that converts any string to Title Case.

Or

Create a function that counts the word frequency in this string "Four One two two three Three three four  four   four".  Case insensitive, ignore punctuation.

**Answer:**

**Title Case:**
```typescript
const titleCase = (str: String) => {
   const splitted = str.split(" ")
   const result = splitted.map((item, idx) => {
       const firstLetter = item.slice(0, 1).toUpperCase();
       const restLetter = item.slice(1).toLowerCase();


       return firstLetter + restLetter;
   })


   return result.join(" ");
}


console.log(titleCase("I'm a little tea pot"))
console.log(titleCase("sHoRt AnD sToUt"))
```

**Word Count:**
```typescript
const removePunctuation = (str: string): string => {
   return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
}


const countWord = (str: string): void => {
   const wordDictionary: Record<string, number> = {};
   const words: string[] = str.split(" ");


   words.forEach((val, idx) => {
       const value = removePunctuation(val).trim().toLowerCase()
       if (value) {
           if (!wordDictionary[value]) {
               wordDictionary[value] = 0
           }
           wordDictionary[value] += 1
       }
   })


   for (const [key, value] of Object.entries(wordDictionary)) {
       console.log(key, "=>", value);
   }
}


countWord("Four One two two three Three three four  four   four")

```

<br>
<hr>

## Level 2
Fix this code, using promises:
```javascript
function delay(ms) {
  // add promise code here
}

delay(3000).then(() => alert('runs after 3 seconds'));
```

**Answer:**
```typescript
function delay(ms: number): Promise<void> {
 return new Promise((resolve) => setTimeout(resolve, ms))
}


delay(3000).then(() => alert('runs after 3 seconds'));
```
<br><hr>

## Level 2.5: Rewrite using Async/Await:
```js
function fetchData(url, callback) {
  setTimeout(() => {
    if (!url) {
      callback("URL is required", null);
    } else {
      callback(null, `Data from ${url}`);
    }
  }, 1000);
}


function processData(data, callback) {
  setTimeout(() => {
    if (!data) {
      callback("Data is required", null);
    } else {
      callback(null, data.toUpperCase());
    }
  }, 1000);
}


// Using callbacks
fetchData("https://example.com", (err, data) => {
  if (err) {
    console.error("Fetch Error:", err);
  } else {
    processData(data, (err, processedData) => {
      if (err) {
        console.error("Process Error:", err);
      } else {
        console.log("Processed Data:", processedData);
      }
    });
  }
});

```

**Answer:**
```ts
const fetchData = async (url: string): Promise<string> => {
 return new Promise((resolve, reject) => {
   setTimeout(() => {
     if (!url) {
       reject("URL is required");
     } else {
       resolve(`Data from ${url}`);
     }
   }, 1000);
 });
};


const processData = async (data: string): Promise<string> => {
 return new Promise((resolve, reject) => {
   setTimeout(() => {
     if (!data) {
       reject("Data is required");
     } else {
       resolve(data.toUpperCase());
     }
   }, 1000);
 });
};


const runSuccess = async () => {
 try {
   const data = await fetchData("https://example.com");
   const processedData = await processData(data);
   console.log("processedData", processedData);
 } catch (err) {
   console.error("Error when fetching and processing data", err);
 }
};


const runError1 = async () => {
 try {
   const data = await fetchData("");
   const processedData = await processData(data);
   console.log("processedData", processedData);
 } catch (err) {
   console.error("Error when fetching and processing data", err);
 }
};


const runError2 = async () => {
 try {
   const processedData = await processData("");
   console.log("processedData", processedData);
 } catch (err) {
   console.error("Error when processing data", err);
 }
};


runSuccess();
runError1();
runError2();
```


## Level 3-4
Create a real-time chat between two windows; using web sockets, vuejs and typescript.

Bonus if you add some nice, simple animations.
If you have no experience with web sockets, just make two chat windows side-by-side in the different browser window.  Show messages being sent between the two chat screens.  As new messages come in, old messages slide upwards to make room for new messages.
If you’d like to be considered for a senior role or lead role, please deploy to AWS and send me a link to your working application.

**Answer:**

You can refer to the chat-app folder in this repository. The app is built by Vue.js, express.js with socket.io, and redis for the chat storage.
The app is also deployed to AWS EC2 which can be accessed in the following [link](http://3.107.105.124/) or here http://3.107.105.124/. I don't setup HTTPS for the demo link as currently I don't have active domain. You can also see the demo video [here](https://www.youtube.com/watch?v=fZq_C2b6O3g). Sorry for building just a very simple chat app with nothing fancy.

How to use:
1. Enter your name
2. Enter room number that you're going to. Enter the same room number that you will be chatting with your friends.
3. It supports multiple person chat (like group chat)

