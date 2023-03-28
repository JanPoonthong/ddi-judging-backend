import prisma from "../../lib/prisma";
import NextCors from "nextjs-cors";

export default async function handle(req, res) {
    await NextCors(req, res, {
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200,
    });

    try {
        const history = await prisma.history.findMany({ });
        res.status(200).json({success: true, message: history})
    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, error: error.message})
    }
}
