import { NextResponse } from 'next/server';
import { MOCK_TRACE_RAW } from '@/lib/mock-traces-data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Returning mock data for any requested ID for demo visualization
  const response = {
    ...MOCK_TRACE_RAW,
    trace_id: id
  };

  return NextResponse.json(response);
}
