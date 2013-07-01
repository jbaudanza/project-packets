/*
 * This will cause the browser to ask the user's permission to use the video
 * camera. If the user grant permission, then the `accessGranted` function
 * will be called. Otherwise, the `accessDenied` function will be called.
 */
navigator.webkitGetUserMedia({video: true}, accessGranted, accessDenied);

function accessGranted(localMediaStream) {
  /*
   * Get a reference to the <video> element in the HTML file
   */
  var video = document.getElementById('my-webcam');

  /*
   * Hook the video element up to the stream from the video camera
   */
  video.src = window.URL.createObjectURL(localMediaStream);

  video.play();
}

function accessDenied() {
  console.log('access denied');
}

function snapPhoto() {
  /*
   * Create a new canvas element. A canvas element is a special kind of HTML
   * element that can be drawn on using Javascript.
   */
  var canvas = document.createElement('canvas');

  /*
   * Set the size of the canvas to the dimensions of the video
   */
  var video = document.getElementById('my-webcam');
  canvas.width = video.clientWidth;
  canvas.height = video.clientHeight;

  /*
   * You can draw shapes, images, and text onto a canvas element. In this case
   * we are going to grab an image from one frame from the camera element and
   * draw it onto the canvas
   */
  var context = canvas.getContext('2d');
  context.drawImage(video, 0, 0);

  /*
   * If the user has applied a filter to their video, we will want to apply
   * that to the canvas as well.
   */
  canvas.style.webkitFilter = video.style.webkitFilter;

  /*
   * Now that the canvas is ready, add it to HTML document. It will be added
   * as a child of the 'my-photos' element.
   */
  var list = document.getElementById('my-photos');
  list.appendChild(canvas);

  /*
   * Scroll the list all the way to the right, so that the user can see the
   * new canvas element */
  list.scrollLeft = list.scrollWidth;
}

/*
 * This tells the browser to wait until the DOMContentLoaded event occurs before
 * continuing. This is a common pattern found in Javascript applications.
 * Google for `DOMContentLoaded` for more information.
 */
document.addEventListener('DOMContentLoaded', function() {
  /*
   * This tells the browser that when the use clicks the 'photo-button', the
   * snapPhoto function should be called
   */
  var button = document.getElementById('photo-button');
  button.onclick = snapPhoto;

  /*
   * This tells the browser that when any of the effect buttons are pushed,
   * we should read the filter name off of the 'data-effect' attribute and
   * add it to the video element.
   */
  var video = document.getElementById('my-webcam');
  var effects = document.getElementById('effects');
  effects.onclick = function(event) {
    video.style.webkitFilter = event.target.getAttribute('data-effect');
  };
});
