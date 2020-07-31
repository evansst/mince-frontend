# Mince. 


## Table of Contents
* [About](#about-mince)
* [Video](#mince-walkthrough-video)
* [Techonologies](#technologies)
* [Setup](#setup)
* [Code Examples](#code-examples)
* [Features](#mince-features)
* [Status](#status)
* [Why mince](#why-mince)
* [Contact](#contact)
* [License](#license)

## About Mince
Mince is a full-stack web application that pulls from over 5,000 existing recipes through the utilization of RESTful APIs. Users can type in a certain type of dish they are looking for such as "chicken" and be taken to all the chicken recipes available. If logged in, the user can also create a list of their favorite recipes and shopping list! When they are ready to make the meal, users have the option of viewing the entire recipe guide for step-by-step guidance.


## Mince Walkthrough Video
<!-- [Mince Walkthrough](https://youtu.be/eMHFxcF2l08) -->

## Technologies
Ruby - version 2.6.1
PostgreSQL - version 12.3
HTML5 / CSS3

## Setup
To run this project, install it locally by cloning the GitHub repository and type:
```
  

```
## Code Examples

```
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
```
```
    function displayHomeLink() {
    const $a = document.createElement('a');
    $a.href = `index.html?user_id=${user_id}`;
    $a.textContent = 'Go to Homepage';

    const $ul = document.querySelector('ul.nav-bar');
    $ul.append($a); 
    }
```
## Mince Features
* Display sample of recipes from 5,000
* Filter through recipes through the search bar
* Go to full recipe page for step by step instruction on how to make the dish
* If logged-in, create a list of favorite recipes
* If logged-in, add items to user's shopping list based on recipe ingredients


To-Do List:
* Increase data size to provide up to 10k+ recipes
* Add 'viewed' tag to allow the user to know which recipes have already been viewed

## Status
Completed.

This app is built to carry out the CRUD framework

## Why Mince?
We created this app based on our own affinity for cooking and finding new recipes to use. We wanted this app to be personalized and flexible and uncomplicated for some apps on the market tend to look busy and not as easy to use.

## Contact
Created by [Sam Evans](https://www.linkedin.com/in/evansst/) and [Nyaradzo Bere](http://www.linkedin.com/in/nyaradzo-bere)

## License
[View Here](License.txt)