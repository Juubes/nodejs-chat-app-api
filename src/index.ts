import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { check, validationResult } from 'express-validator';
import multer from 'multer'
import { chatRouter } from './routers/chat-router'

const app = express();
const formValidator = multer({ limits: { files: 0 } });
app.use(express.json());
app.use(formValidator.none());

app.use(session({
    secret: "kakkaalumella", resave: false, saveUninitialized: false
}))


app.get('/', (req: Request, res: Response) => {
    console.log(`${req.method} ${req.url}`);

    // Send static webpage or proxy elsewhere
    // TODO:

    res.status(200);
    res.send('Hello world');
});



app.post('/user/register', [check('username').isLength({ max: 15, min: 4 }).withMessage('bad length'), check('passwdHash').isHexadecimal().withMessage('invalid password hash')], (req: Request, res: Response) => {
    console.log(`Username: ${req.body.username}`)
    console.log(`Password hash: ${req.body.passwdHash}`)

    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(402);
        res.send(result.array({ onlyFirstError: true }))
        return;
    }
    //TODO: Send session token back

    res.sendStatus(200);
    res.end();
});

app.use('/user/login', (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(402);
        res.send(result.array({ onlyFirstError: true }))
        return;
    }

    // TODO: Send session token back
    res.sendStatus(200);
    res.end();
    next();
});

app.use('/user/logout', (req, res, next) => {

    next();
});



app.route("/chat").all(chatRouter);

app.listen(8080, () => {
    console.log('Server started on port ' + 8080)
});

