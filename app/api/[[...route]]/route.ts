import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { Hono } from "hono"
import { handle } from "hono/vercel"
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
// import authors from './authors'
// import books from './books' 
import accounts from './accounts';
import { HTTPException } from 'hono/http-exception';

export const runtime = "edge"

const app = new Hono().basePath('/api');
     
app.onError( (err, c) => {
    if(err instanceof HTTPException){
        return err.getResponse();
    }
    return c.json({ error: "Internal error" }, 500)
})

app.get("/hello", (c) => {
    return c.json({ hello : "world" });
})

const routes = app.route('/accounts', accounts);
// app.route('/authors', authors);
// app.route('/books', books);

// app.get("/hello",clerkMiddleware(), (c) => {

//     const auth = getAuth(c);

//     if(!auth?.userId){
//         return c.json({error: "Unauthorized"})
//     }
//   return c.json({
//     message: 'Hello Next.js!',
//     userId: auth?.userId
//   })
// })
// .get('/hello/:name', zValidator("param", z.object({ name: z.string() })), (c) => {
//   return c.json({
//     message: `Hello ${c.req.param('name')}!`,
//   })
// })
// .post("/", zValidator("json", z.object({
//     name: z.string(),
//     userId: z.number(),
// })),
//  (c) => {
//     const {} = c.req.valid("json")
//     return c.json({
        
//     })
//  }
// )

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;