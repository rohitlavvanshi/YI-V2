'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1️⃣ Login
    const { data, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !data.user) {
      setError(authError?.message || 'Login failed');
      setLoading(false);
      return;
    }

    console.log('AUTH USER ID:', data.user.id);

    // 2️⃣ Fetch profile SAFELY
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('user', data.user.id)
      .maybeSingle();

    console.log('PROFILE:', profile);
    console.log('PROFILE ERROR:', profileError);

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    if (!profile?.role) {
      setError(
        'User profile exists but role is not readable (RLS or ID mismatch)'
      );
      setLoading(false);
      return;
    }

    // 3️⃣ Redirect by role
    if (profile.role === 'manager') {
      router.push('/manager/dashboard');
    } else if (profile.role === 'client') {
      router.push('/client/dashboard');
    } else {
      setError('Invalid role value');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            Sign in to your account
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            Enter your credentials to continue
          </p>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
