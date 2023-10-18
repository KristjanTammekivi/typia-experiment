"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typia_1 = require("typia");
(function (input) {
    var errors = [];
    var __is = function (input, _exceptionable) {
        if (_exceptionable === void 0) { _exceptionable = true; }
        var $io0 = function (input, _exceptionable) {
            if (_exceptionable === void 0) { _exceptionable = true; }
            return "string" === typeof input.a && "number" === typeof input.b && (2 === Object.keys(input).length || Object.keys(input).every(function (key) {
                if (["a", "b"].some(function (prop) { return key === prop; }))
                    return true;
                var value = input[key];
                if (undefined === value)
                    return true;
                return false;
            }));
        };
        return "object" === typeof input && null !== input && $io0(input, true);
    };
    if (false === __is(input)) {
        var $report = typia_1.validateEquals.report(errors);
        (function (input, _path, _exceptionable) {
            if (_exceptionable === void 0) { _exceptionable = true; }
            var $join = typia_1.validateEquals.join;
            var $vo0 = function (input, _path, _exceptionable) {
                if (_exceptionable === void 0) { _exceptionable = true; }
                return ["string" === typeof input.a || $report(_exceptionable, {
                        path: _path + ".a",
                        expected: "string",
                        value: input.a
                    }), "number" === typeof input.b || $report(_exceptionable, {
                        path: _path + ".b",
                        expected: "number",
                        value: input.b
                    }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map(function (key) {
                        if (["a", "b"].some(function (prop) { return key === prop; }))
                            return true;
                        var value = input[key];
                        if (undefined === value)
                            return true;
                        return $report(_exceptionable, {
                            path: _path + $join(key),
                            expected: "undefined",
                            value: value
                        });
                    }).every(function (flag) { return flag; }))].every(function (flag) { return flag; });
            };
            return ("object" === typeof input && null !== input || $report(true, {
                path: _path + "",
                expected: "SomeType",
                value: input
            })) && $vo0(input, _path + "", true) || $report(true, {
                path: _path + "",
                expected: "SomeType",
                value: input
            });
        })(input, "$input", true);
    }
    var success = 0 === errors.length;
    return {
        success: success,
        errors: errors,
        data: success ? input : undefined
    };
})({ a: 'a', b: 1 });
