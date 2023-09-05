const data = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_CONNECTION,
  define: {
    timestamps: false,
  },
};

module.exports = data;
