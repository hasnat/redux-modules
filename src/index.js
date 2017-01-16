import exportCreate from './createModule';
import exportConnect from './connectModule';
import exportProvider from './moduleProvider';
import transformationsToObject from './utils/transformationsToObject';

export const createModule = exportCreate;
export const connectModule = exportConnect;
export const ModuleProvider = exportProvider;
export const utils = { transformationsToObject };
