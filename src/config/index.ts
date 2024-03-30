import env from "dotenv";

env.config({
  path: process.env.ENV_FILE_PATH,
});


export enum AppEnvironmentEnum {
  TEST = "test",
  LOCAL = "local",
  DEVELOPMENT = "development",
  STAGING = "staging",
  PRODUCTION = "production",
}

type Config = {
  env: {
    isProduction: boolean;
    isDevelopment: boolean;
    isTest: boolean;
  };
  app: {
    env: AppEnvironmentEnum;
    isProduction: boolean;
    port: number;
  };
  database: {
    uri: string;
  };
};

const config: Config = {
  env: {
    isProduction: process.env.NODE_ENV === AppEnvironmentEnum.PRODUCTION,
    isDevelopment: process.env.NODE_ENV === AppEnvironmentEnum.DEVELOPMENT,
    isTest: process.env.NODE_ENV === AppEnvironmentEnum.TEST,
  },
  app: {
    env: process.env.APP_ENV as AppEnvironmentEnum,
    isProduction: process.env.APP_ENV === AppEnvironmentEnum.PRODUCTION,
    port: +process.env.PORT!,
  },
  database: {
    uri: process.env.DB_URI!,
  },
};

export default config;
