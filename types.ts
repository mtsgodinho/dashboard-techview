
export enum UserRole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  password?: string; // Em produção, nunca retorne a senha
}

export enum SubscriptionStatus {
  ACTIVE = 'ATIVA',
  EXPIRING_TODAY = 'VENCE_HOJE',
  EXPIRING_SOON = 'VENCE_LOGO',
  EXPIRED = 'VENCIDA'
}

export enum SaleStatus {
  PAID = 'PAGO',
  PENDING = 'PENDENTE',
  CANCELLED = 'CANCELADO'
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration_days: number;
  active: boolean;
  created_at?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  seller_id: string;
  created_at?: string;
}

export interface Sale {
  id: string;
  customer_id: string;
  customer_name: string;
  plan_id: string;
  plan_name: string;
  amount: number;
  payment_method: string;
  status: SaleStatus;
  seller_id: string;
  created_at: string;
}

export type ViewType = 'dashboard' | 'sales' | 'subscriptions' | 'plans' | 'customers' | 'users' | 'login';
