import exportCreate from './createModule';
import exportConnect from './connectModule';
import exportProvider from './moduleProvider';
import * as exportMiddleware from './middleware';

export const createModule = exportCreate;
export const connectModule = exportConnect;
export const ModuleProvider = exportProvider;
export const middleware = exportMiddleware;
