<?php
ob_start();
require_once 'dao/userDAO.php';
require_once 'dao/userDTO.php';
require_once "validator.php";

$validator = new validator();

$validator->addRule('userName', 'required',    'Username is required');
$validator->addRule('userName', 'nonempty',    'Username cannot be empty');

$validator->addRule('email',     'required',    'email is required');
$validator->addRule('email',     'nonempty',    'email cannot be empty');
$validator->addRule('email',     'valid_email', 'invalid email address');

$validator->addRule('password', 'required',    'password is required');
$validator->addRule('password', 'nonempty',    'password cannot be empty');

$validator->addRule('confirmPassword', 'required',    'password is required');
$validator->addRule('confirmPassword', 'nonempty',    'password cannot be empty');
$validator->addRule('confirmPassword', 'match',       'password must match passowrd1',
        array('match' => 'password'));

if($validator->validate($_POST)){
$userName=$_POST['userName'];
$email=$_POST['email'];
$password=$_POST['password'];
try{
 

$userDAO = new userDAO();
//echo 'test';
$user =$userDAO->GetUserByUserName($userName);
//echo 'test2';
//echo 'mypassword';
if ($user !== null) {
    //echo $password;
    $validator->errors['userName'] = 'username is in use';
    //$validator->errors['email'] = 'email/username already inuse';
    require 'register.php';
    
}
else {
    $user = new User(NULL,$userName, $email, $password);
    $userDAO->insert($user);
    header("location:login.php");
    
}
}
catch (PDOException $e){
    exit("Error: " .$e->getMessage());
}
}
else {
    require 'register.php';
}
?>
