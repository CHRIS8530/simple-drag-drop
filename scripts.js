// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Select all form pieces and the form builder area
    const formPieces = document.querySelectorAll('.form-piece');
    const builderArea = document.getElementById('builder-area');

    // Add dragstart event listeners to each form piece
    formPieces.forEach(piece => {
        piece.addEventListener('dragstart', function(e) {
            // Store the type of the dragged element in the dataTransfer object
            e.dataTransfer.setData('text/plain', e.target.dataset.type);
        });
    });

    // Prevent default behavior to allow dropping elements in the builder area
    builderArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    // Handle drop event in the builder area
    builderArea.addEventListener('drop', function(e) {
        e.preventDefault();
        // Retrieve the type of the dragged element from the dataTransfer object
        const type = e.dataTransfer.getData('text/plain');
        let input, container, label;
        
        // Create elements based on the type and add necessary attributes and classes
        if (type === 'text') {
            input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Enter text';
            input.classList.add('form-piece', 'text');
        } else if (type === 'checkbox') {
            container = document.createElement('div');
            container.classList.add('form-piece', 'checkbox', 'container');
            input = document.createElement('input');
            input.type = 'checkbox';
            input.id = 'checkbox';
            label = document.createElement('label');
            label.htmlFor = 'checkbox';
            label.appendChild(document.createTextNode('Checkbox'));
            container.appendChild(input);
            container.appendChild(label);
            builderArea.appendChild(container);
            return;
        } else if (type === 'radio') {
            container = document.createElement('div');
            container.classList.add('form-piece', 'radio', 'container');
            input = document.createElement('input');
            input.type = 'radio';
            input.name = 'radio-group';
            input.id = 'radio';
            label = document.createElement('label');
            label.htmlFor = 'radio';
            label.appendChild(document.createTextNode('Radio Button'));
            container.appendChild(input);
            container.appendChild(label);
            builderArea.appendChild(container);
            return;
        } else if (type === 'textarea') {
            input = document.createElement('textarea');
            input.placeholder = 'Enter text';
            input.classList.add('form-piece', 'textarea');
        } else if (type === 'select') {
            input = document.createElement('select');
            const option1 = document.createElement('option');
            option1.value = 'option1';
            option1.text = 'Option 1';
            const option2 = document.createElement('option');
            option2.value = 'option2';
            option2.text = 'Option 2';
            input.appendChild(option1);
            input.appendChild(option2);
            input.classList.add('form-piece', 'select');
        } else if (type === 'date') {
            input = document.createElement('input');
            input.type = 'date';
            input.classList.add('form-piece', 'date');
        } else if (type === 'number') {
            input = document.createElement('input');
            input.type = 'number';
            input.placeholder = 'Enter number';
            input.classList.add('form-piece', 'number');
        } else if (type === 'file') {
            input = document.createElement('input');
            input.type = 'file';
            input.classList.add('form-piece', 'file');
        } else if (type === 'panel') {
            const panelContainer = document.createElement('div');
            panelContainer.classList.add('panel-container', 'form-piece', 'panel');
            panelContainer.style.border = '1px solid #ccc';
            panelContainer.style.padding = '10px';
            panelContainer.style.marginBottom = '10px';

            const panelTitle = document.createElement('h4');
            panelTitle.textContent = 'Panel Title';
            panelContainer.appendChild(panelTitle);

            const panelContent = document.createElement('div');
            panelContent.classList.add('panel-content');
            panelContent.style.borderTop = '1px solid #ccc';
            panelContent.style.paddingTop = '10px';
            panelContainer.appendChild(panelContent);

            // Optional: Add a button to add elements to the panel
            const addButton = document.createElement('button');
            addButton.textContent = 'Add Element';
            addButton.addEventListener('click', function() {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'Enter text';
                panelContent.appendChild(input);
            });
            panelContainer.appendChild(addButton);

            builderArea.appendChild(panelContainer);
            return;
        }
        // Append the created input element to the builder area
        builderArea.appendChild(input);
    });
});