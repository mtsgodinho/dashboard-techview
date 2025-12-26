
import React, { useState, useEffect } from 'react';
import { ViewType, User, UserRole } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Sales from './components/Sales';
import Plans from './components/Plans';
import Users from './components/Users';
import Login from './components/Login';
import AstronautMascot from './components/AstronautMascot';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [loading, setLoading] = useState(true);

  // Simulação de carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-8 animate-in fade-in">
        <AstronautMascot size="lg" animated />
        <div className="space-y-4 flex flex-col items-center">
           <h1 className="text-3xl font-tech font-bold tracking-widest text-white">
             TECH<span className="text-techBlue">VIEW</span>
           </h1>
           <div className="w-48 h-1 bg-techBlue/10 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-techBlue shadow-glow h-full w-1/3 animate-[loading_1.5s_infinite_ease-in-out]" />
           </div>
           <p className="text-[10px] uppercase tracking-[0.3em] text-techBlue/50 animate-pulse font-bold">Sincronizando Órbita...</p>
        </div>
        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}</style>
      </div>
    );
  }

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard user={currentUser} />;
      case 'sales':
        return <Sales user={currentUser} />;
      case 'plans':
        return currentUser.role === UserRole.ADMIN ? <Plans /> : <Unauthorized />;
      case 'users':
        return currentUser.role === UserRole.ADMIN ? <Users /> : <Unauthorized />;
      case 'subscriptions':
      case 'customers':
        return (
          <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
             <AstronautMascot size="lg" />
             <div className="text-center">
               <h2 className="text-2xl font-tech font-bold text-white">Construção Satelital</h2>
               <p className="text-gray-500 mt-2">Este módulo está sendo calibrado no cinturão de asteroides.</p>
             </div>
             <button 
                onClick={() => setActiveView('dashboard')}
                className="px-8 py-3 rounded-2xl bg-techBlue/10 text-techBlue border border-techBlue/20 font-bold hover:bg-techBlue hover:text-black transition-all"
             >
               Voltar à Base
             </button>
          </div>
        );
      default:
        return <Dashboard user={currentUser} />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView} user={currentUser} onLogout={() => setCurrentUser(null)}>
      {renderView()}
    </Layout>
  );
};

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <AstronautMascot size="lg" />
    <h2 className="text-2xl font-tech font-bold text-red-500 mt-6">Acesso Negado</h2>
    <p className="text-gray-400 mt-2">Sua patente não permite acesso a este setor.</p>
  </div>
);

export default App;
