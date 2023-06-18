import { Db } from "mongodb";
import DbConnection from "./DbConnection";
export default async function getMovieDatabaseCollection(): Promise<Db>{
    const db = await DbConnection.get();
    if(db){
        return db.db(process.env.MONGO_DB_NAME);
    }
    throw new Error('Unable to connect to database in getMovieDatabaseCollection.ts')
}