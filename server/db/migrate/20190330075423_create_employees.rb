class CreateEmployees < ActiveRecord::Migration[5.2]
  def change
    create_table :employees do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :title, null: true
      t.string :img_url, null: true
      t.string :department, null: true
      t.references :manager, index: true, foreign_key: {to_table: :employees}, null: true
      t.integer :available_points, default: 0
      t.timestamps
    end
  end
end
