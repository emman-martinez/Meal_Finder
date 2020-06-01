import './../css/componentes.css';  

const search         = document.getElementById('search');
const submit         = document.getElementById('submit');
const random         = document.getElementById('random');
const resultHeading  = document.getElementById('result-heading');
const mealsEl        = document.getElementById('meals');
const single_mealEl  = document.getElementById('single-meal');
const url            = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlId          = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const urlRandom      = 'https://www.themealdb.com/api/json/v1/1/random.php';
/* ****************************** COLOR ICON ****************************** */
const colorIcon = () => {
    const icon = document.getElementsByClassName('fa-search'); // Color de Icono
    icon[0].classList.add("green"); 
};
/* ****************************** SEARCH MEAL ****************************** */
const searchMeal = async(e) => {
    e.preventDefault();
    
    single_mealEl.innerHTML = ''; // Clear single meal
    
    const term = search.value; // Get search term
    
    // Check for empty
    if(term.trim()) {

        try {

            const resp = await fetch(`${url}${term}`);
            if(!resp.ok) throw 'No se pudo realizar la petición'; 
            const data = await resp.json();
            const { meals } = data;
            // console.log(meals);
            resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
            
            if(meals === null) {
                resultHeading.innerHTML = `<p>There are no search results for '${term}', Try again!</p>`;
            } else {
                mealsEl.innerHTML = meals.map((meal) => {
                    return `<div class="meal">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                                <div class="meal-info" data-mealID="${meal.idMeal}">
                                    <h3>${meal.strMeal}</h3>
                                </div>
                            </div>`;
                }).join('');
            }
            
            search.value = ''; // Clear search text

        } catch(err) {

            throw err

        }

    } else {

        alert('Please enter a search term');

    }

};
/* ****************************** FETCH MEAL BY ID ****************************** */
const getMealById = async (mealID) => {

    try {

        const resp = await fetch(`${urlId}${mealID}`);
        if(!resp.ok) throw 'No se pudo realizar la petición'; 
        const data = await resp.json();
        const { meals } = data;
        const meal = meals[0];

        addMealToDOM(meal);

    } catch(err) {

        throw err;

    }
};
/* ****************************** FETCH RANDOM MEAL FROM API ****************************** */
const getRandomMeal = async () => {
    // Clear meals and heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    try {

        const resp = await fetch(urlRandom);
        if(!resp.ok) throw 'No se pudo realizar la petición Meal Random'; 
        const data = await resp.json();
        const { meals } = data;
        const meal = meals[0];

        addMealToDOM(meal);

    } catch(err) {

        throw err;

    }

};
/* ****************************** ADD MEAL TO DOM ****************************** */
const addMealToDOM = (meal) => {

    const ingredients = [];

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    single_mealEl.innerHTML = `
        <div id="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map((ingredient) => {
                        return `<li>${ingredient}</li>`;
                    }).join('')}
                </ul>
            </div>
        </div>
    `;

    // console.log(ingredients);

};
/* ************************************************************ */
const eventos = () => {
    // console.log('Event Listeners');
    submit.addEventListener('click', colorIcon);
    submit.addEventListener('submit', searchMeal);
    random.addEventListener('click', getRandomMeal);
    mealsEl.addEventListener('click', (e) => {
        const mealInfo = e.path.find((item) => {
            if(item.classList) {
                return item.classList.contains('meal-info');  
            } else {
                return false;
            }
        }); 
        // console.log(mealInfo);
        if(mealInfo) {
            const mealID = mealInfo.getAttribute('data-mealid');
            getMealById(mealID);
        }
    });
};
/* ************************************************************ */
const init = () => {
    console.log('Meal Finder');
    eventos();
};
/* ************************************************************ */
export {
    init
} 