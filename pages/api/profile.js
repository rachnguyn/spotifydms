import {getUserProfile} from '../../lib/spotify';
import {getSession} from 'next-auth/react';

const handler = async (req, res) => {
  const {
    token: {accessToken},
  } = await getSession({req});
  const response = await getUserProfile(accessToken);
  const profile = await response.json();

  return res.status(200).json(profile);
};

export default handler;