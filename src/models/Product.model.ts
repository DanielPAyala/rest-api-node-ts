import { Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: true
})
export default class Product extends Model {
  @Column({ type: DataType.STRING(100) })
  declare name: string;

  @Column({ type: DataType.FLOAT })
  declare price: number;

  @Default(true)
  @Column({ type: DataType.BOOLEAN })
  declare availability: boolean;
}
