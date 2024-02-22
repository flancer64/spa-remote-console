/**
 * Web server handler to process web sockets connections.
 *
 * @implements TeqFw_Web_Back_Api_Listener_Socket
 */
export default class Remote_Console_Back_Web_Socket {
    /**
     * @param {Remote_Console_Back_Mod_Registry} modReg
     * @param {TeqFw_Web_Back_Mod_Address} modAddr
     */
    constructor(
        {
            Remote_Console_Back_Mod_Registry$: modReg,
            TeqFw_Web_Back_Mod_Address$: modAddr,
        }
    ) {
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

    process(ws, req) {
        // do nothing
    }
}
