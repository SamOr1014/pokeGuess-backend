import { Test } from '@nestjs/testing';
import { PokeGuessModule } from '../pokeGuess/pokeGuess.module';
import { PokeGuessController } from '../pokeGuess/pokeGuess.controller';
import { PokeGuessRepository } from '../pokeGuess/pokeGuess.repository';
import { PokeGuessService } from '../pokeGuess/pokeGuess.service';
import { QuestionTransformer } from '../pokeGuess/transformers/questionTransformer';
import { ConfigModule } from '@nestjs/config';

describe('CatsController', () => {
  let controller: PokeGuessController;
  let repository: PokeGuessRepository;
  let service: PokeGuessService;
  let transformer: QuestionTransformer;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PokeGuessModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    }).compile();

    controller = moduleRef.get<PokeGuessController>(PokeGuessController);
    repository = moduleRef.get<PokeGuessRepository>(PokeGuessRepository);
    service = moduleRef.get<PokeGuessService>(PokeGuessService);
    transformer = moduleRef.get<QuestionTransformer>(QuestionTransformer);
  });

  it('well constructed', () => {
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(PokeGuessController);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(PokeGuessService);
    expect(repository).toBeDefined();
    expect(repository).toBeInstanceOf(PokeGuessRepository);
    expect(transformer).toBeDefined();
    expect(transformer).toBeInstanceOf(QuestionTransformer);
  });
});
