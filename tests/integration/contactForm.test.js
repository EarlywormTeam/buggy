import { test, expect, afterEach } from 'vitest';
import { Stagehand } from "@browserbasehq/stagehand";
import dotenv from 'dotenv';

dotenv.config();

let stagehand;

afterEach(async () => {
  if (stagehand) {
    await stagehand.close();
  }
});

test("Contact form basic test", async () => {
  stagehand = new Stagehand({
    env: "Local",
    debugDom: false,
    headless: true,
    domSettleTimeoutMs: 30000,
    modelName: "claude-3-5-sonnet-20241022",
    modelClientOptions: {
      apiKey: process.env.ANTHROPIC_API_KEY,
    }
  });

  await stagehand.init();
  
  // Basic test to verify setup
  expect(stagehand).toBeDefined();
});
