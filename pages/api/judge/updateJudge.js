import NextCors from "nextjs-cors";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    await NextCors(req, res, {
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200,
    });

    const name = req.body.name;
    const teamName = req.body.teamList.teamName;
    const investmentAmount = req.body.teamList.investmentAmount;
    const action = req.body.action;

    const id = req.body.id;

    let findJudge;

    try {
        findJudge = await prisma.judge.findUnique({
            where: { id: id },
            include: {
                teamList: true,
            },
        });
    } catch (error) {
        res.send({ success: false, error: "Can't find user" });
    }

    const teamToUpdate = findJudge.teamList.find(
        (team) => team.teamName === teamName
    );

    if (!teamToUpdate) {
        throw new Error(`Team ${teamName} not found in judge's teamList`);
    }

    let updatedTotalAmount;
    if (action === "plus") {
        updatedTotalAmount = teamToUpdate.totalAmount + investmentAmount;
    } else {
        updatedTotalAmount = teamToUpdate.totalAmount - investmentAmount;
    }

    try {
        const judge = await prisma.judge.update({
            where: { id },
            data: {
                name: name,
                totalBank:
                    action === "plus"
                        ? findJudge.totalBank - investmentAmount
                        : findJudge.totalBank + investmentAmount,
                teamList: {
                    update: [
                        {
                            where: { teamName },
                            data: {
                                teamName: teamName,
                                investmentAmount: investmentAmount,
                                totalAmount: updatedTotalAmount,
                            },
                        },
                    ],
                },
            },
            include: {
                teamList: true,
            },
        });

        res.send({ success: true, judge: judge });
    } catch (error) {
        console.log(error);
        res.send({ success: false, error: error });
    }
}
