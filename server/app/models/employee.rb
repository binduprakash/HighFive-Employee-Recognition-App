class Employee < ApplicationRecord
    has_many :subordinates, class_name: "Employee", foreign_key: "manager_id", dependent: :nullify
    belongs_to :manager, class_name: "Employee", optional: true

    # Validations
    validates :email, presence: true, uniqueness: { case_sensitive: false }

    def self.authenticate_with_credentials(email, password)
        employee = Employee.find_by_email(email)
        if employee && employee.password_digest == password
            employee
        end
    end
end
