import { useEffect, useState } from 'react';

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/companies')
      .then(res => res.json())
      .then(data => {
        setCompanies(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-space-gradient text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-300">Companies</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company: any) => (
            <div key={company.id} className="bg-space-dark/80 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-purple-200 mb-2">{company.name}</h3>
              <p className="text-sm text-gray-300">{company.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 