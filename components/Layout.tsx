
import React, { useState } from 'react';
import { Menu, X, LogOut, Bell, User as UserIcon, Shield } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';
import { ViewType, User, UserRole } from '../types';
import AstronautMascot from './AstronautMascot';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const filteredNavItems = NAVIGATION_ITEMS.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-techBlue selection:text-black">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-deep-900 border-r border-techBlue/10 sticky top-0 h-screen z-40">
        <div className="p-6 flex items-center gap-3">
          <AstronautMascot size="sm" />
          <div>
            <h1 className="text-xl font-tech font-bold tracking-tighter text-white">TECH<span className="text-techBlue">VIEW</span></h1>
            <p className="text-[10px] uppercase tracking-widest text-techBlue/50 font-medium">Centro de Comando</p>
          </div>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          {filteredNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeView === item.id 
                  ? 'bg-techBlue/10 text-techBlue shadow-glow border border-techBlue/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
              {activeView === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-techBlue shadow-[0_0_8px_#00C8FF]" />}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="p-4 glass rounded-2xl flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border transition-colors ${
              user.role === UserRole.ADMIN ? 'bg-techBlue/20 border-techBlue/30 text-techBlue' : 'bg-white/5 border-white/10 text-gray-400'
            }`}>
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-[10px] text-gray-500 truncate uppercase tracking-tighter font-bold">
                {user.role === UserRole.ADMIN ? 'Administrador' : 'Vendedor'}
              </p>
            </div>
            <button onClick={onLogout} className="text-gray-500 hover:text-red-400 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header & Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-6 border-b border-techBlue/10">
        <div className="flex items-center gap-2">
          <AstronautMascot size="sm" className="w-8 h-8" />
          <h1 className="text-lg font-tech font-bold tracking-tighter">TECH<span className="text-techBlue">VIEW</span></h1>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-techBlue">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-md pt-20 px-6 animate-in fade-in slide-in-from-right duration-300">
           <nav className="space-y-4">
            {filteredNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id as ViewType);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                  activeView === item.id 
                    ? 'bg-techBlue/10 text-techBlue border border-techBlue/20' 
                    : 'text-gray-400'
                }`}
              >
                {item.icon}
                <span className="text-lg font-medium">{item.label}</span>
              </button>
            ))}
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400"
            >
              <LogOut size={24} />
              <span className="text-lg font-medium">Sair da Sessão</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen pt-20 lg:pt-0">
        <header className="hidden lg:flex h-20 items-center justify-between px-10 border-b border-techBlue/5 glass sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-tech font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-techBlue animate-pulse shadow-glow" />
              Console de Operações
            </h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="relative">
              <Bell size={20} className="text-gray-400 cursor-pointer hover:text-techBlue transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
             </div>
             <div className="h-8 w-[1px] bg-white/10" />
             <div className="flex items-center gap-3 cursor-pointer group">
               <div className="text-right">
                 <p className="text-sm font-medium">{user.name}</p>
                 <p className="text-[10px] text-techBlue uppercase tracking-widest font-bold">
                    {user.role === UserRole.ADMIN ? 'Nível: Total' : 'Nível: Operacional'}
                 </p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-techBlue/10 border border-techBlue/20 flex items-center justify-center overflow-hidden group-hover:border-techBlue transition-all">
                  {user.role === UserRole.ADMIN ? <Shield size={20} className="text-techBlue" /> : <UserIcon size={20} className="text-techBlue" />}
               </div>
             </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 animate-in fade-in duration-500">
          {children}
        </div>
        
        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 glass border-t border-techBlue/10 flex items-center justify-around px-4 z-40">
           {filteredNavItems.slice(0, 4).map((item) => (
             <button
                key={item.id}
                onClick={() => onViewChange(item.id as ViewType)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeView === item.id ? 'text-techBlue' : 'text-gray-500'
                }`}
             >
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
                <span className="text-[10px] font-medium">{item.label}</span>
             </button>
           ))}
        </div>
      </main>
    </div>
  );
};

export default Layout;
