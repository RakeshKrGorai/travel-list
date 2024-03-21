import { useState } from "react";
import "./index.css";
import { sort } from "semver";

type Item = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

function App() {
  const [items, setItems] = useState<Array<Item>>([]);

  function handleItems(item: Item) {
    setItems([...items, item]);
  }

  function deleteItems(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function ToggleItemPack(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={deleteItems}
        onToggleItem={ToggleItemPack}
      />
      <Stats item={items} />
    </div>
  );
}

function Logo() {
  return <h1>FAR AWAY</h1>;
}

function Form({ onAddItem }: { onAddItem: (Item: Item) => void }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!description) return;

    const Item = { description, quantity, packed: false, id: Date.now() };
    console.log(Item);

    onAddItem(Item);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
}: {
  items: Array<Item>;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItem: Array<Item>;

  if (sortBy == "input") {
    sortedItem = items;
  }

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

function Stats({ item }: { item: Array<Item> }) {
  if (!item.length) {
    return (
      <p className="stats">
        <em>Add items to get started</em>
      </p>
    );
  }

  const numItems = item.length;
  const numPacked = item.filter((item) => item.packed).length;
  const numPercent = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {numItems === numPacked
          ? "You have everything packed & Ready to go"
          : `You have ${numItems} items on your list, and you have already packed
        ${numPacked} (${numPercent}%) of items`}
        )
      </em>
    </footer>
  );
}

export default App;
