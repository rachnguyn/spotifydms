const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';
const PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me';
const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=20&offset=0';
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;


const getAccessToken = async (refresh_token) => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });
  
    return response.json();
  };

export const getUserProfile = async (refresh_token) => {
    const {access_token} = await getAccessToken(refresh_token);
    return fetch(PROFILE_ENDPOINT, {
    headers: {
        Authorization: `Bearer ${access_token}`,
    },
    });
}

export const getUsersPlaylists = async (refresh_token) => {
    const {access_token} = await getAccessToken(refresh_token);
    return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
        Authorization: `Bearer ${access_token}`,
    },
    });
};

export const getTopArtists = async (refresh_token) => {
    const {access_token} = await getAccessToken(refresh_token);
    return fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
        Authorization: `Bearer ${access_token}`,
    },
    });
}

export const getTopTracks = async (refresh_token) => {
    const {access_token} = await getAccessToken(refresh_token);
    return fetch(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
  };