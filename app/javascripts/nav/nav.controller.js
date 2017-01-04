import NavTpl from 'templates/nav/nav';

export default class NavCtrl {
    constructor() {
        console.log('constructed nav view');
        this.render();
    }
    
    render() {
        this.template = require('templates/nav/nav');
        console.log('template', this.template({ trolls: 'TROLLS' }));
        console.log('template import', NavTpl);
    }
}