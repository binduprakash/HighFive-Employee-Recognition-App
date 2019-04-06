class Api::V1::SessionsController < ApplicationController
    def authenticate
        if employee = Employee.authenticate_with_credentials(params[:email], params[:password])
            render json: {
                'isAuthenticated': true,
                'employee_id': employee.id,
                'img_url': employee.img_url,
                'first_name': employee.first_name,
                'last_name': employee.last_name,
                'title': employee.title,
                'department': employee.department,
            }
        else
            render json: {'isAuthenticated': false}
        end
    end
end
