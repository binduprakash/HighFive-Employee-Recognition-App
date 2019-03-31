class Employee < ApplicationRecord
    has_many :subordinates, class_name: "Employee", foreign_key: "manager_id", dependent: :nullify
    belongs_to :manager, class_name: "Employee", optional: true
end
