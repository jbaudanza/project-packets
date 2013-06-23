document.addEventListener('DOMContentLoaded', function() {

	var form = document.getElementById('chat-form');
	var messageInput = document.getElementById('message-input');
	var chatTitle = document.getElementById('chatroom-title');

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		var name = messageInput.value;

		chatTitle.textContent = "Hello, " + name + "!";

		messageInput.value = '';
	    });
    });