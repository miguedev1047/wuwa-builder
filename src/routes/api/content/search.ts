import { env } from 'cloudflare:workers'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/content/search')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const key = url.searchParams.get('image_key')

        if (!key) {
          return new Response('Missing image_key', { status: 400 })
        }

        const object = await env.wuwa_builds_storage.get(key)
        if (!object) return new Response('Not found', { status: 404 })

        const contentType =
          object.httpMetadata?.contentType ?? 'application/octet-stream'
        const cacheControl = 'public, max-age=3600'

        return new Response(object.body, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': cacheControl,
          },
        })
      },
    },
  },
})
