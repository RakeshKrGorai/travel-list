type Item = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

export default function Stats({ item }: { item: Array<Item> }) {
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
