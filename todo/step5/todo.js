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
  var item = new todoItem(itemTitle, itemDesc);
  createItem(item);
  
  // and hide the form again
  var newItemForm = document.getElementById("newItemForm");
  newItemForm.style.display = "none";
  
  // and store the new list
  var list = getItemsFromHTML();
  storeItems(list);
}

function createItem(item){
  // add a new item to the list
  var todoList = document.getElementById("todoList");
  var todoItem = document.createElement("li");
  todoItem.className="todoItem";
  todoList.appendChild(todoItem);
  
  // complete button
  var button = document.createElement("button");
  button.className = "buttonComplete";
  button.innerHTML = "Done";
  todoItem.appendChild(button);
  button.addEventListener("click",function(){completeItem(todoItem);});
  // title
  var titleSpan = document.createElement("span");
  titleSpan.className = "itemTitle";
  titleSpan.innerHTML =item.title;
  todoItem.appendChild(titleSpan);
  // description
  var descSpan = document.createElement("span");
  descSpan.className = "itemDesc";
  descSpan.innerHTML = item.description;
  todoItem.appendChild(descSpan);
  
  if(item.complete){
    button.style.display = "none";
    titleSpan.className= titleSpan.className + " complete";
    descSpan.className = descSpan.className + " complete";
  }
}

function todoItem(title, description, complete){
  // object closure that stores the todo item values
  self = this;
  self.title = title;
  self.description = description;
  self.complete = complete;
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
  // check if it's complete
  var titleClass = itemNode.getElementsByClassName("itemTitle")[0].className;
  todo.complete=(titleClass.indexOf("complete") > -1);
  // return the item
  return todo;
}

function storeItems(list){
  // don't store the completed items
  var newlist = list.filter(function(item){
    return !item.complete;
  });
  // store the JSON representation of the array in local storage
  var jsonList = JSON.stringify(newlist);
  localStorage.todoList = jsonList;
}

// event handler to load the list when the window opens
window.addEventListener("load", loadItems);

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
    createItem(list[i]);
  }
}
function completeItem(item){
  var button = item.getElementsByClassName("buttonComplete")[0];
  button.style.display = "none";
  var text = item.getElementsByTagName("span");
  for(var i=0;i<text.length;i++){
    text[i].className = text[i].className + " complete";
  }
  // load the items into the array
  var list = getItemsFromHTML();
  // store the items
  storeItems(list);
}
