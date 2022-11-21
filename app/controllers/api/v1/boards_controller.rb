class Api::V1::BoardsController < ApiController

  skip_before_action :verify_authenticity_token

  def index
    if current_user 
      render json: current_user.boards
    else 
      render json: "user invalid"
    end
  end

  def show
  
    render json: Board.find(params['id'])
  end

  def create
    board = Board.new(board_params)
    board.user = current_user
    if(board.save)
      render json: board
    else 
      render json: board.errors.full_messages
    end
  end

  def destroy
    board = Board.find(params["id"])
    if(verify_access(board))
      board.destroy
      render json: Board.all
    else
      render status: 401
    end
  end

  private

  def board_params
    params.require(:board).permit(:name, :shortcode, :description)
  end

  def verify_access(board)
    board.user == current_user
  end
end