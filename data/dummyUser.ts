import { User } from '@/types/auth';

export const DUMMY_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    password: 'admin123'
  },
  {
    id: '2',
    email: 'customer@example.com',
    name: 'John Customer',
    role: 'customer',
    password: 'customer123'
  },
  {
    id: '3',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'customer',
    password: 'jane123'
  }
];