(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0ab41d"],{1503:function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("p",[e._v("Redirecionando...")]),o("q-inner-loading",{attrs:{size:"55px",color:"azul1",visible:!0}})],1)},n=[];i._withStripped=!0;var r=o("e7d8"),s={name:"Redirect",created:function(){var e=this.$route.query.tk;e?this.$store.dispatch("loginTk",{tk:e,block:!1}):(console.error(r["b"].t("checkin.tokenNotFound")),this.$router.push({path:"/Message",query:{title:r["b"].t("dadosCadastrais.tituloPergunta"),message:r["b"].t("checkin.tokenNotFound")}}))},methods:{}},a=s,c=o("2877"),d=Object(c["a"])(a,i,n,!1,null,null,null);d.options.__file="Redirect.vue";t["default"]=d.exports}}]);