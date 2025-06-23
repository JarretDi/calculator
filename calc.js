let state = 1;
/*
    state should be one-of:
    1
    2
    ERROR
*/

let n1;
let op;
let n2;

const display = document.querySelector(".display");

function updateDisplay() {
    switch (state) {
        case 1:
            display.textContent = n1 ? n1 : "";
            break;
        case 2:
            display.textContent = n2 ? n2 : "";
            break;
        case "ERROR":
            display.textContent = "ERROR";
    }
}

function roundTo3(num) {
    return Math.round(num * 1000) / 1000;
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

function operate() {
    if (!(n1 && op && n2)) {
        return "ERROR";
    }

    n1 = op(n1, n2);
    op = undefined;
    n2 = undefined;
    state = 1;

    updateDisplay();

    return op(n1, n2);
}

const numbers = document.querySelector(".numbers");
numbers.addEventListener("click", (e) => {
    const num = e.target.className;
    if (num === "numbers") return;

    if (state === 1) {
        if (n1 === undefined) {
            if (num === ".") {
                n1 = "0.";
            } else {
                n1 = num
            }
        } else {
            if (num === "." && !n1.includes(".")) {
                n1 += num;
            } else if ("0123456789".includes(num)) {
                n1 += num;
            }
        }
    } else if (state === 2) {
        if (n2 === undefined) {
            if (num !== ".") {
                n2 = num;
            } else {
                n2 = "0.";
            }
        } else {
            if (num === "." && !n2.includes(".")) {
                n2 += num;
            } else if ("0123456789".includes(num)) {
                n2 += num;
            }
        }
    }
    updateDisplay();
});