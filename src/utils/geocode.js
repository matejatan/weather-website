const request = require("request");

const geocode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=pk.eyJ1IjoibW1hdGVqIiwiYSI6ImNscmh3cnJmazAzczUyanA4MzFxbGhrb3cifQ.1Ce_H3XFuKq6-80NdXqtWQ&limit=1";

	request({ url, json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to location services", undefined);
			return;
		} else if (response.body.features.length === 0) {
			callback("Unable to find location. Try another search", undefined);
			return;
		}
		const { center, place_name } = response.body.features[0];
		const [longitude, latitude] = center;
		callback(undefined, {
			latitude,
			longitude,
			place_name,
		});
	});
};

module.exports = geocode;

// const geocodeURL =
// 	"https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=pk.eyJ1IjoibW1hdGVqIiwiYSI6ImNscmh3cnJmazAzczUyanA4MzFxbGhrb3cifQ.1Ce_H3XFuKq6-80NdXqtWQ&limit=1";

// request({ url: geocodeURL, json: true }, (error, response) => {
// 	if (error) {
// 		console.log("Unable to connect to the location services");
// 		return;
// 	} else if (response.body.features.length === 0) {
// 		console.log("Unable to find location try again with diffrent lcation");
// 		return;
// 	}

// 	console.log(
// 		response.body.features[0].center[1],
// 		response.body.features[0].center[0]
// 	);
// });
