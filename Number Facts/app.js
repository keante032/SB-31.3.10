let favNumber = 32;
let baseURL = "http://numbersapi.com";

// Step 1
async function getNumTrivia(num) {
    let trivia = await $.getJSON(`${baseURL}/${num}/trivia?json`);
    console.log(trivia);
}

getNumTrivia(favNumber);

// Step 2
let threeNumbers = [3, 9, 27];
async function getThreeNumsTrivia(nums) {
    let trivias = await $.getJSON(`${baseURL}/${nums}/trivia?json`);
    for (let i in trivias) {
        $("body").append(`<p>${trivias[i]}</p>`);
    }
}

getThreeNumsTrivia(threeNumbers);

// Step 3
async function get4Trivias(num) {
    let trivias = await Promise.all([
        $.getJSON(`${baseURL}/${num}/trivia?json`),
        $.getJSON(`${baseURL}/${num}/trivia?json`),
        $.getJSON(`${baseURL}/${num}/trivia?json`),
        $.getJSON(`${baseURL}/${num}/trivia?json`)
    ]);
    trivias.forEach(data => $("body").append(`<p>${data.text}</p>`));
}

get4Trivias(favNumber);