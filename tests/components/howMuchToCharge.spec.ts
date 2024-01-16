//@ts-check
import { test, expect } from "@playwright/test";
const url = "http://localhost:61169/";

test("HMTC form renders", async ({ page }) => {
  await page.goto(url);
  await page.getByLabel("How much should I charge").click();
  await expect(
    page.getByRole("heading", {
      name: "How much should I charge for this gig?",
    })
  ).toBeVisible();
});

test("HMTC inputs render and fields accept input", async ({ page }) => {
  await page.goto(url);
  await page.getByLabel("How much should I charge").click();
  // Fill the form fields
  console.log("Filling in ideal hourly rate field...");
  await page.locator("#idealHourlyRate").fill("75");

  console.log("Filling in gig hours field...");
  await page.locator("#gigHours").click();
  await page.locator("#gigHours").fill("3");

  console.log("Filling in mileage field...");
  await page.locator("#mileage").click();
  await page.locator("#mileage").fill("8");

  console.log("Filling in babysitting hours field...");
  await page.locator("#babysittingHours").click();
  await page.locator("#babysittingHours").fill("4");

  console.log("Filling in babysitting hourly rate field...");
  await page.locator("#babysittingHourlyRate").click();
  await page.locator("#babysittingHourlyRate").fill("15");

  // Take screenshot of the completed form
  await page.screenshot({ path: "screenshot.png" });
});

test("HMTC form submits", async ({ page }) => {
  // correct data is submitted
  await page.goto(url);
  await page.getByLabel("How much should I charge").click();
  // Fill the form fields
  await page.locator("#idealHourlyRate").fill("75");
  await page.locator("#gigHours").click();
  await page.locator("#gigHours").fill("3");
  await page.locator("#mileage").click();
  await page.locator("#mileage").fill("8");
  await page.locator("#babysittingHours").click();
  await page.locator("#babysittingHours").fill("4");
  await page.locator("#babysittingHourlyRate").click();
  await page.locator("#babysittingHourlyRate").fill("15");
  // Submit the form
  await page
    .getByLabel("Submit to find out how much you should charge for this gig")
    .click();
  //get formdata from post request
  const formData = await page.locator("#form").evaluate((form) => {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
  });

  await expect(formData.idealHourlyRate).toEqual("75");
  await expect(formData.gigHours).toEqual("3");
  await expect(formData.mileage).toEqual("8");
  await expect(formData.babysittingHours).toEqual("4");
  await expect(formData.babysittingHourlyRate).toEqual("15");
});

test("HMTC validation", async ({ page }) => {
  //validation messages
  //form does not submit with invalid inputs
  await page.goto(url);
  await page.getByLabel("How much should I charge").click();
  // Submit the form
  await page
    .getByLabel("Submit to find out how much you should charge for this gig")
    .click();
  // Wait for the first error message
  const firstErrorMessage = await page.waitForSelector(".error-message", {
    timeout: 5000,
  }); // Adjust the timeout as needed
  expect(firstErrorMessage).toBeTruthy();

  // Wait for the second error message
  const secondErrorMessage = await page.waitForSelector(".error-message", {
    timeout: 5000,
  });
  expect(secondErrorMessage).toBeTruthy();

  await page.screenshot({ path: "screenshot.png" });
});

test("HMTC button interaction", async ({ page }) => {
  //button clicks for cancel submission
  await page.goto(url);
  await page.getByLabel("How much should I charge").click();
  await page.getByLabel("Close the modal and cancel the action").click();
  expect(page.getByLabel("How much should I charge")).toBeTruthy();
});

