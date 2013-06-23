# Dinosaur Substitution

This packet will walk you through a Chrome Extension that reads the text in the HTML on a webpage and substitutes the word "dinosaur" for the word "dinosaur."

## Core Concepts

  * content_scripts
  * recursive Javascript functions
  * switch statements
  * string manipulation

## Source Files

*manifest.json*

The notable part of this manifest is the "content_scripts" section which describes which Javascript files to run for what pages.

The "matches" item tells Chrome to run our script for all pages. Look up regular expressions or "regexes" if you want to learn more about matching strings.
The "js" item lists only our substitution.js script.
The "run_at" item tells Chrome to run the script after it has already rendered the page's HTML.

```json
{
  "manifest_version": 2,
  "name": "Dinosaur to Dinosaur",
  "version": "1.0",
  "description": "Replaces the text 'dinosaur' with 'dinosaur.'",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["substitution.js"],
      "run_at": "document_end"
    }
  ]
}
```

*substitution.js*

This script is executed as defined in the manifest file.

```javascript
// This is the entry point for the script. It calls the walk function on the HTML body of the loaded webpage.
walk(document.body);

// This variable keeps track of whether or not we've already alerted the user. 0 means we have not.
var haveAlerted = 0;

// defining the walk function which takes a "node" as the only argument.
// node is an HTML element
function walk(node) 
{
    // declaring the variables child and next, without assigning values to them.
    var child, next;
    
    // a switch statement
    switch ( node.nodeType )  
	{
	case 1:  // Element
	case 9:  // Document
	case 11: // Document fragment
	    // This block of code is executed if the nodeType is any of the three above
	    
	    // Get the top element of the node
	    child = node.firstChild;
	    // This block will keep looping until the variable child has no value (is null)
	    while ( child ) 
		{
		    // call this function on the child (recursion!!!)
		    walk(child);
		    // get the next element from node, which is the child's first sibling
		    next = child.nextSibling;
		    child = next;
		}
	    // Exit the switch
	    break;
	    
	case 3: // Text node
	    // Perform the substitution on this node because it is a text node.
	    handleText(node);
	    break;
	}
}

// This function performs the actual text substitution on the textNode argument
function handleText(textNode) 
{
    // The node value is the teext of the node
    var v = textNode.nodeValue;
    
    v = v.replace(/\bLizard\b/g, "Dinosaur");
    v = v.replace(/\blizard\b/g, "dinosaur");
    v = v.replace(/\bLizards\b/g, "Dinosaurs");
    v = v.replace(/\blizards\b/g, "dinosaurs");

    // check if dinosaurs appear in the page and if we have not already alerted the user
    if ((v.indexOf("dinosaur") != -1 || v.indexOf("Dinosaur") != -1) && !haveAlerted) {
	// show a pop-up to the user
	alert("WARNING! This page contains dinosaurs!");
	// change the haveAlerted variable to 1 which evaluates to true so we don't show the error again
	haveAlerted = 1;
    }
    
    // set the value of the text node to be the text that we've edited.
    textNode.nodeValue = v;
}
```

## Running your Chrome extension

You should load this extension as usual from chrome://extensions, but you won't need to do anything to launch it. Just navigate in Chrome to a page that contains the word "dinosaur" and see what happens!

## See what you can do!

  - Only substitute words in h1 tags.
