function appendValue(val) {
  let problem = document.getElementById("problem");
  let lastChar = problem.value.slice(-1);

  // Prevent duplicate operators like ++, --, **, //
  if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(val)) {
    return;
  }

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
    expr = expr.replace(/×/g, "*").replace(/÷/g, "/");

    const response = await fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`);
    const result = await response.text();

    document.getElementById("answer").value = result;
  } catch (e) {
    document.getElementById("answer").value = "Error";
  }
}

// ✅ Keyboard support (no duplication + validation)
document.addEventListener("keydown", function(event) {
  const problem = document.getElementById("problem");

  // If typing directly in the input box, let browser handle it
  if (document.activeElement.id === "problem") return;

  let lastChar = problem.value.slice(-1);

  if ((event.key >= '0' && event.key <= '9') || ['.', '(', ')'].includes(event.key)) {
    problem.value += event.key;
  }

  if (['+', '-', '*', '/'].includes(event.key)) {
    if (['+', '-', '*', '/'].includes(lastChar)) return;
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
