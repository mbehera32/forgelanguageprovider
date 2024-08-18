import React, { createContext, useContext } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var serverUrl = "https://api.forge-ml.com";
var createRequest = function (params) {
    return function (query, opts) { return __awaiter(void 0, void 0, void 0, function () {
        var baseController, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseController = (function () {
                        switch (params.contentType) {
                            case "image":
                                return "image";
                            default:
                                return "q";
                        }
                    })();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(serverUrl, "/").concat(baseController, "/").concat(params.username, "/").concat(params.path), {
                            method: "POST",
                            headers: __assign(__assign({ "Content-Type": "application/json", Authorization: "Bearer ".concat(opts.token) }, (opts.cache && __assign({ "Cache-Behavior": opts.cache }, (opts.model && {
                                Model: opts.model,
                            })))), (opts.model && {
                                "X-Custom-Model": opts.model,
                            })),
                            body: JSON.stringify({
                                q: query,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.json()];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, { error: error_1 }];
                case 4: return [2 /*return*/];
            }
        });
    }); };
};
var Forge = function (options) {
    var forgeKey = options.forgeKey;
    //   const defaultModel = options.defaultModel;
    var client = generatedClient(forgeKey);
    return client;
};
var generatedClient = function (forgeKey) {
    return {
        translations: {
            query: function (prompt, opts) {
                return createRequest({
                    username: "mehul945",
                    path: "translations",
                })(prompt, {
                    token: (opts === null || opts === void 0 ? void 0 : opts.token) || forgeKey,
                    cache: opts === null || opts === void 0 ? void 0 : opts.cache,
                    model: opts === null || opts === void 0 ? void 0 : opts.model,
                });
            },
        },
    };
};

function translateText(text, language, forgeKey) {
    return __awaiter(this, void 0, void 0, function () {
        var forge, translation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    forge = Forge({ forgeKey: forgeKey });
                    return [4 /*yield*/, forge.translations.query("please translate this text: " + text + " to this language: " + language)];
                case 1:
                    translation = _a.sent();
                    return [2 /*return*/, translation];
            }
        });
    });
}
function createForgeClient(forgeKey) {
    var forge = Forge({ forgeKey: forgeKey });
    return {
        forge: forge,
        translateText: function (text, language) {
            return translateText(text, language, forgeKey);
        },
    };
}

var LanguageContext = createContext(undefined);
var LanguageProvider = function (_a) {
    var _b;
    var language = _a.language, forgeKey = _a.forgeKey, children = _a.children;
    var viteForgeKey = (_b = import.meta.env) === null || _b === void 0 ? void 0 : _b.VITE_FORGE_KEY;
    var actualForgeKey = forgeKey || viteForgeKey;
    if (!actualForgeKey) {
        throw new Error("FORGE_KEY not provided. Please set VITE_FORGE_KEY in your environment variables or pass it as a prop.");
    }
    var translateText = createForgeClient(actualForgeKey).translateText;
    var translate = function (key) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, translateText(key, language)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.translation];
                case 2:
                    error_1 = _a.sent();
                    console.error('Translation error:', error_1);
                    return [2 /*return*/, key];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(LanguageContext.Provider, { value: { language: language, translate: translate } }, children));
};
var useLanguage = function () {
    var context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export { LanguageProvider, useLanguage };
