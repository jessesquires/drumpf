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

var altNames = [
    "Turncoat Donald Trump",
    "Predator of the United States Trump",
    "Agent of Russia Donald Trump",
    "Sexist Trump",
    "Sexual Predator Trump",
    "Fascist in Chief Donald Trump",
    "White Supremacist Trump",
    "Liar Donald Trump",
    "Child Murderer Donald Trump",
    "Misogynist Trump",
    "Racist Donald Trump",
    "Homophobic Donald Trump",
    "Nazi Donald Trump",
    "Pathological Liar Donald Trump",
    "Adulterer Donald Trump",
    "Con-artist Donald Trump",
    "Fake Billionaire Trump",
    "TV President Trump",
    "Vladimir Putin's Bitch Donald Trump",
    "Traitor Donald Trump",
    "Terrible President Trump",
    "Businessman Failure Donald Trump",
    "Inexperienced President Trump",
    "Uneducated President Trump",
    "National Disgrace Donald Trump",
    "Incompetent Donald Trump",
]

var replacedNodes = [];

document.addEventListener("DOMContentLoaded", function(event) {
    var fakeNames = [
        "President Donald J Trump",
        "President Donald J. Trump",
        "President Donald Trump",
        "President Trump",
        "Donald John Trump",
        "Donald J Trump",
        "Donald J. Trump",
        "Donald Trump",
        "Trump"
    ];

    for (var i = 0; i < fakeNames.length; i++) {
        var name = fakeNames[i];
        replace(document.body, name, randomAltName);
    }
});

function randomAltName() {
    var min = 0;
    var max = altNames.length - 1;
    var randomIndex =  Math.floor(Math.random() * (max - min)) + min;
    return altNames[randomIndex];
}

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

    if (replacedNodes.indexOf(textNode) != -1) {
        // Already replaced this node
        return;
    }

    // Generate a regular expression object to perform the replacement.
    var expressionForWordToReplace = new RegExp(word, "gi");
    var nodeValue = textNode.nodeValue;

    var newWord = replacement();
    var newNodeValue = nodeValue.replace(expressionForWordToReplace, newWord);

    // Perform the replacement in the DOM if the regular expression had any effect.
    if (nodeValue !== newNodeValue) {
        textNode.nodeValue = newNodeValue;

        // Track what was replaced
        replacedNodes.push(textNode);
    }
}
