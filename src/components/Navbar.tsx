
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface NavbarProps {
  userType: 'guest' | 'customer' | 'company' | 'admin' | null;
  onLogout?: () => void;
}

const Navbar = ({ userType, onLogout = () => {} }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  // Navigation links based on user type
  const getNavLinks = () => {
    switch (userType) {
      case 'customer':
        return [
          { to: "/companies", label: "Companies" },
          { to: "/products", label: "Products" },
          { to: "/my-feedback", label: "My Feedback" },
          { to: "/profile", label: "Profile" },
        ];
      case 'company':
        return [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/products", label: "Products" },
          { to: "/feedback", label: "Feedback" },
          { to: "/profile", label: "Profile" },
        ];
      case 'admin':
        return [
          { to: "/admin", label: "Dashboard" },
          { to: "/admin/users", label: "Users" },
          { to: "/admin/companies", label: "Companies" },
          { to: "/admin/products", label: "Products" },
          { to: "/admin/feedback", label: "Feedback" },
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="glass-card sticky top-0 z-50 w-full py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gradient-purple">
          Stellar Feedback
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {userType !== 'guest' && userType !== null && (
            <div className="flex space-x-6">
              {getNavLinks().map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-4">
            {userType === 'guest' || userType === null ? (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Register</span>
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card mt-2 rounded-md overflow-hidden animate-in slide-in-from-top">
          <div className="flex flex-col p-4 space-y-3">
            {userType !== 'guest' && userType !== null && (
              <>
                {getNavLinks().map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-white/80 hover:text-white py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-2" />
              </>
            )}

            {userType === 'guest' || userType === null ? (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full flex items-center justify-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Register</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                variant="destructive"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
