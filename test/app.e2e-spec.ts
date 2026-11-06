import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { TransacoesController } from '../src/transacoes/transacoes.controller';
import { TransacoesService } from '../src/transacoes/transacoes.service';

describe('API (e2e sem banco)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController, TransacoesController],
      providers: [
        AppService,
        {
          provide: TransacoesService,
          useValue: {
            criar: async (dados: unknown) => dados,
            listar: async () => ({
              historico: [],
              metricas: { saldoTotal: 0, totalDespesas: 0, totalGastoImpulso: 0 },
            }),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /', async () => {
    await request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('GET /transacoes', async () => {
    await request(app.getHttpServer())
      .get('/transacoes')
      .expect(200)
      .expect({
        historico: [],
        metricas: { saldoTotal: 0, totalDespesas: 0, totalGastoImpulso: 0 },
      });
  });
});
