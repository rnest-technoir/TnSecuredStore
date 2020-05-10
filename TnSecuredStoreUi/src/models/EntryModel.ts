
export class EntryModel {
  title: string;
  password: string;
  login: string;
  email: string;
  url: string;
  id: number;
  authorId: number;
  createdOn: Date;
  modifiedOn?: Date;
  rowGuid: string;
  isRemoved: boolean;
  isActive: boolean;
}
