describe('Petstore Store Positive Tests Scenarios', () => {
    const baseUrl = 'https://petstore.swagger.io/v2';

   
    it('should fetch an order by ID', () => {
        cy.request('GET', `${baseUrl}/store/order/1`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', 1);
        });
    });

    
    it('should create a new order', () => {
        const newOrder = {
            id: 12345,
            petId: 1,
            quantity: 1,
            shipDate: '2024-08-15T00:00:00.000Z',
            status: 'placed',
            complete: true
        };
        cy.request({
            method: 'POST',
            url: `${baseUrl}/store/order`,
            body: newOrder
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', 12345);
        });
    });

  
    it('should delete an order by ID', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/store/order/12345`
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});
