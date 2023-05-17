import '../../styles.css';

interface IAnimeList {
  id: string;
  attributes: {
    canonicalTitle: string;
    posterImage: {
      small: string;
    };
  };
}

interface IAnimeListProps {
  animes: IAnimeList[]
}

export default function AnimesList({ animes }: IAnimeListProps) {
  return (
    <ul className='animes-list'>
      {animes.map((anime) => (
        <li key={anime.id}>
          <img 
            src={anime.attributes.posterImage.small} 
            alt={anime.attributes.canonicalTitle}
          />
          {anime.attributes.canonicalTitle}
        </li>
      ))}
    </ul>
  );
}