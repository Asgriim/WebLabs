const x_arr = [-5,-4,-3,-2,-1,0,1,2,3]
const r_arr = [1,2,3,4,5]
let obj = new Object()


function submitOnClick(){
    const x_select = document.getElementById("X_select");
    const x = x_select.options[x_select.selectedIndex].text;
    console.log("x : " + x)
    const y = parseFloat(document.getElementById("yField").value)
    console.log("y : " + y)
    const r_radio = document.getElementsByName("R_radio")
    let r
    for (let i = 0; i <r_radio.length; i++){
        if (r_radio[i].checked){
            r = r_radio[i].value;
        }
    }
    console.log(r)
    submit(r,x,y)
}

function submit(r,x,y){

    let xhr = new XMLHttpRequest();
    if (!validateX(x.toString()) || !validateR(r.toString()) || !validateY(y.toString())) {
        return
    }
    xhr.open("GET", "./controller?R=" + r + "&Y=" + y + "&X=" + x);
    xhr.send();
    xhr.onload = function (){
        console.log(xhr.responseText)
        let json = JSON.parse(xhr.responseText);
        let hitColor
        if (json.hit.includes("yes")){
            hitColor = "#129212"
        }
        else
            hitColor = "#f00"
        createRow( r, x, y, json.hit, json.date, json.scriptTime,"#fff",hitColor)
        let point = new Point(x,y,hitColor)
        drawPoint(point)
        savePoint(point)
        // if (json.hit.includes("yes")){
        //     createRow( r, x, y, json.hit, json.date, json.scriptTime,"#fff","#129212")
        //     drawPoint(x,y,"#129212")
        //     savePoint(x,y,"#129212")
        // }
        // else {
        //     createRow( r, x, y, json.hit, json.date, json.scriptTime,"#fff","#f00")
        //     drawPoint(x,y,"#f00")
        //     savePoint(x,y,"#f00")
        // }
    }
}

function createRow(R, X, Y, hit, time, scriptTime,color,hitColor){
    let table = document.getElementById("main_tbody");
    let row = table.insertRow();
    // table.insertBefore()
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


