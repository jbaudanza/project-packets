# To Do List Step 1

## Overview

In the previous step we managed to allow the user to create a To Do item, but then when they close the list, the item disappears. This is because we only created the item in memory, not in storage. When the form closes, the memory is reused and our item vanishes. To keep our items between visits to the page, we need to store them somewhere. This step deals with storing the items, and we'll cover loading the items in the next step.

Because we're only changing the behaviour of the extension, we only need to change the todo.js file. This is one of the main advantages of separating the content, appearance and behaviour into the html, css and js files.

So, open the todo.js file in your text editor and add this code:
------------------------------------------------------------------
`
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
`
-----------------------------------------------------------
then save your file as normal
*Details*
This feature is about saving the To Do list items, so we know we'll need something that will actually represent a To Do item in storage so we can save it and load it as a 'thing'. Javascript supports the use of objects for this, which are declared as functions, so we'll declare an object called todoItem to store our To Do Items in. If you don't understand how this works yet, try searching the internet for some tutorials on javascript objects to get a better understanding.
At this point, each To Do item only consists of a title and a description, so those are the only fields we need for it.

At this point we have a design decision to make: should we store our items in an array in code, and represent that array in the html form, or should we use the html as our mechanism for storing the items? There are pros and cons for both methods:
+Advantages of storing in an array:
++we can move the items to and from the storage quicker
++we can manipulate the array easier than manipulating the html list
+Advantages of storing in the html:
++we only have the list in one place so we never run the risk of the lists getting confused
++we don't have to create, modify and destory items in two places, only one
++we can move from the html list to a code array pretty quickly and easily if we need to
++we're already storing the items in the html so we have to change less code

So that looks clear; we'll store the items in the html. But that means we'll need a function to read the items from the html into an array so we can store them. The function `getItemsFromHTML()` does that, and uses a helper function `getItemValues()` to convert the item values from the html to the todo object values.

And then we need a function to do the actual storage. `storeItems()` takes a list of todoItems and stores them in the browser's local storage.

But we haven't triggered this storage mechanism yet. Ideally, we'd like to trigger this every time the popup closes, so we remember the state of the popup when it closes and can restore it when we next open it. Normally we'd do this using the `window.onunload` event, writing something like this:
-------------------------------
`
window.addEventListener("unload", function(){
  // load the items from the html into an array
  var list = getItemsFromHTML();
  storeItems(list);
});
`
--------------------------------
However, there's a problem with Chrome's implementation of the `window.onunload` event that means it doesn't fire for popup windows. So while this would be the best design solution, we can't use it. We'll have to implement a workaround instead. You'll find that this happens often with programming; the best solution doesn't work for one reason or another, so you have to find a solution that does work. Just remember to try and keep the workarounds documented and clearly marked in your code so if the problem that caused the workaround disappears in the future, you can change it back to the best solution.

So we need to devise a workaround that will keep the stored version of the list current with the html version of the list, so that when the user closes the window (and Chrome doesn't tell our code that's happened) the stored version is up-to-date. We can do this two ways:
1. We can monitor the html list and save it every time something changes in it.
2. We can monitor the user's actions and save the list every time they do something.
Monitoring of an entity can be done two ways: we can set up a timer, remember the current state of the entity, and when the time fires check to see if there's been any change. Or we can use an event handler to be notified when a change happens. The event handler method is much better, easier and simpler, so that's what we should be looking at.
Monitoring the html list would be nice, but we need an event that would fire every time something changed in the list, and looking through the available set of HTML events, there isn't one.
However, we're already responding to the user's actions, so adding a extra function call to the handlers for those actions is no problem, so let's do that.
Change the 'confirmNewItem' function so it looks like this:
---------------------------------------------------
`
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
`
------------------------------------------------
the last 3 lines are the new bit, in case you got lost.

Now, open the chrome://extensions page again and reload your extension, and click on the 'inspect pop-up' to make sure it's all working OK. Fix any problems you find, and once it's working OK, click on the 'resources' tab in the inspector. Look for the line in the left pane that says LocalStorage and the line under it that says 'chrome-extension://' with some random letters after that. Click on that line and you'll see what your popup has stored in the browser's local storage. Something like this:
`
key                  value
todoList             [{"title":"shopping","description":"do the grocery shopping"}]
`
this is JSON, or JavaScript Object Notation. It is an easy format to convert javascript values to and from, and underpins a lot of the communications between web sites and web servers. There's a simple set of commands to convert javascript variables to JSON and back: `JSON.stringify()` converts a javascript object to JSON, and `JSON.parse()` converts a JSON object back to a javascript object. Which is what we need to do to get our list back out of storage, so let's get on with that...
On to step 3!

## Optional Extras
So if you found that all very easy, then try your hand at adding some more features to the list:

### Store the list using Chrome storage instead of local storage
+ local storage only works on this browser. Chrome storage is synced across all the user's devices
+ change the `localStorage.todoList = jsonlist` call to use the [chrome storage api](https://developer.chrome.com/extensions/storage.html)


