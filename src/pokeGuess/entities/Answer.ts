import { ApiProperty } from '@nestjs/swagger';

export class Answer {
  @ApiProperty({
    description: "Correct Pokemon's ID",
  })
  pokemonId: number;

  @ApiProperty({
    description: 'Name of the answered Pokemon',
  })
  answer: string;
}
