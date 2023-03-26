import { judgeList } from "./judgeList";

export default function login(req, res) {
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
