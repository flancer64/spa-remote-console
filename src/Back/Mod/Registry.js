/**
 * Registry to collect connected users.
 */
export default class Remote_Console_Back_Mod_Registry {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
        }
    ) {
        // VARS
        const _store = [];

        // INSTANCE METHODS
        /**
         * @param {string} channel
         * @param {WebSocket} ws
         */
        this.add = function (channel, ws) {
            if (!Array.isArray(_store[channel])) _store[channel] = [];
            _store[channel].push(ws);
            logger.info(`One socket is added to the registry (channel: ${channel}).`);
        };

        /**
         * Get all sockets from the given channel.
         * @param {string} channel
         * @return {WebSocket[]}
         */
        this.all = function (channel) {
            return _store[channel] ?? [];
        };

        /**
         * @param {string} channel
         * @param {WebSocket} ws
         */
        this.delete = function (channel, ws) {
            const part = _store[channel] ?? [];
            const index = part.indexOf(ws);
            if (index !== -1) {
                _store.splice(part, 1);
                logger.info(`One socket is deleted from the registry (channel: ${channel}).`);
            }
        };

    }
}
