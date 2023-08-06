import { createRouter } from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getDashboard,
  addDashboard,
} from '@/lib/api-functions/dashboard/controllers';

const baseRoute = '/api/dashboard/:userId?';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(baseRoute, async (req, res) => {
    getDashboard(req, res);
  })
  .post(baseRoute, async (req, res) => {
    addDashboard(req, res)
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