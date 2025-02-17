<?php
if (isset($_POST['content'])) {
    $content = $_POST['content'];
    header('Content-Type: text/markdown');
    header('Content-Disposition: attachment; filename="README.md"');
    echo $content;
    exit();
}
?>