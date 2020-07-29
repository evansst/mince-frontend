const body = document.body
const baseURL = 'http://localhost:3000'
let listURL = `${baseURL}/checklists`


fetch(listURL)
    .then(response => response.json())
    .then(showList)


function showList(list) {
    const $li = document.createElement('li')
    $li.innerText = list.name
    body.appendChild($li)
    }
