import { Folder, FileText, Smartphone, Globe, Image as ImageIcon, Film, Download, Trash2, Bug, ShieldAlert } from 'lucide-react';
import { ApkProject, WebProject, ImageItem, VideoItem, DocumentItem } from '../../types';

interface FileExplorerProps {
  apks: ApkProject[];
  webs: WebProject[];
  images: ImageItem[];
  videos: VideoItem[];
  docs: DocumentItem[];
  onNavigate: (app: any) => void;
}

export default function FileExplorerApp({ apks, webs, images, videos, docs, onNavigate }: FileExplorerProps) {
  return (
    <div className="flex flex-col h-full bg-[#12141c] text-foreground p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
          <Folder className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Files & APKs Manager</h1>
          <p className="text-xs text-muted-foreground">All generated assets on Android 15 storage</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* APKs Section */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Compiled APKs ({apks.length + 1})
          </h3>
          <div className="flex flex-col gap-2">
            <div className="bg-[#1f2638] p-3.5 rounded-xl border border-emerald-500/40 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-between p-1 shrink-0">
                    <ShieldAlert className="w-5 h-5 text-emerald-400 m-auto" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-foreground">shieldsecurity-playstore.aab</h4>
                      <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded font-mono font-bold">Google Play Bundle</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Firmado RSA-2048 • Esquema V2/V3/V4 • Icono Adaptive 512x512</p>
                  </div>
                </div>
                <a 
                  href="/instal/shieldsecurity-playstore.aab" 
                  download="shieldsecurity-playstore.aab"
                  onClick={(e) => { e.stopPropagation(); }}
                  className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold rounded-lg text-xs flex items-center gap-1 shadow"
                >
                  <Download className="w-3.5 h-3.5" /> Google Play .AAB
                </a>
              </div>

              <div className="border-t border-border/50 pt-2 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-foreground">instal/darkia.apk</h4>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono">Firma V2/V3 Validadas</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">ZIP Magic Bytes PK\x03\x04 • zipalign 4-byte • Android 15 (SDK 35)</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('crash-analyzer')}
                    className="px-2.5 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 font-semibold rounded-lg text-xs flex items-center gap-1 border border-rose-500/30"
                    title="Analyze StackTrace"
                  >
                    <Bug className="w-3.5 h-3.5" /> Inspector
                  </button>
                  <a 
                    href="/instal/darkia.apk" 
                    download="darkia.apk"
                    onClick={(e) => { e.stopPropagation(); }}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold rounded-lg text-xs flex items-center gap-1 shadow"
                  >
                    <Download className="w-3.5 h-3.5" /> Release .APK
                  </a>
                </div>
              </div>
            </div>

            {apks.map((apk) => (
              <div key={apk.id} onClick={() => onNavigate('apk-studio')} className="bg-[#1a1f2c] p-3 rounded-xl border border-border flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-all">
                <div>
                  <h4 className="font-semibold text-xs text-foreground">{apk.appName} <span className="text-[10px] text-muted-foreground">({apk.packageName})</span></h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{apk.description}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); alert(`Downloading ${apk.appName}.apk`); }} className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Websites Section */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-400" /> Web Projects ({webs.length})
          </h3>
          <div className="flex flex-col gap-2">
            {webs.map((web) => (
              <div key={web.id} onClick={() => onNavigate('web-forge')} className="bg-[#1a1f2c] p-3 rounded-xl border border-border flex items-center justify-between cursor-pointer hover:border-blue-500/50 transition-all">
                <div>
                  <h4 className="font-semibold text-xs text-foreground">{web.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{web.prompt}</p>
                </div>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded">HTML</span>
              </div>
            ))}
          </div>
        </div>

        {/* Images Section */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-purple-400" /> AI Images ({images.length})
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {images.map((img) => (
              <div key={img.id} onClick={() => onNavigate('image-studio')} className="relative rounded-xl overflow-hidden border border-border cursor-pointer group">
                <img src={img.url} alt={img.title} referrerPolicy="no-referrer" className="w-full h-24 object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-x-0 bottom-0 bg-black/70 p-1.5">
                  <p className="text-[10px] text-white truncate font-medium">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-400" /> Documents & Files ({docs.length})
          </h3>
          <div className="flex flex-col gap-2 pb-4">
            {docs.map((doc) => (
              <div key={doc.id} onClick={() => onNavigate('doc-editor')} className="bg-[#1a1f2c] p-3 rounded-xl border border-border flex items-center justify-between cursor-pointer hover:border-amber-500/50 transition-all">
                <div>
                  <h4 className="font-semibold text-xs text-foreground">{doc.name}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Size: {doc.size}</p>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded uppercase">{doc.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
