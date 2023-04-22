/* This is a test case written in Cypress for rendering the about page of a website. The `describe`
block is used to group related test cases together, and the `it` block is used to define a specific
test case. */
describe('render about page', () => {
  it('visits and see about page', () => {
    cy.visit('/about')
    cy.get('.about')
      .each(() => {
        return cy.contains('p').should('have.class', 'about')
      })
      .should('have.class', 'about')
    cy.contains('#github-link', 'See Code')
  })
})
