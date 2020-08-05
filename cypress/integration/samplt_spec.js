
context('Assertions', () => {
    beforeEach(() => {
      cy.visit('localhost:3000/');
    })

    it('cy.window() - get the global window object', () => {
        cy.get('[data-test-id="login-button-label"]').contains('Log In');
    })
})