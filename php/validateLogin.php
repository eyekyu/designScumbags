<?php
require_once 'dao/userDAO.php';
require_once 'dao/userDTO.php';
require_once "validator.php";



$validator = new validator();

$validator->addRule('userName', 'required',    'User name is required');
$validator->addRule('userName', 'nonempty',    'User name cannot be empty');

$validator->addRule('password', 'required',    'password is required');
$validator->addRule('password', 'nonempty',    'password cannot be empty');

session_start();

if($validator->validate($_POST)){
$userName = $_POST['userName'];
$password = $_POST['password'];
try{
 

$userDAO = new userDAO();
//echo 'test';
$user =$userDAO->GetUserByUserName($userName);
//echo 'test2';
//echo 'mypassword';
if ($user === null || $user->getPassword() !== $password) {
    //echo $password;
    
    $validator->errors['password'] = 'incorrect password/username';
    require 'login.php';
    
}
else {
    $_SESSION['user'] = $user;
    header("location:characterSelection.php");
    
}
}
catch (PDOException $e){
    exit("Error: " .$e->getMessage());
}
}
else{
    require 'index.php';
}
?>
