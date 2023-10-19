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

Cypress.Commands.add('create_product', (email, pass, prod, pric, descript, amoun) => {
    cy.getToken(email, pass).then(token => {
        cy.request({
            method: 'POST',
            url: '/produtos',
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
            failOnStatusCode: false,
            body: {
                nome: prod,
                preco: pric,
                descricao: descript,
                quantidade: amoun
            }
        })
    })

})

Cypress.Commands.add('update_product', (email, pass, id, prod, pric, descript, amoun) => {
    cy.getToken(email, pass).then(token => {
        cy.request({
            method: 'PUT',
            url: `/produtos/${id}`,
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
            failOnStatusCode: false,
            body: {
                nome: prod,
                preco: pric,
                descricao: descript,
                quantidade: amoun
            }
        })

    })
})

Cypress.Commands.add('delete_product', (email, pass, id) => {
    cy.getToken(email, pass).then(token => {
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