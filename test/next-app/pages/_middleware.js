/**
 * Copyright IBM Corp. 2020, 2023
 * SPDX-License-Identifier: MPL-2.0
 */

import { NextResponse } from 'next/server'

// This empty middleware helps to ensure middleware support
export async function middleware() {
  return NextResponse.next()
}
