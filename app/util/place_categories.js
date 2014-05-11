
module.exports = {
	
	automotive: {
		icon: 'https://foursquare.com/img/categories_v2/shops/automotive_64.png',
		pin: 'automotive.png',
		factual_ids: [ '3-19', '2' ],
	},
	
	community: {
		icon: 'https://foursquare.com/img/categories_v2/building/government_64.png',
		pin: 'community.png',
		factual_ids: [ '21-61', '20' ],
	},
	
	public_safety: {
		parent: 'community',
		icon: 'government.png',
		pin: 'community.png',
		factual_ids: [ '40-43'],
	},
	
	education: {
		parent: 'community',
		icon: 'https://foursquare.com/img/categories_v2/building/school_64.png',
		pin: 'community.png',
		factual_ids: [ '26-36', '23'],
	},

	religious: {
		parent: 'community',
		icon: 'https://foursquare.com/img/categories_v2/building/religious_church_64.png',
		pin: 'community.png',
		factual_ids: [ '53-58'],
		
		},
		
	healthcare: {
		icon: 'https://foursquare.com/img/categories_v2/building/medical_doctorsoffice_64.png',
		pin: 'healthcare.png',
		factual_ids: [ '63-106', '62' ],
	},
	
			
	pharmacies: {
		parent: 'healthcare',
		icon: 'https://foursquare.com/img/categories_v2/shops/pharmacy_64.png',
		pin: 'healthcare.png',
		factual_ids: [ '80' ],
	},
	
	landmarks: {
		icon: 'https://foursquare.com/img/categories_v2/arts_entertainment/historicsite_64.png',
		pin: 'landmarks.png',
		factual_ids: [ '108-122', '107' ],
	},
	
	nature: {
		parent: 'landmarks',
		icon: 'https://foursquare.com/img/categories_v2/parks_outdoors/outdoors_64.png',
		pin: 'landmarks.png',
		factual_ids: [ '114-117', '112' ],
	},
	
	beaches: {
		parent: 'landmarks',
		icon: 'https://foursquare.com/img/categories_v2/parks_outdoors/beach_64.png',
		pin: 'landmarks.png',
		factual_ids: [ '113' ],
	},
	
	parks: {
		parent: 'landmarks',
		icon: 'https://foursquare.com/img/categories_v2/parks_outdoors/park_64.png',
		pin: 'landmarks.png',
		factual_ids: [ '119-122', '118' ],
	},
	
	shopping: {
		icon: 'https://foursquare.com/img/categories_v2/shops/food_gourmet_64.png',
		pin: 'retail.png',
		factual_ids: [ '124-176', '123' ],
	},	
	
	services: {
		icon: 'https://foursquare.com/img/categories_v2/shops/hardware_64.png',
		pin: 'services.png',
		factual_ids: [ '178-307', '177' ],
	},	
	
	entertainment: {
		icon: 'https://foursquare.com/img/categories_v2/arts_entertainment/performingarts_theater_64.png',
		pin: 'social.png',
		factual_ids: [ '309-337', '369-371', '308' ],
	},	
	
	food: {
		icon: 'https://foursquare.com/img/categories_v2/food/default_64.png',
		pin: 'restaurants.png',
		factual_ids: [ '339-368', '338' ],
	},
	
	coffee_shop: {
		parent: 'food',
		icon: 'https://foursquare.com/img/categories_v2/food/coffeeshop_64.png',
		factual_ids: [ '342' ]
	},
	
		
	recreation: {
		icon: 'https://foursquare.com/img/categories_v2/arts_entertainment/stadium_baseball_64.png',
		pin: 'sports.png',
		factual_ids: [ '373-414', '372' ],
	},
	
	transport: {
		icon: 'https://foursquare.com/img/categories_v2/travel/busstation_64.png',
		pin: 'transport.png',
		factual_ids: [ '416-429', '415' ],
	},
	
	lodging: {
		icon: 'https://foursquare.com/img/categories_v2/travel/busstation_64.png',
		pin: 'travel.png',
		factual_ids: [ '431-440', '430' ],
	}
}
