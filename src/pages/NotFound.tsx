
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

const NotFound = () => {
  const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <StarBackground />
      <Navbar userType={isAuthenticated ? userRole : 'guest'} onLogout={logout} />
      
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="relative mb-6 animate-float">
            <div className="absolute inset-0 rounded-full bg-purple-glow blur-xl"></div>
            <h1 className="relative text-8xl font-bold text-gradient-purple">404</h1>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-4">
            Lost in the cosmos
          </h2>
          
          <p className="text-white/70 mb-8">
            The stellar coordinates you're looking for don't exist in our galaxy. 
            Let's navigate back to a known star system.
          </p>
          
          <Link to="/">
            <Button className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Return to Home</span>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
