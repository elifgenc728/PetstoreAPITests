
describe('Petstore Positive User Tests Scenarios', () => {
    const baseUrl = 'https://petstore.swagger.io/v2';

    it('Get User', () => {
        cy.request('GET', `${baseUrl}/user/elifgenc`).then((response) => {
            expect(response.status).to.eq(200);
        })
    });

    it('Create User', () => {
        const postData = {

            "id": 9223372036854766101,
            "username": "elifgenc",
            "firstName": "Elif",
            "lastName": "Genç",
            "email": "elifgnc@gmail.com",
            "password": "556677",
            "phone": "05768",
            "userStatus": 0

        }
        cy.request({
            method: 'POST',
            url: `${baseUrl}/user`,
            body: postData
        })
            .then((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Update User', () => {
        const postData = {
            "id": 0,
            "username": "elifgencc",
            "firstName": "Elif",
            "lastName": "Genç",
            "email": "elifgnc@gmail.com",
            "password": "556677",
            "phone": "05768",
            "userStatus": 0
          }
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/user/veligenc`,
            body: postData
        })
            .then((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Delete User', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/user/elifgenc`
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});