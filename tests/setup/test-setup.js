import { beforeAll, afterAll, afterEach, vi } from 'vitest'
import dotenv from 'dotenv'
import { Stagehand } from "@browserbasehq/stagehand"

dotenv.config()

vi.setConfig({ testTimeout: 300000 })

let stagehand = null

beforeAll(() => {
  // Any global setup
})

afterEach(async () => {
  if (stagehand) {
    await stagehand.close()
    stagehand = null
  }
})

afterAll(() => {
  // Any global cleanup
})

export { stagehand }
