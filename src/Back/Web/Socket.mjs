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
        /** @type {Remote_Console_Back_Mod_Registry} */
        const modReg = spec['Remote_Console_Back_Mod_Registry$'];

        // VARS
        logger.setNamespace(this.constructor.name);

        // INSTANCE METHODS

        this.canProcess = function (req) {
            // process all WebSocket requests
            return true;
        };

        this.init = async function () { };

        this.prepareSocket = function (ws, req) {
            modReg.add(ws);
            ws.addEventListener('close', function (evt) {
                modReg.delete(ws);
            });
            return ws;
        };

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
