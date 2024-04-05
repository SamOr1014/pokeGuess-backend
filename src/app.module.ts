import { Module } from '@nestjs/common';
import { PokeGuessModule } from './pokeGuess/pokeGuess.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PokeGuessModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
