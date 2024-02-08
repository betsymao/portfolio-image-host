module.exports = {
    // port
    env: process.env.NODE_ENV,
    port: process.env.PORT,

    // database
    db: {
        google_account_credentials: process.env.GOOGLE_ACCOUNT_CREDENTIALS,
        storageBucket: process.env.STORAGE_BUCKET_URL,
    },

    // auth
    authentication: {
        jwtSecret: process.env.JWT_SECRET,
    },

    // CORS whitelist
    corsAllowedOptions: [
        process.env.CORS_WHITELIST_1,
        process.env.CORS_WHITELIST_2
    ]
}