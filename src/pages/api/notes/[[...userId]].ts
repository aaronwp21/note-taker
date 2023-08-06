import { createRouter } from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  updateDbNotes,
} from '@/lib/api-functions/dashboard/controllers';

const baseRoute = '/api/notes/:userId?';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .put(baseRoute, async (req, res) => {
    updateDbNotes(req, res)
  })

export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).end('Something broke')
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found')
  },
})