/// <reference types="cypress" />

describe('Navegación en el componente Home', () => {

    it('El boton de titulo "Iniciar sesion" en la ruta "/" debe redirigir fuera del dominio al ser presionado', () => {
        
        cy.visit('/');
       
        const loginButtonSelector = 'button:contains("Iniciar sesión")';

        cy.window().then((win) => {
            const originalLocation = win.location;
            const loc: any = {
                href: originalLocation.href,
                assign: () => {},
                replace: () => {}
            };
            Object.defineProperty(win, 'location', {
                configurable: true,
                writable: true,
                value: loc
            });
            cy.stub(loc, 'assign').callsFake((url: string) => {
                loc.href = url;
                (win as any).location.customUrl = url;
            }).as('redirectionStub');
        });

        cy.get(loginButtonSelector).should('be.visible').click();

        cy.log('Verificando que la redirección externa fue iniciada...');

        cy.get('@redirectionStub').should('be.called');
        
        cy.window().should((win) => {
            const redirectUrl = (win as any).location.customUrl;
            expect(redirectUrl, 'La URL de redirección debe contener el dominio Cognito').to.include('cognito');
            expect(redirectUrl, 'La URL de redirección debe contener el parámetro client_id').to.include('client_id');
        });
    });
});