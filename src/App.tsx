import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import './styles.css';

const apiUrl = 'https://kitsu.io/api/edge/';

export default function App() {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value) {
      fetch(`${apiUrl}anime?filter[text]=${value}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        });
    }
  }, [value]);

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
