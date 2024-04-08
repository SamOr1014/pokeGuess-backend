import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PokeApiRes } from './entities/PokeApiRes';

@Injectable()
export class PokeGuessRepository {
  logger: Logger;
  POKEMON_API: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger('PokeGuessRepository');
    this.POKEMON_API = this.configService.get('POKEMON_API');
  }

  async fetchPokemon(id: number): Promise<PokeApiRes> {
    this.logger.log('@fetchPokemon');
    try {
      const apiResult = await this.httpService.axiosRef.get<PokeApiRes>(
        `${this.POKEMON_API}/${id}`,
      );
      return apiResult.data;
    } catch (e) {
      throw new HttpException('PokeAPI Fetch Failed', HttpStatus.BAD_GATEWAY);
    }
  }
}
