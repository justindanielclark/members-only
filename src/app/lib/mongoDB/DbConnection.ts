import { MongoClient } from "mongodb";

type DB_Return = MongoClient | null;

const DbConnection = function () {
  let db: DB_Return = null;
  async function DbConnect(): Promise<DB_Return> {
    try {
      let url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@portfoliocluster.aewfysa.mongodb.net/?retryWrites=true&w=majority`;
      let _db = await MongoClient.connect(url);
      const gracefulShutdown = () => {
        _db.close(false).then(() => {
          console.log("MongoDB Connection Successfully Closed...");
          process.exit(0);
        });
      };
      process.on("SIGTERM", () => gracefulShutdown());
      process.on("SIGINT", () => gracefulShutdown());
      process.on("SIGHUP", () => gracefulShutdown());
      return _db;
    } catch {
      return null;
    }
  }
  async function get(): Promise<DB_Return> {
    try {
      if (db != null) {
        return db;
      }
      db = await DbConnect();
      return db;
    } catch {
      return null;
    }
  }
  return {
    get,
  };
};

const exportable = DbConnection();

export default exportable;
