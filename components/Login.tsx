
import React, { useState } from 'react';
import { Rocket, Lock, User as UserIcon, AlertCircle } from 'lucide-react';
import AstronautMascot from './AstronautMascot';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulação de autenticação
    setTimeout(() => {
      if (username === 'Mateus' && password === 'admin123') {
        onLogin({
          id: 'admin-1',
          name: 'Mateus Administrador',
          username: 'Mateus',
          email: 'mateus@techview.com',
          role: UserRole.ADMIN
        });
      } else if (username === 'vendedor' && password === '123') {
        onLogin({
          id: 'seller-1',
          name: 'Vendedor Exemplo',
          username: 'vendedor',
          email: 'vendedor@techview.com',
          role: UserRole.SELLER
        });
      } else {
        setError('Credenciais inválidas. Tente "Mateus" / "admin123"');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-techBlue/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-techBlue/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <AstronautMascot size="lg" className="mb-4" />
          <h1 className="text-4xl font-tech font-bold tracking-tighter text-white">
            TECH<span className="text-techBlue">VIEW</span>
          </h1>
          <p className="text-techBlue/60 text-xs uppercase tracking-[0.3em] font-bold mt-2">Sistema de Comando</p>
        </div>

        <div className="glass p-8 rounded-[32px] border-techBlue/20 shadow-glow-lg">
          <h2 className="text-xl font-tech font-bold text-white mb-6 flex items-center gap-2">
            <Rocket size={20} className="text-techBlue" />
            Acesso ao Dashboard
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-techBlue font-bold ml-1">Usuário</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-techBlue transition-colors" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nome de usuário" 
                  className="w-full pl-12 pr-5 py-4 rounded-xl bg-black/40 border border-techBlue/10 text-white focus:outline-none focus:border-techBlue transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-techBlue font-bold ml-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-techBlue transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-5 py-4 rounded-xl bg-black/40 border border-techBlue/10 text-white focus:outline-none focus:border-techBlue transition-all font-medium"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 rounded-2xl bg-techBlue text-black font-tech font-bold text-lg shadow-glow hover:bg-techBlue-dark transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                'Iniciar Operação'
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-loose">
              Acesso restrito ao pessoal da TechView.<br/>Contate o administrador para novas credenciais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
