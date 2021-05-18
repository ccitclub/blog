(function(t){function e(e){for(var a,o,r=e[0],c=e[1],l=e[2],d=0,m=[];d<r.length;d++)o=r[d],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&m.push(n[o][0]),n[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(m.length)m.shift()();return i.push.apply(i,l||[]),s()}function s(){for(var t,e=0;e<i.length;e++){for(var s=i[e],a=!0,r=1;r<s.length;r++){var c=s[r];0!==n[c]&&(a=!1)}a&&(i.splice(e--,1),t=o(o.s=s[0]))}return t}var a={},n={app:0},i=[];function o(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=a,o.d=function(t,e,s){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(s,a,function(e){return t[e]}.bind(null,a));return s},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;i.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"034f":function(t,e,s){"use strict";s("85ec")},"1e81":function(t,e,s){"use strict";s("3c0a")},"3c0a":function(t,e,s){},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),n=(s("7f10"),s("289d")),i=(s("5abe"),s("2591")),o={apiKey:"AIzaSyCq7c9DZR612xF2VHoobhp-pVdn7wV9OKc",authDomain:"ccitc-blogs.firebaseapp.com",projectId:"ccitc-blogs",storageBucket:"ccitc-blogs.appspot.com",messagingSenderId:"412367047980",appId:"1:412367047980:web:fa141df62234e3ed8fb089",measurementId:"G-2QT5GJSD9F"};i["a"].initializeApp(o),i["a"].analytics();var r=i["a"],c=s("2f62"),l=s("3317"),u=s("1da1"),d=(s("96cf"),{user:{},isLoggedIn:!1}),m={setUser:function(t,e){e?(t.user=e,t.isLoggedIn=!0,localStorage.setItem("isLoggedIn",!0)):(t.user={},t.isLoggedIn=!1,localStorage.setItem("isLoggedIn",!1))}},p={login:function(){return Object(u["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=new r.auth.GoogleAuthProvider,t.next=3,r.auth().signInWithPopup(e);case 3:localStorage.setItem("isLoggedIn",!0);case 4:case"end":return t.stop()}}),t)})))()},logout:function(){return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r.auth().signOut();case 2:localStorage.setItem("isLoggedIn",!1),window.location.reload();case 4:case"end":return t.stop()}}),t)})))()}},f={namespaced:!0,state:d,mutations:m,actions:p},b=r.firestore();b.settings({timestampsInSnapshots:!0});var v=b,g={blogs:[],posts:[]},h={init:Object(l["a"])((function(t){var e=t.bindFirestoreRef;e("blogs",v.collection("blogs").orderBy("created_at"))})),showAllPosts:Object(l["a"])((function(t){var e=t.bindFirestoreRef;e("posts",v.collection("posts").where("approval","==",!0).orderBy("created_at"))}))},_={namespaced:!0,state:g,actions:h},C={users:[]},y={usersById:function(t){return t.users.reduce((function(t,e){return t[e.id]=e,t}),{})}},w={init:Object(l["a"])((function(t){var e=t.bindFirestoreRef;e("users",v.collection("users"))}))},j={namespaced:!0,state:C,actions:w,getters:y},O=v.collection("posts");r.auth().onAuthStateChanged((function(t){t&&t.uid}));var k={blogs:{},posts:[],upvoted:!1},x={blog:function(t){return t.blogs[0]?t.blogs[0]:{}}},I={createPost:function(t,e){return Object(u["a"])(regeneratorRuntime.mark((function s(){var a,n;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return a=t.getters,n=O.doc(),e.id=n.id,e.vote=[],e.approval=!0,e.blog_id=a.blog.id,e.user_id=r.auth().currentUser.uid,e.created_at=r.firestore.FieldValue.serverTimestamp(),e.updated_at=r.firestore.FieldValue.serverTimestamp(),s.prev=9,s.next=12,O.doc(e.id).set(e);case 12:s.next=17;break;case 14:s.prev=14,s.t0=s["catch"](9),console.error(s.t0);case 17:case"end":return s.stop()}}),s,null,[[9,14]])})))()},initBlog:Object(l["a"])((function(t,e){var s=t.bindFirestoreRef;s("blogs",v.collection("blogs").where("name","==",e))})),initPost:Object(l["a"])((function(t,e){var s=t.bindFirestoreRef;s("posts",O.where("blog_id","==",e).orderBy("created_at").where("approval","==",!0))})),deletePost:function(t,e){return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,O.doc(e).delete();case 2:case"end":return t.stop()}}),t)})))()}},D={namespaced:!0,state:k,actions:I,getters:x,posts:O},R=(s("caad"),s("2532"),v.collection("posts")),U={userID:"",post:{},votes:!1},L={fullPost:Object(l["a"])((function(t,e){var s=t.bindFirestoreRef;s("post",R.where("id","==",e)),r.auth().onAuthStateChanged((function(t){t&&(U.userID=t.uid,R.doc(e).get().then((function(t){U.votes=t.data().vote.includes(U.userID)})))}))})),upvote:function(t,e){return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:null!=U.userID&&R.doc(e).get().then((function(t){var s=t.data();s.vote.includes(U.userID)?(R.doc(e).update({vote:r.firestore.FieldValue.arrayRemove(U.userID)}),U.votes=!1):(R.doc(e).update({vote:r.firestore.FieldValue.arrayUnion(U.userID)}),U.votes=!0)}));case 1:case"end":return t.stop()}}),t)})))()}},P={namespaced:!0,state:U,actions:L},B=v.collection("comments"),S={comments:{}},A={post:function(t){return t.post[0]?t.post[0]:{}}},M={doComment:function(t,e){return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.id=B.doc().id,e.user_id=r.auth().currentUser.uid,e.commenter=r.auth().currentUser.displayName,e.created_at=r.firestore.FieldValue.serverTimestamp(),e.updated_at=r.firestore.FieldValue.serverTimestamp(),t.prev=5,t.next=8,B.doc(e.id).set(e);case 8:t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](5),console.error(t.t0);case 13:case"end":return t.stop()}}),t,null,[[5,10]])})))()},initComment:Object(l["a"])((function(t,e){var s=t.bindFirestoreRef;s("comments",B.where("post_id","==",e).orderBy("created_at"))})),deleteComment:function(t,e){return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,B.doc(e).delete();case 2:case"end":return t.stop()}}),t)})))()}},$={namespaced:!0,state:S,actions:M,getters:A,comments:B};a["a"].use(c["a"]);var F=new c["a"].Store({state:{},mutations:l["b"],actions:{},modules:{auth:f,blogs:_,users:j,blog:D,post:P,comments:$}});r.auth().onAuthStateChanged((function(t){if(t){t.user&&(t=t.user);var e={id:t.uid,name:t.displayName,image:t.photoURL,created_at:r.firestore.FieldValue.serverTimestamp()};v.collection("users").doc(e.id).set(e),F.commit("auth/setUser",e)}else F.commit("auth/setUser",null)}));var T=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"navigation-bar display-flex"},[t._m(0),t.isLoggedIn||"false"!=t.local_storage?t._e():s("a",{staticClass:"button sign-in",on:{click:function(e){return t.login()}}},[t._v("Sign in with Google")]),t.isLoggedIn?s("section",[s("figure",{staticClass:"image is-48x48"},[s("img",{staticClass:"is-rounded",attrs:{src:t.user.image}})])]):t._e(),t.isLoggedIn?s("div",[s("a",{staticClass:"button is-dark log-in",on:{click:t.displayConfirm}},[t._v("Log Out")]),s("div",{staticClass:"confirmation"},[s("h4",{staticClass:"title is-4"},[t._v("Confirm log out?")]),s("button",{staticClass:"button sign-in",on:{click:function(e){return t.logout()}}},[t._v("Confirm")]),s("button",{staticClass:"button is-dark",on:{click:t.displayConfirm}},[t._v("No")])])]):t._e(),s("a",{staticClass:"hamburger",on:{click:t.displayNavbar}},[t._v("≡")]),s("div",{staticClass:"display-flex nav-container"},[t._m(1),t._m(2),t._m(3),s("div",{staticClass:"_nav-item more"},[s("a",{attrs:{id:"more",href:"#more"}},[t._v(" More "),s("span",[s("b-icon",{attrs:{pack:"fa",icon:"chevron-down",size:"is-small"}})],1)]),t._m(4)])])]),s("router-view",{staticClass:"container"})],1)},E=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"brand"},[s("img",{attrs:{src:"https://d33wubrfki0l68.cloudfront.net/22b2a9e48ce2c6f9a54fcf91062c190eb7367ec7/a82ab/img/ccitclogo.png",alt:"ccitc-logo"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"_nav-item"},[s("a",{attrs:{href:"https://ccitc.team"}},[t._v(" Home ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"_nav-item"},[s("a",{attrs:{href:"https://ccitc.team/about"}},[t._v(" About ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"_nav-item"},[s("a",{attrs:{href:"https://ccitc.team/about"}},[t._v(" Executives ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"more-content"},[s("div",{staticClass:"_nav-item active"},[s("a",{attrs:{href:"#"}},[t._v(" Blog ")])]),s("div",{staticClass:"_nav-item"},[s("a",{attrs:{href:"https://ccitc.team/program"}},[t._v(" Program ")])]),s("div",{staticClass:"_nav-item"},[s("a",{attrs:{href:"https://ccitc.team/recruitment"}},[t._v(" Join Us ")])])])}],V=s("5530"),N=!1,z=!1,Y=function(){window.innerWidth<=800&&(document.querySelector(".nav-container").style.display=N?"none":"block",N=!N)},q=function(){document.querySelector(".confirmation").style.display=z?"none":"block",z=!z},G={data:function(){return{local_storage:localStorage.getItem("isLoggedIn")||"false"}},computed:Object(V["a"])({},Object(c["d"])("auth",["user","isLoggedIn"])),methods:Object(V["a"])(Object(V["a"])({},Object(c["b"])("auth",["login","logout"])),{},{displayNavbar:Y,displayConfirm:q})},J=G,W=(s("034f"),s("2877")),H=Object(W["a"])(J,T,E,!1,null,null,null),K=H.exports,Q=s("8c4f"),Z=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",[s("h1",{staticClass:"title blogs-heading"},[t._v("Blogs")]),s("div",{staticClass:"grid"},[s("aside",{staticClass:"menu"},[s("ul",{staticClass:"menu-list"},[s("p",{staticClass:"menu-label"},[t._v("Categories")]),t._l(t.blogs,(function(e){return s("li",{key:e.id},[s("strong",[s("router-link",{attrs:{to:{name:"Blog",params:{name:e.name}}}},[t._v(" "+t._s(e.name)+" ")])],1)])}))],2)]),s("div",{staticClass:"posts"},t._l(t.posts.slice().reverse(),(function(e,a){return s("div",{key:e.id,staticClass:"card is-4"},[t.isImage(e.URL)?s("div",{staticClass:"card-image"},[s("figure",{staticClass:"posted-image"},[s("img",{attrs:{src:e.URL,alt:"Placeholder image"}})])]):t._e(),s("div",{staticClass:"card-content"},[s("div",{staticClass:"media"},[s("div",{staticClass:"media-left"},[s("figure",{staticClass:"image is-48x48"},[s("img",{attrs:{src:t.loadedUsersById[e.user_id].image,alt:"Avatar"}})])]),s("div",{staticClass:"media_content"},[e.URL?t._e():s("p",{staticClass:"title is-4"},[t._v(t._s(e.title))]),e.URL?s("p",{staticClass:"title is-4"},[s("a",{attrs:{href:e.URL,target:"_blank"}},[t._v(t._s(e.title))])]):t._e(),s("p",{staticClass:"subtitle is-6"},[t._v(" "+t._s(t.loadedUsersById[e.user_id].name)+" "),s("br"),s("time",[t._v(t._s(t.getCreated(a)))])])])]),s("pre",{staticClass:"content"},[t._v("          "+t._s(e.description)+"\n          "),s("br"),t._v("\n        ")])]),s("div",{staticClass:"view"},[s("router-link",{staticClass:"button view-post submit",attrs:{to:{name:"post",params:{name:"blogs",post_id:e.id}}}},[t._v("View Post")])],1)])})),0)]),t._v(" "),s("b-notification",{staticClass:"position-fixed",attrs:{type:"is-danger is-light","aria-close-label":"Close notification"},model:{value:t.isActive,callback:function(e){t.isActive=e},expression:"isActive"}},[t._v(" Your post has been submitted. You will be able to see your post if approved by the admin. ")])],1)},X=[],tt=(s("ac1f"),s("466d"),s("fb6a"),{data:function(){return{displayDeleteConfirm:!1,isActive:!1}},mounted:function(){this.init(),this.initUsers(),this.showAllPosts()},computed:Object(V["a"])(Object(V["a"])(Object(V["a"])(Object(V["a"])({},Object(c["d"])("blogs",["blogs","posts"])),Object(c["d"])("auth",["isLoggedIn","user"])),Object(c["c"])({usersById:"users/usersById"})),{},{loadedUsersById:function(){var t=this;return this.posts.reduce((function(e,s){return e[s.user_id]=t.usersById[s.user_id]||{name:"...",image:"https://bulma.io/images/placeholders/48x48.png"},e}),{})}}),methods:Object(V["a"])(Object(V["a"])(Object(V["a"])(Object(V["a"])({isImage:function(t){return t.match(/(png|gif|jpg|jpeg)$/)}},Object(c["b"])("blogs",["init","showAllPosts"])),Object(c["b"])("blog",["initBlog","deletePost"])),Object(c["b"])("users",{initUsers:"init"})),{},{getCreated:function(t){function e(t){var e=Math.floor((new Date-t)/1e3),s=Math.floor(e/31536e3);return s>1?"".concat(s," years"):(s=Math.floor(e/2592e3),s>1?"".concat(s," months"):(s=Math.floor(e/86400),s>1?"".concat(s," days"):(s=Math.floor(e/3600),s>1?"".concat(s," hours"):(s=Math.floor(e/60),s>1?"".concat(s," minutes"):"".concat(Math.floor(e||0)," seconds")))))}var s=this.posts.slice().reverse();return e(1e3*s[t].created_at.seconds)<0?"0 seconds ago":"".concat(e(1e3*s[t].created_at.seconds)," ago")}})}),et=tt,st=(s("ea9c"),Object(W["a"])(et,Z,X,!1,null,null,null)),at=st.exports,nt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",[s("div",{staticClass:"blog-type"},[s("h1",{staticClass:"title"},[t._v(t._s(t.blog.name))]),s("small",[t._v(t._s(t.blog.description))])]),t.isLoggedIn?s("button",{staticClass:"button submit",on:{click:function(e){t.showForm=!t.showForm}}},[s("div",[t._v("Create a post")]),s("b-icon",{attrs:{pack:"fa",icon:"plus-circle",size:"is-medium"}})],1):t._e(),s("form",{staticClass:"search_bar"},[s("b-input",{staticClass:"search_input",attrs:{placeholder:"Search"},model:{value:t.searchTerm,callback:function(e){t.searchTerm=e},expression:"searchTerm"}})],1),t.showForm&&t.isLoggedIn?s("form",{staticClass:"post-form",on:{submit:function(e){return e.preventDefault(),t.onCreatePost(t.post)}}},[s("b-field",{attrs:{label:"Title:"}},[s("b-input",{attrs:{placeholder:"Title",required:""},model:{value:t.post.title,callback:function(e){t.$set(t.post,"title",e)},expression:"post.title"}})],1),s("b-field",{attrs:{label:"Description:"}},[s("b-input",{attrs:{type:"textarea",placeholder:"Description",required:""},model:{value:t.post.description,callback:function(e){t.$set(t.post,"description",e)},expression:"post.description"}})],1),s("b-field",{attrs:{label:"If your post includes any codes, please paste them here. (Optional)"}},[s("b-input",{attrs:{type:"textarea"},model:{value:t.post.codes,callback:function(e){t.$set(t.post,"codes",e)},expression:"post.codes"}})],1),s("b-field",{attrs:{label:"Image URL/ links (optional):"}},[s("b-input",{attrs:{placeholder:"URL",type:"url"},model:{value:t.post.URL,callback:function(e){t.$set(t.post,"URL",e)},expression:"post.URL"}})],1),s("button",{staticClass:"button submit"},[t._v("Submit")])],1):t._e(),s("div",{staticClass:"posts"},t._l(t.filteredPosts.slice().reverse(),(function(e,a){return s("div",{key:e.id,staticClass:"card is-4"},[t.isImage(e.URL)?s("div",{staticClass:"card-image"},[s("figure",{staticClass:"posted-image"},[s("img",{attrs:{src:e.URL,alt:"Placeholder image"}})])]):t._e(),s("div",{staticClass:"card-content"},[s("div",{staticClass:"media"},[s("div",{staticClass:"media-left"},[s("figure",{staticClass:"image is-48x48"},[s("img",{attrs:{src:t.loadedUsersById[e.user_id].image,alt:"Avatar"}})])]),s("div",{staticClass:"media_content"},[e.URL?t._e():s("p",{staticClass:"title is-4"},[t._v(t._s(e.title))]),e.URL?s("p",{staticClass:"title is-4"},[s("a",{attrs:{href:e.URL,target:"_blank"}},[t._v(t._s(e.title))])]):t._e(),s("p",{staticClass:"subtitle is-6"},[t._v(" "+t._s(t.loadedUsersById[e.user_id].name)+" "),s("br"),s("time",[t._v(t._s(t.getCreated(a)))])])])]),s("pre",{staticClass:"content"},[t._v("          "+t._s(e.description)+"\n          "),s("br"),t._v("\n        ")])]),s("div",{staticClass:"view"},[s("router-link",{staticClass:"button view-post submit",attrs:{to:{name:"post",params:{name:t.$route.params.name,post_id:e.id}}}},[t._v("View Post")]),(t.user&&(t.user.id,e.user_id),s("button",{staticClass:"button view-post is-dark",on:{click:function(s){return t.onDisplayDelConf(e.id)}}},[t._v(" Delete ")])),t.selectedPost==e.id&&t.displayDeleteConfirm?s("div",{staticClass:"fixed delete-confirm"},[s("h1",{staticClass:"title is-5"},[t._v("Are you sure you want to delete your post?")]),s("div",[s("button",{staticClass:"button yes",on:{click:function(s){return t.onDeletePost(e.id)}}},[t._v(" Yes ")]),s("button",{staticClass:"button is-dark",on:{click:function(e){t.displayDeleteConfirm=!t.displayDeleteConfirm}}},[t._v(" No ")])])]):t._e()],1)])})),0),s("b-notification",{staticClass:"position-fixed",attrs:{type:"is-danger is-light","aria-close-label":"Close notification"},model:{value:t.isActive,callback:function(e){t.isActive=e},expression:"isActive"}},[t._v(" Your post has been submitted. ")])],1)},it=[],ot=(s("b0c0"),s("4d63"),s("25f0"),s("4de4"),s("a4d3"),s("e01a"),{data:function(){return{displayDeleteConfirm:!1,selectedPost:"",showForm:!1,searchTerm:"",isActive:!1,post:{title:"",description:"",codes:"",URL:""}}},mounted:function(){this.initUsers(),this.initBlog(this.$route.params.name)},watch:{"$route.params.name":function(){this.initBlog(this.$route.params.name)},blog:function(){this.blog.id&&this.initPost(this.blog.id)}},computed:Object(V["a"])(Object(V["a"])(Object(V["a"])(Object(V["a"])({},Object(c["d"])("blog",["posts"])),Object(c["d"])("auth",["isLoggedIn","user"])),Object(c["c"])({blog:"blog/blog",usersById:"users/usersById"})),{},{loadedUsersById:function(){var t=this;return this.posts.reduce((function(e,s){return e[s.user_id]=t.usersById[s.user_id]||{name:"Loading...",image:"https://bulma.io/images/placeholders/48x48.png"},e}),{})},filteredPosts:function(){if(this.searchTerm){var t=new RegExp(this.searchTerm,"gi");return this.posts.filter((function(e){return(e.title+e.description).match(t)}))}return this.posts}}),methods:Object(V["a"])(Object(V["a"])(Object(V["a"])({},Object(c["b"])("blog",["createPost","initBlog","deletePost","initPost"])),Object(c["b"])("users",{initUsers:"init"})),{},{isImage:function(t){return t.match(/(png|gif|jpg|jpeg)$/)},onCreatePost:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.post.title&&t.post.description&&(t.createPost(t.post),t.post={title:"",description:"",URL:""},t.showForm=!1,t.isActive=!t.isActive);case 1:case"end":return e.stop()}}),e)})))()},onDisplayDelConf:function(t){this.displayDeleteConfirm=!this.displayDeleteConfirm,this.selectedPost=t},onDeletePost:function(t){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return e.displayDeleteConfirm=!e.displayDeleteConfirm,s.next=3,e.deletePost(t);case 3:case"end":return s.stop()}}),s)})))()},getCreated:function(t){function e(t){var e=Math.floor((new Date-t)/1e3),s=Math.floor(e/31536e3);return s>1?"".concat(s," years"):(s=Math.floor(e/2592e3),s>1?"".concat(s," months"):(s=Math.floor(e/86400),s>1?"".concat(s," days"):(s=Math.floor(e/3600),s>1?"".concat(s," hours"):(s=Math.floor(e/60),s>1?"".concat(s," minutes"):"".concat(Math.floor(e||0)," seconds")))))}var s=this.posts.slice().reverse();return e(1e3*s[t].created_at.seconds)<0?"0 seconds ago":"".concat(e(1e3*s[t].created_at.seconds)," ago")}})}),rt=ot,ct=(s("9d5a"),Object(W["a"])(rt,nt,it,!1,null,null,null)),lt=ct.exports,ut=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"post-container"},[t.post[0]?s("div",{staticClass:"full_post"},[t.user&&t.user.id==t.post[0].user_id?s("div",{staticClass:"options"},[s("button",{staticClass:"button is-danger"},[t._v("Edit")]),s("button",{staticClass:"button is-dark",on:{click:function(e){t.displayDeleteConfirm=!t.displayDeleteConfirm}}},[t._v(" Delete ")])]):t._e(),t.displayDeleteConfirm?s("div",{staticClass:"fixed delete-confirm"},[s("h1",{staticClass:"title is-4"},[t._v("Are you sure you want to delete your post?")]),s("div",[s("button",{staticClass:"button yes",on:{click:function(e){return t.onDeletePost(t.post[0].id)}}},[t._v("Yes")]),s("button",{staticClass:"button is-dark",on:{click:function(e){t.displayDeleteConfirm=!t.displayDeleteConfirm}}},[t._v(" No ")])])]):t._e(),t.post[0].URL?t._e():s("h1",{staticClass:"title text-center"},[t._v(t._s(t.post[0].title))]),t.post[0].URL?s("h1",{staticClass:"title text-center"},[s("a",{attrs:{href:t.post[0].URL,target:"_blank"}},[t._v(t._s(t.post[0].title))])]):t._e(),t.isImage(t.post[0].URL)?s("div",{staticClass:"card-image"},[s("figure",{staticClass:"posted-image"},[s("img",{attrs:{src:t.post[0].URL,alt:"ccitc blog-post image"}})])]):t._e(),s("pre",{staticClass:"content"},[t._v("      "+t._s(t.post[0].description.trim())+"\n    ")]),t.post[0].codes?s("div",{staticClass:"posted-codes"},[s("pre",[t._v(t._s(t.post[0].codes))])]):t._e(),s("div",{staticClass:"flex posted-by"},[s("span",[t._v("Posted by: ")]),s("figure",{staticClass:"image is-48x48"},[s("img",{attrs:{src:t.loadedUsersById[t.post[0].user_id].image,alt:"Avatar"}})]),s("p",[t._v(t._s(t.loadedUsersById[t.post[0].user_id].name))])]),s("div",{staticClass:"flex posted-at"},[s("time",[t._v(t._s(t.getCreated(t.post[0].created_at.seconds)))])]),s("hr"),s("div",{staticClass:"react_comment"},[s("div",{staticClass:"react"},[s("button",{staticClass:"button upvote",class:{"is-danger":t.votes},attrs:{disabled:!t.isLoggedIn},on:{click:function(e){return t.onUpvote()}}},[s("b-icon",{attrs:{pack:"fa",icon:"thumbs-up",size:"is-medium"}})],1),s("span",[t._v(t._s(t.post[0].vote.length))])]),s("form",{staticClass:"comment",on:{submit:function(e){return e.preventDefault(),t.onComment(t.comment)}}},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comment.content,expression:"comment.content"}],attrs:{name:"comment",placeholder:"Write comment"},domProps:{value:t.comment.content},on:{input:function(e){e.target.composing||t.$set(t.comment,"content",e.target.value)}}}),s("button",{staticClass:"button is-dark",attrs:{disabled:!t.isLoggedIn}},[s("b-icon",{attrs:{pack:"fa",icon:"location-arrow",size:"is-medium"}})],1)])])]):t._e(),t.comments?s("div",{staticClass:"comment-section"},t._l(t.comments,(function(e){return s("div",{key:e.id,staticClass:"_comment"},[s("small",{staticClass:"commenter"},[t._v(t._s(e.commenter))]),t._v(" "),s("time",[t._v(t._s(t.getCreated(e.created_at.seconds)))]),s("br"),s("p",[t._v(t._s(e.content))]),s("div",{staticClass:"delete-comment"},[(t.user&&(t.user.id,e.user_id),s("button",{staticClass:"button is-small is-dark",on:{click:function(e){t.displayDeleteComment=!t.displayDeleteComment}}},[t._v(" Delete ")]))]),s("hr"),t.displayDeleteComment?s("div",{staticClass:"confirmDelete"},[t._v(" Are you sure you want delete this comment? "),s("div",{staticClass:"buttons are-small"},[s("button",{staticClass:"button is-danger is-outlined",on:{click:function(s){return t.onDeleteComment(e.id)}}},[t._v(" Yes ")]),s("button",{staticClass:"button is-success is-outlined",on:{click:function(e){t.displayDeleteComment=!1}}},[t._v(" No ")])])]):t._e()])})),0):t._e(),s("b-notification",{staticClass:"position-fixed",attrs:{"auto-close":"",type:"is-success is-light","aria-close-label":"Close notification"},model:{value:t.showDeleteSuccess,callback:function(e){t.showDeleteSuccess=e},expression:"showDeleteSuccess"}},[t._v(" Successfully deleted the post. ")])],1)},dt=[],mt=(s("498a"),{data:function(){return{displayDeleteConfirm:!1,displayDeleteComment:!1,showDeleteSuccess:!1,comment:{post_id:"",content:""}}},mounted:function(){this.initUsers(),this.fullPost(this.$route.params.post_id)},watch:{post:function(){this.post[0]&&(this.initComment(this.post[0].id),this.comment.post_id=this.post[0].id)}},computed:Object(V["a"])(Object(V["a"])(Object(V["a"])(Object(V["a"])(Object(V["a"])({},Object(c["c"])({usersById:"users/usersById",post:"comments/post"})),Object(c["d"])("auth",["isLoggedIn","user"])),Object(c["d"])("post",["post","votes"])),Object(c["d"])("comments",["comments"])),{},{loadedUsersById:function(){var t=this;return this.post.reduce((function(e,s){return e[s.user_id]=t.usersById[s.user_id]?t.usersById[s.user_id]:{name:"  Loading...",image:"https://bulma.io/images/placeholders/48x48.png"},e}),{})}}),methods:Object(V["a"])(Object(V["a"])(Object(V["a"])(Object(V["a"])(Object(V["a"])({},Object(c["b"])("post",["fullPost","upvote"])),Object(c["b"])("blog",["deletePost"])),Object(c["b"])("users",{initUsers:"init"})),Object(c["b"])("comments",["doComment","initComment","deleteComment"])),{},{onDeletePost:function(t){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:e.displayDeleteConfirm=!1,e.deletePost(t),e.showDeleteSuccess=!0;case 3:case"end":return s.stop()}}),s)})))()},onComment:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.comment.content.trim()&&(t.doComment(t.comment),t.comment={content:"",post_id:t.post[0].id});case 1:case"end":return e.stop()}}),e)})))()},onDeleteComment:function(t){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,e.displayDeleteComment=!e.displayDeleteComment,s.next=4,e.deleteComment(t);case 4:s.next=9;break;case 6:s.prev=6,s.t0=s["catch"](0),console.log(s.t0);case 9:case"end":return s.stop()}}),s,null,[[0,6]])})))()},onUpvote:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.upvote(t.post[0].id);case 1:case"end":return e.stop()}}),e)})))()},isImage:function(t){return t.match(/(png|gif|jpg|jpeg)$/)},getCreated:function(t){function e(t){var e=Math.floor((new Date-t)/1e3),s=Math.floor(e/31536e3);return s>1?"".concat(s," years"):(s=Math.floor(e/2592e3),s>1?"".concat(s," months"):(s=Math.floor(e/86400),s>1?"".concat(s," days"):(s=Math.floor(e/3600),s>1?"".concat(s," hours"):(s=Math.floor(e/60),s>1?"".concat(s," minutes"):"".concat(Math.floor(e||0)," seconds")))))}return e(1e3*t)<0?"0 seconds ago":"".concat(e(1e3*t)," ago")}})}),pt=mt,ft=(s("1e81"),Object(W["a"])(pt,ut,dt,!1,null,null,null)),bt=ft.exports;a["a"].use(Q["a"]);var vt=[{path:"/",name:"Blogs",component:at},{path:"/b/:name",name:"Blog",component:lt},{path:"/b/:name/:post_id",name:"post",component:bt}],gt=new Q["a"]({mode:"history",base:"/",routes:vt}),ht=gt;a["a"].use(n["a"]),a["a"].config.productionTip=!1,new a["a"]({router:ht,store:F,render:function(t){return t(K)}}).$mount("#app")},"85ec":function(t,e,s){},"9d5a":function(t,e,s){"use strict";s("b198")},ae07:function(t,e,s){},b198:function(t,e,s){},ea9c:function(t,e,s){"use strict";s("ae07")}});
//# sourceMappingURL=app.f4ebc54e.js.map