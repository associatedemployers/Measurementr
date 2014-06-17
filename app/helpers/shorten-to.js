import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(text, len) {
	return text.substring(0, len - 1);
});