"use strict";
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

  // and store the new list
  var list = getItemsFromHTML();
  storeItems(list);
}

function createItem(title, description){
  // add a new item to the list
  var todoList = document.getElementById("todoList");
  var todoItem = document.createElement("li");
  todoItem.className="todoItem";
  todoList.appendChild(todoItem);
  
  // now add the title and description
  // title
  var titleSpan = document.createElement("span");
  titleSpan.className = "itemTitle";
  titleSpan.innerHTML =title;
  todoItem.appendChild(titleSpan);
  // description
  var descSpan = document.createElement("span");
  descSpan.className = "itemDesc";
  descSpan.innerHTML = description;
  todoItem.appendChild(descSpan);
} 
function todoItem(title, description){
  // object closure that stores the todo item values
  self = this;
  self.title = title;
  self.description = description;
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

function storeItems(list){
  // store the JSON representation of the array in local storage
  var jsonList = JSON.stringify(list);
  localStorage.todoList = jsonList;
}
