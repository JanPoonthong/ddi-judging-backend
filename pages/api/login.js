import { judgeList } from "./judgeList";
import NextCors from "nextjs-cors";
import prisma from "../../lib/prisma";

export default async function login(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    let id = req.body.id;
    let password = req.body.password;
    let username = req.body.username;

    let judge;

    await prisma.judge.findUnique({
        where: { loginID: id },
        include: {
            teamList: true,
        },
    });

    try {
        judge = await prisma.judge.update({
            where: { loginID: id },
            data: {
                name: username,
            },
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: "No id found on database" });
    }

    if (judge) {
        if (judge.loginID === id && judge.password === password) {
            res.json({
                success: true,
                message: "Authenticate Success",
                judge: judge,
            });
        } else {
            res.json({ success: false, error: "Wrong credential" });
        }
    } else {
        res.json({ success: false, error: "No id found on database" });
    }
}
