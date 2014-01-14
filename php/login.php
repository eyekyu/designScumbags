<?php require_once '../dao/userDTO.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet" href="login.css">
        <title>Login</title>
    </head>
    <body>
        <form id="form" action="validateLogin.php" method="post">
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
        
            </table>
            </form>
            <div id="options"></div>
            <div type="submit" id="submitButton" class="lineUp" value="Send Details"></div>
            <div id="registerNow" class="lineUp"  value="Register" onclick="location.href='register.php';"></div>
            <input id="home" class="lineUp"  value="Home" onclick="../index.php';">
    </body>
</html>
