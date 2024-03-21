import { useState } from "react";
import "./index.css";

import Logo from "./Pages/Logo";
import Form from "./Pages/Form";
import PackingList from "./Pages/PackingList";
import Stats from "./Pages/Stats";

import { Item } from "./type";

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
