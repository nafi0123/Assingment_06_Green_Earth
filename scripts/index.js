console.log(222);
const btnContainer = document.getElementById("button-container");
const cardContainer = document.getElementById("card-container");


// plantsByCategories section
const displayPlantsByCategories = (plants) => {
  console.log(plants);
  cardContainer.innerHTML = "";

  for (let plant of plants) {
    const div = document.createElement("div");
div.innerHTML = `
  <div class="card bg-base-100 w-full shadow-sm h-[370px] flex flex-col">
    <div class="p-2">
      <figure>
        <img class="rounded-lg w-full h-[150px] object-cover" 
          src="${plant.image}" alt="Plant Image" />
      </figure>
    </div>
    <div class="card-body flex flex-col flex-1">
      <h2 class="card-title text-[13px]">${plant.category}</h2>
      <p class="text-gray-600 text-[10px] text-justify flex-1 overflow-hidden">
        ${plant.description.length > 80 
          ? plant.description.slice(0, 80) + " ..." 
          : plant.description}
      </p>
      <div class="flex justify-between items-center mt-2">
        <div class="font-bold bg-[#DCFCE7] rounded-[20px] text-[10px] p-[6px]">
          ${plant.category}
        </div>
        <div class="text-[10px] font-bold">৳<span id="amount">${plant.price}</span></div>
      </div>
      <button class="btn bg-[#15803D] w-full rounded-[999px] text-white text-[10px] mt-auto">
        Add to Cart
      </button>
    </div>
  </div>
`;

    cardContainer.appendChild(div);
  }
};


const loadPlantsByCategories = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayPlantsByCategories(json.plants));
};

// Categories section

const displayCategories = (btns) => {
  console.log(btns);
  btnContainer.innerHTML = "";
  for (let btn of btns) {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="p-1 pl-2 text-[#1F2937]  hover:bg-green-900 hover:text-white rounded-sm " onclick="loadPlantsByCategories(${btn.id})">${btn.category_name}</div>
    
    
    
    `;
    btnContainer.appendChild(div);
  }
};

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));
};

loadCategories();
