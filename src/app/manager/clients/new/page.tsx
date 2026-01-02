'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddClientPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyContext, setCompanyContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/manager/create-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          company_name: companyName,
          company_context: companyContext,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create client');
      }

      router.push('/manager/dashboard');
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="w-full max-w-xl bg-white rounded-lg shadow border p-6">
        <h1 className="text-xl font-semibold mb-6">
          Add New Client
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Client Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <input
            required
            type="email"
            placeholder="Client Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <input
            required
            type="password"
            placeholder="Temporary Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <input
            required
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            required
            placeholder="Company Context (description, notes, scope, etc.)"
            value={companyContext}
            onChange={(e) => setCompanyContext(e.target.value)}
            rows={4}
            className="w-full border rounded px-3 py-2"
          />

          <button
            disabled={loading}
            className="bg-black text-yellow-400 px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Creating Client…' : 'Create Client'}
          </button>
        </form>
      </div>
    </div>
  );
}
