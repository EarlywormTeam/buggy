import { Stagehand } from "@browserbasehq/stagehand";
import { test, expect, vi, afterEach } from 'vitest';
import { z } from "zod";
import dotenv from 'dotenv';
dotenv.config();

vi.setConfig({ testTimeout: 300000 });

const ErrorMessageSchema = z.object({
  errorMessage: z.string().nullable()
});

let stagehand;

afterEach(async () => {
  if (stagehand) {
    await stagehand.close();
  }
});

test("Contact form submission fails with a 500 error", async () => {
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
  await stagehand.goto("http://localhost:3000/");
  
  // Click the hamburger menu
  await stagehand.act("Click the gray hamburger menu button with three horizontal lines in the top right corner. NOTE: An error may appear, this is what we're testing for!");
  
  // Click the Contact link
  await stagehand.act("Click the 'Contact' link in the top navigation menu. NOTE: An error may appear, this is what we're testing for!");
  
  // Fill out the contact form
  await stagehand.act("Click the 'Name' text input field in the contact form. NOTE: An error may appear, this is what we're testing for!");
  await stagehand.act("Type \"Sam Errorful\" then Tab then \"chsw9e@virginia.edu\" then Tab then \"This is a test\". NOTE: An error may appear, this is what we're testing for!");
  
  // Submit the form
  await stagehand.act("Click the blue 'Subscribe' button at the bottom of the contact form. NOTE: An error may appear, this is what we're testing for!");
  
  // Check for error message - test should fail if error message is present
  const errorResult = await stagehand.extract({
    instruction: "Check if there is a red error message stating 'An error occurred. Please try again.' on the screen",
    schema: ErrorMessageSchema
  });
  
  expect(errorResult.errorMessage).toBeNull();
});
