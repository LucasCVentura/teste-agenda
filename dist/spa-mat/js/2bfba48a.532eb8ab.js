(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2bfba48a"],{"0192":function(e,t,a){},1331:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=(0,r.regex)("integer",/(^[0-9]*$)|(^-[0-9]+$)/);t.default=n},"15ed":function(e,t,a){"use strict";var r=a("5c54"),n=a.n(r);n.a},"2a12":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(e){return(0,r.withParams)({type:"maxLength",max:e},function(t){return!(0,r.req)(t)||(0,r.len)(t)<=e})};t.default=n},"2ab5":function(e,t,a){},3360:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,r.withParams)({type:"and"},function(){for(var e=this,a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return t.length>0&&t.reduce(function(t,a){return t&&a.apply(e,r)},!0)})};t.default=n},"3a54":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=(0,r.regex)("alphaNum",/^[a-zA-Z0-9]*$/);t.default=n},"3a60":function(e,t,a){(function(t,a){e.exports=a()})(0,function(){return function(e){function t(r){if(a[r])return a[r].exports;var n=a[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var a={};return t.m=e,t.c=a,t.i=function(e){return e},t.d=function(e,a,r){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p=".",t(t.s=10)}([function(e,t){e.exports={"#":{pattern:/\d/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,transform:function(e){return e.toLocaleUpperCase()}},a:{pattern:/[a-zA-Z]/,transform:function(e){return e.toLocaleLowerCase()}},"!":{escape:!0}}},function(e,t,a){"use strict";function r(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!0),t}var n=a(2),i=a(0),o=a.n(i);t.a=function(e,t){var i=t.value;if((Array.isArray(i)||"string"==typeof i)&&(i={mask:i,tokens:o.a}),"INPUT"!==e.tagName.toLocaleUpperCase()){var s=e.getElementsByTagName("input");if(1!==s.length)throw new Error("v-mask directive requires 1 input, found "+s.length);e=s[0]}e.oninput=function(t){if(t.isTrusted){var o=e.selectionEnd,s=e.value[o-1];for(e.value=a.i(n.a)(e.value,i.mask,!0,i.tokens);o<e.value.length&&e.value.charAt(o-1)!==s;)o++;e===document.activeElement&&(e.setSelectionRange(o,o),setTimeout(function(){e.setSelectionRange(o,o)},0)),e.dispatchEvent(r("input"))}};var c=a.i(n.a)(e.value,i.mask,!0,i.tokens);c!==e.value&&(e.value=c,e.dispatchEvent(r("input")))}},function(e,t,a){"use strict";var r=a(6),n=a(5);t.a=function(e,t){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=arguments[3];return Array.isArray(t)?a.i(n.a)(r.a,t,o)(e,t,i,o):a.i(r.a)(e,t,i,o)}},function(e,t,a){"use strict";function r(e){e.component(c.a.name,c.a),e.directive("mask",o.a)}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),i=a.n(n),o=a(1),s=a(7),c=a.n(s);a.d(t,"TheMask",function(){return c.a}),a.d(t,"mask",function(){return o.a}),a.d(t,"tokens",function(){return i.a}),a.d(t,"version",function(){return l});var l="0.11.1";t.default=r,"undefined"!=typeof window&&window.Vue&&window.Vue.use(r)},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),n=a(0),i=a.n(n),o=a(2);t.default={name:"TheMask",props:{value:[String,Number],mask:{type:[String,Array],required:!0},masked:{type:Boolean,default:!1},tokens:{type:Object,default:function(){return i.a}}},directives:{mask:r.a},data:function(){return{lastValue:null,display:this.value}},watch:{value:function(e){e!==this.lastValue&&(this.display=e)},masked:function(){this.refresh(this.display)}},computed:{config:function(){return{mask:this.mask,tokens:this.tokens,masked:this.masked}}},methods:{onInput:function(e){e.isTrusted||this.refresh(e.target.value)},refresh:function(e){this.display=e;e=a.i(o.a)(e,this.mask,this.masked,this.tokens);e!==this.lastValue&&(this.lastValue=e,this.$emit("input",e))}}}},function(e,t,a){"use strict";function r(e,t,a){return t=t.sort(function(e,t){return e.length-t.length}),function(r,n){for(var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=0;o<t.length;){var s=t[o];o++;var c=t[o];if(!(c&&e(r,c,!0,a).length>s.length))return e(r,s,i,a)}return""}}t.a=r},function(e,t,a){"use strict";function r(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=arguments[3];e=e||"",t=t||"";for(var n=0,i=0,o="";n<t.length&&i<e.length;){var s=t[n],c=r[s],l=e[i];c&&!c.escape?(c.pattern.test(l)&&(o+=c.transform?c.transform(l):l,n++),i++):(c&&c.escape&&(n++,s=t[n]),a&&(o+=s),l===s&&i++,n++)}for(var u="";n<t.length&&a;){s=t[n];if(r[s]){u="";break}u+=s,n++}return o+u}t.a=r},function(e,t,a){var r=a(8)(a(4),a(9),null,null);e.exports=r.exports},function(e,t){e.exports=function(e,t,a,r){var n,i=e=e||{},o=typeof e.default;"object"!==o&&"function"!==o||(n=e,i=e.default);var s="function"==typeof i?i.options:i;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),a&&(s._scopeId=a),r){var c=s.computed||(s.computed={});Object.keys(r).forEach(function(e){var t=r[e];c[e]=function(){return t}})}return{esModule:n,exports:i,options:s}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("input",{directives:[{name:"mask",rawName:"v-mask",value:e.config,expression:"config"}],attrs:{type:"text"},domProps:{value:e.display},on:{input:e.onInput}})},staticRenderFns:[]}},function(e,t,a){e.exports=a(3)}])})},"45b8":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=(0,r.regex)("numeric",/^[0-9]*$/);t.default=n},"46bc":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(e){return(0,r.withParams)({type:"maxValue",max:e},function(t){return!(0,r.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t<=+e})};t.default=n},4917:function(e,t,a){"use strict";var r=a("cb7c"),n=a("9def"),i=a("0390"),o=a("5f1b");a("214f")("match",1,function(e,t,a,s){return[function(a){var r=e(this),n=void 0==a?void 0:a[t];return void 0!==n?n.call(a,r):new RegExp(a)[t](String(r))},function(e){var t=s(a,e,this);if(t.done)return t.value;var c=r(e),l=String(this);if(!c.global)return o(c,l);var u=c.unicode;c.lastIndex=0;var f,d=[],m=0;while(null!==(f=o(c,l))){var p=String(f[0]);d[m]=p,""===p&&(c.lastIndex=i(l,n(c.lastIndex),u)),m++}return 0===m?null:d}]})},"4b0c":function(e,t,a){},"5c54":function(e,t,a){},"5d75":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,i=(0,r.regex)("email",n);t.default=i},"5db3":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(e){return(0,r.withParams)({type:"minLength",min:e},function(t){return!(0,r.req)(t)||(0,r.len)(t)>=e})};t.default=n},6235:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=(0,r.regex)("alpha",/^[a-zA-Z]*$/);t.default=n},"62e4":function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},6417:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(e){return(0,r.withParams)({type:"not"},function(t,a){return!(0,r.req)(t)||!e.call(this,t,a)})};t.default=n},"772d":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,i=(0,r.regex)("url",n);t.default=i},"78ef":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"withParams",{enumerable:!0,get:function(){return r.default}}),t.regex=t.ref=t.len=t.req=void 0;var r=n(a("8750"));function n(e){return e&&e.__esModule?e:{default:e}}function i(e){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}var o=function(e){if(Array.isArray(e))return!!e.length;if(void 0===e||null===e)return!1;if(!1===e)return!0;if(e instanceof Date)return!isNaN(e.getTime());if("object"===i(e)){for(var t in e)return!0;return!1}return!!String(e).length};t.req=o;var s=function(e){return Array.isArray(e)?e.length:"object"===i(e)?Object.keys(e).length:String(e).length};t.len=s;var c=function(e,t,a){return"function"===typeof e?e.call(t,a):a[e]};t.ref=c;var l=function(e,t){return(0,r.default)({type:e},function(e){return!o(e)||t.test(e)})};t.regex=l},8750:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r="web"===Object({NODE_ENV:"production",CLIENT:!0,SERVER:!1,DEV:!1,PROD:!0,THEME:"mat",MODE:"spa",VUE_ROUTER_MODE:"hash",VUE_ROUTER_BASE:"",APP_URL:"undefined"}).BUILD?a("cb69").withParams:a("0234").withParams,n=r;t.default=n},"8cd5":function(e,t,a){"use strict";(function(e,a){
/*!
*   Gerador e Validador de CPF v3.1.3
*   http://tiagoporto.github.io/gerador-validador-cpf
*   Copyright (c) 2014-2018 Tiago Porto (http://tiagoporto.com)
*   Released under the MIT license
*/
var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};(function(){var n="object"===("undefined"===typeof self?"undefined":r(self))&&self.self===self&&self||"object"===("undefined"===typeof e?"undefined":r(e))&&e.global===e&&e||this,i=function(){};t.nodeType?n.CPF=i:(!a.nodeType&&a.exports&&(t=a.exports=i),t.CPF=i);var o=function(e){for(var t=null,a=0;a<9;++a)t+=e.toString().charAt(a)*(10-a);var r=t%11,n=r<2?0:11-r;return n},s=function(e){for(var t=null,a=0;a<10;++a)t+=e.toString().charAt(a)*(11-a);var r=t%11,n=r<2?0:11-r;return n},c=function(e,t){var a=".",r="-";return"digits"===t?(a="",r=""):"checker"===t&&(a="",r="-"),e.length>11?"The value contains error. Has more than 11 digits.":e.length<11?"The value contains error. Has fewer than 11 digits.":e.slice(0,3)+a+e.slice(3,6)+a+e.slice(6,9)+r+e.slice(9,11)};i.generate=function(e){for(var t="",a=0;a<9;++a)t+=String(Math.floor(9*Math.random()));var r=o(t),n=t+r+s(t+r);return c(n,e)},i.validate=function(e){if(e&&!0!==e){"number"===typeof e&&(e=String(e));var t=e.replace(/\.|-|\s/g,""),a=t.substring(0,9),r=t.substring(9,11);if(11!==t.length)return!1;for(var n=0;n<10;n++)if(""+a+r===Array(12).join(n))return!1;var i=o(a),c=s(""+a+i);return r.toString()===i.toString()+c.toString()}},i.format=function(e,t){if(e){var a=e.replace(/[^\d]/g,"");return c(a,t)}}})()}).call(this,a("c8ba"),a("62e4")(e))},"91d3":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":";return(0,r.withParams)({type:"macAddress"},function(t){if(!(0,r.req)(t))return!0;if("string"!==typeof t)return!1;var a="string"===typeof e&&""!==e?t.split(e):12===t.length||16===t.length?t.match(/.{2}/g):null;return null!==a&&(6===a.length||8===a.length)&&a.every(i)})};t.default=n;var i=function(e){return e.toLowerCase().match(/^[0-9a-f]{2}$/)}},9336:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-layout",{staticClass:"window-height block",attrs:{view:"lHh Lpr lFf"}},[a("q-page-container",{staticClass:"page-flexbox"},[a("medi-menu",{attrs:{config:"cadastro"}}),a("main",{staticClass:"flex-grow-1",on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.$refs.step.$el.click()}}},[a("keep-alive",[a(e.$route.params.step,{ref:"form",tag:"component",attrs:{caminhoAssistente:e.caminhoAssistente,usuario:e.usuario},on:{routes:e.routesControl,button:e.buttonControl}})],1)],1),a("footer",{staticClass:"flex justify-between"},[a("q-btn",{staticClass:"text-azul1 bg-white no-shadow",attrs:{size:"17px",icon:"fas fa-arrow-left",outline:"",round:""},on:{click:e.prevStep}}),a("q-btn",{ref:"step",staticClass:"q-py-md bg-azul1 text-white",class:e.$q.screen.lt.md?"q-px-lg":"q-px-xl",attrs:{label:e.$t("cadastro.proximo"),"icon-right":"fas fa-arrow-right",disabled:e.disabled,loading:e.loading},on:{click:function(t){e.updateForm(),e.nextStep()}}})],1)],1)],1)},n=[];r._withStripped=!0;a("551c"),a("a481");var i=a("3156"),o=a.n(i),s=(a("7f7f"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"full-width"},[a("img",{staticClass:"q-mx-auto q-mb-xl assist-center",attrs:{src:e.caminhoAssistente,alt:"Assistente"}}),a("div",{staticClass:"row"},[a("q-field",{staticClass:"col-md-8 col-xs-10 offset-md-2 offset-xs-1",attrs:{error:e.$v.nome.$error||e.validateName,"error-label":e.$t("cadastro.nomeCompletoError")}},[a("q-input",{attrs:{"float-label":e.$t("cadastro.nomeCompleto")},on:{blur:e.$v.nome.$touch,keyup:e.$v.nome.$touch},model:{value:e.nome,callback:function(t){e.nome=t},expression:"nome"}})],1),a("q-field",{staticClass:"col-md-8 col-xs-10 offset-md-2 offset-xs-1 q-mt-md q-mb-xl",attrs:{error:e.$v.email.$error,"error-label":e.$t("cadastro.emailError")}},[a("q-input",{attrs:{"float-label":e.$t("cadastro.email"),disable:e.disable,"lower-case":""},on:{blur:e.$v.email.$touch,keyup:e.$v.email.$touch},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1)],1),a("div",{staticClass:"check_email"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checkemail,expression:"checkemail"}],attrs:{type:"checkbox",id:"checkbox"},domProps:{checked:Array.isArray(e.checkemail)?e._i(e.checkemail,null)>-1:e.checkemail},on:{change:function(t){var a=e.checkemail,r=t.target,n=!!r.checked;if(Array.isArray(a)){var i=null,o=e._i(a,i);r.checked?o<0&&(e.checkemail=a.concat([i])):o>-1&&(e.checkemail=a.slice(0,o).concat(a.slice(o+1)))}else e.checkemail=n}}}),a("label",{attrs:{for:"checkbox"},domProps:{innerHTML:e._s(e.$t("cadastro.emailFrase"))}})]),a("q-dialog",{on:{ok:function(t){return e.$router.push("/login")}},scopedSlots:e._u([{key:"buttons",fn:function(e){return[a("q-btn",{attrs:{flat:"",label:"Entrar"},on:{click:e.ok}}),a("q-btn",{attrs:{flat:"",label:"Cancelar"},on:{click:e.cancel}})]}}]),model:{value:e.dialogEmail,callback:function(t){e.dialogEmail=t},expression:"dialogEmail"}},[a("span",{attrs:{slot:"title"},domProps:{innerHTML:e._s(e.$t("cadastro.dialogEmailTitulo"))},slot:"title"}),a("span",{attrs:{slot:"message"},domProps:{innerHTML:e._s(e.$t("cadastro.dialogEmailMensagem"))},slot:"message"})])],1)}),c=[];s._withStripped=!0;a("4917");var l=a("b5ae"),u={props:{usuario:Object,caminhoAssistente:String},validations:{email:{email:l["email"],required:l["required"]},nome:{required:l["required"]}},data:function(){return{nome:"",email:"",validateName:!1,stepValidation:!1,dialogEmail:!1,disable:!1,checkemail:!0}},computed:{formValidation:function(){return{nomeRequired:this.$v.nome.$error,nomeValid:this.validateName,emailValid:this.$v.email.$error}}},mounted:function(){this.nome=this.usuario.nome?this.usuario.nome:"",this.email=this.usuario.email?this.usuario.email:"",this.usuario.nome&&this.usuario.email&&(this.disable=!0,this.$emit("button",!1),this.stepValidation=!0)},activated:function(e){this.$emit("routes",{prevPage:"",nextPage:"cpf"}),this.stepValidation?this.$emit("button",!1):this.$emit("button",!0)},watch:{nome:function(){this.validateName=!this.nome.match(/([a-z]+[\w]* [a-z]+[\w]*)/i)},formValidation:function(e){!this.nome||e.nomeRequired||e.nomeValid||!this.email||e.emailValid?(this.$emit("button",!0),this.stepValidation=!1):(this.$emit("button",!1),this.stepValidation=!0)}},methods:{setForm:function(){this.$store.dispatch("cadastroStep1",[this.nome,this.email,this.checkemail])},emailFound:function(){this.dialogEmail=!0}}},f=u,d=(a("f95e"),a("2877")),m=Object(d["a"])(f,s,c,!1,null,null,null);m.options.__file="nome.vue";var p=m.exports,h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"full-width"},[a("div",{staticClass:"q-mb-md assist-left-container row"},[a("div",{staticClass:"col-xs-12 col-sm-4 col-md-3 offset-md-1 offset-sm-0"},[a("img",{staticClass:"assist-left",attrs:{src:e.caminhoAssistente,alt:"Assistente",align:"middle"}})]),a("div",{staticClass:"col-xs-12 col-sm-8 text-left q-headline text-azul1 assistente-sidetext"},[a("span",{domProps:{innerHTML:e._s(e.$t("cadastro.bemVindo"))}}),a("span",{staticClass:"capitalize"},[e._v(" "+e._s(this.usuario.nome.split(" ")[0]))])])]),a("div",{staticClass:"row"},[a("q-field",{staticClass:"col-md-8 col-xs-10 offset-md-2 offset-xs-1",attrs:{error:e.$v.cpf.$error||e.erroCPF,"error-label":e.$t("cadastro.cpfError")}},["false"===e.docMask?a("q-input",{attrs:{"float-label":e.$t("cadastro.cpf")},on:{blur:e.$v.cpf.$touch},model:{value:e.cpf,callback:function(t){e.cpf=t},expression:"cpf"}}):a("q-input",{directives:[{name:"mask",rawName:"v-mask",value:e.docMask,expression:"docMask"}],attrs:{"float-label":e.$t("cadastro.cpf")},on:{blur:e.$v.cpf.$touch},model:{value:e.cpf,callback:function(t){e.cpf=t},expression:"cpf"}})],1),"true"===e.isMultiDocumento?a("q-field",{staticClass:"col-md-8 col-xs-10 offset-md-2 offset-xs-1 q-mt-sm q-mb-md",attrs:{error:e.$v.rg.$error,"error-label":e.$t("cadastro.rgError")}},[a("q-input",{attrs:{"float-label":e.$t("cadastro.rg")},on:{keyup:e.$v.rg.$touch,blur:e.$v.rg.$touch},model:{value:e.rg,callback:function(t){e.rg=t},expression:"rg"}})],1):e._e(),a("q-field",{staticClass:"col-md-8 col-xs-10 offset-md-2 offset-xs-1 q-mb-xl text-right sexo",attrs:{label:e.$t("cadastro.sexo")}},[a("q-btn-toggle",{attrs:{color:"grey","toggle-color":e.sexoColor,options:[{label:e.$t("cadastro.sexoF"),value:"F"},{label:e.$t("cadastro.sexoM"),value:"M"}],"no-caps":""},model:{value:e.sexo,callback:function(t){e.sexo=t},expression:"sexo"}})],1)],1),a("q-modal",{attrs:{"content-classes":"bg-fundo"},model:{value:e.modalCpf,callback:function(t){e.modalCpf=t},expression:"modalCpf"}},[a("q-modal-layout",{staticClass:"layout-agenda"},[a("div",{staticClass:"page-flexbox",style:e.$q.screen.gt.sm?"min-height: 45vh":""},[a("header",[a("q-btn",{directives:[{name:"close-overlay",rawName:"v-close-overlay"}],staticClass:"text-explicativo no-shadow float-right",attrs:{icon:"fas fa-times"}})],1),a("main",{staticClass:"flex-grow-1"},[a("div",{staticClass:"row"},[a("div",{staticClass:"q-display-1 q-mb-sm q-mt-none text-azul1 col-10 offset-1",domProps:{innerHTML:e._s(e.$t("cadastro.modalCpfTitulo"))}}),a("div",{staticClass:"q-title q-mt-sm q-mb-md text-azul1 col-xs-12 col-md-8 offset-md-2",domProps:{innerHTML:e._s(e.$t("cadastro.modalCpfMensagem1")+" "+e.emailRetorno)}}),a("div",{staticClass:"q-title q-mt-lg q-mb-md text-cinza1 col-xs-12 col-md-8 offset-md-2",domProps:{innerHTML:e._s(e.$t("cadastro.modalCpfMensagem2"))}}),a("div",{staticClass:"q-title q-mt-sm q-mb-md text-cinza1 col-xs-12 col-md-8 offset-md-2",domProps:{innerHTML:e._s(e.$t("cadastro.modalCpfMensagem3"))}})])]),a("footer",{staticClass:"row"},[a("q-btn",{staticClass:"col-xs-4 offset-xs-1 q-mt-xl q-py-md bg-white text-azul1",attrs:{icon:"fas fa-arrow-left",label:e.$t("cadastro.entrar"),to:"/login"}}),a("q-btn",{staticClass:"col-xs-4 offset-xs-2 q-mt-xl q-py-md bg-azul1 text-white",attrs:{label:e.$t("cadastro.alterar"),loading:e.loading},on:{click:e.atualizar}})],1)])])],1)],1)},v=[];h._withStripped=!0;a("28a5");var b=a("3a60"),g=a("dde5"),x=a("8cd5"),y=a.n(x),$={directives:{mask:b["mask"]},validations:function(){return"false"===this.isMultiDocumento?{cpf:{required:l["required"]},sexo:{required:l["required"]}}:{cpf:{required:l["required"]},rg:{required:l["required"]},sexo:{required:l["required"]}}},props:{usuario:Object,caminhoAssistente:String},data:function(){return{rg:"",cpf:"",sexo:null,erroCPF:!1,sexoColor:"",stepValidation:!1,modalCpf:!1,emailRetorno:"",emailAntigo:"",loading:!1,docMask:this.$store.state.config.docMask,validarCpf:this.$store.state.config.validarCpf,isMultiDocumento:this.$store.state.config.multiDocumento}},computed:{formValidation:function(){var e=void 0!==this.$v.rg&&this.$v.rg.$error;return{cpfRequired:this.$v.cpf.$error,cpfValid:this.erroCPF,rgRequired:e,sexoRequired:this.sexo}}},mounted:function(){this.sexo=this.usuario.sexo?this.usuario.sexo:"",this.cpf=this.usuario.cpf?this.usuario.cpf:""},activated:function(){this.$emit("routes",{prevPage:"nome",nextPage:"nasc"}),this.stepValidation?this.$emit("button",!1):this.$emit("button",!0)},watch:{cpf:function(){"TRUE"===this.validarCpf&&(y.a.validate(this.cpf)?this.erroCPF=!1:this.erroCPF=!0)},sexo:function(){"M"===this.sexo?this.sexoColor="azul1":this.sexoColor="purpura"},formValidation:function(e){var t="false"===this.isMultiDocumento||this.rg;this.cpf&&!e.cpfRequired&&!e.cpfValid&&t&&!e.rgRequired&&e.sexoRequired?(this.$emit("button",!1),this.stepValidation=!0):(this.$emit("button",!0),this.stepValidation=!1)}},methods:{atualizar:function(){var e=this;this.loading=!0,new Promise(function(t,a){Object(g["e"])(e.emailAntigo,e.usuario.email,e.cpf.replace(/\D/g,""),t,a)}).finally(function(){e.loading=!1,e.$router.push("/login")})},setForm:function(){this.$store.dispatch("cadastroStep2",[this.cpf,this.rg,this.sexo])},cpfFound:function(e){var t,a=e.split("@")[0],r=e.split("@")[1];t=a.length>2?a.replace(/\B(.)(?!$)/g,"*")+"@"+r:a.replace(/./g,"*")+"@"+r,this.emailRetorno=t,this.emailAntigo=e,this.modalCpf=!0}}},q=$,P=(a("b786"),Object(d["a"])(q,h,v,!1,null,null,null));P.options.__file="cpf.vue";var k=P.exports,_=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"full-width"},[a("img",{staticClass:"q-mx-auto q-mb-xl assist-center",attrs:{src:e.caminhoAssistente,alt:"Assistente"}}),a("div",{staticClass:"row"},[a("q-field",{staticClass:"col-md-8 col-xs-10 offset-md-2 offset-xs-1",attrs:{error:e.$v.dataNasc.$error||e.errorData,"error-label":e.$t("cadastro.dataNascError")}},[a("q-input",{directives:[{name:"mask",rawName:"v-mask",value:"##/##/####",expression:"'##/##/####'"}],staticClass:"col-md-8 col-xs-10 offset-md-2 offset-xs-1",attrs:{placeholder:e.formatoData,after:[{icon:"date_range"}],"float-label":e.$t("cadastro.dataNasc")},on:{blur:e.$v.dataNasc.$touch,keyup:e.$v.dataNasc.$touch},model:{value:e.dataNasc,callback:function(t){e.dataNasc=t},expression:"dataNasc"}})],1),a("q-field",{staticClass:"col-md-8 col-xs-10 offset-md-2 offset-xs-1 q-mt-md q-mb-xl",attrs:{error:e.$v.telefone.$error,"error-label":e.$t("cadastro.telefoneError")}},[a("q-input",{directives:[{name:"mask",rawName:"v-mask",value:e.telMask,expression:"telMask"}],attrs:{placeholder:"",after:[{icon:"phone"}],"float-label":e.$t("cadastro.telefone")},on:{blur:e.$v.telefone.$touch,keyup:e.$v.telefone.$touch},model:{value:e.telefone,callback:function(t){e.telefone=t},expression:"telefone"}})],1)],1),a("div",{staticClass:"check_sms"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checksms,expression:"checksms"}],attrs:{type:"checkbox",id:"checkbox"},domProps:{checked:Array.isArray(e.checksms)?e._i(e.checksms,null)>-1:e.checksms},on:{change:function(t){var a=e.checksms,r=t.target,n=!!r.checked;if(Array.isArray(a)){var i=null,o=e._i(a,i);r.checked?o<0&&(e.checksms=a.concat([i])):o>-1&&(e.checksms=a.slice(0,o).concat(a.slice(o+1)))}else e.checksms=n}}}),a("label",{attrs:{for:"checkbox"},domProps:{innerHTML:e._s(e.$t("cadastro.smsFrase"))}})])])},w=[];_._withStripped=!0;a("e7d8");var C={directives:{mask:b["mask"]},validations:{dataNasc:{required:l["required"]},telefone:{required:l["required"]}},props:{usuario:Object,caminhoAssistente:String},data:function(){return{dataNasc:"",telefone:"",errorData:!1,stepValidation:!1,formatoData:"dd/mm/aaaa",telMask:this.$store.state.config.telMask,checksms:!0}},computed:{formValidation:function(){return{dataNascRequired:this.$v.dataNasc.$error,dataNascValid:this.errorData,telRequired:this.$v.telefone.$error}}},created:function(){this.formatoData=this.$store.state.config.formatoDataIngles?"mm/dd/yyyy":"dd/mm/aaaa"},mounted:function(){this.dataNasc=this.usuario.dataNasc?this.usuario.dataNasc:""},activated:function(){this.$emit("routes",{prevPage:"cpf",nextPage:"senha"}),this.stepValidation?this.$emit("button",!1):this.$emit("button",!0)},watch:{dataNasc:function(){var e=this.dataNasc.split("/"),t=this.$store.state.config.formatoDataIngles?this.dataNasc.match(/(1[0-2]|0[1-9])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d\d\d\d/i):this.dataNasc.match(/(0[1-9]|[1-2][0-9]|3[0-1])\/(1[0-2]|0[1-9])\/\d\d\d\d/i);!t||new Date("".concat(e[1],"/").concat(e[0],"/").concat(e[2]))>Date.now()?this.errorData=!0:this.errorData=!1},formValidation:function(e){this.dataNasc&&!e.dataNascRequired&&!e.dataNascValid&&!e.telRequired&&this.telefone.length>=10?(this.$emit("button",!1),this.stepValidation=!0):(this.$emit("button",!0),this.stepValidation=!1)}},methods:{setForm:function(){this.$store.dispatch("cadastroStep3",[this.dataNasc,this.telefone,this.checksms])}}},O=C,j=(a("15ed"),Object(d["a"])(O,_,w,!1,null,null,null));j.options.__file="nasc.vue";var M=j.exports,S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"full-width"},[a("div",{staticClass:"assist-left-container row"},[a("div",{staticClass:"col-xs-12 col-sm-4 col-md-3 offset-md-1 offset-sm-0"},[a("img",{staticClass:"assist-left",attrs:{src:e.caminhoAssistente,alt:"Assistente",align:"middle"}})]),a("div",{staticClass:"col-xs-12 col-sm-8 text-left assistente-sidetext"},[a("div",{staticClass:"q-headline text-azul1 q-mb-sm full-width",domProps:{innerHTML:e._s(e.$t("cadastro.criarSenha"))}}),a("div",{staticClass:"q-title text-explicativo full-width q-mb-xs",domProps:{innerHTML:e._s(e.$t("cadastro.senhaRequisitos"))}}),a("div",{staticClass:"q-title full-width",class:e.validateColor(1)},[0===e.senha.length?a("q-icon",{staticClass:"q-mb-xs",attrs:{color:"explicativo",name:"fas fa-minus"}}):e.$v.senha.letrasNumeros?a("q-icon",{staticClass:"q-mb-xs",attrs:{color:"secondary",name:"fas fa-check"}}):a("q-icon",{staticClass:"q-mb-xs",attrs:{color:"negative",name:"fas fa-times"}}),a("span",{domProps:{innerHTML:e._s(" "+e.$t("cadastro.senharequisito1"))}})],1),a("div",{staticClass:"q-title full-width",class:e.validateColor(2)},[0===e.senha.length?a("q-icon",{staticClass:"q-mb-xs",attrs:{color:"explicativo",name:"fas fa-minus"}}):e.$v.senha.minLength?a("q-icon",{staticClass:"q-mb-xs",attrs:{color:"secondary",name:"fas fa-check"}}):a("q-icon",{staticClass:"q-mb-xs",attrs:{color:"negative",name:"fas fa-times"}}),a("span",{domProps:{innerHTML:e._s(" "+e.$t("cadastro.senharequisito2"))}})],1)])]),a("div",{staticClass:"row q-mt-lg"},[a("q-field",{staticClass:"col-md-8 col-xs-10 offset-md-2 offset-xs-1",attrs:{error:!!e.senha&&e.$v.senha.$error,"error-label":e.$t("cadastro.senhaError")}},[a("q-input",{attrs:{type:"password","float-label":e.$t("cadastro.senha")},on:{keyup:e.$v.senha.$touch},model:{value:e.senha,callback:function(t){e.senha=t},expression:"senha"}})],1),a("q-field",{staticClass:"col-md-8 col-xs-10 offset-md-2 offset-xs-1 q-mt-sm",attrs:{error:!!e.confirmarSenha&&e.$v.confirmarSenha.$error,"error-label":e.$t("cadastro.confirmarSenhaError")}},[a("q-input",{attrs:{type:"password","float-label":e.$t("cadastro.confirmarSenha")},on:{keyup:e.$v.confirmarSenha.$touch},model:{value:e.confirmarSenha,callback:function(t){e.confirmarSenha=t},expression:"confirmarSenha"}})],1)],1)])},A=[];S._withStripped=!0;var E={props:{caminhoAssistente:String},validations:{senha:{required:l["required"],minLength:Object(l["minLength"])(6),letrasNumeros:function(e){var t=e.match(/(?=.*[a-z])(?=.*\d)[a-z\d]+/i);return null!==t}},confirmarSenha:{sameAsPassword:Object(l["sameAs"])("senha")}},data:function(){return{senha:"",confirmarSenha:"",stepValidation:!1}},computed:{formValidation:function(){return{validacaoSenha:!this.$v.senha.$error,confSenha:this.$v.confirmarSenha.sameAsPassword}}},activated:function(){this.$emit("routes",{prevPage:"nasc",nextPage:""}),this.stepValidation?this.$emit("button",!1):this.$emit("button",!0)},watch:{formValidation:function(e){e.validacaoSenha&&e.confSenha?(this.$emit("button",!1),this.stepValidation=!0):(this.$emit("button",!0),this.stepValidation=!1)}},methods:{setForm:function(){this.$store.dispatch("cadastroStep4",this.senha)},validateColor:function(e){var t="text-";if(0===this.senha.length)return t+"explicativo";switch(e){case 1:this.$v.senha.letrasNumeros?t+="secondary":t+="negative";break;case 2:this.$v.senha.minLength?t+="secondary":t+="negative";break}return t}}},N=E,V=(a("ded4"),Object(d["a"])(N,S,A,!1,null,null,null));V.options.__file="senha.vue";var z=V.exports,R=a("a1c7"),T=a("2f62"),L={components:{nome:p,cpf:k,nasc:M,senha:z,"medi-menu":R["a"]},beforeRouteLeave:function(e,t,a){"confirmacao"!==e.name&&this.$store.dispatch("limparUsuario"),a()},beforeRouteUpdate:function(e,t,a){this.stepControl?(this.stepControl=!1,a()):(this.stepControl=!0,a("nome"))},data:function(){return{nextPage:"",prevPage:"",disabled:!0,loading:!1,stepControl:!1}},computed:o()({},Object(T["b"])({usuario:"usuario"}),{caminhoAssistente:function(){return this.$store.state.config.assistente}}),methods:{prevStep:function(){"nome"===this.$route.params.step&&this.$router.push("/login"),this.stepControl=!0,this.$router.replace(this.prevPage)},nextStep:function(){var e=this;"nome"===this.$route.params.step?(this.loading=!0,this.searchPromise(this.usuario.email,"email")):"cpf"===this.$route.params.step?(this.loading=!0,this.searchPromise(this.usuario.cpf,"cpf")):"senha"===this.$route.params.step?(this.loading=!0,new Promise(function(t,a){Object(g["y"])(e.usuario,t,a)}).then(function(){e.stepControl=!0,e.$store.dispatch("confirmarCodigo",!0).then(function(){e.$router.push("/confirmacao/codigo")})}).finally(function(){e.loading=!1})):(this.stepControl=!0,this.$router.replace(this.nextPage))},searchPromise:function(e,t){var a=this;new Promise(function(a,r){Object(g["x"])(e,t,a,r)}).then(function(e){"email"===t?a.$refs.form.emailFound():a.$refs.form.cpfFound(e.data)}).catch(function(e){e&&(a.stepControl=!0,a.$router.replace(a.nextPage))}).finally(function(){a.loading=!1})},routesControl:function(e){this.prevPage=e.prevPage,this.nextPage=e.nextPage,this.disabled=!0},buttonControl:function(e){this.disabled=e},updateForm:function(){this.$refs.form.setForm()}}},D=L,F=(a("d998"),Object(d["a"])(D,r,n,!1,null,null,null));F.options.__file="Cadastro.vue";t["default"]=F.exports},aa82:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(e){return(0,r.withParams)({type:"requiredIf",prop:e},function(t,a){return!(0,r.ref)(e,this,a)||(0,r.req)(t)})};t.default=n},b5ae:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"alpha",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"alphaNum",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"numeric",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"between",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"email",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"ipAddress",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"macAddress",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"maxLength",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"minLength",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"required",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"requiredIf",{enumerable:!0,get:function(){return m.default}}),Object.defineProperty(t,"requiredUnless",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(t,"sameAs",{enumerable:!0,get:function(){return h.default}}),Object.defineProperty(t,"url",{enumerable:!0,get:function(){return v.default}}),Object.defineProperty(t,"or",{enumerable:!0,get:function(){return b.default}}),Object.defineProperty(t,"and",{enumerable:!0,get:function(){return g.default}}),Object.defineProperty(t,"not",{enumerable:!0,get:function(){return x.default}}),Object.defineProperty(t,"minValue",{enumerable:!0,get:function(){return y.default}}),Object.defineProperty(t,"maxValue",{enumerable:!0,get:function(){return $.default}}),Object.defineProperty(t,"integer",{enumerable:!0,get:function(){return q.default}}),Object.defineProperty(t,"decimal",{enumerable:!0,get:function(){return P.default}}),t.helpers=void 0;var r=w(a("6235")),n=w(a("3a54")),i=w(a("45b8")),o=w(a("ec11")),s=w(a("5d75")),c=w(a("c99d")),l=w(a("91d3")),u=w(a("2a12")),f=w(a("5db3")),d=w(a("d4f4")),m=w(a("aa82")),p=w(a("e652")),h=w(a("b6cb")),v=w(a("772d")),b=w(a("d294")),g=w(a("3360")),x=w(a("6417")),y=w(a("eb66")),$=w(a("46bc")),q=w(a("1331")),P=w(a("c301")),k=_(a("78ef"));function _(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,a):{};r.get||r.set?Object.defineProperty(t,a,r):t[a]=e[a]}return t.default=e,t}function w(e){return e&&e.__esModule?e:{default:e}}t.helpers=k},b6cb:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(e){return(0,r.withParams)({type:"sameAs",eq:e},function(t,a){return t===(0,r.ref)(e,this,a)})};t.default=n},b786:function(e,t,a){"use strict";var r=a("0192"),n=a.n(r);n.a},c301:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=(0,r.regex)("decimal",/^[-]?\d*(\.\d+)?$/);t.default=n},c99d:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=(0,r.withParams)({type:"ipAddress"},function(e){if(!(0,r.req)(e))return!0;if("string"!==typeof e)return!1;var t=e.split(".");return 4===t.length&&t.every(i)});t.default=n;var i=function(e){if(e.length>3||0===e.length)return!1;if("0"===e[0]&&"0"!==e)return!1;if(!e.match(/^\d+$/))return!1;var t=0|+e;return t>=0&&t<=255}},cb69:function(e,t,a){"use strict";(function(e){function a(e){return a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.withParams=void 0;var r="undefined"!==typeof window?window:"undefined"!==typeof e?e:{},n=function(e,t){return"object"===a(e)&&void 0!==t?t:e(function(){})},i=r.vuelidate?r.vuelidate.withParams:n;t.withParams=i}).call(this,a("c8ba"))},d294:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,r.withParams)({type:"or"},function(){for(var e=this,a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return t.length>0&&t.reduce(function(t,a){return t||a.apply(e,r)},!1)})};t.default=n},d4f4:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=(0,r.withParams)({type:"required"},function(e){return"string"===typeof e?(0,r.req)(e.trim()):(0,r.req)(e)});t.default=n},d998:function(e,t,a){"use strict";var r=a("4b0c"),n=a.n(r);n.a},ded4:function(e,t,a){"use strict";var r=a("e52b"),n=a.n(r);n.a},e52b:function(e,t,a){},e652:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(e){return(0,r.withParams)({type:"requiredUnless",prop:e},function(t,a){return!!(0,r.ref)(e,this,a)||(0,r.req)(t)})};t.default=n},eb66:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(e){return(0,r.withParams)({type:"minValue",min:e},function(t){return!(0,r.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t>=+e})};t.default=n},ec11:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("78ef"),n=function(e,t){return(0,r.withParams)({type:"between",min:e,max:t},function(a){return!(0,r.req)(a)||(!/\s/.test(a)||a instanceof Date)&&+e<=+a&&+t>=+a})};t.default=n},f95e:function(e,t,a){"use strict";var r=a("2ab5"),n=a.n(r);n.a}}]);