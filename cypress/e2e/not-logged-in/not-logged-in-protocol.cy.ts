/// <reference types="cypress" />

context('Protocol page', () => {

    it('should load template id 0 (No attack)', () => {
        cy.visit('protocol/basic-kerberos?id=0&template=true')
    })

    it('should download .Anb file', () => {
        cy.intercept('GET','api/protocols/0?template=true', req => {
            req.alias = 'protocol'
        })
        cy.wait('@protocol')
        cy.get('[cy-data="download-button"]').click()
    })

    it('should show modal when click run code button', () => {
        cy.visit('protocol/basic-kerberos?id=0&template=true')

        cy.contains('Run code').click()
        cy.get('[for="username"]')
        cy.get('[for="email"]')
        cy.get('[for="password"]')
    })


})
