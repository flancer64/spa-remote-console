/**
 * Web server handler to process web sockets connections.
 *
 * @implements TeqFw_Web_Back_Api_Listener_Socket
 */
export default class Remote_Console_Back_Web_Socket {
    constructor(spec) {
        // DEPS
        /** @type {Remote_Console_Back_Defaults} */
        const DEF = spec['Remote_Console_Back_Defaults$'];
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance


        // VARS
        logger.setNamespace(this.constructor.name);

        // INSTANCE METHODS

        this.canProcess = function (req) {
            // process all WebSocket requests
            return true;
        };

        this.init = async function () { };

        this.process = (ws, req) => {
            const url = req.url;
            try {
                debugger
            } catch (e) {
                logger.error(`Cannot process websocket request. `
                    + `Error: ${e?.message || e}`);
            }
        };

    }
}
