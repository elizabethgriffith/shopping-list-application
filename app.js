// Define UI Variables
const form = document.querySelector('#itemForm')
const itemInput = document.querySelector('#item')
const categoryInput = document.querySelector('#category')
const groceryList = document.querySelector('.groceryCollection')
const bigBoxList = document.querySelector('.bigBoxCollection')
const homeImprovementList = document.querySelector('.homeImprovementCollection')



// Load all event listeners
loadEventListeners()

function loadEventListeners(){
  // DOM load
  //document.addEventListener('DOMContentLoaded', getItems)
  // Add item
  form.addEventListener('submit', addForm)
}

// function getItems(){
//   let items 
//   if(localStorage.getItem('items') === null){
//     items = []
//   } else {
//     items = JSON.parse(localStorage.getItem('items'))
//   }

//   items.forEach(function(item){
//     // create and append li with anchor and icon elements
//     const li = document.createElement('li')
//     li.appendChild(document.createTextNode(item))
//     const link = document.createElement('a')
//     link.className = 'delete-item'
//     link.innerHTML = '<i class = "fa-solid fa-xmark"></i>'
//     li.appendChild(link)
  
//     // append li to correct category
//     if (categoryInput.value === 'grocery'){
//      groceryList.appendChild(li)
//     } else if (categoryInput.value === 'boxStore'){
//       bigBoxList.appendChild(li)
//     } else {
//       homeImprovementList.appendChild(li)
//     }

//   })
// }

function addForm(e){
  // alert if empty fields
  if (itemInput.value === ''){
    alert('You must add an item name to add it to the list!')
  } else if (categoryInput.value === 'select'){
    alert('You must select a category to add it to the list!')
  }
  
  // create and append li with anchor and icon elements
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(itemInput.value))
  const link = document.createElement('a')
  link.className = 'delete-item'
  link.innerHTML = '<i class = "fa-solid fa-xmark"></i>'
  li.appendChild(link)
  
  // append li to correct category
  if (categoryInput.value === 'grocery'){
    groceryList.appendChild(li)
  } else if (categoryInput.value === 'boxStore'){
    bigBoxList.appendChild(li)
  } else {
    homeImprovementList.appendChild(li)
  }

  // store items in local storage
  storeItemInLocalStorage(itemInput.value, categoryInput.value)


  // clear input
  // itemInput.value = ''
  // categoryInput.value = 'select'

  e.preventDefault()
}

function storeItemInLocalStorage(item, category){
  let items

  let itemObj = {
    itemName: item,
    categoryName: category
  } 

  
  if(localStorage.getItem('items') === null){
    items = []
  } else {
    items = JSON.parse(localStorage.getItem('items'))
  }

  items.push(itemObj)

  localStorage.setItem('items', JSON.stringify(items))
}

