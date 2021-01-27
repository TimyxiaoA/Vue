import $ from 'jquery';
import './css/1.css';
// import './less/1.less';
// import './scss/1.scss';

$(function () {
	$('ul li:odd').css({ background: 'yellow' });
	$('ul li:even').css({ background: 'skyblue' });
});

class Person {
	static info = 'hello';
}
console.log(Person.info);

import Vue from 'vue';
import App from './components/App.vue';

const vm = new Vue({
	el: '#app',
	render: h => h(App)
});
