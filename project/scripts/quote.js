function getJSON(url) {
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getQuote(url) {
    return getJSON(url);
}

function showQuote(url = "https://type.fit/api/quotes") {
    getQuote(url).then(function (data) {
        console.log(data);
        let totalQuotes = data.length;
        let QuoteNo = Math.floor(Math.random() * totalQuotes);
        //const results = data.results[newQuote];
        console.log(data[QuoteNo]);
        console.log(totalQuotes);
        let quote = data[QuoteNo];

        console.log(quote.text);
        console.log(quote.author);

        let quoteHtml = document.getElementById("quote");
        let authorHtml = document.getElementById("author");
        quoteHtml.innerText = quote.text;
        authorHtml.innerText = "- " + quote.author;


    });
}

function store() {
    let journalEntry;
    let jQuote = document.getElementById("quote").innerText;
    let jAuthor = document.getElementById("author").innerText;
    let jJournal = document.getElementById("journal").value;
    console.log(jJournal);

    let dDate = new Date();
    let year = dDate.getFullYear().toString();
    let month = dDate.getMonth().toString();
    let actualMonth = (dDate.getMonth() + 1).toString();
    let day = (dDate.getDate()).toString();
    let readDate = actualMonth + "/" + day + "/" + year;
    let jDate = year + month + day;
    console.log(jDate);

    journalEntry = {quote: jQuote, author: jAuthor, journal: jJournal, date: jDate};
    window.localStorage.setItem(jDate, JSON.stringify(journalEntry));

    let dates = []
    dates = JSON.parse(localStorage.getItem("dates"));

    if(dates === null){
        let nDate = [];
        nDate[0] = readDate;
        window.localStorage.setItem("dates", JSON.stringify(nDate));
    }
    else {
        let duplicate = false;
        for(let i = 0; i < dates.length; i++){
            if(dates[i] === readDate)
                duplicate = true;
        }
        if(duplicate)
            return
        let newDate = dates.length;
        dates[newDate] = readDate;
        window.localStorage.setItem("dates", JSON.stringify(dates));
    }

}

function loadQuote(jDate) {
    var retrievedEntry = localStorage.getItem(jDate);
    console.log('retrievedObject: ', JSON.parse(retrievedEntry));

    let journalEntry = JSON.parse(retrievedEntry);


    if(journalEntry === null){
        showQuote();
    }
    else {
        let storedQuote = journalEntry.quote;
        let storedAuthor = journalEntry.author;
        let storedJournal = journalEntry.journal;
        let quoteHtml = document.getElementById("quote");
        let authorHtml = document.getElementById("author");
        let journalHtml = document.getElementById("journal");
        quoteHtml.innerText = storedQuote;
        authorHtml.innerText = storedAuthor;
        journalHtml.innerText = storedJournal;
    }
}

function loadEntries() {
    var retrievedEntry = localStorage.getItem("dates");
    let dates = JSON.parse(retrievedEntry);
    let dateList = document.getElementById("listEntries");
    let listEntries = "";

    for(let i =0; i < dates.length; i++) {
        let dDate = dates[i].split("/");
        let year = dDate[2];
        let month = dDate[0] - 1;
        let day = dDate[1];
        let jDate = year + month + day;
        //let todayDate = month + "/" + day + "/" + year;

        listEntries += "<li style='cursor: pointer' onclick='loadQuote(" + jDate + ")'>" + dates[i] + "</li> \n\r";
    }
    dateList.innerHTML = listEntries;
}

let dDate = new Date();
let year = dDate.getFullYear().toString();
let month = dDate.getMonth().toString();
let day = dDate.getDate().toString();
let todayDate = year + month + day;
console.log(todayDate);
loadQuote(todayDate);
loadEntries();

