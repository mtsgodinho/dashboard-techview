
import React, { useState } from 'react';
import { UserPlus, Shield, User as UserIcon, Trash2, Edit2, CheckCircle2, XCircle } from 'lucide-react';
import { User, UserRole } from '../types';

const MOCK_USERS: User[] = [
  { id: 'admin-1', name: 'Mateus Administrador', username: 'Mateus', email: 'mateus@techview.com', role: UserRole.ADMIN },
  { id: 'seller-1', name: 'João Vendedor', username: 'joao_tech', email: 'joao@techview.com', role: UserRole.SELLER },
  { id: 'seller-2', name: 'Maria Vendas', username: 'maria_tech', email: 'maria@techview.com', role: UserRole.SELLER },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-tech font-bold text-white">Gestão de Equipe</h1>
          <p className="text-gray-400 mt-1">Cadastre e gerencie os níveis de acesso dos seus colaboradores.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-techBlue text-black font-bold shadow-glow hover:bg-techBlue-dark transition-all active:scale-95 self-start"
        >
          <UserPlus size={20} />
          Novo Colaborador
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="p-6 rounded-3xl glass border-white/5 relative group overflow-hidden transition-all hover:border-techBlue/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-techBlue/10 border border-techBlue/20 flex items-center justify-center text-techBlue font-bold text-xl group-hover:shadow-glow transition-all">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  user.role === UserRole.ADMIN ? 'bg-techBlue/10 text-techBlue border border-techBlue/20' : 'bg-gray-800 text-gray-400 border border-white/5'
                }`}>
                  {user.role === UserRole.ADMIN ? <Shield size={10} /> : <UserIcon size={10} />}
                  {user.role === UserRole.ADMIN ? 'Administrador' : 'Vendedor'}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-400 mb-6">
              <div className="flex justify-between">
                <span>Usuário:</span>
                <span className="text-white font-mono">{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="text-white">{user.email}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/5 transition-all text-gray-400">
                Editar
              </button>
              <button className="p-2 rounded-xl border border-red-500/10 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all">
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-2 h-2 rounded-full bg-techBlue animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
           <div className="w-full max-w-md glass p-8 rounded-[32px] border-techBlue/30 shadow-glow-lg">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-tech font-bold text-white">Novo Usuário</h2>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                   <XCircle size={24} />
                 </button>
              </div>
              
              <form className="space-y-5">
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-techBlue font-bold">Nome Completo</label>
                    <input type="text" placeholder="Ex: Lucas Silva" className="w-full px-5 py-4 rounded-xl bg-black/40 border border-techBlue/20 text-white focus:outline-none focus:border-techBlue" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-techBlue font-bold">Usuário</label>
                        <input type="text" placeholder="lucas_tech" className="w-full px-5 py-4 rounded-xl bg-black/40 border border-techBlue/20 text-white focus:outline-none focus:border-techBlue" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-techBlue font-bold">Cargo</label>
                        <select className="w-full px-5 py-4 rounded-xl bg-black/40 border border-techBlue/20 text-white focus:outline-none focus:border-techBlue">
                            <option value="SELLER">Vendedor</option>
                            <option value="ADMIN">Administrador</option>
                        </select>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-techBlue font-bold">Senha Inicial</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-4 rounded-xl bg-black/40 border border-techBlue/20 text-white focus:outline-none focus:border-techBlue" />
                 </div>

                 <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-5 rounded-2xl bg-techBlue text-black font-tech font-bold text-lg shadow-glow mt-4">
                    Criar Colaborador
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Users;
