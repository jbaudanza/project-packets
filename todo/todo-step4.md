# To Do List Step 4

## Overview
In the previous step we stored our To Do List in local storage, and got it back again. So we have a To Do List that is permanent, but a little messy. New items are added at the end and there's no way of tidying it up. Let's add a feature that can sort the list to keep it tidy.

This will need a new interaction from the user, a sort button. A button is an element of structure, so we need to change the HTML file to add the new button.

Then we'll need to sort the items. This is much easier done in an array than in the html, so we'll grab the items, sort them, then redraw the list in the new order. So we'll need a function to sort the list, and a function to clear the list, and we already have a function to display the list.

## HTML changes
add the new button tag near the top of the <body> tag, so it looks like:

``` html
<body>
  <div id="container">
    <h2 id="listTitle">ToDo List</h2>
    <button id="sortByName">Sort</button>
    <ul class="todoList" id="todoList">
```

## javascript changes
there are no changes to existing functions with this feature, we're just adding new things here.

``` javascript
var sortButton = document.getElementById("sortByName");
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
  return list;
}

function deleteList(){
  // grab the list element
  var listElement = document.getElementById("todoList");
  // easiest way is just to overwrite the innerHTML
  listElement.innerHTML = "";
}
```

*Details*

There's two different sorting methods listed in the `sortListByName()` function, one is an old-school bubble sort, which you can experiment with if you want to learn about sorting. The other is a more modern call to the sort() method of the javascript array object. Either method works, but if you're going to write production code then the modern sort() method call is probably preferable.
Note that the bubble sort is very simple and straightforward; there are a number of optimisations that you could do to make it work more efficiently and effectively, but unless your to do list has thousands of items in it, you'll never notice the difference. Keeping things simple when they don't need to be complicated is a good thing, unneccesary optimisations are a bad thing.

## Optional Extras
So if you found that all very easy, then try your hand at adding some more features to the list:

### sort by due date, priority, if you added them in step 1
+ alter the bubble sort so it compares the due date or priority fields instead of the title
+ or change the itemCompare function so it does the same
