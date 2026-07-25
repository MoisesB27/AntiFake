"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionaryService = void 0;
const common_1 = require("@nestjs/common");
let DictionaryService = class DictionaryService {
    dictionary = [
        { word: 'urgente', baseWeight: 10 },
        { word: 'contraseña', baseWeight: 20 },
        { word: 'banco', baseWeight: 15 },
        { word: 'premio', baseWeight: 25 },
        { word: 'ganador', baseWeight: 20 },
        { word: 'oferta', baseWeight: 15 },
        { word: 'bloqueado', baseWeight: 20 },
        { word: 'verificar', baseWeight: 15 },
        { word: 'cuenta', baseWeight: 10 },
        { word: 'pago', baseWeight: 10 },
        { word: 'inmediato', baseWeight: 15 },
    ];
    getDictionary() {
        return this.dictionary;
    }
};
exports.DictionaryService = DictionaryService;
exports.DictionaryService = DictionaryService = __decorate([
    (0, common_1.Injectable)()
], DictionaryService);
//# sourceMappingURL=dictionary.service.js.map