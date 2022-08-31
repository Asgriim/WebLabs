sessionStorage.setItem("attempt","0")
let yField = document.getElementById("yField");
let submitButton = document.getElementById("submitButton")
submitButton.style.borderColor = "#f00";
submitButton.style.color = "#f00"
function validateY(){
    console.log(yField.value)
    if (hasLetter(yField.value)){
        return false
    }
    let y = parseFloat(yField.value)
    console.log(y)
    if (y < -5 || y > 5 || Number.isNaN(y)){
        console.log(false);
        return false
    }
    console.log(true);
    return true
}

function validSubmit() {
    if (validateY()){
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