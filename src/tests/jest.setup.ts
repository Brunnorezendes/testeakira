// src/tests/jest.setup.ts

import 'whatwg-fetch'; 

import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;