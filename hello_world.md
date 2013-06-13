# Hello World

In this project, you will first get set up with your development environment. We will be building Chrome extensions and applications, so you will need to download and install the Google Chrome browser if you do not already have it. You'll also need a way to write, save, and edit text files.

## Core Concepts

  * Installing Chrome
  * Finding a text editor
  * HTML
  * Installing a Chrome Extension

## Getting Started

First, download and install Chrome Web Browser from here: https://www.google.com/intl/en/chrome/browser/.

If you have a text editor of choice, feel free to use it. If not, we recommend the Slim Text Chrome Application, which you can get here: http://slimtext.org/.

In the rest of this packet, we will provide you with the necessary text files for your first Chrome extensions. Create a folder on your computer called hello_world. For each of these files, create a new file in your text editor. To do this in Slimtext, first open the application by clicking the green-S icon in the top right of your Chrome Browser. Navigate to the folder you created by clicking through the files on the left and directories above. Then open a new file by clicking the page-with-a-corner-folded-down icon, the left-most icon at the top right. Be sure to name the files as they appear below.

## Source Files

*manifest.json*

Every Chrome extension has a manifest file. It tells Chrome which files provide the content and behavior of the extension.

```json
{
  "manifest_version": 2,

  "name": "Hello World",
  "description": "This extension demonstrates a browser action.",
  "version": "1.0",

  "browser_action": {
    "default_popup": "hello.html"
  }
}
```

*hello.html*

This file describes what our popup will look like.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>                                                                                                                                                                                                                                 
      <!-- this block describes the style of the body -->
      body {                                                                                                                                                                                                                                
        min-width: 357px;                                                                                                                                                                                                                   
        overflow-x: hidden;                                                                                                                                                                                                                 
      }                                                                                                                                                                                                                                     
    </style>
  </head>
  <!-- this block contains the primary content of the page -->
  <body>
    <h1 style="color:black">Hello, world!</h1>
  </body>
</html>
```

## Running your Chrome extension

To run your Chrome extension, go to chrome://extensions in your Chrome browser. Click the checkbox next to "Developer mode" in the top right, then click “Load unpacked extension...” button. Select the folder that your manifest and html files are in. You should see your extension appear in the list of extensions below.

If you see a pop-up with an error message, it propably means that you mis-typed something in one of the files. See if you can figure out what you did wrong by reading the error message. Once you think you've fixed the problem, click the checkbox next to "Enable" near your extension and then click "Reload." Don't hesitate to ask for help if you get stuck. To ask for help, you can put your name in THIS QUEUE and a volunteer will come find you.

Once your extension is installed successfully, you should see a puzzle-piece icon in the top right of your Chrome browser. Click it!

## See what you can do!

  - Say "Hello, [your name]!" instead of "Hello, world!"
  - Change the color of the text.
