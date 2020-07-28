const searchParams = new URLSearchParams(window.location.search);
const user_id = searchParams.get('user_id');

const $main = document.querySelector('main');

baseURL = "http://localhost:3000";
userURL = `${baseURL}/users/${user_id}`;

fetch(userURL)
  .then(parseJSON)
  .then(console.log);

function parseJSON(response) {
  return response.json();
}

function displayPage(user) {
  displayHeader(user);
  displayUserInfo(user);
  displayRecipes(user.recipes);
}

function displayHeader(user) {
  const $h1 = document.createElement('h1');
  $h1.textContent = user.name;

  $main.append($h1);
}

function displayUserInfo(user) {

}

function displayRecipes(recipes) {
  const $section3 = document.createElement('section');
  $section3.className = 'section-3';
  

}

function recipeToElement(recipe) {
  const $h3 = document.createElement('h3');
  $h3.innerHTML  = `<a href ='show.html?id=${recipe.id}'>${recipe.name}</a>`;

  const $r_image = document.createElement('img');
  $r_image.src = recipe.image;
  $r_image.onclick = function() {
    window.location.href = `show.html?id=${recipe.id}'>${recipe.name}`;
  };
  
  return createRecipeCard($h3, $r_image);
}

function createRecipeCard($h3, $r_image) {
  const $recipeCard = document.createElement('div');
  
  $recipeCard.className = 'cards';
  $recipeCard.append($h3, $r_image);

  return $recipeCard;
}