Feature: Create an account

    Scenario: User should able to navigate to Create Account page
        Given I am a user
        When I click Create an Account button
        Then I should able to navigate to "https://magento.softwaretestingboard.com/customer/account/create/"

    Scenario: User should able to see error message on invalid input
        Given I am a user
        When I leave First name input field empty
        Then I should able to see a error message "This is a required field."

        Given I am a user
        When I enter a invalid email input
        Then I should able to see a error message "Please enter a valid email address (Ex: johndoe@domain.com)."

        Given I am a user
        When I enter a email that is already registered
        Then I should able to see a error message "There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account."

        Given I am a user
        When I enter a password with less than required character length
        Then I should able to see a error message "Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored."

        Given I am a user
        When I enter a invalid/insecure password
        Then I should able to see a error message "Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters."

        Given I am a user
        When I enter a invalid confirm password
        Then I should able to see a error message "Please enter the same value again."


    Scenario: User should able to create an account and logout successfully
        Given I am a user
        When I input all required fields with valid data
        Then I should able to create account successfully with message "Thank you for registering with Main Website Store."

        Given I am a loggedin user
        When I click logout button
        Then I should able to logout