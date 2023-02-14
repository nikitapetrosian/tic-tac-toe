const downBtn = document.querySelector('.down-button')
const upBtn = document.querySelector('.up-button')
const sidebar = document.querySelector('.sidebar')
const container = document.querySelector('.container')
const mainSlide = document.querySelector('.main-slide')
const slidesCount = mainSlide.querySelectorAll('div').length

let activeSlideIndex = 0
sidebar.style.top = `-${(slidesCount - 1) * 100}vh`

upBtn.addEventListener('click', () => {
    changeSlide('up')
})

downBtn.addEventListener('click', () => {
    changeSlide('down')
})

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
        changeSlide('up')
    } else if (event.key === 'ArrowDown') {
        changeSlide('down')
    }
})

function changeSlide(direction) {
    if (direction === 'up') {
        activeSlideIndex++
        if (activeSlideIndex === slidesCount) {
            activeSlideIndex = 0
        }
    } else if (direction === 'down') {
        activeSlideIndex--
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesCount - 1
        }
    }
    const height = container.clientHeight
    mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`
    sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}

const game = mainSlide.querySelector('.main-game')
const tableDiv = document.createElement('div')
const tableWrap = document.createElement('div')
const tableBody = document.createElement('tbody')
tableWrap.className = 'table'
tableDiv.id = 'game'
const header = document.createElement('h2')
const table = document.createElement('table')
table.setAttribute('style', 'display: table;margin: 0 auto')
for (let i = 0; i < 3; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
        const inner = document.createElement('div')
        inner.className = 'inner'
        inner.setAttribute("style",
            "width: 50px;height: 50px;font-size: 20px;line-height: 50px;text-align: center;text-transform: uppercase;border: 1px solid #333;margin: 5px;cursor: pointer;box-shadow: 3px 4px 1px 2px rgba(1,1,1, 0.1);text-shadow: 2px 3px  1px rgba(1,1,1, 0.3);user-select: none;");
        inner.id = `${i}${j}`
        const td = document.createElement("td");
        td.appendChild(inner)
        tr.appendChild(td)
    }
    tableBody.appendChild(tr)
}
header.innerText = 'Давайте поиграем'
header.setAttribute("style", "color:white;text-Align:center;");
game.appendChild(header)
table.appendChild(tableBody)
tableWrap.appendChild(table)
tableDiv.appendChild(tableWrap)
game.appendChild(tableDiv)

function onload() {
    let arr = game.getElementsByClassName("inner");
    for (let i = 0; i < arr.length; i++) {
        arr[i].innerText = ''
        arr[i].onclick = function () {
            moveUser(arr[i], arr);
        }
    }
}
onload()

function moveUser(item, arr) {
    const user_sym = "x";
    if (!item.hasChildNodes()) {
        item.innerText = user_sym
        auto(arr)
        checkWin(arr)
    }
}

function auto(arr) {
    const comp_sym = "o";
    const rnd = getRandomInt(arr.length)
    let el = arr[rnd]
    if (!checkFree(arr)) {
        setTimeout(function () {
            alert('ничья,сыгаем еще?')
            onload()
        }, 500)
    }
    else {
        if (!el.hasChildNodes()) {
            el.innerText = comp_sym
        }
        else {
            setTimeout(function () {
                auto(arr);
            }, 500)
            checkWin(arr)
        }
    }
}
function checkWin(arr) {
    let items = []
    for (let i = 0; i < arr.length; i++) {
        items.push(arr[i].innerText);
    }
    let res = { val: false }
    if (items[0] == "X" && items[1] == 'X' && items[2] == 'X' ||
        items[3] == "X" && items[4] == 'X' && items[5] == 'X' ||
        items[6] == "X" && items[7] == 'X' && items[8] == 'X' ||
        items[0] == "X" && items[3] == 'X' && items[6] == 'X' ||
        items[1] == "X" && items[4] == 'X' && items[7] == 'X' ||
        items[2] == "X" && items[5] == 'X' && items[8] == 'X' ||
        items[0] == "X" && items[4] == 'X' && items[8] == 'X' ||
        items[6] == "X" && items[4] == 'X' && items[2] == 'X') {
        res.val = true
        res.win = "player"
    }
    else if (items[0] == "O" && items[1] == "O" && items[2] == "O" ||
        items[3] == "O" && items[4] == "O" && items[5] == "O" ||
        items[6] == "O" && items[7] == "O" && items[8] == "O" ||
        items[0] == "O" && items[3] == "O" && items[6] == "O" ||
        items[1] == "O" && items[4] == "O" && items[7] == "O" ||
        items[2] == "O" && items[5] == "O" && items[8] == "O" ||
        items[0] == "O" && items[4] == "O" && items[8] == "O" ||
        items[6] == "O" && items[4] == "O" && items[2] == "O") {
        res.val = true
        res.win = "bot"
    }
    console.log(res.val);
    if (res.val) {
        setTimeout(function () {
            end(res);
        }, 500)
    }
    else {
        setTimeout(function () {
            alert('ничья,сыгаем еще?')
            onload()
        }, 500)
    }
}

function end(res) {
    alert(` Победил ${res.win}`)
    onload()
}

function checkFree(arr) {
    let res = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].hasChildNodes()) {
            res = false;
        } else {
            res = true;
            break;
        }
    }
    return res;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}