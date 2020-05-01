import express from 'express'
const app = express()
app.use(express.json())

app.get('/', (req: express.Request, res: express.Response) => {
    console.log(`${req.method} ${req.url}`);

    res.status(200);
    res.send('Hello world');
});


app.listen(8080, () => {
    console.log("Server started on port 8080.")
});
