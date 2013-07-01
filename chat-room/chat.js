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
   * We tell firebase to notify our application when a new chat messages is
   * added. This message may be coming from a remote user, or it may be the
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
