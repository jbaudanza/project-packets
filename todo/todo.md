# To Do List

## Introduction

In this project, you will create a todo list popup utility that can be added to your Chrome browser toolbar.

This project is a little more extensive than the others, and uses the popup functionality rather than the whole page. It has a core set of functionality that will need to be completed in stages, but at each stage there are optional extra features that can be added if you are confident and have the time.

The project also introduces icons to the manifest, and leaves the graphics very much up to you. The core css file is very basic and ugly and you will want to play with it to make your application look more appealing to your audience.

There are a couple of issues in Chrome with the popup functionality:

  * To inspect your code, don't right-click on the popup and click on 'inspect element' - this could freeze your whole system. Instead right-click on the toolbar icon for your popup and choose 'inspect pop-up'. This will launch your popup with an inspector alognside it.
  * The popup event handler doesn't hande some events, so we'll be writing code that gets around it. If you write your own popup extension, then be aware that some events don't fire as expected.


## Feature List

In this application, we're going to create a popup To Do List that sits as an icon on the Chrome toolbar, and when that icon is clicked it pops up a To Do List that you can add and remove items from.

We've broken the features down into a list, that we can then implement one at a time. When you write an application, breaking down the features into groups that can be easily implemented and tested is a good idea. It allows you to make sure one part of your application works properly before adding other parts to it.

We've also added optional items to the list that you might like to try adding yourself if you've got time and feel like a bigger challenge. We'll provide code for the main items, but not for the optional items.

1. Create a to-do item
    1. add a priority field
    2. add a due date field
    3. add a link to another item as a predecessor
2. Store a to-do item in local storage
    1. use the Chrome storage api to store and sync the items across all the user's devices
3. Display a to-do item from local storage
    1. or the Chrome storage api if you did step 2.1
    2. flag a reminder if the due date is close (if you've done 1.2)
4. Sort the items by name
    1. sort the items by priority if you did 1.1
    2. sort the items by due date if you did 1.2
5. Display a 'completed' button and mark the to-do item as complete if ticked

## files

Each step in the feature list is detailed in its own document.
You should follow the instructions for each step one after the other.

Good Luck, and remember to have fun creating your own version of your ToDo List!

