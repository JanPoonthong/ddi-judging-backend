import prisma from "../../lib/prisma";
import NextCors from "nextjs-cors";
import plusTotalAmount from "@/lib/plusTotalAmount";

export default async function handle(req, res) {
    await NextCors(req, res, {
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200,
    });

    try {
        const judge = await prisma.judge.findMany({
            include: {
                teamList: true,
            },
        });

        const teamTotals = {};

        for (const teamDict of judge) {
            for (const team of teamDict.teamList) {
                const teamName = team.teamName;
                const investmentAmount = team.investmentAmount;
                if (!(teamName in teamTotals)) {
                    teamTotals[teamName] = investmentAmount;
                } else {
                    teamTotals[teamName] += investmentAmount;
                }
            }
        }

        const transformedArray = Object.keys(teamTotals).map((key) => {
            return {
                name: key,
                amount: teamTotals[key],
            };
        });

        res.json({ team: transformedArray });
    } catch (error) {
        console.log(error);
        res.json({ error: error });
    }
}
