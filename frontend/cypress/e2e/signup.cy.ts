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
	it('visits login page and signs up', () => {
		cy.visit('/login');
		cy.get('[data-cy="login-page-h1"]').should('have.text', 'Smart Recipes');
		cy.get('[data-cy="email-input"]').type(randomEmail);
		cy.get('[data-cy="password-input"]').type('Password1@');
		cy.get('[data-cy="login-btn"]').click();
		cy.get('[data-cy="login-page-error-msg"]').should(
			'have.text',
			'Invalid credentials'
		);
		cy.get('[data-cy="signup-btn"]').click();
		cy.get('[data-cy="homepage-h1"]').should('have.text', 'Smart Recipes');
		cy.get('[data-cy="homepage-h2"]').should(
			'have.text',
			'What would you like to do?'
		);
	});
});
