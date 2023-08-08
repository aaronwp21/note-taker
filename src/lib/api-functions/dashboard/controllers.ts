import { NextApiRequest, NextApiResponse } from 'next';

import {
  fetchDashboards,
  fetchDashboard,
  createDashboard,
  updateNotes,
  updateTags
} from '@/lib/api-functions/dashboard/queries';

export const getDashboard = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {

  const { userId } = req.query;

  try {
    let data = [];
    if (userId) {
      data = await fetchDashboard(userId);
    } else {
      data = await fetchDashboards();
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
}

export const addDashboard = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId } = req.body;

  try {
    const data = await createDashboard(userId);
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err)
  }
}

export const updateDbNotes = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId } = req.query;
  const { notesArr } = req.body;

  try {
    const data = await updateNotes(userId, notesArr);
    if (data.n === 0) return res.status(404).send({ message: 'Not Found' });
    return res.status(200).send({ data });
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
}

export const updateDbTags = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId } = req.query;
  const { tagsArr } = req.body;

  try {
    const data = await updateTags(userId, tagsArr);
    if (data.n === 0) return res.status(404).send({ message: 'Not Found' });
    return res.status(200).send({ data });
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
}
