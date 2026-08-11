import React, { useState } from 'react';
import { CrashLog } from '../../types';
import { Bug, Sparkles, AlertTriangle, CheckCircle2, ShieldAlert, Cpu, Wrench, Download, Copy, Check, FileCode, RefreshCw } from 'lucide-react';

interface CrashAnalyzerProps {
  crashLogs: CrashLog[];
  onAddApk?: (apk: any) => void;
  onNavigate?: (app: any) => void;
}

export default function CrashAnalyzerApp({ crashLogs, onAddApk, onNavigate }: CrashAnalyzerProps) {
  const [selectedCrash, setSelectedCrash] = useState<CrashLog>(crashLogs[0] || {
    id: 'crash-1',
    ver: '2.26.8(26080495)',
    permission: 'APP',
    abi: 'arm64-v8a',
    model: 'moto g54 5G',
    sdk: '35',
    release: '15',
    targetSdk: '30',
    exceptionType: 'java.io.IOException',
    exceptionMessage: 'Archive is not a ZIP archive',
    stackTrace: 'java.io.IOException: Archive is not a ZIP archive',
    timestamp: Date.now()
  });

  const [inputLog, setInputLog] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isRepaired, setIsRepaired] = useState(false);

  const handleAnalyzeCustomLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputLog.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      // Parse exception type and message
      let excType = 'java.lang.Exception';
      let excMsg = 'Unknown crash event';
      if (inputLog.includes('Archive is not a ZIP archive')) {
        excType = 'java.io.IOException';
        excMsg = 'Archive is not a ZIP archive';
      } else if (inputLog.includes('NullPointerException')) {
        excType = 'java.lang.NullPointerException';
        excMsg = 'Attempt to read from null object reference';
      } else if (inputLog.includes('ClassNotFoundException')) {
        excType = 'java.lang.ClassNotFoundException';
        excMsg = 'Class not found in DexClassLoader';
      }

      // Extract device info if present
      const modelMatch = inputLog.match(/MODEL:\s*([^\n]+)/);
      const sdkMatch = inputLog.match(/SDK:\s*([^\n]+)/);

      const newCrash: CrashLog = {
        id: `crash-${Date.now()}`,
        ver: '2.26.8',
        permission: 'APP',
        abi: 'arm64-v8a',
        model: modelMatch ? modelMatch[1].trim() : 'moto g54 5G',
        sdk: sdkMatch ? sdkMatch[1].trim() : '35',
        release: '15',
        targetSdk: '30',
        exceptionType: excType,
        exceptionMessage: excMsg,
        stackTrace: inputLog,
        timestamp: Date.now()
      };

      setSelectedCrash(newCrash);
      setIsAnalyzing(false);
      setInputLog('');
    }, 1200);
  };

  const handleCopyAnalysis = () => {
    const summary = `[NexusOS 15 AI Crash Diagnostic]
Device: ${selectedCrash.model} (Android ${selectedCrash.release}, SDK ${selectedCrash.sdk})
Target SDK: ${selectedCrash.targetSdk} | ABI: ${selectedCrash.abi}
Exception: ${selectedCrash.exceptionType}: ${selectedCrash.exceptionMessage}

ROOT CAUSE:
An APK or payload archive was passed to the ZipFile/ZipInputStream decoder, but the byte header lacks the mandatory PK magic bytes (0x50 0x4B 0x03 0x04). The file is corrupted, empty, truncated, or raw HTML (e.g. 404 response).

RECOMMENDED FIXES:
1. Ensure the file downloaded is a valid binary APK.
2. Verify HTTP header Content-Type is 'application/vnd.android.package-archive'.
3. Re-package & sign the APK with zipalign and apksigner.`;
    
    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRepairApk = () => {
    setIsRepaired(true);
    if (onAddApk) {
      onAddApk({
        id: `apk-repaired-${Date.now()}`,
        appName: 'Darkia (Fixed)',
        packageName: 'com.darkia.app',
        version: '2.26.8',
        description: 'Repaired signed APK with valid ZIP archive headers for Android 15.',
        category: 'Repaired APK',
        kotlinCode: `package com.darkia.app\n\nimport android.os.Bundle\nimport androidx.appcompat.app.AppCompatActivity\n\nclass MainActivity : AppCompatActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        // Zip Archive & PK magic bytes verified!\n    }\n}`,
        xmlLayout: `<?xml version="1.0" encoding="utf-8"?>\n<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent">\n    <TextView android:text="Darkia App Loaded Successfully!" />\n</LinearLayout>`,
        manifest: `<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.darkia.app">\n    <application android:label="Darkia Fixed"/>\n</manifest>`,
        buildStatus: 'compiled',
        createdAt: Date.now()
      });
    }
    setTimeout(() => {
      if (onNavigate) onNavigate('apk-studio');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#12141c] text-foreground p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl">
            <Bug className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Android StackTrace Inspector</h1>
            <p className="text-xs text-muted-foreground">Android 15 Neural Crash Diagnostic & APK Repair</p>
          </div>
        </div>
        <div className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded-full font-mono">
          SDK 35 • Moto G54
        </div>
      </div>

      {/* Paste New Stack Trace Form */}
      <form onSubmit={handleAnalyzeCustomLog} className="mb-4">
        <div className="relative">
          <textarea
            rows={2}
            value={inputLog}
            onChange={(e) => setInputLog(e.target.value)}
            placeholder="Paste raw Android stack trace or crash report here..."
            className="w-full bg-[#1a1f2c] border border-border rounded-xl p-3 text-xs pr-20 text-foreground font-mono focus:outline-none focus:border-rose-500 resize-none"
          />
          <button
            type="submit"
            disabled={isAnalyzing || !inputLog.trim()}
            className="absolute right-2 bottom-3 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold rounded-lg text-xs flex items-center gap-1 transition-all"
          >
            {isAnalyzing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {/* Selected Crash Card Header */}
      {selectedCrash && (
        <div className="flex-1 flex flex-col gap-4">
          {/* Environment Specs Badge */}
          <div className="bg-[#1f2638] p-3.5 rounded-2xl border border-rose-500/40 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Fatal Crash Detected</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">
                {new Date(selectedCrash.timestamp).toLocaleTimeString()}
              </span>
            </div>

            {/* Error Type banner */}
            <div className="bg-rose-950/50 border border-rose-500/30 p-2.5 rounded-xl mb-3">
              <div className="font-mono text-xs font-bold text-rose-300">
                {selectedCrash.exceptionType}
              </div>
              <div className="text-xs text-rose-200 mt-0.5 font-medium">
                "{selectedCrash.exceptionMessage}"
              </div>
            </div>

            {/* Device parameters grid */}
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="bg-[#12141c] p-2 rounded-lg border border-border">
                <span className="text-muted-foreground block">Device Model</span>
                <span className="font-semibold text-white truncate block">{selectedCrash.model}</span>
              </div>
              <div className="bg-[#12141c] p-2 rounded-lg border border-border">
                <span className="text-muted-foreground block">Android OS / SDK</span>
                <span className="font-semibold text-emerald-400 block">Android {selectedCrash.release} (SDK {selectedCrash.sdk})</span>
              </div>
              <div className="bg-[#12141c] p-2 rounded-lg border border-border">
                <span className="text-muted-foreground block">Target SDK / ABI</span>
                <span className="font-semibold text-cyan-400 block">SDK {selectedCrash.targetSdk} • {selectedCrash.abi}</span>
              </div>
            </div>
          </div>

          {/* AI Root Cause Breakdown */}
          <div className="bg-[#1a1f2c] p-4 rounded-2xl border border-border flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" /> AI Root Cause Analysis
              </h3>
              <button
                onClick={handleCopyAnalysis}
                className="px-2.5 py-1 bg-[#222838] hover:bg-[#2c344a] text-xs text-gray-200 rounded-lg flex items-center gap-1 transition-all"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied Report' : 'Copy Summary'}</span>
              </button>
            </div>

            <div className="text-xs text-gray-200 leading-relaxed bg-[#10131b] p-3.5 rounded-xl border border-border">
              <p className="mb-2">
                <strong className="text-rose-400">Diag 1: Paquete Dañado (ZIP Archive Error)</strong>
                <br />
                En Android, un archivo <code className="text-emerald-300 font-mono">.apk</code> debe ser una estructura comprimida ZIP válida. La excepción <code className="text-rose-400 font-mono">java.io.IOException: Archive is not a ZIP archive</code> ocurre cuando faltan los bytes de cabecera ZIP (<code className="text-amber-300 font-mono">PK\x03\x04</code>) debido a una descarga trunca, error 404 guardado como .apk o archivo corrupto.
              </p>
              <p className="mb-2">
                <strong className="text-amber-400">Diag 2: Error de Firma (Signature Scheme V2/V3 required)</strong>
                <br />
                En Android 15 (SDK 35, Moto G54), el PackageInstaller exige certificados **APK Signature Scheme v2, v3 o v4** con alineación <code className="text-cyan-300 font-mono">zipalign -v 4</code>. Si el APK no tiene firma válida o usa esquema v1 antiguo, Android rechaza la instalación con "Error de firma / INSTALL_PARSE_FAILED_NO_CERTIFICATES".
              </p>
            </div>

            {/* Actionable Remediation Checklist */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-muted-foreground uppercase">Soluciones Recomendadas</h4>
              <div className="bg-[#10131b] p-3 rounded-xl border border-border flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Recompilar con Cabeceras ZIP Válidas (PK Magic Bytes)</span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Corrige la estructura del paquete <code className="text-emerald-400 font-mono">darkia.apk</code> eliminando bytes corruptos de descarga.</p>
                </div>
              </div>

              <div className="bg-[#10131b] p-3 rounded-xl border border-border flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Firmar APK con esquema V2/V3 y Zipalign 4-byte</span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Ejecuta <code className="text-cyan-300 font-mono">zipalign -v 4 input.apk output.apk</code> y firma con <code className="text-cyan-300 font-mono">apksigner sign --ks release.jks</code> para compatibilidad Android 15.</p>
                </div>
              </div>
            </div>

            {/* 1-Click Fix Button */}
            <button
              onClick={handleRepairApk}
              disabled={isRepaired}
              className="mt-2 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-black font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all text-xs"
            >
              {isRepaired ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Repaired & Recompiled Valid APK! Opening Studio...</span>
                </>
              ) : (
                <>
                  <Wrench className="w-4 h-4" />
                  <span>Fix & Generate Valid ZIP-Compliant APK (1-Click Repair)</span>
                </>
              )}
            </button>
          </div>

          {/* Raw Stack Trace Expandable Box */}
          <div className="bg-[#1a1f2c] rounded-2xl border border-border overflow-hidden">
            <div className="bg-[#222838] px-4 py-2 text-xs font-bold text-muted-foreground flex items-center justify-between">
              <span className="flex items-center gap-1.5"><FileCode className="w-3.5 h-3.5 text-rose-400" /> Raw Android StackTrace</span>
              <span className="font-mono text-[10px] text-gray-400">20 frames</span>
            </div>
            <pre className="p-3 text-[10px] font-mono text-rose-300 bg-[#0d0f17] overflow-x-auto max-h-48 scrollbar-none leading-relaxed">
              {selectedCrash.stackTrace}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
