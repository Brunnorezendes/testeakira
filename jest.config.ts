// jest.config.ts

import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // AQUI ESTÁ A CORREÇÃO: Apontamos para o arquivo de setup dentro de src/tests
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);