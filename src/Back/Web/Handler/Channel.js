/**
 * Web server handler to return `/index.html` on any unhandled URL to get 'channels'.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';
import {join} from 'node:path';
import {existsSync} from 'node:fs';

// MODULE'S VARS
const {
    HTTP2_METHOD_GET,
    HTTP_STATUS_OK,
} = H2;


// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class Remote_Console_Back_Web_Handler_Channel {
    /**
     * @param {Remote_Console_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Core_Back_Config} config
     */
    constructor(
        {
            Remote_Console_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Core_Back_Config$: config,
        }
    ) {
        // MAIN
        const pathToRoot = config.getPathToRoot(); // path to project root
        const pathToIndex = join(pathToRoot, DEF.MOD_WEB.FS_STATIC_ROOT, 'index.html');
        const INDEX = existsSync(pathToIndex) ? pathToIndex : null;
        Object.defineProperty(process, 'namespace', {value: this.constructor.name});

        // FUNCS
        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest}req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf Remote_Console_Back_Web_Handler_Channel
         */
        async function process(req, res) {
            /** @type {Object} */
            const shares = res[DEF.MOD_WEB.HNDL_SHARE];
            if (!res.headersSent && !shares[DEF.MOD_WEB.SHARE_RES_STATUS]) {
                if (INDEX) {
                    shares[DEF.MOD_WEB.SHARE_RES_FILE] = pathToIndex;
                    shares[DEF.MOD_WEB.SHARE_RES_STATUS] = HTTP_STATUS_OK;
                }
            }
        }

        // INSTANCE METHODS

        this.getProcessor = () => process;

        this.init = async function () {
            logger.info(`Index handler to open web-socket channels is initialized.`);
        };

        this.canProcess = function ({method} = {}) {
            return (
                (method === HTTP2_METHOD_GET)
            );
        };
    }
}
