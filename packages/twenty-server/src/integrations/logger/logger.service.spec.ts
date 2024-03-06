import { Test, TestingModule } from '@nestjs/testing';

import { LoggerService } from './logger.service';
import { LOGGER_DRIVER } from './logger.constants';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: LOGGER_DRIVER,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
