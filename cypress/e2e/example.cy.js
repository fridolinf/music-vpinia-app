describe('Sanity test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('#header a:first-child', 'Music')
  })
})
