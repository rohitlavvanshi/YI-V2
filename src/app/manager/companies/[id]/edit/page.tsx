'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Driver = {
  id?: number;
  driver: string;
};

export default function UpdateCompanyContextPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = params.id as string;

  const [companyContext, setCompanyContext] = useState('');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [newDriver, setNewDriver] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/manager/companies/${companyId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load company');
      }

      setCompanyContext(data.company?.company_context || '');
      setDrivers(data.drivers || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addDriver = () => {
    if (!newDriver.trim()) return;
    setDrivers((prev) => [...prev, { driver: newDriver }]);
    setNewDriver('');
  };

  const updateDriver = (index: number, value: string) => {
    setDrivers((prev) => {
      const updated = [...prev];
      updated[index].driver = value;
      return updated;
    });
  };

  const saveAll = async () => {
    if (saving) return;

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/manager/companies/${companyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_context: companyContext,
          drivers,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save changes');
      }

      // ✅ Redirect ONLY after confirmed success
      router.push('/manager/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading company…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow border p-6 space-y-6">
        <h1 className="text-xl font-semibold">
          Update Company Context
        </h1>

        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}

        {/* Company Context */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Company Context
          </label>
          <textarea
            value={companyContext}
            onChange={(e) => setCompanyContext(e.target.value)}
            rows={5}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        {/* Drivers */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Drivers
          </label>

          <div className="space-y-2">
            {drivers.map((d, i) => (
              <input
                key={i}
                value={d.driver}
                onChange={(e) => updateDriver(i, e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm"
              />
            ))}
          </div>

          {/* Add new driver */}
          <div className="flex gap-2 mt-3">
            <input
              value={newDriver}
              onChange={(e) => setNewDriver(e.target.value)}
              placeholder="Add new driver"
              className="flex-1 rounded border px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={addDriver}
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
            >
              Add
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => router.back()}
            disabled={saving}
            className="px-4 py-2 text-sm rounded border"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={saveAll}
            className="bg-black text-yellow-400 px-5 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
  