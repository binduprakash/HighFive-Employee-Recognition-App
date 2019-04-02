Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :employees, only: [:index, :show, :update]
      resources :points_levels, only: [:index, :show]
      resources :rewards, only: [:index, :show, :update, :create]
      resources :redeem_items, only: [:index, :show]
      resources :orders, only: [:index, :show, :create]
      resources :order_items, only: [:index, :show, :create]
      post '/authenticate' => 'sessions#authenticate'
    end
  end
end
