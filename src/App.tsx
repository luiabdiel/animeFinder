import { useState } from 'react';
import SearchInput from './SearchInput';
import './styles.css';

export default function App() {
  const [value, setValue] = useState('');
  console.log(value);

  return (
    <div className='App'>
      <h1>Animes</h1>
      <SearchInput 
        value={value}
        onChange={(search) => setValue(search)}
      />
    </div>
  );
}
