import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    // 1️⃣ Get all client profiles
    const { data: profiles, error: profileError } =
      await supabaseAdmin
        .from('profiles')
        .select('user, full_name')
        .eq('role', 'client');

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    const userIds = profiles.map((p) => p.user);

    // 2️⃣ Get companies for those users
    const { data: companies, error: companyError } =
      await supabaseAdmin
        .from('companies')
        .select('id, company_name, created_at, user')
        .in('user', userIds)
        .order('created_at', { ascending: false });

    if (companyError) {
      return NextResponse.json(
        { error: companyError.message },
        { status: 500 }
      );
    }

    // 3️⃣ Map user → full name
    const nameMap: Record<string, string> = {};
    profiles.forEach((p) => {
      nameMap[p.user] = p.full_name ?? '—';
    });

    return NextResponse.json({
      companies,
      profiles: nameMap,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
