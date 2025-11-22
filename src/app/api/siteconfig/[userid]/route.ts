import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/config/siteConfig';

// GET - Fetch single employee
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ userid: string }> }
) {
    try {
        const params = await context.params;
        console.log(params)
        if (!siteConfig) {
            return NextResponse.json(
                { success: false, error: 'config not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: siteConfig
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}