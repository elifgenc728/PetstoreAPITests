describe('Petstore Negative Pet Tests Scenarios', () => {
    const baseUrl = 'https://petstore.swagger.io/v2';

    it('should return an error for invalid pet status', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/pet/findByStatus?status=invalidStatus`,
            failOnStatusCode: false // Hatalı yanıtlar için status kodunda hata almamak için
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message').that.includes('Invalid status value');
        });
    });

    it('should return an error when creating a pet with missing fields', () => {
        const incompletePet = {
            id: 12345,
            // Eksik `name` alanı
            status: 'available'
        };
        cy.request({
            method: 'POST',
            url: `${baseUrl}/pet`,
            body: incompletePet,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message').that.includes('Invalid input');
        });
    });

    it('should return an error when updating a pet with missing fields', () => {
        const incompleteUpdatedPet = {
            id: 12345,
            // Eksik `status` alanı
            name: 'doggie updated'
        };
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/pet`,
            body: incompleteUpdatedPet,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message').that.includes('Invalid input');
        });
    });

    it('should return an error when deleting a non-existent pet', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/pet/99999`, // Var olmayan bir pet ID'si
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message').that.includes('Pet not found');
        });
    });
    
    
})