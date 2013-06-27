// set up event handlers
newItemButton = document.getElementById("addNewItem");
newItemButton.addEventListener("click",addNewItem);
confirmButton = document.getElementById("confirmNewItem");
confirmButton.addEventListener("click", confirmNewItem);

function addNewItem(){
  // clear the fields
  itemTitle = document.getElementById("itemTitle");
  itemTitle.value = "";
  itemDesc = document.getElementById("itemDesc");
  itemDesc.value = "";
  // display the add new item div
  newItemForm = document.getElementById("newItemForm");
  newItemForm.style.display = "block";
}

function confirmNewItem(){
  // add the new item to the to-do list
  todoList = document.getElementById("todoList");
  todoItem = document.createElement("li");
  todoItem.className="todoItem";
  todoList.appendChild(todoItem);
  
  // now add the title and description
  itemTitle = document.getElementById("itemTitle");
  itemDesc = document.getElementById("itemDesc");
  innerText = "<span class='itemTitle'>"+ itemTitle.value + "</span><span class='itemDesc'>" + itemDesc.value +"</span>";
  todoItem.innerHTML = innerText;
  
  // and hide the form again
  newItemForm = document.getElementById("newItemForm");
  newItemForm.style.display = "none";
}