// let $newIngredient
const searchParams = new URLSearchParams(window.location.search);
let user_id = searchParams.get('user_id');


if (user_id == 'null') { user_id = null; }

const baseURL = "http://localhost:3000";
const userURL = `${baseURL}/users/${user_id}`;

const $header = document.querySelector('header');
const $main = document.querySelector('main');
$main.className = "user_page";


fetch(userURL)
  .then(parseJSON)
  .then(displayPage);

function parseJSON(response) {
  return response.json();
}

function displayPage(user) {
  displayHomeLink();
  displayTitle(user);
  displayHeader(user);

  displaySectionHeader('Favorite Recipes', user);
  if (user.recipes) {
    displayFavoriteRecipes(user.recipes);
  }
  displaySectionHeader('Shopping List', user);
  if (user.shopping_list.ingredients) {
    displayShoppingList(user.shopping_list.ingredients);
  }

}

// Display Functions

function displayHomeLink() {
  const $a = document.createElement('a');
  $a.href = `index.html?user_id=${user_id}`;
  $a.textContent = 'Go to Homepage';

  const $ul = document.querySelector('ul.nav-bar');
  $ul.append($a); 
}

function displayTitle(user) {
  const $title = document.querySelector('title');
  $title.textContent = user.username;

  return user;
}

function displayHeader(user) {
  const $h1 = document.createElement('h1');
  $h1.textContent = user.name;

  $main.append($h1);

  return user;
}

function displaySectionHeader(headerString, user) {
  const $h2 = document.createElement('h2');
  $h2.className = 'favorites_header';
  $h2.textContent = `${headerString}:`;

  $main.append($h2);

  return user;
}

function displayFavoriteRecipes(recipes) {
  const $ul = document.createElement('ul');
  $ul.className = `favorite_recipes`;

  const $recipes = recipes.map(createFavoriteRecipe);

  $recipes.forEach($recipe => {
    $ul.append($recipe);
  });
  $main.append($ul);

  return $ul;
}

function displayShoppingList(ingredients) {
  const $ul = document.createElement('ul');
  $ul.className = `shopping_list`;

  const $ingredients = ingredients.map(ingredient => {
    const $li = document.createElement('li');
    $li.className = `shopping_list`;
    $li.innerText = ingredient;

    return $li;
  });

  $main.append($ul);
  $ingredients.forEach($ingredient => {
    $ul.append($ingredient);
  });  
}

function createFavoriteRecipe(recipe) {
  const $recipe = createRecipeElement(recipe);
  const $ingredientList = createIngredientListWithButtons(recipe);
  $ingredientList.forEach($ingredient => {
    $recipe.append($ingredient);
  });

  return $recipe;
}

function createRecipeElement(recipe) {
  const $li = document.createElement('li');
  $li.className = `favorite_recipes`;
  $li.innerHTML = `<a href ='show.html?recipe_id=${recipe.id}&user_id=${user_id}'>${recipe.name}</a>`;

  return $li;
}

function createIngredientListWithButtons(recipe) {
  const $ingredientList = createIngredientList(recipe.ingredients);
  $ingredientList.map(addIngredientButton);

  return $ingredientList;
}

function createIngredientList(ingredients) {
  const $ingredients = ingredients.map(ingredient => {
    const $p = document.createElement('p');
    $p.className = 'ingredient_list';
    $p.textContent = ingredient;

    return $p;
  });
  return $ingredients;
}

function addIngredientButton($ingredient) {
  const $button = document.createElement('button');

  $button.className = 'button';
  $button.id = 'button';
  $button.innerText = '+';
  
  createIngredientEvent($button, $ingredient.textContent);
  $ingredient.append($button);
  
  return $ingredient;
}


function addToShoppingList(user, ingredient) {
  const $newIngredient = document.createElement('li');
  const ingredients = user.shopping_list.ingredients;
  const $ingredientList = document.querySelector('.shopping_list');

  $newIngredient.textContent = ingredients[ingredients.length -1];
  $ingredientList.append($newIngredient);


  const $minusButton = document.createElement('button')
    
  $minusButton.innerText = '-'
  $newIngredient.append($minusButton);

  $minusButton.onclick = function() {
    const data = { shopping_list: ingredient, delete: true};

    fetch(userURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(parseJSON)
    // .then(console.log)
    .then(removeFromShoppingList);

    function removeFromShoppingList() {
      ingredients.pop;
      // $newIngredient.textContent = "";
      $ingredientList.removeChild($newIngredient)
    }
  }

}

function createIngredientEvent($button, ingredient) {
  $button.onclick = function(){
    $button.style.backgroundcolor = '#287f8f'
    const data = { shopping_list: ingredient};
    
    fetch(userURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(parseJSON)
      .then(addToShoppingList);
  };
  return $button;
}

function addIngredientButton($ingredient) {
  const $button = document.createElement('button');

  $button.className = 'button';
  $button.id = 'button';
  $button.innerText = '+';
  
  createIngredientEvent($button, $ingredient.textContent);
  $ingredient.append($button);

  
  return $ingredient;
}
