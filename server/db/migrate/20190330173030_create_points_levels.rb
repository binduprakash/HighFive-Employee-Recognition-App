class CreatePointsLevels < ActiveRecord::Migration[5.2]
  def change
    create_table :points_levels do |t|
      t.string :level_name, null: false
      t.integer :points, null: false
      t.timestamps
    end
  end
end
