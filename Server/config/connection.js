// require('dotenv').config();


// const Sequelize = require('sequelize');

// const sequelize = process.env.DB_URL
//     ? new Sequelize(process.env.DB_URL, {
//         dialectOptions: {
//             charset: 'utf8',
//             collate: 'utf8_general_ci',
//             supportBigNumbers: true,
//             bigNumberStrings: true 
//         },
//         define: {
//             charset: 'utf8',
//             collate: 'utf8_general_ci' 
//         }
//     })
//     : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//         host: 'localhost',
//         dialect: 'postgres',
//         dialectOptions: {
//             charset: 'utf8',
//             collate: 'utf8_general_ci',
//             supportBigNumbers: true,
//             bigNumberStrings: true,
//             decimalNumbers: true,
//         },
//         define: {
//             charset: 'utf8',
//             collate: 'utf8_general_ci'
//         }
//     });

//     sequelize.authenticate()
//         .then(() => console.log('Database connected.'))
//         .catch(err => console.error('Unable to connect to the database:', err));

//     module.exports = sequelize;


require('dotenv').config();
const Sequelize = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

// Configure retry strategy
const retryConfig = {
  max: 5, // Maximum retry attempts
  match: [
    /SequelizeConnectionError/,
    /Connection terminated unexpectedly/,
    /the database system is in recovery mode/,
    /ConnectionError/,
    /ETIMEDOUT/,
    /EHOSTUNREACH/,
    /ECONNRESET/
  ],
  timeout: 30000 // 30 seconds per retry
};

const productionConfig = {
  dialect: 'postgres',
  logging: isTest ? false : console.log,
  retry: retryConfig,
  pool: {
    max: 5,
    min: 0,
    acquire: 60000, // 60 seconds to acquire connection
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    charset: 'utf8',
    collate: 'utf8_general_ci',
    supportBigNumbers: true,
    bigNumberStrings: true,
    decimalNumbers: true
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    underscored: true
  }
};

const developmentConfig = {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log,
  dialectOptions: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    supportBigNumbers: true,
    bigNumberStrings: true,
    decimalNumbers: true
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
};

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, productionConfig)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      developmentConfig
    );

// Connection verification with retries
const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    // Sync models in development
    if (!isProduction) {
      await sequelize.sync({ alter: true });
      console.log('Database synced');
    }
  } catch (err) {
    console.error('Database connection failed:', err.message);
    if (err.message.includes('recovery mode')) {
      console.log('Database is in recovery mode. Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    } else {
      process.exit(1); // Exit if non-recoverable error
    }
  }
};

// Handle connection events
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established');
    
    // Set up connection cleanup on process exit
    process.on('exit', () => {
      sequelize.close().then(() => console.log('Database connection closed'));
    });
  })
  .catch(err => {
    console.error('Initial connection failed:', err);
    if (isProduction) {
      setTimeout(connectWithRetry, 5000);
    }
  });

// Connection health monitoring
setInterval(async () => {
  try {
    await sequelize.query('SELECT 1');
  } catch (err) {
    console.error('Connection heartbeat failed:', err);
    if (isProduction) connectWithRetry();
  }
}, 300000); // Check every 5 minutes

module.exports = sequelize;