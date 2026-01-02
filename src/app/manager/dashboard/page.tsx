'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Company = {
  id: number;
  company_name: string;
  created_at: string;
  user: string;
};

export default function ManagerDashboard() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [profiles, setProfiles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [researchLoading, setResearchLoading] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/manager/companies');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch companies');
      }

      setCompanies(data.companies || []);
      setProfiles(data.profiles || {});
    } catch (err) {
      console.error('Dashboard error:', err);
    }

    setLoading(false);
  };

  const startResearch = async (companyId: number) => {
    setResearchLoading((prev) => ({
      ...prev,
      [companyId]: true,
    }));

    try {
      const res = await fetch(
        `/api/manager/companies/${companyId}/start-research`,
        {
          method: 'POST',
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to start research');
      }

      // Optional: toast / console log
      console.log('Research started for company', companyId);
    } catch (err) {
      console.error('Research error:', err);
    } finally {
      setResearchLoading((prev) => ({
        ...prev,
        [companyId]: false,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="relative z-50 bg-black text-yellow-400 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Manager Portal</h1>

        <Link href="/manager/clients/new">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-300">
            + Add Client
          </button>
        </Link>
      </header>

      {/* Content */}
      <main className="p-6 max-w-7xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Client Companies</h2>

        <div className="bg-white rounded-lg shadow border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Client Name</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-right">Update</th>
                <th className="px-4 py-3 text-right">Research</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((company) => {
                const isResearching =
                  researchLoading[company.id] === true;

                return (
                  <tr
                    key={company.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {company.company_name}
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {profiles[company.user] || '—'}
                    </td>

                    <td className="px-4 py-3 text-gray-500">
                      {new Date(
                        company.created_at
                      ).toLocaleDateString()}
                    </td>

                    {/* Update Context */}
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/manager/companies/${company.id}/edit`}
                      >
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-sm font-medium text-yellow-400 hover:bg-gray-900"
                        >
                          Update Context
                        </button>
                      </Link>
                    </td>

                    {/* Start Research */}
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        disabled={isResearching}
                        onClick={() =>
                          startResearch(company.id)
                        }
                        className="inline-flex items-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-medium text-black hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isResearching
                          ? 'Starting…'
                          : 'Start Research'}
                      </button>
                    </td>
                  </tr>
                );
              })}

              {!loading && companies.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No client companies found
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-400"
                  >
                    Loading companies…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
