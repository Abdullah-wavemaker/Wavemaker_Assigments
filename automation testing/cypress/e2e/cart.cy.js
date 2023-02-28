describe('Login spec', () => {
    it('passes', () => {
      //visits amazon website 

      cy.visit('https://amazon.in');

      //login account

      cy.get('#nav-link-accountList-nav-line-1').click();
      cy.get('#ap_email').click().type(/*enter your phone no or email*/);
      cy.get('.a-button-inner > #continue').click();
      cy.get('#ap_password').click().type(/*enter your account password*/);
      cy.get('#signInSubmit').click();
      
      //wait for 2 seconds
      cy.wait(2000);

      //search for perfumes

      cy.get('#twotabsearchtextbox').click().type("perfumes");
      cy.get('#nav-search-submit-button').click();

      //add to cart the first item
      cy.get('#a-autoid-1-announce').click()
    })
  })