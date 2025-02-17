import { beforeAll, afterAll, afterEach, vi } from 'vitest'
import { Stagehand } from "@browserbasehq/stagehand"
import dotenv from 'dotenv'

dotenv.config()

vi.setConfig({ testTimeout: 300000 })

// Add the required processDom function to the browser context
beforeAll(async () => {
  const script = document.createElement('script')
  script.textContent = `
    window.processDom = function() {
      return document.documentElement.outerHTML
    }
  `
  document.head.appendChild(script)
})

afterAll(async () => {
  // Cleanup
})

export {}
