console.log(222);
const btnContainer = document.getElementById("button-container");
// Categories section

const displayCategories = (btns) => {
console.log(btns)
btnContainer.innerHTML=""
for(let btn of btns){
    const div =document.createElement("div")
    div.innerHTML=`
    <div class="p-1 pl-2 text-[#1F2937]  hover:bg-green-900 hover:text-white rounded-sm">${btn.category_name}</div>
    
    
    
    `
    btnContainer.appendChild(div)
}
};

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));
};

loadCategories();
