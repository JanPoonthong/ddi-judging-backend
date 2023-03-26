import NextCors from "nextjs-cors";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    await NextCors(req, res, {
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200,
    });

    const name = req.body.name;
    const id = req.query.id;

    try {
        const judge = await prisma.judge.update({
            where: { id },
            data: { name: name},
        });

        res.send({success: true, judge: judge})
    } catch (error) {
        console.error(error);
        res.status({success: false, error: error})
    }
}
