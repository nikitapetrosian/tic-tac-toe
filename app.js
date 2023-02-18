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


let movePlayer = true
let game1 = true;
function onload() {
    movePlayer = true
    game1 = true;
    let arr = game.getElementsByClassName("inner");
    let length = arr.length
    for (let i = 0; i < arr.length; i++) {
        arr[i].innerText = ''
        arr[i].onclick = function () {
            if (movePlayer) {
                const user_sym = "x";
                if (!arr[i].hasChildNodes()) {
                    arr[i].innerText = user_sym
                }
                let res = checkWin(arr)
                --length
                if (length === 0 && !res.val) {
                    setTimeout(function () {
                        end(res)
                    }, 80);
                }
                if (res.val) {
                    game1 = false;
                    setTimeout(function () {
                        end(res)
                    }, 10);
                }
                movePlayer = !movePlayer;
            }
            if (game1) {
                --length
                setTimeout(function () {
                    auto(arr, length);
                    movePlayer = !movePlayer;
                }, 200);
            }
        }
    }
}
onload()
function auto(arr, length) {
    const comp_sym = "0";
    const rnd = getRandomInt(arr.length)
    let el = arr[rnd]
    if (!el.hasChildNodes()) {
        el.innerText = comp_sym
        // movePlayer = !movePlayer;
        let res = checkWin(arr)
        if (length === 0 && !res.val) {
            setTimeout(function () {
                end(res)
            }, 80);
        }
        if (res.val) {
            game1 = false;
            setTimeout(function () {
                end(res)
            }, 10);
        }
    }
    else {
        setTimeout(function () {
            auto(arr);
        }, 500)
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
    else if (items[0] == "0" && items[1] == "0" && items[2] == "0" ||
        items[3] == "0" && items[4] == "0" && items[5] == "0" ||
        items[6] == "0" && items[7] == "0" && items[8] == "0" ||
        items[0] == "0" && items[3] == "0" && items[6] == "0" ||
        items[1] == "0" && items[4] == "0" && items[7] == "0" ||
        items[2] == "0" && items[5] == "0" && items[8] == "0" ||
        items[0] == "0" && items[4] == "0" && items[8] == "0" ||
        items[6] == "0" && items[4] == "0" && items[2] == "0") {
        res.val = true
        res.win = "bot"
    }
    return res
}

function end(res) {
    if (res.val) {
        alert(` Победил ${res.win}`)
    }
    else {
        alert(` ничья`)
    }
    onload()
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}