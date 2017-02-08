<?php
require 'functions.php';
session_start();
		
//viewing by filter
if(isset($_POST['state'])){
$state = $_POST['state'];

if($state == 0){
	$result = queryMysql("SELECT * FROM tasks WHERE status='0'");
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
			echo "</tr></table><div>";
	}else { echo "<span id='message'>No tasks currently <span style='color:red; text-shadow:0 0 20px red'>IN PROGRESS</span></span>'"; }
}else if($state == 1){
	$result = queryMysql("SELECT * FROM tasks WHERE status='1'");
	if($result->num_rows !==0){
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
	}else { echo "<span id='message'>No tasks currently <span style='color:#ffa600; text-shadow:0 0 20px #ffa600'>DONE</span></span>"; }
}else if($state == 2){
	$result = queryMysql("SELECT * FROM tasks WHERE status='2'");
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
	}else { echo "<span id='message'>No tasks currently <span style='color:limegreen; text-shadow:0 0 20px limegreen'>COMPLETED</span></span>"; }
	
	
}
}

if(isset($_POST['maintable'])){
	$result = queryMysql("SELECT * FROM tasks ORDER BY parent_id");
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
		
		
echo "<th colspan='2'><span title='Add new task' class='pen add' onclick='addTask()'>&plus;</span></th><th>Task ID</th>
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
}

	//Checkbox onchange output
if(isset($_POST['status'])){
		$status = $_POST['status'];
		
		if(isset($_POST['taskid'])){
		$taskid = $_POST['taskid'];
		}
	
		if(isset($_POST['parentid'])){
		$parentid = $_POST['parentid'];
		}
	
		if(isset($_POST['parentstatus'])){
		$parentstatus = $_POST['parentstatus'];
		}
		
		if(isset($_POST['kids'])){
		$kids = $_POST['kids'];
		}		
		
		$result = queryMysql("UPDATE tasks SET status='$status' WHERE id='$taskid'");
		
		$result = queryMysql("UPDATE tasks SET status='$parentstatus' WHERE id='$parentid'");
		
		$result = queryMysql("SELECT * FROM tasks");
		$t = $result->num_rows;
		
		
		
		$result = queryMysql("SELECT * FROM tasks ORDER BY parent_id");
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
		
		$task[$i] = array(
		'id' => $row['id'],
		'title' => $row['title'],
		'status' => $row['status'],
		'parent_id' => $row['parent_id']
		);
		}
		
		//auto complete for needed
		$count = 0;
		$sibs = 0;
		foreach($task as $ta){
			for($i = 0; $i < count($task); $i++){
				if($ta['status'] == 'DONE'){
					if($ta['id'] == $task[$i]['parent_id']){
						$id = $ta['id'];
						$sibs++;
						if($task[$i]['status'] == 'COMPLETED'){
							$count++;
						}
					}
				}
			}
			if($count == $sibs && $count !== 0){
				$result = queryMysql("UPDATE tasks SET status='2' WHERE id='$id'");
			}
		}
		$undo;
		//auto undo complete for needed
		foreach($task as $ta){
			$undo = false;
			for($i = 0; $i < count($task); $i++){
				if($ta['status'] == 'COMPLETED'){
					if($ta['id'] == $task[$i]['parent_id']){
						$id = $ta['id'];
						$sibs++;
						if($task[$i]['status'] == 'DONE'){
							$undo = true;
							break;
						}
					}
				}
			}
			if($undo == true){
				$result = queryMysql("UPDATE tasks SET status='1' WHERE id='$id'");
			}
		}
		
		echo "<th>Dependencies Done</th>
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
}

if(isset($_POST['check'])){
	$result = queryMysql("SELECT * FROM tasks ORDER BY parent_id");
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
		
		$task[$i] = array(
		'id' => $row['id'],
		'title' => $row['title'],
		'status' => $row['status'],
		'parent_id' => $row['parent_id']
		);
		}
	
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
}	


?>