export type FromDb<T> = T & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
