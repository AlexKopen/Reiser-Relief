<?php
	$assets = file_get_contents('assets.json');
	$assetsJson = json_decode($assets, true);
	$masterStylesheet = 'resources/css/' . $assetsJson['style.css'];
	$masterScript = 'resources/js/' . $assetsJson['all.min.js'];
?>

<!DOCTYPE html>
<html>
<head>
	<title>Reiser Relief - Home Page</title>
	<link rel="stylesheet" href="https://unpkg.com/purecss@0.6.2/build/pure-min.css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="<?php echo($masterStylesheet); ?>">

</head>
<body>
<div id="header">
	<div class="container">
		<div class="pure-g">
			<div class="pure-u-1-2">
				<img src="resources/images/logo.png" alt="Logo">
			</div>
			<div class="pure-u-1-2" id="right-header">
				<div>
					<p id="magnifying-glass">
						<i class="fa fa-search" aria-hidden="true"></i>
					</p>						
				</div>
				<div>
					<ul>
						<li>
							<a href="">HOME <span class="vertical-separator">|</span></a>
						</li>
						<li>
							<a href="">ABOUT <span class="vertical-separator">|</span></a>
						</li>
						<li>
							<a href="">EVENTS <span class="vertical-separator">|</span></a>
						</li>
						<li>
							<a href="">EXPERIENCE <span class="vertical-separator">|</span></a>
						</li>
						<li>
							<a href="">GIVE <span class="vertical-separator">|</span></a>
						</li>
						<li>
							<a href="">CONTACT</a>
						</li>
					</ul>
				</div>					
			</div>
		</div>
	</div>
</div>