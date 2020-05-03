import express, { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import multer from 'multer'
import { chatRouter } from './routers/chat-router'
import UserHandler from './user-handler';


// create database, ensure 'sqlite3' in your package.json

const app = express();
const formValidator = multer({ limits: { files: 0 } });
app.use(express.json());
app.use(formValidator.none());



// Load mysql options from config

const usernameCheck = () => check('username').isLength({ min: 4, max: 15 }).isAlphanumeric().withMessage('bad username')
const passwordHashCheck = () => check('passwdHash').isHexadecimal().bail().isLength({ max: 64, min: 64 }).withMessage('bad password - use sha256 hash');
const chatMessageCheck = () => check('message').isLength({ min: 1, max: 100 }).isAscii().unescape().withMessage('bad message');



app.get('/', (req: Request, res: Response) => {
    console.log(`${req.method} ${req.url}`);

    // Send static webpage or proxy elsewhere
    // TODO:

    req.session!.lastNumber = req.session!.newNumber;
    req.session!.newNumber = Math.random();

    res.status(200);
    res.json(req.session!);
});



app.post('/user/register', [usernameCheck, passwordHashCheck], (req: Request, res: Response) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(402);
        res.send(result.array({ onlyFirstError: true }))
        return;
    }
    const { username, passwdHash } = req.body;

    if (UserHandler.userExists(username)) {
        res.status(403).send('user already exists');
        return;
    }


    const sessionToken = UserHandler.register(username, passwdHash);
    //TODO: Send session token back
    console.log("Registered user: " + username)
    res.status(200).json({ sessionToken });
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

app.use('/user/logout', [usernameCheck, passwordHashCheck], (req: Request, res: Response, next: NextFunction) => {
    next();
});


app.route("/chat").all([usernameCheck, passwordHashCheck], chatRouter);

app.listen(8080, () => {
    console.log('Server started on port ' + 8080)
});

