import { jeopardy } from "./jeopardy.js"
let thead = document.querySelector("thead");
let tbody = document.querySelector("tbody");
const numberOfColumns = 6;
const numberOfRows = 5;

function game (){
  thead.innerHTML=""
  tbody.innerHTML=""
let categories = Object.keys(jeopardy)
let randomCategory = [];
let rows = [];
while (randomCategory.length < numberOfColumns) {
  let randomIndex = Math.floor(Math.random() * categories.length);
  let category = categories[randomIndex];
  if (!randomCategory.includes(category)) {
    randomCategory.push(category);
  }
}
let headRow = document.createElement("tr");
// we need to add 5 questions
for (let i = 0; i < numberOfRows; i++) {
  rows.push([]);
}
console.log(randomCategory);
for (let i = 0; i < randomCategory.length; i++) {
  let th = document.createElement("th");
  let category = randomCategory[i];
  th.innerText = category;
  headRow.append(th);
  /*let url = `http://cluebase.lukelav.in/clues/random?limit=${numberOfRows}&category=${category.toLowerCase()}`;
  let response = await fetch(url,{
    method:"GET",
    mode:"no-cors",
    headers:{
        Accept:"application/json",
        'Access-Control-Allow-Origin': 'http://localhost:5500'
    }
  })
  console.log (response)
  let result= await response.json()*/
  let result = jeopardy[category].slice(0, 5)
  result.forEach((element, index) => {
    rows[index][i] = element;
  });
}
console.log(rows)
thead.append(headRow);
rows.forEach(row => {
  let tr = document.createElement("tr")
  row.forEach(item => {
    let td = document.createElement("td")
    td.append(renderItem(item))
    tr.append(td)
  })
  tbody.append(tr)
})
function renderItem(item) {
  let div = document.createElement("div")
  let h1 = document.createElement("h1")
  let question = document.createElement("div")
  question.innerText = item.clue
  let answer = document.createElement("div")
  answer.innerText = item.response
  h1.innerText = "?"
  h1.onclick = function () {
    div.replaceChild(question, h1)
  }
  question.onclick = function () {
    div.replaceChild(answer, question)
  }
  div.append(h1)
  return div
}
}
game()
let button=document.querySelector("button")
button.onclick=game  