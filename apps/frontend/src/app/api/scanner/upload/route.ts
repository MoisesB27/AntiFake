import { NextResponse } from 'next/server';

export interface PhishingWord {
  word: string;
  baseWeight: number;
}

export interface ScanResult {
  word: string;
  originalWeight: number;
  occurrences: number;
  updatedWeight: number;
}

const dictionary: PhishingWord[] = [
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

function scanText(text: string): ScanResult[] {
  const results: ScanResult[] = [];
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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    const textContent = await file.text();
    const results = scanText(textContent);

    return NextResponse.json({
      message: 'Scan completed successfully',
      report: results,
    });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
