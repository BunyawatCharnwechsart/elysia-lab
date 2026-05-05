import { Elysia } from "elysia";
import { users } from "./users";
import { menus } from "./menus";
import { auth } from "../modules/auth";
import { cors } from "@elysiajs/cors";
import { it_store } from "./it_store";

new Elysia()
    .onError(({ error, code  }) => {
        console.log(error)
        return {
            message: error.message,
            code
        }
    })
    .get('/', () => 
        'hello elysia (login,menus)'
    )
    .use(cors())
    .use(auth)
    .use(users)
    .use(menus)
    .use(it_store)
    .listen(3000, ({ hostname, port }) => {
        console.log(`Server running at http://${hostname}:${port}`)
    });