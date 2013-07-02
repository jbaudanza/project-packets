# Introduction

During this bootcamp, you will be creating applications and extensions for
Google Chrome. We want everyone to leave this bootcamp with a Google Chrome app
that they created.

If you have never written a line of code in your life, don't worry. This booklet
contains the code for several fun project. You just need to copy the code
exactly as it is written on paper into your computer.

As you do this, you are bound to make mistakes. This is normal. We hope that as
you fix your mistakes, you will also learn about coding.

You can do these projects in any order, but we recommend that you start with the
"Hello World" and "Hello World, Again" projects.

While you are working, try to think of ways you can customize these projects.
For example, you might change the colors or the styling. Or you could combine
features from multiple projects into one. Or maybe you can find some code on the
Internet that you'd like to incorporate. Be as creative as you'd like!

We would like to encourage everyone to work together and help each other as
much as possible. Learning to code is difficult, but it is much easier when
you work together.

We would also like to encourage everyone to research online. There is a wealth
of information available online for all the topics we will be covering. Here are
a few helpful sites, but feel free to google for more.

 * www.stackoverflow.com
 * developer.mozilla.org
 * www.w3schools.com
 * www.codecademy.com

# Hello World

In this project, you will first get set up with your development environment. We will be building Chrome extensions and applications, so you will need to download and install the Google Chrome browser if you do not already have it. You'll also need a way to write, save, and edit text files.

Your first extension is a Hello World Chrome extension that responds to the browser-action of clicking an icon by displaying a pop-up that says "Hello, world!"

<div class='break'></div>

## Core Concepts

  * Installing Chrome
  * Finding a text editor
  * HTML
  * Installing a Chrome Extension

## Getting Started

First, download and install the Chrome Web Browser from here: https://www.google.com/intl/en/chrome/browser/.

If you have a text editor of choice, feel free to use it. If not, we recommend the Slim Text Chrome Application, which you can get here: http://slimtext.org/. (NOTE: Along with syntax highlighting, Slim Text will also match parentheses and brackets for you.)

In the rest of this packet, we will provide you with the necessary text files for your first Chrome extensions. 

1. Create a folder on your computer called hello_world.
2. For each of the files below, create a new file in your text editor. 
3. To do this in SlimText, first open the application by clicking the green-S icon in the top right of your Chrome Browser.

![hello world](images/slimtext_new_file.png)

4. Navigate to the folder you created by clicking through the files on the left and directories above. 
5. Then open a new file by clicking the page-with-a-corner-folded-down icon, the left-most icon at the top right. 

Be sure to name the files as they appear below. Rember to save your files (NOTE: an asterisk by the file name means your changes have not been saved)!

<div class='break'></div>

## Source Files

*manifest.json*

Every Chrome extension has a manifest file. It tells Chrome which files provide the content and behavior of the extension. In this manifest file, we are telling Chrome to perform a "browser_action." In this case, the "default_popup" item specifies that a pop-up displaying the contents of hello.html should appear.

```javascript
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
  <!-- This is an HTML comment. You do not need to copy these. -->
  <head>
    <!-- This block describes the style of the body. -->
    <style>
      body {
        min-width: 357px;
        overflow-x: hidden;
      }
    </style>
  </head>
  <!-- This block contains the primary content of the page. -->
  <body>
    <h1 style="color:black">Hello, world!</h1>
  </body>
</html>
```

## Running your Chrome extension

To run your Chrome extension, 

1. Go to chrome://extensions in your Chrome browser. 
2. Click the checkbox next to "Developer mode" in the top right.
3. Then click "Load unpacked extension..." button.
4. Select the folder that your manifest and html files are in. 

You should see your extension appear in the list of extensions below.

If you see a pop-up with an error message, it propably means that you mis-typed something in one of the files. See if you can figure out what you did wrong by reading the error message. Once you think you've fixed the problem, click the checkbox next to "Enable" near your extension and then click "Reload." Don't hesitate to ask for help if you get stuck. To ask for help, find a volunteer or ask for help in the d-code chat room.

Once your extension is installed successfully, you should see a puzzle-piece icon in the top right of your Chrome browser. Click it!

## See what you can do!

  - Say "Hello, [your name]!" instead of "Hello, world!"
  - Change the color of the text.
