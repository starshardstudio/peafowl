import {default as site} from "./_config.ts"
import {default as cms} from "./_cms.ts"
import {default as adapter} from "lume/cms/adapters/lume.ts"

const app = await adapter({site, cms})

Deno.serve({
    port: 8080,
    handler: app.fetch
})
