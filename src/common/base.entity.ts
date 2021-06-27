import { classToPlain } from 'class-transformer';
import { BaseEntity } from 'typeorm';

export class BaseDBEntity<T> extends BaseEntity {
  constructor(partial?: Partial<T>) {
    super();
    partial && Object.assign(this, partial);
  }
  toJSON() {
    return <T>classToPlain(this);
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
}
