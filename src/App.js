import { useState } from "react";
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

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

  const clearList = () => {
    const confirmed = window.confirm("Are you sure you want to flush it all?");
    if (confirmed) setItems([]);
  };


  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} /> {/**the way the prop i snamed is based on a convention */}
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClear={clearList} />
      <Stats items={items} />
    </div>
  );
}

export default App;