import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  it('retorna Hello World!', () => {
    const controller = new AppController(new AppService());
    expect(controller.getHello()).toBe('Hello World!');
  });
});
