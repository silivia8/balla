import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { Home } from './pages/Home';
import { Vault } from './pages/Vault';
import { FolderView } from './pages/FolderView';
import { useState, useEffect } from 'react';
import { Folder } from './types';
import { fetchFolders } from './services/dataService';
import { PasscodeGate } from './components/PasscodeGate';

export default function App() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('lumina_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }

    fetchFolders().then(data => {
      setFolders(data);
      setLoading(false);
    });
  }, []);

  const handleAuthSuccess = () => {
    localStorage.setItem('lumina_auth', 'true');
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PasscodeGate onSuccess={handleAuthSuccess} />;
  }

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home folders={folders} />} />
          <Route path="/vault" element={<Vault folders={folders} />} />
          <Route path="/folder/:id" element={<FolderView folders={folders} />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

