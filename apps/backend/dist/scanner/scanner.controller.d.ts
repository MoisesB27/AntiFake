import { ScannerService } from './scanner.service';
export declare class ScannerController {
    private readonly scannerService;
    constructor(scannerService: ScannerService);
    uploadFile(file: Express.Multer.File): {
        message: string;
        report: import("./scanner.service").ScanResult[];
    };
}
