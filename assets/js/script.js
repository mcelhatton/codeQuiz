var box = document.querySelector(".box");
box.setAttribute("data-state", "hidden")

var container = document.querySelector(".container");

container.addEventListener("click", function(event) {
  var element = event.target;

  // TODO: Complete function
  if (element.dataset.state == "hidden") {
    element.setAttribute("data-state", "shown");
    element.textContent = element.dataset.number;
  } else {
    element.setAttribute("data-state", "hidden");
    element.textContent = "";
  }
  
});