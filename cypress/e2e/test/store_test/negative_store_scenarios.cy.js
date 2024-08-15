describe('Petstore Store Negative Tests Scenarios', () => {
    const baseUrl = 'https://petstore.swagger.io/v2';

    // Invalid Order ID
    it('should return an error for an invalid order ID', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/store/order/999999`, // Geçersiz bir ID kullanıyoruz
            failOnStatusCode: false // Hatalı yanıt durumlarında Cypress'ın testi durdurmaması için
        }).then((response) => {
            expect(response.status).to.eq(404); // 404 bekliyoruz
            expect(response.body).to.have.property('message', 'Order not found');
        });
    });

    // Creating Order with Missing Required Fields
    it('should return an error when creating an order with missing required fields', () => {
        const incompleteOrder = {
            id: 12346, // Eksik alanlar: petId, quantity, status
        };
        cy.request({
            method: 'POST',
            url: `${baseUrl}/store/order`,
            body: incompleteOrder,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); // 400 Bad Request bekliyoruz
        });
    });

    // Deleting Non-Existent Order
    it('should return an error when trying to delete a non-existent order', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/store/order/999999`, // Geçersiz bir ID kullanıyoruz
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404); // 404 bekliyoruz
            expect(response.body).to.have.property('message', 'Order not found');
        });
    });
});
