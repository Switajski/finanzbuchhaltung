(this.webpackJsonpfinanzbuchhaltung=this.webpackJsonpfinanzbuchhaltung||[]).push([[0],{29:function(e){e.exports=JSON.parse('{"name":"finanzbuchhaltung","version":"2.1.6","private":false,"dependencies":{"react":"^16.10.2","react-alert":"^5.5.0","react-alert-template-basic":"^1.0.0","react-dom":"^16.10.2","react-hook-form":"^3.27.0","react-router-dom":"^5.1.2","react-scripts":"3.2.0","react-transition-group":"^4.2.1","styled-components":"^4.3.0","styled-css-grid":"^1.2.1","use-key-hook":"^1.5.0"},"scripts":{"start":"react-scripts start","build":"react-scripts build ","postbuild":"rm -rf ../resources/public && mv build ../resources/public","test":"react-scripts test","eject":"react-scripts eject"},"eslintConfig":{"extends":"react-app"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"proxy":"http://localhost:4000"}')},37:function(e,t,n){e.exports=n(55)},42:function(e,t,n){},43:function(e,t,n){},55:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(19),u=n.n(c),o=(n(42),n(17)),l=n(18),i=n(2),m="rgb(7,1,126)",s={background:m,font:"rgb(179,179,179);",variable:m,variableBg:"rgb(0,110,107)",active:m,activeBg:"rgb(179,179,179);",minor:"#5a5a5a",emphasize:"rgb(253,255,0)",header:"white"},f=(n(43),n(9)),b=n(1),d=n(11),v=n(13),E=n.n(v),p=n(4),g=n.n(p),h=n(16),O=n(7);function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(n,!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(e){return parseInt(e.pos)},S=function(e,t){return fetch(e,t).then((function(e){if(!e.ok)throw new Error(e.statusText+" at "+e.url);return e.json()}))};var k=function(e){var t=Object(r.useState)(new Map),n=Object(b.a)(t,2),a=n[0],c=n[1],u=Object(r.useState)([]),o=Object(b.a)(u,2),l=o[0],i=o[1],m=Object(r.useState)(!1),s=Object(b.a)(m,2),f=s[0],d=s[1];return Object(r.useEffect)((function(){(function(){var e=Object(O.a)(g.a.mark((function e(){var t,n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),e.prev=1,e.next=4,S("/accounting-records");case 4:t=e.sent,n=t.slice(1).sort((function(e,t){return y(t)-y(e)})).reduce((function(e,t){return e.set(y(t),t),e}),new Map),d(!1),c(n),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),d(!1),i([].concat(Object(h.a)(l),[e.t0]));case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}})()()}),[].concat(Object(h.a)(e),[l])),{accountingRecords:a,arMessages:l,saveAccountingRecord:function(e){(function(){var t=Object(O.a)(g.a.mark((function t(){var n;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=a.has(y(e))?"/update-record":"/create-record",t.next=4,S(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(x({},e))});case 4:i([].concat(Object(h.a)(l),[(r="Buchung erfolgreich gespeichert",{title:"success",message:r})])),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),i([].concat(Object(h.a)(l),[t.t0]));case 10:case"end":return t.stop()}var r}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}})()()},loading:f}},w=n(8),K=n(3),F=n(29);function D(){var e=Object(K.a)(["height: 100%;\ndisplay: flex;\nalign-items: center;\njustify-content: center;"]);return D=function(){return e},e}function P(){var e=Object(K.a)(["\npadding: 5px 20px 5px 20px;"]);return P=function(){return e},e}function M(){var e=Object(K.a)(["\nmargin:0;\nborder:0.5px solid;"]);return M=function(){return e},e}function B(){var e=Object(K.a)(["\noverflow:scroll;\npadding:0 20px 0 20px;\nflex-grow : 1;"]);return B=function(){return e},e}function z(){var e=Object(K.a)(["\nheight: 100%;\ndisplay: flex;\nflex-flow: column;\noverflow:hidden;\n@media not print {border: 1px solid;}"]);return z=function(){return e},e}function C(){var e=Object(K.a)(["\n@media not print {\n    height: 95vh;\n}\ndisplay: block;\nmax-width: 1000px;\nmargin-left:auto;\nmargin-right:auto;\nmargin-top: 1em;"]);return C=function(){return e},e}function R(){var e=Object(K.a)(["\ntext-transform: uppercase"]);return R=function(){return e},e}function A(){var e=Object(K.a)(["\ncolor: ",""]);return A=function(){return e},e}function T(){var e=Object(K.a)(["\n@media not print {\n    color: ","\n}"]);return T=function(){return e},e}function H(){var e=Object(K.a)(["\nbackground-color: ",";\ncolor: ",";\nborder: 0;"]);return H=function(){return e},e}function _(){var e=Object(K.a)(["\nbackground-color: ",";\ncolor: ",";"]);return _=function(){return e},e}function N(){var e=Object(K.a)(["grid-gap:0;"]);return N=function(){return e},e}var V=Object(i.b)(w.b)(N()),G=(i.b.span(_(),(function(e){return e.theme.variableBg}),(function(e){return e.theme.header})),i.b.button(H(),(function(e){return e.theme.variableBg}),(function(e){return e.active?e.theme.header:e.theme.brightGrey}))),L=i.b.span(T(),(function(e){return e.theme.emphasize})),I=i.b.span(A(),(function(e){return e.theme.minor})),J=i.b.p(R()),q=i.b.div(C()),W=i.b.div(z()),Y=i.b.div(B()),U=i.b.hr(M()),$=i.b.div(P());function Q(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement(V,{columns:6},a.a.createElement(w.a,{middle:!0,center:!0},"FIBU ",F.version),a.a.createElement(w.a,Object.assign({},e,{width:e.join?5:3}),e.children),!e.join&&a.a.createElement(w.a,{width:2,middle:!0},e.right)),a.a.createElement(U,null))}function X(){return a.a.createElement(a.a.Fragment,null,"\xa0 \xa0")}var Z=i.b.div(D());function ee(){return a.a.createElement(Z,null,a.a.createElement(L,null,"laedt..."))}function te(){return a.a.createElement(Z,null,a.a.createElement(L,null,"Konnte Daten aufgrund eines Serverfehlers nicht laden"))}function ne(){var e=Object(K.a)(["\nmargin-right: 7px;"]);return ne=function(){return e},e}function re(){var e=Object(K.a)(["\ncolor: ",";\nbackground-color: ",";\nborder: none;\n&:focus {\n    color: ",";\n    background-color: ",";\n    border:none;\n}"]);return re=function(){return e},e}function ae(){var e=Object(K.a)(["font-size:smaller"]);return ae=function(){return e},e}var ce=i.b.span(ae()),ue=i.b.input(re(),(function(e){return e.theme.variable}),(function(e){return e.theme.variableBg}),(function(e){return e.theme.active}),(function(e){return e.theme.activeBg}));ue.defaultProps={theme:{inputBg:"white",input:"black"}};var oe=i.b.label(ne()),le=function(e){return a.a.createElement(L,null,"\u26a0 ",a.a.createElement(ce,null,e.text))};var ie=Object(r.forwardRef)((function(e,t){return a.a.createElement(a.a.Fragment,null,a.a.createElement(oe,null,e.label),a.a.createElement(ue,Object.assign({},e,{ref:t})))}));function me(){var e=Object(K.a)(["\n  display: flex;\n  align-content: flex-end;\n  justify-content: space-between;\n  @media print {\n    display: none;\n  }\n"]);return me=function(){return e},e}function se(){var e=Object(K.a)(["\n  width: 100%;\n  font-size: 1em;\n"]);return se=function(){return e},e}var fe=Object(i.b)(G)(se()),be=i.b.div(me());function de(e){return a.a.createElement(be,{columns:5},e.children)}function ve(e){return a.a.createElement("div",null,e.active&&a.a.createElement(fe,Object.assign({type:e.submit?"submit":"button"},e,{onClick:e.command}),e.symbol&&e.symbol,e.text))}function Ee(e){return a.a.createElement(de,null,a.a.createElement(ve,{active:!0,type:"reset",command:e.cancel,key:"ESC",text:"ESC: Abbrechen"}),a.a.createElement(ve,{active:!0,text:"\u21b9 : naechstes Feld"}),a.a.createElement(ve,{active:!0,text:"\u21a9 : speichern",type:"submit"}))}var pe=function(e){var t=Object(r.useState)(!1),n=Object(b.a)(t,2),c=n[0],u=n[1];return E()((function(){return u(!0)}),{detectKeys:[27]}),c?a.a.createElement(l.a,{to:"/"}):a.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.onSubmit()}},a.a.createElement($,null,a.a.createElement(V,{columns:3},a.a.createElement(w.a,null,a.a.createElement(ie,Object.assign({},e,{type:"number",style:{width:"50px"},min:"1",onChange:function(t){return e.onChange(t.target.value)}}))))),a.a.createElement(de,null,a.a.createElement(ve,{active:!0,text:"ESC: Hauptmenue",command:function(){return u(!0)}}),a.a.createElement(ve,{active:!0,text:" : "+e.newRecordButtonText,symbol:"\u21a9",command:function(){return e.onSubmit()}})))},ge=n(36);function he(){var e=Object(K.a)(["",""]);return he=function(){return e},e}function Oe(){var e=Object(K.a)(["text-align:right;"]);return Oe=function(){return e},e}function je(){var e=Object(K.a)(["text-align:right;"]);return je=function(){return e},e}var xe=i.b.th(je()),ye=function(e){return e&&parseFloat(Math.round(100*e)/100).toFixed(2)},Se=i.b.td(Oe()),ke=function(e){return e.th?a.a.createElement(xe,e):a.a.createElement(Se,e)},we=function(e){var t=e.children;return a.a.createElement(a.a.Fragment,null,"\xa0",t)},Ke=i.b.span(he(),(function(e){return e.value%1===0&&"padding-right: 1.85em;"})),Fe=function(e){var t=e.children,n=e.th,r=e.creditDebitSuffix,c=e.suffix,u=t;if(void 0===u)return a.a.createElement(ke,{th:n});if(ye(u)===ye(0))return a.a.createElement(ke,{th:n},"0",(r||c)&&a.a.createElement(a.a.Fragment,null,"\xa0\xa0"));var o=u<0,l=(r?function(e){return e<0?-e:e}(u):u).toLocaleString();return a.a.createElement(ke,{th:n},u&&a.a.createElement(a.a.Fragment,null,a.a.createElement(Ke,{value:u},function(e){return 10*e%1===0&&e%1!==0}(u)?l+"0":l),c&&a.a.createElement(we,null,c),r&&a.a.createElement(we,null,o?"S":"H")))};function De(){var e=Object(K.a)(["\n    text-align:",";"]);return De=function(){return e},e}function Pe(){var e=Object(K.a)(["\n",""]);return Pe=function(){return e},e}function Me(){var e=Object(K.a)(["\n  width: 100%;\n  border-collapse:collapse;\n  @media print {\n      td {\n        border-bottom: 1px dotted;\n      }\n  }\n  th, td {\n    margin: 0;\n    padding: 3px 5px 3px 3px;\n  }\n  tr:nth-child(even) {\n      background-color: #06025e;\n  }\n  thead th {\n    border-bottom: 1px solid;\n  }\n  tfoot th {\n    border-top: 1px solid;\n  }"]);return Me=function(){return e},e}function Be(){var e=Object(K.a)(["white-space: nowrap;"]);return Be=function(){return e},e}var ze=i.b.td(Be()),Ce=function(e){e.selector;var t=Object(ge.a)(e,["selector"]);return e.number?a.a.createElement(Fe,t):e.date?a.a.createElement(ze,t):a.a.createElement("td",t)},Re=i.b.table(Me()),Ae=i.b.tr(Pe(),(function(e){return e.link&&"\ncursor:pointer;\n&:hover {\n    background-color:"+e.theme.variableBg+" !important;\n    color:"+e.theme.active+";\n}\n"})),Te=i.b.th(De(),(function(e){return e.alignRight?"right":"left"}));var He=function(e){return a.a.createElement(Re,{cellspacing:"0",cellpadding:"0"},a.a.createElement("thead",null,a.a.createElement("tr",null,e.attributes.map((function(e){return a.a.createElement(Te,{alignRight:e.number,number:e.number,key:e.name},e.name)})))),a.a.createElement("tbody",null,e.values&&e.values.map((function(t){return a.a.createElement(Ae,{link:e.onRowClick,onClick:function(){return e.onRowClick&&e.onRowClick(t)},key:e.keySelector(t)},e.attributes.map((function(e,n){return a.a.createElement(Ce,Object.assign({},e,{key:n}),e.selector(t))})))}))),e.accountingSummary&&e.values&&a.a.createElement("tfoot",null,a.a.createElement("tr",null,e.attributes.map((function(t){var n=t.name;return t.customFooter?a.a.createElement(Fe,{th:!0,creditDebitSuffix:!0,key:n},t.customFooter):t.summarize?a.a.createElement(Fe,{th:!0,suffix:t.summarize,key:n},e.values.reduce((function(e,n){return e+t.selector(n)}),0)):t.expressive?a.a.createElement(Fe,{th:!0,creditDebitSuffix:!0},e.values.reduce((function(e,t){return e+t.debit-t.credit}),0)):a.a.createElement(Fe,{th:!0,key:n})})))),e.children)},_e=n(32);function Ne(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var Ve=function(e,t){return fetch(e,t).then((function(e){if(!e.ok)throw new Error(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ne(n,!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ne(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,{name:e.status,status:e.status,message:e.statusText,url:e.url}));return e.json()}))},Ge=function(){var e=Object(O.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Ve("/balance?accountNo="+t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Le=function(e){var t=e.accountPlan,n=e.debitAccount,a=e.creditAccount,c=Object(r.useState)(!1),u=Object(b.a)(c,2),o=u[0],l=u[1],i=Object(r.useState)(),m=Object(b.a)(i,2),s=m[0],f=m[1],d=Object(r.useState)(),v=Object(b.a)(d,2),E=v[0],p=v[1];return Object(r.useEffect)((function(){(function(){var e=Object(O.a)(g.a.mark((function e(){var r,c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!t[n]){e.next=8;break}return e.next=4,Ge(n);case 4:r=e.sent,f(r.sum),e.next=9;break;case 8:f(void 0);case 9:if(!t[a]){e.next=16;break}return e.next=12,Ge(a);case 12:c=e.sent,p(c.sum),e.next=17;break;case 16:p(void 0);case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(0),l(!0);case 22:case"end":return e.stop()}}),e,null,[[0,19]])})));return function(){return e.apply(this,arguments)}})()()}),[t,n,a]),[{creditBalance:E,debitBalance:s},o]};function Ie(){var e=Object(K.a)(["\n",""]);return Ie=function(){return e},e}var Je=Object(i.b)(ie)(Ie(),(function(e){return e.emphasize&&"background-color:"+e.theme.emphasize+";"}));var qe=Object(r.forwardRef)((function(e,t){return a.a.createElement(a.a.Fragment,null,a.a.createElement(Je,Object.assign({},e,{ref:t,emphasize:e.validationMsg})),e.validationMsg&&a.a.createElement(le,{text:e.validationMsg.message}))}));function We(){var e=Object(K.a)(["\ntext-align:right;"]);return We=function(){return e},e}var Ye=Object(i.b)(Je)(We());var Ue=Object(r.forwardRef)((function(e,t){return a.a.createElement(Ye,Object.assign({},e,{emphasize:e.validationMsg,ref:t,type:"number",step:"any"}))}));var $e=Object(r.forwardRef)((function(e,t){return a.a.createElement(a.a.Fragment,null,a.a.createElement(Je,Object.assign({rows:1},e,{emphasize:e.validationMsg,ref:t,placeholder:"dd.mm.yyyy",value:e.value,type:"date"})),e.validationMsg&&a.a.createElement(le,{text:e.validationMsg.message}))}));var Qe=Object(r.forwardRef)((function(e,t){return a.a.createElement(a.a.Fragment,null,a.a.createElement(Je,Object.assign({size:7},e,{emphasize:e.validationMsg,ref:t,list:e.name})),a.a.createElement("datalist",{id:e.name},e.options.map((function(e){return a.a.createElement("option",{key:e.value,value:e.value},e.value," - ",e.name)}))),e.validationMsg&&a.a.createElement(le,{text:e.validationMsg.message}))}));var Xe=function(e){var t=Object(r.useState)(),n=Object(b.a)(t,2),a=n[0],c=n[1],u=Object(r.useState)(!0),o=Object(b.a)(u,2),l=o[0],i=o[1],m=Object(r.useState)(),s=Object(b.a)(m,2),f=s[0],d=s[1];return Object(r.useEffect)((function(){i(!0),function(){var t=Object(O.a)(g.a.mark((function t(){var n;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(e).then((function(e){if(!e.ok)throw new Error(e.statusText+" at "+e.url);return e.json()}));case 3:n=t.sent,i(!1),c(n),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),i(!1),d(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(){return t.apply(this,arguments)}}()()}),[e]),{result:a,error:f,loading:l}},Ze="Konto ex. nicht",et="Datum ex. nicht",tt="Steuerschl. ex. nicht",nt="Keinen Text eingegeben",rt="Keinen Betrag eingegeben",at=function(e){return isNaN(Date.parse(e))},ct=function(e){var t=e.value;return a.a.createElement(a.a.Fragment,null,"Saldo ",(t<0?-t:t).toLocaleString()," ",t<0?"S":"H"," ")};var ut=function(e){var t=Xe("/account-plan"),n=t.result,c=t.loading,u=t.error,o=Object.keys(n||{}).map((function(e){return{value:n[e].konto_nr,name:n[e].name_kont}})),l=Xe("/taxes").result||[],i=Object(_e.a)({defaultValues:e.defaultValues}),m=i.handleSubmit,s=i.register,f=i.errors,d=i.reset;Object(r.useEffect)((function(){return d(e.defaultValues)}),[e.defaultValues,d]);var v=Object(r.useState)(),E=Object(b.a)(v,2),p=E[0],g=E[1],h=Object(r.useState)(),O=Object(b.a)(h,2),j=O[0],x=O[1],y=Le({accountPlan:n,debitAccount:j,creditAccount:p}),S=Object(b.a)(y,1)[0],k=S.creditBalance,K=S.debitBalance,F=l.map((function(e){return e.fasuch}));return u?a.a.createElement("p",null,"Konnte Buchungsplan nicht vom Server laden."):c?a.a.createElement(ee,null):a.a.createElement("form",{onSubmit:m(e.onSubmit)},a.a.createElement($,null,a.a.createElement(V,{columns:3},a.a.createElement(w.a,null,a.a.createElement(ie,{name:"pos",label:"Position Nr.",size:6,readOnly:!0,value:e.pos,ref:s})),a.a.createElement(w.a,null,a.a.createElement($e,{name:"date",label:"Datum",autoFocus:!0,ref:s({validate:function(e){return!at(e)||et}}),validationMsg:f.date})),a.a.createElement(w.a,null,a.a.createElement($e,{name:"accountedDate",label:"Buchungsdatum",ref:s({validate:function(e){return!at(e)||et}}),validationMsg:f.accountedDate}),a.a.createElement("br",null))),a.a.createElement("br",null),a.a.createElement(V,{columns:void 0===K?1:3},a.a.createElement(w.a,null,a.a.createElement(Qe,{name:"debitAccount",label:"Konto Soll\xa0\xa0",onChange:function(e){return x(e.target.value)},options:o,ref:s({validate:function(e){return n[e]||Ze}}),validationMsg:f.debitAccount})),void 0!==K&&a.a.createElement(a.a.Fragment,null,a.a.createElement(w.a,null,a.a.createElement(L,null,void 0!==K&&n[j]&&n[j].name_kont)),a.a.createElement(w.a,null,a.a.createElement(L,null,void 0!==K&&a.a.createElement(ct,{value:K}))))),a.a.createElement(V,{columns:void 0===k?1:3},a.a.createElement(w.a,null,a.a.createElement(Qe,{name:"creditAccount",label:"Konto Haben\xa0",onChange:function(e){return g(e.target.value)},options:o,ref:s({validate:function(e){return n[e]||Ze}}),validationMsg:f.creditAccount})),void 0!==k&&a.a.createElement(a.a.Fragment,null,a.a.createElement(w.a,null,a.a.createElement(L,null,void 0!==k&&n[p].name_kont)),a.a.createElement(w.a,null,a.a.createElement(L,null,void 0!==k&&a.a.createElement(ct,{value:k}))))),a.a.createElement("br",null),a.a.createElement(Ue,{name:"sum",size:7,label:"Summe",ref:s({required:rt,min:0}),validationMsg:f.sum}),a.a.createElement(X,null),a.a.createElement(Qe,{size:7,name:"tax",label:"Steuerschl.",options:l.map((function(e){return{value:e.fasuch,name:e.fatext}})),ref:s({validate:function(e){return F.indexOf(e)>-1||tt}}),validationMsg:f.tax}),a.a.createElement("br",null),a.a.createElement(qe,{name:"text",label:"Text\xa0",size:30,ref:s({required:nt}),validationMsg:f.text})),a.a.createElement(Ee,{cancel:e.cancel}))};function ot(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var lt=function(e){return"".concat(e.getDate(),"-").concat(e.getMonth()+1,"-").concat(e.getFullYear())};var it=function(){var e=Object(r.useState)(""),t=Object(b.a)(e,2),n=t[0],c=t[1],u=function(e){return c(parseInt(e))},o=Object(r.useState)(!1),l=Object(b.a)(o,2),i=l[0],m=l[1],s=k([y,i]),v=s.accountingRecords,p=s.arMessages,g=s.saveAccountingRecord,h=s.loading,O=Object(r.useState)(),j=Object(b.a)(O,2),x=j[0],S=j[1],w=void 0===x,K=!w,F=function(){return S(void 0)};function D(e){if(e===v.keys().next().value+1){var t=v.size>0?v.values().next().value.date:lt(new Date);S({date:t,accountedDate:t})}else v.has(e)?(e!==n&&u(e),S(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ot(n,!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ot(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},v.get(e)))):P.info("Position ".concat(e," nicht erlaubt."))}E()((function(){return F()}),{detectKeys:[27]}),Object(r.useEffect)((function(){if(v.size>0){var e=v.values().next().value;u(y(e)+1)}}),[v,i]);var P=Object(d.c)();return Object(r.useEffect)((function(){if(p&&p.length>0){var e=p[p.length-1];e instanceof Error?P.error(e.message):e.title&&"success"===e.title?(P.success(e.message),F(),m(!i)):P.info(e.message)}}),[p]),a.a.createElement(a.a.Fragment,null,a.a.createElement(Q,{right:"laufende Buchung"},a.a.createElement(L,null,w?"":v.has(n)?"korrigiere ":"neue ")),w&&a.a.createElement(pe,{autoFocus:!0,newRecordButtonText:"neue Buchung",label:"Position Nr.",value:n,onSubmit:function(){return D(n)},onChange:u}),K&&a.a.createElement(ut,{onSubmit:g,cancel:F,pos:n,defaultValues:x}),a.a.createElement(U,null),h?a.a.createElement(ee,null):a.a.createElement(Y,null,a.a.createElement(He,{attributes:[{name:"Pos.",selector:function(e){return e.pos}},{name:"Datum",selector:function(e){return e.date},date:!0},{name:"Soll",selector:function(e){return e.debitAccount}},{name:"Haben",selector:function(e){return e.creditAccount}},{name:"Summe",selector:function(e){return e.sum},number:!0},{name:"Text",selector:function(e){return e.text}}],values:Array.from(v,(function(e){var t=Object(b.a)(e,2);t[0];return t[1]})),keySelector:y,onRowClick:function(e){return D(y(e))}})))};function mt(){var e=Object(K.a)(["\n  margin-top: 15px;\n  display: flex;\n  height: 100%;\n  justify-content: space-evenly;\n"]);return mt=function(){return e},e}var st=i.b.div(mt()),ft={2:"/accounts",6:"/kontenabfrage",7:"/konten-saldo",9:"/laufende-buchung",12:"/guv"};function bt(e){return a.a.createElement("li",null,e.to?a.a.createElement(o.b,e):a.a.createElement(I,null,e.children))}function dt(e){var t=e.name,n=e.children,r=e.start,c=void 0===r?1:r;return a.a.createElement(a.a.Fragment,null,a.a.createElement(L,null,t),a.a.createElement("ol",{start:c},n))}var vt=function(){var e=Object(r.useState)(),t=Object(b.a)(e,2),n=t[0],c=t[1],u=Object(r.useState)(""),o=Object(b.a)(u,2),i=o[0],m=o[1],s=Object(r.useState)(),f=Object(b.a)(s,2),v=f[0],E=f[1],p=Object(d.c)();return Object(r.useEffect)((function(){v&&p.error(v)}),[v]),n?a.a.createElement(l.a,{to:n}):a.a.createElement(a.a.Fragment,null,a.a.createElement(Q,{middle:!0},"Hauptmenue"),a.a.createElement(st,null,a.a.createElement("div",null,a.a.createElement(dt,{name:"Stammdaten"},a.a.createElement(bt,null,"Steuerschluessel"),a.a.createElement(bt,{to:ft[2]},"Konten"),a.a.createElement(bt,null,"Reorganisation"),a.a.createElement(bt,null,"Kontenbelegung")),a.a.createElement(dt,{name:"Ausdruck",start:5},a.a.createElement(bt,null,"Journal"),a.a.createElement(bt,{to:ft[6]},"Kontenabfrage"),a.a.createElement(bt,{to:ft[7]},"Konten - Saldo"),a.a.createElement(bt,null,"Konten - Plan"))),a.a.createElement("div",null,a.a.createElement(dt,{name:"Laufende Verarbeitung",start:9},a.a.createElement(bt,{to:ft[9]},"Laufende Buchung")),a.a.createElement(dt,{name:"Offene-Posten-Auswertungen",start:10},a.a.createElement(bt,null,"Kunde"),a.a.createElement(bt,null,"Lieferant")),a.a.createElement(dt,{name:"Abschluss, Auswertungen",start:12},a.a.createElement(bt,{to:ft[12]},"Gewinn und Verlust"),a.a.createElement(bt,null,"Kontrollfunktion"),a.a.createElement(bt,null,"Monatsabschluss")))),a.a.createElement(st,null,a.a.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault(),ft[i]?c(ft[i]):(m(""),E("ungueltige Menueauswahl"))}(e)}},a.a.createElement(ie,{autoFocus:!0,label:"Ihre Auswahl",size:"2",value:i,onChange:function(e){return m(e.target.value)}}))))},Et=function(e){return"".concat(e.getFullYear(),"-").concat(e.getMonth()+1,"-").concat(e.getDate())},pt=function(e,t){return"/account-overview?from=".concat(e,"&to=").concat(t)};var gt=function(){var e=Object(r.useState)("2000-01-01"),t=Object(b.a)(e,2),n=t[0],c=t[1],u=Object(r.useState)(Et(new Date)),o=Object(b.a)(u,2),i=o[0],m=o[1],s=Object(r.useState)(pt(n,i)),f=Object(b.a)(s,2),v=f[0],p=f[1],g=Object(r.useState)(),h=Object(b.a)(g,2),O=h[0],j=h[1];E()((function(){return j(!0)}),{detectKeys:[27]});var x=Xe(v),y=x.result,S=x.loading,k=x.error,w=Xe("/account-plan"),K=w.result,F=w.error,D=K||{},P=Xe("/account-config"),M=P.result,B=P.acErrored,z=Object(d.c)();return Object(r.useEffect)((function(){k&&z.error("Konnte Kontenabfrage nicht vom Server laden"),F&&z.error("Konnte Kontenplan (konten.dbf) nicht vom Server laden"),B&&z.error("Konnte Kontenkonfiguration (account-config.edn) nicht vom Server laden")}),[k,F,B]),O?a.a.createElement(l.a,{to:O}):a.a.createElement(a.a.Fragment,null,a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),p(pt(n,i))}},a.a.createElement(Q,{join:!0},"Kontenabfrage",a.a.createElement($e,{value:n,onChange:function(e){return c(e.target.value)},autoFocus:!0,name:"from",label:" von"}),"\xa0",a.a.createElement($e,{value:i,onChange:function(e){return m(e.target.value)},name:"to",label:"bis"})),a.a.createElement(de,null,a.a.createElement(ve,{active:!0,text:"ESC: Hauptmenue",command:function(){return j("/")}}),a.a.createElement(ve,{active:!0,text:"\u21a9 : anwenden",submit:!0}))),a.a.createElement(U,null),S?a.a.createElement(ee,null):k?a.a.createElement(te,null):a.a.createElement(Y,null,Object.keys(y||{}).map((function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement(J,null,M?M.kklasse_name[e]:e),a.a.createElement(He,{accountingSummary:!0,attributes:[{name:"Konto",selector:function(e){return e.account}},{name:"Kontoname",selector:function(e){return D[e.account]?D[e.account].name_kont:e.account}},{name:"Haben",summarize:"H",suffix:"H",number:!0,selector:function(e){return 0!==e.debit&&e.debit}},{name:"Soll",summarize:"S",suffix:"S",number:!0,selector:function(e){return 0!==e.credit&&e.credit}},{name:"Saldo",expressive:!0,creditDebitSuffix:!0,number:!0,selector:function(e){return e.debit-e.credit}}],values:y[e],keySelector:function(e){return e.account},onRowClick:function(e){return j("/konten-saldo/"+e.account)}}))}))))};var ht=function(){var e=Object(l.g)().accountNo,t=Object(r.useState)(e),n=Object(b.a)(t,2),c=n[0],u=n[1],o=Xe("/account-expressive?accountNo="+e),i=o.result,m=o.loading,s=o.error,f=Xe("/account-plan"),v=f.result,p=f.error,g=Object.keys(v||{}).map((function(e){return{value:v[e].konto_nr,name:v[e].name_kont}})),h=Object(d.c)();Object(r.useEffect)((function(){s&&h.error("Konnte Kontensaldo nicht vom Server laden"),p&&h.error("Konnte Kontenplan (konten.dbf) nicht vom Server laden")}),[s,p]);var O=Object(r.useState)(),j=Object(b.a)(O,2),x=j[0],y=j[1];return E()((function(){return y("/")}),{detectKeys:[27]}),x?a.a.createElement(l.a,{from:"/konten-saldo/"+c,to:x}):a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),y("/reload/konten-saldo/"+c)}},a.a.createElement(Q,{right:a.a.createElement(Qe,{options:g,autoFocus:!0,name:"account",value:c,onChange:function(e){return u(e.target.value)}})},a.a.createElement(Z,null,"Kontosaldo von"," ",v&&v[e]&&a.a.createElement(L,null,"\xa0",v[e].name_kont))),a.a.createElement(de,null,a.a.createElement(ve,{active:!0,text:"ESC: Hauptmenue",command:function(){return y("/")}}),a.a.createElement(ve,{active:!0,text:"Kontenabfrage",command:function(){return y("/kontenabfrage")}}),a.a.createElement(ve,{active:!0,text:"\u21a9 : Kontensaldo",type:"submit"})),a.a.createElement(U,null),m?a.a.createElement(ee,null):s?a.a.createElement(te,null):i&&i.length<1?a.a.createElement(Z,null,"Keine Buchungen gefunden"):a.a.createElement(Y,null,a.a.createElement(He,{attributes:[{name:"Beleg",selector:function(e){return e.pos}},{name:"Buchung",date:!0,selector:function(e){return e.accountedDate}},{name:"Haben",summarize:"H",number:!0,suffix:"H",selector:function(e){return 0!==e.debit&&e.debit}},{name:"Soll",summarize:"S",number:!0,suffix:"S",selector:function(e){return 0!==e.credit&&e.credit}},{name:"Buchungstext",expressive:!0,selector:function(e){return e.text}},{name:"Gegen",selector:function(e){return e.gegen}}],values:i,keySelector:function(e){return e.pos},accountingSummary:!0})))};var Ot=function(){var e=Object(l.g)(),t=e.url,n=e.param;return a.a.createElement(l.a,{to:"/"+t+"/"+n})};var jt=function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement($,null,a.a.createElement("form",{onSubmit:e.onSubmit},"editing...")),a.a.createElement(Ee,{cancel:e.cancel}))};var xt=function(){var e=Object(r.useState)(),t=Object(b.a)(e,2),n=t[0],a=t[1],c=void 0===n,u=!c;return E()((function(){return a(void 0)}),{detectKeys:[27]}),{recordTemplate:n,setRecordTemplate:a,selectMode:c,editMode:u}},yt=function(e){return e.konto_nr};var St=function(){var e=Xe("/account-plan-atts"),t=e.result,n=e.loading,c=e.error,u=Xe("/account-plan"),o=u.result,l=u.loading,i=u.error,m=Object.keys(o||{}).map((function(e){return o[e]})),s=Object(r.useState)(""),f=Object(b.a)(s,2),d=f[0],v=f[1],E=xt(),p=E.editMode,g=E.selectMode,h=E.recordTemplate,O=E.setRecordTemplate,j=function(e){return O(o[e])};return a.a.createElement(a.a.Fragment,null,a.a.createElement(Q,{middle:!0},"Konten"),g&&a.a.createElement(pe,{value:d,onChange:v,autoFocus:!0,newRecordButtonText:"neues Konto",label:"Kontennr.:",onSubmit:function(){return j(d)}}),p&&a.a.createElement(jt,{defaultValues:h}),a.a.createElement(U,null),l||n?a.a.createElement(ee,null):i||c?a.a.createElement(te,null):a.a.createElement(Y,null,a.a.createElement(He,{attributes:t.map((function(e){return e.toLowerCase()})).map((function(e){return{name:e,selector:function(t){return t[e]}}})),keySelector:function(e){return e.konto_nr},values:m,onRowClick:function(e){return j(yt(e))}})))};var kt=function(){var e=Xe("/guv"),t=e.result,n=e.loading,c=e.error,u=Object(d.c)();Object(r.useEffect)((function(){return c&&u.error("Konnte GuV nicht vom Server laden")}),[c]);var o=Object(r.useState)(!1),i=Object(b.a)(o,2),m=i[0],s=i[1];if(E()((function(){return s("/")}),{detectKeys:[27]}),m)return a.a.createElement(l.a,{to:m});var f=t?Object.keys(t.ertraege||{}):[];f.sort((function(e,t){return e===t?0:e>t?1:-1}));var v=[],p=0;return f.forEach((function(e){var n=t.aufwendungen[e],r=t.ertraege[e],a=r-n;p=a+p,v.push({month:e,ertrag:r,aufwand:n,gewinn:a,accumulated:p})})),a.a.createElement(a.a.Fragment,null,a.a.createElement(Q,null,a.a.createElement(Z,null,"Gewinn und Verlustrechnung")),a.a.createElement(de,null,a.a.createElement(ve,{active:!0,text:"ESC: Hauptmenue",command:function(){return s("/")}})),a.a.createElement(U,null),n?a.a.createElement(ee,null):a.a.createElement(Y,null,a.a.createElement(He,{accountingSummary:!0,attributes:[{name:"Monat",selector:function(e){return e.month},date:!0},{name:"Aufwendungen",summarize:"S",selector:function(e){return e.aufwand},number:!0,suffix:"S"},{name:"Ertraege",summarize:"H",selector:function(e){return e.ertrag},number:!0,suffix:"H"},{name:"Gewinn",selector:function(e){return e.gewinn},number:!0,creditDebitSuffix:!0,customFooter:v.reduce((function(e,t){return t.gewinn+e}),0)},{name:"Akkumuliert",selector:function(e){return e.accumulated},number:!0,creditDebitSuffix:!0,customFooter:p}],values:v,keySelector:function(e){return e.month}})))};var wt=function(){return a.a.createElement(i.a,{theme:s},a.a.createElement(o.a,null,a.a.createElement(q,null,a.a.createElement(W,null,a.a.createElement(l.d,null,a.a.createElement(l.b,{path:"/laufende-buchung"},a.a.createElement(it,null)),a.a.createElement(l.b,{path:"/reload/:url/:param"},a.a.createElement(Ot,null)),a.a.createElement(l.b,{path:"/kontenabfrage"},a.a.createElement(gt,null)),a.a.createElement(l.b,{path:"/konten-saldo/:accountNo"},a.a.createElement(ht,null)),a.a.createElement(l.b,{path:"/konten-saldo"},a.a.createElement(ht,null)),a.a.createElement(l.b,{path:"/guv"},a.a.createElement(kt,null)),a.a.createElement(l.b,{path:"/accounts"},a.a.createElement(St,null)),a.a.createElement(l.b,{path:"/"},a.a.createElement(vt,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Kt=n(33),Ft={timeout:5e3,position:d.b.BOTTOM_CENTER};u.a.render(a.a.createElement((function(){return a.a.createElement(d.a,Object.assign({template:Kt.a},Ft),a.a.createElement(wt,null))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[37,1,2]]]);
//# sourceMappingURL=main.207356b6.chunk.js.map