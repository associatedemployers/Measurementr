import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (timestamp) {
	var timeagoMoment = moment(timestamp, "YYYY/MM/DD HH:mm:ss");
	return timeagoMoment.fromNow();
});