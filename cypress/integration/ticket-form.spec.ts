// Your tests go in here. Happy coding! 🤓
describe('1', () => {
    //Positive
    it('successfully loads', () => {
        cy.visit('http://localhost:3000'),
            cy.get('#name').type('Jan'),
            cy.get('#email').type('jan@test.fi'),
            cy.get('#subject').type('test'),
            cy.get('#message').type('My message'),
            cy.get('button').click()
    })
})

context('Errors', () => {
    const errorMsg = 'Internal server error'

    it('simulates a server error', () => {
        cy.intercept('GET', '**/search?query=cypress', { statusCode: 500 }).as(
            'getServerFailure'
        )

        cy.visit('http://localhost:3000')

        cy.get('#name').type('Jan'),
            cy.get('#email').type('jan@test.fi'),
            cy.get('#subject').type('test'),
            cy.get('#message').type('My message'),
            cy.get('button').click(),
            cy.wait('@getServerFailure')

        cy.contains(errorMsg).should('be.visible')
    })
})
