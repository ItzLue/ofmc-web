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

    it('should load templates', () => {
        // Check for a few templates with template ID
        cy.get('[data-cy="0"]')
        cy.get('[data-cy="3"]')
        cy.get('[data-cy="4"]')
        cy.get('[data-cy="5"]')
        cy.get('[data-cy="6"]')

        cy.get('#headlessui-tabs-tab-\\:R6hkm\\:').should('not.be.disabled')
        cy.get('#headlessui-tabs-tab-\:Rahkm\:').should('be.disabled')
        cy.get('#headlessui-tabs-tab-\:Rehkm\:').should('be.disabled')
    })

    it('should template 0 (No attack) in code view', () =>  {

        cy.get('[data-cy="0"] > a').click()

        cy.url().should('include','/basic-kerberos?id=0&template=true')

        cy.contains('Basic Kerberos')
        cy.contains('No attack found')
    })
})
