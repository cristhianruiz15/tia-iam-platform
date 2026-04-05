import { NextResponse } from 'next/server';

const AWS_BASE_URL = 'https://rr6gt3o7kk.execute-api.us-east-1.amazonaws.com';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Forward search params to the AWS API
  const query = searchParams.toString();
  const url = `${AWS_BASE_URL}/traces?${query}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json(errorData, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying traces API:', error);
    return NextResponse.json({ error: 'Failed to fetch from AWS' }, { status: 500 });
  }
}
