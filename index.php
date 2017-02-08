<?php
require 'layout.php';
require 'streamlinetestAJAXfunction.php';


if(isset($_POST['newtaskname'])){
	$result = queryMysql("SELECT * FROM tasks");
	$num = $result->num_rows;
	$id = $num + 1;
		$newtaskname = $_POST['newtaskname'];
		if(isset($_POST['newparentname'])){
			$newparentname = $_POST['newparentname'];
		} else $newparentname = 0;
	$result = queryMysql("INSERT INTO tasks VALUES ($id,'$newtaskname','0','$newparentname')");

}

if(isset($_GET['remove'])){
	$remove = $_GET['remove'];
	
	$result = queryMysql("DELETE FROM tasks WHERE id='$remove'");
}

if(isset($_GET['title'])){
	$_SESSION['tasktitle'] = $_GET['title'];

echo "<div class='edittitle'><form id='formthree' method='POST' action='index.php' autocomplete='off'>
		<span class='closetitle' onclick='closeTitle()'>&times;</span>
			<p class='h2' style='padding:20px 0 10px 0'>Task Name</p>
			<table class='newtask'>
			<br>
			<tr><td><span class='red'>Enter new task name: </span></td><td><input type='text' name='newtasktitle' style='width:130px'></input></td></tr>
			<tr><td></td><td><input class='submit1' type='submit' value='Update'></td></tr>
			</table>
			</form></div>";
}

if(isset($_GET['parentid'])){
		
		//$_SESSION['parentid'] = $_GET['parentid'];
		$_SESSION['id'] = $_GET['id'];
		
		echo "<div class='copyupload'><form class='formtwo' method='POST' action='index.php' autocomplete='off'>
				<span class='copyclose' onclick='copycloseMe()'>&times;</span>
				<p class='h2' style='padding:20px 0 10px 0'>Parent ID</p>
				<table class='newtaskparent'>
				<br>
				<tr><td><span class='red'>Enter new parent task ID: </span></td><td><input type='text' name='newparentid' style='width:100px'></input></td></tr>
				<tr><td></td><td><input class='submit' type='submit' value='Update'></td></tr>
				</table>
				</form></div>";
}
	
if(isset($_POST['newparentid'])){
	$newparentid = $_POST['newparentid'];
	if(isset($_SESSION['id'])){
	$result = queryMysql("UPDATE tasks SET parent_id='$newparentid' WHERE id='" . $_SESSION['id'] . "'");	
	}
}

if(isset($_POST['newtasktitle'])){
	$newtasktitle = $_POST['newtasktitle'];
	if(isset($_SESSION['tasktitle'])){
	$result = queryMysql("UPDATE tasks SET title='$newtasktitle' WHERE title='" . $_SESSION['tasktitle'] . "'");
	}
}

