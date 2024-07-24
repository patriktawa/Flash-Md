const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0xIWlloQ2hvN3YxM3VqR0hkRkhMV2FaK2pSYnJzalRYMExlbk5SUUFIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWs5MDViMVd5ZHl1NWJ4MHZlSTVvTkN0RFNrcDB5UDFNWkpiazNsZ1RFMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTR2NTL1E2bDYwb0xpSFd1VzZjbytNS1c1cGR2Y24zdmIxK2p5OTJld0g4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLMWNYL2NGU2lSR3N2OSsyRlMxSEVXSURDc0prTDRKSTA5NkczaThWWVZjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVKQXVwemdUYStwSDE4Q08vbGIxa2ZMK2hrbzEzVjlJMWhJN1RrcnlDMjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktiOWFyNWNFWjJPeEpWaDJVZGcveUJlS0gvZmg4TnlVNk9uTVhKQ3dWMU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0dURkgxaFVBQWNyeTFLTUxsSXo4NFV4UHE1Sm5PV05yWU5TMXdqREZYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQW9RTStKci9JSXNLS2FmVVZvOGEwVjVZa3pCN2JJZHVqK05rSmhvRlNYQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9TZ2lMOUp5SnJJamVLVDkwYjZjMDkyaWFtazRDY0tRNk1ZQWhiMC9zcmgzSUhWMHhLUTNFWGhGVWdYNXFvejJqNjdHNTF4czNGL1hGSU9JNDNnZ0FBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTcsImFkdlNlY3JldEtleSI6InNReTNTVmFaREt5TS9qUHY5OUNWZU5teXFZbWJkS2ZyMEtUTlZ2dUZpT3M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Il90YldtMkhiU3hHX0ZCZW9ITnNPVFEiLCJwaG9uZUlkIjoiODViNTI1MTAtNjA5OS00OTM0LTljZmEtNTA4YWYwNmE0ODRlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVqYnlOOWdkYlNqRjB6U0t5ZUNnNFpYSnRYRT0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieXVraUp1dVBFWXI2Wkd6Q0U2MmRVOUxldjRVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTkwrNjhJSEVJT1RnN1VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiOGV4WkFiRGZ4SGVMckRyUzNNVWpvSWprWU5RZDhueHhlWVFDNVkwMFZDWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQ3hRNXhucHNzUHFMTENXV0FhSmc5SHpzZUtEdDdYZFZjU1k1Y0kyU2tUSXFQeWNFSlArT2tvWUk1TzZFMkljbytiYUMxMTFiVEZSOTVYeDZKZWM4QUE9PSIsImRldmljZVNpZ25hdHVyZSI6IksvVGRSRTU2b2ZyMm1RdWlkNWZmbk1oWm1BMXpIR0ZXdjNETkhsdE1VbmhpelR4NEF6b0lEa0ZVejhTcEE0VlBNaWE5OUFjQUxFSjhtTzNXcUUxc0NRPT0ifSwibWUiOnsiaWQiOiIyMzc2OTU4MTA4OTg6NjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2TkfCdk67wnZO/8J2TrvCdk7vwnZO18J2UgiDwnZOa8J2TsvCdk7YifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3Njk1ODEwODk4OjYzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZIc1dRR3czOFIzaTZ3NjB0ekZJNkNJNUdEVUhmSjhjWG1FQXVXTk5GUW0ifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE4MTMzODN9',
    PREFIXE: process.env.PREFIX || "#",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "237695810898",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
