import Elysia, { t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { supabase } from "../../libs/supabase";
import bcrypt from "bcryptjs";

export const auth = new Elysia()
    .use(
        jwt({
            name: "jwt",
            secret: process.env.JWT_SECRET!,
            schema: t.Object({
                uid: t.String(),
                email: t.String(),
                name: t.String(),
            })
        })
    )
    // Register
    .post("/register", async ({ body, set }) => {
        const { name, email, password } = body;

        // เช็คว่า email ซ้ำไหม
        const { data: existing } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (existing) {
            set.status = 400;
            return { message: "email already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // สร้าง user ใหม่
        const { data: user, error } = await supabase
            .from("users")
            .insert({ name, email, password: hashedPassword })
            .select()
            .single();

        if (error) throw error;

        return {
            message: "register success",
            user,
        };
    },
    {
        body: t.Object({
            name: t.String({ minLength: 1 }),
            email: t.String({ format: "email" }),
            password: t.String({ minLength: 6 }),
        }),
    })
    // Login
    .post("/login", async ({ body, jwt, set }) => {
        const { email, password } = body;

        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) {
            set.status = 401;
            return { message: "email or password incorrect" };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            set.status = 401;
            return { message: "email or password incorrect" };
        }

        const token = await jwt.sign({
            uid: String(user.uid),
            email: String(user.email),
            name: String(user.name),
        });

        return {
            message: "login success",
            token,
        };
    },
    {
        body: t.Object({
            email: t.String({ format: "email" }),
            password: t.String({ minLength: 6 }),
        }),
    });