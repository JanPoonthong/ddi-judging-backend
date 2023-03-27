import NextCors from "nextjs-cors";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    await NextCors(req, res, {
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200,
    });

    const name = req.body.name;
    const loginID = req.body.loginID;
    const password = req.body.password;
    const teamName = req.body.teamList.teamName;
    console.log(teamName);
    const investmentAmount = req.body.teamList.investmentAmount;

    try {
        const judge = await prisma.judge.create({
            data: {
                name,
                loginID,
                password,

                teamList: {
                    create: [
                        {
                            teamName: teamName,
                            investmentAmount: investmentAmount,
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
        console.error(error);
        res.status({ success: false, error: error });
    }
}
