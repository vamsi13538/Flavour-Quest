// Spponacular API
const apiKey = 'adffe1ff5aa544f78587d0da68d7479b';
// Variables for searching recipe
const recipeInput = document.querySelector('#recipeInput');
const searchIcon = document.querySelector('#searchIcon');

// Border funcitonallity for selected links
function addBorder(e){
    // event.preventDefault();
    const navLinks = document.querySelectorAll('.navListItems a');
    navLinks.forEach((link) => {
        link.classList.remove('active');
    })

    // Adding border to clicked link
    e.target.classList.add('active');
}

const navLinks = document.querySelectorAll('.navListItems a');
navLinks.forEach((link) => {
    link.addEventListener('click', addBorder);
})

// Close button functionallity for clearing input values
const inputCloseButton = document.querySelector('#closeIcon');
recipeInput.addEventListener('input', ()=>{
    if(recipeInput.value === ''){
        console.log('Input Cleared');
        inputCloseButton.style.display = 'none';
    }else{
        inputCloseButton.style.display = 'block';
    }
})

inputCloseButton.addEventListener('click', ()=> {
    recipeInput.value = '';
    inputCloseButton.style.display = 'none';
})

// Food joke display on dom content loading 
document.addEventListener('DOMContentLoaded', ()=> {

   // Adding food joke url
   const randomFoodJoke = `https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`

   fetch(randomFoodJoke)
   .then(response => response.json())
   .then((data) => {
    const foodJokeRandom = document.querySelector('.foodJokeRandom');
    const maxWords = 80;
    const text = data.text.split(' ').slice(0, maxWords).join(' ') + '...';
    foodJokeRandom.innerHTML = `${text}`;
   })
   .then((err) => {
    console.log("Erorr Occured: "+err);
   })

})

