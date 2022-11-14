Rails.application.routes.draw do
  root 'static_pages#index'

  get '/boards', to: 'static_pages#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      get'/current-user', to: "current_user#index"
    end
  end

end
