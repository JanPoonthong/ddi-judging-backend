import prisma from "../../lib/prisma";
import NextCors from "nextjs-cors";

export default async function handle(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    console.log("HELLO", req.body)

    try {
        const judge = await prisma.judge.findUnique({
            where: {
                id: req.body.id
            },
            include: {
                teamList: true,
            },
        });

        // let teams = await prisma.judge.findMany({
        //     orderBy: {
        //         teamsList: "desc",
        //     },
        // });
        res.json({ team: judge});
    } catch (error) {
        console.log(error)
        res.json({ error: error });
    }
}
