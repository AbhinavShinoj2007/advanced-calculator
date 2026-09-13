function appendValue(val) {
  document.getElementById("display").value += val;
}

function clearDisplay() {
  document.getElementById("display").value = "";
  document.getElementById("result").innerText = "";
}

function deleteLast() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expr = document.getElementById("display").value;
    // Replace symbols with JS operators
    expr = expr.replace(/×/g, "*");
    expr = expr.replace(/÷/g, "/");
    let result = eval(expr);

    // Show result on a new line
    document.getElementById("result").innerText = "= " + result;
  } catch (e) {
    alert("Invalid Expression");
  }
}

// Keyboard support
document.addEventListener("keydown", function(event) {
  const display = document.getElementById("display");

  if ((event.key >= '0' && event.key <= '9') || 
      ['+', '-', '*', '/', '.', '(', ')'].includes(event.key)) {
    display.value += event.key;
  }

  if (event.key === "Enter") calculate();
  if (event.key === "Backspace") deleteLast();
  if (event.key === "Escape") clearDisplay();
});
