import { Stagehand } from "@browserbasehq/stagehand";
import { test, expect, vi, afterEach } from 'vitest';
import { z } from "zod";
import dotenv from 'dotenv';
dotenv.config();

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
  // Initialize Stagehand with minimal configuration
  stagehand = new Stagehand({
    env: "Local",
    debugDom: false,
    headless: true,
    modelName: "claude-3-5-sonnet-20241022",
    modelClientOptions: {
      apiKey: process.env.ANTHROPIC_API_KEY,
    }
  });

  await stagehand.init();
  
  try {
    // Use act commands for navigation and interaction
    await stagehand.act({
      action: "Open the URL http://localhost:3000/",
      waitForUrl: "http://localhost:3000/"
    });
    
    await stagehand.act({
      action: "Click the hamburger menu button",
      waitForElement: "button[aria-label='Menu']"
    });
    
    await stagehand.act({
      action: "Click the Contact link",
      waitForUrl: "/contact"
    });
    
    await stagehand.act({
      action: "Fill out the contact form with name 'Sam Errorful', email 'chsw9e@virginia.edu', and message 'This is a test'",
      waitForElement: "form"
    });
    
    await stagehand.act({
      action: "Click the Subscribe button",
      waitForElement: "button[type='submit']"
    });
    
    // Check for error message
    const errorResult = await stagehand.extract({
      instruction: "Check if there is a red error message stating 'An error occurred. Please try again.' on the screen",
      schema: ErrorMessageSchema
    });
    
    expect(errorResult.errorMessage).toBeNull();
  } catch (error) {
    console.error('Test error:', error);
    throw error;
  }
});