// Event listener for search icon click
searchIcon.addEventListener('click', function(){
    // Getting input value
    const query = recipeInput.value;
    if(recipeInput.value === ''){
        alert('Please enter a valid recipe name!')
    }else{
        console.log(recipeInput.value);
        const number = 50;
        const instructionsRequired = true;
        const addRecipeInstructions = true;
        const addRecipeInformation = true;
        // Getting results based on search by recipe
        const searchByRecipe = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=${number}&instructionsRequired=${instructionsRequired}&addRecipeInstructions=${addRecipeInstructions}&addRecipeInformation=${addRecipeInformation}&includeNutrition=true&apiKey=${apiKey}`;
        // Fetching by recipe
        fetch(searchByRecipe)
            .then((res) => res.json())
            .then((data) => {
                // Initializing the variables for card section
                const recipeResultsContainer = document.querySelector('.recipeResults');

                recipeResultsContainer.innerHTML = '';

                // Loop through the array of recipes and create a card for each one
                data.results.forEach(recipe => {
                    console.log(recipe)
                    // Create a new div element for the card
                    const card = document.createElement('div');
                    card.classList.add('recipeResultsCard');

                    // Create the image container and flipcard effect
                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('recipeImageContainer');

                    // Create the flip card structure
                    const flipCard = document.createElement('div');
                    flipCard.className = 'flip-card';

                    const flipCardInner = document.createElement('div');
                    flipCardInner.className = 'flip-card-inner';

                    const flipCardFront = document.createElement('div');
                    flipCardFront.className = 'flip-card-front';

                    const flipCardBack = document.createElement('div');
                    flipCardBack.className = 'flip-card-back';

                    // Create image element inside flipcard
                    const image = document.createElement('img');
                    image.src = `${recipe.image}`;
                    image.alt = 'No_Img';
                    // Use a default image if no image is provided
                    const alternateIngredientImageUrl = 'https://static.vecteezy.com/system/resources/previews/015/739/752/original/chef-in-serving-special-food-image-graphic-icon-logo-design-abstract-concept-stock-can-be-used-as-a-symbol-related-to-cooking-or-character-vector.jpg'
                    image.onerror = function() {
                        this.onerror = null; 
                        this.src = alternateIngredientImageUrl;
                    };

                    // Create the back content
                    const backHeader = document.createElement('h3');
                    backHeader.innerHTML = 'More Info <i class="fa-solid fa-circle-info"></i>';

                    const ul = document.createElement('ul');

                    const liData = [
                        { class: 'flipLikes', content: `<i class="fa-regular fa-heart"></i> ${recipe.aggregateLikes * 1000 + 1000}` },
                        { class: 'flipDiets', content: `<b>Diets</b>: ${recipe.diets[0] || "Pescatarian"}` },
                        { class: 'flipVegan', content: `<b>Vegan</b>: ${recipe.vegan ? '<i>Yes</i>' : '<i>No</i>'}` },
                        { class: 'flipDairyFree', content: `<b>Dairy Free</b>: ${recipe.dairyFree ? '<i>Yes</i>' : '<i>No</i>'}` },
                        { class: 'flipGlutenFree', content: `<b>Gluten Free</b>: ${recipe.glutenFree ? '<i>Yes</i>' : '<i>No</i>'}` },
                        { class: 'flipHealthScore', content: `<b>Health Score</b>: ${recipe.healthScore}` },
                        { class: 'flipSustainable', content: `<b>Sustainable</b>: ${recipe.sustainable ? '<i>No</i>' : '<i>Yes</i>'}` },
                        { class: 'flipPopular', content: `<b>Popular Recipe</b>: ${recipe.veryPopular ? '<i>No</i>' : '<i>Yes</i>'}` },
                        { class: 'flipPrice', content: `<b>Price/Serving</b>: ${recipe.pricePerServing}$` },
                        { class: 'flipCookInMin', content: `<b>Ready In</b>: ${recipe.readyInMinutes - 15} Min` },
                        { class: 'flipServings', content: `<b>Servings</b>: ${recipe.servings}` },
                    ];

                    liData.forEach(item => {
                        const li = document.createElement('li');
                        li.className = item.class;
                        li.innerHTML = item.content;
                        ul.appendChild(li);
                    });

                    // Append elements to form the structure
                    flipCardFront.appendChild(image);
                    flipCardBack.appendChild(backHeader);
                    flipCardBack.appendChild(ul);
                    flipCardInner.appendChild(flipCardFront);
                    flipCardInner.appendChild(flipCardBack);
                    flipCard.appendChild(flipCardInner);
                    imageContainer.appendChild(flipCard);

                    // imageContainer.appendChild(image);

                    // Create the information box
                    const infoBox = document.createElement('div');
                    infoBox.classList.add('recipeInformationBox');

                    // Create and append the title
                    const title = document.createElement('h3');
                    title.textContent = recipe.title;
                    infoBox.appendChild(title);

                    // Create and append the recipe details
                    const details = document.createElement('div');
                    details.classList.add('recipeDetailsContent');
                    const time = document.createElement('p');
                    time.innerHTML = `<b><i class="fa-solid fa-stopwatch"></i> Time: </b>${recipe.readyInMinutes} Min`;
                    const cuisine = document.createElement('p');
                    cuisine.innerHTML = `<b>Cuisine: </b>${recipe.cuisines[0] || 'Asian'}`;
                    details.appendChild(time);
                    details.appendChild(cuisine);
                    infoBox.appendChild(details);

                    // Create and append the view instructions button
                    const buttonContainer = document.createElement('div');
                    buttonContainer.classList.add('viewInstrucionsButton');
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.id = 'viewInstrucionsButton';
                    const link = document.createElement('a');
                    link.target = '_blank';
                    link.textContent = 'View Instructions';
                    button.addEventListener('click', () => {
                        localStorage.setItem('selectedRecipeId', recipe.id);
                        // Link to the recipe's instructions
                        window.location.href = 'recipe_instructions.html'; 
                    })
                    button.appendChild(link);
                    buttonContainer.appendChild(button);
                    infoBox.appendChild(buttonContainer);

                    // Append the image container and info box to the card
                    card.appendChild(imageContainer);
                    card.appendChild(infoBox);

                    recipeResultsContainer.appendChild(card);
                });;
        
            })
            .catch((err) => {
                console.log(err);
                const recipeResultsContainer = document.querySelector('.recipeResults');

                recipeResultsContainer.innerHTML = '';

                const recipeErrorResults = document.createElement('div');
                recipeErrorResults.classList.add('recipeErrorResults');
                recipeErrorResults.innerHTML = `
                <h2>Uh-oh! Looks like we've hit today's <b>recipe-hunting limit!</b> 🚫🍔 Don't worry, the culinary adventure <b>continues tomorrow!</b> 🌟🍳 See you then!</h2>
                <div class="vidConnLost">
                    <video src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/404-error-4099444-3420710.mp4" type="video/mp4"  autoplay loop muted poster="Ninja_Logo_Graffiti.jpg">
                        Your browser doesn't support video tag.
                    </video>
                </div>
                `;

                recipeResultsContainer.appendChild(recipeErrorResults);
            })
    }
})
