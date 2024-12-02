Feature: Visit site `https://magento.softwaretestingboard.com`

    Scenario: User should able to access the ste
        Given I am a user
        When I enter valid url
        Then I should able to load the site "https://magento.softwaretestingboard.com"