walk(document.body);

var haveAlerted = 0;

function walk(node) 
{
    var child, next;
    
    switch ( node.nodeType )  
	{
	case 1:  // Element
	case 9:  // Document
	case 11: // Document fragment
	    child = node.firstChild;
	    while ( child ) 
		{
		    next = child.nextSibling;
		    walk(child);
		    child = next;
		}
	    break;
	    
	case 3: // Text node
	    handleText(node);
	    break;
	}
}

function handleText(textNode) 
{
    var v = textNode.nodeValue;
    
    v = v.replace(/\bLizard\b/g, "Dinosaur");
    v = v.replace(/\blizard\b/g, "dinosaur");
    v = v.replace(/\bLizards\b/g, "Dinosaurs");
    v = v.replace(/\blizards\b/g, "dinosaurs");

    if ((v.indexOf("dinosaur") != -1 || v.indexOf("Dinosaur") != -1) && !haveAlerted) {
	alert("WARNING! This page contains dinosaurs!");
	haveAlerted = 1;
    }
    
    textNode.nodeValue = v;
}