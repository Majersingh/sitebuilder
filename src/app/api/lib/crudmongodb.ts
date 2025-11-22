import clientPromise from "./mongodb";

export async function getUserConfig(userId: string) {
    const client = await clientPromise;
    const db = client.db("sitebuilder");

    return db.collection("configs").findOne({ userId });
}

export async function saveUserConfig(userId: string, config: any) {
    const client = await clientPromise;
    const db = client.db("sitebuilder");

    await db.collection("configs").updateOne(
        { userId },
        {
            $set: {
                userId,
                config,
                updatedAt: new Date(),
            },
        },
        { upsert: true }
    );

    return { success: true };
}
