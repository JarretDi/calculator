let n1;
let op;
let n2;

function roundTo3(num) {
    return Math.round(num * 1000) / 1000;
}

function add(n1, n2) {
    return roundTo3(n1 + n2);
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

    // update display?
    return op(n1, n2);
}