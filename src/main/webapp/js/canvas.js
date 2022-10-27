function Point(x,y,color){
    this.x = x
    this.y = y
    this.color = color
}
let points = []
function savePoint(point){
    points.push(point)
}
const canvasDiv = document.getElementById("canvasDiv")
const canvas = document.getElementById("canvas")
const context2d  = canvas.getContext("2d")
const height = canvasDiv.clientHeight
const width = canvasDiv.clientWidth
const offset =  ((width - 20) / 2) / 5
canvas.width = width
canvas.height = height
context2d.translate(width / 2, height / 2)
// console.log(height)
// console.log(width)
context2d.scale(1,-1);
function clearCanvas(){
    context2d.clearRect(-width / 2,-height / 2,width,height)
}
function drawCanvas(){
    context2d.fillStyle = "#ffffff"
    context2d.fillRect(-width / 2,-height / 2,width,height)
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
    context2d.fillRect(0,0,offset * r, offset * (r / 2))
    context2d.moveTo(offset * -r,0)
    context2d.lineTo(0,offset * (r / 2))
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
    context2d.fillText("R",r * offset - 3,20,40)
    context2d.fillText("R",-r * offset -3,20,40)
    context2d.fillText("R",10,r * offset + 3,40)
    context2d.fillText("R",10,-r * offset + 3,40)
    context2d.closePath()
    context2d.scale(1,-1);
}
function redrawCanvas(r){
    if (!validateR(r)){
        alert("INVALID R\nPlease refresh the page")
    }
    clearCanvas()
    drawCanvas()
    drawFigures(r)
    drawText(r)
    drawAxes()
    drawPoints()
}
function drawPoint(point){
    //denormalize
    let x = point.x * offset
    let y = point.y * offset
    context2d.beginPath()
    context2d.moveTo(0,0)
    context2d.fillStyle = point.color
    context2d.arc(x,y,4,0,Math.PI * 2)
    context2d.fill()
    context2d.closePath()
}
function drawPoints(){
    // console.log(points)
    points.forEach((item,i, points) => {
        drawPoint(item)
    })
}
// $("").click(function (){
//     console.log("event")
// })
$('input[type=radio][name="R_radio"]').change(function() {
    redrawCanvas($('input[type=radio][name="R_radio"]:checked').val())
});
$("#canvas").click(function (event){
    let x = event.pageX - this.offsetLeft - width / 2
    let y = - (event.pageY - this.offsetTop - height / 2)
    // normalize
    x /= offset
    y /= offset
    let r = $('input[type=radio][name="R_radio"]:checked').val()
        submit(r,x,y)

})

// redrawCanvas($('input[type=radio][name="R_radio"]:checked').val())