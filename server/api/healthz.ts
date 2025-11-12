
const startTime = new Date();

export default defineEventHandler((_event: unknown) => {
  return {
    upSince: startTime,
    statusCode: 200,
    statusMessage: 'Ok',
    uptime: process.uptime(),
    localTime: new Date(),
    service: {
      name: "dev-center-v2",
      // description: pkg.description,
      version: "0.0.1"
    },
    env: {
      nodeEnv: process.env.NODE_ENV,
      nodeVersion: process.version,
      processName: process.title,
      pid: process.pid,
      cwd: process.cwd()
    }
  };
});
