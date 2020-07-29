const searchParams = new URLSearchParams(window.location.search);
const user_id = searchParams.get('user_id');

const $header = document.querySelector('header');
const $main = document.querySelector('main');
$main.className = "user_page";

const baseURL = "http://localhost:3000";
const userURL = `${baseURL}/users/${user_id}`;

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
    displayList(user.recipes, true);
  }
  displaySectionHeader('Shopping List', user);
  if (user.shopping_list.ingredients) {
    displayList(user.shopping_list.ingredients, false);
  }

}

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

function displayList(list, links) {
  const $ul = document.createElement('ul');
  $ul.className = `item_list_${links}`;

  const $list = list.map(list_item => {
    const $li = document.createElement('li');
    $li.className = `item_list_${links}`;
    
    if (links) {
      $li.innerHTML = `<a href ='show.html?recipe_id=${list_item.id}&user_id=${user_id}'>${list_item.name}</a>`;

      list_item.ingredients.forEach(ingredient => {
        const $p = document.createElement('p');
        $p.className = 'ingredient_list';
        $p.innerText = ingredient;
        $li.append($p);
  
        const $button = document.createElement('button');
        $button.className = 'button';
        $button.id = 'button';
        $button.innerText = '+';
        $p.append($button);
  
        $button.onclick = function(){

          const data = { shopping_list: ingredient };

          fetch(userURL, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then(parseJSON)
            .then(user => {
              const $newIngredient = document.createElement('li');
              const ingredients = user.shopping_list.ingredients;
              const $ingredientList = document.querySelector('.item_list_false');

              $newIngredient.textContent = ingredients[ingredients.length -1];

              $ingredientList.append($newIngredient);

            });

        };
      });   

    } else {
      $li.innerText = list_item;

    }

  
    return $li;

  });

  $main.append($ul);
  $list.forEach($list => {
    $ul.append($list);
  });

}


