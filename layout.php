<?php

$appname = 'Tasking System';

$header = <<<END
<!DOCTYPE html>
<html>
	<head>
		<title>$appname</title>
		<meta charset='utf-8'>
			<meta http-equiv='X-UA-Compatible' content='IE=edge'>
			<meta name='viewport' content='width=device-width, inital-scale=1.0'>
			<link rel='stylesheet' href='css/streamline.css'>
			<link href="https://fonts.googleapis.com/css?family=Keania+One" rel="stylesheet">
	</head>
	<body>
	<script src='js/jquery-3.1.1.js'></script>
		<script src='js/streamline.js'></script>
			<table class='header'>
			<td><span class='head'>Legacy Tasking System</span></td>
			<td><ul class='list'>
			<li><span id='menu' onclick='mobilemenu()'>&#9776;</span></li>
			<li id='0' onclick='status(this.id)'>IN PROGRESS
			<li id='1' onclick='status(this.id)'>DONE
			<li id='2' onclick='status(this.id)'>COMPLETED
			<li title='refresh'><a href='index.php'><span class='refresh'>&#8475;</span></a>
			</ul></span></td>
			</table>
			<span id='mobile'>
			<a href='index.php'><span>&#8475;efresh</span></a>
			<span id='0' style='color:red' onclick='status2(this.id)'>IN PROGRESS</span>
			<span id='1' style='color:#ffa600' onclick='status2(this.id)'>DONE</span>
			<span id='2' style='color:limegreen' onclick='status2(this.id)'>COMPLETED</span>
			</span>
		<div id='content'>
		<div class='upload'><form id='formone' method='POST' action='index.php' autocomplete='off'>
			<span class='close' onclick='closeMe()'>&times;</span>
			<p class='h2'>Task Creator</p>
			<table class='newtask'>
			<tr><td><span class='red'>*Task Name:</span></td><td><input type='text' name='newtaskname'></input></td></tr>
			<tr><td><span class='red'>&nbsp;Parent task ID:</span></td><td><input type='text' name='newparentname'></input></td></tr>
			<tr><td></td><td><input style='text-align:center' class='submit' type='submit' value='Add Task'></td></tr>
			</table>
			</form></div>
END;

$footer = <<<END
</div>
</body>
</html>
END;

/*<img id='background' src='462950319.jpg'>*/
?>
