import { teamList } from "@/lib/teamList";
import prisma from "../../lib/prisma";

function generatePassword() {
    return Math.random().toString(36).slice(-6);
}

export default async function handle(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const judgeNumber = req.body.judgeNumber;

    if (username !== "admin" && password !== "ADMINJAN123") {
        return res.status(400).json({
            success: false,
            error: "Wrong admin username and password",
        });
    }

    if (judgeNumber === undefined || judgeNumber === null) {
        return res.status(400).json({
            success: false,
            error: "Need number of judge to create",
        });
    }

    try {
        await prisma.judge.deleteMany();
        await prisma.history.deleteMany();
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Can't delete judge and history in DB",
        });
    }

    let isErrorJudge;
    let isErrorHistory;

    for (let i = 0; i < teamList.length; i++) {
        try {
            await prisma.history.create({
                data: {
                    teamName: teamList[i],
                },
            });
            isErrorHistory = false;
        } catch (error) {
            isErrorHistory = true;
        }
    }

    if (isErrorHistory) {
        return res
            .status(400)
            .json({ success: false, error: "Reset history error" });
    }

    for (let i = 1; i < judgeNumber + 1; i++) {
        try {
            await prisma.judge.create({
                data: {
                    loginID: `DDI Judge ${i}`,
                    password: generatePassword(),
                    name: "",
                    teamList: {
                        create: [
                            {
                                teamName: "Jelly Bob",
                            },
                            {
                                teamName: "Fizzle",
                            },
                            {
                                teamName: "Blizz",
                            },
                            {
                                teamName: "Kripz",
                            },
                            {
                                teamName: "Zeri",
                            },
                            {
                                teamName: "Profries",
                            },
                            {
                                teamName: "Haly Bake",
                            },
                            {
                                teamName: "Fragante",
                            },
                            {
                                teamName: "K'otton",
                            },
                            {
                                teamName: "Day One",
                            },
                            {
                                teamName: "Locomto",
                            },
                            {
                                teamName: "Let's Plant",
                            },
                            {
                                teamName: "GottaGO",
                            },
                            {
                                teamName: "Harn",
                            },
                            {
                                teamName: "Athena",
                            },
                            {
                                teamName: "Tagme",
                            },
                            {
                                teamName: "R-ROI",
                            },
                            {
                                teamName: "Indicat",
                            },
                            {
                                teamName: "Yeobo",
                            },
                            {
                                teamName: "Frescas",
                            },
                            {
                                teamName: "Giadina",
                            },
                            {
                                teamName: "CoGrow",
                            },
                            {
                                teamName: "Wastic",
                            },
                        ],
                    },
                },
                include: {
                    teamList: true,
                },
            });
            isErrorJudge = false;
        } catch (error) {
            isErrorJudge = true;
        }
    }
    if (isErrorJudge) {
        return res
            .status(400)
            .json({ success: false, error: "Reset user error" });
    }

    return res.status(200).json({ success: true, error: "Reset successfully" });
}
