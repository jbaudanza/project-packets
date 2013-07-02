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
  
  // now add the title and description
  // title
  var titleSpan = document.createElement("span");
  titleSpan.className = "itemTitle";
  titleSpan.innerHTML = item.title;
  todoItem.appendChild(titleSpan);
  // description
  var descSpan = document.createElement("span");
  descSpan.className = "itemDesc";
  descSpan.innerHTML = item.description;
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

var sortButton = document.getElementById("sortByName");
sortButton.addEventListener("click", sortListByName);

function sortListByName(){
  // use an array to do the sort, it's easier and we already have a function to load the html into an array
  var list = getItemsFromHTML();
  // up to you if you want to do this the old-school way and learn a simple sorting algorithm
  sortList(list);
  // or just use a javascript method and a compare function... which is 'better' but less educational
  //list.sort(itemCompare);
  
  // clear the existing list from the page
  deleteList();
  // add the items back in from the sorted list
  createItems(list);
}

function itemCompare(item1, item2){
  // compare the two items and work out which one comes first
  if(item1.title < item2.title)
    //if item1 comes first, return a value < 0
  return -1;
  else
    // if item2 comes first, return a value > 0
    return 1;
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
  // there are optimisations for this sort, which you can find on the web if you google 'bubble sort'
  // but unless you have a todo list with thousands of items in it, you don't need to optimise it
  // not optimising it keeps the code cleaner and easier to read and maintain. Maintainability beats unnecessary speed
  return list;
}

function deleteList(){
  // grab the list element
  var listElement = document.getElementById("todoList");
  // easiest way is just to overwrite the innerHTML
  listElement.innerHTML = "";
}
