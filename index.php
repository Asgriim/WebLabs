<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
    <head>
        <title>LAB 1</title>
        <meta charset="utf-8">
        <script defer src="js/validation.js"></script>
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
        .frame{
            height: 266px;
            width: 284px;
            margin: auto;
            border: solid 4px #50c878;
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
        #R{
            margin-inline-start: 20px;
            display: inline-block;
            border: solid 1px #50c878;
            width: 170px;
            height: 91px;
        }
        #R_select{
            margin-top: 10px;
            margin-bottom: 10px;
        }
        #xBlock{
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

        #R_select{
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
    </style>

    <body >
    <div>
        <header id="hat">
            Власенков Андрей P32312
            <br>
            Вариант №3003
        </header>
        <div class="frame">
            <img src="imgs/img.png" id="graph" >
        </div>
        <div id="inputBlock">
            <div id="yBlock">
                <p><label for="yField">Введите y</label></p>
                <input id="yField" type="text" placeholder="от -5 до 5">
            </div>
            <div id="R">
                <p>R</p>
                <select id="R_select">
                    <option>1</option>
                    <option>1.5</option>
                    <option>2</option>
                    <option>2.5</option>
                    <option>3</option>
                </select>
            </div>
            <div id="xBlock">
                Текущий x:
                <div id="currX">0</div>
                <div id="xButtons">
                    <div class="buttons">
                        <button class="xButton" name="x" value="-3" onclick="setX(this)">-3</button>
                        <button class="xButton" name="x" value="-2" onclick="setX(this)">-2</button>
                        <button class="xButton" name="x" value="-1" onclick="setX(this)">-1</button>
                    </div>
                    <div class="buttons">
                        <button class="xButton" name="x" value="0" onclick="setX(this)">0</button>
                        <button class="xButton" name="x" value="1" onclick="setX(this)">1</button>
                        <button class="xButton" name="x" value="2" onclick="setX(this)">2</button>
                    </div>
                    <div class="buttons">
                        <button class="xButton" name="x" value="3" onclick="setX(this)">3</button>
                        <button class="xButton" name="x" value="4" onclick="setX(this)">4</button>
                        <button class="xButton" name="x" value="5" onclick="setX(this)">5</button>
                    </div>
                    <script>
                        function setX(btn) {
                            document.getElementById("currX").textContent = btn.value
                        }
                    </script>
                </div>
            </div>

            <div id="submit">
                <button disabled="disabled" id="submitButton" onclick="submit()">Отправить</button>
            </div>
            <div id="tableBlock">
                <table id="table">
                    <tr>
                        <th>Attempt</th>
                        <th>R</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Hit</th>
                        <th>Time</th>
                        <th>Script time</th>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    </body>
<script defer src="js/submit.js"></script>
</html>