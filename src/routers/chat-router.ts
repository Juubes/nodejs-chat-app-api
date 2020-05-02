import { Request, Response } from 'express'
import * as tokenLib from '../session-token';

export function chatRouter(req: Request, res: Response) {
    const { username, message, sessionToken } = req.body;

    if (!tokenLib.isTokenValid(username, sessionToken)) {
        res.status(403).send('invalid session token');
    }
}
