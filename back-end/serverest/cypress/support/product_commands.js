Cypress.Commands.add('list_product', () => {
    cy.request({
        method: 'GET',
        url: '/produtos',
        failOnStatusCode: false,
    })
})

Cypress.Commands.add('create_product', (email, senha, produto,  preco, descricao, quantidade) => {
    cy.getToken(email, senha).then(token => {
        cy.request({
            method: 'POST',
            url: '/produtos',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false,
            body: {
                nome: produto,
                preco: preco,
                descricao: descricao,
                quantidade: quantidade
            }
        })
    })
    
})

