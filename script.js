function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.getAttribute('data-component'));
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const dropzone = document.getElementById('dropzone');
    dropzone.innerHTML += data + "<br>";
    updatePreview();
}

function updatePreview() {
    const dropzone = document.getElementById('dropzone');
    const preview = document.getElementById('preview');
    preview.innerHTML = dropzone.innerHTML;
}

function downloadReadme() {
    const dropzone = document.getElementById('dropzone');
    const content = dropzone.innerText;
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'download.php';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'content';
    input.value = content;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

function openIconPicker() {
    document.getElementById('iconPicker').style.display = 'block';
}

function closeIconPicker() {
    document.getElementById('iconPicker').style.display = 'none';
}

document.querySelectorAll('.component').forEach(component => {
    component.addEventListener('dragstart', drag);
});

document.getElementById('iconSearch').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        if (icon.classList.contains(query)) {
            icon.style.display = 'block';
        } else {
            icon.style.display = 'none';
        }
    });
});

// Populate icon picker with Font Awesome icons
const iconResults = document.getElementById('iconResults');
const iconClasses = ['fa-solid fa-star', 'fa-solid fa-heart', 'fa-solid fa-check', 'fa-solid fa-times', 'fa-solid fa-user', 'fa-solid fa-envelope'];
iconClasses.forEach(iconClass => {
    const icon = document.createElement('i');
    icon.className = `icon ${iconClass}`;
    icon.addEventListener('click', function() {
        const dropzone = document.getElementById('dropzone');
        dropzone.innerHTML += `![Icon](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/svg/${iconClass.split(' ')[1]}.svg)<br>`;
        updatePreview();
        closeIconPicker();
    });
    iconResults.appendChild(icon);
});