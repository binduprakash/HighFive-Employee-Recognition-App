class Api::V1::EmployeesController < ApplicationController
    before_action :set_employee, only: [:show, :update]

    # GET /employees
    def index
     @employees = Employee.all
     render json: @employees
    end

    # GET /employees/1
    def show
     render json: @employee
    end

    # PATCH/PUT /employees/1
    def update
     if @employee.update(employee_params)
      render json: @employee
     else
      render json: @employee.errors, status: :unprocessable_entity
     end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_employee
     @employee = Employee.find(params[:id])
    end

    # Only allow a trusted parameter “white list” through.
    def employee_params
        params.require(
            :employee
        ).permit(
            :available_points,
        )
    end
end
