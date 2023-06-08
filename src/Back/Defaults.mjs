/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Remote_Console_Back_Defaults {

    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {Remote_Console_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.MOD_WEB = spec['TeqFw_Web_Back_Defaults$'];
        this.SHARED = spec['Remote_Console_Shared_Defaults$'];
        Object.freeze(this);
    }
}
