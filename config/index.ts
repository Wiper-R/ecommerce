import { configSchema } from './validation';

const config = configSchema.parse(process.env);

export default config;
