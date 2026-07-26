'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { UploadCloud, FileText, AlertCircle, CheckCircle, ShieldAlert, Search } from 'lucide-react';

interface ScanResult {
  word: string;
  originalWeight: number;
  occurrences: number;
  updatedWeight: number;
}

export default function AntiFakeScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<ScanResult[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // 👇 REEMPLAZA ESTA URL CON LA URL QUE TE DÉ NETLIFY PARA TU BACKEND 👇
      const backendUrl = 'https://tu-backend-antifake.netlify.app'; 
      
      const response = await axios.post(`${backendUrl}/.netlify/functions/api/scanner/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setResults(response.data.report);
    } catch (error) {
      console.error("Error scanning file", error);
      alert("Hubo un error al analizar el archivo. Asegúrate de que el backend esté ejecutándose correctamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskLevelColor = (occurrences: number) => {
    if (occurrences === 0) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 border";
    if (occurrences < 3) return "text-amber-500 bg-amber-500/10 border-amber-500/20 border";
    return "text-red-500 bg-red-500/10 border-red-500/20 border";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20 flex flex-col items-center transition-all">
        
        {/* Header section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-medium shadow-[0_0_15px_rgba(99,102,241,0.1)]">
            <ShieldAlert size={18} />
            Detección Inteligente de Phishing
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 drop-shadow-sm">
            AntiFake Scanner
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Sube un correo o mensaje sospechoso en formato de texto y deja que nuestro motor analice las palabras clave para determinar posibles riesgos de fraude y estafas.
          </p>
        </div>

        {/* Upload section */}
        <div className="w-full max-w-3xl mb-12">
          <div 
            className={`relative group rounded-[2rem] border-2 border-dashed transition-all duration-300 ease-out overflow-hidden flex flex-col items-center justify-center p-14 cursor-pointer ${
              isDragging 
                ? 'border-indigo-400 bg-indigo-500/10 shadow-[0_0_40px_rgba(99,102,241,0.2)]' 
                : file 
                  ? 'border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.1)]' 
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/80 shadow-2xl'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept=".txt"
            />
            
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {file ? (
              <div className="flex flex-col items-center space-y-5 relative z-10">
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
                  <FileText size={48} />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-slate-200">{file.name}</p>
                  <p className="text-slate-500 text-sm mt-1 font-mono">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScan();
                  }}
                  disabled={isLoading}
                  className="mt-4 px-8 py-3.5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Search size={20} />
                  )}
                  {isLoading ? 'Analizando...' : 'Analizar Archivo'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6 relative z-10">
                <div className="w-28 h-28 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:scale-110 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all duration-500 shadow-xl">
                  <UploadCloud size={56} />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-medium text-slate-200">Arrastra tu archivo de texto aquí</p>
                  <p className="text-slate-500 mt-2">o haz clic para explorar en tus carpetas (Solo .txt)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results section */}
        {results && (
          <div className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl transition-all">
            <div className="p-8 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                  Reporte de Análisis
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </h2>
                <p className="text-slate-400 mt-1">Desglose de palabras clave detectadas y variación de su peso.</p>
              </div>
              <div className="flex items-center gap-3 bg-slate-950/50 p-2 rounded-2xl border border-slate-800/50">
                <div className="px-4 py-2 rounded-xl bg-slate-800/80 text-slate-300 text-sm font-medium">
                  Analizadas: <span className="text-slate-100">{results.length}</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium border border-red-500/20">
                  Sospechosas: <span className="font-bold">{results.filter(r => r.occurrences > 0).length}</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-800">
                    <th className="p-4 font-semibold">Palabra Detectada</th>
                    <th className="p-4 font-semibold text-center">Peso Original</th>
                    <th className="p-4 font-semibold text-center">Ocurrencias</th>
                    <th className="p-4 font-semibold text-right">Peso Actualizado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {results.sort((a, b) => b.updatedWeight - a.updatedWeight).map((result, idx) => (
                    <tr 
                      key={idx} 
                      className="group hover:bg-slate-800/40 transition-colors duration-200 rounded-xl"
                    >
                      <td className="p-4 rounded-l-xl">
                        <div className="flex items-center gap-3">
                          {result.occurrences > 0 ? (
                            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                              <AlertCircle size={16} />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                              <CheckCircle size={16} />
                            </div>
                          )}
                          <span className={`font-medium text-lg ${result.occurrences > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                            {result.word}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="text-slate-400 font-mono bg-slate-900 px-3 py-1 rounded-md inline-block">
                          {result.originalWeight}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm inline-block ${getRiskLevelColor(result.occurrences)}`}>
                          {result.occurrences} {result.occurrences === 1 ? 'vez' : 'veces'}
                        </span>
                      </td>
                      <td className="p-4 text-right rounded-r-xl">
                        <div className="flex justify-end items-center gap-2">
                          {result.occurrences > 0 && <span className="text-emerald-500 text-xs font-bold">+{result.updatedWeight - result.originalWeight}</span>}
                          <div className={`font-mono text-xl font-bold bg-slate-950 px-4 py-1.5 rounded-lg border ${result.occurrences > 0 ? 'text-indigo-400 border-indigo-500/30' : 'text-slate-500 border-slate-800'}`}>
                            {result.updatedWeight}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
