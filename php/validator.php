<?php
Class validator{
    protected $valid;
    public $rules;
    public $errors;
    protected $data;

    public function __construct() {
        $this->valid = TRUE;
        $this->rules = array();
        $this->errors = array();
        $this->data = NULL;
    }
    //This function adds the key, a rule name, an error message and the options
    public function addRule($key, $ruleName, $errorMessage, $options=NULL) {
        $rule = array("errorMessage" => $errorMessage, "options" => $options);
        if (!isset($this->rules[$key])) {
            $this->rules[$key] = array();
        }
        $this->rules[$key][$ruleName] = $rule;
        
    }
    //this function validates the data entered and sets it to false if its not entered correctly.
    public function validate($data) {
        $this->data = $data;
        $this->valid = TRUE;
        
        foreach ($this->rules as $key => $ruleSet) {
            foreach ($ruleSet as $ruleName => $details) {
                if (!$this->validateRule($key, $ruleName, $details)) {
                    $this->valid = FALSE;
                    break;
                }
            }
        }
        return $this->valid;
    }
    //this function finds the rule name, checks to see whats needed within it and adds the details
    //if something is false, it sets valid to false so errors appear on the form page
    public function validateRule($key, $ruleName, $details) {
        $valid = TRUE;
        switch ($ruleName) {
            case "required":
                $valid = isset($this->data[$key]);
                break;
            case "nonempty":
                $valid = !isset($this->data[$key]) || !empty($this->data[$key]);
                break;
            case "integer":
                $valid = !isset($this->data[$key]) ||
                         empty($this->data[$key]) ||
                         $this->isValidInteger($this->data[$key]);
                break;
            case "range":
                $valid = !isset($this->data[$key]) ||
                         empty($this->data[$key]) ||
                         ($this->isValidIntegerInRange($this->data[$key], 
                                 $details["options"]["min"], $details["options"]["max"]));
                break;
            case "from":
                $valid = !isset($this->data[$key]) ||
                         empty($this->data[$key]) ||
                         in_array($this->data[$key], $details["options"]["values"]);
                break;
            case "match":
                $valid = (!isset($this->data[$key]) && 
                          !isset($this->data[$details["options"]["match"]])) ||
                         ($this->data[$key] === $this->data[$details["options"]["match"]]);
                break;
            case "valid_email":
                $valid = !isset($this->data[$key]) ||
                         empty($this->data[$key]) ||
                         $this->isValidEmail($this->data[$key]);
                break;
            
            case "custom":
                $valid = !isset($this->data[$key]) ||
                         empty($this->data[$key]) ||
                         $this->isValidRegExp($this->data[$key], $details["options"]["regexp"]);
                break;
            default:
                break;
        }
        if (!$valid) {
            $this->errors[$key] = $details["errorMessage"];
        }
        
        return $valid;
    }
    
    public function getError($key) {
        $error = "";
        if (isset($this->errors[$key])) {
            $error = $this->errors[$key];
        }
        return $error;
    }

    public function getValue($key) {
        $value = "";
        if (isset($this->data[$key])) {
            $value = $this->data[$key];
        }
        return $value;
    }
    //this checks to see if checked buttons or radio buttons are selected
    public function isChecked($key, $value) {
        $checked = "";
        if (isset($this->data[$key]) && $this->data[$key] === $value) {
            $checked = ' checked="checked"';
        }
        return $checked;
    }
    //this function checks to see if a drop down menu option has been selected
    public function isSelected($key, $value) {
        $selected = "";
        if (isset($this->data[$key]) && $this->data[$key] === $value) {
            $selected = ' selected="selected"';
        }
        return $selected;
    }
    
    //this function checks to see if you have entered a valid number
    protected function isValidInteger($integer) {
        return (filter_var($integer, FILTER_VALIDATE_INT) !== FALSE);
    }
    //this function checks to see if the number you entered was within the range set
    protected function isValidIntegerInRange($integer, $min, $max) {
        $options = array(
            'options' => array(
                'min_range' => $min,
                'max_range' => $max,
            )
        );
        return (filter_var($integer, FILTER_VALIDATE_INT, $options) !== FALSE);
    }
   
    //this function checks to see if the email you entered was a valid email type
    protected function isValidEmail($email) {
        return (filter_var($email, FILTER_VALIDATE_EMAIL) !== FALSE);
    }
    
    protected function isValidRegExp($value, $regexp) {
        $options = array(
            'options' => array(
                'regexp' => $regexp
            )
        );
        return (filter_var($value, FILTER_VALIDATE_REGEXP, $options) !== FALSE);
    }

}

