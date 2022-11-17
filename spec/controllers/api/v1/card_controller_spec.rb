require 'rails_helper'

RSpec.describe Api::V1::CardsController, type: :controller do

  let!(:user_1){User.create(email: "test@test.com", password: "testtest")}

  let!(:board_1){Board.create(name: "Test Board", shortcode: "TEST", description: "Just testing the board creation", user: User.first)}

  let!(:card_1){Card.create(name: "This is a test task", status: 0, board: Board.first)}

  describe "PATCH#update" do
    context "User makes a valid request" do
      it "Should return the entire board with the card's udpated status" do
        sign_in user_1
        
        patch :update, params: {card: {id: card_1.id, status: "done"}, id:card_1.id}

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq(200)

        expect(returned_json["id"]).to eq(card_1.id)
        expect(returned_json["cards"].last["status"]).to eq("done")
      end
    end
  end

  describe "POST#create" do
    context "User makes a valid request" do
      it "Should return the entire board with an additional card" do 
        sign_in user_1

        post :create, params: {
          card: {
          name: "something",
          },
          board: board_1.id
        }

        returned_json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(returned_json['id']).to eq(board_1.id)
      end
    end
  end
end