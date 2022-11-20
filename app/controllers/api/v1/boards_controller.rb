class Api::V1::BoardsController < ApiController 
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

  private

  def board_params
    params.require(:board).permit(:name, :shortcode, :description)
  end
end