import { NextRequest, NextResponse } from "next/server";
import { getUserConfig, saveUserConfig } from "../../lib/crudmongodb";
import deploy from "../../lib/deploy";
import { pipeline } from "stream";

// GET → Fetch config
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ userid: string }> }
) {
    try {
        const { userid } = await context.params;

        const result = await getUserConfig(userid);

        if (!result) {
            return NextResponse.json({
                success: false,
                error: "Configuration not found",
            });
        }

        return NextResponse.json({
            success: true,
            data: result.config,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// POST → Save or update config
export async function POST(
    req: NextRequest,
    context: { params: Promise<{ userid: string }> }
) {
    try {
        const { userid } = await context.params;
        const body = await req.json();

        if (!body) {
            return NextResponse.json(
                { success: false, error: "Missing config data" },
                { status: 400 }
            );
        }

        await saveUserConfig(userid, body);
        const deployResponse = await deploy(userid)
        console.log("Deplyment response is ", deployResponse, userid);

        return NextResponse.json({
            success: true,
            pipeline: deployResponse,
            message: "Config updated successfully",
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
