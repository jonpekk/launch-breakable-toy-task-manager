require 'rails_helper'

RSpec.describe Api::V1::BoardsController, type: :controller do
  
  let!(:user_1){ User.create(email: "test@test.com", password: "testtest") }

  let!(:board_1){ Board.create(name: "Test Board", shortcode: "TEST", description: "Just testing the board creation", user: User.first) }

  describe "GET#show" do
    it "Should return the information about a specific movie" do
      get :show, params: {id: board_1}
      returned_json = JSON.parse(response.body)

      expect(returned_json['id']).to eq(board_1.id)
      expect(returned_json['user']['id']).to eq(board_1.user.id)
    end
  end
end