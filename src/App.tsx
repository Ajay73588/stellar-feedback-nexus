
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Customer Pages
import CustomerLogin from "./pages/customer/Login";
import CustomerRegister from "./pages/customer/Register";
import CustomerProducts from "./pages/customer/products";
import CustomerCompanies from "./pages/customer/companies";
import CustomerFeedback from "./pages/customer/feedback";
import CustomerMyFeedbacks from "./pages/customer/my-feedbacks";

// Company Pages
import CompanyLogin from "./pages/company/Login";
import CompanyRegister from "./pages/company/Register";
import CompanyDashboard from "./pages/company/dashboard";
import CompanyFeedbacks from "./pages/company/feedbacks";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

// Protected route wrapper
const ProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: JSX.Element, 
  allowedRoles: ('customer' | 'company' | 'admin')[] 
}) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated || !userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Customer Routes */}
      <Route path="/customer/login" element={<CustomerLogin />} />
      <Route path="/customer/register" element={<CustomerRegister />} />
      <Route path="/customer/products" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerProducts />
        </ProtectedRoute>
      } />
      <Route path="/customer/companies" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerCompanies />
        </ProtectedRoute>
      } />
      <Route path="/customer/feedback/:productId" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerFeedback />
        </ProtectedRoute>
      } />
      <Route path="/customer/my-feedbacks" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerMyFeedbacks />
        </ProtectedRoute>
      } />
      
      {/* Company Routes */}
      <Route path="/company/login" element={<CompanyLogin />} />
      <Route path="/company/register" element={<CompanyRegister />} />
      <Route path="/company/dashboard" element={
        <ProtectedRoute allowedRoles={['company']}>
          <CompanyDashboard />
        </ProtectedRoute>
      } />
      <Route path="/company/feedbacks/:productId" element={
        <ProtectedRoute allowedRoles={['company']}>
          <CompanyFeedbacks />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
