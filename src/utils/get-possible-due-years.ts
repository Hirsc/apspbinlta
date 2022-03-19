

export function getPossibleDueYears(): number[] {
    const currentYear = new Date().getFullYear()

    const futureYears = []

    for (const i of [...Array(10).keys()]) {
        futureYears.unshift(currentYear + i + 1)
    }


    return [
        ...futureYears,
        currentYear,
        currentYear - 1,
        currentYear - 2,
        currentYear - 3,
    ]
}
