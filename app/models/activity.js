import DS from "ember-data";

var attribute = DS.attr;

export default DS.Model.extend({
	activity: attribute('string'),
	minutes: attribute('number'),
	note: attribute('string'),
	steps: attribute('number'),
	time_stamp: attribute('string', {
		defaultValue: function () {
			return moment().format("YYYY/MM/DD HH:mm:ss");
		}
	})
});