<?php
class User{
	private $id;
    private $userName;
    private $email;
	private $password;


	
	public function __construct($i, $us, $el, $pwd){
		$this->id = $i;
        $this->userName=$us;
        $this->email =$el;
		$this->password = $pwd;
	}
	
	public function getId(){ return $this->id;}
    public function getUserName(){return $this->userName;}
    public function getEmail(){ return $this->email;}
	public function getPassword(){ return $this->password;}
	
       
	public function setId($i){ return $this->id = $i;}
    public function setUserName($us){return $this->userName = $us;}
    public function setEmail($el){return $this->email = $el;}
	public function setPassword($pwd){ return $this->password = $pwd;}
	
}