function appendValue(val) {
  document.getElementById("problem").value += val;
}

function clearAll() {
  document.getElementById("problem").value = "";
  document.getElementById("answer").value = "";
}

function deleteLast() {
  let problem = document.getElementById("problem");
  problem.value = problem.value.slice(0, -1);
}

async function calculate() {
  try {
    let expr = document.getElementById("problem").value;
    // Replace symbols with JS operators
    expr = expr.replace(/×/g, "*");
    expr = expr.replace(/÷/g, "/");

    // Call MathJS API
    const response = await fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`);
    const result = await response.text();

    document.getElementById("answer").value = result;
  } catch (e) {
    document.getElementById("answer").value = "Error";
  }
}

// Keyboard support
document.addEventListener("keydown", function(event) {
  const problem = document.getElementById("problem");

  if ((event.key >= '0' && event.key <= '9') || 
      ['+', '-', '*', '/', '.', '(', ')'].includes(event.key)) {
    problem.value += event.key;
  }

  if (event.key === "Enter") calculate();
  if (event.key === "Backspace") deleteLast();
  if (event.key === "Escape") clearAll();
});
