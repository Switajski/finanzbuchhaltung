(this.webpackJsonpfinanzbuchhaltung=this.webpackJsonpfinanzbuchhaltung||[]).push([[0],{26:function(e){e.exports=JSON.parse('{"name":"finanzbuchhaltung","version":"2.1.7","private":false,"dependencies":{"react":"^16.10.2","react-alert":"^5.5.0","react-alert-template-basic":"^1.0.0","react-dom":"^16.10.2","react-hook-form":"^3.27.0","react-router-dom":"^5.1.2","react-scripts":"3.2.0","react-transition-group":"^4.2.1","styled-components":"^4.3.0","use-key-hook":"^1.5.0"},"scripts":{"start":"react-scripts start","build":"react-scripts build ","postbuild":"rm -rf ../resources/public && mv build ../resources/public","test":"react-scripts test","eject":"react-scripts eject"},"eslintConfig":{"extends":"react-app"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"proxy":"http://localhost:4000"}')},36:function(e,t,n){e.exports=n(54)},41:function(e,t,n){},42:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(18),u=n.n(c),l=(n(41),n(16)),o=n(17),i=n(2),m="rgb(7,1,126)",s={background:m,font:"rgb(179,179,179);",variable:m,variableBg:"rgb(0,110,107)",active:m,activeBg:"rgb(179,179,179);",minor:"#5a5a5a",emphasize:"rgb(253,255,0)",header:"white"},f=(n(42),n(8)),b=n(1),d=n(10),v=n(12),p=n.n(v),E=n(4),g=n.n(E),h=n(15),O=n(7);function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(n,!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(e){return parseInt(e.pos)},S=function(e,t){return fetch(e,t).then((function(e){if(!e.ok)throw new Error(e.statusText+" at "+e.url);return e.json()}))};var w=function(e){var t=Object(r.useState)(new Map),n=Object(b.a)(t,2),a=n[0],c=n[1],u=Object(r.useState)([]),l=Object(b.a)(u,2),o=l[0],i=l[1],m=Object(r.useState)(!1),s=Object(b.a)(m,2),f=s[0],d=s[1];return Object(r.useEffect)((function(){(function(){var e=Object(O.a)(g.a.mark((function e(){var t,n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),e.prev=1,e.next=4,S("/accounting-records");case 4:t=e.sent,n=t.slice(1).sort((function(e,t){return y(t)-y(e)})).reduce((function(e,t){return e.set(y(t),t),e}),new Map),d(!1),c(n),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),d(!1),i([].concat(Object(h.a)(o),[e.t0]));case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}})()()}),[].concat(Object(h.a)(e),[o])),{accountingRecords:a,arMessages:o,saveAccountingRecord:function(e){(function(){var t=Object(O.a)(g.a.mark((function t(){var n;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=a.has(y(e))?"/update-record":"/create-record",t.next=4,S(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(x({},e))});case 4:i([].concat(Object(h.a)(o),[(r="Buchung erfolgreich gespeichert",{title:"success",message:r})])),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),i([].concat(Object(h.a)(o),[t.t0]));case 10:case"end":return t.stop()}var r}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}})()()},loading:f}},k=n(3),K=n(26);function F(){var e=Object(k.a)(["height: 100%;\ndisplay: flex;\nalign-items: center;\njustify-content: center;"]);return F=function(){return e},e}function D(){var e=Object(k.a)(["align-self:center; text-align:center;"]);return D=function(){return e},e}function P(){var e=Object(k.a)(["flex: 1 1 auto;"]);return P=function(){return e},e}function z(){var e=Object(k.a)(["\ndisplay:flex;\njustify-content: space-between;"]);return z=function(){return e},e}function M(){var e=Object(k.a)(["white-space:nowrap;"]);return M=function(){return e},e}function B(){var e=Object(k.a)(["\npadding: 5px 20px 5px 20px;"]);return B=function(){return e},e}function C(){var e=Object(k.a)(["\nmargin:0;\nborder:0.5px solid;"]);return C=function(){return e},e}function R(){var e=Object(k.a)(["\noverflow:scroll;\npadding:0 20px 0 20px;\nflex-grow : 1;"]);return R=function(){return e},e}function A(){var e=Object(k.a)(["\nheight: 100%;\ndisplay: flex;\nflex-flow: column;\noverflow:hidden;\n@media not print {border: 1px solid;}"]);return A=function(){return e},e}function T(){var e=Object(k.a)(["\n@media not print {\n    height: 95vh;\n}\ndisplay: block;\nmax-width: 1000px;\nmargin-left:auto;\nmargin-right:auto;\nmargin-top: 1em;"]);return T=function(){return e},e}function H(){var e=Object(k.a)(["\ntext-transform: uppercase"]);return H=function(){return e},e}function _(){var e=Object(k.a)(["\ncolor: ",""]);return _=function(){return e},e}function V(){var e=Object(k.a)(["visibility:hidden;"]);return V=function(){return e},e}function N(){var e=Object(k.a)(["\n@media not print {\n    color: ","\n}"]);return N=function(){return e},e}function G(){var e=Object(k.a)(["\nbackground-color: ",";\ncolor: ",";\nborder: 0;\n:hover {\n    color: ","\n}\n:active {\n    color: ","\n}"]);return G=function(){return e},e}function L(){var e=Object(k.a)(["\nbackground-color: ",";\ncolor: ",";"]);return L=function(){return e},e}i.b.span(L(),(function(e){return e.theme.variableBg}),(function(e){return e.theme.header}));var I=i.b.button(G(),(function(e){return e.theme.variableBg}),(function(e){return e.active?e.theme.header:e.theme.brightGrey}),(function(e){return e.theme.emphasize}),(function(e){return e.theme.active})),J=i.b.span(N(),(function(e){return e.theme.emphasize})),q=i.b.span(V()),W=function(e){var t=e.size;return a.a.createElement(q,null,Array.from(new Array(t),(function(){return"x"})).map((function(){return"x"})))},Y=i.b.span(_(),(function(e){return e.theme.minor})),U=i.b.p(H()),$=i.b.div(T()),Q=i.b.div(A()),X=i.b.div(R()),Z=i.b.hr(C()),ee=i.b.div(B()),te=i.b.span(M()),ne=i.b.div(z()),re=i.b.div(P()),ae=i.b.div(D());function ce(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement(ne,null,a.a.createElement(ae,null,"FIBU ",K.version),e.right&&a.a.createElement(re,null),a.a.createElement("div",e,e.children),!e.right&&a.a.createElement("div",null)),a.a.createElement(Z,null))}function ue(){return a.a.createElement(a.a.Fragment,null,"\xa0 \xa0")}var le=i.b.div(F());function oe(){return a.a.createElement(le,null,a.a.createElement(J,null,"laedt..."))}function ie(){return a.a.createElement(le,null,a.a.createElement(J,null,"Konnte Daten aufgrund eines Serverfehlers nicht laden"))}function me(){var e=Object(k.a)(["\nmargin-right: 7px;"]);return me=function(){return e},e}function se(){var e=Object(k.a)(["\ncolor: ",";\nbackground-color: ",";\nborder: none;\n&:focus {\n    color: ",";\n    background-color: ",";\n    border:none;\n}"]);return se=function(){return e},e}function fe(){var e=Object(k.a)(["\nwhite-space: nowrap;"]);return fe=function(){return e},e}function be(){var e=Object(k.a)(["\nfont-size:smaller;"]);return be=function(){return e},e}var de=i.b.span(be()),ve=i.b.span(fe()),pe=i.b.input(se(),(function(e){return e.theme.variable}),(function(e){return e.theme.variableBg}),(function(e){return e.theme.active}),(function(e){return e.theme.activeBg}));pe.defaultProps={theme:{inputBg:"white",input:"black"}};var Ee=i.b.label(me()),ge=function(e){return a.a.createElement(ve,null,a.a.createElement(J,null,"\u26a0 ",a.a.createElement(de,null,e.text)))};var he=Object(r.forwardRef)((function(e,t){return a.a.createElement(a.a.Fragment,null,a.a.createElement(Ee,null,a.a.createElement(ve,null,e.label)),a.a.createElement(pe,Object.assign({},e,{ref:t})))}));function Oe(){var e=Object(k.a)(["\n  display: flex;\n  align-content: flex-end;\n  justify-content: space-between;\n  @media print {\n    display: none;\n  }\n"]);return Oe=function(){return e},e}function je(){var e=Object(k.a)(["\n  width: 100%;\n  font-size: 1em;\n"]);return je=function(){return e},e}var xe=Object(i.b)(I)(je()),ye=i.b.div(Oe());function Se(e){return a.a.createElement(ye,{columns:5},e.children)}function we(e){return a.a.createElement("div",null,e.active&&a.a.createElement(xe,Object.assign({type:e.submit?"submit":"button"},e,{onClick:e.command}),e.symbol&&e.symbol,e.text))}function ke(e){return a.a.createElement(Se,null,a.a.createElement(we,{active:!0,type:"reset",command:e.cancel,key:"ESC",text:"ESC: Abbrechen"}),a.a.createElement(we,{active:!0,text:"\u21b9 : naechstes Feld"}),a.a.createElement(we,{active:!0,text:"\u21a9 : speichern",type:"submit"}))}var Ke=function(e){var t=Object(r.useState)(!1),n=Object(b.a)(t,2),c=n[0],u=n[1];return p()((function(){return u(!0)}),{detectKeys:[27]}),c?a.a.createElement(o.a,{to:"/"}):a.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.onSubmit()}},a.a.createElement(ee,null,a.a.createElement(ne,null,a.a.createElement("div",null,a.a.createElement(he,Object.assign({},e,{type:"number",style:{width:"50px"},min:"1",onChange:function(t){return e.onChange(t.target.value)}}))))),a.a.createElement(Se,null,a.a.createElement(we,{active:!0,text:"ESC: Hauptmenue",command:function(){return u(!0)}}),a.a.createElement(we,{active:!0,text:" : "+e.newRecordButtonText,symbol:"\u21a9",command:function(){return e.onSubmit()}})))},Fe=n(35);function De(){var e=Object(k.a)(["",""]);return De=function(){return e},e}function Pe(){var e=Object(k.a)(["text-align:right;"]);return Pe=function(){return e},e}function ze(){var e=Object(k.a)(["text-align:right;"]);return ze=function(){return e},e}var Me=i.b.th(ze()),Be=function(e){return e&&parseFloat(Math.round(100*e)/100).toFixed(2)},Ce=i.b.td(Pe()),Re=function(e){return e.th?a.a.createElement(Me,e):a.a.createElement(Ce,e)},Ae=function(e){var t=e.children;return a.a.createElement(a.a.Fragment,null,"\xa0",t)},Te=i.b.span(De(),(function(e){return e.value%1===0&&"padding-right: 1.85em;"})),He=function(e){var t=e.children,n=e.th,r=e.creditDebitSuffix,c=e.suffix,u=t;if(void 0===u)return a.a.createElement(Re,{th:n});if(Be(u)===Be(0))return a.a.createElement(Re,{th:n},"0",(r||c)&&a.a.createElement(a.a.Fragment,null,"\xa0\xa0"));var l=u<0,o=(r?function(e){return e<0?-e:e}(u):u).toLocaleString();return a.a.createElement(Re,{th:n},u&&a.a.createElement(a.a.Fragment,null,a.a.createElement(Te,{value:u},function(e){return 10*e%1===0&&e%1!==0}(u)?o+"0":o),c&&a.a.createElement(Ae,null,c),r&&a.a.createElement(Ae,null,l?"S":"H")))};function _e(){var e=Object(k.a)(["\n    text-align:",";"]);return _e=function(){return e},e}function Ve(){var e=Object(k.a)(["\n",""]);return Ve=function(){return e},e}function Ne(){var e=Object(k.a)(["\n  width: 100%;\n  border-collapse:collapse;\n  @media print {\n      td {\n        border-bottom: 1px dotted;\n      }\n  }\n  th, td {\n    margin: 0;\n    padding: 3px 5px 3px 3px;\n  }\n  tr:nth-child(even) {\n      background-color: #06025e;\n  }\n  thead th {\n    border-bottom: 1px solid;\n  }\n  tfoot th {\n    border-top: 1px solid;\n  }"]);return Ne=function(){return e},e}function Ge(){var e=Object(k.a)(["white-space: nowrap;"]);return Ge=function(){return e},e}var Le=i.b.td(Ge()),Ie=function(e){e.selector;var t=Object(Fe.a)(e,["selector"]);return e.number?a.a.createElement(He,t):e.date?a.a.createElement(Le,t):a.a.createElement("td",t)},Je=i.b.table(Ne()),qe=i.b.tr(Ve(),(function(e){return e.link&&"\ncursor:pointer;\n&:hover {\n    background-color:"+e.theme.variableBg+" !important;\n    color:"+e.theme.active+";\n}\n"})),We=i.b.th(_e(),(function(e){return e.alignRight?"right":"left"}));var Ye=function(e){return a.a.createElement(Je,{cellspacing:"0",cellpadding:"0"},a.a.createElement("thead",null,a.a.createElement("tr",null,e.attributes.map((function(e){return a.a.createElement(We,{alignRight:e.number,number:e.number,key:e.name},e.name)})))),a.a.createElement("tbody",null,e.values&&e.values.map((function(t){return a.a.createElement(qe,{link:e.onRowClick,onClick:function(){return e.onRowClick&&e.onRowClick(t)},key:e.keySelector(t)},e.attributes.map((function(e,n){return a.a.createElement(Ie,Object.assign({},e,{key:n}),e.selector(t))})))}))),e.accountingSummary&&e.values&&a.a.createElement("tfoot",null,a.a.createElement("tr",null,e.attributes.map((function(t){var n=t.name;return t.customFooter?a.a.createElement(He,{th:!0,creditDebitSuffix:!0,key:n},t.customFooter):t.summarize?a.a.createElement(He,{th:!0,suffix:t.summarize,key:n},e.values.reduce((function(e,n){return e+t.selector(n)}),0)):t.expressive?a.a.createElement(He,{th:!0,creditDebitSuffix:!0},e.values.reduce((function(e,t){return e+t.debit-t.credit}),0)):a.a.createElement(He,{th:!0,key:n})})))),e.children)},Ue=n(31);function $e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var Qe=function(e,t){return fetch(e,t).then((function(e){if(!e.ok)throw new Error(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?$e(n,!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):$e(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,{name:e.status,status:e.status,message:e.statusText,url:e.url}));return e.json()}))},Xe=function(){var e=Object(O.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Qe("/balance?accountNo="+t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ze=function(e){var t=e.accountPlan,n=e.debitAccount,a=e.creditAccount,c=Object(r.useState)(!1),u=Object(b.a)(c,2),l=u[0],o=u[1],i=Object(r.useState)(),m=Object(b.a)(i,2),s=m[0],f=m[1],d=Object(r.useState)(),v=Object(b.a)(d,2),p=v[0],E=v[1];return Object(r.useEffect)((function(){(function(){var e=Object(O.a)(g.a.mark((function e(){var r,c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!t[n]){e.next=8;break}return e.next=4,Xe(n);case 4:r=e.sent,f(r.sum),e.next=9;break;case 8:f(void 0);case 9:if(!t[a]){e.next=16;break}return e.next=12,Xe(a);case 12:c=e.sent,E(c.sum),e.next=17;break;case 16:E(void 0);case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(0),o(!0);case 22:case"end":return e.stop()}}),e,null,[[0,19]])})));return function(){return e.apply(this,arguments)}})()()}),[t,n,a]),[{creditBalance:p,debitBalance:s},l]};function et(){var e=Object(k.a)(["\n",""]);return et=function(){return e},e}var tt=Object(i.b)(he)(et(),(function(e){return e.emphasize&&"background-color:"+e.theme.emphasize+";"}));var nt=Object(r.forwardRef)((function(e,t){return a.a.createElement(a.a.Fragment,null,a.a.createElement(tt,Object.assign({},e,{ref:t,emphasize:e.validationMsg})),e.validationMsg&&a.a.createElement(ge,{text:e.validationMsg.message}))}));function rt(){var e=Object(k.a)(["\ntext-align:right;"]);return rt=function(){return e},e}var at=Object(i.b)(tt)(rt());var ct=Object(r.forwardRef)((function(e,t){return a.a.createElement(at,Object.assign({},e,{emphasize:e.validationMsg,ref:t,type:"number",step:"any"}))}));var ut=Object(r.forwardRef)((function(e,t){return a.a.createElement(a.a.Fragment,null,a.a.createElement(tt,Object.assign({rows:1},e,{emphasize:e.validationMsg,ref:t,placeholder:"dd.mm.yyyy",value:e.value,type:"date"})),e.validationMsg&&a.a.createElement(ge,{text:e.validationMsg.message}))}));function lt(){var e=Object(k.a)(["margin-left: 5px;"]);return lt=function(){return e},e}var ot=i.b.span(lt());var it=Object(r.forwardRef)((function(e,t){return a.a.createElement(a.a.Fragment,null,a.a.createElement(tt,Object.assign({size:7},e,{emphasize:e.validationMsg,ref:t,list:e.name})),a.a.createElement("datalist",{id:e.name},e.options.map((function(e){return a.a.createElement("option",{key:e.value,value:e.value},e.value," - ",e.name)}))),e.validationMsg&&a.a.createElement(ot,null,a.a.createElement(ge,{text:e.validationMsg.message})))}));var mt=function(e){var t=Object(r.useState)(),n=Object(b.a)(t,2),a=n[0],c=n[1],u=Object(r.useState)(!0),l=Object(b.a)(u,2),o=l[0],i=l[1],m=Object(r.useState)(),s=Object(b.a)(m,2),f=s[0],d=s[1];return Object(r.useEffect)((function(){i(!0),function(){var t=Object(O.a)(g.a.mark((function t(){var n;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(e).then((function(e){if(!e.ok)throw new Error(e.statusText+" at "+e.url);return e.json()}));case 3:n=t.sent,i(!1),c(n),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),i(!1),d(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(){return t.apply(this,arguments)}}()()}),[e]),{result:a,error:f,loading:o}};function st(){var e=Object(k.a)(["white-space: nowrap;"]);return st=function(){return e},e}function ft(){var e=Object(k.a)(["text-align:right;"]);return ft=function(){return e},e}function bt(){var e=Object(k.a)(["\ndisplay:flex;\njustify-content: flex-start;"]);return bt=function(){return e},e}function dt(){var e=Object(k.a)(["\ndisplay:flex;\njustify-content: space-between;"]);return dt=function(){return e},e}var vt=i.b.div(dt()),pt=i.b.div(bt()),Et="Konto ex. nicht",gt="Datum ex. nicht",ht="Steuerschl. ex. nicht",Ot="Keinen Text eingegeben",jt="Keinen Betrag eingegeben",xt=function(e){return isNaN(Date.parse(e))},yt=i.b.div(ft()),St=i.b.span(st()),wt=function(e){var t=e.value;return a.a.createElement(a.a.Fragment,null,"Saldo ",a.a.createElement(St,null,(t<0?-t:t).toLocaleString()," ",t<0?"S":"H"," "))};var kt=function(e){var t=mt("/account-plan"),n=t.result,c=t.loading,u=t.error,l=Object.keys(n||{}).map((function(e){return{value:n[e].konto_nr,name:n[e].name_kont}})),o=mt("/taxes").result||[],i=Object(Ue.a)({defaultValues:e.defaultValues}),m=i.handleSubmit,s=i.register,f=i.errors,d=i.reset;Object(r.useEffect)((function(){return d(e.defaultValues)}),[e.defaultValues,d]);var v=Object(r.useState)(),p=Object(b.a)(v,2),E=p[0],g=p[1],h=Object(r.useState)(),O=Object(b.a)(h,2),j=O[0],x=O[1],y=Ze({accountPlan:n,debitAccount:j,creditAccount:E}),S=Object(b.a)(y,1)[0],w=S.creditBalance,k=S.debitBalance,K=o.map((function(e){return e.fasuch}));return u?a.a.createElement("p",null,"Konnte Buchungsplan nicht vom Server laden."):c?a.a.createElement(oe,null):a.a.createElement("form",{onSubmit:m(e.onSubmit)},a.a.createElement(ee,null,a.a.createElement(vt,null,a.a.createElement("div",null,a.a.createElement(he,{name:"pos",label:"Pos.",size:6,readOnly:!0,value:e.pos,ref:s})),a.a.createElement("div",null,a.a.createElement(ut,{name:"date",label:"Datum",autoFocus:!0,ref:s({validate:function(e){return!xt(e)||gt}}),validationMsg:f.date})),a.a.createElement("div",null,a.a.createElement(ut,{name:"accountedDate",label:"Buchungsdatum",ref:s({validate:function(e){return!xt(e)||gt}}),validationMsg:f.accountedDate}),a.a.createElement("br",null))),a.a.createElement("br",null),a.a.createElement(vt,null,a.a.createElement("div",null,a.a.createElement(it,{name:"debitAccount",label:"Konto Soll\xa0\xa0",onChange:function(e){return x(e.target.value)},options:l,ref:s({validate:function(e){return n[e]||Et}}),validationMsg:f.debitAccount})),void 0!==k&&a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null,a.a.createElement(J,null,void 0!==k&&n[j]&&n[j].name_kont)),a.a.createElement(yt,null,a.a.createElement(J,null,void 0!==k&&a.a.createElement(wt,{value:k}))))),a.a.createElement(vt,null,a.a.createElement("div",null,a.a.createElement(it,{name:"creditAccount",label:"Konto Haben\xa0",onChange:function(e){return g(e.target.value)},options:l,ref:s({validate:function(e){return n[e]||Et}}),validationMsg:f.creditAccount})),void 0!==w&&a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null,a.a.createElement(J,null,void 0!==w&&n[E].name_kont)),a.a.createElement(yt,null,a.a.createElement(J,null,void 0!==w&&a.a.createElement(wt,{value:w}))))),a.a.createElement("br",null),a.a.createElement(pt,null,a.a.createElement("div",null,a.a.createElement(ct,{name:"sum",size:7,label:"Summe",ref:s({required:jt,min:0}),validationMsg:f.sum}),a.a.createElement(ue,null)),a.a.createElement("div",null,a.a.createElement(it,{size:7,name:"tax",label:"Steuerschl.",options:o.map((function(e){return{value:e.fasuch,name:e.fatext}})),ref:s({validate:function(e){return K.indexOf(e)>-1||ht}}),validationMsg:f.tax})),a.a.createElement("br",null)),a.a.createElement(nt,{name:"text",label:"Text\xa0",size:30,ref:s({required:Ot}),validationMsg:f.text})),a.a.createElement(ke,{cancel:e.cancel}))};function Kt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var Ft=function(e){return"".concat(e.getDate(),"-").concat(e.getMonth()+1,"-").concat(e.getFullYear())};var Dt=function(){var e=Object(r.useState)(""),t=Object(b.a)(e,2),n=t[0],c=t[1],u=function(e){return c(parseInt(e))},l=Object(r.useState)(!1),o=Object(b.a)(l,2),i=o[0],m=o[1],s=w([y,i]),v=s.accountingRecords,E=s.arMessages,g=s.saveAccountingRecord,h=s.loading,O=Object(r.useState)(),j=Object(b.a)(O,2),x=j[0],S=j[1],k=void 0===x,K=!k,F=function(){return S(void 0)};function D(e){if(e===v.keys().next().value+1){var t=v.size>0?v.values().next().value.date:Ft(new Date);S({date:t,accountedDate:t})}else v.has(e)?(e!==n&&u(e),S(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Kt(n,!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Kt(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},v.get(e)))):P.info("Position ".concat(e," nicht erlaubt."))}p()((function(){return F()}),{detectKeys:[27]}),Object(r.useEffect)((function(){if(v.size>0){var e=v.values().next().value;u(y(e)+1)}}),[v,i]);var P=Object(d.c)();return Object(r.useEffect)((function(){if(E&&E.length>0){var e=E[E.length-1];e instanceof Error?P.error(e.message):e.title&&"success"===e.title?(P.success(e.message),F(),m(!i)):P.info(e.message)}}),[E]),a.a.createElement(a.a.Fragment,null,a.a.createElement(ce,null,a.a.createElement(J,null,k?a.a.createElement(W,{size:11}):v.has(n)?"korrigiere ":a.a.createElement(a.a.Fragment,null,"neue ",a.a.createElement(W,{size:6}))),"\xa0laufende Buchung"),k&&a.a.createElement(Ke,{autoFocus:!0,newRecordButtonText:v.has(n)?"korrigiere":"neue Buchung",label:"Pos.",value:n,onSubmit:function(){return D(n)},onChange:u}),K&&a.a.createElement(kt,{onSubmit:g,cancel:F,pos:n,defaultValues:x}),a.a.createElement(Z,null),h?a.a.createElement(oe,null):a.a.createElement(X,null,a.a.createElement(Ye,{attributes:[{name:"Pos.",selector:function(e){return e.pos}},{name:"Datum",selector:function(e){return e.date},date:!0},{name:"Soll",selector:function(e){return e.debitAccount}},{name:"Haben",selector:function(e){return e.creditAccount}},{name:"Summe",selector:function(e){return e.sum},number:!0},{name:"Text",selector:function(e){return e.text}}],values:Array.from(v,(function(e){var t=Object(b.a)(e,2);t[0];return t[1]})),keySelector:y,onRowClick:function(e){return D(y(e))}})))};function Pt(){var e=Object(k.a)(["\n  margin-top: 15px;\n  display: flex;\n  height: 100%;\n  justify-content: space-evenly;\n"]);return Pt=function(){return e},e}var zt=i.b.div(Pt()),Mt={2:"/accounts",6:"/kontenabfrage",7:"/konten-saldo",9:"/laufende-buchung",12:"/guv"};function Bt(e){return a.a.createElement("li",null,e.to?a.a.createElement(l.b,e):a.a.createElement(Y,null,e.children))}function Ct(e){var t=e.name,n=e.children,r=e.start,c=void 0===r?1:r;return a.a.createElement(a.a.Fragment,null,a.a.createElement(J,null,t),a.a.createElement("ol",{start:c},n))}var Rt=function(){var e=Object(r.useState)(),t=Object(b.a)(e,2),n=t[0],c=t[1],u=Object(r.useState)(""),l=Object(b.a)(u,2),i=l[0],m=l[1],s=Object(r.useState)(),f=Object(b.a)(s,2),v=f[0],p=f[1],E=Object(d.c)();return Object(r.useEffect)((function(){v&&E.error(v)}),[v]),n?a.a.createElement(o.a,{to:n}):a.a.createElement(a.a.Fragment,null,a.a.createElement(ce,{middle:!0},"Hauptmenue"),a.a.createElement(zt,null,a.a.createElement("div",null,a.a.createElement(Ct,{name:"Stammdaten"},a.a.createElement(Bt,null,"Steuerschluessel"),a.a.createElement(Bt,{to:Mt[2]},"Konten"),a.a.createElement(Bt,null,"Reorganisation"),a.a.createElement(Bt,null,"Kontenbelegung")),a.a.createElement(Ct,{name:"Ausdruck",start:5},a.a.createElement(Bt,null,"Journal"),a.a.createElement(Bt,{to:Mt[6]},"Kontenabfrage"),a.a.createElement(Bt,{to:Mt[7]},"Konten - Saldo"),a.a.createElement(Bt,null,"Konten - Plan"))),a.a.createElement("div",null,a.a.createElement(Ct,{name:"Laufende Verarbeitung",start:9},a.a.createElement(Bt,{to:Mt[9]},"Laufende Buchung")),a.a.createElement(Ct,{name:"Offene-Posten-Auswertungen",start:10},a.a.createElement(Bt,null,"Kunde"),a.a.createElement(Bt,null,"Lieferant")),a.a.createElement(Ct,{name:"Abschluss, Auswertungen",start:12},a.a.createElement(Bt,{to:Mt[12]},"Gewinn und Verlust"),a.a.createElement(Bt,null,"Kontrollfunktion"),a.a.createElement(Bt,null,"Monatsabschluss")))),a.a.createElement(zt,null,a.a.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault(),Mt[i]?c(Mt[i]):(m(""),p("ungueltige Menueauswahl"))}(e)}},a.a.createElement(he,{autoFocus:!0,label:"Ihre Auswahl",size:"2",value:i,onChange:function(e){return m(e.target.value)}}))))},At=function(e){return"".concat(e.getFullYear(),"-").concat(e.getMonth()+1,"-").concat(e.getDate())},Tt=function(e,t){return"/account-overview?from=".concat(e,"&to=").concat(t)};var Ht=function(){var e=Object(r.useState)("2000-01-01"),t=Object(b.a)(e,2),n=t[0],c=t[1],u=Object(r.useState)(At(new Date)),l=Object(b.a)(u,2),i=l[0],m=l[1],s=Object(r.useState)(Tt(n,i)),f=Object(b.a)(s,2),v=f[0],E=f[1],g=Object(r.useState)(),h=Object(b.a)(g,2),O=h[0],j=h[1];p()((function(){return j(!0)}),{detectKeys:[27]});var x=mt(v),y=x.result,S=x.loading,w=x.error,k=mt("/account-plan"),K=k.result,F=k.error,D=K||{},P=mt("/account-config"),z=P.result,M=P.acErrored,B=Object(d.c)();return Object(r.useEffect)((function(){w&&B.error("Konnte Kontenabfrage nicht vom Server laden"),F&&B.error("Konnte Kontenplan (konten.dbf) nicht vom Server laden"),M&&B.error("Konnte Kontenkonfiguration (account-config.edn) nicht vom Server laden")}),[w,F,M]),O?a.a.createElement(o.a,{to:O}):a.a.createElement(a.a.Fragment,null,a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),E(Tt(n,i))}},a.a.createElement(ce,{join:!0},"Kontenabfrage",a.a.createElement(ut,{value:n,onChange:function(e){return c(e.target.value)},autoFocus:!0,name:"from",label:" von"}),"\xa0",a.a.createElement(te,null,a.a.createElement(ut,{value:i,onChange:function(e){return m(e.target.value)},name:"to",label:"bis"}))),a.a.createElement(Se,null,a.a.createElement(we,{active:!0,text:"ESC: Hauptmenue",command:function(){return j("/")}}),a.a.createElement(we,{active:!0,text:"\u21a9 : anwenden",submit:!0}))),a.a.createElement(Z,null),S?a.a.createElement(oe,null):w?a.a.createElement(ie,null):a.a.createElement(X,null,Object.keys(y||{}).map((function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement(U,null,z?z.kklasse_name[e]:e),a.a.createElement(Ye,{accountingSummary:!0,attributes:[{name:"Konto",selector:function(e){return e.account}},{name:"Kontoname",selector:function(e){return D[e.account]?D[e.account].name_kont:e.account}},{name:"Haben",summarize:"H",suffix:"H",number:!0,selector:function(e){return 0!==e.debit&&e.debit}},{name:"Soll",summarize:"S",suffix:"S",number:!0,selector:function(e){return 0!==e.credit&&e.credit}},{name:"Saldo",expressive:!0,creditDebitSuffix:!0,number:!0,selector:function(e){return e.debit-e.credit}}],values:y[e],keySelector:function(e){return e.account},onRowClick:function(e){return j("/konten-saldo/"+e.account)}}))}))))};var _t=function(){var e=Object(o.g)().accountNo,t=Object(r.useState)(e),n=Object(b.a)(t,2),c=n[0],u=n[1],l=mt("/account-expressive?accountNo="+e),i=l.result,m=l.loading,s=l.error,f=mt("/account-plan"),v=f.result,E=f.error,g=Object.keys(v||{}).map((function(e){return{value:v[e].konto_nr,name:v[e].name_kont}})),h=Object(d.c)();Object(r.useEffect)((function(){s&&h.error("Konnte Kontensaldo nicht vom Server laden"),E&&h.error("Konnte Kontenplan (konten.dbf) nicht vom Server laden")}),[s,E]);var O=Object(r.useState)(),j=Object(b.a)(O,2),x=j[0],y=j[1];return p()((function(){return y("/")}),{detectKeys:[27]}),x?a.a.createElement(o.a,{from:"/konten-saldo/"+c,to:x}):a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),y("/reload/konten-saldo/"+c)}},a.a.createElement(ce,null,a.a.createElement(le,null,"Kontosaldo von"," ",v&&v[e]&&a.a.createElement(J,null,"\xa0",v[e].name_kont),a.a.createElement(it,{options:g,autoFocus:!0,name:"account",value:c,onChange:function(e){return u(e.target.value)}}))),a.a.createElement(Se,null,a.a.createElement(we,{active:!0,text:"ESC: Hauptmenue",command:function(){return y("/")}}),a.a.createElement(we,{active:!0,text:"Kontenabfrage",command:function(){return y("/kontenabfrage")}}),a.a.createElement(we,{active:!0,text:"\u21a9 : Kontensaldo",type:"submit"})),a.a.createElement(Z,null),m?a.a.createElement(oe,null):s?a.a.createElement(ie,null):i&&i.length<1?a.a.createElement(le,null,"Keine Buchungen gefunden"):a.a.createElement(X,null,a.a.createElement(Ye,{attributes:[{name:"Beleg",selector:function(e){return e.pos}},{name:"Buchung",date:!0,selector:function(e){return e.accountedDate}},{name:"Haben",summarize:"H",number:!0,suffix:"H",selector:function(e){return 0!==e.debit&&e.debit}},{name:"Soll",summarize:"S",number:!0,suffix:"S",selector:function(e){return 0!==e.credit&&e.credit}},{name:"Buchungstext",expressive:!0,selector:function(e){return e.text}},{name:"Gegen",selector:function(e){return e.gegen}}],values:i,keySelector:function(e){return e.pos},accountingSummary:!0})))};var Vt=function(){var e=Object(o.g)(),t=e.url,n=e.param;return a.a.createElement(o.a,{to:"/"+t+"/"+n})};var Nt=function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement(ee,null,a.a.createElement("form",{onSubmit:e.onSubmit},"editing...")),a.a.createElement(ke,{cancel:e.cancel}))};var Gt=function(){var e=Object(r.useState)(),t=Object(b.a)(e,2),n=t[0],a=t[1],c=void 0===n,u=!c;return p()((function(){return a(void 0)}),{detectKeys:[27]}),{recordTemplate:n,setRecordTemplate:a,selectMode:c,editMode:u}},Lt=function(e){return e.konto_nr};var It=function(){var e=mt("/account-plan-atts"),t=e.result,n=e.loading,c=e.error,u=mt("/account-plan"),l=u.result,o=u.loading,i=u.error,m=Object.keys(l||{}).map((function(e){return l[e]})),s=Object(r.useState)(""),f=Object(b.a)(s,2),d=f[0],v=f[1],p=Gt(),E=p.editMode,g=p.selectMode,h=p.recordTemplate,O=p.setRecordTemplate,j=function(e){return O(l[e])};return a.a.createElement(a.a.Fragment,null,a.a.createElement(ce,{middle:!0},"Konten"),g&&a.a.createElement(Ke,{value:d,onChange:v,autoFocus:!0,newRecordButtonText:"neues Konto",label:"Kontennr.:",onSubmit:function(){return j(d)}}),E&&a.a.createElement(Nt,{defaultValues:h}),a.a.createElement(Z,null),o||n?a.a.createElement(oe,null):i||c?a.a.createElement(ie,null):a.a.createElement(X,null,a.a.createElement(Ye,{attributes:t.map((function(e){return e.toLowerCase()})).map((function(e){return{name:e,selector:function(t){return t[e]}}})),keySelector:function(e){return e.konto_nr},values:m,onRowClick:function(e){return j(Lt(e))}})))};var Jt=function(){var e=mt("/guv"),t=e.result,n=e.loading,c=e.error,u=Object(d.c)();Object(r.useEffect)((function(){return c&&u.error("Konnte GuV nicht vom Server laden")}),[c]);var l=Object(r.useState)(!1),i=Object(b.a)(l,2),m=i[0],s=i[1];if(p()((function(){return s("/")}),{detectKeys:[27]}),m)return a.a.createElement(o.a,{to:m});var f=t?Object.keys(t.ertraege||{}):[];f.sort((function(e,t){return e===t?0:e>t?1:-1}));var v=[],E=0;return f.forEach((function(e){var n=t.aufwendungen[e],r=t.ertraege[e],a=r-n;E=a+E,v.push({month:e,ertrag:r,aufwand:n,gewinn:a,accumulated:E})})),a.a.createElement(a.a.Fragment,null,a.a.createElement(ce,null,a.a.createElement(le,null,"Gewinn und Verlustrechnung")),a.a.createElement(Se,null,a.a.createElement(we,{active:!0,text:"ESC: Hauptmenue",command:function(){return s("/")}})),a.a.createElement(Z,null),n?a.a.createElement(oe,null):a.a.createElement(X,null,a.a.createElement(Ye,{accountingSummary:!0,attributes:[{name:"Monat",selector:function(e){return e.month},date:!0},{name:"Aufwendungen",summarize:"S",selector:function(e){return e.aufwand},number:!0,suffix:"S"},{name:"Ertraege",summarize:"H",selector:function(e){return e.ertrag},number:!0,suffix:"H"},{name:"Gewinn",selector:function(e){return e.gewinn},number:!0,creditDebitSuffix:!0,customFooter:v.reduce((function(e,t){return t.gewinn+e}),0)},{name:"Akkumuliert",selector:function(e){return e.accumulated},number:!0,creditDebitSuffix:!0,customFooter:E}],values:v,keySelector:function(e){return e.month}})))};var qt=function(){return a.a.createElement(i.a,{theme:s},a.a.createElement(l.a,null,a.a.createElement($,null,a.a.createElement(Q,null,a.a.createElement(o.d,null,a.a.createElement(o.b,{path:"/laufende-buchung"},a.a.createElement(Dt,null)),a.a.createElement(o.b,{path:"/reload/:url/:param"},a.a.createElement(Vt,null)),a.a.createElement(o.b,{path:"/kontenabfrage"},a.a.createElement(Ht,null)),a.a.createElement(o.b,{path:"/konten-saldo/:accountNo"},a.a.createElement(_t,null)),a.a.createElement(o.b,{path:"/konten-saldo"},a.a.createElement(_t,null)),a.a.createElement(o.b,{path:"/guv"},a.a.createElement(Jt,null)),a.a.createElement(o.b,{path:"/accounts"},a.a.createElement(It,null)),a.a.createElement(o.b,{path:"/"},a.a.createElement(Rt,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Wt=n(32),Yt={timeout:5e3,position:d.b.BOTTOM_CENTER};u.a.render(a.a.createElement((function(){return a.a.createElement(d.a,Object.assign({template:Wt.a},Yt),a.a.createElement(qt,null))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[36,1,2]]]);
//# sourceMappingURL=main.6c0c4e2c.chunk.js.map