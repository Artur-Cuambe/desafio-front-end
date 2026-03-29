describe('The Home Page', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1600, 900)
  })

  it('successfully loads', () => {
    cy.visit('/')
    cy.get('input[name="hi_email"]').type('fake@email.com')
    cy.get('input[name="hi_password"]').type('password')
    cy.get('button').click()
  })

  it('should throw if email error', () => {
    cy.visit('/')
    cy.get('input[name="hi_email"]').type('fake@email.com')
    cy.get('input[name="hi_password"]').type('password')
    cy.get('button').click()
  })

  it('should throw if password wrong', () => {
    cy.visit('/')
    cy.get('input[name="hi_email"]').type('user@clubnet.com')
    cy.get('input[name="hi_password"]').type('wrong')
    cy.get('button').click()
  })

  it('successfully login', () => {
    cy.visit('/')
    cy.get('input[name="hi_email"]').type('user@clubnet.com')
    cy.get('input[name="hi_password"]').type('password')
    cy.get('button').click()
  })

  // it('login', () => {
  //   cy.get('button').click()
  // })
})