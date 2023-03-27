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

const judgeList = [
    {
        loginID: "34211",
        password: "aslkdj",
        name: "",
        teamList: {
            teamName: "",
        },
    },
    {
        loginID: "54238",
        password: "fsldkj",
        name: "",
        teamList: {
            teamName: "",
        },
    },
    {
        loginID: "93954",
        password: "klsdjn",
        name: "",
        teamList: {
            teamName: "",
        },
    },
    {
        loginID: "95302",
        password: "riwyo",
        name: "",
        teamList: {
            teamName: "",
        },
    },
    {
        loginID: "09282",
        password: "idskn",
        name: "",
        teamList: {
            teamName: "",
        },
    },
    {
        loginID: "84392",
        password: "aksmf",
        name: "",
        teamList: {
            teamName: "",
        },
    },
];

// async function main() {
//     console.log("Start seeding ...");
//     for (const t of teamData) {
//         const team = await prisma.team.create({
//             data: t,
//         });
//
//         console.log(`Created user with id: ${team.id}`);
//     }
//     console.log("Seeding finished");
// }

function generateID() {
    return (Math.floor(Math.random() * 100000) + 2000).toString();
}

function generatePassword() {
    return Math.random().toString(36).slice(-6);
}

const teamList = [
    "Athena",
    "Jelly Bob",
    "Fizzle",
    "Blizz",
    "Kripz",
    "Zeri",
    "Profries",
    "Haly Bake",
    "Fragante",
    "K'otton",
    "Day One",
    "Locomto",
    "Let's Plant",
    "GottaGO",
    "Harn",
    "Tagme",
    "R-ROI",
    "Indicat",
    "Yeobo",
    "Frescas",
    "Giadina",
    "CoGrow",
    "Wastic",
];

async function main() {
    console.log("Start seeding ...");
    const team = await prisma.judge.create({
        data: {
            loginID: generateID(),
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
    });

    console.log(`Created user with id: ${team.id}`);
}
console.log("Seeding finished");

// async function main() {
//     console.log("Start seeding ...");
//     for (const t of judgeList) {
//         const team = await prisma.judge.create({
//             data: {
//                 loginID: generateID(),
//                 password: generatePassword(),
//                 name: "",
//                 teamList: {
//                     create: [
//                         {
//                             teamName: "",
//                             investmentAmount: 0,
//                         },
//                     ],
//                 },
//             },
//         });

//         console.log(`Created user with id: ${team.id}`);
//     }
//     console.log("Seeding finished");
// }

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
