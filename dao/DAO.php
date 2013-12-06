<?php
Class DAO{
    
    	protected $link;
	
	public function __construct(){
		
		$host = "localhost";
		$username = "vjqfvdvh_ian";
		$password = "1Spartan2";
		$database = "vjqfvdvh_ourgame";
		
		$dsn = "mysql:host=$host;dbname=$database";
		
		$this->link = new PDO($dsn, $username, $password);
		$this->link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
    
}


?>
   