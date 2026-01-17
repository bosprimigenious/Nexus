import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout.jsx';
import Homepage from './pages/Homepage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Example from './pages/Example.jsx';
import Manual from './pages/Manual.jsx';
import Interaction from './pages/Interaction.jsx';
import History from './pages/History.jsx';
import Settings from './pages/Settings.jsx';
import Agents from './pages/Agents.jsx';
import Projects from './pages/Projects.jsx';
import Analytics from './pages/Analytics.jsx';
import VideoGeneration from './pages/VideoGeneration.jsx';
import UIDesign from './pages/UIDesign.jsx';
import ImageGeneration from './pages/ImageGeneration.jsx';
import AudioProcessing from './pages/AudioProcessing.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import AgentDetail from './pages/AgentDetail.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import HistoryDetail from './pages/HistoryDetail.jsx';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* 独立页面（不在Layout内） */}
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<Homepage />} />
          
          {/* 需要Layout的页面 */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/manual" element={<Layout><Manual /></Layout>} />
          <Route path="/example" element={<Layout><Example /></Layout>} />
          <Route path="/interaction" element={<Layout><Interaction /></Layout>} />
          <Route path="/history" element={<Layout><History /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/agents" element={<Layout><Agents /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/video-generation" element={<Layout><VideoGeneration /></Layout>} />
          <Route path="/ui-design" element={<Layout><UIDesign /></Layout>} />
          <Route path="/image-generation" element={<Layout><ImageGeneration /></Layout>} />
          <Route path="/audio-processing" element={<Layout><AudioProcessing /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/agent/:id" element={<Layout><AgentDetail /></Layout>} />
          <Route path="/project/:id" element={<Layout><ProjectDetail /></Layout>} />
          <Route path="/history/:id" element={<Layout><HistoryDetail /></Layout>} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;