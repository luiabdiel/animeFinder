import { useEffect, useState } from 'react';
import SearchInput from './components/SearchInput';
import AnimesList from './components/AnimesList';
import './styles.css';

const apiUrl = 'https://kitsu.io/api/edge/';
const debounceDelay = 300; // Intervalo de atraso em milissegundos

interface IAnimeData {
  data: {
    id: string;
    attributes: {
      canonicalTitle: string;
      posterImage: {
        small: string;
      };
    };
  }[];
}

export default function App() {
  const [info, setInfo] = useState<IAnimeData>({ data: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('');

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (value) {
        setIsLoading(true);
        fetch(`${apiUrl}anime?filter[text]=${value}&page[limit]=12`)
          .then((response) => response.json())
          .then((response) => {
            setInfo(response);
            setIsLoading(false)
          })
          .catch((error) => {
            console.log('Error fetching data:', error);
            setIsLoading(false);
          })
      }
    }, debounceDelay);

    return () => clearTimeout(delayTimer);
  }, [value]);

  return (
    <div className='App'>
      <h1>Animes</h1>
      <SearchInput 
        value={value}
        onChange={(search) => setValue(search)}
      />
      {isLoading ? (
        <p>Carregando...</p>
      ): (
        info.data && info.data.length > 0 ? (
          <AnimesList animes={info.data} />
        ): (
          <p>Nenhum anime encontrado.</p>
        )
      )}
    </div>
  );
}
