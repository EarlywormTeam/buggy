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

test("Contact Form Submission 500 Error", async () => {
  stagehand = new Stagehand({
    env: "Local",
    debugDom: true,
    headless: true,
    domSettleTimeoutMs: 60_000,
    modelName: "claude-3-5-sonnet-20241022",
    modelClientOptions: {
      apiKey: process.env.ANTHROPIC_API_KEY || "dummy-key",
    }
  });

  try {
    await stagehand.init();
    console.log("Initialized stagehand");
    
    await stagehand.navigate("http://localhost:3000/contact");
    console.log("Navigated to contact page");
    
    // Fill out the form directly
    await stagehand.act("Type \"Sam Errorful\" into the Name field");
    await stagehand.act("Type \"test@example.com\" into the Email field");
    await stagehand.act("Type \"Test message\" into the Message field");
    console.log("Filled out form");
    
    await stagehand.act("Click the Subscribe button");
    console.log("Clicked submit");
    
    // Wait a moment for any error messages
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = await stagehand.extract({
      instruction: "Check if there is an error message that says 'An error occurred. Please try again.' on the screen",
      schema: ErrorMessageSchema
    });
    
    console.log("Extraction result:", result);
    expect(result.errorMessage).toBeNull();
  } catch (error) {
    console.error("Test error:", error);
    throw error;
  }
});
