# To Do List Step 5

## Overview
In the previous steps we created a To Do List that pops up when the user clicks on an icon, and remembers their To Do Items for them, and can be sorted at the click of a button. This is cool, but we need a way of telling it when an item has been done. So let's do that.

We're creating a new interaction with the application, so we need to change the HTML. But the interaction is actually with the To Do items, which are generated by the javascript in the `createItem()` function, so we will just need to change the javascript.

We'll need some way of tracking whether the item is complete or not, and since that's a property of the item, we'll add it to the `todoItem` object. Which means we'll need to change the `createItem()` function to display it, and the `getItemValues()` which gets the item back into an object. The store and load functions both work on lists of objects, and don't care what the object looks like, so we're OK there.
However, we should probably stop storing items once they're complete, because they stopped being useful then, so we'll need to change `storeItems()` to filter out any completed items before storing the list. We also need to call `storeItems()` from the complete button event, because it's a change to the list so we'd better store it. This is part of the workaround for not being able to use the `window.onunload` event which we'd prefer to do.

And finally, we need to react to the button click and actually set the item to complete. This is a little more interesting than it seems because we're creating multiple buttons, each pointing to a different todo item. How do we know which item is being marked as complete? We'll explore that later.

### CSS changes

there's also one small addition to the css file which we'll get out of the way first:

``` css
    .complete{
      text-decoration:line-through;
    }
```

This tells the browser to put a line through the items that have been completed. You can change the effect you want to use to show a completed item if you like; the code looks at the class name not the effect.

### javascript changes
The javascript changes are:

``` javascript
function todoItem(title, description, complete){
  // object closure that stores the todo item values
  self = this;
  self.title = title;
  self.description = description;
  self.complete = complete;
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

function completeItem(item){
  var button = item.getElementsByClassName("buttonComplete")[0];
  button.style.display = "none";
  var text = item.getElementsByTagName("span");
  for(var i=0;i<text.length;i++){
    text[i].className = text[i].className + " complete";
  }
  // load the items into the array
  var list = getItemsFromHTML();
  // store the items now because it's a change to the list and we can't use onunload
  storeItems(list);
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
```

*Details*

There's a slightly clever bit of javascript magic going on here. When the button is created to mark an item as complete, it's given an event handler, like so: `button.addEventListener("click",function(){completeItem(todoItem);});`. This event handler contains an anonymous function (called anonymous because it hasn't been given a name) that does nothing but call the `completeItem()` function. So why not just specify the `completeItem()` function as the event handler?

Because of something called a *closure*. Javascript loves closures and you'll see them all the time in javascript code, so it's worth knowing a bit about them. But this is advanced stuff, so if you get confused don't worry; many experienced programmers are also confused by closures. Just skip it and move on to the next bit, you'll get around to learning about closures when you need to.

In javascript, each function call has its own little memory space where the value of variables are preserved. Once the function completes executing, the memory is freed up and the value of the variables is lost. But if some other variable or function is holding on to one of those variables, then the memory isn't freed up and the value is preserved. This preservation of the memory space of a function is called a *closure*.

In this code we use this to remember which item each button refers to. When we create the button, we assign it an event handler, and that event handler has its own function instance (the anonymous function) that will handle the event. And that anonymouns event handler has been given the value of the `todoItem` variable. So when the `createItem()` function completes, there's still something left holding one of its variables; so that variable's value is preserved in the anonymous function which is preserved in the event handler for the click event of that button. Since each button is given a different value of `todoItem` there is a closure for each button created, each with a different value of `todoItem` to pass to the `completeItem()` call it will make if clicked.
Hopefully that made sense and you can see how each button, despite being generated by the same code, has a different value of `todoItem` that it will operate on if clicked. This is an incredibly powerful feature of javascript, and expert coders use this to make javascript do some amazing things.

OK, that's the hardest thing you'll need to learn about javascript coding. If you understood it all, then well done, you're a natural at this. If not, don't worry, plenty of other people are totally mystified by it too.

And that's it! a fully-functional todo list in your browser. Well done, you've created something that's useful for people. Welcome to the programmer's world, where creating useful things is what we do :)

## Optional Extras
So if you found that all very easy, then try your hand at adding some more features to the list:

* add a button to 'un-complete' the item
* add a 'history' display that tracks how many items the user has completed on each date
    * you'll need a new div that can be hidden/shown to display the data
    * a list is easiest, but a graph is cooler... check out the `<canvas>` element to get drawing!
    * keep a separate locaStorage.history json object that remembers how many items were completed, maybe?