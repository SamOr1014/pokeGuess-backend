import { ApiProperty } from '@nestjs/swagger';

class Cries {
  @ApiProperty({ description: "Pokemon's Cry" })
  latest: string | null;
}

class Sprites {
  @ApiProperty({ description: "Pokemon's Image" })
  front_default: string | null;
}

export class PokeApiRes {
  @ApiProperty({
    type: Cries,
  })
  cries: Cries;
  @ApiProperty({
    description: 'Req Pokemon ID',
  })
  id: number;
  @ApiProperty({
    description: 'Req Pokemon Name',
  })
  name: string;
  @ApiProperty({
    description: 'Images info',
    type: Sprites,
  })
  sprites: Sprites;
}
