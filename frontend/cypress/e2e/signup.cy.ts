/// <reference types="cypress" />

describe('Signs up a new user', () => {
	function generateRandomEmail(): string {
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		let email = '';
		for (let i = 0; i < 10; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			email += characters[randomIndex];
		}
		return email + '@smartrecipes.uk';
	}
	const randomEmail = generateRandomEmail();
	it('sign up a new user and sign out', () => {
		// visit landing page, enter random email
		cy.visit('/login');
		cy.get('[data-cy="login-page-h1"]').should('have.text', 'Smart Recipes');
		cy.get('[data-cy="email-input"]').type(randomEmail);
		cy.get('[data-cy="password-input"]').type('Password1@');
		// try to login before signing up with new email
		cy.get('[data-cy="login-btn"]').click();
		cy.get('[data-cy="login-page-error-msg"]').should(
			'have.text',
			'Invalid credentials'
		);
		// sign up and redirect to home page
		cy.get('[data-cy="signup-btn"]').click();
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
