export default (config) => class extends Backbone.Model.extend(config) {
    sayHello() {
        console.log('hello');
    }
};