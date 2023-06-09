# Remote Console for Web Apps

This is a developer tool designed to address the issue of being unable to view `console.log()` output in mobile
applications. Mobile browsers lack the Developer Tools panel, which makes debugging challenging. With this app, you have
the option to launch it as a standalone server on your local computer for enhanced security. Alternatively, you can use
our public server at [console.wiredgeese.com](https://console.wiredgeese.com/), where all developers share their logs.

The Remote Console collects log items sent through
the [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API) and retransmits them to all connected
developers via WebSockets:

![Overview](./doc/img/overview.png)

To collect console logs, you need to modify the original `console.log()` function in your web app. Add the following
code before any console output, preferably in the `HEAD` section of the main HTML page:

```javascript
const orig = console.log;
console.log = function () {
    orig.apply(console, arguments);
    navigator.sendBeacon('https://console.wiredgeese.com/log/', arguments[0]);
};
```

If you launch the Remote Console app on your computer, you need to send logs to `http(s)://ip.or.domain:port/log/`.
The Developers WebUI is available at `http(s)://ip.or.domain:port/`:

![Web UI](./doc/img/web_ui.png)

## Usage as a standalone server

```shell
$ git clone https://github.com/flancer64/spa-remote-console.git
$ cd spa-remote-console/
$ npm install
$ npm start
```

Go to http://localhost:8080/ and press the `Test` button to validate availability:

![Web UI Local](./doc/img/web_ui_local.png)