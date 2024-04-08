import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('PokeGuess API')
  .setDescription('Detail of the PokeGuess API')
  .setVersion('1.0')
  .build();
