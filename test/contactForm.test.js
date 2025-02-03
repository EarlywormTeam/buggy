import { Stagehand } from "@browserbasehq/stagehand";
import { test, expect, vi } from 'vitest';
import { z } from "zod";
import dotenv from 'dotenv';
dotenv.config();

vi.setConfig({ testTimeout: 300000 });

const FormStateSchema = z.object({
  errorMessage: z.string(),
  nameFieldValue: z.string(),
  emailFieldValue: z.string(),
  messageFieldValue: z.string()
});

test("Error when submitting contact information", async () => {
  const stagehand = new Stagehand({
    env: "Local",
    debugDom: true,
    headless: true,
    domSettleTimeoutMs: 30_000,
    modelName: "claude-3-5-sonnet-20241022",
    modelClientOptions: {
      apiKey: process.env.ANTHROPIC_API_KEY,
    }
  });

  await stagehand.init();

  // Navigate to the site
  await stagehand.page.goto("http://localhost:3000");

  // Click through navigation
  await stagehand.page.act('Click the light gray submit button with chat bubble icon in the top right corner');
  await stagehand.page.act('Click the blue "Contact" link in the top left navigation menu, positioned below the "Home" and "About" links');

  // Fill out the contact form
  await stagehand.page.act('Click the "Contact" text input field in the main navigation menu');
  await stagehand.page.act('Typed Sam Errorful');
  await stagehand.page.act('Typed chw9e@virginia.edu');
  await stagehand.page.act('Typed This is a test');

  // Submit the form
  await stagehand.page.act('Click the gray Subscribe button below the Message field. THERE MAY BE AN ERROR AFTER THIS, THAT IS FINE. IF THERE IS NOT AN ERROR, THAT IS FINE TOO.');

  // Extract and validate the form state after submission
  const formState = await stagehand.page.extract({
    instructions: "Please extract: 1) the error message shown in red text, 2) the current value in the name field, 3) the current value in the email field, 4) the current value in the message field",
    schema: FormStateSchema
  });

  // Verify error message is not displayed
  expect(formState.errorMessage).not.toBe("An error occurred. Please try again.");

  // Verify form fields clear their values
  expect(formState.nameFieldValue).not.toBe("Sam Errorful");
  expect(formState.emailFieldValue).not.toBe("chw9e@virginia.edu");
  expect(formState.messageFieldValue).not.toBe("This is a test");

  await stagehand.close();
});
