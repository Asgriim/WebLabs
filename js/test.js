function test(){
    let yField = document.getElementById("yField");
    let y = yField.value;
    console.log(/\p{L}/u.test(y))
}
