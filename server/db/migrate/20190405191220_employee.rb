class Employee < ActiveRecord::Migration[5.2]
  def change
    add_column:employees,
              :slack_id,
              :string,
          null:true
  end
end
