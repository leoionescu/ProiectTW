import express, { json } from 'express';
import { intitialize } from './repository.mjs';
import routes from './routes.mjs';

const app = express();
app.use(json())
app.use('/api', routes)

app.listen(8081, async () => {
    try {
        await intitialize()
    } catch (err) {
        console.error(err)
    }
})