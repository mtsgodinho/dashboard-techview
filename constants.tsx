
import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users as UsersIcon, 
  Calendar, 
  Zap,
  ShieldAlert
} from 'lucide-react';
import { UserRole } from './types';

export const COLORS = {
  primary: '#00C8FF',
  secondary: '#0B1C2D',
  background: '#000000',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
};

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Painel', icon: <LayoutDashboard size={20} />, roles: [UserRole.ADMIN, UserRole.SELLER] },
  { id: 'sales', label: 'Vendas', icon: <ShoppingCart size={20} />, roles: [UserRole.ADMIN, UserRole.SELLER] },
  { id: 'subscriptions', label: 'Assinaturas', icon: <Calendar size={20} />, roles: [UserRole.ADMIN, UserRole.SELLER] },
  { id: 'plans', label: 'Planos', icon: <Zap size={20} />, roles: [UserRole.ADMIN] },
  { id: 'customers', label: 'Clientes', icon: <UsersIcon size={20} />, roles: [UserRole.ADMIN, UserRole.SELLER] },
  { id: 'users', label: 'Usuários', icon: <ShieldAlert size={20} />, roles: [UserRole.ADMIN] },
];

export const MOCK_PLANS = [
  { id: '1', name: 'Iniciante', price: 49.90, duration_days: 30, active: true },
  { id: '2', name: 'Profissional', price: 99.90, duration_days: 90, active: true },
  { id: '3', name: 'Enterprise', price: 299.90, duration_days: 365, active: true },
];
