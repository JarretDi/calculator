let state = 1;
/*
    state should be one-of:
    1
    2
    ERROR
*/

let n1 = "";
let op = null;
let n2 = "";

const display = document.querySelector(".display");

function updateDisplay() {
    switch (state) {
        case 1:
            display.textContent = n1 ? n1 : "0";
            break;
        case 2:
            display.textContent = n2 ? n2 : "0";
            break;
        case "ERROR":
            display.textContent = "ERROR";
    }
}

function roundTo3(num) {
    return "" + (Math.round(num * 1000) / 1000);
}

function add(n1, n2) {
    return roundTo3(+n1 + +n2);
}

function sub(n1, n2) {
    return roundTo3(n1 - n2);
}

function mult(n1, n2) {
    return roundTo3(n1 * n2);
}

function div(n1, n2) {
    return (n2 !== 0) ? roundTo3(n1 / n2) : "ERROR";
}

function operate(nextOp) {
    if (!(n1 && op && n2)) {
        state = "ERROR";
        updateDisplay();
        return "ERROR";
    }

    n1 = op(n1, n2);
    op = (nextOp === "=") ? null : nextOp;
    n2 = "";
    state = 1;
    updateDisplay();
    if (nextOp !== "=") state = 2;
}

const numbers = document.querySelector(".numbers");
numbers.addEventListener("click", inputNum);

function inputNum(e) {
    const num = e.target.className;
    if (num === "numbers") return;

    if (state === 1) {
        if (num === ".") {
            if (n1.length === 0) {
                n1 = "0.";
            } else if (!n1.includes(".")) {
                n1 += "."
            }
        } else if (num === "-" && n1.length === 0) {
            n1 = "-";
        } else if ("0123456789".includes(num)) {
            n1 += num;
        }
    } else if (state === 2) {
        if (num === ".") {
            if (n2.length === 0) {
                n2 = "0.";
            } else if (!n2.includes(".")) {
                n2 += "."
            }
        } else if (num === "-" && n2.length === 0) {
            n2 = "-";
        } else if ("0123456789".includes(num)) {
            n2 += num;
        }
    }
    updateDisplay();
}

const operations = document.querySelector(".operations");
operations.addEventListener("click", enterOperation);

function enterOperation(e) {
    const nextOp = getOperation(e.target.className);
    if (nextOp === "ERROR") {
        return;
    }

    if (state === 1) {
        if (!n1 || n1[n1.length] === "." || n1 === "-" || nextOp === "=") {
            state = "ERROR";
            updateDisplay();
            return;
        } else {
            op = nextOp;
            state = 2;
        }
    } else if (state === 2) {
        if (!n2) {
            state = "ERROR";
            updateDisplay();
            return;
        } else {
            operate(nextOp);
        }
    }
}

function getOperation(opName) {
    switch (opName) {
        case "+":
            return add;
        case "-":
            return sub;
        case "x":
            return mult;
        case "/":
            return div;
        case "=":
            return "=";
        default:
            return "ERROR"
    }
}

const del = document.querySelector(".del");
del.addEventListener("click", delNum);

function delNum() {
    if (state === 1) {
        n1 = n1.substring(0, n1.length - 1);
    } else {
        n2 = n2.substring(0, n2.length - 1);
    }
    updateDisplay();
}

const clear = document.querySelector(".clear");
clear.addEventListener("click", clr);

function clr() {
    n1 = "";
    op = null;
    n2 = "";
    state = 1;
    updateDisplay();
}