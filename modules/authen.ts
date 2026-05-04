// src/modules/authen.ts
import { Elysia } from 'elysia'

const authen = (app: Elysia) =>
    app.group('/auth', (app) =>
        app
            .post('/sign-up', () => {
                return 'This route is expected to sign up a user'
            })
            .post('/sign-in', () => {
                return 'This route is expected to sign in a user'
            })
    )