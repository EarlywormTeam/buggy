import { Stagehand } from "@browserbasehq/stagehand";
import { test, expect, vi, afterEach } from 'vitest';
import { z } from "zod";
import dotenv from 'dotenv';
dotenv.config();

vi.setConfig({ testTimeout: 300000 });

const ErrorSchema = z.object({
  errorMessage: z.string().nullable()
});

let stagehand;

afterEach(async () => {
  if (stagehand) {
    await stagehand.close();
  }
});

test("Chris Wood: Contact submission error, 500", async () => {
  stagehand = new Stagehand({
    env: "Local",
    debugDom: false,
    headless: true,
    domSettleTimeoutMs: 30_000,
    modelName: "claude-3-5-sonnet-20241022",
    modelClientOptions: {
      apiKey: process.env.ANTHROPIC_API_KEY,
    }
  });

  await stagehand.init();
  
  // Navigate to the site
  await stagehand.navigate("http://localhost:3000/");
  
  // Click through initial navigation
  await stagehand.act("Click the submit button in the center of the form. NOTE: An error may appear, this is what we're testing for!");
  await stagehand.act("Click the 'Contact' link in the left navigation menu. NOTE: An error may appear, this is what we're testing for!");
  
  // Fill out the contact form
  await stagehand.act("Click the 'Name' text input field in the Contact Us form");
  await stagehand.act("Type 'Sam Errorful' followed by Tab key");
  await stagehand.act("Type 'chwe@virginia.edu'");
  await stagehand.act("Press 'Tab'");
  await stagehand.act("Type 'This is a test'");
  
  // Submit the form
  await stagehand.act("Click the blue 'Subscribe' button below the contact form. NOTE: An error may appear, this is what we're testing for!");

  // Check for absence of error message
  const result = await stagehand.extract({
    instruction: "Extract any error message shown below the subscribe button",
    schema: ErrorSchema
  });

  // Test should fail if there is an error message (bug reproduced)
  expect(result.errorMessage).toBeNull();
});
