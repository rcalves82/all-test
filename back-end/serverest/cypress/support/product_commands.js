Cypress.Commands.add('list_product', () => {
    cy.request({
        method: 'GET',
        url: '/produtos',
        failOnStatusCode: false,
    })
})

Cypress.Commands.add('id_product', id => {
    cy.request({
        method: 'GET',
        url: `/produtos/${id}`,
        failOnStatusCode: false,
    })
})

Cypress.Commands.add('create_product', (email, senha, produto, preco, descricao, quantidade) => {
    cy.getToken(email, senha).then(token => {
        cy.request({
            method: 'POST',
            url: '/produtos',
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
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

Cypress.Commands.add('update_product', (email, senha, id, produto, preco, descricao, quantidade) => {
    cy.getToken(email, senha).then(token => {
        cy.request({
            method: 'PUT',
            url: `/produtos/${id}`,
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
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

Cypress.Commands.add('delete_product', (email, senha, id) => {
    cy.getToken(email, senha).then(token => {
        cy.request({
            method: 'DELETE',
            url: `/produtos/${id}`,
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
            failOnStatusCode: false,
        })

    })
})