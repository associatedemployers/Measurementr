import Ember from 'ember';

export default Ember.ArrayController.extend({
	activity: null,
	minutes: null,
	goalName: null,
	goalType: null,
	goalValue: null,
	goalTypes: [
		"step", "minute", "mile"
	],
	conversions: [
		{ l: "Aerobics, high intensity/bootcamp", v: 190 },{ l: "Aerobics, low intensity", v: 115 },{ l: "Aerobics, step", v: 145 },{ l: "Badminton", v: 125 },{ l: "Baseball/Softball", v: 125 },{ l: "Basketball, game", v: 220 },{ l: "Basketball, recreational", v: 130 },{ l: "Bowling", v: 55 },{ l: "Boxing, non-competitive", v: 131 },{ l: "Calisthenics, floor exercises", v: 106 },{ l: "Canoeing", v: 70 },{ l: "Cycling, leisurely", v: 75 },{ l: "Cycling, moderately", v: 150 },{ l: "Elliptical Trainer", v: 203 },{ l: "Golfing, walking, no cart", v: 100 },{ l: "Golfing, with a cart", v: 70 },{ l: "Handball", v: 190 },{ l: "Hiking", v: 155 },{ l: "In-line skating, leisurely", v: 84 },{ l: "Judo", v: 185 },{ l: "Kickboxing", v: 290 },{ l: "Orienteering", v: 151 },{ l: "Pilates", v: 101 },{ l: "Ping Pong", v: 90 },{ l: "Racquetball", v: 175 },{ l: "Roller Skating", v: 173 },{ l: "Rowing machine", v: 150 },{ l: "Running, intense", v: 325 },{ l: "Running, moderately", v: 205 },{ l: "Scuba Diving", v: 190 },{ l: "Skiing, water", v: 160 },{ l: "Skipping rope, fast", v: 285 },{ l: "Skipping rope, moderate", v: 167 },{ l: "Soccer", v: 144 },{ l: "Squash", v: 205 },{ l: "Stair climbing machine", v: 160 },{ l: "Swimming", v: 225 },{ l: "Tai Chi", v: 8 },{ l: "Tennis, doubles", v: 110 },{ l: "Tennis, singles", v: 160 },{ l: "Volleyball, game", v: 120 },{ l: "Volleyball, recreational", v: 70 },{ l: "Walking in water, leisurely", v: 49 },{ l: "Walking, normal pace", v: 100 },{ l: "Water Aerobics", v: 100 },{ l: "Weight Lifting", v: 67 },{ l: "Yoga", v: 100 },{ l: "Zumba/Dance Class", v: 175 }
	],
	todaysActivities: function () {
		return this.get('content').filter(function (activity) {
			var time = moment(activity.get('time_stamp'), "YYYY/MM/DD HH:mm:ss");
			return (moment().startOf('day').isBefore(time) && moment().endOf('day').isAfter(time));
		});
	}.property('content.@each'),
	formIsNotComplete: function () {
		return (this.get('activity') && parseFloat(this.get('minutes')) > 0) ? false : true;
	}.property('activity', 'minutes'),
	goalFormIsComplete: function () {
		return (this.get('goalType') && this.get('goalName') && parseFloat(this.get('goalValue')) > 0);
	}.property('goalType', 'goalName', 'goalValue'),
	dayTotals: function () {
		var model = this.get('todaysActivities'),
			stepTotal = 0,
			minuteTotal = 0;
		if (model.length > 0) {
			model.forEach(function (item) {
				stepTotal += parseFloat(item.get('steps'));
				minuteTotal += parseFloat(item.get('minutes'));
			});	
		}
		return {
			steps: stepTotal,
			miles: (stepTotal / 2112).toFixed(2),
			minutes: minuteTotal
		};
	}.property('todaysActivities'),
	allTotals: function () {
		var model = this.get('content').get('content'),
			stepTotal = 0,
			minuteTotal = 0;
		if (model.length > 0) {
			model.forEach(function (item) {
				stepTotal += parseFloat(item.get('steps'));
				minuteTotal += parseFloat(item.get('minutes'));
			});	
		}
		return {
			steps: stepTotal,
			miles: (stepTotal / 2112).toFixed(2),
			minutes: minuteTotal
		};
	}.property('content.@each', 'todaysActivities'),
	copyPasteData: function () {
		var html = "";
		this.get('todaysActivities').forEach(function (item) {
			html += item.get('steps') + ' steps - "' + item.get('activity') + '" for ' + item.get('minutes') + "min<br />";
			if(item.get('note')) {
				html += item.get('note') + "<br /><br />";
			} else {
				html += "<br />";
			}
		});
		return html;
	}.property('content.@each'),
	doTimeoutStatus: function () {
		var c = this,
			timingOut = c.get('timingOut');
		if(c.get('status')) {
			if(timingOut) {
				clearTimeout(timingOut);
			}
			c.set('timingOut', setTimeout(function () {
				c.set('status', null);
			}, 2000));
		}
	}.observes('status')
});