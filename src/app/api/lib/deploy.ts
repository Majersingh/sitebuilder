export default async function triggerCircleCIDeploy(userId: string) {
    const CIRCLECI_TOKEN = process.env.CIRCLECI_TOKEN!;
    const PROJECT_SLUG = "gh/Majersingh/staticwebsitegenerator";

    const url = `https://circleci.com/api/v2/project/${PROJECT_SLUG}/pipeline`;

    const payload = {
        branch: "main",
        parameters: {
            user_id: userId, // <- dynamic userId
        },
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Circle-Token": CIRCLECI_TOKEN,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
}