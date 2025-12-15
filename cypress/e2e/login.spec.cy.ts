/// <reference types="cypress" />

describe('Navegación en el componente Home', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Minified React error')) {
        return false;
      }
      return true;
    });
  });

  it('Al navegar a la ruta /home debe retornar a la ruta de login /', () => {
    cy.visit('http://localhost:5173/home');
    cy.url().should('include', '/login');
    cy.url().should('eq', 'http://localhost:5173/login');
  });

  it('Al presionar el botón de texto "INICIAR SESION" debes ser redirigido del base domain', () => {
    cy.visit('http://localhost:5173/login');
    
    cy.url().should('eq', 'http://localhost:5173/login');
    
    cy.contains('button', /INICIAR SESI[OÓ]N/i).should('be.visible');
    
    cy.contains('button', /INICIAR SESI[OÓ]N/i).click();
    
    cy.wait(2000);
    
    cy.url().should('include', 'localhost:5173');
    
    cy.url().should('include', 'amazoncognito.com');
    cy.url().should('include', 'auth.us-east-2.amazoncognito.com');
    
    cy.url().should('include', 'client_id=');
    cy.url().should('include', 'redirect_uri=');
    cy.url().should('include', 'response_type=code');
  });
});
