
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, Users, Calendar, AlertCircle, ArrowUpRight, ArrowDownRight, EyeOff } from 'lucide-react';
import AstronautMascot from './AstronautMascot';
import { User, UserRole } from '../types';

const REVENUE_DATA = [
  { day: '01', revenue: 4500 },
  { day: '05', revenue: 5200 },
  { day: '10', revenue: 4800 },
  { day: '15', revenue: 7100 },
  { day: '20', revenue: 6500 },
  { day: '25', revenue: 8900 },
  { day: '30', revenue: 9500 },
];

const PLAN_DATA = [
  { name: 'Iniciante', sales: 120, color: '#00C8FF' },
  { name: 'Profissional', sales: 250, color: '#0AAFFF' },
  { name: 'Enterprise', sales: 80, color: '#10B981' },
];

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const isAdmin = user.role === UserRole.ADMIN;

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Header */}
      <section className="relative overflow-hidden p-8 rounded-3xl glass border-techBlue/20 flex flex-col lg:flex-row items-center justify-between gap-8 group">
        <div className="relative z-10 flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-techBlue/10 border border-techBlue/20 text-techBlue text-[10px] font-bold uppercase tracking-widest">
            Status do Sistema: Nominal
          </div>
          <h1 className="text-4xl lg:text-5xl font-tech font-bold text-white tracking-tight">
            Olá, <span className="neon-text">{user.name.split(' ')[0]}</span>.
          </h1>
          <p className="text-gray-400 max-w-lg leading-relaxed">
            Sistemas em pleno funcionamento. {isAdmin ? 'O faturamento global cresceu ' : 'Suas vendas cresceram '} <span className="text-techBlue font-bold">+12%</span> esta semana.
          </p>
          <div className="flex gap-4 pt-4">
             <button className="px-6 py-3 rounded-xl bg-techBlue text-black font-bold flex items-center gap-2 hover:bg-techBlue-dark transition-all shadow-glow active:scale-95">
               Novo Relatório
               <TrendingUp size={18} />
             </button>
             <button className="px-6 py-3 rounded-xl glass border-techBlue/30 text-white font-medium hover:bg-white/5 transition-all">
               Logs do Sistema
             </button>
          </div>
        </div>
        <div className="relative lg:w-1/3 flex justify-center lg:justify-end">
          <AstronautMascot size="lg" className="transform group-hover:scale-105 transition-transform duration-700" />
        </div>
      </section>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Faturamento do Mês', value: isAdmin ? 'R$ 45.890' : 'R$ 12.450', change: '+12.5%', icon: <TrendingUp className="text-techBlue" />, trend: 'up' },
          { label: 'Assinaturas Ativas', value: isAdmin ? '1.240' : '245', change: '+8.2%', icon: <Users className="text-techBlue" />, trend: 'up' },
          { label: 'Vencendo Hoje', value: isAdmin ? '12' : '3', change: '-2', icon: <Calendar className="text-yellow-400" />, trend: 'down' },
          { label: 'Vencidas', value: isAdmin ? '08' : '02', change: '+1', icon: <AlertCircle className="text-red-500" />, trend: 'up' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl glass hover:border-techBlue/40 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-techBlue/10 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
            <h3 className="text-3xl font-tech font-bold mt-1 text-white group-hover:neon-text transition-all tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 rounded-3xl glass space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-tech font-bold text-white">Fluxo de Faturamento</h3>
            <select className="bg-black/40 border border-techBlue/20 text-xs rounded-lg px-3 py-1 text-gray-300 focus:outline-none focus:border-techBlue">
              <option>Últimos 30 Dias</option>
              <option>Últimos 3 Meses</option>
              <option>Este Ano</option>
            </select>
          </div>
          {isAdmin ? (
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                    <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00C8FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00C8FF" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="day" stroke="#ffffff30" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip 
                    contentStyle={{ backgroundColor: '#071420', border: '1px solid #00C8FF33', borderRadius: '12px' }}
                    itemStyle={{ color: '#00C8FF', fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ color: '#999', fontSize: '10px' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#00C8FF" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
                </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] w-full flex flex-col items-center justify-center bg-black/20 rounded-2xl border border-dashed border-white/5">
                <EyeOff size={48} className="text-gray-700 mb-4" />
                <p className="text-gray-500 font-tech uppercase text-xs tracking-widest">Gráficos Globais Restritos</p>
            </div>
          )}
        </div>

        <div className="p-8 rounded-3xl glass flex flex-col">
          <h3 className="text-xl font-tech font-bold text-white mb-8">Impacto por Plano</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PLAN_DATA}>
                <XAxis dataKey="name" hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#071420', border: '1px solid #00C8FF33', borderRadius: '12px' }}
                />
                <Bar dataKey="sales" radius={[10, 10, 10, 10]} barSize={40}>
                  {PLAN_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
