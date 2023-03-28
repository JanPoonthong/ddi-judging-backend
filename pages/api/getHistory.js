import prisma from "../../lib/prisma";
import NextCors from "nextjs-cors";

export default async function handle(req, res) {
    await NextCors(req, res, {
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200,
    });

    try {
        const history = await prisma.history.findMany({
        });
        return res.send({success: true, message: history})
    } catch (error) {
        return res.send({ success: false, error: error})
    }

}
