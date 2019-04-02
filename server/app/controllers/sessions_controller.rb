class SessionsController < ApplicationController
    def authenticate
        if Employee.authenticate_with_credentials(params[:email], params[:password])
            render json: {'isAuthenticated': true}
        else
            render json: {'isAuthenticated': false}
        end
    end
end
