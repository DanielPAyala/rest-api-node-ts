import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: true
})
export default class Product extends Model {
  @Column({ type: DataType.STRING(100) })
  name: string;

  @Column({ type: DataType.FLOAT(6, 2) })
  price: number;

  @Column({ type: DataType.BOOLEAN })
  availability: boolean;
}
