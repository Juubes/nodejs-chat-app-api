import express, { Request, Response } from 'express';
import session from 'express-session';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    secret: "kakkaalumella"
}))


app.get('/', (req: Request, res: Response) => {
    console.log(`${req.method} ${req.url}`);

    // Send static webpage or proxy elsewhere
    // TODO:

    res.status(200);
    res.send('Hello world');
});



app.post('/user/register', (req, res, next) => {
    console.log(req.body);


    res.json({
        reason: "backend not ready"
    });
    next();
});

app.use('/user/login', (req, res, next) => {

    next();
});

app.use('/user/logout', (req, res, next) => {

    next();
});






app.use('/chat', (req, res, next) => {

    next();
});



app.listen(8080, () => {
    console.log("Server started on port 8080.")
});