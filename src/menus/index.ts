import Elysia, { t } from "elysia";
import { supabase } from "../../libs/supabase";

export const menus = new Elysia()
    .get('/menus', async ()=> 'this is menus')