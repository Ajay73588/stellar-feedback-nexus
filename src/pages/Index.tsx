
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StarBackground from '@/components/StarBackground';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

const Index = () => {
  const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <StarBackground />
      <Navbar userType={isAuthenticated ? userRole : 'guest'} onLogout={logout} />

      <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="w-full max-w-4xl text-center">
          <div className="relative mb-8 animate-float">
            <div className="absolute inset-0 rounded-full bg-purple-glow blur-xl"></div>
            <h1 className="relative text-5xl md:text-7xl font-bold text-gradient-purple mb-4">
              Stellar Feedback
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            A universe of reviews. Connect businesses with customers through 
            star-powered feedback that guides the galaxy of commerce.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Customer Card */}
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-white">For Customers</h2>
              <p className="text-white/80 mb-6">
                Discover products, share your experiences, and help others navigate their purchasing decisions.
              </p>
              <Link to={isAuthenticated && userRole === 'customer' ? "/products" : "/register?role=customer"}>
                <Button className="w-full flex items-center justify-center">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Company Card */}
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-white">For Companies</h2>
              <p className="text-white/80 mb-6">
                Showcase your products, gather valuable feedback, and build your reputation in the marketplace.
              </p>
              <Link to={isAuthenticated && userRole === 'company' ? "/dashboard" : "/register?role=company"}>
                <Button className="w-full flex items-center justify-center">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Admin Card */}
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-white">For Admins</h2>
              <p className="text-white/80 mb-6">
                Oversee the platform, manage users and content, and ensure the ecosystem remains trustworthy.
              </p>
              <Link to={isAuthenticated && userRole === 'admin' ? "/admin" : "/login?role=admin"}>
                <Button className="w-full flex items-center justify-center">
                  <span>Admin Login</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="glass-card p-8 rounded-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-white">Why Choose Stellar Feedback?</h2>
            <ul className="text-left space-y-3 mb-6">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-space-purple/20 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-2 w-2 rounded-full bg-space-purple"></div>
                </div>
                <span className="text-white/80">Intuitive platform for leaving and managing reviews</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-space-purple/20 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-2 w-2 rounded-full bg-space-purple"></div>
                </div>
                <span className="text-white/80">Transparent feedback system with star ratings</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-space-purple/20 flex items-center justify-center mt-0.5 mr-3">
                  <div className="h-2 w-2 rounded-full bg-space-purple"></div>
                </div>
                <span className="text-white/80">Connect businesses with real customer experiences</span>
              </li>
            </ul>
            
            <div className="text-center">
              <Link to="/about">
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="glass-card mt-auto py-6">
        <div className="container mx-auto px-4 text-center text-white/70">
          <p>© 2025 Stellar Feedback. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
