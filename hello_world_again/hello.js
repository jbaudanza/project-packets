// "document" is the variable that refers to the HTML structure.
document.addEventListener('DOMContentLoaded', function() {

  // This gives us a reference to the HTML element whose id is "chat-form."
  var form = document.getElementByid('chat-form');

  // This gives us a reference to the element whose id is "message-input."
  var messageInput = document.getElementById('message-input');

  // This gives us a reference to the title.
  var chatTitle = document.getElementById('chatroom-title');

  // An "EventListener" calls the function passed in when the "submit" event
  // is detected on the form.
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // The variable "name" now refers to the text the user typed into the
    // message input box in the form.
    var name = messageInput.value;

    // Here we change the text of the title of the page.
    chatTitle.textContent = "Hello, " + name + "!";

    // This line sets the value of the input box back to the empty string.
    messageInput.value = "";
  });

// Don't forget to make sure your parentheses and brackets line up!
});