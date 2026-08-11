export type AppId = 
  | 'home'
  | 'apk-studio'
  | 'web-forge'
  | 'image-studio'
  | 'video-suite'
  | 'doc-editor'
  | 'gemini-assistant'
  | 'file-explorer'
  | 'crash-analyzer'
  | 'settings';

export interface CrashLog {
  id: string;
  ver: string;
  permission: string;
  abi: string;
  model: string;
  sdk: string;
  release: string;
  targetSdk: string;
  stackTrace: string;
  exceptionType: string;
  exceptionMessage: string;
  timestamp: number;
}

export interface ApkProject {
  id: string;
  appName: string;
  packageName: string;
  version: string;
  description: string;
  category: string;
  kotlinCode: string;
  xmlLayout: string;
  manifest: string;
  buildStatus: 'draft' | 'building' | 'compiled' | 'error';
  createdAt: number;
}

export interface WebProject {
  id: string;
  title: string;
  prompt: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  framework: 'HTML/JS' | 'React' | 'Tailwind';
  createdAt: number;
}

export interface ImageItem {
  id: string;
  title: string;
  prompt: string;
  url: string;
  style: string;
  aspectRatio: string;
  createdAt: number;
}

export interface VideoItem {
  id: string;
  title: string;
  prompt: string;
  duration: string;
  resolution: string;
  thumbnailUrl: string;
  status: 'rendering' | 'completed';
  createdAt: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'markdown' | 'json' | 'code' | 'text' | 'pdf';
  content: string;
  size: string;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: number;
  actionCard?: {
    type: 'apk' | 'web' | 'image' | 'video' | 'doc';
    title: string;
    id: string;
  };
}

export type ThemeAccent = 'emerald' | 'lavender' | 'ocean' | 'sunset' | 'obsidian';
