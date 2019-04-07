class Api::V1::OrdersController < ApplicationController
    # GET /orders
    def index
        @orders = Order.all
        render json: @orders
    end

    # GET /orders/1
    def show
        @order = Order.find(params[:id])
        render json: @order
    end

    # POST /orders
    def create
        # @order = Order.new(order_params)
        # if @order.save
        #     render json: @order, status: :created, location: api_v1_order_url(@order)
        # else
        #     render json: @order.errors, status: :unprocessable_entity
        # end
        print params

        cartHash = JSON.parse params[:cart_details]
        employee = Employee.find(params[:employee_id].to_i)
        
        total_points = 0
        cartHash.each do |redeemItemIdStr, quantity|
            redeemItem = RedeemItem.find(redeemItemIdStr.to_i)
            total_points += (redeemItem.points * quantity)
        end

        order = Order.new(
            ordered_by_id: employee.id,
            email: employee.email,
            total_points: total_points
        )
        if total_points <= employee.available_points && order.save
            cartHash.each do |redeemItemIdStr, quantity|
                redeemItem = RedeemItem.find(redeemItemIdStr.to_i)
                OrderItem.create(
                    order_id: order.id,
                    redeem_item_id: redeemItem.id,
                    quantity: quantity,
                    sub_total_points: redeemItem.points * quantity
                )
            end
            employee.available_points -= total_points
            employee.save
            render json: {'status': 'success'}
        else
            render json: {'status': 'failure'}
        end
    end

end
