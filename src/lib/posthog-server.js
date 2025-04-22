import { PostHog } from 'posthog-node'

const serverPosthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY,
  {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    debug: true
  }
)

export default serverPosthog