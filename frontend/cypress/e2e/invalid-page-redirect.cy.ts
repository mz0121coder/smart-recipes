describe('Uses not found component for invalid pages', () => {
	it('visit invalid page without logging in', () => {
		// go to invalid page, see correct message
		cy.visit('/lkjfhlskfhgwri');
		cy.get('[data-cy="not-found-page-h1"]').should(
			'have.text',
			'This is an invalid URL.'
		);
		// go back to landing page
		cy.get('[data-cy="go-back-link"]').should('have.text', 'Go Back').click();
		cy.get('[data-cy="login-page-h1"]').should('have.text', 'Smart Recipes');
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
	it('visit invalid page after logging in', () => {
		// from landing page, log in with test account
		cy.visit('/login');
		cy.get('[data-cy="email-input"]').type('test@smartrecipes.uk');
		cy.get('[data-cy="password-input"]').type('Password1@');
		cy.get('[data-cy="login-btn"]').click();
		cy.get('[data-cy="homepage-h1"]').should('have.text', 'Smart Recipes');
		cy.get('[data-cy="homepage-h2"]').should(
			'have.text',
			'What would you like to do?'
		);
		// after logging in, go to invalid page
		cy.visit('/lkjfhlskfhgwri');
		cy.get('[data-cy="not-found-page-h1"]').should(
			'have.text',
			'This is an invalid URL.'
		);
		// go back to home page, then sign out
		cy.get('[data-cy="go-back-link"]').should('have.text', 'Go Back').click();
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
