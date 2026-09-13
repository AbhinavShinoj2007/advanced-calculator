function appendValue(val) {
  document.getElementById("display").value += val;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteLast() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
  } catch (e) {
    alert("Invalid Expression");
  }
}

// ✅ Keyboard support
document.addEventListener("keydown", function(event) {
  const display = document.getElementById("display");

  // Allow numbers, operators, brackets, decimal
  if ((event.key >= '0' && event.key <= '9') || 
      ['+', '-', '*', '/', '.', '(', ')'].includes(event.key)) {
    display.value += event.key;
  }

  // Enter key = calculate
  if (event.key === "Enter") {
    calculate();
  }

  // Backspace = delete last character
  if (event.key === "Backspace") {
    deleteLast();
  }

  // Escape = clear
  if (event.key === "Escape") {
    clearDisplay();
  }
});
