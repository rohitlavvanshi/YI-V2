import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      full_name,
      email,
      password,
      company_name,
      company_context,
    } = body;

    if (
      !email ||
      !password ||
      !company_name ||
      !company_context
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1️⃣ Create auth user
    const { data: user, error: userError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (userError || !user.user) {
      return NextResponse.json(
        { error: userError?.message || 'User creation failed' },
        { status: 400 }
      );
    }

    const userId = user.user.id;

    // 2️⃣ Insert profile (client role)
    const { error: profileError } =
      await supabaseAdmin.from('profiles').insert({
        user: userId,
        role: 'client',
        full_name,
      });

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 400 }
      );
    }

    // 3️⃣ Insert company (NO industry)
    const { error: companyError } =
      await supabaseAdmin.from('companies').insert({
        company_name,
        company_context,
        user: userId,
      });

    if (companyError) {
      return NextResponse.json(
        { error: companyError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