test("HMTC accessibility", async ({ page }) => {
  // Ensure the form and its elements are accessible. Check for appropriate ARIA roles, labels, and focus management.
  // Navigate to the page or component you want to test
  await page.goto(url);
  await page.getByLabel("How much should I charge").click();
  // Submit the form
  await page
    .getByLabel("Submit to find out how much you should charge for this gig")
    .click();
  // Wait for the first error message
  await page.waitForSelector(".error-message", {
    timeout: 5000,
  });
  // Check ARIA roles
  const idealHourlyRateErrorARIA = await page.$eval(
    "#idealHourlyRateError",
    (error) => error.getAttribute("role")
  );
  expect(idealHourlyRateErrorARIA).toBe("alert");

  const gigHoursErrorARIA = await page.$eval("#gigHoursError", (error) =>
    error.getAttribute("role")
  );
  expect(gigHoursErrorARIA).toBe("alert");

  //  Check Labels
  const idealHourlyRateLabel = await page.$eval("#idealHourlyRate", (input) =>
    input.getAttribute("aria-labelledby")
  );
  expect(idealHourlyRateLabel).toBeTruthy(); // Ensure label exists

  const gigHoursLabel = await page.$eval("#gigHours", (input) =>
    input.getAttribute("aria-labelledby")
  );
  expect(gigHoursLabel).toBeTruthy(); // Ensure label exists

  const babysittingHoursLabel = await page.$eval("#babysittingHours", (input) =>
    input.getAttribute("aria-labelledby")
  );
  expect(babysittingHoursLabel).toBeTruthy(); // Ensure label exists

  const babysittingHourlyRateLabel = await page.$eval(
    "#babysittingHourlyRate",
    (input) => input.getAttribute("aria-labelledby")
  );
  expect(babysittingHourlyRateLabel).toBeTruthy(); // Ensure label exists

  // Check focus management (e.g., tabbing through elements)
  await page.focus("#idealHourlyRate");

  const focusedElementBeforeTab = await page.evaluate(() => {
    return document?.activeElement?.id;
  });
  expect(focusedElementBeforeTab).toBe("idealHourlyRate"); // Ensure focus is on the expected element after tabbing

  // Simulate a 'Tab' key press to move to the next element
  await page.keyboard.press("Tab");
  let focusedElementAfterTab = await page.evaluate(() => {
    return document?.activeElement?.id;
  });
  expect(focusedElementAfterTab).toBe("gigHours"); // Ensure focus is on the expected element after tabbing

  // Simulate a 'Tab' key press to move to the next element
  await page.keyboard.press("Tab");
  focusedElementAfterTab = await page.evaluate(() => {
    return document?.activeElement?.id;
  });
  expect(focusedElementAfterTab).toBe("mileage"); // Ensure focus is on the expected element after tabbing

  // Simulate a 'Tab' key press to move to the next element
  await page.keyboard.press("Tab");
  focusedElementAfterTab = await page.evaluate(() => {
    return document?.activeElement?.id;
  });
  expect(focusedElementAfterTab).toBe("babysittingHours"); // Ensure focus is on the expected element after tabbing

  // Simulate a 'Tab' key press to move to the next element
  await page.keyboard.press("Tab");
  focusedElementAfterTab = await page.evaluate(() => {
    return document?.activeElement?.id;
  });
  expect(focusedElementAfterTab).toBe("babysittingHourlyRate"); // Ensure focus is on the expected element after tabbing
});

test("HMTC integration", async ({ page }) => {
  // Test the entire flow of the form, from rendering to submission, ensuring all parts work together seamlessly.
  // correct data is submitted
  await page.goto(url);
  await page.getByLabel("How much should I charge").click();
  // Fill the form fields
  await page.locator("#idealHourlyRate").fill("75");
  await page.locator("#gigHours").click();
  await page.locator("#gigHours").fill("3");
  await page.locator("#mileage").click();
  await page.locator("#mileage").fill("8");
  await page.locator("#babysittingHours").click();
  await page.locator("#babysittingHours").fill("4");
  await page.locator("#babysittingHourlyRate").click();
  await page.locator("#babysittingHourlyRate").fill("15");
  // Submit the form
  await page
    .getByLabel("Submit to find out how much you should charge for this gig")
    .click();
  const answerElement = await page.waitForSelector("#result", {
    timeout: 5000,
  });
  // Get the text content of the element
  const answerText = await answerElement.evaluate((element) => {
    return element.textContent;
  });
  expect(answerText).toBe("$295.72");
});

test("HMTC edge cases", async ({ page }) => {
  // correct data is submitted
  await page.goto(url);
  await page.getByLabel("How much should I charge").click();
  // Fill the form fields
  await page.locator("#idealHourlyRate").fill("-1");
  await page.locator("#gigHours").click();
  await page.locator("#gigHours").fill("-1");
  // Submit the form
  await page
    .getByLabel("Submit to find out how much you should charge for this gig")
    .click();
  // Wait for the first error message
  const firstErrorElement = await page.waitForSelector(".error-message", {
    timeout: 5000,
  });
  // Get the text content of the element
  const firstErrorText = await firstErrorElement.evaluate((element) => {
    return element.textContent;
  });
  expect(firstErrorText).toBe("*Must be greater than 0");

  // Wait for the second error message
  const secondErrorElement = await page.waitForSelector(".error-message", {
    timeout: 5000,
  });
  // Get the text content of the element
  const secondErrorText = await secondErrorElement.evaluate((element) => {
    return element.textContent;
  });
  expect(secondErrorText).toBe("*Must be greater than 0");
});
