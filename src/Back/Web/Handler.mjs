/**
 * Web server handler to collect incoming log messages sent by `navigator.sendBeacon(URL, message)'.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';

// MODULE'S VARS
const {
    HTTP2_METHOD_POST,
    HTTP_STATUS_OK,
} = H2;


// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class Remote_Console_Back_Web_Handler {
    constructor(spec) {
        // DEPS
        /** @type {Remote_Console_Back_Defaults} */
        const DEF = spec['Remote_Console_Back_Defaults$'];
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
        /** @type {TeqFw_Core_Shared_Util_Format.dateTimeForLog|function} */
        const dateTimeForLog = spec['TeqFw_Core_Shared_Util_Format.dateTimeForLog'];
        /** @type {Remote_Console_Back_Mod_Registry} */
        const modReg = spec['Remote_Console_Back_Mod_Registry$'];

        // MAIN
        logger.setNamespace(this.constructor.name);
        Object.defineProperty(process, 'namespace', {value: this.constructor.name});

        // FUNCS
        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest}req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf Remote_Console_Back_Web_Handler
         */
        async function process(req, res) {
            /** @type {Object} */
            const shares = res[DEF.MOD_WEB.HNDL_SHARE];
            if (!res.headersSent && !shares[DEF.MOD_WEB.SHARE_RES_STATUS]) {
                // parse input data
                /** @type {string} */
                const body = shares[DEF.MOD_WEB.SHARE_REQ_BODY];
                // add timestamp to the message
                const msg = `${dateTimeForLog()}: ${body}`;
                // re-translate messages to all connected sockets
                /** @type {WebSocket[]} */
                const sockets = modReg.all();
                for (const one of sockets)
                    one.send(msg);
                // finalize HTTP request
                shares[DEF.MOD_WEB.SHARE_RES_STATUS] = HTTP_STATUS_OK;
            }
        }

        // INSTANCE METHODS

        this.getProcessor = () => process;

        this.init = async function () {
            logger.info(`Web requests handler to collect log events is initialized.`);
        };

        this.canProcess = function ({method, address} = {}) {
            return (
                (method === HTTP2_METHOD_POST)
                && (address?.space === DEF.SHARED.SPACE)
            );
        };
    }
}
