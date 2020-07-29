const searchParams = new URLSearchParams(window.location.search); 
const recipe_id = searchParams.get('recipe_id');
const user_id = searchParams.get('user_id');

const $main = document.querySelector('main');

fetch(`http://localhost:3000/recipes/${recipe_id}`)
    .then(response => response.json())
    .then(showPage);


function showPage(recipe) {
  displayHeader(recipe);
  displayImage(recipe);
  displayRecipeURL(recipe);
  displayIngredientList(recipe);
    
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
  $p.innerHTML = `<a class='recipe_url' href ='${recipe.url}'>Go To Full Recipe</a>`;

  $main.append($p);

  return recipe;
}

function displayIngredientList(recipe) {
  const $ul = document.createElement('ul');
  $ul.className = 'ingredient_list';
  
  const $ingredients = recipe.ingredients.map(ingredient => {
    const $li = document.createElement('li');
    $li.className = 'ingredient_list';
    $li.innerHTML = ingredient;
    $ul.append($li);

    const $button = document.createElement('button');
    $button.className = 'button';
    $button.id = 'button';
    $button.innerText = '+';

    // Get button to change color when clicked
    // $button.onclick = function() {
    //     document.getElementById("button").style.backgroundColor = "red";
    //   };

    $li.append($button);

    $button.onclick = function(){
        list = [];
        list.push($li.innerText);
        const $h5 = document.createElement('h5');
        $h5.innerText  = list;
        $main.append($h5);
    };
    return $li;
  });    

  $main.append($ul);
  $ingredients.forEach($ingredient => {
    $ul.append($ingredient);
  });

  return recipe;
}



