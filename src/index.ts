import { Elysia } from "elysia";
import { users } from "./users";
import { menus } from "./menus";
import { auth } from "../modules/auth";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .get('/', () => 'hello elysia')
  .use(cors())
  .use(auth)
  .use(users)
  .use(menus)
  .listen(3000);

export type App = typeof app;