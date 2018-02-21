var n=function(n){return!0===n.active},t=function(t){return!n(t)},e=function(n){return 0===n.dependencies.length&&n.producer},r=function(n){return n.then?(t=n,I({cancelled:!1,start:function(n){var e=this;if(this.cancelled=!1,!t.then)return n.next(t),void n.complete();t.then(function(t){e.cancelled||(n.next(t),n.complete())},function(t){e.cancelled||n.error(t)})},onStop:function(){this.cancelled=!0}})):n;var t},c=function(n){return 0===n.subscribers.length},i=function(n){return n.dependencies.every(t)},u=function(n){return n.dependents.every(t)},o=function(n,t){return n.subscribers=n.subscribers.filter(function(n){return n!==t})},f=function(n){return c(n)&&u(n)};function s(n){n.active=!0,n.hasEmitted=!1,n.onStart()}function a(n){n.producer&&n.producer.start(n)}function p(n){n.active=!1,n.onStop(),n.producer&&n.producer.stop()}function d(n,t,r){n=n||function(){},t=t||function(n){throw new Error(n)},r=r||function(){};var i="function"==typeof n?{next:n,error:t,complete:r}:n;return function(n){return n.subscribers.push(i),1===n.subscribers.length&&(s(n),e(n)&&a(n),S(n,"activated")),{unsubscribe:function(){c(n)||(o(n,i),c(n)&&u(n)&&(p(n),S(n,"completed")))}}}}var h={subscribe:function(){return d.apply(void 0,arguments)(this)},next:function(n){b(this,n)},error:function(n){!function(n,t){var e=[].concat(n.subscribers);n.subscribers=[],p(n),S(n,"error"),n.dependents.forEach(function(n){return n.error(t)}),e.forEach(function(n){return n.error(t)})}(this,n)},complete:function(){w(this)},pipe:function(){return function(){for(var n=arguments.length,t=new Array(n),e=0;e<n;e++)t[e]=arguments[e];return 1===t.length?t[0]:t.reduce(function(n,t){return function(){return t(n.apply(void 0,arguments))}})}.apply(void 0,arguments)(this)},nextGuard:function(){return x(this)},onStart:function(){},onStop:function(){},getValue:function(){return this.val}},l=function(n){return Object.assign({},{active:!1,hasEmitted:!1,dependencies:[],dependents:[],subscribers:[]},n)};function v(n,t){n.dependencies=t?[t]:n.dependencies||[];var e=Object.assign(Object.create(h),l(n)),r=e.next;return e.next=function(){if(e.nextGuard())try{for(var n=arguments.length,t=new Array(n),c=0;c<n;c++)t[c]=arguments[c];r.call.apply(r,[e].concat(t))}catch(n){if(!e.active)throw n;e.error(n)}},e.dependencies.forEach(function(n){return n.dependents.push(e)}),e}function b(n,t){return n.hasEmitted=!0,n.val=t,n.subscribers.forEach(function(n){return n.next(t)}),n.dependents.forEach(function(n){return n.next(t)}),n}var x=function(n){return!0===n.active},m=[],y=function(n,t){n.dependencies.filter(function(n){return t(n)&&-1===m.indexOf(n)}).forEach(function(n){return m.push(n)})},E=function(n,t){var e=t.predicate,r=t.action,c=t.actionGuard,i=n;for(e=e||function(){return!0},c=c||function(){return!0},y(i,e),i=m.shift();i;)c(i)&&(r(i),y(i,e)),i=m.shift()},g={activated:function(n){var r=[];E(n,{predicate:t,action:function(n){s(n),e(n)&&r.push(n)}}),r.forEach(a)},completed:function(t){return E(t,{predicate:n,action:p,actionGuard:f})},error:function(t){return E(t,{predicate:n,action:p})}},S=function(n,t){return g[t](n)};function w(n){var t=[].concat(n.subscribers);n.subscribers=[],p(n),S(n,"completed"),n.dependents.filter(i).forEach(function(n){return n.complete()}),t.forEach(function(n){return n.complete()})}var I=function(n){return void 0===n&&(n={}),n.start=n.start||function(){},n.stop=n.stop||function(){},v({producer:n})},G=function(n){return function(t){return v({next:function(t){n(t)&&b(this,t)}},t)}},O=function(n,t){return function(e){var c;t=t||function(n,t){return t};var i,u,o=0;return v({next:function(n){c&&c.unsubscribe(),c=this.subscribeToInner({outerValue:n,outerIndex:o++})},onStop:function(){c&&c.unsubscribe(),c=null,o=0,i=!1,u=!1},complete:function(){i=!0,u&&w(this)},subscribeToInner:function(e){var c=this,i=e.outerValue,u=e.outerIndex,o=0;return r(n(i,u)).subscribe(function(n){return c.tryNext(t.bind(c,i,n,u,o++))},this.error.bind(this),this.innerStreamComplete.bind(this))},innerStreamComplete:function(){u=!0,i&&this.complete()},tryNext:function(n){var t;try{t=n()}catch(n){this.error(n)}b(this,t)}},e)}};exports.createEpicMiddleware=function(n,t){void 0===t&&(t={});var e,r=I(),c=I();c.ofType=function(n){return c.pipe(G(function(t){return t.type===n}))};var i=function(i){return e=i,function(i){return r.pipe(O(function(n){return n(c,e,t.dependencies)}),d(e.dispatch)),r.next(n),function(n){var t=i(n);return c.next(n),t}}};return i.replaceEpic=function(n){e.dispatch({type:"EPIC_END"}),r.next(n)},i},exports.combineEpics=function(){for(var n=[],t=arguments.length;t--;)n[t]=arguments[t];return function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return function(){for(var n=arguments.length,t=new Array(n),e=0;e<n;e++)t[e]=arguments[e];return v({dependencies:t})}.apply(void 0,n.map(function(n){return n.apply(void 0,t)}))}};
//# sourceMappingURL=index.js.map
