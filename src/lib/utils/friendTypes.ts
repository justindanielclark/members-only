export const friendTypes = ["friends", "not-friends", "request-sent", "request-pending"] as const;
export type FriendType = (typeof friendTypes)[number];
