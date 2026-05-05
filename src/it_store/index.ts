import Elysia, { t } from "elysia";
import { supabase } from "../../libs/supabase";

export const it_store = new Elysia()
    .get('/it_store', async () => {
        const { data, error } = await supabase.from("it_store").select("*")
        if (error) throw error
        return data
    })
    .get('/it_store/:id', async ({ params }) => {
        const { id } = params;
        const { data ,error } = await supabase
            .from("it_store")
            .select("*")
            .eq("id", id)
            .single()
        if (error) throw error

        return data
    })
    .post('/it_store', async ({ body }) => {
        const { name, price } = body;
        const { data, error } = await supabase
            .from("it_store")
            .insert( {name, price} )
            .select()
            .single()
        if (error) throw error
        return {
            message: "Add item success",
            data
        };
    },
        {
            body: t.Object({
                name: t.String({ minLength: 1 }),
                price: t.Number({ minimum: 0 })
            })
        }
    )
    .delete('/it_store/:id', async ({ params }) => {
        const { id } = params;
        const { error } = await supabase
            .from("it_store")
            .delete()
            .eq("id", id)
        if (error) throw error;
        return {
            message: "delete item success"
        }
    })