import authRouter from "./auth-routes.js";
import postcardRouter from "./postcard-routes.js";
import monitorRouter from "./monitor-routes.js";
import groqRouter from "./groq-textgen-routes.js";

export default (app) => {
    app.use("/api/healthz", monitorRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/postcards', postcardRouter);
    app.use('/api/groq', groqRouter);
}