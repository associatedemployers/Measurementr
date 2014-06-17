import Ember from "ember";

var PercentBarComponent = Ember.Component.extend({
	styleCalc: function () {
		return "width: " + this.get('value') + "%";
	}.property('value'),
	complete: function () {
		return (this.get('value') >= 100);
	}.property('value')
});

export default PercentBarComponent;