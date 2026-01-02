import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { startCompanyResearch } from '@/lib/research/startCompanyResearch';

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const companyId = Number(id);

    if (!companyId) {
      return NextResponse.json(
        { error: 'Invalid company ID' },
        { status: 400 }
      );
    }

    /* --------------------------------------------------
       1️⃣ Fetch company context
    -------------------------------------------------- */
    const { data: company, error: companyError } =
      await supabaseAdmin
        .from('companies')
        .select('company_context')
        .eq('id', companyId)
        .single();

    if (companyError || !company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    if (!company.company_context) {
      return NextResponse.json(
        { error: 'Company context is missing' },
        { status: 400 }
      );
    }

    /* --------------------------------------------------
       2️⃣ Fetch drivers (ID + NAME)
    -------------------------------------------------- */
    const { data: drivers, error: driversError } =
      await supabaseAdmin
        .from('drivers')
        .select('id, driver')
        .eq('company_id', companyId);

    if (driversError || !drivers || drivers.length === 0) {
      return NextResponse.json(
        { error: 'No drivers found for company' },
        { status: 400 }
      );
    }

    /* --------------------------------------------------
       3️⃣ Start research (CORRECT SHAPE)
    -------------------------------------------------- */
    await startCompanyResearch({
      companyId,
      companyContext: company.company_context,
      metric: 'Revenue Growth',
      drivers: drivers.map((d) => ({
        id: d.id,
        name: d.driver,
      })),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Start research failed:', err);

    return NextResponse.json(
      { error: err.message || 'Failed to start research' },
      { status: 500 }
    );
  }
}
