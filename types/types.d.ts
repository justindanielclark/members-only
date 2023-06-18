import { ObjectId } from "mongodb"

type User = {
    //Combination of email[provider] ~ Example: jclark@gmail.com[github]
    lookup: string;
    handle: string;
    lists: {
        seenMovies: Array<MovieIDs>;
        toWatch: Array<MovieIDs>
    }
    friends: Array<ObjectId>;
}

type MovieIDs = {
    _id: ObjectId,
    TMDB_ID: number,
}

type MovieList = {
    name: string,
    createdOn: Date,
    movies: Array<MovieIDs>
}