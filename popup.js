// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor"); // grab the button by its id

chrome.storage.sync.get("color", ({ color }) => { // grab the user prefered color from storage
  changeColor.style.backgroundColor = color; // apply the prefered color to the button background
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => { // when user clicks the button
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); // get the current active tab

  chrome.scripting.executeScript({ // execute a script
    target: { tabId: tab.id }, // target the active tab
    function: setPageBackgroundColor, // set page background color
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => { // grab the user prefered color from storage
    document.body.style.backgroundColor = color; // set body background color to color
  });
}
