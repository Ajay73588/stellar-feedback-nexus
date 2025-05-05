
import { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Company {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  companyId: string;
  companyName: string;
}

export interface Feedback {
  id: string;
  customerId: string;
  customerName: string;
  productId: string;
  productName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
}

interface DataContextType {
  companies: Company[];
  products: Product[];
  feedback: Feedback[];
  customers: Customer[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<boolean>;
  addFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt'>) => Promise<Feedback>;
  deleteFeedback: (id: string) => Promise<boolean>;
  getCompanyProducts: (companyId: string) => Product[];
  getProductFeedback: (productId: string) => Feedback[];
  getCustomerFeedback: (customerId: string) => Feedback[];
  getProduct: (productId: string) => Product | undefined;
  getCompany: (companyId: string) => Company | undefined;
  getCustomer: (customerId: string) => Customer | undefined;
  getAverageRating: (productId: string) => number;
}

// Mock data
const MOCK_COMPANIES: Company[] = [
  { id: '1', name: 'Samsung', email: 'contact@samsung.com' },
  { id: '2', name: 'Apple', email: 'contact@apple.com' },
  { id: '3', name: 'OnePlus', email: 'contact@oneplus.com' },
];

const MOCK_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Galaxy S24 Ultra', 
    description: 'Top-of-the-line smartphone with advanced AI features and a stunning camera system.', 
    companyId: '1',
    companyName: 'Samsung'
  },
  { 
    id: '2', 
    name: 'iPhone 15 Pro', 
    description: 'Premium smartphone with A17 Pro chip, titanium design, and professional camera capabilities.', 
    companyId: '2',
    companyName: 'Apple'
  },
  { 
    id: '3', 
    name: 'OnePlus 12R', 
    description: 'High-performance smartphone with Snapdragon processor, superfast charging, and flagship features at a competitive price.', 
    companyId: '3',
    companyName: 'OnePlus'
  },
];

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

const MOCK_FEEDBACK: Feedback[] = [
  { 
    id: '1', 
    customerId: '1', 
    customerName: 'John Doe',
    productId: '1', 
    productName: 'Galaxy S24 Ultra',
    rating: 4, 
    reviewText: 'Great phone, amazing camera quality. Battery life could be better.', 
    createdAt: '2025-04-15T10:30:00Z' 
  },
  { 
    id: '2', 
    customerId: '2', 
    customerName: 'Jane Smith',
    productId: '1', 
    productName: 'Galaxy S24 Ultra',
    rating: 5, 
    reviewText: 'Best phone I have ever owned. The AI features are game-changing.', 
    createdAt: '2025-04-18T15:45:00Z' 
  },
  { 
    id: '3', 
    customerId: '1', 
    customerName: 'John Doe',
    productId: '2', 
    productName: 'iPhone 15 Pro',
    rating: 4, 
    reviewText: 'Excellent build quality and performance. iOS is super smooth.', 
    createdAt: '2025-04-20T09:15:00Z' 
  },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [feedback, setFeedback] = useState<Feedback[]>(MOCK_FEEDBACK);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);

  // Product operations
  const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newProduct = {
      ...product,
      id: (products.length + 1).toString(),
    };
    
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedProducts = products.map(product => 
      product.id === id ? { ...product, ...updates } : product
    );
    
    setProducts(updatedProducts);
    const updatedProduct = updatedProducts.find(p => p.id === id);
    
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    
    return updatedProduct;
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setProducts(prev => prev.filter(product => product.id !== id));
    // Also delete all feedback for this product
    setFeedback(prev => prev.filter(f => f.productId !== id));
    
    return true;
  };

  // Feedback operations
  const addFeedback = async (feedbackData: Omit<Feedback, 'id' | 'createdAt'>): Promise<Feedback> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newFeedback = {
      ...feedbackData,
      id: (feedback.length + 1).toString(),
      createdAt: new Date().toISOString(),
    };
    
    setFeedback(prev => [...prev, newFeedback]);
    return newFeedback;
  };

  const deleteFeedback = async (id: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFeedback(prev => prev.filter(f => f.id !== id));
    return true;
  };

  // Helper functions
  const getCompanyProducts = (companyId: string): Product[] => {
    return products.filter(product => product.companyId === companyId);
  };

  const getProductFeedback = (productId: string): Feedback[] => {
    return feedback.filter(f => f.productId === productId);
  };

  const getCustomerFeedback = (customerId: string): Feedback[] => {
    return feedback.filter(f => f.customerId === customerId);
  };

  const getProduct = (productId: string): Product | undefined => {
    return products.find(p => p.id === productId);
  };

  const getCompany = (companyId: string): Company | undefined => {
    return companies.find(c => c.id === companyId);
  };

  const getCustomer = (customerId: string): Customer | undefined => {
    return customers.find(c => c.id === customerId);
  };

  // Calculate average rating for a product
  const getAverageRating = (productId: string): number => {
    const productFeedback = getProductFeedback(productId);
    if (productFeedback.length === 0) return 0;
    
    const sum = productFeedback.reduce((acc, f) => acc + f.rating, 0);
    return Math.round((sum / productFeedback.length) * 10) / 10;
  };

  return (
    <DataContext.Provider
      value={{
        companies,
        products,
        feedback,
        customers,
        addProduct,
        updateProduct,
        deleteProduct,
        addFeedback,
        deleteFeedback,
        getCompanyProducts,
        getProductFeedback,
        getCustomerFeedback,
        getProduct,
        getCompany,
        getCustomer,
        getAverageRating,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
