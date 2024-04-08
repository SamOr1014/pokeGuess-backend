import { ApiProperty } from '@nestjs/swagger';

export class TriviaQuestion {
  @ApiProperty({
    description: "Correct answer's Pokemon ID",
  })
  pokemonId: number;

  @ApiProperty({
    description: "Correct answer's Pokemon Cry's sound url",
  })
  pokemonCry: string;

  @ApiProperty({
    description: "Correct answer's Pokemon image url",
  })
  pokemonImg: string;

  @ApiProperty({
    description: 'Correct answer name with three decoys',
  })
  pokemonNameList: string[];
}
