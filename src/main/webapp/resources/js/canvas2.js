function Point(x,y,r,hit){
    this.x = x
    this.y = y
    this.r = r;
    this.hit = hit
}
let points = []
function savePoint(point){
    points.push(point)
}
const pointColorPrev ="#2d2b2b"
const pointColorHit = "#0af80a"
const pointColorMiss = "#fc0202"
const submitButton = document.getElementById("mainForm:submitButtonID")
const canvasDiv = document.getElementById("canvasDiv")
const canvas = document.getElementById("canvas")
const context2d  = canvas.getContext("2d")
const height = canvasDiv.clientHeight
const width = canvasDiv.clientWidth
const offset =  ((width - 20) / 2) / 5
canvas.width = width
canvas.height = height
context2d.translate(width / 2, height / 2)
context2d.scale(1,-1);
function clearCanvas(){
    context2d.clearRect(-width / 2,-height / 2,width,height)
}
function drawCanvas(){
    context2d.beginPath()
    context2d.fillStyle = "#ffffff"
    context2d.fillRect(-width / 2,-height / 2,width,height)
    context2d.closePath()
}
function drawAxes(){
    // let context = canvas.getContext("2d")
    // context2d.beginPath()
    context2d.beginPath()
    context2d.moveTo(0,0)

    // console.log("offset " + offset)
    const lineLen = 2
    context2d.strokeStyle = "#000000"
    context2d.lineWidth = 2;
    context2d.moveTo(-width / 2,0)
    context2d.lineTo(width,0)
    context2d.stroke()
    let start = -width / 2 + 10
    for (let i = 0 ; i < (width - 10); i += offset){
        context2d.moveTo(start + i, lineLen)
        context2d.lineTo(start  + i, -lineLen)
        context2d.stroke()
    }
    context2d.moveTo(0,height / 2)
    context2d.lineTo(0, -height / 2)
    context2d.stroke()
    start = -height / 2 + 10
    for (let i = 0 ; i < (height - 10); i += offset){
        context2d.moveTo(lineLen,start + i)
        context2d.lineTo(-lineLen, start + i)
        context2d.stroke()
    }
    context2d.closePath()

}
function drawFigures(r){
    context2d.beginPath()
    context2d.moveTo(0,0)

    context2d.fillStyle = "#3399ff"
    context2d.strokeStyle = "transparent"
    context2d.lineWidth = 1;
    context2d.fillRect(0,0,offset * r, -offset * (r / 2))
    context2d.moveTo(offset * -r/2,0)
    context2d.lineTo(0,offset * r)
    context2d.lineTo(0,0)
    context2d.fill()
    context2d.moveTo(0,0)
    context2d.arc(0,0,(r / 2) * offset,Math.PI,Math.PI * (3/2),false)
    context2d.stroke()
    context2d.fill()
    context2d.closePath()

}
function drawText(r) {
    context2d.beginPath()
    context2d.scale(1,-1);
    context2d.moveTo(0,0)
    context2d.font = "bold 20px serif"
    context2d.fillStyle = "#000000"
    context2d.fillText("R",r * offset - 10,20,40)
    context2d.fillText("R",-r * offset -3,20,40)
    context2d.fillText("R",10,r * offset - 10,40)
    context2d.fillText("R",10,-r * offset + 5,40)
    context2d.closePath()
    context2d.scale(1,-1);
}
function redrawCanvas(r){
    clearCanvas()
    drawCanvas()
    drawFigures(r)
    drawText(r)
    drawAxes()
    drawPoints(r)
}
function parseTable(){
    let rows = document.getElementById("mainForm:mainTable_data").getElementsByTagName("tr");
    if(rows.item(0).className === "ui-widget-content ui-datatable-empty-message"){
        return
    }
    points = []
    for (let i = 0; i < rows.length; i++){
        let cells = rows.item(i).getElementsByTagName("td")
        let x = Number.parseFloat(cells.item(0).innerText);
        let y = Number.parseFloat(cells.item(1).innerText)
        let r = Number.parseFloat(cells.item(2).innerText)
        let hit = cells.item(3).innerText === "YES"
        let point = new Point(x,y,r,hit)
        points.push(point)
    }
    console.log("parsed")
    console.log(points)
}
function drawPoint(point,color,r){
    //denormalize
    prevR = point.r

    let x = ((point.x / prevR)* r) * offset
    let y = ((point.y / prevR)* r) * offset
    console.log("x: " + x )
    console.log("y: " + y )
    context2d.beginPath()
    context2d.moveTo(0,0)
    context2d.fillStyle = color
    context2d.arc(x,y,4,0,Math.PI * 2)
    context2d.fill()
    context2d.closePath()
}
function drawPoints(r){
    // console.log(points)
    points.forEach((item,i, points) => {
        if (Number.parseFloat($('input[type=hidden][id="mainForm:rInput_input"]').val().replace(",",".")) !== item.r){
            drawPoint(item,pointColorPrev,r)
        }
        else {
            if (item.hit){
                drawPoint(item,pointColorHit,r)
            }
            else {
                drawPoint(item,pointColorMiss,r)
            }
        }
    })
}

