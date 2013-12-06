<?php 
require_once 'dao/userDTO.php';

echo date("Y/m/d")

?>

<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login</title>
 

</head>

<body>
    <form action="validateLogin.php"
          method="post">
        <table> 
            <tr>
                <td class="label">
                    <label for="userName">User Name</label>
                </td>
                <td>
                    <input type="text"
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
                    <label for ="password">Password</label>
                </td>
                <td>
                    <input type ="password" 
                           onclick="select()" 
                           name="password"
                           id="password" 
                           value="<?php
                                if (isset($validator))
                                echo $validator->getValue('password');
                                ?>"
                    />
                    <span id ="myPassWordError" class="error"> 
                        <?php
                            if (isset($validator))
                            echo $validator->getError('password');
                        ?>
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="submit"
                           name="submitButton"
                           id="submitButton"
                           value="Send Details" />
              
            </tr>
        
            <tr>
                <td>
                    <a href="register.php">Register</a>
                </td>

            </tr>
        </table>
        </form>
    </body>
</html>
