import Ember from "ember";

var GoalController = Ember.ObjectController.extend({
	needs: ['index'],
	allTotals: Ember.computed.alias('controllers.index.allTotals'),
	dayTotals: Ember.computed.alias('controllers.index.dayTotals'),

	relevantAllTotal: function () {
		var type = this.get('type'),
			totals = this.get('allTotals');
		return (type === "mile") ? totals.miles : (type === "step") ? totals.steps : (type === "minute") ? totals.minutes : 0;
	}.property('allTotals'),
	
	relevantDayTotal: function () {
		var type = this.get('type'),
			totals = this.get('dayTotals');
		return (type === "mile") ? totals.miles : (type === "step") ? totals.steps : (type === "minute") ? totals.minutes : 0;
	}.property('dayTotals'),

	percent: function () {
		return Math.round( ( (this.get('relevantAllTotal') / this.get('value')) * 100) );
	}.property('relevantAllTotal', 'type', 'value'),

	daysToComplete: function () {
		return (this.get('relevantDayTotal') > 0) ? "around " + Math.ceil(this.get('value') / this.get('relevantDayTotal')) + " days" : "forever";
	}.property('relevantDayTotal', 'value'),
	
	valueLeft: function () {
		return this.get('value') - this.get('relevantAllTotal');
	}.property('relevantAllTotal', 'value'),

	actions: {
		toggleStats: function () {
			this.toggleProperty('showingStats');
		}
	}
});

export default GoalController;