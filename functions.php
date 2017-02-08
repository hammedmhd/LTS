<?php
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$appname = 'Tasking System';

$connection = new mysqli($dbhost, $dbuser, $dbpass);

if($connection->connect_error) die($connection->connection_error);

function createTable($name, $query)
{
	queryMysql("CREATE TABLE IF NOT EXISTS $name($query)");
}

function queryMysql($query)
{
   global $connection;
   $result = $connection->query($query);
   if(!$result) die($connection->error);
   return $result;
}

//setup of Stock and Orders table
$result = queryMysql("SHOW DATABASES LIKE 'tasks'");
$rows = $result->num_rows;
if($rows == 0){
	$result = queryMysql("CREATE DATABASE tasks");
	$result = queryMysql("USE tasks");
	$result = queryMysql("SHOW TABLES LIKE 'tasks'");
	if($result->num_rows == 0){
		createTable("tasks","
		id bigint(20) NOT NULL,
		title varchar(255) NOT NULL,
		status tinyint(1) NOT NULL DEFAULT '0',
		parent_id int(11) NOT NULL DEFAULT '0',
		PRIMARY KEY (id),
		UNIQUE KEY (id)"
		);
		
	$result = queryMysql("INSERT INTO tasks VALUES (1,'Task A',0,0),(2,'Task B',0,1),(3,'Task C',0,1),(4,'Task D',0,2)");
}
}else {
	$result = queryMysql("USE tasks");
}


  function destroySession()
  {
    $_SESSION=array();

    if (session_id() != "" || isset($_COOKIE[session_name()]))
      setcookie(session_name(), '', time()-2592000, '/');

    session_destroy();
  }
 
  function sanitizeString($var)
  {
    global $connection;
    $var = strip_tags($var);
    $var = htmlentities($var);
    $var = stripslashes($var);
    return $connection->real_escape_string($var);
  }


?>