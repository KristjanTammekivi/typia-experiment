"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typia_typetest_1 = require("typia-typetest");
var typia = require("typia");
{
    var testType = require("typia-typetest");
    var result = typia.validateEquals({ a: 'a', b: 1 });
    if (!result.success)
        throw new testType.TypeValidationError(result);
}
