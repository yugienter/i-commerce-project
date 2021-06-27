/* eslint-disable */
import { Repository } from 'typeorm';

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  }),
);

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
