/* This is a test case written in Cypress for an audio player. The `describe` block is used to group
related test cases together and provide a description of what they are testing. In this case, the
group is named "Audio Player". The `it` block is used to define a specific test case within the
group, with the description "play song". */
describe('Audio Player', () => {
  it('play song', () => {
    cy.visit('/')
    cy.get('.song-item:first').click()
    cy.wait(3000)
    cy.get('#play-btn').click()
    cy.wait(5000)
    cy.get('#player-play-btn').click()
  })
})
