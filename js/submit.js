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
        let attempt = parseInt(localStorage.getItem("attempt")) + 1
        localStorage.setItem("attempt",attempt)
        let row = {
            attmp:attempt,
            R:r,
            X:x,
            Y:y,
            hit:json.hit,
            date:json.date,
            scriptTime:json.scriptTime
        }
        localStorage.setItem("attempt" + attempt,JSON.stringify(row))
        if (json.hit.includes("yes")){
            createRow(attempt, r, x, y, json.hit, json.date, json.scriptTime,"#fff","#50c878")
        }
        else {
            createRow(attempt, r, x, y, json.hit, json.date, json.scriptTime,"#fff","#f00")
        }
    }
}

function createRow(attempt, R, X, Y, hit, time, scriptTime,color,hitColor){
    let table = document.getElementById("table");
    let row = table.insertRow();
    // table.insertBefore()
    createCell(row.insertCell(),attempt,color)
    createCell(row.insertCell(),R,color)
    createCell(row.insertCell(),X,color)
    createCell(row.insertCell(),Y,color)
    createCell(row.insertCell(),hit,hitColor)
    createCell(row.insertCell(),time,color)
    createCell(row.insertCell(),scriptTime,color)
}

function createCell(cell,text,color){
    cell.innerText = text
    cell.style.color = color
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
