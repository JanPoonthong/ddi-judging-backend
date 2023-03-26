const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const teamData = [
    {
        name: "Jelly Bob",
        amount: 0,
    },
    {
        name: "Fizzle",
        amount: 0,
    },
    {
        name: "Blizz",
        amount: 0,
    },
    {
        name: "Kripz",
        amount: 0,
    },
    {
        name: "Zeri",
        amount: 0,
    },
    {
        name: "Profries",
        amount: 0,
    },
    {
        name: "Haly Bake",
        amount: 0,
    },
    {
        name: "Fragante",
        amount: 0,
    },
    {
        name: "K'otton",
        amount: 0,
    },
    {
        name: "Day One",
        amount: 0,
    },
    {
        name: "Locomto",
        amount: 0,
    },
    {
        name: "Let's Plant",
        amount: 0,
    },
    {
        name: "GottaGO",
        amount: 0,
    },
    {
        name: "Harn",
        amount: 0,
    },
    {
        name: "Athena",
        amount: 0,
    },
    {
        name: "Tagme",
        amount: 0,
    },
    {
        name: "R-ROI",
        amount: 0,
    },
    {
        name: "Indicat",
        amount: 0,
    },
    {
        name: "Yeobo",
        amount: 0,
    },
    {
        name: "Frescas",
        amount: 0,
    },
    {
        name: "Giadina",
        amount: 0,
    },
    {
        name: "CoGrow",
        amount: 0,
    },
    {
        name: "Wastic",
        amount: 0,
    },
];

const judgeInvestment = [
    {
        name: "Jelly Bob",
        amount: 0,
    },
    {
        name: "Fizzle",
        amount: 0,
    },
    {
        name: "Blizz",
        amount: 0,
    },
    {
        name: "Kripz",
        amount: 0,
    },
    {
        name: "Zeri",
        amount: 0,
    },
    {
        name: "Profries",
        amount: 0,
    },
    {
        name: "Haly Bake",
        amount: 0,
    },
    {
        name: "Fragante",
        amount: 0,
    },
    {
        name: "K'otton",
        amount: 0,
    },
    {
        name: "Day One",
        amount: 0,
    },
    {
        name: "Locomto",
        amount: 0,
    },
    {
        name: "Let's Plant",
        amount: 0,
    },
    {
        name: "GottaGO",
        amount: 0,
    },
    {
        name: "Harn",
        amount: 0,
    },
    {
        name: "Athena",
        amount: 0,
    },
    {
        name: "Tagme",
        amount: 0,
    },
    {
        name: "R-ROI",
        amount: 0,
    },
    {
        name: "Indicat",
        amount: 0,
    },
    {
        name: "Yeobo",
        amount: 0,
    },
    {
        name: "Frescas",
        amount: 0,
    },
    {
        name: "Giadina",
        amount: 0,
    },
    {
        name: "CoGrow",
        amount: 0,
    },
    {
        name: "Wastic",
        amount: 0,
    },
]

async function main() {
    console.log("Start seeding ...");
    for (const t of teamData) {
        const team = await prisma.team.create({
            data: t,
        });

        console.log(`Created user with id: ${team.id}`);
    }
    console.log("Seeding finished");
}


// async function main() {
//     console.log("Start seeding ...");
//     for (const t of judgeInvestment) {
//         const team = await prisma.judge.create({
//             data: t,
//         });

//         console.log(`Created user with id: ${team.id}`);
//     }
//     console.log("Seeding finished");
// }

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
