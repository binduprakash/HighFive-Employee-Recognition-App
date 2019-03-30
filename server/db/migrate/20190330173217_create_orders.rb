class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.references :ordered_by, index: true, foreign_key: {to_table: :employees}, null: false
      t.integer :total_points
      t.string :email, null: false
      t.timestamps
    end
  end
end
