const btnStart = document.querySelector("[data-start]")
const btnStop = document.querySelector("[data-stop]")
const body = document.querySelector("body")
let timetId = null
btnStop.disabled = true
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
  btnStart.addEventListener("click", ()=>{
timetId = setInterval(()=>{
    body.style.backgroundColor = getRandomHexColor()
}, 1000)

btnStart.disabled = true
btnStop.disabled = false
  })
  btnStop.addEventListener("click",()=>{
    body.style.backgroundColor = ""
    clearInterval(timetId)
    btnStart.disabled = false
    btnStop.disabled = true
  })