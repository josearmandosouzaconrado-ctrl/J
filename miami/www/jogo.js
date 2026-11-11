(()=>{var Up=Object.defineProperty;var If=(e,t)=>{for(var n in t)Up(e,n,{get:t[n],enumerable:!0})};var ou="170";var Dp=0,zf=1,Np=2;var Yd=1,au=2,zi=3,es=0,un=1,ii=2,Qi=0,xr=1,br=2,Lf=3,Uf=4,Bp=5,Ts=100,Fp=101,Op=102,kp=103,Hp=104,Vp=200,Gp=201,Wp=202,Xp=203,zl=204,Ll=205,qp=206,Yp=207,$p=208,Zp=209,Jp=210,jp=211,Kp=212,Qp=213,tm=214,Ul=0,Dl=1,Nl=2,Mr=3,Bl=4,Fl=5,Ol=6,kl=7,rc=0,em=1,nm=2,ts=0,im=1,sm=2,rm=3,cu=4,om=5,am=6,cm=7;var $d=300,Sr=301,Er=302,Hl=303,Vl=304,oc=306,Wn=1e3,Rs=1001,Gl=1002,fn=1003,lm=1004;var Jo=1005;var en=1006,jc=1007;var Cs=1008;var Sn=1009,Zd=1010,Jd=1011,go=1012,lu=1013,Ps=1014,mi=1015,wo=1016,hu=1017,uu=1018,Tr=1020,jd=35902,Kd=1021,Qd=1022,xn=1023,t0=1024,e0=1025,vr=1026,wr=1027,Ao=1028,fu=1029,n0=1030,du=1031;var pu=1033,wa=33776,Aa=33777,Ra=33778,Ca=33779,Wl=35840,Xl=35841,ql=35842,Yl=35843,$l=36196,Zl=37492,Jl=37496,jl=37808,Kl=37809,Ql=37810,th=37811,eh=37812,nh=37813,ih=37814,sh=37815,rh=37816,oh=37817,ah=37818,ch=37819,lh=37820,hh=37821,Pa=36492,uh=36494,fh=36495,i0=36283,dh=36284,ph=36285,mh=36286;var Ia=2300,gh=2301,Kc=2302,Df=2400,Nf=2401,Bf=2402;var hm=3200,um=3201;var ac=0,fm=1,Ki="",Ue="srgb",Dr="srgb-linear",cc="linear",_e="srgb";var tr=7680;var Ff=519,dm=512,pm=513,mm=514,s0=515,gm=516,xm=517,vm=518,ym=519,Of=35044,os=35048;var kf="300 es",Li=2e3,za=2001,ns=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(n);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Qc=Math.PI/180,xh=180/Math.PI;function Nr(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[e&255]+ln[e>>8&255]+ln[e>>16&255]+ln[e>>24&255]+"-"+ln[t&255]+ln[t>>8&255]+"-"+ln[t>>16&15|64]+ln[t>>24&255]+"-"+ln[n&63|128]+ln[n>>8&255]+"-"+ln[n>>16&255]+ln[n>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function tn(e,t,n){return Math.max(t,Math.min(n,e))}function _m(e,t){return(e%t+t)%t}function tl(e,t,n){return(1-n)*e+n*t}function no(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function Mn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}var ct=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(tn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ne=class e{constructor(t,n,i,s,r,o,a,c,h){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,o,a,c,h)}set(t,n,i,s,r,o,a,c,h){let l=this.elements;return l[0]=t,l[1]=s,l[2]=a,l[3]=n,l[4]=r,l[5]=c,l[6]=i,l[7]=o,l[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,r=this.elements,o=i[0],a=i[3],c=i[6],h=i[1],l=i[4],u=i[7],f=i[2],d=i[5],p=i[8],v=s[0],m=s[3],g=s[6],_=s[1],y=s[4],b=s[7],R=s[2],w=s[5],A=s[8];return r[0]=o*v+a*_+c*R,r[3]=o*m+a*y+c*w,r[6]=o*g+a*b+c*A,r[1]=h*v+l*_+u*R,r[4]=h*m+l*y+u*w,r[7]=h*g+l*b+u*A,r[2]=f*v+d*_+p*R,r[5]=f*m+d*y+p*w,r[8]=f*g+d*b+p*A,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],l=t[8];return n*o*l-n*a*h-i*r*l+i*a*c+s*r*h-s*o*c}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],l=t[8],u=l*o-a*h,f=a*c-l*r,d=h*r-o*c,p=n*u+i*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/p;return t[0]=u*v,t[1]=(s*h-l*i)*v,t[2]=(a*i-s*o)*v,t[3]=f*v,t[4]=(l*n-s*c)*v,t[5]=(s*r-a*n)*v,t[6]=d*v,t[7]=(i*c-h*n)*v,t[8]=(o*n-i*r)*v,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,r,o,a){let c=Math.cos(r),h=Math.sin(r);return this.set(i*c,i*h,-i*(c*o+h*a)+o+t,-s*h,s*c,-s*(-h*o+c*a)+a+n,0,0,1),this}scale(t,n){return this.premultiply(el.makeScale(t,n)),this}rotate(t){return this.premultiply(el.makeRotation(-t)),this}translate(t,n){return this.premultiply(el.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},el=new ne;function r0(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function La(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function bm(){let e=La("canvas");return e.style.display="block",e}var Hf={};function ho(e){e in Hf||(Hf[e]=!0,console.warn(e))}function Mm(e,t,n){return new Promise(function(i,s){function r(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}function Sm(e){let t=e.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Em(e){let t=e.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var ue={enabled:!0,workingColorSpace:Dr,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===_e&&(e.r=Di(e.r),e.g=Di(e.g),e.b=Di(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===_e&&(e.r=yr(e.r),e.g=yr(e.g),e.b=yr(e.b))),e},fromWorkingColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===Ki?cc:this.spaces[e].transfer},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}};function Di(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function yr(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Vf=[.64,.33,.3,.6,.15,.06],Gf=[.2126,.7152,.0722],Wf=[.3127,.329],Xf=new ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qf=new ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ue.define({[Dr]:{primaries:Vf,whitePoint:Wf,transfer:cc,toXYZ:Xf,fromXYZ:qf,luminanceCoefficients:Gf,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:Vf,whitePoint:Wf,transfer:_e,toXYZ:Xf,fromXYZ:qf,luminanceCoefficients:Gf,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}});var er,vh=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{er===void 0&&(er=La("canvas")),er.width=t.width,er.height=t.height;let i=er.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=er}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let n=La("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Di(r[o]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Di(n[i]/255)*255):n[i]=Di(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Tm=0,Ua=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Nr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(nl(s[o].image)):r.push(nl(s[o]))}else r=nl(s);i.url=r}return n||(t.images[this.uuid]=i),i}};function nl(e){return typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap?vh.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var wm=0,En=class e extends ns{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=Rs,s=Rs,r=en,o=Cs,a=xn,c=Sn,h=e.DEFAULT_ANISOTROPY,l=Ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=Nr(),this.name="",this.source=new Ua(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$d)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wn:t.x=t.x-Math.floor(t.x);break;case Rs:t.x=t.x<0?0:1;break;case Gl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wn:t.y=t.y-Math.floor(t.y);break;case Rs:t.y=t.y<0?0:1;break;case Gl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};En.DEFAULT_IMAGE=null;En.DEFAULT_MAPPING=$d;En.DEFAULT_ANISOTROPY=1;var Be=class e{constructor(t=0,n=0,i=0,s=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*n+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*n+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*n+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*n+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,r,c=t.elements,h=c[0],l=c[4],u=c[8],f=c[1],d=c[5],p=c[9],v=c[2],m=c[6],g=c[10];if(Math.abs(l-f)<.01&&Math.abs(u-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(l+f)<.1&&Math.abs(u+v)<.1&&Math.abs(p+m)<.1&&Math.abs(h+d+g-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let y=(h+1)/2,b=(d+1)/2,R=(g+1)/2,w=(l+f)/4,A=(u+v)/4,P=(p+m)/4;return y>b&&y>R?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=w/i,r=A/i):b>R?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=w/s,r=P/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=A/r,s=P/r),this.set(i,s,r,n),this}let _=Math.sqrt((m-p)*(m-p)+(u-v)*(u-v)+(f-l)*(f-l));return Math.abs(_)<.001&&(_=1),this.x=(m-p)/_,this.y=(u-v)/_,this.z=(f-l)/_,this.w=Math.acos((h+d+g-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},yh=class extends ns{constructor(t=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new Be(0,0,t,n),this.scissorTest=!1,this.viewport=new Be(0,0,t,n);let s={width:t,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new En(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let n=Object.assign({},t.texture.image);return this.texture.source=new Ua(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ni=class extends yh{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Da=class extends En{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var _h=class extends En{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Tn=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,r,o,a){let c=i[s+0],h=i[s+1],l=i[s+2],u=i[s+3],f=r[o+0],d=r[o+1],p=r[o+2],v=r[o+3];if(a===0){t[n+0]=c,t[n+1]=h,t[n+2]=l,t[n+3]=u;return}if(a===1){t[n+0]=f,t[n+1]=d,t[n+2]=p,t[n+3]=v;return}if(u!==v||c!==f||h!==d||l!==p){let m=1-a,g=c*f+h*d+l*p+u*v,_=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){let R=Math.sqrt(y),w=Math.atan2(R,g*_);m=Math.sin(m*w)/R,a=Math.sin(a*w)/R}let b=a*_;if(c=c*m+f*b,h=h*m+d*b,l=l*m+p*b,u=u*m+v*b,m===1-a){let R=1/Math.sqrt(c*c+h*h+l*l+u*u);c*=R,h*=R,l*=R,u*=R}}t[n]=c,t[n+1]=h,t[n+2]=l,t[n+3]=u}static multiplyQuaternionsFlat(t,n,i,s,r,o){let a=i[s],c=i[s+1],h=i[s+2],l=i[s+3],u=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return t[n]=a*p+l*u+c*d-h*f,t[n+1]=c*p+l*f+h*u-a*d,t[n+2]=h*p+l*d+a*f-c*u,t[n+3]=l*p-a*u-c*f-h*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,h=a(i/2),l=a(s/2),u=a(r/2),f=c(i/2),d=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=f*l*u+h*d*p,this._y=h*d*u-f*l*p,this._z=h*l*p+f*d*u,this._w=h*l*u-f*d*p;break;case"YXZ":this._x=f*l*u+h*d*p,this._y=h*d*u-f*l*p,this._z=h*l*p-f*d*u,this._w=h*l*u+f*d*p;break;case"ZXY":this._x=f*l*u-h*d*p,this._y=h*d*u+f*l*p,this._z=h*l*p+f*d*u,this._w=h*l*u-f*d*p;break;case"ZYX":this._x=f*l*u-h*d*p,this._y=h*d*u+f*l*p,this._z=h*l*p-f*d*u,this._w=h*l*u+f*d*p;break;case"YZX":this._x=f*l*u+h*d*p,this._y=h*d*u+f*l*p,this._z=h*l*p-f*d*u,this._w=h*l*u-f*d*p;break;case"XZY":this._x=f*l*u-h*d*p,this._y=h*d*u-f*l*p,this._z=h*l*p+f*d*u,this._w=h*l*u+f*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],r=n[8],o=n[1],a=n[5],c=n[9],h=n[2],l=n[6],u=n[10],f=i+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(l-c)*d,this._y=(r-h)*d,this._z=(o-s)*d}else if(i>a&&i>u){let d=2*Math.sqrt(1+i-a-u);this._w=(l-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+h)/d}else if(a>u){let d=2*Math.sqrt(1+a-i-u);this._w=(r-h)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+l)/d}else{let d=2*Math.sqrt(1+u-i-a);this._w=(o-s)/d,this._x=(r+h)/d,this._y=(c+l)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(tn(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,r=t._z,o=t._w,a=n._x,c=n._y,h=n._z,l=n._w;return this._x=i*l+o*a+s*h-r*c,this._y=s*l+o*c+r*a-i*h,this._z=r*l+o*h+i*c-s*a,this._w=o*l-i*a-s*c-r*h,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-n;return this._w=d*o+n*this._w,this._x=d*i+n*this._x,this._y=d*s+n*this._y,this._z=d*r+n*this._z,this.normalize(),this}let h=Math.sqrt(c),l=Math.atan2(h,a),u=Math.sin((1-n)*l)/h,f=Math.sin(n*l)/h;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(n),r*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class e{constructor(t=0,n=0,i=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Yf.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Yf.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6]*s,this.y=r[1]*n+r[4]*i+r[7]*s,this.z=r[2]*n+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*n+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*n+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*n+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*n+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,h=2*(o*s-a*i),l=2*(a*n-r*s),u=2*(r*i-o*n);return this.x=n+c*h+o*u-a*l,this.y=i+c*l+a*h-r*u,this.z=s+c*u+r*l-o*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s,this.y=r[1]*n+r[5]*i+r[9]*s,this.z=r[2]*n+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,r=t.z,o=n.x,a=n.y,c=n.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return il.copy(this).projectOnVector(t),this.sub(il)}reflect(t){return this.sub(il.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(tn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},il=new N,Yf=new Tn,Bi=class{constructor(t=new N(1/0,1/0,1/0),n=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(Qn.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(Qn.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=Qn.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(n===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qn):Qn.fromBufferAttribute(r,o),Qn.applyMatrix4(t.matrixWorld),this.expandByPoint(Qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),jo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),jo.copy(i.boundingBox)),jo.applyMatrix4(t.matrixWorld),this.union(jo)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qn),Qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(io),Ko.subVectors(this.max,io),nr.subVectors(t.a,io),ir.subVectors(t.b,io),sr.subVectors(t.c,io),qi.subVectors(ir,nr),Yi.subVectors(sr,ir),vs.subVectors(nr,sr);let n=[0,-qi.z,qi.y,0,-Yi.z,Yi.y,0,-vs.z,vs.y,qi.z,0,-qi.x,Yi.z,0,-Yi.x,vs.z,0,-vs.x,-qi.y,qi.x,0,-Yi.y,Yi.x,0,-vs.y,vs.x,0];return!sl(n,nr,ir,sr,Ko)||(n=[1,0,0,0,1,0,0,0,1],!sl(n,nr,ir,sr,Ko))?!1:(Qo.crossVectors(qi,Yi),n=[Qo.x,Qo.y,Qo.z],sl(n,nr,ir,sr,Ko))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ai),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Ai=[new N,new N,new N,new N,new N,new N,new N,new N],Qn=new N,jo=new Bi,nr=new N,ir=new N,sr=new N,qi=new N,Yi=new N,vs=new N,io=new N,Ko=new N,Qo=new N,ys=new N;function sl(e,t,n,i,s){for(let r=0,o=e.length-3;r<=o;r+=3){ys.fromArray(e,r);let a=s.x*Math.abs(ys.x)+s.y*Math.abs(ys.y)+s.z*Math.abs(ys.z),c=t.dot(ys),h=n.dot(ys),l=i.dot(ys);if(Math.max(-Math.max(c,h,l),Math.min(c,h,l))>a)return!1}return!0}var Am=new Bi,so=new N,rl=new N,Fi=class{constructor(t=new N,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):Am.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;so.subVectors(t,this.center);let n=so.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(so,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(rl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(so.copy(t.center).add(rl)),this.expandByPoint(so.copy(t.center).sub(rl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ri=new N,ol=new N,ta=new N,$i=new N,al=new N,ea=new N,cl=new N,Ar=class{constructor(t=new N,n=new N(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ri)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=Ri.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Ri.copy(this.origin).addScaledVector(this.direction,n),Ri.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){ol.copy(t).add(n).multiplyScalar(.5),ta.copy(n).sub(t).normalize(),$i.copy(this.origin).sub(ol);let r=t.distanceTo(n)*.5,o=-this.direction.dot(ta),a=$i.dot(this.direction),c=-$i.dot(ta),h=$i.lengthSq(),l=Math.abs(1-o*o),u,f,d,p;if(l>0)if(u=o*c-a,f=o*a-c,p=r*l,u>=0)if(f>=-p)if(f<=p){let v=1/l;u*=v,f*=v,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+h}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+h;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+h;else f<=-p?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+h):f<=p?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+h):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+h);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ol).addScaledVector(ta,f),d}intersectSphere(t,n){Ri.subVectors(t.center,this.origin);let i=Ri.dot(this.direction),s=Ri.dot(Ri)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,n):this.at(a,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,r,o,a,c,h=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,f=this.origin;return h>=0?(i=(t.min.x-f.x)*h,s=(t.max.x-f.x)*h):(i=(t.max.x-f.x)*h,s=(t.min.x-f.x)*h),l>=0?(r=(t.min.y-f.y)*l,o=(t.max.y-f.y)*l):(r=(t.max.y-f.y)*l,o=(t.min.y-f.y)*l),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Ri)!==null}intersectTriangle(t,n,i,s,r){al.subVectors(n,t),ea.subVectors(i,t),cl.crossVectors(al,ea);let o=this.direction.dot(cl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$i.subVectors(this.origin,t);let c=a*this.direction.dot(ea.crossVectors($i,ea));if(c<0)return null;let h=a*this.direction.dot(al.cross($i));if(h<0||c+h>o)return null;let l=-a*$i.dot(cl);return l<0?null:this.at(l/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},re=class e{constructor(t,n,i,s,r,o,a,c,h,l,u,f,d,p,v,m){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,o,a,c,h,l,u,f,d,p,v,m)}set(t,n,i,s,r,o,a,c,h,l,u,f,d,p,v,m){let g=this.elements;return g[0]=t,g[4]=n,g[8]=i,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=h,g[6]=l,g[10]=u,g[14]=f,g[3]=d,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){let n=this.elements,i=t.elements,s=1/rr.setFromMatrixColumn(t,0).length(),r=1/rr.setFromMatrixColumn(t,1).length(),o=1/rr.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*r,n[5]=i[5]*r,n[6]=i[6]*r,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),h=Math.sin(s),l=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*l,d=o*u,p=a*l,v=a*u;n[0]=c*l,n[4]=-c*u,n[8]=h,n[1]=d+p*h,n[5]=f-v*h,n[9]=-a*c,n[2]=v-f*h,n[6]=p+d*h,n[10]=o*c}else if(t.order==="YXZ"){let f=c*l,d=c*u,p=h*l,v=h*u;n[0]=f+v*a,n[4]=p*a-d,n[8]=o*h,n[1]=o*u,n[5]=o*l,n[9]=-a,n[2]=d*a-p,n[6]=v+f*a,n[10]=o*c}else if(t.order==="ZXY"){let f=c*l,d=c*u,p=h*l,v=h*u;n[0]=f-v*a,n[4]=-o*u,n[8]=p+d*a,n[1]=d+p*a,n[5]=o*l,n[9]=v-f*a,n[2]=-o*h,n[6]=a,n[10]=o*c}else if(t.order==="ZYX"){let f=o*l,d=o*u,p=a*l,v=a*u;n[0]=c*l,n[4]=p*h-d,n[8]=f*h+v,n[1]=c*u,n[5]=v*h+f,n[9]=d*h-p,n[2]=-h,n[6]=a*c,n[10]=o*c}else if(t.order==="YZX"){let f=o*c,d=o*h,p=a*c,v=a*h;n[0]=c*l,n[4]=v-f*u,n[8]=p*u+d,n[1]=u,n[5]=o*l,n[9]=-a*l,n[2]=-h*l,n[6]=d*u+p,n[10]=f-v*u}else if(t.order==="XZY"){let f=o*c,d=o*h,p=a*c,v=a*h;n[0]=c*l,n[4]=-u,n[8]=h*l,n[1]=f*u+v,n[5]=o*l,n[9]=d*u-p,n[2]=p*u-d,n[6]=a*l,n[10]=v*u+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Rm,t,Cm)}lookAt(t,n,i){let s=this.elements;return Nn.subVectors(t,n),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),Zi.crossVectors(i,Nn),Zi.lengthSq()===0&&(Math.abs(i.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),Zi.crossVectors(i,Nn)),Zi.normalize(),na.crossVectors(Nn,Zi),s[0]=Zi.x,s[4]=na.x,s[8]=Nn.x,s[1]=Zi.y,s[5]=na.y,s[9]=Nn.y,s[2]=Zi.z,s[6]=na.z,s[10]=Nn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,r=this.elements,o=i[0],a=i[4],c=i[8],h=i[12],l=i[1],u=i[5],f=i[9],d=i[13],p=i[2],v=i[6],m=i[10],g=i[14],_=i[3],y=i[7],b=i[11],R=i[15],w=s[0],A=s[4],P=s[8],S=s[12],M=s[1],I=s[5],L=s[9],U=s[13],D=s[2],W=s[6],H=s[10],nt=s[14],V=s[3],Z=s[7],J=s[11],j=s[15];return r[0]=o*w+a*M+c*D+h*V,r[4]=o*A+a*I+c*W+h*Z,r[8]=o*P+a*L+c*H+h*J,r[12]=o*S+a*U+c*nt+h*j,r[1]=l*w+u*M+f*D+d*V,r[5]=l*A+u*I+f*W+d*Z,r[9]=l*P+u*L+f*H+d*J,r[13]=l*S+u*U+f*nt+d*j,r[2]=p*w+v*M+m*D+g*V,r[6]=p*A+v*I+m*W+g*Z,r[10]=p*P+v*L+m*H+g*J,r[14]=p*S+v*U+m*nt+g*j,r[3]=_*w+y*M+b*D+R*V,r[7]=_*A+y*I+b*W+R*Z,r[11]=_*P+y*L+b*H+R*J,r[15]=_*S+y*U+b*nt+R*j,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],h=t[13],l=t[2],u=t[6],f=t[10],d=t[14],p=t[3],v=t[7],m=t[11],g=t[15];return p*(+r*c*u-s*h*u-r*a*f+i*h*f+s*a*d-i*c*d)+v*(+n*c*d-n*h*f+r*o*f-s*o*d+s*h*l-r*c*l)+m*(+n*h*u-n*a*d-r*o*u+i*o*d+r*a*l-i*h*l)+g*(-s*a*l-n*c*u+n*a*f+s*o*u-i*o*f+i*c*l)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],l=t[8],u=t[9],f=t[10],d=t[11],p=t[12],v=t[13],m=t[14],g=t[15],_=u*m*h-v*f*h+v*c*d-a*m*d-u*c*g+a*f*g,y=p*f*h-l*m*h-p*c*d+o*m*d+l*c*g-o*f*g,b=l*v*h-p*u*h+p*a*d-o*v*d-l*a*g+o*u*g,R=p*u*c-l*v*c-p*a*f+o*v*f+l*a*m-o*u*m,w=n*_+i*y+s*b+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/w;return t[0]=_*A,t[1]=(v*f*r-u*m*r-v*s*d+i*m*d+u*s*g-i*f*g)*A,t[2]=(a*m*r-v*c*r+v*s*h-i*m*h-a*s*g+i*c*g)*A,t[3]=(u*c*r-a*f*r-u*s*h+i*f*h+a*s*d-i*c*d)*A,t[4]=y*A,t[5]=(l*m*r-p*f*r+p*s*d-n*m*d-l*s*g+n*f*g)*A,t[6]=(p*c*r-o*m*r-p*s*h+n*m*h+o*s*g-n*c*g)*A,t[7]=(o*f*r-l*c*r+l*s*h-n*f*h-o*s*d+n*c*d)*A,t[8]=b*A,t[9]=(p*u*r-l*v*r-p*i*d+n*v*d+l*i*g-n*u*g)*A,t[10]=(o*v*r-p*a*r+p*i*h-n*v*h-o*i*g+n*a*g)*A,t[11]=(l*a*r-o*u*r-l*i*h+n*u*h+o*i*d-n*a*d)*A,t[12]=R*A,t[13]=(l*v*s-p*u*s+p*i*f-n*v*f-l*i*m+n*u*m)*A,t[14]=(p*a*s-o*v*s-p*i*c+n*v*c+o*i*m-n*a*m)*A,t[15]=(o*u*s-l*a*s+l*i*c-n*u*c-o*i*f+n*a*f)*A,this}scale(t){let n=this.elements,i=t.x,s=t.y,r=t.z;return n[0]*=i,n[4]*=s,n[8]*=r,n[1]*=i,n[5]*=s,n[9]*=r,n[2]*=i,n[6]*=s,n[10]*=r,n[3]*=i,n[7]*=s,n[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),r=1-i,o=t.x,a=t.y,c=t.z,h=r*o,l=r*a;return this.set(h*o+i,h*a-s*c,h*c+s*a,0,h*a+s*c,l*a+i,l*c-s*o,0,h*c-s*a,l*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,r=n._x,o=n._y,a=n._z,c=n._w,h=r+r,l=o+o,u=a+a,f=r*h,d=r*l,p=r*u,v=o*l,m=o*u,g=a*u,_=c*h,y=c*l,b=c*u,R=i.x,w=i.y,A=i.z;return s[0]=(1-(v+g))*R,s[1]=(d+b)*R,s[2]=(p-y)*R,s[3]=0,s[4]=(d-b)*w,s[5]=(1-(f+g))*w,s[6]=(m+_)*w,s[7]=0,s[8]=(p+y)*A,s[9]=(m-_)*A,s[10]=(1-(f+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements,r=rr.set(s[0],s[1],s[2]).length(),o=rr.set(s[4],s[5],s[6]).length(),a=rr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ti.copy(this);let h=1/r,l=1/o,u=1/a;return ti.elements[0]*=h,ti.elements[1]*=h,ti.elements[2]*=h,ti.elements[4]*=l,ti.elements[5]*=l,ti.elements[6]*=l,ti.elements[8]*=u,ti.elements[9]*=u,ti.elements[10]*=u,n.setFromRotationMatrix(ti),i.x=r,i.y=o,i.z=a,this}makePerspective(t,n,i,s,r,o,a=Li){let c=this.elements,h=2*r/(n-t),l=2*r/(i-s),u=(n+t)/(n-t),f=(i+s)/(i-s),d,p;if(a===Li)d=-(o+r)/(o-r),p=-2*o*r/(o-r);else if(a===za)d=-o/(o-r),p=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=l,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,r,o,a=Li){let c=this.elements,h=1/(n-t),l=1/(i-s),u=1/(o-r),f=(n+t)*h,d=(i+s)*l,p,v;if(a===Li)p=(o+r)*u,v=-2*u;else if(a===za)p=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*h,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*l,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=v,c[14]=-p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},rr=new N,ti=new re,Rm=new N(0,0,0),Cm=new N(1,1,1),Zi=new N,na=new N,Nn=new N,$f=new re,Zf=new Tn,Fe=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],h=s[5],l=s[9],u=s[2],f=s[6],d=s[10];switch(n){case"XYZ":this._y=Math.asin(tn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-l,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-tn(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(tn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-tn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(tn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-tn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-l,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return $f.makeRotationFromQuaternion(t),this.setFromRotationMatrix($f,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Zf.setFromEuler(this),this.setFromQuaternion(Zf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fe.DEFAULT_ORDER="XYZ";var xo=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Pm=0,Jf=new N,or=new Tn,Ci=new re,ia=new N,ro=new N,Im=new N,zm=new Tn,jf=new N(1,0,0),Kf=new N(0,1,0),Qf=new N(0,0,1),td={type:"added"},Lm={type:"removed"},ar={type:"childadded",child:null},ll={type:"childremoved",child:null},nn=class e extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=Nr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new N,n=new Fe,i=new Tn,s=new N(1,1,1);function r(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new re},normalMatrix:{value:new ne}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return or.setFromAxisAngle(t,n),this.quaternion.multiply(or),this}rotateOnWorldAxis(t,n){return or.setFromAxisAngle(t,n),this.quaternion.premultiply(or),this}rotateX(t){return this.rotateOnAxis(jf,t)}rotateY(t){return this.rotateOnAxis(Kf,t)}rotateZ(t){return this.rotateOnAxis(Qf,t)}translateOnAxis(t,n){return Jf.copy(t).applyQuaternion(this.quaternion),this.position.add(Jf.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(jf,t)}translateY(t){return this.translateOnAxis(Kf,t)}translateZ(t){return this.translateOnAxis(Qf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?ia.copy(t):ia.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),ro.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(ro,ia,this.up):Ci.lookAt(ia,ro,this.up),this.quaternion.setFromRotationMatrix(Ci),s&&(Ci.extractRotation(s.matrixWorld),or.setFromRotationMatrix(Ci),this.quaternion.premultiply(or.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(td),ar.child=t,this.dispatchEvent(ar),ar.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(Lm),ll.child=t,this.dispatchEvent(ll),ll.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ci.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ci),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(td),ar.child=t,this.dispatchEvent(ar),ar.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,n);if(o!==void 0)return o}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ro,t,Im),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ro,zm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let h=0,l=c.length;h<l;h++){let u=c[h];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,h=this.material.length;c<h;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(n){let a=o(t.geometries),c=o(t.materials),h=o(t.textures),l=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),h.length>0&&(i.textures=h),l.length>0&&(i.images=l),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=s,i;function o(a){let c=[];for(let h in a){let l=a[h];delete l.metadata,c.push(l)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};nn.DEFAULT_UP=new N(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ei=new N,Pi=new N,hl=new N,Ii=new N,cr=new N,lr=new N,ed=new N,ul=new N,fl=new N,dl=new N,pl=new Be,ml=new Be,gl=new Be,ws=class e{constructor(t=new N,n=new N,i=new N){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),ei.subVectors(t,n),s.cross(ei);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,n,i,s,r){ei.subVectors(s,n),Pi.subVectors(i,n),hl.subVectors(t,n);let o=ei.dot(ei),a=ei.dot(Pi),c=ei.dot(hl),h=Pi.dot(Pi),l=Pi.dot(hl),u=o*h-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(h*c-a*l)*f,p=(o*l-a*c)*f;return r.set(1-d-p,p,d)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(t,n,i,s,r,o,a,c){return this.getBarycoord(t,n,i,s,Ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ii.x),c.addScaledVector(o,Ii.y),c.addScaledVector(a,Ii.z),c)}static getInterpolatedAttribute(t,n,i,s,r,o){return pl.setScalar(0),ml.setScalar(0),gl.setScalar(0),pl.fromBufferAttribute(t,n),ml.fromBufferAttribute(t,i),gl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(pl,r.x),o.addScaledVector(ml,r.y),o.addScaledVector(gl,r.z),o}static isFrontFacing(t,n,i,s){return ei.subVectors(i,n),Pi.subVectors(t,n),ei.cross(Pi).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ei.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),ei.cross(Pi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,r){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,r)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,r=this.c,o,a;cr.subVectors(s,i),lr.subVectors(r,i),ul.subVectors(t,i);let c=cr.dot(ul),h=lr.dot(ul);if(c<=0&&h<=0)return n.copy(i);fl.subVectors(t,s);let l=cr.dot(fl),u=lr.dot(fl);if(l>=0&&u<=l)return n.copy(s);let f=c*u-l*h;if(f<=0&&c>=0&&l<=0)return o=c/(c-l),n.copy(i).addScaledVector(cr,o);dl.subVectors(t,r);let d=cr.dot(dl),p=lr.dot(dl);if(p>=0&&d<=p)return n.copy(r);let v=d*h-c*p;if(v<=0&&h>=0&&p<=0)return a=h/(h-p),n.copy(i).addScaledVector(lr,a);let m=l*p-d*u;if(m<=0&&u-l>=0&&d-p>=0)return ed.subVectors(r,s),a=(u-l)/(u-l+(d-p)),n.copy(s).addScaledVector(ed,a);let g=1/(m+v+f);return o=v*g,a=f*g,n.copy(i).addScaledVector(cr,o).addScaledVector(lr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},o0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ji={h:0,s:0,l:0},sa={h:0,s:0,l:0};function xl(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Vt=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ue.toWorkingColorSpace(this,n),this}setRGB(t,n,i,s=ue.workingColorSpace){return this.r=t,this.g=n,this.b=i,ue.toWorkingColorSpace(this,s),this}setHSL(t,n,i,s=ue.workingColorSpace){if(t=_m(t,1),n=tn(n,0,1),i=tn(i,0,1),n===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+n):i+n-i*n,o=2*i-r;this.r=xl(o,r,t+1/3),this.g=xl(o,r,t),this.b=xl(o,r,t-1/3)}return ue.toWorkingColorSpace(this,s),this}setStyle(t,n=Ue){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,n);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,n);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(r,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Ue){let i=o0[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Di(t.r),this.g=Di(t.g),this.b=Di(t.b),this}copyLinearToSRGB(t){return this.r=yr(t.r),this.g=yr(t.g),this.b=yr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return ue.fromWorkingColorSpace(hn.copy(this),t),Math.round(tn(hn.r*255,0,255))*65536+Math.round(tn(hn.g*255,0,255))*256+Math.round(tn(hn.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=ue.workingColorSpace){ue.fromWorkingColorSpace(hn.copy(this),n);let i=hn.r,s=hn.g,r=hn.b,o=Math.max(i,s,r),a=Math.min(i,s,r),c,h,l=(a+o)/2;if(a===o)c=0,h=0;else{let u=o-a;switch(h=l<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=h,t.l=l,t}getRGB(t,n=ue.workingColorSpace){return ue.fromWorkingColorSpace(hn.copy(this),n),t.r=hn.r,t.g=hn.g,t.b=hn.b,t}getStyle(t=Ue){ue.fromWorkingColorSpace(hn.copy(this),t);let n=hn.r,i=hn.g,s=hn.b;return t!==Ue?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(Ji),this.setHSL(Ji.h+t,Ji.s+n,Ji.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Ji),t.getHSL(sa);let i=tl(Ji.h,sa.h,n),s=tl(Ji.s,sa.s,n),r=tl(Ji.l,sa.l,n);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*n+r[3]*i+r[6]*s,this.g=r[1]*n+r[4]*i+r[7]*s,this.b=r[2]*n+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},hn=new Vt;Vt.NAMES=o0;var Um=0,si=class extends ns{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Um++}),this.uuid=Nr(),this.name="",this.blending=xr,this.side=es,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zl,this.blendDst=Ll,this.blendEquation=Ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=Mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ff,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=tr,this.stencilZFail=tr,this.stencilZPass=tr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==xr&&(i.blending=this.blending),this.side!==es&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==zl&&(i.blendSrc=this.blendSrc),this.blendDst!==Ll&&(i.blendDst=this.blendDst),this.blendEquation!==Ts&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Mr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ff&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==tr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==tr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==tr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(n){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=n[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Fn=class extends si{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ge=new N,ra=new ct,ce=class{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=Of,this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)ra.fromBufferAttribute(this,n),ra.applyMatrix3(t),this.setXY(n,ra.x,ra.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ge.fromBufferAttribute(this,n),Ge.applyMatrix3(t),this.setXYZ(n,Ge.x,Ge.y,Ge.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ge.fromBufferAttribute(this,n),Ge.applyMatrix4(t),this.setXYZ(n,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ge.fromBufferAttribute(this,n),Ge.applyNormalMatrix(t),this.setXYZ(n,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ge.fromBufferAttribute(this,n),Ge.transformDirection(t),this.setXYZ(n,Ge.x,Ge.y,Ge.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=no(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Mn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=no(n,this.array)),n}setX(t,n){return this.normalized&&(n=Mn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=no(n,this.array)),n}setY(t,n){return this.normalized&&(n=Mn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=no(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Mn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=no(n,this.array)),n}setW(t,n){return this.normalized&&(n=Mn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Mn(n,this.array),i=Mn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=Mn(n,this.array),i=Mn(i,this.array),s=Mn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,r){return t*=this.itemSize,this.normalized&&(n=Mn(n,this.array),i=Mn(i,this.array),s=Mn(s,this.array),r=Mn(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Of&&(t.usage=this.usage),t}};var Na=class extends ce{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var Ba=class extends ce{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var Gt=class extends ce{constructor(t,n,i){super(new Float32Array(t),n,i)}},Dm=0,Gn=new re,vl=new nn,hr=new N,Bn=new Bi,oo=new Bi,Je=new N,de=class e extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=Nr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(r0(t)?Ba:Na)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ne().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Gn.makeRotationFromQuaternion(t),this.applyMatrix4(Gn),this}rotateX(t){return Gn.makeRotationX(t),this.applyMatrix4(Gn),this}rotateY(t){return Gn.makeRotationY(t),this.applyMatrix4(Gn),this}rotateZ(t){return Gn.makeRotationZ(t),this.applyMatrix4(Gn),this}translate(t,n,i){return Gn.makeTranslation(t,n,i),this.applyMatrix4(Gn),this}scale(t,n,i){return Gn.makeScale(t,n,i),this.applyMatrix4(Gn),this}lookAt(t){return vl.lookAt(t),vl.updateMatrix(),this.applyMatrix4(vl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hr).negate(),this.translate(hr.x,hr.y,hr.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Gt(i,3))}else{for(let i=0,s=n.count;i<s;i++){let r=t[i];n.setXYZ(i,r.x,r.y,r.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bi);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let r=n[i];Bn.setFromBufferAttribute(r),this.morphTargetsRelative?(Je.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(Je),Je.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(Je)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fi);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let i=this.boundingSphere.center;if(Bn.setFromBufferAttribute(t),n)for(let r=0,o=n.length;r<o;r++){let a=n[r];oo.setFromBufferAttribute(a),this.morphTargetsRelative?(Je.addVectors(Bn.min,oo.min),Bn.expandByPoint(Je),Je.addVectors(Bn.max,oo.max),Bn.expandByPoint(Je)):(Bn.expandByPoint(oo.min),Bn.expandByPoint(oo.max))}Bn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Je.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Je));if(n)for(let r=0,o=n.length;r<o;r++){let a=n[r],c=this.morphTargetsRelative;for(let h=0,l=a.count;h<l;h++)Je.fromBufferAttribute(a,h),c&&(hr.fromBufferAttribute(t,h),Je.add(hr)),s=Math.max(s,i.distanceToSquared(Je))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,r=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ce(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<i.count;P++)a[P]=new N,c[P]=new N;let h=new N,l=new N,u=new N,f=new ct,d=new ct,p=new ct,v=new N,m=new N;function g(P,S,M){h.fromBufferAttribute(i,P),l.fromBufferAttribute(i,S),u.fromBufferAttribute(i,M),f.fromBufferAttribute(r,P),d.fromBufferAttribute(r,S),p.fromBufferAttribute(r,M),l.sub(h),u.sub(h),d.sub(f),p.sub(f);let I=1/(d.x*p.y-p.x*d.y);isFinite(I)&&(v.copy(l).multiplyScalar(p.y).addScaledVector(u,-d.y).multiplyScalar(I),m.copy(u).multiplyScalar(d.x).addScaledVector(l,-p.x).multiplyScalar(I),a[P].add(v),a[S].add(v),a[M].add(v),c[P].add(m),c[S].add(m),c[M].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let P=0,S=_.length;P<S;++P){let M=_[P],I=M.start,L=M.count;for(let U=I,D=I+L;U<D;U+=3)g(t.getX(U+0),t.getX(U+1),t.getX(U+2))}let y=new N,b=new N,R=new N,w=new N;function A(P){R.fromBufferAttribute(s,P),w.copy(R);let S=a[P];y.copy(S),y.sub(R.multiplyScalar(R.dot(S))).normalize(),b.crossVectors(w,S);let I=b.dot(c[P])<0?-1:1;o.setXYZW(P,y.x,y.y,y.z,I)}for(let P=0,S=_.length;P<S;++P){let M=_[P],I=M.start,L=M.count;for(let U=I,D=I+L;U<D;U+=3)A(t.getX(U+0)),A(t.getX(U+1)),A(t.getX(U+2))}}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ce(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);let s=new N,r=new N,o=new N,a=new N,c=new N,h=new N,l=new N,u=new N;if(t)for(let f=0,d=t.count;f<d;f+=3){let p=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(n,p),r.fromBufferAttribute(n,v),o.fromBufferAttribute(n,m),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),a.fromBufferAttribute(i,p),c.fromBufferAttribute(i,v),h.fromBufferAttribute(i,m),a.add(l),c.add(l),h.add(l),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(m,h.x,h.y,h.z)}else for(let f=0,d=n.count;f<d;f+=3)s.fromBufferAttribute(n,f+0),r.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),i.setXYZ(f+0,l.x,l.y,l.z),i.setXYZ(f+1,l.x,l.y,l.z),i.setXYZ(f+2,l.x,l.y,l.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Je.fromBufferAttribute(t,n),Je.normalize(),t.setXYZ(n,Je.x,Je.y,Je.z)}toNonIndexed(){function t(a,c){let h=a.array,l=a.itemSize,u=a.normalized,f=new h.constructor(c.length*l),d=0,p=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*l;for(let g=0;g<l;g++)f[p++]=h[d++]}return new ce(f,l,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let a in s){let c=s[a],h=t(c,i);n.setAttribute(a,h)}let r=this.morphAttributes;for(let a in r){let c=[],h=r[a];for(let l=0,u=h.length;l<u;l++){let f=h[l],d=t(f,i);c.push(d)}n.morphAttributes[a]=c}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let h=o[a];n.addGroup(h.start,h.count,h.materialIndex)}return n}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let h in c)c[h]!==void 0&&(t[h]=c[h]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let c in i){let h=i[c];t.data.attributes[c]=h.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let h=this.morphAttributes[c],l=[];for(let u=0,f=h.length;u<f;u++){let d=h[u];l.push(d.toJSON(t.data))}l.length>0&&(s[c]=l,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(n));let s=t.attributes;for(let h in s){let l=s[h];this.setAttribute(h,l.clone(n))}let r=t.morphAttributes;for(let h in r){let l=[],u=r[h];for(let f=0,d=u.length;f<d;f++)l.push(u[f].clone(n));this.morphAttributes[h]=l}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let h=0,l=o.length;h<l;h++){let u=o[h];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},nd=new re,_s=new Ar,oa=new Fi,id=new N,aa=new N,ca=new N,la=new N,yl=new N,ha=new N,sd=new N,ua=new N,ae=class extends nn{constructor(t=new de,n=new Fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){ha.set(0,0,0);for(let c=0,h=r.length;c<h;c++){let l=a[c],u=r[c];l!==0&&(yl.fromBufferAttribute(u,t),o?ha.addScaledVector(yl,l):ha.addScaledVector(yl.sub(n),l))}n.add(ha)}return n}raycast(t,n){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),oa.copy(i.boundingSphere),oa.applyMatrix4(r),_s.copy(t.ray).recast(t.near),!(oa.containsPoint(_s.origin)===!1&&(_s.intersectSphere(oa,id)===null||_s.origin.distanceToSquared(id)>(t.far-t.near)**2))&&(nd.copy(r).invert(),_s.copy(t.ray).applyMatrix4(nd),!(i.boundingBox!==null&&_s.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,_s)))}_computeIntersections(t,n,i){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,h=r.attributes.uv,l=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){let m=f[p],g=o[m.materialIndex],_=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let b=_,R=y;b<R;b+=3){let w=a.getX(b),A=a.getX(b+1),P=a.getX(b+2);s=fa(this,g,t,i,h,l,u,w,A,P),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let p=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){let _=a.getX(m),y=a.getX(m+1),b=a.getX(m+2);s=fa(this,o,t,i,h,l,u,_,y,b),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){let m=f[p],g=o[m.materialIndex],_=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let b=_,R=y;b<R;b+=3){let w=b,A=b+1,P=b+2;s=fa(this,g,t,i,h,l,u,w,A,P),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let p=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){let _=m,y=m+1,b=m+2;s=fa(this,o,t,i,h,l,u,_,y,b),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}}};function Nm(e,t,n,i,s,r,o,a){let c;if(t.side===un?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===es,a),c===null)return null;ua.copy(a),ua.applyMatrix4(e.matrixWorld);let h=n.ray.origin.distanceTo(ua);return h<n.near||h>n.far?null:{distance:h,point:ua.clone(),object:e}}function fa(e,t,n,i,s,r,o,a,c,h){e.getVertexPosition(a,aa),e.getVertexPosition(c,ca),e.getVertexPosition(h,la);let l=Nm(e,t,n,i,aa,ca,la,sd);if(l){let u=new N;ws.getBarycoord(sd,aa,ca,la,u),s&&(l.uv=ws.getInterpolatedAttribute(s,a,c,h,u,new ct)),r&&(l.uv1=ws.getInterpolatedAttribute(r,a,c,h,u,new ct)),o&&(l.normal=ws.getInterpolatedAttribute(o,a,c,h,u,new N),l.normal.dot(i.direction)>0&&l.normal.multiplyScalar(-1));let f={a,b:c,c:h,normal:new N,materialIndex:0};ws.getNormal(aa,ca,la,f.normal),l.face=f,l.barycoord=u}return l}var dn=class e extends de{constructor(t=1,n=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],h=[],l=[],u=[],f=0,d=0;p("z","y","x",-1,-1,i,n,t,o,r,0),p("z","y","x",1,-1,i,n,-t,o,r,1),p("x","z","y",1,1,t,i,n,s,o,2),p("x","z","y",1,-1,t,i,-n,s,o,3),p("x","y","z",1,-1,t,n,i,s,r,4),p("x","y","z",-1,-1,t,n,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Gt(h,3)),this.setAttribute("normal",new Gt(l,3)),this.setAttribute("uv",new Gt(u,2));function p(v,m,g,_,y,b,R,w,A,P,S){let M=b/A,I=R/P,L=b/2,U=R/2,D=w/2,W=A+1,H=P+1,nt=0,V=0,Z=new N;for(let J=0;J<H;J++){let j=J*I-U;for(let ft=0;ft<W;ft++){let Tt=ft*M-L;Z[v]=Tt*_,Z[m]=j*y,Z[g]=D,h.push(Z.x,Z.y,Z.z),Z[v]=0,Z[m]=0,Z[g]=w>0?1:-1,l.push(Z.x,Z.y,Z.z),u.push(ft/A),u.push(1-J/P),nt+=1}}for(let J=0;J<P;J++)for(let j=0;j<A;j++){let ft=f+j+W*J,Tt=f+j+W*(J+1),Y=f+(j+1)+W*(J+1),B=f+(j+1)+W*J;c.push(ft,Tt,B),c.push(Tt,Y,B),V+=6}a.addGroup(d,V,S),d+=V,f+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Rr(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function mn(e){let t={};for(let n=0;n<e.length;n++){let i=Rr(e[n]);for(let s in i)t[s]=i[s]}return t}function Bm(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function a0(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ue.workingColorSpace}var Fm={clone:Rr,merge:mn},Om=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,km=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,wn=class extends si{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Om,this.fragmentShader=km,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rr(t.uniforms),this.uniformsGroups=Bm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?n.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?n.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[s]={type:"m4",value:o.toArray()}:n.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},Fa=class extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=Li}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ji=new N,rd=new ct,od=new ct,gn=class extends Fa{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=xh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Qc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xh*2*Math.atan(Math.tan(Qc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ji.x,ji.y).multiplyScalar(-t/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ji.x,ji.y).multiplyScalar(-t/ji.z)}getViewSize(t,n){return this.getViewBounds(t,rd,od),n.subVectors(od,rd)}setViewOffset(t,n,i,s,r,o){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(Qc*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,h=o.fullHeight;r+=o.offsetX*s/c,n-=o.offsetY*i/h,s*=o.width/c,i*=o.height/h}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,n,n-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},ur=-90,fr=1,bh=class extends nn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new gn(ur,fr,t,n);s.layers=this.layers,this.add(s);let r=new gn(ur,fr,t,n);r.layers=this.layers,this.add(r);let o=new gn(ur,fr,t,n);o.layers=this.layers,this.add(o);let a=new gn(ur,fr,t,n);a.layers=this.layers,this.add(a);let c=new gn(ur,fr,t,n);c.layers=this.layers,this.add(c);let h=new gn(ur,fr,t,n);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,r,o,a,c]=n;for(let h of n)this.remove(h);if(t===Li)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===za)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let h of n)this.add(h),h.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,h,l]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(n,r),t.setRenderTarget(i,1,s),t.render(n,o),t.setRenderTarget(i,2,s),t.render(n,a),t.setRenderTarget(i,3,s),t.render(n,c),t.setRenderTarget(i,4,s),t.render(n,h),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(n,l),t.setRenderTarget(u,f,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},Oa=class extends En{constructor(t,n,i,s,r,o,a,c,h,l){t=t!==void 0?t:[],n=n!==void 0?n:Sr,super(t,n,i,s,r,o,a,c,h,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Mh=class extends Ni{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Oa(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:en}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new dn(5,5,5),r=new wn({name:"CubemapFromEquirect",uniforms:Rr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:Qi});r.uniforms.tEquirect.value=n;let o=new ae(s,r),a=n.minFilter;return n.minFilter===Cs&&(n.minFilter=en),new bh(1,10,this).update(t,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,n,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(n,i,s);t.setRenderTarget(r)}},_l=new N,Hm=new N,Vm=new ne,ni=class{constructor(t=new N(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=_l.subVectors(i,n).cross(Hm.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){let i=t.delta(_l),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:n.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||Vm.getNormalMatrix(t),s=this.coplanarPoint(_l).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},bs=new Fi,da=new N,Is=class{constructor(t=new ni,n=new ni,i=new ni,s=new ni,r=new ni,o=new ni){this.planes=[t,n,i,s,r,o]}set(t,n,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(n),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Li){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],h=s[4],l=s[5],u=s[6],f=s[7],d=s[8],p=s[9],v=s[10],m=s[11],g=s[12],_=s[13],y=s[14],b=s[15];if(i[0].setComponents(c-r,f-h,m-d,b-g).normalize(),i[1].setComponents(c+r,f+h,m+d,b+g).normalize(),i[2].setComponents(c+o,f+l,m+p,b+_).normalize(),i[3].setComponents(c-o,f-l,m-p,b-_).normalize(),i[4].setComponents(c-a,f-u,m-v,b-y).normalize(),n===Li)i[5].setComponents(c+a,f+u,m+v,b+y).normalize();else if(n===za)i[5].setComponents(a,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),bs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),bs.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(bs)}intersectsSprite(t){return bs.center.set(0,0,0),bs.radius=.7071067811865476,bs.applyMatrix4(t.matrixWorld),this.intersectsSphere(bs)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(n[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(da.x=s.normal.x>0?t.max.x:t.min.x,da.y=s.normal.y>0?t.max.y:t.min.y,da.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(da)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function c0(){let e=null,t=!1,n=null,i=null;function s(r,o){n(r,o),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){n=r},setContext:function(r){e=r}}}function Gm(e){let t=new WeakMap;function n(a,c){let h=a.array,l=a.usage,u=h.byteLength,f=e.createBuffer();e.bindBuffer(c,f),e.bufferData(c,h,l),a.onUploadCallback();let d;if(h instanceof Float32Array)d=e.FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?d=e.HALF_FLOAT:d=e.UNSIGNED_SHORT;else if(h instanceof Int16Array)d=e.SHORT;else if(h instanceof Uint32Array)d=e.UNSIGNED_INT;else if(h instanceof Int32Array)d=e.INT;else if(h instanceof Int8Array)d=e.BYTE;else if(h instanceof Uint8Array)d=e.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)d=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:f,type:d,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,h){let l=c.array,u=c.updateRanges;if(e.bindBuffer(h,a),u.length===0)e.bufferSubData(h,0,l);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){let p=u[f],v=u[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){let v=u[d];e.bufferSubData(h,v.start*l.BYTES_PER_ELEMENT,l,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(e.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let l=t.get(a);(!l||l.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let h=t.get(a);if(h===void 0)t.set(a,n(a,c));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,a,c),h.version=a.version}}return{get:s,remove:r,update:o}}var is=class e extends de{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let r=t/2,o=n/2,a=Math.floor(i),c=Math.floor(s),h=a+1,l=c+1,u=t/a,f=n/c,d=[],p=[],v=[],m=[];for(let g=0;g<l;g++){let _=g*f-o;for(let y=0;y<h;y++){let b=y*u-r;p.push(b,-_,0),v.push(0,0,1),m.push(y/a),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<a;_++){let y=_+h*g,b=_+h*(g+1),R=_+1+h*(g+1),w=_+1+h*g;d.push(y,b,w),d.push(b,R,w)}this.setIndex(d),this.setAttribute("position",new Gt(p,3)),this.setAttribute("normal",new Gt(v,3)),this.setAttribute("uv",new Gt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Wm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ym=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$m=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Km=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Qm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,eg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ng=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ig=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,og=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ag=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ug=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,dg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_g="gl_FragColor = linearToOutputTexel( gl_FragColor );",bg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Mg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Sg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Eg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Tg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ag=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ig=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Lg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ug=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ng=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Bg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Og=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Vg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Gg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Xg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$g=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Qg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ex=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ix=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ox=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ax=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ux=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,dx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,px=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,yx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_x=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ex=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,wx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ax=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Rx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Cx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Px=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ix=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Lx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ux=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Fx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Gx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$x=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Jx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Qx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,t1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,n1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,i1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,s1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,o1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,c1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,h1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,u1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,f1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,p1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,g1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,v1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,y1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,b1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,M1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,se={alphahash_fragment:Wm,alphahash_pars_fragment:Xm,alphamap_fragment:qm,alphamap_pars_fragment:Ym,alphatest_fragment:$m,alphatest_pars_fragment:Zm,aomap_fragment:Jm,aomap_pars_fragment:jm,batching_pars_vertex:Km,batching_vertex:Qm,begin_vertex:tg,beginnormal_vertex:eg,bsdfs:ng,iridescence_fragment:ig,bumpmap_pars_fragment:sg,clipping_planes_fragment:rg,clipping_planes_pars_fragment:og,clipping_planes_pars_vertex:ag,clipping_planes_vertex:cg,color_fragment:lg,color_pars_fragment:hg,color_pars_vertex:ug,color_vertex:fg,common:dg,cube_uv_reflection_fragment:pg,defaultnormal_vertex:mg,displacementmap_pars_vertex:gg,displacementmap_vertex:xg,emissivemap_fragment:vg,emissivemap_pars_fragment:yg,colorspace_fragment:_g,colorspace_pars_fragment:bg,envmap_fragment:Mg,envmap_common_pars_fragment:Sg,envmap_pars_fragment:Eg,envmap_pars_vertex:Tg,envmap_physical_pars_fragment:Ng,envmap_vertex:wg,fog_vertex:Ag,fog_pars_vertex:Rg,fog_fragment:Cg,fog_pars_fragment:Pg,gradientmap_pars_fragment:Ig,lightmap_pars_fragment:zg,lights_lambert_fragment:Lg,lights_lambert_pars_fragment:Ug,lights_pars_begin:Dg,lights_toon_fragment:Bg,lights_toon_pars_fragment:Fg,lights_phong_fragment:Og,lights_phong_pars_fragment:kg,lights_physical_fragment:Hg,lights_physical_pars_fragment:Vg,lights_fragment_begin:Gg,lights_fragment_maps:Wg,lights_fragment_end:Xg,logdepthbuf_fragment:qg,logdepthbuf_pars_fragment:Yg,logdepthbuf_pars_vertex:$g,logdepthbuf_vertex:Zg,map_fragment:Jg,map_pars_fragment:jg,map_particle_fragment:Kg,map_particle_pars_fragment:Qg,metalnessmap_fragment:tx,metalnessmap_pars_fragment:ex,morphinstance_vertex:nx,morphcolor_vertex:ix,morphnormal_vertex:sx,morphtarget_pars_vertex:rx,morphtarget_vertex:ox,normal_fragment_begin:ax,normal_fragment_maps:cx,normal_pars_fragment:lx,normal_pars_vertex:hx,normal_vertex:ux,normalmap_pars_fragment:fx,clearcoat_normal_fragment_begin:dx,clearcoat_normal_fragment_maps:px,clearcoat_pars_fragment:mx,iridescence_pars_fragment:gx,opaque_fragment:xx,packing:vx,premultiplied_alpha_fragment:yx,project_vertex:_x,dithering_fragment:bx,dithering_pars_fragment:Mx,roughnessmap_fragment:Sx,roughnessmap_pars_fragment:Ex,shadowmap_pars_fragment:Tx,shadowmap_pars_vertex:wx,shadowmap_vertex:Ax,shadowmask_pars_fragment:Rx,skinbase_vertex:Cx,skinning_pars_vertex:Px,skinning_vertex:Ix,skinnormal_vertex:zx,specularmap_fragment:Lx,specularmap_pars_fragment:Ux,tonemapping_fragment:Dx,tonemapping_pars_fragment:Nx,transmission_fragment:Bx,transmission_pars_fragment:Fx,uv_pars_fragment:Ox,uv_pars_vertex:kx,uv_vertex:Hx,worldpos_vertex:Vx,background_vert:Gx,background_frag:Wx,backgroundCube_vert:Xx,backgroundCube_frag:qx,cube_vert:Yx,cube_frag:$x,depth_vert:Zx,depth_frag:Jx,distanceRGBA_vert:jx,distanceRGBA_frag:Kx,equirect_vert:Qx,equirect_frag:t1,linedashed_vert:e1,linedashed_frag:n1,meshbasic_vert:i1,meshbasic_frag:s1,meshlambert_vert:r1,meshlambert_frag:o1,meshmatcap_vert:a1,meshmatcap_frag:c1,meshnormal_vert:l1,meshnormal_frag:h1,meshphong_vert:u1,meshphong_frag:f1,meshphysical_vert:d1,meshphysical_frag:p1,meshtoon_vert:m1,meshtoon_frag:g1,points_vert:x1,points_frag:v1,shadow_vert:y1,shadow_frag:_1,sprite_vert:b1,sprite_frag:M1},mt={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ne}},envmap:{envMap:{value:null},envMapRotation:{value:new ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ne},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0},uvTransform:{value:new ne}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}}},pi={basic:{uniforms:mn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:mn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:mn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:mn([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:mn([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:mn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:mn([mt.points,mt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:mn([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:mn([mt.common,mt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:mn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:mn([mt.sprite,mt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ne}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distanceRGBA:{uniforms:mn([mt.common,mt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distanceRGBA_vert,fragmentShader:se.distanceRGBA_frag},shadow:{uniforms:mn([mt.lights,mt.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};pi.physical={uniforms:mn([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ne},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ne},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ne},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ne},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ne},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ne}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};var pa={r:0,b:0,g:0},Ms=new Fe,S1=new re;function E1(e,t,n,i,s,r,o){let a=new Vt(0),c=r===!0?0:1,h,l,u=null,f=0,d=null;function p(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?n:t).get(y)),y}function v(_){let y=!1,b=p(_);b===null?g(a,c):b&&b.isColor&&(g(b,1),y=!0);let R=e.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(e.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function m(_,y){let b=p(y);b&&(b.isCubeTexture||b.mapping===oc)?(l===void 0&&(l=new ae(new dn(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:Rr(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(l)),Ms.copy(y.backgroundRotation),Ms.x*=-1,Ms.y*=-1,Ms.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ms.y*=-1,Ms.z*=-1),l.material.uniforms.envMap.value=b,l.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(S1.makeRotationFromEuler(Ms)),l.material.toneMapped=ue.getTransfer(b.colorSpace)!==_e,(u!==b||f!==b.version||d!==e.toneMapping)&&(l.material.needsUpdate=!0,u=b,f=b.version,d=e.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(h===void 0&&(h=new ae(new is(2,2),new wn({name:"BackgroundMaterial",uniforms:Rr(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:es,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=b,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.toneMapped=ue.getTransfer(b.colorSpace)!==_e,b.matrixAutoUpdate===!0&&b.updateMatrix(),h.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||d!==e.toneMapping)&&(h.material.needsUpdate=!0,u=b,f=b.version,d=e.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null))}function g(_,y){_.getRGB(pa,a0(e)),i.buffers.color.setClear(pa.r,pa.g,pa.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),c=y,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,g(a,c)},render:v,addToRenderList:m}}function T1(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,o=!1;function a(M,I,L,U,D){let W=!1,H=u(U,L,I);r!==H&&(r=H,h(r.object)),W=d(M,U,L,D),W&&p(M,U,L,D),D!==null&&t.update(D,e.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,b(M,I,L,U),D!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function c(){return e.createVertexArray()}function h(M){return e.bindVertexArray(M)}function l(M){return e.deleteVertexArray(M)}function u(M,I,L){let U=L.wireframe===!0,D=i[M.id];D===void 0&&(D={},i[M.id]=D);let W=D[I.id];W===void 0&&(W={},D[I.id]=W);let H=W[U];return H===void 0&&(H=f(c()),W[U]=H),H}function f(M){let I=[],L=[],U=[];for(let D=0;D<n;D++)I[D]=0,L[D]=0,U[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:L,attributeDivisors:U,object:M,attributes:{},index:null}}function d(M,I,L,U){let D=r.attributes,W=I.attributes,H=0,nt=L.getAttributes();for(let V in nt)if(nt[V].location>=0){let J=D[V],j=W[V];if(j===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(j=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(j=M.instanceColor)),J===void 0||J.attribute!==j||j&&J.data!==j.data)return!0;H++}return r.attributesNum!==H||r.index!==U}function p(M,I,L,U){let D={},W=I.attributes,H=0,nt=L.getAttributes();for(let V in nt)if(nt[V].location>=0){let J=W[V];J===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(J=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(J=M.instanceColor));let j={};j.attribute=J,J&&J.data&&(j.data=J.data),D[V]=j,H++}r.attributes=D,r.attributesNum=H,r.index=U}function v(){let M=r.newAttributes;for(let I=0,L=M.length;I<L;I++)M[I]=0}function m(M){g(M,0)}function g(M,I){let L=r.newAttributes,U=r.enabledAttributes,D=r.attributeDivisors;L[M]=1,U[M]===0&&(e.enableVertexAttribArray(M),U[M]=1),D[M]!==I&&(e.vertexAttribDivisor(M,I),D[M]=I)}function _(){let M=r.newAttributes,I=r.enabledAttributes;for(let L=0,U=I.length;L<U;L++)I[L]!==M[L]&&(e.disableVertexAttribArray(L),I[L]=0)}function y(M,I,L,U,D,W,H){H===!0?e.vertexAttribIPointer(M,I,L,D,W):e.vertexAttribPointer(M,I,L,U,D,W)}function b(M,I,L,U){v();let D=U.attributes,W=L.getAttributes(),H=I.defaultAttributeValues;for(let nt in W){let V=W[nt];if(V.location>=0){let Z=D[nt];if(Z===void 0&&(nt==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),nt==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor)),Z!==void 0){let J=Z.normalized,j=Z.itemSize,ft=t.get(Z);if(ft===void 0)continue;let Tt=ft.buffer,Y=ft.type,B=ft.bytesPerElement,st=Y===e.INT||Y===e.UNSIGNED_INT||Z.gpuType===lu;if(Z.isInterleavedBufferAttribute){let tt=Z.data,gt=tt.stride,St=Z.offset;if(tt.isInstancedInterleavedBuffer){for(let xt=0;xt<V.locationSize;xt++)g(V.location+xt,tt.meshPerAttribute);M.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let xt=0;xt<V.locationSize;xt++)m(V.location+xt);e.bindBuffer(e.ARRAY_BUFFER,Tt);for(let xt=0;xt<V.locationSize;xt++)y(V.location+xt,j/V.locationSize,Y,J,gt*B,(St+j/V.locationSize*xt)*B,st)}else{if(Z.isInstancedBufferAttribute){for(let tt=0;tt<V.locationSize;tt++)g(V.location+tt,Z.meshPerAttribute);M.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let tt=0;tt<V.locationSize;tt++)m(V.location+tt);e.bindBuffer(e.ARRAY_BUFFER,Tt);for(let tt=0;tt<V.locationSize;tt++)y(V.location+tt,j/V.locationSize,Y,J,j*B,j/V.locationSize*tt*B,st)}}else if(H!==void 0){let J=H[nt];if(J!==void 0)switch(J.length){case 2:e.vertexAttrib2fv(V.location,J);break;case 3:e.vertexAttrib3fv(V.location,J);break;case 4:e.vertexAttrib4fv(V.location,J);break;default:e.vertexAttrib1fv(V.location,J)}}}}_()}function R(){P();for(let M in i){let I=i[M];for(let L in I){let U=I[L];for(let D in U)l(U[D].object),delete U[D];delete I[L]}delete i[M]}}function w(M){if(i[M.id]===void 0)return;let I=i[M.id];for(let L in I){let U=I[L];for(let D in U)l(U[D].object),delete U[D];delete I[L]}delete i[M.id]}function A(M){for(let I in i){let L=i[I];if(L[M.id]===void 0)continue;let U=L[M.id];for(let D in U)l(U[D].object),delete U[D];delete L[M.id]}}function P(){S(),o=!0,r!==s&&(r=s,h(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function w1(e,t,n){let i;function s(h){i=h}function r(h,l){e.drawArrays(i,h,l),n.update(l,i,1)}function o(h,l,u){u!==0&&(e.drawArraysInstanced(i,h,l,u),n.update(l,i,u))}function a(h,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,l,0,u);let d=0;for(let p=0;p<u;p++)d+=l[p];n.update(d,i,1)}function c(h,l,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<h.length;p++)o(h[p],l[p],f[p]);else{d.multiDrawArraysInstancedWEBGL(i,h,0,l,0,f,0,u);let p=0;for(let v=0;v<u;v++)p+=l[v]*f[v];n.update(p,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function A1(e,t,n,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==xn&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let P=A===wo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Sn&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==mi&&!P)}function c(A){if(A==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=n.precision!==void 0?n.precision:"highp",l=c(h);l!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",l,"instead."),h=l);let u=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),p=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),g=e.getParameter(e.MAX_VERTEX_ATTRIBS),_=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),R=p>0,w=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:R,maxSamples:w}}function R1(e){let t=this,n=null,i=0,s=!1,r=!1,o=new ni,a=new ne,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,l(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){n=l(u,f,0)},this.setState=function(u,f,d){let p=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,g=e.get(u);if(!s||p===null||p.length===0||r&&!m)r?l(null):h();else{let _=r?0:i,y=_*4,b=g.clippingState||null;c.value=b,b=l(p,f,y,d);for(let R=0;R!==y;++R)b[R]=n[R];g.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function h(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function l(u,f,d,p){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=c.value,p!==!0||m===null){let g=d+v*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<g)&&(m=new Float32Array(g));for(let y=0,b=d;y!==v;++y,b+=4)o.copy(u[y]).applyMatrix4(_,a),o.normal.toArray(m,b),m[b+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function C1(e){let t=new WeakMap;function n(o,a){return a===Hl?o.mapping=Sr:a===Vl&&(o.mapping=Er),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Hl||a===Vl)if(t.has(o)){let c=t.get(o).texture;return n(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let h=new Mh(c.height);return h.fromEquirectangularTexture(e,o),t.set(o,h),o.addEventListener("dispose",s),n(h.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var ka=class extends Fa{constructor(t=-1,n=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+n,c=s-n;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,o=r+h*this.view.width,a-=l*this.view.offsetY,c=a-l*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}},mr=4,ad=[.125,.215,.35,.446,.526,.582],As=20,bl=new ka,cd=new Vt,Ml=null,Sl=0,El=0,Tl=!1,Es=(1+Math.sqrt(5))/2,dr=1/Es,ld=[new N(-Es,dr,0),new N(Es,dr,0),new N(-dr,0,Es),new N(dr,0,Es),new N(0,Es,-dr),new N(0,Es,dr),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],Cr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,s=100){Ml=this._renderer.getRenderTarget(),Sl=this._renderer.getActiveCubeFace(),El=this._renderer.getActiveMipmapLevel(),Tl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),n>0&&this._blur(r,0,0,n),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ud(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ml,Sl,El),this._renderer.xr.enabled=Tl,t.scissorTest=!1,ma(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Sr||t.mapping===Er?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ml=this._renderer.getRenderTarget(),Sl=this._renderer.getActiveCubeFace(),El=this._renderer.getActiveMipmapLevel(),Tl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:en,minFilter:en,generateMipmaps:!1,type:wo,format:xn,colorSpace:Dr,depthBuffer:!1},s=hd(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hd(t,n,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=P1(r)),this._blurMaterial=I1(r,t,n)}return s}_compileMaterial(t){let n=new ae(this._lodPlanes[0],t);this._renderer.compile(n,bl)}_sceneToCubeUV(t,n,i,s){let a=new gn(90,1,n,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],l=this._renderer,u=l.autoClear,f=l.toneMapping;l.getClearColor(cd),l.toneMapping=ts,l.autoClear=!1;let d=new Fn({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1}),p=new ae(new dn,d),v=!1,m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,v=!0):(d.color.copy(cd),v=!0);for(let g=0;g<6;g++){let _=g%3;_===0?(a.up.set(0,c[g],0),a.lookAt(h[g],0,0)):_===1?(a.up.set(0,0,c[g]),a.lookAt(0,h[g],0)):(a.up.set(0,c[g],0),a.lookAt(0,0,h[g]));let y=this._cubeSize;ma(s,_*y,g>2?y:0,y,y),l.setRenderTarget(s),v&&l.render(p,a),l.render(t,a)}p.geometry.dispose(),p.material.dispose(),l.toneMapping=f,l.autoClear=u,t.background=m}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===Sr||t.mapping===Er;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=fd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ud());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new ae(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;ma(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(o,bl)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ld[(s-r-1)%ld.length];this._blur(t,r-1,r,o,a)}n.autoClear=i}_blur(t,n,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,n,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,n,i,s,r,o,a){let c=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let l=3,u=new ae(this._lodPlanes[s],h),f=h.uniforms,d=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*As-1),v=r/p,m=isFinite(r)?1+Math.floor(l*v):As;m>As&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${As}`);let g=[],_=0;for(let A=0;A<As;++A){let P=A/v,S=Math.exp(-P*P/2);g.push(S),A===0?_+=S:A<m&&(_+=2*S)}for(let A=0;A<g.length;A++)g[A]=g[A]/_;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=g,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:y}=this;f.dTheta.value=p,f.mipInt.value=y-i;let b=this._sizeLods[s],R=3*b*(s>y-mr?s-y+mr:0),w=4*(this._cubeSize-b);ma(n,R,w,3*b,2*b),c.setRenderTarget(n),c.render(u,bl)}};function P1(e){let t=[],n=[],i=[],s=e,r=e-mr+1+ad.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);n.push(a);let c=1/a;o>e-mr?c=ad[o-e+mr-1]:o===0&&(c=0),i.push(c);let h=1/(a-2),l=-h,u=1+h,f=[l,l,u,l,u,u,l,l,u,u,l,u],d=6,p=6,v=3,m=2,g=1,_=new Float32Array(v*p*d),y=new Float32Array(m*p*d),b=new Float32Array(g*p*d);for(let w=0;w<d;w++){let A=w%3*2/3-1,P=w>2?0:-1,S=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];_.set(S,v*p*w),y.set(f,m*p*w);let M=[w,w,w,w,w,w];b.set(M,g*p*w)}let R=new de;R.setAttribute("position",new ce(_,v)),R.setAttribute("uv",new ce(y,m)),R.setAttribute("faceIndex",new ce(b,g)),t.push(R),s>mr&&s--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function hd(e,t,n){let i=new Ni(e,t,n);return i.texture.mapping=oc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ma(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function I1(e,t,n){let i=new Float32Array(As),s=new N(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:As,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function ud(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function fd(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function mu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function z1(e){let t=new WeakMap,n=null;function i(a){if(a&&a.isTexture){let c=a.mapping,h=c===Hl||c===Vl,l=c===Sr||c===Er;if(h||l){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return n===null&&(n=new Cr(e)),u=h?n.fromEquirectangular(a,u):n.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return h&&d&&d.height>0||l&&d&&s(d)?(n===null&&(n=new Cr(e)),u=h?n.fromEquirectangular(a):n.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,h=6;for(let l=0;l<h;l++)a[l]!==void 0&&c++;return c===h}function r(a){let c=a.target;c.removeEventListener("dispose",r);let h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function L1(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=e.getExtension(i)}return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&ho("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function U1(e,t,n,i){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let p in f.attributes)t.remove(f.attributes[p]);for(let p in f.morphAttributes){let v=f.morphAttributes[p];for(let m=0,g=v.length;m<g;m++)t.remove(v[m])}f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,n.memory.geometries++),f}function c(u){let f=u.attributes;for(let p in f)t.update(f[p],e.ARRAY_BUFFER);let d=u.morphAttributes;for(let p in d){let v=d[p];for(let m=0,g=v.length;m<g;m++)t.update(v[m],e.ARRAY_BUFFER)}}function h(u){let f=[],d=u.index,p=u.attributes.position,v=0;if(d!==null){let _=d.array;v=d.version;for(let y=0,b=_.length;y<b;y+=3){let R=_[y+0],w=_[y+1],A=_[y+2];f.push(R,w,w,A,A,R)}}else if(p!==void 0){let _=p.array;v=p.version;for(let y=0,b=_.length/3-1;y<b;y+=3){let R=y+0,w=y+1,A=y+2;f.push(R,w,w,A,A,R)}}else return;let m=new(r0(f)?Ba:Na)(f,1);m.version=v;let g=r.get(u);g&&t.remove(g),r.set(u,m)}function l(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&h(u)}else h(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:l}}function D1(e,t,n){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){e.drawElements(i,d,r,f*o),n.update(d,i,1)}function h(f,d,p){p!==0&&(e.drawElementsInstanced(i,d,r,f*o,p),n.update(d,i,p))}function l(f,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,p);let m=0;for(let g=0;g<p;g++)m+=d[g];n.update(m,i,1)}function u(f,d,p,v){if(p===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f.length;g++)h(f[g]/o,d[g],v[g]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,v,0,p);let g=0;for(let _=0;_<p;_++)g+=d[_]*v[_];n.update(g,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=h,this.renderMultiDraw=l,this.renderMultiDrawInstances=u}function N1(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(n.calls++,o){case e.TRIANGLES:n.triangles+=a*(r/3);break;case e.LINES:n.lines+=a*(r/2);break;case e.LINE_STRIP:n.lines+=a*(r-1);break;case e.LINE_LOOP:n.lines+=a*r;break;case e.POINTS:n.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function B1(e,t,n){let i=new WeakMap,s=new Be;function r(o,a,c){let h=o.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=l!==void 0?l.length:0,f=i.get(a);if(f===void 0||f.count!==u){let S=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],y=0;d===!0&&(y=1),p===!0&&(y=2),v===!0&&(y=3);let b=a.attributes.position.count*y,R=1;b>t.maxTextureSize&&(R=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let w=new Float32Array(b*R*4*u),A=new Da(w,b,R,u);A.type=mi,A.needsUpdate=!0;let P=y*4;for(let M=0;M<u;M++){let I=m[M],L=g[M],U=_[M],D=b*R*4*M;for(let W=0;W<I.count;W++){let H=W*P;d===!0&&(s.fromBufferAttribute(I,W),w[D+H+0]=s.x,w[D+H+1]=s.y,w[D+H+2]=s.z,w[D+H+3]=0),p===!0&&(s.fromBufferAttribute(L,W),w[D+H+4]=s.x,w[D+H+5]=s.y,w[D+H+6]=s.z,w[D+H+7]=0),v===!0&&(s.fromBufferAttribute(U,W),w[D+H+8]=s.x,w[D+H+9]=s.y,w[D+H+10]=s.z,w[D+H+11]=U.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new ct(b,R)},i.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",o.morphTexture,n);else{let d=0;for(let v=0;v<h.length;v++)d+=h[v];let p=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(e,"morphTargetBaseInfluence",p),c.getUniforms().setValue(e,"morphTargetInfluences",h)}c.getUniforms().setValue(e,"morphTargetsTexture",f.texture,n),c.getUniforms().setValue(e,"morphTargetsTextureSize",f.size)}return{update:r}}function F1(e,t,n,i){let s=new WeakMap;function r(c){let h=i.render.frame,l=c.geometry,u=t.get(c,l);if(s.get(u)!==h&&(t.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==h&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function a(c){let h=c.target;h.removeEventListener("dispose",a),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:r,dispose:o}}var Ha=class extends En{constructor(t,n,i,s,r,o,a,c,h,l=vr){if(l!==vr&&l!==wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&l===vr&&(i=Ps),i===void 0&&l===wr&&(i=Tr),super(null,s,r,o,a,c,l,i,h),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=a!==void 0?a:fn,this.minFilter=c!==void 0?c:fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},l0=new En,dd=new Ha(1,1),h0=new Da,u0=new _h,f0=new Oa,pd=[],md=[],gd=new Float32Array(16),xd=new Float32Array(9),vd=new Float32Array(4);function Br(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,r=pd[s];if(r===void 0&&(r=new Float32Array(s),pd[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=n,e[o].toArray(r,a)}return r}function qe(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ye(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function lc(e,t){let n=md[t];n===void 0&&(n=new Int32Array(t),md[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function O1(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function k1(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(qe(n,t))return;e.uniform2fv(this.addr,t),Ye(n,t)}}function H1(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(qe(n,t))return;e.uniform3fv(this.addr,t),Ye(n,t)}}function V1(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(qe(n,t))return;e.uniform4fv(this.addr,t),Ye(n,t)}}function G1(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(qe(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ye(n,t)}else{if(qe(n,i))return;vd.set(i),e.uniformMatrix2fv(this.addr,!1,vd),Ye(n,i)}}function W1(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(qe(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ye(n,t)}else{if(qe(n,i))return;xd.set(i),e.uniformMatrix3fv(this.addr,!1,xd),Ye(n,i)}}function X1(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(qe(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ye(n,t)}else{if(qe(n,i))return;gd.set(i),e.uniformMatrix4fv(this.addr,!1,gd),Ye(n,i)}}function q1(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Y1(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(qe(n,t))return;e.uniform2iv(this.addr,t),Ye(n,t)}}function $1(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(qe(n,t))return;e.uniform3iv(this.addr,t),Ye(n,t)}}function Z1(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(qe(n,t))return;e.uniform4iv(this.addr,t),Ye(n,t)}}function J1(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function j1(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(qe(n,t))return;e.uniform2uiv(this.addr,t),Ye(n,t)}}function K1(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(qe(n,t))return;e.uniform3uiv(this.addr,t),Ye(n,t)}}function Q1(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(qe(n,t))return;e.uniform4uiv(this.addr,t),Ye(n,t)}}function tv(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let r;this.type===e.SAMPLER_2D_SHADOW?(dd.compareFunction=s0,r=dd):r=l0,n.setTexture2D(t||r,s)}function ev(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||u0,s)}function nv(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||f0,s)}function iv(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||h0,s)}function sv(e){switch(e){case 5126:return O1;case 35664:return k1;case 35665:return H1;case 35666:return V1;case 35674:return G1;case 35675:return W1;case 35676:return X1;case 5124:case 35670:return q1;case 35667:case 35671:return Y1;case 35668:case 35672:return $1;case 35669:case 35673:return Z1;case 5125:return J1;case 36294:return j1;case 36295:return K1;case 36296:return Q1;case 35678:case 36198:case 36298:case 36306:case 35682:return tv;case 35679:case 36299:case 36307:return ev;case 35680:case 36300:case 36308:case 36293:return nv;case 36289:case 36303:case 36311:case 36292:return iv}}function rv(e,t){e.uniform1fv(this.addr,t)}function ov(e,t){let n=Br(t,this.size,2);e.uniform2fv(this.addr,n)}function av(e,t){let n=Br(t,this.size,3);e.uniform3fv(this.addr,n)}function cv(e,t){let n=Br(t,this.size,4);e.uniform4fv(this.addr,n)}function lv(e,t){let n=Br(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function hv(e,t){let n=Br(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function uv(e,t){let n=Br(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function fv(e,t){e.uniform1iv(this.addr,t)}function dv(e,t){e.uniform2iv(this.addr,t)}function pv(e,t){e.uniform3iv(this.addr,t)}function mv(e,t){e.uniform4iv(this.addr,t)}function gv(e,t){e.uniform1uiv(this.addr,t)}function xv(e,t){e.uniform2uiv(this.addr,t)}function vv(e,t){e.uniform3uiv(this.addr,t)}function yv(e,t){e.uniform4uiv(this.addr,t)}function _v(e,t,n){let i=this.cache,s=t.length,r=lc(n,s);qe(i,r)||(e.uniform1iv(this.addr,r),Ye(i,r));for(let o=0;o!==s;++o)n.setTexture2D(t[o]||l0,r[o])}function bv(e,t,n){let i=this.cache,s=t.length,r=lc(n,s);qe(i,r)||(e.uniform1iv(this.addr,r),Ye(i,r));for(let o=0;o!==s;++o)n.setTexture3D(t[o]||u0,r[o])}function Mv(e,t,n){let i=this.cache,s=t.length,r=lc(n,s);qe(i,r)||(e.uniform1iv(this.addr,r),Ye(i,r));for(let o=0;o!==s;++o)n.setTextureCube(t[o]||f0,r[o])}function Sv(e,t,n){let i=this.cache,s=t.length,r=lc(n,s);qe(i,r)||(e.uniform1iv(this.addr,r),Ye(i,r));for(let o=0;o!==s;++o)n.setTexture2DArray(t[o]||h0,r[o])}function Ev(e){switch(e){case 5126:return rv;case 35664:return ov;case 35665:return av;case 35666:return cv;case 35674:return lv;case 35675:return hv;case 35676:return uv;case 5124:case 35670:return fv;case 35667:case 35671:return dv;case 35668:case 35672:return pv;case 35669:case 35673:return mv;case 5125:return gv;case 36294:return xv;case 36295:return vv;case 36296:return yv;case 35678:case 36198:case 36298:case 36306:case 35682:return _v;case 35679:case 36299:case 36307:return bv;case 35680:case 36300:case 36308:case 36293:return Mv;case 36289:case 36303:case 36311:case 36292:return Sv}}var Sh=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=sv(n.type)}},Eh=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Ev(n.type)}},Th=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,n[a.id],i)}}},wl=/(\w+)(\])?(\[|\.)?/g;function yd(e,t){e.seq.push(t),e.map[t.id]=t}function Tv(e,t,n){let i=e.name,s=i.length;for(wl.lastIndex=0;;){let r=wl.exec(i),o=wl.lastIndex,a=r[1],c=r[2]==="]",h=r[3];if(c&&(a=a|0),h===void 0||h==="["&&o+2===s){yd(n,h===void 0?new Sh(a,e,t):new Eh(a,e,t));break}else{let u=n.map[a];u===void 0&&(u=new Th(a),yd(n,u)),n=u}}}var _r=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(n,s),o=t.getUniformLocation(n,r.name);Tv(r,o,this)}}setValue(t,n,i,s){let r=this.map[n];r!==void 0&&r.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let r=0,o=n.length;r!==o;++r){let a=n[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in n&&i.push(o)}return i}};function _d(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var wv=37297,Av=0;function Rv(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,n.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}var bd=new ne;function Cv(e){ue._getMatrix(bd,ue.workingColorSpace,e);let t=`mat3( ${bd.elements.map(n=>n.toFixed(4))} )`;switch(ue.getTransfer(e)){case cc:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Md(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),s=e.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+Rv(e.getShaderSource(t),o)}else return s}function Pv(e,t){let n=Cv(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function Iv(e,t){let n;switch(t){case im:n="Linear";break;case sm:n="Reinhard";break;case rm:n="Cineon";break;case cu:n="ACESFilmic";break;case am:n="AgX";break;case cm:n="Neutral";break;case om:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var ga=new N;function zv(){ue.getLuminanceCoefficients(ga);let e=ga.x.toFixed(4),t=ga.y.toFixed(4),n=ga.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lv(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(uo).join(`
`)}function Uv(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function Dv(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=e.getActiveAttrib(t,s),o=r.name,a=1;r.type===e.FLOAT_MAT2&&(a=2),r.type===e.FLOAT_MAT3&&(a=3),r.type===e.FLOAT_MAT4&&(a=4),n[o]={type:r.type,location:e.getAttribLocation(t,o),locationSize:a}}return n}function uo(e){return e!==""}function Sd(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ed(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Nv=/^[ \t]*#include +<([\w\d./]+)>/gm;function wh(e){return e.replace(Nv,Fv)}var Bv=new Map;function Fv(e,t){let n=se[t];if(n===void 0){let i=Bv.get(t);if(i!==void 0)n=se[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return wh(n)}var Ov=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Td(e){return e.replace(Ov,kv)}function kv(e,t,n,i){let s="";for(let r=parseInt(t);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wd(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Hv(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Yd?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===au?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===zi&&(t="SHADOWMAP_TYPE_VSM"),t}function Vv(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case Sr:case Er:t="ENVMAP_TYPE_CUBE";break;case oc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Gv(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case Er:t="ENVMAP_MODE_REFRACTION";break}return t}function Wv(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case rc:t="ENVMAP_BLENDING_MULTIPLY";break;case em:t="ENVMAP_BLENDING_MIX";break;case nm:t="ENVMAP_BLENDING_ADD";break}return t}function Xv(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function qv(e,t,n,i){let s=e.getContext(),r=n.defines,o=n.vertexShader,a=n.fragmentShader,c=Hv(n),h=Vv(n),l=Gv(n),u=Wv(n),f=Xv(n),d=Lv(n),p=Uv(r),v=s.createProgram(),m,g,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,p].filter(uo).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,p].filter(uo).join(`
`),g.length>0&&(g+=`
`)):(m=[wd(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,p,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(uo).join(`
`),g=[wd(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,p,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.envMap?"#define "+l:"",n.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ts?"#define TONE_MAPPING":"",n.toneMapping!==ts?se.tonemapping_pars_fragment:"",n.toneMapping!==ts?Iv("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,Pv("linearToOutputTexel",n.outputColorSpace),zv(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(uo).join(`
`)),o=wh(o),o=Sd(o,n),o=Ed(o,n),a=wh(a),a=Sd(a,n),a=Ed(a,n),o=Td(o),a=Td(a),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",n.glslVersion===kf?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===kf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=_+m+o,b=_+g+a,R=_d(s,s.VERTEX_SHADER,y),w=_d(s,s.FRAGMENT_SHADER,b);s.attachShader(v,R),s.attachShader(v,w),n.index0AttributeName!==void 0?s.bindAttribLocation(v,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(I){if(e.debug.checkShaderErrors){let L=s.getProgramInfoLog(v).trim(),U=s.getShaderInfoLog(R).trim(),D=s.getShaderInfoLog(w).trim(),W=!0,H=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(W=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,v,R,w);else{let nt=Md(s,R,"vertex"),V=Md(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+L+`
`+nt+`
`+V)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(U===""||D==="")&&(H=!1);H&&(I.diagnostics={runnable:W,programLog:L,vertexShader:{log:U,prefix:m},fragmentShader:{log:D,prefix:g}})}s.deleteShader(R),s.deleteShader(w),P=new _r(s,v),S=Dv(s,v)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,wv)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Av++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=w,this}var Yv=0,Ah=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new Rh(t),n.set(t,i)),i}},Rh=class{constructor(t){this.id=Yv++,this.code=t,this.usedTimes=0}};function $v(e,t,n,i,s,r,o){let a=new xo,c=new Ah,h=new Set,l=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return h.add(S),S===0?"uv":`uv${S}`}function m(S,M,I,L,U){let D=L.fog,W=U.geometry,H=S.isMeshStandardMaterial?L.environment:null,nt=(S.isMeshStandardMaterial?n:t).get(S.envMap||H),V=nt&&nt.mapping===oc?nt.image.height:null,Z=p[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));let J=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,j=J!==void 0?J.length:0,ft=0;W.morphAttributes.position!==void 0&&(ft=1),W.morphAttributes.normal!==void 0&&(ft=2),W.morphAttributes.color!==void 0&&(ft=3);let Tt,Y,B,st;if(Z){let ye=pi[Z];Tt=ye.vertexShader,Y=ye.fragmentShader}else Tt=S.vertexShader,Y=S.fragmentShader,c.update(S),B=c.getVertexShaderID(S),st=c.getFragmentShaderID(S);let tt=e.getRenderTarget(),gt=e.state.buffers.depth.getReversed(),St=U.isInstancedMesh===!0,xt=U.isBatchedMesh===!0,Ht=!!S.map,K=!!S.matcap,at=!!nt,z=!!S.aoMap,zt=!!S.lightMap,ot=!!S.bumpMap,_t=!!S.normalMap,pt=!!S.displacementMap,Xt=!!S.emissiveMap,wt=!!S.metalnessMap,C=!!S.roughnessMap,E=S.anisotropy>0,G=S.clearcoat>0,Q=S.dispersion>0,rt=S.iridescence>0,et=S.sheen>0,Lt=S.transmission>0,vt=E&&!!S.anisotropyMap,At=G&&!!S.clearcoatMap,oe=G&&!!S.clearcoatNormalMap,lt=G&&!!S.clearcoatRoughnessMap,Rt=rt&&!!S.iridescenceMap,qt=rt&&!!S.iridescenceThicknessMap,Zt=et&&!!S.sheenColorMap,Ct=et&&!!S.sheenRoughnessMap,le=!!S.specularMap,ie=!!S.specularColorMap,Se=!!S.specularIntensityMap,F=Lt&&!!S.transmissionMap,yt=Lt&&!!S.thicknessMap,$=!!S.gradientMap,it=!!S.alphaMap,Et=S.alphaTest>0,bt=!!S.alphaHash,te=!!S.extensions,Ne=ts;S.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Ne=e.toneMapping);let cn={shaderID:Z,shaderType:S.type,shaderName:S.name,vertexShader:Tt,fragmentShader:Y,defines:S.defines,customVertexShaderID:B,customFragmentShaderID:st,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:xt,batchingColor:xt&&U._colorsTexture!==null,instancing:St,instancingColor:St&&U.instanceColor!==null,instancingMorph:St&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:tt===null?e.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Dr,alphaToCoverage:!!S.alphaToCoverage,map:Ht,matcap:K,envMap:at,envMapMode:at&&nt.mapping,envMapCubeUVHeight:V,aoMap:z,lightMap:zt,bumpMap:ot,normalMap:_t,displacementMap:f&&pt,emissiveMap:Xt,normalMapObjectSpace:_t&&S.normalMapType===fm,normalMapTangentSpace:_t&&S.normalMapType===ac,metalnessMap:wt,roughnessMap:C,anisotropy:E,anisotropyMap:vt,clearcoat:G,clearcoatMap:At,clearcoatNormalMap:oe,clearcoatRoughnessMap:lt,dispersion:Q,iridescence:rt,iridescenceMap:Rt,iridescenceThicknessMap:qt,sheen:et,sheenColorMap:Zt,sheenRoughnessMap:Ct,specularMap:le,specularColorMap:ie,specularIntensityMap:Se,transmission:Lt,transmissionMap:F,thicknessMap:yt,gradientMap:$,opaque:S.transparent===!1&&S.blending===xr&&S.alphaToCoverage===!1,alphaMap:it,alphaTest:Et,alphaHash:bt,combine:S.combine,mapUv:Ht&&v(S.map.channel),aoMapUv:z&&v(S.aoMap.channel),lightMapUv:zt&&v(S.lightMap.channel),bumpMapUv:ot&&v(S.bumpMap.channel),normalMapUv:_t&&v(S.normalMap.channel),displacementMapUv:pt&&v(S.displacementMap.channel),emissiveMapUv:Xt&&v(S.emissiveMap.channel),metalnessMapUv:wt&&v(S.metalnessMap.channel),roughnessMapUv:C&&v(S.roughnessMap.channel),anisotropyMapUv:vt&&v(S.anisotropyMap.channel),clearcoatMapUv:At&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:oe&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:qt&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Zt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&v(S.sheenRoughnessMap.channel),specularMapUv:le&&v(S.specularMap.channel),specularColorMapUv:ie&&v(S.specularColorMap.channel),specularIntensityMapUv:Se&&v(S.specularIntensityMap.channel),transmissionMapUv:F&&v(S.transmissionMap.channel),thicknessMapUv:yt&&v(S.thicknessMap.channel),alphaMapUv:it&&v(S.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(_t||E),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!W.attributes.uv&&(Ht||it),fog:!!D,useFog:S.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:gt,skinning:U.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:ft,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:e.shadowMap.enabled&&I.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ne,decodeVideoTexture:Ht&&S.map.isVideoTexture===!0&&ue.getTransfer(S.map.colorSpace)===_e,decodeVideoTextureEmissive:Xt&&S.emissiveMap.isVideoTexture===!0&&ue.getTransfer(S.emissiveMap.colorSpace)===_e,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ii,flipSided:S.side===un,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:te&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&S.extensions.multiDraw===!0||xt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return cn.vertexUv1s=h.has(1),cn.vertexUv2s=h.has(2),cn.vertexUv3s=h.has(3),h.clear(),cn}function g(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let I in S.defines)M.push(I),M.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(_(M,S),y(M,S),M.push(e.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function _(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function y(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function b(S){let M=p[S.type],I;if(M){let L=pi[M];I=Fm.clone(L.uniforms)}else I=S.uniforms;return I}function R(S,M){let I;for(let L=0,U=l.length;L<U;L++){let D=l[L];if(D.cacheKey===M){I=D,++I.usedTimes;break}}return I===void 0&&(I=new qv(e,M,S,r),l.push(I)),I}function w(S){if(--S.usedTimes===0){let M=l.indexOf(S);l[M]=l[l.length-1],l.pop(),S.destroy()}}function A(S){c.remove(S)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:b,acquireProgram:R,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:P}}function Zv(){let e=new WeakMap;function t(o){return e.has(o)}function n(o){let a=e.get(o);return a===void 0&&(a={},e.set(o,a)),a}function i(o){e.delete(o)}function s(o,a,c){e.get(o)[a]=c}function r(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:r}}function Jv(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function Ad(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Rd(){let e=[],t=0,n=[],i=[],s=[];function r(){t=0,n.length=0,i.length=0,s.length=0}function o(u,f,d,p,v,m){let g=e[t];return g===void 0?(g={id:u.id,object:u,geometry:f,material:d,groupOrder:p,renderOrder:u.renderOrder,z:v,group:m},e[t]=g):(g.id=u.id,g.object=u,g.geometry=f,g.material=d,g.groupOrder=p,g.renderOrder=u.renderOrder,g.z=v,g.group=m),t++,g}function a(u,f,d,p,v,m){let g=o(u,f,d,p,v,m);d.transmission>0?i.push(g):d.transparent===!0?s.push(g):n.push(g)}function c(u,f,d,p,v,m){let g=o(u,f,d,p,v,m);d.transmission>0?i.unshift(g):d.transparent===!0?s.unshift(g):n.unshift(g)}function h(u,f){n.length>1&&n.sort(u||Jv),i.length>1&&i.sort(f||Ad),s.length>1&&s.sort(f||Ad)}function l(){for(let u=t,f=e.length;u<f;u++){let d=e[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:l,sort:h}}function jv(){let e=new WeakMap;function t(i,s){let r=e.get(i),o;return r===void 0?(o=new Rd,e.set(i,[o])):s>=r.length?(o=new Rd,r.push(o)):o=r[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}function Kv(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new N,color:new Vt};break;case"SpotLight":n={position:new N,direction:new N,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new N,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new N,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":n={color:new Vt,position:new N,halfWidth:new N,halfHeight:new N};break}return e[t.id]=n,n}}}function Qv(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var t2=0;function e2(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function n2(e){let t=new Kv,n=Qv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new N);let s=new N,r=new re,o=new re;function a(h){let l=0,u=0,f=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let d=0,p=0,v=0,m=0,g=0,_=0,y=0,b=0,R=0,w=0,A=0;h.sort(e2);for(let S=0,M=h.length;S<M;S++){let I=h[S],L=I.color,U=I.intensity,D=I.distance,W=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)l+=L.r*U,u+=L.g*U,f+=L.b*U;else if(I.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(I.sh.coefficients[H],U);A++}else if(I.isDirectionalLight){let H=t.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let nt=I.shadow,V=n.get(I);V.shadowIntensity=nt.intensity,V.shadowBias=nt.bias,V.shadowNormalBias=nt.normalBias,V.shadowRadius=nt.radius,V.shadowMapSize=nt.mapSize,i.directionalShadow[d]=V,i.directionalShadowMap[d]=W,i.directionalShadowMatrix[d]=I.shadow.matrix,_++}i.directional[d]=H,d++}else if(I.isSpotLight){let H=t.get(I);H.position.setFromMatrixPosition(I.matrixWorld),H.color.copy(L).multiplyScalar(U),H.distance=D,H.coneCos=Math.cos(I.angle),H.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),H.decay=I.decay,i.spot[v]=H;let nt=I.shadow;if(I.map&&(i.spotLightMap[R]=I.map,R++,nt.updateMatrices(I),I.castShadow&&w++),i.spotLightMatrix[v]=nt.matrix,I.castShadow){let V=n.get(I);V.shadowIntensity=nt.intensity,V.shadowBias=nt.bias,V.shadowNormalBias=nt.normalBias,V.shadowRadius=nt.radius,V.shadowMapSize=nt.mapSize,i.spotShadow[v]=V,i.spotShadowMap[v]=W,b++}v++}else if(I.isRectAreaLight){let H=t.get(I);H.color.copy(L).multiplyScalar(U),H.halfWidth.set(I.width*.5,0,0),H.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=H,m++}else if(I.isPointLight){let H=t.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),H.distance=I.distance,H.decay=I.decay,I.castShadow){let nt=I.shadow,V=n.get(I);V.shadowIntensity=nt.intensity,V.shadowBias=nt.bias,V.shadowNormalBias=nt.normalBias,V.shadowRadius=nt.radius,V.shadowMapSize=nt.mapSize,V.shadowCameraNear=nt.camera.near,V.shadowCameraFar=nt.camera.far,i.pointShadow[p]=V,i.pointShadowMap[p]=W,i.pointShadowMatrix[p]=I.shadow.matrix,y++}i.point[p]=H,p++}else if(I.isHemisphereLight){let H=t.get(I);H.skyColor.copy(I.color).multiplyScalar(U),H.groundColor.copy(I.groundColor).multiplyScalar(U),i.hemi[g]=H,g++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=mt.LTC_FLOAT_1,i.rectAreaLTC2=mt.LTC_FLOAT_2):(i.rectAreaLTC1=mt.LTC_HALF_1,i.rectAreaLTC2=mt.LTC_HALF_2)),i.ambient[0]=l,i.ambient[1]=u,i.ambient[2]=f;let P=i.hash;(P.directionalLength!==d||P.pointLength!==p||P.spotLength!==v||P.rectAreaLength!==m||P.hemiLength!==g||P.numDirectionalShadows!==_||P.numPointShadows!==y||P.numSpotShadows!==b||P.numSpotMaps!==R||P.numLightProbes!==A)&&(i.directional.length=d,i.spot.length=v,i.rectArea.length=m,i.point.length=p,i.hemi.length=g,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=b+R-w,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,P.directionalLength=d,P.pointLength=p,P.spotLength=v,P.rectAreaLength=m,P.hemiLength=g,P.numDirectionalShadows=_,P.numPointShadows=y,P.numSpotShadows=b,P.numSpotMaps=R,P.numLightProbes=A,i.version=t2++)}function c(h,l){let u=0,f=0,d=0,p=0,v=0,m=l.matrixWorldInverse;for(let g=0,_=h.length;g<_;g++){let y=h[g];if(y.isDirectionalLight){let b=i.directional[u];b.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),u++}else if(y.isSpotLight){let b=i.spot[d];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),d++}else if(y.isRectAreaLight){let b=i.rectArea[p];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),p++}else if(y.isPointLight){let b=i.point[f];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){let b=i.hemi[v];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:i}}function Cd(e){let t=new n2(e),n=[],i=[];function s(l){h.camera=l,n.length=0,i.length=0}function r(l){n.push(l)}function o(l){i.push(l)}function a(){t.setup(n)}function c(l){t.setupView(n,l)}let h={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function i2(e){let t=new WeakMap;function n(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Cd(e),t.set(s,[a])):r>=o.length?(a=new Cd(e),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:n,dispose:i}}var Ch=class extends si{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=hm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ph=class extends si{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},s2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function o2(e,t,n){let i=new Is,s=new ct,r=new ct,o=new Be,a=new Ch({depthPacking:um}),c=new Ph,h={},l=n.maxTextureSize,u={[es]:un,[un]:es,[ii]:ii},f=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:s2,fragmentShader:r2}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let p=new de;p.setAttribute("position",new ce(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ae(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yd;let g=this.type;this.render=function(w,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let S=e.getRenderTarget(),M=e.getActiveCubeFace(),I=e.getActiveMipmapLevel(),L=e.state;L.setBlending(Qi),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let U=g!==zi&&this.type===zi,D=g===zi&&this.type!==zi;for(let W=0,H=w.length;W<H;W++){let nt=w[W],V=nt.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let Z=V.getFrameExtents();if(s.multiply(Z),r.copy(V.mapSize),(s.x>l||s.y>l)&&(s.x>l&&(r.x=Math.floor(l/Z.x),s.x=r.x*Z.x,V.mapSize.x=r.x),s.y>l&&(r.y=Math.floor(l/Z.y),s.y=r.y*Z.y,V.mapSize.y=r.y)),V.map===null||U===!0||D===!0){let j=this.type!==zi?{minFilter:fn,magFilter:fn}:{};V.map!==null&&V.map.dispose(),V.map=new Ni(s.x,s.y,j),V.map.texture.name=nt.name+".shadowMap",V.camera.updateProjectionMatrix()}e.setRenderTarget(V.map),e.clear();let J=V.getViewportCount();for(let j=0;j<J;j++){let ft=V.getViewport(j);o.set(r.x*ft.x,r.y*ft.y,r.x*ft.z,r.y*ft.w),L.viewport(o),V.updateMatrices(nt,j),i=V.getFrustum(),b(A,P,V.camera,nt,this.type)}V.isPointLightShadow!==!0&&this.type===zi&&_(V,P),V.needsUpdate=!1}g=this.type,m.needsUpdate=!1,e.setRenderTarget(S,M,I)};function _(w,A){let P=t.update(v);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ni(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,e.setRenderTarget(w.mapPass),e.clear(),e.renderBufferDirect(A,null,P,f,v,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,e.setRenderTarget(w.map),e.clear(),e.renderBufferDirect(A,null,P,d,v,null)}function y(w,A,P,S){let M=null,I=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)M=I;else if(M=P.isPointLight===!0?c:a,e.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let L=M.uuid,U=A.uuid,D=h[L];D===void 0&&(D={},h[L]=D);let W=D[U];W===void 0&&(W=M.clone(),D[U]=W,A.addEventListener("dispose",R)),M=W}if(M.visible=A.visible,M.wireframe=A.wireframe,S===zi?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let L=e.properties.get(M);L.light=P}return M}function b(w,A,P,S,M){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===zi)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);let U=t.update(w),D=w.material;if(Array.isArray(D)){let W=U.groups;for(let H=0,nt=W.length;H<nt;H++){let V=W[H],Z=D[V.materialIndex];if(Z&&Z.visible){let J=y(w,Z,S,M);w.onBeforeShadow(e,w,A,P,U,J,V),e.renderBufferDirect(P,null,U,J,w,V),w.onAfterShadow(e,w,A,P,U,J,V)}}}else if(D.visible){let W=y(w,D,S,M);w.onBeforeShadow(e,w,A,P,U,W,null),e.renderBufferDirect(P,null,U,W,w,null),w.onAfterShadow(e,w,A,P,U,W,null)}}let L=w.children;for(let U=0,D=L.length;U<D;U++)b(L[U],A,P,S,M)}function R(w){w.target.removeEventListener("dispose",R);for(let P in h){let S=h[P],M=w.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var a2={[Ul]:Dl,[Nl]:Ol,[Bl]:kl,[Mr]:Fl,[Dl]:Ul,[Ol]:Nl,[kl]:Bl,[Fl]:Mr};function c2(e,t){function n(){let F=!1,yt=new Be,$=null,it=new Be(0,0,0,0);return{setMask:function(Et){$!==Et&&!F&&(e.colorMask(Et,Et,Et,Et),$=Et)},setLocked:function(Et){F=Et},setClear:function(Et,bt,te,Ne,cn){cn===!0&&(Et*=Ne,bt*=Ne,te*=Ne),yt.set(Et,bt,te,Ne),it.equals(yt)===!1&&(e.clearColor(Et,bt,te,Ne),it.copy(yt))},reset:function(){F=!1,$=null,it.set(-1,0,0,0)}}}function i(){let F=!1,yt=!1,$=null,it=null,Et=null;return{setReversed:function(bt){if(yt!==bt){let te=t.get("EXT_clip_control");yt?te.clipControlEXT(te.LOWER_LEFT_EXT,te.ZERO_TO_ONE_EXT):te.clipControlEXT(te.LOWER_LEFT_EXT,te.NEGATIVE_ONE_TO_ONE_EXT);let Ne=Et;Et=null,this.setClear(Ne)}yt=bt},getReversed:function(){return yt},setTest:function(bt){bt?tt(e.DEPTH_TEST):gt(e.DEPTH_TEST)},setMask:function(bt){$!==bt&&!F&&(e.depthMask(bt),$=bt)},setFunc:function(bt){if(yt&&(bt=a2[bt]),it!==bt){switch(bt){case Ul:e.depthFunc(e.NEVER);break;case Dl:e.depthFunc(e.ALWAYS);break;case Nl:e.depthFunc(e.LESS);break;case Mr:e.depthFunc(e.LEQUAL);break;case Bl:e.depthFunc(e.EQUAL);break;case Fl:e.depthFunc(e.GEQUAL);break;case Ol:e.depthFunc(e.GREATER);break;case kl:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}it=bt}},setLocked:function(bt){F=bt},setClear:function(bt){Et!==bt&&(yt&&(bt=1-bt),e.clearDepth(bt),Et=bt)},reset:function(){F=!1,$=null,it=null,Et=null,yt=!1}}}function s(){let F=!1,yt=null,$=null,it=null,Et=null,bt=null,te=null,Ne=null,cn=null;return{setTest:function(ye){F||(ye?tt(e.STENCIL_TEST):gt(e.STENCIL_TEST))},setMask:function(ye){yt!==ye&&!F&&(e.stencilMask(ye),yt=ye)},setFunc:function(ye,jn,Ti){($!==ye||it!==jn||Et!==Ti)&&(e.stencilFunc(ye,jn,Ti),$=ye,it=jn,Et=Ti)},setOp:function(ye,jn,Ti){(bt!==ye||te!==jn||Ne!==Ti)&&(e.stencilOp(ye,jn,Ti),bt=ye,te=jn,Ne=Ti)},setLocked:function(ye){F=ye},setClear:function(ye){cn!==ye&&(e.clearStencil(ye),cn=ye)},reset:function(){F=!1,yt=null,$=null,it=null,Et=null,bt=null,te=null,Ne=null,cn=null}}}let r=new n,o=new i,a=new s,c=new WeakMap,h=new WeakMap,l={},u={},f=new WeakMap,d=[],p=null,v=!1,m=null,g=null,_=null,y=null,b=null,R=null,w=null,A=new Vt(0,0,0),P=0,S=!1,M=null,I=null,L=null,U=null,D=null,W=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,nt=0,V=e.getParameter(e.VERSION);V.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(V)[1]),H=nt>=1):V.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),H=nt>=2);let Z=null,J={},j=e.getParameter(e.SCISSOR_BOX),ft=e.getParameter(e.VIEWPORT),Tt=new Be().fromArray(j),Y=new Be().fromArray(ft);function B(F,yt,$,it){let Et=new Uint8Array(4),bt=e.createTexture();e.bindTexture(F,bt),e.texParameteri(F,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(F,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let te=0;te<$;te++)F===e.TEXTURE_3D||F===e.TEXTURE_2D_ARRAY?e.texImage3D(yt,0,e.RGBA,1,1,it,0,e.RGBA,e.UNSIGNED_BYTE,Et):e.texImage2D(yt+te,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Et);return bt}let st={};st[e.TEXTURE_2D]=B(e.TEXTURE_2D,e.TEXTURE_2D,1),st[e.TEXTURE_CUBE_MAP]=B(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[e.TEXTURE_2D_ARRAY]=B(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),st[e.TEXTURE_3D]=B(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),tt(e.DEPTH_TEST),o.setFunc(Mr),ot(!1),_t(zf),tt(e.CULL_FACE),z(Qi);function tt(F){l[F]!==!0&&(e.enable(F),l[F]=!0)}function gt(F){l[F]!==!1&&(e.disable(F),l[F]=!1)}function St(F,yt){return u[F]!==yt?(e.bindFramebuffer(F,yt),u[F]=yt,F===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=yt),F===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=yt),!0):!1}function xt(F,yt){let $=d,it=!1;if(F){$=f.get(yt),$===void 0&&($=[],f.set(yt,$));let Et=F.textures;if($.length!==Et.length||$[0]!==e.COLOR_ATTACHMENT0){for(let bt=0,te=Et.length;bt<te;bt++)$[bt]=e.COLOR_ATTACHMENT0+bt;$.length=Et.length,it=!0}}else $[0]!==e.BACK&&($[0]=e.BACK,it=!0);it&&e.drawBuffers($)}function Ht(F){return p!==F?(e.useProgram(F),p=F,!0):!1}let K={[Ts]:e.FUNC_ADD,[Fp]:e.FUNC_SUBTRACT,[Op]:e.FUNC_REVERSE_SUBTRACT};K[kp]=e.MIN,K[Hp]=e.MAX;let at={[Vp]:e.ZERO,[Gp]:e.ONE,[Wp]:e.SRC_COLOR,[zl]:e.SRC_ALPHA,[Jp]:e.SRC_ALPHA_SATURATE,[$p]:e.DST_COLOR,[qp]:e.DST_ALPHA,[Xp]:e.ONE_MINUS_SRC_COLOR,[Ll]:e.ONE_MINUS_SRC_ALPHA,[Zp]:e.ONE_MINUS_DST_COLOR,[Yp]:e.ONE_MINUS_DST_ALPHA,[jp]:e.CONSTANT_COLOR,[Kp]:e.ONE_MINUS_CONSTANT_COLOR,[Qp]:e.CONSTANT_ALPHA,[tm]:e.ONE_MINUS_CONSTANT_ALPHA};function z(F,yt,$,it,Et,bt,te,Ne,cn,ye){if(F===Qi){v===!0&&(gt(e.BLEND),v=!1);return}if(v===!1&&(tt(e.BLEND),v=!0),F!==Bp){if(F!==m||ye!==S){if((g!==Ts||b!==Ts)&&(e.blendEquation(e.FUNC_ADD),g=Ts,b=Ts),ye)switch(F){case xr:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case br:e.blendFunc(e.ONE,e.ONE);break;case Lf:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Uf:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case xr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case br:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case Lf:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Uf:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}_=null,y=null,R=null,w=null,A.set(0,0,0),P=0,m=F,S=ye}return}Et=Et||yt,bt=bt||$,te=te||it,(yt!==g||Et!==b)&&(e.blendEquationSeparate(K[yt],K[Et]),g=yt,b=Et),($!==_||it!==y||bt!==R||te!==w)&&(e.blendFuncSeparate(at[$],at[it],at[bt],at[te]),_=$,y=it,R=bt,w=te),(Ne.equals(A)===!1||cn!==P)&&(e.blendColor(Ne.r,Ne.g,Ne.b,cn),A.copy(Ne),P=cn),m=F,S=!1}function zt(F,yt){F.side===ii?gt(e.CULL_FACE):tt(e.CULL_FACE);let $=F.side===un;yt&&($=!$),ot($),F.blending===xr&&F.transparent===!1?z(Qi):z(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let it=F.stencilWrite;a.setTest(it),it&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Xt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?tt(e.SAMPLE_ALPHA_TO_COVERAGE):gt(e.SAMPLE_ALPHA_TO_COVERAGE)}function ot(F){M!==F&&(F?e.frontFace(e.CW):e.frontFace(e.CCW),M=F)}function _t(F){F!==Dp?(tt(e.CULL_FACE),F!==I&&(F===zf?e.cullFace(e.BACK):F===Np?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):gt(e.CULL_FACE),I=F}function pt(F){F!==L&&(H&&e.lineWidth(F),L=F)}function Xt(F,yt,$){F?(tt(e.POLYGON_OFFSET_FILL),(U!==yt||D!==$)&&(e.polygonOffset(yt,$),U=yt,D=$)):gt(e.POLYGON_OFFSET_FILL)}function wt(F){F?tt(e.SCISSOR_TEST):gt(e.SCISSOR_TEST)}function C(F){F===void 0&&(F=e.TEXTURE0+W-1),Z!==F&&(e.activeTexture(F),Z=F)}function E(F,yt,$){$===void 0&&(Z===null?$=e.TEXTURE0+W-1:$=Z);let it=J[$];it===void 0&&(it={type:void 0,texture:void 0},J[$]=it),(it.type!==F||it.texture!==yt)&&(Z!==$&&(e.activeTexture($),Z=$),e.bindTexture(F,yt||st[F]),it.type=F,it.texture=yt)}function G(){let F=J[Z];F!==void 0&&F.type!==void 0&&(e.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Q(){try{e.compressedTexImage2D.apply(e,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function rt(){try{e.compressedTexImage3D.apply(e,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function et(){try{e.texSubImage2D.apply(e,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Lt(){try{e.texSubImage3D.apply(e,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function vt(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function At(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function oe(){try{e.texStorage2D.apply(e,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function lt(){try{e.texStorage3D.apply(e,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Rt(){try{e.texImage2D.apply(e,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function qt(){try{e.texImage3D.apply(e,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Zt(F){Tt.equals(F)===!1&&(e.scissor(F.x,F.y,F.z,F.w),Tt.copy(F))}function Ct(F){Y.equals(F)===!1&&(e.viewport(F.x,F.y,F.z,F.w),Y.copy(F))}function le(F,yt){let $=h.get(yt);$===void 0&&($=new WeakMap,h.set(yt,$));let it=$.get(F);it===void 0&&(it=e.getUniformBlockIndex(yt,F.name),$.set(F,it))}function ie(F,yt){let it=h.get(yt).get(F);c.get(yt)!==it&&(e.uniformBlockBinding(yt,it,F.__bindingPointIndex),c.set(yt,it))}function Se(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),l={},Z=null,J={},u={},f=new WeakMap,d=[],p=null,v=!1,m=null,g=null,_=null,y=null,b=null,R=null,w=null,A=new Vt(0,0,0),P=0,S=!1,M=null,I=null,L=null,U=null,D=null,Tt.set(0,0,e.canvas.width,e.canvas.height),Y.set(0,0,e.canvas.width,e.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:tt,disable:gt,bindFramebuffer:St,drawBuffers:xt,useProgram:Ht,setBlending:z,setMaterial:zt,setFlipSided:ot,setCullFace:_t,setLineWidth:pt,setPolygonOffset:Xt,setScissorTest:wt,activeTexture:C,bindTexture:E,unbindTexture:G,compressedTexImage2D:Q,compressedTexImage3D:rt,texImage2D:Rt,texImage3D:qt,updateUBOMapping:le,uniformBlockBinding:ie,texStorage2D:oe,texStorage3D:lt,texSubImage2D:et,texSubImage3D:Lt,compressedTexSubImage2D:vt,compressedTexSubImage3D:At,scissor:Zt,viewport:Ct,reset:Se}}function Pd(e,t,n,i){let s=l2(i);switch(n){case Kd:return e*t;case t0:return e*t;case e0:return e*t*2;case Ao:return e*t/s.components*s.byteLength;case fu:return e*t/s.components*s.byteLength;case n0:return e*t*2/s.components*s.byteLength;case du:return e*t*2/s.components*s.byteLength;case Qd:return e*t*3/s.components*s.byteLength;case xn:return e*t*4/s.components*s.byteLength;case pu:return e*t*4/s.components*s.byteLength;case wa:case Aa:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ra:case Ca:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Xl:case Yl:return Math.max(e,16)*Math.max(t,8)/4;case Wl:case ql:return Math.max(e,8)*Math.max(t,8)/2;case $l:case Zl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Jl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case jl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Kl:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Ql:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case th:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case eh:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case nh:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ih:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case sh:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case rh:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case oh:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ah:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ch:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case lh:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case hh:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Pa:case uh:case fh:return Math.ceil(e/4)*Math.ceil(t/4)*16;case i0:case dh:return Math.ceil(e/4)*Math.ceil(t/4)*8;case ph:case mh:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function l2(e){switch(e){case Sn:case Zd:return{byteLength:1,components:1};case go:case Jd:case wo:return{byteLength:2,components:1};case hu:case uu:return{byteLength:2,components:4};case Ps:case lu:case mi:return{byteLength:4,components:1};case jd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}function h2(e,t,n,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new ct,l=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(C,E){return d?new OffscreenCanvas(C,E):La("canvas")}function v(C,E,G){let Q=1,rt=wt(C);if((rt.width>G||rt.height>G)&&(Q=G/Math.max(rt.width,rt.height)),Q<1)if(typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&C instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&C instanceof ImageBitmap||typeof VideoFrame!="undefined"&&C instanceof VideoFrame){let et=Math.floor(Q*rt.width),Lt=Math.floor(Q*rt.height);u===void 0&&(u=p(et,Lt));let vt=E?p(et,Lt):u;return vt.width=et,vt.height=Lt,vt.getContext("2d").drawImage(C,0,0,et,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+et+"x"+Lt+")."),vt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),C;return C}function m(C){return C.generateMipmaps}function g(C){e.generateMipmap(C)}function _(C){return C.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?e.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function y(C,E,G,Q,rt=!1){if(C!==null){if(e[C]!==void 0)return e[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let et=E;if(E===e.RED&&(G===e.FLOAT&&(et=e.R32F),G===e.HALF_FLOAT&&(et=e.R16F),G===e.UNSIGNED_BYTE&&(et=e.R8)),E===e.RED_INTEGER&&(G===e.UNSIGNED_BYTE&&(et=e.R8UI),G===e.UNSIGNED_SHORT&&(et=e.R16UI),G===e.UNSIGNED_INT&&(et=e.R32UI),G===e.BYTE&&(et=e.R8I),G===e.SHORT&&(et=e.R16I),G===e.INT&&(et=e.R32I)),E===e.RG&&(G===e.FLOAT&&(et=e.RG32F),G===e.HALF_FLOAT&&(et=e.RG16F),G===e.UNSIGNED_BYTE&&(et=e.RG8)),E===e.RG_INTEGER&&(G===e.UNSIGNED_BYTE&&(et=e.RG8UI),G===e.UNSIGNED_SHORT&&(et=e.RG16UI),G===e.UNSIGNED_INT&&(et=e.RG32UI),G===e.BYTE&&(et=e.RG8I),G===e.SHORT&&(et=e.RG16I),G===e.INT&&(et=e.RG32I)),E===e.RGB_INTEGER&&(G===e.UNSIGNED_BYTE&&(et=e.RGB8UI),G===e.UNSIGNED_SHORT&&(et=e.RGB16UI),G===e.UNSIGNED_INT&&(et=e.RGB32UI),G===e.BYTE&&(et=e.RGB8I),G===e.SHORT&&(et=e.RGB16I),G===e.INT&&(et=e.RGB32I)),E===e.RGBA_INTEGER&&(G===e.UNSIGNED_BYTE&&(et=e.RGBA8UI),G===e.UNSIGNED_SHORT&&(et=e.RGBA16UI),G===e.UNSIGNED_INT&&(et=e.RGBA32UI),G===e.BYTE&&(et=e.RGBA8I),G===e.SHORT&&(et=e.RGBA16I),G===e.INT&&(et=e.RGBA32I)),E===e.RGB&&G===e.UNSIGNED_INT_5_9_9_9_REV&&(et=e.RGB9_E5),E===e.RGBA){let Lt=rt?cc:ue.getTransfer(Q);G===e.FLOAT&&(et=e.RGBA32F),G===e.HALF_FLOAT&&(et=e.RGBA16F),G===e.UNSIGNED_BYTE&&(et=Lt===_e?e.SRGB8_ALPHA8:e.RGBA8),G===e.UNSIGNED_SHORT_4_4_4_4&&(et=e.RGBA4),G===e.UNSIGNED_SHORT_5_5_5_1&&(et=e.RGB5_A1)}return(et===e.R16F||et===e.R32F||et===e.RG16F||et===e.RG32F||et===e.RGBA16F||et===e.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function b(C,E){let G;return C?E===null||E===Ps||E===Tr?G=e.DEPTH24_STENCIL8:E===mi?G=e.DEPTH32F_STENCIL8:E===go&&(G=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ps||E===Tr?G=e.DEPTH_COMPONENT24:E===mi?G=e.DEPTH_COMPONENT32F:E===go&&(G=e.DEPTH_COMPONENT16),G}function R(C,E){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==fn&&C.minFilter!==en?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function w(C){let E=C.target;E.removeEventListener("dispose",w),P(E),E.isVideoTexture&&l.delete(E)}function A(C){let E=C.target;E.removeEventListener("dispose",A),M(E)}function P(C){let E=i.get(C);if(E.__webglInit===void 0)return;let G=C.source,Q=f.get(G);if(Q){let rt=Q[E.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&S(C),Object.keys(Q).length===0&&f.delete(G)}i.remove(C)}function S(C){let E=i.get(C);e.deleteTexture(E.__webglTexture);let G=C.source,Q=f.get(G);delete Q[E.__cacheKey],o.memory.textures--}function M(C){let E=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(E.__webglFramebuffer[Q]))for(let rt=0;rt<E.__webglFramebuffer[Q].length;rt++)e.deleteFramebuffer(E.__webglFramebuffer[Q][rt]);else e.deleteFramebuffer(E.__webglFramebuffer[Q]);E.__webglDepthbuffer&&e.deleteRenderbuffer(E.__webglDepthbuffer[Q])}else{if(Array.isArray(E.__webglFramebuffer))for(let Q=0;Q<E.__webglFramebuffer.length;Q++)e.deleteFramebuffer(E.__webglFramebuffer[Q]);else e.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&e.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&e.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Q=0;Q<E.__webglColorRenderbuffer.length;Q++)E.__webglColorRenderbuffer[Q]&&e.deleteRenderbuffer(E.__webglColorRenderbuffer[Q]);E.__webglDepthRenderbuffer&&e.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let G=C.textures;for(let Q=0,rt=G.length;Q<rt;Q++){let et=i.get(G[Q]);et.__webglTexture&&(e.deleteTexture(et.__webglTexture),o.memory.textures--),i.remove(G[Q])}i.remove(C)}let I=0;function L(){I=0}function U(){let C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function D(C){let E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function W(C,E){let G=i.get(C);if(C.isVideoTexture&&pt(C),C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){let Q=C.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(G,C,E);return}}n.bindTexture(e.TEXTURE_2D,G.__webglTexture,e.TEXTURE0+E)}function H(C,E){let G=i.get(C);if(C.version>0&&G.__version!==C.version){Y(G,C,E);return}n.bindTexture(e.TEXTURE_2D_ARRAY,G.__webglTexture,e.TEXTURE0+E)}function nt(C,E){let G=i.get(C);if(C.version>0&&G.__version!==C.version){Y(G,C,E);return}n.bindTexture(e.TEXTURE_3D,G.__webglTexture,e.TEXTURE0+E)}function V(C,E){let G=i.get(C);if(C.version>0&&G.__version!==C.version){B(G,C,E);return}n.bindTexture(e.TEXTURE_CUBE_MAP,G.__webglTexture,e.TEXTURE0+E)}let Z={[Wn]:e.REPEAT,[Rs]:e.CLAMP_TO_EDGE,[Gl]:e.MIRRORED_REPEAT},J={[fn]:e.NEAREST,[lm]:e.NEAREST_MIPMAP_NEAREST,[Jo]:e.NEAREST_MIPMAP_LINEAR,[en]:e.LINEAR,[jc]:e.LINEAR_MIPMAP_NEAREST,[Cs]:e.LINEAR_MIPMAP_LINEAR},j={[dm]:e.NEVER,[ym]:e.ALWAYS,[pm]:e.LESS,[s0]:e.LEQUAL,[mm]:e.EQUAL,[vm]:e.GEQUAL,[gm]:e.GREATER,[xm]:e.NOTEQUAL};function ft(C,E){if(E.type===mi&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===en||E.magFilter===jc||E.magFilter===Jo||E.magFilter===Cs||E.minFilter===en||E.minFilter===jc||E.minFilter===Jo||E.minFilter===Cs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(C,e.TEXTURE_WRAP_S,Z[E.wrapS]),e.texParameteri(C,e.TEXTURE_WRAP_T,Z[E.wrapT]),(C===e.TEXTURE_3D||C===e.TEXTURE_2D_ARRAY)&&e.texParameteri(C,e.TEXTURE_WRAP_R,Z[E.wrapR]),e.texParameteri(C,e.TEXTURE_MAG_FILTER,J[E.magFilter]),e.texParameteri(C,e.TEXTURE_MIN_FILTER,J[E.minFilter]),E.compareFunction&&(e.texParameteri(C,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(C,e.TEXTURE_COMPARE_FUNC,j[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===fn||E.minFilter!==Jo&&E.minFilter!==Cs||E.type===mi&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){let G=t.get("EXT_texture_filter_anisotropic");e.texParameterf(C,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Tt(C,E){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",w));let Q=E.source,rt=f.get(Q);rt===void 0&&(rt={},f.set(Q,rt));let et=D(E);if(et!==C.__cacheKey){rt[et]===void 0&&(rt[et]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,G=!0),rt[et].usedTimes++;let Lt=rt[C.__cacheKey];Lt!==void 0&&(rt[C.__cacheKey].usedTimes--,Lt.usedTimes===0&&S(E)),C.__cacheKey=et,C.__webglTexture=rt[et].texture}return G}function Y(C,E,G){let Q=e.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Q=e.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Q=e.TEXTURE_3D);let rt=Tt(C,E),et=E.source;n.bindTexture(Q,C.__webglTexture,e.TEXTURE0+G);let Lt=i.get(et);if(et.version!==Lt.__version||rt===!0){n.activeTexture(e.TEXTURE0+G);let vt=ue.getPrimaries(ue.workingColorSpace),At=E.colorSpace===Ki?null:ue.getPrimaries(E.colorSpace),oe=E.colorSpace===Ki||vt===At?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,E.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let lt=v(E.image,!1,s.maxTextureSize);lt=Xt(E,lt);let Rt=r.convert(E.format,E.colorSpace),qt=r.convert(E.type),Zt=y(E.internalFormat,Rt,qt,E.colorSpace,E.isVideoTexture);ft(Q,E);let Ct,le=E.mipmaps,ie=E.isVideoTexture!==!0,Se=Lt.__version===void 0||rt===!0,F=et.dataReady,yt=R(E,lt);if(E.isDepthTexture)Zt=b(E.format===wr,E.type),Se&&(ie?n.texStorage2D(e.TEXTURE_2D,1,Zt,lt.width,lt.height):n.texImage2D(e.TEXTURE_2D,0,Zt,lt.width,lt.height,0,Rt,qt,null));else if(E.isDataTexture)if(le.length>0){ie&&Se&&n.texStorage2D(e.TEXTURE_2D,yt,Zt,le[0].width,le[0].height);for(let $=0,it=le.length;$<it;$++)Ct=le[$],ie?F&&n.texSubImage2D(e.TEXTURE_2D,$,0,0,Ct.width,Ct.height,Rt,qt,Ct.data):n.texImage2D(e.TEXTURE_2D,$,Zt,Ct.width,Ct.height,0,Rt,qt,Ct.data);E.generateMipmaps=!1}else ie?(Se&&n.texStorage2D(e.TEXTURE_2D,yt,Zt,lt.width,lt.height),F&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,lt.width,lt.height,Rt,qt,lt.data)):n.texImage2D(e.TEXTURE_2D,0,Zt,lt.width,lt.height,0,Rt,qt,lt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ie&&Se&&n.texStorage3D(e.TEXTURE_2D_ARRAY,yt,Zt,le[0].width,le[0].height,lt.depth);for(let $=0,it=le.length;$<it;$++)if(Ct=le[$],E.format!==xn)if(Rt!==null)if(ie){if(F)if(E.layerUpdates.size>0){let Et=Pd(Ct.width,Ct.height,E.format,E.type);for(let bt of E.layerUpdates){let te=Ct.data.subarray(bt*Et/Ct.data.BYTES_PER_ELEMENT,(bt+1)*Et/Ct.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,bt,Ct.width,Ct.height,1,Rt,te)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,Ct.width,Ct.height,lt.depth,Rt,Ct.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,$,Zt,Ct.width,Ct.height,lt.depth,0,Ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ie?F&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,Ct.width,Ct.height,lt.depth,Rt,qt,Ct.data):n.texImage3D(e.TEXTURE_2D_ARRAY,$,Zt,Ct.width,Ct.height,lt.depth,0,Rt,qt,Ct.data)}else{ie&&Se&&n.texStorage2D(e.TEXTURE_2D,yt,Zt,le[0].width,le[0].height);for(let $=0,it=le.length;$<it;$++)Ct=le[$],E.format!==xn?Rt!==null?ie?F&&n.compressedTexSubImage2D(e.TEXTURE_2D,$,0,0,Ct.width,Ct.height,Rt,Ct.data):n.compressedTexImage2D(e.TEXTURE_2D,$,Zt,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ie?F&&n.texSubImage2D(e.TEXTURE_2D,$,0,0,Ct.width,Ct.height,Rt,qt,Ct.data):n.texImage2D(e.TEXTURE_2D,$,Zt,Ct.width,Ct.height,0,Rt,qt,Ct.data)}else if(E.isDataArrayTexture)if(ie){if(Se&&n.texStorage3D(e.TEXTURE_2D_ARRAY,yt,Zt,lt.width,lt.height,lt.depth),F)if(E.layerUpdates.size>0){let $=Pd(lt.width,lt.height,E.format,E.type);for(let it of E.layerUpdates){let Et=lt.data.subarray(it*$/lt.data.BYTES_PER_ELEMENT,(it+1)*$/lt.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,it,lt.width,lt.height,1,Rt,qt,Et)}E.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,Rt,qt,lt.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Zt,lt.width,lt.height,lt.depth,0,Rt,qt,lt.data);else if(E.isData3DTexture)ie?(Se&&n.texStorage3D(e.TEXTURE_3D,yt,Zt,lt.width,lt.height,lt.depth),F&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,Rt,qt,lt.data)):n.texImage3D(e.TEXTURE_3D,0,Zt,lt.width,lt.height,lt.depth,0,Rt,qt,lt.data);else if(E.isFramebufferTexture){if(Se)if(ie)n.texStorage2D(e.TEXTURE_2D,yt,Zt,lt.width,lt.height);else{let $=lt.width,it=lt.height;for(let Et=0;Et<yt;Et++)n.texImage2D(e.TEXTURE_2D,Et,Zt,$,it,0,Rt,qt,null),$>>=1,it>>=1}}else if(le.length>0){if(ie&&Se){let $=wt(le[0]);n.texStorage2D(e.TEXTURE_2D,yt,Zt,$.width,$.height)}for(let $=0,it=le.length;$<it;$++)Ct=le[$],ie?F&&n.texSubImage2D(e.TEXTURE_2D,$,0,0,Rt,qt,Ct):n.texImage2D(e.TEXTURE_2D,$,Zt,Rt,qt,Ct);E.generateMipmaps=!1}else if(ie){if(Se){let $=wt(lt);n.texStorage2D(e.TEXTURE_2D,yt,Zt,$.width,$.height)}F&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,Rt,qt,lt)}else n.texImage2D(e.TEXTURE_2D,0,Zt,Rt,qt,lt);m(E)&&g(Q),Lt.__version=et.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function B(C,E,G){if(E.image.length!==6)return;let Q=Tt(C,E),rt=E.source;n.bindTexture(e.TEXTURE_CUBE_MAP,C.__webglTexture,e.TEXTURE0+G);let et=i.get(rt);if(rt.version!==et.__version||Q===!0){n.activeTexture(e.TEXTURE0+G);let Lt=ue.getPrimaries(ue.workingColorSpace),vt=E.colorSpace===Ki?null:ue.getPrimaries(E.colorSpace),At=E.colorSpace===Ki||Lt===vt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,E.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,E.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let oe=E.isCompressedTexture||E.image[0].isCompressedTexture,lt=E.image[0]&&E.image[0].isDataTexture,Rt=[];for(let it=0;it<6;it++)!oe&&!lt?Rt[it]=v(E.image[it],!0,s.maxCubemapSize):Rt[it]=lt?E.image[it].image:E.image[it],Rt[it]=Xt(E,Rt[it]);let qt=Rt[0],Zt=r.convert(E.format,E.colorSpace),Ct=r.convert(E.type),le=y(E.internalFormat,Zt,Ct,E.colorSpace),ie=E.isVideoTexture!==!0,Se=et.__version===void 0||Q===!0,F=rt.dataReady,yt=R(E,qt);ft(e.TEXTURE_CUBE_MAP,E);let $;if(oe){ie&&Se&&n.texStorage2D(e.TEXTURE_CUBE_MAP,yt,le,qt.width,qt.height);for(let it=0;it<6;it++){$=Rt[it].mipmaps;for(let Et=0;Et<$.length;Et++){let bt=$[Et];E.format!==xn?Zt!==null?ie?F&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et,0,0,bt.width,bt.height,Zt,bt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et,le,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ie?F&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et,0,0,bt.width,bt.height,Zt,Ct,bt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et,le,bt.width,bt.height,0,Zt,Ct,bt.data)}}}else{if($=E.mipmaps,ie&&Se){$.length>0&&yt++;let it=wt(Rt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,yt,le,it.width,it.height)}for(let it=0;it<6;it++)if(lt){ie?F&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Rt[it].width,Rt[it].height,Zt,Ct,Rt[it].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,le,Rt[it].width,Rt[it].height,0,Zt,Ct,Rt[it].data);for(let Et=0;Et<$.length;Et++){let te=$[Et].image[it].image;ie?F&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et+1,0,0,te.width,te.height,Zt,Ct,te.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et+1,le,te.width,te.height,0,Zt,Ct,te.data)}}else{ie?F&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Zt,Ct,Rt[it]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,le,Zt,Ct,Rt[it]);for(let Et=0;Et<$.length;Et++){let bt=$[Et];ie?F&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et+1,0,0,Zt,Ct,bt.image[it]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Et+1,le,Zt,Ct,bt.image[it])}}}m(E)&&g(e.TEXTURE_CUBE_MAP),et.__version=rt.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function st(C,E,G,Q,rt,et){let Lt=r.convert(G.format,G.colorSpace),vt=r.convert(G.type),At=y(G.internalFormat,Lt,vt,G.colorSpace),oe=i.get(E),lt=i.get(G);if(lt.__renderTarget=E,!oe.__hasExternalTextures){let Rt=Math.max(1,E.width>>et),qt=Math.max(1,E.height>>et);rt===e.TEXTURE_3D||rt===e.TEXTURE_2D_ARRAY?n.texImage3D(rt,et,At,Rt,qt,E.depth,0,Lt,vt,null):n.texImage2D(rt,et,At,Rt,qt,0,Lt,vt,null)}n.bindFramebuffer(e.FRAMEBUFFER,C),_t(E)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Q,rt,lt.__webglTexture,0,ot(E)):(rt===e.TEXTURE_2D||rt>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Q,rt,lt.__webglTexture,et),n.bindFramebuffer(e.FRAMEBUFFER,null)}function tt(C,E,G){if(e.bindRenderbuffer(e.RENDERBUFFER,C),E.depthBuffer){let Q=E.depthTexture,rt=Q&&Q.isDepthTexture?Q.type:null,et=b(E.stencilBuffer,rt),Lt=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,vt=ot(E);_t(E)?a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,vt,et,E.width,E.height):G?e.renderbufferStorageMultisample(e.RENDERBUFFER,vt,et,E.width,E.height):e.renderbufferStorage(e.RENDERBUFFER,et,E.width,E.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Lt,e.RENDERBUFFER,C)}else{let Q=E.textures;for(let rt=0;rt<Q.length;rt++){let et=Q[rt],Lt=r.convert(et.format,et.colorSpace),vt=r.convert(et.type),At=y(et.internalFormat,Lt,vt,et.colorSpace),oe=ot(E);G&&_t(E)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,oe,At,E.width,E.height):_t(E)?a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,oe,At,E.width,E.height):e.renderbufferStorage(e.RENDERBUFFER,At,E.width,E.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function gt(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=i.get(E.depthTexture);Q.__renderTarget=E,(!Q.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),W(E.depthTexture,0);let rt=Q.__webglTexture,et=ot(E);if(E.depthTexture.format===vr)_t(E)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,rt,0,et):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,rt,0);else if(E.depthTexture.format===wr)_t(E)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,rt,0,et):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function St(C){let E=i.get(C),G=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){let Q=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),Q){let rt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,Q.removeEventListener("dispose",rt)};Q.addEventListener("dispose",rt),E.__depthDisposeCallback=rt}E.__boundDepthTexture=Q}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");gt(E.__webglFramebuffer,C)}else if(G){E.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(n.bindFramebuffer(e.FRAMEBUFFER,E.__webglFramebuffer[Q]),E.__webglDepthbuffer[Q]===void 0)E.__webglDepthbuffer[Q]=e.createRenderbuffer(),tt(E.__webglDepthbuffer[Q],C,!1);else{let rt=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,et=E.__webglDepthbuffer[Q];e.bindRenderbuffer(e.RENDERBUFFER,et),e.framebufferRenderbuffer(e.FRAMEBUFFER,rt,e.RENDERBUFFER,et)}}else if(n.bindFramebuffer(e.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=e.createRenderbuffer(),tt(E.__webglDepthbuffer,C,!1);else{let Q=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,rt=E.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,rt),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,rt)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function xt(C,E,G){let Q=i.get(C);E!==void 0&&st(Q.__webglFramebuffer,C,C.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),G!==void 0&&St(C)}function Ht(C){let E=C.texture,G=i.get(C),Q=i.get(E);C.addEventListener("dispose",A);let rt=C.textures,et=C.isWebGLCubeRenderTarget===!0,Lt=rt.length>1;if(Lt||(Q.__webglTexture===void 0&&(Q.__webglTexture=e.createTexture()),Q.__version=E.version,o.memory.textures++),et){G.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer[vt]=[];for(let At=0;At<E.mipmaps.length;At++)G.__webglFramebuffer[vt][At]=e.createFramebuffer()}else G.__webglFramebuffer[vt]=e.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer=[];for(let vt=0;vt<E.mipmaps.length;vt++)G.__webglFramebuffer[vt]=e.createFramebuffer()}else G.__webglFramebuffer=e.createFramebuffer();if(Lt)for(let vt=0,At=rt.length;vt<At;vt++){let oe=i.get(rt[vt]);oe.__webglTexture===void 0&&(oe.__webglTexture=e.createTexture(),o.memory.textures++)}if(C.samples>0&&_t(C)===!1){G.__webglMultisampledFramebuffer=e.createFramebuffer(),G.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let vt=0;vt<rt.length;vt++){let At=rt[vt];G.__webglColorRenderbuffer[vt]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,G.__webglColorRenderbuffer[vt]);let oe=r.convert(At.format,At.colorSpace),lt=r.convert(At.type),Rt=y(At.internalFormat,oe,lt,At.colorSpace,C.isXRRenderTarget===!0),qt=ot(C);e.renderbufferStorageMultisample(e.RENDERBUFFER,qt,Rt,C.width,C.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+vt,e.RENDERBUFFER,G.__webglColorRenderbuffer[vt])}e.bindRenderbuffer(e.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=e.createRenderbuffer(),tt(G.__webglDepthRenderbuffer,C,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(et){n.bindTexture(e.TEXTURE_CUBE_MAP,Q.__webglTexture),ft(e.TEXTURE_CUBE_MAP,E);for(let vt=0;vt<6;vt++)if(E.mipmaps&&E.mipmaps.length>0)for(let At=0;At<E.mipmaps.length;At++)st(G.__webglFramebuffer[vt][At],C,E,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,At);else st(G.__webglFramebuffer[vt],C,E,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);m(E)&&g(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Lt){for(let vt=0,At=rt.length;vt<At;vt++){let oe=rt[vt],lt=i.get(oe);n.bindTexture(e.TEXTURE_2D,lt.__webglTexture),ft(e.TEXTURE_2D,oe),st(G.__webglFramebuffer,C,oe,e.COLOR_ATTACHMENT0+vt,e.TEXTURE_2D,0),m(oe)&&g(e.TEXTURE_2D)}n.unbindTexture()}else{let vt=e.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(vt=C.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(vt,Q.__webglTexture),ft(vt,E),E.mipmaps&&E.mipmaps.length>0)for(let At=0;At<E.mipmaps.length;At++)st(G.__webglFramebuffer[At],C,E,e.COLOR_ATTACHMENT0,vt,At);else st(G.__webglFramebuffer,C,E,e.COLOR_ATTACHMENT0,vt,0);m(E)&&g(vt),n.unbindTexture()}C.depthBuffer&&St(C)}function K(C){let E=C.textures;for(let G=0,Q=E.length;G<Q;G++){let rt=E[G];if(m(rt)){let et=_(C),Lt=i.get(rt).__webglTexture;n.bindTexture(et,Lt),g(et),n.unbindTexture()}}}let at=[],z=[];function zt(C){if(C.samples>0){if(_t(C)===!1){let E=C.textures,G=C.width,Q=C.height,rt=e.COLOR_BUFFER_BIT,et=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Lt=i.get(C),vt=E.length>1;if(vt)for(let At=0;At<E.length;At++)n.bindFramebuffer(e.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+At,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,Lt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+At,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let At=0;At<E.length;At++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(rt|=e.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(rt|=e.STENCIL_BUFFER_BIT)),vt){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Lt.__webglColorRenderbuffer[At]);let oe=i.get(E[At]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,oe,0)}e.blitFramebuffer(0,0,G,Q,0,0,G,Q,rt,e.NEAREST),c===!0&&(at.length=0,z.length=0,at.push(e.COLOR_ATTACHMENT0+At),C.depthBuffer&&C.resolveDepthBuffer===!1&&(at.push(et),z.push(et),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,z)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,at))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),vt)for(let At=0;At<E.length;At++){n.bindFramebuffer(e.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+At,e.RENDERBUFFER,Lt.__webglColorRenderbuffer[At]);let oe=i.get(E[At]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,Lt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+At,e.TEXTURE_2D,oe,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let E=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[E])}}}function ot(C){return Math.min(s.maxSamples,C.samples)}function _t(C){let E=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function pt(C){let E=o.render.frame;l.get(C)!==E&&(l.set(C,E),C.update())}function Xt(C,E){let G=C.colorSpace,Q=C.format,rt=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||G!==Dr&&G!==Ki&&(ue.getTransfer(G)===_e?(Q!==xn||rt!==Sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),E}function wt(C){return typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement?(h.width=C.naturalWidth||C.width,h.height=C.naturalHeight||C.height):typeof VideoFrame!="undefined"&&C instanceof VideoFrame?(h.width=C.displayWidth,h.height=C.displayHeight):(h.width=C.width,h.height=C.height),h}this.allocateTextureUnit=U,this.resetTextureUnits=L,this.setTexture2D=W,this.setTexture2DArray=H,this.setTexture3D=nt,this.setTextureCube=V,this.rebindTextures=xt,this.setupRenderTarget=Ht,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=st,this.useMultisampledRTT=_t}function u2(e,t){function n(i,s=Ki){let r,o=ue.getTransfer(s);if(i===Sn)return e.UNSIGNED_BYTE;if(i===hu)return e.UNSIGNED_SHORT_4_4_4_4;if(i===uu)return e.UNSIGNED_SHORT_5_5_5_1;if(i===jd)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Zd)return e.BYTE;if(i===Jd)return e.SHORT;if(i===go)return e.UNSIGNED_SHORT;if(i===lu)return e.INT;if(i===Ps)return e.UNSIGNED_INT;if(i===mi)return e.FLOAT;if(i===wo)return e.HALF_FLOAT;if(i===Kd)return e.ALPHA;if(i===Qd)return e.RGB;if(i===xn)return e.RGBA;if(i===t0)return e.LUMINANCE;if(i===e0)return e.LUMINANCE_ALPHA;if(i===vr)return e.DEPTH_COMPONENT;if(i===wr)return e.DEPTH_STENCIL;if(i===Ao)return e.RED;if(i===fu)return e.RED_INTEGER;if(i===n0)return e.RG;if(i===du)return e.RG_INTEGER;if(i===pu)return e.RGBA_INTEGER;if(i===wa||i===Aa||i===Ra||i===Ca)if(o===_e)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===wa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===wa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Wl||i===Xl||i===ql||i===Yl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Wl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Xl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ql)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Yl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===$l||i===Zl||i===Jl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===$l||i===Zl)return o===_e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Jl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===jl||i===Kl||i===Ql||i===th||i===eh||i===nh||i===ih||i===sh||i===rh||i===oh||i===ah||i===ch||i===lh||i===hh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===jl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Kl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ql)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===th)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===eh)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===nh)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ih)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===sh)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===rh)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===oh)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ah)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ch)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===lh)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===hh)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Pa||i===uh||i===fh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Pa)return o===_e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===uh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===fh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===i0||i===dh||i===ph||i===mh)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Pa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===dh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ph)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Tr?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var Ih=class extends gn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Ui=class extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}},f2={type:"move"},fo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,h=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(h&&t.hand){o=!0;for(let v of t.hand.values()){let m=n.getJointPose(v,i),g=this._getHandJoint(h,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let l=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],f=l.position.distanceTo(u.position),d=.02,p=.005;h.inputState.pinching&&f>d+p?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&f<=d-p&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=n.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(f2)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new Ui;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}},d2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,p2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,zh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,i){if(this.texture===null){let s=new En,r=t.properties.get(s);r.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new wn({vertexShader:d2,fragmentShader:p2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ae(new is(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Lh=class extends ns{constructor(t,n){super();let i=this,s=null,r=1,o=null,a="local-floor",c=1,h=null,l=null,u=null,f=null,d=null,p=null,v=new zh,m=n.getContextAttributes(),g=null,_=null,y=[],b=[],R=new ct,w=null,A=new gn;A.viewport=new Be;let P=new gn;P.viewport=new Be;let S=[A,P],M=new Ih,I=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let B=y[Y];return B===void 0&&(B=new fo,y[Y]=B),B.getTargetRaySpace()},this.getControllerGrip=function(Y){let B=y[Y];return B===void 0&&(B=new fo,y[Y]=B),B.getGripSpace()},this.getHand=function(Y){let B=y[Y];return B===void 0&&(B=new fo,y[Y]=B),B.getHandSpace()};function U(Y){let B=b.indexOf(Y.inputSource);if(B===-1)return;let st=y[B];st!==void 0&&(st.update(Y.inputSource,Y.frame,h||o),st.dispatchEvent({type:Y.type,data:Y.inputSource}))}function D(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",W);for(let Y=0;Y<y.length;Y++){let B=b[Y];B!==null&&(b[Y]=null,y[Y].disconnect(B))}I=null,L=null,v.reset(),t.setRenderTarget(g),d=null,f=null,u=null,s=null,_=null,Tt.stop(),i.isPresenting=!1,t.setPixelRatio(w),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(Y){h=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(g=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",D),s.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await n.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){let B={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,n,B),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Ni(d.framebufferWidth,d.framebufferHeight,{format:xn,type:Sn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let B=null,st=null,tt=null;m.depth&&(tt=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,B=m.stencil?wr:vr,st=m.stencil?Tr:Ps);let gt={colorFormat:n.RGBA8,depthFormat:tt,scaleFactor:r};u=new XRWebGLBinding(s,n),f=u.createProjectionLayer(gt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new Ni(f.textureWidth,f.textureHeight,{format:xn,type:Sn,depthTexture:new Ha(f.textureWidth,f.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,B),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),h=null,o=await s.requestReferenceSpace(a),Tt.setContext(s),Tt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function W(Y){for(let B=0;B<Y.removed.length;B++){let st=Y.removed[B],tt=b.indexOf(st);tt>=0&&(b[tt]=null,y[tt].disconnect(st))}for(let B=0;B<Y.added.length;B++){let st=Y.added[B],tt=b.indexOf(st);if(tt===-1){for(let St=0;St<y.length;St++)if(St>=b.length){b.push(st),tt=St;break}else if(b[St]===null){b[St]=st,tt=St;break}if(tt===-1)break}let gt=y[tt];gt&&gt.connect(st)}}let H=new N,nt=new N;function V(Y,B,st){H.setFromMatrixPosition(B.matrixWorld),nt.setFromMatrixPosition(st.matrixWorld);let tt=H.distanceTo(nt),gt=B.projectionMatrix.elements,St=st.projectionMatrix.elements,xt=gt[14]/(gt[10]-1),Ht=gt[14]/(gt[10]+1),K=(gt[9]+1)/gt[5],at=(gt[9]-1)/gt[5],z=(gt[8]-1)/gt[0],zt=(St[8]+1)/St[0],ot=xt*z,_t=xt*zt,pt=tt/(-z+zt),Xt=pt*-z;if(B.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Xt),Y.translateZ(pt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),gt[10]===-1)Y.projectionMatrix.copy(B.projectionMatrix),Y.projectionMatrixInverse.copy(B.projectionMatrixInverse);else{let wt=xt+pt,C=Ht+pt,E=ot-Xt,G=_t+(tt-Xt),Q=K*Ht/C*wt,rt=at*Ht/C*wt;Y.projectionMatrix.makePerspective(E,G,Q,rt,wt,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Z(Y,B){B===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(B.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let B=Y.near,st=Y.far;v.texture!==null&&(v.depthNear>0&&(B=v.depthNear),v.depthFar>0&&(st=v.depthFar)),M.near=P.near=A.near=B,M.far=P.far=A.far=st,(I!==M.near||L!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,L=M.far),A.layers.mask=Y.layers.mask|2,P.layers.mask=Y.layers.mask|4,M.layers.mask=A.layers.mask|P.layers.mask;let tt=Y.parent,gt=M.cameras;Z(M,tt);for(let St=0;St<gt.length;St++)Z(gt[St],tt);gt.length===2?V(M,A,P):M.projectionMatrix.copy(A.projectionMatrix),J(Y,M,tt)};function J(Y,B,st){st===null?Y.matrix.copy(B.matrixWorld):(Y.matrix.copy(st.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(B.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(B.projectionMatrix),Y.projectionMatrixInverse.copy(B.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=xh*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let j=null;function ft(Y,B){if(l=B.getViewerPose(h||o),p=B,l!==null){let st=l.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let tt=!1;st.length!==M.cameras.length&&(M.cameras.length=0,tt=!0);for(let St=0;St<st.length;St++){let xt=st[St],Ht=null;if(d!==null)Ht=d.getViewport(xt);else{let at=u.getViewSubImage(f,xt);Ht=at.viewport,St===0&&(t.setRenderTargetTextures(_,at.colorTexture,f.ignoreDepthValues?void 0:at.depthStencilTexture),t.setRenderTarget(_))}let K=S[St];K===void 0&&(K=new gn,K.layers.enable(St),K.viewport=new Be,S[St]=K),K.matrix.fromArray(xt.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(xt.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(Ht.x,Ht.y,Ht.width,Ht.height),St===0&&(M.matrix.copy(K.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),tt===!0&&M.cameras.push(K)}let gt=s.enabledFeatures;if(gt&&gt.includes("depth-sensing")){let St=u.getDepthInformation(st[0]);St&&St.isValid&&St.texture&&v.init(t,St,s.renderState)}}for(let st=0;st<y.length;st++){let tt=b[st],gt=y[st];tt!==null&&gt!==void 0&&gt.update(tt,B,h||o)}j&&j(Y,B),B.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:B}),p=null}let Tt=new c0;Tt.setAnimationLoop(ft),this.setAnimationLoop=function(Y){j=Y},this.dispose=function(){}}},Ss=new Fe,m2=new re;function g2(e,t){function n(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,a0(e)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,_,y,b){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(m,g):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),l(m,g)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,b)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),v(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?c(m,g,_,y):g.isSpriteMaterial?h(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,n(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,n(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===un&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,n(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===un&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,n(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,n(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,n(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let _=t.get(g),y=_.envMap,b=_.envMapRotation;y&&(m.envMap.value=y,Ss.copy(b),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),m.envMapRotation.value.setFromMatrix4(m2.makeRotationFromEuler(Ss)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,n(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,n(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,n(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,_,y){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*_,m.scale.value=y*.5,g.map&&(m.map.value=g.map,n(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,n(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,n(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,n(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,_){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,n(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,n(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,n(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,n(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,n(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===un&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,n(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,n(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,n(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,n(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,n(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,n(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,n(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){let _=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function x2(e,t,n,i){let s={},r={},o=[],a=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,y){let b=y.program;i.uniformBlockBinding(_,b)}function h(_,y){let b=s[_.id];b===void 0&&(p(_),b=l(_),s[_.id]=b,_.addEventListener("dispose",m));let R=y.program;i.updateUBOMapping(_,R);let w=t.render.frame;r[_.id]!==w&&(f(_),r[_.id]=w)}function l(_){let y=u();_.__bindingPointIndex=y;let b=e.createBuffer(),R=_.__size,w=_.usage;return e.bindBuffer(e.UNIFORM_BUFFER,b),e.bufferData(e.UNIFORM_BUFFER,R,w),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,y,b),b}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let y=s[_.id],b=_.uniforms,R=_.__cache;e.bindBuffer(e.UNIFORM_BUFFER,y);for(let w=0,A=b.length;w<A;w++){let P=Array.isArray(b[w])?b[w]:[b[w]];for(let S=0,M=P.length;S<M;S++){let I=P[S];if(d(I,w,S,R)===!0){let L=I.__offset,U=Array.isArray(I.value)?I.value:[I.value],D=0;for(let W=0;W<U.length;W++){let H=U[W],nt=v(H);typeof H=="number"||typeof H=="boolean"?(I.__data[0]=H,e.bufferSubData(e.UNIFORM_BUFFER,L+D,I.__data)):H.isMatrix3?(I.__data[0]=H.elements[0],I.__data[1]=H.elements[1],I.__data[2]=H.elements[2],I.__data[3]=0,I.__data[4]=H.elements[3],I.__data[5]=H.elements[4],I.__data[6]=H.elements[5],I.__data[7]=0,I.__data[8]=H.elements[6],I.__data[9]=H.elements[7],I.__data[10]=H.elements[8],I.__data[11]=0):(H.toArray(I.__data,D),D+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,L,I.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(_,y,b,R){let w=_.value,A=y+"_"+b;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{let P=R[A];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return R[A]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function p(_){let y=_.uniforms,b=0,R=16;for(let A=0,P=y.length;A<P;A++){let S=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,I=S.length;M<I;M++){let L=S[M],U=Array.isArray(L.value)?L.value:[L.value];for(let D=0,W=U.length;D<W;D++){let H=U[D],nt=v(H),V=b%R,Z=V%nt.boundary,J=V+Z;b+=Z,J!==0&&R-J<nt.storage&&(b+=R-J),L.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=b,b+=nt.storage}}}let w=b%R;return w>0&&(b+=R-w),_.__size=b,_.__cache={},this}function v(_){let y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function m(_){let y=_.target;y.removeEventListener("dispose",m);let b=o.indexOf(y.__bindingPointIndex);o.splice(b,1),e.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function g(){for(let _ in s)e.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:h,dispose:g}}var Va=class{constructor(t={}){let{canvas:n=bm(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext!="undefined"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;let p=new Uint32Array(4),v=new Int32Array(4),m=null,g=null,_=[],y=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ue,this.toneMapping=ts,this.toneMappingExposure=1;let b=this,R=!1,w=0,A=0,P=null,S=-1,M=null,I=new Be,L=new Be,U=null,D=new Vt(0),W=0,H=n.width,nt=n.height,V=1,Z=null,J=null,j=new Be(0,0,H,nt),ft=new Be(0,0,H,nt),Tt=!1,Y=new Is,B=!1,st=!1,tt=new re,gt=new re,St=new N,xt=new Be,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},K=!1;function at(){return P===null?V:1}let z=i;function zt(T,O){return n.getContext(T,O)}try{let T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:l,failIfMajorPerformanceCaveat:u};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${ou}`),n.addEventListener("webglcontextlost",it,!1),n.addEventListener("webglcontextrestored",Et,!1),n.addEventListener("webglcontextcreationerror",bt,!1),z===null){let O="webgl2";if(z=zt(O,T),z===null)throw zt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ot,_t,pt,Xt,wt,C,E,G,Q,rt,et,Lt,vt,At,oe,lt,Rt,qt,Zt,Ct,le,ie,Se,F;function yt(){ot=new L1(z),ot.init(),ie=new u2(z,ot),_t=new A1(z,ot,t,ie),pt=new c2(z,ot),_t.reverseDepthBuffer&&f&&pt.buffers.depth.setReversed(!0),Xt=new N1(z),wt=new Zv,C=new h2(z,ot,pt,wt,_t,ie,Xt),E=new C1(b),G=new z1(b),Q=new Gm(z),Se=new T1(z,Q),rt=new U1(z,Q,Xt,Se),et=new F1(z,rt,Q,Xt),Zt=new B1(z,_t,C),lt=new R1(wt),Lt=new $v(b,E,G,ot,_t,Se,lt),vt=new g2(b,wt),At=new jv,oe=new i2(ot),qt=new E1(b,E,G,pt,et,d,c),Rt=new o2(b,et,_t),F=new x2(z,Xt,_t,pt),Ct=new w1(z,ot,Xt),le=new D1(z,ot,Xt),Xt.programs=Lt.programs,b.capabilities=_t,b.extensions=ot,b.properties=wt,b.renderLists=At,b.shadowMap=Rt,b.state=pt,b.info=Xt}yt();let $=new Lh(b,z);this.xr=$,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let T=ot.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=ot.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(T){T!==void 0&&(V=T,this.setSize(H,nt,!1))},this.getSize=function(T){return T.set(H,nt)},this.setSize=function(T,O,X=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=T,nt=O,n.width=Math.floor(T*V),n.height=Math.floor(O*V),X===!0&&(n.style.width=T+"px",n.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(H*V,nt*V).floor()},this.setDrawingBufferSize=function(T,O,X){H=T,nt=O,V=X,n.width=Math.floor(T*X),n.height=Math.floor(O*X),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(j)},this.setViewport=function(T,O,X,q){T.isVector4?j.set(T.x,T.y,T.z,T.w):j.set(T,O,X,q),pt.viewport(I.copy(j).multiplyScalar(V).round())},this.getScissor=function(T){return T.copy(ft)},this.setScissor=function(T,O,X,q){T.isVector4?ft.set(T.x,T.y,T.z,T.w):ft.set(T,O,X,q),pt.scissor(L.copy(ft).multiplyScalar(V).round())},this.getScissorTest=function(){return Tt},this.setScissorTest=function(T){pt.setScissorTest(Tt=T)},this.setOpaqueSort=function(T){Z=T},this.setTransparentSort=function(T){J=T},this.getClearColor=function(T){return T.copy(qt.getClearColor())},this.setClearColor=function(){qt.setClearColor.apply(qt,arguments)},this.getClearAlpha=function(){return qt.getClearAlpha()},this.setClearAlpha=function(){qt.setClearAlpha.apply(qt,arguments)},this.clear=function(T=!0,O=!0,X=!0){let q=0;if(T){let k=!1;if(P!==null){let dt=P.texture.format;k=dt===pu||dt===du||dt===fu}if(k){let dt=P.texture.type,Mt=dt===Sn||dt===Ps||dt===go||dt===Tr||dt===hu||dt===uu,Ut=qt.getClearColor(),Dt=qt.getClearAlpha(),Jt=Ut.r,ee=Ut.g,Nt=Ut.b;Mt?(p[0]=Jt,p[1]=ee,p[2]=Nt,p[3]=Dt,z.clearBufferuiv(z.COLOR,0,p)):(v[0]=Jt,v[1]=ee,v[2]=Nt,v[3]=Dt,z.clearBufferiv(z.COLOR,0,v))}else q|=z.COLOR_BUFFER_BIT}O&&(q|=z.DEPTH_BUFFER_BIT),X&&(q|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",it,!1),n.removeEventListener("webglcontextrestored",Et,!1),n.removeEventListener("webglcontextcreationerror",bt,!1),At.dispose(),oe.dispose(),wt.dispose(),E.dispose(),G.dispose(),et.dispose(),Se.dispose(),F.dispose(),Lt.dispose(),$.dispose(),$.removeEventListener("sessionstart",Sf),$.removeEventListener("sessionend",Ef),xs.stop()};function it(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Et(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let T=Xt.autoReset,O=Rt.enabled,X=Rt.autoUpdate,q=Rt.needsUpdate,k=Rt.type;yt(),Xt.autoReset=T,Rt.enabled=O,Rt.autoUpdate=X,Rt.needsUpdate=q,Rt.type=k}function bt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function te(T){let O=T.target;O.removeEventListener("dispose",te),Ne(O)}function Ne(T){cn(T),wt.remove(T)}function cn(T){let O=wt.get(T).programs;O!==void 0&&(O.forEach(function(X){Lt.releaseProgram(X)}),T.isShaderMaterial&&Lt.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,X,q,k,dt){O===null&&(O=Ht);let Mt=k.isMesh&&k.matrixWorld.determinant()<0,Ut=Ip(T,O,X,q,k);pt.setMaterial(q,Mt);let Dt=X.index,Jt=1;if(q.wireframe===!0){if(Dt=rt.getWireframeAttribute(X),Dt===void 0)return;Jt=2}let ee=X.drawRange,Nt=X.attributes.position,fe=ee.start*Jt,Ee=(ee.start+ee.count)*Jt;dt!==null&&(fe=Math.max(fe,dt.start*Jt),Ee=Math.min(Ee,(dt.start+dt.count)*Jt)),Dt!==null?(fe=Math.max(fe,0),Ee=Math.min(Ee,Dt.count)):Nt!=null&&(fe=Math.max(fe,0),Ee=Math.min(Ee,Nt.count));let we=Ee-fe;if(we<0||we===1/0)return;Se.setup(k,q,Ut,X,Dt);let bn,ge=Ct;if(Dt!==null&&(bn=Q.get(Dt),ge=le,ge.setIndex(bn)),k.isMesh)q.wireframe===!0?(pt.setLineWidth(q.wireframeLinewidth*at()),ge.setMode(z.LINES)):ge.setMode(z.TRIANGLES);else if(k.isLine){let Bt=q.linewidth;Bt===void 0&&(Bt=1),pt.setLineWidth(Bt*at()),k.isLineSegments?ge.setMode(z.LINES):k.isLineLoop?ge.setMode(z.LINE_LOOP):ge.setMode(z.LINE_STRIP)}else k.isPoints?ge.setMode(z.POINTS):k.isSprite&&ge.setMode(z.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ge.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(ot.get("WEBGL_multi_draw"))ge.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Bt=k._multiDrawStarts,wi=k._multiDrawCounts,xe=k._multiDrawCount,Kn=Dt?Q.get(Dt).bytesPerElement:1,Qs=wt.get(q).currentProgram.getUniforms();for(let Dn=0;Dn<xe;Dn++)Qs.setValue(z,"_gl_DrawID",Dn),ge.render(Bt[Dn]/Kn,wi[Dn])}else if(k.isInstancedMesh)ge.renderInstances(fe,we,k.count);else if(X.isInstancedBufferGeometry){let Bt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,wi=Math.min(X.instanceCount,Bt);ge.renderInstances(fe,we,wi)}else ge.render(fe,we)};function ye(T,O,X){T.transparent===!0&&T.side===ii&&T.forceSinglePass===!1?(T.side=un,T.needsUpdate=!0,Zo(T,O,X),T.side=es,T.needsUpdate=!0,Zo(T,O,X),T.side=ii):Zo(T,O,X)}this.compile=function(T,O,X=null){X===null&&(X=T),g=oe.get(X),g.init(O),y.push(g),X.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(g.pushLight(k),k.castShadow&&g.pushShadow(k))}),T!==X&&T.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(g.pushLight(k),k.castShadow&&g.pushShadow(k))}),g.setupLights();let q=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let dt=k.material;if(dt)if(Array.isArray(dt))for(let Mt=0;Mt<dt.length;Mt++){let Ut=dt[Mt];ye(Ut,X,k),q.add(Ut)}else ye(dt,X,k),q.add(dt)}),y.pop(),g=null,q},this.compileAsync=function(T,O,X=null){let q=this.compile(T,O,X);return new Promise(k=>{function dt(){if(q.forEach(function(Mt){wt.get(Mt).currentProgram.isReady()&&q.delete(Mt)}),q.size===0){k(T);return}setTimeout(dt,10)}ot.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let jn=null;function Ti(T){jn&&jn(T)}function Sf(){xs.stop()}function Ef(){xs.start()}let xs=new c0;xs.setAnimationLoop(Ti),typeof self!="undefined"&&xs.setContext(self),this.setAnimationLoop=function(T){jn=T,$.setAnimationLoop(T),T===null?xs.stop():xs.start()},$.addEventListener("sessionstart",Sf),$.addEventListener("sessionend",Ef),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(O),O=$.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,O,P),g=oe.get(T,y.length),g.init(O),y.push(g),gt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Y.setFromProjectionMatrix(gt),st=this.localClippingEnabled,B=lt.init(this.clippingPlanes,st),m=At.get(T,_.length),m.init(),_.push(m),$.enabled===!0&&$.isPresenting===!0){let dt=b.xr.getDepthSensingMesh();dt!==null&&Jc(dt,O,-1/0,b.sortObjects)}Jc(T,O,0,b.sortObjects),m.finish(),b.sortObjects===!0&&m.sort(Z,J),K=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,K&&qt.addToRenderList(m,T),this.info.render.frame++,B===!0&&lt.beginShadows();let X=g.state.shadowsArray;Rt.render(X,T,O),B===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();let q=m.opaque,k=m.transmissive;if(g.setupLights(),O.isArrayCamera){let dt=O.cameras;if(k.length>0)for(let Mt=0,Ut=dt.length;Mt<Ut;Mt++){let Dt=dt[Mt];wf(q,k,T,Dt)}K&&qt.render(T);for(let Mt=0,Ut=dt.length;Mt<Ut;Mt++){let Dt=dt[Mt];Tf(m,T,Dt,Dt.viewport)}}else k.length>0&&wf(q,k,T,O),K&&qt.render(T),Tf(m,T,O);P!==null&&(C.updateMultisampleRenderTarget(P),C.updateRenderTargetMipmap(P)),T.isScene===!0&&T.onAfterRender(b,T,O),Se.resetDefaultState(),S=-1,M=null,y.pop(),y.length>0?(g=y[y.length-1],B===!0&&lt.setGlobalState(b.clippingPlanes,g.state.camera)):g=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function Jc(T,O,X,q){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Y.intersectsSprite(T)){q&&xt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(gt);let Mt=et.update(T),Ut=T.material;Ut.visible&&m.push(T,Mt,Ut,X,xt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Y.intersectsObject(T))){let Mt=et.update(T),Ut=T.material;if(q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),xt.copy(T.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),xt.copy(Mt.boundingSphere.center)),xt.applyMatrix4(T.matrixWorld).applyMatrix4(gt)),Array.isArray(Ut)){let Dt=Mt.groups;for(let Jt=0,ee=Dt.length;Jt<ee;Jt++){let Nt=Dt[Jt],fe=Ut[Nt.materialIndex];fe&&fe.visible&&m.push(T,Mt,fe,X,xt.z,Nt)}}else Ut.visible&&m.push(T,Mt,Ut,X,xt.z,null)}}let dt=T.children;for(let Mt=0,Ut=dt.length;Mt<Ut;Mt++)Jc(dt[Mt],O,X,q)}function Tf(T,O,X,q){let k=T.opaque,dt=T.transmissive,Mt=T.transparent;g.setupLightsView(X),B===!0&&lt.setGlobalState(b.clippingPlanes,X),q&&pt.viewport(I.copy(q)),k.length>0&&$o(k,O,X),dt.length>0&&$o(dt,O,X),Mt.length>0&&$o(Mt,O,X),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function wf(T,O,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[q.id]===void 0&&(g.state.transmissionRenderTarget[q.id]=new Ni(1,1,{generateMipmaps:!0,type:ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float")?wo:Sn,minFilter:Cs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ue.workingColorSpace}));let dt=g.state.transmissionRenderTarget[q.id],Mt=q.viewport||I;dt.setSize(Mt.z,Mt.w);let Ut=b.getRenderTarget();b.setRenderTarget(dt),b.getClearColor(D),W=b.getClearAlpha(),W<1&&b.setClearColor(16777215,.5),b.clear(),K&&qt.render(X);let Dt=b.toneMapping;b.toneMapping=ts;let Jt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),g.setupLightsView(q),B===!0&&lt.setGlobalState(b.clippingPlanes,q),$o(T,X,q),C.updateMultisampleRenderTarget(dt),C.updateRenderTargetMipmap(dt),ot.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let Nt=0,fe=O.length;Nt<fe;Nt++){let Ee=O[Nt],we=Ee.object,bn=Ee.geometry,ge=Ee.material,Bt=Ee.group;if(ge.side===ii&&we.layers.test(q.layers)){let wi=ge.side;ge.side=un,ge.needsUpdate=!0,Af(we,X,q,bn,ge,Bt),ge.side=wi,ge.needsUpdate=!0,ee=!0}}ee===!0&&(C.updateMultisampleRenderTarget(dt),C.updateRenderTargetMipmap(dt))}b.setRenderTarget(Ut),b.setClearColor(D,W),Jt!==void 0&&(q.viewport=Jt),b.toneMapping=Dt}function $o(T,O,X){let q=O.isScene===!0?O.overrideMaterial:null;for(let k=0,dt=T.length;k<dt;k++){let Mt=T[k],Ut=Mt.object,Dt=Mt.geometry,Jt=q===null?Mt.material:q,ee=Mt.group;Ut.layers.test(X.layers)&&Af(Ut,O,X,Dt,Jt,ee)}}function Af(T,O,X,q,k,dt){T.onBeforeRender(b,O,X,q,k,dt),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(b,O,X,q,T,dt),k.transparent===!0&&k.side===ii&&k.forceSinglePass===!1?(k.side=un,k.needsUpdate=!0,b.renderBufferDirect(X,O,q,k,T,dt),k.side=es,k.needsUpdate=!0,b.renderBufferDirect(X,O,q,k,T,dt),k.side=ii):b.renderBufferDirect(X,O,q,k,T,dt),T.onAfterRender(b,O,X,q,k,dt)}function Zo(T,O,X){O.isScene!==!0&&(O=Ht);let q=wt.get(T),k=g.state.lights,dt=g.state.shadowsArray,Mt=k.state.version,Ut=Lt.getParameters(T,k.state,dt,O,X),Dt=Lt.getProgramCacheKey(Ut),Jt=q.programs;q.environment=T.isMeshStandardMaterial?O.environment:null,q.fog=O.fog,q.envMap=(T.isMeshStandardMaterial?G:E).get(T.envMap||q.environment),q.envMapRotation=q.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,Jt===void 0&&(T.addEventListener("dispose",te),Jt=new Map,q.programs=Jt);let ee=Jt.get(Dt);if(ee!==void 0){if(q.currentProgram===ee&&q.lightsStateVersion===Mt)return Cf(T,Ut),ee}else Ut.uniforms=Lt.getUniforms(T),T.onBeforeCompile(Ut,b),ee=Lt.acquireProgram(Ut,Dt),Jt.set(Dt,ee),q.uniforms=Ut.uniforms;let Nt=q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Nt.clippingPlanes=lt.uniform),Cf(T,Ut),q.needsLights=Lp(T),q.lightsStateVersion=Mt,q.needsLights&&(Nt.ambientLightColor.value=k.state.ambient,Nt.lightProbe.value=k.state.probe,Nt.directionalLights.value=k.state.directional,Nt.directionalLightShadows.value=k.state.directionalShadow,Nt.spotLights.value=k.state.spot,Nt.spotLightShadows.value=k.state.spotShadow,Nt.rectAreaLights.value=k.state.rectArea,Nt.ltc_1.value=k.state.rectAreaLTC1,Nt.ltc_2.value=k.state.rectAreaLTC2,Nt.pointLights.value=k.state.point,Nt.pointLightShadows.value=k.state.pointShadow,Nt.hemisphereLights.value=k.state.hemi,Nt.directionalShadowMap.value=k.state.directionalShadowMap,Nt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Nt.spotShadowMap.value=k.state.spotShadowMap,Nt.spotLightMatrix.value=k.state.spotLightMatrix,Nt.spotLightMap.value=k.state.spotLightMap,Nt.pointShadowMap.value=k.state.pointShadowMap,Nt.pointShadowMatrix.value=k.state.pointShadowMatrix),q.currentProgram=ee,q.uniformsList=null,ee}function Rf(T){if(T.uniformsList===null){let O=T.currentProgram.getUniforms();T.uniformsList=_r.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function Cf(T,O){let X=wt.get(T);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function Ip(T,O,X,q,k){O.isScene!==!0&&(O=Ht),C.resetTextureUnits();let dt=O.fog,Mt=q.isMeshStandardMaterial?O.environment:null,Ut=P===null?b.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Dr,Dt=(q.isMeshStandardMaterial?G:E).get(q.envMap||Mt),Jt=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,ee=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Nt=!!X.morphAttributes.position,fe=!!X.morphAttributes.normal,Ee=!!X.morphAttributes.color,we=ts;q.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(we=b.toneMapping);let bn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ge=bn!==void 0?bn.length:0,Bt=wt.get(q),wi=g.state.lights;if(B===!0&&(st===!0||T!==M)){let Vn=T===M&&q.id===S;lt.setState(q,T,Vn)}let xe=!1;q.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==wi.state.version||Bt.outputColorSpace!==Ut||k.isBatchedMesh&&Bt.batching===!1||!k.isBatchedMesh&&Bt.batching===!0||k.isBatchedMesh&&Bt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Bt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Bt.instancing===!1||!k.isInstancedMesh&&Bt.instancing===!0||k.isSkinnedMesh&&Bt.skinning===!1||!k.isSkinnedMesh&&Bt.skinning===!0||k.isInstancedMesh&&Bt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Bt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Bt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Bt.instancingMorph===!1&&k.morphTexture!==null||Bt.envMap!==Dt||q.fog===!0&&Bt.fog!==dt||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==lt.numPlanes||Bt.numIntersection!==lt.numIntersection)||Bt.vertexAlphas!==Jt||Bt.vertexTangents!==ee||Bt.morphTargets!==Nt||Bt.morphNormals!==fe||Bt.morphColors!==Ee||Bt.toneMapping!==we||Bt.morphTargetsCount!==ge)&&(xe=!0):(xe=!0,Bt.__version=q.version);let Kn=Bt.currentProgram;xe===!0&&(Kn=Zo(q,O,k));let Qs=!1,Dn=!1,to=!1,Ae=Kn.getUniforms(),di=Bt.uniforms;if(pt.useProgram(Kn.program)&&(Qs=!0,Dn=!0,to=!0),q.id!==S&&(S=q.id,Dn=!0),Qs||M!==T){pt.buffers.depth.getReversed()?(tt.copy(T.projectionMatrix),Sm(tt),Em(tt),Ae.setValue(z,"projectionMatrix",tt)):Ae.setValue(z,"projectionMatrix",T.projectionMatrix),Ae.setValue(z,"viewMatrix",T.matrixWorldInverse);let Wi=Ae.map.cameraPosition;Wi!==void 0&&Wi.setValue(z,St.setFromMatrixPosition(T.matrixWorld)),_t.logarithmicDepthBuffer&&Ae.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Ae.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Dn=!0,to=!0)}if(k.isSkinnedMesh){Ae.setOptional(z,k,"bindMatrix"),Ae.setOptional(z,k,"bindMatrixInverse");let Vn=k.skeleton;Vn&&(Vn.boneTexture===null&&Vn.computeBoneTexture(),Ae.setValue(z,"boneTexture",Vn.boneTexture,C))}k.isBatchedMesh&&(Ae.setOptional(z,k,"batchingTexture"),Ae.setValue(z,"batchingTexture",k._matricesTexture,C),Ae.setOptional(z,k,"batchingIdTexture"),Ae.setValue(z,"batchingIdTexture",k._indirectTexture,C),Ae.setOptional(z,k,"batchingColorTexture"),k._colorsTexture!==null&&Ae.setValue(z,"batchingColorTexture",k._colorsTexture,C));let eo=X.morphAttributes;if((eo.position!==void 0||eo.normal!==void 0||eo.color!==void 0)&&Zt.update(k,X,Kn),(Dn||Bt.receiveShadow!==k.receiveShadow)&&(Bt.receiveShadow=k.receiveShadow,Ae.setValue(z,"receiveShadow",k.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(di.envMap.value=Dt,di.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&O.environment!==null&&(di.envMapIntensity.value=O.environmentIntensity),Dn&&(Ae.setValue(z,"toneMappingExposure",b.toneMappingExposure),Bt.needsLights&&zp(di,to),dt&&q.fog===!0&&vt.refreshFogUniforms(di,dt),vt.refreshMaterialUniforms(di,q,V,nt,g.state.transmissionRenderTarget[T.id]),_r.upload(z,Rf(Bt),di,C)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(_r.upload(z,Rf(Bt),di,C),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Ae.setValue(z,"center",k.center),Ae.setValue(z,"modelViewMatrix",k.modelViewMatrix),Ae.setValue(z,"normalMatrix",k.normalMatrix),Ae.setValue(z,"modelMatrix",k.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let Vn=q.uniformsGroups;for(let Wi=0,Xi=Vn.length;Wi<Xi;Wi++){let Pf=Vn[Wi];F.update(Pf,Kn),F.bind(Pf,Kn)}}return Kn}function zp(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function Lp(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(T,O,X){wt.get(T.texture).__webglTexture=O,wt.get(T.depthTexture).__webglTexture=X;let q=wt.get(T);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,O){let X=wt.get(T);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,X=0){P=T,w=O,A=X;let q=!0,k=null,dt=!1,Mt=!1;if(T){let Dt=wt.get(T);if(Dt.__useDefaultFramebuffer!==void 0)pt.bindFramebuffer(z.FRAMEBUFFER,null),q=!1;else if(Dt.__webglFramebuffer===void 0)C.setupRenderTarget(T);else if(Dt.__hasExternalTextures)C.rebindTextures(T,wt.get(T.texture).__webglTexture,wt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Nt=T.depthTexture;if(Dt.__boundDepthTexture!==Nt){if(Nt!==null&&wt.has(Nt)&&(T.width!==Nt.image.width||T.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(T)}}let Jt=T.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(Mt=!0);let ee=wt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ee[O])?k=ee[O][X]:k=ee[O],dt=!0):T.samples>0&&C.useMultisampledRTT(T)===!1?k=wt.get(T).__webglMultisampledFramebuffer:Array.isArray(ee)?k=ee[X]:k=ee,I.copy(T.viewport),L.copy(T.scissor),U=T.scissorTest}else I.copy(j).multiplyScalar(V).floor(),L.copy(ft).multiplyScalar(V).floor(),U=Tt;if(pt.bindFramebuffer(z.FRAMEBUFFER,k)&&q&&pt.drawBuffers(T,k),pt.viewport(I),pt.scissor(L),pt.setScissorTest(U),dt){let Dt=wt.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+O,Dt.__webglTexture,X)}else if(Mt){let Dt=wt.get(T.texture),Jt=O||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Dt.__webglTexture,X||0,Jt)}S=-1},this.readRenderTargetPixels=function(T,O,X,q,k,dt,Mt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=wt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Mt!==void 0&&(Ut=Ut[Mt]),Ut){pt.bindFramebuffer(z.FRAMEBUFFER,Ut);try{let Dt=T.texture,Jt=Dt.format,ee=Dt.type;if(!_t.textureFormatReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-q&&X>=0&&X<=T.height-k&&z.readPixels(O,X,q,k,ie.convert(Jt),ie.convert(ee),dt)}finally{let Dt=P!==null?wt.get(P).__webglFramebuffer:null;pt.bindFramebuffer(z.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(T,O,X,q,k,dt,Mt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=wt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Mt!==void 0&&(Ut=Ut[Mt]),Ut){let Dt=T.texture,Jt=Dt.format,ee=Dt.type;if(!_t.textureFormatReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=T.width-q&&X>=0&&X<=T.height-k){pt.bindFramebuffer(z.FRAMEBUFFER,Ut);let Nt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Nt),z.bufferData(z.PIXEL_PACK_BUFFER,dt.byteLength,z.STREAM_READ),z.readPixels(O,X,q,k,ie.convert(Jt),ie.convert(ee),0);let fe=P!==null?wt.get(P).__webglFramebuffer:null;pt.bindFramebuffer(z.FRAMEBUFFER,fe);let Ee=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Mm(z,Ee,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Nt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,dt),z.deleteBuffer(Nt),z.deleteSync(Ee),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,O=null,X=0){T.isTexture!==!0&&(ho("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,T=arguments[1]);let q=Math.pow(2,-X),k=Math.floor(T.image.width*q),dt=Math.floor(T.image.height*q),Mt=O!==null?O.x:0,Ut=O!==null?O.y:0;C.setTexture2D(T,0),z.copyTexSubImage2D(z.TEXTURE_2D,X,0,0,Mt,Ut,k,dt),pt.unbindTexture()},this.copyTextureToTexture=function(T,O,X=null,q=null,k=0){T.isTexture!==!0&&(ho("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,T=arguments[1],O=arguments[2],k=arguments[3]||0,X=null);let dt,Mt,Ut,Dt,Jt,ee,Nt,fe,Ee,we=T.isCompressedTexture?T.mipmaps[k]:T.image;X!==null?(dt=X.max.x-X.min.x,Mt=X.max.y-X.min.y,Ut=X.isBox3?X.max.z-X.min.z:1,Dt=X.min.x,Jt=X.min.y,ee=X.isBox3?X.min.z:0):(dt=we.width,Mt=we.height,Ut=we.depth||1,Dt=0,Jt=0,ee=0),q!==null?(Nt=q.x,fe=q.y,Ee=q.z):(Nt=0,fe=0,Ee=0);let bn=ie.convert(O.format),ge=ie.convert(O.type),Bt;O.isData3DTexture?(C.setTexture3D(O,0),Bt=z.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(C.setTexture2DArray(O,0),Bt=z.TEXTURE_2D_ARRAY):(C.setTexture2D(O,0),Bt=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,O.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,O.unpackAlignment);let wi=z.getParameter(z.UNPACK_ROW_LENGTH),xe=z.getParameter(z.UNPACK_IMAGE_HEIGHT),Kn=z.getParameter(z.UNPACK_SKIP_PIXELS),Qs=z.getParameter(z.UNPACK_SKIP_ROWS),Dn=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,we.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,we.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Dt),z.pixelStorei(z.UNPACK_SKIP_ROWS,Jt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,ee);let to=T.isDataArrayTexture||T.isData3DTexture,Ae=O.isDataArrayTexture||O.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){let di=wt.get(T),eo=wt.get(O),Vn=wt.get(di.__renderTarget),Wi=wt.get(eo.__renderTarget);pt.bindFramebuffer(z.READ_FRAMEBUFFER,Vn.__webglFramebuffer),pt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Wi.__webglFramebuffer);for(let Xi=0;Xi<Ut;Xi++)to&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,wt.get(T).__webglTexture,k,ee+Xi),T.isDepthTexture?(Ae&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,wt.get(O).__webglTexture,k,Ee+Xi),z.blitFramebuffer(Dt,Jt,dt,Mt,Nt,fe,dt,Mt,z.DEPTH_BUFFER_BIT,z.NEAREST)):Ae?z.copyTexSubImage3D(Bt,k,Nt,fe,Ee+Xi,Dt,Jt,dt,Mt):z.copyTexSubImage2D(Bt,k,Nt,fe,Ee+Xi,Dt,Jt,dt,Mt);pt.bindFramebuffer(z.READ_FRAMEBUFFER,null),pt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Ae?T.isDataTexture||T.isData3DTexture?z.texSubImage3D(Bt,k,Nt,fe,Ee,dt,Mt,Ut,bn,ge,we.data):O.isCompressedArrayTexture?z.compressedTexSubImage3D(Bt,k,Nt,fe,Ee,dt,Mt,Ut,bn,we.data):z.texSubImage3D(Bt,k,Nt,fe,Ee,dt,Mt,Ut,bn,ge,we):T.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,k,Nt,fe,dt,Mt,bn,ge,we.data):T.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,k,Nt,fe,we.width,we.height,bn,we.data):z.texSubImage2D(z.TEXTURE_2D,k,Nt,fe,dt,Mt,bn,ge,we);z.pixelStorei(z.UNPACK_ROW_LENGTH,wi),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,xe),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Kn),z.pixelStorei(z.UNPACK_SKIP_ROWS,Qs),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Dn),k===0&&O.generateMipmaps&&z.generateMipmap(Bt),pt.unbindTexture()},this.copyTextureToTexture3D=function(T,O,X=null,q=null,k=0){return T.isTexture!==!0&&(ho("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,T=arguments[2],O=arguments[3],k=arguments[4]||0),ho('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,O,X,q,k)},this.initRenderTarget=function(T){wt.get(T).__webglFramebuffer===void 0&&C.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?C.setTextureCube(T,0):T.isData3DTexture?C.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?C.setTexture2DArray(T,0):C.setTexture2D(T,0),pt.unbindTexture()},this.resetState=function(){w=0,A=0,P=null,pt.reset(),Se.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorspace=ue._getDrawingBufferColorSpace(t),n.unpackColorSpace=ue._getUnpackColorSpace()}};var Ga=class e{constructor(t,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new Vt(t),this.near=n,this.far=i}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Pr=class extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fe,this.environmentIntensity=1,this.environmentRotation=new Fe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}};var ss=class extends En{constructor(t=null,n=1,i=1,s,r,o,a,c,h=fn,l=fn,u,f){super(null,o,a,c,h,l,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var zs=class extends ce{constructor(t,n,i,s=1){super(t,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},pr=new re,Id=new re,xa=[],zd=new Bi,v2=new re,ao=new ae,co=new Fi,Ir=class extends ae{constructor(t,n,i){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new zs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,v2)}computeBoundingBox(){let t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Bi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,pr),zd.copy(t.boundingBox).applyMatrix4(pr),this.boundingBox.union(zd)}computeBoundingSphere(){let t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,pr),co.copy(t.boundingSphere).applyMatrix4(pr),this.boundingSphere.union(co)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){let i=n.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,n){let i=this.matrixWorld,s=this.count;if(ao.geometry=this.geometry,ao.material=this.material,ao.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),co.copy(this.boundingSphere),co.applyMatrix4(i),t.ray.intersectsSphere(co)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,pr),Id.multiplyMatrices(i,pr),ao.matrixWorld=Id,ao.raycast(t,xa);for(let o=0,a=xa.length;o<a;o++){let c=xa[o];c.instanceId=r,c.object=this,n.push(c)}xa.length=0}}setColorAt(t,n){this.instanceColor===null&&(this.instanceColor=new zs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,n){n.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,n){let i=n.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new ss(new Float32Array(s*this.count),s,this.count,Ao,mi));let r=this.morphTexture.source.data.data,o=0;for(let h=0;h<i.length;h++)o+=i[h];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Ls=class extends si{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Wa=new N,Xa=new N,Ld=new re,lo=new Ar,va=new Fi,Al=new N,Ud=new N,Uh=class extends nn{constructor(t=new de,n=new Ls){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let n=t.attributes.position,i=[0];for(let s=1,r=n.count;s<r;s++)Wa.fromBufferAttribute(n,s-1),Xa.fromBufferAttribute(n,s),i[s]=i[s-1],i[s]+=Wa.distanceTo(Xa);t.setAttribute("lineDistance",new Gt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),va.copy(i.boundingSphere),va.applyMatrix4(s),va.radius+=r,t.ray.intersectsSphere(va)===!1)return;Ld.copy(s).invert(),lo.copy(t.ray).applyMatrix4(Ld);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,h=this.isLineSegments?2:1,l=i.index,f=i.attributes.position;if(l!==null){let d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let v=d,m=p-1;v<m;v+=h){let g=l.getX(v),_=l.getX(v+1),y=ya(this,t,lo,c,g,_);y&&n.push(y)}if(this.isLineLoop){let v=l.getX(p-1),m=l.getX(d),g=ya(this,t,lo,c,v,m);g&&n.push(g)}}else{let d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let v=d,m=p-1;v<m;v+=h){let g=ya(this,t,lo,c,v,v+1);g&&n.push(g)}if(this.isLineLoop){let v=ya(this,t,lo,c,p-1,d);v&&n.push(v)}}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ya(e,t,n,i,s,r){let o=e.geometry.attributes.position;if(Wa.fromBufferAttribute(o,s),Xa.fromBufferAttribute(o,r),n.distanceSqToSegment(Wa,Xa,Al,Ud)>i)return;Al.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Al);if(!(c<t.near||c>t.far))return{distance:c,point:Ud.clone().applyMatrix4(e.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:e}}var Dd=new N,Nd=new N,zr=class extends Uh{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let n=t.attributes.position,i=[];for(let s=0,r=n.count;s<r;s+=2)Dd.fromBufferAttribute(n,s),Nd.fromBufferAttribute(n,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Dd.distanceTo(Nd);t.setAttribute("lineDistance",new Gt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Dh=class extends si{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Bd=new re,Nh=new Ar,_a=new Fi,ba=new N,qa=class extends nn{constructor(t=new de,n=new Dh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),_a.copy(i.boundingSphere),_a.applyMatrix4(s),_a.radius+=r,t.ray.intersectsSphere(_a)===!1)return;Bd.copy(s).invert(),Nh.copy(t.ray).applyMatrix4(Bd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,h=i.index,u=i.attributes.position;if(h!==null){let f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let p=f,v=d;p<v;p++){let m=h.getX(p);ba.fromBufferAttribute(u,m),Fd(ba,m,c,s,t,n,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let p=f,v=d;p<v;p++)ba.fromBufferAttribute(u,p),Fd(ba,p,c,s,t,n,this)}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Fd(e,t,n,i,s,r,o){let a=Nh.distanceSqToPoint(e);if(a<n){let c=new N;Nh.closestPointToPoint(e,c),c.applyMatrix4(i);let h=s.ray.origin.distanceTo(c);if(h<s.near||h>s.far)return;r.push({distance:h,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var On=class extends En{constructor(t,n,i,s,r,o,a,c,h){super(t,n,i,s,r,o,a,c,h),this.isCanvasTexture=!0,this.needsUpdate=!0}},Xn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,n){let i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let n=[],i,s=this.getPoint(0),r=0;n.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),n.push(r),s=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n){let i=this.getLengths(),s=0,r=i.length,o;n?o=n:o=t*i[r-1];let a=0,c=r-1,h;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),h=i[s]-o,h<0)a=s+1;else if(h>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);let l=i[s],f=i[s+1]-l,d=(o-l)/f;return(s+d)/(r-1)}getTangent(t,n){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=n||(o.isVector2?new ct:new N);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,n){let i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n){let i=new N,s=[],r=[],o=[],a=new N,c=new re;for(let d=0;d<=t;d++){let p=d/t;s[d]=this.getTangentAt(p,new N)}r[0]=new N,o[0]=new N;let h=Number.MAX_VALUE,l=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);l<=h&&(h=l,i.set(1,0,0)),u<=h&&(h=u,i.set(0,1,0)),f<=h&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(tn(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(n===!0){let d=Math.acos(tn(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},vo=class extends Xn{constructor(t=0,n=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,n=new ct){let i=n,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let l=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=h-this.aY;c=f*l-d*u+this.aX,h=f*u+d*l+this.aY}return i.set(c,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Bh=class extends vo{constructor(t,n,i,s,r,o){super(t,n,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function gu(){let e=0,t=0,n=0,i=0;function s(r,o,a,c){e=r,t=a,n=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,h){s(o,a,h*(a-r),h*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,h,l,u){let f=(o-r)/h-(a-r)/(h+l)+(a-o)/l,d=(a-o)/l-(c-o)/(l+u)+(c-a)/u;f*=l,d*=l,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return e+t*r+n*o+i*a}}}var Ma=new N,Rl=new gu,Cl=new gu,Pl=new gu,Fh=class extends Xn{constructor(t=[],n=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=i,this.tension=s}getPoint(t,n=new N){let i=n,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let h,l;this.closed||a>0?h=s[(a-1)%r]:(Ma.subVectors(s[0],s[1]).add(s[0]),h=Ma);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?l=s[(a+2)%r]:(Ma.subVectors(s[r-1],s[r-2]).add(s[r-1]),l=Ma),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(h.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(l),d);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),Rl.initNonuniformCatmullRom(h.x,u.x,f.x,l.x,p,v,m),Cl.initNonuniformCatmullRom(h.y,u.y,f.y,l.y,p,v,m),Pl.initNonuniformCatmullRom(h.z,u.z,f.z,l.z,p,v,m)}else this.curveType==="catmullrom"&&(Rl.initCatmullRom(h.x,u.x,f.x,l.x,this.tension),Cl.initCatmullRom(h.y,u.y,f.y,l.y,this.tension),Pl.initCatmullRom(h.z,u.z,f.z,l.z,this.tension));return i.set(Rl.calc(c),Cl.calc(c),Pl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let s=this.points[n];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Od(e,t,n,i,s){let r=(i-t)*.5,o=(s-n)*.5,a=e*e,c=e*a;return(2*n-2*i+r+o)*c+(-3*n+3*i-2*r-o)*a+r*e+n}function y2(e,t){let n=1-e;return n*n*t}function _2(e,t){return 2*(1-e)*e*t}function b2(e,t){return e*e*t}function po(e,t,n,i){return y2(e,t)+_2(e,n)+b2(e,i)}function M2(e,t){let n=1-e;return n*n*n*t}function S2(e,t){let n=1-e;return 3*n*n*e*t}function E2(e,t){return 3*(1-e)*e*e*t}function T2(e,t){return e*e*e*t}function mo(e,t,n,i,s){return M2(e,t)+S2(e,n)+E2(e,i)+T2(e,s)}var Ya=class extends Xn{constructor(t=new ct,n=new ct,i=new ct,s=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=i,this.v3=s}getPoint(t,n=new ct){let i=n,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(mo(t,s.x,r.x,o.x,a.x),mo(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Oh=class extends Xn{constructor(t=new N,n=new N,i=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=i,this.v3=s}getPoint(t,n=new N){let i=n,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(mo(t,s.x,r.x,o.x,a.x),mo(t,s.y,r.y,o.y,a.y),mo(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},$a=class extends Xn{constructor(t=new ct,n=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new ct){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new ct){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},kh=class extends Xn{constructor(t=new N,n=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new N){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new N){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Za=class extends Xn{constructor(t=new ct,n=new ct,i=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new ct){let i=n,s=this.v0,r=this.v1,o=this.v2;return i.set(po(t,s.x,r.x,o.x),po(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Hh=class extends Xn{constructor(t=new N,n=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new N){let i=n,s=this.v0,r=this.v1,o=this.v2;return i.set(po(t,s.x,r.x,o.x),po(t,s.y,r.y,o.y),po(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ja=class extends Xn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new ct){let i=n,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],h=s[o],l=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(Od(a,c.x,h.x,l.x,u.x),Od(a,c.y,h.y,l.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let s=this.points[n];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(new ct().fromArray(s))}return this}},Vh=Object.freeze({__proto__:null,ArcCurve:Bh,CatmullRomCurve3:Fh,CubicBezierCurve:Ya,CubicBezierCurve3:Oh,EllipseCurve:vo,LineCurve:$a,LineCurve3:kh,QuadraticBezierCurve:Za,QuadraticBezierCurve3:Hh,SplineCurve:Ja}),Gh=class extends Xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Vh[i](n,t))}return this}getPoint(t,n){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let o=s[r]-i,a=this.curves[r],c=a.getLength(),h=c===0?0:1-o/c;return a.getPointAt(h,n)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],n=0;for(let i=0,s=this.curves.length;i<s;i++)n+=this.curves[i].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){let n=[],i;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let h=0;h<c.length;h++){let l=c[h];i&&i.equals(l)||(n.push(l),i=l)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){let s=t.curves[n];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,i=this.curves.length;n<i;n++){let s=this.curves[n];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){let s=t.curves[n];this.curves.push(new Vh[s.type]().fromJSON(s))}return this}},ja=class extends Gh{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,i=t.length;n<i;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){let i=new $a(this.currentPoint.clone(),new ct(t,n));return this.curves.push(i),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,i,s){let r=new Za(this.currentPoint.clone(),new ct(t,n),new ct(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,n,i,s,r,o){let a=new Ya(this.currentPoint.clone(),new ct(t,n),new ct(i,s),new ct(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let n=[this.currentPoint.clone()].concat(t),i=new Ja(n);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,i,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,n+c,i,s,r,o),this}absarc(t,n,i,s,r,o){return this.absellipse(t,n,i,i,s,r,o),this}ellipse(t,n,i,s,r,o,a,c){let h=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(t+h,n+l,i,s,r,o,a,c),this}absellipse(t,n,i,s,r,o,a,c){let h=new vo(t,n,i,s,r,o,a,c);if(this.curves.length>0){let u=h.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(h);let l=h.getPoint(1);return this.currentPoint.copy(l),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Ka=class e extends de{constructor(t=[new ct(0,-.5),new ct(.5,0),new ct(0,.5)],n=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:n,phiStart:i,phiLength:s},n=Math.floor(n),s=tn(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],h=[],l=1/n,u=new N,f=new ct,d=new N,p=new N,v=new N,m=0,g=0;for(let _=0;_<=t.length-1;_++)switch(_){case 0:m=t[_+1].x-t[_].x,g=t[_+1].y-t[_].y,d.x=g*1,d.y=-m,d.z=g*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:m=t[_+1].x-t[_].x,g=t[_+1].y-t[_].y,d.x=g*1,d.y=-m,d.z=g*0,p.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(p)}for(let _=0;_<=n;_++){let y=i+_*l*s,b=Math.sin(y),R=Math.cos(y);for(let w=0;w<=t.length-1;w++){u.x=t[w].x*b,u.y=t[w].y,u.z=t[w].x*R,o.push(u.x,u.y,u.z),f.x=_/n,f.y=w/(t.length-1),a.push(f.x,f.y);let A=c[3*w+0]*b,P=c[3*w+1],S=c[3*w+0]*R;h.push(A,P,S)}}for(let _=0;_<n;_++)for(let y=0;y<t.length-1;y++){let b=y+_*t.length,R=b,w=b+t.length,A=b+t.length+1,P=b+1;r.push(R,w,P),r.push(A,P,w)}this.setIndex(r),this.setAttribute("position",new Gt(o,3)),this.setAttribute("uv",new Gt(a,2)),this.setAttribute("normal",new Gt(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}};var rs=class e extends de{constructor(t=1,n=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:i,thetaLength:s},n=Math.max(3,n);let r=[],o=[],a=[],c=[],h=new N,l=new ct;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=n;u++,f+=3){let d=i+u/n*s;h.x=t*Math.cos(d),h.y=t*Math.sin(d),o.push(h.x,h.y,h.z),a.push(0,0,1),l.x=(o[f]/t+1)/2,l.y=(o[f+1]/t+1)/2,c.push(l.x,l.y)}for(let u=1;u<=n;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Gt(o,3)),this.setAttribute("normal",new Gt(a,3)),this.setAttribute("uv",new Gt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},An=class e extends de{constructor(t=1,n=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let h=this;s=Math.floor(s),r=Math.floor(r);let l=[],u=[],f=[],d=[],p=0,v=[],m=i/2,g=0;_(),o===!1&&(t>0&&y(!0),n>0&&y(!1)),this.setIndex(l),this.setAttribute("position",new Gt(u,3)),this.setAttribute("normal",new Gt(f,3)),this.setAttribute("uv",new Gt(d,2));function _(){let b=new N,R=new N,w=0,A=(n-t)/i;for(let P=0;P<=r;P++){let S=[],M=P/r,I=M*(n-t)+t;for(let L=0;L<=s;L++){let U=L/s,D=U*c+a,W=Math.sin(D),H=Math.cos(D);R.x=I*W,R.y=-M*i+m,R.z=I*H,u.push(R.x,R.y,R.z),b.set(W,A,H).normalize(),f.push(b.x,b.y,b.z),d.push(U,1-M),S.push(p++)}v.push(S)}for(let P=0;P<s;P++)for(let S=0;S<r;S++){let M=v[S][P],I=v[S+1][P],L=v[S+1][P+1],U=v[S][P+1];(t>0||S!==0)&&(l.push(M,I,U),w+=3),(n>0||S!==r-1)&&(l.push(I,L,U),w+=3)}h.addGroup(g,w,0),g+=w}function y(b){let R=p,w=new ct,A=new N,P=0,S=b===!0?t:n,M=b===!0?1:-1;for(let L=1;L<=s;L++)u.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),p++;let I=p;for(let L=0;L<=s;L++){let D=L/s*c+a,W=Math.cos(D),H=Math.sin(D);A.x=S*H,A.y=m*M,A.z=S*W,u.push(A.x,A.y,A.z),f.push(0,M,0),w.x=W*.5+.5,w.y=H*.5*M+.5,d.push(w.x,w.y),p++}for(let L=0;L<s;L++){let U=R+L,D=I+L;b===!0?l.push(D,D+1,U):l.push(D+1,D,U),P+=3}h.addGroup(g,P,b===!0?1:2),g+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},yo=class e extends An{constructor(t=1,n=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,n,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Wh=class e extends de{constructor(t=[],n=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:i,detail:s};let r=[],o=[];a(s),h(i),l(),this.setAttribute("position",new Gt(r,3)),this.setAttribute("normal",new Gt(r.slice(),3)),this.setAttribute("uv",new Gt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let y=new N,b=new N,R=new N;for(let w=0;w<n.length;w+=3)d(n[w+0],y),d(n[w+1],b),d(n[w+2],R),c(y,b,R,_)}function c(_,y,b,R){let w=R+1,A=[];for(let P=0;P<=w;P++){A[P]=[];let S=_.clone().lerp(b,P/w),M=y.clone().lerp(b,P/w),I=w-P;for(let L=0;L<=I;L++)L===0&&P===w?A[P][L]=S:A[P][L]=S.clone().lerp(M,L/I)}for(let P=0;P<w;P++)for(let S=0;S<2*(w-P)-1;S++){let M=Math.floor(S/2);S%2===0?(f(A[P][M+1]),f(A[P+1][M]),f(A[P][M])):(f(A[P][M+1]),f(A[P+1][M+1]),f(A[P+1][M]))}}function h(_){let y=new N;for(let b=0;b<r.length;b+=3)y.x=r[b+0],y.y=r[b+1],y.z=r[b+2],y.normalize().multiplyScalar(_),r[b+0]=y.x,r[b+1]=y.y,r[b+2]=y.z}function l(){let _=new N;for(let y=0;y<r.length;y+=3){_.x=r[y+0],_.y=r[y+1],_.z=r[y+2];let b=m(_)/2/Math.PI+.5,R=g(_)/Math.PI+.5;o.push(b,1-R)}p(),u()}function u(){for(let _=0;_<o.length;_+=6){let y=o[_+0],b=o[_+2],R=o[_+4],w=Math.max(y,b,R),A=Math.min(y,b,R);w>.9&&A<.1&&(y<.2&&(o[_+0]+=1),b<.2&&(o[_+2]+=1),R<.2&&(o[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function d(_,y){let b=_*3;y.x=t[b+0],y.y=t[b+1],y.z=t[b+2]}function p(){let _=new N,y=new N,b=new N,R=new N,w=new ct,A=new ct,P=new ct;for(let S=0,M=0;S<r.length;S+=9,M+=6){_.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),b.set(r[S+6],r[S+7],r[S+8]),w.set(o[M+0],o[M+1]),A.set(o[M+2],o[M+3]),P.set(o[M+4],o[M+5]),R.copy(_).add(y).add(b).divideScalar(3);let I=m(R);v(w,M+0,_,I),v(A,M+2,y,I),v(P,M+4,b,I)}}function v(_,y,b,R){R<0&&_.x===1&&(o[y]=_.x-1),b.x===0&&b.z===0&&(o[y]=R/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function g(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.details)}};var vn=class extends ja{constructor(t){super(t),this.uuid=Nr(),this.type="Shape",this.holes=[]}getPointsHoles(t){let n=[];for(let i=0,s=this.holes.length;i<s;i++)n[i]=this.holes[i].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){let s=t.holes[n];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,i=this.holes.length;n<i;n++){let s=this.holes[n];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){let s=t.holes[n];this.holes.push(new ja().fromJSON(s))}return this}},w2={triangulate:function(e,t,n=2){let i=t&&t.length,s=i?t[0]*n:e.length,r=d0(e,0,s,n,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,h,l,u,f,d;if(i&&(r=I2(e,t,r,n)),e.length>80*n){a=h=e[0],c=l=e[1];for(let p=n;p<s;p+=n)u=e[p],f=e[p+1],u<a&&(a=u),f<c&&(c=f),u>h&&(h=u),f>l&&(l=f);d=Math.max(h-a,l-c),d=d!==0?32767/d:0}return _o(r,o,n,a,c,d,0),o}};function d0(e,t,n,i,s){let r,o;if(s===V2(e,t,n,i)>0)for(r=t;r<n;r+=i)o=kd(r,e[r],e[r+1],o);else for(r=n-i;r>=t;r-=i)o=kd(r,e[r],e[r+1],o);return o&&hc(o,o.next)&&(Mo(o),o=o.next),o}function Us(e,t){if(!e)return e;t||(t=e);let n=e,i;do if(i=!1,!n.steiner&&(hc(n,n.next)||De(n.prev,n,n.next)===0)){if(Mo(n),n=t=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==t);return t}function _o(e,t,n,i,s,r,o){if(!e)return;!o&&r&&N2(e,i,s,r);let a=e,c,h;for(;e.prev!==e.next;){if(c=e.prev,h=e.next,r?R2(e,i,s,r):A2(e)){t.push(c.i/n|0),t.push(e.i/n|0),t.push(h.i/n|0),Mo(e),e=h.next,a=h.next;continue}if(e=h,e===a){o?o===1?(e=C2(Us(e),t,n),_o(e,t,n,i,s,r,2)):o===2&&P2(e,t,n,i,s,r):_o(Us(e),t,n,i,s,r,1);break}}}function A2(e){let t=e.prev,n=e,i=e.next;if(De(t,n,i)>=0)return!1;let s=t.x,r=n.x,o=i.x,a=t.y,c=n.y,h=i.y,l=s<r?s<o?s:o:r<o?r:o,u=a<c?a<h?a:h:c<h?c:h,f=s>r?s>o?s:o:r>o?r:o,d=a>c?a>h?a:h:c>h?c:h,p=i.next;for(;p!==t;){if(p.x>=l&&p.x<=f&&p.y>=u&&p.y<=d&&gr(s,a,r,c,o,h,p.x,p.y)&&De(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function R2(e,t,n,i){let s=e.prev,r=e,o=e.next;if(De(s,r,o)>=0)return!1;let a=s.x,c=r.x,h=o.x,l=s.y,u=r.y,f=o.y,d=a<c?a<h?a:h:c<h?c:h,p=l<u?l<f?l:f:u<f?u:f,v=a>c?a>h?a:h:c>h?c:h,m=l>u?l>f?l:f:u>f?u:f,g=Xh(d,p,t,n,i),_=Xh(v,m,t,n,i),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=g&&b&&b.z<=_;){if(y.x>=d&&y.x<=v&&y.y>=p&&y.y<=m&&y!==s&&y!==o&&gr(a,l,c,u,h,f,y.x,y.y)&&De(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=d&&b.x<=v&&b.y>=p&&b.y<=m&&b!==s&&b!==o&&gr(a,l,c,u,h,f,b.x,b.y)&&De(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=g;){if(y.x>=d&&y.x<=v&&y.y>=p&&y.y<=m&&y!==s&&y!==o&&gr(a,l,c,u,h,f,y.x,y.y)&&De(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=_;){if(b.x>=d&&b.x<=v&&b.y>=p&&b.y<=m&&b!==s&&b!==o&&gr(a,l,c,u,h,f,b.x,b.y)&&De(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function C2(e,t,n){let i=e;do{let s=i.prev,r=i.next.next;!hc(s,r)&&p0(s,i,i.next,r)&&bo(s,r)&&bo(r,s)&&(t.push(s.i/n|0),t.push(i.i/n|0),t.push(r.i/n|0),Mo(i),Mo(i.next),i=e=r),i=i.next}while(i!==e);return Us(i)}function P2(e,t,n,i,s,r){let o=e;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&O2(o,a)){let c=m0(o,a);o=Us(o,o.next),c=Us(c,c.next),_o(o,t,n,i,s,r,0),_o(c,t,n,i,s,r,0);return}a=a.next}o=o.next}while(o!==e)}function I2(e,t,n,i){let s=[],r,o,a,c,h;for(r=0,o=t.length;r<o;r++)a=t[r]*i,c=r<o-1?t[r+1]*i:e.length,h=d0(e,a,c,i,!1),h===h.next&&(h.steiner=!0),s.push(F2(h));for(s.sort(z2),r=0;r<s.length;r++)n=L2(s[r],n);return n}function z2(e,t){return e.x-t.x}function L2(e,t){let n=U2(e,t);if(!n)return t;let i=m0(n,e);return Us(i,i.next),Us(n,n.next)}function U2(e,t){let n=t,i=-1/0,s,r=e.x,o=e.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){let f=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(f<=r&&f>i&&(i=f,s=n.x<n.next.x?n:n.next,f===r))return s}n=n.next}while(n!==t);if(!s)return null;let a=s,c=s.x,h=s.y,l=1/0,u;n=s;do r>=n.x&&n.x>=c&&r!==n.x&&gr(o<h?r:i,o,c,h,o<h?i:r,o,n.x,n.y)&&(u=Math.abs(o-n.y)/(r-n.x),bo(n,e)&&(u<l||u===l&&(n.x>s.x||n.x===s.x&&D2(s,n)))&&(s=n,l=u)),n=n.next;while(n!==a);return s}function D2(e,t){return De(e.prev,e,t.prev)<0&&De(t.next,e,e.next)<0}function N2(e,t,n,i){let s=e;do s.z===0&&(s.z=Xh(s.x,s.y,t,n,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==e);s.prevZ.nextZ=null,s.prevZ=null,B2(s)}function B2(e){let t,n,i,s,r,o,a,c,h=1;do{for(n=e,e=null,r=null,o=0;n;){for(o++,i=n,a=0,t=0;t<h&&(a++,i=i.nextZ,!!i);t++);for(c=h;a>0||c>0&&i;)a!==0&&(c===0||!i||n.z<=i.z)?(s=n,n=n.nextZ,a--):(s=i,i=i.nextZ,c--),r?r.nextZ=s:e=s,s.prevZ=r,r=s;n=i}r.nextZ=null,h*=2}while(o>1);return e}function Xh(e,t,n,i,s){return e=(e-n)*s|0,t=(t-i)*s|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function F2(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function gr(e,t,n,i,s,r,o,a){return(s-o)*(t-a)>=(e-o)*(r-a)&&(e-o)*(i-a)>=(n-o)*(t-a)&&(n-o)*(r-a)>=(s-o)*(i-a)}function O2(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!k2(e,t)&&(bo(e,t)&&bo(t,e)&&H2(e,t)&&(De(e.prev,e,t.prev)||De(e,t.prev,t))||hc(e,t)&&De(e.prev,e,e.next)>0&&De(t.prev,t,t.next)>0)}function De(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function hc(e,t){return e.x===t.x&&e.y===t.y}function p0(e,t,n,i){let s=Ea(De(e,t,n)),r=Ea(De(e,t,i)),o=Ea(De(n,i,e)),a=Ea(De(n,i,t));return!!(s!==r&&o!==a||s===0&&Sa(e,n,t)||r===0&&Sa(e,i,t)||o===0&&Sa(n,e,i)||a===0&&Sa(n,t,i))}function Sa(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ea(e){return e>0?1:e<0?-1:0}function k2(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&p0(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function bo(e,t){return De(e.prev,e,e.next)<0?De(e,t,e.next)>=0&&De(e,e.prev,t)>=0:De(e,t,e.prev)<0||De(e,e.next,t)<0}function H2(e,t){let n=e,i=!1,s=(e.x+t.x)/2,r=(e.y+t.y)/2;do n.y>r!=n.next.y>r&&n.next.y!==n.y&&s<(n.next.x-n.x)*(r-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==e);return i}function m0(e,t){let n=new qh(e.i,e.x,e.y),i=new qh(t.i,t.x,t.y),s=e.next,r=t.prev;return e.next=t,t.prev=e,n.next=s,s.prev=n,i.next=n,n.prev=i,r.next=i,i.prev=r,i}function kd(e,t,n,i){let s=new qh(e,t,n);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Mo(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function qh(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function V2(e,t,n,i){let s=0;for(let r=t,o=n-i;r<n;r+=i)s+=(e[o]-e[r])*(e[r+1]+e[o+1]),o=r;return s}var gi=class e{static area(t){let n=t.length,i=0;for(let s=n-1,r=0;r<n;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(t,n){let i=[],s=[],r=[];Hd(t),Vd(i,t);let o=t.length;n.forEach(Hd);for(let c=0;c<n.length;c++)s.push(o),o+=n[c].length,Vd(i,n[c]);let a=w2.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Hd(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Vd(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Lr=class e extends de{constructor(t=new vn([new ct(.5,.5),new ct(-.5,.5),new ct(-.5,-.5),new ct(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let h=t[a];o(h)}this.setAttribute("position",new Gt(s,3)),this.setAttribute("uv",new Gt(r,2)),this.computeVertexNormals();function o(a){let c=[],h=n.curveSegments!==void 0?n.curveSegments:12,l=n.steps!==void 0?n.steps:1,u=n.depth!==void 0?n.depth:1,f=n.bevelEnabled!==void 0?n.bevelEnabled:!0,d=n.bevelThickness!==void 0?n.bevelThickness:.2,p=n.bevelSize!==void 0?n.bevelSize:d-.1,v=n.bevelOffset!==void 0?n.bevelOffset:0,m=n.bevelSegments!==void 0?n.bevelSegments:3,g=n.extrudePath,_=n.UVGenerator!==void 0?n.UVGenerator:G2,y,b=!1,R,w,A,P;g&&(y=g.getSpacedPoints(l),b=!0,f=!1,R=g.computeFrenetFrames(l,!1),w=new N,A=new N,P=new N),f||(m=0,d=0,p=0,v=0);let S=a.extractPoints(h),M=S.shape,I=S.holes;if(!gi.isClockWise(M)){M=M.reverse();for(let K=0,at=I.length;K<at;K++){let z=I[K];gi.isClockWise(z)&&(I[K]=z.reverse())}}let U=gi.triangulateShape(M,I),D=M;for(let K=0,at=I.length;K<at;K++){let z=I[K];M=M.concat(z)}function W(K,at,z){return at||console.error("THREE.ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(at,z)}let H=M.length,nt=U.length;function V(K,at,z){let zt,ot,_t,pt=K.x-at.x,Xt=K.y-at.y,wt=z.x-K.x,C=z.y-K.y,E=pt*pt+Xt*Xt,G=pt*C-Xt*wt;if(Math.abs(G)>Number.EPSILON){let Q=Math.sqrt(E),rt=Math.sqrt(wt*wt+C*C),et=at.x-Xt/Q,Lt=at.y+pt/Q,vt=z.x-C/rt,At=z.y+wt/rt,oe=((vt-et)*C-(At-Lt)*wt)/(pt*C-Xt*wt);zt=et+pt*oe-K.x,ot=Lt+Xt*oe-K.y;let lt=zt*zt+ot*ot;if(lt<=2)return new ct(zt,ot);_t=Math.sqrt(lt/2)}else{let Q=!1;pt>Number.EPSILON?wt>Number.EPSILON&&(Q=!0):pt<-Number.EPSILON?wt<-Number.EPSILON&&(Q=!0):Math.sign(Xt)===Math.sign(C)&&(Q=!0),Q?(zt=-Xt,ot=pt,_t=Math.sqrt(E)):(zt=pt,ot=Xt,_t=Math.sqrt(E/2))}return new ct(zt/_t,ot/_t)}let Z=[];for(let K=0,at=D.length,z=at-1,zt=K+1;K<at;K++,z++,zt++)z===at&&(z=0),zt===at&&(zt=0),Z[K]=V(D[K],D[z],D[zt]);let J=[],j,ft=Z.concat();for(let K=0,at=I.length;K<at;K++){let z=I[K];j=[];for(let zt=0,ot=z.length,_t=ot-1,pt=zt+1;zt<ot;zt++,_t++,pt++)_t===ot&&(_t=0),pt===ot&&(pt=0),j[zt]=V(z[zt],z[_t],z[pt]);J.push(j),ft=ft.concat(j)}for(let K=0;K<m;K++){let at=K/m,z=d*Math.cos(at*Math.PI/2),zt=p*Math.sin(at*Math.PI/2)+v;for(let ot=0,_t=D.length;ot<_t;ot++){let pt=W(D[ot],Z[ot],zt);tt(pt.x,pt.y,-z)}for(let ot=0,_t=I.length;ot<_t;ot++){let pt=I[ot];j=J[ot];for(let Xt=0,wt=pt.length;Xt<wt;Xt++){let C=W(pt[Xt],j[Xt],zt);tt(C.x,C.y,-z)}}}let Tt=p+v;for(let K=0;K<H;K++){let at=f?W(M[K],ft[K],Tt):M[K];b?(A.copy(R.normals[0]).multiplyScalar(at.x),w.copy(R.binormals[0]).multiplyScalar(at.y),P.copy(y[0]).add(A).add(w),tt(P.x,P.y,P.z)):tt(at.x,at.y,0)}for(let K=1;K<=l;K++)for(let at=0;at<H;at++){let z=f?W(M[at],ft[at],Tt):M[at];b?(A.copy(R.normals[K]).multiplyScalar(z.x),w.copy(R.binormals[K]).multiplyScalar(z.y),P.copy(y[K]).add(A).add(w),tt(P.x,P.y,P.z)):tt(z.x,z.y,u/l*K)}for(let K=m-1;K>=0;K--){let at=K/m,z=d*Math.cos(at*Math.PI/2),zt=p*Math.sin(at*Math.PI/2)+v;for(let ot=0,_t=D.length;ot<_t;ot++){let pt=W(D[ot],Z[ot],zt);tt(pt.x,pt.y,u+z)}for(let ot=0,_t=I.length;ot<_t;ot++){let pt=I[ot];j=J[ot];for(let Xt=0,wt=pt.length;Xt<wt;Xt++){let C=W(pt[Xt],j[Xt],zt);b?tt(C.x,C.y+y[l-1].y,y[l-1].x+z):tt(C.x,C.y,u+z)}}}Y(),B();function Y(){let K=s.length/3;if(f){let at=0,z=H*at;for(let zt=0;zt<nt;zt++){let ot=U[zt];gt(ot[2]+z,ot[1]+z,ot[0]+z)}at=l+m*2,z=H*at;for(let zt=0;zt<nt;zt++){let ot=U[zt];gt(ot[0]+z,ot[1]+z,ot[2]+z)}}else{for(let at=0;at<nt;at++){let z=U[at];gt(z[2],z[1],z[0])}for(let at=0;at<nt;at++){let z=U[at];gt(z[0]+H*l,z[1]+H*l,z[2]+H*l)}}i.addGroup(K,s.length/3-K,0)}function B(){let K=s.length/3,at=0;st(D,at),at+=D.length;for(let z=0,zt=I.length;z<zt;z++){let ot=I[z];st(ot,at),at+=ot.length}i.addGroup(K,s.length/3-K,1)}function st(K,at){let z=K.length;for(;--z>=0;){let zt=z,ot=z-1;ot<0&&(ot=K.length-1);for(let _t=0,pt=l+m*2;_t<pt;_t++){let Xt=H*_t,wt=H*(_t+1),C=at+zt+Xt,E=at+ot+Xt,G=at+ot+wt,Q=at+zt+wt;St(C,E,G,Q)}}}function tt(K,at,z){c.push(K),c.push(at),c.push(z)}function gt(K,at,z){xt(K),xt(at),xt(z);let zt=s.length/3,ot=_.generateTopUV(i,s,zt-3,zt-2,zt-1);Ht(ot[0]),Ht(ot[1]),Ht(ot[2])}function St(K,at,z,zt){xt(K),xt(at),xt(zt),xt(at),xt(z),xt(zt);let ot=s.length/3,_t=_.generateSideWallUV(i,s,ot-6,ot-3,ot-2,ot-1);Ht(_t[0]),Ht(_t[1]),Ht(_t[3]),Ht(_t[1]),Ht(_t[2]),Ht(_t[3])}function xt(K){s.push(c[K*3+0]),s.push(c[K*3+1]),s.push(c[K*3+2])}function Ht(K){r.push(K.x),r.push(K.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return W2(n,i,t)}static fromJSON(t,n){let i=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=n[t.shapes[r]];i.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Vh[s.type]().fromJSON(s)),new e(i,t.options)}},G2={generateTopUV:function(e,t,n,i,s){let r=t[n*3],o=t[n*3+1],a=t[i*3],c=t[i*3+1],h=t[s*3],l=t[s*3+1];return[new ct(r,o),new ct(a,c),new ct(h,l)]},generateSideWallUV:function(e,t,n,i,s,r){let o=t[n*3],a=t[n*3+1],c=t[n*3+2],h=t[i*3],l=t[i*3+1],u=t[i*3+2],f=t[s*3],d=t[s*3+1],p=t[s*3+2],v=t[r*3],m=t[r*3+1],g=t[r*3+2];return Math.abs(a-l)<Math.abs(o-h)?[new ct(o,1-c),new ct(h,1-u),new ct(f,1-p),new ct(v,1-g)]:[new ct(a,1-c),new ct(l,1-u),new ct(d,1-p),new ct(m,1-g)]}};function W2(e,t,n){if(n.shapes=[],Array.isArray(e))for(let i=0,s=e.length;i<s;i++){let r=e[i];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var So=class e extends Wh{constructor(t=1,n=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new e(t.radius,t.detail)}};var Qa=class e extends de{constructor(t=.5,n=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:n,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);let a=[],c=[],h=[],l=[],u=t,f=(n-t)/s,d=new N,p=new ct;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){let g=r+m/i*o;d.x=u*Math.cos(g),d.y=u*Math.sin(g),c.push(d.x,d.y,d.z),h.push(0,0,1),p.x=(d.x/n+1)/2,p.y=(d.y/n+1)/2,l.push(p.x,p.y)}u+=f}for(let v=0;v<s;v++){let m=v*(i+1);for(let g=0;g<i;g++){let _=g+m,y=_,b=_+i+1,R=_+i+2,w=_+1;a.push(y,b,w),a.push(b,R,w)}}this.setIndex(a),this.setAttribute("position",new Gt(c,3)),this.setAttribute("normal",new Gt(h,3)),this.setAttribute("uv",new Gt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},xi=class e extends de{constructor(t=new vn([new ct(0,.5),new ct(-.5,-.5),new ct(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:n};let i=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)h(t);else for(let l=0;l<t.length;l++)h(t[l]),this.addGroup(a,c,l),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new Gt(s,3)),this.setAttribute("normal",new Gt(r,3)),this.setAttribute("uv",new Gt(o,2));function h(l){let u=s.length/3,f=l.extractPoints(n),d=f.shape,p=f.holes;gi.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,g=p.length;m<g;m++){let _=p[m];gi.isClockWise(_)===!0&&(p[m]=_.reverse())}let v=gi.triangulateShape(d,p);for(let m=0,g=p.length;m<g;m++){let _=p[m];d=d.concat(_)}for(let m=0,g=d.length;m<g;m++){let _=d[m];s.push(_.x,_.y,0),r.push(0,0,1),o.push(_.x,_.y)}for(let m=0,g=v.length;m<g;m++){let _=v[m],y=_[0]+u,b=_[1]+u,R=_[2]+u;i.push(y,b,R),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),n=this.parameters.shapes;return X2(n,t)}static fromJSON(t,n){let i=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=n[t.shapes[s]];i.push(o)}return new e(i,t.curveSegments)}};function X2(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,i=e.length;n<i;n++){let s=e[n];t.shapes.push(s.uuid)}else t.shapes.push(e.uuid);return t}var qn=class e extends de{constructor(t=1,n=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),h=0,l=[],u=new N,f=new N,d=[],p=[],v=[],m=[];for(let g=0;g<=i;g++){let _=[],y=g/i,b=0;g===0&&o===0?b=.5/n:g===i&&c===Math.PI&&(b=-.5/n);for(let R=0;R<=n;R++){let w=R/n;u.x=-t*Math.cos(s+w*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+w*r)*Math.sin(o+y*a),p.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(w+b,1-y),_.push(h++)}l.push(_)}for(let g=0;g<i;g++)for(let _=0;_<n;_++){let y=l[g][_+1],b=l[g][_],R=l[g+1][_],w=l[g+1][_+1];(g!==0||o>0)&&d.push(y,b,w),(g!==i-1||c<Math.PI)&&d.push(b,R,w)}this.setIndex(d),this.setAttribute("position",new Gt(p,3)),this.setAttribute("normal",new Gt(v,3)),this.setAttribute("uv",new Gt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var vi=class e extends de{constructor(t=1,n=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],c=[],h=[],l=new N,u=new N,f=new N;for(let d=0;d<=i;d++)for(let p=0;p<=s;p++){let v=p/s*r,m=d/i*Math.PI*2;u.x=(t+n*Math.cos(m))*Math.cos(v),u.y=(t+n*Math.cos(m))*Math.sin(v),u.z=n*Math.sin(m),a.push(u.x,u.y,u.z),l.x=t*Math.cos(v),l.y=t*Math.sin(v),f.subVectors(u,l).normalize(),c.push(f.x,f.y,f.z),h.push(p/s),h.push(d/i)}for(let d=1;d<=i;d++)for(let p=1;p<=s;p++){let v=(s+1)*d+p-1,m=(s+1)*(d-1)+p-1,g=(s+1)*(d-1)+p,_=(s+1)*d+p;o.push(v,m,_),o.push(m,g,_)}this.setIndex(o),this.setAttribute("position",new Gt(a,3)),this.setAttribute("normal",new Gt(c,3)),this.setAttribute("uv",new Gt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Eo=class extends si{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Vt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ac,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var To=class extends si{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Vt(16777215),this.specular=new Vt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ac,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var sn=class extends si{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ac,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Ta(e,t,n){return!e||!n&&e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function q2(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var Ur=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],r=n[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=n[++i],t<s)break t}o=n.length;break e}if(!(t>=r)){let a=n[1];t<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=n[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<n[a]?o=a:i=a+1}if(s=n[i],r=n[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)n[o]=i[r+o];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Yh=class extends Ur{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Df,endingEnd:Df}}intervalChanged_(t,n,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Nf:r=t,a=2*n-i;break;case Bf:r=s.length-2,a=n+s[r]-s[r+1];break;default:r=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Nf:o=t,c=2*i-n;break;case Bf:o=1,c=i+s[1]-s[0];break;default:o=t-1,c=n}let h=(i-n)*.5,l=this.valueSize;this._weightPrev=h/(n-a),this._weightNext=h/(c-i),this._offsetPrev=r*l,this._offsetNext=o*l}interpolate_(t,n,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,h=c-a,l=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(i-n)/(s-n),v=p*p,m=v*p,g=-f*m+2*f*v-f*p,_=(1+f)*m+(-1.5-2*f)*v+(-.5+f)*p+1,y=(-1-d)*m+(1.5+d)*v+.5*p,b=d*m-d*v;for(let R=0;R!==a;++R)r[R]=g*o[l+R]+_*o[h+R]+y*o[c+R]+b*o[u+R];return r}},$h=class extends Ur{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,h=c-a,l=(i-n)/(s-n),u=1-l;for(let f=0;f!==a;++f)r[f]=o[h+f]*u+o[c+f]*l;return r}},Zh=class extends Ur{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ri=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ta(n,this.TimeBufferType),this.values=Ta(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:Ta(t.times,Array),values:Ta(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Zh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new $h(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Yh(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let n;switch(t){case Ia:n=this.InterpolantFactoryMethodDiscrete;break;case gh:n=this.InterpolantFactoryMethodLinear;break;case Kc:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ia;case this.InterpolantFactoryMethodLinear:return gh;case this.InterpolantFactoryMethodSmooth:return Kc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t}return this}trim(t,n){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>n;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&q2(s))for(let a=0,c=s.length;a!==c;++a){let h=s[a];if(isNaN(h)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,h),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Kc,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,h=t[a],l=t[a+1];if(h!==l&&(a!==1||h!==t[0]))if(s)c=!0;else{let u=a*i,f=u-i,d=u+i;for(let p=0;p!==i;++p){let v=n[u+p];if(v!==n[f+p]||v!==n[d+p]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*i,f=o*i;for(let d=0;d!==i;++d)n[f+d]=n[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,c=o*i,h=0;h!==i;++h)n[c+h]=n[a+h];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=n.slice(0,o*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,s}};ri.prototype.TimeBufferType=Float32Array;ri.prototype.ValueBufferType=Float32Array;ri.prototype.DefaultInterpolation=gh;var Ds=class extends ri{constructor(t,n,i){super(t,n,i)}};Ds.prototype.ValueTypeName="bool";Ds.prototype.ValueBufferType=Array;Ds.prototype.DefaultInterpolation=Ia;Ds.prototype.InterpolantFactoryMethodLinear=void 0;Ds.prototype.InterpolantFactoryMethodSmooth=void 0;var Jh=class extends ri{};Jh.prototype.ValueTypeName="color";var jh=class extends ri{};jh.prototype.ValueTypeName="number";var Kh=class extends Ur{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-n)/(s-n),h=t*a;for(let l=h+a;h!==l;h+=4)Tn.slerpFlat(r,0,o,h-a,o,h,c);return r}},tc=class extends ri{InterpolantFactoryMethodLinear(t){return new Kh(this.times,this.values,this.getValueSize(),t)}};tc.prototype.ValueTypeName="quaternion";tc.prototype.InterpolantFactoryMethodSmooth=void 0;var Ns=class extends ri{constructor(t,n,i){super(t,n,i)}};Ns.prototype.ValueTypeName="string";Ns.prototype.ValueBufferType=Array;Ns.prototype.DefaultInterpolation=Ia;Ns.prototype.InterpolantFactoryMethodLinear=void 0;Ns.prototype.InterpolantFactoryMethodSmooth=void 0;var Qh=class extends ri{};Qh.prototype.ValueTypeName="vector";var tu=class{constructor(t,n,i){let s=this,r=!1,o=0,a=0,c,h=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this.itemStart=function(l){a++,r===!1&&s.onStart!==void 0&&s.onStart(l,o,a),r=!0},this.itemEnd=function(l){o++,s.onProgress!==void 0&&s.onProgress(l,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(l){s.onError!==void 0&&s.onError(l)},this.resolveURL=function(l){return c?c(l):l},this.setURLModifier=function(l){return c=l,this},this.addHandler=function(l,u){return h.push(l,u),this},this.removeHandler=function(l){let u=h.indexOf(l);return u!==-1&&h.splice(u,2),this},this.getHandler=function(l){for(let u=0,f=h.length;u<f;u+=2){let d=h[u],p=h[u+1];if(d.global&&(d.lastIndex=0),d.test(l))return p}return null}}},Y2=new tu,eu=class{constructor(t){this.manager=t!==void 0?t:Y2,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,r){i.load(t,s,n,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};eu.DEFAULT_MATERIAL_NAME="__DEFAULT";var ec=class extends nn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=n}dispose(){}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}},nc=class extends ec{constructor(t,n,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Vt(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}},Il=new re,Gd=new N,Wd=new N,nu=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Is,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new Be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let n=this.camera,i=this.matrix;Gd.setFromMatrixPosition(t.matrixWorld),n.position.copy(Gd),Wd.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(Wd),n.updateMatrixWorld(),Il.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Il),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Il)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var iu=class extends nu{constructor(){super(new ka(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ic=class extends ec{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new iu}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var xu="\\[\\]\\.:\\/",$2=new RegExp("["+xu+"]","g"),vu="[^"+xu+"]",Z2="[^"+xu.replace("\\.","")+"]",J2=/((?:WC+[\/:])*)/.source.replace("WC",vu),j2=/(WCOD+)?/.source.replace("WCOD",Z2),K2=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vu),Q2=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vu),ty=new RegExp("^"+J2+j2+K2+Q2+"$"),ey=["material","materials","bones","map"],su=class{constructor(t,n,i){let s=i||Ce.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Ce=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($2,"")}static parseTrackName(t){let n=ty.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);ey.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===n||a.uuid===n)return a;let c=i(a.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,r=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let h=n.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let l=0;l<t.length;l++)if(t[l].name===h){h=l;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(h!==void 0){if(t[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[h]}}let o=t[s];if(o===void 0){let h=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ce.Composite=su;Ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ce.prototype.GetterByBindingType=[Ce.prototype._getValue_direct,Ce.prototype._getValue_array,Ce.prototype._getValue_arrayElement,Ce.prototype._getValue_toArray];Ce.prototype.SetterByBindingTypeAndVersioning=[[Ce.prototype._setValue_direct,Ce.prototype._setValue_direct_setNeedsUpdate,Ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_array,Ce.prototype._setValue_array_setNeedsUpdate,Ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_arrayElement,Ce.prototype._setValue_arrayElement_setNeedsUpdate,Ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_fromArray,Ce.prototype._setValue_fromArray_setNeedsUpdate,Ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Z_=new Float32Array(1);var Xd=new re,sc=class{constructor(t,n,i=0,s=1/0){this.ray=new Ar(t,n),this.near=i,this.far=s,this.camera=null,this.layers=new xo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return Xd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xd),this}intersectObject(t,n=!0,i=[]){return ru(t,this,i,n),i.sort(qd),i}intersectObjects(t,n=!0,i=[]){for(let s=0,r=t.length;s<r;s++)ru(t[s],this,i,n);return i.sort(qd),i}};function qd(e,t){return e.distance-t.distance}function ru(e,t,n,i){let s=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(s=!1),s===!0&&i===!0){let r=e.children;for(let o=0,a=r.length;o<a;o++)ru(r[o],t,n,!0)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ou}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ou);var x={cena:null,camera:null,renderer:null,bonecos:null,efeitos:null,unidades:[],agentes:[],projeteis:[],hashA:null,hashU:null,dinheiro:3e3,tempo:0,velocidade:1,pausado:!0,fim:!1,resgatados:0,civisMortos:0,zumbisMortos:0,perdas:0,populacao:0,meta:250,selecao:[],alertas:[],focos:0,proxFoco:25,dificuldade:"normal",base:null,porta:null,estr:{},satelite:null,cfg:{som:!0,qualidade:1},controlando:null,idSeq:1};function Wt(e,t,n,i="info"){x.alertas.push({txt:e,x:t,z:n,tipo:i,t:x.tempo,criado:performance.now()}),x.alertas.length>30&&x.alertas.shift(),x.ui&&x.ui.alerta(e,t,n,i)}var Lu={};If(Lu,{ALT:()=>ke,CEL:()=>Pe,COSTA:()=>We,GH:()=>be,GW:()=>Ft,LARG:()=>Oe,MAT_PREDIOS:()=>Oi,META:()=>me,MPP:()=>hs,QUAL:()=>ve,RURAL:()=>cs,T:()=>pe,agua:()=>Fs,andavel:()=>He,atualizarDecoracao:()=>Pu,atualizarPredios:()=>Iu,canvasTerreno:()=>Eu,carros:()=>Ru,cel:()=>$n,construirAgua:()=>wu,construirCarros:()=>Cu,construirChao:()=>Tu,construirPalmeiras:()=>Au,construirPredios:()=>Su,definirQualidade:()=>_u,dentroPoligono:()=>oi,ehRua:()=>uc,esmagarCarros:()=>zu,grade:()=>Re,latlon:()=>yy,lugares:()=>ze,predioEm:()=>Os,predioId:()=>Te,predios:()=>Ie,rasterizarPredios:()=>bu,removerPrediosEm:()=>Mu,tipo:()=>ny});function Yn(e,t=!1){let n=e[0].index!==null,i=new Set(Object.keys(e[0].attributes)),s=new Set(Object.keys(e[0].morphAttributes)),r={},o={},a=e[0].morphTargetsRelative,c=new de,h=0;for(let l=0;l<e.length;++l){let u=e[l],f=0;if(n!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(n)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". The geometry must have either an index or a position attribute"),null;c.addGroup(h,d,l),h+=d}}if(n){let l=0,u=[];for(let f=0;f<e.length;++f){let d=e[f].index;for(let p=0;p<d.count;++p)u.push(d.getX(p)+l);l+=e[f].attributes.position.count}c.setIndex(u)}for(let l in r){let u=g0(r[l]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" attribute."),null;c.setAttribute(l,u)}for(let l in o){let u=o[l][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[l]=[];for(let f=0;f<u;++f){let d=[];for(let v=0;v<o[l].length;++v)d.push(o[l][v][f]);let p=g0(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" morphAttribute."),null;c.morphAttributes[l].push(p)}}return c}function g0(e){let t,n,i,s=-1,r=0;for(let h=0;h<e.length;++h){let l=e[h];if(t===void 0&&(t=l.array.constructor),t!==l.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=l.itemSize),n!==l.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=l.normalized),i!==l.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=l.gpuType),s!==l.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=l.count*n}let o=new t(r),a=new ce(o,n,i),c=0;for(let h=0;h<e.length;++h){let l=e[h];if(l.isInterleavedBufferAttribute){let u=c/n;for(let f=0,d=l.count;f<d;f++)for(let p=0;p<n;p++){let v=l.getComponent(f,p);a.setComponent(f+u,p,v)}}else o.set(l.array,c);c+=l.count*n}return s!==void 0&&(a.gpuType=s),a}var{META:me,GRADE_RLE:x0,PREDIOS:v0}=window.MAPA_DADOS,sb=me.cidade||"miami",We=me.costa!==!1;var hs=me.mpp,Pe=me.cel*hs,Ft=me.gw,be=me.gh,Oe=Ft*Pe,ke=be*Pe,pe={AGUA:0,CHAO:1,RUA:2,PARQUE:3,AREIA:4,PREDIO:5,PONTE:6,CENTRO:7,FLORESTA:8,CAMPO:9},cs=!!me.rural,uc=e=>e===2||e===7,ve=1;function _u(e){ve=e}function S0(e){let t=atob(e),n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}var Re=new Uint8Array(Ft*be);{let e=S0(x0),t=0;for(let n=0;n<e.length;n+=2)Re.fill(e[n],t,t+e[n+1]),t+=e[n+1]}var Te=new Int32Array(Ft*be).fill(-1);function $n(e,t){let n=Math.floor(e/Pe),i=Math.floor(t/Pe);return n<0||i<0||n>=Ft||i>=be?-1:i*Ft+n}function ny(e,t){let n=$n(e,t);return n<0?We?pe.AGUA:pe.CHAO:Re[n]}function He(e,t){let n=$n(e,t);return n<0?!1:Re[n]!==pe.AGUA&&Te[n]<0}function Fs(e,t){let n=$n(e,t);return n<0?We:Re[n]===pe.AGUA||Re[n]===pe.PONTE}function Os(e,t){let n=$n(e,t);return n<0?null:Te[n]>=0?Ie[Te[n]]:null}var ze={};for(let e in me.lugares){let[t,n,i]=me.lugares[e];ze[e]={nome:t,x:n*hs,z:i*hs}}var Ie=[];{let e=S0(v0),t=new Uint16Array(e.buffer,e.byteOffset,e.byteLength/2),n=0;for(;n<t.length;){let i=t[n],s=t[n+1]/4,r=new Float32Array(i*2);for(let p=0;p<i;p++)r[p*2]=t[n+2+p*2]/2*hs,r[p*2+1]=t[n+3+p*2]/2*hs;n+=2+i*2;let o=0;for(let p=0;p<i;p++){let v=(p+1)%i;o+=r[p*2]*r[v*2+1]-r[v*2]*r[p*2+1]}if(o>0)for(let p=0;p<i/2;p++){let v=i-1-p,m=r[p*2];r[p*2]=r[v*2],r[v*2]=m,m=r[p*2+1],r[p*2+1]=r[v*2+1],r[v*2+1]=m}let a=Math.abs(o)/2,c=0,h=0,l=1e9,u=-1e9,f=1e9,d=-1e9;for(let p=0;p<i;p++){let v=r[p*2],m=r[p*2+1];c+=v,h+=m,v<l&&(l=v),v>u&&(u=v),m<f&&(f=m),m>d&&(d=m)}c/=i,h/=i,Ie.push({id:Ie.length,pts:r,h:s,area:a,cx:c,cz:h,x0:l,x1:u,z0:f,z1:d,raio:Math.max(u-l,d-f)/2,cap:Math.max(4,Math.min(24,Math.round(a/50)+Math.floor(s/10))),guarnicao:[],civis:0,sos:!1,integridade:100,removido:!1})}}function oi(e,t,n){let i=e.pts,s=i.length/2,r=!1;for(let o=0,a=s-1;o<s;a=o++){let c=i[o*2],h=i[o*2+1],l=i[a*2],u=i[a*2+1];h>n!=u>n&&t<(l-c)*(n-h)/(u-h)+c&&(r=!r)}return r}function bu(){Te.fill(-1);for(let e of Ie){if(e.removido)continue;let t=Math.max(0,Math.floor(e.z0/Pe)),n=Math.min(be-1,Math.floor(e.z1/Pe)),i=Math.max(0,Math.floor(e.x0/Pe)),s=Math.min(Ft-1,Math.floor(e.x1/Pe)),r=!1;for(let o=t;o<=n;o++){let a=(o+.5)*Pe;for(let c=i;c<=s;c++)oi(e,(c+.5)*Pe,a)&&(Te[o*Ft+c]=e.id,r=!0)}if(!r){let o=$n(e.cx,e.cz);o>=0&&(Te[o]=e.id)}}for(let e=0;e<Re.length;e++)Re[e]===pe.PREDIO&&Te[e]<0&&(Re[e]=pe.CHAO)}function Mu(e,t,n){for(let i of Ie)!i.removido&&Math.hypot(i.cx-e,i.cz-t)<n+i.raio*.3&&(i.removido=!0)}var Fr=3.6,yu=3.4,je=4;function fc(e){let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function iy(e){let n=document.createElement("canvas"),i=document.createElement("canvas");n.width=n.height=i.width=i.height=256;let s=n.getContext("2d"),r=i.getContext("2d"),o=fc(e==="vidro"?7:e==="concreto"?11:23);r.fillStyle="#000",r.fillRect(0,0,256,256);let a=256/je;if(e==="vidro"){for(let l=0;l<je;l++)for(let u=0;u<je;u++){let f=u*a,d=l*a,p=s.createLinearGradient(f,d,f+a,d+a),v=.85+o()*.25;p.addColorStop(0,`rgb(${150*v|0},${178*v|0},${200*v|0})`),p.addColorStop(1,`rgb(${92*v|0},${118*v|0},${142*v|0})`),s.fillStyle=p,s.fillRect(f,d,a,a),s.fillStyle="rgba(255,255,255,0.18)",s.fillRect(f+a*.12,d+4,a*.18,a-10),o()<.35&&(r.fillStyle=`rgb(255,${220+o()*30|0},${150+o()*60|0})`,r.fillRect(f+3,d+6,a-6,a-12))}s.fillStyle="#d7dde2";for(let l=0;l<=je;l++)s.fillRect(0,l*a-3,256,6);s.fillStyle="#aeb8c0";for(let l=0;l<=je*2;l++)s.fillRect(l*a/2-1,0,2,256)}else if(e==="concreto"){s.fillStyle="#f2f0ec",s.fillRect(0,0,256,256);for(let l=0;l<1400;l++)s.fillStyle=`rgba(0,0,0,${o()*.05})`,s.fillRect(o()*256,o()*256,2,2);for(let l=0;l<je;l++)for(let u=0;u<je;u++){let f=u*a,d=l*a;s.fillStyle="#d9d6d0",s.fillRect(f+6,d+a*.72,a-12,4),s.fillStyle="#3c4a57",s.fillRect(f+9,d+a*.2,a-18,a*.52),s.fillStyle="rgba(160,190,215,0.55)",s.fillRect(f+9,d+a*.2,(a-18)*.45,a*.52),o()<.3&&(s.fillStyle="#e8e2d2",s.fillRect(f+9,d+a*.2,a-18,a*.52*o())),s.fillStyle="#9aa0a6",s.fillRect(f+a/2-1,d+a*.2,2,a*.52),o()<.4&&(r.fillStyle=`rgb(255,${200+o()*40|0},${120+o()*60|0})`,r.fillRect(f+9,d+a*.2,a-18,a*.52))}s.fillStyle="rgba(0,0,0,0.12)";for(let l=0;l<je;l++)s.fillRect(0,l*a+a-3,256,3)}else{s.fillStyle="#ffffff",s.fillRect(0,0,256,256);for(let l=0;l<900;l++)s.fillStyle=`rgba(0,0,0,${o()*.04})`,s.fillRect(o()*256,o()*256,2,2);for(let l=0;l<je;l++)for(let u=0;u<je;u++){let f=u*a,d=l*a;s.fillStyle="rgba(0,0,0,0.25)",s.fillRect(f+8,d+a*.22+4,a-16,5),s.fillStyle="#fafafa",s.fillRect(f+6,d+a*.2,a-12,5),s.fillStyle="#2f4a5a",s.fillRect(f+14,d+a*.3,a-28,a*.42),s.fillStyle="rgba(170,210,230,0.5)",s.fillRect(f+14,d+a*.3,(a-28)*.4,a*.42),s.fillStyle="#ffffff",s.fillRect(f+a/2-1.5,d+a*.3,3,a*.42),o()<.45&&(r.fillStyle=`rgb(255,${190+o()*50|0},${110+o()*60|0})`,r.fillRect(f+14,d+a*.3,a-28,a*.42))}s.fillStyle="rgba(0,0,0,0.08)",s.fillRect(0,248,256,8)}let c=new On(n),h=new On(i);for(let l of[c,h])l.wrapS=l.wrapT=Wn,l.anisotropy=8,l.colorSpace=Ue;return{t:c,te:h}}function sy(){let t=document.createElement("canvas");t.width=t.height=128;let n=t.getContext("2d"),i=fc(5);n.fillStyle="#8f8c86",n.fillRect(0,0,128,128);for(let r=0;r<2600;r++){let o=100+i()*90|0;n.fillStyle=`rgb(${o},${o-2},${o-6})`,n.fillRect(i()*128,i()*128,1+i()*2,1+i()*2)}n.strokeStyle="rgba(60,60,60,0.25)",n.lineWidth=1;for(let r=0;r<=4;r++)n.beginPath(),n.moveTo(r*32,0),n.lineTo(r*32,128),n.stroke();let s=new On(t);return s.wrapS=s.wrapT=Wn,s.anisotropy=8,s.colorSpace=Ue,s}function ry(){let t=document.createElement("canvas");t.width=t.height=128;let n=t.getContext("2d"),i=fc(31);n.fillStyle="#ffffff",n.fillRect(0,0,128,128);for(let r=0;r<128;r+=16){for(let o=r/16%2?-8:0;o<128;o+=16){let a=210+i()*45|0;n.fillStyle=`rgb(${a},${a},${a})`,n.beginPath(),n.ellipse(o+8,r+9,8,9,0,0,Math.PI),n.fill(),n.fillRect(o,r,16,9)}n.fillStyle="rgba(0,0,0,0.35)",n.fillRect(0,r+14,128,2)}let s=new On(t);return s.wrapS=s.wrapT=Wn,s.anisotropy=8,s.colorSpace=Ue,s}function oy(){let t=document.createElement("canvas"),n=document.createElement("canvas");t.width=t.height=n.width=n.height=256;let i=t.getContext("2d"),s=n.getContext("2d"),r=fc(41);s.fillStyle="#000",s.fillRect(0,0,256,256),i.fillStyle="#c9c4bc",i.fillRect(0,0,256,256);for(let h=0;h<256;h+=6)for(let l=h/6%2?-6:0;l<256;l+=12){let u=.85+r()*.3;i.fillStyle=`rgb(${255*u|0},${230*u|0},${220*u|0})`,i.fillRect(l+1,h+1,10,4)}let o=256/je;for(let h=0;h<je;h++)for(let l=0;l<je;l++){let u=l*o,f=h*o;i.fillStyle="#efece6",i.fillRect(u+12,f+o*.18,o-24,o*.6),i.fillStyle="#2e3a44",i.fillRect(u+15,f+o*.21,o-30,o*.54),i.fillStyle="rgba(150,180,205,0.5)",i.fillRect(u+15,f+o*.21,(o-30)*.45,o*.54),i.fillStyle="#efece6",i.fillRect(u+o/2-1,f+o*.21,2,o*.54),i.fillRect(u+15,f+o*.47,o-30,2),i.fillStyle="#e4ded4",i.fillRect(u+10,f+o*.78,o-20,4),r()<.4&&(s.fillStyle=`rgb(255,${200+r()*40|0},${120+r()*50|0})`,s.fillRect(u+15,f+o*.21,o-30,o*.54))}let a=new On(t),c=new On(n);for(let h of[a,c])h.wrapS=h.wrapT=Wn,h.anisotropy=8,h.colorSpace=Ue;return{t:a,te:c}}var ay=[14191212,14916218,13599334,15380622,15786696,13072994],y0=[11882542,11028010,12607546,10242608,6975348,5200482],cy=[16238540,12576988,16246694,12573938,16184042,16373682,14470128,16777215,13234406,16765148],ly=[15134967,13821167,14281704,15329778,15921906,13163496,14674399],hy=[15789026,14933458,16250094,14209477,15525080,15327439],Oi={};function Su(e){let t=["vidro","concreto","deco"];for(let h of t){let{t:l,te:u}=iy(h);Oi[h]=new sn({vertexColors:!0,map:l,emissiveMap:u,emissive:16777215,emissiveIntensity:0})}Oi.telhado=new sn({vertexColors:!0,map:sy()}),Oi.telha=new sn({vertexColors:!0,map:ry()});{let{t:h,te:l}=oy();Oi.tijolo=new sn({vertexColors:!0,map:h,emissiveMap:l,emissive:16777215,emissiveIntensity:0})}let n=700,i=new Map,s=h=>{let l=i.get(h);return l||(l={pos:[],nor:[],col:[],uv:[]},i.set(h,l)),l},r=new Vt,o=(h,l,u,f,d,p,v,m,g,_,y,b,R,w,A)=>{h.pos.push(l,p,u,f,p,d,f,v,d,l,p,u,f,v,d,l,v,u);for(let M=0;M<6;M++)h.nor.push(m,0,g),h.col.push(b,R,w);let P=p/A,S=v/A;h.uv.push(_,P,y,P,y,S,_,P,y,S,_,S)},a=(h,l,u,f,d,p,v,m)=>{let g=l-f/2,_=l+f/2,y=u-d/2,b=u+d/2,R=p+v,w=[[g,b,_,b,0,1],[_,b,_,y,1,0],[_,y,g,y,0,-1],[g,y,g,b,-1,0]];for(let[A,P,S,M,I,L]of w)o(h,A,P,S,M,p,R,I,L,0,.3,m,m,m*.98,6);h.pos.push(g,R,y,g,R,b,_,R,b,g,R,y,_,R,b,_,R,y);for(let A=0;A<6;A++)h.nor.push(0,1,0),h.col.push(m*1.05,m*1.05,m*1.03);h.uv.push(0,0,0,.2,.2,.2,0,0,.2,.2,.2,0)};for(let h of Ie){if(h.removido)continue;let l=Math.floor(h.cx/n)+","+Math.floor(h.cz/n),u=h.pts.length/2,f=h.h,d=h.pts,p=h.id*2654435761>>>0,v=null;if(f<11&&u>=4&&u<=6&&h.area<900){let S=[],M=[],I=0,L=0;for(let j=0;j<u;j++){let ft=(j+1)%u,Tt=Math.hypot(d[ft*2]-d[j*2],d[ft*2+1]-d[j*2+1]);Tt>L&&(L=Tt,I=j)}let U=(I+1)%u,D=(d[U*2]-d[I*2])/L,W=(d[U*2+1]-d[I*2+1])/L,H=1e9,nt=-1e9,V=1e9,Z=-1e9;for(let j=0;j<u;j++){let ft=d[j*2]-h.cx,Tt=d[j*2+1]-h.cz,Y=ft*D+Tt*W,B=-ft*W+Tt*D;H=Math.min(H,Y),nt=Math.max(nt,Y),V=Math.min(V,B),Z=Math.max(Z,B)}let J=(nt-H)*(Z-V);h.area/J>.82&&Z-V>4&&(v={ux:D,uz:W,a0:H,a1:nt,b0:V,b1:Z})}let m=f>45?"vidro":f>14?p%3===0&&f<30?"tijolo":"concreto":v&&p%2===0?"tijolo":"deco",g=m==="vidro"?ly:m==="concreto"?hy:m==="tijolo"?ay:cy;r.setHex(g[p%g.length]),h.cor=r.getHex();let _=s(l+","+m),y=s(l+",telhado"),b=f>6&&!v&&ve>=1?1.1:0,R=p%7*Fr;for(let S=0;S<u;S++){let M=(S+1)%u,I=d[S*2],L=d[S*2+1],U=d[M*2],D=d[M*2+1],W=U-I,H=D-L,nt=Math.hypot(W,H)||1,V=-H/nt,Z=W/nt,J=Math.max(1,Math.round(nt/Fr)),j=R/(Fr*je),ft=(R+J*Fr)/(Fr*je);if(R+=J*Fr,ve===0)o(_,I,L,U,D,0,f,V,Z,j,ft,r.r,r.g,r.b,yu*je);else{let Tt=Math.min(f,4);o(_,I,L,U,D,0,Tt,V,Z,j,ft,r.r*.8,r.g*.8,r.b*.82,yu*je),f>Tt&&o(_,I,L,U,D,Tt,f,V,Z,j,ft,r.r,r.g,r.b,yu*je)}b&&(o(y,I,L,U,D,f,f+b,V,Z,j*3,ft*3,r.r*.92,r.g*.92,r.b*.92,8),o(y,U,D,I,L,f,f+b,-V,-Z,j*3,ft*3,r.r*.7,r.g*.7,r.b*.7,8))}if(v){let S=s(l+",telha"),{ux:M,uz:I}=v,L=.5,U=v.a0-L,D=v.a1+L,W=v.b0-L,H=v.b1+L,nt=Math.min(4,(H-W)*.38),V=(W+H)/2,Z=(B,st,tt)=>[h.cx+B*M-st*I,tt,h.cz+B*I+st*M],J=new Vt(y0[(p>>4)%y0.length]),j=(B,st,tt,gt,St)=>{let xt=[st[0]-B[0],st[1]-B[1],st[2]-B[2]],Ht=[tt[0]-B[0],tt[1]-B[1],tt[2]-B[2]],K=xt[1]*Ht[2]-xt[2]*Ht[1],at=xt[2]*Ht[0]-xt[0]*Ht[2],z=xt[0]*Ht[1]-xt[1]*Ht[0];if(at<0){let ot=st;st=tt,tt=ot,K=-K,at=-at,z=-z;let _t=St[1];St[1]=St[2],St[2]=_t}let zt=Math.hypot(K,at,z)||1;for(let[ot,_t]of[[B,St[0]],[st,St[1]],[tt,St[2]]])S.pos.push(...ot),S.nor.push(K/zt,at/zt,z/zt),S.col.push(gt[0],gt[1],gt[2]),S.uv.push(_t[0],_t[1])},ft=[J.r,J.g,J.b],Tt=1/2.2,Y=Math.hypot(nt,(H-W)/2)/2.2;for(let[B,st]of[[W,1],[H,-1]]){let tt=Z(U,B,f),gt=Z(D,B,f),St=Z(D,V,f+nt),xt=Z(U,V,f+nt);j(tt,gt,St,ft,[[0,0],[(D-U)*Tt,0],[(D-U)*Tt,Y]]),j(tt,St,xt,ft,[[0,0],[(D-U)*Tt,Y],[0,Y]])}for(let B of[v.a0,v.a1]){let st=Z(B,v.b0,f),tt=Z(B,v.b1,f),gt=Z(B,V,f+nt*.95),St=B===v.a0?-1:1,xt=M*St,Ht=I*St;for(let K of[st,tt,gt])_.pos.push(...K),_.nor.push(xt,0,Ht),_.col.push(r.r,r.g,r.b),_.uv.push(.02,.02);for(let K of[st,gt,tt])_.pos.push(...K),_.nor.push(xt,0,Ht),_.col.push(r.r,r.g,r.b),_.uv.push(.02,.02)}continue}let w=[];for(let S=0;S<u;S++)w.push(new ct(d[S*2],d[S*2+1]));let A;try{A=gi.triangulateShape(w,[])}catch{A=[]}let P=.85+(p>>8)%20/100;for(let S of A){let[M,I,L]=S;if((w[I].x-w[M].x)*(w[L].y-w[M].y)-(w[I].y-w[M].y)*(w[L].x-w[M].x)>0){let D=I;I=L,L=D}for(let D of[M,I,L])y.pos.push(w[D].x,f,w[D].y),y.nor.push(0,1,0),y.col.push(P,P,P*.98),y.uv.push(w[D].x/8,w[D].y/8)}if(ve>=1&&f>8&&h.area>150){let S=1+p%3+(f>40?2:0);for(let M=0;M<S;M++){let I=(p>>M*3)%628/100,L=h.raio*.25*(M%3/2),U=h.cx+Math.sin(I)*L,D=h.cz+Math.cos(I)*L;if(!oi(h,U,D))continue;let W=f>40&&M===0;a(y,U,D,W?8:2.2+M%2,W?8:1.6+M%2,f,W?4:1.4,W?.8:.72)}}}let c=[];for(let[h,l]of i){let u=h.split(",")[2],[f,d]=h.split(",").map(Number),p=new de;p.setAttribute("position",new Gt(l.pos,3)),p.setAttribute("normal",new Gt(l.nor,3)),p.setAttribute("color",new Gt(l.col,3)),p.setAttribute("uv",new Gt(l.uv,2)),p.computeBoundingSphere();let v=new ae(p,Oi[u]);v.matrixAutoUpdate=!1,v.updateMatrix(),v.castShadow=ve>=1,v.receiveShadow=ve>=1,v.userData.cx=(f+.5)*n,v.userData.cz=(d+.5)*n,v.name="predios",e.add(v),c.push(v)}return c}var uy=[[44,104,140],[205,200,188],[86,88,94],[96,146,70],[232,214,164],[170,168,160],[110,110,114],[86,88,94],[52,82,38],[176,168,112]];function Eu(e=1){let t=document.createElement("canvas");t.width=Math.ceil(Ft/e),t.height=Math.ceil(be/e);let n=t.getContext("2d"),i=n.createImageData(t.width,t.height),s=i.data;for(let r=0;r<t.height;r++)for(let o=0;o<t.width;o++){let a=Math.min(be-1,r*e)*Ft+Math.min(Ft-1,o*e),c=Te[a]>=0?5:Re[a],h=uy[c],l=(r*t.width+o)*4;s[l]=h[0],s[l+1]=h[1],s[l+2]=h[2],s[l+3]=255}return n.putImageData(i,0,0),t}function fy(){let e=Ft*be,t=new Uint8Array(e);for(let c=0;c<e;c++)t[c]=uc(Re[c])&&Te[c]<0?1:0;let n=new Uint16Array(e),i=new Uint16Array(e);for(let c=0;c<be;c++){let h=0;for(;h<Ft;){if(!t[c*Ft+h]){h++;continue}let l=h;for(;l<Ft&&t[c*Ft+l];)l++;for(let u=h;u<l;u++)n[c*Ft+u]=l-h;h=l}}for(let c=0;c<Ft;c++){let h=0;for(;h<be;){if(!t[h*Ft+c]){h++;continue}let l=h;for(;l<be&&t[l*Ft+c];)l++;for(let u=h;u<l;u++)i[u*Ft+c]=l-h;h=l}}let s=8,r=c=>n[c]>=s&&i[c]>=s,o=new Uint8Array(e*4);for(let c=3;c<be-3;c++)for(let h=3;h<Ft-3;h++){let l=c*Ft+h;if(!t[l]||r(l))continue;let u=-1;if(i[l]>=s&&n[l]<s&&n[l]>=3&&(r(l-Ft)||r(l+Ft))?u=0:n[l]>=s&&i[l]<s&&i[l]>=3&&(r(l-1)||r(l+1))&&(u=1),u<0)continue;let f=!1;for(let d=-6;d<=6&&!f;d+=3)for(let p=-6;p<=6;p+=3){let v=l+d*Ft+p;if(v>=0&&v<e&&Te[v]>=0){f=!0;break}}f&&(o[l*4+u]=255)}let a=c=>Re[c]===pe.CENTRO;for(let c=2;c<be-2;c++)for(let h=2;h<Ft-2;h++){let l=c*Ft+h;if(!a(l)||r(l)||o[l*4]||o[l*4+1])continue;let u=0,f=0,d=0,p=0;for(let v=-3;v<=3;v++)(a(l+v)||a(l+v-Ft)||a(l+v+Ft))&&u++,(a(l+v*Ft)||a(l+v*Ft-1)||a(l+v*Ft+1))&&f++,a(l+v)&&d++,a(l+v*Ft)&&p++;u>=6&&p<=3&&d>=p&&!o[(l-Ft)*4+2]?o[l*4+2]=255:f>=6&&d<=3&&p>d&&!o[(l-1)*4+3]&&(o[l*4+3]=255)}return o}function Tu(e){let t=new Uint8Array(Ft*be*4);for(let l=0;l<Ft*be;l++){let u=Re[l],f=l*4;t[f]=u===pe.RUA||u===pe.PONTE||u===pe.CENTRO?255:0,t[f+1]=u===pe.PARQUE?255:0,t[f+2]=u===pe.AREIA||u===pe.CENTRO?255:0,t[f+3]=Te[l]>=0?255:0}let n=new ss(t,Ft,be,xn,Sn);n.magFilter=en,n.minFilter=en,n.needsUpdate=!0;let i=new Uint8Array(Ft*be*4);for(let l=0;l<Ft*be;l++)i[l*4]=Re[l]===pe.FLORESTA?255:0,i[l*4+1]=Re[l]===pe.CAMPO?255:0;let s=new ss(i,Ft,be,xn,Sn);s.magFilter=en,s.minFilter=en,s.needsUpdate=!0;let r=new ss(fy(),Ft,be,xn,Sn);r.magFilter=fn,r.minFilter=fn,r.needsUpdate=!0;let o=new sn({color:16777215});o.onBeforeCompile=l=>{l.uniforms.mapa={value:n},l.uniforms.marcas={value:r},l.uniforms.terreno2={value:s},l.uniforms.tam={value:new ct(Oe,ke)},l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vW = (modelMatrix * vec4(transformed, 1.0)).xyz;`),l.fragmentShader=l.fragmentShader.replace("#include <common>",`#include <common>
      uniform sampler2D mapa; uniform sampler2D marcas; uniform sampler2D terreno2; uniform vec2 tam; varying vec3 vW;
      ${ve===0?`float ru(vec2 p){ return 0.5; }
      float fbm(vec2 p){ return 0.5; }`:`float h1(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float ru(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(h1(i), h1(i+vec2(1,0)), u.x), mix(h1(i+vec2(0,1)), h1(i+vec2(1,1)), u.x), u.y); }
      float fbm(vec2 p){ return ru(p)*0.5 + ru(p*2.07)*0.3 + ru(p*4.13)*0.2; }`}`).replace("#include <map_fragment>",`
      {
        vec2 uv = vW.xz / tam;
        vec4 m = texture2D(mapa, uv);
        vec4 mk = texture2D(marcas, uv);
        vec4 tr2 = texture2D(terreno2, uv);
        float vProf = length(vViewPosition);
        float det = 1.0 - smoothstep(250.0, 1400.0, vProf);
        vec2 p = vW.xz;
        float n1 = fbm(p * 0.18), n2 = ru(p * 3.1) * det, n3 = fbm(p * 0.012);
        float rua = smoothstep(0.42, 0.58, m.r), grama = smoothstep(0.35, 0.6, m.g), areia = smoothstep(0.35, 0.6, m.b) * (1.0 - smoothstep(0.2, 0.5, m.r));
        // cal\xE7ada de placas de concreto com meio-fio
        vec2 q = abs(fract(p / 2.4) - 0.5);
        float junta = smoothstep(0.46, 0.5, max(q.x, q.y)) * det;
        vec3 calc = vec3(0.70, 0.68, 0.64) * (0.9 + 0.1 * n1 + 0.06 * n2) - junta * 0.07;
        float meioFio = (smoothstep(0.30, 0.36, m.r) - smoothstep(0.40, 0.46, m.r)) * det;
        calc = mix(calc, vec3(0.86, 0.85, 0.82), meioFio * 0.9);
        // asfalto
        vec3 asf = vec3(0.25, 0.255, 0.265) * (0.82 + 0.25 * n1 + 0.14 * n2);
        asf *= 1.0 - smoothstep(0.62, 0.75, ru(p * 0.6)) * 0.12 * det;
        float faixa = (smoothstep(0.60, 0.63, m.r) - smoothstep(0.66, 0.70, m.r)) * det;
        asf = mix(asf, vec3(0.86, 0.85, 0.80), faixa * 0.7);
        // faixa amarela dupla, reta, no centro da c\xE9lula
        float cz = abs(abs(fract(p.y / ${Pe.toFixed(4)}) - 0.5) * ${Pe.toFixed(4)} - 0.16);
        float cx = abs(abs(fract(p.x / ${Pe.toFixed(4)}) - 0.5) * ${Pe.toFixed(4)} - 0.16);
        float amar = mk.b * (1.0 - smoothstep(0.06, 0.1, cz)) + mk.a * (1.0 - smoothstep(0.06, 0.1, cx));
        asf = mix(asf, vec3(0.95, 0.76, 0.18), amar * det * 0.9);
        // faixa de pedestre (zebra) nos cruzamentos
        float zx = step(0.5, fract(p.x / 1.1)), zz = step(0.5, fract(p.y / 1.1));
        float zebra = (mk.r * zx + mk.g * zz) * det;
        asf = mix(asf, vec3(0.9, 0.9, 0.87), zebra * 0.85);
        vec3 gr = mix(vec3(0.26, 0.36, 0.15), vec3(0.42, 0.50, 0.24), n1) * (0.85 + 0.3 * n2);
        vec3 ar = vec3(0.90, 0.80, 0.60) * (0.93 + 0.08 * n1 + 0.05 * n2);
        // estacionamentos com vagas pintadas e gramados entre os pr\xE9dios
        float lote = fbm(p * 0.021 + 7.0), jard = fbm(p * 0.03 - 3.0);
        float ehLote = smoothstep(0.58, 0.68, lote);
        vec3 estac = vec3(0.30, 0.305, 0.31) * (0.9 + 0.2 * n2);
        float vz = fract(p.y / 15.0);
        float vaga = step(fract(p.x / 2.7), 0.05) * (step(0.12, vz) * step(vz, 0.44) + step(0.56, vz) * step(vz, 0.88)) * det;
        estac = mix(estac, vec3(0.88), vaga * 0.8);
        ${cs?`// interior: gramado no lugar da cal\xE7ada (a cal\xE7ada fica s\xF3 junto da rua) e sem estacionamentos aleat\xF3rios
        vec3 gramado = mix(vec3(0.34, 0.44, 0.2), vec3(0.42, 0.5, 0.24), n1) * (0.88 + 0.22 * n2);
        calc = mix(gramado, calc, smoothstep(0.06, 0.3, m.r));
        ehLote = 0.0;`:""}
        vec3 c = mix(calc, estac, ehLote * 0.9);
        c = mix(c, gr * 0.95, smoothstep(0.6, 0.7, jard) * 0.85);
        ${cs?`// no interior os parques s\xE3o o p\xE2ntano dos Everglades: capim-serra amarelado com po\xE7as
        vec3 serra = mix(vec3(0.5, 0.48, 0.27), vec3(0.4, 0.45, 0.22), n1) * (0.88 + 0.25 * n2);
        float poca = smoothstep(0.66, 0.7, fbm(p * 0.012 + 3.7)) * grama;
        gr = mix(serra, vec3(0.14, 0.26, 0.24) * (0.9 + 0.2 * n2), poca);`:""}
        c = mix(c, gr, grama);
        // mata/floresta (ch\xE3o escuro coberto de folhas) e fazendas (fileiras de planta\xE7\xE3o)
        float flor = smoothstep(0.35, 0.6, tr2.r), camp = smoothstep(0.35, 0.6, tr2.g);
        // copa fechada vista de cima: tufos verdes com sombra escura entre eles
        float copaN = fbm(p * 0.33) * 0.6 + fbm(p * 0.09 + 1.3) * 0.4;
        vec3 chaoMata = mix(vec3(0.05, 0.085, 0.035), vec3(0.17, 0.27, 0.09), smoothstep(0.38, 0.62, copaN)) * (0.85 + 0.35 * n2);
        vec2 lote2 = floor(p / 160.0);
        float hl = fract(sin(dot(lote2, vec2(12.9898, 78.233))) * 43758.5453);
        float eixo = hl > 0.5 ? p.x : p.y;
        float fileira = 0.5 + 0.5 * sin(eixo * 2.2);
        vec3 lavoura = hl > 0.8 ? vec3(0.5, 0.43, 0.3) * (0.92 + 0.12 * n1) : mix(vec3(0.44, 0.37, 0.24), vec3(0.32, 0.47, 0.18) * (0.8 + 0.4 * hl), smoothstep(0.35, 0.65, fileira) * det + (1.0 - det) * 0.5);
        c = mix(c, chaoMata, flor);
        c = mix(c, lavoura, camp);
        c = mix(c, ar, areia);
        c = mix(c, asf, rua);
        c *= 0.9 + 0.18 * n3;
        c *= 1.0 - smoothstep(0.05, 0.6, m.a) * 0.3;
        diffuseColor.rgb = c;
      }`)};let a=new is(Oe,ke,48,28);a.rotateX(-Math.PI/2),a.translate(Oe/2,0,ke/2);let c=new ae(a,o);c.name="chao",c.receiveShadow=!0,e.add(c);let h=new ae(new is(8e4,8e4).rotateX(-Math.PI/2),new Fn({color:We?997946:cs?4017450:9276032}));return h.position.set(Oe/2,-4,ke/2),e.add(h),c}function wu(e){let t=new Uint8Array(Ft*be);for(let a=0;a<t.length;a++)t[a]=Re[a]===pe.AGUA?255:0;let n=new ss(t,Ft,be,Ao,Sn);n.magFilter=en,n.minFilter=en,n.needsUpdate=!0;let i={value:0},s=new To({color:16777215,transparent:!0,depthWrite:!1,shininess:90,specular:5596774,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4});s.onBeforeCompile=a=>{a.uniforms.mascara={value:n},a.uniforms.tam={value:new ct(Oe,ke)},a.uniforms.tempo=i,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vW = (modelMatrix * vec4(transformed, 1.0)).xyz;`),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
      uniform sampler2D mascara; uniform vec2 tam; uniform float tempo; varying vec3 vW;
      ${ve===0?"float rua2(vec2 p){ return 0.45 + 0.1 * sin(p.x * 3.0 + p.y * 2.0); }":`float h1a(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float rua2(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(h1a(i), h1a(i+vec2(1,0)), u.x), mix(h1a(i+vec2(0,1)), h1a(i+vec2(1,1)), u.x), u.y); }`}`).replace("#include <map_fragment>",`
      {
        vec2 uv = vW.xz / tam;
        float mm = ${We?"1.0":"0.0"};
        if (uv.x > 0.0 && uv.y > 0.0 && uv.x < 1.0 && uv.y < 1.0) mm = texture2D(mascara, uv).r;
        if (mm < 0.45) discard;
        float prof = length(vViewPosition);
        float det = 1.0 - smoothstep(600.0, 3000.0, prof);
        vec2 p = vW.xz;
        float fundo = smoothstep(0.45, 0.98, mm);
        vec3 raso = vec3(0.16, 0.38, 0.36), alto = vec3(0.06, 0.20, 0.21);
        vec3 c = mix(raso, alto, fundo);
        float o = rua2(p * 0.03 + vec2(tempo * 0.05, tempo * 0.03));
        c *= 0.88 + 0.24 * o;
        // espuma nas cristas: tra\xE7os alongados que andam com o vento
        vec2 q = vec2(p.x * 0.022 + p.y * 0.008, p.y * 0.06 - p.x * 0.012) + vec2(tempo * 0.04, tempo * 0.1);
        float cr = rua2(q) * 0.65 + rua2(q * 2.3) * 0.35;
        float espuma = smoothstep(0.70, 0.74, cr) * (1.0 - smoothstep(0.74, 0.80, cr));
        espuma *= smoothstep(0.35, 0.65, rua2(p * 0.004 + tempo * 0.01)) * det;
        // arrebenta\xE7\xE3o junto \xE0 costa
        float costa = (1.0 - smoothstep(0.5, 0.75, mm)) * (0.6 + 0.4 * sin(tempo * 1.4 + p.x * 0.05 + p.y * 0.03));
        c = mix(c, vec3(0.85, 0.9, 0.88), clamp(espuma * 0.85 + costa * 0.7, 0.0, 1.0));
        diffuseColor.rgb = c;
        diffuseColor.a = 0.9 + 0.1 * fundo;
      }`)};let r=new is(Oe+3e4,ke+3e4,64,48);r.rotateX(-Math.PI/2);let o=new ae(r,s);return o.position.set(Oe/2,.3,ke/2),o.renderOrder=1,o.receiveShadow=!0,o.userData.tempo=i,e.add(o),o}function ls(e,t){let n=e.attributes.position.count,i=new Float32Array(n*3);for(let s=0;s<n;s++){let r=t(e.attributes.position.getY(s),s);i[s*3]=r[0],i[s*3+1]=r[1],i[s*3+2]=r[2]}return e.setAttribute("color",new ce(i,3)),e.attributes.uv&&e.deleteAttribute("uv"),e}function dy(){let e=[],t=[],n=ve>=2?6:3;for(let o=0;o<n;o++){let a=9.5/n,c=new An(.19-o*.02,.22-o*.02,a*1.03,5,1,!0).toNonIndexed(),h=(o/n)**2*.9;c.rotateZ(-.06*o/n),c.translate(h,a/2+o*a,0);let l=o%2?.86:1;e.push(ls(c,u=>[.62*l,.5*l,.36*l]))}let i=.9,s=9.6;for(let o=0;o<(ve>=2?4:0);o++){let a=new qn(.16,6,4).toNonIndexed();a.translate(i+Math.cos(o*1.6)*.22,s-.25,Math.sin(o*1.6)*.22),e.push(ls(a,()=>[.42,.33,.12]))}let r=ve>=2?10:ve===1?8:7;for(let o=0;o<r;o++){let a=o/r*Math.PI*2+o%2*.25,c=4+o%3*.6,h=.25+o%4*.18+(o>=8?.35:-.1),l=[],u=ve>=2?5:2,f=[],d=[],p=0,v=0;for(let g=0;g<=u;g++){let _=g/u,y=_*c,b=Math.sin(_*1.2)*.9-_*_*c*h,R=Math.sin(_*Math.PI)*.75+.05;l.push([y,b,R])}for(let g=0;g<u;g++){let[_,y,b]=l[g],[R,w,A]=l[g+1];for(let P of[-1,1]){let S=P*b,M=P*A;f.push(_,y,0,R,w,0,R,w-.25*A,M,_,y,0,R,w-.25*A,M,_,y-.25*b,S);let I=.85+g/u*.3;for(let L=0;L<6;L++)d.push(.24*I,.5*I,.2*I)}}let m=new de;m.setAttribute("position",new Gt(f,3)),m.setAttribute("color",new Gt(d,3)),m.computeVertexNormals(),m.rotateY(a),m.translate(i,s,0),t.push(m)}return{tronco:Yn(e),folhas:Yn(t)}}function py(){let e=[],t=[],n=new An(.25,.42,3.4,5,1,!0).toNonIndexed();n.translate(0,1.7,0),e.push(ls(n,()=>[.42,.33,.24]));for(let s=0;s<(ve>=1?3:0);s++){let r=new An(.1,.18,2.2,4,1,!0).toNonIndexed();r.rotateZ(.8),r.rotateY(s*2.1),r.translate(Math.cos(s*2.1)*.6,3.6,-Math.sin(s*2.1)*.6),e.push(ls(r,()=>[.4,.31,.22]))}let i=[[0,5.4,0,2.6],[1.7,4.8,.6,1.9],[-1.5,4.9,-.7,2],[.4,4.6,-1.8,1.8],[-.6,4.7,1.7,1.8],[.3,6.6,.2,1.7]];for(let[s,r,o,a]of ve>=1?i:[[0,5.2,0,3],[.6,6.4,.3,2]]){let c=new So(a,0).toNonIndexed();c.scale(1,.8,1),c.translate(s,r,o),t.push(ls(c,(h,l)=>{let u=.75+(h-3.5)/4*.35+l*7919%13/100;return[.3*u,.47*u,.2*u]}))}return{tronco:Yn(e),copa:Yn(t)}}function my(){let e=[],t=[],n=new An(.16,.3,13,5,1,!0).toNonIndexed();n.translate(0,6.5,0),e.push(ls(n,()=>[.45,.33,.24]));let i=ve>=1?[[0,13.6,0,1.6],[1,12.6,.4,1.2],[-.9,12.9,-.5,1.25],[.3,11.6,-1,1.1],[-.4,14.5,.3,1.1]]:[[0,13.4,0,2],[.4,12,.3,1.4]];for(let[s,r,o,a]of i){let c=new So(a,0).toNonIndexed();c.scale(1.25,.6,1.25),c.translate(s,r,o),t.push(ls(c,(h,l)=>{let u=.7+l*7919%17/100;return[.24*u,.38*u,.17*u]}))}return{tronco:Yn(e),copa:Yn(t)}}function gy(){for(let e=0;e<60;e++){let t=Math.random()*Oe,n=Math.random()*ke,i=$n(t,n);if(i<0||Te[i]>=0)continue;let s=Re[i];if(s===pe.FLORESTA&&Math.random()<.9)return{x:t,z:n,tipo:Math.random()<.55?2:1};if(s===pe.CAMPO){if(Math.random()<.004)return{x:t,z:n,tipo:1};continue}if(s===pe.PARQUE&&cs){if(Math.random()<.55)return{x:t,z:n,tipo:Math.random()<.6?2:1};continue}if(s===pe.PARQUE&&Math.random()<.6)return{x:t,z:n,tipo:Math.random()<.5?0:1};if(s===pe.AREIA&&Math.random()<.35)return{x:t,z:n,tipo:0};if(s===pe.CHAO){let r=i%Ft,o=i/Ft|0,a=!1;for(let[c,h]of[[1,0],[-1,0],[0,1],[0,-1]]){let l=(o+h)*Ft+r+c;l>=0&&l<Re.length&&uc(Re[l])&&(a=!0)}if(a&&Math.random()<.5)return{x:t,z:n,tipo:Math.random()<.7?0:1};if(!a&&Math.random()<.04)return{x:t,z:n,tipo:Math.random()<.5?0:1}}}return null}var Or=400;function Bs(e,t,n,i,s,r){let o=new Map;for(let p of i){let v=Math.floor(p.x/Or)+","+Math.floor(p.z/Or),m=o.get(v);m||(m=[],o.set(v,m)),m.push(p)}let a=[],c=new re,h=new Tn,l=new Fe,u=new N,f=new N,d=new Vt;for(let[p,v]of o){let m=new Ir(t,n,v.length);v.forEach((y,b)=>{l.set(0,y.ang,0),h.setFromEuler(l),c.compose(f.set(y.x,y.y||0,y.z),h,u.set(y.sx,y.sy,y.sz)),m.setMatrixAt(b,c),y.cor?m.setColorAt(b,d.setHex(y.cor)):y.hsl&&m.setColorAt(b,d.setHSL(...y.hsl)),y.malha=m,y.idx=b}),m.computeBoundingSphere(),m.castShadow=s,m.receiveShadow=!1;let[g,_]=p.split(",").map(Number);m.userData.cx=(g+.5)*Or,m.userData.cz=(_+.5)*Or,m.userData.tipo=r,e.add(m),a.push(m)}return a}function Au(e,t=2600,n=null){let i=new sn({vertexColors:!0}),s=new sn({vertexColors:!0,side:ii}),r=dy(),o=py(),a=my();ve===0&&(t=Math.round(t*.7));let c=Math.round(t*(cs?.12:.65)),h=cs?Math.round(t*.48):0,l=t-c-h,u=[],f=[],d=[],p=0;for(;(u.length<c||f.length<l||d.length<h)&&p<t*6;){p++;let _=gy();if(!(!_||n&&n(_.x,_.z))){if(_.tipo===0&&u.length<c){let y=.8+Math.random()*.5;u.push({x:_.x,z:_.z,ang:Math.random()*6.28,sx:y,sy:y*(.9+Math.random()*.3),sz:y,hsl:[.24+Math.random()*.08,.5,.75+Math.random()*.4]})}else if(_.tipo===2&&d.length<h||_.tipo===1&&f.length<l){let y=cs?4+(Math.random()*7|0):1;for(let b=0;b<y;b++){let R=b?_.x+(Math.random()-.5)*30:_.x,w=b?_.z+(Math.random()-.5)*30:_.z;if(b){let P=$n(R,w);if(P<0||Te[P]>=0||Re[P]!==pe.FLORESTA&&Re[P]!==pe.PARQUE)continue}let A=b&&Math.random()<.3?3-_.tipo:_.tipo;if(A===2&&d.length<h){let P=.8+Math.random()*.55;d.push({x:R,z:w,ang:Math.random()*6.28,sx:P,sy:P*(.85+Math.random()*.35),sz:P,hsl:[.25+Math.random()*.06,.4,.62+Math.random()*.3]})}else if(A===1&&f.length<l){let P=.75+Math.random()*.6;f.push({x:R,z:w,ang:Math.random()*6.28,sx:P,sy:P,sz:P,hsl:[.22+Math.random()*.1,.45,.8+Math.random()*.35]})}}}}}let v=ve>=2,m=u.map(_=>({..._,hsl:null,cor:16777215})),g=f.map(_=>({..._,hsl:null,cor:16777215}));return[...Bs(e,r.tronco,i,m,v,"arvore"),...Bs(e,r.folhas,s,u,v,"arvore"),...Bs(e,o.tronco,i,g,v,"arvore"),...Bs(e,o.copa,i,f,v,"arvore"),...d.length?Bs(e,a.tronco,i,d.map(_=>({..._,hsl:null,cor:16777215})),v,"arvore"):[],...d.length?Bs(e,a.copa,i,d,v,"arvore"):[]]}var Ru={lista:[]};function Cu(e,t=1600,n){let i=[],s=(l,u,f,d,p)=>{let v=l.toNonIndexed();v.translate(f,d,p),i.push(ls(v,()=>u))};s(new dn(1.8,.62,4.4),[1,1,1],0,.6,0),s(new dn(1.62,.5,2.2),[.95,.95,.95],0,1.15,-.25),s(new dn(1.64,.36,2.04),[.18,.22,.27],0,1.15,-.25),s(new dn(1.7,.42,3.4),[.08,.08,.08],0,.26,0),ve>=1&&(s(new dn(1.2,.12,.05),[2.2,2.1,1.8],0,.7,2.21),s(new dn(1.2,.12,.05),[1.6,.2,.15],0,.75,-2.21));let r=Yn(i),o=ve>=1?new To({vertexColors:!0,shininess:60,specular:4473924}):new sn({vertexColors:!0}),a=[15921906,1842204,10133414,11740702,2245242,6975348,14207136,2907706,15251504,5909098,13685976,3817544];ve===0&&(t=Math.round(t*.6));let c=[],h=0;for(;c.length<t&&h<t*80;){h++;let l=1+Math.floor(Math.random()*(Ft-2)),u=1+Math.floor(Math.random()*(be-2)),f=u*Ft+l;if(Re[f]!==pe.RUA||Te[f]>=0)continue;let d=0,p=0;for(let[y,b]of[[1,0],[-1,0],[0,1],[0,-1]]){let R=Re[f+b*Ft+y];!uc(R)&&R!==pe.AGUA&&R!==pe.PONTE&&(d=y,p=b)}if(!d&&!p)continue;let v=(l+.5)*Pe+d*.9,m=(u+.5)*Pe+p*.9;if(n&&n(v,m))continue;let g=!1;for(let y=Math.max(0,c.length-40);y<c.length;y++)if(Math.abs(c[y].x-v)<6&&Math.abs(c[y].z-m)<6){g=!0;break}if(g)continue;let _=(d!==0?0:Math.PI/2)+(Math.random()<.5?Math.PI:0)+(Math.random()-.5)*.08;c.push({x:v,z:m,ang:_,sx:1,sy:1,sz:1,cor:a[Math.random()*a.length|0]})}return Ru.lista=c,Bs(e,r,o,c,!1,"carro")}function Pu(e,t,n){let i=ve===0?1:ve===1?1.4:2,s=n>1600?0:Math.max(300,Math.min(1400,n*1.3*i+200)),r=n>900?0:Math.max(250,Math.min(900,n*1*i+150));for(let o of e){let a=o.userData.tipo==="carro"?r:s,c=o.userData.cx-t.x,h=o.userData.cz-t.z;o.visible=a>0&&c*c+h*h<(a+Or*.7)*(a+Or*.7)}}function Iu(e,t,n,i){for(let s of e){let r=s.userData.cx-t.x,o=s.userData.cz-t.z;s.visible=r*r+o*o<(i+400)*(i+400)}}var _0=new re,b0=new Tn,M0=new Fe,xy=new N,vy=new N;function zu(e,t,n){let i=0;for(let s of Ru.lista){if(s.esmagado)continue;let r=s.x-e,o=s.z-t;r*r+o*o<n*n&&(s.esmagado=!0,M0.set(0,s.ang,(Math.random()-.5)*.2),b0.setFromEuler(M0),_0.compose(vy.set(s.x,-.1,s.z),b0,xy.set(1.08,.35,1.04)),s.malha.setMatrixAt(s.idx,_0),s.malha.instanceMatrix.needsUpdate=!0,i++)}return i}function yy(e,t){let n=(t+180)/360*Math.pow(2,me.z)*256-me.gx0,i=e*Math.PI/180,s=(1-Math.asinh(Math.tan(i))/Math.PI)/2*Math.pow(2,me.z)*256-me.gy0;return{x:n*hs,z:s*hs}}var ht=(e=0,t=1)=>e+Math.random()*(t-e),dc=(e,t)=>Math.floor(ht(e,t+1)),yi=e=>e[Math.floor(Math.random()*e.length)],rn=(e,t,n)=>e<t?t:e>n?n:e,E0=(e,t,n)=>e+(t-e)*n,$e=(e,t,n,i)=>{let s=e-n,r=t-i;return s*s+r*r},Ot=(e,t,n,i)=>Math.sqrt($e(e,t,n,i));function ki(e,t){let n=t-e;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return n}function Ve(e,t,n){let i=ki(e,t);return Math.abs(i)<=n?t:e+Math.sign(i)*n}var Ro=class{constructor(t,n,i,s){this.cel=t,this.nx=Math.ceil(n/t)+1,this.nz=Math.ceil(i/t)+1,this.head=new Int32Array(this.nx*this.nz).fill(-1),this.next=new Int32Array(s),this.itens=[],this.usadas=[]}chave(t,n){let i=Math.floor(t/this.cel),s=Math.floor(n/this.cel);return i<0?i=0:i>=this.nx&&(i=this.nx-1),s<0?s=0:s>=this.nz&&(s=this.nz-1),s*this.nx+i}limpar(){for(let t of this.usadas)this.head[t]=-1;this.usadas.length=0,this.itens.length=0}add(t){let n=this.itens.length;if(n>=this.next.length){let s=new Int32Array(this.next.length*2);s.set(this.next),this.next=s}this.itens.push(t);let i=this.chave(t.x,t.z);this.head[i]===-1&&this.usadas.push(i),this.next[n]=this.head[i],this.head[i]=n}busca(t,n,i,s){let r=this.cel,o=Math.max(0,Math.floor((t-i)/r)),a=Math.min(this.nx-1,Math.floor((t+i)/r)),c=Math.max(0,Math.floor((n-i)/r)),h=Math.min(this.nz-1,Math.floor((n+i)/r)),l=i*i;for(let u=c;u<=h;u++)for(let f=o;f<=a;f++){let d=this.head[u*this.nx+f];for(;d!==-1;){let p=this.itens[d],v=p.x-t,m=p.z-n,g=v*v+m*m;if(g<=l&&s(p,g))return;d=this.next[d]}}}maisProximo(t,n,i,s){let r=null,o=1/0;return this.busca(t,n,i,(a,c)=>{c<o&&(!s||s(a))&&(o=c,r=a)}),r}contar(t,n,i,s){let r=0;return this.busca(t,n,i,o=>{(!s||s(o))&&r++}),r}};function Uu(e,t=!0){let n=e[0].length,i=e.length,s=[],r=[],o=[],a=0;for(let m=0;m<i;m++){if(m>0){let _=0;for(let y=0;y<n;y++){let b=e[m][y],R=e[m-1][y];_+=Math.hypot(b[0]-R[0],b[1]-R[1],b[2]-R[2])}a+=_/n}let g=0;for(let _=0;_<n;_++){let y=e[m][_];if(_>0){let b=e[m][_-1];g+=Math.hypot(y[0]-b[0],y[1]-b[1],y[2]-b[2])}s.push(y[0],y[1],y[2]),r.push(g/2.2,a/2.2)}}for(let m=0;m<i-1;m++)for(let g=0;g<n;g++){let _=m*n+g,y=m*n+(g+1)%n,b=(m+1)*n+g,R=(m+1)*n+(g+1)%n;o.push(_,b,y,y,b,R)}let c=new de;c.setAttribute("position",new Gt(s,3)),c.setAttribute("uv",new Gt(r,2)),c.setIndex(o);let h=0,l=0,u=0;for(let m=0;m<s.length;m+=3)h+=s[m],l+=s[m+1],u+=s[m+2];let f=s.length/3;h/=f,l/=f,u/=f;let d=0;for(let m=0;m<o.length;m+=3){let g=o[m]*3,_=o[m+1]*3,y=o[m+2]*3,b=s[g]-h,R=s[g+1]-l,w=s[g+2]-u,A=s[_]-h,P=s[_+1]-l,S=s[_+2]-u,M=s[y]-h,I=s[y+1]-l,L=s[y+2]-u;d+=b*(P*L-S*I)-R*(A*L-S*M)+w*(A*I-P*M)}let p=d<0;if(p){for(let m=0;m<o.length;m+=3){let g=o[m+1];o[m+1]=o[m+2],o[m+2]=g}c.setIndex(o)}if(c.computeVertexNormals(),c=c.toNonIndexed(),!t)return c;let v=[c];for(let[m,g]of[[0,-1],[i-1,1]]){let _=e[m],y=0,b=0,R=0;for(let M of _)y+=M[0],b+=M[1],R+=M[2];y/=n,b/=n,R/=n;let w=0;for(let M of _)w=Math.max(w,Math.hypot(M[0]-y,M[1]-b,M[2]-R));if(w<.001)continue;let A=[],P=[];for(let M=0;M<n;M++){let I=_[M],L=_[(M+1)%n],U=[[y,b,R],I,L];g<0!==p&&(U=[[y,b,R],L,I]);for(let D of U)A.push(D[0],D[1],D[2]),P.push(.5,.5)}let S=new de;S.setAttribute("position",new Gt(A,3)),S.setAttribute("uv",new Gt(P,2)),S.computeVertexNormals(),v.push(S)}return _y(v)}function _y(e){let t=0;for(let a of e)t+=a.attributes.position.count;let n=new Float32Array(t*3),i=new Float32Array(t*3),s=new Float32Array(t*2),r=0;for(let a of e)n.set(a.attributes.position.array,r*3),i.set(a.attributes.normal.array,r*3),s.set(a.attributes.uv.array,r*2),r+=a.attributes.position.count;let o=new de;return o.setAttribute("position",new ce(n,3)),o.setAttribute("normal",new ce(i,3)),o.setAttribute("uv",new ce(s,2)),o}var pc=(e,t)=>Math.sign(e)*Math.pow(Math.abs(e),2/t);function by(e,t,n){var s,r,o,a,c,h;let i=[];for(let l=0;l<n;l++){let u=-Math.PI/2+l/n*Math.PI*2,f=Math.cos(u),d=Math.sin(u),p=d>=0?(r=(s=t.nT)!=null?s:t.n)!=null?r:2.4:(a=(o=t.nB)!=null?o:t.n)!=null?a:2.4,v=(f>=0?(c=t.wR)!=null?c:t.w:(h=t.wL)!=null?h:t.w)/2;i.push([(t.x||0)+v*pc(f,p),(t.y||0)+(d>=0?t.hT:t.hB)*pc(d,p),e])}return i}function Yt(e,t=18,n=!0){return Uu(e.map(i=>by(i.z,i,t)),n)}function Co(e,t=14,n=!0){return Uu(e.map(i=>{var r;let s=[];for(let o=0;o<t;o++){let a=o/t*Math.PI*2,c=Math.cos(a),h=Math.sin(a),l=(r=i.n)!=null?r:2.2;s.push([(i.x||0)+i.w/2*pc(c,l),i.y,(i.z||0)+(h>=0?i.f:i.t)*pc(h,l)])}return s}),n)}function Xe(e,t,n=null,i=9){if(!n){let r=t.p[0]-e.p[0],o=t.p[1]-e.p[1],a=t.p[2]-e.p[2],c=o,h=-r,l=0,u=Math.hypot(c,h,l)||1;n=[c/u,h/u,l/u],(n[1]<0||Math.abs(n[1])<1e-6&&n[0]<0)&&(n=n.map(f=>-f))}let s=r=>{var f;let[o,a,c]=r.p,h=r.corda,l=(f=r.esp)!=null?f:.08,u=[];for(let d=0;d<i*2;d++){let p=d<i,v=p?1-d/(i-1):(d-i)/(i-1),m=Math.pow(v,1.6),g=5*l*(.2969*Math.sqrt(m)-.126*m-.3516*m*m+.2843*m**3-.1036*m**4),_=(p?1:-1)*g*h;u.push([o+n[0]*_,a+n[1]*_,c-m*h+n[2]*_])}return u};return Uu([s(e),s(t)],!0)}var T0=new re,w0=new Tn,A0=new Fe,My=new N,Sy=new N,mc=new Vt;function Ey(){let t=document.createElement("canvas");t.width=t.height=128;let n=t.getContext("2d");n.fillStyle="#f4f4f4",n.fillRect(0,0,128,128);let i=9,s=()=>(i=i*1664525+1013904223>>>0,i/4294967296);for(let a=0;a<900;a++){let c=200+s()*55|0;n.fillStyle=`rgba(${c},${c},${c},0.5)`,n.fillRect(s()*128,s()*128,1+s()*3,1+s()*3)}let r=n.createLinearGradient(0,0,0,128);r.addColorStop(0,"rgba(90,70,40,0.0)"),r.addColorStop(1,"rgba(90,70,40,0.18)"),n.fillStyle=r,n.fillRect(0,0,128,128),n.strokeStyle="rgba(0,0,0,0.18)",n.lineWidth=1.5,n.strokeRect(1,1,126,126),n.strokeStyle="rgba(255,255,255,0.12)",n.lineWidth=1,n.strokeRect(3.5,3.5,121,121),n.fillStyle="rgba(0,0,0,0.18)";for(let a=10;a<128;a+=20)n.fillRect(a,6,2,2),n.fillRect(a,120,2,2),n.fillRect(6,a,2,2),n.fillRect(120,a,2,2);let o=new On(t);return o.wrapS=o.wrapT=Wn,o.anisotropy=4,o.colorSpace=Ue,o}var R0=Ey(),Du=null,Nu=null;function gc(){return Du||(Du=ve===0?new sn({vertexColors:!0,map:R0}):new Eo({vertexColors:!0,map:R0,roughness:.52,metalness:.32,envMapIntensity:.9})),Du}function Ty(){return Nu||(Nu=ve===0?new sn({color:1845299}):new Eo({color:1713714,roughness:.06,metalness:.9,envMapIntensity:1.6})),Nu}function I0(e,t){if(ve===0)return;let n=new Pr,i=new qn(10,32,16),s=new wn({side:un,vertexShader:"varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`varying vec3 vP; void main(){
      float h = normalize(vP).y;
      vec3 c = h > 0.0 ? mix(vec3(0.85,0.9,0.95), vec3(0.38,0.6,0.88), pow(h, 0.6)) : mix(vec3(0.62,0.6,0.55), vec3(0.3,0.3,0.28), pow(-h, 0.5));
      // sol
      vec3 s = normalize(vec3(-0.5, 0.75, 0.4));
      c += vec3(1.0,0.9,0.7) * pow(max(0.0, dot(normalize(vP), s)), 300.0) * 6.0;
      gl_FragColor = vec4(c, 1.0);
    }`});n.add(new ae(i,s));let r=new Cr(e);t.environment=r.fromScene(n,.02).texture,r.dispose()}var Po=new sn({vertexColors:!0,transparent:!0,opacity:.8}),Pt=class{constructor(){this.g=[]}add(t,n,i=0,s=0,r=0,o=0,a=0,c=0,h=1,l=1,u=1,f=0){let d=t.index?t.toNonIndexed():t;if(d.attributes.uv||d.setAttribute("uv",new ce(new Float32Array(d.attributes.position.count*2),2)),f){let m=d.attributes.uv.array;for(let g=0;g<m.length;g++)m[g]*=f}A0.set(o,a,c),w0.setFromEuler(A0),T0.compose(Sy.set(i,s,r),w0,My.set(h,l,u)),d.applyMatrix4(T0),mc.set(n);let p=d.attributes.position.count,v=new Float32Array(p*3);for(let m=0;m<p;m++)v[m*3]=mc.r,v[m*3+1]=mc.g,v[m*3+2]=mc.b;return d.setAttribute("color",new ce(v,3)),d.attributes.uv1&&d.deleteAttribute("uv1"),this.g.push(d),this}box(t,n,i,s,r,o,a,c,h,l){return this.add(new dn(t,n,i),s,r,o,a,c,h,l)}cil(t,n,i,s,r,o,a,c,h,l,u){return this.add(new An(t,n,i,s),r,o,a,c,h,l,u)}esf(t,n,i,s,r,o=1,a=1,c=1){return this.add(new qn(t,12,8),n,i,s,r,0,0,0,o,a,c)}planta(t,n,i,s=0,r=0){let o=new vn;o.moveTo(t[0][0],t[0][1]);for(let c=1;c<t.length;c++)o.lineTo(t[c][0],t[c][1]);o.closePath();let a=new Lr(o,{depth:n,bevelEnabled:r>0,bevelSize:r,bevelThickness:r,bevelSegments:1});return this.add(a,i,0,s+n,0,Math.PI/2,0,0,1,1,1,.25)}simetrica(t,n,i,s=0){let r=t.concat(t.slice().reverse().map(([o,a])=>[-o,a]));return this.planta(r,n,i,s)}perfil(t,n,i,s=0,r=.07){let o=new vn;o.moveTo(t[0][0],t[0][1]);for(let h=1;h<t.length;h++)o.lineTo(t[h][0],t[h][1]);o.closePath();let a=Math.min(r,n*.2),c=new Lr(o,{depth:n-2*a,bevelEnabled:a>0,bevelSize:a,bevelThickness:a,bevelSegments:2});return c.translate(0,0,a),this.add(c,i,s+n/2,0,0,0,-Math.PI/2,0,1,1,1,.3)}fuso(t,n,i=0,s=0,r=0,o=1,a=1,c=14){let h=t.map(([u,f])=>new ct(Math.max(.001,f),u)),l=new Ka(h,c);return l.rotateX(Math.PI/2),l.scale(o,a,1),l.computeVertexNormals(),this.add(l,n,i,s,r,0,0,0,1,1,1,.5)}bloco(t,n,i,s,r=0,o=0,a=0,c=0,h=0,l=0,u=.12){let f=Math.min(u,t/2.2,n/2.2),d=new vn,p=t/2-f,v=n/2-f;d.moveTo(-p,-n/2),d.lineTo(p,-n/2),d.quadraticCurveTo(t/2,-n/2,t/2,-v),d.lineTo(t/2,v),d.quadraticCurveTo(t/2,n/2,p,n/2),d.lineTo(-p,n/2),d.quadraticCurveTo(-t/2,n/2,-t/2,v),d.lineTo(-t/2,-v),d.quadraticCurveTo(-t/2,-n/2,-p,-n/2);let m=Math.min(f,i*.2),g=new Lr(d,{depth:i-2*m,bevelEnabled:m>0,bevelSize:m*.6,bevelThickness:m,bevelSegments:2,curveSegments:3});return g.translate(0,0,-i/2+m),this.add(g,s,r,o,a,c,h,l,1,1,1,.3)}roda(t,n,i,s,r,o){let a=new vi(t*.74,t*.26,8,18);a.scale(1,1,n/(t*.52)*.95),this.add(a,i,s,r,o,0,Math.PI/2,0),this.cil(t*.62,t*.62,n*.7,14,3947832,s,r,o,0,0,Math.PI/2);let c=Math.sign(s)||1;return this.cil(t*.55,t*.55,.04,10,5592911,s+c*n/2,r,o,0,0,Math.PI/2),this.cil(t*.18,t*.22,.12,8,3815990,s+c*(n/2+.05),r,o,0,0,Math.PI/2),this}build(t=!0){let n=Yn(this.g);if(Gu&&t){let i=n.attributes.position,s=n.attributes.color,r=[.62,.53,.4];for(let o=0;o<i.count;o++){let a=i.getY(o),c=i.getX(o),h=i.getZ(o),l=(Math.sin(c*3.1+h*1.7)*Math.sin(h*2.3-c*.9)+1)*.5,u=Math.max(0,Math.min(1,(1.25-a)/1.1))*.55+l*.12;s.setXYZ(o,s.getX(o)+(r[0]-s.getX(o))*u,s.getY(o)+(r[1]-s.getY(o))*u,s.getZ(o)+(r[2]-s.getZ(o))*u)}}if(t){let i=n.attributes.position,s=n.attributes.normal,r=n.attributes.color,o=1/0,a=-1/0;for(let h=0;h<i.count;h++){let l=i.getY(h);l<o&&(o=l),l>a&&(a=l)}let c=Math.max(.5,Math.min(3,a-o));for(let h=0;h<i.count;h++){let l=.62+.38*Math.min(1,(i.getY(h)-o)/c);s.getY(h)>.6?l*=1.08:s.getY(h)<-.6&&(l*=.6),r.setXYZ(h,r.getX(h)*l,r.getY(h)*l,r.getZ(h)*l)}}return n.computeBoundingSphere(),n}},C0={},Gu=!1,z0=5595199,L0=4410416,Vs=12757884,ks=10718562,Gs=2040100,ci=1842204,jt=2044994,Bu=8226447,kr=6252399;var on=15790314,ut=3422010;var wy=16774084,Ay=12593182;function Vr(e,t,n,i,s,r){for(let o of t)for(let a of n)e.roda(i,s,ci,o,r!=null?r:i,a)}function Fu(e,t,n,i,s=.66,r=!0,o=Vs){for(let a of[-1,1]){let c=a*i;e.box(s,.12,t,Gs,c,n,0),e.box(s,.12,t-1.2,Gs,c,.06,0),e.box(s,n*.8,.12,Gs,c,n*.5,t/2-.3,.6),e.box(s,n*.8,.12,Gs,c,n*.5,-t/2+.3,-.6);let h=Math.max(5,Math.round(t/1.1));for(let l=0;l<h;l++)e.roda(n*.34,s*.9,2895402,c,n*.36,-t/2+1+l*(t-2)/(h-1));e.roda(n*.4,s*.95,3158316,c,n*.62,-t/2+.35),e.roda(n*.36,s*.95,3158316,c,n*.6,t/2-.35),r&&e.box(.1,n*.55,t-.6,o,a*(i+s/2+.06),n*.82,0)}}function us(e,t,n,i){for(let s of[-1,1])e.box(.22,.14,.06,wy,s*t,n,i)}function fs(e,t,n,i){for(let s of[-1,1])e.box(.16,.12,.06,Ay,s*t,n,i)}function Ke(e,t,n,i,s=2.6){e.cil(.012,.025,s,4,Gs,t,n+s/2,i)}var Ry={0:"abcdef",1:"bc",2:"abged",3:"abgcd",4:"fgbc",5:"afgcd",6:"afgedc",7:"abc",8:"abcdefg",9:"abcdfg"};function Qe(e,t,n,i,s,r,o,a=15921906){let c=r*.58,h=r*.14,l=c*1.45,u=o==="+x"?[0,0,-1]:o==="-x"?[0,0,1]:o==="+z"?[1,0,0]:o==="-z"?[-1,0,0]:[-1,0,0],f=o==="+y"?[0,0,1]:[0,1,0],d=o==="+x"?[1,0,0]:o==="-x"?[-1,0,0]:o==="+z"?[0,0,1]:o==="-z"?[0,0,-1]:[0,1,0],p=t.length;[...t].forEach((v,m)=>{let g=(m-(p-1)/2)*l;for(let _ of Ry[v]||""){let[y,b,R]={a:[0,r/2,1],d:[0,-r/2,1],g:[0,0,1],b:[c/2,r/4,0],c:[c/2,-r/4,0],e:[-c/2,-r/4,0],f:[-c/2,r/4,0]}[_],w=R?c+h:h,A=R?h:r/2+h,P=n+u[0]*(g+y)+f[0]*b+d[0]*.02,S=i+u[1]*(g+y)+f[1]*b+d[1]*.02,M=s+u[2]*(g+y)+f[2]*b+d[2]*.02,I=[0,0,0];for(let L=0;L<3;L++)I[L]=Math.abs(u[L])*w+Math.abs(f[L])*A+Math.abs(d[L])*.02;e.box(I[0],I[1],I[2],a,P,S,M)}})}function ai(e,t,n,i,s,r,o=!1){let a=o?6120297:1847147,c=o?8817810:15921906,h=o?6120297:11674164,l=r==="+x"?[0,Math.PI/2,0]:r==="-x"?[0,-Math.PI/2,0]:[-Math.PI/2,0,0],u=r==="+x"?[1,0,0]:r==="-x"?[-1,0,0]:[0,1,0],f=_=>[t+u[0]*_,n+u[1]*_,i+u[2]*_],d=(_,y,b)=>{let R=f(b);e.add(_,y,R[0],R[1],R[2],l[0],l[1],l[2])},p=new vn;p.moveTo(-s*2,-s*.42),p.lineTo(s*2,-s*.42),p.lineTo(s*2,s*.42),p.lineTo(-s*2,s*.42),p.closePath(),d(new xi(p),a,.012);let v=new vn;v.moveTo(-s*1.85,-s*.3),v.lineTo(s*1.85,-s*.3),v.lineTo(s*1.85,s*.3),v.lineTo(-s*1.85,s*.3),v.closePath(),d(new xi(v),c,.016);let m=new vn;m.moveTo(-s*1.85,-s*.08),m.lineTo(s*1.85,-s*.08),m.lineTo(s*1.85,s*.08),m.lineTo(-s*1.85,s*.08),m.closePath(),d(new xi(m),h,.02),d(new rs(s,20),a,.024);let g=new vn;for(let _=0;_<10;_++){let y=Math.PI/2+_*Math.PI/5,b=_%2?s*.38:s*.95,R=Math.cos(y)*b,w=Math.sin(y)*b;_===0?g.moveTo(R,w):g.lineTo(R,w)}g.closePath(),d(new xi(g),c,.03)}function Ou(e,t,n,i,s,r){let o=r==="+x"?[0,Math.PI/2,0]:r==="-x"?[0,-Math.PI/2,0]:r==="-z"?[0,Math.PI,0]:r==="+z"?[0,0,0]:[-Math.PI/2,0,0],a=r==="+x"?[1,0,0]:r==="-x"?[-1,0,0]:r==="-z"?[0,0,-1]:r==="+z"?[0,0,1]:[0,1,0],c=new vn;c.moveTo(-s,-s),c.lineTo(s,-s),c.lineTo(s,s),c.lineTo(-s,s),c.closePath(),e.add(new xi(c),16053488,t+a[0]*.012,n+a[1]*.012,i+a[2]*.012,o[0],o[1],o[2]);let h=s*.3,l=s*.8,u=new vn;u.moveTo(-h,-l),u.lineTo(h,-l),u.lineTo(h,-h),u.lineTo(l,-h),u.lineTo(l,h),u.lineTo(h,h),u.lineTo(h,l),u.lineTo(-h,l),u.lineTo(-h,h),u.lineTo(-l,h),u.lineTo(-l,-h),u.lineTo(-h,-h),u.closePath(),e.add(new xi(u),13114910,t+a[0]*.02,n+a[1]*.02,i+a[2]*.02,o[0],o[1],o[2])}function Io(e,t,n,i,s,r,o=9080981,a=1){let c=Math.hypot(i-t,s-n),h=Math.atan2(i-t,s-n),l=(t+i)/2,u=(n+s)/2;e.box(.05,.05,c,o,l,r+a,u,0,h,0),e.box(.04,.04,c,o,l,r+a*.5,u,0,h,0);let f=Math.max(1,Math.round(c/2));for(let d=0;d<=f;d++){let p=d/f;e.cil(.025,.025,a,4,o,t+(i-t)*p,r+a/2,n+(s-n)*p)}}function P0(e,t,n,i,s,r=0,o=1){let a=t.clone();a.applyMatrix4(new re().compose(new N(n,i,s),new Tn().setFromEuler(new Fe(0,r,0)),new N(o,o,o))),e.g.push(a)}function U0(e,t,n,i,s,r,o=2303007){let a=r==="+x"?[0,Math.PI/2,0]:r==="-x"?[0,-Math.PI/2,0]:r==="+z"?[0,0,0]:r==="-z"?[0,Math.PI,0]:[-Math.PI/2,0,0],c=r==="+x"?[1,0,0]:r==="-x"?[-1,0,0]:r==="+z"?[0,0,1]:r==="-z"?[0,0,-1]:[0,1,0],h=new vn;for(let l=0;l<10;l++){let u=Math.PI/2+l*Math.PI/5,f=l%2?s*.4:s;l===0?h.moveTo(Math.cos(u)*f,Math.sin(u)*f):h.lineTo(Math.cos(u)*f,Math.sin(u)*f)}h.closePath(),e.add(new xi(h),o,t+c[0]*.015,n+c[1]*.015,i+c[2]*.015,a[0],a[1],a[2])}function xc(e,t,n,i,s,r,o){for(let a=0;a<r;a++)e.cil(.035,.035,.04,6,6972242,t+o*.02,n,i+(s-i)*a/Math.max(1,r-1),0,0,Math.PI/2)}function vc(e,t,n,i,s=0,r=5067318){e.bloco(.17,.46,.34,r,t,n+.23,i,0,s,0,.03),e.box(.06,.06,.12,r,t,n+.5,i+.08)}function ku(e,t,n,i,s){let r=Math.abs(s-i),o=(i+s)/2;e.cil(.035,.035,r,6,2762790,t,n,o,Math.PI/2),e.cil(.035,.035,r*.96,6,2762790,t+.09,n,o,Math.PI/2);for(let a of[i,s])e.add(new vi(.1,.03,6,10),2762790,t+.045,n,a,Math.PI/2,0,0)}function Hr(e,{frente:t,tras:n,larg:i,yLat:s,yPara:r,num:o}){for(let a of[-1,1])U0(e,a*i/2,s,-.4,.28,a>0?"+x":"-x"),e.add(new vi(.11,.035,6,10),3881524,a*(i/2-.25),r-.12,t+.06,0,0,Math.PI/2),e.box(.18,.08,.04,3824170,a*(i/2-.2),r+.22,n-.03);Qe(e,o,0,r,t+.02,.12,"+z",1973786),Qe(e,o,0,r,n-.02,.12,"-z",1973786)}var _c={humvee(){let e=new Pt,t=new Pt,n=Vs,i=ks;e.box(1.9,.45,4.4,i,0,.72,0),e.add(Yt([{z:-2.35,w:2.14,hT:.36,hB:.32,y:1.12,n:7},{z:.7,w:2.18,hT:.38,hB:.34,y:1.12,n:7},{z:1.5,w:2.16,hT:.27,hB:.34,y:1.1,n:6},{z:2.25,w:2.12,hT:.16,hB:.32,y:1.06,n:6},{z:2.38,w:1.9,hT:.1,hB:.26,y:1.04,n:5}],22),n);for(let r of[-1,1])for(let o of[-1.5,1.55])e.add(Yt([{z:o-.68,w:.48,hT:.06,hB:.06,y:1.42,x:r*.92,n:4},{z:o-.55,w:.48,hT:.1,hB:.06,y:1.48,x:r*.92,n:4},{z:o+.55,w:.48,hT:.1,hB:.06,y:1.48,x:r*.92,n:4},{z:o+.68,w:.48,hT:.06,hB:.06,y:1.42,x:r*.92,n:4}],12),n);e.add(Yt([{z:-1.5,w:2.06,hT:.44,hB:.05,y:1.52,n:7},{z:.35,w:2.06,hT:.44,hB:.05,y:1.52,n:7},{z:.75,w:2,hT:.2,hB:.05,y:1.52,n:6}],20),n),t.box(1.75,.34,.05,jt,0,1.8,.58,-.75);for(let r of[-1,1])t.box(.04,.3,.75,jt,r*1.035,1.78,0),t.box(.04,.3,.75,jt,r*1.035,1.78,-.95);for(let r of[-1,1])for(let o of[0,-.95])e.box(.03,.66,.98,i,r*1.1,1.18,o);e.box(1.3,.36,.05,2763302,0,1,2.37);for(let r=0;r<6;r++)e.box(.04,.32,.06,n,-.5+r*.2,1,2.38);us(e,.72,1.12,2.36),e.bloco(2.2,.18,.22,ut,0,.62,2.42,0,0,0,.06),e.box(.6,.22,.3,3815988,0,.62,2.58),fs(e,.85,1.3,-2.36);for(let r of[-1,1])e.box(.04,.24,.18,ut,r*1.25,1.75,.65),e.box(.18,.04,.04,ut,r*1.15,1.75,.65);Ke(e,.9,1.5,-2.1),Ke(e,-.9,1.5,-2.1,2),e.bloco(1.8,.35,.7,4934202,0,1.68,-1.95,0,0,0,.1),e.roda(.38,.22,ci,0,1.62,-2.42),Vr(e,[-.95,.95],[-1.5,1.55],.47,.4),Hr(e,{frente:2.5,tras:-2.37,larg:2.2,yLat:1.2,yPara:.78,num:"18"});for(let r of[-1,1])vc(e,r*.75,1.48,-2.15);let s=new Pt;s.cil(.6,.62,.18,16,i,0,0,0),s.bloco(1.3,.62,.07,n,0,.42,.45,-.12,0,0,.05);for(let r of[-1,1])s.bloco(.07,.55,.65,n,r*.66,.38,.15,0,r*.35,0,.03);return s.box(.5,.26,.1,jt,0,.62,.47,-.12),s.bloco(.18,.2,.75,ut,0,.35,.25,0,0,0,.04),s.cil(.035,.035,1.25,8,ut,0,.38,1.2,Math.PI/2),s.cil(.06,.06,.12,8,ut,0,.38,1.82,Math.PI/2),s.bloco(.22,.2,.3,4934202,.25,.28,.1,0,0,0,.04),{corpo:e.build(),vidro:t.build(!1),torre:s.build(),torreY:2.08,torreZ:-.45,canoZ:1.85,canoY:.38}},ambulancia(){let e=new Pt,t=new Pt,n=Vs,i=ks,s=14867659;e.box(1.9,.45,4.8,i,0,.72,0),e.add(Yt([{z:.55,w:2.16,hT:.36,hB:.32,y:1.12,n:7},{z:1.65,w:2.16,hT:.27,hB:.34,y:1.1,n:6},{z:2.4,w:2.12,hT:.16,hB:.32,y:1.06,n:6},{z:2.52,w:1.9,hT:.1,hB:.26,y:1.04,n:5}],20),n);for(let r of[-1,1])for(let o of[-1.6,1.65])e.add(Yt([{z:o-.66,w:.48,hT:.06,hB:.06,y:1.42,x:r*.92,n:4},{z:o-.52,w:.48,hT:.1,hB:.06,y:1.48,x:r*.92,n:4},{z:o+.52,w:.48,hT:.1,hB:.06,y:1.48,x:r*.92,n:4},{z:o+.66,w:.48,hT:.06,hB:.06,y:1.42,x:r*.92,n:4}],12),n);e.add(Yt([{z:-.2,w:2.06,hT:.44,hB:.05,y:1.52,n:7},{z:.6,w:2.06,hT:.44,hB:.05,y:1.52,n:7},{z:.95,w:2,hT:.2,hB:.05,y:1.52,n:6}],18),n),t.box(1.75,.34,.05,jt,0,1.8,.8,-.75);for(let r of[-1,1])t.box(.04,.3,.6,jt,r*1.035,1.78,.25);e.add(Yt([{z:-2.62,w:2.22,hT:.95,hB:.95,y:1.95,n:9},{z:-.25,w:2.22,hT:.95,hB:.95,y:1.95,n:9}],24),s),e.box(2.24,.08,2.4,9078134,0,2.92,-1.42);for(let r of[-1,1])Ou(e,r*1.11,2.15,-1.6,.42,r>0?"+x":"-x"),t.box(.04,.35,.5,jt,r*1.12,2.3,-.65);Ou(e,0,2.95,-1.42,.5,"+y"),Ou(e,0,2.15,-2.63,.32,"-z"),e.box(.05,1.5,.04,9078134,0,1.85,-2.64);for(let r of[-1,1])e.box(.12,.04,.04,ut,r*.15,1.9,-2.66);e.box(1.2,.12,.35,ut,0,.75,-2.6),e.bloco(1.4,.14,.28,2236962,0,1.98,.35,0,0,0,.05),e.box(.55,.14,.26,16722474,-.36,2.05,.35),e.box(.55,.14,.26,3174655,.36,2.05,.35);for(let r of[-1,1])for(let o of[-.3,-2.55])e.box(.18,.18,.06,16724016,r*1,2.82,o);return e.box(1.3,.36,.05,2763302,0,1,2.51),us(e,.72,1.12,2.5),fs(e,.85,1.1,-2.64),e.bloco(2.2,.18,.22,ut,0,.62,2.56,0,0,0,.06),Ke(e,.9,2.9,-2.3,1.2),Vr(e,[-.95,.95],[-1.6,1.65],.47,.4),{corpo:e.build(),vidro:t.build(!1)}},stryker(){let e=new Pt,t=z0,n=L0;e.add(Yt([{z:-3.5,w:2.6,hT:.9,hB:.85,y:1.65,nT:7,nB:2.6},{z:2,w:2.7,hT:.9,hB:.88,y:1.65,nT:7,nB:2.6},{z:3,w:2.6,hT:.35,hB:.85,y:1.55,nT:6,nB:2.4},{z:3.55,w:2.3,hT:.08,hB:.5,y:1.25,n:4}],24),t),e.box(1.2,.4,.8,n,-.55,2.8,1.7),e.box(.5,.25,.05,jt,-.55,2.85,2.11),e.box(1.6,1.4,.1,n,0,1.8,-3.55);for(let s=0;s<4;s++)e.box(.1,.08,.5,ut,.9,2.66,-1.5-s*.6);us(e,.95,1.45,3.12),fs(e,.95,1.6,-3.56),Ke(e,1,2.6,-3,3),Ke(e,-1,2.6,-3,2.4);for(let s of[-1,1])for(let r=0;r<3;r++)e.box(.3,.45,.8,4868662,s*1.5,2.1,-2.4+r*1.1);Vr(e,[-1.25,1.25],[-2.55,-1.15,.85,2.25],.56,.48);for(let s of[-1,1])ku(e,s*.9,2.58,-3.2,-1.2);e.bloco(1.5,1.3,.08,n,0,1.75,-3.55,0,0,0,.03),Hr(e,{frente:3.55,tras:-3.52,larg:2.72,yLat:1.9,yPara:1.25,num:"412"});let i=new Pt;return i.cil(.45,.5,.25,12,n,0,0,0),i.box(.7,.55,.8,t,0,.42,0),i.box(.35,.35,.35,jt,.42,.55,.2),i.box(.2,.2,.8,ut,-.15,.48,.5),i.cil(.035,.035,1.3,6,ut,-.15,.48,1.4,Math.PI/2),i.box(.25,.3,.4,4934202,.45,.25,-.3),{corpo:e.build(),torre:i.build(),torreY:2.62,torreZ:.4,canoZ:2.05,canoY:.48}},bradley(){let e=new Pt,t=Vs,n=ks;e.add(Yt([{z:-3.3,w:2.9,hT:.9,hB:.85,y:1.45,n:7},{z:1.4,w:3,hT:.9,hB:.85,y:1.45,n:7},{z:2.7,w:2.95,hT:.25,hB:.8,y:1.4,n:6},{z:3.35,w:2.8,hT:.05,hB:.5,y:1.15,n:5}],24),t),Fu(e,6.4,1.2,1.55,.6,!0,n),e.box(3.6,.1,6.6,n,0,1.42,0);for(let s of[-1,1])for(let r=0;r<5;r++)e.box(.14,.5,1.1,t,s*1.98,1.15,-2.4+r*1.2);e.box(1.2,1.5,.1,n,.6,1.5,-3.35),us(e,1.2,1.4,3.3),fs(e,1.3,1.6,-3.32),Ke(e,-1.3,2.35,-2.8,2.8);for(let s of[-1,1])xc(e,s*2.06,1.4,-2.4,2.4,10,s),ku(e,s*1.2,2.42,-3,-.6),vc(e,s*1.25,2.4,-3.05);e.bloco(1.1,1.4,.08,n,.6,1.45,-3.33,0,0,0,.03);for(let s=0;s<4;s++)e.box(.12,.05,.05,ut,.6,1+s*.3,-3.39);Hr(e,{frente:3.35,tras:-3.3,larg:3.05,yLat:1.6,yPara:1,num:"231"});let i=new Pt;i.add(Yt([{z:-1.25,w:2,hT:.42,hB:.42,y:.43,n:6},{z:.6,w:2.1,hT:.44,hB:.42,y:.43,n:6},{z:1.3,w:1.2,hT:.32,hB:.4,y:.42,n:5}],20),t),i.box(1.9,.14,2.2,n,0,.92,-.2),i.box(.5,.45,.6,n,-.45,.6,1.2),i.cil(.09,.09,2.3,8,ut,-.45,.6,2.6,Math.PI/2),i.cil(.12,.12,.3,8,ut,-.45,.6,3.7,Math.PI/2),i.box(.55,.55,1.4,n,1.35,.55,-.1),i.box(.42,.2,.06,Gs,1.35,.68,.61),i.box(.42,.2,.06,Gs,1.35,.4,.61),i.box(.35,.3,.3,jt,.5,1.05,.3);for(let s of[-1,1])for(let r=0;r<4;r++)i.cil(.06,.06,.25,6,ut,s*.95,.65+r%2*.14,.75+Math.floor(r/2)*.15,Math.PI/2.6);return{corpo:e.build(),torre:i.build(),torreY:2.36,torreZ:.1,canoZ:3.8,canoY:.6}},abrams(){let e=new Pt,t=Vs,n=ks;e.add(Yt([{z:-3.95,w:2.7,hT:.45,hB:.5,y:1.25,n:7},{z:-3.7,w:2.75,hT:.52,hB:.6,y:1.22,n:7},{z:2.7,w:2.75,hT:.52,hB:.6,y:1.22,n:7},{z:3.65,w:2.75,hT:.2,hB:.6,y:1.22,n:6},{z:4.05,w:2.6,hT:.05,hB:.3,y:1,n:5}],24),t),Fu(e,7.7,1.3,1.55,.68,!0,n),e.box(3.7,.1,7.7,n,0,1.78,-.1);for(let s=0;s<7;s++)e.box(2.2,.03,.12,4078387,0,1.84,-3.1+s*.22);for(let s of[-1,1])for(let r=0;r<6;r++)e.box(.06,.62,1.15,t,s*1.99,1.25,-3.1+r*1.22);us(e,1.3,1.6,3.42),fs(e,1.5,1.55,-3.97),e.box(1.4,.4,.4,4867126,0,1.6,-4.05);let i=new Pt;i.add(Yt([{z:-2.65,w:3.2,hT:.42,hB:.42,y:.45,n:7},{z:-1.2,w:3.5,hT:.5,hB:.45,y:.45,n:7},{z:.9,w:3.5,hT:.5,hB:.45,y:.45,n:7},{z:1.9,w:2.7,hT:.45,hB:.42,y:.43,n:6},{z:2.55,w:1.3,hT:.35,hB:.38,y:.42,n:5}],24),t),i.box(3.4,.05,1.3,ut,0,.6,-3);for(let s of[-1,1])i.box(.05,.5,1.3,ut,s*1.7,.85,-3);i.box(3.4,.5,.05,ut,0,.85,-3.65),i.box(3,.4,1.1,5985857,0,.85,-2.95),i.box(1,.75,.6,n,0,.45,2.55),i.cil(.13,.15,5.6,10,t,0,.45,5.4,Math.PI/2),i.cil(.21,.21,.8,10,n,0,.45,4,Math.PI/2),i.cil(.17,.17,.25,10,ut,0,.45,8.15,Math.PI/2),i.cil(.38,.42,.35,12,n,.75,1.12,-.5),i.box(.18,.2,.9,ut,.75,1.42,0),i.cil(.03,.03,1,5,ut,.75,1.42,.9,Math.PI/2),i.cil(.3,.3,.12,10,n,-.75,1.02,-.6),i.box(.12,.15,.7,ut,-.75,1.2,-.2),i.box(.5,.45,.45,n,-.65,1.2,.8),i.box(.3,.25,.04,jt,-.65,1.25,1.03);for(let s of[-1,1])for(let r=0;r<6;r++)i.cil(.055,.055,.3,6,ut,s*(1.35+r%3*.12),.85+Math.floor(r/3)*.13,1.25,Math.PI/2.4);Ke(i,1.4,.95,-2.2,2.6),Ke(i,-1.4,.95,-2.2,2);for(let s of[-1,1]){xc(e,s*2.03,1.5,-3.6,3.3,14,s),xc(e,s*2.03,.98,-3.6,3.3,14,s);for(let r=0;r<5;r++)e.bloco(.12,.5,1.2,ks,s*2.1,1.2,-2+r*1.25,0,0,0,.03);ku(e,s*1.25,1.88,-3.6,-.8),e.bloco(.5,.42,.35,4867126,s*1.55,1.3,-4.08,0,0,0,.05),e.box(.04,.55,.45,2762790,s*1.75,.85,3.5),e.box(.3,.25,.3,ut,s*1.3,1.62,3.35),vc(e,s*1.75,1.82,-3.25)}e.bloco(.75,.08,.6,n,0,1.79,2.7,0,0,0,.05);for(let s=-1;s<=1;s++)e.box(.16,.08,.06,jt,s*.22,1.88,2.98);for(let s=0;s<6;s++)e.box(1.1,.03,.09,3091751,-.65,1.86,-2.2+s*.2);for(let s=0;s<6;s++)e.box(1.1,.03,.09,3091751,.65,1.86,-2.2+s*.2);for(let s of[-1,1])e.cil(.1,.1,.04,10,ut,s*1.55,1.85,.8);e.bloco(1.9,.5,.12,1973530,0,1.35,-4.02,0,0,0,.03);for(let s=0;s<8;s++)e.box(1.8,.03,.04,3815215,0,1.15+s*.055,-4.09);e.add(new vi(.12,.04,6,10),ut,0,.75,-4.05,0,0,Math.PI/2),Hr(e,{frente:4.05,tras:-4.05,larg:4.25,yLat:1.35,yPara:1.05,num:"264"}),i.bloco(.55,.42,.55,n,.75,1.55,-.5,0,0,0,.06),i.bloco(.22,.3,.32,2764080,1.07,1.62,-.38,0,0,0,.03),i.box(.12,.1,.02,jt,1.07,1.66,-.21),i.cil(.03,.03,1.1,6,ut,.75,1.62,.35,Math.PI/2),i.bloco(.42,.55,.38,n,-.3,1.25,.95,0,0,0,.06),i.box(.28,.2,.03,jt,-.3,1.38,1.15),i.bloco(.95,.5,.06,n,-.8,1.3,-.15,-.1,0,0,.02);for(let s of[-1,1])i.box(.05,.4,.5,n,-.8+s*.47,1.28,-.35);i.cil(.025,.025,.9,6,ut,-.8,1.3,.25,Math.PI/2);for(let s of[-1,1])i.bloco(.9,.04,.6,n,s*.85,.94,-2,0,0,0,.02);i.cil(.04,.04,.9,6,ut,1.3,1.3,-1.6),i.box(.12,.08,.3,ut,1.3,1.75,-1.6);for(let s of[-1,1])i.add(new vi(.07,.025,6,8),ut,s*1.4,.95,1.4,Math.PI/2,0,0),U0(i,s*1.76,.45,-1,.24,s>0?"+x":"-x");i.bloco(.6,.4,.5,6117958,-1.1,1.15,-3,0,0,0,.12),i.bloco(.5,.3,.35,5067318,-.4,1.1,-3.25,0,0,0,.05),i.bloco(.5,.3,.35,5067318,.15,1.1,-3.25,0,0,0,.05),i.cil(.2,.2,1.2,10,7038536,.9,1.15,-2.95,0,0,Math.PI/2);for(let s=0;s<3;s++)vc(i,-1.5+s*.3,.6,-3.55);for(let s=0;s<6;s++)i.cil(.155,.155,.04,12,9206869,0,.45,3.4+s*.75,Math.PI/2);i.box(.1,.1,.2,ut,0,.62,8.05);for(let s of[-1,1])for(let r=0;r<3;r++)i.cil(.03,.03,.03,6,6972242,s*.45,.25+r*.2,2.86,Math.PI/2);return{corpo:e.build(),torre:i.build(),torreY:1.83,torreZ:-.3,canoZ:8.3,canoY:.45}},paladin(){let e=new Pt,t=Vs,n=ks;e.add(Yt([{z:-3.45,w:2.9,hT:.5,hB:.55,y:1.15,n:7},{z:2.5,w:2.95,hT:.5,hB:.55,y:1.15,n:7},{z:3.3,w:2.9,hT:.12,hB:.5,y:1.1,n:6},{z:3.6,w:2.7,hT:.04,hB:.25,y:.9,n:5}],22),t),Fu(e,6.9,1.2,1.6,.62,!0,n),us(e,1.2,1.4,3.3),fs(e,1.4,1.45,-3.47),e.bloco(1.6,.5,.3,n,0,1.05,-3.55,0,0,0,.08);for(let s of[-1,1])e.box(.1,.9,.1,ut,s*.25,1.95,3.1,.35);e.bloco(.7,.18,.25,ut,0,2.35,3.25,0,0,0,.05),Hr(e,{frente:3.6,tras:-3.5,larg:3,yLat:1.25,yPara:1,num:"155"});for(let s of[-1,1])xc(e,s*2.06,1.35,-3,2.8,12,s);let i=new Pt;i.add(Yt([{z:-3.2,w:3,hT:.85,hB:.85,y:.85,n:8},{z:.4,w:3.15,hT:.88,hB:.85,y:.85,n:8},{z:1.5,w:2.9,hT:.6,hB:.85,y:.85,n:7},{z:1.85,w:2.2,hT:.35,hB:.75,y:.8,n:6}],22),t);for(let s of[-1,1]){i.bloco(.35,.55,2.6,n,s*1.7,1.05,-1.2,0,0,0,.08);for(let r=0;r<3;r++)i.bloco(.32,.4,.7,6249029,s*1.75,1.6,-2.2+r*.85,0,0,0,.1)}i.box(3,.08,.8,ut,0,.55,-3.6),i.cil(.42,.45,.22,12,n,.85,1.8,-1.6),i.bloco(.15,.18,.85,ut,.85,2,-1.1,0,0,0,.03),i.cil(.03,.03,1,6,ut,.85,2,-.3,Math.PI/2),i.cil(.32,.36,.18,12,n,-.8,1.76,-.9),i.cil(.32,.32,1,14,n,0,.95,2.3,Math.PI/2),i.cil(.15,.18,6.6,14,t,0,.95,5.4,Math.PI/2),i.cil(.24,.24,.9,14,n,0,.95,4.4,Math.PI/2),i.bloco(.62,.4,.75,6972496,0,.95,8.75,0,0,0,.08);for(let s of[-1,1])i.box(.06,.26,.5,2763306,s*.315,.95,8.75);return Ke(i,-1.2,1.7,-2.6,2.6),Ke(i,1.2,1.7,-2.6,2),{corpo:e.build(),torre:i.build(),torreY:1.75,torreZ:-.2,canoZ:9.1,canoY:.95}},bearcat(){let e=new Pt,t=new Pt,n=1842979,i=2764339;e.box(1.95,.5,5.6,i,0,.75,0),e.add(Yt([{z:-2.85,w:2.36,hT:1.05,hB:.75,y:1.75,n:8},{z:.85,w:2.36,hT:1.05,hB:.75,y:1.75,n:8},{z:1.35,w:2.34,hT:.55,hB:.75,y:1.65,nT:6,nB:8},{z:2.6,w:2.3,hT:.38,hB:.7,y:1.55,n:6},{z:2.9,w:2.1,hT:.25,hB:.6,y:1.5,n:5}],24),n);for(let s of[-1,1]){e.box(.02,.26,4.6,15790320,s*1.19,1.7,-.3),e.box(.02,.1,4.6,2774440,s*1.195,1.52,-.3),t.box(.04,.42,.62,jt,s*1.19,2.3,.45),t.box(.04,.36,.4,jt,s*1.19,2.3,-.7),t.box(.04,.36,.4,jt,s*1.19,2.3,-1.8);for(let r of[-.7,-1.8])e.cil(.05,.05,.05,8,921102,s*1.2,2,r,0,0,Math.PI/2);e.bloco(.3,.08,1.6,ut,s*1.25,.95,0,0,0,0,.03),e.box(.05,.25,.18,ut,s*1.27,2.3,1.05)}t.box(2,.55,.05,jt,0,2.38,1.08,-.6),e.cil(.48,.52,.3,14,i,0,2.95,-1.1),e.bloco(.8,.45,.12,i,0,3.2,-.7,0,0,0,.04),e.bloco(1.5,.14,.3,1118481,0,2.86,.6,0,0,0,.05),e.box(.62,.15,.28,16719904,-.38,2.94,.6),e.box(.62,.15,.28,2117887,.38,2.94,.6);for(let s of[-1,1])e.cil(.1,.1,.12,10,16774084,s*.9,2.86,.95,Math.PI/2);e.box(1.4,.4,.05,789516,0,1.4,2.91);for(let s=0;s<7;s++)e.box(.04,.36,.06,i,-.6+s*.2,1.4,2.92);us(e,.85,1.45,2.88),fs(e,.95,1.4,-2.88),e.bloco(2.5,.3,.3,ut,0,.82,3,0,0,0,.06);for(let s of[-1,1])e.box(.1,.8,.1,ut,s*.9,1.15,3.05);return e.box(.6,.3,.25,3355443,0,.82,3.25),e.box(1.9,1.6,.06,i,0,1.8,-2.89),Ke(e,.9,2.8,-2.4,2.4),Vr(e,[-1.05,1.05],[-1.8,1.9],.55,.45),{corpo:e.build(),vidro:t.build(!1)}},himars(){let e=new Pt,t=new Pt,n=Vs,i=ks;e.box(1.9,.45,7,i,0,.95,0),e.box(2.4,.15,4.6,i,0,1.25,-1.1),e.add(Yt([{z:1.55,w:2.45,hT:1,hB:.95,y:2.05,n:8},{z:2.65,w:2.45,hT:1,hB:.95,y:2.05,n:8},{z:3.25,w:2.42,hT:.45,hB:.95,y:2,nT:6,nB:8},{z:3.5,w:2.3,hT:.1,hB:.85,y:1.85,n:6}],22),n),t.box(2.15,.62,.05,jt,0,2.6,3,-.72);for(let r of[-1,1])t.box(.04,.5,.75,jt,r*1.23,2.55,2.25),e.bloco(.5,.6,1.2,6249029,r*1,1.6,.9,0,0,0,.1);e.bloco(2.5,.2,.25,ut,0,1,3.6,0,0,0,.06),us(e,.95,1.35,3.52),fs(e,1,1.1,-3.5),Ke(e,1.1,3.05,1.8,2.2),Ke(e,-1.1,3.05,1.8,1.6);for(let r of[-1,1])e.box(.18,.7,.18,ut,r*1.05,.65,-3.3),e.cil(.2,.2,.06,10,ut,r*1.05,.3,-3.3);e.bloco(2.2,.35,.6,i,0,1.6,-3.2,0,0,0,.08);for(let r of[-1,1])e.box(.08,.5,4.8,i,r*1.2,1.15,-1.1);Vr(e,[-1.05,1.05],[-2.65,-1.3,2.5],.56,.48),Hr(e,{frente:3.65,tras:-3.52,larg:2.45,yLat:2.1,yPara:1,num:"304"});let s=new Pt;s.cil(1,1.05,.25,16,i,0,.12,.6),s.bloco(.8,.35,3.6,ut,0,.3,0,0,0,0,.06),s.add(Yt([{z:-2.05,w:2.3,hT:.55,hB:.55,y:.9,n:9},{z:2.05,w:2.3,hT:.55,hB:.55,y:.9,n:9}],22),n),s.box(2.32,.1,4.1,i,0,1.47,0),s.box(2.1,.95,.05,1710618,0,.9,2.08);for(let r=0;r<3;r++)for(let o=0;o<2;o++)s.cil(.25,.25,.08,14,9077872,-.68+r*.68,.66+o*.48,2.1,Math.PI/2),s.cil(.12,.12,.09,10,3815472,-.68+r*.68,.66+o*.48,2.12,Math.PI/2);for(let r of[-1,1])s.box(.05,.9,3.4,i,r*1.17,.9,0);return{corpo:e.build(),vidro:t.build(!1),torre:s.build(),torreY:1.35,torreZ:-1.5,canoZ:2.1,canoY:.9}}};function Hs(e,t,n=2763306,i=.55){let s=new Pt;for(let r=0;r<e;r++){let o=r*Math.PI*2/e,a=Xe({p:[.55,0,i/2],corda:i,esp:.12},{p:[t*.97,0,i/2],corda:i*.92,esp:.1});s.add(a,n,0,0,0,0,o,0),s.box(.36,.06,i*.95,14204992,Math.cos(o)*t*.93,0,-Math.sin(o)*t*.93,0,o,0),s.box(.7,.12,.18,ut,Math.cos(o)*.45,0,-Math.sin(o)*.45,0,o,0),s.cil(.025,.025,.45,4,ut,Math.cos(o)*.35,-.25,-Math.sin(o)*.35)}return s.cil(.3,.36,.3,12,ut,0,-.05,0),s.cil(.42,.42,.08,14,3816768,0,-.42,0),s.cil(.12,.12,.6,8,ut,0,-.3,0),s.build(!1)}function Hu(e){let t=new Pt;return t.box(.08,e*2,.25,2763306,0,0,0),t.box(.08,.25,e*2,2763306,0,0,0),t.build()}function yc(e,t,n,i,s=0){let r=new Pt,o=9080724,a=1447446;r.cil(.06,.06,1+s*.1,6,o,0,.55,e),r.roda(i*.8,.2,a,.16,i*.8,e),r.roda(i*.8,.2,a,-.16,i*.8,e),r.box(.05,.6,.9,o,.4,.7,e-.2);for(let c of[-1,1])r.cil(.08,.08,1.1,6,o,c*n,.65,t,0,0,c*.12),r.roda(i,.32,a,c*(n+.1),i,t),r.box(.05,.7,1.2,o,c*(n-.35),.8,t);return r.build(!1)}function Rn(e,t,n,i,s=!0){if(e.add(Xe(t,n),i),s){let r=o=>({...o,p:[-o.p[0],o.p[1],o.p[2]]});e.add(Xe(r(t),r(n)),i)}}function Cn(e,t,n,i,s,r,o=1,a=1,c=12){e.add(Yt(t.map(([h,l])=>({z:h+r,x:i,y:s,w:l*2*o,hT:l*a,hB:l*a,n:2})),c),n)}var D0={blackhawk(){let e=new Pt,t=new Pt,n=5857610,i=4936254,s=2895658;e.add(Yt([{z:-10.1,w:.22,hT:.22,hB:.14,y:2.45},{z:-8.6,w:.36,hT:.32,hB:.24,y:2.3},{z:-5.6,w:.55,hT:.45,hB:.36,y:2.12},{z:-3.2,w:1.05,hT:.8,hB:.6,y:1.92,n:2.6},{z:-2.1,w:2,hT:1,hB:.86,y:1.76,nT:3,nB:4.5},{z:2.4,w:2.25,hT:1.06,hB:.92,y:1.76,nT:3,nB:4.5},{z:3.7,w:2.12,hT:.96,hB:.86,y:1.72,nT:2.8,nB:4},{z:4.9,w:1.8,hT:.72,hB:.76,y:1.58,nT:2.4,nB:3},{z:5.75,w:1.15,hT:.42,hB:.55,y:1.42},{z:6.25,w:.35,hT:.12,hB:.18,y:1.36}],22),n),t.add(Yt([{z:3.9,w:2,hT:.95,hB:.05,y:1.73,nT:2.8,nB:2},{z:4.85,w:1.83,hT:.74,hB:.05,y:1.6,nT:2.4,nB:2},{z:5.6,w:1.25,hT:.47,hB:.05,y:1.44,nT:2.2,nB:2}],18),jt);for(let r of[-1,1])t.box(.04,.62,1.05,jt,r*1.105,2.2,3.2),t.box(.04,.5,.75,jt,r*1.12,2.15,1.5),t.box(.04,.5,.75,jt,r*1.12,2.15,.2),e.box(.05,1.3,2.2,i,r*1.13,1.7,.6),e.box(.05,.05,2.4,s,r*1.16,2.38,.6),e.cil(.035,.035,.9,6,ut,r*1.42,2.05,2.2,Math.PI/2),e.box(.16,.2,.4,ut,r*1.36,2.05,1.65),e.cil(.05,.05,1,6,ut,r*1.25,.72,2.9,0,0,r*.45),e.roda(.33,.22,ci,r*1.55,.33,2.9),e.add(Xe({p:[r*1.1,2.5,.8],corda:1,esp:.12},{p:[r*2.9,2.2,.75],corda:.7,esp:.1}),i),Cn(e,[[-1.8,.05],[-1.3,.32],[1.1,.32],[1.7,.06]],5923912,r*2.6,1.75,.4);e.add(Yt([{z:-2.6,w:.9,hT:.35,hB:.1,y:2.75},{z:-1.6,w:1.8,hT:.55,hB:.1,y:2.8,n:3},{z:2.6,w:1.8,hT:.58,hB:.1,y:2.8,n:3},{z:3.6,w:1.1,hT:.25,hB:.1,y:2.72}],16),n);for(let r of[-1,1])Cn(e,[[-1.6,.18],[-1.1,.38],[1,.4],[1.5,.3]],i,r*.72,3.05,.3),e.cil(.25,.25,.05,10,s,r*.72,3.05,1.82,Math.PI/2);e.cil(.26,.34,.55,12,i,0,3.55,.6),e.add(Xe({p:[0,2.35,-8.2],corda:1.7,esp:.12},{p:[0,4.35,-9.3],corda:1,esp:.1}),n),Rn(e,{p:[.1,2.25,-8.7],corda:.95,esp:.1},{p:[2.3,2.25,-8.9],corda:.75,esp:.08},n),e.roda(.2,.15,ci,0,.25,-8.4),e.cil(.04,.04,1.6,6,ut,0,1,-8.4),Ke(e,0,2.7,-4,1),e.bloco(.38,.3,.7,i,1.35,2.8,1.7,0,0,0,.08),e.box(.7,.06,.08,ut,1.55,2.72,1.95),e.cil(.008,.008,.9,3,2236962,1.88,2.25,1.95),e.box(.05,.35,.9,ut,0,2.62,5,-.9),e.box(.05,.3,.7,ut,0,.92,5.4,.9),e.esf(.19,2764080,0,.82,5.35),t.esf(.12,jt,0,.8,5.5);for(let r of[-1,1])e.bloco(.35,.4,1.3,5199683,r*1.15,3,-1.6,0,r*.4,0,.1),e.box(.25,.08,.35,ut,r*1.12,.62,4),e.box(.04,.03,.18,ut,r*1.15,1.85,3.2),ai(e,r*.31,2.2,-6.6,.22,r>0?"+x":"-x",!0),Qe(e,"26543",r*.08,3.5,-8.8,.22,r>0?"+x":"-x",1973790);return Ke(e,.4,2.75,-2.6,.8),Ke(e,-.4,.95,2,.5),{corpo:e.build(),vidro:t.build(!1),rotor:Hs(4,8.2),rotorY:3.95,rotorZ:.6,cauda:Hu(1.7),caudaPos:[.3,3.9,-9.4],caudaEixo:"x"}},chinook(){let e=new Pt,t=new Pt,n=6120780,i=5199425;e.add(Yt([{z:-7.6,w:2.6,hT:1.4,hB:.9,y:2.55,n:3},{z:-6.6,w:3.6,hT:1.8,hB:1.55,y:2.35,nT:3.5,nB:5},{z:5.4,w:3.6,hT:1.8,hB:1.55,y:2.35,nT:3.5,nB:5},{z:6.9,w:3.3,hT:1.55,hB:1.4,y:2.3,nT:3,nB:4},{z:7.9,w:2.6,hT:1.05,hB:1,y:2.1,n:2.6},{z:8.5,w:1.4,hT:.45,hB:.5,y:1.85}],22),n),t.add(Yt([{z:6.7,w:3.36,hT:1.58,hB:.05,y:2.32,nT:3,nB:2},{z:7.8,w:2.66,hT:1.08,hB:.05,y:2.12,nT:2.6,nB:2},{z:8.35,w:1.6,hT:.55,hB:.05,y:1.9}],18),jt);for(let s of[-1,1]){for(let r=0;r<6;r++)t.box(.04,.42,.5,jt,s*1.81,2.9,-4.2+r*1.6);e.add(Yt([{z:-4.6,w:.7,hT:.45,hB:.42,y:1.15,x:s*1.95},{z:-3.6,w:.95,hT:.55,hB:.5,y:1.1,x:s*2},{z:3.4,w:.95,hT:.55,hB:.5,y:1.1,x:s*2},{z:4.4,w:.6,hT:.35,hB:.4,y:1.15,x:s*1.9}],14),i),e.roda(.45,.35,ci,s*1.6,.45,4.8),e.roda(.45,.35,ci,s*1.6,.45,-4.3),e.roda(.45,.35,ci,s*1.6,.45,-5.3),Cn(e,[[-2.4,.3],[-1.9,.52],[.6,.55],[1.2,.42]],7107927,s*1.55,4.3,-6)}e.add(Yt([{z:-8.2,w:1,hT:.4,hB:.1,y:4.2},{z:-7.6,w:1.8,hT:1.6,hB:.1,y:4.1,n:3},{z:-5.2,w:1.8,hT:1.6,hB:.1,y:4.1,n:3},{z:-3.4,w:1.4,hT:.25,hB:.1,y:4.1}],16),n),e.add(Yt([{z:4.8,w:1,hT:.15,hB:.1,y:4.12},{z:5.6,w:1.4,hT:.6,hB:.1,y:4.1,n:3},{z:7,w:1.3,hT:.55,hB:.1,y:4.05,n:3},{z:7.6,w:.8,hT:.2,hB:.1,y:3.95}],14),n),e.box(1.6,.06,4,2764322,0,.5,-6.6,.25);for(let s of[-1,1])ai(e,s*1.8,2.6,-1,.45,s>0?"+x":"-x",!0),Qe(e,"12",s*.92,5.2,-6.4,.45,s>0?"+x":"-x",1973790);return e.cil(.06,.06,2.4,6,ut,1,2.3,9.2,Math.PI/2),{corpo:e.build(),vidro:t.build(!1),rotor:Hs(3,9.1),rotorY:6.3,rotorZ:-6.5,rotor2:Hs(3,9.1),rotor2Y:5.15,rotor2Z:6.2}},apache(){let e=new Pt,t=new Pt,n=5726024,i=4870461,s=2763815;e.add(Yt([{z:-9.6,w:.22,hT:.22,hB:.18,y:2.05},{z:-7,w:.34,hT:.3,hB:.28,y:1.98},{z:-3.6,w:.6,hT:.5,hB:.45,y:1.88},{z:-1.6,w:1,hT:.85,hB:.62,y:1.82,n:3},{z:1.4,w:1.05,hT:.88,hB:.62,y:1.8,n:3},{z:3.4,w:.86,hT:.62,hB:.56,y:1.7,n:2.6},{z:4.8,w:.58,hT:.38,hB:.45,y:1.55},{z:5.45,w:.24,hT:.14,hB:.2,y:1.45}],20),n),t.add(Yt([{z:.4,w:.9,hT:.65,hB:.05,y:2.55,n:3},{z:1.6,w:.96,hT:.62,hB:.05,y:2.55,n:3},{z:2.3,w:.9,hT:.45,hB:.05,y:2.4,n:2.8},{z:3.6,w:.8,hT:.42,hB:.05,y:2.25,n:2.6},{z:4.5,w:.55,hT:.2,hB:.05,y:2}],16),jt),e.box(.04,.5,.06,s,0,3,1.95);for(let r of[-1,1]){Cn(e,[[-2.8,.22],[-2.3,.42],[.2,.45],[.7,.3]],n,r*.98,2.62,-.4),e.cil(.22,.26,.5,10,s,r*1.05,2.62,-3.3,Math.PI/2-.15),e.add(Yt([{z:-1.4,w:.4,hT:.25,hB:.25,y:1.55,x:r*.7},{z:-.6,w:.55,hT:.38,hB:.32,y:1.5,x:r*.75},{z:2,w:.55,hT:.38,hB:.32,y:1.5,x:r*.75},{z:2.8,w:.35,hT:.2,hB:.2,y:1.55,x:r*.7}],12),i),e.add(Xe({p:[r*.8,2,1.1],corda:1.05,esp:.14},{p:[r*3,1.85,1],corda:.85,esp:.12}),i);for(let o=0;o<2;o++)for(let a=0;a<2;a++)Cn(e,[[-.8,.02],[-.6,.09],[.6,.09],[.85,.01]],8026706,r*(1.95+o*.24),1.62-a*.22,.8,1,1,8);Cn(e,[[-.9,.24],[-.7,.33],[.7,.33],[.9,.26]],5593407,r*2.8,1.62,.6),e.cil(.05,.05,1,6,ut,r*.85,.62,2.3,0,0,r*.3),e.roda(.3,.2,ci,r*1,.3,2.3)}e.esf(.32,i,0,1,3.6),e.cil(.04,.05,1.7,6,ut,0,.9,4.45,Math.PI/2),e.esf(.28,2763306,0,1.25,5.3),e.box(.5,.25,.3,i,0,1.25,5.05),e.add(Xe({p:[0,2.15,-8.4],corda:1.4,esp:.12},{p:[0,4.25,-9.3],corda:.95,esp:.1}),n),Rn(e,{p:[.1,1.85,-8.9],corda:.85,esp:.1},{p:[1.65,1.85,-9.1],corda:.7,esp:.08},n),e.roda(.18,.12,ci,0,.2,-8.9),e.cil(.04,.04,1.4,6,ut,0,.9,-8.9),e.cil(.16,.22,.9,8,i,0,3.5,.1),e.box(.05,.4,.9,ut,0,2.95,4.2,-.9),e.box(.05,.3,.7,ut,0,1.05,5.3,.9);for(let r of[-1,1])ai(e,r*.3,2,-6,.2,r>0?"+x":"-x",!0),Qe(e,"445",r*.08,3.3,-8.95,.25,r>0?"+x":"-x",1973790),e.box(.2,.15,.2,ut,r*1,1.25,-1);return e.box(.12,.1,.12,13639712,0,4.3,-9.2),{corpo:e.build(),vidro:t.build(!1),rotor:Hs(4,7.3),rotorY:4.2,rotorZ:.1,cauda:Hu(1.4),caudaPos:[.3,3.4,-9.4],caudaEixo:"x",armaZ:5.2,armaY:.9,radar:!0}},littlebird(){let e=new Pt,t=new Pt,n=2895664,i=2237734,s=1382168;e.add(Yt([{z:-1.5,w:.5,hT:.45,hB:.25,y:1.65},{z:-.9,w:1.2,hT:.75,hB:.55,y:1.55,n:2.2},{z:0,w:1.42,hT:.85,hB:.68,y:1.5,n:2.2},{z:.9,w:1.36,hT:.78,hB:.66,y:1.45,n:2.1},{z:1.6,w:1,hT:.5,hB:.5,y:1.38},{z:1.95,w:.35,hT:.15,hB:.2,y:1.32}],22),n),t.add(Yt([{z:.25,w:1.4,hT:.8,hB:.15,y:1.55,n:2.2},{z:1,w:1.3,hT:.72,hB:.2,y:1.48,n:2.1},{z:1.65,w:.95,hT:.45,hB:.25,y:1.4}],18),jt),e.add(Yt([{z:-5.4,w:.16,hT:.1,hB:.1,y:2},{z:-3,w:.26,hT:.16,hB:.16,y:1.85},{z:-1.3,w:.42,hT:.26,hB:.24,y:1.75}],12),n),e.box(1.7,.06,.45,n,0,2.05,-5);for(let r of[-1,1])e.box(.05,.6,.45,n,r*.85,2.05,-5);e.add(Xe({p:[0,2,-4.8],corda:.6,esp:.12},{p:[0,2.9,-5.25],corda:.4,esp:.1}),n),e.add(Xe({p:[0,2,-4.8],corda:.55,esp:.12},{p:[0,1.4,-5.1],corda:.4,esp:.1}),n),e.bloco(.6,.35,1,i,0,2.35,-.3,0,0,0,.12),e.cil(.12,.14,.35,8,ut,0,2.6,0),e.cil(.12,.16,.4,8,s,0,1.9,-1.55,Math.PI/2);for(let r of[-1,1]){e.cil(.045,.045,3,6,s,r*.95,.06,.15,Math.PI/2),e.cil(.045,.045,.35,6,s,r*.95,.14,1.75,Math.PI/2-.5);for(let o of[-.5,.9])e.cil(.04,.04,1.05,6,s,r*.72,.5,o,0,0,r*.45);e.bloco(.42,.06,1.7,3817024,r*1.02,.92,.2,0,0,0,.02),e.cil(.02,.02,1.6,4,ut,r*.95,1.95,.2,Math.PI/2),e.box(.04,.45,.04,ut,r*1.2,.7,.2)}return e.esf(.15,s,0,1,1.75),t.esf(.09,jt,0,.98,1.88),Ke(e,0,2.3,-1,.7),Qe(e,"54",.09,2,-3.6,.2,"+x",5922658),Qe(e,"54",-.09,2,-3.6,.2,"-x",5922658),{corpo:e.build(),vidro:t.build(!1),rotor:Hs(6,4.4,1973790,.25),rotorY:2.85,rotorZ:0,cauda:Hu(.7),caudaPos:[.18,2.1,-5.3],caudaEixo:"x",bancos:!0}},reaper(){let e=new Pt,t=11779009;e.add(Yt([{z:-5.5,w:.2,hT:.12,hB:.12,y:.45},{z:-4,w:.6,hT:.32,hB:.32,y:.45},{z:0,w:.95,hT:.48,hB:.45,y:.45},{z:3,w:1,hT:.55,hB:.42,y:.5},{z:4.7,w:.85,hT:.62,hB:.32,y:.55},{z:5.6,w:.3,hT:.2,hB:.12,y:.5}],16),t),Rn(e,{p:[.4,.75,1.2],corda:1.15,esp:.14},{p:[10,.95,.5],corda:.55,esp:.1},t);for(let n of[-1,1])e.add(Xe({p:[n*.15,.6,-4.2],corda:1,esp:.1},{p:[n*1.5,1.6,-4.8],corda:.5,esp:.08}),t);e.add(Xe({p:[0,.3,-4],corda:.8,esp:.1},{p:[0,-.5,-4.4],corda:.45,esp:.08}),t);for(let n of[-1,1])for(let i of[3.2,5])Cn(e,[[-.8,.02],[-.6,.1],[.7,.1],[.9,.02]],8026706,n*i,.4,.4,1,1,8);return e.esf(.36,2830389,0,.05,4.2),{corpo:e.build(),helice:Hs(3,1.4,3355443,.25),heliceZ:-5.7,heliceY:.45,heliceEixo:"z"}},f35(){let e=new Pt,t=new Pt,n=10726322,i=9344669,s=3356733;e.add(Yt([{z:-7.55,w:1.25,hT:.55,hB:.5,y:1.2,n:2},{z:-6.4,w:2.4,hT:.62,hB:.48,y:1.2,nT:2.4,nB:3},{z:-3.4,w:3.3,hT:.72,hB:.52,y:1.2,nT:2.8,nB:3.5},{z:0,w:3.2,hT:.86,hB:.58,y:1.2,nT:3,nB:3.5},{z:2,w:2.6,hT:.82,hB:.56,y:1.2,nT:2.8,nB:3},{z:3.6,w:1.6,hT:.66,hB:.48,y:1.18,nT:2.4,nB:2.6},{z:5.6,w:1,hT:.44,hB:.36,y:1.12},{z:7.2,w:.46,hT:.2,hB:.17,y:1.06},{z:8.1,w:.06,hT:.03,hB:.03,y:1.03}],22),n),t.add(Yt([{z:1.6,w:.75,hT:.25,hB:.05,y:1.95},{z:2.6,w:.95,hT:.52,hB:.05,y:1.92},{z:4,w:.9,hT:.45,hB:.05,y:1.78},{z:5.3,w:.62,hT:.2,hB:.05,y:1.52}],16),11569728);for(let r of[-1,1])e.box(.52,.55,.08,s,r*1.35,1.12,2.15,0,r*.35,0);Rn(e,{p:[1.4,1.12,.8],corda:6,esp:.05},{p:[6.55,1.08,-3.2],corda:2,esp:.04},n),Rn(e,{p:[1.15,1.2,-5.2],corda:2.6,esp:.05},{p:[3.95,1.2,-6.6],corda:1.2,esp:.04},n);for(let r of[-1,1])e.add(Xe({p:[r*1.3,1.65,-4.1],corda:3,esp:.05},{p:[r*2.05,3.65,-5.7],corda:1.3,esp:.04}),i);e.cil(.62,.68,.9,16,4209978,0,1.2,-7.55,Math.PI/2),e.cil(.5,.5,.92,16,1315860,0,1.2,-7.56,Math.PI/2),e.box(.12,.06,.25,13639712,-6.5,1.1,-2.4),e.box(.12,.06,.25,2146368,6.5,1.1,-2.4),e.box(.06,.06,.7,s,0,.62,-7,-.3),ai(e,-4,1.14,-1.6,.42,"+y",!0);for(let r of[-1,1])ai(e,r*1.62,1.25,-4.4,.32,r>0?"+x":"-x",!0),Qe(e,"100",r*.63,1.2,4.6,.32,r>0?"+x":"-x",6317676),e.box(.04,.03,4.2,6975863,r*.55,.64,-.6),e.add(Xe({p:[r*1.4,1.13,.85],corda:.12,esp:.3},{p:[r*6.55,1.09,-3.15],corda:.08,esp:.3}),6120554);return t.esf(.18,jt,0,.72,5.4,1,.7,1.4),e.box(.06,.03,1.6,6975863,0,.64,-.6),{corpo:e.build(),vidro:t.build(!1),trem:yc(4.2,-.6,1.5,.3),motorZ:-8,motorY:1.2,chamaR:.5,pontas:6.5}},f18(){let e=new Pt,t=new Pt,n=12370890,i=11121080,s=3356733;e.add(Yt([{z:-8.9,w:2.2,hT:.5,hB:.45,y:1.2,n:3},{z:-6,w:2.6,hT:.6,hB:.52,y:1.2,n:3.2},{z:-2,w:2.5,hT:.68,hB:.6,y:1.2,n:3.2},{z:1,w:1.6,hT:.74,hB:.66,y:1.25,n:2.8},{z:4,w:1.15,hT:.65,hB:.55,y:1.28,n:2.4},{z:6.6,w:.78,hT:.44,hB:.38,y:1.25},{z:8.6,w:.32,hT:.18,hB:.16,y:1.2},{z:9.3,w:.04,hT:.02,hB:.02,y:1.2}],22),n),t.add(Yt([{z:2.8,w:.7,hT:.25,hB:.05,y:1.92},{z:4,w:.92,hT:.55,hB:.05,y:1.9},{z:5.6,w:.85,hT:.45,hB:.05,y:1.78},{z:6.7,w:.5,hT:.15,hB:.05,y:1.6}],16),jt),Rn(e,{p:[.65,1.38,5.6],corda:6,esp:.03},{p:[1.65,1.36,0],corda:.6,esp:.03},i);for(let r of[-1,1])e.bloco(.95,.85,3.6,n,r*1.25,.95,.3,0,0,0,.18),e.box(.78,.7,.06,s,r*1.25,.95,2.12);Rn(e,{p:[1.4,1.22,.4],corda:4.8,esp:.05},{p:[6.8,1.15,-2.3],corda:1.8,esp:.04},n),Rn(e,{p:[1.3,1.25,-6.1],corda:3,esp:.05},{p:[3.85,1.2,-8.2],corda:1.3,esp:.04},n);for(let r of[-1,1])e.add(Xe({p:[r*1.2,1.75,-4.4],corda:3.4,esp:.05},{p:[r*2.15,4.35,-6.6],corda:1.4,esp:.04}),i),Cn(e,[[-1.5,.02],[-1.2,.07],[1.3,.07],[1.6,.01]],15263968,r*6.95,1.15,-2.5,1,1,8),e.box(.08,.4,1.2,i,r*2.9,.85,-1.5),Cn(e,[[-1.8,.05],[-1.3,.24],[1,.24],[1.6,.04]],7170890,r*2.9,.48,-1.4,1,1,10),e.box(.08,.4,1,i,r*4.6,.9,-2),Cn(e,[[-1.2,.05],[-.8,.17],[.9,.17],[1.3,.03]],7170890,r*4.6,.6,-2,1,1,10);Cn(e,[[-2.6,.05],[-2,.35],[1.8,.35],[2.6,.05]],i,0,.45,-1);for(let r of[-.62,.62])e.cil(.5,.55,.9,14,4209978,r,1.2,-8.95,Math.PI/2),e.cil(.4,.4,.92,14,1315860,r,1.2,-8.96,Math.PI/2);e.box(.12,.06,.25,13639712,-6.9,1.15,-1.1),e.box(.12,.06,.25,2146368,6.9,1.15,-1.1),ai(e,-4,1.21,-1,.42,"+y",!0);for(let r of[-1,1])ai(e,r*1.31,1.25,-4.6,.3,r>0?"+x":"-x",!0),Qe(e,"300",r*.44,1.25,6,.3,r>0?"+x":"-x",5922918);e.cil(.02,.03,.9,6,ut,0,1.2,9.65,Math.PI/2),e.bloco(.12,.12,1.4,i,.5,1.75,5.6,0,0,0,.04),e.box(.05,.09,.05,1118481,0,1.6,7.8),t.box(.04,.06,1.8,s,0,2.43,4.6);for(let r of[-1,1])Cn(e,[[-1.6,.02],[-1.3,.09],[1.4,.09],[1.7,.01]],14737624,r*1.35,.72,-2.6,1,1,8);return{corpo:e.build(),vidro:t.build(!1),trem:yc(5,-1,1.6,.35),motorZ:-9.4,motorY:1.2,chamaR:.45,motores:[-.62,.62],pontas:6.9}},a10(){let e=new Pt,t=new Pt,n=10134441,i=9081753,s=3356733;e.add(Yt([{z:-8,w:.3,hT:.25,hB:.25,y:1.75},{z:-6.4,w:.65,hT:.55,hB:.5,y:1.7},{z:-2.5,w:1.25,hT:.95,hB:.85,y:1.6,n:2.4},{z:2,w:1.45,hT:1,hB:.95,y:1.6,n:2.6},{z:4.6,w:1.4,hT:.95,hB:.95,y:1.6,n:2.6},{z:6.6,w:1.1,hT:.7,hB:.75,y:1.5},{z:7.9,w:.65,hT:.38,hB:.42,y:1.35},{z:8.3,w:.3,hT:.15,hB:.2,y:1.3}],20),n),t.add(Yt([{z:4,w:1,hT:.55,hB:.05,y:2.4},{z:5.1,w:1.1,hT:.62,hB:.05,y:2.35},{z:6.4,w:.85,hT:.45,hB:.05,y:2.1},{z:7.1,w:.5,hT:.15,hB:.05,y:1.95}],16),jt),e.cil(.08,.1,1.5,8,2236962,0,1.25,8.9,Math.PI/2),Rn(e,{p:[.6,1.1,2.3],corda:3,esp:.16},{p:[8.3,1.25,1.4],corda:1.8,esp:.12},n);for(let r of[-1,1]){e.add(Xe({p:[r*8.3,1.25,1.4],corda:1.8,esp:.1},{p:[r*9,.95,1.3],corda:1.4,esp:.08}),i),Cn(e,[[-2.2,.35],[-1.8,.62],[1,.66],[1.5,.58]],i,r*1.55,2.8,-3),e.cil(.52,.52,.06,14,s,r*1.55,2.8,-1.48,Math.PI/2),e.add(Xe({p:[r*.6,2.3,-2.2],corda:1.4,esp:.15},{p:[r*1.2,2.6,-2.4],corda:1.2,esp:.15}),i);for(let[o,a,c]of[[2.4,7170890,.2],[3.6,7170890,.2],[4.8,14540253,.15],[6,3817285,.25]])e.box(.08,.3,.9,i,r*o,.82,.8),Cn(e,[[-1.2,.03],[-.9,c],[.9,c],[1.3,.02]],a,r*o,.55,.8,1,1,8)}Rn(e,{p:[.3,1.8,-6.5],corda:1.6,esp:.1},{p:[3.6,1.8,-6.7],corda:1.3,esp:.09},n);for(let r of[-1,1])e.add(Xe({p:[r*3.6,.9,-6.5],corda:1.6,esp:.1},{p:[r*3.6,3.2,-6.9],corda:1.2,esp:.09}),n);e.box(.12,.06,.25,13639712,-9,.95,.6),e.box(.12,.06,.25,2146368,9,.95,.6);for(let r of[-1,1]){let o=r>0?"+x":"-x";e.add(new rs(.42,3,-.6,1.2),11018272,r*.62,1.15,7,0,r*Math.PI/2,0);for(let a=0;a<5;a++)e.add(new rs(.07,3),15921906,r*.64,1.25-a%2*.12,6.75+a*.12,0,r*Math.PI/2,Math.PI/2*(a%2?1:-1));e.box(.03,.12,.12,1118481,r*.64,1.3,7.15),ai(e,r*2.21,2.8,-3,.32,o,!0),Qe(e,"81",r*3.67,2.2,-6.7,.35,o,2764339)}for(let r=0;r<7;r++){let o=r/7*Math.PI*2;e.cil(.025,.025,1,4,1710618,Math.cos(o)*.07,1.25+Math.sin(o)*.07,9.2,Math.PI/2)}return e.box(.3,.04,.3,2764339,0,2.55,3.8),{corpo:e.build(),vidro:t.build(!1),trem:yc(1.2,.4,2.2,.38,5),pontas:8.8,semChama:!0}},f22(){let e=new Pt,t=new Pt,n=11712960,i=10397357;e.add(Yt([{z:-7.8,w:2.4,hT:.45,hB:.42,y:1.2,n:4},{z:-5.8,w:3,hT:.62,hB:.5,y:1.2,n:3.5},{z:-2,w:3.6,hT:.8,hB:.58,y:1.2,n:3.4},{z:1.4,w:3.4,hT:.84,hB:.6,y:1.2,nT:3.2,nB:3.6},{z:3.8,w:1.8,hT:.7,hB:.52,y:1.2,nT:2.4,nB:2.6},{z:6.6,w:.95,hT:.42,hB:.32,y:1.12},{z:8.6,w:.3,hT:.12,hB:.1,y:1.06},{z:9.4,w:.04,hT:.02,hB:.02,y:1.04}],22),n),t.add(Yt([{z:3.6,w:.75,hT:.25,hB:.05,y:1.92},{z:4.8,w:.95,hT:.55,hB:.05,y:1.9},{z:6.6,w:.85,hT:.42,hB:.05,y:1.72},{z:7.8,w:.45,hT:.12,hB:.05,y:1.5}],16),11569728);for(let s of[-1,1])e.box(.6,.6,.08,3356733,s*1.55,1.1,3.05,0,s*.5,0);Rn(e,{p:[1.6,1.12,2.6],corda:8,esp:.04},{p:[6.8,1.1,-1.6],corda:1.2,esp:.035},n),Rn(e,{p:[1.6,1.15,-5],corda:3,esp:.04},{p:[4.4,1.15,-6.4],corda:1.4,esp:.035},n);for(let s of[-1,1])e.add(Xe({p:[s*1.7,1.6,-3.4],corda:3.6,esp:.04},{p:[s*2.8,3.9,-5.4],corda:1.4,esp:.035}),i);for(let s of[-.75,.75])e.box(1.2,.55,1,4209978,s,1.2,-7.9),e.box(1,.36,1.02,1315860,s,1.2,-7.92);e.box(.12,.06,.25,13639712,-6.8,1.1,-2.2),e.box(.12,.06,.25,2146368,6.8,1.1,-2.2),ai(e,-4,1.13,0,.42,"+y",!0);for(let s of[-1,1])ai(e,s*1.81,1.25,-4.2,.3,s>0?"+x":"-x",!0),Qe(e,"04",s*.48,1.12,6.6,.3,s>0?"+x":"-x",6317676),e.box(.04,.03,3.6,8225931,s*.6,.64,-1);return{corpo:e.build(),vidro:t.build(!1),trem:yc(4.8,-.8,1.6,.32),motorZ:-8.4,motorY:1.2,chamaR:.42,motores:[-.75,.75],pontas:6.8}},osprey(){let e=new Pt,t=new Pt,n=10133926,i=9015445;e.add(Yt([{z:-9.2,w:.5,hT:.35,hB:.2,y:3},{z:-7,w:1.4,hT:.8,hB:.6,y:2.4},{z:-5,w:2.4,hT:1.25,hB:1.1,y:2,nT:3,nB:4},{z:5,w:2.5,hT:1.3,hB:1.15,y:2,nT:3,nB:4},{z:6.8,w:2.2,hT:1.05,hB:1,y:1.95,n:2.8},{z:8,w:1.4,hT:.6,hB:.7,y:1.8},{z:8.7,w:.4,hT:.15,hB:.25,y:1.7}],22),n),t.add(Yt([{z:6.4,w:2.26,hT:1.08,hB:.05,y:1.95,n:2.8},{z:7.6,w:1.66,hT:.75,hB:.05,y:1.85},{z:8.4,w:.9,hT:.32,hB:.05,y:1.75}],16),jt);for(let o of[-1,1])e.add(Yt([{z:-2.8,w:.5,hT:.4,hB:.35,y:1.15,x:o*1.35},{z:-2,w:.8,hT:.5,hB:.45,y:1.1,x:o*1.4},{z:2.6,w:.8,hT:.5,hB:.45,y:1.1,x:o*1.4},{z:3.4,w:.5,hT:.3,hB:.3,y:1.15,x:o*1.35}],12),i);Rn(e,{p:[0,3.55,2],corda:2.6,esp:.16},{p:[7,3.6,1.9],corda:2.2,esp:.14},n),Rn(e,{p:[0,3,-7.6],corda:1.6,esp:.1},{p:[2.7,3,-8],corda:1.2,esp:.09},n);for(let o of[-1,1])e.add(Xe({p:[o*2.7,2.6,-7.8],corda:1.5,esp:.1},{p:[o*2.7,4.9,-8.3],corda:1.1,esp:.09}),n);for(let o of[-1,1])e.roda(.4,.3,ci,o*1.5,.4,.5);e.roda(.3,.2,ci,0,.3,6);let s=new Pt;s.add(Yt([{z:-2.2,w:.85,hT:.42,hB:.42,y:0},{z:-1.6,w:1.4,hT:.68,hB:.68,y:0},{z:1.8,w:1.36,hT:.66,hB:.66,y:0},{z:2.3,w:.7,hT:.35,hB:.35,y:0}],14),n),s.cil(.3,.3,.5,10,i,0,0,2.4,Math.PI/2);let r=s.build();r.rotateX(-Math.PI/2);for(let o of[-1,1])ai(e,o*1.26,2.2,-2.5,.4,o>0?"+x":"-x",!0);for(let o of[-1,1])Qe(e,"00",o*2.78,3.9,-8.3,.4,o>0?"+x":"-x",1973790);return e.cil(.06,.06,2.6,6,ut,.85,2.3,8.6,Math.PI/2),{corpo:e.build(),vidro:t.build(!1),nacele:r,rotor:Hs(3,5.8),naceleX:7,naceleY:3.7}}};function Vu(e,t,n,i,s={}){var a,c;let r=[];for(let h=0;h<=14;h++){let l=h/14,u=-e/2+l*e,f=t;l>.6&&(f=t*Math.sqrt(Math.max(0,1-Math.pow((l-.6)/.4,2.2)))),l<.08&&(f=t*(.86+.14*l/.08));let d=l>.7?Math.pow((l-.7)/.3,2)*((a=s.sheer)!=null?a:n*.25):0,p=i*(l>.85?1-(l-.85)/.15*.6:1),v=l>.65?1.3+(1-l)*3:(c=s.fundoChato)!=null?c:3.2;r.push({z:u,w:Math.max(.05,f),hT:n+d,hB:Math.max(.05,p),y:0,nT:9,nB:v})}return Yt(r,20)}var Cy={lancha(){let e=new Pt,t=new Pt,n=8358032,i=6910586;e.add(Vu(25,5.4,1.6,1,{fundoChato:1.6,sheer:.7}),n),e.box(5,.06,23,5923176,0,1.62,-.5),e.perfil([[-3.5,1.6],[-3.5,3.7],[1.4,3.7],[3.4,1.6]],3.8,i,0,.15),t.box(3.4,.75,.06,jt,0,2.85,2.55,-.86);for(let r of[-1,1])t.box(.06,.6,2.6,jt,r*1.92,3,-.2);e.cil(.12,.12,3.2,6,ut,0,5.3,-1.5),e.box(1.8,.25,.25,ut,0,6.3,-1.5),e.esf(.5,on,0,7,-1.5,1,.5,1);for(let r of[-1,1])e.box(.06,.6,18,4870230,r*2.55,1.95,-1);e.cil(.3,.35,.6,8,i,0,1.9,-9),e.cil(.05,.05,1.6,6,ut,0,2.3,-8,Math.PI/2);let s=new Pt;s.cil(.65,.75,.6,10,i,0,0,0),s.bloco(1,.7,1.2,n,0,.6,0,0,0,0,.2),s.cil(.08,.1,2.4,8,ut,0,.6,1.6,Math.PI/2),Qe(e,"602",2.62,.7,6,.7,"+x",15921906),Qe(e,"602",-2.62,.7,6,.7,"-x",15921906);for(let r of[-1,1])e.add(new vi(.32,.07,6,14),16738842,r*1.95,2.6,-2.6,0,Math.PI/2,0);return e.cil(.03,.03,1.6,4,ut,0,2.4,-11.6),e.box(.02,.5,.8,1847147,0,3,-12),e.cil(.45,.45,.35,12,15263976,0,4,.3),{corpo:e.build(),vidro:t.build(!1),torre:s.build(),torreY:1.95,torreZ:8,canoZ:2.8,canoY:.6}},lcac(){let e=new Pt,t=8226447,n=6252399;e.bloco(14.2,1.9,26,2369322,0,.95,0,0,0,0,.9),e.box(12.6,.35,23.5,n,0,1.95,0);for(let i of[-1,1]){e.bloco(2.3,2.6,21,t,i*5.9,3.3,-.5,0,0,0,.3);for(let s=0;s<4;s++)e.box(.06,.5,.8,jt,i*7.07,3.6,-7+s*4);e.cil(2.35,2.35,1.4,18,t,i*3.6,4.6,-11.6,Math.PI/2),e.cil(1.95,1.95,1.45,16,1710618,i*3.6,4.6,-11.6,Math.PI/2),e.box(.15,3.6,.9,n,i*3.6,4.6,-12.7),e.box(.15,3.6,.9,n,i*2.6,4.6,-12.7),e.bloco(1.6,1.2,2.4,n,i*5.9,5.1,-6,0,0,0,.3)}return e.bloco(2.4,1.6,2.8,t,5.9,5.4,6.5,0,0,0,.3),e.box(2.42,.5,2,jt,5.9,5.7,7),e.box(10.5,.15,2,9080724,0,2.6,12,-.6),{corpo:e.build()}},destroier(){let e=new Pt,t=8358032,n=6713464,i=5726054;e.add(Vu(158,20.4,4.2,5,{sheer:2.2}),t),e.box(18.5,.1,120,5791332,0,4.25,-10),e.perfil([[-2,4.2],[-2,13.5],[12,17.5],[24,17.5],[27,4.2]],14.5,t,0,.2),e.perfil([[8,17.5],[10,23],[20,23],[22,17.5]],10,t,0,.15),e.box(9.6,1.4,.15,jt,0,21.2,21.7,-.35);for(let r of[-1,1])e.cil(3.3,3.3,.3,8,9213340,r*7.25,13,16,0,0,Math.PI/2+r*.35),e.cil(3.3,3.3,.3,8,9213340,r*4.5,13,3.5,Math.PI/2-.35,0,0);e.cil(3.3,3.3,.3,8,9213340,0,13.5,24.5,-Math.PI/2+.6,0,0);for(let[r,o]of[[-1.2,-1.2],[1.2,-1.2],[-1.2,1.2],[1.2,1.2]])e.box(.25,16,.25,n,r,31,10+o);for(let r=0;r<4;r++)e.box(2.8,.2,2.8,n,0,25+r*4,10);e.box(7,.4,.4,n,0,36,10),e.cil(.08,.08,6,6,ut,0,42,10),e.esf(.8,on,2.5,34,10),e.perfil([[-12,4.2],[-11,16],[-6,16],[-5,4.2]],6,t,0,.2),e.box(5.4,.6,1.8,2236962,0,16.2,-7.8),e.box(5.4,.6,1.8,2236962,0,16.2,-9.6),e.perfil([[-34,4.2],[-33,15],[-28,15],[-27,4.2]],6,t,0,.2),e.box(5.4,.6,1.8,2236962,0,15.2,-29.8),e.box(5.4,.6,1.8,2236962,0,15.2,-31.6),e.perfil([[-26,4.2],[-26,9],[-13,9],[-13,4.2]],11,n,0,.15),e.perfil([[-50,4.2],[-50,10],[-35,12],[-35,4.2]],14,t,0,.15);for(let[r,o]of[[34,4],[-46,4]]){e.box(8,.25,o*2.2,i,0,4.35,r);for(let a=0;a<o;a++)for(let c=0;c<4;c++)e.box(1.6,.1,1.7,4278092,-3+c*2,4.5,r-(o-1)*1.1+a*2.2)}e.box(14,.12,18,4869972,0,4.3,-64),e.box(.4,.05,14,on,0,4.4,-64),e.cil(4.5,4.5,.05,24,15123002,0,4.36,-64),e.cil(4.2,4.2,.07,24,4869972,0,4.37,-64),e.cil(1.1,1.3,2.2,10,on,0,15.2,-19),e.esf(1.1,on,0,16.7,-19),e.cil(1.1,1.3,2.2,10,on,0,18.6,15),e.esf(1.1,on,0,20,15);for(let r of[-1,1])e.bloco(1.8,1,6,3093560,r*6.5,10,-20,0,0,0,.4);let s=new Pt;s.perfil([[-2.2,0],[-2.2,1.8],[.8,2.2],[2.6,1],[2.6,0]],3.6,t,0,.15),s.cil(.2,.28,7,10,n,0,1.2,5.6,Math.PI/2),s.cil(.32,.32,.6,10,n,0,1.2,2.8,Math.PI/2),Qe(e,"117",8.4,1.6,52,2.4,"+x"),Qe(e,"117",-8.4,1.6,52,2.4,"-x");for(let r of[-1,1]){Io(e,r*9.9,-76,r*10.05,20,4.2),Io(e,r*10.05,20,r*7.5,50,4.2),Io(e,r*7.5,50,r*2,74,4.2+1.4),e.bloco(.6,1.2,1.4,2764080,r*5.2,3.2,66,0,0,0,.2);for(let o=0;o<4;o++)e.cil(.35,.35,1.6,10,on,r*7.6,9.4,-4+o*2.2,0,0,Math.PI/2);for(let o=0;o<4;o++)e.cil(.22,.22,3.4,8,4870230,r*(1.2+o*.5),6,-24,.25,0,0)}e.cil(.05,.05,3,4,ut,0,45,10),e.box(.02,1,1.6,1847147,0,46,9.1),e.box(.02,.5,.8,11674164,0,46.2,8.7);for(let r of[-1,1])Ke(e,r*3.5,26,10,4);return{corpo:e.build(),torre:s.build(),torreY:4.3,torreZ:56,canoZ:9.2,canoY:1.2}},portaavioes(){let e=new Pt;e.add(Vu(320,40,8,10,{sheer:1}),Bu),e.simetrica([[33,-158],[34,-40],[32,60],[22,140],[12,158]],2.5,kr,5.5),e.planta([[-38,-160],[36,-160],[37,-20],[24,160],[-24,160],[-26,40],[-40,-60]],1,4540491,8);let t=9.03,n=15123002,i=15790314,s=12597547,r=-.16,o=-10,a=-45,c=Math.cos(r),h=Math.sin(r),l=(p,v)=>[o+v*c+p*h,a-v*h+p*c];for(let p=-100;p<100;p+=8){let[v,m]=l(p,0);e.box(.6,.04,4.5,i,v,t+.01,m,0,r,0)}for(let p of[-14,14])for(let v=-100;v<100;v+=6){let[m,g]=l(v,p);e.box(.4,.04,3,i,m,t,g,0,r,0)}for(let p=0;p<4;p++){let[v,m]=l(-70+p*9,0);e.box(26,.05,.25,2236962,v,t+.02,m,0,r,0)}for(let p of[-6,6,-28,-18])e.box(.5,.05,80,2829099,p,t+.01,p>-10?110:30);for(let p of[-6,6])e.box(.3,.05,80,n,p+1.2,t+.02,110);e.box(.5,.04,300,n,32,t,0),e.box(.5,.04,300,s,-36,t,-10,0,.03,0);for(let[p,v]of[[36,-80],[36,30],[-40,-30]])e.box(14,.6,16,4079940,p,8.6,v);let u={6:"afedcg",8:"abcdefg"},f=(p,v,m,g,_)=>{let y={a:[0,g,m,.9],b:[m/2,g/2,.9,g/2],c:[m/2,-g/2,.9,g/2],d:[0,-g,m,.9],e:[-m/2,-g/2,.9,g/2],f:[-m/2,g/2,.9,g/2],g:[0,0,m,.9]}[_];e.box(y[2],.05,y[3],i,p+y[0],t+.02,v+y[1])};for(let[p,v]of[[6,-6],[8,6]])for(let m of u[p])f(v,128,6,5,m);e.box(11,16,30,Bu,30,17,-30),e.box(10,6,22,kr,30,27.5,-28),e.box(8.5,5,14,Bu,30,33,-26),e.box(9.2,1.4,.2,jt,30,33.5,-18.95);for(let p of[24.4,35.6])e.box(.2,1.2,12,jt,p,33.5,-26);for(let p=0;p<3;p++)e.box(10.6,.15,30.4,kr,30,12+p*5,-30);for(let p of u[6]){let v={a:[0,4,4,.8],b:[2,2,.8,4],c:[2,-2,.8,4],d:[0,-4,4,.8],e:[-2,-2,.8,4],f:[-2,2,.8,4],g:[0,0,4,.8]}[p];e.box(.2,v[3],v[2],i,24.4,22+v[1],-36+v[0])}for(let p of u[8]){let v={a:[0,4,4,.8],b:[2,2,.8,4],c:[2,-2,.8,4],d:[0,-4,4,.8],e:[-2,-2,.8,4],f:[-2,2,.8,4],g:[0,0,4,.8]}[p];e.box(.2,v[3],v[2],i,24.4,22+v[1],-30+v[0])}for(let[p,v]of[[-1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]])e.box(.35,14,.35,kr,30+p,42,-30+v);for(let p=0;p<4;p++)e.box(3.6,.25,3.6,kr,30,36+p*3.5,-30);e.box(8,.5,.6,kr,30,47,-30),e.box(5,2.2,.3,13620182,30,45,-24,0,.3,0),e.esf(1.6,on,33,38.5,-40),e.esf(1.3,on,27,38,-40),e.cil(.2,.2,6,6,ut,30,52,-30);for(let p=0;p<5;p++)e.cil(.7,.7,2.5,8,14540253,34.5,6,-120+p*12,Math.PI/2);e.box(3,1.2,4,15123002,26,9.6,-55),e.box(2.5,1.6,3.5,14540253,20,9.8,10),e.box(2,1,3,15123002,-20,9.5,70);for(let[p,v]of[[33,150],[-30,-150],[33,-150]])e.cil(1.2,1.4,2,10,on,p,10,v),e.cil(.2,.2,2.4,6,ut,p,11,v+1.4,Math.PI/2);Qe(e,"68",19.5,3,125,6,"+x"),Qe(e,"68",-19.5,3,125,6,"-x"),Io(e,37.5,-150,37.5,-25,9,9080981,1.2),Io(e,-40.5,-150,-40.5,-65,9,9080981,1.2);let d=D0.f18();for(let p=0;p<6;p++)P0(e,d.corpo,-28+p%2*14,9,70+Math.floor(p/2)*22,Math.PI*.8,1);for(let p=0;p<3;p++)P0(e,d.corpo,30,9,40+p*24,-Math.PI*.5,1);return{corpo:e.build()}}},Py={placa(){let e=new Pt;for(let t of[-1,1])e.cil(.12,.14,7.5,8,9080722,t*3.4,3.75,0);e.box(7.4,.25,.25,9080722,0,5.2,-.15),e.bloco(8,2.6,.12,2059066,0,6.2,.05,0,0,0,.12),e.box(7.8,2.4,.02,15921906,0,6.2,.12),e.box(7.6,2.2,.03,2059066,0,6.2,.13);for(let[t,n]of[[5.2,6.75],[4.2,6.2],[3,5.65]])e.box(t,.28,.03,15921906,.6,n,.15);return e.bloco(1,1.1,.03,15921906,-3,6.3,.15,0,0,0,.1),e.bloco(.8,.9,.035,1847147,-3,6.3,.16,0,0,0,.1),e.box(.5,.25,.04,15921906,3.2,5.25,.15),{corpo:e.build()}},pista(){let e=new Pt;e.box(40,.12,320,3882562,0,.06,0);for(let t=-140;t<140;t+=16)e.box(.8,.03,8,15790314,0,.14,t);for(let t of[-1,1])e.box(.6,.03,320,15790314,t*18,.14,0);for(let t=0;t<8;t++)for(let n of[-1,1])e.box(1.4,.03,12,15790314,-14+t*4,.14,n*150);e.box(50,.1,140,4869456,-45,.05,80);for(let t=0;t<3;t++)e.perfil([[-12,0],[-12,6],[-6,10],[6,10],[12,6],[12,0]],30,8226168,-85,.2);return e.cil(.3,.4,18,8,ut,-75,9,-120),e.box(6,4,6,11580328,-75,20,-120),e.box(6.2,1.4,6.2,jt,-75,21.5,-120),{corpo:e.build()}},acampamento(){let e=new Pt,t=13;for(let n=0;n<26;n++){let i=n/26*Math.PI*2;if(n%9===0)continue;let s=Math.sin(i)*t,r=Math.cos(i)*t;e.bloco(3.2,.5,.7,11048298,s,.25,r,0,i+Math.PI/2,0,.2),e.bloco(2.9,.5,.7,10259040,s,.72,r,0,i+Math.PI/2+.1,0,.2),n%3===0&&e.bloco(2.6,.45,.65,11574384,s,1.15,r,0,i+Math.PI/2,0,.2)}for(let[n,i,s,r]of[[t+2,3,.2,9054756],[-t-2,-4,-.3,2902650],[3,-t-2,1.5,13684944]])e.bloco(1.8,1.3,4.3,r,n,.65,i,0,s,Math.PI/2-.1,.25);for(let[n,i,s,r]of[[-5,3,.3,5208634],[4,5,-.5,3824266],[-2,-6,1.2,11758122],[6,-3,2,6974010]]){let o=new An(.01,2,2,4,1);e.add(o,r,n,1,i,0,s,0,1.2,1,.9)}for(let n=0;n<6;n++)e.box(.9,.7,.9,8018486,-8+n*.95,.35,8-n%2*.9);for(let n=0;n<4;n++)e.cil(.4,.4,1,10,n%2?3103370:9058858,8+n%2*.9,.5,6-Math.floor(n/2)*.9);e.cil(.9,1,.25,10,5591628,0,.12,0);for(let n=0;n<4;n++)e.box(1.2,.18,.18,4863008,0,.3,0,0,n*.8,0);return e.cil(.06,.06,4.5,6,ut,-9,2.25,-5),e.box(.04,.9,1.4,15790320,-9,4,-4.3),{corpo:e.build()}},qg(){let e=new Pt;e.box(40,12,26,13352347,0,6,0),e.box(30,4,20,12036484,0,14,0),e.box(42,1,28,9208165,0,12.4,0),e.cil(.25,.25,26,6,ut,14,29,6),e.box(.4,2.4,4,2837132,14,40,8.2),e.box(.42,1.2,2,on,14,40.6,7.1),e.cil(2.8,2.8,.6,14,on,-9,16.8,-4,.5),e.cil(.3,.3,4,6,ut,-9,18,-4);for(let t=0;t<5;t++)e.box(5,2.2,.15,jt,-16+t*8,6.5,13.05);return{corpo:e.build()}},quartel(){let e=new Pt;for(let t=0;t<3;t++)e.box(14,5,40,12036742,-20+t*20,2.5,0),e.box(15,.8,41,7038032,-20+t*20,5.4,0);for(let t=0;t<24;t++)e.box(1.4,1,.7,10127970,-32+t*2.8,.5,24);return{corpo:e.build()}},patio(){let e=new Pt;e.box(60,9,30,11117199,0,4.5,-10),e.box(62,.8,32,6249295,0,9.3,-10);for(let t=0;t<5;t++)e.box(9,7,.3,7369832,-24+t*12,3.5,5.2);return e.box(64,.15,30,5593178,0,.08,22),{corpo:e.build()}},heliporto(){let e=new Pt;for(let[t,n]of[[-30,0],[0,0],[30,0],[-15,32],[15,32]])e.cil(12,12,.3,20,4540491,t,.15,n),e.box(1.2,.05,7,15921906,t-2.2,.33,n),e.box(1.2,.05,7,15921906,t+2.2,.33,n),e.box(3.4,.05,1.2,15921906,t,.33,n);return e.box(14,7,10,10133644,0,3.5,-24),e.cil(.2,.2,9,6,ut,6,4.5,-20),e.cil(.6,.1,2.2,8,16743168,6,9,-20,0,0,1.3),{corpo:e.build()}},docas(){let e=new Pt;e.box(16,1.2,70,8156264,0,.6,0);for(let t=0;t<8;t++)e.cil(.5,.5,4,6,5196354,7,-1,-32+t*9);return e.box(10,6,12,10133644,-4,4,-26),e.box(1.5,12,1.5,13934615,3,6,18),e.box(1.5,1.5,14,13934615,3,12,12),{corpo:e.build()}},zona(){let e=new Pt;for(let t=0;t<4;t++)for(let n=0;n<3;n++)e.box(8,3,14,15328466,-18+t*12,1.5,-14+n*17),e.cil(.01,4.2,1.8,4,16052450,-18+t*12,3.9,-14+n*17,0,Math.PI/4,0);return e.box(56,.1,56,7309914,0,.06,0),{corpo:e.build()}},fob(){let e=new Pt;for(let t=0;t<32;t++){let n=t/32*Math.PI*2;t%8!==0&&e.bloco(2.4,2.2,1.2,12758402,Math.sin(n)*26,1.1,Math.cos(n)*26,0,n+Math.PI/2,0,.1)}for(let[t,n,i]of[[-8,-6,0],[-8,4,0],[6,-8,1.57],[10,6,.3]])e.bloco(5,2.6,9,7304528,t,1.3,n,0,i,0,1.2);e.cil(.15,.25,14,6,ut,0,7,-14),e.box(.6,1.2,.1,on,0,12,-13.8),e.cil(6,6,.15,20,4474698,8,.08,14),e.box(1,.05,4,on,7,.18,14),e.box(1,.05,4,on,9,.18,14),e.box(2.4,.05,.8,on,8,.18,14),e.cil(.08,.08,6,6,ut,-14,3,10),e.box(.05,1,1.6,2837132,-14,5.4,10.8);for(let t=0;t<5;t++)e.box(1,.8,1,6969914,14+t%2,.4,-10+t);return{corpo:e.build()}},muro(){let e=new Pt;for(let t=0;t<5;t++)e.bloco(1.4,2.2,1.9,12758402,0,1.1,-4+t*2,0,0,0,.12),e.box(1.45,.06,1.95,7827546,0,2.22,-4+t*2);return{corpo:e.build()}},torre(){let e=new Pt;for(let[t,n]of[[-1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]])e.box(.3,9,.3,5984320,t,4.5,n);return e.box(4.5,2.2,4.5,8022607,0,10,0),e.box(5,.4,5,4866612,0,11.6,0),{corpo:e.build()}},patriot(){let e=new Pt;return e.box(2.6,1.2,9,z0,0,1.3,0),Vr(e,[-1.1,1.1],[-3,-1.6,2.8],.55,.45),e.box(2.6,1.8,6,L0,0,3,-1.2,-.6),{corpo:e.build()}}};for(let e in _c){let t=_c[e];_c[e]=()=>{Gu=!0;try{return t()}finally{Gu=!1}}}var Iy=Object.assign({},_c,D0,Cy,Py);function Ws(e){let t=C0["_d_"+e]||(C0["_d_"+e]=Iy[e]()),n=new Ui,i={grupo:n,def:t};if(n.add(new ae(t.corpo,gc())),t.vidro&&n.add(new ae(t.vidro,Ty())),t.torre){let s=new ae(t.torre,gc());s.position.set(0,t.torreY,t.torreZ),n.add(s),i.torre=s}if(t.rotor&&!t.nacele){let s=new ae(t.rotor,Po);s.position.set(0,t.rotorY,t.rotorZ),n.add(s),i.rotor=s}if(t.rotor2){let s=new ae(t.rotor2,Po);s.position.set(0,t.rotor2Y,t.rotor2Z),n.add(s),i.rotor2=s}if(t.cauda){let s=new ae(t.cauda,Po);s.position.set(...t.caudaPos),n.add(s),i.cauda=s}if(t.helice){let s=new ae(t.helice,Po);s.position.set(0,t.heliceY,t.heliceZ),s.rotation.x=Math.PI/2,n.add(s),i.helice=s}if(t.motorZ!==void 0&&!t.semChama){let s=t.chamaR||.5,r=new yo(s,s*8,12,1,!0);r.rotateX(-Math.PI/2),r.translate(0,0,-s*4);let o=new Fn({color:16751184,transparent:!0,opacity:.75,blending:br,depthWrite:!1}),a=new yo(s*.7,s*5,12,1,!0);a.rotateX(-Math.PI/2),a.translate(0,0,-s*2.5);let c=new Fn({color:10471679,transparent:!0,opacity:.9,blending:br,depthWrite:!1}),h=new vi(s*.45,s*.12,6,12),l=new Fn({color:16769200,transparent:!0,opacity:.8,blending:br,depthWrite:!1});i.chamas=[];for(let u of t.motores||[0]){let f=new ae(r,o),d=new ae(a,c);f.position.set(u,t.motorY,t.motorZ),d.position.set(u,t.motorY,t.motorZ),n.add(f),n.add(d),i.chamas.push(f,d);for(let p=1;p<=3;p++){let v=new ae(h,l);v.position.set(u,t.motorY,t.motorZ-p*s*1.6),n.add(v),i.chamas.push(v)}}}if(t.trem&&(i.trem=new ae(t.trem,gc()),n.add(i.trem)),t.nacele){i.naceles=[];for(let s of[-1,1]){let r=new Ui;r.position.set(s*t.naceleX,t.naceleY,.6);let o=new ae(t.nacele,gc());r.add(o);let a=new ae(t.rotor,Po);a.position.set(0,2.65,0),r.add(a),n.add(r),i.naceles.push({piv:r,ro:a})}}return n.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),i}function N0(e,t=5046122){let n=new Qa(e*.86,e,28).rotateX(-Math.PI/2),i=new ae(n,new Fn({color:t,transparent:!0,opacity:.85,depthWrite:!1}));return i.renderOrder=3,i}var bc=(e,t=10)=>Co(e.map(([n,i,s,r])=>({y:n,w:i,f:s,t:r,n:2.1})),t),zy=()=>ve;function kt(e,t,n,i,s,r,o=0,a=0,c=0){let h=t.index?t.toNonIndexed():t;(o||a||c)&&h.applyMatrix4(new re().makeRotationFromEuler(new Fe(o,a,c))),h.translate(i,s,r);let l=h.attributes.position.count,u=new Float32Array(l*3),f=Array.isArray(n)?n:[n,n,n];for(let d=0;d<l;d++)u[d*3]=f[0],u[d*3+1]=f[1],u[d*3+2]=f[2];h.setAttribute("color",new ce(u,3)),h.attributes.uv||h.setAttribute("uv",new ce(new Float32Array(l*2),2)),e.push(h)}var Me=(e,t,n)=>new dn(e,t,n),ds=(e,t,n,i=7)=>new An(e,t,n,i),Xs=(e,t,n,i)=>{let s=new qn(e,12,8);return s.scale(t,n,i),s};function Ly(e,t,n,i){let s=new An(e*.72,t*.72,n,8);return s.rotateY(Math.PI/8),s.scale(1,1,i),s}function Pn(e){let t=[];return e(t),Yn(t)}var Uy=.93,B0=.44,F0=.43,Wu=.29,Xu=.27,zo=.5;function Dy(){return{quadril:Pn(e=>{kt(e,Co([{y:.03,w:.29,f:.105,t:.1,n:2.4},{y:-.07,w:.315,f:.11,t:.115,n:2.4},{y:-.15,w:.27,f:.085,t:.1,n:2.2},{y:-.19,w:.16,f:.05,t:.06}],14),1,0,0,0)}),tronco:Pn(e=>{kt(e,Co([{y:-.03,w:.29,f:.105,t:.1,n:2.4},{y:.07,w:.275,f:.11,t:.095,n:2.4},{y:.19,w:.315,f:.125,t:.1,n:2.5},{y:.31,w:.365,f:.137,t:.11,n:2.6},{y:.41,w:.395,f:.128,t:.115,n:2.8},{y:.47,w:.37,f:.095,t:.105,n:2.8},{y:.515,w:.22,f:.07,t:.08},{y:.545,w:.11,f:.05,t:.05}],16),1,0,0,0),kt(e,Xs(.072,1.05,.95,1.05),1,.19,.445,0),kt(e,Xs(.072,1.05,.95,1.05),1,-.19,.445,0),kt(e,ds(.048,.055,.1,10),.93,0,.58,.005)}),cabeca:Pn(e=>{kt(e,new qn(.112,14,10).scale(.9,1.08,1),1,0,.12,.005),kt(e,Xs(.05,.9,.7,.6),.97,0,.065,.075),kt(e,Me(.04,.05,.04),.95,0,.12,.112),kt(e,Me(.035,.02,.012),.12,.042,.15,.104),kt(e,Me(.035,.02,.012),.12,-.042,.15,.104),kt(e,Me(.05,.012,.01),.45,0,.068,.103),kt(e,Xs(.03,.5,1,.8),.92,.106,.12,0),kt(e,Xs(.03,.5,1,.8),.92,-.106,.12,0)}),cabelo:Pn(e=>{let t=new qn(.118,10,6,0,Math.PI*2,0,Math.PI*.55);t.scale(.95,1.05,1.05),kt(e,t,1,0,.13,-.008),kt(e,Xs(.1,1,.9,.6),1,0,.1,-.06)}),capacete:Pn(e=>{let t=new qn(.135,12,6,0,Math.PI*2,0,Math.PI*.52);t.scale(1,.92,1.1),kt(e,t,1,0,.145,-.005),kt(e,ds(.137,.142,.035,12).scale(1,1,1.1),.85,0,.15,-.005),kt(e,Me(.05,.04,.035),.3,0,.23,.13),kt(e,ds(.018,.018,.08),.2,.026,.25,.155,Math.PI/2-.4),kt(e,ds(.018,.018,.08),.2,-.026,.25,.155,Math.PI/2-.4),kt(e,Me(.18,.03,.025),.25,0,.14,.115),kt(e,Me(.04,.05,.05),.65,.128,.18,0),kt(e,Me(.04,.05,.05),.65,-.128,.18,0),kt(e,Me(.07,.05,.03),.4,0,.21,-.14)}),colete:Pn(e=>{kt(e,Co([{y:0,w:.33,f:.145,t:.135,n:3},{y:.16,w:.375,f:.16,t:.14,n:3.2},{y:.29,w:.405,f:.155,t:.135,n:3.2},{y:.35,w:.34,f:.125,t:.125,n:3}],16),1,0,0,0);for(let t of[-.11,0,.11])kt(e,Me(.095,.12,.055),.8,t,.07,.17);kt(e,Me(.16,.1,.045),.78,.07,.2,.17),kt(e,Me(.11,.08,.045),.78,-.12,.15,.165);for(let t of[-.13,.13])kt(e,Me(.06,.06,.26),.7,t,.355,0);kt(e,Me(.34,.055,.25),.55,0,-.07,0)}),mochila:Pn(e=>{kt(e,Ly(.3,.28,.38,.55),1,0,.28,-.18),kt(e,Me(.26,.13,.05),.85,0,.2,-.27),kt(e,ds(.065,.065,.3,8),.8,0,.5,-.18,0,0,Math.PI/2),kt(e,ds(.008,.008,.35,4),.25,.1,.62,-.2)}),coxa:Pn(e=>{kt(e,bc([[.04,.15,.08,.075],[-.05,.175,.098,.085],[-.2,.162,.09,.08],[-.34,.128,.07,.066],[-.43,.112,.062,.06],[-.47,.085,.045,.045]]),1,0,0,0),kt(e,Me(.05,.11,.09),.75,.085,-.2,0)}),canela:Pn(e=>{kt(e,bc([[.03,.105,.058,.058],[-.1,.112,.055,.072],[-.24,.092,.046,.052],[-.37,.078,.04,.042],[-.4,.06,.03,.03]]),1,0,0,0),kt(e,Xs(.055,1.1,1,.7),.75,0,-.02,.05)}),bota:Pn(e=>{kt(e,Me(.11,.1,.25),1,0,-.04,.05),kt(e,Me(.115,.03,.27),.5,0,-.085,.05)}),braco:Pn(e=>{kt(e,bc([[.03,.1,.05,.05],[-.08,.112,.06,.056],[-.2,.094,.048,.046],[-.29,.084,.042,.042],[-.32,.06,.03,.03]]),1,0,0,0)}),antebraco:Pn(e=>{kt(e,bc([[.02,.082,.04,.04],[-.07,.09,.046,.044],[-.2,.068,.034,.033],[-.25,.058,.03,.03]]),1,0,0,0)}),mao:Pn(e=>{kt(e,Me(.075,.095,.045),1,0,-.045,.01),kt(e,Me(.025,.05,.03),1,.035,-.03,.03)}),arma:Pn(e=>{kt(e,Me(.045,.07,.24),.3,0,.05,-.27),kt(e,Me(.05,.085,.3),.2,0,.06,-.02),kt(e,Me(.058,.07,.24),.3,0,.055,.25),kt(e,ds(.011,.011,.3),.13,0,.055,.5,Math.PI/2),kt(e,ds(.017,.017,.06),.13,0,.055,.66,Math.PI/2),kt(e,Me(.035,.13,.06),.3,0,-.04,.05,.3),kt(e,Me(.03,.09,.04),.3,0,-.02,-.06,-.3),kt(e,Me(.035,.055,.12),.12,0,.13,.03),kt(e,Me(.04,.04,.02),.5,0,.13,.095)})}}function Ny(){let t=document.createElement("canvas");t.width=t.height=128;let n=t.getContext("2d");n.fillStyle="#b8ab84",n.fillRect(0,0,128,128);let i=77,s=()=>(i=i*1664525+1013904223>>>0,i/4294967296),r=["#8d7f58","#6f7350","#cfc4a2","#7a5f40","#9a9467"];for(let a=0;a<90;a++){n.fillStyle=r[a%r.length],n.beginPath();let c=s()*128,h=s()*128,l=3+s()*8;for(let u=0;u<6.28;u+=.7){let f=l*(.6+s()*.6);n.lineTo(c+Math.cos(u)*f,h+Math.sin(u)*f*.7)}n.fill()}let o=new On(t);return o.wrapS=o.wrapT=Wn,o.colorSpace=Ue,o}var By={quadril:1,tronco:1,coxa:1,canela:1,braco:1,antebraco:1,mochila:1,colete:1},Fy={coxa:1,canela:1,bota:1,braco:1,antebraco:1,mao:1};function O0(e,t,n,i){let s=Math.asin(Math.max(-1,Math.min(1,e))),r=Math.atan2(-n,-t);i[0]=r,i[1]=s}var Mc=class{constructor(t,n,i,s){this.m={},this.n={},this.max={};for(let r in n){let o=Fy[r]?i*2:i,a=new sn({vertexColors:!0,map:s&&By[r]?s:null}),c=new Ir(n[r],a,o);c.instanceMatrix.setUsage(os),c.instanceColor=new zs(new Float32Array(o*3),3),c.count=0,c.frustumCulled=!1,c.castShadow=zy()>=2,t.add(c),this.m[r]=c,this.n[r]=0,this.max[r]=o}}comecar(){for(let t in this.n)this.n[t]=0}terminar(){for(let t in this.m){let n=this.m[t];n.count=Math.min(this.max[t],this.n[t]),n.instanceMatrix.needsUpdate=!0,n.instanceColor.needsUpdate=!0}}parte(t,n,i,s,r,o,a,c,h,l,u,f,d){let p=this.m[t],v=this.n[t]++;if(v>=this.max[t])return;let m=p.instanceMatrix.array,g=v*16,_=Math.cos(l),y=Math.sin(l),b=Math.cos(u),R=Math.sin(u),w=r*b+o*y*R,A=-r*R+o*y*b,P=o*_,S=_*R,M=_*b,I=-y,L=-o*b+r*y*R,U=o*R+r*y*b,D=r*_;m[g]=w*f,m[g+1]=S*f,m[g+2]=L*f,m[g+3]=0,m[g+4]=A*f,m[g+5]=M*f,m[g+6]=U*f,m[g+7]=0,m[g+8]=P*f,m[g+9]=I*f,m[g+10]=D*f,m[g+11]=0,m[g+12]=n+(r*a+o*h)*f,m[g+13]=i+c*f,m[g+14]=s+(-o*a+r*h)*f,m[g+15]=1;let W=p.instanceColor.array,H=v*3;W[H]=d[0],W[H+1]=d[1],W[H+2]=d[2]}},Oy=[.25,.22,.18],qu=[.13,.13,.14],ky=[.62,.56,.42],Hy=[.52,.48,.36],Vy=[.55,.45,.32],Gy=[.2,.18,.17],ps=[0,0],Sc=class{constructor(t){let n=Dy();this.civ=new Mc(t,n,2600,null),this.mil=new Mc(t,n,600,Ny())}comecar(){this.civ.comecar(),this.mil.comecar()}terminar(){this.civ.terminar(),this.mil.terminar()}_membro(t,n,i,s,r,o,a,c,h,l,u,f,d,p,v,m,g,_){let y=a[0]-o[0],b=a[1]-o[1],R=a[2]-o[2],w=Math.hypot(y,b,R)||1e-4,A=Math.min(w,(s+r)*.999),P=y/w,S=b/w,M=R/w,I=(s*s-r*r+A*A)/(2*A),L=Math.sqrt(Math.max(0,s*s-I*I)),U=c[0]*P+c[1]*S+c[2]*M,D=c[0]-U*P,W=c[1]-U*S,H=c[2]-U*M,nt=Math.hypot(D,W,H)||1;D/=nt,W/=nt,H/=nt;let V=o[0]+P*I+D*L,Z=o[1]+S*I+W*L,J=o[2]+M*I+H*L,j=Math.hypot(V-o[0],Z-o[1],J-o[2])||1;O0((V-o[0])/j,(Z-o[1])/j,(J-o[2])/j,ps),t.parte(n,h,l,u,f,d,o[0],o[1],o[2],ps[0],ps[1],p,v);let ft=o[0]+P*A,Tt=o[1]+S*A,Y=o[2]+M*A,B=Math.hypot(ft-V,Tt-Z,Y-J)||1;return O0((ft-V)/B,(Tt-Z)/B,(Y-J)/B,ps),t.parte(i,h,l,u,f,d,V,Z,J,ps[0],ps[1],p,m),g&&t.parte(g,h,l,u,f,d,ft,Tt,Y,ps[0],ps[1],p,_),{ex:V,ey:Z,ez:J,hx:ft,hy:Tt,hz:Y}}add(t,n,i,s,r,o,a,c,h,l=0,u=1,f=null,d=1){let p=l===1||l===3,v=p?this.mil:this.civ,m=Math.cos(s),g=Math.sin(s),_=l===1||l===2||l===4||l===5;if(o===3){v.parte("tronco",t,n+.15,i,m,g,0,0,0,Math.PI/2,0,u,a),v.parte("cabeca",t,n+.15,i,m,g,0,0,zo+.08,Math.PI/2,0,u,h),v.parte("quadril",t,n+.12,i,m,g,0,0,0,Math.PI/2,0,u,c);for(let J of[1,-1])v.parte("coxa",t,n+.1,i,m,g,J*.1,0,-.05,-Math.PI/2,J*.15,u,c),v.parte("braco",t,n+.12,i,m,g,J*.22,0,zo-.05,-Math.PI/2-.5,J*.5,u,a);return}let y=Math.sin(r),b=Math.cos(r),R=Math.min(1,d),w=o===1?.35:o===2?.12:.05+R*.08,A=Math.abs(b)*.035*R,P=Uy-A,S=Math.cos(w),M=Math.sin(w),I=c,L=p?Vy:l===2||l===5?qu:Gy;for(let J of[1,-1]){let j=J===1?y:-y,ft=o===5?-1.45+j*.08:-j*.55*R,Tt=o===5?1.35+j*.1:Math.max(0,J===1?b:-b)*.9*R+(o===1?.15:.05),Y=J*.1;v.parte("coxa",t,n,i,m,g,Y,P,0,ft,0,u,I);let B=Y,st=P-B0*Math.cos(ft),tt=-B0*Math.sin(ft),gt=ft+Tt;v.parte("canela",t,n,i,m,g,B,st,tt,gt,0,u,I);let St=B,xt=st-F0*Math.cos(gt),Ht=tt-F0*Math.sin(gt);v.parte("bota",t,n,i,m,g,St,xt+.06,Ht,0,0,u,L)}v.parte("quadril",t,n,i,m,g,0,P,0,0,0,u,c);let U=(J,j,ft,Tt)=>(Tt[0]=J,Tt[1]=P+j*S-ft*M,Tt[2]=j*M+ft*S,Tt);v.parte("tronco",t,n,i,m,g,0,P,0,-w,0,u,a);let D=U(0,zo+.1,0,[0,0,0]),W=o===1?-.25:o===2?.05:0;v.parte("cabeca",t,n,i,m,g,D[0],D[1],D[2],-w*.4+W,0,u,h),p||l===2||l===5?(v.parte("colete",t,n,i,m,g,0,P+.12*S,.12*M,-w,0,u,l===2||l===5?qu:l===3?[.45,.42,.33]:ky),v.parte("capacete",t,n,i,m,g,D[0],D[1],D[2],-w*.4+W,0,u,l===2||l===5?qu:l===3?[.5,.47,.38]:Hy),p&&v.parte("mochila",t,n,i,m,g,0,P+.12*S,.12*M,-w,0,u,l===3?[.6,.58,.5]:[.92,.9,.85])):f&&v.parte("cabelo",t,n,i,m,g,D[0],D[1],D[2],-w*.4+W,0,u,f);let H=U(.2,zo-.05,0,[0,0,0]),nt=U(-.2,zo-.05,0,[0,0,0]),V=l===0||l===3||l===4?h:Oy,Z=a;if(_&&o!==1&&o!==4){let J=o===2,j=-.11,ft=J?1.38:1+A*.5,Tt=J?.16+M*.3:.2,Y=J?0:.5+y*.04*R,B=J?.03:.35;this._arma(v,t,n,i,m,g,j,ft,Tt,Y,B,u);let st=Math.cos(Y)*Math.cos(B),tt=-Math.sin(Y),gt=Math.sin(B)*Math.cos(Y),St=[j+gt*.27,ft+.05+tt*.27,Tt+st*.27],xt=[j,ft+.02,Tt-.02];this._membro(v,"braco","antebraco",Wu,Xu,H,St,[1,-.6,-.3],t,n,i,m,g,u,Z,Z,"mao",V),this._membro(v,"braco","antebraco",Wu,Xu,nt,xt,[-1,-.7,-.6],t,n,i,m,g,u,Z,Z,"mao",V);return}for(let J of[1,-1]){let j=J===1?H:nt,ft;if(o===1)ft=[j[0]*.8,j[1]-.05+(J===1?y:-y)*.05,j[2]+.52];else if(o===4)ft=[j[0]+J*(.2+y*.12),j[1]+.5,j[2]+.05];else{let Tt=(J===1?-y:y)*.45*R;ft=[j[0]+J*.05,j[1]-.52*Math.cos(Tt)+.05*R,j[2]+.52*Math.sin(Tt)+.04]}this._membro(v,"braco","antebraco",Wu,Xu,j,ft,[J*.4,.1,-1],t,n,i,m,g,u,o===1&&l!==3?h:Z,o===1||l===0||l===4?h:Z,"mao",V)}}_arma(t,n,i,s,r,o,a,c,h,l,u,f){let d=Math.cos(Math.atan2(o,r)+u),p=Math.sin(Math.atan2(o,r)+u),v=n+(r*a+o*h)*f,m=s+(-o*a+r*h)*f;t.parte("arma",v,i,m,d,p,0,c,0,l,0,f,[.38,.38,.39])}},li=e=>[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255],k0=[14241615,5210073,15921906,15911244,5683312,15108800,3355443,8377312,16752448,10185686,2051724,13218447,16777215,2864037].map(li),H0=[3095378,3947580,7035461,2042436,14208437,4873594,2829099,9085122].map(li),V0=[15843965,14724201,13010498,9262372,16767916,11037500].map(li),G0=[1709072,3877406,6176806,9071163,14202218,2236962,7024158,11577760].map(li),W0=[9413498,10135690,8228714,10725774].map(li),Gr=[1,1,1],Lo=[.95,.95,.93],Wr=li(14264183),Ec=li(1908774),Tc=li(2303532);var hi=4e3,Uo=600,wc=class{constructor(t){this.pos=new Float32Array(hi*3),this.cor=new Float32Array(hi*4),this.tam=new Float32Array(hi),this.vel=new Float32Array(hi*3),this.vida=new Float32Array(hi),this.vidaMax=new Float32Array(hi),this.cresce=new Float32Array(hi),this.grav=new Float32Array(hi),this.corIni=new Float32Array(hi*3),this.corFim=new Float32Array(hi*3),this.livre=[];for(let r=hi-1;r>=0;r--)this.livre.push(r);this.ativos=[];let n=new de;n.setAttribute("position",new ce(this.pos,3).setUsage(os)),n.setAttribute("cor",new ce(this.cor,4).setUsage(os)),n.setAttribute("tam",new ce(this.tam,1).setUsage(os)),this.geo=n;let i=new wn({transparent:!0,depthWrite:!1,uniforms:{escala:{value:600}},vertexShader:`attribute vec4 cor; attribute float tam; varying vec4 vC; uniform float escala;
        void main(){ vC = cor; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = clamp(tam * escala / -mv.z, 1.0, 256.0); gl_Position = projectionMatrix * mv; }`,fragmentShader:"varying vec4 vC; void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d,d); if (r > 0.25) discard; gl_FragColor = vec4(vC.rgb, vC.a * (1.0 - r*3.2)); }"});this.matP=i,this.pontos=new qa(n,i),this.pontos.frustumCulled=!1,this.pontos.renderOrder=5,t.add(this.pontos),this.tPos=new Float32Array(Uo*6),this.tCor=new Float32Array(Uo*6),this.tVida=new Float32Array(Uo),this.tn=0;let s=new de;s.setAttribute("position",new ce(this.tPos,3).setUsage(os)),s.setAttribute("color",new ce(this.tCor,3).setUsage(os)),this.tgeo=s,this.linhas=new zr(s,new Ls({vertexColors:!0,transparent:!0,opacity:.9})),this.linhas.frustumCulled=!1,this.linhas.renderOrder=4,t.add(this.linhas)}particula(t,n,i,s,r,o,a,c,h,l,u=1,f=0,d=0){if(!this.livre.length)return;let p=this.livre.pop();this.ativos.push(p),this.pos[p*3]=t,this.pos[p*3+1]=n,this.pos[p*3+2]=i,this.vel[p*3]=s,this.vel[p*3+1]=r,this.vel[p*3+2]=o,this.tam[p]=a,this.vida[p]=c,this.vidaMax[p]=c,this.grav[p]=f,this.cresce[p]=d,this.corIni[p*3]=h[0],this.corIni[p*3+1]=h[1],this.corIni[p*3+2]=h[2],this.corFim[p*3]=l[0],this.corFim[p*3+1]=l[1],this.corFim[p*3+2]=l[2],this.cor[p*4+3]=u,this.alfa0=u,this.cor[p*4]=h[0],this.cor[p*4+1]=h[1],this.cor[p*4+2]=h[2]}tracante(t,n,i,s,r,o,a=[1,.85,.4]){let c=this.tn++%Uo;this.tPos.set([t,n,i,s,r,o],c*6),this.tCor.set([a[0],a[1],a[2],a[0]*.6,a[1]*.6,a[2]*.6],c*6),this.tVida[c]=.07}clarao(t,n,i,s=1.2){this.particula(t,n,i,0,0,0,s,.06,[1,.95,.6],[1,.6,.2],1)}explosao(t,n,i,s=6,r=!1){let o=Math.min(40,8+s*2);for(let a=0;a<o;a++){let c=Math.random()*6.28,h=Math.random()*s*2.2;this.particula(t,n+.5,i,Math.cos(c)*h,Math.random()*s*2,Math.sin(c)*h,s*(.5+Math.random()*.5),.35+Math.random()*.3,[1,.85,.35],[.9,.25,.05],1,-2,s*.8)}for(let a=0;a<o*.7;a++){let c=Math.random()*6.28,h=Math.random()*s*.7,l=r?[.85,.92,1]:[.35,.33,.3];this.particula(t+Math.cos(c)*s*.3,n+Math.random()*s*.5,i+Math.sin(c)*s*.3,Math.cos(c)*h,s*.4+Math.random()*3,Math.sin(c)*h,s*.9,1.6+Math.random()*1.6,l,r?[.7,.8,.9]:[.15,.15,.15],.75,r?9:-.6,s*.9)}if(r)for(let a=0;a<18;a++){let c=Math.random()*6.28;this.particula(t,.3,i,Math.cos(c)*3,8+Math.random()*s*3,Math.sin(c)*3,1.5,1.4,[.9,.95,1],[.6,.75,.9],.9,14,.5)}}fumaca(t,n,i,s=2,r=[.25,.25,.25]){this.particula(t,n,i,(Math.random()-.5)*1.5,2+Math.random()*2,(Math.random()-.5)*1.5,s,2.5,r,[.5,.5,.5],.5,-.4,s)}sangue(t,n,i,s=5){for(let r=0;r<s;r++)this.particula(t,n,i,(Math.random()-.5)*4,Math.random()*3,(Math.random()-.5)*4,.35,.5,[.55,.03,.03],[.3,0,0],1,12,0)}poeira(t,n,i=2){for(let s=0;s<i;s++)this.particula(t+(Math.random()-.5)*2,.4,n+(Math.random()-.5)*2,Math.random()-.5,.8,Math.random()-.5,1.4,1,[.72,.66,.55],[.8,.76,.68],.35,0,1.5)}esteira(t,n,i){this.particula(t,n,i,0,0,0,1.6,.9,[1,.7,.4],[.5,.5,.5],.6,0,3)}atualizar(t,n){this.matP.uniforms.escala.value=n;let i=this.ativos;for(let r=i.length-1;r>=0;r--){let o=i[r];if(this.vida[o]-=t,this.vida[o]<=0){this.tam[o]=0,this.cor[o*4+3]=0,this.pos[o*3+1]=-1e3,i[r]=i[i.length-1],i.pop(),this.livre.push(o);continue}let a=1-this.vida[o]/this.vidaMax[o];this.vel[o*3+1]-=this.grav[o]*t,this.pos[o*3]+=this.vel[o*3]*t,this.pos[o*3+1]+=this.vel[o*3+1]*t,this.pos[o*3+2]+=this.vel[o*3+2]*t,this.pos[o*3+1]<.1&&this.grav[o]>0&&(this.pos[o*3+1]=.1,this.vel[o*3]*=.5,this.vel[o*3+2]*=.5,this.vel[o*3+1]=0),this.vel[o*3]*=.97,this.vel[o*3+2]*=.97,this.tam[o]+=this.cresce[o]*t;for(let c=0;c<3;c++)this.cor[o*4+c]=this.corIni[o*3+c]+(this.corFim[o*3+c]-this.corIni[o*3+c])*a;this.cor[o*4+3]=Math.min(this.cor[o*4+3],(1-a)*1.2)}let s=this.geo.attributes;s.position.needsUpdate=s.cor.needsUpdate=s.tam.needsUpdate=!0;for(let r=0;r<Uo;r++)if(this.tVida[r]>0&&(this.tVida[r]-=t,this.tVida[r]<=0))for(let o=0;o<6;o++)this.tPos[r*6+o]=0;this.tgeo.attributes.position.needsUpdate=!0,this.tgeo.attributes.color.needsUpdate=!0}};var Zn={fuzileiro:{nome:"Soldado",sub:"Fuzil M4A1",icone:"\u{1FA96}",classe:"inf",hp:100,vel:6.5,alcance:55,dano:16,cadencia:.38,precisao:.6,arma:"fuzil",custo:60,tempo:4,de:"quartel",slots:1,raio:.6},metralhador:{nome:"Metralhador",sub:"M249 SAW",icone:"\u{1F52B}",classe:"inf",hp:120,vel:6,alcance:62,dano:10,cadencia:.1,precisao:.42,arma:"mg",custo:100,tempo:6,de:"quartel",slots:1,raio:.6},sniper:{nome:"Atirador de Elite",sub:"M110 / Barrett M107",icone:"\u{1F3AF}",classe:"inf",hp:90,vel:6.2,alcance:150,dano:110,cadencia:1.7,precisao:.92,arma:"sniper",custo:140,tempo:8,de:"quartel",slots:1,raio:.6},medico:{nome:"M\xE9dico de Combate",sub:"Cura soldados por perto",icone:"\u2695\uFE0F",classe:"inf",hp:100,vel:6.6,alcance:40,dano:9,cadencia:.55,precisao:.5,arma:"pistola",cura:7,custo:110,tempo:6,de:"quartel",slots:1,raio:.6},humvee:{nome:"Humvee M1151",sub:"Metralhadora .50 \u2022 leva 4",icone:"\u{1F699}",classe:"veic",modelo:"humvee",hp:550,vel:26,alcance:85,dano:24,cadencia:.16,precisao:.45,arma:"50cal",carga:4,cargaTipos:["inf","civil"],custo:240,tempo:9,de:"patio",slots:6,raio:2.6,leve:!0,atropela:!0},ambulancia:{nome:"Ambul\xE2ncia M997",sub:"Leva 8 \u2022 cura passageiros",icone:"\u{1F691}",classe:"veic",modelo:"ambulancia",hp:420,vel:25,carga:8,cargaTipos:["inf","civil"],cura:12,custo:180,tempo:8,de:"patio",slots:6,raio:2.7,leve:!0,atropela:!0},stryker:{nome:"Stryker M1126",sub:"Blindado 8x8 \u2022 leva 9",icone:"\u{1F690}",classe:"veic",modelo:"stryker",hp:1100,vel:24,alcance:95,dano:26,cadencia:.15,precisao:.5,arma:"50cal",carga:9,cargaTipos:["inf","civil"],custo:450,tempo:13,de:"patio",slots:10,raio:3.6,atropela:!0},bradley:{nome:"Bradley M2A3",sub:"Canh\xE3o 25mm \u2022 leva 6",icone:"\u{1F6FB}",classe:"veic",modelo:"bradley",hp:1500,vel:20,alcance:120,dano:55,splash:3,cadencia:.32,precisao:.6,arma:"25mm",carga:6,cargaTipos:["inf","civil"],custo:620,tempo:15,de:"patio",slots:12,raio:3.4,atropela:!0},abrams:{nome:"Tanque M1A2 Abrams",sub:"Canh\xE3o 120mm",icone:"\u{1F6E1}\uFE0F",classe:"veic",modelo:"abrams",hp:3200,vel:19,alcance:170,dano:320,splash:8,cadencia:4.2,precisao:.85,arma:"120mm",sec:{alcance:90,dano:12,cadencia:.11,precisao:.45,arma:"mg"},custo:950,tempo:20,de:"patio",slots:20,raio:4.8,atropela:!0},paladin:{nome:"Obuseiro M109A7 Paladin",sub:"Artilharia 155mm \u2022 longo alcance",icone:"\u{1F4A5}",classe:"veic",modelo:"paladin",hp:1600,vel:15,alcance:700,minAlc:80,dano:300,splash:15,cadencia:6,precisao:.7,arma:"155mm",arco:!0,custo:900,tempo:20,de:"patio",slots:18,raio:4.6},himars:{nome:"HIMARS M142",sub:"Lan\xE7a-foguetes \u2022 6 foguetes",icone:"\u{1F680}",classe:"veic",modelo:"himars",hp:1100,vel:22,alcance:1100,minAlc:150,dano:230,splash:16,cadencia:.5,salva:6,recarga:20,precisao:.75,arma:"foguete",custo:1200,tempo:24,de:"patio",slots:16,raio:3.8},swat:{nome:"Policial SWAT",sub:"Pol\xEDcia de Miami \u2022 age sozinha",icone:"\u{1F693}",classe:"inf",hp:115,vel:6.4,alcance:58,dano:15,cadencia:.3,precisao:.58,arma:"fuzil",custo:0,slots:1,raio:.6,policia:!0},bearcat:{nome:"Blindado SWAT BearCat",sub:"Pol\xEDcia de Miami \u2022 leva 10",icone:"\u{1F693}",classe:"veic",modelo:"bearcat",hp:1300,vel:25,carga:10,cargaTipos:["inf","civil"],custo:0,slots:10,raio:3,atropela:!0,policia:!0},blackhawk:{nome:"UH-60 Black Hawk",sub:"Metralhadoras M134 \u2022 leva 11",icone:"\u{1F681}",classe:"aereo",modelo:"blackhawk",hp:850,vel:75,altCruz:40,alcance:95,dano:10,cadencia:.07,precisao:.35,arma:"m134",carga:11,cargaTipos:["inf","civil"],custo:750,tempo:16,de:"heliporto",raio:8},chinook:{nome:"CH-47 Chinook",sub:"Leva 33 ou um Humvee",icone:"\u{1F681}",classe:"aereo",modelo:"chinook",hp:1200,vel:68,altCruz:45,alcance:80,dano:11,cadencia:.16,precisao:.35,arma:"m240",carga:33,cargaTipos:["inf","civil","leve"],custo:950,tempo:20,de:"heliporto",raio:10},apache:{nome:"AH-64 Apache",sub:"Canh\xE3o 30mm + m\xEDsseis Hellfire",icone:"\u{1F681}",classe:"aereo",modelo:"apache",hp:1e3,vel:80,altCruz:55,alcance:280,dano:45,splash:3,cadencia:.13,precisao:.55,arma:"30mm",sec:{alcance:650,dano:420,splash:11,cadencia:7,precisao:.95,arma:"hellfire",missil:!0},custo:1150,tempo:22,de:"heliporto",raio:8},littlebird:{nome:"MH-6 Little Bird",sub:"Leva 6 soldados nos bancos externos \u2022 r\xE1pido e pequeno",icone:"\u{1F681}",classe:"aereo",modelo:"littlebird",hp:500,vel:88,altCruz:35,alcance:75,dano:12,cadencia:.16,precisao:.42,arma:"fuzil",carga:6,cargaTipos:["inf"],custo:450,tempo:10,de:"heliporto",raio:5},reaper:{nome:"Drone MQ-9 Reaper",sub:"Vigia em c\xEDrculos e lan\xE7a Hellfire",icone:"\u{1F6E9}\uFE0F",classe:"aereo",modelo:"reaper",hp:450,vel:70,altCruz:260,orbita:240,alcance:750,dano:420,splash:11,cadencia:6.5,precisao:.95,arma:"hellfire",missil:!0,custo:700,tempo:15,de:"heliporto",raio:10},f35:{nome:"F-35C Lightning II",sub:"Ca\xE7a furtivo \u2022 bombas guiadas GBU-31",icone:"\u2708\uFE0F",classe:"jato",modelo:"f35",hp:900,vel:250,altCruz:160,dano:650,splash:20,municao:4,arma:"bomba",custo:1500,tempo:22,de:"porta",raio:9},f18:{nome:"F/A-18E Super Hornet",sub:"Foguetes e bombas \u2022 ataque rasante",icone:"\u2708\uFE0F",classe:"jato",modelo:"f18",hp:900,vel:260,altCruz:150,dano:180,splash:9,municao:3,rajada:6,arma:"foguete",custo:1250,tempo:20,de:"porta",raio:9},a10:{nome:"A-10 Thunderbolt II",sub:"Canh\xE3o GAU-8 de 30mm \u2022 metralha a faixa toda",icone:"\u{1F6E9}\uFE0F",classe:"jato",modelo:"a10",hp:1600,vel:150,altCruz:90,dano:70,splash:4,municao:5,arma:"canhao",custo:1400,tempo:22,de:"pista",raio:10},f22:{nome:"F-22 Raptor",sub:"Mais r\xE1pido \u2022 8 bombas pequenas SDB",icone:"\u2708\uFE0F",classe:"jato",modelo:"f22",hp:1e3,vel:300,altCruz:200,dano:380,splash:13,municao:4,bombas:4,arma:"bomba",custo:1700,tempo:24,de:"pista",raio:9},osprey:{nome:"MV-22 Osprey",sub:"Rotores basculantes \u2022 leva 24",icone:"\u{1F6EB}",classe:"aereo",modelo:"osprey",hp:1e3,vel:120,altCruz:60,carga:24,cargaTipos:["inf","civil"],custo:1200,tempo:22,de:"porta",raio:9},lancha:{nome:"Lancha Mark VI",sub:"Patrulha \u2022 leva 8",icone:"\u{1F6A4}",classe:"naval",modelo:"lancha",nav:1,hp:800,vel:28,alcance:130,dano:24,cadencia:.16,precisao:.45,arma:"50cal",carga:8,cargaTipos:["inf","civil"],custo:320,tempo:12,de:"docas",raio:8},lcac:{nome:"Hovercraft LCAC",sub:"Anf\xEDbio \u2022 leva tropas e ve\xEDculos",icone:"\u{1F6E5}\uFE0F",classe:"naval",modelo:"lcac",nav:3,hp:1400,vel:26,carga:30,cargaTipos:["inf","civil","leve","veic"],custo:750,tempo:18,de:"docas",raio:12},destroier:{nome:"Destr\xF3ier classe Arleigh Burke",sub:'Canh\xE3o naval 5" de longo alcance',icone:"\u{1F6A2}",classe:"naval",modelo:"destroier",nav:2,hp:7e3,vel:16,alcance:950,minAlc:60,dano:300,splash:14,cadencia:2.6,precisao:.8,arma:"naval",arco:!0,custo:2400,tempo:35,de:"docas",raio:30},portaavioes:{nome:"Porta-avi\xF5es USS Liberty",sub:"Classe Nimitz \u2022 base flutuante",icone:"\u2693",classe:"naval",modelo:"portaavioes",nav:2,hp:3e4,vel:7,carga:0,custo:0,de:null,raio:60,unico:!0}},Yu={qg:{nome:"Quartel-General",hp:6e3,raio:26},quartel:{nome:"Quartel (Infantaria)",hp:3e3,raio:30},patio:{nome:"P\xE1tio de Ve\xEDculos",hp:3500,raio:34},heliporto:{nome:"Heliporto",hp:2500,raio:40},docas:{nome:"Docas da Marinha",hp:3e3,raio:30},zona:{nome:"Zona Segura (abrigo de civis)",hp:2e3,raio:32},torre:{nome:"Torre de Vigia",hp:900,raio:4,alcance:110,dano:22,cadencia:.18,precisao:.5,arma:"50cal"},muro:{nome:"Barreira",hp:900,raio:5},fob:{nome:"Posto Avan\xE7ado (FOB)",hp:2500,raio:28},pista:{nome:"Pista de Pouso",hp:8e3,raio:60},patriot:{nome:"Bateria Patriot",hp:1500,raio:6}},Ac={quartel:["fuzileiro","metralhador","sniper","medico"],patio:["humvee","ambulancia","stryker","bradley","abrams","paladin","himars"],heliporto:["littlebird","blackhawk","chinook","apache","reaper"],docas:["lancha","lcac","destroier"],porta:["f35","f18","osprey"],pista:["f22","a10","f35","f18"]},X0={quartel:"\u{1FA96} Quartel",patio:"\u{1F699} P\xE1tio",heliporto:"\u{1F681} Heliporto",docas:"\u2693 Docas",porta:"\u{1F6F3}\uFE0F Porta-avi\xF5es",pista:"\u{1F6EB} Pista de pouso"},Do={fob:{nome:"Posto Avan\xE7ado (FOB)",sub:"Zona segura para civis + QG de campo",icone:"\u26FA",custo:900,tempo:25,raio:30},quartel:{nome:"Quartel",sub:"Treina infantaria aqui",icone:"\u{1FA96}",custo:1200,tempo:35,raio:34},patio:{nome:"P\xE1tio de Ve\xEDculos",sub:"Produz blindados aqui",icone:"\u{1F699}",custo:1600,tempo:45,raio:38},heliporto:{nome:"Heliporto",sub:"Produz helic\xF3pteros aqui",icone:"\u{1F681}",custo:1500,tempo:40,raio:44},docas:{nome:"Docas",sub:"Precisa ficar na beira da \xE1gua",icone:"\u2693",custo:1400,tempo:40,raio:34,agua:!0},zona:{nome:"Zona Segura",sub:"Abrigo de civis (resgate)",icone:"\u{1F3E5}",custo:700,tempo:20,raio:32},torre:{nome:"Torre de Vigia",sub:"Metralhadora .50 autom\xE1tica",icone:"\u{1F5FC}",custo:300,tempo:10,raio:6},muro:{nome:"Barreira",sub:"Gabi\xF5es contra os zumbis",icone:"\u{1F9F1}",custo:60,tempo:4,raio:6},patriot:{nome:"Bateria Patriot",sub:"Defesa antia\xE9rea",icone:"\u{1F6F0}\uFE0F",custo:500,tempo:15,raio:8},pista:{nome:"Pista de Pouso",sub:"Base a\xE9rea: F-22 e A-10 (precisa de muito espa\xE7o)",icone:"\u{1F6EB}",custo:2500,tempo:50,raio:60,grande:!0}};var tf={};If(tf,{NCEL:()=>kn,NH:()=>_i,NW:()=>$t,acharCaminho:()=>Qu,livre:()=>Xr,pontoLivreProximo:()=>yn,prepararNavegacao:()=>Ku});var Ys=2,$t=Math.ceil(Ft/Ys),_i=Math.ceil(be/Ys),kn=Pe*Ys,In=$t*_i,$s=[new Uint8Array(In),new Uint8Array(In),new Uint8Array(In),new Uint8Array(In)];function Ku(){let e=$s[0],t=$s[1],n=$s[2],i=$s[3];for(let c=0;c<_i;c++)for(let h=0;h<$t;h++){let l=0,u=0,f=0;for(let p=0;p<Ys;p++)for(let v=0;v<Ys;v++){let m=h*Ys+v,g=c*Ys+p;if(m>=Ft||g>=be){u++;continue}let _=g*Ft+m,y=Re[_];y===pe.AGUA?u++:y===pe.PONTE?(l++,u++,f++):Te[_]<0&&l++}let d=c*$t+h;e[d]=l>=2||f>0?1:0,t[d]=u>=3?1:0,i[d]=e[d]||t[d]?1:0}let s=new Uint8Array(In).fill(255),r=new Int32Array(In),o=0,a=0;for(let c=0;c<In;c++)t[c]||(s[c]=0,r[a++]=c);for(;o<a;){let c=r[o++],h=c%$t,l=c/$t|0,u=s[c]+1;u>20||(h>0&&s[c-1]>u&&(s[c-1]=u,r[a++]=c-1),h<$t-1&&s[c+1]>u&&(s[c+1]=u,r[a++]=c+1),l>0&&s[c-$t]>u&&(s[c-$t]=u,r[a++]=c-$t),l<_i-1&&s[c+$t]>u&&(s[c+$t]=u,r[a++]=c+$t))}for(let c=0;c<In;c++)n[c]=s[c]>=3?1:0}function Xr(e,t,n){let i=Math.floor(t/kn),s=Math.floor(n/kn);return i<0||s<0||i>=$t||s>=_i?We&&(e===1||e===2):$s[e][s*$t+i]===1}function ju(e,t,n=40){if(e[t])return t;let i=t%$t,s=t/$t|0;for(let r=1;r<=n;r++)for(let o=-r;o<=r;o++)for(let a=-r;a<=r;a++){if(Math.abs(a)!==r&&Math.abs(o)!==r)continue;let c=i+a,h=s+o;if(!(c<0||h<0||c>=$t||h>=_i)&&e[h*$t+c])return h*$t+c}return-1}function yn(e,t,n){let i=Math.max(0,Math.min($t-1,Math.floor(t/kn))),s=Math.max(0,Math.min(_i-1,Math.floor(n/kn))),r=ju($s[e],s*$t+i,60);return r<0?null:{x:(r%$t+.5)*kn,z:((r/$t|0)+.5)*kn}}var Rc=new Float32Array(In),$u=new Int32Array(In),Zu=new Uint32Array(In),Ju=new Uint32Array(In),qs=1,ms=new Int32Array(In),ui=new Float32Array(In),Zs=0;function q0(e,t){let n=Zs++;for(;n>0;){let i=n-1>>1;if(ui[i]<=t)break;ms[n]=ms[i],ui[n]=ui[i],n=i}ms[n]=e,ui[n]=t}function Wy(){let e=ms[0],t=ms[--Zs],n=ui[Zs],i=0;for(;;){let s=i*2+1;if(s>=Zs||(s+1<Zs&&ui[s+1]<ui[s]&&s++,ui[s]>=n))break;ms[i]=ms[s],ui[i]=ui[s],i=s}return ms[i]=t,ui[i]=n,e}var Xy=[1,-1,0,0,1,1,-1,-1],qy=[0,0,1,-1,1,-1,1,-1],Yy=[1,1,1,1,1.4142,1.4142,1.4142,1.4142];function $y(e,t,n){let i=t%$t,s=t/$t|0,r=n%$t,o=n/$t|0,a=Math.abs(r-i),c=Math.abs(o-s),h=i<r?1:-1,l=s<o?1:-1,u=a-c;for(;;){if(!e[s*$t+i])return!1;if(i===r&&s===o)return!0;let f=u*2;if(f>-c&&f<a&&(!e[s*$t+i+h]||!e[(s+l)*$t+i]))return!1;f>-c&&(u-=c,i+=h),f<a&&(u+=a,s+=l)}}function Qu(e,t,n,i,s,r=7e4){let o=$s[e],a=(A,P)=>Math.max(0,Math.min(P-1,A)),c=ju(o,a(Math.floor(n/kn),_i)*$t+a(Math.floor(t/kn),$t),12),h=ju(o,a(Math.floor(s/kn),_i)*$t+a(Math.floor(i/kn),$t),40);if(c<0||h<0)return null;if(c===h)return[{x:i,z:s}];qs++,Zs=0;let l=h%$t,u=h/$t|0,f=A=>{let P=Math.abs(A%$t-l),S=Math.abs((A/$t|0)-u);return(P+S+(1.4142-2)*Math.min(P,S))*1.25};Rc[c]=0,Zu[c]=qs,$u[c]=-1,q0(c,f(c));let d=c,p=f(c),v=0,m=!1;for(;Zs>0&&v<r;){let A=Wy();if(Ju[A]===qs)continue;if(Ju[A]=qs,v++,A===h){m=!0;break}let P=f(A);P<p&&(p=P,d=A);let S=A%$t,M=A/$t|0;for(let I=0;I<8;I++){let L=S+Xy[I],U=M+qy[I];if(L<0||U<0||L>=$t||U>=_i)continue;let D=U*$t+L;if(!o[D]||Ju[D]===qs||I>=4&&(!o[M*$t+L]||!o[U*$t+S]))continue;let W=Rc[A]+Yy[I];(Zu[D]!==qs||W<Rc[D])&&(Zu[D]=qs,Rc[D]=W,$u[D]=A,q0(D,W+f(D)))}}let g=m?h:d,_=[];for(let A=g;A!==-1;A=$u[A])_.push(A);_.reverse();let y=[_[0]],b=0;for(;b<_.length-1;){let A=Math.min(_.length-1,b+60);for(;A>b+1&&!$y(o,_[b],_[A]);)A--;y.push(_[A]),b=A}let R=y.slice(1).map(A=>({x:(A%$t+.5)*kn,z:((A/$t|0)+.5)*kn}));m&&R.push({x:i,z:s});let w=R.length?R:[{x:i,z:s}];return w.parcial=!m,w}var It=null,zn=null,$r=null,Zr=null,Hn=null,Jr=!0,ef={},qr=null,Yr=null,No=null;function Hi(){if(It){It.state==="suspended"&&It.resume();return}let e=window.AudioContext||window.webkitAudioContext;if(!e)return;It=new e;let t=It.createDynamicsCompressor();t.threshold.value=-14,t.knee.value=10,t.ratio.value=6,t.attack.value=.003,t.release.value=.25,t.connect(It.destination),zn=It.createGain(),zn.gain.value=Jr?.6:0,zn.connect(t);let n=It.sampleRate;Zr=It.createBuffer(1,n*2,n),Hn=It.createBuffer(1,n*2,n);let i=Zr.getChannelData(0),s=Hn.getChannelData(0),r=0;for(let h=0;h<i.length;h++)i[h]=Math.random()*2-1,r=(r+.02*i[h])/1.02,s[h]=r*3.5;let o=2.4,a=It.createBuffer(2,n*o,n);for(let h=0;h<2;h++){let l=a.getChannelData(h);for(let u=0;u<l.length;u++){let f=u/n,d=f>.06&&f<.075||f>.13&&f<.14||f>.21&&f<.22?.6:0;l[u]=(Math.random()*2-1)*(Math.exp(-f*2.6)*.5+d*Math.exp(-f*3))}}let c=It.createConvolver();c.buffer=a,$r=It.createGain(),$r.gain.value=.45,$r.connect(c),c.connect(zn)}function Fo(e){Jr=e,zn&&(zn.gain.value=e?.6:0)}function pn(e,t){let n=performance.now();return ef[e]&&n-ef[e]<t?!1:(ef[e]=n,!0)}function he(e,t,n,i,s,r="lowpass",o=.2,a=0,c=Zr,h=0){if(!It||!Jr||e<.005)return;let l=It.currentTime+a,u=It.createBufferSource();u.buffer=c,u.playbackRate.value=.9+Math.random()*.2;let f=It.createBiquadFilter();f.type=r,f.frequency.setValueAtTime(i,l),f.Q.value=s,h&&f.frequency.exponentialRampToValueAtTime(h,l+n);let d=It.createGain();if(d.gain.setValueAtTime(1e-4,l),d.gain.exponentialRampToValueAtTime(e,l+t),d.gain.exponentialRampToValueAtTime(1e-4,l+t+n),u.connect(f),f.connect(d),d.connect(zn),o>0){let p=It.createGain();p.gain.value=o,d.connect(p),p.connect($r)}u.start(l,Math.random()*1.2,t+n+.05)}function Le(e,t,n,i,s="sine",r=0,o=.15){if(!It||!Jr||e<.005)return;let a=It.currentTime+r,c=It.createOscillator();c.type=s,c.frequency.setValueAtTime(n,a),c.frequency.exponentialRampToValueAtTime(Math.max(15,i),a+t);let h=It.createGain();if(h.gain.setValueAtTime(e,a),h.gain.exponentialRampToValueAtTime(1e-4,a+t),c.connect(h),h.connect(zn),o>0){let l=It.createGain();l.gain.value=o,h.connect(l),l.connect($r)}c.start(a),c.stop(a+t+.05)}function bi(e,t){if(!It||t<.015)return;let i=1-(1-t)*.75,s=.92+Math.random()*.16;switch(e){case"pistola":if(!pn("pist",60))return;he(t*.5*i,.001,.03,3200*s,.7,"highpass",.1),he(t*.45,.002,.09,1400*s,1.2,"bandpass",.3),Le(t*.25,.06,260,90);break;case"fuzil":if(!pn("fuzil",40))return;he(t*.7*i,.001,.025,4200*s,.6,"highpass",.15),he(t*.55,.002,.1,1100*s,1.1,"bandpass",.35),Le(t*.35,.08,200*s,70),he(t*.18,.01,.45,900,.7,"lowpass",.9,.02);break;case"mg":case"m240":if(!pn("mg",38))return;he(t*.6*i,.001,.022,3600*s,.6,"highpass",.12),he(t*.55,.002,.09,900*s,1,"bandpass",.35),Le(t*.35,.07,170*s,60),Math.random()<.4&&he(t*.15,.01,.4,800,.7,"lowpass",.9,.02);break;case"m134":if(!pn("m134",30))return;he(t*.5,.001,.05,1500*s,.8,"bandpass",.3),Le(t*.25,.05,140,70,"square");break;case"sniper":if(!pn("sn",80))return;he(t*.95*i,.001,.03,3800,.6,"highpass",.2),he(t*.8,.002,.18,700,.9,"bandpass",.5),Le(t*.6,.22,140,38),he(t*.35,.02,1.4,600,.6,"lowpass",1.2,.05);break;case"50cal":if(!pn("50",55))return;he(t*.7*i,.001,.03,2800*s,.6,"highpass",.2),he(t*.75,.003,.16,520*s,1,"bandpass",.45),Le(t*.55,.14,110*s,38),Math.random()<.5&&he(t*.2,.01,.6,500,.6,"lowpass",1,.03);break;case"25mm":case"30mm":if(!pn("ac",90))return;he(t*.7*i,.001,.035,2400,.6,"highpass",.2),he(t*.85,.003,.22,380*s,.9,"bandpass",.5),Le(t*.7,.2,90*s,30),he(t*.25,.02,.8,400,.6,"lowpass",1,.04,Hn);break;case"120mm":case"155mm":case"naval":if(!pn("can",120))return;he(t*.9*i,.001,.05,2e3,.5,"highpass",.3),he(t*1.2,.004,.9,260,.7,"lowpass",.9,0,Hn,90),Le(t*1.1,1.1,75,24),Le(t*.5,.5,140,45,"triangle"),he(t*.45,.05,2,300,.6,"lowpass",1.4,.32,Hn),he(t*.25,.05,1.6,250,.6,"lowpass",1.4,.75,Hn);break;case"foguete":case"hellfire":if(!pn("fog",110))return;he(t*.8,.005,.15,600,.6,"lowpass",.4,0,Hn),he(t*.6,.06,.9,500,1.4,"bandpass",.6,0,Zr,2600),Le(t*.4,.4,90,40);break;case"gau8":{if(!pn("gau",900))return;let r=It.currentTime,o=It.createOscillator();o.type="sawtooth",o.frequency.value=66;let a=It.createBiquadFilter();a.type="lowpass",a.frequency.value=900*i+200;let c=It.createGain();c.gain.setValueAtTime(1e-4,r),c.gain.exponentialRampToValueAtTime(t*.9,r+.05),c.gain.setValueAtTime(t*.9,r+1.6),c.gain.exponentialRampToValueAtTime(1e-4,r+1.9),o.connect(a),a.connect(c),c.connect(zn);let h=It.createGain();h.gain.value=.6,c.connect(h),h.connect($r),o.start(r),o.stop(r+2),he(t*.5,.01,1.7,500,.8,"bandpass",.6),he(t*.4,.1,2.2,250,.6,"lowpass",1.2,1.7,Hn);break}case"bomba":if(!pn("bmb",150))return;Le(t*.18,1.2,1400,500,"sine",0,.3);break;default:if(!pn("def",100))return;he(t*.6,.002,.2,700,.9,"bandpass",.4)}}function Cc(e,t=!1){if(!It||e<.015||!pn("exp",60))return;let n=t?1.3:1;he(e*.8,.001,.06,1800,.5,"highpass",.3),he(e*1.3*n,.005,1.4*n,420,.6,"lowpass",1,0,Hn,70),Le(e*1.1*n,1.3*n,62,18);for(let i=0;i<6;i++)he(e*.12,.002,.05,3e3+Math.random()*3e3,1,"bandpass",.2,.15+Math.random()*.7);he(e*.4*n,.1,2.5,220,.6,"lowpass",1.5,.35,Hn)}function Y0(e){if(!(!It||e<.02||!pn("vidro",120))){he(e*.5,.001,.12,4500,.8,"highpass",.2);for(let t=0;t<9;t++)Le(e*.08,.06+Math.random()*.12,2500+Math.random()*4e3,2e3+Math.random()*3e3,"sine",.02+Math.random()*.35,.1)}}function nf(e){if(!(!It||e<.02||!pn("esm",200))){he(e*.8,.002,.35,700,1.5,"bandpass",.3),Le(e*.4,.25,160,60,"square");for(let t=0;t<4;t++)Le(e*.06,.1,2e3+Math.random()*2500,1500,"sine",.05+Math.random()*.2,.05)}}function sf(e){if(!It||e<.03||!pn("zb",700))return;let t=It.currentTime,n=85+Math.random()*70,i=It.createOscillator();i.type="sawtooth",i.frequency.setValueAtTime(n,t),i.frequency.linearRampToValueAtTime(n*.75,t+1.1);let s=It.createOscillator();s.frequency.value=6+Math.random()*4;let r=It.createGain();r.gain.value=6,s.connect(r),r.connect(i.frequency);let o=It.createBiquadFilter();o.type="bandpass",o.frequency.value=450+Math.random()*300,o.Q.value=4;let a=It.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(e*.35,t+.15),a.gain.exponentialRampToValueAtTime(1e-4,t+1.2),i.connect(o),o.connect(a),a.connect(zn),i.start(t),s.start(t),i.stop(t+1.25),s.stop(t+1.25),he(e*.06,.1,1,800,3,"bandpass",.2)}function Kt(e="clique"){if(It){if(e==="clique")Le(.1,.05,900,700,"square",0,0);else if(e==="ok")Le(.12,.07,660,660,"square",0,0),Le(.12,.09,990,990,"square",.07,0);else if(e==="alerta")Le(.15,.15,880,880,"square",0,0),Le(.15,.15,660,660,"square",.18,0);else if(e==="erro")Le(.13,.2,220,160,"square",0,0);else if(e==="resgate")Le(.1,.1,523,523,"triangle",0,0),Le(.1,.1,659,659,"triangle",.1,0),Le(.1,.2,784,784,"triangle",.2,0);else if(e==="sirene"){let t=It.currentTime,n=It.createOscillator(),i=It.createGain();n.type="sawtooth";for(let r=0;r<3;r++)n.frequency.setValueAtTime(700,t+r*.6),n.frequency.linearRampToValueAtTime(1300,t+r*.6+.3),n.frequency.linearRampToValueAtTime(700,t+r*.6+.6);let s=It.createBiquadFilter();s.type="lowpass",s.frequency.value=2200,i.gain.setValueAtTime(1e-4,t),i.gain.exponentialRampToValueAtTime(.07,t+.1),i.gain.setValueAtTime(.07,t+1.6),i.gain.exponentialRampToValueAtTime(1e-4,t+1.8),n.connect(s),s.connect(i),i.connect(zn),n.start(t),n.stop(t+1.85)}}}function Bo(e,t,n,i){let s=It.createBufferSource();s.buffer=e,s.loop=!0;let r=It.createBiquadFilter();r.type=t,r.frequency.value=n,r.Q.value=i;let o=It.createGain();return o.gain.value=0,s.connect(r),r.connect(o),o.connect(zn),s.start(),{f:r,g:o}}var Js=(e,t,n=.25)=>e.gain.setTargetAtTime(Jr?t:0,It.currentTime,n);function $0(e){if(It){if(!qr){let t=Bo(Zr,"bandpass",320,.9),n=It.createOscillator();n.type="sawtooth",n.frequency.value=17;let i=It.createGain();i.gain.value=0,n.connect(i),i.connect(t.g.gain),n.start();let s=Bo(Hn,"lowpass",160,.7),r=It.createOscillator();r.type="sine",r.frequency.value=1750;let o=It.createGain();o.gain.value=0,r.connect(o),o.connect(zn),r.start(),qr={pas:t,lg:i,vento:s,tg:o}}Js(qr.pas.g,e*.32),qr.lg.gain.setTargetAtTime(Jr?e*.3:0,It.currentTime,.25),Js(qr.vento.g,e*.5),Js(qr.tg,e*e*.012)}}function Z0(e){It&&(Yr||(Yr={ronco:Bo(Hn,"lowpass",300,.6),chiado:Bo(Zr,"bandpass",1800,.7)}),Js(Yr.ronco.g,e*.9,.35),Js(Yr.chiado.g,e*e*.35,.35),Yr.ronco.f.frequency.setTargetAtTime(200+e*500,It.currentTime,.3),Yr.chiado.f.frequency.setTargetAtTime(1200+e*2200,It.currentTime,.3))}function J0(e,t=.5){if(It){if(!No){let n=Bo(Hn,"lowpass",140,.8),i=It.createOscillator();i.type="sawtooth",i.frequency.value=38;let s=It.createBiquadFilter();s.type="lowpass",s.frequency.value=180;let r=It.createGain();r.gain.value=0,i.connect(s),s.connect(r),r.connect(zn),i.start(),No={r:n,o:i,g:r}}Js(No.r.g,e*.6),Js(No.g,e*.06),No.o.frequency.setTargetAtTime(32+t*30,It.currentTime,.4)}}var Pc={comum:{hp:70,vel:4,vagar:.9,dano:12,cd:1,perc:32,esc:1},corredor:{hp:50,vel:7.2,vagar:1.4,dano:9,cd:.8,perc:40,esc:1},bruto:{hp:750,vel:3,vagar:.8,dano:45,cd:1.3,perc:30,esc:1.4},soldado:{hp:110,vel:4,vagar:1,dano:14,cd:1,perc:34,esc:1}},Zy={raio:.4,slots:1};function rf(e,t){return{agente:!0,id:x.idSeq++,x:e,z:t,y:0,ang:ht(0,6.28),zumbi:!1,sub:"civil",hp:30,vivo:!0,estado:"vagar",lider:null,alvo:null,t:ht(0,1),fase:ht(0,6),vel:0,dx:0,dz:0,cd:0,camisa:yi(k0),calca:yi(H0),pele:yi(V0),cabelo:Math.random()<.9?yi(G0):null,soldado:!1,dentro:null,virando:0,mortoT:0,casa:{x:e,z:t},d:Zy,espera:0,acena:0,esc:1}}function Ic(e,t){let n=rf(e,t);return x.agentes.push(n),n}function of(e,t,n){let i=Ic(e,t);return i.estado="seguir",i.lider=n,i.espera=0,i}function zc(e,t,n="comum"){let i=rf(e,t);return Oo(i,n),x.agentes.push(i),i}function Oo(e,t){e.zumbi=!0,e.sub=t;let n=Pc[t];e.hp=n.hp,e.esc=n.esc,e.pele=yi(W0),t==="bruto"&&(e.camisa=li(4864819),e.calca=li(2829099)),e.camisa=e.camisa.map(i=>i*.75),e.estado="vagar",e.lider=null,e.alvo=null,e.t=ht(0,.5)}function j0(e){let t=rf(e.x,e.z);t.soldado=!0,t.camisa=Gr,t.calca=Lo,Oo(t,"soldado"),t.camisa=Gr.map(n=>n*.8),t.estado="morto",t.virando=3.5,t.vivo=!0,x.agentes.push(t),x.infectados++}function jr(e,t,n){if(!(!e.vivo||e.estado==="morto")&&(e.hp-=t,e.zumbi&&Math.random()<.5&&x.efeitos.sangue(e.x,1.2,e.z,3),!(e.hp>0))){if(e.zumbi){e.estado="morto",e.mortoT=12,e.virando=0,x.zumbisMortos++,x.dinheiro+=e.sub==="bruto"?30:4,x.efeitos.sangue(e.x,1,e.z,6);return}n&&n.zumbi?(e.estado="morto",e.virando=3+ht(0,3),e.lider=null,x.infectados++):(e.estado="morto",e.mortoT=15,e.virando=0,x.civisMortos++,n&&!n.zumbi&&!n.agente&&x.tempo-(x._avisoFogo||-99)>20&&(x._avisoFogo=x.tempo,Wt("\u26A0\uFE0F Civis atingidos por fogo amigo!",e.x,e.z,"ruim"))),x.efeitos.sangue(e.x,1,e.z,8)}}function Jn(e,t,n){let i=e.x+t,s=e.z+n;if(He(i,s))return e.x=i,e.z=s,!0;let r=Math.hypot(t,n)*.25;return Math.abs(t)>r&&He(i,e.z)?(e.x=i,!0):Math.abs(n)>r&&He(e.x,s)?(e.z=s,!0):!1}function Jy(e){return e.vivo&&!e.dentro&&!e.predio&&(e.classe==="inf"||e.classe==="veic"||e.estr||e.classe==="aereo"&&e.y<2)}function jy(e){let t=Pc[e.sub],n=t.perc*(x.noite?1.4:1),i=null,s=n*n;if(x.hashA.busca(e.x,e.z,n,(a,c)=>{!a.zumbi&&a.vivo&&!a.dentro&&a.estado!=="morto"&&c<s&&(s=c,i=a)}),x.hashU.busca(e.x,e.z,n,(a,c)=>{Jy(a)&&c<s*.9&&(s=c,i=a)}),e.alvo=i,i){e.estado="perseguir";return}let r=null,o=1/0;for(let a of x.ruidos){let c=$e(e.x,e.z,a.x,a.z);c<a.r*a.r&&c<o&&(o=c,r=a)}if(r){e.estado="ruido",e.destino={x:r.x+ht(-15,15),z:r.z+ht(-15,15)};return}if((e.estado!=="ruido"||!e.destino||Ot(e.x,e.z,e.destino.x,e.destino.z)<5)&&(e.estado="vagar",Math.random()<.4)){let a=ht(0,6.28);e.dx=Math.sin(a),e.dz=Math.cos(a)}for(let[a,c]of[[2,0],[-2,0],[0,2],[0,-2]]){let h=Os(e.x+a,e.z+c);if(h&&h.guarnicao.length){if(h.integridade-=4,h.integridade<=0){h.integridade=0;let l=yi(h.guarnicao);l&&x.danoUnidade(l,t.dano,!0)}break}}}function Ky(e){if(e.campo){Qy(e);return}let t=null,n=20*20;if(x.hashA.busca(e.x,e.z,20,(i,s)=>{i.zumbi&&i.vivo&&i.estado!=="morto"&&s<n&&(n=s,t=i)}),t&&(e.estado!=="seguir"||n<64)){e.estado="fugir";let i=Math.sqrt(n)||1;e.dx=(e.x-t.x)/i,e.dz=(e.z-t.z)/i,e.medo=4;return}if(!(e.estado==="fugir"&&e.medo>0)){if(e.estado==="fugir"&&(e.estado=e.lider?"seguir":"vagar"),e.estado!=="seguir"){let i=null,s=16*16,r=!1;if(x.hashU.busca(e.x,e.z,70,(o,a)=>{!o.vivo||o.dentro||o.estr||(o.classe==="inf"||o.classe==="veic"||o.classe==="naval"&&o.d.carga||o.classe==="aereo"&&o.pousado&&o.d.carga)&&(a<s?(s=a,i=o):r=!0)}),i){e.estado="seguir",e.lider=i;return}e.acena=r?3:0}if(e.estado==="vagar"&&Math.random()<.3){let i=ht(0,6.28),s=Math.random()<.6;if(e.dx=s?Math.sin(i):0,e.dz=s?Math.cos(i):0,Ot(e.x,e.z,e.casa.x,e.casa.z)>60){let r=Ot(e.x,e.z,e.casa.x,e.casa.z);e.dx=(e.casa.x-e.x)/r,e.dz=(e.casa.z-e.z)/r}}}}function Qy(e){let t=e.campo;if(!t.ativo){e.campo=null,e.estado="vagar";return}if(e.estado="acampar",!e.armado){let n=!1;x.hashA.busca(e.x,e.z,10,i=>{i.zumbi&&i.vivo&&i.estado!=="morto"&&(n=!0)}),n&&(e.posto={x:t.x+ht(-3,3),z:t.z+ht(-3,3)})}}function t_(e,t){if(e.cdTiro=(e.cdTiro||0)-t,e.mirando>0&&(e.mirando-=t),e.cdTiro>0)return;e.cdTiro=e.policial?.45:.75+Math.random()*.4;let n=e.policial?55:40,i=null,s=n*n;if(x.hashA.busca(e.x,e.z,n,(h,l)=>{h.zumbi&&h.vivo&&h.estado!=="morto"&&h.virando<=0&&l<s&&(s=l,i=h)}),!i)return;e.ang=Math.atan2(i.x-e.x,i.z-e.z),e.mirando=.8;let r=x.efeitos,o=e.x+Math.sin(e.ang)*.7,a=e.z+Math.cos(e.ang)*.7;r.clarao(o,1.4,a,.8);let c=Math.random()<(e.policial?.55:.38);r.tracante(o,1.4,a,i.x+(c?0:ht(-3,3)),1.1,i.z+(c?0:ht(-3,3)),[1,.85,.45]),c&&jr(i,e.policial?18:22,e),bi(e.policial?"fuzil":"pistola",x.volEm(e.x,e.z)*.8),x.ruidos.push({x:e.x,z:e.z,r:90,t:x.tempo})}function K0(e){let t=x.agentes,n=0,i=0,s=x.noite;for(let r=t.length-1;r>=0;r--){let o=t[r];if(!o.vivo){t[r]=t[t.length-1],t.pop();continue}if(o.dentro){o.dentro.vivo?(o.x=o.dentro.x,o.z=o.dentro.z):o.vivo=!1,i++;continue}if(o.estado==="morto"){o.virando>0?(o.virando-=e,o.virando<=0&&(o.zumbi?(o.estado="vagar",o.hp=Pc[o.sub].hp):Oo(o,e_()),o.y=0,sf(x.volEm(o.x,o.z)))):(o.mortoT-=e,o.mortoT<=0&&(o.vivo=!1));continue}if(o.zumbi?n++:i++,o.t-=e,o.cd-=e,o.medo>0&&(o.medo-=e),o.zumbi){let a=Pc[o.sub];o.t<=0&&(o.t=ht(.3,.6),jy(o));let c=0;if(o.estado==="perseguir"&&o.alvo){let h=o.alvo;if(!h.vivo||h.dentro||h.predio||h.estado==="morto"||h.classe==="aereo"&&h.y>2)o.alvo=null,o.estado="vagar";else{let l=Ot(o.x,o.z,h.x,h.z),u=(h.d?h.d.raio:.4)+.9;if(l>u){let f=Math.atan2(h.x-o.x,h.z-o.z);if(o.ang=Ve(o.ang,f,6*e),c=a.vel*(s?1.25:1),!Jn(o,Math.sin(o.ang)*c*e,Math.cos(o.ang)*c*e)){let d=o.id&1?1.3:-1.3;Jn(o,Math.sin(o.ang+d)*c*e,Math.cos(o.ang+d)*c*e)}}else o.cd<=0&&(o.cd=a.cd,h.agente?jr(h,a.dano+6,o):x.danoUnidade(h,h.classe==="inf"?a.dano:a.dano*(o.sub==="bruto"?1.5:.5),!0),Math.random()<.15&&sf(x.volEm(o.x,o.z)))}}else if(o.estado==="ruido"&&o.destino){let h=Math.atan2(o.destino.x-o.x,o.destino.z-o.z);o.ang=Ve(o.ang,h,3*e),c=a.vel*.7,Jn(o,Math.sin(o.ang)*c*e,Math.cos(o.ang)*c*e)||Jn(o,Math.sin(o.ang+1.2)*c*e,Math.cos(o.ang+1.2)*c*e)}else(o.dx||o.dz)&&(c=a.vagar,o.ang=Ve(o.ang,Math.atan2(o.dx,o.dz),2*e),Jn(o,Math.sin(o.ang)*c*e,Math.cos(o.ang)*c*e)||(o.dx=-o.dx,o.dz=-o.dz));o.vel=c,o.fase+=e*c*2.2}else{o.t<=0&&(o.t=ht(.35,.7),Ky(o));let a=0;if(o.estado==="fugir"){a=4.2;let c=Math.atan2(o.dx,o.dz);if(o.ang=Ve(o.ang,c,8*e),!Jn(o,Math.sin(o.ang)*a*e,Math.cos(o.ang)*a*e)){let h=o.id&1?1.4:-1.4;o.dx=Math.sin(o.ang+h),o.dz=Math.cos(o.ang+h)}}else if(o.estado==="seguir"){let c=o.lider;if(c&&c.dentro&&(c=o.lider=c.dentro),!c||!c.vivo)o.estado="vagar",o.lider=null;else if(c.predio){let h=c.predio;if(Ot(o.x,o.z,h.cx,h.cz)<h.raio+10){h.civis++,o.vivo=!1;continue}let u=Math.atan2(h.cx-o.x,h.cz-o.z);o.ang=Ve(o.ang,u,8*e),a=3.5,Jn(o,Math.sin(o.ang)*a*e,Math.cos(o.ang)*a*e)}else{let h=Ot(o.x,o.z,c.x,c.z),l=c.d?c.d.raio:.5,u=c.d&&c.d.carga;if(u&&h<l+6&&(c.classe!=="aereo"||c.pousado)&&x.vagas(c)>=1&&o.espera<=0){x.embarcarCivil(o,c);continue}o.espera>0&&(o.espera-=e);let f=u?l+2:3+o.id%4;if(h>f){let d=Math.atan2(c.x-o.x,c.z-o.z);if(o.ang=Ve(o.ang,d,8*e),a=h>12?4.2:2.2,!Jn(o,Math.sin(o.ang)*a*e,Math.cos(o.ang)*a*e)){let p=o.id&1?1.2:-1.2;Jn(o,Math.sin(o.ang+p)*a*e,Math.cos(o.ang+p)*a*e)}}h>160&&(o.estado="vagar",o.lider=null)}}else if(o.estado==="acampar"&&o.campo){let c=o.campo,h=Ot(o.x,o.z,o.posto.x,o.posto.z);if(h>1.5){let l=Math.atan2(o.posto.x-o.x,o.posto.z-o.z);if(o.ang=Ve(o.ang,l,8*e),a=h>30?4:1.6,!Jn(o,Math.sin(o.ang)*a*e,Math.cos(o.ang)*a*e)){let u=o.id&1?1.3:-1.3;Jn(o,Math.sin(o.ang+u)*a*e,Math.cos(o.ang+u)*a*e)}}else(!o.mirando||o.mirando<=0)&&(o.ang=Ve(o.ang,Math.atan2(o.x-c.x,o.z-c.z),2*e))}else(o.dx||o.dz)&&(a=1.3,o.ang=Ve(o.ang,Math.atan2(o.dx,o.dz),4*e),Jn(o,Math.sin(o.ang)*a*e,Math.cos(o.ang)*a*e)||(o.dx=-o.dx,o.dz=-o.dz));o.vel=a,o.fase+=e*a*2.4,o.armado&&t_(o,e),a===0&&o.acena>0&&(o.acena-=e,o.fase+=e*6),(o.id+x.quadro)%20===0&&x.naZonaSegura(o.x,o.z,0)&&(o.vivo=!1,o.resgatado=!0,x.resgatados++,x.dinheiro+=40,x.resgateAcum=(x.resgateAcum||0)+1)}}x.nZumbis=n,x.nCivis=i}function e_(){let e=x.dia,t=Math.random();return e>=3&&t<.05?"bruto":e>=2&&t<.15||x.tempo>360&&t<.06?"corredor":"comum"}function Q0(e,t){let n=x.agentes;for(let i=0;i<n.length;i++){let s=n[i];if(!s.vivo||s.dentro||!t(s.x,s.z))continue;let r=s.estado==="morto"?3:s.zumbi?1:s.vel===0&&s.acena>0?4:0,o=s.soldado?3:s.armado?s.policial?5:4:0,a=s.armado&&r===0&&s.mirando>0?2:r;e.add(s.x,s.y,s.z,s.ang,s.fase,a,s.camisa,s.calca,s.pele,o,s.esc,s.policial?null:s.cabelo,Math.min(1,s.vel/2.5))}}var n_={fuzil:[1,.9,.5],mg:[1,.8,.4],sniper:[1,1,.8],pistola:[1,.9,.5],"50cal":[1,.7,.3],"25mm":[1,.6,.2],"30mm":[1,.6,.2],m134:[1,.45,.2],m240:[1,.7,.3]},i_={fuzil:110,pistola:70,mg:140,sniper:160,"50cal":200,"25mm":260,"30mm":260,m134:220,m240:160,"120mm":450,"155mm":500,naval:500,foguete:450,hellfire:450,bomba:600};function af(e){return e.classe==="naval"?e.d.nav:0}function Ze(e,t,n,i=0,s={}){var a;let r=Zn[e],o={id:x.idSeq++,tipo:e,d:r,classe:r.classe,x:t,z:n,y:0,ang:i,hp:r.hp,hpMax:r.hp,caminho:null,wp:0,destino:null,ordem:null,alvo:null,cd:ht(0,.5),cd2:ht(0,1),busca:ht(0,.4),passageiros:[],cargaUsada:0,dentro:null,predio:null,vivo:!0,sel:!1,fase:ht(0,6),mirando:0,alt:0,altAlvo:0,torreAng:0,travado:0,salva:r.salva||0,recarga:0,municao:r.municao||0,estadoJato:"pronto",vx:0,vz:0,velAtual:0,repath:0,ultimaPos:{x:t,z:n},cura:0};return r.modelo&&(o.m=Ws(r.modelo),x.cena.add(o.m.grupo)),o.classe==="aereo"&&(o.alt=(a=s.alt)!=null?a:0,o.altAlvo=o.alt),o.classe==="jato"&&(o.estadoJato="pronto",o.alt=9.5),x.unidades.push(o),hp(o,0),o}function Kr(e){e.vivo=!1,e.sombra&&(x.cena.remove(e.sombra),e.sombra=null),e.corda&&(x.cena.remove(e.corda),e.corda=null),e.m&&x.cena.remove(e.m.grupo),e.anel&&(x.cena.remove(e.anel),e.anel=null);let t=x.selecao.indexOf(e);t>=0&&x.selecao.splice(t,1)}function _n(e,t){let n=x.porta;if(n&&n.vivo&&n.tipo==="portaavioes"){let s=e-n.x,r=t-n.z,o=Math.cos(-n.ang),a=Math.sin(-n.ang),c=s*o+r*a,h=-s*a+r*o;if(Math.abs(c)<34&&Math.abs(h)<158)return 9.2}let i=$n(e,t);return i>=0&&Te[i]>=0?Ie[Te[i]].h:0}function Ks(e,t,n=0){for(let s of x.abrigos||[]){if(!s.vivo||s.construindo>0)continue;let r=s.tipoEstr==="zona"?170:s.tipoEstr==="fob"?110:120;if($e(e,t,s.x,s.z)<r*r)return!0}let i=x.porta;return!!(i&&i.vivo&&(n>7||i.aerodromo)&&$e(e,t,i.x,i.z)<170*170)}function Ln(e,t){if(!x.camAlvo)return 0;let n=Math.hypot(e-x.camAlvo.x,t-x.camAlvo.z)+x.camDist*.6;return rn(1-n/1400,0,1)}function Fc(e,t,n){x.ruidos.push({x:e,z:t,r:n*(x.noite?1.2:1),t:x.tempo})}function Mi(e,t){for(let n of e)!n.vivo||n.estr||n.dentro||(n.ordem=Object.assign({},t),n.alvo=null,n.caminho=null,n.repath=0,n.predio&&(t.tipo==="mover"||t.tipo==="embarcar"||t.tipo==="guarnecer")&&Go(n))}function Si(e,t,n){let i=e.filter(c=>c.vivo&&!c.dentro&&!c.estr);if(!i.length)return;let s=i.filter(c=>c.classe==="jato");for(let c of s)tp(c,t,n);let r=i.filter(c=>c.classe!=="jato"),o=r.length,a=Math.ceil(Math.sqrt(o));r.sort((c,h)=>$e(c.x,c.z,t,n)-$e(h.x,h.z,t,n)),r.forEach((c,h)=>{let l=Math.max(4,c.d.raio*2.6),u=(h%a-(a-1)/2)*l,f=(Math.floor(h/a)-(a-1)/2)*l,d=t+u,p=n+f;c.predio&&Go(c),c.ordem={tipo:"mover",x:d,z:p},c.alvo=null,c.caminho=null,c.repath=0,c.classe==="aereo"&&(c.altAlvo=c.d.altCruz,c.pousado=!1)})}function tp(e,t,n){var i;if(e.estadoJato==="rearmando"){Wt(`${e.d.nome} est\xE1 sendo rearmado`,e.x,e.z);return}if(e.estadoJato==="pousando"){Wt(`${e.d.nome} est\xE1 pousando`,e.x,e.z);return}if(e.ordem={tipo:"ataque",x:t,z:n},e.estadoJato==="pronto"){let s=ff(e),r=cp(s),o=Dc(s,r.dx,r.d0);e.x=o.x,e.z=o.z,e.y=((i=s.deck)!=null?i:9.2)+.2,e.ang=s.ang,e.velAtual=df(s)?15:0,e.estadoJato="decolando",e.lancou=!1,e.saidaPt=null,e.m&&(e.m.grupo.visible=!0)}else e.estadoJato!=="decolando"&&(e.estadoJato="voando");e.passe=0}function ep(e,t,n,i,s,r){e.forEach((o,a)=>{if(o.estadoJato==="rearmando"||o.estadoJato==="pousando"){Wt(`${o.d.nome} est\xE1 pousando/rearmando`,o.x,o.z);return}tp(o,(t+i)/2,(n+s)/2);let c=a%2===1;o.ordem={tipo:"area",ax:c?i:t,az:c?s:n,bx:c?t:i,bz:c?n:s,w:r,fase:"aprox",soltas:0,deslocamento:(a-(e.length-1)/2)*Math.min(25,r/3)}})}function s_(e,t,n){let i=e.d,s=t.bx-t.ax,r=t.bz-t.az,o=Math.max(1,Math.hypot(s,r)),a=s/o,c=r/o,h=-c*t.deslocamento,l=a*t.deslocamento,u,f,d=i.arma==="canhao"?45:i.arma==="bomba"?130:80;if(t.fase==="aprox")u=t.ax-a*900+h,f=t.az-c*900+l,d=i.altCruz,Ot(e.x,e.z,u,f)<220&&(t.fase="alinhar");else if(t.fase==="alinhar")u=t.ax+h,f=t.az+l,(Ot(e.x,e.z,u,f)<120||(e.x-t.ax)*a+(e.z-t.az)*c>-30)&&(t.fase="corrida",t.soltas=0);else{u=t.bx+a*500+h,f=t.bz+c*500+l;let p=(e.x-t.ax)*a+(e.z-t.az)*c,v=i.arma==="canhao"?40:i.arma==="bomba"?i.bombas?8:6:10,m=o/v,g=i.arma==="canhao"?170:i.arma==="bomba"?e.velAtual*.6*Math.sqrt(2*e.y/9.8)*.5:120;for(;t.soltas<v&&p+g>=t.soltas*m+m/2;){let _=Math.min(o,t.soltas*m+m/2),y=ht(-t.w/2,t.w/2),b=t.ax+a*_-c*y+h*.3,R=t.az+c*_+a*y+l*.3;i.arma==="canhao"?(x.efeitos.tracante(e.x+Math.sin(e.ang)*9,e.y-.4,e.z+Math.cos(e.ang)*9,b,.5,R,[1,.55,.2]),kc(b,.3,R,i.splash,i.dano,e,!0),t.soltas===0&&bi("gau8",Ln(e.x,e.z))):i.arma==="bomba"?Vo(e.x,e.y,e.z,b,R,{arma:"bomba",dano:i.dano,splash:i.splash,precisao:1},e):Vo(e.x,e.y-1,e.z,b,R,{arma:"foguete",dano:i.dano,splash:i.splash,precisao:1,missil:!0},e),t.soltas++,t.soltas===1&&Fc(t.ax,t.az,700),i.arma!=="canhao"&&bi(i.arma==="bomba"?"bomba":"foguete",Ln(e.x,e.z))}if(p>o+450)if(e.municao--,e.municao<=0)e.estadoJato="voltando",e.ordem=null,Wt(`${i.nome} lan\xE7ou toda a carga, voltando ao porta-avi\xF5es`,e.x,e.z);else{let _=t.ax,y=t.az;t.ax=t.bx,t.az=t.bz,t.bx=_,t.bz=y,t.fase="aprox",t.deslocamento=-t.deslocamento}}return{tx:u,tz:f,alt:d}}function Ho(e,t,n){let i=t-e.cx,s=n-e.cz,r=Math.hypot(i,s)||1;for(let o=e.raio*.5;o<e.raio+60;o+=Pe*.7)for(let a of[0,.4,-.4,.8,-.8,1.4,-1.4,2.2,-2.2,3.1]){let c=Math.atan2(i/r,s/r)+a,h=e.cx+Math.sin(c)*o,l=e.cz+Math.cos(c)*o;if(He(h,l))return{x:h,z:l}}return{x:e.cx,z:e.cz}}function r_(e,t){let n=Math.max(4,e.cap),i=t/n*Math.PI*2+.3;for(let s=.7;s>.05;s-=.15){let r=e.cx+Math.sin(i)*e.raio*s,o=e.cz+Math.cos(i)*e.raio*s;if(oi(e,r,o))return{x:r,z:o}}return{x:e.cx+ht(-1,1),z:e.cz+ht(-1,1)}}function o_(e,t){let n=e.pts.length/2,i=Math.max(1,Math.floor((e.h-3)/3.4));for(let s=0;s<12;s++){let r=(t*5+s*3+e.id)%n,o=(r+1)%n,a=e.pts[r*2],c=e.pts[r*2+1],h=e.pts[o*2],l=e.pts[o*2+1],u=h-a,f=l-c,d=Math.hypot(u,f);if(d<4)continue;let p=.2+(t*.37+s*.21)%.6,v=-f/d,m=u/d,g=1+(t+s)%Math.min(i,6),_=Math.min(e.h-2.6,g*3.4+.2),y=a+u*p+v*.28,b=c+f*p+m*.28;if(!a_(y+v*3,b+m*3))return{x:y,z:b,y:_,nx:v,nz:m}}return null}function a_(e,t){let n=$n(e,t);return n>=0&&Te[n]>=0}function np(e,t){if(t.guarnicao.length>=t.cap)return Wt(`Pr\xE9dio cheio (${t.cap} soldados)`,t.cx,t.cz),!1;t.guarnicao.push(e),e.predio=t;let n=t.guarnicao.length-1,i=t.h>6&&n%2===0?o_(t,n):null;if(i)e.x=i.x,e.z=i.z,e.y=i.y,e.janela={nx:i.nx,nz:i.nz,ang:Math.atan2(i.nx,i.nz),quebrou:!1},e.ang=e.janela.ang;else{let s=r_(t,n);e.x=s.x,e.z=s.z,e.y=t.h,e.janela=null}return e.ordem=null,e.caminho=null,t.integridade<=0&&(t.integridade=30),t.sos&&t.civis>0&&ip(t,e),!0}function Go(e){let t=e.predio;if(!t)return;t.guarnicao=t.guarnicao.filter(i=>i!==e);let n=Ho(t,e.x+ht(-5,5),e.z+ht(-5,5));e.x=n.x+ht(-2,2),e.z=n.z+ht(-2,2),e.y=0,He(e.x,e.z)||(e.x=n.x,e.z=n.z),e.predio=null,e.janela=null}function ip(e,t){if(!e.civis)return;let n=Ho(e,t.x,t.z),i=e.civis;for(let s=0;s<i;s++)of(n.x+ht(-3,3),n.z+ht(-3,3),t);e.civis=0,e.sos=!1,Wt(`${i} civis sa\xEDram do pr\xE9dio e est\xE3o seguindo suas tropas!`,e.cx,e.cz,"bom"),Kt("resgate")}function c_(e){return e.classe==="inf"?"inf":e.classe==="veic"?e.d.leve?"leve":"veic":null}function Oc(e,t){if(!e.d.carga||e===t)return!1;let n=c_(t);if(!n)return!1;let i=e.d.cargaTipos;return i.includes(n)||n==="leve"&&i.includes("veic")?e.cargaUsada+(t.d.slots||1)<=e.d.carga:!1}function Qr(e){return(e.d.carga||0)-e.cargaUsada}function l_(e){return e.classe==="aereo"?e.pousado:!0}function cf(e,t){if(!Oc(t,e))return!1;e.dentro=t,t.passageiros.push(e),t.cargaUsada+=e.d.slots||1,e.predio&&Go(e),e.m&&(e.m.grupo.visible=!1),e.anel&&(x.cena.remove(e.anel),e.anel=null);let n=x.selecao.indexOf(e);return n>=0&&(x.selecao.splice(n,1),e.sel=!1),e.ordem=null,e.caminho=null,!0}function lf(e,t){return Qr(t)<1?!1:(e.dentro=t,t.passageiros.push(e),t.cargaUsada+=1,!0)}function Vi(e){if(!e.passageiros.length)return;if(e.classe==="aereo"&&!e.pousado){e.ordem={tipo:"pousar",desembarcar:!0};return}let t=Ks(e.x,e.z,e.y),n=0;for(let i of e.passageiros.slice()){if(i.agente&&t)continue;let s=e.x,r=e.z;for(let o=0;o<30;o++){let a=n*.9+o*.5,c=e.d.raio+2+o*.8+n%4,h=e.x+Math.sin(a)*c,l=e.z+Math.cos(a)*c;if(He(h,l)){s=h,r=l;break}}n++,e.passageiros.splice(e.passageiros.indexOf(i),1),e.cargaUsada-=i.agente?1:i.d.slots||1,i.dentro=null,i.x=s,i.z=r,i.y=0,i.agente?(i.estado="seguir",i.lider=e,i.espera=6):i.m&&(i.m.grupo.visible=!0)}t&&Nc(e)}function Nc(e){let t=0;for(let n of e.passageiros.slice())n.agente&&(e.passageiros.splice(e.passageiros.indexOf(n),1),e.cargaUsada-=1,n.vivo=!1,n.resgatado=!0,n.dentro=null,t++);t&&(x.resgatados+=t,x.dinheiro+=t*40,Wt(`\u2705 ${t} civis resgatados! (+$${t*40})`,e.x,e.z,"bom"),Kt("resgate"))}function js(e){return e&&e.vivo&&e.zumbi&&!e.dentro&&e.virando<=0}function Bc(e,t,n,i=0){let s=e.x,r=e.z;if(!n){let l=null,u=1/0,f=i*i,d=e.janela;return x.hashA.busca(s,r,t,(p,v)=>{if(p.zumbi&&p.vivo&&!p.dentro&&p.virando<=0&&v<u&&v>=f){if(d&&(p.x-s)*d.nx+(p.z-r)*d.nz<Math.sqrt(v)*.25)return;u=v,l=p}}),l}let o=[],a=i*i;if(x.hashA.busca(s,r,t,(l,u)=>{if(l.zumbi&&l.vivo&&!l.dentro&&u>=a&&(o.push(l),o.length>50))return!0}),!o.length)return null;let c=null,h=0;for(let l=0;l<o.length;l+=o.length>25?2:1){let u=o[l],f=0,d=0;x.hashA.busca(u.x,u.z,n,m=>{!m.vivo||m.dentro||(m.zumbi?f++:d++)});let p=0;if(x.hashU.busca(u.x,u.z,n+4,m=>{m.vivo&&!m.dentro&&m.classe!=="aereo"&&m.classe!=="jato"&&p++}),p>0)continue;let v=f-d*3;v>h&&(h=v,c=u)}return c}function h_(e){if(e.m&&e.m.def.canoZ!==void 0&&e.m.torre){let t=e.ang+e.torreAng,n=e.m.def,i=n.torreZ,s=n.canoZ;return{x:e.x+Math.sin(e.ang)*i+Math.sin(t)*s,y:e.y+n.torreY+n.canoY,z:e.z+Math.cos(e.ang)*i+Math.cos(t)*s}}return e.m&&e.m.def.armaZ?{x:e.x+Math.sin(e.ang)*e.m.def.armaZ,y:e.y+e.m.def.armaY,z:e.z+Math.cos(e.ang)*e.m.def.armaZ}:e.classe==="aereo"?{x:e.x+Math.sin(e.ang)*2,y:e.y+1.5,z:e.z+Math.cos(e.ang)*2}:{x:e.x+Math.sin(e.ang)*.7,y:e.y+1.25,z:e.z+Math.cos(e.ang)*.7}}function Uc(e,t,n){let i=h_(e),s=t.x,r=t.z,o=(t.y||0)+1.1,a=Math.hypot(s-e.x,r-e.z),c=x.efeitos,h=Ln(e.x,e.z);if(Fc(e.x,e.z,i_[n.arma]||150),e.janela&&!e.janela.quebrou){e.janela.quebrou=!0;for(let d=0;d<14;d++)c.particula(e.x,e.y+1.3,e.z,e.janela.nx*ht(1,3)+ht(-1,1),ht(0,2),e.janela.nz*ht(1,3)+ht(-1,1),.18,1.2,[.8,.92,1],[.6,.75,.85],.9,9.8,0);Y0(h)}if(n.missil||n.arma==="120mm"||n.arco||n.arma==="foguete"){let d=s+ht(-1,1)*(1-n.precisao)*12,p=r+ht(-1,1)*(1-n.precisao)*12;Vo(i.x,i.y,i.z,d,p,n,e),c.clarao(i.x,i.y,i.z,n.arma==="120mm"?4:2.5);for(let v=0;v<4;v++)c.fumaca(i.x,i.y,i.z,2.5);bi(n.arma,h);return}let l=n.precisao*(1-a/(n.alcance*1.3)*.4)*(x.noite?.85:1),u=Math.random()<l,f=n_[n.arma]||[1,.85,.4];c.clarao(i.x,i.y,i.z,n.arma==="fuzil"||n.arma==="pistola"?.9:1.5),u?(c.tracante(i.x,i.y,i.z,s,o,r,f),n.splash?kc(s,.5,r,n.splash,n.dano,e,!0):jr(t,n.dano,e)):c.tracante(i.x,i.y,i.z,s+ht(-3,3),o+ht(-1,1),r+ht(-3,3),f),bi(n.arma,h)}function Vo(e,t,n,i,s,r,o){let a=Math.hypot(i-e,s-n),c=r.arma==="120mm"?900:r.arco?260:r.arma==="bomba"?0:r.missil?140:200,h={x0:e,y0:t,z0:n,tx:i,tz:s,t:0,x:e,y:t,z:n,dur:r.arma==="bomba"?Math.sqrt(2*Math.max(5,t)/9.8):Math.max(.12,a/c),arco:r.arco?Math.min(400,a*.35):r.missil?Math.min(60,a*.12):r.arma==="foguete"?a*.08:0,dano:r.dano,raio:r.splash||3,arma:r.arma,dono:o,rastro:r.arma!=="120mm",vx:o&&o.classe==="jato"?Math.sin(o.ang)*o.velAtual*.6:0,vz:o&&o.classe==="jato"?Math.cos(o.ang)*o.velAtual*.6:0};r.arma==="bomba"&&(h.tx=e+h.vx*h.dur,h.tz=n+h.vz*h.dur,h.tx=i,h.tz=s),x.projeteis.push(h)}function sp(e){let t=x.efeitos;for(let n=x.projeteis.length-1;n>=0;n--){let i=x.projeteis[n];i.t+=e;let s=Math.min(1,i.t/i.dur),r=i.x,o=i.y,a=i.z;i.x=i.x0+(i.tx-i.x0)*s,i.z=i.z0+(i.tz-i.z0)*s,i.arma==="bomba"?i.y=i.y0*(1-s*s):i.y=i.y0+(.5-i.y0)*s+Math.sin(s*Math.PI)*i.arco,i.rastro&&t.esteira(r,o,a),t.particula(i.x,i.y,i.z,0,0,0,i.arma==="naval"||i.arma==="155mm"?1.2:.9,.05,[1,.9,.6],[1,.6,.2],1),s>=1&&(kc(i.x,.5,i.z,i.raio,i.dano,i.dono,!1),x.projeteis.splice(n,1))}}function kc(e,t,n,i,s,r,o){let a=Fs(e,n)&&_n(e,n)===0;!o||i>2?x.efeitos.explosao(e,t,n,i*.8,a):x.efeitos.particula(e,t,n,0,2,0,i,.3,[1,.8,.3],[.4,.4,.4],1,0,i),i>=6&&Cc(Ln(e,n),i>=15),Fc(e,n,i>=6?500:200);let c=i*i;x.hashA.busca(e,n,i*1.3,(h,l)=>{if(!h.vivo||h.dentro)return;let u=l<c?1-Math.sqrt(l)/i*.6:.25;jr(h,s*u,r)}),x.tremor!==void 0&&i>=10&&(x.tremor=Math.max(x.tremor,Math.min(1,i/30)*Ln(e,n)))}function rp(e){for(let t=x.unidades.length-1;t>=0;t--){let n=x.unidades[t];if(!n.vivo){x.unidades.splice(t,1);continue}if(n.estr){y_(n,e);continue}if(n.dentro){n.x=n.dentro.x,n.z=n.dentro.z,n.y=n.dentro.y,n.dentro.d.cura&&n.hp<n.hpMax&&(n.hp=Math.min(n.hpMax,n.hp+n.dentro.d.cura*e));continue}switch(n.fase+=e*(n.velAtual>.3?n.velAtual*1.6:0),n.mirando>0&&(n.mirando-=e),n.classe){case"inf":f_(n,e);break;case"veic":d_(n,e);break;case"naval":p_(n,e);break;case"aereo":m_(n,e);break;case"jato":g_(n,e);break}n.classe!=="jato"&&x_(n,e),n.d.carga&&v_(n,e),hp(n,e)}}function hf(e,t){let n=e.ordem;if(!n)return null;if(n.tipo==="mover")return{x:n.x,z:n.z,fim:()=>{e.ordem=null}};if(n.tipo==="atacar"){if(!js(n.alvo))return e.ordem=null,null;e.alvo=n.alvo;let i=(e.d.alcance||50)*.85;return Ot(e.x,e.z,n.alvo.x,n.alvo.z)<i?null:{x:n.alvo.x,z:n.alvo.z,dinamico:!0}}if(n.tipo==="guarnecer"){let i=n.predio;return n.e||(n.e=Ho(i,e.x,e.z)),Ot(e.x,e.z,n.e.x,n.e.z)<7?(np(e,i),null):{x:n.e.x,z:n.e.z}}if(n.tipo==="resgatar"){let i=n.predio;return!i.sos||i.civis<=0?(e.ordem=null,null):(n.e||(n.e=Ho(i,e.x,e.z)),Ot(e.x,e.z,n.e.x,n.e.z)<9||Ot(e.x,e.z,i.cx,i.cz)<i.raio+12?(ip(i,e),e.ordem=null,null):{x:n.e.x,z:n.e.z})}if(n.tipo==="embarcar"){let i=n.t;return!i.vivo||!Oc(i,e)?(e.ordem=null,null):Ot(e.x,e.z,i.x,i.z)<i.d.raio+6?l_(i)?(cf(e,i),null):(i.classe==="aereo"&&(!i.ordem||i.ordem.tipo!=="pousar")&&(i.ordem={tipo:"pousar"}),null):{x:i.x,z:i.z,dinamico:!0}}return null}function uf(e,t,n,i,s){if(!n){e.velAtual=0;return}let r=Math.max(2.5,e.d.raio*1.5);if(Ot(e.x,e.z,n.x,n.z)<r){e.velAtual=0,e.caminho=null,n.fim&&n.fim();return}if(e.repath-=t,(!e.caminho||n.dinamico||e.caminhoAlvo&&Ot(e.caminhoAlvo.x,e.caminhoAlvo.z,n.x,n.z)>15)&&e.repath<=0)if(x.orcamentoCaminhos<=0){if(e.caminho||(e.velAtual=0),!e.caminho)return}else{let f=x.cacheCam||(x.cacheCam=[]),d=null;for(let p of f)if(p.modo===s&&x.tempo-p.t<4&&Ot(p.sx,p.sz,e.x,e.z)<45&&Ot(p.ex,p.ez,n.x,n.z)<45){d=p;break}if(d?e.caminho=d.pts.slice(0,-1).concat([{x:n.x,z:n.z}]):(x.orcamentoCaminhos--,e.caminho=Qu(s,e.x,e.z,n.x,n.z,x.limiteCaminho||4e4),e.caminho&&!e.caminho.parcial&&(f.push({modo:s,sx:e.x,sz:e.z,ex:n.x,ez:n.z,pts:e.caminho,t:x.tempo}),f.length>20&&f.shift())),e.caminhoAlvo={x:n.x,z:n.z},e.wp=0,e.repath=2.5,!e.caminho){e.ordem=null,e.velAtual=0;return}}if(!e.caminho){e.velAtual=0;return}let o=e.caminho[e.wp];if(!o){let f=e.caminho&&e.caminho.parcial;e.caminho=null,e.velAtual=0,n.fim&&!f?n.fim():e.repath=f?0:1.2;return}let a=e.wp===e.caminho.length-1;if(Ot(e.x,e.z,o.x,o.z)<(a?r:Math.max(4,e.d.raio*2))&&(e.wp++,o=e.caminho[e.wp],!o)){let f=e.caminho&&e.caminho.parcial;e.caminho=null,e.velAtual=0,n.fim&&!f?n.fim():e.repath=f?0:1.2;return}let c=Math.atan2(o.x-e.x,o.z-e.z),h=e.classe==="inf"?10:e.classe==="naval"?e.d.raio>20?.25:.9:2.2;e.ang=Ve(e.ang,c,h*t);let l=Math.max(.15,Math.cos(ki(e.ang,c))),u=i*l;e.velAtual=u,op(e,Math.sin(e.ang)*u*t,Math.cos(e.ang)*u*t,s)}function ko(e,t,n,i){return i===0?He(t,n):i===3?He(t,n)||Xr(1,t,n):Xr(i,t,n)}function op(e,t,n,i){let s=e.x+t,r=e.z+n;if(ko(e,s,r,i))e.x=s,e.z=r;else if(Math.abs(t)>Math.hypot(t,n)*.25&&ko(e,e.x+t,e.z,i))e.x+=t;else if(Math.abs(n)>Math.hypot(t,n)*.25&&ko(e,e.x,e.z+n,i))e.z+=n;else{let o=!1;for(let a of[.6,-.6,1.2,-1.2]){let c=Math.cos(a),h=Math.sin(a),l=t*c-n*h,u=t*h+n*c;if(ko(e,e.x+l,e.z+u,i)){e.x+=l,e.z+=u,o=!0;break}}o||(e.travado+=.1,e.travado>1.5&&(i===0||i===3)&&(e.x=s,e.z=r))}e.checa=(e.checa||0)+.016,e.checa>1.2&&(e.checa=0,Ot(e.x,e.z,e.ultimaPos.x,e.ultimaPos.z)<1&&e.velAtual>.5?(e.caminho=null,e.repath=0,e.travado++):e.travado=0,e.travado>4&&(e.ordem=null,e.caminho=null,e.travado=0),e.ultimaPos.x=e.x,e.ultimaPos.z=e.z)}function ap(e,t){x.hashU.busca(e.x,e.z,e.d.raio*2+1,(n,i)=>{if(n===e||!n.vivo||n.dentro||n.predio||n.classe!==e.classe||n.estr)return;let s=e.d.raio+n.d.raio;if(i<s*s&&i>1e-4){let r=Math.sqrt(i),o=(s-r)/r*.5*Math.min(1,t*8),a=(e.x-n.x)*o,c=(e.z-n.z)*o;ko(e,e.x+a,e.z+c,af(e))&&(e.x+=a,e.z+=c)}})}function u_(e,t,n){e.passageiros.splice(e.passageiros.indexOf(t),1),e.cargaUsada-=t.d.slots||1,t.dentro=null;let i=Math.cos(e.ang),s=-Math.sin(e.ang);t.x=e.x+i*n*1.3+Math.sin(e.ang)*1.2,t.z=e.z+s*n*1.3+Math.cos(e.ang)*1.2,t.y=e.y+1.2,t.ang=e.ang+n*Math.PI/2,t.rapel={chao:_n(t.x,t.z)},t.ordem=null,t.caminho=null,t.velAtual=0}function f_(e,t){if(e.rapel){if(e.y-=7.5*t,e.velAtual=0,e.fase+=t*4,e.y<=e.rapel.chao+.05){let i=e.rapel.chao;if(e.y=i,e.rapel=null,i>1){let s=$n(e.x,e.z),r=s>=0&&Te[s]>=0?Ie[Te[s]]:null;if(r&&!np(e,r)){let o=Ho(r,e.x,e.z);e.x=o.x,e.z=o.z,e.y=0}else r||(e.y=0)}x.efeitos.poeira(e.x,e.z,2)}return}if(x.controlando===e){Hc(e,t);return}if(e.predio){e.velAtual=0;return}let n=hf(e,t);uf(e,t,n,e.d.vel*(x.noite?.95:1),0),ap(e,t),e.d.cura&&(e.cura-=t,e.cura<=0&&(e.cura=1,x.hashU.busca(e.x,e.z,14,i=>{i.vivo&&i.classe==="inf"&&!i.dentro&&i.hp<i.hpMax&&(i.hp=Math.min(i.hpMax,i.hp+e.d.cura))})))}function d_(e,t){if(x.controlando===e)Hc(e,t);else{let n=hf(e,t);uf(e,t,n,e.d.vel,0)}ap(e,t),e.velAtual>3&&(Math.random()<t*4&&x.efeitos.poeira(e.x-Math.sin(e.ang)*e.d.raio,e.z-Math.cos(e.ang)*e.d.raio,1),e.d.raio>=3.4&&(e.tEsm=(e.tEsm||0)-t,e.tEsm<=0&&(e.tEsm=.25,zu(e.x,e.z,e.d.raio+.8)&&(nf(Ln(e.x,e.z)),x.efeitos.poeira(e.x,e.z,4)))),e.d.atropela&&x.hashA.busca(e.x,e.z,e.d.raio+.6,n=>{n.vivo&&n.zumbi&&!n.dentro&&jr(n,(n.sub==="bruto"?40:200)*t*e.velAtual/8,e)}))}function p_(e,t){if(x.controlando===e)Hc(e,t);else{let n=hf(e,t);uf(e,t,n,e.d.vel,af(e))}if(e.velAtual>2&&Math.random()<t*6){let n=e.d.raio*1.2;x.efeitos.particula(e.x-Math.sin(e.ang)*n+ht(-2,2),.4,e.z-Math.cos(e.ang)*n+ht(-2,2),0,.5,0,e.d.raio*.25,2.5,[.95,.97,1],[.7,.8,.9],.5,0,e.d.raio*.15)}e.y=e.tipo==="lcac"?.4:0,e.tipo==="lcac"&&Math.random()<t*5&&x.efeitos.particula(e.x+ht(-8,8),.5,e.z+ht(-8,8),0,1,0,3,1,[.9,.9,.95],[.8,.8,.8],.35,0,3)}function m_(e,t){let n=e.d,i=e.ordem,s=null;if(x.controlando===e)Hc(e,t);else if(i)if(i.tipo==="pousar"){let o=_n(e.x,e.z);if(Fs(e.x,e.z)&&o===0){let c=yn(0,e.x,e.z);c?e.ordem={tipo:"mover",x:c.x,z:c.z,pousar:!0,desembarcar:i.desembarcar}:e.ordem=null}else e.altAlvo=o,e.y<=o+.3&&(e.pousado=!0,i.desembarcar?(e.ordem=null,Vi(e)):e.ordem=null,Ks(e.x,e.z,e.y)&&Nc(e))}else if(i.tipo==="mover")s={x:i.x,z:i.z},Ot(e.x,e.z,i.x,i.z)<3&&(i.pousar?e.ordem={tipo:"pousar",desembarcar:i.desembarcar}:e.ordem=null,n.orbita&&(e.orbita={x:i.x,z:i.z}));else if(i.tipo==="resgatar"){let o=i.predio;if(s={x:o.cx,z:o.cz},Ot(e.x,e.z,o.cx,o.cz)<Math.max(4,o.raio*.5)){if(e.altAlvo=o.h+6,s=null,e.y<o.h+9){if(n.carga&&o.civis>0){let a=0;for(;o.civis>0&&Qr(e)>=1;){let c=of(o.cx,o.cz,e);lf(c,e),o.civis--,a++}a&&(Wt(`\u{1F681} ${a} civis embarcaram pelo telhado!`,o.cx,o.cz,"bom"),Kt("resgate")),o.civis<=0?o.sos=!1:Wt(`Helic\xF3ptero cheio! Ainda h\xE1 ${o.civis} civis no telhado`,o.cx,o.cz)}e.ordem=null,e.altAlvo=n.altCruz}}else e.altAlvo=Math.max(n.altCruz,o.h+15)}else if(i.tipo==="atacar")js(i.alvo)?(e.alvo=i.alvo,Ot(e.x,e.z,i.alvo.x,i.alvo.z)>n.alcance*.7&&(s={x:i.alvo.x,z:i.alvo.z})):e.ordem=null;else if(i.tipo==="corda")if(!i.pairando&&Ot(e.x,e.z,i.x,i.z)>4)s={x:i.x,z:i.z},e.altAlvo=Math.max(n.altCruz,_n(i.x,i.z)+22);else{i.pairando=!0,e.velAtual*=Math.max(0,1-t*6);let o=Math.min(1,t*1.5);if(e.x+=(i.x-e.x)*o,e.z+=(i.z-e.z)*o,e.altAlvo=Math.max(_n(e.x,e.z),_n(e.x+Math.cos(e.ang)*1.3,e.z-Math.sin(e.ang)*1.3),_n(e.x-Math.cos(e.ang)*1.3,e.z+Math.sin(e.ang)*1.3))+14,Math.abs(e.y-e.altAlvo)<1.5&&e.velAtual<3&&Ot(e.x,e.z,i.x,i.z)<3&&(i.t=(i.t||0)-t,i.t<=0)){i.t=.75;let a=e.passageiros.find(c=>!c.agente);a?(i.lado=-(i.lado||1),u_(e,a,i.lado)):(e.ordem=null,e.altAlvo=n.altCruz,Wt("\u{1FAA2} Todos os soldados desceram de corda",e.x,e.z,"bom"))}}else if(i.tipo==="pousarPorta"){let o=x.porta;s={x:o.x+Math.sin(o.ang)*i.k,z:o.z+Math.cos(o.ang)*i.k},Ot(e.x,e.z,s.x,s.z)<4&&(e.ordem={tipo:"pousar",desembarcar:!1},s=null)}else i.tipo==="embarcar"&&(e.ordem=null);if(n.orbita&&!s&&e.orbita&&!(i&&i.tipo==="pousar")&&(e.orbAng=(e.orbAng||0)+t*n.vel/n.orbita,s={x:e.orbita.x+Math.sin(e.orbAng)*n.orbita,z:e.orbita.z+Math.cos(e.orbAng)*n.orbita}),s){e.pousado&&(e.pousado=!1),e.altAlvo<n.altCruz*.6&&!(i&&i.tipo==="resgatar")&&(e.altAlvo=n.altCruz);let o=e.y<Math.min(e.altAlvo,_n(e.x,e.z)+12)-1,a=Math.atan2(s.x-e.x,s.z-e.z);e.ang=Ve(e.ang,a,(n.orbita?.8:2)*t);let c=Ot(e.x,e.z,s.x,s.z),h=(o?n.vel*.15:n.vel)*Math.min(1,c/40+.15)*Math.max(.2,Math.cos(ki(e.ang,a)));e.velAtual+=(h-e.velAtual)*Math.min(1,t*1.5),e.x+=Math.sin(e.ang)*e.velAtual*t,e.z+=Math.cos(e.ang)*e.velAtual*t}else x.controlando!==e&&(e.velAtual*=Math.max(0,1-t*2),e.x+=Math.sin(e.ang)*e.velAtual*t,e.z+=Math.cos(e.ang)*e.velAtual*t);let r=_n(e.x,e.z);if(e.pousado)e.y=r;else{let o=e.altAlvo;(s||i&&i.tipo!=="pousar")&&(o=Math.max(o,r+(i&&i.tipo==="resgatar"&&!s?4:10))),e.y+=rn(o-e.y,-8*t,10*t),e.y<r&&(e.y=r)}e.alt=e.y,x.hashU.busca(e.x,e.z,30,(o,a)=>{if(o===e||o.classe!=="aereo"||!o.vivo||o.dentro)return;let c=(e.d.raio+o.d.raio)*1.1;if(a<c*c&&a>.01&&!e.pousado){let h=Math.sqrt(a),l=(c-h)/h*t*2;e.x+=(e.x-o.x)*l,e.z+=(e.z-o.z)*l}})}function Dc(e,t,n){let i=Math.cos(e.ang),s=Math.sin(e.ang);return{x:e.x+t*i+n*s,z:e.z-t*s+n*i}}function ff(e){let t=e.base;return t&&t.vivo?t:x.porta}function df(e){return e.tipo==="portaavioes"}function cp(e){return df(e)?{dx:6,d0:20,d1:160,td:-110,frear:30,vaga:t=>[-24+t%2*10,40+t*22]}:{dx:0,d0:-140,d1:80,td:-130,frear:11,vaga:t=>[-40+t%2*10,25+t*18]}}function g_(e,t){var g,_;let n=e.d,i=ff(e);if(!i)return;let s=cp(i),r=((g=i.deck)!=null?g:9.2)+.2,o=Math.sin(i.ang),a=Math.cos(i.ang);if(e.vy=0,e.estadoJato==="pronto"||e.estadoJato==="rearmando"){let[y,b]=s.vaga((_=e.vagaConves)!=null?_:0),R=Dc(i,y,b);e.x=R.x,e.z=R.z,e.y=r,e.ang=i.ang+Math.PI*.75,e.velAtual=0,e.banco=0,e.estadoJato==="rearmando"&&(e.rearme-=t,e.rearme<=0&&(e.estadoJato="pronto",e.municao=n.municao,e.hp=e.hpMax,Wt(`${n.nome} rearmado e pronto`,e.x,e.z)));return}if(e.estadoJato==="decolando"){let y=n.vel*.42;e.velAtual=Math.min(y,e.velAtual+(df(i)?28:16)*t),e.ang=i.ang,e.x+=o*e.velAtual*t,e.z+=a*e.velAtual*t,(e.x-i.x)*o+(e.z-i.z)*a>s.d1?(e.y+=14*t,e.vy=14):e.y=r,e.y>r+25&&(e.estadoJato="voando"),Math.random()<t*40&&x.efeitos.particula(e.x-o*9,e.y+.5,e.z-a*9,ht(-2,2),1,ht(-2,2),2,.8,[.85,.85,.85],[.7,.7,.7],.4,0,3);return}if(e.estadoJato==="pousando"){e.velAtual=Math.max(0,e.velAtual-s.frear*t),e.ang=i.ang,e.y=r,e.banco=0,e.x+=o*e.velAtual*t,e.z+=a*e.velAtual*t,e.velAtual<3&&(e.estadoJato="rearmando",e.rearme=18,e.ordem=null);return}let c=e.ordem,h,l,u=n.altCruz,f=n.vel,d=.9;if(e.estadoJato==="aproximando"){let y=Dc(i,s.dx*0,s.td),b=Ot(e.x,e.z,y.x,y.z);h=y.x,l=y.z,u=r+Math.min(90,b*.07),f=Math.max(65,n.vel*.32),d=1.2;let R=(e.x-i.x)*o+(e.z-i.z)*a;if(b<30||R>s.td&&Math.abs((e.x-i.x)*a-(e.z-i.z)*o)<25){e.estadoJato="pousando",e.y=r,x.efeitos.poeira(e.x,e.z,3),nf(Ln(e.x,e.z)*.6);return}b>2500&&(e.estadoJato="voltando")}else if(e.estadoJato==="voltando"||!c){e.estadoJato="voltando";let y=Dc(i,0,s.td-1300);h=y.x,l=y.z,Ot(e.x,e.z,y.x,y.z)<700&&(u=r+100),Ot(e.x,e.z,y.x,y.z)<180&&(e.estadoJato="aproximando")}else if(c.tipo==="area"){let y=s_(e,c,t);h=y.tx,l=y.tz,u=y.alt}else{h=c.x,l=c.z;let y=Ot(e.x,e.z,h,l),b=n.arma==="canhao";e.lancou&&!e.saidaPt&&(e.saidaPt={x:e.x+Math.sin(e.ang)*1400,z:e.z+Math.cos(e.ang)*1400}),y<900&&(u=b?45:n.arma==="bomba"?120:70),b&&(f=n.vel*.85);let R=Math.atan2(h-e.x,l-e.z),w=b||n.arma==="bomba"?330:380;if(y<w&&Math.abs(ki(e.ang,R))<.25&&!e.lancou){let A=Bc({x:h,z:l},160,n.splash);if(!A)e.lancou=!0,e.passe=(e.passe||0)+1,e.passe>=3&&(e.estadoJato="voltando",Wt(`${n.nome}: nenhum alvo no local, voltando`,e.x,e.z));else{if(b)e.rajadaT=1.7,bi("gau8",Ln(e.x,e.z));else if(n.arma==="bomba"){let P=n.bombas||2;for(let S=0;S<P;S++)Vo(e.x,e.y,e.z,A.x+ht(-6,6)+(S-(P-1)/2)*Math.sin(e.ang)*14,A.z+ht(-6,6)+(S-(P-1)/2)*Math.cos(e.ang)*14,{arma:"bomba",dano:n.dano,splash:n.splash,precisao:1},e);bi("bomba",Ln(e.x,e.z))}else{for(let P=0;P<n.rajada;P++){let S=A.x+ht(-12,12),M=A.z+ht(-12,12);Vo(e.x+ht(-1,1),e.y-1,e.z+ht(-1,1),S,M,{arma:"foguete",dano:n.dano,splash:n.splash,precisao:1,missil:!0},e)}bi("foguete",Ln(e.x,e.z))}e.municao--,e.lancou=!0,Fc(h,l,600)}}e.lancou&&e.saidaPt&&(e.municao<=0&&!(e.rajadaT>0)?(e.estadoJato="voltando",e.lancou=!1,e.saidaPt=null,Wt(`${n.nome} sem muni\xE7\xE3o, voltando para a base`,e.x,e.z)):Ot(e.x,e.z,e.saidaPt.x,e.saidaPt.z)<250?(e.lancou=!1,e.saidaPt=null):(h=e.saidaPt.x,l=e.saidaPt.z))}if(e.rajadaT>0)for(e.rajadaT-=t,e.lancou||(e.rajadaT=0),e.cdGau=(e.cdGau||0)-t;e.cdGau<=0;){e.cdGau+=.04;let y=120+ht(-15,15),b=e.x+Math.sin(e.ang)*y+ht(-5,5),R=e.z+Math.cos(e.ang)*y+ht(-5,5);x.efeitos.tracante(e.x+Math.sin(e.ang)*9,e.y-.4,e.z+Math.cos(e.ang)*9,b,.5,R,[1,.55,.2]),kc(b,.3,R,n.splash,n.dano,e,!0)}let p=Math.atan2(h-e.x,l-e.z),v=e.ang;e.ang=Ve(e.ang,p,d*t),e.banco+=(rn(ki(v,e.ang)/t*.9,-1.2,1.2)-(e.banco||0))*Math.min(1,t*4),e.velAtual+=(f-e.velAtual)*Math.min(1,t*.8),e.x+=Math.sin(e.ang)*e.velAtual*t,e.z+=Math.cos(e.ang)*e.velAtual*t,e.vy=rn((u-e.y)*.8,-40,40),e.y+=rn(u-e.y,-40*t,40*t),e.y<_n(e.x,e.z)+15&&e.estadoJato!=="aproximando"&&(e.y=_n(e.x,e.z)+15);let m=x.efeitos;if(Math.random()<t*25&&m.particula(e.x-Math.sin(e.ang)*9,e.y+.9,e.z-Math.cos(e.ang)*9,0,0,0,1.2,.5,[.8,.8,.8],[.6,.6,.6],.22,0,2),Math.abs(e.banco)>.5&&e.velAtual>120){let y=e.m&&e.m.def.pontas||6,b=Math.cos(e.ang),R=Math.sin(e.ang);for(let w of[-1,1]){let A=w*y,P=1.2+w*Math.sin(-e.banco)*y*.3;m.particula(e.x+b*A-R*3,e.y+P,e.z-R*A-b*3,0,0,0,.5,.7,[1,1,1],[.9,.9,.9],.55,0,.4)}}}function Hc(e,t){let n=x.joy||{x:0,z:0},i=Math.hypot(n.x,n.z),s=e.d.vel*(e.classe==="inf"?1.2:1);if(i>.1){let r=Math.atan2(n.x,n.z);e.classe==="aereo"?(e.ang=Ve(e.ang,r,3*t),e.velAtual=s*Math.min(1,i),e.x+=Math.sin(e.ang)*e.velAtual*t,e.z+=Math.cos(e.ang)*e.velAtual*t,e.pousado=!1,e.altAlvo<15&&(e.altAlvo=e.d.altCruz)):(e.ang=Ve(e.ang,r,(e.classe==="inf"?12:2.5)*t),e.velAtual=s*Math.min(1,i)*Math.max(.2,Math.cos(ki(e.ang,r))),op(e,Math.sin(e.ang)*e.velAtual*t,Math.cos(e.ang)*e.velAtual*t,af(e)))}else e.velAtual=0;e.ordem=null,e.caminho=null}function x_(e,t){let n=e.d;if(e.rapel||!n.arma&&!n.sec||e.classe==="inf"&&e.velAtual>.5&&x.controlando!==e||e.classe==="aereo"&&e.pousado)return;e.busca-=t,e.cd-=t,e.cd2-=t,e.recarga>0&&(e.recarga-=t,e.recarga<=0&&(e.salva=n.salva));let i=e.predio?1.3:1;e.busca<=0&&(e.busca=.35+Math.random()*.2,e.ordem&&e.ordem.tipo==="atacar"&&js(e.ordem.alvo)||(!js(e.alvo)||Ot(e.x,e.z,e.alvo.x,e.alvo.z)>n.alcance*i)&&(e.alvo=Bc(e,n.alcance*i,n.splash&&n.splash>=8?n.splash:0,n.minAlc||0)),n.sec&&(e.alvo2=Bc(e,n.sec.alcance,n.sec.splash?n.sec.splash:0)));let s=e.alvo;if(js(s)&&n.arma){let r=Ot(e.x,e.z,s.x,s.z),o=Math.atan2(s.x-e.x,s.z-e.z);e.m&&e.m.torre?e.torreAng=Ve(e.torreAng,ki(e.ang,o),3*t):e.janela?e.ang=Ve(e.ang,e.janela.ang+Math.max(-1.1,Math.min(1.1,ki(e.janela.ang,o))),8*t):e.classe==="inf"&&e.velAtual<.5?e.ang=Ve(e.ang,o,8*t):e.classe==="aereo"&&!e.ordem&&e.velAtual<5&&(e.ang=Ve(e.ang,o,2*t)),e.cd<=0&&r<=n.alcance*i&&r>=(n.minAlc||0)&&(n.salva?e.salva>0&&(Uc(e,s,n),e.salva--,e.cd=n.cadencia,e.salva<=0&&(e.recarga=n.recarga)):(Uc(e,s,n),e.cd=n.cadencia*ht(.85,1.15)),e.mirando=.6)}else e.m&&e.m.torre&&(e.torreAng=Ve(e.torreAng,0,.8*t));n.sec&&js(e.alvo2)&&e.cd2<=0&&(!n.sec.splash||x.hashA.contar(e.alvo2.x,e.alvo2.z,n.sec.splash,r=>r.zumbi&&r.vivo)>=3||e.alvo2.sub==="bruto")&&(Uc(e,e.alvo2,n.sec),e.cd2=n.sec.cadencia*ht(.9,1.1))}function v_(e,t){e.passageiros.length&&Ks(e.x,e.z,e.y)&&(e.classe!=="aereo"||e.pousado)&&e.passageiros.some(n=>n.agente)&&Nc(e),e.classe==="naval"&&e.passageiros.length&&x.porta&&Ot(e.x,e.z,x.porta.x,x.porta.z)<200&&Nc(e)}function y_(e,t){if(e.construindo>0){e.construindo-=t;let n=1-Math.max(0,e.construindo)/e.tempoObra;e.m.grupo.scale.y=.15+.85*n,e.hp=Math.max(e.hp,e.hpMax*(.2+.8*n)),Math.random()<t*3&&x.efeitos.poeira(e.x+ht(-e.d.raio,e.d.raio)*.5,e.z+ht(-e.d.raio,e.d.raio)*.5,1),e.construindo<=0&&(e.m.grupo.scale.y=1,Wt(`\u{1F3D7}\uFE0F ${e.d.nome} constru\xEDdo!`,e.x,e.z,"bom"),Kt("ok"));return}if(e.d.arma&&(e.busca-=t,e.cd-=t,e.busca<=0&&(e.busca=.4,e.alvo=Bc(e,e.d.alcance,0)),js(e.alvo)&&e.cd<=0&&(Uc({...e,y:11,m:null,classe:"estr"},e.alvo,e.d),e.cd=e.d.cadencia)),e.fila&&e.fila.length){let n=e.fila[0];n.t-=t,n.t<=0&&(e.fila.shift(),x.produzir(n.tipo,e))}}function lp(e,t,n){e.vivo&&(e.classe==="inf"&&e.predio&&e.predio.integridade>0||(e.hp-=t,e.classe==="inf"&&Math.random()<.3&&x.efeitos.sangue(e.x,e.y+1.2,e.z,3),e.hp<=0&&__(e,n)))}function __(e,t){if(e.vivo){if(x.perdas+=e.estr||e.policia?0:1,e.estr){x.efeitos.explosao(e.x,5,e.z,18),Cc(Ln(e.x,e.z)),Wt(`\u{1F4A5} ${e.d.nome} foi destru\xEDdo!`,e.x,e.z,"ruim"),Kr(e),e.tipoEstr==="qg"&&x.derrota&&x.derrota("O Quartel-General foi destru\xEDdo pelos zumbis.");return}e.predio&&(e.predio.guarnicao=e.predio.guarnicao.filter(n=>n!==e));for(let n of e.passageiros.slice())(e.classe==="aereo"&&e.y>8||e.classe==="naval")&&(n.agente?(n.vivo=!1,x.civisMortos++):(n.vivo=!1,Kr(n),x.perdas++));!(e.classe==="aereo"&&e.y>8)&&e.classe!=="naval"&&(e.pousado=!0,Vi(e)),e.classe==="inf"?(t&&x.virarZumbi(e),Wt(e.policia?t?"\u2623\uFE0F Um policial da SWAT foi mordido!":"Policial da SWAT abatido":t?"\u2623\uFE0F Um soldado foi mordido e virou zumbi!":"Soldado abatido",e.x,e.z,"ruim")):(x.efeitos.explosao(e.x,e.y+1,e.z,e.d.raio*2.5,Fs(e.x,e.z)),Cc(Ln(e.x,e.z)),Wt(`\u{1F4A5} ${e.d.nome} destru\xEDdo`,e.x,e.z,"ruim")),Kr(e)}}var Lc=new Fe;function hp(e,t){var r,o;if(e.anel&&(e.anel.position.set(e.x,(e.classe==="aereo"||e.classe==="jato"?_n(e.x,e.z):e.y)+.35,e.z),e.anel.visible=!e.dentro),!e.m)return;let n=e.m.grupo;if(n.position.set(e.x,e.y,e.z),e.classe==="aereo"||e.classe==="jato"){let a=e.classe==="jato"?-rn(Math.atan2(e.vy||0,Math.max(30,e.velAtual)),-.5,.5):rn(e.velAtual/e.d.vel,-1,1)*.18;Lc.set(a,e.ang,e.classe==="jato"?-(e.banco||0):0,"YXZ"),n.rotation.copy(Lc)}else e.classe==="naval"&&e.d.raio<20?(Lc.set(-Math.min(.06,e.velAtual*.004)+Math.sin(x.tempo*1.3+e.id)*.015,e.ang,Math.sin(x.tempo*.9+e.id)*.02,"YXZ"),n.rotation.copy(Lc)):n.rotation.set(0,e.ang,0);if(e.m.torre&&(e.m.torre.rotation.y=e.torreAng),e.m.trem){let a=e.estadoJato,c=(o=(r=ff(e))==null?void 0:r.deck)!=null?o:9.2;e.m.trem.visible=a==="pronto"||a==="rearmando"||a==="pousando"||a==="decolando"&&e.y<c+12||a==="aproximando"&&e.y<c+60}if(e.m.chamas){let a=e.estadoJato==="voando"||e.estadoJato==="voltando"||e.estadoJato==="decolando",c=a?.8+Math.random()*.4:0;for(let h of e.m.chamas)h.visible=a,h.scale.set(1,1,c)}if(e.classe==="aereo"){let a=e.ordem&&e.ordem.tipo==="corda"&&e.ordem.pairando&&e.passageiros.some(c=>!c.agente);if(a&&!e.corda){let c=new de;c.setAttribute("position",new ce(new Float32Array(12),3)),e.corda=new zr(c,new Ls({color:2762272})),e.corda.frustumCulled=!1,x.cena.add(e.corda)}if(e.corda&&(e.corda.visible=!!a,a)){let c=e.corda.geometry.attributes.position.array,h=_n(e.x,e.z),l=Math.cos(e.ang),u=-Math.sin(e.ang),f=Math.sin(e.ang)*1.2,d=Math.cos(e.ang)*1.2,p=0;for(let v of[-1,1]){let m=e.x+l*v*1.3+f,g=e.z+u*v*1.3+d;c[p++]=m,c[p++]=e.y+2.2,c[p++]=g,c[p++]=m,c[p++]=h,c[p++]=g}e.corda.geometry.attributes.position.needsUpdate=!0}}if(e.classe==="aereo"||e.classe==="jato"){if(!e.sombra){let l=new rs(1,16).rotateX(-Math.PI/2);e.sombra=new ae(l,new Fn({color:0,transparent:!0,opacity:.28,depthWrite:!1})),e.sombra.renderOrder=2,x.cena.add(e.sombra)}let a=_n(e.x,e.z),c=e.y-a,h=x.dirSol||{x:-.5,y:.8,z:.4};e.sombra.visible=c>2&&!e.dentro&&!(e.classe==="jato"&&(e.estadoJato==="pronto"||e.estadoJato==="rearmando")),e.sombra.position.set(e.x-h.x/h.y*c,a+.3,e.z-h.z/h.y*c),e.sombra.scale.set(e.d.raio*.7,1,e.d.raio*1),e.sombra.rotation.y=e.ang}let i=e.classe==="aereo"&&!(e.pousado&&e.y===_n(e.x,e.z)&&!e.ordem&&e.velAtual<.1&&e.parado>3);e.classe==="aereo"&&(e.parado=e.pousado?(e.parado||0)+t:0);let s=i?28:0;if(e.m.rotor&&(e.m.rotor.rotation.y+=s*t),e.m.rotor2&&(e.m.rotor2.rotation.y-=s*t),e.m.cauda&&(e.m.cauda.rotation.x+=s*2*t),e.m.helice&&(e.m.helice.rotation.y+=40*t),e.m.naceles){let a=e.velAtual>40?Math.PI/2:0;for(let c of e.m.naceles)c.piv.rotation.x+=(a-c.piv.rotation.x)*Math.min(1,t),c.ro.rotation.y+=s*t}}function Un(e,t){e.sel=t,t&&!e.anel&&e.classe!=="inf"?(e.anel=N0(Math.max(1.2,e.d.raio*1.2)),x.cena.add(e.anel)):!t&&e.anel&&(x.cena.remove(e.anel),e.anel=null)}var Vc=new sc,up=new ni(new N(0,1,0),0),Wo=new N,Gc=new ct,Wc=class{constructor(t){this.cam=t,this.alvo={x:0,z:0},this.dist=700,this.yaw=.35,this.inclExtra=0,this.seguir=null,this.tremor=0}pitch(){let t=rn((Math.log(this.dist)-Math.log(25))/(Math.log(6e3)-Math.log(25)),0,1);return rn(E0(.42,1.25,t)+this.inclExtra,.2,1.45)}aplicar(t){if(this.seguir){let c=this.seguir;c.vivo?(this.alvo.x+=(c.x-this.alvo.x)*Math.min(1,t*6),this.alvo.z+=(c.z-this.alvo.z)*Math.min(1,t*6)):this.seguir=null}this.alvo.x=rn(this.alvo.x,-2e3,Oe+2e3),this.alvo.z=rn(this.alvo.z,-2e3,ke+2e3);let n=this.pitch(),i=this.seguir&&this.seguir.y||0,s=this.cam,r=0,o=0;x.tremor>.01&&(r=(Math.random()-.5)*x.tremor*3,o=(Math.random()-.5)*x.tremor*3,x.tremor*=Math.max(0,1-t*5)),s.position.set(this.alvo.x+Math.sin(this.yaw)*Math.cos(n)*this.dist+r,i+Math.sin(n)*this.dist,this.alvo.z+Math.cos(this.yaw)*Math.cos(n)*this.dist+o);let a=0;for(let c of[1,.85,.7]){let h=this.alvo.x+(s.position.x-this.alvo.x)*c,l=this.alvo.z+(s.position.z-this.alvo.z)*c;for(let[u,f]of[[0,0],[4,0],[-4,0],[0,4],[0,-4]]){let d=Os(h+u,l+f);d&&d.h>a&&(a=d.h)}}s.position.y<a+6&&(s.position.y=a+6),s.lookAt(this.alvo.x,i,this.alvo.z),s.near=Math.max(.5,this.dist*.01),s.updateProjectionMatrix(),x.camAlvo=this.alvo,x.camDist=this.dist}chao(t,n,i=0){Gc.set(t/innerWidth*2-1,-(n/innerHeight)*2+1),Vc.setFromCamera(Gc,this.cam),up.constant=-i;let s=Vc.ray.intersectPlane(up,Wo);return s?{x:s.x,z:s.z}:null}irPara(t,n,i){this.alvo.x=t,this.alvo.z=n,i&&(this.dist=i),this.seguir=null}};function an(e,t,n,i){return Wo.set(e,t,n).project(i),Wo.z>1?null:{x:(Wo.x+1)/2*innerWidth,y:(1-Wo.y)/2*innerHeight}}function fp(e,t){let n=new Map,i=null,s=null,r=null,o=null,a={t:0,u:null};x.modoCaixa=!1,e.addEventListener("contextmenu",l=>l.preventDefault()),e.addEventListener("pointerdown",l=>{if(Hi(),e.setPointerCapture(l.pointerId),n.set(l.pointerId,{x:l.clientX,y:l.clientY,x0:l.clientX,y0:l.clientY,t0:performance.now(),botao:l.button}),n.size===1){let u=t.chao(l.clientX,l.clientY);if(i={ch:u,moveu:!1,girar:l.button===2},x.modoArea&&l.button!==2&&u&&x.selecao.some(f=>f.classe==="jato")){x.area={x0:u.x,z0:u.z,x1:u.x,z1:u.z};return}x.modoCaixa||l.shiftKey?o={x0:l.clientX,y0:l.clientY,x1:l.clientX,y1:l.clientY}:(clearTimeout(r),r=setTimeout(()=>{let f=n.values().next().value;f&&n.size===1&&Math.hypot(f.x-f.x0,f.y-f.y0)<12&&(o={x0:f.x0,y0:f.y0,x1:f.x,y1:f.y},navigator.vibrate&&navigator.vibrate(25))},450))}else if(n.size===2){clearTimeout(r),o=null;let[u,f]=[...n.values()];s={d:Math.hypot(u.x-f.x,u.y-f.y),ang:Math.atan2(f.y-u.y,f.x-u.x),mx:(u.x+f.x)/2,my:(u.y+f.y)/2,dist:t.dist,yaw:t.yaw},i=null}}),e.addEventListener("pointermove",l=>{let u=n.get(l.pointerId);if(u){if(u.x=l.clientX,u.y=l.clientY,x.area&&n.size===1){let f=t.chao(u.x,u.y);f&&(x.area.x1=f.x,x.area.z1=f.z),Math.hypot(u.x-u.x0,u.y-u.y0)>10&&i&&(i.moveu=!0);return}if(o&&n.size===1){o.x1=u.x,o.y1=u.y,x.caixa=o;return}if(n.size===1&&i){if(Math.hypot(u.x-u.x0,u.y-u.y0)>10&&(i.moveu=!0,clearTimeout(r)),!i.moveu)return;if(i.girar){t.yaw-=l.movementX*.006,t.inclExtra=rn(t.inclExtra-l.movementY*.004,-.3,.3);return}t.seguir=null;let f=t.chao(u.x,u.y);f&&i.ch&&(t.alvo.x+=i.ch.x-f.x,t.alvo.z+=i.ch.z-f.z,t.aplicar(0),i.ch=t.chao(u.x,u.y))}else if(n.size===2&&s){let[f,d]=[...n.values()],p=Math.hypot(f.x-d.x,f.y-d.y),v=Math.atan2(d.y-f.y,d.x-f.x);t.dist=rn(s.dist*s.d/Math.max(10,p),25,6e3),t.yaw=s.yaw-(v-s.ang);let m=(f.x+d.x)/2,_=(f.y+d.y)/2-s.my;Math.abs(p-s.d)<40&&(t.inclExtra=rn(t.inclExtra+(_-(s.ultDy||0))*.003,-.3,.3)),s.ultDy=_}}});let c=l=>{let u=n.get(l.pointerId);if(clearTimeout(r),!!u){if(n.delete(l.pointerId),x.area){let f=x.area;x.area=null;let d=Math.hypot(f.x1-f.x0,f.z1-f.z0),p=x.selecao.filter(v=>v.classe==="jato"&&v.vivo);if(d>25&&p.length){let v=Math.max(40,Math.min(160,d*.35));ep(p,f.x0,f.z0,f.x1,f.z1,v),x.areaMarcada={...f,w:v,t:performance.now()},x.ui&&x.ui.alerta(`\u{1F3AF} \xC1rea de bombardeio marcada (${Math.round(d)} m). ${p.length>1?p.length+" jatos":"Jato"} a caminho!`,(f.x0+f.x1)/2,(f.z0+f.z1)/2,"info"),Kt("ok"),n.size===0&&(s=null,i=null);return}}if(o){b_(o,t,l.shiftKey),o=null,x.caixa=null,x.modoCaixa&&x.ui&&x.ui.modoCaixa(!1);return}if(n.size===0&&i&&!i.moveu&&!s)if(l.button===2)x.selecao.slice().forEach(f=>Un(f,!1)),x.selecao=[],x.ui&&x.ui.atualizarSelecao();else{let f=performance.now();T_(u.x,u.y,t,f-a.t<330,a),a.t=f}n.size===0&&(s=null,i=null)}};e.addEventListener("pointerup",c),e.addEventListener("pointercancel",c),e.addEventListener("wheel",l=>{l.preventDefault(),t.dist=rn(t.dist*Math.exp(l.deltaY*.0012),25,6e3)},{passive:!1});let h=new Set;addEventListener("keydown",l=>{h.add(l.key.toLowerCase()),l.key===" "&&(x.pausado=!x.pausado,x.ui&&x.ui.atualizarTopo()),l.key==="Escape"&&(x.selecao.slice().forEach(u=>Un(u,!1)),x.selecao=[],x.ui&&x.ui.atualizarSelecao())}),addEventListener("keyup",l=>h.delete(l.key.toLowerCase())),x.teclado=l=>{let u=0,f=0;if(x.controlando){let d={x:0,z:0};(h.has("w")||h.has("arrowup"))&&(d.z-=1),(h.has("s")||h.has("arrowdown"))&&(d.z+=1),(h.has("a")||h.has("arrowleft"))&&(d.x-=1),(h.has("d")||h.has("arrowright"))&&(d.x+=1),d.x||d.z?x.joyTeclado=d:x.joyTeclado=null;return}if((h.has("w")||h.has("arrowup"))&&(f-=1),(h.has("s")||h.has("arrowdown"))&&(f+=1),(h.has("a")||h.has("arrowleft"))&&(u-=1),(h.has("d")||h.has("arrowright"))&&(u+=1),h.has("q")&&(t.yaw+=l*1.5),h.has("e")&&(t.yaw-=l*1.5),u||f){let d=t.dist*1.2*l,p=Math.sin(t.yaw),v=Math.cos(t.yaw);t.alvo.x+=(u*v+f*p)*d,t.alvo.z+=(-u*p+f*v)*d,t.seguir=null}}}function Xc(){let e=x.selecao.length&&x.selecao.every(t=>t.classe==="jato");e&&!x.modoArea&&x.ui&&x.ui.alerta("\u{1F3AF} Arraste o dedo no mapa para marcar a \xE1rea que os jatos v\xE3o bombardear (ou toque num ponto)",null,null,"info"),x.modoArea=!!e}function b_(e,t,n){let i=Math.min(e.x0,e.x1),s=Math.max(e.x0,e.x1),r=Math.min(e.y0,e.y1),o=Math.max(e.y0,e.y1);n||(x.selecao.slice().forEach(c=>Un(c,!1)),x.selecao=[]);let a=[];for(let c of x.unidades){if(!c.vivo||c.estr||c.dentro||c.tipo==="portaavioes"||c.policia)continue;let h=an(c.x,c.y+1,c.z,t.cam);h&&h.x>=i&&h.x<=s&&h.y>=r&&h.y<=o&&a.push(c)}for(let c of a)x.selecao.includes(c)||(x.selecao.push(c),Un(c,!0));a.length&&Kt("clique"),Xc(),x.ui&&x.ui.atualizarSelecao()}function M_(e,t,n,i){let s=null,r=1/0;for(let o of x.unidades){if(!o.vivo||o.dentro||o.policia||i&&!i(o))continue;let a=an(o.x,o.y+(o.classe==="inf"?1:(o.d.raio||2)*.4),o.z,n);if(!a)continue;let c=an(o.x+(o.d.raio||1)*Math.cos(x.cam.yaw),o.y,o.z-(o.d.raio||1)*Math.sin(x.cam.yaw),n),h=c?Math.hypot(c.x-a.x,c.y-a.y):0,l=Math.max(26,h*1.1),u=Math.hypot(a.x-e,a.y-t);u<l&&u-h*.5<r&&(r=u-h*.5,s=o)}return s}function S_(e,t,n){let i=x.cam.chao(e,t);if(!i)return null;let s=Math.max(6,x.cam.dist*.03),r=null,o=1/0;return x.hashA.busca(i.x,i.z,s,(a,c)=>{a.zumbi&&a.vivo&&a.estado!=="morto"&&c<o&&(o=c,r=a)}),r}function E_(e){let t=(s,r)=>oi(e,s,r)&&oi(e,s+3,r)&&oi(e,s-3,r)&&oi(e,s,r+3)&&oi(e,s,r-3);if(t(e.cx,e.cz))return{x:e.cx,z:e.cz};let n=null,i=1/0;for(let s=0;s<300;s++){let r=e.x0+Math.random()*(e.x1-e.x0),o=e.z0+Math.random()*(e.z1-e.z0);if(!t(r,o))continue;let a=(r-e.cx)**2+(o-e.cz)**2;a<i&&(i=a,n={x:r,z:o})}return n||{x:e.cx,z:e.cz}}function pf(e,t,n){Gc.set(e/innerWidth*2-1,-(t/innerHeight)*2+1),Vc.setFromCamera(Gc,n);let i=Vc.intersectObjects(x.malhasPredios||[],!1);if(i.length){let r=i[0],o=r.face?r.face.normal:{x:0,y:1,z:0},a=Os(r.point.x-o.x*.6,r.point.z-o.z*.6);if(a)return a}let s=x.cam.chao(e,t);if(s){let r=Os(s.x,s.z);if(r)return r}return null}function T_(e,t,n,i,s){let r=n.cam;if(x.construindo){let u=n.chao(e,t);u&&x.construir(x.construindo,u.x,u.z)&&(x.construindo=null,x.ui.atualizarConstrucao());return}let o=x.selecao.filter(u=>u.vivo&&!u.dentro);if(x.selecao=o,!o.length&&x.saidas&&x.saidas.length){let u=n.chao(e,t),f=u&&x.saidas.find(d=>Math.hypot(d.x-u.x,d.z-u.z)<Math.max(25,n.dist*.06));if(f){x.ui.viajar(f);return}}if(x.modoCorda){x.modoCorda=!1;let u=o.filter(p=>p.classe==="aereo"&&p.passageiros.some(v=>!v.agente)),f=pf(e,t,r),d=f?E_(f):n.chao(e,t);if(u.length&&d){u.forEach((p,v)=>{p.ordem={tipo:"corda",x:d.x+v%2*14-7*(u.length>1),z:d.z+Math.floor(v/2)*14},p.pousado=!1}),x.ui.ping(d.x,d.z,"guarnecer"),Kt("ok"),x.ui.atualizarSelecao();return}}let a=M_(e,t,r);if(a&&!a.estr){let u=o.filter(f=>f!==a&&Oc(a,f));if(o.length&&a.d.carga&&u.length&&!o.includes(a)){Mi(u,{tipo:"embarcar",t:a}),a.classe==="aereo"&&!a.pousado&&(a.ordem={tipo:"pousar"}),x.ui.ping(a.x,a.z,"embarque"),Kt("ok");return}if(a.tipo==="portaavioes"&&o.length&&o.some(f=>f.classe==="aereo")){let f=-120;for(let p of o)p.classe==="aereo"&&(p.ordem={tipo:"pousarPorta",k:f},p.altAlvo=p.d.altCruz,f+=30);let d=o.filter(p=>p.classe==="naval");d.length&&Si(d,a.x+120,a.z),x.ui.ping(a.x,a.z,"mover"),Kt("ok");return}if(i&&s.u===a)for(let f of x.unidades){if(f.tipo!==a.tipo||!f.vivo||f.dentro||x.selecao.includes(f))continue;let d=an(f.x,f.y,f.z,r);d&&d.x>0&&d.y>0&&d.x<innerWidth&&d.y<innerHeight&&(x.selecao.push(f),Un(f,!0))}else x.selecaoMultipla?x.selecao.includes(a)?(x.selecao.splice(x.selecao.indexOf(a),1),Un(a,!1)):(x.selecao.push(a),Un(a,!0)):(x.selecao.slice().forEach(f=>Un(f,!1)),x.selecao=[a],Un(a,!0));s.u=a,Kt("clique"),Xc(),x.ui.atualizarSelecao();return}if(a&&a.estr&&!o.length){x.fonteSel=a,["quartel","patio","heliporto","docas"].includes(a.tipoEstr)?x.ui.abrirProducao(a.tipoEstr):x.ui.alerta(`${a.d.nome}${a.construindo>0?" (em constru\xE7\xE3o)":""}`,a.x,a.z,"info");return}if(!o.length){let u=pf(e,t,r);u&&x.ui.infoPredio(u);return}let c=S_(e,t,r);if(c){let u=o.filter(d=>d.d.arma&&d.classe!=="jato");Mi(u,{tipo:"atacar",alvo:c});let f=o.filter(d=>d.classe==="jato");f.length&&Si(f,c.x,c.z),x.ui.ping(c.x,c.z,"atacar"),Kt("ok");return}let h=pf(e,t,r);if(h){let u=o.filter(p=>p.classe==="inf"),f=o.filter(p=>p.classe==="aereo"),d=o.filter(p=>p.classe!=="inf"&&p.classe!=="aereo");if(h.civis>0){Mi(o.filter(v=>v.classe==="inf"||v.classe==="veic"),{tipo:"resgatar",predio:h}),Mi(f.filter(v=>v.d.carga),{tipo:"resgatar",predio:h});let p=f.filter(v=>!v.d.carga).concat(d.filter(v=>v.classe!=="veic"));p.length&&Si(p,h.cx,h.cz),x.ui.ping(h.cx,h.cz,"resgate")}else{u.length&&Mi(u,{tipo:"guarnecer",predio:h});let p=f.concat(d);p.length&&Si(p,h.cx,h.cz),x.ui.ping(h.cx,h.cz,u.length?"guarnecer":"mover")}Kt("ok");return}let l=n.chao(e,t);l&&(Si(o,l.x,l.z),x.ui.ping(l.x,l.z,o.some(u=>u.classe==="jato")&&o.every(u=>u.classe==="jato")?"atacar":"mover"),Kt("ok"))}var w_=(me.delegacias||[]).map(([e,t,n])=>({nome:e,x:t*me.mpp,z:n*me.mpp})),A_=4,Xo=[];x.equipes=Xo;function R_(e){return He(e.x,e.z)?e:yn(0,e.x,e.z)||e}function gf(e,t,n){if(x.policiaDesistiu||Xo.filter(c=>c.vivo).length>=A_)return;let i=w_.slice().sort((c,h)=>Ot(c.x,c.z,e,t)-Ot(h.x,h.z,e,t))[0],s=R_(i),r=Ze("bearcat",s.x,s.z,0);r.policia=!0;let o=[];for(let c=0;c<6;c++){let h=Ze("swat",s.x+ht(-3,3),s.z+ht(-3,3),0);h.policia=!0,cf(h,r),o.push(h)}let a={van:r,oficiais:o,alvo:{x:e,z:t},estado:"indo",t:0,calmo:0,vivo:!0,id:Xo.length+1};Xo.push(a),r.ordem={tipo:"mover",x:e,z:t},Wt(`\u{1F693} SWAT da ${i.nome} a caminho de ${n||"um foco de infec\xE7\xE3o"}`,s.x,s.z,"info"),Kt("sirene")}function dp(e,t,n){return x.hashA?x.hashA.contar(e,t,n,i=>i.zumbi&&i.vivo&&i.estado!=="morto"):0}function pp(e,t,n){let i=null,s=n*n;for(let r of x.agentes){if(!r.zumbi||!r.vivo||r.dentro||r.estado==="morto")continue;let o=(r.x-e)**2+(r.z-t)**2;o<s&&(s=o,i=r)}return i}var mf=0;function mp(e){if(mf-=e,!(mf>0)){mf=1;for(let t of Xo){if(!t.vivo)continue;t.oficiais=t.oficiais.filter(a=>a.vivo);let n=t.van.vivo?t.van:null;if(!n&&!t.oficiais.length){t.vivo=!1,Wt("\u2620\uFE0F Uma equipe da SWAT foi perdida",t.alvo.x,t.alvo.z,"ruim");continue}t.t+=1;let i=t.oficiais.filter(a=>!a.dentro),s=i.length?{x:i.reduce((a,c)=>a+c.x,0)/i.length,z:i.reduce((a,c)=>a+c.z,0)/i.length}:n||t.oficiais[0];if(n){let a=n.passageiros.filter(c=>c.agente).length;if(t.estado!=="evacuar"&&a>0&&(Qr(n)<1||a>=4&&dp(n.x,n.z,60)===0&&t.t>20)){t.estado="evacuar";let c=(x.abrigos||[]).filter(h=>h.vivo&&!(h.construindo>0)).sort((h,l)=>Ot(h.x,h.z,n.x,n.z)-Ot(l.x,l.z,n.x,n.z))[0]||x.estr.zona;n.ordem={tipo:"mover",x:c.x,z:c.z},Wt(`\u{1F693} Blindado da SWAT levando ${a} civis para a zona segura`,n.x,n.z,"bom")}if(t.estado==="evacuar"){n.passageiros.some(c=>c.agente)?Ks(n.x,n.z,0)&&!n.ordem&&Vi(n):(t.estado="voltar",n.ordem={tipo:"mover",x:t.alvo.x,z:t.alvo.z});continue}if(t.estado==="voltar"){(Ot(n.x,n.z,t.alvo.x,t.alvo.z)<80||!n.ordem)&&(t.estado="combate");continue}}if(dp(t.alvo.x,t.alvo.z,140)===0?t.calmo++:t.calmo=0,t.calmo>12){let a=pp(s.x,s.z,3500);a&&(t.alvo={x:a.x,z:a.z},t.calmo=0,t.estado="indo")}let o=Ot(s.x,s.z,t.alvo.x,t.alvo.z)>320;if(n&&o&&t.estado!=="indo"){t.estado="indo";let a=t.oficiais.filter(c=>!c.dentro);a.length&&Mi(a,{tipo:"embarcar",t:n})}if(t.estado==="indo"&&n){let a=t.oficiais.filter(c=>!c.dentro);if(a.length&&t.t%30!==0&&a.some(c=>c.ordem&&c.ordem.tipo==="embarcar"))continue;Ot(n.x,n.z,t.alvo.x,t.alvo.z)>70?n.ordem||(n.ordem={tipo:"mover",x:t.alvo.x+ht(-20,20),z:t.alvo.z+ht(-20,20)}):(n.ordem=null,Vi(n),t.estado="combate");continue}t.estado="combate";for(let a of t.oficiais){if(a.dentro||a.ordem||a.alvo&&a.alvo.vivo&&a.alvo.zumbi)continue;let h=pp(a.x,a.z,200)||t.alvo;if(Ot(a.x,a.z,h.x,h.z)>45){let l=Math.atan2(h.x-a.x,h.z-a.z)+ht(-.4,.4);Si([a],a.x+Math.sin(l)*30,a.z+Math.cos(l)*30)}}n&&!n.ordem&&s!==n&&Ot(n.x,n.z,s.x,s.z)>50&&(n.ordem={tipo:"mover",x:s.x+ht(-10,10),z:s.z+ht(-10,10)})}}}var qo=[];x.acampamentos=qo;var xf=20,C_=0;function P_(e,t){let n="cidade",i=1/0;for(let s in ze){if(["base","heliporto","docas","portaavioes"].includes(s))continue;let r=$e(e,t,ze[s].x,ze[s].z);r<i&&(i=r,n=ze[s].nome)}return n}function I_(e,t,n){for(let i of x.unidades)if(i.vivo&&!i.policia&&(i.estr||i.classe==="inf"||i.classe==="veic")&&$e(i.x,i.z,e,t)<n*n)return!1;return!0}function gp(e,t){for(let n=0;n<30;n++){let i=e+ht(-60,60),s=t+ht(-60,60),r=!0;for(let o=0;o<6.28&&r;o+=.8)He(i+Math.sin(o)*12,s+Math.cos(o)*12)||(r=!1);if(r&&He(i,s))return{x:i,z:s}}return null}function vf(e,t,n){let i=n/Math.max(6,e.membros.length)*Math.PI*2,s=t.armado?11.5:4+n%3*1.5;return{x:e.x+Math.sin(i)*s,z:e.z+Math.cos(i)*s}}function xp(e,t,n,i=!1){let s=Ws("acampamento");s.grupo.position.set(e,0,t),s.grupo.rotation.y=ht(0,6.28),x.cena.add(s.grupo);let r={id:++C_,x:e,z:t,m:s,membros:[],ativo:!0,policia:i,nome:P_(e,t),t:0};qo.push(r);for(let o of n)z_(r,o);return r}function z_(e,t){t.campo=e,t.estado="acampar",t.lider=null,e.membros.push(t),t.posto=vf(e,t,e.membros.length-1)}function yf(e){e.armado=!0,e.hp=Math.max(e.hp,60)}function L_(e){let t=x.criarCivil(e.x,e.z);return t.camisa=Ec,t.calca=Tc,t.pele=Wr,t.policial=!0,t.cabelo=null,yf(t),t.hp=115,t}function U_(){let e=(x.equipes||[]).find(n=>n.vivo&&!n.desistiu);if(!e)return!1;e.desistiu=!0,e.vivo=!1;let t=[];for(let n of e.oficiais)n.vivo&&(n.dentro&&(n.dentro.passageiros.splice(n.dentro.passageiros.indexOf(n),1),n.dentro.cargaUsada-=1,n.dentro=null),t.push(L_(n)),Kr(n));if(e.van.vivo){for(let s of e.van.passageiros.slice())s.agente&&(s.dentro=null,t.push(s));e.van.passageiros=e.van.passageiros.filter(s=>!s.agente);let n=e.van.x,i=e.van.z;if(Kr(e.van),t.length){let s=gp(n,i)||{x:n,z:i},r=xp(s.x,s.z,t,!0);Wt(`\u{1F694} A SWAT desistiu! Os policiais abandonaram o servi\xE7o e montaram um acampamento em ${r.nome}`,r.x,r.z,"ruim")}}return Kt("alerta"),!0}function vp(e){xf-=e;for(let s of qo){if(!s.ativo)continue;if(s.membros=s.membros.filter(o=>o.vivo&&!o.zumbi&&o.estado!=="morto"&&o.campo===s),s.t+=e,s.t>25&&Math.random()<e*.03){let o=s.membros.find(a=>!a.armado);o&&s.membros.filter(a=>a.armado).length<s.membros.length*.7&&(yf(o),o.posto=vf(s,o,s.membros.indexOf(o)))}if(!s.membros.length){s.ativo=!1,Wt(`\u2620\uFE0F O acampamento de sobreviventes em ${s.nome} caiu`,s.x,s.z,"ruim");continue}let r=null;if(x.hashU.busca(s.x,s.z,45,o=>{r||!o.vivo||o.dentro||o.policia||o.estr||(o.classe==="inf"||o.classe==="veic"||o.classe==="aereo"&&o.pousado&&o.d.carga||o.classe==="naval"&&o.d.carga)&&(r=o)}),r){s.ativo=!1;for(let o of s.membros)o.campo=null,o.estado="seguir",o.lider=r,o.espera=0;Wt(`\u{1F91D} ${s.membros.length} sobreviventes de ${s.nome} aceitaram o resgate e seguem suas tropas!`,s.x,s.z,"bom"),Kt("resgate")}}if(xf>0)return;xf=15;let t=x.populacao?x.infectados/x.populacao:0;if(!x.policiaDesistiu&&(t>.4||x.nZumbis>250&&x.nZumbis>x.nCivis)&&(x.policiaDesistiu=!0,Wt("\u{1F4FB} A cidade est\xE1 tomada. A pol\xEDcia e a SWAT est\xE3o desistindo e abandonando os postos!",null,null,"surto")),x.policiaDesistiu&&Math.random()<.6&&U_(),x.focos<2||x.tempo<180||qo.filter(s=>s.ativo).length>=8)return;let i=x.agentes.filter(s=>s.vivo&&!s.zumbi&&!s.dentro&&!s.campo&&s.estado!=="morto"&&s.estado!=="seguir");for(let s=0;s<6;s++){let r=i[Math.random()*i.length|0];if(!r)return;if(!I_(r.x,r.z,350)||qo.some(h=>h.ativo&&$e(h.x,h.z,r.x,r.z)<500*500))continue;let o=i.filter(h=>!h.campo&&$e(r.x,r.z,h.x,h.z)<140*140).slice(0,16);if(o.length<5)continue;let a=gp(r.x,r.z);if(!a)continue;let c=xp(a.x,a.z,o);for(let h=0;h<Math.min(o.length,2+(x.dia>=2?2:0));h++)yf(o[h]);for(let h of o)h.posto=vf(c,h,c.membros.indexOf(h));Wt(`\u{1F3D5}\uFE0F Sobreviventes montaram um acampamento em ${c.nome} (${o.length} pessoas). Mande tropas para resgat\xE1-los!`,c.x,c.z,"info"),Kt("alerta");return}}var yp={facil:{dinheiro:5e3,civis:600,sos:22,meta:150,intervalo:1.35,renda:7},normal:{dinheiro:3500,civis:750,sos:26,meta:250,intervalo:1,renda:5},dificil:{dinheiro:2200,civis:900,sos:30,meta:350,intervalo:.7,renda:4},sandbox:{dinheiro:1/0,civis:750,sos:26,meta:1/0,intervalo:1,renda:0,sandbox:!0}};function bp(){var o;x.danoUnidade=lp,x.naZonaSegura=Ks,x.volEm=Ln,x.vagas=Qr,x.construir=N_,x.embarcarCivil=lf,x.criarCivil=Ic,x.virarZumbi=j0,x.produzir=wp;let e=ze.base;Mu(e.x,e.z,380);let t=(o=me.baseAng)!=null?o:.43,n={x:Math.cos(t),z:Math.sin(t)},i={x:-n.z,z:n.x};x.baseEixo={ax:n,pp:i,ang:Math.atan2(n.x,n.z)};let s=(a,c)=>({x:e.x+n.x*a+i.x*c,z:e.z+n.z*a+i.z*c});x.layout={qg:s(0,-10),quartel:s(-150,-60),patio:s(-150,60),heliporto:s(150,-20),zona:s(10,110),torres:[s(-260,-120),s(-260,140),s(260,-120),s(260,140),s(0,-160)],patriot:[s(90,120),s(230,60)]};let r=[["qg",42,28,16],["quartel",56,42,6],["patio",64,34,10]];for(let[a,c,h,l]of r){let u=x.layout[a];D_(u.x,u.z,c,h,x.baseEixo.ang+Math.PI/2,l)}bu(),Ku()}function D_(e,t,n,i,s,r){let o=Math.cos(s),a=Math.sin(s),c=new Float32Array(8),h=[[-n/2,-i/2],[-n/2,i/2],[n/2,i/2],[n/2,-i/2]],l=1e9,u=-1e9,f=1e9,d=-1e9;h.forEach(([v,m],g)=>{let _=e+v*o+m*a,y=t-v*a+m*o;c[g*2]=_,c[g*2+1]=y,l=Math.min(l,_),u=Math.max(u,_),f=Math.min(f,y),d=Math.max(d,y)});let p=0;for(let v=0;v<4;v++){let m=(v+1)%4;p+=c[v*2]*c[m*2+1]-c[m*2]*c[v*2+1]}if(p>0){let v=new Float32Array([c[6],c[7],c[4],c[5],c[2],c[3],c[0],c[1]]);c.set(v)}Ie.push({id:Ie.length,pts:c,h:r,area:n*i,cx:e,cz:t,x0:l,x1:u,z0:f,z1:d,raio:Math.max(n,i)/2,cap:12,guarnicao:[],civis:0,sos:!1,integridade:600,integMax:600,removido:!1,base:!0})}function Mp(){x.chao=Tu(x.cena),x.agua=wu(x.cena);let e=Ie.filter(r=>r.base);for(let r of e)r.removido=!0;x.malhasPredios=Su(x.cena);for(let r of e)r.removido=!1;let t=ze.base,n=x.baseEixo,i=We?null:{x:t.x+n.pp.x*-330,z:t.z+n.pp.z*-330};x.decor=Au(x.cena,me.rural?32e3:2600,i?(r,o)=>{let a=r-i.x,c=o-i.z,h=n.ang,l=a*Math.sin(h)+c*Math.cos(h),u=a*Math.cos(h)-c*Math.sin(h);return Math.abs(l)<180&&u>-110&&u<40}:null);let s=ze.base;x.decor.push(...Cu(x.cena,3200,(r,o)=>Ot(r,o,s.x,s.z)<450));for(let r of Ie)r.base||(r.integMax=150+Math.min(900,r.area*.4),r.integridade=r.integMax)}function Ei(e,t,n,i){let s=Yu[e],r=Ws(e);r.grupo.position.set(t,0,n),r.grupo.rotation.y=i,x.cena.add(r.grupo);let o={id:x.idSeq++,estr:!0,tipoEstr:e,tipo:e,d:s,classe:"estr",x:t,z:n,y:0,ang:i,hp:s.hp,hpMax:s.hp,vivo:!0,m:r,fila:[],passageiros:[],cargaUsada:0,busca:ht(0,1),cd:0};return x.unidades.push(o),["qg","zona","fob"].includes(e)&&(x.abrigos||(x.abrigos=[])).push(o),o}function Yo(e){if(e==="porta")return We?x.porta:Yo("pista");if(x.fonteSel&&x.fonteSel.vivo&&x.fonteSel.tipoEstr===e&&!(x.fonteSel.construindo>0))return x.fonteSel;let t=null,n=1/0,i=x.camAlvo||{x:0,z:0};for(let s of x.unidades){if(!s.vivo||!s.estr||s.tipoEstr!==e||s.construindo>0)continue;let r=$e(s.x,s.z,i.x,i.z);r<n&&(n=r,t=s)}return t}function N_(e,t,n){let i=Do[e];if(x.dinheiro<i.custo)return Wt("Dinheiro insuficiente",null,null,"ruim"),Kt("erro"),!1;if(!He(t,n))return Wt("N\xE3o d\xE1 para construir a\xED (pr\xE9dio ou \xE1gua)",t,n,"ruim"),Kt("erro"),!1;let s=Math.min(i.raio,24);if(!i.agua&&e!=="muro"&&e!=="torre"){let c=0;for(let h=0;h<6.28;h+=.5)for(let l of[.5,1])He(t+Math.sin(h)*s*l,n+Math.cos(h)*s*l)||c++;if(c>3)return Wt("Pouco espa\xE7o livre aqui: escolha um terreno aberto (pra\xE7a, estacionamento, rua larga)",t,n,"ruim"),Kt("erro"),!1}for(let c of x.unidades)if(c.vivo&&c.estr&&Ot(c.x,c.z,t,n)<(c.d.raio+i.raio)*.6)return Wt("Muito perto de outra estrutura",t,n,"ruim"),Kt("erro"),!1;let r=x.cam?x.cam.yaw:0,o=null;if(i.agua){let c=Ep(t,n);if(!c||c.r>80)return Wt("As docas precisam ficar na beira da \xE1gua",t,n,"ruim"),Kt("erro"),!1;t=c.x,n=c.z,r=c.ang,o=c.agua}x.dinheiro-=i.custo;let a=Ei(e,t,n,r);return a.construindo=a.tempoObra=x.sandbox?2:i.tempo,a.hp=a.hpMax*.2,a.m.grupo.scale.y=.15,o&&(a.saidaAgua=o),e==="pista"&&(a.deck=.3,a.fila=[]),(e==="quartel"||e==="patio")&&(a.saida=Gi({x:t+Math.sin(r)*40,z:n+Math.cos(r)*40})),Wt(`\u{1F3D7}\uFE0F Construindo ${i.nome}...`,t,n,"info"),Kt("ok"),!0}function Gi(e,t=0){return t===0&&He(e.x,e.z)?e:yn(t,e.x,e.z)||e}function B_(){x.saidas=[];for(let[e,t,n,i]of me.saidas||[]){let s=t*me.mpp,r=n*me.mpp,o=yn(0,s,r);o&&(s=o.x,r=o.z);let a=Ws("placa"),c=Math.atan2(Oe/2-s,ke/2-r);a.grupo.position.set(s+Math.sin(c+Math.PI/2)*6,0,r+Math.cos(c+Math.PI/2)*6),a.grupo.rotation.y=c,x.cena.add(a.grupo),x.saidas.push({nome:e,x:s,z:r,dest:i,m:a})}}function Sp(e){B_();let t=yp[e]||yp.normal;x.dificuldade=e,x.cfgDif=t,x.dinheiro=t.dinheiro,x.meta=t.meta,x.sandbox=!!t.sandbox,x.surtoParado=!1,x.tempo=0,x.dia=1,x.focos=0,x.proxFoco=20,x.infectados=0,x.resgatados=0,x.civisMortos=0,x.zumbisMortos=0,x.perdas=0,x.ruidos=[],x.quadro=0,x.fim=!1;let n=x.baseEixo.ang+Math.PI/2,i=x.layout;x.estr.qg=Ei("qg",i.qg.x,i.qg.z,n),x.estr.quartel=Ei("quartel",i.quartel.x,i.quartel.z,n),x.estr.patio=Ei("patio",i.patio.x,i.patio.z,n);let s=Gi(i.heliporto);x.estr.heliporto=Ei("heliporto",s.x,s.z,n);let r=Gi(i.zona);x.estr.zona=Ei("zona",r.x,r.z,n);for(let _ of i.torres){let y=Gi(_);Ot(y.x,y.z,_.x,_.z)<60&&Ei("torre",y.x,y.z,n)}for(let _ of i.patriot){let y=Gi(_);Ei("patriot",y.x,y.z,n+.5)}let o=We?Ep(x.estr.qg.x,x.estr.qg.z):null;o&&(x.estr.docas=Ei("docas",o.x,o.z,o.ang),x.estr.docas.saidaAgua=o.agua);for(let _ of["quartel","patio"]){let y=x.estr[_],b={x:y.x+x.baseEixo.pp.x*45,z:y.z+x.baseEixo.pp.z*45};y.saida=Gi(b)}let a;if(We){a=ze.portaavioes,Xr(2,a.x,a.z)||(a=yn(2,a.x,a.z)||a),x.porta=Ze("portaavioes",a.x,a.z,Math.PI),x.porta.fila=[],x.porta.deck=9.2;let _=yn(2,a.x-250,a.z+300)||{x:a.x,z:a.z+400};Ze("destroier",_.x,_.z,Math.PI);let y=x.estr.docas.saidaAgua;Ze("lancha",y.x,y.z,o.ang)}else{let _=ze.base,y=x.baseEixo.ax,b=x.baseEixo.pp,w=((A,P)=>({x:_.x+y.x*A+b.x*P,z:_.z+y.z*A+b.z*P}))(0,-330);x.porta=Ei("pista",w.x,w.z,x.baseEixo.ang),x.porta.deck=.3,x.porta.aerodromo=!0,a=x.porta}let c=x.estr.quartel.saida,h=x.estr.patio.saida,l={fuzileiro:8,metralhador:2,sniper:1,medico:1},u=0;for(let _ in l)for(let y=0;y<l[_];y++,u++){let b=Gi({x:c.x+u%4*3-5,z:c.z+Math.floor(u/4)*3});Ze(_,b.x,b.z,x.baseEixo.ang)}for(let[_,y]of[["humvee",2],["stryker",1],["ambulancia",1]])for(let b=0;b<y;b++,u++){let R=Gi({x:h.x+u%3*8-8,z:h.z+u%2*8});Ze(_,R.x,R.z,x.baseEixo.ang)}let f=x.estr.heliporto,d=Ze("blackhawk",f.x+x.baseEixo.ax.x*-30,f.z+x.baseEixo.ax.z*-30,x.baseEixo.ang);d.pousado=!0,d.y=0;let p=Ze("apache",f.x,f.z,x.baseEixo.ang);p.pousado=!0;let v=Ze("f35",a.x,a.z,0);v.vagaConves=0,v.base=x.porta;let m=Ze("f18",a.x,a.z,0);if(m.vagaConves=1,m.base=x.porta,!We){let _=Ze("a10",a.x,a.z,0);_.vagaConves=2,_.base=x.porta}F_(t.civis);let g=Ie.filter(_=>!_.base&&!_.removido&&_.h>9&&Ot(_.cx,_.cz,x.estr.qg.x,x.estr.qg.z)>700);for(let _=0;_<t.sos&&g.length;_++){let y=g.splice(dc(0,g.length-1),1)[0];y.sos=!0,y.civis=dc(4,14)}x.populacao=x.agentes.length+Ie.reduce((_,y)=>_+y.civis,0),x.pausado=!1}function Ep(e,t){let n=null;for(let i=0;i<16;i++){let s=i/16*Math.PI*2,r=Math.sin(s),o=Math.cos(s);for(let a=20;a<600;a+=4){let c=e+r*a,h=t+o*a;if(Fs(c,h)){if(!n||a<n.r){let l=yn(1,c+r*60,h+o*60)||{x:c+r*60,z:h+o*60};n={r:a,x:c-r*4,z:h-o*4,ang:s,agua:l}}break}}}return n||{x:e,z:t,ang:0,agua:{x:e,z:t}}}function F_(e){let t=x.estr.qg,n=0,i=0;for(;i<e&&n<e*200;){n++;let s=Math.random()*Oe,r=Math.random()*ke;if(!He(s,r)||$e(s,r,t.x,t.z)<600*600)continue;let o=Math.floor(s/Pe),a=Math.floor(r/Pe),c=0;for(let h=-3;h<=3;h+=3)for(let l=-3;l<=3;l+=3){let u=(a+h)*Ft+(o+l);u>=0&&u<Te.length&&Te[u]>=0&&c++}Math.random()>.08+c*.12||(Ic(s,r),i++)}}function qc(e,t){let n=Zn[e],i=Yo(t||n.de);if(!i&&(t||n.de)==="pista")return Wt(x.unidades.some(r=>r.vivo&&r.tipoEstr==="pista")?"A pista de pouso ainda est\xE1 em constru\xE7\xE3o":"Construa uma Pista de Pouso (\u{1F528} Construir) para usar F-22 e A-10",null,null,"ruim"),Kt("erro"),!1;if(!i||!i.vivo)return Wt("Estrutura destru\xEDda: n\xE3o d\xE1 para produzir",0,0,"ruim"),Kt("erro"),!1;if(x.dinheiro<n.custo)return Wt("Dinheiro insuficiente",null,null,"ruim"),Kt("erro"),!1;if(i.fila.length>=8)return Wt("Fila cheia",null,null),Kt("erro"),!1;if(n.classe==="jato"&&x.unidades.filter(r=>r.classe==="jato"&&r.vivo&&(r.base||x.porta)===i).length+i.fila.filter(r=>Zn[r.tipo].classe==="jato").length>=6)return Wt("Esta base comporta no m\xE1ximo 6 jatos",null,null),Kt("erro"),!1;x.dinheiro-=n.custo;let s=x.sandbox?Math.max(1,n.tempo*.15):n.tempo;return i.fila.push({tipo:e,t:s,total:s}),Kt("clique"),!0}function Tp(e,t){let n=Yo(e);if(!n||!n.fila[t])return;let i=n.fila.splice(t,1)[0];x.dinheiro+=Zn[i.tipo].custo}function wp(e,t){let n=Zn[e],i;if(t&&(t===x.porta||t.tipoEstr==="pista")){let s=t;if(n.classe==="jato"){i=Ze(e,s.x,s.z,0),i.base=s;let r=new Set(x.unidades.filter(a=>a.classe==="jato"&&a!==i&&a.vivo&&(a.base||x.porta)===s).map(a=>a.vagaConves)),o=0;for(;r.has(o);)o++;i.vagaConves=o}else{let r=-60-dc(0,3)*25;i=Ze(e,s.x+Math.sin(s.ang)*r,s.z+Math.cos(s.ang)*r,s.ang,{alt:s.deck}),i.y=s.deck,i.pousado=!0}}else if(n.de==="heliporto"){let s=[[-30,0],[0,0],[30,0],[-15,32],[15,32]],[r,o]=yi(s),a=Math.cos(t.ang),c=Math.sin(t.ang);i=Ze(e,t.x+r*a+o*c,t.z-r*c+o*a,t.ang),i.pousado=!0}else if(n.de==="docas"){let s=t.saidaAgua,r=s;n.nav===2&&(r=yn(2,s.x,s.z)||s),i=Ze(e,r.x+ht(-10,10),r.z+ht(-10,10),t.ang)}else{let s=t.saida||t,r=Gi({x:s.x+ht(-6,6),z:s.z+ht(-6,6)});i=Ze(e,r.x,r.z,x.baseEixo.ang)}return Wt(`${n.icone} ${n.nome} pronto!`,i.x,i.z,"bom"),Kt("ok"),i}var _f=me.focos||["bayside"];function bf(e,t){let n="Miami",i=1/0;for(let s in ze){if(s==="base"||s==="heliporto"||s==="docas"||s==="portaavioes")continue;let r=$e(e,t,ze[s].x,ze[s].z);r<i&&(i=r,n=ze[s].nome)}return n}function O_(){x.focos++;let e,t,n=x.agentes.filter(a=>a.vivo&&!a.zumbi&&!a.dentro&&a.estado!=="morto"&&Ot(a.x,a.z,x.estr.qg.x,x.estr.qg.z)>700);if(x.focos<=4&&ze[_f[x.focos-1]]){let a=ze[_f[x.focos-1]];e=a.x,t=a.z}else if(n.length){let a=yi(n);e=a.x,t=a.z}else return;let i=Math.min(14,3+Math.floor(x.focos*.8)),s=n.sort((a,c)=>$e(a.x,a.z,e,t)-$e(c.x,c.z,e,t)).slice(0,i),r=0;for(let a of s){if(Ot(a.x,a.z,e,t)>250)break;Oo(a,x.dia>=2&&Math.random()<.2?"corredor":"comum"),x.infectados++,r++}for(;r<i;r++){let a=yn(0,e+ht(-20,20),t+ht(-20,20));a&&(zc(a.x,a.z),x.infectados++,x.populacao++)}let o=bf(e,t);(x.swatPendente||(x.swatPendente=[])).push({t:x.tempo+4,x:e,z:t,nome:o}),Wt(x.focos===1?`\u2623\uFE0F Primeiro caso confirmado em ${o}! O surto come\xE7ou.`:`\u2623\uFE0F Novo foco de infec\xE7\xE3o: ${o}`,e,t,"surto"),Kt("alerta")}function k_(){let e=Math.min(30,6+x.dia*4),t,n,i=0;do{i++;let s=Math.random()*4|0,r=Math.random();t=s===0?ht(5,50):s===1?Oe-ht(5,50):r*Oe,n=s===2?ht(5,50):s===3?ke-ht(5,50):r*ke}while((!He(t,n)||Ot(t,n,x.estr.qg.x,x.estr.qg.z)<900)&&i<300);if(!(i>=300)){for(let s=0;s<e;s++){let r=yn(0,t+ht(-30,30),n+ht(-30,30));if(r){let o=zc(r.x,r.z,x.dia>=3&&Math.random()<.06?"bruto":x.dia>=2&&Math.random()<.2?"corredor":"comum");o.estado="ruido";let a=ze[_f[0]];o.destino={x:a.x,z:a.z}}}gf(t,n,bf(t,n)),Wt(`\u{1F9DF} Horda de ${e} zumbis chegando de fora da cidade (${bf(t,n)})`,t,n,"surto"),Kt("alerta")}}function Ap(e){x.tempo+=e,x.quadro++;let t=480;if(x.hora=(x.tempo/t*24+8)%24,x.dia=1+Math.floor((x.tempo/t*24+8)/24),x.noite=x.hora<6||x.hora>=19.5,x.dinheiro+=x.cfgDif.renda*e,x.ruidos=x.ruidos.filter(i=>x.tempo-i.t<3),x.ruidos.length>60&&x.ruidos.splice(0,x.ruidos.length-60),x.tempo>=x.proxFoco&&!x.surtoParado&&(O_(),x.proxFoco=x.tempo+Math.max(35,80-x.focos*6)*x.cfgDif.intervalo),x.dia>=2&&!x.surtoParado&&(x.proxHorda||(x.proxHorda=x.tempo+30),x.tempo>=x.proxHorda&&(k_(),x.proxHorda=x.tempo+Math.max(70,160-x.dia*20)*x.cfgDif.intervalo)),x.swatPendente)for(let i=x.swatPendente.length-1;i>=0;i--){let s=x.swatPendente[i];x.tempo>=s.t&&(x.swatPendente.splice(i,1),gf(s.x,s.z,s.nome))}mp(e),vp(e);let n=x.porta;if(n&&n.vivo&&n.fila.length){let i=n.fila[0];i.t-=e,i.t<=0&&(n.fila.shift(),wp(i.tipo,n))}if(x.resgateAcum&&(!x._ultResg||x.tempo-x._ultResg>2)&&(Wt(`\u2705 ${x.resgateAcum} civis chegaram \xE0 zona segura (+$${x.resgateAcum*40})`,null,null,"bom"),Kt("resgate"),x.resgateAcum=0,x._ultResg=x.tempo),!x.fim&&!x.sandbox&&x.quadro%30===0){let i=Ie.reduce((s,r)=>s+(r.base?0:r.civis),0);x.resgatados>=x.meta?_p(`Voc\xEA resgatou ${x.resgatados} civis. Miami agradece!`):x.focos>=5&&x.nZumbis===0&&x.tempo>300?_p("O surto foi contido: n\xE3o restou nenhum zumbi em Miami!"):x.focos>=2&&x.nCivis===0&&i===0&&Rp("N\xE3o restaram civis para resgatar.")}}function _p(e){x.fim=!0,x.pausado=!0,x.ui&&x.ui.fim(!0,e)}function Rp(e){if(x.sandbox){Wt("Sandbox: "+e+" (o jogo continua)",null,null,"ruim");return}x.fim||(x.fim=!0,x.pausado=!0,x.ui&&x.ui.fim(!1,e))}x.derrota=Rp;function H_(e,t,n=40,i="comum"){let s=0;for(let r=0;r<n;r++){let o=yn(0,e+ht(-25,25),t+ht(-25,25));o&&(zc(o.x,o.z,i==="misto"?Math.random()<.1?"bruto":Math.random()<.3?"corredor":"comum":i),s++)}x.populacao+=s,x.infectados+=s,Wt(`\u{1F9DF} ${s} zumbis criados`,e,t,"surto")}function V_(){let e=0;for(let t of x.agentes)t.zumbi&&t.vivo&&(t.vivo=!1,e++);Wt(`\u{1F9F9} ${e} zumbis removidos`,null,null,"bom")}x.hordaSandbox=H_;x.limparZumbis=V_;var Qt=e=>document.querySelector(e),gs=(e,t,n)=>{let i=document.createElement(e);return t&&(i.className=t),n!==void 0&&(i.innerHTML=n),i},Cp=e=>Math.floor(e).toLocaleString("pt-BR"),$c=class{constructor(t){this.cam=t,this.pings=[],this.raiz=Qt("#ui"),this.ov=Qt("#overlay"),this.ctx=this.ov.getContext("2d"),this.abaProd="quartel",this.montar(),x.ui=this}montar(){this.raiz.innerHTML=`
      <div id="topo">
        <span class="chip" id="t-din">\u{1F4B5} 0</span>
        <span class="chip verde" id="t-res">\u2705 0/0</span>
        <span class="chip" id="t-civ">\u{1F9CD} 0</span>
        <span class="chip verm" id="t-zum">\u{1F9DF} 0</span>
        <span class="chip" id="t-inf">\u2623\uFE0F 0%</span>
        <span class="chip" id="t-hora">\u2600\uFE0F Dia 1 08:00</span>
        <span class="esp"></span>
        <button class="bt" id="b-vel">1x</button>
        <button class="bt" id="b-pausa">\u23F8</button>
        <button class="bt" id="b-menu">\u2699\uFE0F</button>
      </div>
      <div id="alertas"></div>
      <div id="lateral">
        <button class="bt grande" id="b-prod">\u{1F3ED}<small>Produzir</small></button>
        <button class="bt" id="b-caixa">\u2B1A<small>Caixa</small></button>
        <button class="bt" id="b-multi">\u2795<small>V\xE1rias</small></button>
        <button class="bt" id="b-terra">\u{1FA96}<small>Tropas</small></button>
        <button class="bt" id="b-aereo">\u{1F681}<small>A\xE9reos</small></button>
        <button class="bt" id="b-naval">\u2693<small>Navios</small></button>
        <button class="bt" id="b-jato">\u2708\uFE0F<small>Jatos</small></button>
        <button class="bt" id="b-base">\u{1F4CD}<small>Base</small></button>
        <button class="bt" id="b-porta">\u{1F6F3}\uFE0F<small>Porta-av.</small></button>
        <button class="bt" id="b-alerta">\u26A0\uFE0F<small>Alerta</small></button>
        <button class="bt sb oculto" id="b-sb-horda">\u{1F9DF}<small>Horda</small></button>
        <button class="bt sb oculto" id="b-sb-surto">\u2623\uFE0F<small>Surto</small></button>
        <button class="bt sb oculto" id="b-sb-limpar">\u{1F9F9}<small>Limpar</small></button>
      </div>
      <canvas id="mini" width="220" height="128"></canvas>
      <div id="selecao" class="oculto"><div id="sel-info"></div><div id="sel-bts"></div></div>
      <div id="producao" class="oculto">
        <div class="cab"><b>Produ\xE7\xE3o</b><span id="p-din"></span><button class="bt" id="p-fechar">\u2716</button></div>
        <div id="p-abas"></div>
        <div id="p-lista"></div>
        <div id="p-fila"></div>
      </div>
      <div id="info" class="oculto"></div>
      <div id="joy" class="oculto"><div id="joy-bola"></div></div>
      <button class="bt oculto" id="b-sair-controle">\u23CF Sair do controle</button>
      <div id="creditos">Dados do mapa \xA9 Esri e comunidade GIS</div>
    `;let t=(l,u)=>Qt(l).addEventListener("click",f=>{f.stopPropagation(),Hi(),u(f)});t("#b-pausa",()=>{x.pausado=!x.pausado,this.atualizarTopo()}),t("#b-vel",()=>{x.velocidade=x.velocidade>=3?1:x.velocidade+1,Qt("#b-vel").textContent=x.velocidade+"x"}),t("#b-menu",()=>this.menuPausa()),t("#b-prod",()=>this.abrirProducao()),t("#p-fechar",()=>Qt("#producao").classList.add("oculto")),t("#b-caixa",()=>this.modoCaixa(!x.modoCaixa)),t("#b-multi",()=>{x.selecaoMultipla=!x.selecaoMultipla,Qt("#b-multi").classList.toggle("ativo",x.selecaoMultipla)}),t("#b-terra",()=>this.selecionarGrupo(l=>l.classe==="inf"||l.classe==="veic")),t("#b-aereo",()=>this.selecionarGrupo(l=>l.classe==="aereo")),t("#b-naval",()=>this.selecionarGrupo(l=>l.classe==="naval"&&l.tipo!=="portaavioes")),t("#b-jato",()=>this.selecionarGrupo(l=>l.classe==="jato")),t("#b-base",()=>this.cam.irPara(x.estr.qg.x,x.estr.qg.z,450)),t("#b-porta",()=>this.cam.irPara(x.porta.x,x.porta.z,600)),t("#b-sb-horda",()=>x.hordaSandbox(this.cam.alvo.x,this.cam.alvo.z,40,"misto")),t("#b-sb-surto",()=>{x.surtoParado=!x.surtoParado,Qt("#b-sb-surto").classList.toggle("ativo",x.surtoParado),this.alerta(x.surtoParado?"\u23F8 Surto pausado: n\xE3o surgem novos focos nem hordas":"\u25B6 Surto retomado",null,null,"info")}),t("#b-sb-limpar",()=>x.limparZumbis()),t("#b-alerta",()=>{let l=[...x.alertas].reverse().find(u=>u.x!=null);l&&this.cam.irPara(l.x,l.z,Math.min(this.cam.dist,350))}),t("#b-sair-controle",()=>this.controlar(null));let n=Qt("#mini"),i=Eu(10);this.miniFundo=i;let s=l=>{let u=n.getBoundingClientRect(),f=(l.clientX-u.left)/u.width*Oe,d=(l.clientY-u.top)/u.height*ke;this.cam.irPara(f,d)};n.addEventListener("pointerdown",l=>{l.stopPropagation(),s(l),n.setPointerCapture(l.pointerId),n._arr=!0}),n.addEventListener("pointermove",l=>{n._arr&&s(l)}),n.addEventListener("pointerup",()=>{n._arr=!1});let r=Qt("#joy"),o=Qt("#joy-bola"),a=null,c=l=>{let u=r.getBoundingClientRect(),f=(l.clientX-u.left-u.width/2)/(u.width/2),d=(l.clientY-u.top-u.height/2)/(u.height/2),p=Math.hypot(f,d);p>1&&(f/=p,d/=p),x.joyUI={x:f,y:d},o.style.transform=`translate(${f*40}px, ${d*40}px)`};r.addEventListener("pointerdown",l=>{l.stopPropagation(),a=l.pointerId,r.setPointerCapture(a),c(l)}),r.addEventListener("pointermove",l=>{l.pointerId===a&&c(l)});let h=()=>{a=null,x.joyUI=null,o.style.transform=""};r.addEventListener("pointerup",h),r.addEventListener("pointercancel",h);for(let l of["#topo","#lateral","#selecao","#producao","#info","#alertas"])Qt(l).addEventListener("pointerdown",u=>u.stopPropagation())}viajar(t){let n={miami:"Miami",florida:"o Interior da Fl\xF3rida",sf:"S\xE3o Francisco",mexico:"a Cidade do M\xE9xico"},i=this.modal(`<h2>\u{1F6E3}\uFE0F ${t.nome}</h2><p>Pegar a estrada para <b>${n[t.dest]||t.dest}</b>? Uma nova opera\xE7\xE3o come\xE7a l\xE1 (o progresso desta regi\xE3o n\xE3o \xE9 levado).</p>
      <button class="bt grande" data-a="ir">\u{1F699} Viajar</button><button class="bt" data-a="ficar">Ficar aqui</button>`);i.querySelector("[data-a=ir]").onclick=()=>{try{localStorage.setItem("miami-cidade",t.dest)}catch{}location.href=location.pathname+"?cidade="+t.dest},i.querySelector("[data-a=ficar]").onclick=()=>i.remove()}modoSandbox(){for(let t of document.querySelectorAll(".sb"))t.classList.toggle("oculto",!x.sandbox)}ajustarCidade(){if(!We){Qt("#b-naval").classList.add("oculto");let t=Qt("#b-porta");t.innerHTML="\u2708\uFE0F<small>Pista</small>"}}atualizarConstrucao(){let t=Qt("#b-cancela-constr");t||(t=gs("button","bt destaque","\u2716 Cancelar constru\xE7\xE3o"),t.id="b-cancela-constr",t.style.cssText="position:fixed;left:50%;bottom:12px;transform:translateX(-50%);pointer-events:auto",t.addEventListener("pointerdown",n=>n.stopPropagation()),t.addEventListener("click",n=>{n.stopPropagation(),x.construindo=null,this.atualizarConstrucao()}),this.raiz.appendChild(t)),t.classList.toggle("oculto",!x.construindo)}modoCaixa(t){x.modoCaixa=t,Qt("#b-caixa").classList.toggle("ativo",t)}selecionarGrupo(t){if(x.selecao.slice().forEach(n=>Un(n,!1)),x.selecao=x.unidades.filter(n=>n.vivo&&!n.estr&&!n.dentro&&!n.policia&&t(n)),x.selecao.forEach(n=>Un(n,!0)),Kt("clique"),Xc(),this.atualizarSelecao(),x.selecao.length){let n=0,i=0;for(let s of x.selecao)n+=s.x,i+=s.z;x.selecao.length===1&&x.selecao[0].classe!=="jato"&&this.cam.irPara(n/x.selecao.length,i/x.selecao.length)}}atualizarTopo(){Qt("#t-din").textContent="\u{1F4B5} $"+Cp(x.dinheiro),Qt("#t-res").textContent=`\u2705 ${x.resgatados}/${x.meta===1/0?"\u221E":x.meta}`;let t=this._presos||0;Qt("#t-civ").textContent=`\u{1F9CD} ${x.nCivis||0}`+(t?` +${t}\u{1F3E2}`:""),Qt("#t-zum").textContent=`\u{1F9DF} ${x.nZumbis||0}`;let n=x.populacao?Math.round(x.infectados/x.populacao*100):0;Qt("#t-inf").textContent=`\u2623\uFE0F ${n}%`;let i=Math.floor(x.hora||8),s=Math.floor((x.hora||8)%1*60);Qt("#t-hora").textContent=`${x.noite?"\u{1F319}":"\u2600\uFE0F"} Dia ${x.dia||1} ${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`,Qt("#b-pausa").textContent=x.pausado?"\u25B6":"\u23F8",Qt("#producao").classList.contains("oculto")||this.atualizarProducao()}alerta(t,n,i,s){let r=Qt("#alertas");if(!r)return;let o=gs("div","alerta "+s,t);for(n!=null&&(o.classList.add("clicavel"),o.addEventListener("click",a=>{a.stopPropagation(),this.cam.irPara(n,i,Math.min(this.cam.dist,350))})),r.prepend(o);r.children.length>4;)r.lastChild.remove();setTimeout(()=>{o.classList.add("saindo"),setTimeout(()=>o.remove(),600)},s==="surto"?9e3:5500)}ping(t,n,i){this.pings.push({x:t,z:n,tipo:i,t:0})}atualizarSelecao(){let t=x.selecao.filter(a=>a.vivo&&!a.dentro);x.selecao=t;let n=Qt("#selecao");if(!t.length){n.classList.add("oculto");return}n.classList.remove("oculto");let i={};for(let a of t)i[a.tipo]=(i[a.tipo]||0)+1;let s=Object.entries(i).map(([a,c])=>`<span class="tag">${Zn[a].icone} ${c>1?c+"\xD7 ":""}${Zn[a].nome}</span>`).join("");if(t.length===1){let a=t[0];if(s+=`<div class="sub">${a.d.sub||""}</div><div class="barra"><i style="width:${Math.max(0,a.hp/a.hpMax*100)}%"></i></div>`,a.d.carga){let c=a.passageiros.filter(l=>l.agente).length,h=a.passageiros.length-c;s+=`<div class="sub">Carga: ${a.cargaUsada}/${a.d.carga} \u2022 ${h} militares, ${c} civis</div>`}a.predio&&(s+=`<div class="sub">No telhado (${a.predio.guarnicao.length}/${a.predio.cap}) \u2022 estrutura ${Math.round(a.predio.integridade)}</div>`),a.classe==="jato"&&(s+=`<div class="sub">${{pronto:"Pronto para decolar",decolando:"Decolando",voando:"Em miss\xE3o",voltando:"Voltando para a base",aproximando:"Aproxima\xE7\xE3o para pouso",pousando:"Pousando",rearmando:"Rearmando..."}[a.estadoJato]} \u2022 muni\xE7\xE3o ${a.municao}/${a.d.municao}</div>`)}Qt("#sel-info").innerHTML=s;let r=Qt("#sel-bts");r.innerHTML="";let o=(a,c,h="")=>{let l=gs("button","bt "+h,a);l.addEventListener("click",u=>{u.stopPropagation(),Hi(),Kt("clique"),c(),this.atualizarSelecao()}),r.appendChild(l)};o("\u{1F6D1} Parar",()=>{for(let a of t)a.ordem=null,a.caminho=null,a.alvo=null,a.classe==="aereo"&&(a.altAlvo=Math.max(a.y,a.d.altCruz*.6))}),t.some(a=>a.passageiros&&a.passageiros.length)&&o("\u2B07\uFE0F Desembarcar",()=>{for(let a of t)a.passageiros&&a.passageiros.length&&Vi(a)}),t.some(a=>a.classe==="aereo"&&a.passageiros.some(c=>!c.agente))&&o(x.modoCorda?"\u{1FAA2} Toque no destino...":"\u{1FAA2} Descer de corda",()=>{x.modoCorda=!x.modoCorda,x.modoCorda&&this.alerta("\u{1FAA2} Toque no ch\xE3o ou num telhado: o helic\xF3ptero vai at\xE9 l\xE1 e os soldados descem de corda",null,null,"info")},x.modoCorda?"ativo":"destaque"),t.some(a=>a.classe==="aereo")&&o("\u{1F6EC} Pousar",()=>{for(let a of t)a.classe==="aereo"&&(a.ordem={tipo:"pousar"})}),t.some(a=>a.predio)&&o("\u{1F3C3} Sair do pr\xE9dio",()=>{for(let a of t)a.predio&&Go(a)}),t.some(a=>a.classe==="jato")&&o(x.modoArea?"\u{1F3AF} \xC1rea: LIGADA":"\u{1F3AF} Marcar \xE1rea",()=>{x.modoArea=!x.modoArea},x.modoArea?"ativo":""),t.some(a=>a.classe==="jato")&&o("\u{1F6F3}\uFE0F Voltar",()=>{for(let a of t)a.classe==="jato"&&a.estadoJato==="voando"&&(a.estadoJato="voltando")}),t.length===1&&t[0].classe!=="jato"&&o("\u{1F3AE} Controlar",()=>this.controlar(t[0]),"destaque"),o("\u{1F3A5} Seguir",()=>{this.cam.seguir=t[0],this.cam.dist>300&&(this.cam.dist=t[0].classe==="inf"?60:150)}),o("\u2716",()=>{t.forEach(a=>Un(a,!1)),x.selecao=[],x.modoArea=!1})}controlar(t){x.controlando&&(x.controlando.ordem=null),x.controlando=t,Qt("#joy").classList.toggle("oculto",!t),Qt("#b-sair-controle").classList.toggle("oculto",!t),Qt("#lateral").classList.toggle("oculto",!!t),Qt("#mini").classList.toggle("oculto",!!t),Qt("#selecao").classList.toggle("escondida",!!t),t?(this.cam.seguir=t,this.cam.dist=t.classe==="inf"?22:t.classe==="aereo"?90:t.classe==="naval"?t.d.raio>20?400:90:45,this.cam.inclExtra=-.1):this.cam.inclExtra=0}abrirProducao(t){t&&(this.abaProd=t),!Ac[this.abaProd]&&this.abaProd!=="construir"&&(this.abaProd="quartel"),Qt("#producao").classList.remove("oculto");let n=Qt("#p-abas");n.innerHTML="";for(let s of["construir",...Object.keys(Ac)]){if(!We&&(s==="docas"||s==="porta")||We&&s==="pista"&&!x.unidades.some(o=>o.vivo&&o.tipoEstr==="pista"))continue;let r=gs("button","aba"+(s===this.abaProd?" ativo":""),s==="construir"?"\u{1F528} Construir":s==="porta"&&!We?"\u2708\uFE0F Aer\xF3dromo":X0[s]);r.addEventListener("click",o=>{o.stopPropagation(),this.abaProd=s,this.abrirProducao()}),n.appendChild(r)}let i=Qt("#p-lista");if(i.innerHTML="",this.abaProd==="construir"){for(let s in Do){let r=Do[s];if(r.agua&&!We)continue;let o=gs("div","carta"+(x.construindo===s?" sel":""),`<div class="ic">${r.icone}</div><div class="tx"><b>${r.nome}</b><small>${r.sub}</small><span>$${r.custo} \u2022 ${r.tempo}s</span></div>`);o.dataset.custo=r.custo,o.addEventListener("click",a=>{if(a.stopPropagation(),Hi(),x.dinheiro<r.custo){Kt("erro");return}x.construindo=s,Qt("#producao").classList.add("oculto"),this.alerta(`\u{1F528} Toque no mapa onde quer construir: ${r.nome}${r.agua?" (na beira da \xE1gua)":""}. Toque em \u2716 para cancelar.`,null,null,"info"),this.atualizarConstrucao()}),i.appendChild(o)}Qt("#p-fila").innerHTML="<i>Escolha a estrutura e toque no mapa. Bases novas produzem unidades e as zonas seguras/FOB recebem civis.</i>",Qt("#p-fila")._chave=null;return}for(let s of Ac[this.abaProd]){let r=Zn[s],o=gs("div","carta",`<div class="ic">${r.icone}</div><div class="tx"><b>${r.nome}</b><small>${r.sub}</small><span>$${r.custo} \u2022 ${r.tempo}s</span></div>`);o.dataset.custo=r.custo,o.addEventListener("click",a=>{a.stopPropagation(),Hi(),qc(s,this.abaProd)&&this.atualizarProducao()}),i.appendChild(o)}this.atualizarProducao()}atualizarProducao(){Qt("#p-din").textContent=" \u{1F4B5} $"+Cp(x.dinheiro);for(let s of document.querySelectorAll("#p-lista .carta"))s.classList.toggle("caro",x.dinheiro<+s.dataset.custo);if(this.abaProd==="construir")return;let t=Yo(this.abaProd),n=Qt("#p-fila");if(!t||!t.vivo){n.innerHTML="<i>Estrutura destru\xEDda</i>";return}let i=t.fila.map(s=>s.tipo).join(",");n._chave!==i&&(n._chave=i,n.innerHTML=t.fila.length?"":"<i>Fila vazia \u2014 toque numa unidade para produzir</i>",t.fila.forEach((s,r)=>{let o=gs("div","item",`${Zn[s.tipo].icone}<i></i>`);o.title="Cancelar",o.addEventListener("click",a=>{a.stopPropagation(),Tp(this.abaProd,r),this.atualizarProducao()}),n.appendChild(o)})),t.fila.forEach((s,r)=>{let o=n.children[r];o&&o.querySelector("i")&&(o.querySelector("i").style.width=100-s.t/s.total*100+"%")})}infoPredio(t){let n=Qt("#info");n.classList.remove("oculto");let i=t.base?"Pr\xE9dio da base":t.h>60?"Arranha-c\xE9u":t.h>15?"Pr\xE9dio":"Casa / loja";n.innerHTML=`<b>\u{1F3E2} ${i}</b> \u2022 ${Math.round(t.h)} m de altura<br>
      Soldados no telhado: ${t.guarnicao.length}/${t.cap}<br>
      ${t.civis?t.sos?`\u{1F198} <b>${t.civis} civis presos</b> pedindo socorro!`:`\u{1F3E0} ${t.civis} civis abrigados`:"Sem civis"}<br>
      <small>Selecione soldados e toque no pr\xE9dio para coloc\xE1-los no telhado. Com civis dentro, as tropas os resgatam; helic\xF3pteros pegam pelo telhado.</small>`,clearTimeout(this._tInfo),this._tInfo=setTimeout(()=>n.classList.add("oculto"),6e3)}desenharMini(){let t=Qt("#mini"),n=t.getContext("2d"),i=t.width/Oe,s=t.height/ke;n.drawImage(this.miniFundo,0,0,t.width,t.height),n.fillStyle="#ff3b3b";for(let o of x.agentes)o.vivo&&o.zumbi&&!o.dentro&&o.estado!=="morto"&&n.fillRect(o.x*i-.5,o.z*s-.5,1.6,1.6);n.fillStyle="#ffffff";for(let o of x.agentes)o.vivo&&!o.zumbi&&!o.dentro&&o.estado!=="morto"&&n.fillRect(o.x*i-.5,o.z*s-.5,1.2,1.2);for(let o of Ie)o.civis>0&&(n.fillStyle=o.sos?"#ffd23b":"#5bc0ff",n.fillRect(o.cx*i-1.5,o.cz*s-1.5,3,3));for(let o of x.saidas||[])n.fillStyle="#2ecc71",n.fillRect(o.x*i-2.5,o.z*s-2.5,5,5);for(let o of x.acampamentos||[])o.ativo&&(n.fillStyle=o.policia?"#3c5cff":"#ff9a2e",n.beginPath(),n.arc(o.x*i,o.z*s,3,0,6.29),n.fill());for(let o of x.unidades){if(!o.vivo||o.dentro)continue;n.fillStyle=o.estr?"#7ad1ff":o.policia?"#ffe14d":o.sel?"#7dff8a":"#3b8bff";let a=o.tipo==="portaavioes"?3.5:o.estr?2.5:2;n.fillRect(o.x*i-a/2,o.z*s-a/2,a,a)}let r=[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([o,a])=>this.cam.chao(o,a));r.every(o=>o)&&(n.strokeStyle="rgba(255,255,255,0.8)",n.lineWidth=1,n.beginPath(),r.forEach((o,a)=>(a?n.lineTo:n.moveTo).call(n,o.x*i,o.z*s)),n.closePath(),n.stroke())}desenharOverlay(t){var h;let n=innerWidth,i=innerHeight,s=((h=x.cfg.qualidade)!=null?h:1)===0?1:Math.min(1.5,devicePixelRatio||1);this.ov.width!==Math.round(n*s)&&(this.ov.width=Math.round(n*s),this.ov.height=Math.round(i*s));let r=this.ctx;r.setTransform(s,0,0,s,0,0),r.clearRect(0,0,n,i);let o=this.cam.cam,a=this.cam.dist>900;if(x.longe=a,a){for(let l of x.agentes){if(!l.vivo||l.dentro||l.estado==="morto")continue;let u=an(l.x,0,l.z,o);!u||u.x<0||u.y<0||u.x>n||u.y>i||(r.fillStyle=l.zumbi?"#ff2a2a":"#ffffff",r.fillRect(u.x-1.5,u.y-1.5,3,3))}for(let l of x.unidades){if(!l.vivo||l.dentro||l.estr)continue;let u=an(l.x,l.y,l.z,o);u&&(r.fillStyle=l.policia?"#ffe14d":l.sel?"#5dff6f":"#3d8bff",r.strokeStyle="#001b44",r.beginPath(),r.arc(u.x,u.y,l.classe==="inf"?3:5,0,6.29),r.fill(),r.stroke())}}r.textAlign="center",r.textBaseline="middle";for(let l of Ie){if(!(l.civis>0||l.guarnicao.length))continue;let u=an(l.cx,l.h+4,l.cz,o);if(!u||u.x<-40||u.y<-40||u.x>n+40||u.y>i+40)continue;let f=u.y;if(l.civis>0){let d=l.sos?Math.sin(performance.now()/250)>0?"#ff3030":"#ffd23b":"#2e8bd8";r.fillStyle=d,Yc(r,u.x-26,f-11,52,20,6),r.fill(),r.fillStyle="#fff",r.font="bold 12px sans-serif",r.fillText((l.sos?"SOS ":"\u{1F3E0} ")+l.civis,u.x,f),f-=24}if(l.guarnicao.length){r.fillStyle="rgba(20,70,20,0.85)",Yc(r,u.x-24,f-10,48,18,5),r.fill(),r.fillStyle="#bfffbf",r.font="bold 11px sans-serif",r.fillText("\u{1FA96} "+l.guarnicao.length+"/"+l.cap,u.x,f-1);let d=l.integridade/l.integMax;r.fillStyle="#300",r.fillRect(u.x-22,f+6,44,3),r.fillStyle=d>.5?"#4f4":d>.2?"#fd3":"#f33",r.fillRect(u.x-22,f+6,44*d,3)}}for(let l of x.saidas||[]){let u=an(l.x,9,l.z,o);if(!u||u.x<-60||u.y<-40||u.x>n+60||u.y>i+40||this.cam.dist>2500)continue;r.font="bold 11px sans-serif";let f=r.measureText(l.nome).width+26;r.fillStyle="rgba(25,100,55,0.95)",Yc(r,u.x-f/2,u.y-11,f,20,5),r.fill(),r.fillStyle="#fff",r.fillText("\u{1F6E3}\uFE0F "+l.nome,u.x,u.y)}for(let l of x.acampamentos||[]){if(!l.ativo)continue;let u=an(l.x,6,l.z,o);if(!u||u.x<-40||u.y<-40||u.x>n+40||u.y>i+40)continue;let f=l.membros.filter(d=>d.armado).length;r.fillStyle=l.policia?"rgba(40,70,200,0.9)":"rgba(210,120,30,0.92)",Yc(r,u.x-44,u.y-11,88,20,6),r.fill(),r.fillStyle="#fff",r.font="bold 11px sans-serif",r.fillText(`${l.policia?"\u{1F694}":"\u{1F3D5}\uFE0F"} ${l.membros.length} (${f}\u{1F52B})`,u.x,u.y)}for(let l of x.unidades){if(!l.vivo||l.dentro||!(l.sel||l.hp<l.hpMax*.98)||a&&!l.sel)continue;let u=l.classe==="inf"?2.3:l.estr?22:(l.d.raio||2)*.9+2,f=an(l.x,l.y+u,l.z,o);if(!f)continue;let d=l.estr?60:l.classe==="inf"?18:34,p=Math.max(0,l.hp/l.hpMax);r.fillStyle="rgba(0,0,0,0.6)",r.fillRect(f.x-d/2-1,f.y-1,d+2,5),r.fillStyle=p>.6?"#46e05a":p>.3?"#f2d43a":"#ef3b3b",r.fillRect(f.x-d/2,f.y,d*p,3),l.sel&&l.classe==="inf"&&(r.strokeStyle="#5dff6f",r.lineWidth=1.5,r.beginPath(),r.arc(f.x,f.y+14,9,0,6.29),r.stroke()),l.d.carga&&l.passageiros.length&&(r.fillStyle="#fff",r.font="10px sans-serif",r.fillText(`${l.passageiros.length}\u{1F464}`,f.x,f.y-8))}for(let l=this.pings.length-1;l>=0;l--){let u=this.pings[l];if(u.t+=t,u.t>.8){this.pings.splice(l,1);continue}let f=an(u.x,.5,u.z,o);if(!f)continue;let d={mover:"#5dff6f",atacar:"#ff4040",embarque:"#5bc0ff",guarnecer:"#ffd23b",resgate:"#ffd23b"}[u.tipo]||"#fff";r.strokeStyle=d,r.lineWidth=2.5,r.globalAlpha=1-u.t/.8,r.beginPath(),r.arc(f.x,f.y,6+u.t*30,0,6.29),r.stroke(),r.globalAlpha=1}let c=[];if(x.area&&c.push({...x.area,w:Math.max(40,Math.min(160,Math.hypot(x.area.x1-x.area.x0,x.area.z1-x.area.z0)*.35)),alfa:1}),x.areaMarcada){let l=(performance.now()-x.areaMarcada.t)/1e3;l<6?c.push({...x.areaMarcada,alfa:1-l/6}):x.areaMarcada=null}for(let l of c){let u=Math.hypot(l.x1-l.x0,l.z1-l.z0)||1,f=(l.x1-l.x0)/u,d=(l.z1-l.z0)/u,p=-d*l.w/2,v=f*l.w/2,m=[[l.x0+p,l.z0+v],[l.x1+p,l.z1+v],[l.x1-p,l.z1-v],[l.x0-p,l.z0-v]].map(([y,b])=>an(y,.5,b,o));if(m.some(y=>!y))continue;r.globalAlpha=l.alfa,r.fillStyle="rgba(255,40,40,0.22)",r.strokeStyle="#ff3b3b",r.lineWidth=2.5,r.setLineDash([10,6]),r.beginPath(),m.forEach((y,b)=>(b?r.lineTo:r.moveTo).call(r,y.x,y.y)),r.closePath(),r.fill(),r.stroke(),r.setLineDash([]);let g=an(l.x0,.5,l.z0,o),_=an(l.x1,.5,l.z1,o);g&&_&&(r.beginPath(),r.moveTo(g.x,g.y),r.lineTo(_.x,_.y),r.stroke(),r.fillStyle="#ff3b3b",r.font="bold 13px sans-serif",r.fillText("\u{1F3AF} BOMBARDEIO",(g.x+_.x)/2,(g.y+_.y)/2-10)),r.globalAlpha=1}if(x.caixa){let l=x.caixa;r.strokeStyle="#5dff6f",r.lineWidth=1.5,r.fillStyle="rgba(93,255,111,0.12)",r.fillRect(Math.min(l.x0,l.x1),Math.min(l.y0,l.y1),Math.abs(l.x1-l.x0),Math.abs(l.y1-l.y0)),r.strokeRect(Math.min(l.x0,l.x1),Math.min(l.y0,l.y1),Math.abs(l.x1-l.x0),Math.abs(l.y1-l.y0))}}menuPausa(){x.pausado=!0,this.atualizarTopo();let t=this.modal(`<h2>Pausado</h2>
      <button class="bt grande" data-a="voltar">\u25B6 Continuar</button>
      <button class="bt" data-a="ajuda">\u2753 Como jogar</button>
      <label><input type="checkbox" data-a="som" ${x.cfg.som?"checked":""}> \u{1F50A} Som</label>
      <button class="bt" data-a="nova">\u{1F504} Nova partida</button>`);t.querySelector("[data-a=voltar]").onclick=()=>{t.remove(),x.pausado=!1,this.atualizarTopo()},t.querySelector("[data-a=ajuda]").onclick=()=>this.ajuda(),t.querySelector("[data-a=som]").onchange=n=>{x.cfg.som=n.target.checked,Fo(n.target.checked),x.salvarCfg()},t.querySelector("[data-a=nova]").onclick=()=>location.reload()}ajuda(){let t=this.modal(`<h2>Como jogar</h2><div class="ajuda">${G_}</div><button class="bt grande" data-a="ok">Entendi</button>`);t.querySelector("[data-a=ok]").onclick=()=>t.remove()}modal(t){let n=gs("div","modal",`<div class="caixa">${t}</div>`);return n.addEventListener("pointerdown",i=>i.stopPropagation()),document.body.appendChild(n),n}fim(t,n){let i=Math.floor(x.tempo/60),s=this.modal(`<h2>${t?"\u{1F3C6} Vit\xF3ria!":"\u2620\uFE0F Derrota"}</h2><p>${n}</p>
      <div class="stats">\u2705 Civis resgatados: <b>${x.resgatados}</b><br>\u{1F9DF} Zumbis eliminados: <b>${x.zumbisMortos}</b><br>
      \u2623\uFE0F Pessoas infectadas: <b>${x.infectados}</b><br>\u{1F480} Civis mortos: <b>${x.civisMortos}</b><br>\u{1FA96} Unidades perdidas: <b>${x.perdas}</b><br>\u23F1\uFE0F Tempo: <b>${i} min</b> (dia ${x.dia})</div>
      ${t?'<button class="bt grande" data-a="cont">Continuar jogando</button>':""}
      <button class="bt grande" data-a="nova">\u{1F504} Nova partida</button>`),r=s.querySelector("[data-a=cont]");r&&(r.onclick=()=>{s.remove(),x.pausado=!1,x.meta=99999,this.atualizarTopo()}),s.querySelector("[data-a=nova]").onclick=()=>location.reload()}quadro(t){this._t=(this._t||0)+t,this._tm=(this._tm||0)+t,this._t>.25&&(this._t=0,this._presos=Ie.reduce((n,i)=>n+(i.base?0:i.civis),0),this.atualizarTopo(),x.selecao.length&&this.atualizarSelecaoLeve()),this._tm>.5&&(this._tm=0,this.desenharMini()),this.desenharOverlay(t)}atualizarSelecaoLeve(){this._ts=(this._ts||0)+1,this._ts%4===0&&this.atualizarSelecao()}};function Yc(e,t,n,i,s,r){e.beginPath(),e.moveTo(t+r,n),e.arcTo(t+i,n,t+i,n+s,r),e.arcTo(t+i,n+s,t,n+s,r),e.arcTo(t,n+s,t,n,r),e.arcTo(t,n,t+i,n,r),e.closePath()}var G_=`
<p><b>\u{1F33E} Interior da Fl\xF3rida:</b> Homestead, Florida City, as fazendas de Redland e a borda dos Everglades (mata, p\xE2ntano e canais com pontes), com a sua base na Homestead Air Reserve Base. Em Miami, toque nas placas verdes das rodovias (US-41, US-1, SR-836) nas bordas do mapa para viajar ao interior; l\xE1, as placas da US-1 e da Turnpike levam de volta a Miami.</p>
<p><b>Cidades:</b> no menu inicial escolha <b>Miami</b>, <b>S\xE3o Francisco</b> (base naval em Treasure Island, porta-avi\xF5es na ba\xEDa) ou a <b>Cidade do M\xE9xico</b> (base no Bosque de Chapultepec; sem mar, os jatos saem de uma pista de pouso).</p>
<p><b>\u{1F528} Construir:</b> no painel \u{1F3ED} Produzir, aba Construir: escolha posto avan\xE7ado (FOB), quartel, p\xE1tio, heliporto, docas, zona segura, torre ou barreira e toque no mapa. Bases novas produzem unidades perto da frente de batalha, e FOB/zonas seguras recebem civis.</p>
<p><b>Objetivo:</b> um surto zumbi come\xE7ou em Miami e se espalha aos poucos. Resgate os civis e leve-os para a <b>Zona Segura</b> da base (no Porto de Miami) ou para o <b>porta-avi\xF5es</b>. Se o Quartel-General cair, voc\xEA perde.</p>
<p><b>C\xE2mera:</b> arraste com um dedo para mover \u2022 pin\xE7a com dois dedos para zoom \u2022 gire os dois dedos para rodar \u2022 arraste dois dedos para cima/baixo para inclinar. No PC: arraste, roda do mouse, bot\xE3o direito gira, WASD e Q/E.</p>
<p><b>Selecionar:</b> toque numa unidade. Toque duplo seleciona todas do mesmo tipo na tela. Segure o dedo parado e arraste para selecionar em caixa (ou use \u2B1A Caixa). \u2795 V\xE1rias soma unidades \xE0 sele\xE7\xE3o. Os bot\xF5es \u{1FA96} \u{1F681} \u2693 \u2708\uFE0F selecionam grupos.</p>
<p><b>Ordens</b> (com unidades selecionadas): toque no ch\xE3o para mover \u2022 num zumbi para atacar \u2022 num <b>pr\xE9dio</b> para p\xF4r os soldados no telhado (atiram de cima com mais alcance) \u2022 num pr\xE9dio com <b>SOS</b> para resgatar os civis presos (helic\xF3pteros pegam pelo telhado) \u2022 num <b>ve\xEDculo, helic\xF3ptero ou barco</b> para embarcar as tropas \u2022 com aeronaves selecionadas, toque no porta-avi\xF5es para pousar no conv\xE9s.</p>
<p><b>Civis</b> seguem soldados e ve\xEDculos que chegam perto e entram sozinhos em transportes. Leve-os para a zona segura: ao chegar l\xE1, s\xE3o resgatados (+$40 cada). Civis que acenam viram voc\xEA ao longe.</p>
<p><b>Produ\xE7\xE3o:</b> \u{1F3ED} Produzir abre o Quartel (infantaria), o P\xE1tio (Humvee, Stryker, Bradley, Abrams, Paladin, HIMARS, ambul\xE2ncia), o Heliporto (Black Hawk, Chinook, Apache, drone Reaper), as Docas (lancha, hovercraft LCAC, destr\xF3ier) e o porta-avi\xF5es (F-35, F/A-18, Osprey).</p>
<p><b>\u2708\uFE0F Jatos:</b> F-35C e F/A-18E saem do porta-avi\xF5es pela catapulta; F-22 Raptor e A-10 Warthog precisam de uma <b>Pista de Pouso</b> (\u{1F528} Construir; na Cidade do M\xE9xico ela j\xE1 existe). Eles decolam, atacam, voltam alinhados com a pista e pousam para rearmar. O A-10 metralha com o canh\xE3o de 30 mm ao longo da faixa.  selecione os jatos (toque num jato ou no bot\xE3o \u2708\uFE0F) e <b>arraste o dedo no mapa</b> para marcar a \xE1rea de bombardeio: eles decolam do porta-avi\xF5es, fazem passadas soltando bombas ao longo da faixa e voltam para rearmar. Um toque simples ataca um ponto.</p>
<p><b>Pr\xE9dios:</b> metade dos soldados fica nas janelas (quebram o vidro e atiram para fora) e metade no telhado.</p>
<p><b>\u{1F693} Pol\xEDcia SWAT:</b> quando o v\xEDrus aparece, equipes da SWAT de Miami saem das delegacias sozinhas num blindado BearCat, combatem os zumbis e levam civis para a zona segura. Voc\xEA n\xE3o controla a pol\xEDcia.</p>
<p><b>\u{1F3AE} Controlar:</b> com uma unidade selecionada, assuma o controle em 3\xAA pessoa com o joystick; ela atira sozinha nos zumbis.</p>
<p><b>\u{1FAA2} Descer de corda:</b> com um Black Hawk, Chinook ou Osprey levando soldados selecionado, toque em <b>\u{1FAA2} Descer de corda</b> e depois no ch\xE3o ou num telhado. O helic\xF3ptero vai at\xE9 l\xE1, fica parado no ar e os soldados descem pelas cordas; num telhado, eles ocupam o pr\xE9dio.</p>
<p><b>\u267E\uFE0F Sandbox:</b> no menu inicial, dinheiro infinito, produ\xE7\xE3o e constru\xE7\xE3o r\xE1pidas e sem derrota. Na barra lateral: \u{1F9DF} Horda (cria zumbis onde a c\xE2mera est\xE1), \u2623\uFE0F Surto (pausa os novos focos) e \u{1F9F9} Limpar (remove todos os zumbis).</p>
<p><b>\u{1F3D5}\uFE0F Sobreviventes:</b> civis que ningu\xE9m resgata se juntam, acham armas e montam acampamentos com barricadas (marcador laranja). Eles se defendem sozinhos. Leve tropas ou um ve\xEDculo at\xE9 o acampamento e eles aceitam o resgate. Se a cidade ficar muito infectada, a pol\xEDcia e a SWAT desistem e viram sobreviventes tamb\xE9m (marcador azul).</p>
<p><b>Dicas:</b> tiros e explos\xF5es fazem barulho e atraem zumbis. \xC0 noite eles ficam mais r\xE1pidos. A partir do dia 2 chegam hordas do continente e aparecem zumbis corredores; no dia 3, brutamontes. Cuidado com o fogo amigo de artilharia perto de civis.</p>`;var fi=e=>document.querySelector(e),Zc=e=>{let t=fi("#carregando-txt");t&&(t.textContent=e)};function W_(){try{Object.assign(x.cfg,JSON.parse(localStorage.getItem("miami-cfg")||"{}"))}catch{}if(x.cfg.qualidade===void 0){let e=/Android|iPhone|iPad|Mobile|MiamiZumbiAPK/i.test(navigator.userAgent)||navigator.deviceMemory&&navigator.deviceMemory<=4;x.cfg.qualidade=e?0:1}}x.salvarCfg=()=>{try{localStorage.setItem("miami-cfg",JSON.stringify(x.cfg))}catch{}};var Mf=new Vt(11128808),X_=new Vt(15774330),q_=new Vt(858160),Pp=[.78,.86,.66];async function Y_(){var I;W_(),Zc("Preparando o mapa de Miami..."),await new Promise(L=>setTimeout(L,30));let e=(I=x.cfg.qualidade)!=null?I:1;_u(e);let t=new Va({antialias:e>=2,powerPreference:"high-performance",stencil:!1}),n=e===0?Math.min(1,devicePixelRatio)*.7:Math.min(e===1?1.25:2,devicePixelRatio),i=1;t.setPixelRatio(n),t.setSize(innerWidth,innerHeight),t.outputColorSpace=Ue,t.toneMapping=cu,t.toneMappingExposure=1.05,t.shadowMap.enabled=e>=1,t.shadowMap.autoUpdate=!1,t.shadowMap.type=au,fi("#jogo").appendChild(t.domElement);let s=new Pr;s.background=Mf.clone(),s.fog=new Ga(Mf.clone(),2500,11e3);let r=new gn(50,innerWidth/innerHeight,1,15e3);x.cena=s,x.camera=r,x.renderer=t;let o=new nc(13624319,6116422,1.1);s.add(o);let a=new ic(16773336,3.2);a.position.set(-.5,1,.35),a.castShadow=e>=1,a.shadow.mapSize.set(e>=2?2048:1024,e>=2?2048:1024),a.shadow.bias=-4e-4,a.shadow.normalBias=.6,a.shadow.camera.near=10,a.shadow.camera.far=6e3,s.add(a),s.add(a.target),x.sol=a,Zc("Lendo pr\xE9dios e ruas (dados de sat\xE9lite)..."),await new Promise(L=>setTimeout(L,20)),bp(),Zc("Construindo a cidade em 3D..."),await new Promise(L=>setTimeout(L,20)),Mp(),I0(t,s),x.bonecos=new Sc(s),x.efeitos=new wc(s),x.hashA=new Ro(16,Oe,ke,4096),x.hashU=new Ro(24,Oe,ke,1024);let c=new Wc(r);x.cam=c;let h=ze[(me.focos||[])[0]]||ze.base;c.irPara(h.x,h.z,1400),c.yaw=.6,fp(t.domElement,c);let l=new $c(c);l.ajustarCidade(),Fo(x.cfg.som!==!1),addEventListener("resize",()=>{t.setSize(innerWidth,innerHeight),r.aspect=innerWidth/innerHeight,r.updateProjectionMatrix()}),window.androidBack=()=>{let L=document.querySelector(".modal");if(!(L&&!fi("#menu").classList.contains("oculto"))){if(L){L.remove(),x.pausado=!1;return}if(x.controlando){l.controlar(null);return}l.menuPausa()}};let u=new Is,f=new re,d=new N,p=performance.now(),v=e===0?450:e===1?700:900;function m(L,U){if(x.longe)return!1;d.set(L,1,U);let D=L-r.position.x,W=U-r.position.z;return D*D+W*W>v*v?!1:u.containsPoint(d)}function g(L){x.orcamentoCaminhos=e===0?1:2,x.limiteCaminho=e===0?12e3:3e4,x.hashA.limpar();for(let U of x.agentes)U.vivo&&!U.dentro&&U.estado!=="morto"&&x.hashA.add(U);x.hashU.limpar();for(let U of x.unidades)U.vivo&&!U.dentro&&x.hashU.add(U);Ap(L),rp(L),K0(L),sp(L)}function _(L){var j;let U=(j=x.hora)!=null?j:8,D;U>=6.5&&U<=18?D=1:U>18&&U<20?D=1-(U-18)/2*.72:U>5&&U<6.5?D=.28+(U-5)/1.5*.72:D=.28;let W=U>17&&U<20?1-Math.abs(U-18.7)/1.5:U>5&&U<7.5?1-Math.abs(U-6.2)/1.3:0,H=s.background;H.copy(q_).lerp(Mf,(D-.28)/.72),W>0&&H.lerp(X_,Math.max(0,W)*.55),s.fog.color.copy(H),a.intensity=3.2*Math.max(.12,D-.1)+(D<.5?.25:0),o.intensity=.35+.8*D;let nt=(U-6)/12*Math.PI,V=U>=6&&U<=18.5,Z=V?.35+.65*Math.max(0,Math.sin(nt)):.9;x.dirSol={x:V?-Math.cos(nt)*.9:.4,y:Z,z:.45},a.color.setHex(W>.3?16758900:D<.5?9414399:16773336),x.agua.userData.tempo.value+=L;let J=Math.max(0,Math.min(1,(.85-D)/.5));for(let ft in Oi)Oi[ft].emissiveIntensity=J*.9}let y=16,b=0,R=0;function w(L){if(requestAnimationFrame(w),e===0&&L-p<30)return;let U=L-p,D=Math.min(.05,U/1e3);if(p=L,R++,y=y*.95+Math.min(200,U)*.05,x.iniciado&&++b>90){b=0;let B=e===0?40:24,st=i;y>B*1.25&&i>.55?st=i-.1:y<B*.75&&i<1&&(st=Math.min(1,i+.1)),st!==i&&(i=st,t.setPixelRatio(n*i))}let W=e>=1&&c.dist<(e>=2?1400:800);t.shadowMap.needsUpdate=W&&R%2===0,x.teclado&&x.teclado(D);let H=x.joyUI||(x.joyTeclado?{x:x.joyTeclado.x,y:x.joyTeclado.z}:null);if(H){let B=Math.sin(c.yaw),st=Math.cos(c.yaw);x.joy={x:st*H.x+B*H.y,z:-B*H.x+st*H.y}}else x.joy=null;let nt=performance.now();if(!x.pausado&&x.iniciado)for(let B=0;B<x.velocidade;B++)g(D);let V=performance.now();if(x.perfSim=(x.perfSim||0)*.95+(V-nt)*.05,c.aplicar(D),x.dirSol){let B=Math.min(2200,Math.max(70,c.dist*1.25)),st=a.shadow.camera;Math.abs(st.right-B)>B*.1&&(st.left=-B,st.right=B,st.top=B,st.bottom=-B,st.updateProjectionMatrix());let tt=2*B/a.shadow.mapSize.x,gt=Math.round(c.alvo.x/tt)*tt,St=Math.round(c.alvo.z/tt)*tt,xt=x.dirSol,Ht=Math.hypot(xt.x,xt.y,xt.z);a.target.position.set(gt,0,St),a.position.set(gt+xt.x/Ht*3e3,xt.y/Ht*3e3,St+xt.z/Ht*3e3)}let Z=e===0?[700,1.6,2600,3.6]:e===1?[1200,2,5e3,5]:[1500,2.2,9e3,6];s.fog.near=Math.max(Z[0],c.dist*Z[1]),s.fog.far=Math.max(Z[2],c.dist*Z[3]),r.far!==s.fog.far+300&&(r.far=s.fog.far+300,r.updateProjectionMatrix()),x.decor&&Pu(x.decor,c.alvo,c.dist),x.malhasPredios&&Iu(x.malhasPredios,c.alvo,c.dist,s.fog.far+c.dist*.5),_(x.pausado?0:D),f.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),u.setFromProjectionMatrix(f);let J=x.bonecos;if(J.comecar(),c.dist<(e===0?500:900)){for(let B of x.unidades){if(B.classe!=="inf"||!B.vivo||B.dentro||!m(B.x,B.z))continue;let st=B.rapel?4:B.mirando>0&&B.velAtual<.5?2:0,tt=Math.min(1,B.velAtual/3);B.policia?J.add(B.x,B.y,B.z,B.ang,B.fase,st,Ec,Tc,Wr,2,1,null,tt):J.add(B.x,B.y,B.z,B.ang,B.fase,st,B.tipo==="sniper"?Pp:Gr,Lo,Wr,1,1,null,tt)}for(let B of x.unidades){if(!B.vivo||B.dentro||!B.m||!B.m.def.bancos||!B.passageiros.length||!m(B.x,B.z))continue;let st=Math.cos(B.ang),tt=Math.sin(B.ang);B.passageiros.forEach((gt,St)=>{if(gt.agente||St>=6)return;let xt=St%2?-1:1,Ht=.85-Math.floor(St/2)*.6,K=xt*1.02,at=B.x+st*K+tt*Ht,z=B.z-tt*K+st*Ht;J.add(at,B.y+.97-.93,z,B.ang+xt*Math.PI/2,0,5,gt.tipo==="sniper"?Pp:Gr,Lo,Wr,1,1,null,0)})}Q0(J,m)}x.longe=c.dist>=900,J.terminar(),x.efeitos.atualizar(x.pausado?0:D*x.velocidade,innerHeight*.9);let j=0;for(let B of x.unidades)if(B.classe==="aereo"&&B.vivo&&!B.dentro&&!(B.pousado&&B.parado>3)){let st=Math.hypot(B.x-c.alvo.x,B.z-c.alvo.z)+c.dist*.5;j=Math.max(j,1-st/700)}$0(x.pausado?0:Math.max(0,j));let ft=0,Tt=0,Y=0;for(let B of x.unidades){if(!B.vivo||B.dentro)continue;let st=Math.hypot(B.x-c.alvo.x,B.z-c.alvo.z)+c.dist*.5;if(B.classe==="jato"&&B.estadoJato!=="pronto"&&B.estadoJato!=="rearmando")ft=Math.max(ft,(1-st/2600)*(B.estadoJato==="pousando"?.5:1));else if(B.classe==="veic"){let tt=(1-st/350)*(B.d.raio>=3.4?1:.55);tt>Tt&&(Tt=tt,Y=Math.min(1,B.velAtual/B.d.vel))}}Z0(x.pausado?0:Math.max(0,ft)),J0(x.pausado?0:Math.max(0,Tt),Y),t.render(s,r),x.iniciado&&l.quadro(D)}requestAnimationFrame(w),fi("#carregando").classList.add("oculto");let A=fi("#menu");A.classList.remove("oculto");let P="normal";A.querySelectorAll("[data-dif]").forEach(L=>L.addEventListener("click",()=>{P=L.dataset.dif,A.querySelectorAll("[data-dif]").forEach(U=>U.classList.toggle("ativo",U===L))}));let S=fi("#m-som"),M=fi("#m-qual");S.checked=x.cfg.som!==!1,M.value=String(e),S.onchange=()=>{x.cfg.som=S.checked,Fo(S.checked),x.salvarCfg()},M.onchange=()=>{x.cfg.qualidade=+M.value,x.salvarCfg(),fi("#m-qual-aviso").textContent="A qualidade muda ao abrir o jogo de novo."},fi("#m-ajuda").onclick=()=>l.ajuda(),A.querySelectorAll("[data-cidade]").forEach(L=>{L.classList.toggle("ativo",L.dataset.cidade===(me.cidade||"miami")),L.addEventListener("click",()=>{if(L.dataset.cidade!==(me.cidade||"miami")){try{localStorage.setItem("miami-cidade",L.dataset.cidade)}catch{}location.href=location.pathname+"?cidade="+L.dataset.cidade}})}),fi("#m-jogar").onclick=()=>{Hi(),A.classList.add("oculto"),Sp(P),l.modoSandbox(),x.sandbox&&l.alerta("\u267E\uFE0F Sandbox: dinheiro infinito, produ\xE7\xE3o r\xE1pida e sem derrota. Use \u{1F9DF} Horda, \u2623\uFE0F Surto e \u{1F9F9} Limpar na barra lateral.",null,null,"info"),x.iniciado=!0,c.irPara(x.estr.qg.x,x.estr.qg.z,420),c.yaw=x.baseEixo.ang+Math.PI,l.atualizarTopo(),l.alerta(`\u{1F4FB} ${ze.base.nome} operante. Relatos de ataques estranhos em ${me.nome}...`,x.estr.qg.x,x.estr.qg.z,"info"),l.alerta("Dica: toque em \u2753 no menu \u2699\uFE0F para ver os controles",null,null,"info")},/[?&]auto/.test(location.search)&&fi("#m-jogar").click(),window.G=x,window.__dbg={ordenar:Mi,ordenarMover:Si,desembarcar:Vi,enfileirar:qc,simular:g,predios:Ie,NAV:tf,MAPA:Lu,tela:(L,U,D)=>an(L,U,D,r)}}Y_().catch(e=>{console.error(e),Zc("Erro ao iniciar: "+e.message)});})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
