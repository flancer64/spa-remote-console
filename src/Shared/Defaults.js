/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class Remote_Console_Shared_Defaults {
    // should be the same as `name` property in `./package.json`
    NAME = '@flancer64/spa-remote-console';

    SPACE_LOG = 'log'; // web handler space to collect incoming logs w/o timestamp: '/log/'
    SPACE_TIMED = 'timed'; // web handler space to collect incoming logs with timestamp: '/timed/'

    constructor() {
        Object.freeze(this);
    }
}
