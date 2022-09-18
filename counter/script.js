const buttons = document.querySelectorAll('button')
const decre = buttons[0]
const res = buttons[1]
const incre = buttons[2]
const count = document.querySelector('.count')

let counter = 0;

decre.addEventListener('click', () => {
    counter--
    count.textContent = counter;
    if (counter < 0) {
        count.style.color = 'red'
    }
})

incre.addEventListener('click', () => {
    counter++
    count.textContent = counter;
    if (counter > 0) {
        count.style.color = 'rgb(0, 128, 0)'
    }
})

res.addEventListener('click', () => {
    counter = 0
    count.textContent = counter;
    count.style.color = 'black'
})
