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

test("Error submitting contact info (500)", async () => {
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
  await stagehand.page.goto("http://localhost:3000/");
  
  // Click through navigation
  await stagehand.act("Click the hamburger menu button in the top right corner (three horizontal lines). NOTE: An error may appear, this is what we're testing for!");
  await stagehand.act("Click the 'Contact' link in the top-left navigation menu. NOTE: An error may appear, this is what we're testing for!");
  
  // Fill out the contact form
  await stagehand.act("Click the \"Name\" text input field in the Contact Us form. NOTE: An error may appear, this is what we're testing for!");
  await stagehand.act("Type \"Sam Errorful\", then press Tab, then type \"chw9e@virginia.edu\", then press Tab, then type \"This is a test\". NOTE: An error may appear, this is what we're testing for!");
  
  // Submit the form
  await stagehand.act("Click the blue 'Subscribe' button at the bottom of the contact form. NOTE: An error may appear, this is what we're testing for!");

  // Check for error message - test should fail if an error message is present
  const result = await stagehand.extract({
    instruction: "Extract any error message shown on the screen after form submission",
    schema: ErrorMessageSchema
  });

  // Test should fail if there's an error message (meaning we reproduced the bug)
  expect(result.errorMessage).toBeNull();
});
