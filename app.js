// Define UI Variables
const form = document.querySelector('#itemForm')
const itemInput = document.querySelector('#item')
const categoryInput = document.querySelector('#category')
const groceryList = document.querySelector('.groceryCollection')
const bigBoxList = document.querySelector('.bigBoxCollection')
const homeImprovementList = document.querySelector('.homeImprovementCollection')
const filter = document.querySelector('#filter')



// Load all event listeners
loadEventListeners()

function loadEventListeners(){
  // DOM load
  document.addEventListener('DOMContentLoaded', getItems)
  // Add item
  form.addEventListener('submit', addForm)
  // Remove item
  groceryList.addEventListener('click', deleteItem)
  bigBoxList.addEventListener('click', deleteItem)
  homeImprovementList.addEventListener('click', deleteItem)
  // Filter items
  filter.addEventListener('keyup', filterItems)

}

function getItems(){
  let items 
  if(localStorage.getItem('items') === null){
    items = []
  } else {
    items = JSON.parse(localStorage.getItem('items'))
  }

  items.forEach(function(item){
   
    //create and append li with anchor and icon elements
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(item.itemName))
    const link = document.createElement('a')
    link.className = 'delete-item'
    link.innerHTML = '<i class = "fa-solid fa-xmark"></i>'
    li.appendChild(link)
  
    // append li to correct category list
    if (item.categoryName === 'grocery'){
     groceryList.appendChild(li)
    } else if (item.categoryName === 'boxStore'){
      bigBoxList.appendChild(li)
    } else {
      homeImprovementList.appendChild(li)
    }

  })
}

function addForm(e){
  // alert if empty fields
  if (itemInput.value === ''){
    alert('You must add an item name to add it to the list!')
  } else if (categoryInput.value === 'select'){
    alert('You must select a category to add it to the list!')
  }
  
  // create and append li with anchor and icon elements
  const li = document.createElement('li')
  li.className = 'collection-item'
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
  itemInput.value = ''
  categoryInput.value = 'select'

  e.preventDefault()
}

function storeItemInLocalStorage(item, category){
  let items

  // create object with item and category key value pairs
  let itemObj = {
    itemName: item,
    categoryName: category
  } 

  // check to see if anything in LS. No? create empty array. Yes? retrieve array
  if(localStorage.getItem('items') === null){
    items = []
  } else {
    items = JSON.parse(localStorage.getItem('items'))
  }

  // add new item obj into array
  items.push(itemObj)

  // store the array as a string in LS
  localStorage.setItem('items', JSON.stringify(items))
}

function deleteItem(e){
  if (e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove()

      // remove from LS
      deleteItemFromLS(e.target.parentElement.parentElement)
    }
  }
}

function deleteItemFromLS(e){
  let items

  // check to see if anything in LS. No? create empty array. Yes? retrieve array
  if(localStorage.getItem('items') === null){
    items = []
  } else {
    items = JSON.parse(localStorage.getItem('items'))
  }

  items.forEach(function(item, index){
    console.log(e)
    if (e.textContent === item.itemName){
      items.splice(index, 1)
    }
  })

  localStorage.setItem('items', JSON.stringify(items))
}

function filterItems(e){
  const text = e.target.value.toLowerCase()

  document.querySelectorAll('.collection-item').forEach(function(li){
    const item = li.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1){
      li.style.display = 'block'
    } else {
      li.style.display = 'none'
    }
  })
}