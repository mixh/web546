   let form = document.getElementById("form");
   let textInput = document.getElementById("text_input");
   let errorDiv = document.getElementById("error");
   let resultsDiv = document.getElementById("results");


   // regex ex from the following website 
   //https://charactercounter.com/count-characters-in-javascript#:~:text=Count%20characters%20in%20JavaScript%20using%20length%20property&text=The%20most%20basic%20way%20is,and%20other%20non%2Dvisible%20characters.
   function countLetters(text) {
     let regex = /[a-z]/gi;
     let count = text.match(regex);
     if(count){
      return count.length
     } else {
      return 0;
     }
   }

   function countNonLetters(text) {
     let lettersCount = countLetters(text);
     return text.length - lettersCount;
   }

   function countVowels(text) {
     let regex = /[aeiou]/gi;
     let count = text.match(regex);
          if (count) {
            return count.length;
          } else {
            return 0;
          }
   }

   function countConsonants(text) {
     let lettersCount = countLetters(text);
     let vowelsCount = countVowels(text);
     return lettersCount - vowelsCount;
   }

function countWords(text) {
  let words = text.toLowerCase().match(/[a-z]+/g);
  if(words === null){
    return 0;
  }
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== "") {
      count++;
    }
  }
  return count;
}

function countUniqueWords(text) {
  let words = text.toLowerCase().match(/[a-z]+/g);
  if (words === null) {
    return 0;
  }
  let uniqueWords = [];
  for (let i = 0; i < words.length; i++) {
    if (!uniqueWords.includes(words[i])) {
      uniqueWords.push(words[i]);
    }
  }
  return uniqueWords.length;
}


   function countLongWords(text) {
     let words = text.toLowerCase().match(/[a-z]+/g);
     if (words === null) {
       return 0;
     }
     return words.filter((word) => word.length >= 6).length;
   }

   function countShortWords(text) {
     let words = text.toLowerCase().match(/[a-z]+/g);
     if (words === null) {
       return 0;
     }
     return words.filter((word) => word.length <= 3).length;
   }


   if (form) {
     form.addEventListener("submit", (event) => {
       event.preventDefault();

       let givenText = textInput.value.trim();

       if (givenText.length === 0) {
         errorDiv.innerHTML = "ERROR : NO INPUT";
         errorDiv.hidden = false;
         return;
       }

       let totalLetters = countLetters(givenText);
       let totalNonLetters = countNonLetters(givenText);
       let totalVowels = countVowels(givenText);
       let totalConsonants = countConsonants(givenText);
       let totalWords = countWords(givenText);
       let uniqueWords = countUniqueWords(givenText);
       let longWords = countLongWords(givenText);
       let shortWords = countShortWords(givenText);

       let dl = document.createElement("dl");
       dl.innerHTML = `
      <dt>Original Input:</dt>
      <dd>${givenText}</dd>
      <dt>Total Letters:</dt>
      <dd>${totalLetters}</dd>
      <dt>Total Non-Letters:</dt>
      <dd>${totalNonLetters}</dd>
      <dt>Total Vowels:</dt>
      <dd>${totalVowels}</dd>
      <dt>Total Consonants:</dt>
      <dd>${totalConsonants}</dd>
      <dt>Total Words:</dt>
      <dd>${totalWords}</dd>
      <dt>Unique Words:</dt>
      <dd>${uniqueWords}</dd>
      <dt>Long Words:</dt>
      <dd>${longWords}</dd>
      <dt>Short Words:</dt>
      <dd>${shortWords}</dd>
    `;

       resultsDiv.appendChild(dl);

       form.reset();
     });
   }
