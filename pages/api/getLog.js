import prisma from "../../lib/prisma";
import NextCors from "nextjs-cors";

export default async function handle(req, res) {
    await NextCors(req, res, {
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200,
    });

    try {
        // const histories = await prisma.$queryRaw`SELECT * FROM History`;
        // const histories = await prisma.history.find({});
        const histories = await prisma.history.findMany({});
        // const histories = await prisma.history.findMany({
        //     select: {
        //         id: true,
        //         totalAmount: true,
        //         teamName: true,
        //         log: true,
        //         numberOfTransaction: true
        //     },
        // });
        res.status(200).json({ success: true, message: histories });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}
