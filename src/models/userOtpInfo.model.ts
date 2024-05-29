import { AutoIncrement, Column, Model, PrimaryKey, Table, AllowNull } from 'sequelize-typescript';


export interface userOtpInfoI {
  id: number;
  userId: number;
  otp: number;
  otpType: string;
  updatedBy: number;
  createdBy: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt: Date;
}

@Table({
  modelName: 'userOtpInfo',
  tableName: 'userOtpInfo',
  paranoid: false
})

export class userOtpInfo extends Model<userOtpInfoI> {

  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @AllowNull(false)
  @Column
  public userId: number;

  @AllowNull(false)
  @Column
  public otp: number;

  @Column
  public otpType: string;

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
