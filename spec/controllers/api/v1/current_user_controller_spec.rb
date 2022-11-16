require 'rails_helper'

RSpec.describe Api::V1::CurrentUserController, type: :controller do

  let!(:user_1){ User.create(email: "test@test.com", password: "testtest") }
  
  let!(:board_1){ Board.create(name: "Test Board", shortcode: "TEST", description: "Just testing the board creation", user: User.first) }
  let!(:board_2){ Board.create(name: "Test second", shortcode: "T2", description: "Just testing the second board creation", user: User.first) }

  describe "GET#index" do
    it "Should return the relevant user information" do

      sign_in user_1

      get :index
      returned_json = JSON.parse(response.body)

      expect(returned_json['id']).to eq(user_1.id)
      expect(returned_json['boards'].length).to eq(2)
    end
  end
end