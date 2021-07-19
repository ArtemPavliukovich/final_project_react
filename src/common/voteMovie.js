const getVotes = () => {
  return JSON.parse(localStorage.getItem('votes'));
};

export const isVoted = (id) => {
  const votes = getVotes();
  return votes ? !!votes.filter(vote => vote.id === id).length : false;
};

export const setVote = ({ id, value }) => {
  const votes = getVotes() ?? [];
  votes.push({ id, value });
  localStorage.setItem('votes', JSON.stringify(votes)); 
};

export const deleteVote = (id) => {
  const votes = getVotes();
  const newVotes = votes.filter(vote => vote.id !== id);
  localStorage.setItem('votes', JSON.stringify(newVotes));
};