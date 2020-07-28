baseURL = "http://localhost:3000";
recipeURL = `${baseURL}/recipes`;

const searchParams = new URLSearchParams(window.location.search);
const searchName = searchParams.get('name');

if (searchName) {
    recipeURL = `${recipeURL}?name=${searchName}`;
}

const $section3 = document.querySelector('.section-3');


fetch(recipeURL)
    .then(parseJSON)
    .then(displayRecipes);
  

function parseJSON(response) {
  return response.json();
}

function displayRecipes(recipes) {
  recipes
    .map(recipeToElement)
    .forEach(showRecipes);
}

    
function recipeToElement(recipe) {
  const $h3 = document.createElement('h3');
  $h3.innerHTML  = `<a href ='show.html?id=${recipe.id}'>${recipe.name}</a>`;

  const $r_image = document.createElement('img');
  $r_image.src = recipe.image;
  $r_image.onclick = function() {
    window.location.href = `show.html?id=${recipe.id}'>${recipe.name}`;
};
  // Find way to make image link to show page
  

  
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
