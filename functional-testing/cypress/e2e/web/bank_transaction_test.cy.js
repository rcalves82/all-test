import web from '../../support/web_data'

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
        const valueTranfer = 200;
        cy.login(web.userRegistered, web.password);
        cy.transfer_account(web.userToTransfer, web.userRegistered, valueTranfer);
        cy.success_transfer();
        cy.validate_amount(web.userToTransfer, web.userRegistered, valueTranfer);
    });

    it('Must logout of the account', () => {
        cy.login(web.userRegistered, web.password);
        cy.logout();
        cy.success_logout();
    });
})