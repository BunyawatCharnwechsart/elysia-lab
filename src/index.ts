import { Elysia } from "elysia";
import { users } from "./users";
import { menus } from "./menus";
import { auth } from "../modules/auth";

new Elysia()
  .get('/', () => 'hello elysia')
  .use(auth)
  .use(users)
  .use(menus)
  .listen(3000);