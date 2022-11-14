class Api::V1::CurrentUserController < ApiController 
  def index
    render json: current_user
  end
end