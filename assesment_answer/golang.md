# Golang

Create a function that counts the word frequency in this string "Four, One two two three Three three four  four   four".  Case insensitive, ignore punctuation.

Expected Answer (order doesn’t matter):

one => 1\
two => 2\
three => 3\
four => 4

<br>

**Answer:**

```go
package main


import (
   "fmt"
   "regexp"
   "strings"
)


func removePunctuation(str string) string {
   reg, err := regexp.Compile("[^a-zA-Z0-9]+")
   if err != nil {
       fmt.Println("Error compiling regex:", err)
       return str
   }


   result := reg.ReplaceAllString(str, "")


   return result
}


func countWord(str string) {
   word_map := make(map[string]int)


   var splitted_string []string = strings.Split(str, " ")
   for _, elem := range splitted_string {
       word := strings.Trim(elem, " ")
       word = strings.ToLower(word)
       word = removePunctuation(word)


       if word != "" {
           _, ok := word_map[word]
           if !ok {
               word_map[word] = 0
           }


           word_map[word] += 1
       }
   }


   for k, v := range word_map {
       fmt.Println(fmt.Sprintf("%s => %d", k, v))
   }
}


func main() {
   countWord("Four, One two two three Three three four  four   four")
}

```