describe("Quiz flow", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.env(["TEST_EMAIL", "TEST_PASSWORD"]).then(({ TEST_EMAIL, TEST_PASSWORD }) => {
      cy.get('input[name="email"]').type(TEST_EMAIL);
      cy.get('input[name="password"]').type(TEST_PASSWORD);
    });
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/quiz");
    cy.wait(2000)
  });

 function answerAllQuestions() {
  cy.get(".grid.grid-cols-5 button").its("length").then((total) => {
    for (let i = 0; i < total; i++) {
      cy.get(".grid.grid-cols-5 button.bg-transparent").first().click();
      cy.wait(1000)
      cy.get("label").eq(1).click();
    }
  });
}

  it("completes a quiz from start to finish", () => {
    cy.visit("/dashboard/quizzes");
    cy.get("button").contains(/Attempt Quiz|Resume Quiz|Re-Attempt Quiz/).click();
    cy.get('[role="dialog"]').within(() => {
      cy.get("button").contains(/Attempt Quiz|Resume Quiz|Re-Attempt Quiz/).click();
    });
    cy.get("button").contains("Start Quiz!").click();
    cy.wait(3000)
    answerAllQuestions();
    cy.get("button").contains("Go").click();
    cy.get("h2").contains("Performance Summary").should("be.visible");
  });
});