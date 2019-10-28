import { EstadoDeMinas } from './EstadoDeMinas/EstadoDeMinas.controller';

async function bootstrap() {
  const estadoMinas: EstadoDeMinas = new EstadoDeMinas();

  estadoMinas.getNews();
}

bootstrap();
