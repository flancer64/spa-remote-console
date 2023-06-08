/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Remote_Console_Front_Defaults {

    /** @type {Remote_Console_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.SHARED = spec['Remote_Console_Shared_Defaults$'];
        Object.freeze(this);
    }
}
