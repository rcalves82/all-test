Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        body: {
            email: email,
            password: password
        },
    })
})

Cypress.Commands.add('getToken', (email, password) => {
    cy.request({
        method: 'POST',
        url: '/login',
        headers: {
            authorization: 
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ild5YXR0X1JhdGhAZ21haWwuY29tIiwicGFzc3dvcmQiOiJUTGY4c0VBQUNPX2lMU3ciLCJpYXQiOjE2OTY1NDc0NTgsImV4cCI6MTY5NjU0ODA1OH0.-5Jff5etd_oApDYOrouhGBHJqSme3wsFWfB0i364G2U"
        },
        body: {
            email: email,
            password: password
        },
    }).then( async res =>  {
        expect(res.status).to.eq(200)
        cy.log(res.body.authorization)
        Cypress.env('authToken', 'Bearer ' + res.body.authorization);
    });
});
