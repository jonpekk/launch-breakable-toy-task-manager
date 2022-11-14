class CreateBoard < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.string :name, null: false
      t.string :shortcode, null: false
      t.string :description
      t.belongs_to :user, null: false
      t.timestamps
    end
  end
end
