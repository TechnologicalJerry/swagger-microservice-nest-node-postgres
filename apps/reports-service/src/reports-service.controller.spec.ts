import { Test, TestingModule } from '@nestjs/testing';
import { ReportsServiceController } from './reports-service.controller';
import { ReportsServiceService } from './reports-service.service';

describe('ReportsServiceController', () => {
  let reportsServiceController: ReportsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReportsServiceController],
      providers: [ReportsServiceService],
    }).compile();

    reportsServiceController = app.get<ReportsServiceController>(ReportsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(reportsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
