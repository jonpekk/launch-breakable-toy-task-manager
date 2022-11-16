require 'rails_helper'

RSpec.describe Api::V1::BoardsController, type: :controller do
  
  let!(:user_1){ User.create(email: "test@test.com", password: "testtest") }

  let!(:board_1){ Board.create(name: "Test Board", shortcode: "TEST", description: "Just testing the board creation", user: User.first) }

  let!(:card_1){Card.create(name: "This is a test task", status: 0, board: Board.first)}

  describe "GET#index" do
    it "should return all of the boards owned by a user" do
      sign_in user_1

      get :index
      returned_json = JSON.parse(response.body)
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq(1)
    end
  end

  describe "GET#show" do
    it "Should return the information about a specific card" do
      get :show, params: {id: board_1}
      returned_json = JSON.parse(response.body)

      expect(returned_json['id']).to eq(board_1.id)
      expect(returned_json['cards'].first['id']).to eq(card_1.id)
      expect(returned_json['user']['id']).to eq(board_1.user.id)
    end
  end
end