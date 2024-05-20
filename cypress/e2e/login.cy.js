describe('Login Page', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button')
        .contains(/^Login$/)
        .should('be.visible');
  });

  it('should display alert when username and password are wrong', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input#email').type('testUser@gmail.com');
    cy.get('input#password').type('testpassword');
    cy.get('button')
        .contains(/^Login$/)
        .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage and accessToken exist in localStorage when username and password are correct', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input#email').type('yoviarpauzi99@gmail.com');
    cy.get('input#password').type('14112002');
    cy.get('button')
        .contains(/^Login$/)
        .click();

    cy.get('nav').should('be.visible');

    cy.get('div.p-1.border-2.border-orange-500 > p.text-orange-500.font-bold')
        .should('exist')
        .and('have.text', 'NF');

    cy.window().then((window) => {
      const storedItem = window.localStorage.getItem('accessToken');
      expect(storedItem).to.exist;
    });
  });
});
