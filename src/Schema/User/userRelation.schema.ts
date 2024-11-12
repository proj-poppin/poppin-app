export type UserRelationSchema = {
  blockedUserIds: string[];
};

export const BlankUserRelation: UserRelationSchema = {
  blockedUserIds: [],
};
