<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="../css/register.css">
        <title>Register</title>
        <script language="javascript" type="text/javascript"
                src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script language="javascript" type="text/javascript"
                src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.10.0/jquery.validate.min.js"></script>
        <script>
    $(function() {
       $( "#registerForm" ).validate({
           rules: {userName: {required:true},
                   email: {required:true,   email:true},
                   password:{required:true, minlength:5},
                   confirmPassword: {required:true, minlength:5, equalTo: "#password"}
               },
            messages: {userName: {required: "Please enter a username"},
                       email: {required: "Please enter a email"},
                       password: {required: "Please enter a password" },
                       confirmPassword: {
                               required: "Please enter a Password",
                               equalTo: "Please match the password field"
                       }
            }
        });
    });
    </script>
    </head>
    
    <body>
        <form id="registerForm"
              action="validateData.php"
              method="post">
            <table>
                <tr>
                    <td>
                        <label for ="userName">User Name:</label>
                    </td>
                    <td>
                        <input type ="text"
                               name="userName"
                               id="userName"
                               value="<?php
                                    if (isset($validator))
                                    echo $validator->getValue('userName');
                                    ?>"
                        />
                        <span id ="userNameError" class="error"> 
                            <?php
                                if (isset($validator))
                                echo $validator->getError('userName');
                            ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for ="email">Email:</label>
                    </td>
                    <td>
                        <input type ="text"
                               name="email"
                               id="email"
                               value="<?php
                                    if (isset($validator))
                                    echo $validator->getValue('email');
                                    ?>"
                        />
                        <span id ="emailError" class="error">
                            <?php
                                if (isset($validator))
                                echo $validator->getError('email');
                            ?>
                        </span>
                    </td>
                </tr>
                            <tr>
                    <td>
                        <label for ="password">Password:</label>
                    </td>
                    <td>
                        <input type="password" 
                               name="password" 
                               id="password"  
                               value="<?php
                                    if (isset($validator))
                                    echo $validator->getValue('password');
                                    ?>"
                        />
                        <span id ="passwordError" class="error">
                            <?php
                                if (isset($validator))
                                echo $validator->getError('password');
                            ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for ="confirmPassword">Confirm Password:</label>
                    </td>
                    <td> 
                        <input type="password"
                               name="confirmPassword" 
                               id="confirmPassword"
                               value="<?php
                                    if (isset($validator))
                                    echo $validator->getValue('confirmPassword');
                                    ?>"
                        />
                        <span id ="passwordConfirmError" class="error">
                            <?php
                                if (isset($validator))
                                echo $validator->getError('confirmPassword');
                            ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="submit"
                               name="submitButton"
                               id="submitButton"
                               value="Send Details" />&nbsp; 
                        <input type="reset" 
                                id="reset"
                               value="Reset Form" />
                    </td>
                </tr>
            </table>
        </form>
        <input id="home" value="Home" onclick="location.href='../index.php';" />
                   
    </body>
</html>