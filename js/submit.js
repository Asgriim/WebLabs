let arr = [1, 1.5, 2, 2.5, 3]
function submit(){
    let xhr = new XMLHttpRequest();
    let R_select = document.getElementById("R_select");
    const r = R_select.options[R_select.selectedIndex].text;
    console.log(r);
    const y = parseFloat(document.getElementById("yField").value)
    console.log("y = " + y)
    const x = document.getElementById("currX").textContent
    if (!validateX(x) || !validateR(r)) {
        return
    }
    xhr.open("GET", "php/onHit.php?R=" + r + "&Y=" + y + "&X=" + x);
    xhr.send();
    xhr.onload = function (){
        let json = JSON.parse(xhr.responseText);
        let attempt = parseInt(sessionStorage.getItem("attempt")) + 1
        sessionStorage.setItem("attempt",attempt)
        createRow(attempt, r, x, y, json.hit, json.date, json.scriptTime)
    }
}

function createRow(attempt, R, X, Y, hit, time, scriptTime){
    let table = document.getElementById("table");
    let row = table.insertRow();
    row.insertCell().innerText = attempt;
    row.insertCell().textContent = R
    row.insertCell().textContent = X
    row.insertCell().textContent = Y
    row.insertCell().textContent = hit
    row.insertCell().textContent = time
    row.insertCell().textContent = scriptTime
}

function validateX(x){
    if (parseInt(x) < -3 || parseInt(x) > 5 || hasLetter(x)){
        alert("ERROR: INVALID X PARAMETER\n Please refresh the page")
        return false
    }
    return true;
}

function validateR(r){
    let R = parseFloat(r)
    if (!arr.includes(R) || hasLetter(r)){
        alert("ERROR: INVALID R PARAMETER\n Please refresh the page")
        return false
    }
    return true
}
