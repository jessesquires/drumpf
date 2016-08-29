//
//  Created by Jesse Squires
//  http://www.jessesquires.com
//
//
//  GitHub
//  https://github.com/jessesquires/drumpf
//
//
//  License
//  Copyright (c) 2016 Jesse Squires
//  Released under an MIT license: http://opensource.org/licenses/MIT
//

document.addEventListener("DOMContentLoaded", function(event) {
    replace(document.body, "Trump", "Drumpf");
});

function replace(node, word, replacement) {
    switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            // We don't want to replace text in an input field or text area.
            if (node.tagName.toLowerCase() === "input" || node.tagName.toLowerCase() === "textarea") {
                return;
            }

        // For other types of element nodes, fall through to iterate over their children.
        case Node.DOCUMENT_NODE:
        case Node.DOCUMENT_FRAGMENT_NODE:
            // If the node is a container node, iterate over all the children and recurse into them.
            var child = node.firstChild;
            var next = undefined;
            while (child) {
                next = child.nextSibling;
                replace(child, word, replacement);
                child = next;
            }
            break;
        case Node.TEXT_NODE:
            // If the node is a text node, perform the text replacement.
            replaceTextInTextNode(node, word, replacement);
            break;
    }
}

function replaceTextInTextNode(textNode, word, replacement) {
    if (textNode.nodeType !== Node.TEXT_NODE || !textNode.nodeValue.length) {
        return;
    }

    // Generate a regular expression object to perform the replacement.
    var expressionForWordToReplace = new RegExp(word, "gi");
    var nodeValue = textNode.nodeValue;
    var newNodeValue = nodeValue.replace(expressionForWordToReplace, replacement);

    // Perform the replacement in the DOM if the regular expression had any effect.
    if (nodeValue !== newNodeValue) {
        textNode.nodeValue = newNodeValue;
    }
}
