import Ember from "ember";

var ActivityListItemComponent = Ember.Component.extend({
	computedSteps: function () {
		return this.get('convertSteps') * parseFloat(this.get('minutes'));
	}.property('convertSteps', 'minutes'),
	actions: {
		remove: function (act) {
			this.sendAction('deleteAction', act);
		}
	}
});

export default ActivityListItemComponent;
