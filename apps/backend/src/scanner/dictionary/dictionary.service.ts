import { Injectable } from '@nestjs/common';

export interface PhishingWord {
  word: string;
  baseWeight: number;
}

@Injectable()
export class DictionaryService {
  private readonly dictionary: PhishingWord[] = [
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

  getDictionary(): PhishingWord[] {
    return this.dictionary;
  }
}
