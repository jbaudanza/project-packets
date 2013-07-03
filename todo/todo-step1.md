# To Do List Step 1

## Overview

In this step we will allow the user to create a to-do list item. We will also need to deal with all the code needed to set up the extension and tell Chrome about it.

Follow these instructions carefully to get this step complete:

### 1: Manifest file

Every Chrome extension needs a manifest file.

First, create a new folder to store your code in, usually somewhere underneath your 'home' folder. You will be putting all the files you'll create in this folder.

Create a new file called `manifest.json`, open it in your text editor, and enter the following:

``` javascript
{
  "name": "To Do List",
  "description": "A pop-up To Do List for your browser",
  "version": "1.0",
  "manifest_version": 2,
  "browser_action": {
    "default_popup": "todo.html",
    "default_icon":"icon19.png",
    "default_title":"To Do List"
  },
  "icons": { "16": "icon16.png",
          "48": "icon48.png",
          "128": "icon128.png" }
}
```

Save this file in the folder you created

*Details:*

The manifest file tells Chrome what your extension is, and some things about it. The main things to note are the "browser_action" entries, which tell Chrome what your extension does; it's a popup extension that uses the "icon19.png" icon on the toolbar, with a tooltip of "To Do List" and which lanuches the "todo.html" file when clicked.

### 2: Pretty Pictures
Your manifest file mentioned a few icon files: these are the graphics that represent your extension to the user.
You will need a graphics program to create an icon file; the basic one that comes with your operating system is fine (Paint for windows users, for example).
If you're doing this project as a team, and one of your team members is particularly artistic, then they may like to do this part while the rest of the team carries on with the next one. You will not be able to run your extension until the icon files are created, but you can always create simple ones for now and improve them later.

The simplest way to create a set of related icons is to create the largest one first, and then use the graphics program's scaling/resizing feature to scale it down to the smaller sizes.

So:

1. open your graphics package and create a new file, make it 128 pixels wide by 128 pixels high, and draw something in there that suggests a To Do List to you.
2. save that image as 'icon128.png' in your folder
3. resize/rescale the image to 48x48 pixels, then save that image as 'icon48.png' in the folder
4. resize/rescale the image again to 19x19 pixels, then save that as 'icon19.png'
5. and again for 16x16 pixels for the 'icon16.png' image.

The 'icon1.png' is the main toolbar image that Chrome will display for users to click on. You may want to open that image again and sharpen it up a little to make sure it's the best it can be.

### 3: HTML file
Your manifest file also mentioned an HTML file, then 'todo.html' file. So we need to create that now or the extenstion won't run.
This HTML file is the primary resource for the extension; it will be opened by Chrome when it runs your extension and it must handle everything your extension does.
So create a new file called "todo.html" in your text editor, and make it look like this:

```html
<!DOCTYPE html>
<html>
<head>
  <title>To Do List</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="todo.css">
</head>
<body>
  <div id="container">
    <h2 id="listTitle">ToDo List</h2>
    <ul class="todoList" id="todoList">
    </ul>
    <button class="command" id="addNewItem">New Item</button>
  </div>
  <div id="newItemForm" style="display:none">
    <label for="itemTitle">Title</label>
    <input type="text" class="formField" id="itemTitle"/>
    <label for="itemDesc">Description</label>
    <textarea class="formField" id="itemDesc"></textarea>
    <button class="command" id="confirmNewItem">Confirm</button>
  </div>
  <script src="todo.js" type="text/javascript"></script>
</body>
</html>
```

then save it in your folder as normal.

*Details:*

1. The 'container' div contains our To Do List, with the title, list, and 'new item' button
2. The 'newItemForm' div contains the entry fields we need to enter our To Do list entry. This is initially set to be invisible (the `style="display:none"` attribute), as it will display on top of the list when we want/need it to.
3. We add the stylesheet link in the header, but the script goes as the last item in the body, so it is only called once the page contents have been populated.

### 4: CSS file
The CSS file contains instructions for how the page contents should be displayed. The basic principle of creating web pages that are easy to maintain is that:

