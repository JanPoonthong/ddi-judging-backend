import NextCors from "nextjs-cors";
import prisma from "../../../lib/prisma";

// import fs from "fs";

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

    const oldHistory = await prisma.history.findUnique({
        where: { teamName },
    });

    try {
        await prisma.history.update({
            where: { teamName },
            data: {
                totalAmount: updatedTotalAmount,
                log:
                    oldHistory.history +
                    "," +
                    findJudge.loginID +
                    " " +
                    action +
                    " " +
                    "500000",
                numberOfTransaction: oldHistory.numberOfTransaction + 1,
            },
        });

        // fs.appendFileSync("logs.txt", `${oldHistory.numberOfTransaction + 1} ${oldHistory.history},${findJudge.loginID} ${action} 500000 \n`)

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
                                history:
                                    teamToUpdate.history +
                                    "," +
                                    findJudge.loginID +
                                    " " +
                                    action +
                                    " " +
                                    "500000",
                            },
                        },
                    ],
                },
            },
            include: {
                teamList: true,
            },
        });

        res.status(200).send({ success: true, judge: judge });
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, error: error });
    }
}
