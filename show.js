const searchParams = new URLSearchParams(window.location.search); 
const recipe_id = searchParams.get('recipe_id');
let user_id = searchParams.get('user_id');

if (user_id == 'null') { user_id = null; }

const baseURL = "http://localhost:3000";
const recipeURL = `${baseURL}/recipes/${recipe_id}`;
const userURL = `${baseURL}/users/${user_id}`;
const recipe_cardURL = `${baseURL}/recipe_cards`;

const $header = document.querySelector('header');
const $main = document.querySelector('main');


fetch(recipeURL)
    .then(parseJSON)
    .then(displayPage);


function parseJSON(response) {
  return response.json();
}


function displayPage(recipe) {
  if (user_id) { displayProfileLink(); }
  displayHomeLink();
  displayHeader(recipe);
  displayImage(recipe);
  displayRecipeURL(recipe);
  if (user_id) { displayFavoriteButton(recipe); }
  displayIngredientList(recipe);
    
}

// Display Functions


function displayProfileLink() {
  const $a = document.createElement('a');
  $a.href = `user.html?user_id=${user_id}`;
  $a.textContent = 'Go to Profile';

  const $ul = document.querySelector('ul.nav-bar');

  if (user_id) {
    $ul.append($a);
  }
}

function displayHomeLink() {
  const $a = document.createElement('a');
  $a.href = `index.html?user_id=${user_id}`;
  $a.textContent = 'Go to Homepage';

  const $ul = document.querySelector('ul.nav-bar');
  $ul.append($a); 
}

function displayHeader(recipe) {
  const $h1 = document.createElement('h1');
  $h1.innerText = recipe.name;

  $main.append($h1);

  return recipe;
}

function displayImage(recipe) {
  const $r_image = document.createElement('img');
  $r_image.src = recipe.image;

  $main.append($r_image);

  return recipe;
}

function displayRecipeURL(recipe) {
  const $p = document.createElement('p');
  $p.innerHTML = `<a class='recipe_url' href ='${recipe.url}' target="_blank">Go To Full Recipe</a>`;

  $main.append($p);

  return recipe;
}

function displayIngredientList(recipe) {
  const $ul = document.createElement('ul');
  $ul.className = 'ingredient_list';
  
  const $ingredients = recipe.ingredients.map(ingredientToElement);

  if (user_id) { $ingredients.forEach(addIngredientButton); }
  
  $ingredients.forEach($ingredient => {
    $ul.append($ingredient);
  });
  
  $main.append($ul);
  return recipe;
}

function ingredientToElement(ingredient) {
  const $li = document.createElement('li');
  $li.className = 'ingredient_list';
  $li.textContent = ingredient;
  
  return $li;
}
  
function addIngredientButton($ingredient) {
  const $button = document.createElement('button');
  
  $button.className = 'button';
  $button.id = 'button';
  $button.innerText = '+';
  
  addIngredientEvent($button, $ingredient.textContent);
  
  $ingredient.append($button); 
}
  
function addIngredientEvent($button, ingredient) {
  $button.onclick = function(){
    const data = { shopping_list: ingredient };

    fetch(userURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };
}

function displayFavoriteButton(recipe) {
  const $button = createFavoritebutton(recipe);
  
  $main.append($button);
}

function createFavoritebutton(recipe) {
  const $button = document.createElement('button');
  
  $button.className = 'button';
  $button.id = 'favorite_button';
  $button.innerText = 'Add to Favorites';
  
  return addFavoriteEvent($button, recipe);
}

function addFavoriteEvent($button, recipe) {
  $button.onclick = function () {
    const data = {
      user_id: parseInt(user_id),
      recipe_id: recipe.id
    };
    
    fetch(recipe_cardURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
  };
  return $button;
}



