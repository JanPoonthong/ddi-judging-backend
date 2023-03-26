import prisma from "../../lib/prisma";

export default async function handle(req, res) {
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
};