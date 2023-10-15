"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoutes = void 0;
const express_1 = require("express");
class BaseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    get(path, callback, ...middleware) {
        this.router.get(path, ...middleware, callback);
    }
    post(path, callback, ...middleware) {
        this.router.post(path, ...middleware, callback);
    }
    put(path, callback, ...middleware) {
        this.router.put(path, ...middleware, callback);
    }
    delete(path, callback, ...middleware) {
        this.router.delete(path, ...middleware, callback);
    }
    // Add any other HTTP methods you need (e.g., patch, options, etc.)
    mount(path) {
        return this.router;
    }
}
exports.BaseRoutes = BaseRoutes;
