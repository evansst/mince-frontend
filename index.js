
const searchParams = new URLSearchParams(window.location.search);
const searchName = searchParams.get('name');
const user_id = searchParams.get('user_id');

const baseURL = "http://localhost:3000";
let recipeURL = `${baseURL}/recipes`;


if (searchName) {
  recipeURL = `${recipeURL}?name=${searchName}`;
} else {
  recipeURL = `${recipeURL}?sample=9`;
}

const $section3 = document.querySelector('.section-3');


fetch(recipeURL)
    .then(parseJSON)
    .then(displayPage)
    .then(console.log);
  

function parseJSON(response) {
  return response.json();
}

function displayPage(recipes) {
  recipes
    .map(recipeToElement)
    .forEach(showRecipes);
  
  if (searchName) {
    document.getElementById('ingredients_input').placeholder = searchName;
  }
  return recipes;
}

    
function recipeToElement(recipe) {
  const $h3 = document.createElement('h3');
  $h3.innerHTML  = `<a href ='show.html?recipe_id=${recipe.id}&user_id=${user_id}'>${recipe.name}</a>`;

  const $r_image = document.createElement('img');
  $r_image.src = recipe.image;
  $r_image.onclick = function() {
    window.location.href = `show.html?recipe_id=${recipe.id}&user_id=${user_id}`;
  };

  return createRecipeCard($h3, $r_image);
}

function createRecipeCard($h3, $r_image) {
  const $recipeCard = document.createElement('div');
  
  $recipeCard.className = 'cards';
  $recipeCard.append($h3, $r_image);

  return $recipeCard;
}

function showRecipes($recipeCard) {
  $section3.append($recipeCard);
}

window.scroll({
  top: 100,
  left: 100,
  behavior: 'smooth'
});
