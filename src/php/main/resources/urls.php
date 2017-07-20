<?php

$assets = file_get_contents('assets.json');
$assetsJson = json_decode($assets, true);
$masterStylesheet = 'resources/css/' . $assetsJson['style.css'];
$masterScript = 'resources/js/' . $assetsJson['all.min.js'];
