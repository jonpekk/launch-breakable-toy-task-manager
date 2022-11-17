class Api::V1::CardsController < ApiController
  
  def create
    card = Card.new(card_params)
    board = Board.find(params["board"])
    card.board = Board.find(params["board"])
    if(verify_access(board) && card.save)
      render json: card.board
    else 
      render json: card.errors.full_messages, status: 401
    end
  end
  
  def update
    card = Card.find(params["card"]["id"])
    board = card.board
    if(verify_access(board) && card.update(card_params))
      render json: card.board
    else 
      render json: {errors: card.errors.full_messages}
    end
  end

  private

  def card_params
    params.require(:card).permit(:id, :name, :status)
  end

  def verify_access(board)
    board.user == current_user
  end
end