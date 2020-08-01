const jsonServer = require('json-server');
const { Storage } = require('@google-cloud/storage');

const bucketName = 'morenoflix';
const fileName = 'db.json';

let currentStorage;

const persistStorage = () => {
  return !!process.env.PERSIST_STORAGE;
};

const storage = () => {
  if (!currentStorage) {
    currentStorage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: {
        private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GCP_CLIENT_EMAIL,
      },
    });
  }
  return currentStorage;
};

const existOnStorage = async () => {
  const data = await storage().bucket(bucketName).file(fileName).exists();
  return data[0];
};
const copyFromStorage = async () => {
  return storage().bucket(bucketName).file(fileName).download({
    destination: fileName,
  });
};
const copyToStorage = async () => {
  return storage().bucket(bucketName).upload(fileName);
};

const copyFromStorageIfExists = async () => {
  if (await existOnStorage()) {
    await copyFromStorage();
  }
};

const startJsonServer = async () => {
  const server = jsonServer.create();
  const router = jsonServer.router(fileName);
  const middlewares = jsonServer.defaults();

  const port = process.env.PORT || 8080;
  if (persistStorage()) {
    server.use((req, res, next) => {
      if (req.method !== 'GET') {
        res.on('finish', async () => {
          await copyToStorage();
        });
      }
      next();
    });
  }
  server.use(middlewares);
  server.use(router);
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`JSON Server is running in ${port}`);
  });
};

const start = async () => {
  if (persistStorage()) {
    await copyFromStorageIfExists();
  }
  await startJsonServer();
};

start();
