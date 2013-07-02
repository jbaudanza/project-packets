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
/* Further optional features and tips:
 * 1.1: add a priority field
 *      - add an html input to the newItemForm div
 *      - add code to clear the field and copy the priority value into the todolist
 *      should a priority be a code (high, middle, low) or a value (1-10)? How will that affect how it is displayed?
 * 1.2: add a due date field
 *      - same steps as for priority, but dates need to be formatted carefully for display
 *      there are javascript frameworks/code snippets available to display calendars. Can you integrate one into the newItemForm?
 */
/******************************************************************
 * Step 2: store the todo list in local storage                   *
 ******************************************************************/
// event handler to store everything if the window closes
window.addEventListener("unload", function(){
  // load the items from the html into an array
  var list = getItemsFromHTML();
  storeItems(list);
});

function storeItems(list){
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
 */
/******************************************************************
 * Step 3: load the todo list from local storage                   *
 ******************************************************************/
// event handler to store everything if the window closes
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
  // up to you if you want to do this the old-school way and learn a simple sorting algorithm
  //sortList(list);
  // or just use a javascript method and a compare function... which is 'better' but less educational
  list.sort(itemCompare);

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
  listElement = document.getElementById("todoList");
  // easiest way is just to overwrite the innerHTML
  listElement.innerHTML = "";
}

/******************************************************************
 * Step 5: add a 'complete' button and mark items complete        *
 ******************************************************************/

// we're going to cheat a little bit and redefine some of the things we've written above
// in normal use, of course, you'd just rewrite the function instead of defining it twice
// and we need to add a complete method to the item

function todoItem(title, description){
  // closure that stores the todo item values
  self = this;
  self.title = title;
  self.description = description;
  self.iscomplete = false;
}

createItem = function(title, description, complete){
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
  button.addEventListener("click",function(){completeItem(title);});
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

  if(complete){
    button.style.display = "none";
    titleSpan.className= titleSpan.className + " complete";
    descSpan.className = descSpan.className + " complete";
  }
}

function createItems(list){
  // iterate the list and create a new todo list item for each item in the list
  for(var i=0; i< list.length;i++){
    createItem(list[i].title, list[i].description, list[i].iscomplete);
  }
}
function getItemValues(itemNode){
  // get the item's title and discription from the html
  var title = itemNode.getElementsByClassName("itemTitle")[0];
  var desc = itemNode.getElementsByClassName("itemDesc")[0];
  // create a todo item with the values in it
  var todo = new todoItem(title.innerHTML,desc.innerHTML);
  // set the complete flag
  todo.iscomplete=(title.className.indexOf("complete") > -1);
  // return the item
  return todo;
}

// now we've finished redefining all that, we can add the new routine to mark an item complete
function completeItem(title){
  // load the items into the array
  var list = getItemsFromHTML();
  // search the array for the item
  for(var i=0;i<list.length;i++){
    if(list[i].title === title){
      // set the item to complete
      list[i].iscomplete=true;
      break;
    }
  }
  // recreate the items
  deleteList();
  createItems(list);
  // store the items
  storeItems(list);
}

/******************************************************************
 * Step 6: purge completed items                                  *
 ******************************************************************/
// all we're going to do is exclude completed items from being stored
// which means rewriting the storeItems routine slightly so it only stores incomplete items
function storeItems(list){
  // don't store the completed items
  var newlist = list.filter(function(item){
    return !item.iscomplete;
  });
  // store the JSON representation of the array in local storage
  var jsonList = JSON.stringify(newlist);
  localStorage.todoList = jsonList;
}