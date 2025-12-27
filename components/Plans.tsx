
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, DollarSign, Clock, Layout } from 'lucide-react';
import { Plan } from '../types';
import { MOCK_PLANS } from '../constants';
import AstronautMascot from './AstronautMascot';

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>(MOCK_PLANS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const handleToggleStatus = (id: string) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const handleDeletePlan = (id: string) => {
    if (confirm('Tem certeza que deseja desintegrar este plano da base de dados?')) {
      setPlans(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em um cenário real, aqui haveria a integração com Supabase
    // Por ora, apenas fechamos o modal para simular o sucesso
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-tech font-bold text-white">Engenharia de Planos</h1>
          <p className="text-gray-400 mt-1">Configure seus tiers de produtos e estruturas de preço.</p>
        </div>
        <button 
          onClick={() => { setEditingPlan(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-techBlue text-black font-bold shadow-glow hover:bg-techBlue-dark transition-all active:scale-95 self-start"
        >
          <Plus size={20} />
          Criar Novo Plano
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className={`p-8 rounded-3xl glass relative overflow-hidden transition-all duration-500 hover:border-techBlue/50 border-white/5 ${!plan.active ? 'grayscale opacity-70' : ''}`}>
             <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-xl ${plan.active ? 'bg-techBlue/10 text-techBlue' : 'bg-gray-800 text-gray-500'}`}>
                  <Layout size={24} />
                </div>
                <button 
                  onClick={() => handleToggleStatus(plan.id)}
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                    plan.active 
                    ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' 
                    : 'border-red-500/30 text-red-400 bg-red-500/10'
                  }`}
                >
                  {plan.active ? 'Ativo' : 'Inativo'}
                </button>
             </div>

             <h3 className="text-2xl font-tech font-bold text-white mb-2">{plan.name}</h3>
             <div className="flex items-baseline gap-1 mb-6">
               <span className="text-4xl font-bold font-tech text-techBlue">R$ {plan.price.toFixed(2)}</span>
               <span className="text-xs text-gray-400">/ ciclo</span>
             </div>

             <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Clock size={16} className="text-techBlue" />
                  <span>Duração: {plan.duration_days} dias</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Sync de Integração Cloud</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Suporte Técnico 24/7</span>
                </div>
             </div>

             <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                <button 
                  onClick={() => { setEditingPlan(plan); setIsModalOpen(true); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass border-techBlue/20 text-sm font-bold text-techBlue hover:bg-techBlue/5 transition-all"
                >
                  <Edit2 size={14} />
                  Configurar
                </button>
                <button 
                  onClick={() => handleDeletePlan(plan.id)}
                  className="p-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                  title="Excluir Plano"
                >
                  <Trash2 size={18} />
                </button>
             </div>
             
             {/* Decoração sutil de fundo */}
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-techBlue/5 rounded-full blur-2xl" />
          </div>
        ))}
        
        {/* Placeholder para "Adicionar" */}
        <button 
          onClick={() => { setEditingPlan(null); setIsModalOpen(true); }}
          className="p-8 rounded-3xl border-2 border-dashed border-techBlue/10 bg-white/5 flex flex-col items-center justify-center text-gray-500 hover:text-techBlue hover:bg-techBlue/5 hover:border-techBlue/30 transition-all group min-h-[400px]"
        >
          <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <span className="font-tech font-bold uppercase tracking-widest text-xs">Inicializar Novo Protótipo</span>
        </button>
      </div>

      {/* Modal de Plano */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
           <div className="w-full max-w-md glass p-8 rounded-[32px] border-techBlue/30 shadow-glow-lg animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-tech font-bold text-white">{editingPlan ? 'Editar Configuração' : 'Design de Novo Plano'}</h2>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                   <XCircle size={24} />
                 </button>
              </div>
              
              <form onSubmit={handleAddOrEdit} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-techBlue font-bold">Nome do Plano</label>
                    <input 
                      type="text" 
                      defaultValue={editingPlan?.name}
                      placeholder="ex: Explorador Galáctico" 
                      className="w-full px-5 py-4 rounded-xl bg-black/40 border border-techBlue/20 text-white focus:outline-none focus:border-techBlue transition-colors font-medium"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-techBlue font-bold">Preço (BRL)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-techBlue/50" size={16} />
                        <input 
                          type="number" 
                          defaultValue={editingPlan?.price}
                          placeholder="0,00" 
                          className="w-full pl-10 pr-5 py-4 rounded-xl bg-black/40 border border-techBlue/20 text-white focus:outline-none focus:border-techBlue transition-colors font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-techBlue font-bold">Ciclo (Dias)</label>
                      <input 
                        type="number" 
                        defaultValue={editingPlan?.duration_days}
                        placeholder="30" 
                        className="w-full px-5 py-4 rounded-xl bg-black/40 border border-techBlue/20 text-white focus:outline-none focus:border-techBlue transition-colors font-medium"
                      />
                    </div>
                 </div>

                 <div className="flex items-center gap-3 p-4 rounded-xl bg-techBlue/5 border border-techBlue/10">
                    <CheckCircle2 className="text-techBlue" size={20} />
                    <span className="text-xs text-gray-300">Todas as configurações são aplicadas instantaneamente à rede satelital.</span>
                 </div>

                 <button type="submit" className="w-full py-5 rounded-2xl bg-techBlue text-black font-tech font-bold text-lg shadow-glow hover:bg-techBlue-dark transition-all active:scale-[0.98]">
                    {editingPlan ? 'Salvar Ajustes' : 'Inicializar Plano'}
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
