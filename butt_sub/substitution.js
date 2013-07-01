// This is the entry point for the script. It calls the walk function on the HTML body of the loaded webpage.
walk(document.body);

// This variable keeps track of whether or not we've already alerted the user.
var haveAlerted = false;

// defining the walk function which takes a "node" as the only argument.
// node is an HTML element
function walk(node) 
{
    // declaring the variables child and next, without assigning values to them.
    var child, next;
    
    // a switch statement
    switch (node.nodeType)
    {
      case 1:  // Element
      case 9:  // Document
      case 11: // Document fragment
      // This block of code is executed if the nodeType is any of the three above
      // Get the top element of the node
      child = node.firstChild;
      // This block will keep looping until the variable child has no value (is null)
      while (child)
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
    // The nodeValue attribute is the text that is inside the node.
    var v = textNode.nodeValue;
    
    v = v.replace(/\bLizard\b/g, "Dinosaur");
    v = v.replace(/\blizard\b/g, "dinosaur");
    v = v.replace(/\bLizards\b/g, "Dinosaurs");
    v = v.replace(/\blizards\b/g, "dinosaurs");

    // check if dinosaurs appear in the page and if we have not already alerted the user
    if ((v.indexOf("dinosaur") != -1 || v.indexOf("Dinosaur") != -1) && !haveAlerted) {
      // show a pop-up to the user
      alert("WARNING! This page contains dinosaurs!");
      // change the haveAlerted variable to true so we don't show the error again
      haveAlerted = true;
    }
    
    // set the value of the text node to be the text that we've edited.
    textNode.nodeValue = v;
}
