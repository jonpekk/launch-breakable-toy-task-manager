require 'rails_helper'

RSpec.describe Api::V1::CardsController, type: :controller do
  user_1 = User.create(email: "test@test.com", password: "testtest")

  board_1 = Board.create(name: "Test Board", shortcode: "TEST", description: "Just testing the board creation", user: User.first)

  card_1 = Card.create(name: "This is a test task", status: 0, board: Board.first)
  
  describe "PATCH#update" do
    context "User makes a valid request" do
      it "Should return the entire board with the card's udpated status" do
        patch :update, params: {card: {id: card_1, status: "done"}, id:card_1}

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq(200)

        expect(returned_json["id"]).to eq(board_1.id)
        expect(returned_json["cards"].last["status"]).to eq("done")

      end
    end
  end
end