// src/tests/jest.setup.ts

// 1. Importa o polyfill do 'fetch'. Deve ser a primeira linha.
// Ele automaticamente adiciona Request, Response, Headers e fetch ao escopo global.
import 'whatwg-fetch'; 

import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// 2. Mantemos nossa correção anterior para o TextEncoder.
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;