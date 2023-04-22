/* This is a test suite written in Cypress for testing the rendering of the manage page after
registration or login. The first test case is commented out and was intended to test the rendering
of the manage page after registration. The second test case tests the rendering of the manage page
after login. It visits the about page, checks if the user is already logged in, and logs out if
necessary. Then it clicks on the login/register button, selects the login tab, enters the email and
password, and submits the form. Finally, it visits the manage page to check if it is rendered
correctly. */
describe('render manage page', () => {
  // it('render manage page after register', () => {
  //   cy.visit('/about')
  //   cy.get('#login-register').click()
  //   cy.get('#register-tab').click()
  //   cy.get('#name').type('Frey')
  //   cy.get('#email').type('frey@gmail.com')
  //   cy.get('#age').type('33')
  //   cy.get('#password').type('123456789')
  //   cy.get('#confirm_password').type('123456789')
  //   cy.get('#tos').click()
  //   cy.get('#submit-register').click()
  //   cy.get('#manage-tab').click()
  // })
  it('render manage page after login', () => {
    cy.visit('/about')
    cy.get('a').then(($val) => {
      if ($val.hasClass('logout')) {
        cy.get('#logout')
          .click()
          .then(() => {
            cy.get('#login-register').click()
            cy.get('#login-tab').click()
            cy.get('#email').type('frey@gmail.com')
            cy.get('#password').type('123456789')
            cy.get('#submit').click()
            cy.visit('/manage')
          })
      } else {
        cy.get('#login-register').click()
        cy.get('#login-tab').click()
        cy.get('#email').type('frey@gmail.com')
        cy.get('#password').type('123456789')
        cy.get('#submit').click()
        cy.wait(5000)
        cy.visit('/manage')
      }
    })
  })
})
