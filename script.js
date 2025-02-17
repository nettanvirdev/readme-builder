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
    updateTreeView();
}

function updatePreview() {
    const dropzone = document.getElementById('dropzone');
    const preview = document.getElementById('preview');
    const content = dropzone.innerText;
    preview.innerHTML = marked.parse(content);
    Prism.highlightAll();
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

function openLinkPopup() {
    document.getElementById('linkPopup').style.display = 'block';
}

function closeLinkPopup() {
    document.getElementById('linkPopup').style.display = 'none';
}

function addLink() {
    const linkText = document.getElementById('linkText').value;
    const linkUrl = document.getElementById('linkUrl').value;
    const dropzone = document.getElementById('dropzone');
    dropzone.innerHTML += `[${linkText}](${linkUrl})<br>`;
    closeLinkPopup();
    updatePreview();
    updateTreeView();
}

function openImagePopup() {
    document.getElementById('imagePopup').style.display = 'block';
}

function closeImagePopup() {
    document.getElementById('imagePopup').style.display = 'none';
}

function addImage() {
    const imageAlt = document.getElementById('imageAlt').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const dropzone = document.getElementById('dropzone');
    dropzone.innerHTML += `![${imageAlt}](${imageUrl})<br>`;
    closeImagePopup();
    updatePreview();
    updateTreeView();
}

function openBadgePopup() {
    document.getElementById('badgePopup').style.display = 'block';
}

function closeBadgePopup() {
    document.getElementById('badgePopup').style.display = 'none';
}

function addBadge() {
    const badgeAlt = document.getElementById('badgeAlt').value;
    const badgeUrl = document.getElementById('badgeUrl').value;
    const dropzone = document.getElementById('dropzone');
    dropzone.innerHTML += `![${badgeAlt}](${badgeUrl})<br>`;
    closeBadgePopup();
    updatePreview();
    updateTreeView();
}

function openFootnotePopup() {
    document.getElementById('footnotePopup').style.display = 'block';
}

function closeFootnotePopup() {
    document.getElementById('footnotePopup').style.display = 'none';
}

function addFootnote() {
    const footnoteText = document.getElementById('footnoteText').value;
    const dropzone = document.getElementById('dropzone');
    dropzone.innerHTML += `[^${footnoteText}]<br>`;
    closeFootnotePopup();
    updatePreview();
    updateTreeView();
}

function addTOC() {
    const dropzone = document.getElementById('dropzone');
    dropzone.innerHTML += `[TOC]<br>`;
    updatePreview();
    updateTreeView();
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
        if (icon.getAttribute('data-name').includes(query)) {
            icon.style.display = 'block';
        } else {
            icon.style.display = 'none';
        }
    });
});

// Populate icon picker with Font Awesome icons
const iconResults = document.getElementById('iconResults');
const iconClasses = [
    { name: 'star', class: 'fa-star' },
    { name: 'heart', class: 'fa-heart' },
    { name: 'check', class: 'fa-check' },
    { name: 'times', class: 'fa-times' },
    { name: 'user', class: 'fa-user' },
    { name: 'envelope', class: 'fa-envelope' }
];
iconClasses.forEach(icon => {
    const iconElement = document.createElement('i');
    iconElement.className = `icon fas ${icon.class}`;
    iconElement.setAttribute('data-name', icon.name);
    iconElement.addEventListener('click', function() {
        const dropzone = document.getElementById('dropzone');
        dropzone.innerHTML += `![Icon](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/svgs/solid/${icon.name}.svg)<br>`;
        updatePreview();
        closeIconPicker();
    });
    iconResults.appendChild(iconElement);
});

document.getElementById('dropzone').addEventListener('input', updatePreview);

function updateTreeView() {
    const dropzone = document.getElementById('dropzone');
    const treeView = document.getElementById('treeView');
    const content = dropzone.innerText.split('\n');
    treeView.innerHTML = '';
    content.forEach(line => {
        if (line.trim()) {
            const node = document.createElement('div');
            node.className = 'tree-node';
            node.textContent = line.trim();
            treeView.appendChild(node);
        }
    });
}

document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('light');
});