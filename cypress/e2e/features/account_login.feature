Feature: Login to account

    Scenario: User should able to navigate to Customer Login page
        Given I am a user
        When I click Sign in button
        Then I should able to navigate to url that contains "https://magento.softwaretestingboard.com/customer/account/login/"

    Scenario: User should able to see error message on invalid input
        Given I am a user
        When I enter a invalid email input
        Then I should able to see a error message "Please enter a valid email address (Ex: johndoe@domain.com)."

        Given I am a user
        When I do not provide password input
        Then I should able to see a error message "This is a required field."

        Given I am a user
        When I do not provide valid credentials
        Then I should able to see a error message "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."

        Given I am a user
        When I do provide valid credentials
        Then I should able to login and navigate to "https://magento.softwaretestingboard.com/customer/account/"
        Then I should able to see my full name