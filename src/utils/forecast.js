const request = require("request");

const forecast = (latitude, longitude, callback) => {
	// const url =
	// 	"http://api.weatherstack.com/current?access_key=74736cfbab417343e9000319b6510900&query=" +
	// 	latitude +
	// 	"," +
	// 	longitude;

	// request({ url, json: true }, (error, response) => {
	// 	if (error) {
	// 		callback("Unable to conncet to weather service", undefined);
	// 	} else if (response.body.error) {
	// 		callback("Unable to find location", undefined);
	// 	} else {
	// 		const { weather_descriptions, temperature, feelslike } =
	// 			response.body.current;
	// 		callback(
	// 			undefined,
	// 			weather_descriptions +
	// 				". It is currently " +
	// 				temperature +
	// 				" degrees out." +
	// 				" But it feels like its " +
	// 				feelslike +
	// 				" degrees."
	// 		);
	// 	}
	// });
	callback(undefined, "the weather is realy nice");
};

module.exports = forecast;
