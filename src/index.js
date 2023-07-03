import { Hono } from 'hono';
import { Redis } from "@upstash/redis";
if (!UPSTASH_REST_API_DOMAIN ||
    !UPSTASH_REST_API_TOKEN) {
    throw new Error("Missing required Upstash credentials of the REST API");
}
export const redis = new Redis({
    url: UPSTASH_REST_API_DOMAIN,
    token: UPSTASH_REST_API_TOKEN,
});
const app = new Hono();
app.get('/', (c) => c.text('Blog Service!'));
export default app;
