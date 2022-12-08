const time = document.getElementById("interactiveTime")
upd = function updateTime(){
    let date = new Date();
    time.innerText = date.toLocaleString("ru-RU", {
        hour12: false
    })
}
upd();
setInterval(upd,5*1000)