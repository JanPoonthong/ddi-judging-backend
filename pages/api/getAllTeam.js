import prisma from "../../lib/prisma";
import NextCors from "nextjs-cors";

export default async function handle(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        let teams = await prisma.team.findMany({
            orderBy: {
                amount: "desc",
            },
        });
        res.json({ team: teams });
    } catch (error) {
        res.json({ error: error });
    }
}
