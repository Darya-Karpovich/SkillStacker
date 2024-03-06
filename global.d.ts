declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SERVER_URL: string;
      DATABASE_URL: string;
      NODE_ENV: "development" | "production";
      PWD: string;
    }
  }
}

export {};
