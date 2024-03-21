import { useState } from "react";
import "./index.css";

import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function ClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={deleteItems}
        onToggleItem={ToggleItemPack}
        onClearList={ClearList}
      />
      <Stats item={items} />
    </div>
  );
}

export default App;
