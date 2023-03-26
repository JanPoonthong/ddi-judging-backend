import socket from "@/lib/socket";
import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";

export default async function handle(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const id = req.query.id;
    const { amount } = req.body;

    let teams;

    let socketList = socket();

    try {
        await prisma.team.findUnique({
            where: { id },
        });

        const updateAmount = amount;

        const post = await prisma.team.update({
            where: { id },
            data: { amount: updateAmount },
        });

        try {
            teams = await prisma.team.findMany({
                orderBy: {
                    amount: "desc",
                },
            });
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }

        for (let i = 0; i < socketList.length; i++) {
            socketList[i].emit("teams", { data: teams });
        }

        res.json({ success: true, team: post });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error,
        });
    }
}
