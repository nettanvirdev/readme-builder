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
    const content = dropzone.innerText;
    
    fetch('https://api.github.com/markdown', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: content, mode: 'gfm' }),
    })
    .then(response => response.text())
    .then(data => {
        preview.innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
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
    fetch(`https://api.iconfinder.com/v4/icons/search?query=${query}&count=10`, {
        headers: {
            'Authorization': 'Bearer YOUR_ICONFINDER_API_KEY'
        }
    })
    .then(response => response.json())
    .then(data => {
        const iconResults = document.getElementById('iconResults');
        iconResults.innerHTML = '';
        data.icons.forEach(icon => {
            const iconElement = document.createElement('img');
            iconElement.src = icon.raster_sizes[0].formats[0].preview_url;
            iconElement.className = 'icon';
            iconElement.addEventListener('click', function() {
                const dropzone = document.getElementById('dropzone');
                dropzone.innerHTML += `![Icon](${iconElement.src})<br>`;
                updatePreview();
                closeIconPicker();
            });
            iconResults.appendChild(iconElement);
        });
    })
    .catch(error => console.error('Error:', error));
});