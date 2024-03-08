"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const NodeCache = require("node-cache");
exports.cache = new NodeCache({ stdTTL: 60 * 10 });
//# sourceMappingURL=record-cache.js.map