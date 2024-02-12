/// <reference types="cypress" />

describe('Successfully creates a new recipe', () => {
	it('log in, create new recipe, view in list, then sign out', () => {
		// log in with test account, go to home page
		cy.visit('/login');
		cy.get('[data-cy="email-input"]').type('test@smartrecipes.uk');
		cy.get('[data-cy="password-input"]').type('Password1@');
		cy.get('[data-cy="login-btn"]').click();
		cy.get('[data-cy="homepage-h1"]').should('have.text', 'Smart Recipes');
		cy.get('[data-cy="homepage-h2"]').should(
			'have.text',
			'What would you like to do?'
		);
		// go to create recipe page, check inputs have correct placeholder text
		cy.contains('Create a recipe').click();
		cy.get('[data-cy="create-recipe-title"]').should(
			'have.attr',
			'placeholder',
			'Enter recipe title'
		);
		cy.get('[data-cy="instructions-input"]').should(
			'have.attr',
			'placeholder',
			'Enter recipe instructions'
		);
		cy.get('[data-cy="servings"]').should(
			'have.attr',
			'placeholder',
			'Enter number of servings'
		);
		// fill in form, select requirements
		cy.get('[data-cy="create-recipe-title"]').type('Pizza');
		cy.get('[data-cy="instructions-input"]').type('Make it spicy');
		cy.get('[data-cy="servings"]').type('12');
		cy.contains('Add Requirement').click();
		cy.get('[data-cy="requirements-h2"]').should('exist');
		cy.get('[data-cy="Vegetarian-checkbox"]').click();
		cy.get('[data-cy="Low-fat-checkbox"]').should('exist');
		cy.get('[data-cy="confirm-requirements-btn"]').click();
		// cancel creation and go back to home page
		cy.get('[data-cy="cancel-create-btn"]').click();
		cy.get('[data-cy="confirm-modal-yes"]').click();
		cy.get('[data-cy="homepage-h1"]').should('have.text', 'Smart Recipes');
		cy.get('[data-cy="homepage-h2"]').should(
			'have.text',
			'What would you like to do?'
		);
		// go to create recipe page, fill form and submit this time
		cy.contains('Create a recipe').click();
		cy.get('[data-cy="create-recipe-title"]').type('Pizza');
		cy.get('[data-cy="instructions-input"]').type('Make it spicy');
		cy.get('[data-cy="servings"]').type('12');
		cy.contains('Add Requirement').click();
		cy.get('[data-cy="requirements-h2"]').should('exist');
		cy.get('[data-cy="Vegetarian-checkbox"]').click();
		cy.get('[data-cy="Low-fat-checkbox"]').click();
		cy.get('[data-cy="Mediterranean-checkbox"]').click();
		cy.get('[data-cy="Seed-free-checkbox"]').click();
		cy.get('[data-cy="confirm-requirements-btn"]').click();
		cy.get('[data-cy="confirm-create-btn"]').click();
		// check if loading game h1 is showing
		cy.get('[data-cy="loading-game-h1"]')
			.should('exist')
			.should('have.text', 'Creating new recipe...');
		// wait for recipe creation to finish, go to recipes page
		cy.contains('Creating recipe...', { timeout: 60000 })
			.should('not.exist')
			.then(() => {
				cy.wait(30000);
				cy.get('[data-cy="loading-game-inner-div"] > .flex').click();
				cy.get('[data-cy="view-recipes-h1"]').should('exist');
				cy.get('[data-cy="search-input"]').should(
					'have.attr',
					'placeholder',
					'Enter recipe name'
				);
				// go back to home page and sign out
				cy.get('[data-cy="view-recipes-go-back-btn"]').click();
				cy.get('[data-cy="signout-btn"]').click();
				cy.get('[data-cy="confirm-modal-h2"]').should(
					'have.text',
					'Do you want to sign out?'
				);
				cy.get('[data-cy="confirm-modal-yes"]')
					.should('have.text', 'Yes')
					.click();
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
});
