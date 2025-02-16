import { setResponse } from "./response-handler.js";

export const healthMonitor = (req, res) => {
    setResponse(null, res);
}