const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')

fetch(`http://localhost:3000/recipes/${id}`)
    .then(response => response.json())
    .then(recipe => {
        const h1 = document.createElement('h1')
        h1.innerText = recipe.name
        document.body.appendChild(h1)
    })
