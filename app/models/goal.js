import DS from "ember-data";

var attribute = DS.attr;

export default DS.Model.extend({
	name: attribute('string'),
	type: attribute('string'),
	value: attribute('number'),
	time_stamp: attribute('string', {
		defaultValue: function () {
			return moment().format("YYYY/MM/DD HH:mm:ss");
		}
	})
});