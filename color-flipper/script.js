const click = document.querySelector('.click')
const span = document.querySelector('span')

const colors = ['green', 'blue', 'red', 'yellow', 'coral', 'orange', 'grey', 'purple', 'violet', 'aqua', 'gold', 'turquoise', 'tomato', 'teal', 'tan', 'olive', 'orchid', 'chocolate', 'crimson', 'chartreuse', 'khaki', 'brown', 'pink']

click.addEventListener('click', () => {
    shuffle()
})

function shuffle() {
    shuf = colors[Math.floor(Math.random() * colors.length)]
    span.textContent = shuf
    document.body.style.backgroundColor = shuf
}
