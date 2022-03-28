import { NextResponse } from 'next/server'

// This empty middleware helps to ensure middleware support
export async function middleware() {
  return NextResponse.next()
}
