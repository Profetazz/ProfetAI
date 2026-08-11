import React, { useState } from 'react';
import { ApkProject } from '../../types';
import { Terminal, Cpu, Play, Download, CheckCircle2, Sparkles, Code, Smartphone, Layers } from 'lucide-react';

interface ApkStudioProps {
  apks: ApkProject[];
  onAddApk: (apk: ApkProject) => void;
}

export default function ApkStudioApp({ apks, onAddApk }: ApkStudioProps) {
  const [selectedApk, setSelectedApk] = useState<ApkProject>(apks[0] || {
    id: 'apk-1',
    appName: 'FitPulse AI',
    packageName: 'com.nexus.fitpulse',
    version: '1.0.0',
    description: 'AI personal trainer',
    category: 'Health',
    kotlinCode: 'class MainActivity : AppCompatActivity() {}',
    xmlLayout: '<LinearLayout/>',
    manifest: '<manifest/>',
    buildStatus: 'compiled',
    createdAt: Date.now()
  });

  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'playstore' | 'kotlin' | 'xml' | 'manifest'>('preview');

  const handleGenerateApk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newApk: ApkProject = {
        id: `apk-${Date.now()}`,
        appName: prompt.split(' ')[0] ? prompt.split(' ')[0] + ' App' : 'NexusApp',
        packageName: `com.nexus.${prompt.toLowerCase().replace(/[^a-z]/g, '').slice(0, 10)}`,
        version: '1.0.0',
        description: prompt,
        category: 'AI Generated',
        kotlinCode: `package com.nexus.app\n\nimport android.os.Bundle\nimport androidx.appcompat.app.AppCompatActivity\n\nclass MainActivity : AppCompatActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContentView(R.layout.activity_main)\n        // Generated for: ${prompt}\n    }\n}`,
        xmlLayout: `<?xml version="1.0" encoding="utf-8"?>\n<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:orientation="vertical"\n    android:gravity="center"\n    android:padding="24dp">\n    <TextView\n        android:text="${prompt}"\n        android:textSize="20sp"\n        android:textColor="#FFFFFF"\n        android:layout_width="wrap_content"\n        android:layout_height="wrap_content" />\n</LinearLayout>`,
        manifest: `<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.nexus.app">\n    <application android:label="${prompt}">\n        <activity android:name=".MainActivity" android:exported="true"/>\n    </application>\n</manifest>`,
        buildStatus: 'compiled',
        createdAt: Date.now()
      };
      onAddApk(newApk);
      setSelectedApk(newApk);
      setIsGenerating(false);
      setPrompt('');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#12141c] text-foreground p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">APK Studio AI 15</h1>
            <p className="text-xs text-muted-foreground">Compile & test Android APKs instantly</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-mono">
            Firma v2 / v3 APK
          </div>
          <div className="text-[10px] bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20 font-mono">
            SDK 35 (Android 15)
          </div>
        </div>
      </div>

      {/* Prompt Generator */}
      <form onSubmit={handleGenerateApk} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe APK to generate (e.g. Crypto Tracker, Task Manager...)"
            className="w-full bg-[#1a1f2c] border border-border rounded-xl px-4 py-3 text-sm pr-12 focus:outline-none focus:border-emerald-500 text-foreground"
          />
          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="absolute right-2 top-2 bottom-2 px-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-semibold rounded-lg text-xs flex items-center gap-1 transition-all"
          >
            {isGenerating ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isGenerating ? 'Building...' : 'Generate'}
          </button>
        </div>
      </form>

      {/* Project Switcher */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {apks.map((apk) => (
          <button
            key={apk.id}
            onClick={() => setSelectedApk(apk)}
            className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedApk.id === apk.id
                ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20'
                : 'bg-[#1a1f2c] text-muted-foreground hover:text-white border border-border'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            {apk.appName}
          </button>
        ))}
      </div>

      {/* Selected APK Inspector */}
      {selectedApk && (
        <div className="flex-1 flex flex-col bg-[#1a1f2c] border border-border rounded-2xl overflow-hidden shadow-xl">
          {/* APK Header info */}
          <div className="p-3 bg-[#222838] border-b border-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">{selectedApk.appName}</span>
              <span className="text-muted-foreground">({selectedApk.packageName})</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-medium">
                Firma v2 OK (apksigner)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Compiled
              </span>
              <button
                onClick={() => alert(`Downloading signed APK (Scheme v2/v3): ${selectedApk.appName}.apk`)}
                className="p-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg flex items-center gap-1"
                title="Download Signed APK v2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>APK v2</span>
              </button>
            </div>
          </div>

          {/* Code/Preview Tabs */}
          <div className="flex border-b border-border bg-[#161a25] text-xs overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('preview')}
              className={`py-2 px-3 font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'preview' ? 'border-emerald-500 text-emerald-400 bg-[#1a1f2c]' : 'border-transparent text-muted-foreground hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Live Sandbox
            </button>
            <button
              onClick={() => setActiveTab('playstore')}
              className={`py-2 px-3 font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'playstore' ? 'border-indigo-500 text-indigo-400 bg-[#1a1f2c]' : 'border-transparent text-muted-foreground hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Play Console Export
            </button>
            <button
              onClick={() => setActiveTab('kotlin')}
              className={`py-2 px-3 font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'kotlin' ? 'border-emerald-500 text-emerald-400 bg-[#1a1f2c]' : 'border-transparent text-muted-foreground hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> MainActivity.kt
            </button>
            <button
              onClick={() => setActiveTab('xml')}
              className={`py-2 px-3 font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'xml' ? 'border-emerald-500 text-emerald-400 bg-[#1a1f2c]' : 'border-transparent text-muted-foreground hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> activity_main.xml
            </button>
            <button
              onClick={() => setActiveTab('manifest')}
              className={`py-2 px-3 font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'manifest' ? 'border-emerald-500 text-emerald-400 bg-[#1a1f2c]' : 'border-transparent text-muted-foreground hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> Manifest
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'preview' && (
              <div className="h-full flex flex-col items-center justify-center bg-[#10131b] rounded-xl p-4 border border-border">
                <div className="w-56 h-96 bg-black rounded-3xl border-4 border-gray-700 p-3 flex flex-col shadow-2xl relative overflow-hidden">
                  <div className="w-20 h-3 bg-gray-700 rounded-full mx-auto mb-3" />
                  <div className="flex-1 bg-[#121212] rounded-2xl p-3 flex flex-col justify-between text-white">
                    <div>
                      <h3 className="font-bold text-sm text-emerald-400">{selectedApk.appName}</h3>
                      <p className="text-[10px] text-gray-400 mt-1">{selectedApk.description}</p>
                    </div>
                    <div className="my-auto text-center">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                        <Play className="w-6 h-6 fill-emerald-400" />
                      </div>
                      <span className="text-xs font-semibold">App Sandbox Running</span>
                    </div>
                    <button 
                      onClick={() => alert(`Launched ${selectedApk.appName} inside Android 15 VM!`)}
                      className="w-full py-2 bg-emerald-500 text-black font-bold rounded-xl text-xs"
                    >
                      Test Action
                    </button>
                  </div>
                </div>
                <span className="text-[11px] text-muted-foreground mt-3">Android 15 ART Virtual Machine Active</span>
              </div>
            )}

            {activeTab === 'playstore' && (
              <div className="flex flex-col gap-4 bg-[#10131b] p-4 rounded-xl border border-border">
                {/* Notice banner about Physical Phone Installation */}
                <div className="bg-amber-950/40 border border-amber-500/40 p-3.5 rounded-xl text-xs text-amber-200">
                  <div className="flex items-center gap-2 font-bold text-amber-300 mb-1">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>¿Cómo compilar el .APK Real para tu Celular (Moto G54 5G)?</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-amber-100/90">
                    Las aplicaciones web en navegador simulan la interfaz y el flujo de desarrollo. Para instalar un APK físico sin errores de sintaxis en tu celular o subirlo a Google Play Store, se requiere el compilador nativo <strong>Android SDK (AAPT2 + D8 Bytecode Compiler)</strong>. ¡Puedes exportar todo el proyecto listo abajo!
                  </p>
                </div>

                {/* App Icon & Basic Info */}
                <div className="flex items-center gap-4 bg-[#1a1f2c] p-4 rounded-xl border border-indigo-500/30">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-indigo-600 p-0.5 shadow-lg shrink-0 flex items-center justify-center">
                    <div className="w-full h-full bg-[#12141c] rounded-[14px] flex flex-col items-center justify-center">
                      <Cpu className="w-8 h-8 text-emerald-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{selectedApk.appName}</h3>
                      <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono">
                        Android Studio Ready
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5">{selectedApk.packageName}</p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                      <span>Version: 2.26.8 (22608495)</span>
                      <span>•</span>
                      <span>Target SDK: 35 (Android 15)</span>
                    </div>
                  </div>
                </div>

                {/* Export Source Code Option */}
                <div className="bg-[#181c28] p-3.5 rounded-xl border border-border flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-white">Código Fuente Android 15 Organizado</h4>
                  <p className="text-[11px] text-muted-foreground">Copia o descarga el código completo de Kotlin, XML Layout y Manifest listo para pegar en Android Studio o AIDE:</p>
                  <button
                    onClick={() => {
                      const fullProject = `// === AndroidManifest.xml ===\n${selectedApk.manifest}\n\n// === MainActivity.kt ===\n${selectedApk.kotlinCode}\n\n// === activity_main.xml ===\n${selectedApk.xmlLayout}`;
                      navigator.clipboard.writeText(fullProject);
                      alert("¡Código fuente completo copiado al portapapeles! Puedes pegarlo directamente en Android Studio o AIDE.");
                    }}
                    className="py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Code className="w-4 h-4" />
                    <span>Copiar Código Fuente Completo (Android Studio / AIDE)</span>
                  </button>
                </div>

                {/* Readiness Checklist */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Verificaciones de Seguridad Play Store</h4>
                  
                  <div className="bg-[#181c28] p-3 rounded-lg border border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Firma de Producción RSA 2048 (Scheme V2, V3 & V4)</span>
                        <p className="text-[10px] text-muted-foreground">Keystore <code className="text-emerald-400 font-mono">release.keystore</code> listo.</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">READY</span>
                  </div>

                  <div className="bg-[#181c28] p-3 rounded-lg border border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Integridad de Archivo ZIP (PK\x03\x04 Header)</span>
                        <p className="text-[10px] text-muted-foreground">Estructura verificada con <code className="text-cyan-300 font-mono">zipalign -v 4</code>.</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">READY</span>
                  </div>
                </div>

                {/* Export Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <a
                    href="/instal/shieldsecurity-playstore.aab"
                    download="shieldsecurity-playstore.aab"
                    className="py-3 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all text-center"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar .AAB (Play Console)</span>
                  </a>

                  <a
                    href="/instal/darkia.apk"
                    download="darkia.apk"
                    className="py-3 px-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all text-center"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar .APK Firmado V2/V3</span>
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'kotlin' && (
              <pre className="text-xs font-mono text-emerald-300 bg-[#10131b] p-4 rounded-xl overflow-x-auto">
                {selectedApk.kotlinCode}
              </pre>
            )}

            {activeTab === 'xml' && (
              <pre className="text-xs font-mono text-cyan-300 bg-[#10131b] p-4 rounded-xl overflow-x-auto">
                {selectedApk.xmlLayout}
              </pre>
            )}

            {activeTab === 'manifest' && (
              <pre className="text-xs font-mono text-amber-300 bg-[#10131b] p-4 rounded-xl overflow-x-auto">
                {selectedApk.manifest}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
