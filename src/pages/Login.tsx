
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, User, Building, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StarBackground from '@/components/StarBackground';
import Navbar from '@/components/Navbar';
import { useAuth, UserRole } from '@/context/AuthContext';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Get role from URL params
  const queryParams = new URLSearchParams(location.search);
  const roleParam = queryParams.get('role') as UserRole | null;
  
  // Set default tab based on role param
  const [activeTab, setActiveTab] = useState<string>(
    roleParam === 'admin' ? 'admin' : 
    roleParam === 'company' ? 'company' : 'customer'
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Update tab when URL params change
  useEffect(() => {
    if (roleParam === 'admin' || roleParam === 'company' || roleParam === 'customer') {
      setActiveTab(roleParam);
    }
  }, [roleParam]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const role = activeTab as UserRole;
      const success = await login(values.email, values.password, role);
      
      if (success) {
        toast({
          title: 'Login successful!',
          description: 'Welcome back to Stellar Feedback.',
        });
        
        // Redirect based on role
        if (role === 'customer') {
          navigate('/products');
        } else if (role === 'company') {
          navigate('/dashboard');
        } else if (role === 'admin') {
          navigate('/admin');
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: 'Invalid email or password.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <StarBackground />
      <Navbar userType="guest" />
      
      <main className="flex-1 container mx-auto flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient-purple">Welcome Back</h1>
            <p className="text-white/70 mt-2">Sign in to your account</p>
          </div>

          <div className="glass-card rounded-xl p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="customer" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>Customer</span>
                </TabsTrigger>
                <TabsTrigger value="company" className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  <span>Company</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Admin</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="customer">
                <p className="text-sm text-white/70 mb-4">
                  Sign in as a customer to browse products and leave reviews.
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-white/70">
                    Don't have an account?{' '}
                    <Link to="/register?role=customer" className="text-space-purple hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="company">
                <p className="text-sm text-white/70 mb-4">
                  Sign in as a company to manage products and view customer feedback.
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your company email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-white/70">
                    Don't have a company account?{' '}
                    <Link to="/register?role=company" className="text-space-purple hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="admin">
                <p className="text-sm text-white/70 mb-4">
                  Admin access only. Sign in to manage the platform.
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter admin email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter admin password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-white/70">
                    Admin registration is not available.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-white/70 hover:text-white text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
