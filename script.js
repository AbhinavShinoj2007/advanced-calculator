function appendValue(val) {
  let problem = document.getElementById("problem");
  problem.value += val;
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

// ✅ Keyboard support (fixed duplication)
document.addEventListener("keydown", function(event) {
  const problem = document.getElementById("problem");

  // Only handle keyboard input if the user is NOT typing directly in the box
  if (document.activeElement.id === "problem") return;

  if ((event.key >= '0' && event.key <= '9') || 
      ['+', '-', '*', '/', '.', '(', ')'].includes(event.key)) {
    problem.value += event.key;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    calculate();
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    deleteLast();
  }
  if (event.key === "Escape") {
    clearAll();
  }
});
