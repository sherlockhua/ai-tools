<template>
    <div class="upload-view">
      <section class="hero-section">
        <div class="container">
          <h1 class="hero-title">Convert Audio & Video to Text</h1>
          <p class="hero-subtitle">
            Transform your media files into accurate transcripts with our AI-powered technology.
            Supports multiple formats and languages.
          </p>
        </div>
      </section>
  
      <section class="upload-section">
        <div class="container">
          <UploadArea @file-uploaded="handleFileUpload" />
          
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <FileFormatIcon />
              </div>
              <h3 class="feature-title">Supports 12 Formats</h3>
              <p class="feature-description">MP3, MP4, WAV, MOV, and more</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <LanguageIcon />
              </div>
              <h3 class="feature-title">100+ Languages</h3>
              <p class="feature-description">Accurate transcription in multiple languages</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <ExportIcon />
              </div>
              <h3 class="feature-title">6 Export Formats</h3>
              <p class="feature-description">TXT, DOCX, PDF, SRT, VTT, CSV</p>
            </div>
          </div>
        </div>
      </section>
  
      <section class="how-it-works">
        <div class="container">
          <h2 class="section-title">How It Works</h2>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <h3 class="step-title">Upload or Paste Link</h3>
              <p class="step-description">
                Upload audio/video files from your device or paste a YouTube link.
              </p>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <h3 class="step-title">AI Transcribes Content</h3>
              <p class="step-description">
                Our AI processes your file quickly, usually in less than a minute.
              </p>
            </div>
            
            <div class="step">
              <div class="step-number">3</div>
              <h3 class="step-title">Download or Share</h3>
              <p class="step-description">
                Export in your preferred format or share a link to the transcript.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import UploadArea from '@/components/UploadArea.vue'
  import FileFormatIcon from '@/assets/icons/FileFormatIcon.vue'
  import LanguageIcon from '@/assets/icons/LanguageIcon.vue' // Check this file too
  import ExportIcon from '@/assets/icons/ExportIcon.vue'     // Check this file too
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  function handleFileUpload(file) {
    // In a real app, you would upload the file here
    console.log('File uploaded:', file)
    router.push({ name: 'dashboard' })
  }
  </script>
  
  <style scoped>
  .upload-view {
    padding-bottom: 4rem;
  }
  
  .hero-section {
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url('@/assets/images/hero-bg.jpg') no-repeat center center;
    background-size: cover;
    color: white;
    padding: 6rem 0;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
  }
  
  .upload-section {
    padding: 4rem 0;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .feature-item {
    background: white;
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: transform 0.2s ease;
  
    &:hover {
      transform: translateY(-5px);
    }
  }
  
  .feature-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
    background-color: var(--color-primary-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  
    svg {
      width: 30px;
      height: 30px;
      color: var(--color-primary);
    }
  }
  
  .feature-title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .feature-description {
    color: var(--color-text-secondary);
  }
  
  .how-it-works {
    background-color: var(--color-bg-secondary);
    padding: 4rem 0;
  }
  
  .section-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
  }
  
  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .step {
    background: white;
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    position: relative;
  }
  
  .step-number {
    position: absolute;
    top: -1.5rem;
    left: 2rem;
    width: 3rem;
    height: 3rem;
    background-color: var(--color-primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.25rem;
  }
  
  .step-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  
  .step-description {
    color: var(--color-text-secondary);
  }
  </style>