+ HTML files contain the *structure* of your page; which items are present and how they are related to each other
+ CSS files contain the *appearance* of your page; what each item looks like and where it sits on the page
+ JS files contain the *behaviour* of your page; what each item does and the events it responds to.
So generally we try to avoid putting style or script in the html, and use separate css and js files for it to make our lives easier when we have to come back and change the code later.

This css file is going to be very basic, because you will want to style your extension how you want it. Again, if you have a member of your team who is particularly artistic you may want to let them add more style to the css file while the rest of the team moves ahead.

So, create a new text file called "todo.css", and enter this into it:

``` css
#container{
  width:200px;
  height:400px;
  padding:5px;
}
.todoList{
  width:100%;
  padding:5px;
}
.todoItem{
  width:180px;
  padding:5px;
  font-size:12px;
  font-family:sans-serif;
  display:block;
}
.itemTitle{
  font-size:15px;
  color:blue;
}
.itemDesc{
  padding-left:5px;
}
.command{
  width:100px;
  text-align:center;
  margin-top:15px;
}
#newItemForm{
  position:absolute;
  z-index:100;
  top:20px;
  left:20px;
  bottom:20px;
  right:20px;
  border:5px blue solid;
  border-radius:20px;
  padding:25px;
  background-color:white;
}
.formField{
  width:100%;
}
```

then save the file in the folder as normal.

*Details*

The "#newItemForm" rule is the only really interesting one, it specifies that the new item form should display on top of the rest of the content, and fill the page with only a 20px edge around it.

### 5: JS file
The javascript file contains all the behaviour for the page items, including the event handlers and code to create objects.

For this example we're using plain javascript, partly to minimise bandwidth use during the event, but there are plenty of javascript libraries and frameworks that make life easier when writing web page behaviour javascript, jQuery being the most common one. Don't use it for this example, but check it out if you've got time and curiousity.

Create a file called "todo.js" as normal, and add this code to it:

``` javascript
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
```

save your file in the folder as normal.

*Details*

The purpose of this feature is to create a new list item, so we know we'll need to respond to the click event on the 'new item' button. This event handler clears the fields in the form of any old values left over from a previous item, and displays the form.
Displaying the form means we'll need to do something when the user clicks on the confirm button, and we want that event to actually create a new To Do item based on the entries the user entered into the form. So we grab the values from the form fields, pass them to another function to create the item, and then hide the form.

The function to create the item simply creates a new list item at the end of the list, and creates new span tags inside that list item to gold the values given to it for title and description. Easy.

### 6: Debugging
We're done! that's the extension finished! well... nearly

Follow the instructions for getting Chrome to load your extension, and make sure any errors are dealt with so Chrome is happy. You should see your icon appear in the Chrome toolbar to the right if everything's OK.

You can click on it now if you like, but it probably won't work. Very few programmers ever enter all the code right first time with no errors.

Right-click on the icon and choose the 'inspect pop-up' menu entry. Then when the inspector opens, check if there's a red circle on the bottom row and click it if there is. This will take you to the line containing a problem if you have one. Check that line against the listing above and correct it.

When you get no more errors, you should have a working To Do List, well done!

Except, of course, that whenever you close the list, all the items vanish and don't come back. This isn't good, let's fix this... on to Step 2!

##Optional Extras##
So if you found that all very easy, then try your hand at adding some more features to the list:

###add a priority field

+ add an html input to the newItemForm div, maybe a 'select' tag to let the user choose from preset priority values
+ add code to clear the field and copy the priority value into the todolist
+ should a priority be a code (high, middle, low) or a value (1-10)? How will that affect how it is displayed and used?
+ can you use colour or other visual clues instead of specific values to show the priority?
###add a due date field
+ same steps as for priority, but dates need to be formatted carefully for display. Is your user in the US where dates are displayed Month-Day-Year, or in countries where it is displayed Day-Month-Year. How can you tell?
+ there are javascript code snippets available to display calendars. Can you integrate one into the newItemForm?