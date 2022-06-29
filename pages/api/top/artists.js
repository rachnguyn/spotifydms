import {getTopArtists} from '../../../lib/spotify';
import {getSession} from 'next-auth/react';

const handler = async (req, res) => {
    const {
      token: {accessToken},
    } = await getSession({req});
    const response = await getTopArtists(accessToken);
    const {items} = await response.json();
  
    const artists = items.slice(0, 10).map((x) => ({
        name: x.name,
        popularity: x.popularity,
        image: x.images[0].url,
        genre: x.genres[0]
      }));

    return res.status(200).json({artists});
  };
  
  export default handler;