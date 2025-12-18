/**
 * Server configuration
 * This file contains all the configuration settings for the server
 */

const path = require('path');
const os = require('os');

// Port configuration
const PORT = process.env.PORT || 3001;

// CORS configuration
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Directory paths - use standard paths for web app
const VIDEOS_DIR = process.env.VIDEOS_DIR || path.join(__dirname, 'videos');
const SUBTITLES_DIR = process.env.SUBTITLES_DIR || path.join(__dirname, 'subtitles');

// Ensure directories exist
function ensureDirectories() {
  const fs = require('fs');
  
  // Create videos directory if it doesn't exist
  if (!fs.existsSync(VIDEOS_DIR)) {
    fs.mkdirSync(VIDEOS_DIR, { recursive: true });
    console.log(`Created videos directory: ${VIDEOS_DIR}`);
  }
  
  // Create subtitles directory if it doesn't exist
  if (!fs.existsSync(SUBTITLES_DIR)) {
    fs.mkdirSync(SUBTITLES_DIR, { recursive: true });
    console.log(`Created subtitles directory: ${SUBTITLES_DIR}`);
  }
}

module.exports = {
  PORT,
  CORS_ORIGIN,
  VIDEOS_DIR,
  SUBTITLES_DIR,
  ensureDirectories
};
