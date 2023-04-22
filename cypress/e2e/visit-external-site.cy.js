/* This is a Cypress test that visits a webpage, finds an element with the ID "git-href", checks that
it has a target attribute set to "_blank", changes the target attribute to "_self", clicks on the
element, and then checks that the current URL includes "github.com". The test is named "Visiting
external website" and has a single test case named "Click github link". */
describe('Visiting external website', () => {
  it('Click github link', () => {
    cy.visit('/about')
    /* This code is finding an element with the ID "git-href" on the webpage, checking that it is
    visible, and then using a callback function to check that the element has a target attribute set
    to "_blank". If the attribute is set correctly, the code changes the target attribute to
    "_self". Finally, the code clicks on the element. */
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
