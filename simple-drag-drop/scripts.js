/* Select the draggable items */
const draggableItems = document.querySelectorAll('.draggable');

draggableItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

// Handle the dragstart event
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

// Handle the dragend event
function dragEnd(e) {
    e.target.classList.remove('hide');
    const leftBox = document.getElementById('left-box');
    if (!e.target.parentElement.classList.contains('drop-box')) {
        leftBox.appendChild(e.target);
    }
}

/* Drop targets */
const dropBoxes = document.querySelectorAll('.box, .drop-box');

dropBoxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter);
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');

    // Get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // Append the draggable item to the drop target
    e.target.appendChild(draggable);

    // Unhide the draggable element
    draggable.classList.remove('hide');

    // Ensure the draggable item retains its size and styles
    draggable.style.height = '28.4px';
    draggable.style.width = '75px';
    draggable.style.margin = '10px';
    draggable.style.position = 'relative';
    draggable.style.left = '0';
    draggable.style.top = '0';
    draggable.style.transform = 'translate(0, 0)';
}