echo $header;

	$result = queryMysql("SELECT * FROM tasks ORDER BY parent_id");
	if($result->num_rows !== 0){
		$rows = $result->num_rows;
		for($i = 0; $i < $rows; $i++){ 
		$result->data_seek($i);
		$row = $result->fetch_array(MYSQLI_ASSOC);
		
		if($row['status'] == 0){
			$row['status'] = 'IN PROGRESS';
		} else if($row['status'] == 1){
			$row['status'] = 'DONE';
		} else if($row['status'] == 2){
			$row['status'] = 'COMPLETED';
		}	
		
		if($row['status'] == 'IN PROGRESS'){
			$color = 'red';
		}else if($row['status'] == 'DONE'){
			$color = '#ffa600';
		}else if($row['status'] == 'COMPLETED'){
			$color = 'limegreen';
		}
		
		$task[$i] = array(
		'id' => $row['id'],
		'title' => $row['title'],
		'status' => $row['status'],
		'parent_id' => $row['parent_id'],
		'color' => $color
		);
		}
		echo "<br>";
		echo "<span id='show' onclick='showList()' title='Hide task list'>&minus;</span>";
		echo "<div id='tables'>";
		echo "<table id='table' class='tasks' cellspacing='0'>
					<th colspan='2'><span title='Add new task' class='pen add' onclick='addTask()'>&plus;</span></th><th>Task ID</th>
					<th>Task Name</th>
					<th>Status</th>
					<th>Parent ID</th>
					<th>Dependencies</th>";
		foreach($task as $id => $job){
			echo "<tr>" .
				"<td colspan='2'><span style='font-size:15px;'><a href='index.php?remove=" . $job['id'] . "'>&times;</a></span></td>" .
				 "<td><span style='color:#ffa600'>" . $job['id'] . "</span></td>" .
				 "<td title='Select Task Name to edit'><a href='index.php?title=" . $job['title'] . "'>" . $job['title'] . "</a></td>" .
				 "<td style='text-align:left'><input id='" . $job['id'] . "' name='tick' status='" . $job['status'] . "' parent='". $job['parent_id']. "' value='" . $job['title'] . "' type='checkbox' onchange='checkButton(this)'><span id='" . $job['id'] . "' status='" . $job['status'] . "' class='status" . $job['id'] . " update' style='font-size:13px; color:" . $job['color'] . "; text-shadow:0px 0px 50px " . $job['color'] . "'>". $job['status'] . "</span></td>" .
				 "<td title='Select Parent ID to edit'><a href='index.php?parentid=" . $job['parent_id'] . "&id=" . $job['id'] . "'>" . $job['parent_id'] . "</a></td>";
				$result = queryMysql("SELECT * FROM tasks WHERE parent_id='" . $job['id'] . "'");
				$rows = $result->num_rows;
				 if($result->num_rows !== 0){
					echo "<td class='dependencies" . $job['id'] . "' num='$rows'>$rows</td>";
				}else echo "<td class='dependencies" . $job['id'] . "' num='$rows'>$rows</td>";
				echo "</tr>";
		}
	
		echo "</table>";
	
			
		echo "<table id='dependenciess' class='taskss' cellspacing='0'>
				<th>Dependencies Done</th>
				<th>Dependencies Completed</th>";
			
			foreach($task as $id => $job){
			$result = queryMysql("SELECT * FROM tasks WHERE parent_id='" . $job['id'] . "' AND status='1'");
			echo "<tr>";
				$rows = $result->num_rows;
				if($result->num_rows !== 0){
					echo "<td id='done". $job['id'] . "'>$rows</td>";
				} else echo "<td id='done". $job['id'] . "'>$rows</td>";
					$result = queryMysql("SELECT * FROM tasks WHERE parent_id='" . $job['id'] . "' AND status='2'");
					$rows = $result->num_rows;
					if($result->num_rows !== 0){
						echo "<td id='completed" . $job['id'] . "'>$rows</td>";
					} else echo "<td id='completed" . $job['id'] . "'>$rows</td>";
			}
			echo "</tr></table></div>";
		
		echo "<div id='taskparents'>";
		foreach($task as $id => $job){
			$result = queryMysql("SELECT * FROM tasks WHERE parent_id='" . $job['id'] . "'"); 
			if($result->num_rows !==0){
			$switch = false;
			$rows = $result->num_rows;
			echo "<table cellspacing='10' class='parenthood " . $job['title'] . "'>";		
			if($job['status'] == 'COMPLETED'){
				$color = 'green';
			}else if($job['status'] == 'DONE'){
				$color = '#ffa600';
			}else if($job['status'] == 'IN PROGRESS'){
				$color = 'red';
			}
			echo "<th colspan='$rows' style='font-size:20px; padding:10px; border-radius:20px; min-width:100px; background-color:$color; box-shadow: 0 0 15px $color; text-shadow:0 0 0 black'>" . $job['title'] . "</th>";
			echo "<tr>";
			for($i = 0; $i < $rows; $i++){
				$result->data_seek($i);
				$row = $result->fetch_array(MYSQLI_ASSOC);
				if($row['status'] == 2){
						$bcolor = 'green';
						$color = 'color:rgba(255,255,255,0.8)';
				}else if($row['status'] == 1){
						$bcolor = '#ffa600';
						$color = 'color:black';
				}else if($row['status'] == 0){
						$bcolor = 'red';
						$color = 'color:rgba(255,255,255,0.8)';
				}
				echo "<td style='font-size:20px; padding:10px; border-radius:20px; box-shadow: 0 0 15px $bcolor; min-width:100px; $color; background-color:$bcolor'>" . $row['title'] . "</td>";
			}
			echo "</tr>";
			echo "</table><br><br>";
			}
			
		}
	}else {
		echo "<span id='message' style='text-align:center; display:block'>Add tasks to enable app <span style='color:limegreen; cursor:pointer; font-size:20px' onclick='addTask()'>&plus;</span></span>";
	}
echo $footer;
?>

