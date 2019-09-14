import Sequelize from "sequelize";

// Option 1: Passing parameters separately
const sequelize = new Sequelize('game_api', 'game_api_user', 'pw123', {
	host: 'localhost',
	dialect: "mysql",
});
