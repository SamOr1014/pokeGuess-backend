import { ApiProperty } from '@nestjs/swagger';

export class ValidatedAnswer {
  @ApiProperty({
    description: 'Answer Correct or not',
  })
  correct: boolean;

  @ApiProperty({
    description: "Correct answer's Pokemon image url",
  })
  image: string;

  @ApiProperty({
    description: "Correct answer's Pokemon name",
  })
  pokemonName: string;
}
