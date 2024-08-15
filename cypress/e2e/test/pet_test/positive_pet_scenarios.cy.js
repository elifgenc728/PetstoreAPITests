

describe('Petstore Positive Pet Tests Scenarios', () => {
    const baseUrl = 'https://petstore.swagger.io/v2';
  
    it('should fetch pets by status', () => {
      cy.request('GET', `${baseUrl}/pet/findByStatus?status=available`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    it('should create a new pet', () => {
      const postPet = {
        id: 12345,
        name: 'fındık',
        status: 'available'
      };
      cy.request('POST', `${baseUrl}/pet`, postPet).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 12345);
      });
    });
  
    it('should update a pet', () => {
      const updatedPet = {
        id: 12345,
        name: 'doggie updated',
        status: 'sold'
      };
      cy.request('PUT', `${baseUrl}/pet`, updatedPet).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'doggie updated');
      });
    });
  
    it('should delete a pet', () => {
      cy.request('DELETE', `${baseUrl}/pet/12345`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  
  
  
   });
  