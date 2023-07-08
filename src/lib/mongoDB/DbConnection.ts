import { MongoClient } from "mongodb";

const DbConnection = function () {
  let db: MongoClient;
  async function DbConnect(): Promise<MongoClient> {
    try {
      let url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@portfoliocluster.aewfysa.mongodb.net/?retryWrites=true&w=majority`;
      let _db = await MongoClient.connect(url);
      const gracefulShutdown = () => {
        _db.close(false).then(() => {
          console.log("MongoDB Connection Successfully Closed...");
          process.exit(0);
        });
      };
      // process.on("SIGTERM", () => gracefulShutdown());
      // process.on("SIGINT", () => gracefulShutdown());
      // process.on("SIGHUP", () => gracefulShutdown());
      return _db;
    } catch {
      throw new Error("Unable to connect to MongoDb URL in DbConnection.ts");
    }
  }
  async function get(): Promise<MongoClient> {
    try {
      if (db != undefined) {
        return db;
      }
      db = await DbConnect();
      return db;
    } catch {
      throw new Error("Unable to connect to MongoDb URL in DbConnection.ts");
    }
  }
  return {
    get,
  };
};

const exportable = DbConnection();

export default exportable;
