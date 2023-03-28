import NextCors from "nextjs-cors";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    await NextCors(req, res, {
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200,
    });

    const id = req.query.id;

    try {
        const judge = await prisma.judge.findUnique({
            where: { id },
            include: {
                teamList: true,
            },
        });

        res.status(200).send({ success: true, judge: judge });
    } catch (error) {
        console.error(error);
        res.status(400).status({ success: false, error: error });
    }
}
