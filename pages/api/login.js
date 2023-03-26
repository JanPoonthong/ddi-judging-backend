import { judgeList } from "./judgeList";
import NextCors from "nextjs-cors";

export default async function login(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    let name = req.body.username;
    let password = req.body.password;
    const judge = judgeList.find(function (element) {
        return element.username === name && element.password === password;
    });

    if (judge) {
        res.json({
            success: true,
            message: "Authenticate Success",
            judge: judge,
        });
    } else {
        res.json({ success: false, error: "Wrong credential" });
    }
}
