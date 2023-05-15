import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import './styles.css';

const apiUrl = 'https://kitsu.io/api/edge/';

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
        info.data && (
          <ul className='animes-list'>
            {info.data.map((anime) => (
              <li key={anime.id}>
                <img 
                  src={anime.attributes.posterImage.small} 
                  alt={anime.attributes.canonicalTitle}
                />
                {anime.attributes.canonicalTitle}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
