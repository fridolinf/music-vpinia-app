/* This is a Cypress test that visits a website's "/about" page, finds an element with the ID
"git-href", checks that it has a "target" attribute with the value "_blank", changes the "target"
attribute to "_self", clicks on the element, and then checks that the current URL includes
"github.com". The test is checking that clicking on the "git-href" link takes the user to the
correct external website. */
describe('Visiting external website', () => {
  it('Click github link', () => {
    cy.visit('/about')
    cy.get('#git-href')
      .should('be.visible')
      .then(($a) => {
        expect($a).to.have.attr('target', '_blank')
        $a.attr('target', '_self')
      })
      .click()
    cy.url().should('include', 'github.com')
  })
})
