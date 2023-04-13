let wordToSearch = document.getElementById("textbox");
let submitBtn = document.getElementById("submit");
let responseDisplay = document.getElementById("response-display")
let url = "https://api.datamuse.com/words?ml=";
const MaxParameter = 10;


let renderPage = (data) => {
    if(data.length === 0){
        responseDisplay.innerHTML = "<p id='no-response'>Try Again! There were no suggestions found!<p>";
        return;
    }
    
    let synonyms = new Array();
    data.forEach(x => synonyms.push(x.word));
    console.log(synonyms);
    let content = "";

    for(var i = 0; i < MaxParameter; i++){
        content += `<li>${synonyms[i]}</li>`;
    }

    responseDisplay.innerHTML = `<p id='response'>You might be interested in:</p> <ol>${content}</ol>`;


}

async function getSuggestions(event){
    event.preventDefault();
    let wordQuery = wordToSearch.value;
    let endpoint = `${url}${wordQuery}&max=${MaxParameter}`;

     await fetch(endpoint, {cache: 'no-cache'})
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error("Request failed!");
        })
        .then(data => renderPage(data))
        .catch(error => console.log(error));
}

submitBtn.addEventListener("click", getSuggestions);