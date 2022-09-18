const openBtn = document.querySelector('.open-btn')
const closeBtn = document.querySelector('.close-btn')
const sidebar = document.querySelector('.sidebar')

openBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show-sidebar')
})

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('show-sidebar')
})

