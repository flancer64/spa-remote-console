/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class Remote_Console_Shared_Defaults {
    // should be the same as `name` property in `./package.json`
    NAME = '@flancer64/spa-remote-console';

    SPACE = 'log'; // web handler space to collect incoming logs: '/log/'

    constructor() {
        Object.freeze(this);
    }
}
