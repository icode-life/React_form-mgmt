import { useState } from "react";

/*this array was used for example at first, before the app was able to manage ne entries from the interface*/
  const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 1, packed: true },
];

function App() {
  /* state lifted up from form component bc it is rendered in a siblig component: packing list */
  const [items, setItems] = useState([]);

  /*here is the logic that updates the array items. It is here as it touches several sibling components*/
  /* the form is responsible for updating the array tho, so we nned to give the Form access to this function via the props */
  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems(items => items.filter(item => item.id !== id));
  };

  const handleToggleItem = (id) =>{
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  };

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} /> {/**the way the prop i snamed is based on a convention */}
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  );
}

export default App;

const Logo = () => {
  return <h1>🏝️ Far Away 🧳</h1>;
};
const Form = ({onAddItems}) => {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = {description, quantity, packed: false, id: Date.now()};

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  };

  return  (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({length: 20}, (_, i) => i+1).map(num => <option value={num} key={num}>{num}</option>)}
      </select>
      <input type="text" placeholder="item to be added..." value={description} onChange={(e) => setDescription(e.target.value)}></input>
      <button>Add</button>
    </form>
  )
};

const PackingList = ({items, onDeleteItem, onToggleItem}) => {
  return <div className="list">
    <ul>
      {items.map(item => <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id}/>)}
    </ul>
  </div>
};

const Item = ({item, onDeleteItem, onToggleItem}) => {
  return (
     <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
        <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.quantity} {item.description}</span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
    )
};

const Stats = ({items}) => {
  const numItems = items.length; /**derived state */
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems)*100);
  return (
  <footer className="stats">
    <em>
      {percentage === 100 ? "you've got everything ready!" : 
      `You have {numItems} items on your list, and you already placked {numPacked} ({percentage}%)`}
    </em>
  </footer>)
};