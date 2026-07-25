import { Injectable } from '@nestjs/common';
import { DictionaryService } from './dictionary/dictionary.service';

export interface ScanResult {
  word: string;
  originalWeight: number;
  occurrences: number;
  updatedWeight: number;
}

@Injectable()
export class ScannerService {
  constructor(private readonly dictionaryService: DictionaryService) {}

  scanText(text: string): ScanResult[] {
    const dictionary = this.dictionaryService.getDictionary();
    const results: ScanResult[] = [];

    const lowerText = text.toLowerCase();

    for (const entry of dictionary) {
      const wordLower = entry.word.toLowerCase();
      // Using word boundaries to match whole words.
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
}
