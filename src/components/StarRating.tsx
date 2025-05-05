
import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  initialRating?: number;
  editable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (rating: number) => void;
}

const StarRating = ({
  initialRating = 0,
  editable = false,
  size = 'md',
  onChange,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index: number) => {
    if (!editable) return;
    const newRating = index + 1;
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  const sizesMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconSize = sizesMap[size];

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const starFilled = (hoverRating || rating) > index;
        
        return (
          <span
            key={index}
            className={cn(
              "cursor-default transition-all duration-150",
              editable && "cursor-pointer hover:scale-110"
            )}
            onClick={() => handleClick(index)}
            onMouseEnter={() => editable && setHoverRating(index + 1)}
            onMouseLeave={() => editable && setHoverRating(0)}
          >
            <Star
              className={cn(
                iconSize,
                starFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-500",
                editable && !starFilled && "hover:text-yellow-200"
              )}
            />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
