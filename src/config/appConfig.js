// API Configuration for Vercel deployment
// Since we don't have backend servers, these URLs are placeholders
// Features requiring these APIs will be disabled in the UI

export const API_URLS = {
  // Backend server (not available in Vercel deployment)
  BACKEND: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3031',
  
  // Chatterbox TTS server (not available in Vercel deployment)
  CHATTERBOX: process.env.REACT_APP_CHATTERBOX_URL || 'http://localhost:8765',
  
  // WebSocket for progress updates (not available in Vercel deployment)
  WEBSOCKET: process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:3031',
};

// Feature flags for Vercel deployment
export const FEATURES = {
  // Disable features that require backend servers
  VIDEO_DOWNLOAD: false,
  VIDEO_RENDERING: false,
  VOICE_CLONING: false,
  BACKGROUND_MUSIC: false,
  VIDEO_SEGMENTATION: false,
  AUDIO_EXTRACTION: false,
  PARAKEET_ASR: false,
  
  // Enable client-side features
  GEMINI_TRANSCRIPTION: true,
  SUBTITLE_EDITING: true,
  TRANSLATION: true,
  FILE_UPLOAD: true,
};

export default {
  API_URLS,
  FEATURES,
};
