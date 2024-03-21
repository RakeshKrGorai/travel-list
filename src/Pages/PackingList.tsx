import { useState } from "react";
import { Item } from "../type";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}: {
  items: Array<Item>;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onClearList: () => void;
}) {
  const [sortBy, setSortBy] = useState("input");

  // let sortedItem: Array<Item>;
  let sortedItem = items;

  // if (sortBy == "input") {
  //   sortedItem = items;
  // }

  if (sortBy == "description") {
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy == "packed") {
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItem.map((item: Item) => (
          <Items
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Set By Input Order</option>
          <option value="description">Set By Description Order</option>
          <option value="packed">Set By Packed Order</option>
        </select>
        <button onClick={onClearList}>Clear</button>
      </div>
    </div>
  );
}

function Items({
  item,
  onDeleteItem,
  onToggleItem,
}: {
  item: Item;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
