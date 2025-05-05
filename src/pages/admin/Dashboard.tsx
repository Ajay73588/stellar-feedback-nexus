import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import StarRating from "@/components/StarRating";

interface Customer {
  id: number;
  name: string;
  email: string;
}

interface Company {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  Company: {
    name: string;
  };
}

interface Feedback {
  id: number;
  rating: number;
  review_text: string;
  Customer: {
    name: string;
  };
  Product: {
    name: string;
  };
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("customers");

  const { data: customers, isLoading: customersLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch customers");
      return response.json() as Promise<Customer[]>;
    },
  });

  const { data: companies, isLoading: companiesLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await fetch("/api/admin/companies");
      if (!response.ok) throw new Error("Failed to fetch companies");
      return response.json() as Promise<Company[]>;
    },
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/admin/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json() as Promise<Product[]>;
    },
  });

  const { 
    data: feedbacks, 
    isLoading: feedbacksLoading,
    refetch: refetchFeedbacks 
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const response = await fetch("/api/admin/feedbacks");
      if (!response.ok) throw new Error("Failed to fetch feedbacks");
      return response.json() as Promise<Feedback[]>;
    },
  });

  const handleDeleteFeedback = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/feedbacks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete feedback");
      }

      toast({
        title: "Success",
        description: "Feedback deleted successfully",
      });

      // Refetch feedbacks
      refetchFeedbacks();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete feedback",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="feedbacks">Feedbacks</TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <h2 className="text-2xl font-semibold mb-4">Customer List</h2>
          {customersLoading ? (
            <p>Loading customers...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers?.map((customer) => (
                <Card key={customer.id} className="bg-black/50 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle>{customer.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">Email: {customer.email}</p>
                    <p>ID: {customer.id}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="companies">
          <h2 className="text-2xl font-semibold mb-4">Company List</h2>
          {companiesLoading ? (
            <p>Loading companies...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies?.map((company) => (
                <Card key={company.id} className="bg-black/50 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle>{company.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">Email: {company.email}</p>
                    <p>ID: {company.id}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="products">
          <h2 className="text-2xl font-semibold mb-4">Product List</h2>
          {productsLoading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products?.map((product) => (
                <Card key={product.id} className="bg-black/50 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">Description: {product.description}</p>
                    <p className="mb-2">Company: {product.Company?.name}</p>
                    <p>ID: {product.id}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="feedbacks">
          <h2 className="text-2xl font-semibold mb-4">Feedback List</h2>
          {feedbacksLoading ? (
            <p>Loading feedbacks...</p>
          ) : (
            <div className="space-y-4">
              {feedbacks?.map((feedback) => (
                <Card key={feedback.id} className="bg-black/50 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>
                        {feedback.Product?.name} - by {feedback.Customer?.name}
                      </span>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteFeedback(feedback.id)}
                      >
                        Delete
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2">
                      <StarRating initialRating={feedback.rating} />
                    </div>
                    <p className="mb-4">{feedback.review_text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
