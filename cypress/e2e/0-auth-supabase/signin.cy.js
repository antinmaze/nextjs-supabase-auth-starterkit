/// <reference types="cypress" />

/**
 * This spec file contains a variety of tests for the signin page
 */

describe('Get the signin page', () => {
  const DELAY_MS = 500;

  beforeEach(() => {
    cy.visit('http://localhost:3000/signin')
  })

  it('Signin: Verify that an error is diplayed when the email is NOT valid such as test@example', () => {
    //set the wrong email
    cy.get('#email').type('test@example');
    cy.get('#button-signin').click();
    //verify the error message
    cy.wait(DELAY_MS);
    cy.get('#infomessage').should('have.text', 'The input email is not valid.');
  })

   it('Verify that an error is diplayed when the password is NOT valid', () => {
    // Set the wrong email
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('Hellohello');
    cy.get('#button-signin').click();
    //verify the error message
    cy.wait(DELAY_MS);
    cy.get('#infomessage').should('have.text', 'The input password is not valid.');
  })
})
