import { AutoIncrement, Column, Model, PrimaryKey, Table, AllowNull } from 'sequelize-typescript';


export interface usersI {
  id?: number;
  userName?: string;
  email?: string;
  password?: string;
  roleId: number;
  roleSlug: string;
  isActive: boolean;
  updatedBy: number;
  createdBy: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt: Date;
}

@Table({
  modelName: 'users',
  tableName: 'users',
  paranoid: true
})

export class users extends Model<usersI> {

  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @AllowNull(false)
  @Column
  public userName: string;

  @AllowNull(false)
  @Column
  public email: string;

  @AllowNull(false)
  @Column
  public password: string;

  @AllowNull(false)
  @Column
  public roleId: number;
  
  @AllowNull(false)
  @Column
  public roleSlug: string;

  @Column
  public isActive: boolean;

  @Column
  public updatedAt: Date;

  @Column
  public updatedBy: number;

  @Column
  public createdBy: number;

  @Column
  public createdAt: Date;

  @Column
  public deletedAt: Date;

}
