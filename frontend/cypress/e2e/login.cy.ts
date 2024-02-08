/// <reference types="cypress" />

describe('Logs in an existing user', () => {
	it('log in with test credentials and log out', () => {
		// visit landing page, enter test account credentials
		cy.visit('/login');
		cy.get('[data-cy="login-page-h1"]').should('have.text', 'Smart Recipes');
		cy.get('[data-cy="email-input"]').type('test@smartrecipes.uk');
		cy.get('[data-cy="password-input"]').type('Password1@');
		// try to sign up with an existing account
		cy.get('[data-cy="signup-btn"]').click();
		cy.get('[data-cy="login-page-error-msg"]').should(
			'have.text',
			'Invalid credentials'
		);
		// log in and redirect to home page
		cy.get('[data-cy="login-btn"]').click();
		cy.get('[data-cy="homepage-h1"]').should('have.text', 'Smart Recipes');
		cy.get('[data-cy="homepage-h2"]').should(
			'have.text',
			'What would you like to do?'
		);
		// click sign out icon then cancel
		cy.get('[data-cy="signout-btn"]').click();
		cy.get('[data-cy="confirm-modal-h2"]').should(
			'have.text',
			'Do you want to sign out?'
		);
		cy.get('[data-cy="confirm-modal-no"]').should('have.text', 'No').click();
		cy.get('[data-cy="confirm-modal-h2"]').should('not.exist');
		// click sign out icon then confirm sign out
		cy.get('[data-cy="signout-btn"]').click();
		cy.get('[data-cy="confirm-modal-h2"]')
			.should('have.text', 'Do you want to sign out?')
			.click();
		cy.get('[data-cy="confirm-modal-yes"]').should('have.text', 'Yes').click();
		// redirect to landing page
		cy.get('[data-cy="login-form"]').should('exist');
		cy.get('[data-cy="email-input"]').should(
			'have.attr',
			'placeholder',
			'Enter your email'
		);
		cy.get('[data-cy="password-input"]').should(
			'have.attr',
			'placeholder',
			'Enter your password'
		);
	});
});
