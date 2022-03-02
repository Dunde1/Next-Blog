// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSearchData } from '../../../utils/useNotion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.get_key !== process.env.GET_KEY) {
    res.status(403).json({ reason: 'wrong key' });
    return;
  }

  if (!req.query.filters) {
    res.status(400).json({ reason: 'wrong data' });
    return;
  }

  try {
    const parsingFilters = JSON.parse(req.query.filters as string);
    const parsingCursor = req.query.cursor && JSON.parse(req.query.cursor as string);

    const result = await getSearchData(parsingFilters, parsingCursor);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ reason: 'wrong data' });
  }
}
