"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScannerService = void 0;
const common_1 = require("@nestjs/common");
const dictionary_service_1 = require("./dictionary/dictionary.service");
let ScannerService = class ScannerService {
    dictionaryService;
    constructor(dictionaryService) {
        this.dictionaryService = dictionaryService;
    }
    scanText(text) {
        const dictionary = this.dictionaryService.getDictionary();
        const results = [];
        const lowerText = text.toLowerCase();
        for (const entry of dictionary) {
            const wordLower = entry.word.toLowerCase();
            const regex = new RegExp(`\\b${wordLower}\\b`, 'gi');
            const matches = lowerText.match(regex);
            const occurrences = matches ? matches.length : 0;
            const updatedWeight = entry.baseWeight + (entry.baseWeight * occurrences);
            results.push({
                word: entry.word,
                originalWeight: entry.baseWeight,
                occurrences,
                updatedWeight,
            });
        }
        return results;
    }
};
exports.ScannerService = ScannerService;
exports.ScannerService = ScannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dictionary_service_1.DictionaryService])
], ScannerService);
//# sourceMappingURL=scanner.service.js.map