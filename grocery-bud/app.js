const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.querySelector('#grocery');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const submitBtn = document.querySelector('.submit-btn');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editID = "";

form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems);

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        createListItems(id, value);
        container.classList.add('show-container');
        displayAlert('item added to the list', 'success');
        addToLocalStorage(id, value);
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert('please, enter value.', 'caution');
    }
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1500);
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove('show-container');
        clearBtn.classList.remove('show-container');
    }
    removeFromLocalStorage(id);
    displayAlert('item removed', 'danger');
    setBackToDefault();
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}

function clearItems() {
    const items = document.querySelectorAll('.grocery-section');
    if (items.length > 0) {
        items.forEach(item => {
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    setBackToDefault();
    displayAlert('empty list', 'danger');
    localStorage.removeItem('list');
}

function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}


function addToLocalStorage(id, value) {
    const grocery = {
        id,
        value
    };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
    const items = getLocalStorage();
    items = items.map(item => {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    })
    localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(item => item.id !== id);
    localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(item => {
            createListItems(item.id, item.value);
        })
        container.classList.add('show-container');
    }
}

function createListItems(id, value) {
    const element = document.createElement('article');
    element.classList.add('grocery-section');
    const attr = document.createAttribute('data-id');
    element.setAttributeNode(attr);
    element.dataset.id = id;
    element.innerHTML = `
    <p>${value}</p>
    <div class="btn-container">
        <button class="edit-btn">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete-btn">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
    `
    list.appendChild(element);
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);
}