#!/usr/bin/env node
'use strict';
/** Main script to create and run the backend teq-app. */
// IMPORT
import {dirname, join} from 'node:path';
import Container from '@teqfw/di';

// VARS
/* Resolve paths to main folders */
const url = new URL(import.meta.url);
const script = url.pathname;
const bin = dirname(script);
const path = join(bin, '..');

// FUNCS
/**
 * Create and manually set up the DI container.
 * @param {string} root - The root folder of the app (where the `node_modules` folder is located).
 * @returns {Promise<TeqFw_Di_Api_Container>}
 */
async function initContainer(root) {
    /** @type {TeqFw_Di_Api_Container} */
    const res = new Container();
    res.setDebug(false);
    // add path mapping for @teqfw/core to the DI resolver
    const resolver = res.getResolver();
    const pathDi = join(root, 'node_modules', '@teqfw', 'di', 'src');
    const pathCore = join(root, 'node_modules', '@teqfw', 'core', 'src');
    resolver.addNamespaceRoot('TeqFw_Di_', pathDi, 'js');
    resolver.addNamespaceRoot('TeqFw_Core_', pathCore, 'mjs');
    // setup parser for the legacy code
    /** @type {TeqFw_Core_Shared_App_Di_Parser_Legacy} */
    const parserLegacy = await res.get('TeqFw_Core_Shared_App_Di_Parser_Legacy$');
    res.getParser().addChunk(parserLegacy);
    // add pre-processors: replace
    const pre = res.getPreProcessor();
    const preReplace = await res.get(`TeqFw_Core_Shared_App_Di_PreProcessor_Replace$`);
    pre.addChunk(preReplace);
    // add post-processors: Factory, Proxy, Logger
    const post = res.getPostProcessor();
    /** @type {TeqFw_Core_Shared_App_Di_PostProcessor_Factory} */
    const postFactory = await res.get('TeqFw_Core_Shared_App_Di_PostProcessor_Factory$');
    post.addChunk(postFactory);
    /** @type {TeqFw_Core_Shared_App_Di_PostProcessor_Proxy} */
    const postProxy = await res.get('TeqFw_Core_Shared_App_Di_PostProcessor_Proxy$');
    post.addChunk(postProxy);
    /** @type {TeqFw_Core_Shared_App_Di_PostProcessor_Logger} */
    const postLogger = await res.get('TeqFw_Core_Shared_App_Di_PostProcessor_Logger$');
    post.addChunk(postLogger);
    return res;
}

// MAIN
try {
    // Initialize the DI container, then create and run the backend teq-app.
    const container = await initContainer(path);
    /** @type {TeqFw_Core_Back_App} */
    const app = await container.get('TeqFw_Core_Back_App$');
    await app.run({path});
} catch (e) {
    console.error(e);
}