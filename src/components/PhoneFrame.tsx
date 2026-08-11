import { useState } from 'react';
import { AppId, ApkProject, WebProject, ImageItem, VideoItem, DocumentItem, ChatMessage, CrashLog, ThemeAccent } from '../types';
import { INITIAL_APKS, INITIAL_WEBS, INITIAL_IMAGES, INITIAL_VIDEOS, INITIAL_DOCS, INITIAL_MESSAGES, INITIAL_CRASH_LOGS } from '../data/initialData';
import StatusBar from './StatusBar';
import NavigationBar from './NavigationBar';
import HomeScreen from './HomeScreen';
import ApkStudioApp from './apps/ApkStudioApp';
import WebForgeApp from './apps/WebForgeApp';
import ImageStudioApp from './apps/ImageStudioApp';
import VideoSuiteApp from './apps/VideoSuiteApp';
import DocEditorApp from './apps/DocEditorApp';
import GeminiAssistantApp from './apps/GeminiAssistantApp';
import FileExplorerApp from './apps/FileExplorerApp';
import CrashAnalyzerApp from './apps/CrashAnalyzerApp';
import SettingsApp from './apps/SettingsApp';
import { Smartphone, Monitor, Sparkles, Folder, Cpu, Globe, Film, FileText, Bug, Image as ImageIcon } from 'lucide-react';

export default function PhoneFrame() {
  const [currentApp, setCurrentApp] = useState<AppId>('home');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [themeAccent, setThemeAccent] = useState<ThemeAccent>('emerald');

  // App States
  const [apks, setApks] = useState<ApkProject[]>(INITIAL_APKS);
  const [webs, setWebs] = useState<WebProject[]>(INITIAL_WEBS);
  const [images, setImages] = useState<ImageItem[]>(INITIAL_IMAGES);
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [docs, setDocs] = useState<DocumentItem[]>(INITIAL_DOCS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [crashLogs, setCrashLogs] = useState<CrashLog[]>(INITIAL_CRASH_LOGS);

  const handleAddApk = (apk: ApkProject) => setApks([apk, ...apks]);
  const handleAddWeb = (web: WebProject) => setWebs([web, ...webs]);
  const handleAddImage = (img: ImageItem) => setImages([img, ...images]);
  const handleAddVideo = (vid: VideoItem) => setVideos([vid, ...videos]);
  const handleUpdateDoc = (doc: DocumentItem) => {
    setDocs(docs.map(d => d.id === doc.id ? doc : d));
  };
  const handleSendMessage = (msg: ChatMessage) => setMessages([...messages, msg]);

  const renderAppContent = () => {
    switch (currentApp) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentApp} apks={apks} webs={webs} crashLogs={crashLogs} />;
      case 'apk-studio':
        return <ApkStudioApp apks={apks} onAddApk={handleAddApk} />;
      case 'web-forge':
        return <WebForgeApp webs={webs} onAddWeb={handleAddWeb} />;
      case 'image-studio':
        return <ImageStudioApp images={images} onAddImage={handleAddImage} />;
      case 'video-suite':
        return <VideoSuiteApp videos={videos} onAddVideo={handleAddVideo} />;
      case 'doc-editor':
        return <DocEditorApp docs={docs} onUpdateDoc={handleUpdateDoc} />;
      case 'gemini-assistant':
        return <GeminiAssistantApp messages={messages} onSendMessage={handleSendMessage} onNavigate={setCurrentApp} />;
      case 'file-explorer':
        return <FileExplorerApp apks={apks} webs={webs} images={images} videos={videos} docs={docs} onNavigate={setCurrentApp} />;
      case 'crash-analyzer':
        return <CrashAnalyzerApp crashLogs={crashLogs} onAddApk={handleAddApk} onNavigate={setCurrentApp} />;
      case 'settings':
        return <SettingsApp themeAccent={themeAccent} onSetThemeAccent={setThemeAccent} />;
      default:
        return <HomeScreen onNavigate={setCurrentApp} apks={apks} webs={webs} crashLogs={crashLogs} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-foreground flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Controller Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black font-black shadow-lg shadow-emerald-500/20">
            N15
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white">NexusOS 15 AI Studio</h1>
            <p className="text-xs text-muted-foreground">Android 15 OS & AI Creation Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#161a25] p-1.5 rounded-2xl border border-border">
          <button
            onClick={() => setIsPhoneFrame(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isPhoneFrame ? 'bg-emerald-500 text-black shadow' : 'text-muted-foreground hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Phone Frame
          </button>
          <button
            onClick={() => setIsPhoneFrame(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              !isPhoneFrame ? 'bg-emerald-500 text-black shadow' : 'text-muted-foreground hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Fullscreen Tablet
          </button>
        </div>
      </div>

      {/* Main Container: Phone Frame or Fullscreen */}
      <div className={`transition-all duration-500 z-10 flex flex-col ${
        isPhoneFrame 
          ? 'w-full max-w-[390px] h-[820px] bg-[#12141c] rounded-[48px] border-[8px] border-[#2b3245] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden relative' 
          : 'w-full max-w-5xl h-[800px] bg-[#12141c] rounded-3xl border border-border shadow-2xl overflow-hidden relative'
      }`}>
        {/* Phone Camera Punchhole (Only in phone frame mode) */}
        {isPhoneFrame && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-full z-50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gray-900 border border-gray-700"></div>
          </div>
        )}

        {/* Status Bar */}
        <StatusBar />

        {/* App Workspace */}
        <div className="flex-1 overflow-hidden relative">
          {renderAppContent()}
        </div>

        {/* Navigation Bar */}
        <NavigationBar currentApp={currentApp} onNavigate={setCurrentApp} />
      </div>

      {/* Footer Quick Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground z-20">
        <span className="flex items-center gap-1 cursor-pointer hover:text-rose-400 transition-colors" onClick={() => setCurrentApp('crash-analyzer')}><Bug className="w-3.5 h-3.5 text-rose-400" /> Crash Inspector</span>
        <span>•</span>
        <span className="flex items-center gap-1 cursor-pointer hover:text-emerald-400 transition-colors" onClick={() => setCurrentApp('apk-studio')}><Cpu className="w-3.5 h-3.5 text-emerald-400" /> APK Builder</span>
        <span>•</span>
        <span className="flex items-center gap-1 cursor-pointer hover:text-blue-400 transition-colors" onClick={() => setCurrentApp('web-forge')}><Globe className="w-3.5 h-3.5 text-blue-400" /> WebForge</span>
        <span>•</span>
        <span className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors" onClick={() => setCurrentApp('image-studio')}><ImageIcon className="w-3.5 h-3.5 text-purple-400" /> Image Studio</span>
        <span>•</span>
        <span className="flex items-center gap-1 cursor-pointer hover:text-teal-400 transition-colors" onClick={() => setCurrentApp('doc-editor')}><FileText className="w-3.5 h-3.5 text-teal-400" /> DocMaster</span>
      </div>
    </div>
  );
}
