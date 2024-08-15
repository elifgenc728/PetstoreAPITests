describe('Petstore Negative User Tests Scenarios', () => {
    const baseUrl = 'https://petstore.swagger.io/v2';

    it('Get Non-Existing User - Should return 404', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/user/nonexistentuser`,
            failOnStatusCode: false // Hata kodu dönerse testi fail etmemesi için
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', 'User not found');
        });
    });
    
    it('Create User with Invalid Data - Should return 400', () => {
        const postData = {
            "id": "invalid_id", // Geçersiz ID
            "username": "",
            "firstName": "",
            "lastName": "",
            "email": "invalidemail",
            "password": "",
            "phone": "",
            "userStatus": 0
        };
        cy.request({
            method: 'POST',
            url: `${baseUrl}/user`,
            body: postData,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });
    it('Update Non-Existing User - Should return 404', () => {
        const postData = {
            "id": 0,
            "username": "nonexistentuser",
            "firstName": "Non",
            "lastName": "Existing",
            "email": "nonexistent@example.com",
            "password": "password123",
            "phone": "1234567890",
            "userStatus": 0
        };
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/user/nonexistentuser`,
            body: postData,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', 'User not found');
        });
    });
    
    it('Delete Non-Existing User - Should return 404', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/user/nonexistentuser12345`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', 'User not found');
        });
    });
    
})