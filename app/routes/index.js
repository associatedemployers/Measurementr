import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
		return this.store.find('activity');
	},
	setupController: function (controller, model) {
		controller.setProperties({
			content: model,
			goals: this.store.find('goal')
		});
	},
	actions: {
		createActivity: function () {
			var c = this.get('controller'),
				activity = this.store.createRecord('activity', {
					activity: c.get('activity.l'),
					minutes: c.get('minutes'),
					note: c.get('note'),
					steps: c.get('activity.v') * c.get('minutes')
				});
			activity.save().then(function () {
				c.setProperties({
					activity: null,
					minutes: null,
					note: null,
					status: "Successfully saved activity."
				});
			});
		},
		createGoal: function () {
			var c = this.get('controller'),
				goal = this.store.createRecord('goal', {
					name: c.get('goalName'),
					type: c.get('goalType'),
					value: c.get('goalValue')
				});
			goal.save().then(function () {
				c.setProperties({
					goalName: null,
					goalType: null,
					goalValue: null,
					addingGoal: false,
					status: "Successfully saved goal."
				});
			});
		},
		showModal: function (modal) {
			$(modal).modal('show');
		},
		removeActivity: function (activity) {
			activity.destroyRecord();
		},
		removeGoal: function (goal) {
			goal.destroyRecord();
		},
		removeAll: function () {
			if(!confirm("Are you sure you want to remove all your activities?")) {
				return;
			}
			this.store.findAll('activity').then(function (records) {
				records.toArray().forEach(function (record) {
					record.destroyRecord();
				});
			});
			
		},
		toggleProperty: function (val) {
			this.get('controller').toggleProperty(val);
		}
	}
});