/**
 * Registry to collect connected users.
 */
export default class Remote_Console_Back_Mod_Registry {
    constructor(spec) {
        // DEPS
        /** @type {Remote_Console_Back_Defaults} */
        const DEF = spec['Remote_Console_Back_Defaults$'];
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance

        // VARS
        logger.setNamespace(this.constructor.name);
        const _store = [];

        // INSTANCE METHODS
        /**
         * @param {WebSocket} ws
         */
        this.add = function (ws) {
            _store.push(ws);
            logger.info(`One socket is added to the registry.`);
        };

        /**
         * @return {WebSocket[]}
         */
        this.all = function () {
            return _store;
        };

        /**
         * @param {WebSocket} ws
         */
        this.delete = function (ws) {
            const index = _store.indexOf(ws);
            if (index !== -1) {
                _store.splice(index, 1);
                logger.info(`One socket is deleted from the registry.`);
            }
        };

    }
}
