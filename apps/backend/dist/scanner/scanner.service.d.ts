import { DictionaryService } from './dictionary/dictionary.service';
export interface ScanResult {
    word: string;
    originalWeight: number;
    occurrences: number;
    updatedWeight: number;
}
export declare class ScannerService {
    private readonly dictionaryService;
    constructor(dictionaryService: DictionaryService);
    scanText(text: string): ScanResult[];
}
