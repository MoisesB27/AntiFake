export interface PhishingWord {
    word: string;
    baseWeight: number;
}
export declare class DictionaryService {
    private readonly dictionary;
    getDictionary(): PhishingWord[];
}
