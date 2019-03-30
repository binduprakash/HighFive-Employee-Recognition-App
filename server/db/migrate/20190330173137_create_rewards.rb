class CreateRewards < ActiveRecord::Migration[5.2]
  def change
    create_table :rewards do |t|
      t.references :from_employee, index: true, foreign_key: {to_table: :employees}, null: false
      t.references :to_employee, index: true, foreign_key: {to_table: :employees}, null: false
      t.references :approver_employee, index:true, foreign_key: {to_table: :employees}, null: true
      t.text :reward_message, null: false
      t.text :approver_message, null: true
      t.references :level, index: true, foreign_key: {to_table: :points_levels}
      t.boolean :is_viewed, default: false 
      t.string :status, default: 'pending' # pending, rejected, approved
      t.datetime :approved_at, null: true
      t.timestamps
    end
  end
end
