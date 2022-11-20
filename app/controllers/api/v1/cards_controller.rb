class Api::V1::CardsController < ApiController

  skip_before_action :verify_authenticity_token

  def show
    card = Card.find(params["id"])
    board = Board.find(params["board_id"])

    if(verify_access(board))
      render json: card
    end
  end

  def create
    card = Card.new(create_card_params)
    board = Board.find(params["board_id"])
    card.board = board
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

  def create_card_params
    params.permit(:id, :name, :status, :description, :card_attachment)
  end

  def verify_access(board)
    board.user == current_user
  end
end