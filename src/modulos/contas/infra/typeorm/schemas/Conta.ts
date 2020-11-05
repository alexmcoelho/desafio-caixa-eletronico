import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import { ObjectID, Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';

@ObjectType()
@Entity('conta')
export class Conta extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => Float)
  @Column('double')
  saldo: number;

  @Field(() => Int)
  @Column()
  conta: number;
}
