/**
 * Web server handler to process web sockets connections.
 *
 * @implements TeqFw_Web_Back_Api_Listener_Socket
 */
export default class Remote_Console_Back_Web_Socket {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
        /** @type {Remote_Console_Back_Mod_Registry} */
        const modReg = spec['Remote_Console_Back_Mod_Registry$'];
        /** @type {TeqFw_Web_Back_Mod_Address} */
        const modAddr = spec['TeqFw_Web_Back_Mod_Address$'];

        // VARS
        logger.setNamespace(this.constructor.name);

        // INSTANCE METHODS

        this.canProcess = function () {
            // process all WebSocket requests
            return true;
        };

        this.init = async function () { };

        this.prepareSocket = function (ws, req) {
            // get channel
            const addr = modAddr.parsePath(req.url);
            const channel = addr.route;
            modReg.add(channel, ws);
            ws.addEventListener('close', function () {
                modReg.delete(channel, ws);
            });
            return ws;
        };

    }

}
