const random = Math.floor(Math.random() * 9000) + 1000;

const user = {
    first_name: "Siva",
    last_name: "Kumar",
    email: `sp-test-${random}@testmail.com`,
    password: "TestUser@4564"
}

describe('Create an account', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('a', 'Create an Account').click();
    })

    it('User should able to navigate to Create Account page', () => {
        cy.url().should('include', 'customer/account/create');
    })

    describe('User should able to see error message on invalid input', () => {
        it('should see error message on first name is empty', () => {
            cy.get('#lastname').type(user.last_name);
            cy.get('#email_address').type(user.email);
            cy.get('#password').type(user.password);
            cy.get('#password-confirmation').type(user.password);
            cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();

            cy.get('#firstname-error').contains('This is a required field.')
        })

        it('should see error message on invalid email entry', () => {
            const invalidEmail = "email";

            cy.get('#firstname').type(user.first_name);
            cy.get('#lastname').type(user.last_name);
            cy.get('#email_address').type(invalidEmail);
            cy.get('#password').type(user.password);
            cy.get('#password-confirmation').type(user.password);
            cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();

            cy.get('#email_address-error').contains('Please enter a valid email address')
        })

        it('should see error message on invalid email entry', () => {
            const registeredEmail = "test@gmail.com";

            cy.get('#firstname').type(user.first_name);
            cy.get('#lastname').type(user.last_name);
            cy.get('#email_address').type(registeredEmail);
            cy.get('#password').type(user.password);
            cy.get('#password-confirmation').type(user.password);
            cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();

            cy.get('.message-error > div').contains('There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.')
        })

        it('should see error message on password input of less than valid length characters', () => {
            cy.get('#firstname').type(user.first_name);
            cy.get('#lastname').type(user.last_name);
            cy.get('#email_address').type(user.email);
            cy.get('#password').type('12');
            cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();

            cy.get('#password-error').contains('Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.')
        })

        it('should see error message on password input of invalid/insecure password', () => {
            cy.get('#firstname').type(user.first_name);
            cy.get('#lastname').type(user.last_name);
            cy.get('#email_address').type(user.email);
            cy.get('#password').type('password');
            cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();

            cy.get('#password-error').contains('Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.')
        })

        it('should see error message on password!=confirm_password', () => {
            cy.get('#firstname').type(user.first_name);
            cy.get('#lastname').type(user.last_name);
            cy.get('#email_address').type(user.email);
            cy.get('#password').type(user.password);
            cy.get('#password-confirmation').type('unmatched password');
            cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();

            cy.get('#password-confirmation-error').contains('Please enter the same value again.')
        })
    })

    it('user should be able to create an account successfully and logout', () => {
        cy.get('#firstname').type(user.first_name)
        cy.get('#lastname').type(user.last_name)
        cy.get('#email_address').type(user.email)
        cy.get('#password').type(user.password)
        cy.get('#password-confirmation').type(user.password)
        cy.get('#form-validate > .actions-toolbar > div.primary > .action > span').click()

        cy.get('.message-success').should('contain', 'Thank you for registering')

        cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
        cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a').click()

        cy.url().should('contains', 'customer/account/logoutSuccess')
    })
})

describe('Login to account', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('a', 'Sign In').click();
    })

    it('User should able to navigate to Customer Login page', () => {
        cy.url().should('include', 'customer/account/login');
    })

    describe('User should able to see error message on invalid input', () => {
        it('should see error message on empty password input', () => {
            cy.get('#email').type(user.email)
            cy.contains('#send2', 'Sign In').click()
            cy.get('#pass-error').should('eq', 'This is a required field.')
        })

        it('should see error message on invalid credentials input', () => {
            cy.get('#email').type(user.email)
            cy.get('#pass').type('invalid_passwrod')
            cy.contains('#send2', 'Sign In').click()
            cy.get('.message-error > div').should('contain', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
        })
    })


    it('user should successfully login with valid credentials', () => {
        cy.get('#email').type(user.email)
        cy.get('#pass').type(user.password)
        cy.contains('#send2', 'Sign In').click()
    })
})