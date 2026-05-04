import { Elysia } from "elysia";
import { users } from "./users";
import { menus } from "./menus";

new Elysia()
  .get('/', () => 'hello elysia')
  .use(users)
  .use(menus)
  .listen(3000);