module.exports = {
    apps: [{
        name: "app",    
        script: "./src/server.ts", // for development
        // script: "./server.js",   // for production
        watch: true,
        autorestart: true,
        env: {
            NODE_ENV: "development",
            PORT: 3000,
            DATABASE_DIALECT: "postgres",
            DATABASE_HOST: '127.0.0.1',
            DATABASE_NAME: 'postgres',
            DATABASE_USER: 'postgres',
            DATABASE_PASSWORD: 'postgres',
            REDIS_HOST: "127.0.0.1",
            REDIS_PORT: 6379,
            RABBIT_PROTOCOL: 'amqp',
            RABBIT_HOST: '127.0.0.1',
            RABBIT_POST: '15672',
            RABBIT_USERNAME: 'root',
            RABBIT_PASSWORD: 'root',
        },
        env_production: {
            NODE_ENV: "production",
            PORT: 3000,
            DATABASE_DIALECT: "postgres",
            DATABASE_HOST: '127.0.0.1',
            DATABASE_NAME: 'postgres',
            DATABASE_USER: 'postgres',
            DATABASE_PASSWORD: 'postgres',
            REDIS_HOST: "127.0.0.1",
            REDIS_PORT: 6379,
            RABBIT_PROTOCOL: 'amqp',
            RABBIT_HOST: '127.0.0.1',
            RABBIT_POST: '15672',
            RABBIT_USERNAME: 'root',
            RABBIT_PASSWORD: 'root',
        },
    }]
}
