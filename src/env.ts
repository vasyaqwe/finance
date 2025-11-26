const clientEnv = {
   development: {
      BASE_URL: "http://localhost:3000",
   },
   production: {
      BASE_URL: "https://finance.vasyaqwe.com",
   },
} as const

export const env = {
   ...import.meta.env,
   ...clientEnv[import.meta.env.MODE as keyof typeof clientEnv],
}
