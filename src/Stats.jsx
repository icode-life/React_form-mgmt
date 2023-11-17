const Stats = ({items}) => {
  const numItems = items.length; /**derived state */
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems)*100);
  return (
  <footer className="stats">
    <em>
      {percentage === 100 ? "you've got everything ready!" : 
      `You have ${numItems} items on your list, and you already placked ${numPacked} (${percentage}%)`}
    </em>
  </footer>)
};

export default Stats;