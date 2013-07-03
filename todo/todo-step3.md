# To Do List Step 3

## Overview
In the previous step we stored our To Do List in local storage, so now we need to get it back out again.

Again, we're only modifying behaviour here, so we only need to mondify the todo.js file.
Open the todo.js file in your editor and add the following code:

``` javascript
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
    createItem(list[i].title, list[i].description);
  }
}
```

*Details*

We know we want to load the list every time the list opens, and luckily Chrome implements the `window.load` event correctly so we can use that.
When the window opens we want to pull the item from storage, turn it back into a javascript array, and then load each of the items in the array to the page using our existing `createItem()` function. Easy enough.

But there's a little ugliness here. Our `createItem()` function takes a title and a description, which worked fine when we wrote it, way back in step 1. But in step 2 we created a cool object to store these fields, and we're using that object when we pull the items out of storage, but then we have to break them out into title and description again for `createItem()`.
This is known as *refactoring* in programming. As a program grows and changes, there are things that work but could work better, and refactoring is the process of improving existing code so it fits with the overall design better.

So we're going to refactor the `createItem()` function, which means we also need to change any functions that call it. There are two functions that call it:

+ createItems() which we just wrote, which already uses a todoItem object, so will need a minor change
+ confirmNewItem() which we wrote in step 1, which will need to know about todoItem objects.

So let's get to it. Change the three functions so they look like this:

``` javascript
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
function createItems(list){
  // iterate the list and create a new todo list item for each item in the list
  for(var i=0; i< list.length;i++){
    createItem(list[i]);
  }
}
```

*Details*

See if you can spot the changes. Hint: the createItems(list) function has changed, so the changes are all around where that function is called.

Once you've done that an ironed out any bugs, you've got a working To Do List that remembers items! Well done! But it's a little messy...let's sort out sorting it out next. On to step 4!

## Optional Extras

So if you found that all very easy, then try your hand at adding some more features to the list:

### fetch from chrome storage instead of local storage if you did the previous optional extra
+ should be obvious how to change it, this is an easy one

### 3.2 flag a reminder if the due date is close (if you added a due date in step 1)
+ when you load the item, you can check its due date and see if the item is due soon.
+ how would be a good way of alerting the user that an item is due soon? Remember, you want to catch their attention briefly and highlight the item, but not be so intrusive as to annoy them.
