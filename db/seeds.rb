user_1 = User.create(email: "test@test.com", password: "testtest")
user_2 = User.create(email: "user2@test.com", password: "secondTest")

board_1 = Board.create(name: "Test Board", shortcode: "TEST", description: "Just testing the board creation", user: User.first)
board_2 = Board.create(name: "Test Board", shortcode: "TEST", description: "Just testing the board creation", user: User.first)
board_3 = Board.create(name: "Test Board", shortcode: "TEST", description: "Just testing the board creation", user: User.first)
board_4 = Board.create(name: "Test Board", shortcode: "TEST", description: "Just testing the board creation", user: User.first)
