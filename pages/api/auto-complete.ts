import type { NextApiRequest, NextApiResponse } from 'next';
import makePostsInfo from '../../utils/makePostsInfo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.key !== process.env.POST_INFO_KEY) {
    res.status(404).redirect('/');
    return;
  }

  try {
    const result = await makePostsInfo();
    res.status(200).json({ result: result ? 'success' : 'fail' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ reason: 'error' });
  }
}
