const selectCategories = document.querySelector("#categorias")
const resultContainer = document.querySelector("#resultado")

const startApp = () =>{
    getCategory()
}

const getCategory = () =>{
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php"
    fetch(url)
        .then(result => result.json())
        .then(data => showCategories(data.categories))
}

const getFoodByCategory = (e) =>{
    const category = e.target.value
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    fetch(url)
        .then(result => result.json())
        .then(data => showFoodByCategory(data.meals))
}

const getFoodDetailsById = (id) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(result => result.json())
        .then(data => showRecipeDetails(data.meals[0]))
}

const modal = new bootstrap.Modal("#modal", {})

/*
* idCategory: "1"
strCategory: "Beef"
strCategoryDescription: "Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have
* been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]"
strCategoryThumb: "https://www.themealdb.com/images/category/beef.png"
* */
const showCategories = (categories) =>{
    categories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.strCategory
        option.textContent = category.strCategory
        selectCategories.appendChild(option)
    })
}

/*
* strMeal: "Baked salmon with fennel & tomatoes"
* strMealThumb: "https://www.themealdb.com/images/media/meals/1548772327.jpg"
* idMeal: "52959"
* */
const showFoodByCategory = (meals) =>{
    cleanseMealResults()
    meals.forEach(meal => {
        const allRecipesContainer = document.createElement("div")
        allRecipesContainer.classList.add("col-md-4")

        const {idMeal, strMeal, strMealThumb} = meal
        const recipeDiv = document.createElement("div")
        const recipeHeading = document.createElement("h3")
        const recipeImg = document.createElement("img")
        const recipeCardBody = document.createElement("div")
        const recipeButton = document.createElement("button")

        recipeDiv.classList.add("card")
        recipeHeading.textContent = strMeal

        recipeImg.alt = strMeal
        recipeImg.src = strMealThumb
        recipeImg.classList.add("card-img-top")

        recipeCardBody.classList.add("card-body")

        recipeHeading.classList.add("card-title", "mb-3")
        recipeHeading.textContent = strMeal

        recipeButton.classList.add("btn", "btn-danger", "btn-primary")
        recipeButton.setAttribute("id", idMeal)
        recipeButton.textContent = "View recipe"
        recipeButton.onclick = () =>{
            getFoodDetailsById(idMeal)
        }
        recipeDiv.appendChild(recipeHeading)
        recipeDiv.appendChild(recipeImg)
        recipeDiv.appendChild(recipeButton)

        allRecipesContainer.appendChild(recipeDiv)
        resultContainer.appendChild(allRecipesContainer)
    })
}

const showRecipeDetails = (recipeDetails) =>{
    const {idMeal, strInstructions, strMeal, strMealThumb} = recipeDetails
    const modalTitle = document.querySelector(".modal .modal-title")
    const modalBody = document.querySelector(".modal .modal-body")

    modalTitle.textContent = strMeal
    modalBody.innerHTML =`
        <img class="img-fluid" src="${strMealThumb}" alt="${strMeal}">
        <h3 class="my-3">Instructions</h3>
        <p>${strInstructions}</p>
    `

    const listGroup = document.createElement("ul")
    listGroup.classList.add("list-group")

    for (let i = 0; i <= 20; i++){
        if (recipeDetails[`strIngredient${i}`]){
            const ingredient = recipeDetails[`strIngredient${i}`]
            const amount = recipeDetails[`strMeasure${i}`]

            const ingredientLi = document.createElement("li")
            ingredientLi.classList.add("list-group-item")
            ingredientLi.textContent = `${amount} - ${ingredient}`

            listGroup.appendChild(ingredientLi)
        }
    }

    modalBody.appendChild(listGroup)
    modal.show()
}

const cleanseMealResults = () =>{
    while (resultContainer.firstChild){
        resultContainer.removeChild(resultContainer.firstChild)
    }
}

document.addEventListener("DOMContentLoaded", startApp)
document.addEventListener("change", getFoodByCategory)