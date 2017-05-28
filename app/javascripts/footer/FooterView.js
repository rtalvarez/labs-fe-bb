import BaseView from 'javascripts/shared/BaseView';
import FooterViewTpl from 'templates/footer/FooterView';

export default class extends BaseView({
    events: {
        'click .contact-action': 'navigateToAction',
        'click .home-action': 'navigateToAction',
        'click .appointment-action': 'navigateToAction',
        'click .about-action': 'navigateToAction',
        'click .profile-action': 'navigateToAction',
    }
}) {
    initialize(config) {
        super.initialize(config);

        _.bindAll(this,
            'navigateToAction');

        this.render(FooterViewTpl);
    }

    navigateToAction(evt) {
        this.navigate(evt);
    }
}
