import Ember from "ember";

var ReadMoreLessComponent = Ember.Component.extend({
	expanded: false,
	isLong: function () {
		return this.get('text').length > 15;
	}.property('text'),
	actions: {
		toggleProperty: function (val) {
			this.toggleProperty(val);
		}
	}
});

export default ReadMoreLessComponent;