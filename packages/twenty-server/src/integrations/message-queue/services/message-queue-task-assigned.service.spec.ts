import { Test, TestingModule } from '@nestjs/testing';

import { MessageQueueDriver } from 'src/integrations/message-queue/drivers/interfaces/message-queue-driver.interface';

import {
  QUEUE_DRIVER,
  MessageQueue,
} from 'src/integrations/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/integrations/message-queue/services/message-queue.service';

describe('MessageQueueTaskAssigned queue', () => {
  let service: MessageQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MessageQueue.taskAssignedQueue,
          useFactory: (driver: MessageQueueDriver) => {
            return new MessageQueueService(
              driver,
              MessageQueue.taskAssignedQueue,
            );
          },
          inject: [QUEUE_DRIVER],
        },
        {
          provide: QUEUE_DRIVER,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MessageQueueService>(MessageQueue.taskAssignedQueue);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should contain the topic and driver', () => {
    expect(service).toEqual({
      driver: {},
      queueName: MessageQueue.taskAssignedQueue,
    });
  });
});
