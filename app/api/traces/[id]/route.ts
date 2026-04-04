import { NextResponse } from 'next/server';
import { MOCK_TRACE_DETAIL } from '@/lib/mock-traces-data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Return mock data for all IDs for demo purposes, 
  // patching the trace_id/header to match the requested ID
  const response = {
    ...MOCK_TRACE_DETAIL,
    trace_id: id,
    header: {
      ...MOCK_TRACE_DETAIL.header,
      trace_id: id
    }
  };

  return NextResponse.json(response);
}
