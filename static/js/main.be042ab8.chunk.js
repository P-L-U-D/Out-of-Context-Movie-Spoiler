(this["webpackJsonpproject-6"]=this["webpackJsonpproject-6"]||[]).push([[0],{23:function(e,t,a){e.exports=a(48)},28:function(e,t,a){},47:function(e,t,a){},48:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(19),s=a.n(o),i=(a(28),a(3)),c=a(4),l=a(6),u=a(5),p=a(21),d=a(9),h=a.n(d),m=a(22),g=a(20),f=a(2),v=a.n(f),y=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).state={gifs:[],errorMessage:""},e}return Object(c.a)(a,[{key:"componentDidUpdate",value:function(e){var t=this;if(this.props.gifWords!==e.gifWords){var a=function(){var e=Object(g.a)(h.a.mark((function e(a,r,o){var s,i,c,l,u,p;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n(a),n(r),n(o)]);case 2:s=e.sent,i=Object(m.a)(s,3),c=i[0],l=i[1],u=i[2],(p=[]).push(c.data.data,l.data.data,u.data.data),t.setState({gifs:p});case 10:case"end":return e.stop()}}),e)})));return function(t,a,r){return e.apply(this,arguments)}}();console.log(this.props.gifWords);var r,n=function(e){return v()({url:"https://api.giphy.com/v1/gifs/translate",method:"GET",dataResponse:"json",params:{api_key:"NShPdQTfWnvbvgxLo7Jd7C5qDeFfrsLR",s:e}})};if(1===this.props.keywordResults.length||2===this.props.keywordResults.length||void 0===this.props.keywordResults||0===this.props.keywordResults.length){console.log("not enough keywords, running with title");return r=this.props.movieTitle,v()({url:"https://api.giphy.com/v1/gifs/search",method:"GET",dataResponse:"json",params:{api_key:"NShPdQTfWnvbvgxLo7Jd7C5qDeFfrsLR",q:r,limit:3}}).then((function(e){console.log(e),t.setState({gifs:e.data.data})}))}return console.log("random keywords running"),a.apply(void 0,Object(p.a)(this.props.gifWords)).catch((function(){t.setState({errorMessage:"I am so sorry, but no gifs for you right now. I am sick."})}))}}},{key:"render",value:function(){return n.a.createElement("div",{className:"wrapper gif-display"},n.a.createElement("h2",null,this.props.movieTitle),n.a.createElement("div",{className:"gif-box"},this.state.gifs.map((function(e){var t;return n.a.createElement("div",{className:"gif-container",key:e.id},n.a.createElement("img",{src:null===e||void 0===e||null===(t=e.images)||void 0===t?void 0:t.fixed_width.url,alt:""}))})),""===this.state.errorMessage?null:n.a.createElement("p",null,this.state.errorMessage)))}}]),a}(r.Component),k=function(e){return e[Math.floor(Math.random()*e.length)]},b=function(e){var t=k(e),a=k(e),r=k(e);t!==a&&t!==r||(t=k(e)),a!==t&&a!==r||(a=k(e)),r!==a&&r!==t||(r=k(e));var n=[];return n.push(t,a,r),n},w=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).getMovie=function(t){t.preventDefault(),e.setState({toggleBackups:!1,toggleGifDisplay:!1,backupOptions:[],keywordSearch:[]}),v()({url:"https://api.themoviedb.org/3/search/movie?",params:{method:"GET",responseType:"json",api_key:e.state.moviedbAPI,query:"".concat(e.state.userInput),include_adult:"false",page:1}}).then((function(t){var a=t.data.results.filter((function(t){return t.title===e.state.userInput})),r=t.data.results.filter((function(e){return e.popularity>10}));console.log(a,r),1===a.length?e.setState({movieSearch:a,toggleGifDisplay:!0}):0===a.length&&0===r.length?e.setState({errorMessage:"That doesn't seem to be a movie. Why don't you try another one?",movieSearch:[],keywordSearch:[],toggleBackups:!0}):e.setState({errorMessage:"Sorry, which movie were you looking for?",backupOptions:r,movieSearch:[],keywordSearch:[],toggleBackups:!0}),v()({url:"https://api.themoviedb.org/3/movie/".concat(e.state.movieSearch[0].id,"/keywords?"),params:{api_key:"b588f737df1d6878d6133a1a7e0bface"}}).then((function(t){var a=t.data.keywords.map((function(e){return e.name})),r=a.filter((function(e){return!/(based)|(graphic)|(book)|(aftercreditsstinger)|(3d)|(young)|(novel)|(adult)|(comic)|(true story)|(aftercreditsstinger)|(film)|(imax)|(violence)|(film)|(musical)|(director)|(duringcreditsstinger)|(avengers)|(marvel)/g.test(e)&&e})),n=b(r);e.setState({userInput:"",keywordSearch:n,keywordResults:a})}))})).catch((function(e){}))},e.handleUserInput=function(t){t.preventDefault(),e.setState({userInput:t.target.value})},e.backupSelection=function(t){var a=e.state.backupOptions.filter((function(e){var a=parseInt(t.target.id);return e.id===a}));e.setState({backupOptions:[],toggleBackups:!1,toggleGifDisplay:!0,movieId:t.target.id,movieSearch:a,userInput:""},(function(){v()({url:"https://api.themoviedb.org/3/movie/".concat(e.state.movieSearch[0].id,"/keywords?"),params:{api_key:"b588f737df1d6878d6133a1a7e0bface"}}).then((function(t){var a=t.data.keywords.map((function(e){return e.name})),r=a.filter((function(e){return!/(based)|(graphic)|(book)|(aftercreditsstinger)|(3d)|(young)|(novel)|(adult)|(comic)|(true story)|(aftercreditsstinger)|(film)|(imax)|(violence)|(film)|(musical)|(director)|(duringcreditsstinger)|(avengers)|(marvel)/g.test(e)&&e})),n=b(r);e.setState({userInput:"",keywordSearch:n,keywordResults:a})}))}))},e.state={errorMessage:"",movieSearch:[],backupOptions:[],movieID:[],keywordSearch:[],keywordResults:[],moviedbAPI:"b588f737df1d6878d6133a1a7e0bface",giphyAPI:"NShPdQTfWnvbvgxLo7Jd7C5qDeFfrsLR",userInput:"",toggleBackups:!1,toggleGifDisplay:!1},e}return Object(c.a)(a,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"wrapper"},n.a.createElement("form",{onSubmit:this.getMovie,action:""},n.a.createElement("label",{htmlFor:""}),n.a.createElement("input",{value:this.state.userInput,onChange:this.handleUserInput,type:"text",placeholder:"Type a movie",id:"",required:!0}),n.a.createElement("button",{type:"submit"},"Search")),!1===this.state.toggleBackups?null:n.a.createElement(r.Fragment,null,n.a.createElement("div",{className:"backupOptions"},n.a.createElement("h2",null,this.state.errorMessage),this.state.backupOptions.map((function(t){return n.a.createElement("div",{key:t.id,className:"posterContainer"},n.a.createElement("img",{onClick:e.backupSelection,src:"https://image.tmdb.org/t/p/w200/".concat(t.poster_path),alt:"Movie poster for ".concat(t.title),id:t.id}))})))),!1===this.state.toggleGifDisplay?null:n.a.createElement(y,{keywordResults:this.state.keywordResults,movieTitle:this.state.movieSearch[0].title,gifWords:this.state.keywordSearch,gifTest:"bear"}))}}]),a}(r.Component),S=(a(47),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"test"},n.a.createElement("h1",null,"Out of Context Spoiler"),n.a.createElement("h3",null,"Search a movie and get gifs!"),n.a.createElement(w,null),n.a.createElement("footer",null,n.a.createElement("p",{className:"copyright"},"Created by Juno College \xa9 2020")))}}]),a}(r.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[23,1,2]]]);
//# sourceMappingURL=main.be042ab8.chunk.js.map