<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <title>LAB 2</title>
    <meta charset="utf-8">
    <script defer src="js/canvas.js"></script>
    <script defer src="js/validation.js"></script>
    <script type="text/javascript" src="js/jquery.js"></script>
</head>
<style>
    *{
        font-family: "Courier New",serif;
    }

    body{
        background: #0d0e0e;
    }
    div{
        display: block;
        color:#50c878;

    }
    #hat{
        margin-top: 1%;
        text-align: center;
        height: 120%;
        width: 100%;
        font-size: 140%;
        padding-bottom: 15px;
        border-bottom: solid 1px #50c878;
        margin-block-end: 3%;
    }
    .canvasBlock{
        height: 420px;
        width: 420px;
        margin: auto;
        border: solid 4px #50c878;
    }
    .canvasBlock.canvas{
        border: transparent;
    }
    #inputBlock{
        text-align: center;
    }
    #yBlock{
        margin-block-start: 20px;
        width: 170px;
        height: 72px;
        padding: 10px;
        border: solid 1px #50c878;
        display: inline-block;
    }
    #X{
        margin-inline-start: 20px;
        display: inline-block;
        border: solid 1px #50c878;
        width: 170px;
        height: 91px;
    }
    #X_select{
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    #rBlock{
        margin-top: 30px;
        margin-block-end: 30px;
    }
    .buttons{
        margin-block: 5px;
    }
    #currX{
        padding: 10px;
    }
    div button{
        background: transparent;
        color: #50c878;
        border: 1px solid #50c878
    }
    .xButton{
        width: 30px;
        height: 30px;
    }
    #tableBlock{
        margin-block-start: 20px;
        margin-left: 20%;
    }
    ::placeholder{
        color: #50c878;
    }
    #yField{
        background: transparent;
        border: transparent;
        color: #50c878;
        border-bottom: solid 1px #50c878;
    }

    #X_select{
        background: transparent;
        border: transparent;
        color: #50c878;
        border-bottom: solid 1px #50c878;
    }
    option{
        background: black;
    }

    th,td{
        border: 1px solid #50c878;
    }
    div > table{
        color: white;
        border-collapse: collapse;
        text-align: center;
        width: 80%;
        font-size: 16px;
    }
    #x_block{
        width: 10%;
        height: 10%;
    }
</style>

<body onload="loadTable()">
<div>
    <header id="hat">
        Власенков Андрей P32312
        <br>
        Вариант №66631214
    </header>
    <div id="canvasDiv" class="canvasBlock">
        <canvas  id= "canvas" ></canvas>
<%--        <img src="imgs/img.png" id="graph" >--%>
    </div>
    <div id="inputBlock">
        <div id="yBlock">
            <p><label for="yField">Введите y</label></p>
            <input maxlength="8" id="yField" type="text" placeholder="от -3 до 3">
        </div>
        <div id="X">
            <label for="X_select"><p>X</p></label>
            <select id="X_select">
                <option>-5</option>
                <option>-4</option>
                <option>-3</option>
                <option>-2</option>
                <option>-1</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
        </div>
        <div id="rBlock">
            <div >

                <label ><p>R</p></label>
                <div id="rads">
                    <p><input type="radio" value="1" name="R_radio" checked>1</p>
                    <p><input type="radio" value="2" name="R_radio">2</p>
                    <p><input type="radio" value="3" name="R_radio">3</p>
                    <p><input type="radio" value="4" name="R_radio">4</p>
                    <p><input type="radio" value="5" name="R_radio">5</p>
                </div>
            </div>
        </div>

        <div id="submit">
            <button disabled="disabled" id="submitButton" onclick="submitOnClick()">Отправить</button>
            <button onclick="clearLocal()">Очистить</button>
        </div>

        <div id="tableBlock">
            <table id="table">
                <tbody id = "main_tbody">
                    <tr>
                        <th>R</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Hit</th>
                        <th>Time</th>
                        <th>Script time</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
<script defer>
    function loadTable(){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "./controller?giveTable");
        xhr.send();
        xhr.onload = function (){
            const resp = JSON.parse(xhr.responseText);
            console.log(resp)
            if (resp.userTable.length === 0){
                redrawCanvas($('input[type=radio][name="R_radio"]:checked').val())
                return
            }
            const rows = resp.userTable
            // console.log(rows)
            for (const row of    rows){
                let color
                if (row.hit.includes("yes")) {
                    color = "#129212"
                } else {
                    color = "#f00"
                }
                savePoint(new Point(row.X,row.Y,color))
                createRow( row.R, row.X, row.Y, row.hit, row.date, row.scriptTime, "#fff", color)
            }
            redrawCanvas($('input[type=radio][name="R_radio"]:checked').val())
        }

    }
    function clearLocal(){
        const req = new XMLHttpRequest();

        req.open("POST", "./controller");
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.onload = function (){
           alert(req.responseText)
        }
        req.send("clearTable=true")
        $("#table td").remove()
        points = []
        redrawCanvas($('input[type=radio][name="R_radio"]:checked').val())
    }

</script>
<script defer src="js/submit.js"></script>
</html>