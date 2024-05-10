import { AutoIncrement, Column, Model, PrimaryKey, Table, AllowNull } from 'sequelize-typescript';


export interface rolesI {
  id?: number;
  name?: string;
  slug?: string;
  updatedBy: number;
  createdBy: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt: Date;
}

@Table({
  modelName: 'roles',
  tableName: 'roles',
  paranoid: true
})

export class roles extends Model<rolesI> {

  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @AllowNull(false)
  @Column
  public name: string;

  @AllowNull(false)
  @Column
  public slug: string;

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
