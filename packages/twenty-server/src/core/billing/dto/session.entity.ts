import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionEntity {
  @Field(() => String)
  url: string;
}
