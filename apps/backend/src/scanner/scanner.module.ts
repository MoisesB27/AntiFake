import { Module } from '@nestjs/common';
import { ScannerService } from './scanner.service';
import { DictionaryService } from './dictionary/dictionary.service';
import { ScannerController } from './scanner.controller';

@Module({
  providers: [ScannerService, DictionaryService],
  controllers: [ScannerController]
})
export class ScannerModule {}
