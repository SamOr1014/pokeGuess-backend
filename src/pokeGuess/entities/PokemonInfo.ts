import { ApiProperty } from '@nestjs/swagger';

export class PokemonInfo {
  @ApiProperty({
    description: 'Pokemon ID',
  })
  pokemonId: number;

  @ApiProperty({
    description: "Pokemon Cry's sound url",
  })
  pokemonCry: string;

  @ApiProperty({
    description: 'Pokemon image url',
  })
  pokemonImg: string;

  @ApiProperty({
    description: 'Pokemon name',
  })
  pokemonName: string;

  @ApiProperty({
    description: 'Pokemon weight',
  })
  weight: number;

  @ApiProperty({
    description: 'Pokemon height',
  })
  height: number;

  @ApiProperty({
    description: 'Pokemon types',
  })
  type: string[];
}
