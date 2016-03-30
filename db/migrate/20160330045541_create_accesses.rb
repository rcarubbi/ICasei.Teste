class CreateAccesses < ActiveRecord::Migration
  def change
    create_table :accesses do |t|
      t.string :guid
      t.string :url
      t.datetime :accessDateTime

      t.timestamps null: false
    end
  end
end
