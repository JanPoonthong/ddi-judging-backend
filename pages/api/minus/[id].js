import socket from "@/lib/socket";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const id  = req.query.id;
    const { amount } = req.body;

    let teams;

    let socketList = socket()

    try {
        const teamData = await prisma.team.findUnique({
            where: { id },
        });

        if (teamData.amount === 0 || amount < 0) {
            return res.json({
                error: "Minus is zero, can't go lower than zero",
            });
        }

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
            socketList[i].emit({ teams: teams });
        }

        res.json({
            success: true, team: post
        });
    } catch (error) {
        res.json({
            success: false,
            error: `Team with ID ${id} does not exist in the database`,
        });
    }
};