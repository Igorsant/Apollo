import cors from 'cors';
import express from 'express';

import { PICTURES_FOLDER } from './helpers/consts.helper';
import customerRouter from './routes/customer.routes';
import databaseService from './services/DatabaseService';
import professionalRouter from './routes/professional.routes';
import reviewRouter from './routes/review.routes';
import schedulingRouter from './routes/scheduling.routes';

databaseService
  .connect()
  .then(() => {
    console.log('Banco de dados conectado com sucesso');

    const app = express();
    const port = process.env.PORT || 3001;

    app.use(cors());
    app.use(express.json({ limit: '20mb' }));

    app.use('/pictures', express.static(PICTURES_FOLDER));
    app.use('/customers', customerRouter);
    app.use('/professionals', professionalRouter);
    app.use('/reviews', reviewRouter);
    app.use('/schedulings', schedulingRouter);

    app.listen(port, () => {
      console.log(`Servidor disponível em http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('Erro ao conectar ao banco de dados.');
    console.error(err);
    process.exit(1);
  });
