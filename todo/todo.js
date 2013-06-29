/******************************************************************
 * Step 1: create a todo item                                     *
 ******************************************************************/

// set up event handlers
var newItemButton = document.getElementById("addNewItem");
newItemButton.addEventListener("click",addNewItem);
var confirmButton = document.getElementById("confirmNewItem");
confirmButton.addEventListener("click", confirmNewItem);

function addNewItem(){
  // clear the fields
  var itemTitle = document.getElementById("itemTitle");
  itemTitle.value = "";
  var itemDesc = document.getElementById("itemDesc");
  itemDesc.value = "";
  // display the add new item div
  var newItemForm = document.getElementById("newItemForm");
  newItemForm.style.display = "block";
}

function confirmNewItem(){
  //create the list item
  var itemTitle = document.getElementById("itemTitle").value;
  var itemDesc = document.getElementById("itemDesc").value;
  createItem(itemTitle,itemDesc);
  
  // and hide the form again
  var newItemForm = document.getElementById("newItemForm");
  newItemForm.style.display = "none";
}

function createItem(title, description){
  // add a new item to the list
  var todoList = document.getElementById("todoList");
  var todoItem = document.createElement("li");
  todoItem.className="todoItem";
  todoList.appendChild(todoItem);
  
  // now add the title and description
  var innerText = "<span class='itemTitle'>"+ title + "</span><span class='itemDesc'>" + description +"</span>";
  todoItem.innerHTML = innerText;
}

/******************************************************************
 * Step 2: store the todo list in local storage                   *
 ******************************************************************/
// event handler to store everything if the window closes
window.onunload = storeItems;

function storeItems(){
  // load the items from the html into an array
  var list = getItemsFromHTML();
  // store the JSON representation of the array in local storage
  var jsonList = JSON.stringify(list);
  localStorage.todoList = jsonList;
}

function getItemsFromHTML(){
  var result = [];
  // iterate the list of li's with classname 'todoItem'
  var elements = document.getElementsByClassName("todoItem");
  for(var i = 0; i<elements.length;i++){
    // get the values from the item and add them to the array
    result.push(getItemValues(elements[i]));
  }
  return result;
}
function getItemValues(itemNode){
  // get the item's title and discription from the html
  var title = itemNode.getElementsByClassName("itemTitle")[0].innerHTML;
  var desc = itemNode.getElementsByClassName("itemDesc")[0].innerHTML;
  // create a todo item with the values in it
  var todo = new todoItem(title,desc);
  // return the item
  return todo;
}

function todoItem(title, description){
  // closure that stores the todo item values
  self = this;
  self.title = title;
  self.description = description;
}

/******************************************************************
 * Step 3: load the todo list from local storage                   *
 ******************************************************************/
// event handler to store everything if the window closes
window.onload = loadItems;

function loadItems(){
  //grab the list from local storage
  var jsonlist = localStorage.todoList;
  // check we've actually got something
  if(!jsonlist) return;
  // convert the list from json
  var list = JSON.parse(jsonlist);
  createItems(list);
}

function createItems(list){
  // iterate the list and create a new todo list item for each item in the list
  for(var i=0; i< list.length;i++){
    createItem(list[i].title, list[i].description);
  }
}

/******************************************************************
 * Step 4: sort the items by name                                 *
 ******************************************************************/
// add a sort button
var container = document.getElementById("container");
var listElement = document.getElementById("todoList");
var sortButton = document.createElement("button");
sortButton.className = "command";
sortButton.id = "sortByName";
sortButton.innerHTML = "Sort";
container.insertBefore(sortButton, listElement);
sortButton.addEventListener("click", sortListByName);

function sortListByName(){
  // use an array to do the sort, it's easier and we already have a function to load the html into an array
  var list = getItemsFromHTML();
  sortList(list);
  // clear the existing list from the page
  deleteList();
  // add the items back in from the sorted list
  createItems(list);
}

function sortList(list){
  // simple bubble sort
  // move through the list one item at a time
  for(var i = 0; i < list.length;i++){
    // for each item,start at the end of the array and let the lowest item 'bubble' back down to this item
    for(var j=list.length-1; j>i; j--){
      // the 'bubbling' works by comparing the item with it's neighbour: if it's lower, swap them
      if(list[j].title < list[j-1].title){
        var s = list[j-1];
        list[j-1] = list[j];
        list[j] = s;
      }
    }
  }
  return list;
}

function deleteList(){
  // grab the list element
  listElement = document.getElementById("todoList");
  // easiest way is just to overwrite the innerHTML
  listElement.innerHTML = "";
}