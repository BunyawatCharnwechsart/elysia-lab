import { Elysia } from "elysia";
import { users } from "./users";

new Elysia()
  .get('/', () => 'hello elysia')
  .use(users)
  .listen(3000);