// parseTable();
// // $("").click(function (){
// //     console.log("event")
// // })
$('input[type=hidden][id="mainForm:rInput_input"]').change(function (){
    console.log(Number.parseFloat($('input[type=hidden][id="mainForm:rInput_input"]').val().replace(",",".")))
    redrawCanvas($('input[type=hidden][id="mainForm:rInput_input"]').val().replace(",","."))
})
// $('input[type=hidden][id="mainForm:rInput_input"][class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all ui-state-filled"]')
//     .change(function() {
//         console.log(Number.parseFloat($('input[type=hidden][id="mainForm:rInput_input"][class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all ui-state-filled"]').val()))
//     redrawCanvas(Number.parseFloat($('input[type=hidden][id="mainForm:rInput_input"][class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all ui-state-filled"]').val()))
// });
function submit(x,y,r){
    if (x < -5 || x > 5){
        alert("invalid x parameter")
        console.log("invalid x parameter")
        return;
    }
    if (y < -5 || y > 3){
        alert("invalid y parameter")
        console.log("invalid y parameter")
        return
    }
    let prevY = $('input[type=text][id="mainForm:yInput"]').val()
    let prevX = $('input[type=hidden][id="mainForm:txt2_hinput"]').val()
    let prevR = $('input[type=hidden][id="mainForm:rInput_input"]').val()
    $('input[type=hidden][id="mainForm:rInput_input"]').val(r);
    $('input[type=hidden][id="mainForm:txt2_hinput"]').val(x);
    $('input[type=text][id="mainForm:yInput"]').val(y);
    if (submitButton.disabled){
        submitButton.disabled = false;
        submitButton.click()
        submitButton.disabled = true;
    }
    else {
        submitButton.click()
    }
    $('input[type=hidden][id="mainForm:rInput_input"]').val(prevR);
    $('input[type=hidden][id="mainForm:txt2_hinput"]').val(prevX);
    $('input[type=text][id="mainForm:yInput"]').val(prevY);
}
$("#canvas").click(function (event){
    let x = event.pageX - this.offsetLeft - width / 2
    let y = - (event.pageY - this.offsetTop - height / 2)
    // normalize
    x /= offset
    y /= offset
    let r = Number.parseFloat($('input[type=hidden][id="mainForm:rInput_input"]').val().replace(",","."))
    submit(x.toFixed(4),y.toFixed(4),r.toFixed(4))
    // console.log(r)
    // redrawCanvas(r)
    // submitButton.click()
})
let lastRowNumber = 0
function updateAll(){
    let r = Number.parseFloat($('input[type=hidden][id="mainForm:rInput_input"]').val().replace(",","."))
    parseTable()
    redrawCanvas(r)
}
function checkUpdate(){
    let rows = document.getElementById("mainForm:mainTable_data").getElementsByTagName("tr");
    if (lastRowNumber !== rows.length && rows.item(0).className !== "ui-widget-content ui-datatable-empty-message"){
        console.log("updating")
        updateAll()
        lastRowNumber = rows.length
    }
}
function resetAll(){
    console.log("reseting")
    points = []
    redrawCanvas(Number.parseFloat($('input[type=hidden][id="mainForm:rInput_input"]').val().replace(",",".")))
    lastRowNumber = 0;
    parseTable()
}
setInterval(function (){
    checkUpdate()
},200)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///end of work with canvas
//////////////////////////////////////////////////////////////////////////////////////////////
function validateY(Y){
    // if (hasLetter(Y)){
    //     return false
    // }
    // let y = Y.replace(",",".")
    let y = Y
    // console.log(y)
    // let y = parseFloat(Y)
    if(y === parseFloat(y).toString()) {
        if (y < -5 || y > 3 || Number.isNaN(y)) {
            return false
        }
        return true
    }
    return false
}
function validSubmit(){
    console.log("validating")
    let y =  $('input[type=text][id="mainForm:yInput"]').val();
    if(validateY(y)){
        submitButton.disabled = false;
        submitButton.style.borderColor = "transparent";
        return
    }
    submitButton.style.borderColor = "#ff0000";
    submitButton.disabled = true
}
$('input[type=text][id="mainForm:yInput"]').change(function (){
    validSubmit()
})
submitButton.disabled = false