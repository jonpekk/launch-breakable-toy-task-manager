class AddCardColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :card_attachment, :string
    add_column :cards, :description, :text
  end
end