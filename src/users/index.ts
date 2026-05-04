import Elysia,  { t } from "elysia";
import { supabase } from "../../libs/supabase";

export const users = new Elysia()
    .get('/users', async () => {
        const { data, error } = await supabase.from("users").select("*");
        if (error) throw error;
        return data 
    })
    .post('/users', async ({body}) => {
        const { name } = body;

        const { data, error } = await supabase
            .from("users")
            .insert({ name })
            .select()
            .single();

        if (error) throw error;
        return {
            message: "create user sucess",
            user : data,
        };
    },
    {
        body: t.Object({
            name: t.String({ minLength: 1 }),
        }),
    }
);