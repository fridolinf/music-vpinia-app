/* The code is using Cypress to test the translation of values on a webpage. The `describe` block is
defining a test suite called "translating value", and the `it` block is defining a specific test
case within that suite called "translate header and about". */
describe('translating value', () => {
  it('translate header and about', () => {
    cy.visit('/about')
    cy.get('#locale').click()
    cy.get('#logout').contains('Keluar')
    cy.contains('#github-link', 'Lihat Kode')
  })
})
