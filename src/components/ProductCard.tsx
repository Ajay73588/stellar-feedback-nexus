
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StarRating from '@/components/StarRating';
import { Product } from '@/context/DataContext';
import { useData } from '@/context/DataContext';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
  showActions?: boolean;
}

const ProductCard = ({ 
  product, 
  variant = 'default',
  showActions = true
}: ProductCardProps) => {
  const { getAverageRating, getProductFeedback } = useData();
  const [isHovered, setIsHovered] = useState(false);
  
  const averageRating = getAverageRating(product.id);
  const feedbackCount = getProductFeedback(product.id).length;

  return (
    <Card 
      className={`glass-card transition-all duration-300 ${isHovered ? 'transform scale-[1.02]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className={variant === 'compact' ? 'pb-2' : 'pb-4'}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white">
              {product.name}
            </CardTitle>
            <CardDescription className="text-white/70">
              {product.companyName}
            </CardDescription>
          </div>
          <div className="flex items-center">
            <StarRating initialRating={averageRating} size="sm" />
            <span className="text-white/70 text-sm ml-2">
              ({averageRating})
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={variant === 'compact' ? 'pb-2' : 'pb-4'}>
        <p className="text-white/80 line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      
      {showActions && (
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-white/70" />
            <span className="text-sm text-white/70">
              {feedbackCount} {feedbackCount === 1 ? 'review' : 'reviews'}
            </span>
          </div>
          
          <Link to={`/products/${product.id}`}>
            <Button 
              variant="outline" 
              size="sm" 
              className={`transition-all duration-300 ${isHovered ? 'bg-space-purple text-white border-space-purple' : ''}`}
            >
              <span>View Details</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
