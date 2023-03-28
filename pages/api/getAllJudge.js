import prisma from "../../lib/prisma";
import NextCors from "nextjs-cors";
import plusTotalAmount from "@/lib/plusTotalAmount";

export default async function handle(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        const judge = await prisma.judge.findMany({
            include: {
                teamList: true,
            },
        });

        let updatedTotalJudge = plusTotalAmount(judge);

        res.status(200).json({ team: updatedTotalJudge });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
}
