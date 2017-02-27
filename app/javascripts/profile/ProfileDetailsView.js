import BaseView from 'javascripts/shared/BaseView';
import ProfileDetailsViewTpl from 'templates/profile/ProfileDetailsView';
import AppointmentCollection from 'javascripts/shared/AppointmentCollection';

export default class extends BaseView({
    events: {
        'click .profile-section-view': '_onProfileSectionViewClick'
    },
    collection: new AppointmentCollection(),
}) {
    initialize(config) {
        super.initialize(config);

        _.bindAll(this,
            '_onProfileSectionViewClick');

        this.render(ProfileDetailsViewTpl);
        console.log('col', this.collection);
    }

    _onProfileSectionViewClick(evt) {
        evt.preventDefault();

        const $target = $(evt.target);
        const viewName = $target.data('view');

        this.$el.find('.profile-section').removeClass('selected');
        $target.closest('.profile-section').addClass('selected');

        this.$el.find('.profile-details-section-content').addClass('hidden');
        this.$el.find(`.${viewName}`).removeClass('hidden');
    }
}