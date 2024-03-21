import { useState } from "react";

type Item = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

export default function Form({
  onAddItem,
}: {
  onAddItem: (Item: Item) => void;
}) {
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
