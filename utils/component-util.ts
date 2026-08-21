interface LeaderboardEntry {
  userId: string
  name: string
  totalScore: number
}

export function getPodiumOrder(top3: LeaderboardEntry[]) {
  const withRank = top3.map((user, i) => ({ ...user, rank: i + 1 }))

  if (withRank.length === 3) {
    const [first, second, third] = withRank
    return [third, first, second]
  }

  return withRank
}
