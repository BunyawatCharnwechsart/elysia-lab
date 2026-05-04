import Elysia, { t } from "elysia";
import { supabase } from "../../libs/supabase";

export const menus = new Elysia()
    //get all menus
    .get('/menus', async () => {
        const { data, error } = await supabase.from("menus").select("*")
        if (error) throw error
        return data
    })
    //get menu id
    .get('/menus/:id', async ({ params }) => {
        const { id } = params;
        const { data, error } = await supabase
            .from("menus")
            .select("*")
            .eq("id", id)
            .single()
        if (error) throw error
        return data;
    })
    //post menu
    .post('/menus', async ({ body }) => {
        const { name, price } = body;
        const { data, error } = await supabase
            .from("menus")
            .insert({ name, price })
            .select()
            .single()
        if (error) throw error

        return {
            message: "add menus success",
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
    .put('/menus/:id', async ({ params, body }) => {
        const { id } = params;
        const { name, price } = body;

        const { data, error } = await supabase
            .from("menus")
            .update({ name, price })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return {
            message: "update menu success",
            menu: data
        };
    },
        {
            body: t.Object({
                name: t.String({ minLength:1 }),
                price: t.Number({ minimum:0 })
            })
        }
    )
    .delete('/menus/:id', async ({ params }) => {
        const { id } = params;

        const { error } = await supabase
            .from("menus")
            .delete()
            .eq("id", id);

        if (error) throw error;
        return {
            message: "Delete menu success"
        }
    })