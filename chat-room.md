# Chat room

In this project, you will create a simple chat room application. Anyone that is running your application will be able to
send messages to other users over the Internet.

## Core concepts

We will be using a service called Firebase to store and send messages over the Internet. Firebase allows you to build
networked applications without requiring you to build and maintain a server. For more information, visit 
www.firebase.com and read the documentation.

## Files

*manifest.json*

The only unique part of this manifest is the "content_security_policy" section. Because your application will be accessing
resources on the Internet, we need to instruct Chrome to allow certain URLs to be requested. Normally, Chrome applications
are not allowed to make requests to remote resources on the Internet.

```json
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
```

chat.html

```html
<!DOCTYPE html>
<html>
<head>
  <script type='text/javascript' src='https://cdn.firebase.com/v0/firebase.js'></script>
  <script src="chat.js" type="text/javascript"></script>
  <link rel="stylesheet" type="text/css" href="chat.css">
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
```

chat.css
```
#chat-message-list {
  height: 500px;
  border: 1px solid #ccc;
  overflow-y: auto;
  padding: 15px;
}

#chat-message-list li {
  list-style-type: none;
  padding: 0;
}

input[type=text] {
  width: 100%;
}
```

chat.js

```javascript
/*
 * We connect to the remote Firebase database and store the connection into the
 * `chatRoom` variable.
 *
 * You may want to change the URL below to be something unique. For example,
 * you might change it to:
 *
 *   'https://jbaudanza.firebaseIO-demo.com/chat_room_for_dog_owners'
 *     or
 *   'https://jbaudanza.firebaseIO-demo.com/chat_room_football_fans'
 *
 * Every unique URL will create a new chatroom.
 */
var chatRoom = new Firebase('https://jbaudanza.firebaseIO-demo.com/chat_room');

/*
 * This tells the browser to wait until the DOMContentLoaded event occurs before
 * continuing. This is a common pattern found in Javascript applications.
 * Google for `DOMContentLoaded` for more information.
 */
document.addEventListener('DOMContentLoaded', function() {

  /*
   * We use the document.getElementById function to return references to
   * elements in the chat.html file. We store these references in variables
   * and are then able to query and manipulate their state.
   */
  var messageList = document.getElementById('chat-message-list');
  var form = document.getElementById('chat-form');
  var messageInput = document.getElementById('message-input');

  /*
   * We tell firebase to notify our application when a new chat message is
   * added. This message may be coming from a remote user, or it may be from the
   * user that is running the application locally
   */
  chatRoom.on('child_added', function(snapshot) {

    /*
     * `document.createElement` is a function that allows us to add new elements
     * to the HTML file. In this case, we are creating an LI element, inserting
     * the text of the new message, and adding it to the list.
     */
    var li = document.createElement('li');
    li.textContent = snapshot.val().message;
    messageList.appendChild(li);

    /*
     * This forces the message list to scroll to the bottom. If we didn't do
     * this, the user would have to scroll to the bottom of the list manually
     * whenever a new message was received.
     */
    messageList.scrollTop = messageList.scrollHeight;
  });

  /*
   * We are telling the browser to run this code whenever a user enters a
   * new message into the form field
   */
  form.addEventListener('submit', function(event) {
    /*
     * Usually when a form is submitted, the browser will reload the page.
     * We don't want this to happen, so we call the event.preventDefault()
     * function
     */
    event.preventDefault();

    /*
     * We tell Firebase to add a new message to the chatroom. This will
     * cause the `child_added` event to fire for every application that is
     * listening this chat room
     */
    chatRoom.push({message: messageInput.value});

    /*
     * Now that the message has been sent, we can clear out the input form.
     * If we didn't do this, the user would have to delete the text in the form
     * manually.
     */
    messageInput.value = '';
  });
});
```

## Improvement ideas

  - Let users to identify themselves with a nickname. Send the nickname with each message.
  - Let users to upload pictures into the chatroom.
  - Let users join multiple chat rooms
