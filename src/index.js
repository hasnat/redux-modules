import exportCreate from './createModule';
import exportConnect from './connectModule';
import exportProvider from './moduleProvider';
import * as exportMiddleware from './middleware';
import transformationsToObject from './utils/transformationsToObject';

export const createModule = exportCreate;
export const connectModule = exportConnect;
export const ModuleProvider = exportProvider;
export const middleware = exportMiddleware;
export const utils = { transformationsToObject };
