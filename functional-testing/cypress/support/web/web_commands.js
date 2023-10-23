let amountTransferAcc1
let amountTransferAcc2

Cypress.Commands.add('default_mass', (email, name, account, password) => {
    cy.window().then((win) => {
        win.localStorage.setItem(email, `{"name":"${name}","email":"${email}","password":"${password}","accountNumber":"${account}","balance":2000,"logged":false}`);
        win.localStorage.setItem(`transaction:${email}`, '[{"id":"05aa2121-f38e-4d20-9781-6ad30f0f3691","date":"17/10/2023","type":"Abertura de conta","transferValue":1000,"description":"Saldo adicionado ao abrir conta"}]');
    })
})

Cypress.Commands.add('register_account', (email, name, password) => {
    cy.get('.ihdmxA', { timeout: 3000 }).click();
    cy.get('div.card__register > form > div > input').then(personal => {
        cy.get(personal[0]).click({ force: true }).type(email);
        cy.get(personal[1]).click({ force: true }).type(name);
    })
    cy.get('div.card__register > form > div > div > input').then(passwordFields => {
        cy.get(passwordFields[0]).click({ force: true }).type(password);
        cy.get(passwordFields[1]).click({ force: true }).type(password);
    })
    cy.get('#toggleAddBalance').click({ force: true });
    cy.get('.styles__ContainerFormRegister-sc-7fhc7g-0 > .style__ContainerButton-sc-1wsixal-0').click({ force: true });
})

Cypress.Commands.add('success_register', () => {
    cy.get('#modalText', { timeout: 3000 }).invoke("text").should('match', new RegExp("A conta \\d+-\\d+ foi criada com sucesso"));
})

Cypress.Commands.add('login', (email, password) => {
    cy.get('.style__ContainerFormLogin-sc-1wbjw6k-0 > :nth-child(1) > .input__default', { timeout: 3000 }).click({ force: true }).type(email);
    cy.get('.style__ContainerFormLogin-sc-1wbjw6k-0 > .login__password > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default').click({ force: true }).type(password);
    cy.get('.otUnI').click({ force: true })
})

Cypress.Commands.add('transfer_account', (userToTransfer, userRegistered, valueTranfer) => {
    let dataTranfer
    cy.get('#btn-TRANSFERÊNCIA', { timeout: 3000 }).click({ force: true });
    cy.getAllLocalStorage().then(res => {
        cy.wrap(res["https://bugbank.netlify.app"][userToTransfer]).then(data => {
            dataTranfer = JSON.parse(data);
            amountTransferAcc1 = dataTranfer.balance;
            cy.get(':nth-child(1) > .input__default').click({ force: true }).type(dataTranfer.accountNumber.split("-")[0]);
            cy.get('.account__data > :nth-child(2) > .input__default').click({ force: true }).type(dataTranfer.accountNumber.split("-")[1]);
            cy.get('.styles__ContainerFormTransfer-sc-1oow0wh-0 > :nth-child(2) > .input__default').click({ force: true }).type(valueTranfer);
            cy.get('.style__ContainerButton-sc-1wsixal-0').click({ force: true });
        })

        cy.wrap(res["https://bugbank.netlify.app"][userRegistered]).then(data => {
            dataTranfer = JSON.parse(data);
            amountTransferAcc2 = dataTranfer.balance;
        })
    })
})

Cypress.Commands.add('success_transfer', () => {
    cy.get('#modalText').invoke("text").should("equal", "Transferencia realizada com sucesso");
})

Cypress.Commands.add('validate_amount', (userToTransfer, userRegistered, valueTranfer) => {
    cy.getAllLocalStorage().then(res => {
        cy.wrap(res["https://bugbank.netlify.app"][userToTransfer]).then(data => {
            data = JSON.parse(data);
            expect(data.balance).to.equal(amountTransferAcc1 + valueTranfer)
        });
        cy.wrap(res["https://bugbank.netlify.app"][userRegistered]).then(data => {
            data = JSON.parse(data);
            expect(data.balance).to.equal(amountTransferAcc2 - valueTranfer);
        })
    })
})

Cypress.Commands.add('logout', () => {
    cy.get('.home__ContainerLink-sc-1auj767-2', { timeout: 3000 }).click({ force: true })
})

Cypress.Commands.add('success_logout', () => {
    cy.get('.pages__Title-sc-1ee1f2s-4', { timeout: 3000 }).invoke("text").should("equal", "O banco com bugs e falhas do seu jeito")
})


