describe('Login spec', () => {
  //for wrong user name with correct password
  it('passes', () => {
    //visits amazon website
    cy.visit('https://amazon.in');

    //login your account
    cy.get('#nav-link-accountList-nav-line-1').click();
    cy.get('#ap_email').click().type(/*enter wrong username*/);
    cy.get('.a-button-inner > #continue').click();
    cy.get('#ap_password').click().type(/*enter correct password*/);
    cy.get('#signInSubmit').click();
    cy.wait(2000);
  })

  //for correct username but wrong password
  it('passes', () => {
    cy.visit('https://amazon.in');
    cy.get('#nav-link-accountList-nav-line-1').click();
    cy.get('#ap_email').click().type(/*enter correct username*/);
    cy.get('.a-button-inner > #continue').click();
    cy.get('#ap_password').click().type(/*enter wrong password*/);
    cy.get('#signInSubmit').click();
    cy.wait(2000);
  })

  //for correct username and correct password(successfull login)
  it('passes', () => {
    cy.visit('https://amazon.in');
    cy.get('#nav-link-accountList-nav-line-1').click();
    cy.get('#ap_email').click().type(/*enter correct user name*/);
    cy.get('.a-button-inner > #continue').click();
    cy.get('#ap_password').click().type(/*enter correct password*/);
    cy.get('#signInSubmit').click();
    cy.wait(2000);
  })
})