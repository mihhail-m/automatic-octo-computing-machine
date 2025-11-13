//TODO: add more negative test cases
describe('Login Page Tests', () => {
  const baseUrl = 'https://automationexercise.com/login';

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  });

  it('should not allow login with invalid credentials', () => {
    // Try to login 
    cy.get('input[name="email"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.get('p').contains('Your email or password is incorrect!').should('be.visible');
  });

  it('should allow login with valid credentials', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[name="name"]').type('admin');
    cy.get('input[name="email"]').type('admin@admin.com');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="password"]').type('password');
    cy.get('input[name="first_name"]').type('firstName');
    cy.get('input[name="last_name"]').type('lastName');
    cy.get('input[name="address1"]').type('address');
    cy.get('input[name="state"]').type('state');
    cy.get('input[name="city"]').type('city');
    cy.get('input[name="zipcode"]').type('44444');
    cy.get('input[name="mobile_number"]').type('3333333');

    cy.get('button[type="submit"]').click();
    cy.get('a[href="/logout"]').should('be.visible').click();

    cy.get('input[name="email"]').type('admin');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.get('a[href="/logout"]').should('be.visible');
  });
});

