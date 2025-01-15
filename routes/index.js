import authRouter from "./auth-routes.js";
import postcardRouter from "./postcard-routes.js";

export default (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/postcards', postcardRouter);
}