describe("SignInComponent Tests", () => {
  // Variáveis de configuração
  const baseUrl = "https://app.securitoad.com/";
  const loginEndpoint = "/sign-in";
  const validLoginData = {
    email: "mateus.teles@metaltoad.com",
    password: "123@Demetriooo",
  };

  it("should sign in with valid email and password", () => {
    cy.request({
      method: "POST",
      url: baseUrl + loginEndpoint,
      body: validLoginData,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201, 204]);
    });
  });

  it("should not sign in with invalid email and password", () => {
    const invalidLoginData = {
      email: "wrongemail@example.com",
      password: "wrongpassword",
    };

    cy.request({
      method: "POST",
      url: baseUrl + loginEndpoint,
      body: invalidLoginData,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 400, 401]); 
      expect(response.body).to.not.have.property("token");
    });
  });

  it("should not sign in with empty email field", () => {
    const loginDataWithEmptyEmail = {
      email: "", 
      password: "somepassword",
    };

    cy.request({
      method: "POST",
      url: baseUrl + loginEndpoint,
      body: loginDataWithEmptyEmail,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 400, 401]);
      expect(response.body).to.not.have.property("token");
    });
  });

  it("should not sign in with empty password field", () => {
    const loginDataWithEmptyPassword = {
      email: "someemail@example.com",
      password: "", 
    };

    cy.request({
      method: "POST",
      url: baseUrl + loginEndpoint,
      body: loginDataWithEmptyPassword,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 400, 401]);
      expect(response.body).to.not.have.property("token");
    });
  });
});
