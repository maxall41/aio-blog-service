import { Hono } from 'hono'
import { Redis } from "@upstash/redis/cloudflare";

const app = new Hono()

app.get('/', (c) => {
    return c.text('Blog Service!')
})

app.get('/api/claps/get', async (c) => {
    // @ts-ignore
    const redis = Redis.fromEnv(c.env);
    //
    c.header('Access-Control-Allow-Origin', '*')
    c.header('Access-Control-Allow-Credentials', 'true')

    const query = new URLSearchParams(c.req.url.split("?")[1]);

    const res = await redis.get("CLAPS_" + query.get("post_title"));

    if (res == null) {
        return c.json({ error: res })
    }

    return c.json({
        claps: res
    })
})

app.post('/api/claps/increment', async (c) => {
    // @ts-ignore
    const redis = Redis.fromEnv(c.env);
    //
    c.header('Access-Control-Allow-Origin', '*')
    c.header('Access-Control-Allow-Credentials', 'true')

    const data = await c.req.json();

    const res = await redis.incr("CLAPS_" + data["post_title"]);

    return c.json({
        success: true
    })
})


export default app
