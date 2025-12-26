
import React, { useState } from 'react';
import { Search, Filter, Download, MoreHorizontal, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { SaleStatus, User, UserRole } from '../types';

const MOCK_SALES = [
  { id: '1', customer: 'Arthur Dent', plan: 'Enterprise', amount: 299.90, method: 'Cartão de Crédito', status: SaleStatus.PAID, date: '20.11.2023 14:30', seller_id: 'admin-1' },
  { id: '2', customer: 'Ford Prefect', plan: 'Pro', amount: 99.90, method: 'PIX', status: SaleStatus.PENDING, date: '21.11.2023 09:15', seller_id: 'seller-1' },
  { id: '3', customer: 'Trillian Astra', plan: 'Pro', amount: 99.90, method: 'Cartão de Crédito', status: SaleStatus.PAID, date: '21.11.2023 16:45', seller_id: 'seller-1' },
  { id: '4', customer: 'Marvin Android', plan: 'Iniciante', amount: 49.90, method: 'Boleto', status: SaleStatus.CANCELLED, date: '22.11.2023 11:00', seller_id: 'seller-2' },
  { id: '5', customer: 'Zaphod Beeblebrox', plan: 'Enterprise', amount: 299.90, method: 'PIX', status: SaleStatus.PAID, date: '22.11.2023 18:20', seller_id: 'admin-1' },
];

const Sales: React.FC<{ user: User }> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Se for vendedor, só vê as próprias vendas. Se admin, vê tudo.
  const filteredSales = MOCK_SALES.filter(sale => {
    const isOwner = user.role === UserRole.ADMIN || sale.seller_id === user.id;
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return isOwner && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-tech font-bold text-white">Registro de Transações</h1>
          <p className="text-gray-400 mt-1">Fluxo de dados em tempo real de todas as interações comerciais.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-techBlue transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Buscar telemetria..." 
                className="pl-12 pr-6 py-3 rounded-xl bg-deep-900 border border-techBlue/10 focus:outline-none focus:border-techBlue text-sm text-white w-full lg:w-72 transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="p-3 rounded-xl bg-techBlue/10 text-techBlue border border-techBlue/20 hover:bg-techBlue/20 transition-all">
             <Download size={20} />
           </button>
        </div>
      </div>

      <div className="rounded-[32px] overflow-hidden glass border-techBlue/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-techBlue/5 border-b border-techBlue/10">
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-techBlue">Entidade Cliente</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-techBlue">Plano Ativo</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-techBlue">Valor</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-techBlue">Status</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-techBlue">Data/Hora</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-techBlue">Vendedor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-techBlue/10 flex items-center justify-center font-bold text-techBlue border border-techBlue/20">
                          {sale.customer.charAt(0)}
                       </div>
                       <span className="font-medium text-gray-200 group-hover:text-techBlue transition-colors">{sale.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-tech font-bold uppercase">
                      {sale.plan}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-white">R$ {sale.amount.toFixed(2)}</div>
                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">{sale.method}</div>
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={sale.status} />
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-400 font-mono">
                    {sale.date}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-500 uppercase font-bold">
                        {sale.seller_id === 'admin-1' ? 'MATEUS' : 'VENDEDOR'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: SaleStatus }> = ({ status }) => {
  const configs = {
    [SaleStatus.PAID]: { icon: <CheckCircle2 size={12} />, label: 'Confirmado', styles: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    [SaleStatus.PENDING]: { icon: <Clock size={12} />, label: 'Processando', styles: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    [SaleStatus.CANCELLED]: { icon: <AlertCircle size={12} />, label: 'Abortado', styles: 'bg-red-500/10 text-red-400 border-red-500/20' },
  };

  const { icon, label, styles } = configs[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${styles}`}>
      {icon}
      {label}
    </span>
  );
};

export default Sales;
