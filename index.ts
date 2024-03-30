import env from 'dotenv';

env.config({
  path: process.env.ENV_FILE_PATH,
});

export enum AppEnvironmentEnum {
  TEST = 'test',
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
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
    name: string;
    domain: string;
    logo: string;
    secret: string;
    bcryptRounds: number;
    port: number;
    email: string;
    frontEndUrl: string;
  };
  super_admin: {
    email: string;
    password: string;
    username: string;
  };
  chigisoft: {
    email: string;
    password: string;
    username: string;
  },
  db: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
  redis: {
    mode: string; // 'standalone' | 'cluster';
    host: string;
    port: number;
    password: string;
  };
  sendgrid: {
    apiKey: string;
  };
  paystack: {
    secretKey: string;
  };
  do: {
    secretKey: string;
    accessKey: string;
    bucket: string;
    endpoint: string;
  };
  termii: {
    apiUrl: string;
    apiKey: string;
  };
};

const isTestEnvironment = process.env.APP_ENV === AppEnvironmentEnum.TEST;

const config: Config = {
  env: {
    isProduction: process.env.NODE_ENV === AppEnvironmentEnum.PRODUCTION,
    isDevelopment: process.env.NODE_ENV === AppEnvironmentEnum.DEVELOPMENT,
    isTest: process.env.NODE_ENV === AppEnvironmentEnum.TEST,
  },
  app: {
    name: process.env.APP_NAME!,
    domain: process.env.APP_DOMAIN!,
    logo: process.env.APP_LOGO!,
    env: process.env.APP_ENV as AppEnvironmentEnum,
    isProduction: process.env.APP_ENV === AppEnvironmentEnum.PRODUCTION,
    secret: process.env.APP_SECRET!,
    bcryptRounds: 10,
    port: +process.env.PORT!,
    email: process.env.APP_EMAIL!,
    frontEndUrl: process.env.APP_FRONTEND_URL!,
  },
  super_admin: {
    email: process.env.SUPER_ADMIN_EMAIL!,
    password: process.env.SUPER_ADMIN_PASSWORD!,
    username: process.env.SUPER_ADMIN_USERNAME!,
  },
  chigisoft: {
    email: process.env.CHIGISOFT_EMAIL!,
    password: process.env.CHIGISOFT_PASSWORD!,
    username: process.env.CHIGISOFT_USERNAME!,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 3306),
    database: isTestEnvironment ? process.env.TEST_DB_DATABASE! : process.env.DB_DATABASE!,
    user: isTestEnvironment ? process.env.TEST_DB_USER! : process.env.DB_USER!,
    password: isTestEnvironment ? process.env.TEST_DB_PASSWORD! : process.env.DB_PASSWORD!,
  },
  redis: {
    mode: process.env.REDIS_MODE! || 'standalone',
    host: process.env.REDIS_HOST!,
    port: +process.env.REDIS_PORT!,
    password: process.env.REDIS_PASSWORD!,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY!,
  },
  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY!,
  },
  do: {
    secretKey: process.env.DO_SECRET_KEY!,
    accessKey: process.env.DO_ACCESS_KEY!,
    bucket: process.env.DO_BUCKET!,
    endpoint: process.env.DO_ENDPOINT!,
  },
  termii: {
    apiUrl: process.env.TERMII_API_URL!,
    apiKey: process.env.TERMII_API_KEY!,
  },
};

const validateConfig = () => {
  const missingKeys: string[] = [];
  Object.entries(config).forEach(([baseKey, baseValue]) => {
    Object.entries(baseValue).forEach(([key, value]) => {
      if (value === '' || value === undefined) {
        missingKeys.push(`${baseKey}.${key}`);
      }
    });
  });
  if (missingKeys.length) {
    global.console.warn(`The following configuration keys are not set: ${missingKeys.join(', ')}`);
    // process.exit(1);
  }
};

validateConfig();

export default config;
