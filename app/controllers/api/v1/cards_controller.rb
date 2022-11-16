class Api::V1::CardsController < ApiController
  def update
    card = Card.find(params["card"]["id"])
    if(card.update(card_params))
      render json: card.board
    else 
      render json: {errors: card.errors.full_messages}
    end
  end

  private

  def card_params
    params.require(:card).permit(:id, :status)
  end
end