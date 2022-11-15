class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :name, null: false
      t.integer :status, default: 0
      t.belongs_to :board, null: false
      t.timestamps
    end
  end
end