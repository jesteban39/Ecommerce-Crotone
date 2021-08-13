import {
  Model, Column, Table, DataType, HasMany, ForeignKey
} from 'sequelize-typescript'

import { User } from "./User"
import { SaleItem } from "./SaleItem"
import { Destiny } from "./Destiny"

@Table
export class Sale extends Model<Sale> {

  @Column({
    defaultValue: 'Pending',
    ...DataType.ENUM(
      'Pending', 'Created', 'Processing', 'Cancelled', 'Complete'
    )
  })
  state!: string

  @Column(DataType.DATE)
  date!: Date

  @ForeignKey(() => User)
  userId!: number

  @Column(DataType.STRING)
  purchaseId!: string

  @ForeignKey(() => Destiny)
  destinyId!: number

  @HasMany(() => SaleItem)
  items!: SaleItem[];

}
