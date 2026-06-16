'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Lock, LogIn, Eye, EyeOff, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, user } = useAuthStore(); 
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const success = login(email, password);
    
    if (success) {
      if (user?.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };


  const fillDemoCredentials = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      setEmail('admin@example.com');
      setPassword('admin123');
    } else {
      setEmail('customer@example.com');
      setPassword('customer123');
    }
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 dark:border">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-9"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive text-center">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Signing in...
                </div>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </CardContent>
        </form>
        
        <CardFooter className="flex flex-col space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Demo Accounts
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fillDemoCredentials('admin')}
              disabled={isLoading}
              className="hover:bg-primary/5"
            >
              <ShieldCheck className="mr-2 h-3 w-3" />
              Admin Demo
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fillDemoCredentials('customer')}
              disabled={isLoading}
              className="hover:bg-primary/5"
            >
              <UserCheck className="mr-2 h-3 w-3" />
              Customer Demo
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            Demo credentials are for testing purposes only
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}