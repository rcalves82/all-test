import web from '../../support/web_data'

Cypress.config
describe('Bank transaction test', () => {
    beforeEach(() => {
        cy.visit(web.url);
        cy.default_mass(web.userRegistered, "Test mass 1", "504-1", web.password);
        cy.default_mass(web.userToTransfer, "Test mass 2", "505-1", web.password);
    });

    it('Must register successfully', () => {
        cy.register_account(web.email1, web.name1, web.password);
        cy.success_register();
    });

    it('Must validate transfer between accounts', () => {
        const valueToTranfer = 100;
        cy.login(web.userRegistered, web.password);
        cy.transfer_account(web.userToTransfer, web.userRegistered, valueToTranfer);
        cy.success_transfer();
        cy.validate_amount(web.userToTransfer, web.userRegistered, valueToTranfer);
    });

    it('Must logout of the account', () => {
        cy.login(web.userRegistered, web.password);
        cy.logout();
        cy.success_logout();
    });
})