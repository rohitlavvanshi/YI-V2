import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * GET company context + drivers
 */
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIX
  const companyId = Number(id);

  if (!companyId) {
    return NextResponse.json(
      { error: 'Invalid company ID' },
      { status: 400 }
    );
  }

  // 1️⃣ Fetch company
  const { data: company, error: companyError } =
    await supabaseAdmin
      .from('companies')
      .select('id, company_context')
      .eq('id', companyId)
      .single();

  if (companyError) {
    return NextResponse.json(
      { error: companyError.message },
      { status: 500 }
    );
  }

  // 2️⃣ Fetch drivers
  const { data: drivers, error: driversError } =
    await supabaseAdmin
      .from('drivers')
      .select('id, driver')
      .eq('company_id', companyId);

  if (driversError) {
    return NextResponse.json(
      { error: driversError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    company,
    drivers,
  });
}

/**
 * UPDATE company context + drivers
 */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIX
    const companyId = Number(id);
    const { company_context, drivers } = await req.json();

    if (!companyId) {
      return NextResponse.json(
        { error: 'Invalid company ID' },
        { status: 400 }
      );
    }

    // 1️⃣ Update company context
    const { error: companyError } =
      await supabaseAdmin
        .from('companies')
        .update({
          company_context: company_context || '',
        })
        .eq('id', companyId);

    if (companyError) {
      throw new Error(companyError.message);
    }

    // 2️⃣ Delete existing drivers
    const { error: deleteError } =
      await supabaseAdmin
        .from('drivers')
        .delete()
        .eq('company_id', companyId);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    // 3️⃣ Insert new drivers
    if (Array.isArray(drivers) && drivers.length > 0) {
      const insertPayload = drivers
        .filter((d: any) => d.driver?.trim())
        .map((d: any) => ({
          company_id: companyId,
          driver: d.driver,
        }));

      if (insertPayload.length > 0) {
        const { error: insertError } =
          await supabaseAdmin
            .from('drivers')
            .insert(insertPayload);

        if (insertError) {
          throw new Error(insertError.message);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to update company' },
      { status: 500 }
    );
  }
}
