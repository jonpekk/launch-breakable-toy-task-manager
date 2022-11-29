class Api::V1::CurrentUserController < ApiController 
  def show
    user = User.find(params["id"])
    if(validate_user(user))
      render json: user
    else 
      render status: 401
    end
  end

  private

  def validate_user(user)
    user == current_user
  end
end