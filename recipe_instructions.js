document.addEventListener('DOMContentLoaded', () => {
    const recipeId = localStorage.getItem('selectedRecipeId');
    const apiKey = 'adffe1ff5aa544f78587d0da68d7479b';

    // Border funcitonallity for selected links
    function addBorder(e){
        // event.preventDefault();
        const navLinks = document.querySelectorAll('.navListItemsR a');
        navLinks.forEach((link) => {
            link.classList.remove('active');
        })

        // Adding border to clicked link
        e.target.classList.add('active');
    }

const navLinks = document.querySelectorAll('.navListItemsR a');
navLinks.forEach((link) => {
    link.addEventListener('click', addBorder);
})

    if (recipeId) {
        const recipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;

        fetch(recipeDetailsUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                // Populate recipe header information
                const recipeTitle = document.querySelector('.recipeInstructionTitle');
                recipeTitle.innerHTML = `${data.title} <sup><i class="fa-solid fa-heart"></i> ${data.aggregateLikes * 1000 + 1000}</sup>`;
                
                // const recipeLikeCount = document.querySelector('.recipeLikeCount');
                // recipeLikeCount.innerHTML = `<i class="fa-solid fa-heart"></i> ${data.aggregateLikes}`;

                const recipeSummary = document.querySelector('.recipeSummary');
                recipeSummary.innerHTML = `${data.summary}`;

                const recipeImage = document.querySelector('.rightImageContainer img');
                recipeImage.src = data.image || 'Ninja_Logo_Graffiti.jpg';
                recipeImage.alt = data.title;

                // Populate extra recipe information
                const dishType = document.querySelector('.dishType');
                // Function to capitalize the first letter of each word
                function capitalize(word) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }

                // Slice the array to the first 5 elements and capitalize each word
                let limitedDishTypes = data.dishTypes.slice(0, 5).map(capitalize);

                // Join the array into a string separated by commas
                let dishTypesString = limitedDishTypes.join(', ');

                // Update the innerHTML
                dishType.innerHTML = `<i class="fa-solid fa-bowl-food"></i> <b>Dish Type:</b> <i>${dishTypesString}</i>`;

                const servesFor = document.querySelector('.servesFornPpl');
                servesFor.innerHTML = `<i class="fa-solid fa-user-group"></i> <b>Serves for:</b> <i>${data.servings} People</i>`;

                const vegan = document.querySelector('.veganYn');
                vegan.innerHTML = `<i class="fa-solid fa-seedling"></i> <b>Vegan:</b> ${data.vegan ? '<i>Yes</i>' : '<i>No</i>'}`;

                const timeToCook = document.querySelector('.timeToCook');
                timeToCook.innerHTML = `<i class="fa-solid fa-hourglass-half"></i> <b>Time to cook:</b> <i>${data.readyInMinutes} Min</i>`;

                const glutenFree = document.querySelector('.glutenFree');
                glutenFree.innerHTML = `<i class="fa-solid fa-plate-wheat"></i> <b>Gluten Free:</b> ${data.glutenFree ? '<i>Yes</i>' : '<i>No</i>'}`;

                const dairyFree = document.querySelector('.dairyFree');
                dairyFree.innerHTML = `<i class="fa-solid fa-cow"></i> <b>Dairy Free:</b> ${data.dairyFree ? '<i>Yes</i>' : '<i>No</i>'}`;

                const sourceName = document.querySelector('.sourceName');
                sourceName.innerHTML = `<i class="fa-solid fa-hourglass-half"></i> <b>Source Name:</b> <i>${data.sourceName}</i>`;

                const sourceUrl = document.querySelector('.recipeSourceURL');
                sourceUrl.target = '_blank';
                sourceUrl.href = data.sourceUrl;
                sourceUrl.innerHTML = `<i>Visit</i>`;

                const pricePerServing = document.querySelector('.pricePSng');
                pricePerServing.innerHTML = `<i class="fa-solid fa-cow"></i> <b>Price per serving:</b> <i>${data.pricePerServing}$</i>`;

                // Populate ingredients
                const ingredientsList = document.querySelector('.recipeIngridients ol');
                ingredientsList.innerHTML = '';
                data.extendedIngredients.forEach(ingredient => {
                    const listItem = document.createElement('li');
                    const alternateIngredientImageUrl = 'https://static.vecteezy.com/system/resources/previews/003/159/278/original/add-cooking-ingredient-black-glyph-icon-vector.jpg';
                    listItem.innerHTML = `${ingredient.original}<img id="ingredientImage" src="https://img.spoonacular.com/ingredients_100x100/${ingredient.image}" alt="No_Img" onerror="this.onerror=null;this.src='${alternateIngredientImageUrl}';">`;
                    ingredientsList.appendChild(listItem);
                });

                // Populate instructions
                const instructionsList = document.querySelector('.recipeInstructionsContainer ol');
                instructionsList.innerHTML = '';
                data.analyzedInstructions[0].steps.forEach(step => {
                    const listItem = document.createElement('li');
                    listItem.textContent = step.step;
                    instructionsList.appendChild(listItem);
                });

            })
            .catch(error => {
                console.error('Error fetching recipe details:', error);
                const recipeDetailsContainer = document.getElementById('recipeDetails');
                // recipeDetailsContainer.textContent = 'Error fetching recipe details.';
            });
    } else {
        const recipeDetailsContainer = document.getElementById('recipeDetails');
        recipeDetailsContainer.textContent = 'No recipe selected.';
    }
});
