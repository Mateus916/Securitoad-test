describe("Settings Tests", () => {
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

      localStorage.setItem("authToken", response.body.token);
    });
  });

  it("should redirect to settings after successful SignIn", () => {
    const authToken = localStorage.getItem("authToken");

    expect(authToken).to.be.null;

    cy.visit(baseUrl + "settings", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    cy.url().should("include", "/settings");
  });
});
