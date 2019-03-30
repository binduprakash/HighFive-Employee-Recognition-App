class CreateRedeemItems < ActiveRecord::Migration[5.2]
  def change
    create_table :redeem_items do |t|
      t.string :name, null: false
      t.integer :points, default: 0
      t.float :amount
      t.string :description, null: false
      t.string :image_url, null: false
      t.timestamps
    end
  end
end
