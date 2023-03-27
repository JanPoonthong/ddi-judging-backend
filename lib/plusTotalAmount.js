export default function plusTotalAmount(judge) {
    const teamTotals = {};

    for (const teamDict of judge) {
        for (const team of teamDict.teamList) {
            const teamName = team.teamName;
            const investmentAmount = team.investmentAmount;
            if (!(teamName in teamTotals)) {
                teamTotals[teamName] = investmentAmount;
            } else {
                teamTotals[teamName] += investmentAmount;
            }
        }
    }

    for (let teamDict of judge) {
        for (let team of teamDict.teamList) {
            if (teamTotals.hasOwnProperty(team.teamName)) {
                team.totalAmount = teamTotals[team.teamName];
            }
        }
    }
    return judge;
}
