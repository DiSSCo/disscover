"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Import Dependencies */
var axios_1 = require("axios");
var fs_1 = require("fs");
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
var path_1 = require("path");
/* Dict of types and their endpoints to fetch */
var typesDict = {
    assertion: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/latest/assertion.json',
    chronometricAge: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/latest/chronometric-age.json',
    citation: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/latest/citation.json',
    entityRelationship: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/latest/entity-relationship.json',
    identification: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/latest/identification.json',
    identifier: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/latest/identifier.json',
    location: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/latest/location.json',
    agent: 'https://schemas.dissco.tech/schemas/fdo-type/shared-model/latest/agent.json',
    event: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/latest/event.json',
    digitalMedia: 'https://schemas.dissco.tech/schemas/fdo-type/digital-media/latest/digital-media.json',
    materialEntity: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/latest/material-entity.json',
    digitalSpecimen: 'https://schemas.dissco.tech/schemas/fdo-type/digital-specimen/latest/digital-specimen.json',
    annotation: 'https://schemas.dissco.tech/schemas/fdo-type/annotation/latest/annotation.json'
};
/**
 * Function to generate local type and json files based on the provided schemas
 * @param typesDict A dictionary which keys indicate the name of the schema and value is an url that references the schema's source
 */
var HarvestTypes = function (typesDict) {
    var promises = [];
    for (var index = 0; index < Object.keys(typesDict).length; index++) {
        var key = Object.keys(typesDict)[index];
        promises.push((0, axios_1.default)({
            method: 'get',
            url: typesDict[key],
            responseType: 'json'
        }));
    }
    ;
    Promise.all(promises).then(function (results) { return __awaiter(void 0, void 0, void 0, function () {
        var _loop_1, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (index) {
                        var type, result;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    type = Object.keys(typesDict)[index][0].toUpperCase() + Object.keys(typesDict)[index].slice(1);
                                    result = results[index];
                                    /* Check for refs inside schema, if so, replace with local generated files */
                                    Object.values(result.data.properties).filter(function (value) { return (value.type === 'array'); }).map(function (value) {
                                        if (value.items && '$ref' in value.items) {
                                            var refTypeName = value.items['$ref'].split('/').pop();
                                            /* Check for - symbols and replace with camel case */
                                            refTypeName = refTypeName.split('-', 2).map(function (string, index) { return index === 1 ? "".concat(string[0].toUpperCase() + string.slice(1)) : string; }).toString().replace(',', '');
                                            value.items['$ref'] = (0, path_1.resolve)(__dirname, '../sources/dataModel', "./".concat(refTypeName));
                                        }
                                        ;
                                    });
                                    return [4 /*yield*/, (0, json_schema_to_typescript_1.compile)(result.data, Object.keys(typesDict)[index]).then(function (ts) {
                                            /* Write to source data model */
                                            (0, fs_1.writeFileSync)("../sources/dataModel/".concat(Object.keys(typesDict)[index], ".json"), JSON.stringify(result.data));
                                            /* Write to types */
                                            (0, fs_1.writeFileSync)("./types/".concat(type, ".d.ts"), ts);
                                        }).catch(function (error) {
                                            console.error(error);
                                        })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < results.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(index)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    }); });
};
HarvestTypes(typesDict);
