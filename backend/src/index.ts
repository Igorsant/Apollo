import databaseService from './services/DatabaseService';

async function init() {
  try {
    await databaseService.connect();
    console.log('Banco de dados conectado com sucesso');

    // inciar servidor express
  } catch (err) {
    console.log('Erro ao conectar ao banco de dados');
    console.error(err);
    process.exit(1);
  }
}

init();
