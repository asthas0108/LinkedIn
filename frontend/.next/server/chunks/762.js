exports.id=762,exports.ids=[762],exports.modules={927:e=>{e.exports={container:"styles_container__WCP1D",navBar:"styles_navBar__nMGt3",navBarOptionContainer:"styles_navBarOptionContainer__6SJrf",buttonJoin:"styles_buttonJoin__hW__U"}},9177:e=>{e.exports={homeContainer:"DashboardLayout_homeContainer__pIsyd",homeContainer__left:"DashboardLayout_homeContainer__left__xu68n",sideBarOption:"DashboardLayout_sideBarOption__MHfOg",homeContainer__extraContainer:"DashboardLayout_homeContainer__extraContainer__M8mtY",homeContainer__feedContainer:"DashboardLayout_homeContainer__feedContainer__0i3v7",mobileNavbar:"DashboardLayout_mobileNavbar__dTaU4",singleNavItemHolder_mobileView:"DashboardLayout_singleNavItemHolder_mobileView__QZ3YN"}},7175:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{A:()=>u});var r=s(8732);s(2015);var n=s(927),o=s.n(n),i=s(6715),l=s(4062),c=s(3827),d=e([l,c]);function u(){let e=(0,i.useRouter)(),t=(0,l.useDispatch)(),s=(0,l.useSelector)(e=>e.auth);return(0,r.jsx)("div",{className:o().container,children:(0,r.jsxs)("nav",{className:o().navBar,children:[(0,r.jsx)("h1",{style:{cursor:"pointer"},onClick:()=>{e.push("/")},children:"ProConnect"}),(0,r.jsxs)("div",{className:o().navBarOptionContainer,children:[s.profileFetched&&(0,r.jsx)("div",{children:(0,r.jsxs)("div",{style:{display:"flex",gap:"1.2rem"},children:[(0,r.jsxs)("p",{children:["Hey, ",s.user.userId.name]}),(0,r.jsx)("p",{onClick:()=>{e.push("/profile")},style:{fontWeight:"bold",cursor:"pointer"},children:"Profile"}),(0,r.jsx)("p",{onClick:()=>{localStorage.removeItem("token"),e.push("/login"),t((0,c.cL)())},style:{fontWeight:"bold",cursor:"pointer"},children:"Logout"})]})}),!s.profileFetched&&(0,r.jsx)("div",{onClick:()=>{e.push("/login")},className:o().buttonJoin,children:(0,r.jsx)("p",{children:"Be a part"})})]})]})})}[l,c]=d.then?(await d)():d,a()}catch(e){a(e)}})},5680:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{$:()=>i,C:()=>o});var r=s(1428),n=e([r]);r=(n.then?(await n)():n)[0];let o="https://connectify-a2ya.onrender.com",i=r.default.create({baseURL:o});a()}catch(e){a(e)}})},6037:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{CF:()=>d,DY:()=>l,Fy:()=>m,Lx:()=>i,Oe:()=>h,Wm:()=>u,Zt:()=>c,hf:()=>p});var r=s(9198),n=s(5680),o=e([r,n]);[r,n]=o.then?(await o)():o;let i=(0,r.createAsyncThunk)("user/login",async(e,t)=>{try{let s=await n.$.post("/login",{email:e.email,password:e.password});if(!s.data.token)return t.rejectWithValue({message:"token not provided"});return localStorage.setItem("token",s.data.token),t.fulfillWithValue(s.data.token)}catch(e){return t.rejectWithValue(e.response.data)}}),l=(0,r.createAsyncThunk)("user/register",async(e,t)=>{try{let s=await n.$.post("/register",{username:e.username,password:e.password,email:e.email,name:e.name});return t.fulfillWithValue(s.data)}catch(e){return t.rejectWithValue(e.response.data)}}),c=(0,r.createAsyncThunk)("user/getAboutUser",async(e,t)=>{try{let s=await n.$.get("/get_user_and_profile",{params:{token:e.token}});return t.fulfillWithValue(s.data)}catch(e){return t.rejectWithValue(e.response.data)}}),d=(0,r.createAsyncThunk)("user/getAllUsers",async(e,t)=>{try{let e=await n.$.get("/user/get_all_users");return t.fulfillWithValue(e.data)}catch(e){return t.rejectWithValue(e.response.data)}}),u=(0,r.createAsyncThunk)("user/sendConnectionRequest",async(e,t)=>{try{let s=await n.$.post("/user/send_connection_request",{token:e.token,connectionId:e.user_id});return t.dispatch(h({token:e.token})),t.fulfillWithValue(s.data)}catch(e){return t.rejectWithValue(e.response.data)}}),h=(0,r.createAsyncThunk)("user/getConnectionRequest",async(e,t)=>{try{let s=await n.$.get("/user/getConnectionRequests",{params:{token:e.token}});return t.fulfillWithValue(s.data.connections)}catch(e){return t.rejectWithValue(e.response.data.message)}}),p=(0,r.createAsyncThunk)("user/getMyConnectionRequests",async(e,t)=>{try{let s=await n.$.get("/user/user_connection_request",{params:{token:e.token}});return t.fulfillWithValue(s.data)}catch(e){return t.rejectWithValue(e.response.data.message)}}),m=(0,r.createAsyncThunk)("user/acceptConnection",async(e,t)=>{try{let s=await n.$.post("/user/accept_connection_request",{token:e.token,requestId:e.connectionId,action_type:e.action});return t.dispatch(h({token:e.token})),t.dispatch(p({token:e.token})),t.fulfillWithValue(s.data)}catch(e){return t.rejectWithValue(e.response.data.message)}});a()}catch(e){a(e)}})},6253:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{Gy:()=>h,Ow:()=>u,XS:()=>d,pD:()=>l,ys:()=>c,zX:()=>i});var r=s(5680),n=s(9198),o=e([r,n]);[r,n]=o.then?(await o)():o;let i=(0,n.createAsyncThunk)("post/getAllPosts",async(e,t)=>{try{let e=await r.$.get("/posts");return t.fulfillWithValue(e.data)}catch(e){return t.rejectWithValue(e.response.data)}}),l=(0,n.createAsyncThunk)("post/createPost",async(e,t)=>{let{file:s,body:a}=e;try{let e=new FormData;e.append("token",localStorage.getItem("token")),e.append("body",a),e.append("media",s);let n=await r.$.post("/post",e,{headers:{"Content-Type":"multipart/form-data"}});if(200===n.status)return t.fulfillWithValue("post uploaded");return t.rejectWithValue("post not uploaded")}catch(e){return t.rejectWithValue(e.response.data)}}),c=(0,n.createAsyncThunk)("post/deletePost",async(e,t)=>{try{let s=await r.$.delete("/delete_post",{data:{token:localStorage.getItem("token"),post_id:e.post_id}});return t.fulfillWithValue(s.data)}catch(e){return t.rejectWithValue("something went wrong")}}),d=(0,n.createAsyncThunk)("post/incrementLike",async(e,t)=>{try{let s=await r.$.post("/increment_post_like",{post_id:e.post_id});return t.fulfillWithValue(s.data)}catch(e){return t.rejectWithValue("something went wrong")}}),u=(0,n.createAsyncThunk)("post/getAllComments",async(e,t)=>{try{let s=await r.$.get("/get_comments",{params:{post_id:e.post_id}});return t.fulfillWithValue({comments:s.data,post_id:e.post_id})}catch(e){return t.rejectWithValue("something went wrong")}}),h=(0,n.createAsyncThunk)("post/postComment",async(e,t)=>{try{console.log({post_id:e.post_id,body:e.body});let s=await r.$.post("/comment",{token:localStorage.getItem("token"),post_id:e.post_id,commentBody:e.body});return t.fulfillWithValue(s.data)}catch(e){return t.rejectWithValue("something went wrong")}});a()}catch(e){a(e)}})},3827:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{Ay:()=>p,FS:()=>d,cL:()=>c,uB:()=>h});var r=s(9198),n=s(6037),o=e([r,n]);[r,n]=o.then?(await o)():o;let i={user:void 0,isError:!1,isSuccess:!1,isLoading:!1,loggedIn:!1,message:{message:""},isTokenThere:!1,profileFetched:!1,connections:[],connectionRequest:[],all_users:[],all_profiles_fetched:!1},l=(0,r.createSlice)({name:"auth",initialState:i,reducers:{reset:()=>i,handleLoginUser:e=>{e.message={message:"Hello"}},emptyMessage:e=>{e.message={message:""}},setTokenIsThere:e=>{e.isTokenThere=!0},setTokenIsNotThere:e=>{e.isTokenThere=!1}},extraReducers:e=>{e.addCase(n.Lx.pending,e=>{e.isLoading=!0,e.message={message:"Knocking the door..."}}).addCase(n.Lx.fulfilled,e=>{e.isError=!1,e.isLoading=!1,e.isSuccess=!0,e.loggedIn=!0,e.message={message:"Login is successful"}}).addCase(n.Lx.rejected,(e,t)=>{e.isError=!0,e.isLoading=!1,e.message=t.payload||{message:"Login failed"}}).addCase(n.DY.pending,e=>{e.isLoading=!0,e.message={message:"Registering you..."}}).addCase(n.DY.fulfilled,e=>{e.isError=!1,e.isLoading=!1,e.isSuccess=!0,e.loggedIn=!0,e.message={message:"Registration successful, please log in"}}).addCase(n.DY.rejected,(e,t)=>{e.isError=!0,e.isLoading=!1,e.message=t.payload||{message:"Registration failed"}}).addCase(n.Zt.fulfilled,(e,t)=>{e.isLoading=!1,e.isError=!1,e.profileFetched=!0,e.user=t.payload.profile}).addCase(n.CF.fulfilled,(e,t)=>{e.isLoading=!1,e.isError=!1,e.all_profiles_fetched=!0,e.all_users=t.payload.profiles}).addCase(n.Oe.fulfilled,(e,t)=>{e.connections=t.payload}).addCase(n.Oe.rejected,(e,t)=>{e.message=t.payload}).addCase(n.hf.fulfilled,(e,t)=>{e.connectionRequest=t.payload}).addCase(n.hf.rejected,(e,t)=>{e.message=t.payload})}}),{reset:c,emptyMessage:d,setTokenIsNotThere:u,setTokenIsThere:h}=l.actions,p=l.reducer;a()}catch(e){a(e)}})},5291:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{Ay:()=>u,Xw:()=>d});var r=s(9198),n=s(6253),o=e([r,n]);[r,n]=o.then?(await o)():o;let i={posts:[],isError:!1,postFetched:!1,isLoading:!1,loggedIn:!1,message:"",comments:[],postId:""},l=(0,r.createSlice)({name:"post",initialState:i,reducers:{reset:()=>i,resetPostId:e=>{e.postId=""}},extraReducers:e=>{e.addCase(n.zX.pending,e=>{e.isLoading=!0,e.message="fetching all the posts"}).addCase(n.zX.fulfilled,(e,t)=>{e.isLoading=!1,e.isError=!1,e.postFetched=!0,e.posts=t.payload.posts.reverse()}).addCase(n.zX.rejected,(e,t)=>{e.isLoading=!1,e.isError=!0,e.message=t.payload}).addCase(n.Ow.fulfilled,(e,t)=>{e.postId=t.payload.post_id,e.comments=t.payload.comments})}}),{reset:c,resetPostId:d}=l.actions,u=l.reducer;a()}catch(e){a(e)}})},2464:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{M:()=>l});var r=s(9198),n=s(3827),o=s(5291),i=e([r,n,o]);[r,n,o]=i.then?(await i)():i;let l=(0,r.configureStore)({reducer:{auth:n.Ay,postReducer:o.Ay}});a()}catch(e){a(e)}})},5275:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{A:()=>u});var r=s(8732);s(2015);var n=s(9177),o=s.n(n),i=s(6715),l=s(3827),c=s(4062),d=e([l,c]);function u({children:e}){let t=(0,i.useRouter)();(0,c.useDispatch)();let s=(0,c.useSelector)(e=>e.auth);return(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"container",children:(0,r.jsxs)("div",{className:o().homeContainer,children:[(0,r.jsxs)("div",{className:o().homeContainer__left,children:[(0,r.jsxs)("div",{onClick:()=>{t.push("/dashboard")},className:o().sideBarOption,children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"})}),(0,r.jsx)("p",{children:"Scroll"})]}),(0,r.jsxs)("div",{onClick:()=>{t.push("/discover")},className:o().sideBarOption,children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})}),(0,r.jsx)("p",{children:"Discover"})]}),(0,r.jsxs)("div",{onClick:()=>{t.push("/my_connections")},className:o().sideBarOption,children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"})}),(0,r.jsx)("p",{children:"My Connections"})]})]}),(0,r.jsx)("div",{className:o().homeContainer__feedContainer,children:e}),(0,r.jsxs)("div",{className:o().homeContainer__extraContainer,children:[(0,r.jsx)("h3",{children:"Top Profiles"}),s.all_profiles_fetched&&s.all_users.map(e=>(0,r.jsx)("div",{className:o().extraContainer__profile,children:(0,r.jsx)("p",{children:e.userId.name})},e._id))]})]})}),(0,r.jsxs)("div",{className:o().mobileNavbar,children:[(0,r.jsx)("div",{onClick:()=>{t.push("/dashboard")},className:o().singleNavItemHolder_mobileView,children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"})})}),(0,r.jsx)("div",{onClick:()=>{t.push("/discover")},className:o().singleNavItemHolder_mobileView,children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})})}),(0,r.jsx)("div",{onClick:()=>{t.push("my_connections")},className:o().singleNavItemHolder_mobileView,children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"})})})]})]})}[l,c]=d.then?(await d)():d,a()}catch(e){a(e)}})},980:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{A:()=>i});var r=s(8732),n=s(7175);s(2015);var o=e([n]);n=(o.then?(await o)():o)[0];let i=function({children:e}){return(0,r.jsxs)("div",{children:[(0,r.jsx)(n.A,{}),e]})};a()}catch(e){a(e)}})},3200:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{default:()=>l});var r=s(8732),n=s(2464);s(9361);var o=s(4062),i=e([n,o]);function l({Component:e,pageProps:t}){return(0,r.jsx)(o.Provider,{store:n.M,children:(0,r.jsx)(e,{...t})})}[n,o]=i.then?(await i)():i,a()}catch(e){a(e)}})},6530:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var a=s(8732),r=s(883);function n(){return(0,a.jsxs)(r.Html,{lang:"en",children:[(0,a.jsx)(r.Head,{}),(0,a.jsxs)("body",{children:[(0,a.jsx)(r.Main,{}),(0,a.jsx)(r.NextScript,{})]})]})}},9361:()=>{}};