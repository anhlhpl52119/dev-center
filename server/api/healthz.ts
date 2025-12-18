import pkg from '../../package.json';

const startTime = new Date();

export default defineEventHandler((_event: unknown) => {
  return {
    upSince: startTime,
    statusCode: 200,
    statusMessage: 'Ok',
    uptime: process.uptime(),
    localTime: new Date(),
    service: {
      name: pkg.name,
      version: '1.0.0',
    },
    env: {
      nodeEnv: process.env.NODE_ENV,
      nodeVersion: process.version,
      processName: process.title,
      pid: process.pid,
      cwd: process.cwd(),
    },
  };
});
