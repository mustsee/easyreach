(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{354:function(t,e,r){"use strict";r.r(e);r(42),r(36),r(41),r(19),r(53),r(37),r(54);var n=r(8),o=r(15),c=(r(64),r(337),r(26)),h=r(56);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var O={transition:"default",computed:{currentUser:function(){return this.$store.state.user}},methods:l(l({},Object(h.b)({pageSignOut:"pageSignOut",isUserAuthorized:"isUserAuthorized"})),{},{showAuthContainer:function(){var t=this,e=r(339),n=e.auth.AuthUI.getInstance();n||(n=new e.auth.AuthUI(c.c));var o={signInOptions:[c.a.Google],signInFlow:"popup",callbacks:{signInSuccessWithAuthResult:function(e){return t.signInResult(e)}}};n.start("#firebaseui-auth-container",o)},signInResult:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.isUserAuthorized({email:t.user.email});case 2:return r.sent?e.$router.push("/arrivals"):e.$store.dispatch("pageSignOut").then((function(){return e.showAuthContainer()})),r.abrupt("return",!1);case 5:case"end":return r.stop()}}),r)})))()},isUserConnected:function(){if(this.currentUser.email)return this.$router.push("/arrivals");this.showAuthContainer()}}),activated:function(){this.isUserConnected()},mounted:function(){this.isUserConnected()}},d=r(35),component=Object(d.a)(O,(function(){this._self._c;return this._m(0)}),[function(){var t=this._self._c;return t("div",{staticClass:"flex justify-center mt-20"},[t("div",{attrs:{id:"firebaseui-auth-container"}})])}],!1,null,null,null);e.default=component.exports}}]);