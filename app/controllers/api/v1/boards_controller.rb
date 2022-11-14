class Api::V1::BoardsController < ApiController 
  def show
    render json: Board.find(params['id'])
  end
end