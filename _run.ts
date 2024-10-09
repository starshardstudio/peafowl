import {default as site} from "./_config.ts"

Deno.serve({
    port: 8080,
    handler: site.fetch
})
