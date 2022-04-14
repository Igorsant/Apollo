import express from 'express';
import path from 'path';

import professionalRouter from './routes/professional.routes';
import databaseService from './services/DatabaseService';

databaseService
  .connect()
  .then(() => {
    console.log('Banco de dados conectado com sucesso');

    const app = express();
    const port = process.env.PORT || 3000;
    const picturesDirPath = path.join(
      __dirname,
      '..',
      'static',
      'user_pictures'
    );

    app.use(express.json({ limit: '20mb' }));

    app.use('/pictures', express.static(picturesDirPath));
    app.use('/professionals', professionalRouter);

    app.listen(port, () => {
      console.log(`Servidor disponível em http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('Erro ao conectar ao banco de dados.');
    console.error(err);
    process.exit(1);
  });
