class CreateOrderItems < ActiveRecord::Migration[5.2]
  def change
    create_table :order_items do |t|
      t.references :order, index: true, foreign_key: {to_table: :orders}, null: false
      t.references :redeem_item, index: true, foreign_key: {to_table: :redeem_items}, null: false
      t.integer :quantity, default: 0
      t.integer :sub_total_points, default: 0
      t.timestamps
    end
  end
end
