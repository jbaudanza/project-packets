# to-do list

In this project, you will create a todo list application that can be added to your Chrome browser.

This project has a core set of functionality that will need to be completed in stages, but at each stage there are optional extra features that can be added if you are confident and have the time.

## feature list

1. Create a to-do item
  1.1 add a priority field
  1.2 add a due date field
  1.3 add a link to another item as a predecessor
2. Store a to-do item in local storage
  2.1 use the Google Drive api to store the list of items on Google Drive
  2.2 create a download link to download the list to your local drive
3. Display a to-do item from local storage
  3.1 or Google Drive if you did step 2.1
  3.2 flag a reminder if the due date is close (if you've done 1.2)
4. Sort the items by name
  4.1 sort the items by priority if you did 1.1
  4.2 sort the items by due date if you did 1.2
  4.3 sort items with a predecessor after their predecessor item in all sorting types
5. Display a 'completed' button and mark the to-do item as complete if ticked
6. Purge the list of completed items

## files

*manifest.json*

~~~ javascript
{
  "name": "To Do List",
  "description": "This app keeps your to do list tidy",
  "version": "1.0",
  "manifest_version": 1,
  "app": {
    "launch": {
      "local_path": "todo.html"
    }
  }
}
~~~


