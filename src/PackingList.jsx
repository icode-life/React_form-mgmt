import { useState } from "react";
import Item from "./Items";

const PackingList = ({items, onDeleteItem, onToggleItem, onClear}) => {
  /**state and derived state creation */
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  /**logic for sorting the packing list based on criterion in select elem */
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") {
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  /**Rendering of the component */
  return <div className="list">
    <ul>
      {sortedItems.map(item => <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id}/>)}
    </ul>
    <div className="actions">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value='input'>sort by input order</option>
        <option value='description'>sort by description order</option>
        <option value='packed'>sort by packed status</option>
      </select>
      <button onClick={onClear}>Clear list</button>
    </div>
  </div>
};

export default PackingList;