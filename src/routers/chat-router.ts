import { Request, Response } from 'express'
import * as tokenLib from '../session-token';
import ChatHandler from '../chat-handler';

export function chatRouter(req: Request, res: Response) {
    const { username, message, sessionToken } = req.body;

    if (!tokenLib.isTokenValid(username, sessionToken)) {
        res.status(403).send('invalid session token');
        return;
    }
    // Valid session
    // Send chat
    ChatHandler.sendChat(username, {
        color: "#FFFFFF", text: message
    })
}
