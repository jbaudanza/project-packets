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
  var list = [];
  // iterate the list of li's with classname 'todoItem'
  var elements = document.getElementsByClassName("todoItem");
  for(var i = 0; i<elements.length;i++){
    // get the text nodes under the span nodes
    list.push(getItemValues(elements[i]));
  }
  // store the JSON representation of the array in local storage
  var jsonList = JSON.stringify(list);
  localStorage.todoList = jsonList;
}

function getItemValues(itemNode){
  var title = itemNode.getElementsByClassName("itemTitle")[0].innerHTML;
  var desc = itemNode.getElementsByClassName("itemDesc")[0].innerHTML;
  // add their values to an array of todoItems
  var todo = new todoItem(title,desc);
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
  // iterate the list and create a new todo list item for each item in the list
  for(var i=0; i< list.length;i++){
    createItem(list[i].title, list[i].description);
  }
}

/******************************************************************
 * Step 4: sort the items by name                                 *
 ******************************************************************/
