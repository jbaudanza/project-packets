# Introduction

This is a chatroom

# Core concepts

Firebase

# Files

chat.html

```manifest.json
{
  "name": "My Chat Room",
  "description": "This app lets you chat with other people.",
  "version": "1.0",
  "manifest_version": 2,

  "content_security_policy": "script-src 'self' https://cdn.firebase.com https://jbaudanza.firebaseIO-demo.com/ https://s-demo.firebaseio-demo.com/; object-src 'self'",

  "app": {
    "launch": {
      "local_path": "chat.html"
    }
  }
}


```html
<!DOCTYPE html>
<html>
<head>
  <script type='text/javascript' src='https://cdn.firebase.com/v0/firebase.js'></script>
  <script src="chat.js" type="text/javascript"></script>
</head>
<body>
  <h1>Chat room</h1>

  <ul id='chat-message-list'>
  </ul>

  <form id='chat-form'>
    <input type="text" name="message" id="message-input">
  </form>
</body>
</html>

chat.js

```javascript
var chatRoom = new Firebase('https://jbaudanza.firebaseIO-demo.com/chat_room');

document.addEventListener('DOMContentLoaded', function() {

  var messageList = document.getElementById('chat-message-list');
  var form = document.getElementById('chat-form');
  var messageInput = document.getElementById('message-input');

  chatRoom.on('child_added', function(snapshot) {
    var li = document.createElement('li');
    li.textContent = snapshot.val().message;
    messageList.appendChild(li);
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    chatRoom.push({message: messageInput.value});

    messageInput.value = '';
  });
});


