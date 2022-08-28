// TODO добавить валидацию x и r
sessionStorage.setItem("attempt","0")
let yField = document.getElementById("yField");
let submitButton = document.getElementById("submitButton")
// TODO добавить валидацию буккаф
function validateY(){
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
        return;
    }
    submitButton.disabled = true
}
function hasLetter(str){
    return /\p{L}/u.test(str);
}
// let yField = document.getElementById("yField")
// console.log(yField)
yField.addEventListener("input",validSubmit)