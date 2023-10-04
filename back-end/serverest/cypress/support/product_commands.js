Cypress.Commands.add('list_product', () => {
    cy.request({
        method: 'GET',
        url: '/produtos',
        failOnStatusCode: false,
    })
})

Cypress.Commands.add('create_product', (nome,  preco, descricao, quantidade) => {
    cy.request({
        method: 'POST',
        url: '/produtos',
        failOnStatusCode: false,
        body: {
            nome: nome,
            preco: preco,
            descricao: descricao,
            quantidade: quantidade
        }
    })
})

