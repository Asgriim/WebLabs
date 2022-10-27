
let yField = document.getElementById("yField");
let submitButton = document.getElementById("submitButton")
submitButton.style.borderColor = "#f00";
submitButton.style.color = "#f00"
function validateY(Y){
    // if (hasLetter(Y)){
    //     return false
    // }
    // let y = Y.replace(",",".")
    let y = Y
    // console.log(y)
    // let y = parseFloat(Y)
    if(y === parseFloat(y).toString()) {
        if (y < -3 || y > 3 || Number.isNaN(y)) {
            return false
        }
        return true
    }
    return false
}

function validateX(x){
    let x_term = parseFloat(x);
    if ( x_term < -5.0 || x_term > 3.0){
        alert("ERROR: INVALID X PARAMETER\n Try again")
        return false
    }
    return true;
}

function validateR(r){
    let R = parseFloat(r)
    if (!r_arr.includes(R) || hasLetter(r)){
        alert("ERROR: INVALID R PARAMETER\n Try again")
        return false
    }
    return true
}

function validSubmit() {
    let y = yField.value
    if (validateY(y)){
        submitButton.disabled = false
        submitButton.style.borderColor = "#50c878";
        submitButton.style.color = "#50c878"
        return;
    }
    submitButton.style.borderColor = "#f00";
    submitButton.style.color = "#f00"
    submitButton.disabled = true
}
function hasLetter(str){
    return /\p{L}/u.test(str) || str.includes(",");
}
yField.addEventListener("input",validSubmit)

