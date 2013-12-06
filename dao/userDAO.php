<?php

require_once 'DAO.php';

class userDAO extends DAO{
	
	
	public function __construct(){
            parent::__construct();

	}
	
	public function __destruct(){
		
		$this->link = null;
		
	}
	
	public function insert($user){
		
		if(!isset($user)&& $user != null) {
			throw new Exception("Survey Required");
		}
		$sql = "INSERT INTO uq1j3_usersGame( userName, email, password)" 
                . "VALUES( :userName,:email, :password)";
		
		$params = array(
                    
		'userName' => $user->getUserName(),
        'email' => $user->getEmail(),
        'password' => $user->getPassword(),

	);
	
	$stmt = $this->link->prepare($sql);
	$status = $stmt ->execute($params);
	if($status != true){
		$errorInfo = $stmt->errorInfo();
		throw new Exception("Could not save survey: " . $errorInfo[2]);
		
	}
	
	$id = $this->link->lastInsertId('users');
	$user->setId($id);
	
	}
	
	

	
	public function findAll(){
		$sql = "SELECT * FROM uq1j3_usersGame";
		$stmt = $this->link->prepare($sql);
		$status = $stmt->execute();
		if($status != true){
			$errorInfo = $stmt->errorInfo();
			throw new Exception("Could not retrieve survey: " .$errorInfo[2]);
		}
			$survey = array();
			$row = $stmt->fetch();
			while($row !=null){
			$id = $row['userId'];
            $userName = $row['userName'];
            $email = $row['email'];
            $password = $row['password'];
			
			
			$user = new User($id,$userName, $email, $password);
			
			$survey[$id] = $user;
			
			$row =$stmt->fetch();	
			
		}
		
		return $survey;
		
	
	}
        
        public function GetUserByUserName($userName){
                $sql = "SELECT * FROM uq1j3_usersGame WHERE userName = '".$userName."'";
                
		$params = array('userName' => $userName);
		$stmt = $this->link->prepare($sql);
		$status = $stmt->execute($params);
		if($status != true){
			$errorInfo = $stmt->errorInfo();
			throw new Exception("Could not retrieve user: " .$errorInfo[2]);
		}
		
		$user = null;
		if($stmt->rowCount() == 1){
			$row = $stmt->fetch();
            $id = $row['userId'];
			$userName = $row['userName'];
            $email = $row['email'];
			$password = $row['password'];
            $user = new User($id, $userName,$email, $password);
                
	
			
		}
		
		return $user;
		
	
        }
        
        public function getUserByEmail($eMail){
                $sql = "SELECT * FROM uq1j3_usersGame WHERE email = '".$eMail."'";
                
		$params = array('myusername' => $eMail);
		$stmt = $this->link->prepare($sql);
		$status = $stmt->execute($params);
		if($status != true){
			$errorInfo = $stmt->errorInfo();
			throw new Exception("Could not retrieve user: " .$errorInfo[2]);
		}
		
		$user = null;
		if($stmt->rowCount() == 1){
			$row = $stmt->fetch();
            $id = $row['userId'];
			$userName = $row['userName'];
            $email = $row['email'];
			$password = $row['password'];
			$user = new User($id, $userName,$email, $password);
                
	
			
		}
		
		return $user;
		
	
        }
        
        
        public function delete($id){
		
		//$id =$surveyDTO->getId();
		if($id == null){
			throw new Exception("A survey ID is requried");
		}
		//$id = $_GET['id'];
		$sql = "DELETE FROM uq1j3_usersGame WHERE userId = :id";
		
		$params = array('id' => $id);
		$stmt = $this->link->prepare($sql);
		$status = $stmt->execute($params);
		if($status != true){
			$errorInfo = $stmt->errorInfo();
			throw new Exception("Could not delete the survey: " . $errorInfo[2]);	
		}
		
	}
        
        public function FindById($id){
        $sql = "SELECT * FROM uq1j3_usersGame WHERE userId = '".$id."'";
                
		$params = array('id' => $id);
		$stmt = $this->link->prepare($sql);
		$status = $stmt->execute($params);
		if($status != true){
			$errorInfo = $stmt->errorInfo();
			throw new Exception("Could not retrieve user: " .$errorInfo[2]);
		}
		
		$user = null;
		if($stmt->rowCount() == 1){
			$row = $stmt->fetch();
            $id = $row['userId'];
			$userName = $row['userName'];
            $email = $row['email'];
			$password = $row['password'];
			$user = new User($id, $userName,$email, $password);
                
	
			
		}
		
		return $user;
		
	
        }
	
}


?>