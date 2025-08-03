import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import AIDemo from './components/AIDemo';
import Highlights from './components/Highlights';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';
import FolkloreGuide from './components/FolkloreGuide';
import HistoryStories from './components/HistoryStories';
import CulturalRoutes from './components/CulturalRoutes';
import ARSpringExploration from './components/ARSpringExploration';

function App() {
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [showFolkloreGuide, setShowFolkloreGuide] = useState(false);
  const [showHistoryStories, setShowHistoryStories] = useState(false);
  const [showCulturalRoutes, setShowCulturalRoutes] = useState(false);
  const [showARExploration, setShowARExploration] = useState(false);

  if (showChatInterface) {
    return <ChatInterface onBack={() => setShowChatInterface(false)} />;
  }

  if (showFolkloreGuide) {
    return <FolkloreGuide onBack={() => setShowFolkloreGuide(false)} />;
  }

  if (showHistoryStories) {
    return <HistoryStories onBack={() => setShowHistoryStories(false)} />;
  }

  if (showCulturalRoutes) {
    return <CulturalRoutes onBack={() => setShowCulturalRoutes(false)} />;
  }

  if (showARExploration) {
    return <ARSpringExploration onBack={() => setShowARExploration(false)} />;
  }

  return (
    <div className="min-h-screen">
      <Header onChatClick={() => setShowChatInterface(true)} />
      <Hero />
      <Features 
        onChatClick={() => setShowChatInterface(true)}
        onFolkloreClick={() => setShowFolkloreGuide(true)}
        onHistoryClick={() => setShowHistoryStories(true)}
        onRoutesClick={() => setShowCulturalRoutes(true)}
        onARClick={() => setShowARExploration(true)}
      />
      <AIDemo />
      <Highlights />
      <Footer />
    </div>
  );
}

export default App;