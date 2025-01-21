/* Select the draggable items */
const draggableItems = document.querySelectorAll('.draggable');

draggableItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
    item.addEventListener('touchstart', touchStart);
    item.addEventListener('touchmove', touchMove);
    item.addEventListener('touchend', touchEnd);
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

// Handle the touchstart event
function touchStart(e) {
    e.target.classList.add('hide');
    e.target.style.position = 'absolute';
    e.target.style.zIndex = 1000;
    document.body.append(e.target);
    moveAt(e.touches[0].pageX, e.touches[0].pageY);

    function moveAt(pageX, pageY) {
        e.target.style.left = pageX - e.target.offsetWidth / 2 + 'px';
        e.target.style.top = pageY - e.target.offsetHeight / 2 + 'px';
    }

    function onTouchMove(event) {
        moveAt(event.touches[0].pageX, event.touches[0].pageY);
    }

    document.addEventListener('touchmove', onTouchMove);

    e.target.ontouchend = function() {
        document.removeEventListener('touchmove', onTouchMove);
        e.target.classList.remove('hide');
        e.target.style.zIndex = '';
        e.target.style.position = '';
    };
}

// Handle the touchmove event
function touchMove(e) {
    e.preventDefault();
}

// Handle the touchend event
function touchEnd(e) {
    const leftBox = document.getElementById('left-box');
    const dropBox = document.getElementById('drop-box');
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element === dropBox || dropBox.contains(element)) {
        dropBox.appendChild(e.target);
    } else {
        leftBox.appendChild(e.target);
    }

    e.target.classList.remove('hide');
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