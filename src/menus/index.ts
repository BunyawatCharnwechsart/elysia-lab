import Elysia, { t } from "elysia";
import { supabase } from "../../libs/supabase";

export const menus = new Elysia()
    .get('/menus', async () => {
        const { data, error } = await supabase.from("menus").select("*")
        if (error) throw error
        return data
    })
    .post('/menus', async ({body}) => {
        const { name, price } = body;
        const { data, error } = await supabase
            .from("menus")
            .insert({ name, price })
            .select()
            .single()
        if (error) throw error

        return {
            message: "add menus secuss",
            menu : data
        };
    },
    {
        body: t.Object({
            name: t.String({ minLength: 1 }),
            price: t.Number({ minimum: 0 }),
        })
    }
)