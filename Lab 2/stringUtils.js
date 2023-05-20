/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let palindromes = (string) => {

      if(!string){
            throw new Error("Array doesnt exist")
      }

      if(!Array.isArray(string)){
            throw new Error ("Must be an array")
      }

      if(string.length===0){
            throw new Error("given array is empty")
      }

      let myObj = {}

      for(let element of string){
            if(typeof(element) !== 'string'|| element.trim().length === 0){
                  throw new Error ("each array element must be a string")
            }
            if(!element.match(/^[a-zA-Z0-9]+/)){
                  throw new Error ("must contain atleast one alphanumeric character")
            }
            if(!element){
                  throw new Error("String element must exist")
            }

            // used the replace function below from stackoverflow https://stackoverflow.com/questions/9364400/remove-not-alphanumeric-characters-from-string
            let newString = element.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

            let isPalindrome = false;
            if(newString === newString.split('').reverse().join('')){
                  isPalindrome = true;
            }

            myObj[newString] = isPalindrome;

      }

      return myObj;

};

export let censorWords = (string, badWordsList) => {

      if(!string || string.trim().length === 0){
            throw new Error ("Input string must exist")
      }

      if(!badWordsList || !Array.isArray(badWordsList)){
            throw new Error ("badWordList exists and is an array")
      }

      if(badWordsList.length === 0){
            throw new Error ("badWordsList is empty")
      }

      for(let element of badWordsList)
      {
            if(typeof(element) !== 'string'){
                  throw new Error ("each element of the badwordList must be string")
            }

            if(!string.includes(element)){
                  throw new Error ("each bad word list element must exist in string")
            }
      }

      let newChars = ["!","@","$","#"]
      let c = 0;

      for (let i = 0; i < badWordsList.length; i++)
      {
            let badWord = badWordsList[i];

            let newWord = "";
            for(let j = 0; j< badWord.length; j++){
                  newWord = newWord + newChars[c %4]
                  c++;
            }

            string = string.replace(new RegExp(badWord),newWord);
      }

      return string;
      
};

export let distance = (string, word1, word2) => {

      if(!string){
            throw new Error("string doesnt exists")
      }
      if(!word1){
            throw new Error("word1 doesnt exist")
      }
      if(!word2){
            throw new Error("word2 doesnt exist")
      }

      if(typeof(string) !== 'string' || typeof(word1) !== 'string' || typeof(word2) !== 'string'){
            throw new Error ("type should be string")
      }

      if(string.trim().length=== 0 || word1.trim().length === 0 || word2.trim().length === 0){
            throw new Error ("should not be empty strings")
      }

      if(!string.match(/^[a-zA-Z0-9]+/) || !word1.match(/^[a-zA-Z0-9]+/) || !word2.match(/^[a-zA-Z0-9]+/)){
                  throw new Error ("must contain atleast one alphanumeric character")
            }

      if(string.split(" ").length < 2){
            throw new Error("should be larger than 2 words long")
      }

      if(word1.toLowerCase() === word2.toLowerCase()){
            throw new Error ("word1 and word2 should not be same")
      }

      if(!string.toLowerCase().includes(word1.toLowerCase()) || !string.toLowerCase().includes(word2.toLowerCase()))
      {
            throw new Error (" words must be in string")
      }

      let word1Index = string.toLowerCase().indexOf(word1.toLowerCase())
      let word2Index = string.toLowerCase().indexOf(word2.toLowerCase())
      if(word1Index > word2Index){
            throw new Error("word1 must appear before word2 in string")
      }

            string = string.toLowerCase();
            string = string.replace(',', '')
            word1 = word1.toLowerCase();
            word2 = word2.toLowerCase();
            let words = string.split(" ");
            
            let w1Index = [];
            let w2Index = []
            
            var w1I = -1;
            var w2I = -1;
            
            for(let i=0; i<words.length;i++)
            {
                  if(words[i] === word1)
                  {
                        w1Index.push(i);
                  }
                  if(words[i] === word2)
                  {
                        w2Index.push(i)
                  }
            }
    
            
            let minDistance = Infinity;
            for(let i = 0; i < w1Index.length; i++) {
                  for(let j = 0; j < w2Index.length; j++) {
                        if(w2Index[j] > w1Index[i]) {
                              minDistance = Math.min(minDistance, w2Index[j] - w1Index[i]);
                        }
                  }
            }
            
            return minDistance;
      }
