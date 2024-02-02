module.exports = {
    port: process.env.PORT,

    // database
    db: {
        serviceAccountKey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        storageBucket: process.env.STORAGE_BUCKET_URL
    },

    // auth
    authentication: {
        jwtSecret: process.env.JWT_SECRET
    },

    // CORS whitelist
    corsAllowedOptions: [
        process.env.CORS_WHITELIST_1,
        process.env.CORS_WHITELIST_2
    ]
}