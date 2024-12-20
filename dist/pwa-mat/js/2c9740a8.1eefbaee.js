(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2c9740a8"],{"3a60":function(e,t,n){(function(t,n){e.exports=n()})(0,function(){return function(e){function t(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p=".",t(t.s=10)}([function(e,t){e.exports={"#":{pattern:/\d/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,transform:function(e){return e.toLocaleUpperCase()}},a:{pattern:/[a-zA-Z]/,transform:function(e){return e.toLocaleLowerCase()}},"!":{escape:!0}}},function(e,t,n){"use strict";function a(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!0),t}var i=n(2),o=n(0),s=n.n(o);t.a=function(e,t){var o=t.value;if((Array.isArray(o)||"string"==typeof o)&&(o={mask:o,tokens:s.a}),"INPUT"!==e.tagName.toLocaleUpperCase()){var r=e.getElementsByTagName("input");if(1!==r.length)throw new Error("v-mask directive requires 1 input, found "+r.length);e=r[0]}e.oninput=function(t){if(t.isTrusted){var s=e.selectionEnd,r=e.value[s-1];for(e.value=n.i(i.a)(e.value,o.mask,!0,o.tokens);s<e.value.length&&e.value.charAt(s-1)!==r;)s++;e===document.activeElement&&(e.setSelectionRange(s,s),setTimeout(function(){e.setSelectionRange(s,s)},0)),e.dispatchEvent(a("input"))}};var l=n.i(i.a)(e.value,o.mask,!0,o.tokens);l!==e.value&&(e.value=l,e.dispatchEvent(a("input")))}},function(e,t,n){"use strict";var a=n(6),i=n(5);t.a=function(e,t){var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=arguments[3];return Array.isArray(t)?n.i(i.a)(a.a,t,s)(e,t,o,s):n.i(a.a)(e,t,o,s)}},function(e,t,n){"use strict";function a(e){e.component(l.a.name,l.a),e.directive("mask",s.a)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=n.n(i),s=n(1),r=n(7),l=n.n(r);n.d(t,"TheMask",function(){return l.a}),n.d(t,"mask",function(){return s.a}),n.d(t,"tokens",function(){return o.a}),n.d(t,"version",function(){return c});var c="0.11.1";t.default=a,"undefined"!=typeof window&&window.Vue&&window.Vue.use(a)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),i=n(0),o=n.n(i),s=n(2);t.default={name:"TheMask",props:{value:[String,Number],mask:{type:[String,Array],required:!0},masked:{type:Boolean,default:!1},tokens:{type:Object,default:function(){return o.a}}},directives:{mask:a.a},data:function(){return{lastValue:null,display:this.value}},watch:{value:function(e){e!==this.lastValue&&(this.display=e)},masked:function(){this.refresh(this.display)}},computed:{config:function(){return{mask:this.mask,tokens:this.tokens,masked:this.masked}}},methods:{onInput:function(e){e.isTrusted||this.refresh(e.target.value)},refresh:function(e){this.display=e;e=n.i(s.a)(e,this.mask,this.masked,this.tokens);e!==this.lastValue&&(this.lastValue=e,this.$emit("input",e))}}}},function(e,t,n){"use strict";function a(e,t,n){return t=t.sort(function(e,t){return e.length-t.length}),function(a,i){for(var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=0;s<t.length;){var r=t[s];s++;var l=t[s];if(!(l&&e(a,l,!0,n).length>r.length))return e(a,r,o,n)}return""}}t.a=a},function(e,t,n){"use strict";function a(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=arguments[3];e=e||"",t=t||"";for(var i=0,o=0,s="";i<t.length&&o<e.length;){var r=t[i],l=a[r],c=e[o];l&&!l.escape?(l.pattern.test(c)&&(s+=l.transform?l.transform(c):c,i++),o++):(l&&l.escape&&(i++,r=t[i]),n&&(s+=r),c===r&&o++,i++)}for(var u="";i<t.length&&n;){r=t[i];if(a[r]){u="";break}u+=r,i++}return s+u}t.a=a},function(e,t,n){var a=n(8)(n(4),n(9),null,null);e.exports=a.exports},function(e,t){e.exports=function(e,t,n,a){var i,o=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(i=e,o=e.default);var r="function"==typeof o?o.options:o;if(t&&(r.render=t.render,r.staticRenderFns=t.staticRenderFns),n&&(r._scopeId=n),a){var l=r.computed||(r.computed={});Object.keys(a).forEach(function(e){var t=a[e];l[e]=function(){return t}})}return{esModule:i,exports:o,options:r}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("input",{directives:[{name:"mask",rawName:"v-mask",value:e.config,expression:"config"}],attrs:{type:"text"},domProps:{value:e.display},on:{input:e.onInput}})},staticRenderFns:[]}},function(e,t,n){e.exports=n(3)}])})},"7c62":function(e,t,n){},"9f29":function(e,t,n){"use strict";var a=n("7c62"),i=n.n(a);i.a},a14b:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-modal",{attrs:{"content-classes":"bg-fundo",value:e.modalOpened,"no-esc-dismiss":"",maximized:""},on:{show:e.carregarInformacoes}},[n("q-modal-layout",{staticClass:"agenda-modal"},[n("div",{staticClass:"page-flexbox"},[n("medi-menu",{attrs:{config:"agendamento"}}),n("main",{staticClass:"flex-grow-1 q-mb-sm",on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.enterEvent(t)}}},[n("div",{staticClass:"assist-left-container row"},[n("div",{staticClass:"col-xs-12 col-sm-4 col-md-3 offset-md-1 offset-sm-0"},[n("img",{staticClass:"assist-left",attrs:{src:e.caminhoAssistente,alt:"Assistente",align:"middle"}})]),e.nomeUsuario?n("div",{staticClass:"col-xs-12 col-sm-8 text-left q-headline text-azul1 assistente-sidetext"},[n("span",{domProps:{innerHTML:e._s(e.$t("infoAdicional.tratamento")+"<br>")}}),n("span",{staticClass:"capitalize",domProps:{innerHTML:e._s(e.nomeUsuario+",<br>")}}),n("span",{domProps:{innerHTML:e._s(e.$t("infoAdicional.confirmarInfo"))}})]):e._e()]),n("div",{staticClass:"row"},[n("q-list",{staticClass:"col-xs-12 col-sm-10 offset-sm-1 q-mt-md onlyBottomBorder",attrs:{separator:""}},[e.informacoesComplementares?n("q-item",{staticClass:"cursor-pointer",attrs:{tag:"label"}},[n("q-item-main",{staticClass:"q-mr-md text-cinza1",attrs:{label:e.$t("infoAdicional.limitacoes")}}),n("q-item-side",{attrs:{right:""}},[n("q-toggle",{attrs:{"checked-icon":"check","unchecked-icon":"fas fa-times"},model:{value:e.deficiencia,callback:function(t){e.deficiencia=t},expression:"deficiencia"}})],1)],1):e._e(),e.informacoesComplementares?n("q-item",{staticClass:"q-mt-md cursor-pointer",attrs:{tag:"label"}},[n("q-item-main",{staticClass:"q-mr-md q-my-md text-cinza1",attrs:{label:e.$t("infoAdicional.medicamento")}}),n("q-item-side",{attrs:{right:""}},[n("q-toggle",{attrs:{"checked-icon":"check","unchecked-icon":"fas fa-times"},on:{input:e.tratarMedicamento},model:{value:e.usaMedicamento,callback:function(t){e.usaMedicamento=t},expression:"usaMedicamento"}})],1)],1):e._e(),e.usaMedicamento?n("q-field",{staticClass:"q-mx-md",attrs:{label:e.$t("infoAdicional.qualMedicamento"),"label-width":"12"}},[n("q-input",{attrs:{type:"textarea",color:"white","max-height":100,rows:"4",inverted:"","inverted-light":""},model:{value:e.medicamentos,callback:function(t){e.medicamentos=t},expression:"medicamentos"}})],1):e._e(),n("q-item",{staticClass:"q-mt-sm cursor-pointer",attrs:{tag:"label"}},[n("q-item-main",{staticClass:"q-mr-md q-my-md text-cinza1",attrs:{label:e.$t("infoAdicional.possuiConvenio")}}),n("q-item-side",{attrs:{right:""}},[n("q-toggle",{attrs:{"checked-icon":"check","unchecked-icon":"fas fa-times"},on:{input:e.tratarConvenio},model:{value:e.temConvenio,callback:function(t){e.temConvenio=t},expression:"temConvenio"}})],1)],1),e.temConvenio?n("div",{staticClass:"q-mx-md"},[n("q-select",{ref:"selectConvenio",staticClass:"qSelect-fix q-mb-md",attrs:{"float-label":e.$t("infoAdicional.convenio"),options:e.convenios,"popup-max-height":"250px",filter:""},on:{input:e.buscarPlanosAndValidMatObriga},nativeOn:{click:function(t){return e.buscarConvenios(t)}},model:{value:e.selectedConvenio,callback:function(t){e.selectedConvenio=t},expression:"selectedConvenio"}}),e.selectedConvenio?n("q-select",{staticClass:"qSelect-fix q-mb-md",attrs:{"float-label":e.$t("infoAdicional.planos"),options:e.planos,filter:""},model:{value:e.selectedPlano,callback:function(t){e.selectedPlano=t},expression:"selectedPlano"}}):e._e(),e.selectedConvenio&&e.selectedPlano?n("q-input",{staticClass:"q-mb-md",attrs:{"float-label":e.$t("infoAdicional.carteirinha"),maxlength:"30"},model:{value:e.matriculaConvenio,callback:function(t){e.matriculaConvenio=t},expression:"matriculaConvenio"}}):e._e()],1):e._e()],1),n("span",{staticClass:"col-xs-12 col-sm-10 offset-sm-1 text-left q-mt-lg q-pl-md text-cinza1",domProps:{innerHTML:e._s(e.$t("infoAdicional.alturaPeso"))}}),n("q-input",{directives:[{name:"mask",rawName:"v-mask",value:"#,##",expression:"'#,##'"}],staticClass:"col-xs-4 col-sm-3 offset-sm-2 offset-xs-1 q-px-md q-py-sm q-mt-md",attrs:{placeholder:"1,80",color:"white",suffix:"m",inverted:"","inverted-light":""},model:{value:e.altura,callback:function(t){e.altura=t},expression:"altura"}}),n("q-input",{directives:[{name:"mask",rawName:"v-mask",value:"###",expression:"'###'"}],staticClass:"col-xs-4 col-sm-3 offset-sm-2 offset-xs-2 q-px-md q-py-sm q-mt-md",attrs:{placeholder:"100",color:"white",suffix:"kg",inverted:"","inverted-light":""},model:{value:e.peso,callback:function(t){e.peso=t},expression:"peso"}})],1)]),n("footer",{staticClass:"q-mt-lg"},[n("q-btn",{staticClass:"text-azul1 bg-white no-shadow float-left",attrs:{size:"17px",icon:"fas fa-arrow-left",outline:"",round:""},on:{click:function(t){return e.$router.push("/dashboard")}}}),n("q-btn",{ref:"update",staticClass:"q-py-md bg-azul1 text-white float-right",class:e.$q.screen.lt.md?"q-px-lg":"q-px-xl",attrs:{label:e.$t("infoAdicional.continuar"),"icon-right":"fas fa-arrow-right",loading:e.btnLoading,disabled:e.disabled},on:{click:e.adicionarInformacoes}})],1)],1)])],1)},i=[];a._withStripped=!0;n("6b54"),n("a481"),n("28a5"),n("551c");var o=n("3a60"),s=n("dde5"),r=n("a1c7"),l={directives:{mask:o["mask"]},components:{"medi-menu":r["a"]},data:function(){return{nomeUsuario:"",informacoesComplementares:!1,cadastroSemNumCarteirinha:null,matObriga:!1,deficiencia:!1,usaMedicamento:!1,medicamentos:null,temConvenio:!1,altura:"",peso:"",selectedConvenio:null,selectedPlano:0,matriculaConvenio:"",convenios:[],planos:[],btnLoading:!1,disabled:!0}},computed:{modalOpened:function(){return this.$store.state.agendamento.infoModalAberto},formValidation:function(){return{altura:this.altura,peso:this.peso,usaMedicamento:this.usaMedicamento,desc_medicamentos:this.medicamentos,temConvenio:this.temConvenio,convenio:this.selectedConvenio,plano:this.selectedPlano,matricula:this.matriculaConvenio,cadastroSemNumCarteirinha:this.cadastroSemNumCarteirinha,matObriga:this.matObriga}},caminhoAssistente:function(){return this.$store.state.config.assistente}},created:function(){this.informacoesComplementares=this.$store.state.config.informacoesComplementares,this.cadastroSemNumCarteirinha=this.$store.state.config.cadastroSemNumCarteirinha},mounted:function(){var e=document.getElementsByClassName("q-modal-layout-content");e[e.length-1].classList.remove("scroll")},methods:{enterEvent:function(e){e.target.classList.contains("q-select")||this.$refs.update.$el.click()},tratarConvenio:function(e){e||(this.selectedConvenio=null,this.selectedPlano=0,this.matriculaConvenio="",this.disabled=!1)},buscarConvenios:function(){var e=this;this.disabled=!0,this.$refs.selectConvenio.hide(),this.$q.loading.show({spinnerColor:"primary",customClass:"page-loading"}),new Promise(function(e,t){Object(s["m"])(e,t)}).then(function(t){e.convenios=t.map(function(e){var t={value:e.ID_CONV,label:e.NM_CONV};return t}),e.$refs.selectConvenio.show()}).finally(function(){e.$q.loading.hide()})},tratarMedicamento:function(e){e?this.disabled=!0:(this.medicamentos=null,this.disabled=!1)},buscarPlanosAndValidMatObriga:function(e){var t=this;this.$q.loading.show({spinnerColor:"primary",customClass:"page-loading"}),new Promise(function(t,n){Object(s["t"])(e,t,n)}).then(function(e){t.planos=e.map(function(e){var t={value:e.ID,label:e.DESCRICAO};return t})}).finally(function(){t.selectedPlano=null,t.matriculaConvenio="",t.$q.loading.hide()}),new Promise(function(t,n){Object(s["H"])(e,t,n)}).then(function(e){t.matObriga=e}).finally(function(){t.$q.loading.hide()})},carregarInformacoes:function(){var e=this;this.$q.loading.show({spinnerColor:"primary",customClass:"page-loading"}),new Promise(function(e,t){Object(s["s"])(e,t)}).then(function(t){t.map&&(t=t.map),t.ID&&e.$store.dispatch("updateIdPac",t.ID),e.nomeUsuario=t.NOME.split(" ")[0].toLowerCase(),"T"===t.MOBILIDADE&&(e.deficiencia=!0),"T"===t.MEDICAMENTO&&(e.usaMedicamento=!0,e.medicamentos=t.DESC_MEDICAMENTO),"F"===t.PARTICULAR&&(e.temConvenio=!0,e.convenios=[{value:t.ID_CONVENIO,label:t.CONVENIO}],e.selectedConvenio=t.ID_CONVENIO,e.planos=[{value:t.ID_PLANO,label:t.PLANO}],e.selectedPlano=t.ID_PLANO,e.matriculaConvenio=t.MATRICULA),t.ALTURA&&(e.altura=t.ALTURA.toString().replace(".",",")),t.PESO&&(e.peso=t.PESO),t.matObriga&&(e.matObriga=t.matObriga)}).finally(function(){e.$q.loading.hide()})},adicionarInformacoes:function(){var e=this,t=this.formValidation;t.deficiencia=this.deficiencia,t.origemReq="",delete t["temConvenio"],this.btnLoading=!0,new Promise(function(e,n){Object(s["g"])(t,e,n)}).then(function(){e.$store.commit("SET_ID_CONVENIO",e.selectedConvenio),e.$store.dispatch("controleInfoModal",!1),e.$emit("modalClosed",!0)}).finally(function(){e.btnLoading=!1})}},watch:{formValidation:function(e){if(e.altura&&e.peso){if(e.usaMedicamento){if(!e.desc_medicamentos.trim())return void(this.disabled=!0);this.disabled=!1}else this.disabled=!1;e.temConvenio?e.convenio&&e.plano?e.matricula.trim()?this.disabled=!1:null!=e.matObriga||e.cadastroSemNumCarteirinha?null!==e.matObriga&&e.matObriga&&!e.cadastroSemNumCarteirinha?this.disabled=!0:this.disabled=!1:this.disabled=!0:this.disabled=!0:this.disabled=!1}else this.disabled=!0}}},c=l,u=(n("9f29"),n("2877")),d=Object(u["a"])(c,a,i,!1,null,null,null);d.options.__file="informacoesAdicionais.vue";t["a"]=d.exports}}]);