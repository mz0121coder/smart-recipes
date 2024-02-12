/// <reference types="cypress" />

describe('template spec', () => {
	it('log in, update and delete recipe, then sign out', () => {
		// log in with test account, redirect to home page
		cy.visit('/login');
		cy.get('[data-cy="email-input"]').type('test@smartrecipes.uk');
		cy.get('[data-cy="password-input"]').type('Password1@');
		cy.get('[data-cy="login-btn"]').click();
		cy.get('[data-cy="homepage-h1"]').should('have.text', 'Smart Recipes');
		cy.get('[data-cy="homepage-h2"]').should(
			'have.text',
			'What would you like to do?'
		);
		// go to 'view & manage recipes' page
		cy.contains('View your recipes').click();
		cy.get('[data-cy="view-recipes-h1"]').should('exist');
		cy.get('[data-cy="search-input"]')
			.should('have.attr', 'placeholder', 'Enter recipe name')
			.type('pizza');
		// select recent 'Pizza' item to update
		cy.get(':nth-child(3) > div > [data-cy="Pizza-h2"]')
			.should('have.text', 'Pizza')
			.click();
		cy.get('[data-cy="recipe-options-select"]')
			.should('have.text', 'OptionsUpdateDelete')
			.select('Update');
		cy.get('[data-cy="title-textarea"]').type(' - updated recipe');
		cy.get('[data-cy="instructions-textarea"]').type(' - updated instructions');
		// cancel update and go back to home page
		cy.get('[data-cy="cancel-update-btn"]')
			.should('have.text', 'Cancel')
			.click();
		cy.get('[data-cy="confirm-modal-yes"]').should('have.text', 'Yes').click();
		cy.get('[data-cy="back-to-view-link"] > .bg-gray-200').click();
		cy.get('[data-cy="view-recipes-go-back-btn"]').click();
		// update again and confirm this time
		cy.contains('View your recipes').click();
		cy.get(':nth-child(3) > div > [data-cy="Pizza-h2"]')
			.should('have.text', 'Pizza')
			.click();
		cy.get('[data-cy="recipe-options-select"]')
			.should('have.text', 'OptionsUpdateDelete')
			.select('Update');
		cy.get('[data-cy="title-textarea"]').type(' - updated recipe');
		cy.get('[data-cy="instructions-textarea"]').type(' - updated instructions');
		cy.get('[data-cy="confirm-update-btn"]')
			.should('have.text', 'Update')
			.click();
		cy.get('[data-cy="Pizza - updated recipe-h2"]').should(
			'have.text',
			'Pizza - updated recipe'
		);
		cy.get('[data-cy="Pizza - updated recipe-updated-at"]')
			.should('have.text', 'Updated: less than a minute ago')
			.click();
		// delete recipe
		cy.get('[data-cy="recipe-options-select"]')
			.should('have.text', 'OptionsUpdateDelete')
			.select('Delete', { force: true });
		cy.get('[data-cy="confirm-modal-h2"]').should(
			'have.text',
			'Are you sure you want to delete this recipe?'
		);
		cy.get('[data-cy="confirm-modal-yes"]').should('have.text', 'Yes').click();
		// go back to home page and sign out
		cy.get('[data-cy="view-recipes-go-back-btn"]').click();
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
