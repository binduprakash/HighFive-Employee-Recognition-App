class Api::V1::SessionsController < ApplicationController
    def authenticate
        if employee = Employee.authenticate_with_credentials(params[:email], params[:password])
            render json: {'isAuthenticated': true, 'employee_id': employee.id}
        else
            render json: {'isAuthenticated': false}
        end
    end
end
