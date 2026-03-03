export const isVotingClosed = (votingEndsAt) => {
  if (!votingEndsAt) return false;
  const endDate =
    typeof votingEndsAt.toDate === "function"
      ? votingEndsAt.toDate()
      : votingEndsAt;
  return new Date() > endDate;
};
