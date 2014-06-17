import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
});