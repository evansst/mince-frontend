const searchParams = new URLSearchParams(window.location.search);
let user_id = searchParams.get('user_id');

const $main = document.querySelector('main');
$main.className = "user_page"

baseURL = "http://localhost:3000";
userURL = `${baseURL}/users/${user_id}`;

fetch(userURL)
  .then(parseJSON)
  .then(displayPage);

function parseJSON(response) {
  return response.json();
}

function displayPage(user) {
  displayTitle(user);
  displayHeader(user);
  displaySectionHeader('Favorite Recipes', user);
  displayRecipeList(user.recipes);
  displaySectionHeader('Shopping List', user);
  // displayRecipeList(user.recipes);
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

function displayRecipeList(recipes) {
  const $ul = document.createElement('ul');
  $ul.className = 'recipe_list';
  
  const $recipes = recipes.map(recipe => {
    const $li = document.createElement('li');
    $li.className = 'recipe_list';
    $li.innerHTML = `<a href ='show.html?recipe_id=${recipe.id}&user_id=${user_id}'>${recipe.name}</a>`;
    
    recipe.ingredients.map(ingredient => {
      const $p = document.createElement('p')
      $p.className = 'ingredient_list';
      $p.innerText = ingredient
      $li.append($p);

      const $button = document.createElement('button');
      $button.className = 'button';
      $button.id = 'button';
      $button.innerText = '+';
      $p.append($button);

      $button.onclick = function(){
        list = [];
        list.push($p.innerText);
        const $h5 = document.createElement('h5');
        $h5.innerText  = list;
        $main.append($h5);
    };
    })
      
    
    return $li;

  });

  $main.append($ul);
  $recipes.forEach($recipe => {
    $ul.append($recipe);
  });

}


