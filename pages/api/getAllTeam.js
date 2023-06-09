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
        const judge = await prisma.judge.findUnique({
            where: {
                id: req.body.id,
            },
            include: {
                teamList: true,
            },
        });

        res.status(200).json({ team: judge });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
}
