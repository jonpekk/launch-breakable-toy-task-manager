class Api::V1::BoardsController < ApiController 
  def index
    if current_user 
      render json: current_user.boards
    end
  end
  def show
    render json: Board.find(params['id'])
  end
end