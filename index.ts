import express, {json} from 'express';

const app = express();

app.use(json());

app.listen(3001, '0.0.0.0', ()=> {
    console.log('Listening on http://localhost:3001')
});
