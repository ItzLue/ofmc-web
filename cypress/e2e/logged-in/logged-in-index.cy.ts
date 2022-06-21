/// <reference types="cypress" />

context('index page', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('should load successfully', () => {
        // Check buttons
        cy.contains('Login')
        cy.contains('Sign up')
    })

    it('should sign in as a user', () => {
        if (cy.contains('Login')) {
            cy.get('[data-cy="log-in-button"]').click()

            cy.get('[type="email"]')
                .type(`louinissen@gmail.com`)

            cy.get('[type="password"]')
                .type('password')

            cy.get('.flex-col > .inline-flex').click()
        }
    })

    it('should have statistics and tabs', () => {
        cy.contains('Protocols created')
        cy.contains('Total attacks prevented')
        cy.contains('Most solved type')

        cy.get('#headlessui-tabs-tab-\:Rahkm\:')
    })

})
