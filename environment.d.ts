declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    AUTH_SECRET: string;
    TOKEN_KEY: string;
    RAZORPAY_KEY: string;
    RAZORPAY_KEY_SECRET: string;
  }
}
