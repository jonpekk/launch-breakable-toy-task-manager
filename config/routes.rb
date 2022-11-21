Rails.application.routes.draw do
  root 'static_pages#index'

  get '/boards', to: 'static_pages#index'
  get '/boards/:id', to: 'static_pages#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      get'/current-user', to: "current_user#index"
      resources :boards, only: [:index, :show, :create, :destroy] do
        resources :cards, only: [:show, :create, :update]
      end
    end
  end
end
