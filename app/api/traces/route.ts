import { NextResponse } from 'next/server';
import { MOCK_TRACES_LIST } from '@/lib/mock-traces-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const hasIndexedFilter = [
    'trace_id', 
    'employee_id', 
    'username', 
    'source_system', 
    'overall_status', 
    'event_type'
  ].some(filter => searchParams.has(filter));

  if (!hasIndexedFilter) {
    return NextResponse.json({
      message: "At least one indexed filter is required: trace_id, employee_id, username, source_system+source_event_id, overall_status, event_type"
    }, { status: 400 });
  }

  const overallStatus = searchParams.get('overall_status');
  let filteredItems = MOCK_TRACES_LIST;

  if (overallStatus) {
    filteredItems = MOCK_TRACES_LIST.filter(trace => trace.overall_status === overallStatus);
  }

  // Handle other filters if needed, but for now we follow the user example
  
  return NextResponse.json({
    items: filteredItems,
    next_token: null,
    count: filteredItems.length
  });
}
