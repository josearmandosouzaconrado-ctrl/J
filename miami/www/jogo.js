(()=>{var Yp=Object.defineProperty;var $u=(n,t)=>{for(var e in t)Yp(n,e,{get:t[e],enumerable:!0})};var Oh="170";var $p=0,Zu=1,Zp=2;var ud=1,Bh=2,bi=3,qi=0,pn=1,qn=2,Wi=0,sr=1,Jr=2,Ju=3,ju=4,Jp=5,us=100,jp=101,Kp=102,Qp=103,t0=104,e0=200,n0=201,i0=202,s0=203,hl=204,ul=205,r0=206,o0=207,a0=208,c0=209,l0=210,h0=211,u0=212,f0=213,d0=214,fl=0,dl=1,pl=2,cr=3,ml=4,gl=5,xl=6,vl=7,Wa=0,p0=1,m0=2,Xi=0,g0=1,x0=2,v0=3,kh=4,_0=5,y0=6,M0=7;var fd=300,lr=301,hr=302,_l=303,yl=304,Xa=306,zn=1e3,ps=1001,Ml=1002,nn=1003,b0=1004;var Po=1005;var cn=1006,Cc=1007;var ms=1008;var An=1009,dd=1010,pd=1011,jr=1012,Hh=1013,xs=1014,ni=1015,ro=1016,Vh=1017,Gh=1018,ur=1020,md=35902,gd=1021,xd=1022,dn=1023,vd=1024,_d=1025,rr=1026,fr=1027,oo=1028,Wh=1029,yd=1030,Xh=1031;var qh=1033,oa=33776,aa=33777,ca=33778,la=33779,bl=35840,Sl=35841,El=35842,Al=35843,Tl=36196,wl=37492,Rl=37496,Cl=37808,Pl=37809,Il=37810,zl=37811,Ll=37812,Ul=37813,Dl=37814,Nl=37815,Fl=37816,Ol=37817,Bl=37818,kl=37819,Hl=37820,Vl=37821,ha=36492,Gl=36494,Wl=36495,Md=36283,Xl=36284,ql=36285,Yl=36286;var ua=2300,$l=2301,Pc=2302,Ku=2400,Qu=2401,tf=2402;var S0=3200,E0=3201;var Yh=0,A0=1,Gi="",Re="srgb",xr="srgb-linear",qa="linear",me="srgb";var Hs=7680;var ef=519,T0=512,w0=513,R0=514,bd=515,C0=516,P0=517,I0=518,z0=519,nf=35044,Zi=35048;var sf="300 es",Si=2e3,fa=2001,Yi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ic=Math.PI/180,Zl=180/Math.PI;function vr(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function Ze(n,t,e){return Math.max(t,Math.min(e,n))}function L0(n,t){return(n%t+t)%t}function zc(n,t,e){return(1-e)*n+e*t}function Fr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function fn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var at=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jt=class n{constructor(t,e,i,s,r,o,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],d=i[5],g=i[8],v=s[0],m=s[3],p=s[6],y=s[1],_=s[4],M=s[7],I=s[2],S=s[5],w=s[8];return r[0]=o*v+a*y+c*I,r[3]=o*m+a*_+c*S,r[6]=o*p+a*M+c*w,r[1]=l*v+h*y+u*I,r[4]=l*m+h*_+u*S,r[7]=l*p+h*M+u*w,r[2]=f*v+d*y+g*I,r[5]=f*m+d*_+g*S,r[8]=f*p+d*M+g*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=u*v,t[1]=(s*l-h*i)*v,t[2]=(a*i-s*o)*v,t[3]=f*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(i*c-l*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Lc.makeScale(t,e)),this}rotate(t){return this.premultiply(Lc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Lc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Lc=new jt;function Sd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function da(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function U0(){let n=da("canvas");return n.style.display="block",n}var rf={};function Xr(n){n in rf||(rf[n]=!0,console.warn(n))}function D0(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function N0(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function F0(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var ae={enabled:!0,workingColorSpace:xr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===me&&(n.r=Ai(n.r),n.g=Ai(n.g),n.b=Ai(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===me&&(n.r=or(n.r),n.g=or(n.g),n.b=or(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Gi?qa:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Ai(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function or(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var of=[.64,.33,.3,.6,.15,.06],af=[.2126,.7152,.0722],cf=[.3127,.329],lf=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hf=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ae.define({[xr]:{primaries:of,whitePoint:cf,transfer:qa,toXYZ:lf,fromXYZ:hf,luminanceCoefficients:af,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:of,whitePoint:cf,transfer:me,toXYZ:lf,fromXYZ:hf,luminanceCoefficients:af,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}});var Vs,Jl=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Vs===void 0&&(Vs=da("canvas")),Vs.width=t.width,Vs.height=t.height;let i=Vs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Vs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=da("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ai(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ai(e[i]/255)*255):e[i]=Ai(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},O0=0,pa=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:O0++}),this.uuid=vr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Uc(s[o].image)):r.push(Uc(s[o]))}else r=Uc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Uc(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?Jl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var B0=0,mn=class n extends Yi{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=ps,s=ps,r=cn,o=ms,a=dn,c=An,l=n.DEFAULT_ANISOTROPY,h=Gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:B0++}),this.uuid=vr(),this.name="",this.source=new pa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==fd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case zn:t.x=t.x-Math.floor(t.x);break;case ps:t.x=t.x<0?0:1;break;case Ml:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case zn:t.y=t.y-Math.floor(t.y);break;case ps:t.y=t.y<0?0:1;break;case Ml:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=fd;mn.DEFAULT_ANISOTROPY=1;var De=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let _=(l+1)/2,M=(d+1)/2,I=(p+1)/2,S=(h+f)/4,w=(u+v)/4,P=(g+m)/4;return _>M&&_>I?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=S/i,r=w/i):M>I?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=S/s,r=P/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=w/r,s=P/r),this.set(i,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-v)/y,this.z=(f-h)/y,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},jl=class extends Yi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new De(0,0,t,e),this.scissorTest=!1,this.viewport=new De(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new mn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new pa(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ti=class extends jl{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},ma=class extends mn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Kl=class extends mn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var gn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3],f=r[o+0],d=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(u!==v||c!==f||l!==d||h!==g){let m=1-a,p=c*f+l*d+h*g+u*v,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let I=Math.sqrt(_),S=Math.atan2(I,p*y);m=Math.sin(m*S)/I,a=Math.sin(a*S)/I}let M=a*y;if(c=c*m+f*M,l=l*m+d*M,h=h*m+g*M,u=u*m+v*M,m===1-a){let I=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=I,l*=I,h*=I,u*=I}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),f=c(i/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(i>a&&i>u){let d=2*Math.sqrt(1+i-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-i-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-i-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ze(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(uf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(uf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Dc.copy(this).projectOnVector(t),this.sub(Dc)}reflect(t){return this.sub(Dc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Dc=new U,uf=new gn,wi=class{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Vn):Vn.fromBufferAttribute(r,o),Vn.applyMatrix4(t.matrixWorld),this.expandByPoint(Vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Io.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Io.copy(i.boundingBox)),Io.applyMatrix4(t.matrixWorld),this.union(Io)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Vn),Vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Or),zo.subVectors(this.max,Or),Gs.subVectors(t.a,Or),Ws.subVectors(t.b,Or),Xs.subVectors(t.c,Or),Fi.subVectors(Ws,Gs),Oi.subVectors(Xs,Ws),ss.subVectors(Gs,Xs);let e=[0,-Fi.z,Fi.y,0,-Oi.z,Oi.y,0,-ss.z,ss.y,Fi.z,0,-Fi.x,Oi.z,0,-Oi.x,ss.z,0,-ss.x,-Fi.y,Fi.x,0,-Oi.y,Oi.x,0,-ss.y,ss.x,0];return!Nc(e,Gs,Ws,Xs,zo)||(e=[1,0,0,0,1,0,0,0,1],!Nc(e,Gs,Ws,Xs,zo))?!1:(Lo.crossVectors(Fi,Oi),e=[Lo.x,Lo.y,Lo.z],Nc(e,Gs,Ws,Xs,zo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},xi=[new U,new U,new U,new U,new U,new U,new U,new U],Vn=new U,Io=new wi,Gs=new U,Ws=new U,Xs=new U,Fi=new U,Oi=new U,ss=new U,Or=new U,zo=new U,Lo=new U,rs=new U;function Nc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){rs.fromArray(n,r);let a=s.x*Math.abs(rs.x)+s.y*Math.abs(rs.y)+s.z*Math.abs(rs.z),c=t.dot(rs),l=e.dot(rs),h=i.dot(rs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var k0=new wi,Br=new U,Fc=new U,Ri=class{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):k0.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Br.subVectors(t,this.center);let e=Br.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Br,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Fc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Br.copy(t.center).add(Fc)),this.expandByPoint(Br.copy(t.center).sub(Fc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},vi=new U,Oc=new U,Uo=new U,Bi=new U,Bc=new U,Do=new U,kc=new U,dr=class{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=vi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vi.copy(this.origin).addScaledVector(this.direction,e),vi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Oc.copy(t).add(e).multiplyScalar(.5),Uo.copy(e).sub(t).normalize(),Bi.copy(this.origin).sub(Oc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Uo),a=Bi.dot(this.direction),c=-Bi.dot(Uo),l=Bi.lengthSq(),h=Math.abs(1-o*o),u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let v=1/h;u*=v,f*=v,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Oc).addScaledVector(Uo,f),d}intersectSphere(t,e){vi.subVectors(t.center,this.origin);let i=vi.dot(this.direction),s=vi.dot(vi)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,vi)!==null}intersectTriangle(t,e,i,s,r){Bc.subVectors(e,t),Do.subVectors(i,t),kc.crossVectors(Bc,Do);let o=this.direction.dot(kc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bi.subVectors(this.origin,t);let c=a*this.direction.dot(Do.crossVectors(Bi,Do));if(c<0)return null;let l=a*this.direction.dot(Bc.cross(Bi));if(l<0||c+l>o)return null;let h=-a*Bi.dot(kc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ie=class n{constructor(t,e,i,s,r,o,a,c,l,h,u,f,d,g,v,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,h,u,f,d,g,v,m)}set(t,e,i,s,r,o,a,c,l,h,u,f,d,g,v,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/qs.setFromMatrixColumn(t,0).length(),r=1/qs.setFromMatrixColumn(t,1).length(),o=1/qs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-v*l,e[9]=-a*c,e[2]=v-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,g=l*h,v=l*u;e[0]=f+v*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=v+f*a,e[10]=o*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,g=l*h,v=l*u;e[0]=f-v*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=v-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let f=o*h,d=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+v,e[1]=c*u,e[5]=v*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=v-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-v*u}else if(t.order==="XZY"){let f=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+v,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(H0,t,V0)}lookAt(t,e,i){let s=this.elements;return Sn.subVectors(t,e),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),ki.crossVectors(i,Sn),ki.lengthSq()===0&&(Math.abs(i.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),ki.crossVectors(i,Sn)),ki.normalize(),No.crossVectors(Sn,ki),s[0]=ki.x,s[4]=No.x,s[8]=Sn.x,s[1]=ki.y,s[5]=No.y,s[9]=Sn.y,s[2]=ki.z,s[6]=No.z,s[10]=Sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],d=i[13],g=i[2],v=i[6],m=i[10],p=i[14],y=i[3],_=i[7],M=i[11],I=i[15],S=s[0],w=s[4],P=s[8],E=s[12],b=s[1],C=s[5],N=s[9],D=s[13],F=s[2],W=s[6],L=s[10],Y=s[14],H=s[3],Q=s[7],et=s[11],tt=s[15];return r[0]=o*S+a*b+c*F+l*H,r[4]=o*w+a*C+c*W+l*Q,r[8]=o*P+a*N+c*L+l*et,r[12]=o*E+a*D+c*Y+l*tt,r[1]=h*S+u*b+f*F+d*H,r[5]=h*w+u*C+f*W+d*Q,r[9]=h*P+u*N+f*L+d*et,r[13]=h*E+u*D+f*Y+d*tt,r[2]=g*S+v*b+m*F+p*H,r[6]=g*w+v*C+m*W+p*Q,r[10]=g*P+v*N+m*L+p*et,r[14]=g*E+v*D+m*Y+p*tt,r[3]=y*S+_*b+M*F+I*H,r[7]=y*w+_*C+M*W+I*Q,r[11]=y*P+_*N+M*L+I*et,r[15]=y*E+_*D+M*Y+I*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*f+i*l*f+s*a*d-i*c*d)+v*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+i*o*d+r*a*h-i*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-i*o*f+i*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],y=u*m*l-v*f*l+v*c*d-a*m*d-u*c*p+a*f*p,_=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,M=h*v*l-g*u*l+g*a*d-o*v*d-h*a*p+o*u*p,I=g*u*c-h*v*c-g*a*f+o*v*f+h*a*m-o*u*m,S=e*y+i*_+s*M+r*I;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/S;return t[0]=y*w,t[1]=(v*f*r-u*m*r-v*s*d+i*m*d+u*s*p-i*f*p)*w,t[2]=(a*m*r-v*c*r+v*s*l-i*m*l-a*s*p+i*c*p)*w,t[3]=(u*c*r-a*f*r-u*s*l+i*f*l+a*s*d-i*c*d)*w,t[4]=_*w,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*w,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*w,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*w,t[8]=M*w,t[9]=(g*u*r-h*v*r-g*i*d+e*v*d+h*i*p-e*u*p)*w,t[10]=(o*v*r-g*a*r+g*i*l-e*v*l-o*i*p+e*a*p)*w,t[11]=(h*a*r-o*u*r-h*i*l+e*u*l+o*i*d-e*a*d)*w,t[12]=I*w,t[13]=(h*v*s-g*u*s+g*i*f-e*v*f-h*i*m+e*u*m)*w,t[14]=(g*a*s-o*v*s-g*i*c+e*v*c+o*i*m-e*a*m)*w,t[15]=(o*u*s-h*a*s+h*i*c-e*u*c-o*i*f+e*a*f)*w,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,v=o*h,m=o*u,p=a*u,y=c*l,_=c*h,M=c*u,I=i.x,S=i.y,w=i.z;return s[0]=(1-(v+p))*I,s[1]=(d+M)*I,s[2]=(g-_)*I,s[3]=0,s[4]=(d-M)*S,s[5]=(1-(f+p))*S,s[6]=(m+y)*S,s[7]=0,s[8]=(g+_)*w,s[9]=(m-y)*w,s[10]=(1-(f+v))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=qs.set(s[0],s[1],s[2]).length(),o=qs.set(s[4],s[5],s[6]).length(),a=qs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Gn.copy(this);let l=1/r,h=1/o,u=1/a;return Gn.elements[0]*=l,Gn.elements[1]*=l,Gn.elements[2]*=l,Gn.elements[4]*=h,Gn.elements[5]*=h,Gn.elements[6]*=h,Gn.elements[8]*=u,Gn.elements[9]*=u,Gn.elements[10]*=u,e.setFromRotationMatrix(Gn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Si){let c=this.elements,l=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),d,g;if(a===Si)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===fa)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Si){let c=this.elements,l=1/(e-t),h=1/(i-s),u=1/(o-r),f=(e+t)*l,d=(i+s)*h,g,v;if(a===Si)g=(o+r)*u,v=-2*u;else if(a===fa)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},qs=new U,Gn=new ie,H0=new U(0,0,0),V0=new U(1,1,1),ki=new U,No=new U,Sn=new U,ff=new ie,df=new gn,Fe=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ff.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ff,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return df.setFromEuler(this),this.setFromQuaternion(df,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fe.DEFAULT_ORDER="XYZ";var Kr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},G0=0,pf=new U,Ys=new gn,_i=new ie,Fo=new U,kr=new U,W0=new U,X0=new gn,mf=new U(1,0,0),gf=new U(0,1,0),xf=new U(0,0,1),vf={type:"added"},q0={type:"removed"},$s={type:"childadded",child:null},Hc={type:"childremoved",child:null},Je=class n extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:G0++}),this.uuid=vr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new U,e=new Fe,i=new gn,s=new U(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new jt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ys.setFromAxisAngle(t,e),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(t,e){return Ys.setFromAxisAngle(t,e),this.quaternion.premultiply(Ys),this}rotateX(t){return this.rotateOnAxis(mf,t)}rotateY(t){return this.rotateOnAxis(gf,t)}rotateZ(t){return this.rotateOnAxis(xf,t)}translateOnAxis(t,e){return pf.copy(t).applyQuaternion(this.quaternion),this.position.add(pf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(mf,t)}translateY(t){return this.translateOnAxis(gf,t)}translateZ(t){return this.translateOnAxis(xf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Fo.copy(t):Fo.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(kr,Fo,this.up):_i.lookAt(Fo,kr,this.up),this.quaternion.setFromRotationMatrix(_i),s&&(_i.extractRotation(s.matrixWorld),Ys.setFromRotationMatrix(_i),this.quaternion.premultiply(Ys.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vf),$s.child=t,this.dispatchEvent($s),$s.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(q0),Hc.child=t,this.dispatchEvent(Hc),Hc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_i.multiply(t.parent.matrixWorld)),t.applyMatrix4(_i),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vf),$s.child=t,this.dispatchEvent($s),$s.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,t,W0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,X0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Je.DEFAULT_UP=new U(0,1,0);Je.DEFAULT_MATRIX_AUTO_UPDATE=!0;Je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Wn=new U,yi=new U,Vc=new U,Mi=new U,Zs=new U,Js=new U,_f=new U,Gc=new U,Wc=new U,Xc=new U,qc=new De,Yc=new De,$c=new De,fs=class n{constructor(t=new U,e=new U,i=new U){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Wn.subVectors(t,e),s.cross(Wn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Wn.subVectors(s,e),yi.subVectors(i,e),Vc.subVectors(t,e);let o=Wn.dot(Wn),a=Wn.dot(yi),c=Wn.dot(Vc),l=yi.dot(yi),h=yi.dot(Vc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,Mi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Mi.x),c.addScaledVector(o,Mi.y),c.addScaledVector(a,Mi.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return qc.setScalar(0),Yc.setScalar(0),$c.setScalar(0),qc.fromBufferAttribute(t,e),Yc.fromBufferAttribute(t,i),$c.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(qc,r.x),o.addScaledVector(Yc,r.y),o.addScaledVector($c,r.z),o}static isFrontFacing(t,e,i,s){return Wn.subVectors(i,e),yi.subVectors(t,e),Wn.cross(yi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),Wn.cross(yi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;Zs.subVectors(s,i),Js.subVectors(r,i),Gc.subVectors(t,i);let c=Zs.dot(Gc),l=Js.dot(Gc);if(c<=0&&l<=0)return e.copy(i);Wc.subVectors(t,s);let h=Zs.dot(Wc),u=Js.dot(Wc);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(i).addScaledVector(Zs,o);Xc.subVectors(t,r);let d=Zs.dot(Xc),g=Js.dot(Xc);if(g>=0&&d<=g)return e.copy(r);let v=d*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(i).addScaledVector(Js,a);let m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return _f.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(_f,a);let p=1/(m+v+f);return o=v*p,a=f*p,e.copy(i).addScaledVector(Zs,o).addScaledVector(Js,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ed={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},Oo={h:0,s:0,l:0};function Zc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Bt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Re){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=i,ae.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ae.workingColorSpace){if(t=L0(t,1),e=Ze(e,0,1),i=Ze(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Zc(o,r,t+1/3),this.g=Zc(o,r,t),this.b=Zc(o,r,t-1/3)}return ae.toWorkingColorSpace(this,s),this}setStyle(t,e=Re){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Re){let i=Ed[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ai(t.r),this.g=Ai(t.g),this.b=Ai(t.b),this}copyLinearToSRGB(t){return this.r=or(t.r),this.g=or(t.g),this.b=or(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Re){return ae.fromWorkingColorSpace(en.copy(this),t),Math.round(Ze(en.r*255,0,255))*65536+Math.round(Ze(en.g*255,0,255))*256+Math.round(Ze(en.b*255,0,255))}getHexString(t=Re){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace(en.copy(this),e);let i=en.r,s=en.g,r=en.b,o=Math.max(i,s,r),a=Math.min(i,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=Re){ae.fromWorkingColorSpace(en.copy(this),t);let e=en.r,i=en.g,s=en.b;return t!==Re?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Hi),this.setHSL(Hi.h+t,Hi.s+e,Hi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Hi),t.getHSL(Oo);let i=zc(Hi.h,Oo.h,e),s=zc(Hi.s,Oo.s,e),r=zc(Hi.l,Oo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new Bt;Bt.NAMES=Ed;var Y0=0,ii=class extends Yi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Y0++}),this.uuid=vr(),this.name="",this.blending=sr,this.side=qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hl,this.blendDst=ul,this.blendEquation=us,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ef,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hs,this.stencilZFail=Hs,this.stencilZPass=Hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==sr&&(i.blending=this.blending),this.side!==qi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==hl&&(i.blendSrc=this.blendSrc),this.blendDst!==ul&&(i.blendDst=this.blendDst),this.blendEquation!==us&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==cr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ef&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Hs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Hs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Ln=class extends ii{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=Wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ve=new U,Bo=new at,pe=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=nf,this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Bo.fromBufferAttribute(this,e),Bo.applyMatrix3(t),this.setXY(e,Bo.x,Bo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Fr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=fn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Fr(e,this.array)),e}setX(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Fr(e,this.array)),e}setY(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Fr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Fr(e,this.array)),e}setW(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),i=fn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),i=fn(i,this.array),s=fn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),i=fn(i,this.array),s=fn(s,this.array),r=fn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==nf&&(t.usage=this.usage),t}};var ga=class extends pe{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var xa=class extends pe{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var ne=class extends pe{constructor(t,e,i){super(new Float32Array(t),e,i)}},$0=0,In=new ie,Jc=new Je,js=new U,En=new wi,Hr=new wi,qe=new U,Ee=class n extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$0++}),this.uuid=vr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Sd(t)?xa:ga)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new jt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,e,i){return In.makeTranslation(t,e,i),this.applyMatrix4(In),this}scale(t,e,i){return In.makeScale(t,e,i),this.applyMatrix4(In),this}lookAt(t){return Jc.lookAt(t),Jc.updateMatrix(),this.applyMatrix4(Jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(js).negate(),this.translate(js.x,js.y,js.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ne(i,3))}else{for(let i=0,s=e.count;i<s;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];En.setFromBufferAttribute(r),this.morphTargetsRelative?(qe.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(qe),qe.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(qe)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){let i=this.boundingSphere.center;if(En.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Hr.setFromBufferAttribute(a),this.morphTargetsRelative?(qe.addVectors(En.min,Hr.min),En.expandByPoint(qe),qe.addVectors(En.max,Hr.max),En.expandByPoint(qe)):(En.expandByPoint(Hr.min),En.expandByPoint(Hr.max))}En.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)qe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(qe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)qe.fromBufferAttribute(a,l),c&&(js.fromBufferAttribute(t,l),qe.add(js)),s=Math.max(s,i.distanceToSquared(qe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pe(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<i.count;P++)a[P]=new U,c[P]=new U;let l=new U,h=new U,u=new U,f=new at,d=new at,g=new at,v=new U,m=new U;function p(P,E,b){l.fromBufferAttribute(i,P),h.fromBufferAttribute(i,E),u.fromBufferAttribute(i,b),f.fromBufferAttribute(r,P),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,b),h.sub(l),u.sub(l),d.sub(f),g.sub(f);let C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(C),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(C),a[P].add(v),a[E].add(v),a[b].add(v),c[P].add(m),c[E].add(m),c[b].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let P=0,E=y.length;P<E;++P){let b=y[P],C=b.start,N=b.count;for(let D=C,F=C+N;D<F;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let _=new U,M=new U,I=new U,S=new U;function w(P){I.fromBufferAttribute(s,P),S.copy(I);let E=a[P];_.copy(E),_.sub(I.multiplyScalar(I.dot(E))).normalize(),M.crossVectors(S,E);let C=M.dot(c[P])<0?-1:1;o.setXYZW(P,_.x,_.y,_.z,C)}for(let P=0,E=y.length;P<E;++P){let b=y[P],C=b.start,N=b.count;for(let D=C,F=C+N;D<F;D+=3)w(t.getX(D+0)),w(t.getX(D+1)),w(t.getX(D+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);let s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,h=new U,u=new U;if(t)for(let f=0,d=t.count;f<d;f+=3){let g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,m),a.add(h),c.add(h),l.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)qe.fromBufferAttribute(t,e),qe.normalize(),t.setXYZ(e,qe.x,qe.y,qe.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new pe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,i);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let c in i){let l=i[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},yf=new ie,os=new dr,ko=new Ri,Mf=new U,Ho=new U,Vo=new U,Go=new U,jc=new U,Wo=new U,bf=new U,Xo=new U,le=class extends Je{constructor(t=new Ee,e=new Ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Wo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(jc.fromBufferAttribute(u,t),o?Wo.addScaledVector(jc,h):Wo.addScaledVector(jc.sub(e),h))}e.add(Wo)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ko.copy(i.boundingSphere),ko.applyMatrix4(r),os.copy(t.ray).recast(t.near),!(ko.containsPoint(os.origin)===!1&&(os.intersectSphere(ko,Mf)===null||os.origin.distanceToSquared(Mf)>(t.far-t.near)**2))&&(yf.copy(r).invert(),os.copy(t.ray).applyMatrix4(yf),!(i.boundingBox!==null&&os.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,os)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){let m=f[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),_=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,I=_;M<I;M+=3){let S=a.getX(M),w=a.getX(M+1),P=a.getX(M+2);s=qo(this,p,t,i,l,h,u,S,w,P),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){let y=a.getX(m),_=a.getX(m+1),M=a.getX(m+2);s=qo(this,o,t,i,l,h,u,y,_,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){let m=f[g],p=o[m.materialIndex],y=Math.max(m.start,d.start),_=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,I=_;M<I;M+=3){let S=M,w=M+1,P=M+2;s=qo(this,p,t,i,l,h,u,S,w,P),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){let y=m,_=m+1,M=m+2;s=qo(this,o,t,i,l,h,u,y,_,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Z0(n,t,e,i,s,r,o,a){let c;if(t.side===pn?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===qi,a),c===null)return null;Xo.copy(a),Xo.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(Xo);return l<e.near||l>e.far?null:{distance:l,point:Xo.clone(),object:n}}function qo(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Ho),n.getVertexPosition(c,Vo),n.getVertexPosition(l,Go);let h=Z0(n,t,e,i,Ho,Vo,Go,bf);if(h){let u=new U;fs.getBarycoord(bf,Ho,Vo,Go,u),s&&(h.uv=fs.getInterpolatedAttribute(s,a,c,l,u,new at)),r&&(h.uv1=fs.getInterpolatedAttribute(r,a,c,l,u,new at)),o&&(h.normal=fs.getInterpolatedAttribute(o,a,c,l,u,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new U,materialIndex:0};fs.getNormal(Ho,Vo,Go,f.normal),h.face=f,h.barycoord=u}return h}var Ye=class n extends Ee{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(h,3)),this.setAttribute("uv",new ne(u,2));function g(v,m,p,y,_,M,I,S,w,P,E){let b=M/w,C=I/P,N=M/2,D=I/2,F=S/2,W=w+1,L=P+1,Y=0,H=0,Q=new U;for(let et=0;et<L;et++){let tt=et*C-D;for(let ht=0;ht<W;ht++){let Et=ht*b-N;Q[v]=Et*y,Q[m]=tt*_,Q[p]=F,l.push(Q.x,Q.y,Q.z),Q[v]=0,Q[m]=0,Q[p]=S>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(ht/w),u.push(1-et/P),Y+=1}}for(let et=0;et<P;et++)for(let tt=0;tt<w;tt++){let ht=f+tt+W*et,Et=f+tt+W*(et+1),q=f+(tt+1)+W*(et+1),Z=f+(tt+1)+W*et;c.push(ht,Et,Z),c.push(Et,q,Z),H+=6}a.addGroup(d,H,E),d+=H,f+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function pr(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function on(n){let t={};for(let e=0;e<n.length;e++){let i=pr(n[e]);for(let s in i)t[s]=i[s]}return t}function J0(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Ad(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}var j0={clone:pr,merge:on},K0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Q0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Un=class extends ii{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=K0,this.fragmentShader=Q0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=pr(t.uniforms),this.uniformsGroups=J0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},va=class extends Je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=Si}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Vi=new U,Sf=new at,Ef=new at,an=class extends va{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Zl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ic*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zl*2*Math.atan(Math.tan(Ic*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vi.x,Vi.y).multiplyScalar(-t/Vi.z),Vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vi.x,Vi.y).multiplyScalar(-t/Vi.z)}getViewSize(t,e){return this.getViewBounds(t,Sf,Ef),e.subVectors(Ef,Sf)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ic*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ks=-90,Qs=1,Ql=class extends Je{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new an(Ks,Qs,t,e);s.layers=this.layers,this.add(s);let r=new an(Ks,Qs,t,e);r.layers=this.layers,this.add(r);let o=new an(Ks,Qs,t,e);o.layers=this.layers,this.add(o);let a=new an(Ks,Qs,t,e);a.layers=this.layers,this.add(a);let c=new an(Ks,Qs,t,e);c.layers=this.layers,this.add(c);let l=new an(Ks,Qs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Si)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===fa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,l),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},_a=class extends mn{constructor(t,e,i,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:lr,super(t,e,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},th=class extends Ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new _a(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:cn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ye(5,5,5),r=new Un({name:"CubemapFromEquirect",uniforms:pr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pn,blending:Wi});r.uniforms.tEquirect.value=e;let o=new le(s,r),a=e.minFilter;return e.minFilter===ms&&(e.minFilter=cn),new Ql(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},Kc=new U,tm=new U,em=new jt,Xn=class{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Kc.subVectors(i,e).cross(tm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(Kc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||em.getNormalMatrix(t),s=this.coplanarPoint(Kc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},as=new Ri,Yo=new U,vs=class{constructor(t=new Xn,e=new Xn,i=new Xn,s=new Xn,r=new Xn,o=new Xn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Si){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],v=s[10],m=s[11],p=s[12],y=s[13],_=s[14],M=s[15];if(i[0].setComponents(c-r,f-l,m-d,M-p).normalize(),i[1].setComponents(c+r,f+l,m+d,M+p).normalize(),i[2].setComponents(c+o,f+h,m+g,M+y).normalize(),i[3].setComponents(c-o,f-h,m-g,M-y).normalize(),i[4].setComponents(c-a,f-u,m-v,M-_).normalize(),e===Si)i[5].setComponents(c+a,f+u,m+v,M+_).normalize();else if(e===fa)i[5].setComponents(a,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(t){return as.center.set(0,0,0),as.radius=.7071067811865476,as.applyMatrix4(t.matrixWorld),this.intersectsSphere(as)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(Yo.x=s.normal.x>0?t.max.x:t.min.x,Yo.y=s.normal.y>0?t.max.y:t.min.y,Yo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Yo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Td(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function nm(n){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){let h=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){let g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){let v=u[d];n.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var $i=class n extends Ee{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){let y=p*f-o;for(let _=0;_<l;_++){let M=_*u-r;g.push(M,-y,0),v.push(0,0,1),m.push(_/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){let _=y+l*p,M=y+l*(p+1),I=y+1+l*(p+1),S=y+1+l*p;d.push(_,M,S),d.push(M,I,S)}this.setIndex(d),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(v,3)),this.setAttribute("uv",new ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},im=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sm=`#ifdef USE_ALPHAHASH
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
#endif`,rm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,om=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,am=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lm=`#ifdef USE_AOMAP
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
#endif`,hm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,um=`#ifdef USE_BATCHING
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
#endif`,fm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gm=`#ifdef USE_IRIDESCENCE
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
#endif`,xm=`#ifdef USE_BUMPMAP
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
#endif`,vm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ym=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Em=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Am=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Tm=`#define PI 3.141592653589793
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
} // validated`,wm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Rm=`vec3 transformedNormal = objectNormal;
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
#endif`,Cm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Im=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Um=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dm=`#ifdef USE_ENVMAP
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
#endif`,Nm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Fm=`#ifdef USE_ENVMAP
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
#endif`,Om=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bm=`#ifdef USE_ENVMAP
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
#endif`,km=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wm=`#ifdef USE_GRADIENTMAP
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
}`,Xm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ym=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$m=`uniform bool receiveShadow;
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
#endif`,Zm=`#ifdef USE_ENVMAP
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
#endif`,Jm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Km=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tg=`PhysicalMaterial material;
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
#endif`,eg=`struct PhysicalMaterial {
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
}`,ng=`
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
#endif`,ig=`#if defined( RE_IndirectDiffuse )
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
#endif`,sg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,og=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ag=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ug=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,fg=`#if defined( USE_POINTS_UV )
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
#endif`,dg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vg=`#ifdef USE_MORPHTARGETS
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
#endif`,_g=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ag=`#ifdef USE_NORMALMAP
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
#endif`,Tg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ig=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,zg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ug=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ng=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Og=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hg=`float getShadowMask() {
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
}`,Vg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gg=`#ifdef USE_SKINNING
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
#endif`,Wg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xg=`#ifdef USE_SKINNING
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
#endif`,qg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$g=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jg=`#ifdef USE_TRANSMISSION
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
#endif`,jg=`#ifdef USE_TRANSMISSION
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
#endif`,Kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ex=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,nx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ix=`uniform sampler2D t2D;
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
}`,sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ax=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cx=`#include <common>
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
}`,lx=`#if DEPTH_PACKING == 3200
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
}`,hx=`#define DISTANCE
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
}`,ux=`#define DISTANCE
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
}`,fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,px=`uniform float scale;
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
}`,mx=`uniform vec3 diffuse;
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
}`,gx=`#include <common>
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
}`,xx=`uniform vec3 diffuse;
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
}`,vx=`#define LAMBERT
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
}`,_x=`#define LAMBERT
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
}`,yx=`#define MATCAP
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
}`,Mx=`#define MATCAP
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
}`,bx=`#define NORMAL
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
}`,Sx=`#define NORMAL
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
}`,Ex=`#define PHONG
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
}`,Ax=`#define PHONG
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
}`,Tx=`#define STANDARD
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
}`,wx=`#define STANDARD
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
}`,Rx=`#define TOON
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
}`,Cx=`#define TOON
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
}`,Px=`uniform float size;
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
}`,Ix=`uniform vec3 diffuse;
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
}`,zx=`#include <common>
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
}`,Lx=`uniform vec3 color;
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
}`,Ux=`uniform float rotation;
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
}`,Dx=`uniform vec3 diffuse;
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
}`,te={alphahash_fragment:im,alphahash_pars_fragment:sm,alphamap_fragment:rm,alphamap_pars_fragment:om,alphatest_fragment:am,alphatest_pars_fragment:cm,aomap_fragment:lm,aomap_pars_fragment:hm,batching_pars_vertex:um,batching_vertex:fm,begin_vertex:dm,beginnormal_vertex:pm,bsdfs:mm,iridescence_fragment:gm,bumpmap_pars_fragment:xm,clipping_planes_fragment:vm,clipping_planes_pars_fragment:_m,clipping_planes_pars_vertex:ym,clipping_planes_vertex:Mm,color_fragment:bm,color_pars_fragment:Sm,color_pars_vertex:Em,color_vertex:Am,common:Tm,cube_uv_reflection_fragment:wm,defaultnormal_vertex:Rm,displacementmap_pars_vertex:Cm,displacementmap_vertex:Pm,emissivemap_fragment:Im,emissivemap_pars_fragment:zm,colorspace_fragment:Lm,colorspace_pars_fragment:Um,envmap_fragment:Dm,envmap_common_pars_fragment:Nm,envmap_pars_fragment:Fm,envmap_pars_vertex:Om,envmap_physical_pars_fragment:Zm,envmap_vertex:Bm,fog_vertex:km,fog_pars_vertex:Hm,fog_fragment:Vm,fog_pars_fragment:Gm,gradientmap_pars_fragment:Wm,lightmap_pars_fragment:Xm,lights_lambert_fragment:qm,lights_lambert_pars_fragment:Ym,lights_pars_begin:$m,lights_toon_fragment:Jm,lights_toon_pars_fragment:jm,lights_phong_fragment:Km,lights_phong_pars_fragment:Qm,lights_physical_fragment:tg,lights_physical_pars_fragment:eg,lights_fragment_begin:ng,lights_fragment_maps:ig,lights_fragment_end:sg,logdepthbuf_fragment:rg,logdepthbuf_pars_fragment:og,logdepthbuf_pars_vertex:ag,logdepthbuf_vertex:cg,map_fragment:lg,map_pars_fragment:hg,map_particle_fragment:ug,map_particle_pars_fragment:fg,metalnessmap_fragment:dg,metalnessmap_pars_fragment:pg,morphinstance_vertex:mg,morphcolor_vertex:gg,morphnormal_vertex:xg,morphtarget_pars_vertex:vg,morphtarget_vertex:_g,normal_fragment_begin:yg,normal_fragment_maps:Mg,normal_pars_fragment:bg,normal_pars_vertex:Sg,normal_vertex:Eg,normalmap_pars_fragment:Ag,clearcoat_normal_fragment_begin:Tg,clearcoat_normal_fragment_maps:wg,clearcoat_pars_fragment:Rg,iridescence_pars_fragment:Cg,opaque_fragment:Pg,packing:Ig,premultiplied_alpha_fragment:zg,project_vertex:Lg,dithering_fragment:Ug,dithering_pars_fragment:Dg,roughnessmap_fragment:Ng,roughnessmap_pars_fragment:Fg,shadowmap_pars_fragment:Og,shadowmap_pars_vertex:Bg,shadowmap_vertex:kg,shadowmask_pars_fragment:Hg,skinbase_vertex:Vg,skinning_pars_vertex:Gg,skinning_vertex:Wg,skinnormal_vertex:Xg,specularmap_fragment:qg,specularmap_pars_fragment:Yg,tonemapping_fragment:$g,tonemapping_pars_fragment:Zg,transmission_fragment:Jg,transmission_pars_fragment:jg,uv_pars_fragment:Kg,uv_pars_vertex:Qg,uv_vertex:tx,worldpos_vertex:ex,background_vert:nx,background_frag:ix,backgroundCube_vert:sx,backgroundCube_frag:rx,cube_vert:ox,cube_frag:ax,depth_vert:cx,depth_frag:lx,distanceRGBA_vert:hx,distanceRGBA_frag:ux,equirect_vert:fx,equirect_frag:dx,linedashed_vert:px,linedashed_frag:mx,meshbasic_vert:gx,meshbasic_frag:xx,meshlambert_vert:vx,meshlambert_frag:_x,meshmatcap_vert:yx,meshmatcap_frag:Mx,meshnormal_vert:bx,meshnormal_frag:Sx,meshphong_vert:Ex,meshphong_frag:Ax,meshphysical_vert:Tx,meshphysical_frag:wx,meshtoon_vert:Rx,meshtoon_frag:Cx,points_vert:Px,points_frag:Ix,shadow_vert:zx,shadow_frag:Lx,sprite_vert:Ux,sprite_frag:Dx},pt={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},ei={basic:{uniforms:on([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:on([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:on([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:on([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:on([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:on([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:on([pt.points,pt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:on([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:on([pt.common,pt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:on([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:on([pt.sprite,pt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:on([pt.common,pt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:on([pt.lights,pt.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};ei.physical={uniforms:on([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var $o={r:0,b:0,g:0},cs=new Fe,Nx=new ie;function Fx(n,t,e,i,s,r,o){let a=new Bt(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function v(y){let _=!1,M=g(y);M===null?p(a,c):M&&M.isColor&&(p(M,1),_=!0);let I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,_){let M=g(_);M&&(M.isCubeTexture||M.mapping===Xa)?(h===void 0&&(h=new le(new Ye(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:pr(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),cs.copy(_.backgroundRotation),cs.x*=-1,cs.y*=-1,cs.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(cs.y*=-1,cs.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Nx.makeRotationFromEuler(cs)),h.material.toneMapped=ae.getTransfer(M.colorSpace)!==me,(u!==M||f!==M.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=M,f=M.version,d=n.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new le(new $i(2,2),new Un({name:"BackgroundMaterial",uniforms:pr(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:qi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=ae.getTransfer(M.colorSpace)!==me,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,d=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,_){y.getRGB($o,Ad(n)),i.buffers.color.setClear($o.r,$o.g,$o.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),c=_,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:v,addToRenderList:m}}function Ox(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,o=!1;function a(b,C,N,D,F){let W=!1,L=u(D,N,C);r!==L&&(r=L,l(r.object)),W=d(b,D,N,F),W&&g(b,D,N,F),F!==null&&t.update(F,n.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,M(b,C,N,D),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function c(){return n.createVertexArray()}function l(b){return n.bindVertexArray(b)}function h(b){return n.deleteVertexArray(b)}function u(b,C,N){let D=N.wireframe===!0,F=i[b.id];F===void 0&&(F={},i[b.id]=F);let W=F[C.id];W===void 0&&(W={},F[C.id]=W);let L=W[D];return L===void 0&&(L=f(c()),W[D]=L),L}function f(b){let C=[],N=[],D=[];for(let F=0;F<e;F++)C[F]=0,N[F]=0,D[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:N,attributeDivisors:D,object:b,attributes:{},index:null}}function d(b,C,N,D){let F=r.attributes,W=C.attributes,L=0,Y=N.getAttributes();for(let H in Y)if(Y[H].location>=0){let et=F[H],tt=W[H];if(tt===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(tt=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(tt=b.instanceColor)),et===void 0||et.attribute!==tt||tt&&et.data!==tt.data)return!0;L++}return r.attributesNum!==L||r.index!==D}function g(b,C,N,D){let F={},W=C.attributes,L=0,Y=N.getAttributes();for(let H in Y)if(Y[H].location>=0){let et=W[H];et===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(et=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(et=b.instanceColor));let tt={};tt.attribute=et,et&&et.data&&(tt.data=et.data),F[H]=tt,L++}r.attributes=F,r.attributesNum=L,r.index=D}function v(){let b=r.newAttributes;for(let C=0,N=b.length;C<N;C++)b[C]=0}function m(b){p(b,0)}function p(b,C){let N=r.newAttributes,D=r.enabledAttributes,F=r.attributeDivisors;N[b]=1,D[b]===0&&(n.enableVertexAttribArray(b),D[b]=1),F[b]!==C&&(n.vertexAttribDivisor(b,C),F[b]=C)}function y(){let b=r.newAttributes,C=r.enabledAttributes;for(let N=0,D=C.length;N<D;N++)C[N]!==b[N]&&(n.disableVertexAttribArray(N),C[N]=0)}function _(b,C,N,D,F,W,L){L===!0?n.vertexAttribIPointer(b,C,N,F,W):n.vertexAttribPointer(b,C,N,D,F,W)}function M(b,C,N,D){v();let F=D.attributes,W=N.getAttributes(),L=C.defaultAttributeValues;for(let Y in W){let H=W[Y];if(H.location>=0){let Q=F[Y];if(Q===void 0&&(Y==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),Y==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor)),Q!==void 0){let et=Q.normalized,tt=Q.itemSize,ht=t.get(Q);if(ht===void 0)continue;let Et=ht.buffer,q=ht.type,Z=ht.bytesPerElement,ft=q===n.INT||q===n.UNSIGNED_INT||Q.gpuType===Hh;if(Q.isInterleavedBufferAttribute){let it=Q.data,Mt=it.stride,Rt=Q.offset;if(it.isInstancedInterleavedBuffer){for(let At=0;At<H.locationSize;At++)p(H.location+At,it.meshPerAttribute);b.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let At=0;At<H.locationSize;At++)m(H.location+At);n.bindBuffer(n.ARRAY_BUFFER,Et);for(let At=0;At<H.locationSize;At++)_(H.location+At,tt/H.locationSize,q,et,Mt*Z,(Rt+tt/H.locationSize*At)*Z,ft)}else{if(Q.isInstancedBufferAttribute){for(let it=0;it<H.locationSize;it++)p(H.location+it,Q.meshPerAttribute);b.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let it=0;it<H.locationSize;it++)m(H.location+it);n.bindBuffer(n.ARRAY_BUFFER,Et);for(let it=0;it<H.locationSize;it++)_(H.location+it,tt/H.locationSize,q,et,tt*Z,tt/H.locationSize*it*Z,ft)}}else if(L!==void 0){let et=L[Y];if(et!==void 0)switch(et.length){case 2:n.vertexAttrib2fv(H.location,et);break;case 3:n.vertexAttrib3fv(H.location,et);break;case 4:n.vertexAttrib4fv(H.location,et);break;default:n.vertexAttrib1fv(H.location,et)}}}}y()}function I(){P();for(let b in i){let C=i[b];for(let N in C){let D=C[N];for(let F in D)h(D[F].object),delete D[F];delete C[N]}delete i[b]}}function S(b){if(i[b.id]===void 0)return;let C=i[b.id];for(let N in C){let D=C[N];for(let F in D)h(D[F].object),delete D[F];delete C[N]}delete i[b.id]}function w(b){for(let C in i){let N=i[C];if(N[b.id]===void 0)continue;let D=N[b.id];for(let F in D)h(D[F].object),delete D[F];delete N[b.id]}}function P(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:E,dispose:I,releaseStatesOfGeometry:S,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function Bx(n,t,e){let i;function s(l){i=l}function r(l,h){n.drawArrays(i,l,h),e.update(h,i,1)}function o(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),e.update(h,i,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,i,1)}function c(l,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,l,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function kx(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==dn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){let P=w===ro&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==An&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ni&&!P)}function c(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,S=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:M,vertexTextures:I,maxSamples:S}}function Hx(n){let t=this,e=null,i=0,s=!1,r=!1,o=new Xn,a=new jt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let y=r?0:i,_=y*4,M=p.clippingState||null;c.value=M,M=h(g,f,_,d);for(let I=0;I!==_;++I)M[I]=e[I];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,g){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=c.value,g!==!0||m===null){let p=d+v*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,M=d;_!==v;++_,M+=4)o.copy(u[_]).applyMatrix4(y,a),o.normal.toArray(m,M),m[M+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Vx(n){let t=new WeakMap;function e(o,a){return a===_l?o.mapping=lr:a===yl&&(o.mapping=hr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===_l||a===yl)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new th(c.height);return l.fromEquirectangularTexture(n,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var ya=class extends va{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},nr=4,Af=[.125,.215,.35,.446,.526,.582],ds=20,Qc=new ya,Tf=new Bt,tl=null,el=0,nl=0,il=!1,hs=(1+Math.sqrt(5))/2,tr=1/hs,wf=[new U(-hs,tr,0),new U(hs,tr,0),new U(-tr,0,hs),new U(tr,0,hs),new U(0,hs,-tr),new U(0,hs,tr),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],Ma=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){tl=this._renderer.getRenderTarget(),el=this._renderer.getActiveCubeFace(),nl=this._renderer.getActiveMipmapLevel(),il=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(tl,el,nl),this._renderer.xr.enabled=il,t.scissorTest=!1,Zo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===lr||t.mapping===hr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),tl=this._renderer.getRenderTarget(),el=this._renderer.getActiveCubeFace(),nl=this._renderer.getActiveMipmapLevel(),il=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:ro,format:dn,colorSpace:xr,depthBuffer:!1},s=Rf(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rf(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Gx(r)),this._blurMaterial=Wx(r,t,e)}return s}_compileMaterial(t){let e=new le(this._lodPlanes[0],t);this._renderer.compile(e,Qc)}_sceneToCubeUV(t,e,i,s){let a=new an(90,1,e,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Tf),h.toneMapping=Xi,h.autoClear=!1;let d=new Ln({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1}),g=new le(new Ye,d),v=!1,m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,v=!0):(d.color.copy(Tf),v=!0);for(let p=0;p<6;p++){let y=p%3;y===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):y===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let _=this._cubeSize;Zo(s,y*_,p>2?_:0,_,_),h.setRenderTarget(s),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===lr||t.mapping===hr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new le(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Zo(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,Qc)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=wf[(s-r-1)%wf.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new le(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ds-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):ds;m>ds&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ds}`);let p=[],y=0;for(let w=0;w<ds;++w){let P=w/v,E=Math.exp(-P*P/2);p.push(E),w===0?y+=E:w<m&&(y+=2*E)}for(let w=0;w<p.length;w++)p[w]=p[w]/y;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-i;let M=this._sizeLods[s],I=3*M*(s>_-nr?s-_+nr:0),S=4*(this._cubeSize-M);Zo(e,I,S,3*M,2*M),c.setRenderTarget(e),c.render(u,Qc)}};function Gx(n){let t=[],e=[],i=[],s=n,r=n-nr+1+Af.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>n-nr?c=Af[o-n+nr-1]:o===0&&(c=0),i.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,m=2,p=1,y=new Float32Array(v*g*d),_=new Float32Array(m*g*d),M=new Float32Array(p*g*d);for(let S=0;S<d;S++){let w=S%3*2/3-1,P=S>2?0:-1,E=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];y.set(E,v*g*S),_.set(f,m*g*S);let b=[S,S,S,S,S,S];M.set(b,p*g*S)}let I=new Ee;I.setAttribute("position",new pe(y,v)),I.setAttribute("uv",new pe(_,m)),I.setAttribute("faceIndex",new pe(M,p)),t.push(I),s>nr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Rf(n,t,e){let i=new Ti(n,t,e);return i.texture.mapping=Xa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zo(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Wx(n,t,e){let i=new Float32Array(ds),s=new U(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:ds,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:$h(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function Cf(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$h(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function Pf(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$h(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function $h(){return`

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
	`}function Xx(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let c=a.mapping,l=c===_l||c===yl,h=c===lr||c===hr;if(l||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Ma(n)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Ma(n)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function qx(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&Xr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Yx(n,t,e,i){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);for(let g in f.morphAttributes){let v=f.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let g in f)t.update(f[g],n.ARRAY_BUFFER);let d=u.morphAttributes;for(let g in d){let v=d[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],n.ARRAY_BUFFER)}}function l(u){let f=[],d=u.index,g=u.attributes.position,v=0;if(d!==null){let y=d.array;v=d.version;for(let _=0,M=y.length;_<M;_+=3){let I=y[_+0],S=y[_+1],w=y[_+2];f.push(I,S,S,w,w,I)}}else if(g!==void 0){let y=g.array;v=g.version;for(let _=0,M=y.length/3-1;_<M;_+=3){let I=_+0,S=_+1,w=_+2;f.push(I,S,S,w,w,I)}}else return;let m=new(Sd(f)?xa:ga)(f,1);m.version=v;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function $x(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,r,f*o),e.update(d,i,1)}function l(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,f*o,g),e.update(d,i,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,i,1)}function u(f,d,g,v){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,v,0,g);let p=0;for(let y=0;y<g;y++)p+=d[y]*v[y];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Zx(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Jx(n,t,e){let i=new WeakMap,s=new De;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=i.get(a);if(f===void 0||f.count!==u){let E=function(){w.dispose(),i.delete(a),a.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],_=0;d===!0&&(_=1),g===!0&&(_=2),v===!0&&(_=3);let M=a.attributes.position.count*_,I=1;M>t.maxTextureSize&&(I=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let S=new Float32Array(M*I*4*u),w=new ma(S,M,I,u);w.type=ni,w.needsUpdate=!0;let P=_*4;for(let b=0;b<u;b++){let C=m[b],N=p[b],D=y[b],F=M*I*4*b;for(let W=0;W<C.count;W++){let L=W*P;d===!0&&(s.fromBufferAttribute(C,W),S[F+L+0]=s.x,S[F+L+1]=s.y,S[F+L+2]=s.z,S[F+L+3]=0),g===!0&&(s.fromBufferAttribute(N,W),S[F+L+4]=s.x,S[F+L+5]=s.y,S[F+L+6]=s.z,S[F+L+7]=0),v===!0&&(s.fromBufferAttribute(D,W),S[F+L+8]=s.x,S[F+L+9]=s.y,S[F+L+10]=s.z,S[F+L+11]=D.itemSize===4?s.w:1)}}f={count:u,texture:w,size:new at(M,I)},i.set(a,f),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];let g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function jx(n,t,e,i){let s=new WeakMap;function r(c){let l=i.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var ba=class extends mn{constructor(t,e,i,s,r,o,a,c,l,h=rr){if(h!==rr&&h!==fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===rr&&(i=xs),i===void 0&&h===fr&&(i=ur),super(null,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:nn,this.minFilter=c!==void 0?c:nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},wd=new mn,If=new ba(1,1),Rd=new ma,Cd=new Kl,Pd=new _a,zf=[],Lf=[],Uf=new Float32Array(16),Df=new Float32Array(9),Nf=new Float32Array(4);function _r(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=zf[s];if(r===void 0&&(r=new Float32Array(s),zf[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ge(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function We(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ya(n,t){let e=Lf[t];e===void 0&&(e=new Int32Array(t),Lf[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Kx(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Qx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2fv(this.addr,t),We(e,t)}}function tv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;n.uniform3fv(this.addr,t),We(e,t)}}function ev(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4fv(this.addr,t),We(e,t)}}function nv(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,i))return;Nf.set(i),n.uniformMatrix2fv(this.addr,!1,Nf),We(e,i)}}function iv(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,i))return;Df.set(i),n.uniformMatrix3fv(this.addr,!1,Df),We(e,i)}}function sv(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,i))return;Uf.set(i),n.uniformMatrix4fv(this.addr,!1,Uf),We(e,i)}}function rv(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function ov(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2iv(this.addr,t),We(e,t)}}function av(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3iv(this.addr,t),We(e,t)}}function cv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4iv(this.addr,t),We(e,t)}}function lv(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function hv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2uiv(this.addr,t),We(e,t)}}function uv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3uiv(this.addr,t),We(e,t)}}function fv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4uiv(this.addr,t),We(e,t)}}function dv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(If.compareFunction=bd,r=If):r=wd,e.setTexture2D(t||r,s)}function pv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Cd,s)}function mv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Pd,s)}function gv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Rd,s)}function xv(n){switch(n){case 5126:return Kx;case 35664:return Qx;case 35665:return tv;case 35666:return ev;case 35674:return nv;case 35675:return iv;case 35676:return sv;case 5124:case 35670:return rv;case 35667:case 35671:return ov;case 35668:case 35672:return av;case 35669:case 35673:return cv;case 5125:return lv;case 36294:return hv;case 36295:return uv;case 36296:return fv;case 35678:case 36198:case 36298:case 36306:case 35682:return dv;case 35679:case 36299:case 36307:return pv;case 35680:case 36300:case 36308:case 36293:return mv;case 36289:case 36303:case 36311:case 36292:return gv}}function vv(n,t){n.uniform1fv(this.addr,t)}function _v(n,t){let e=_r(t,this.size,2);n.uniform2fv(this.addr,e)}function yv(n,t){let e=_r(t,this.size,3);n.uniform3fv(this.addr,e)}function Mv(n,t){let e=_r(t,this.size,4);n.uniform4fv(this.addr,e)}function bv(n,t){let e=_r(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Sv(n,t){let e=_r(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Ev(n,t){let e=_r(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Av(n,t){n.uniform1iv(this.addr,t)}function Tv(n,t){n.uniform2iv(this.addr,t)}function wv(n,t){n.uniform3iv(this.addr,t)}function Rv(n,t){n.uniform4iv(this.addr,t)}function Cv(n,t){n.uniform1uiv(this.addr,t)}function Pv(n,t){n.uniform2uiv(this.addr,t)}function Iv(n,t){n.uniform3uiv(this.addr,t)}function zv(n,t){n.uniform4uiv(this.addr,t)}function Lv(n,t,e){let i=this.cache,s=t.length,r=Ya(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),We(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||wd,r[o])}function Uv(n,t,e){let i=this.cache,s=t.length,r=Ya(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),We(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Cd,r[o])}function Dv(n,t,e){let i=this.cache,s=t.length,r=Ya(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),We(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Pd,r[o])}function Nv(n,t,e){let i=this.cache,s=t.length,r=Ya(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),We(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Rd,r[o])}function Fv(n){switch(n){case 5126:return vv;case 35664:return _v;case 35665:return yv;case 35666:return Mv;case 35674:return bv;case 35675:return Sv;case 35676:return Ev;case 5124:case 35670:return Av;case 35667:case 35671:return Tv;case 35668:case 35672:return wv;case 35669:case 35673:return Rv;case 5125:return Cv;case 36294:return Pv;case 36295:return Iv;case 36296:return zv;case 35678:case 36198:case 36298:case 36306:case 35682:return Lv;case 35679:case 36299:case 36307:return Uv;case 35680:case 36300:case 36308:case 36293:return Dv;case 36289:case 36303:case 36311:case 36292:return Nv}}var eh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=xv(e.type)}},nh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Fv(e.type)}},ih=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},sl=/(\w+)(\])?(\[|\.)?/g;function Ff(n,t){n.seq.push(t),n.map[t.id]=t}function Ov(n,t,e){let i=n.name,s=i.length;for(sl.lastIndex=0;;){let r=sl.exec(i),o=sl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Ff(e,l===void 0?new eh(a,n,t):new nh(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new ih(a),Ff(e,u)),e=u}}}var ar=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Ov(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function Of(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var Bv=37297,kv=0;function Hv(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var Bf=new jt;function Vv(n){ae._getMatrix(Bf,ae.workingColorSpace,n);let t=`mat3( ${Bf.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(n)){case qa:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function kf(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Hv(n.getShaderSource(t),o)}else return s}function Gv(n,t){let e=Vv(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Wv(n,t){let e;switch(t){case g0:e="Linear";break;case x0:e="Reinhard";break;case v0:e="Cineon";break;case kh:e="ACESFilmic";break;case y0:e="AgX";break;case M0:e="Neutral";break;case _0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Jo=new U;function Xv(){ae.getLuminanceCoefficients(Jo);let n=Jo.x.toFixed(4),t=Jo.y.toFixed(4),e=Jo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function Yv(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function $v(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function qr(n){return n!==""}function Hf(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Vf(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Zv=/^[ \t]*#include +<([\w\d./]+)>/gm;function sh(n){return n.replace(Zv,jv)}var Jv=new Map;function jv(n,t){let e=te[t];if(e===void 0){let i=Jv.get(t);if(i!==void 0)e=te[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return sh(e)}var Kv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gf(n){return n.replace(Kv,Qv)}function Qv(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wf(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function t1(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ud?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Bh?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===bi&&(t="SHADOWMAP_TYPE_VSM"),t}function e1(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case lr:case hr:t="ENVMAP_TYPE_CUBE";break;case Xa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function n1(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case hr:t="ENVMAP_MODE_REFRACTION";break}return t}function i1(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Wa:t="ENVMAP_BLENDING_MULTIPLY";break;case p0:t="ENVMAP_BLENDING_MIX";break;case m0:t="ENVMAP_BLENDING_ADD";break}return t}function s1(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function r1(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=t1(e),l=e1(e),h=n1(e),u=i1(e),f=s1(e),d=qv(e),g=Yv(r),v=s.createProgram(),m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(qr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(qr).join(`
`),p.length>0&&(p+=`
`)):(m=[Wf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),p=[Wf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xi?"#define TONE_MAPPING":"",e.toneMapping!==Xi?te.tonemapping_pars_fragment:"",e.toneMapping!==Xi?Wv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,Gv("linearToOutputTexel",e.outputColorSpace),Xv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(qr).join(`
`)),o=sh(o),o=Hf(o,e),o=Vf(o,e),a=sh(a),a=Hf(a,e),a=Vf(a,e),o=Gf(o),a=Gf(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===sf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=y+m+o,M=y+p+a,I=Of(s,s.VERTEX_SHADER,_),S=Of(s,s.FRAGMENT_SHADER,M);s.attachShader(v,I),s.attachShader(v,S),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(C){if(n.debug.checkShaderErrors){let N=s.getProgramInfoLog(v).trim(),D=s.getShaderInfoLog(I).trim(),F=s.getShaderInfoLog(S).trim(),W=!0,L=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,I,S);else{let Y=kf(s,I,"vertex"),H=kf(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+N+`
`+Y+`
`+H)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(D===""||F==="")&&(L=!1);L&&(C.diagnostics={runnable:W,programLog:N,vertexShader:{log:D,prefix:m},fragmentShader:{log:F,prefix:p}})}s.deleteShader(I),s.deleteShader(S),P=new ar(s,v),E=$v(s,v)}let P;this.getUniforms=function(){return P===void 0&&w(this),P};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(v,Bv)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=kv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=S,this}var o1=0,rh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new oh(t),e.set(t,i)),i}},oh=class{constructor(t){this.id=o1++,this.code=t,this.usedTimes=0}};function a1(n,t,e,i,s,r,o){let a=new Kr,c=new rh,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,b,C,N,D){let F=N.fog,W=D.geometry,L=E.isMeshStandardMaterial?N.environment:null,Y=(E.isMeshStandardMaterial?e:t).get(E.envMap||L),H=Y&&Y.mapping===Xa?Y.image.height:null,Q=g[E.type];E.precision!==null&&(d=s.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));let et=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,tt=et!==void 0?et.length:0,ht=0;W.morphAttributes.position!==void 0&&(ht=1),W.morphAttributes.normal!==void 0&&(ht=2),W.morphAttributes.color!==void 0&&(ht=3);let Et,q,Z,ft;if(Q){let de=ei[Q];Et=de.vertexShader,q=de.fragmentShader}else Et=E.vertexShader,q=E.fragmentShader,c.update(E),Z=c.getVertexShaderID(E),ft=c.getFragmentShaderID(E);let it=n.getRenderTarget(),Mt=n.state.buffers.depth.getReversed(),Rt=D.isInstancedMesh===!0,At=D.isBatchedMesh===!0,Wt=!!E.map,K=!!E.matcap,ot=!!Y,z=!!E.aoMap,Ct=!!E.lightMap,rt=!!E.bumpMap,xt=!!E.normalMap,dt=!!E.displacementMap,Ht=!!E.emissiveMap,bt=!!E.metalnessMap,R=!!E.roughnessMap,A=E.anisotropy>0,V=E.clearcoat>0,J=E.dispersion>0,st=E.iridescence>0,j=E.sheen>0,Pt=E.transmission>0,mt=A&&!!E.anisotropyMap,St=V&&!!E.clearcoatMap,se=V&&!!E.clearcoatNormalMap,ct=V&&!!E.clearcoatRoughnessMap,Tt=st&&!!E.iridescenceMap,Vt=st&&!!E.iridescenceThicknessMap,Xt=j&&!!E.sheenColorMap,wt=j&&!!E.sheenRoughnessMap,re=!!E.specularMap,Qt=!!E.specularColorMap,xe=!!E.specularIntensityMap,O=Pt&&!!E.transmissionMap,gt=Pt&&!!E.thicknessMap,$=!!E.gradientMap,nt=!!E.alphaMap,yt=E.alphaTest>0,vt=!!E.alphaHash,Zt=!!E.extensions,Ue=Xi;E.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Ue=n.toneMapping);let Qe={shaderID:Q,shaderType:E.type,shaderName:E.name,vertexShader:Et,fragmentShader:q,defines:E.defines,customVertexShaderID:Z,customFragmentShaderID:ft,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:At,batchingColor:At&&D._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&D.instanceColor!==null,instancingMorph:Rt&&D.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:it===null?n.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:xr,alphaToCoverage:!!E.alphaToCoverage,map:Wt,matcap:K,envMap:ot,envMapMode:ot&&Y.mapping,envMapCubeUVHeight:H,aoMap:z,lightMap:Ct,bumpMap:rt,normalMap:xt,displacementMap:f&&dt,emissiveMap:Ht,normalMapObjectSpace:xt&&E.normalMapType===A0,normalMapTangentSpace:xt&&E.normalMapType===Yh,metalnessMap:bt,roughnessMap:R,anisotropy:A,anisotropyMap:mt,clearcoat:V,clearcoatMap:St,clearcoatNormalMap:se,clearcoatRoughnessMap:ct,dispersion:J,iridescence:st,iridescenceMap:Tt,iridescenceThicknessMap:Vt,sheen:j,sheenColorMap:Xt,sheenRoughnessMap:wt,specularMap:re,specularColorMap:Qt,specularIntensityMap:xe,transmission:Pt,transmissionMap:O,thicknessMap:gt,gradientMap:$,opaque:E.transparent===!1&&E.blending===sr&&E.alphaToCoverage===!1,alphaMap:nt,alphaTest:yt,alphaHash:vt,combine:E.combine,mapUv:Wt&&v(E.map.channel),aoMapUv:z&&v(E.aoMap.channel),lightMapUv:Ct&&v(E.lightMap.channel),bumpMapUv:rt&&v(E.bumpMap.channel),normalMapUv:xt&&v(E.normalMap.channel),displacementMapUv:dt&&v(E.displacementMap.channel),emissiveMapUv:Ht&&v(E.emissiveMap.channel),metalnessMapUv:bt&&v(E.metalnessMap.channel),roughnessMapUv:R&&v(E.roughnessMap.channel),anisotropyMapUv:mt&&v(E.anisotropyMap.channel),clearcoatMapUv:St&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:se&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Tt&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:Vt&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:wt&&v(E.sheenRoughnessMap.channel),specularMapUv:re&&v(E.specularMap.channel),specularColorMapUv:Qt&&v(E.specularColorMap.channel),specularIntensityMapUv:xe&&v(E.specularIntensityMap.channel),transmissionMapUv:O&&v(E.transmissionMap.channel),thicknessMapUv:gt&&v(E.thicknessMap.channel),alphaMapUv:nt&&v(E.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(xt||A),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!W.attributes.uv&&(Wt||nt),fog:!!F,useFog:E.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Mt,skinning:D.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:ht,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ue,decodeVideoTexture:Wt&&E.map.isVideoTexture===!0&&ae.getTransfer(E.map.colorSpace)===me,decodeVideoTextureEmissive:Ht&&E.emissiveMap.isVideoTexture===!0&&ae.getTransfer(E.emissiveMap.colorSpace)===me,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===qn,flipSided:E.side===pn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Zt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Zt&&E.extensions.multiDraw===!0||At)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Qe.vertexUv1s=l.has(1),Qe.vertexUv2s=l.has(2),Qe.vertexUv3s=l.has(3),l.clear(),Qe}function p(E){let b=[];if(E.shaderID?b.push(E.shaderID):(b.push(E.customVertexShaderID),b.push(E.customFragmentShaderID)),E.defines!==void 0)for(let C in E.defines)b.push(C),b.push(E.defines[C]);return E.isRawShaderMaterial===!1&&(y(b,E),_(b,E),b.push(n.outputColorSpace)),b.push(E.customProgramCacheKey),b.join()}function y(E,b){E.push(b.precision),E.push(b.outputColorSpace),E.push(b.envMapMode),E.push(b.envMapCubeUVHeight),E.push(b.mapUv),E.push(b.alphaMapUv),E.push(b.lightMapUv),E.push(b.aoMapUv),E.push(b.bumpMapUv),E.push(b.normalMapUv),E.push(b.displacementMapUv),E.push(b.emissiveMapUv),E.push(b.metalnessMapUv),E.push(b.roughnessMapUv),E.push(b.anisotropyMapUv),E.push(b.clearcoatMapUv),E.push(b.clearcoatNormalMapUv),E.push(b.clearcoatRoughnessMapUv),E.push(b.iridescenceMapUv),E.push(b.iridescenceThicknessMapUv),E.push(b.sheenColorMapUv),E.push(b.sheenRoughnessMapUv),E.push(b.specularMapUv),E.push(b.specularColorMapUv),E.push(b.specularIntensityMapUv),E.push(b.transmissionMapUv),E.push(b.thicknessMapUv),E.push(b.combine),E.push(b.fogExp2),E.push(b.sizeAttenuation),E.push(b.morphTargetsCount),E.push(b.morphAttributeCount),E.push(b.numDirLights),E.push(b.numPointLights),E.push(b.numSpotLights),E.push(b.numSpotLightMaps),E.push(b.numHemiLights),E.push(b.numRectAreaLights),E.push(b.numDirLightShadows),E.push(b.numPointLightShadows),E.push(b.numSpotLightShadows),E.push(b.numSpotLightShadowsWithMaps),E.push(b.numLightProbes),E.push(b.shadowMapType),E.push(b.toneMapping),E.push(b.numClippingPlanes),E.push(b.numClipIntersection),E.push(b.depthPacking)}function _(E,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),E.push(a.mask)}function M(E){let b=g[E.type],C;if(b){let N=ei[b];C=j0.clone(N.uniforms)}else C=E.uniforms;return C}function I(E,b){let C;for(let N=0,D=h.length;N<D;N++){let F=h[N];if(F.cacheKey===b){C=F,++C.usedTimes;break}}return C===void 0&&(C=new r1(n,b,E,r),h.push(C)),C}function S(E){if(--E.usedTimes===0){let b=h.indexOf(E);h[b]=h[h.length-1],h.pop(),E.destroy()}}function w(E){c.remove(E)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:I,releaseProgram:S,releaseShaderCache:w,programs:h,dispose:P}}function c1(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function l1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Xf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function qf(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,f,d,g,v,m){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},n[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function a(u,f,d,g,v,m){let p=o(u,f,d,g,v,m);d.transmission>0?i.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,g,v,m){let p=o(u,f,d,g,v,m);d.transmission>0?i.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||l1),i.length>1&&i.sort(f||Xf),s.length>1&&s.sort(f||Xf)}function h(){for(let u=t,f=n.length;u<f;u++){let d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function h1(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new qf,n.set(i,[o])):s>=r.length?(o=new qf,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function u1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Bt};break;case"SpotLight":e={position:new U,direction:new U,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new U,halfWidth:new U,halfHeight:new U};break}return n[t.id]=e,e}}}function f1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var d1=0;function p1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function m1(n){let t=new u1,e=f1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);let s=new U,r=new ie,o=new ie;function a(l){let h=0,u=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,y=0,_=0,M=0,I=0,S=0,w=0;l.sort(p1);for(let E=0,b=l.length;E<b;E++){let C=l[E],N=C.color,D=C.intensity,F=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=N.r*D,u+=N.g*D,f+=N.b*D;else if(C.isLightProbe){for(let L=0;L<9;L++)i.probe[L].addScaledVector(C.sh.coefficients[L],D);w++}else if(C.isDirectionalLight){let L=t.get(C);if(L.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let Y=C.shadow,H=e.get(C);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,i.directionalShadow[d]=H,i.directionalShadowMap[d]=W,i.directionalShadowMatrix[d]=C.shadow.matrix,y++}i.directional[d]=L,d++}else if(C.isSpotLight){let L=t.get(C);L.position.setFromMatrixPosition(C.matrixWorld),L.color.copy(N).multiplyScalar(D),L.distance=F,L.coneCos=Math.cos(C.angle),L.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),L.decay=C.decay,i.spot[v]=L;let Y=C.shadow;if(C.map&&(i.spotLightMap[I]=C.map,I++,Y.updateMatrices(C),C.castShadow&&S++),i.spotLightMatrix[v]=Y.matrix,C.castShadow){let H=e.get(C);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,i.spotShadow[v]=H,i.spotShadowMap[v]=W,M++}v++}else if(C.isRectAreaLight){let L=t.get(C);L.color.copy(N).multiplyScalar(D),L.halfWidth.set(C.width*.5,0,0),L.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=L,m++}else if(C.isPointLight){let L=t.get(C);if(L.color.copy(C.color).multiplyScalar(C.intensity),L.distance=C.distance,L.decay=C.decay,C.castShadow){let Y=C.shadow,H=e.get(C);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,H.shadowCameraNear=Y.camera.near,H.shadowCameraFar=Y.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=W,i.pointShadowMatrix[g]=C.shadow.matrix,_++}i.point[g]=L,g++}else if(C.isHemisphereLight){let L=t.get(C);L.skyColor.copy(C.color).multiplyScalar(D),L.groundColor.copy(C.groundColor).multiplyScalar(D),i.hemi[p]=L,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pt.LTC_FLOAT_1,i.rectAreaLTC2=pt.LTC_FLOAT_2):(i.rectAreaLTC1=pt.LTC_HALF_1,i.rectAreaLTC2=pt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;let P=i.hash;(P.directionalLength!==d||P.pointLength!==g||P.spotLength!==v||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==y||P.numPointShadows!==_||P.numSpotShadows!==M||P.numSpotMaps!==I||P.numLightProbes!==w)&&(i.directional.length=d,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=M+I-S,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=w,P.directionalLength=d,P.pointLength=g,P.spotLength=v,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=y,P.numPointShadows=_,P.numSpotShadows=M,P.numSpotMaps=I,P.numLightProbes=w,i.version=d1++)}function c(l,h){let u=0,f=0,d=0,g=0,v=0,m=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){let _=l[p];if(_.isDirectionalLight){let M=i.directional[u];M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(_.isSpotLight){let M=i.spot[d];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(_.isRectAreaLight){let M=i.rectArea[g];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(_.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(_.width*.5,0,0),M.halfHeight.set(0,_.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){let M=i.point[f];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){let M=i.hemi[v];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:i}}function Yf(n){let t=new m1(n),e=[],i=[];function s(h){l.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function g1(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Yf(n),t.set(s,[a])):r>=o.length?(a=new Yf(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var ah=class extends ii{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=S0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ch=class extends ii{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},x1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,v1=`uniform sampler2D shadow_pass;
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
}`;function _1(n,t,e){let i=new vs,s=new at,r=new at,o=new De,a=new ah({depthPacking:E0}),c=new ch,l={},h=e.maxTextureSize,u={[qi]:pn,[pn]:qi,[qn]:qn},f=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:x1,fragmentShader:v1}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new Ee;g.setAttribute("position",new pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new le(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ud;let p=this.type;this.render=function(S,w,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;let E=n.getRenderTarget(),b=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Wi),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let D=p!==bi&&this.type===bi,F=p===bi&&this.type!==bi;for(let W=0,L=S.length;W<L;W++){let Y=S[W],H=Y.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let Q=H.getFrameExtents();if(s.multiply(Q),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,H.mapSize.y=r.y)),H.map===null||D===!0||F===!0){let tt=this.type!==bi?{minFilter:nn,magFilter:nn}:{};H.map!==null&&H.map.dispose(),H.map=new Ti(s.x,s.y,tt),H.map.texture.name=Y.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();let et=H.getViewportCount();for(let tt=0;tt<et;tt++){let ht=H.getViewport(tt);o.set(r.x*ht.x,r.y*ht.y,r.x*ht.z,r.y*ht.w),N.viewport(o),H.updateMatrices(Y,tt),i=H.getFrustum(),M(w,P,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===bi&&y(H,P),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,b,C)};function y(S,w){let P=t.update(v);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Ti(s.x,s.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(w,null,P,f,v,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(w,null,P,d,v,null)}function _(S,w,P,E){let b=null,C=P.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)b=C;else if(b=P.isPointLight===!0?c:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){let N=b.uuid,D=w.uuid,F=l[N];F===void 0&&(F={},l[N]=F);let W=F[D];W===void 0&&(W=b.clone(),F[D]=W,w.addEventListener("dispose",I)),b=W}if(b.visible=w.visible,b.wireframe=w.wireframe,E===bi?b.side=w.shadowSide!==null?w.shadowSide:w.side:b.side=w.shadowSide!==null?w.shadowSide:u[w.side],b.alphaMap=w.alphaMap,b.alphaTest=w.alphaTest,b.map=w.map,b.clipShadows=w.clipShadows,b.clippingPlanes=w.clippingPlanes,b.clipIntersection=w.clipIntersection,b.displacementMap=w.displacementMap,b.displacementScale=w.displacementScale,b.displacementBias=w.displacementBias,b.wireframeLinewidth=w.wireframeLinewidth,b.linewidth=w.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let N=n.properties.get(b);N.light=P}return b}function M(S,w,P,E,b){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&b===bi)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,S.matrixWorld);let D=t.update(S),F=S.material;if(Array.isArray(F)){let W=D.groups;for(let L=0,Y=W.length;L<Y;L++){let H=W[L],Q=F[H.materialIndex];if(Q&&Q.visible){let et=_(S,Q,E,b);S.onBeforeShadow(n,S,w,P,D,et,H),n.renderBufferDirect(P,null,D,et,S,H),S.onAfterShadow(n,S,w,P,D,et,H)}}}else if(F.visible){let W=_(S,F,E,b);S.onBeforeShadow(n,S,w,P,D,W,null),n.renderBufferDirect(P,null,D,W,S,null),S.onAfterShadow(n,S,w,P,D,W,null)}}let N=S.children;for(let D=0,F=N.length;D<F;D++)M(N[D],w,P,E,b)}function I(S){S.target.removeEventListener("dispose",I);for(let P in l){let E=l[P],b=S.target.uuid;b in E&&(E[b].dispose(),delete E[b])}}}var y1={[fl]:dl,[pl]:xl,[ml]:vl,[cr]:gl,[dl]:fl,[xl]:pl,[vl]:ml,[gl]:cr};function M1(n,t){function e(){let O=!1,gt=new De,$=null,nt=new De(0,0,0,0);return{setMask:function(yt){$!==yt&&!O&&(n.colorMask(yt,yt,yt,yt),$=yt)},setLocked:function(yt){O=yt},setClear:function(yt,vt,Zt,Ue,Qe){Qe===!0&&(yt*=Ue,vt*=Ue,Zt*=Ue),gt.set(yt,vt,Zt,Ue),nt.equals(gt)===!1&&(n.clearColor(yt,vt,Zt,Ue),nt.copy(gt))},reset:function(){O=!1,$=null,nt.set(-1,0,0,0)}}}function i(){let O=!1,gt=!1,$=null,nt=null,yt=null;return{setReversed:function(vt){if(gt!==vt){let Zt=t.get("EXT_clip_control");gt?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT);let Ue=yt;yt=null,this.setClear(Ue)}gt=vt},getReversed:function(){return gt},setTest:function(vt){vt?it(n.DEPTH_TEST):Mt(n.DEPTH_TEST)},setMask:function(vt){$!==vt&&!O&&(n.depthMask(vt),$=vt)},setFunc:function(vt){if(gt&&(vt=y1[vt]),nt!==vt){switch(vt){case fl:n.depthFunc(n.NEVER);break;case dl:n.depthFunc(n.ALWAYS);break;case pl:n.depthFunc(n.LESS);break;case cr:n.depthFunc(n.LEQUAL);break;case ml:n.depthFunc(n.EQUAL);break;case gl:n.depthFunc(n.GEQUAL);break;case xl:n.depthFunc(n.GREATER);break;case vl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}nt=vt}},setLocked:function(vt){O=vt},setClear:function(vt){yt!==vt&&(gt&&(vt=1-vt),n.clearDepth(vt),yt=vt)},reset:function(){O=!1,$=null,nt=null,yt=null,gt=!1}}}function s(){let O=!1,gt=null,$=null,nt=null,yt=null,vt=null,Zt=null,Ue=null,Qe=null;return{setTest:function(de){O||(de?it(n.STENCIL_TEST):Mt(n.STENCIL_TEST))},setMask:function(de){gt!==de&&!O&&(n.stencilMask(de),gt=de)},setFunc:function(de,kn,mi){($!==de||nt!==kn||yt!==mi)&&(n.stencilFunc(de,kn,mi),$=de,nt=kn,yt=mi)},setOp:function(de,kn,mi){(vt!==de||Zt!==kn||Ue!==mi)&&(n.stencilOp(de,kn,mi),vt=de,Zt=kn,Ue=mi)},setLocked:function(de){O=de},setClear:function(de){Qe!==de&&(n.clearStencil(de),Qe=de)},reset:function(){O=!1,gt=null,$=null,nt=null,yt=null,vt=null,Zt=null,Ue=null,Qe=null}}}let r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,y=null,_=null,M=null,I=null,S=null,w=new Bt(0,0,0),P=0,E=!1,b=null,C=null,N=null,D=null,F=null,W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),L=!1,Y=0,H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(H)[1]),L=Y>=1):H.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),L=Y>=2);let Q=null,et={},tt=n.getParameter(n.SCISSOR_BOX),ht=n.getParameter(n.VIEWPORT),Et=new De().fromArray(tt),q=new De().fromArray(ht);function Z(O,gt,$,nt){let yt=new Uint8Array(4),vt=n.createTexture();n.bindTexture(O,vt),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Zt=0;Zt<$;Zt++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(gt,0,n.RGBA,1,1,nt,0,n.RGBA,n.UNSIGNED_BYTE,yt):n.texImage2D(gt+Zt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,yt);return vt}let ft={};ft[n.TEXTURE_2D]=Z(n.TEXTURE_2D,n.TEXTURE_2D,1),ft[n.TEXTURE_CUBE_MAP]=Z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ft[n.TEXTURE_2D_ARRAY]=Z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ft[n.TEXTURE_3D]=Z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(n.DEPTH_TEST),o.setFunc(cr),rt(!1),xt(Zu),it(n.CULL_FACE),z(Wi);function it(O){h[O]!==!0&&(n.enable(O),h[O]=!0)}function Mt(O){h[O]!==!1&&(n.disable(O),h[O]=!1)}function Rt(O,gt){return u[O]!==gt?(n.bindFramebuffer(O,gt),u[O]=gt,O===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=gt),O===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=gt),!0):!1}function At(O,gt){let $=d,nt=!1;if(O){$=f.get(gt),$===void 0&&($=[],f.set(gt,$));let yt=O.textures;if($.length!==yt.length||$[0]!==n.COLOR_ATTACHMENT0){for(let vt=0,Zt=yt.length;vt<Zt;vt++)$[vt]=n.COLOR_ATTACHMENT0+vt;$.length=yt.length,nt=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,nt=!0);nt&&n.drawBuffers($)}function Wt(O){return g!==O?(n.useProgram(O),g=O,!0):!1}let K={[us]:n.FUNC_ADD,[jp]:n.FUNC_SUBTRACT,[Kp]:n.FUNC_REVERSE_SUBTRACT};K[Qp]=n.MIN,K[t0]=n.MAX;let ot={[e0]:n.ZERO,[n0]:n.ONE,[i0]:n.SRC_COLOR,[hl]:n.SRC_ALPHA,[l0]:n.SRC_ALPHA_SATURATE,[a0]:n.DST_COLOR,[r0]:n.DST_ALPHA,[s0]:n.ONE_MINUS_SRC_COLOR,[ul]:n.ONE_MINUS_SRC_ALPHA,[c0]:n.ONE_MINUS_DST_COLOR,[o0]:n.ONE_MINUS_DST_ALPHA,[h0]:n.CONSTANT_COLOR,[u0]:n.ONE_MINUS_CONSTANT_COLOR,[f0]:n.CONSTANT_ALPHA,[d0]:n.ONE_MINUS_CONSTANT_ALPHA};function z(O,gt,$,nt,yt,vt,Zt,Ue,Qe,de){if(O===Wi){v===!0&&(Mt(n.BLEND),v=!1);return}if(v===!1&&(it(n.BLEND),v=!0),O!==Jp){if(O!==m||de!==E){if((p!==us||M!==us)&&(n.blendEquation(n.FUNC_ADD),p=us,M=us),de)switch(O){case sr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Jr:n.blendFunc(n.ONE,n.ONE);break;case Ju:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ju:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case sr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Jr:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ju:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ju:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}y=null,_=null,I=null,S=null,w.set(0,0,0),P=0,m=O,E=de}return}yt=yt||gt,vt=vt||$,Zt=Zt||nt,(gt!==p||yt!==M)&&(n.blendEquationSeparate(K[gt],K[yt]),p=gt,M=yt),($!==y||nt!==_||vt!==I||Zt!==S)&&(n.blendFuncSeparate(ot[$],ot[nt],ot[vt],ot[Zt]),y=$,_=nt,I=vt,S=Zt),(Ue.equals(w)===!1||Qe!==P)&&(n.blendColor(Ue.r,Ue.g,Ue.b,Qe),w.copy(Ue),P=Qe),m=O,E=!1}function Ct(O,gt){O.side===qn?Mt(n.CULL_FACE):it(n.CULL_FACE);let $=O.side===pn;gt&&($=!$),rt($),O.blending===sr&&O.transparent===!1?z(Wi):z(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);let nt=O.stencilWrite;a.setTest(nt),nt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ht(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?it(n.SAMPLE_ALPHA_TO_COVERAGE):Mt(n.SAMPLE_ALPHA_TO_COVERAGE)}function rt(O){b!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),b=O)}function xt(O){O!==$p?(it(n.CULL_FACE),O!==C&&(O===Zu?n.cullFace(n.BACK):O===Zp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Mt(n.CULL_FACE),C=O}function dt(O){O!==N&&(L&&n.lineWidth(O),N=O)}function Ht(O,gt,$){O?(it(n.POLYGON_OFFSET_FILL),(D!==gt||F!==$)&&(n.polygonOffset(gt,$),D=gt,F=$)):Mt(n.POLYGON_OFFSET_FILL)}function bt(O){O?it(n.SCISSOR_TEST):Mt(n.SCISSOR_TEST)}function R(O){O===void 0&&(O=n.TEXTURE0+W-1),Q!==O&&(n.activeTexture(O),Q=O)}function A(O,gt,$){$===void 0&&(Q===null?$=n.TEXTURE0+W-1:$=Q);let nt=et[$];nt===void 0&&(nt={type:void 0,texture:void 0},et[$]=nt),(nt.type!==O||nt.texture!==gt)&&(Q!==$&&(n.activeTexture($),Q=$),n.bindTexture(O,gt||ft[O]),nt.type=O,nt.texture=gt)}function V(){let O=et[Q];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function J(){try{n.compressedTexImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function st(){try{n.compressedTexImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function j(){try{n.texSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Pt(){try{n.texSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function mt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function St(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function se(){try{n.texStorage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ct(){try{n.texStorage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Tt(){try{n.texImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Vt(){try{n.texImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Xt(O){Et.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),Et.copy(O))}function wt(O){q.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),q.copy(O))}function re(O,gt){let $=l.get(gt);$===void 0&&($=new WeakMap,l.set(gt,$));let nt=$.get(O);nt===void 0&&(nt=n.getUniformBlockIndex(gt,O.name),$.set(O,nt))}function Qt(O,gt){let nt=l.get(gt).get(O);c.get(gt)!==nt&&(n.uniformBlockBinding(gt,nt,O.__bindingPointIndex),c.set(gt,nt))}function xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Q=null,et={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,y=null,_=null,M=null,I=null,S=null,w=new Bt(0,0,0),P=0,E=!1,b=null,C=null,N=null,D=null,F=null,Et.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:it,disable:Mt,bindFramebuffer:Rt,drawBuffers:At,useProgram:Wt,setBlending:z,setMaterial:Ct,setFlipSided:rt,setCullFace:xt,setLineWidth:dt,setPolygonOffset:Ht,setScissorTest:bt,activeTexture:R,bindTexture:A,unbindTexture:V,compressedTexImage2D:J,compressedTexImage3D:st,texImage2D:Tt,texImage3D:Vt,updateUBOMapping:re,uniformBlockBinding:Qt,texStorage2D:se,texStorage3D:ct,texSubImage2D:j,texSubImage3D:Pt,compressedTexSubImage2D:mt,compressedTexSubImage3D:St,scissor:Xt,viewport:wt,reset:xe}}function $f(n,t,e,i){let s=b1(i);switch(e){case gd:return n*t;case vd:return n*t;case _d:return n*t*2;case oo:return n*t/s.components*s.byteLength;case Wh:return n*t/s.components*s.byteLength;case yd:return n*t*2/s.components*s.byteLength;case Xh:return n*t*2/s.components*s.byteLength;case xd:return n*t*3/s.components*s.byteLength;case dn:return n*t*4/s.components*s.byteLength;case qh:return n*t*4/s.components*s.byteLength;case oa:case aa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ca:case la:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Sl:case Al:return Math.max(n,16)*Math.max(t,8)/4;case bl:case El:return Math.max(n,8)*Math.max(t,8)/2;case Tl:case wl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Rl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Cl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Pl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Il:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case zl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Ll:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Ul:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Dl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Nl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Fl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ol:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Bl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case kl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Hl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Vl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ha:case Gl:case Wl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Md:case Xl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case ql:case Yl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function b1(n){switch(n){case An:case dd:return{byteLength:1,components:1};case jr:case pd:case ro:return{byteLength:2,components:1};case Vh:case Gh:return{byteLength:2,components:4};case xs:case Hh:case ni:return{byteLength:4,components:1};case md:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function S1(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new at,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,A){return d?new OffscreenCanvas(R,A):da("canvas")}function v(R,A,V){let J=1,st=bt(R);if((st.width>V||st.height>V)&&(J=V/Math.max(st.width,st.height)),J<1)if(typeof HTMLImageElement!="undefined"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&R instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&R instanceof ImageBitmap||typeof VideoFrame!="undefined"&&R instanceof VideoFrame){let j=Math.floor(J*st.width),Pt=Math.floor(J*st.height);u===void 0&&(u=g(j,Pt));let mt=A?g(j,Pt):u;return mt.width=j,mt.height=Pt,mt.getContext("2d").drawImage(R,0,0,j,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+j+"x"+Pt+")."),mt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){n.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(R,A,V,J,st=!1){if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let j=A;if(A===n.RED&&(V===n.FLOAT&&(j=n.R32F),V===n.HALF_FLOAT&&(j=n.R16F),V===n.UNSIGNED_BYTE&&(j=n.R8)),A===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.R8UI),V===n.UNSIGNED_SHORT&&(j=n.R16UI),V===n.UNSIGNED_INT&&(j=n.R32UI),V===n.BYTE&&(j=n.R8I),V===n.SHORT&&(j=n.R16I),V===n.INT&&(j=n.R32I)),A===n.RG&&(V===n.FLOAT&&(j=n.RG32F),V===n.HALF_FLOAT&&(j=n.RG16F),V===n.UNSIGNED_BYTE&&(j=n.RG8)),A===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.RG8UI),V===n.UNSIGNED_SHORT&&(j=n.RG16UI),V===n.UNSIGNED_INT&&(j=n.RG32UI),V===n.BYTE&&(j=n.RG8I),V===n.SHORT&&(j=n.RG16I),V===n.INT&&(j=n.RG32I)),A===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.RGB8UI),V===n.UNSIGNED_SHORT&&(j=n.RGB16UI),V===n.UNSIGNED_INT&&(j=n.RGB32UI),V===n.BYTE&&(j=n.RGB8I),V===n.SHORT&&(j=n.RGB16I),V===n.INT&&(j=n.RGB32I)),A===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),V===n.UNSIGNED_INT&&(j=n.RGBA32UI),V===n.BYTE&&(j=n.RGBA8I),V===n.SHORT&&(j=n.RGBA16I),V===n.INT&&(j=n.RGBA32I)),A===n.RGB&&V===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),A===n.RGBA){let Pt=st?qa:ae.getTransfer(J);V===n.FLOAT&&(j=n.RGBA32F),V===n.HALF_FLOAT&&(j=n.RGBA16F),V===n.UNSIGNED_BYTE&&(j=Pt===me?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function M(R,A){let V;return R?A===null||A===xs||A===ur?V=n.DEPTH24_STENCIL8:A===ni?V=n.DEPTH32F_STENCIL8:A===jr&&(V=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===xs||A===ur?V=n.DEPTH_COMPONENT24:A===ni?V=n.DEPTH_COMPONENT32F:A===jr&&(V=n.DEPTH_COMPONENT16),V}function I(R,A){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==nn&&R.minFilter!==cn?Math.log2(Math.max(A.width,A.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?A.mipmaps.length:1}function S(R){let A=R.target;A.removeEventListener("dispose",S),P(A),A.isVideoTexture&&h.delete(A)}function w(R){let A=R.target;A.removeEventListener("dispose",w),b(A)}function P(R){let A=i.get(R);if(A.__webglInit===void 0)return;let V=R.source,J=f.get(V);if(J){let st=J[A.__cacheKey];st.usedTimes--,st.usedTimes===0&&E(R),Object.keys(J).length===0&&f.delete(V)}i.remove(R)}function E(R){let A=i.get(R);n.deleteTexture(A.__webglTexture);let V=R.source,J=f.get(V);delete J[A.__cacheKey],o.memory.textures--}function b(R){let A=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(A.__webglFramebuffer[J]))for(let st=0;st<A.__webglFramebuffer[J].length;st++)n.deleteFramebuffer(A.__webglFramebuffer[J][st]);else n.deleteFramebuffer(A.__webglFramebuffer[J]);A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer[J])}else{if(Array.isArray(A.__webglFramebuffer))for(let J=0;J<A.__webglFramebuffer.length;J++)n.deleteFramebuffer(A.__webglFramebuffer[J]);else n.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&n.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let J=0;J<A.__webglColorRenderbuffer.length;J++)A.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(A.__webglColorRenderbuffer[J]);A.__webglDepthRenderbuffer&&n.deleteRenderbuffer(A.__webglDepthRenderbuffer)}let V=R.textures;for(let J=0,st=V.length;J<st;J++){let j=i.get(V[J]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(V[J])}i.remove(R)}let C=0;function N(){C=0}function D(){let R=C;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),C+=1,R}function F(R){let A=[];return A.push(R.wrapS),A.push(R.wrapT),A.push(R.wrapR||0),A.push(R.magFilter),A.push(R.minFilter),A.push(R.anisotropy),A.push(R.internalFormat),A.push(R.format),A.push(R.type),A.push(R.generateMipmaps),A.push(R.premultiplyAlpha),A.push(R.flipY),A.push(R.unpackAlignment),A.push(R.colorSpace),A.join()}function W(R,A){let V=i.get(R);if(R.isVideoTexture&&dt(R),R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){let J=R.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(V,R,A);return}}e.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+A)}function L(R,A){let V=i.get(R);if(R.version>0&&V.__version!==R.version){q(V,R,A);return}e.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+A)}function Y(R,A){let V=i.get(R);if(R.version>0&&V.__version!==R.version){q(V,R,A);return}e.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+A)}function H(R,A){let V=i.get(R);if(R.version>0&&V.__version!==R.version){Z(V,R,A);return}e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+A)}let Q={[zn]:n.REPEAT,[ps]:n.CLAMP_TO_EDGE,[Ml]:n.MIRRORED_REPEAT},et={[nn]:n.NEAREST,[b0]:n.NEAREST_MIPMAP_NEAREST,[Po]:n.NEAREST_MIPMAP_LINEAR,[cn]:n.LINEAR,[Cc]:n.LINEAR_MIPMAP_NEAREST,[ms]:n.LINEAR_MIPMAP_LINEAR},tt={[T0]:n.NEVER,[z0]:n.ALWAYS,[w0]:n.LESS,[bd]:n.LEQUAL,[R0]:n.EQUAL,[I0]:n.GEQUAL,[C0]:n.GREATER,[P0]:n.NOTEQUAL};function ht(R,A){if(A.type===ni&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===cn||A.magFilter===Cc||A.magFilter===Po||A.magFilter===ms||A.minFilter===cn||A.minFilter===Cc||A.minFilter===Po||A.minFilter===ms)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,Q[A.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,Q[A.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,Q[A.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,et[A.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,et[A.minFilter]),A.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,tt[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===nn||A.minFilter!==Po&&A.minFilter!==ms||A.type===ni&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){let V=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function Et(R,A){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,A.addEventListener("dispose",S));let J=A.source,st=f.get(J);st===void 0&&(st={},f.set(J,st));let j=F(A);if(j!==R.__cacheKey){st[j]===void 0&&(st[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,V=!0),st[j].usedTimes++;let Pt=st[R.__cacheKey];Pt!==void 0&&(st[R.__cacheKey].usedTimes--,Pt.usedTimes===0&&E(A)),R.__cacheKey=j,R.__webglTexture=st[j].texture}return V}function q(R,A,V){let J=n.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),A.isData3DTexture&&(J=n.TEXTURE_3D);let st=Et(R,A),j=A.source;e.bindTexture(J,R.__webglTexture,n.TEXTURE0+V);let Pt=i.get(j);if(j.version!==Pt.__version||st===!0){e.activeTexture(n.TEXTURE0+V);let mt=ae.getPrimaries(ae.workingColorSpace),St=A.colorSpace===Gi?null:ae.getPrimaries(A.colorSpace),se=A.colorSpace===Gi||mt===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let ct=v(A.image,!1,s.maxTextureSize);ct=Ht(A,ct);let Tt=r.convert(A.format,A.colorSpace),Vt=r.convert(A.type),Xt=_(A.internalFormat,Tt,Vt,A.colorSpace,A.isVideoTexture);ht(J,A);let wt,re=A.mipmaps,Qt=A.isVideoTexture!==!0,xe=Pt.__version===void 0||st===!0,O=j.dataReady,gt=I(A,ct);if(A.isDepthTexture)Xt=M(A.format===fr,A.type),xe&&(Qt?e.texStorage2D(n.TEXTURE_2D,1,Xt,ct.width,ct.height):e.texImage2D(n.TEXTURE_2D,0,Xt,ct.width,ct.height,0,Tt,Vt,null));else if(A.isDataTexture)if(re.length>0){Qt&&xe&&e.texStorage2D(n.TEXTURE_2D,gt,Xt,re[0].width,re[0].height);for(let $=0,nt=re.length;$<nt;$++)wt=re[$],Qt?O&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,wt.width,wt.height,Tt,Vt,wt.data):e.texImage2D(n.TEXTURE_2D,$,Xt,wt.width,wt.height,0,Tt,Vt,wt.data);A.generateMipmaps=!1}else Qt?(xe&&e.texStorage2D(n.TEXTURE_2D,gt,Xt,ct.width,ct.height),O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct.width,ct.height,Tt,Vt,ct.data)):e.texImage2D(n.TEXTURE_2D,0,Xt,ct.width,ct.height,0,Tt,Vt,ct.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Qt&&xe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,Xt,re[0].width,re[0].height,ct.depth);for(let $=0,nt=re.length;$<nt;$++)if(wt=re[$],A.format!==dn)if(Tt!==null)if(Qt){if(O)if(A.layerUpdates.size>0){let yt=$f(wt.width,wt.height,A.format,A.type);for(let vt of A.layerUpdates){let Zt=wt.data.subarray(vt*yt/wt.data.BYTES_PER_ELEMENT,(vt+1)*yt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,vt,wt.width,wt.height,1,Tt,Zt)}A.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,wt.width,wt.height,ct.depth,Tt,wt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,Xt,wt.width,wt.height,ct.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qt?O&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,wt.width,wt.height,ct.depth,Tt,Vt,wt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,$,Xt,wt.width,wt.height,ct.depth,0,Tt,Vt,wt.data)}else{Qt&&xe&&e.texStorage2D(n.TEXTURE_2D,gt,Xt,re[0].width,re[0].height);for(let $=0,nt=re.length;$<nt;$++)wt=re[$],A.format!==dn?Tt!==null?Qt?O&&e.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,wt.width,wt.height,Tt,wt.data):e.compressedTexImage2D(n.TEXTURE_2D,$,Xt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?O&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,wt.width,wt.height,Tt,Vt,wt.data):e.texImage2D(n.TEXTURE_2D,$,Xt,wt.width,wt.height,0,Tt,Vt,wt.data)}else if(A.isDataArrayTexture)if(Qt){if(xe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,Xt,ct.width,ct.height,ct.depth),O)if(A.layerUpdates.size>0){let $=$f(ct.width,ct.height,A.format,A.type);for(let nt of A.layerUpdates){let yt=ct.data.subarray(nt*$/ct.data.BYTES_PER_ELEMENT,(nt+1)*$/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,nt,ct.width,ct.height,1,Tt,Vt,yt)}A.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,Tt,Vt,ct.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Xt,ct.width,ct.height,ct.depth,0,Tt,Vt,ct.data);else if(A.isData3DTexture)Qt?(xe&&e.texStorage3D(n.TEXTURE_3D,gt,Xt,ct.width,ct.height,ct.depth),O&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,Tt,Vt,ct.data)):e.texImage3D(n.TEXTURE_3D,0,Xt,ct.width,ct.height,ct.depth,0,Tt,Vt,ct.data);else if(A.isFramebufferTexture){if(xe)if(Qt)e.texStorage2D(n.TEXTURE_2D,gt,Xt,ct.width,ct.height);else{let $=ct.width,nt=ct.height;for(let yt=0;yt<gt;yt++)e.texImage2D(n.TEXTURE_2D,yt,Xt,$,nt,0,Tt,Vt,null),$>>=1,nt>>=1}}else if(re.length>0){if(Qt&&xe){let $=bt(re[0]);e.texStorage2D(n.TEXTURE_2D,gt,Xt,$.width,$.height)}for(let $=0,nt=re.length;$<nt;$++)wt=re[$],Qt?O&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,Tt,Vt,wt):e.texImage2D(n.TEXTURE_2D,$,Xt,Tt,Vt,wt);A.generateMipmaps=!1}else if(Qt){if(xe){let $=bt(ct);e.texStorage2D(n.TEXTURE_2D,gt,Xt,$.width,$.height)}O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Tt,Vt,ct)}else e.texImage2D(n.TEXTURE_2D,0,Xt,Tt,Vt,ct);m(A)&&p(J),Pt.__version=j.version,A.onUpdate&&A.onUpdate(A)}R.__version=A.version}function Z(R,A,V){if(A.image.length!==6)return;let J=Et(R,A),st=A.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+V);let j=i.get(st);if(st.version!==j.__version||J===!0){e.activeTexture(n.TEXTURE0+V);let Pt=ae.getPrimaries(ae.workingColorSpace),mt=A.colorSpace===Gi?null:ae.getPrimaries(A.colorSpace),St=A.colorSpace===Gi||Pt===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let se=A.isCompressedTexture||A.image[0].isCompressedTexture,ct=A.image[0]&&A.image[0].isDataTexture,Tt=[];for(let nt=0;nt<6;nt++)!se&&!ct?Tt[nt]=v(A.image[nt],!0,s.maxCubemapSize):Tt[nt]=ct?A.image[nt].image:A.image[nt],Tt[nt]=Ht(A,Tt[nt]);let Vt=Tt[0],Xt=r.convert(A.format,A.colorSpace),wt=r.convert(A.type),re=_(A.internalFormat,Xt,wt,A.colorSpace),Qt=A.isVideoTexture!==!0,xe=j.__version===void 0||J===!0,O=st.dataReady,gt=I(A,Vt);ht(n.TEXTURE_CUBE_MAP,A);let $;if(se){Qt&&xe&&e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,re,Vt.width,Vt.height);for(let nt=0;nt<6;nt++){$=Tt[nt].mipmaps;for(let yt=0;yt<$.length;yt++){let vt=$[yt];A.format!==dn?Xt!==null?Qt?O&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,0,0,vt.width,vt.height,Xt,vt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,re,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qt?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,0,0,vt.width,vt.height,Xt,wt,vt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,re,vt.width,vt.height,0,Xt,wt,vt.data)}}}else{if($=A.mipmaps,Qt&&xe){$.length>0&&gt++;let nt=bt(Tt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,re,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(ct){Qt?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Tt[nt].width,Tt[nt].height,Xt,wt,Tt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,re,Tt[nt].width,Tt[nt].height,0,Xt,wt,Tt[nt].data);for(let yt=0;yt<$.length;yt++){let Zt=$[yt].image[nt].image;Qt?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,0,0,Zt.width,Zt.height,Xt,wt,Zt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,re,Zt.width,Zt.height,0,Xt,wt,Zt.data)}}else{Qt?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Xt,wt,Tt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,re,Xt,wt,Tt[nt]);for(let yt=0;yt<$.length;yt++){let vt=$[yt];Qt?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,0,0,Xt,wt,vt.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,re,Xt,wt,vt.image[nt])}}}m(A)&&p(n.TEXTURE_CUBE_MAP),j.__version=st.version,A.onUpdate&&A.onUpdate(A)}R.__version=A.version}function ft(R,A,V,J,st,j){let Pt=r.convert(V.format,V.colorSpace),mt=r.convert(V.type),St=_(V.internalFormat,Pt,mt,V.colorSpace),se=i.get(A),ct=i.get(V);if(ct.__renderTarget=A,!se.__hasExternalTextures){let Tt=Math.max(1,A.width>>j),Vt=Math.max(1,A.height>>j);st===n.TEXTURE_3D||st===n.TEXTURE_2D_ARRAY?e.texImage3D(st,j,St,Tt,Vt,A.depth,0,Pt,mt,null):e.texImage2D(st,j,St,Tt,Vt,0,Pt,mt,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),xt(A)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,st,ct.__webglTexture,0,rt(A)):(st===n.TEXTURE_2D||st>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,st,ct.__webglTexture,j),e.bindFramebuffer(n.FRAMEBUFFER,null)}function it(R,A,V){if(n.bindRenderbuffer(n.RENDERBUFFER,R),A.depthBuffer){let J=A.depthTexture,st=J&&J.isDepthTexture?J.type:null,j=M(A.stencilBuffer,st),Pt=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,mt=rt(A);xt(A)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt,j,A.width,A.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt,j,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,j,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Pt,n.RENDERBUFFER,R)}else{let J=A.textures;for(let st=0;st<J.length;st++){let j=J[st],Pt=r.convert(j.format,j.colorSpace),mt=r.convert(j.type),St=_(j.internalFormat,Pt,mt,j.colorSpace),se=rt(A);V&&xt(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,se,St,A.width,A.height):xt(A)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,se,St,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,St,A.width,A.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Mt(R,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let J=i.get(A.depthTexture);J.__renderTarget=A,(!J.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),W(A.depthTexture,0);let st=J.__webglTexture,j=rt(A);if(A.depthTexture.format===rr)xt(A)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,st,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,st,0);else if(A.depthTexture.format===fr)xt(A)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,st,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function Rt(R){let A=i.get(R),V=R.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==R.depthTexture){let J=R.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),J){let st=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,J.removeEventListener("dispose",st)};J.addEventListener("dispose",st),A.__depthDisposeCallback=st}A.__boundDepthTexture=J}if(R.depthTexture&&!A.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Mt(A.__webglFramebuffer,R)}else if(V){A.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer[J]),A.__webglDepthbuffer[J]===void 0)A.__webglDepthbuffer[J]=n.createRenderbuffer(),it(A.__webglDepthbuffer[J],R,!1);else{let st=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=A.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,st,n.RENDERBUFFER,j)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=n.createRenderbuffer(),it(A.__webglDepthbuffer,R,!1);else{let J=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=A.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,st)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function At(R,A,V){let J=i.get(R);A!==void 0&&ft(J.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&Rt(R)}function Wt(R){let A=R.texture,V=i.get(R),J=i.get(A);R.addEventListener("dispose",w);let st=R.textures,j=R.isWebGLCubeRenderTarget===!0,Pt=st.length>1;if(Pt||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=A.version,o.memory.textures++),j){V.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(A.mipmaps&&A.mipmaps.length>0){V.__webglFramebuffer[mt]=[];for(let St=0;St<A.mipmaps.length;St++)V.__webglFramebuffer[mt][St]=n.createFramebuffer()}else V.__webglFramebuffer[mt]=n.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){V.__webglFramebuffer=[];for(let mt=0;mt<A.mipmaps.length;mt++)V.__webglFramebuffer[mt]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(Pt)for(let mt=0,St=st.length;mt<St;mt++){let se=i.get(st[mt]);se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&xt(R)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let mt=0;mt<st.length;mt++){let St=st[mt];V.__webglColorRenderbuffer[mt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[mt]);let se=r.convert(St.format,St.colorSpace),ct=r.convert(St.type),Tt=_(St.internalFormat,se,ct,St.colorSpace,R.isXRRenderTarget===!0),Vt=rt(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Vt,Tt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,V.__webglColorRenderbuffer[mt])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),it(V.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),ht(n.TEXTURE_CUBE_MAP,A);for(let mt=0;mt<6;mt++)if(A.mipmaps&&A.mipmaps.length>0)for(let St=0;St<A.mipmaps.length;St++)ft(V.__webglFramebuffer[mt][St],R,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,St);else ft(V.__webglFramebuffer[mt],R,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(A)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let mt=0,St=st.length;mt<St;mt++){let se=st[mt],ct=i.get(se);e.bindTexture(n.TEXTURE_2D,ct.__webglTexture),ht(n.TEXTURE_2D,se),ft(V.__webglFramebuffer,R,se,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,0),m(se)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let mt=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(mt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(mt,J.__webglTexture),ht(mt,A),A.mipmaps&&A.mipmaps.length>0)for(let St=0;St<A.mipmaps.length;St++)ft(V.__webglFramebuffer[St],R,A,n.COLOR_ATTACHMENT0,mt,St);else ft(V.__webglFramebuffer,R,A,n.COLOR_ATTACHMENT0,mt,0);m(A)&&p(mt),e.unbindTexture()}R.depthBuffer&&Rt(R)}function K(R){let A=R.textures;for(let V=0,J=A.length;V<J;V++){let st=A[V];if(m(st)){let j=y(R),Pt=i.get(st).__webglTexture;e.bindTexture(j,Pt),p(j),e.unbindTexture()}}}let ot=[],z=[];function Ct(R){if(R.samples>0){if(xt(R)===!1){let A=R.textures,V=R.width,J=R.height,st=n.COLOR_BUFFER_BIT,j=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Pt=i.get(R),mt=A.length>1;if(mt)for(let St=0;St<A.length;St++)e.bindFramebuffer(n.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let St=0;St<A.length;St++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(st|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(st|=n.STENCIL_BUFFER_BIT)),mt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Pt.__webglColorRenderbuffer[St]);let se=i.get(A[St]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,se,0)}n.blitFramebuffer(0,0,V,J,0,0,V,J,st,n.NEAREST),c===!0&&(ot.length=0,z.length=0,ot.push(n.COLOR_ATTACHMENT0+St),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ot.push(j),z.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,z)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ot))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),mt)for(let St=0;St<A.length;St++){e.bindFramebuffer(n.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,Pt.__webglColorRenderbuffer[St]);let se=i.get(A[St]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,se,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){let A=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[A])}}}function rt(R){return Math.min(s.maxSamples,R.samples)}function xt(R){let A=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function dt(R){let A=o.render.frame;h.get(R)!==A&&(h.set(R,A),R.update())}function Ht(R,A){let V=R.colorSpace,J=R.format,st=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==xr&&V!==Gi&&(ae.getTransfer(V)===me?(J!==dn||st!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),A}function bt(R){return typeof HTMLImageElement!="undefined"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame!="undefined"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=N,this.setTexture2D=W,this.setTexture2DArray=L,this.setTexture3D=Y,this.setTextureCube=H,this.rebindTextures=At,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=xt}function E1(n,t){function e(i,s=Gi){let r,o=ae.getTransfer(s);if(i===An)return n.UNSIGNED_BYTE;if(i===Vh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Gh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===md)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===dd)return n.BYTE;if(i===pd)return n.SHORT;if(i===jr)return n.UNSIGNED_SHORT;if(i===Hh)return n.INT;if(i===xs)return n.UNSIGNED_INT;if(i===ni)return n.FLOAT;if(i===ro)return n.HALF_FLOAT;if(i===gd)return n.ALPHA;if(i===xd)return n.RGB;if(i===dn)return n.RGBA;if(i===vd)return n.LUMINANCE;if(i===_d)return n.LUMINANCE_ALPHA;if(i===rr)return n.DEPTH_COMPONENT;if(i===fr)return n.DEPTH_STENCIL;if(i===oo)return n.RED;if(i===Wh)return n.RED_INTEGER;if(i===yd)return n.RG;if(i===Xh)return n.RG_INTEGER;if(i===qh)return n.RGBA_INTEGER;if(i===oa||i===aa||i===ca||i===la)if(o===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===oa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===oa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===la)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===bl||i===Sl||i===El||i===Al)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===bl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===El)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Al)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Tl||i===wl||i===Rl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Tl||i===wl)return o===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Rl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Cl||i===Pl||i===Il||i===zl||i===Ll||i===Ul||i===Dl||i===Nl||i===Fl||i===Ol||i===Bl||i===kl||i===Hl||i===Vl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Cl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Pl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Il)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===zl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ll)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ul)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Dl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Nl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ol)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Bl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===kl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Hl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Vl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ha||i===Gl||i===Wl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===ha)return o===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Gl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Md||i===Xl||i===ql||i===Yl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ha)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Xl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ql)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Yl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ur?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var lh=class extends an{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Ei=class extends Je{constructor(){super(),this.isGroup=!0,this.type="Group"}},A1={type:"move"},Yr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let v of t.hand.values()){let m=e.getJointPose(v,i),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(A1)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ei;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},T1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,w1=`
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

}`,hh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new mn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Un({vertexShader:T1,fragmentShader:w1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new le(new $i(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},uh=class extends Yi{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null,v=new hh,m=e.getContextAttributes(),p=null,y=null,_=[],M=[],I=new at,S=null,w=new an;w.viewport=new De;let P=new an;P.viewport=new De;let E=[w,P],b=new lh,C=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=_[q];return Z===void 0&&(Z=new Yr,_[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=_[q];return Z===void 0&&(Z=new Yr,_[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=_[q];return Z===void 0&&(Z=new Yr,_[q]=Z),Z.getHandSpace()};function D(q){let Z=M.indexOf(q.inputSource);if(Z===-1)return;let ft=_[Z];ft!==void 0&&(ft.update(q.inputSource,q.frame,l||o),ft.dispatchEvent({type:q.type,data:q.inputSource}))}function F(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",W);for(let q=0;q<_.length;q++){let Z=M[q];Z!==null&&(M[q]=null,_[q].disconnect(Z))}C=null,N=null,v.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,y=null,Et.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",F),s.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){let Z={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,Z),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Ti(d.framebufferWidth,d.framebufferHeight,{format:dn,type:An,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let Z=null,ft=null,it=null;m.depth&&(it=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Z=m.stencil?fr:rr,ft=m.stencil?ur:xs);let Mt={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Mt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Ti(f.textureWidth,f.textureHeight,{format:dn,type:An,depthTexture:new ba(f.textureWidth,f.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Et.setContext(s),Et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function W(q){for(let Z=0;Z<q.removed.length;Z++){let ft=q.removed[Z],it=M.indexOf(ft);it>=0&&(M[it]=null,_[it].disconnect(ft))}for(let Z=0;Z<q.added.length;Z++){let ft=q.added[Z],it=M.indexOf(ft);if(it===-1){for(let Rt=0;Rt<_.length;Rt++)if(Rt>=M.length){M.push(ft),it=Rt;break}else if(M[Rt]===null){M[Rt]=ft,it=Rt;break}if(it===-1)break}let Mt=_[it];Mt&&Mt.connect(ft)}}let L=new U,Y=new U;function H(q,Z,ft){L.setFromMatrixPosition(Z.matrixWorld),Y.setFromMatrixPosition(ft.matrixWorld);let it=L.distanceTo(Y),Mt=Z.projectionMatrix.elements,Rt=ft.projectionMatrix.elements,At=Mt[14]/(Mt[10]-1),Wt=Mt[14]/(Mt[10]+1),K=(Mt[9]+1)/Mt[5],ot=(Mt[9]-1)/Mt[5],z=(Mt[8]-1)/Mt[0],Ct=(Rt[8]+1)/Rt[0],rt=At*z,xt=At*Ct,dt=it/(-z+Ct),Ht=dt*-z;if(Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ht),q.translateZ(dt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Mt[10]===-1)q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let bt=At+dt,R=Wt+dt,A=rt-Ht,V=xt+(it-Ht),J=K*Wt/R*bt,st=ot*Wt/R*bt;q.projectionMatrix.makePerspective(A,V,J,st,bt,R),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Q(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let Z=q.near,ft=q.far;v.texture!==null&&(v.depthNear>0&&(Z=v.depthNear),v.depthFar>0&&(ft=v.depthFar)),b.near=P.near=w.near=Z,b.far=P.far=w.far=ft,(C!==b.near||N!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),C=b.near,N=b.far),w.layers.mask=q.layers.mask|2,P.layers.mask=q.layers.mask|4,b.layers.mask=w.layers.mask|P.layers.mask;let it=q.parent,Mt=b.cameras;Q(b,it);for(let Rt=0;Rt<Mt.length;Rt++)Q(Mt[Rt],it);Mt.length===2?H(b,w,P):b.projectionMatrix.copy(w.projectionMatrix),et(q,b,it)};function et(q,Z,ft){ft===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(ft.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Zl*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(b)};let tt=null;function ht(q,Z){if(h=Z.getViewerPose(l||o),g=Z,h!==null){let ft=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let it=!1;ft.length!==b.cameras.length&&(b.cameras.length=0,it=!0);for(let Rt=0;Rt<ft.length;Rt++){let At=ft[Rt],Wt=null;if(d!==null)Wt=d.getViewport(At);else{let ot=u.getViewSubImage(f,At);Wt=ot.viewport,Rt===0&&(t.setRenderTargetTextures(y,ot.colorTexture,f.ignoreDepthValues?void 0:ot.depthStencilTexture),t.setRenderTarget(y))}let K=E[Rt];K===void 0&&(K=new an,K.layers.enable(Rt),K.viewport=new De,E[Rt]=K),K.matrix.fromArray(At.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(At.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(Wt.x,Wt.y,Wt.width,Wt.height),Rt===0&&(b.matrix.copy(K.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),it===!0&&b.cameras.push(K)}let Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")){let Rt=u.getDepthInformation(ft[0]);Rt&&Rt.isValid&&Rt.texture&&v.init(t,Rt,s.renderState)}}for(let ft=0;ft<_.length;ft++){let it=M[ft],Mt=_[ft];it!==null&&Mt!==void 0&&Mt.update(it,Z,l||o)}tt&&tt(q,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}let Et=new Td;Et.setAnimationLoop(ht),this.setAnimationLoop=function(q){tt=q},this.dispose=function(){}}},ls=new Fe,R1=new ie;function C1(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Ad(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,_,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,y,_):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===pn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===pn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let y=t.get(p),_=y.envMap,M=y.envMapRotation;_&&(m.envMap.value=_,ls.copy(M),ls.x*=-1,ls.y*=-1,ls.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ls.y*=-1,ls.z*=-1),m.envMapRotation.value.setFromMatrix4(R1.makeRotationFromEuler(ls)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=_*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===pn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){let y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function P1(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,_){let M=_.program;i.uniformBlockBinding(y,M)}function l(y,_){let M=s[y.id];M===void 0&&(g(y),M=h(y),s[y.id]=M,y.addEventListener("dispose",m));let I=_.program;i.updateUBOMapping(y,I);let S=t.render.frame;r[y.id]!==S&&(f(y),r[y.id]=S)}function h(y){let _=u();y.__bindingPointIndex=_;let M=n.createBuffer(),I=y.__size,S=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,I,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,M),M}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let _=s[y.id],M=y.uniforms,I=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let S=0,w=M.length;S<w;S++){let P=Array.isArray(M[S])?M[S]:[M[S]];for(let E=0,b=P.length;E<b;E++){let C=P[E];if(d(C,S,E,I)===!0){let N=C.__offset,D=Array.isArray(C.value)?C.value:[C.value],F=0;for(let W=0;W<D.length;W++){let L=D[W],Y=v(L);typeof L=="number"||typeof L=="boolean"?(C.__data[0]=L,n.bufferSubData(n.UNIFORM_BUFFER,N+F,C.__data)):L.isMatrix3?(C.__data[0]=L.elements[0],C.__data[1]=L.elements[1],C.__data[2]=L.elements[2],C.__data[3]=0,C.__data[4]=L.elements[3],C.__data[5]=L.elements[4],C.__data[6]=L.elements[5],C.__data[7]=0,C.__data[8]=L.elements[6],C.__data[9]=L.elements[7],C.__data[10]=L.elements[8],C.__data[11]=0):(L.toArray(C.__data,F),F+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(y,_,M,I){let S=y.value,w=_+"_"+M;if(I[w]===void 0)return typeof S=="number"||typeof S=="boolean"?I[w]=S:I[w]=S.clone(),!0;{let P=I[w];if(typeof S=="number"||typeof S=="boolean"){if(P!==S)return I[w]=S,!0}else if(P.equals(S)===!1)return P.copy(S),!0}return!1}function g(y){let _=y.uniforms,M=0,I=16;for(let w=0,P=_.length;w<P;w++){let E=Array.isArray(_[w])?_[w]:[_[w]];for(let b=0,C=E.length;b<C;b++){let N=E[b],D=Array.isArray(N.value)?N.value:[N.value];for(let F=0,W=D.length;F<W;F++){let L=D[F],Y=v(L),H=M%I,Q=H%Y.boundary,et=H+Q;M+=Q,et!==0&&I-et<Y.storage&&(M+=I-et),N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=M,M+=Y.storage}}}let S=M%I;return S>0&&(M+=I-S),y.__size=M,y.__cache={},this}function v(y){let _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function m(y){let _=y.target;_.removeEventListener("dispose",m);let M=o.indexOf(_.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(let y in s)n.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Sa=class{constructor(t={}){let{canvas:e=U0(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext!="undefined"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;let g=new Uint32Array(4),v=new Int32Array(4),m=null,p=null,y=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Re,this.toneMapping=Xi,this.toneMappingExposure=1;let M=this,I=!1,S=0,w=0,P=null,E=-1,b=null,C=new De,N=new De,D=null,F=new Bt(0),W=0,L=e.width,Y=e.height,H=1,Q=null,et=null,tt=new De(0,0,L,Y),ht=new De(0,0,L,Y),Et=!1,q=new vs,Z=!1,ft=!1,it=new ie,Mt=new ie,Rt=new U,At=new De,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},K=!1;function ot(){return P===null?H:1}let z=i;function Ct(T,B){return e.getContext(T,B)}try{let T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Oh}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",vt,!1),z===null){let B="webgl2";if(z=Ct(B,T),z===null)throw Ct(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let rt,xt,dt,Ht,bt,R,A,V,J,st,j,Pt,mt,St,se,ct,Tt,Vt,Xt,wt,re,Qt,xe,O;function gt(){rt=new qx(z),rt.init(),Qt=new E1(z,rt),xt=new kx(z,rt,t,Qt),dt=new M1(z,rt),xt.reverseDepthBuffer&&f&&dt.buffers.depth.setReversed(!0),Ht=new Zx(z),bt=new c1,R=new S1(z,rt,dt,bt,xt,Qt,Ht),A=new Vx(M),V=new Xx(M),J=new nm(z),xe=new Ox(z,J),st=new Yx(z,J,Ht,xe),j=new jx(z,st,J,Ht),Xt=new Jx(z,xt,R),ct=new Hx(bt),Pt=new a1(M,A,V,rt,xt,xe,ct),mt=new C1(M,bt),St=new h1,se=new g1(rt),Vt=new Fx(M,A,V,dt,j,d,c),Tt=new _1(M,j,xt),O=new P1(z,Ht,xt,dt),wt=new Bx(z,rt,Ht),re=new $x(z,rt,Ht),Ht.programs=Pt.programs,M.capabilities=xt,M.extensions=rt,M.properties=bt,M.renderLists=St,M.shadowMap=Tt,M.state=dt,M.info=Ht}gt();let $=new uh(M,z);this.xr=$,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let T=rt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=rt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(T){T!==void 0&&(H=T,this.setSize(L,Y,!1))},this.getSize=function(T){return T.set(L,Y)},this.setSize=function(T,B,G=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=T,Y=B,e.width=Math.floor(T*H),e.height=Math.floor(B*H),G===!0&&(e.style.width=T+"px",e.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(L*H,Y*H).floor()},this.setDrawingBufferSize=function(T,B,G){L=T,Y=B,H=G,e.width=Math.floor(T*G),e.height=Math.floor(B*G),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(C)},this.getViewport=function(T){return T.copy(tt)},this.setViewport=function(T,B,G,X){T.isVector4?tt.set(T.x,T.y,T.z,T.w):tt.set(T,B,G,X),dt.viewport(C.copy(tt).multiplyScalar(H).round())},this.getScissor=function(T){return T.copy(ht)},this.setScissor=function(T,B,G,X){T.isVector4?ht.set(T.x,T.y,T.z,T.w):ht.set(T,B,G,X),dt.scissor(N.copy(ht).multiplyScalar(H).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(T){dt.setScissorTest(Et=T)},this.setOpaqueSort=function(T){Q=T},this.setTransparentSort=function(T){et=T},this.getClearColor=function(T){return T.copy(Vt.getClearColor())},this.setClearColor=function(){Vt.setClearColor.apply(Vt,arguments)},this.getClearAlpha=function(){return Vt.getClearAlpha()},this.setClearAlpha=function(){Vt.setClearAlpha.apply(Vt,arguments)},this.clear=function(T=!0,B=!0,G=!0){let X=0;if(T){let k=!1;if(P!==null){let lt=P.texture.format;k=lt===qh||lt===Xh||lt===Wh}if(k){let lt=P.texture.type,_t=lt===An||lt===xs||lt===jr||lt===ur||lt===Vh||lt===Gh,It=Vt.getClearColor(),zt=Vt.getClearAlpha(),qt=It.r,Jt=It.g,Lt=It.b;_t?(g[0]=qt,g[1]=Jt,g[2]=Lt,g[3]=zt,z.clearBufferuiv(z.COLOR,0,g)):(v[0]=qt,v[1]=Jt,v[2]=Lt,v[3]=zt,z.clearBufferiv(z.COLOR,0,v))}else X|=z.COLOR_BUFFER_BIT}B&&(X|=z.DEPTH_BUFFER_BIT),G&&(X|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),St.dispose(),se.dispose(),bt.dispose(),A.dispose(),V.dispose(),j.dispose(),xe.dispose(),O.dispose(),Pt.dispose(),$.dispose(),$.removeEventListener("sessionstart",ku),$.removeEventListener("sessionend",Hu),is.stop()};function nt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;let T=Ht.autoReset,B=Tt.enabled,G=Tt.autoUpdate,X=Tt.needsUpdate,k=Tt.type;gt(),Ht.autoReset=T,Tt.enabled=B,Tt.autoUpdate=G,Tt.needsUpdate=X,Tt.type=k}function vt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Zt(T){let B=T.target;B.removeEventListener("dispose",Zt),Ue(B)}function Ue(T){Qe(T),bt.remove(T)}function Qe(T){let B=bt.get(T).programs;B!==void 0&&(B.forEach(function(G){Pt.releaseProgram(G)}),T.isShaderMaterial&&Pt.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,G,X,k,lt){B===null&&(B=Wt);let _t=k.isMesh&&k.matrixWorld.determinant()<0,It=Wp(T,B,G,X,k);dt.setMaterial(X,_t);let zt=G.index,qt=1;if(X.wireframe===!0){if(zt=st.getWireframeAttribute(G),zt===void 0)return;qt=2}let Jt=G.drawRange,Lt=G.attributes.position,ce=Jt.start*qt,ve=(Jt.start+Jt.count)*qt;lt!==null&&(ce=Math.max(ce,lt.start*qt),ve=Math.min(ve,(lt.start+lt.count)*qt)),zt!==null?(ce=Math.max(ce,0),ve=Math.min(ve,zt.count)):Lt!=null&&(ce=Math.max(ce,0),ve=Math.min(ve,Lt.count));let ye=ve-ce;if(ye<0||ye===1/0)return;xe.setup(k,X,It,G,zt);let un,ue=wt;if(zt!==null&&(un=J.get(zt),ue=re,ue.setIndex(un)),k.isMesh)X.wireframe===!0?(dt.setLineWidth(X.wireframeLinewidth*ot()),ue.setMode(z.LINES)):ue.setMode(z.TRIANGLES);else if(k.isLine){let Dt=X.linewidth;Dt===void 0&&(Dt=1),dt.setLineWidth(Dt*ot()),k.isLineSegments?ue.setMode(z.LINES):k.isLineLoop?ue.setMode(z.LINE_LOOP):ue.setMode(z.LINE_STRIP)}else k.isPoints?ue.setMode(z.POINTS):k.isSprite&&ue.setMode(z.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ue.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(rt.get("WEBGL_multi_draw"))ue.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Dt=k._multiDrawStarts,gi=k._multiDrawCounts,fe=k._multiDrawCount,Hn=zt?J.get(zt).bytesPerElement:1,ks=bt.get(X).currentProgram.getUniforms();for(let bn=0;bn<fe;bn++)ks.setValue(z,"_gl_DrawID",bn),ue.render(Dt[bn]/Hn,gi[bn])}else if(k.isInstancedMesh)ue.renderInstances(ce,ye,k.count);else if(G.isInstancedBufferGeometry){let Dt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,gi=Math.min(G.instanceCount,Dt);ue.renderInstances(ce,ye,gi)}else ue.render(ce,ye)};function de(T,B,G){T.transparent===!0&&T.side===qn&&T.forceSinglePass===!1?(T.side=pn,T.needsUpdate=!0,Co(T,B,G),T.side=qi,T.needsUpdate=!0,Co(T,B,G),T.side=qn):Co(T,B,G)}this.compile=function(T,B,G=null){G===null&&(G=T),p=se.get(G),p.init(B),_.push(p),G.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),T!==G&&T.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let X=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let lt=k.material;if(lt)if(Array.isArray(lt))for(let _t=0;_t<lt.length;_t++){let It=lt[_t];de(It,G,k),X.add(It)}else de(lt,G,k),X.add(lt)}),_.pop(),p=null,X},this.compileAsync=function(T,B,G=null){let X=this.compile(T,B,G);return new Promise(k=>{function lt(){if(X.forEach(function(_t){bt.get(_t).currentProgram.isReady()&&X.delete(_t)}),X.size===0){k(T);return}setTimeout(lt,10)}rt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let kn=null;function mi(T){kn&&kn(T)}function ku(){is.stop()}function Hu(){is.start()}let is=new Td;is.setAnimationLoop(mi),typeof self!="undefined"&&is.setContext(self),this.setAnimationLoop=function(T){kn=T,$.setAnimationLoop(T),T===null?is.stop():is.start()},$.addEventListener("sessionstart",ku),$.addEventListener("sessionend",Hu),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(B),B=$.getCamera()),T.isScene===!0&&T.onBeforeRender(M,T,B,P),p=se.get(T,_.length),p.init(B),_.push(p),Mt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),q.setFromProjectionMatrix(Mt),ft=this.localClippingEnabled,Z=ct.init(this.clippingPlanes,ft),m=St.get(T,y.length),m.init(),y.push(m),$.enabled===!0&&$.isPresenting===!0){let lt=M.xr.getDepthSensingMesh();lt!==null&&Rc(lt,B,-1/0,M.sortObjects)}Rc(T,B,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(Q,et),K=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,K&&Vt.addToRenderList(m,T),this.info.render.frame++,Z===!0&&ct.beginShadows();let G=p.state.shadowsArray;Tt.render(G,T,B),Z===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();let X=m.opaque,k=m.transmissive;if(p.setupLights(),B.isArrayCamera){let lt=B.cameras;if(k.length>0)for(let _t=0,It=lt.length;_t<It;_t++){let zt=lt[_t];Gu(X,k,T,zt)}K&&Vt.render(T);for(let _t=0,It=lt.length;_t<It;_t++){let zt=lt[_t];Vu(m,T,zt,zt.viewport)}}else k.length>0&&Gu(X,k,T,B),K&&Vt.render(T),Vu(m,T,B);P!==null&&(R.updateMultisampleRenderTarget(P),R.updateRenderTargetMipmap(P)),T.isScene===!0&&T.onAfterRender(M,T,B),xe.resetDefaultState(),E=-1,b=null,_.pop(),_.length>0?(p=_[_.length-1],Z===!0&&ct.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Rc(T,B,G,X){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||q.intersectsSprite(T)){X&&At.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Mt);let _t=j.update(T),It=T.material;It.visible&&m.push(T,_t,It,G,At.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||q.intersectsObject(T))){let _t=j.update(T),It=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),At.copy(T.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),At.copy(_t.boundingSphere.center)),At.applyMatrix4(T.matrixWorld).applyMatrix4(Mt)),Array.isArray(It)){let zt=_t.groups;for(let qt=0,Jt=zt.length;qt<Jt;qt++){let Lt=zt[qt],ce=It[Lt.materialIndex];ce&&ce.visible&&m.push(T,_t,ce,G,At.z,Lt)}}else It.visible&&m.push(T,_t,It,G,At.z,null)}}let lt=T.children;for(let _t=0,It=lt.length;_t<It;_t++)Rc(lt[_t],B,G,X)}function Vu(T,B,G,X){let k=T.opaque,lt=T.transmissive,_t=T.transparent;p.setupLightsView(G),Z===!0&&ct.setGlobalState(M.clippingPlanes,G),X&&dt.viewport(C.copy(X)),k.length>0&&Ro(k,B,G),lt.length>0&&Ro(lt,B,G),_t.length>0&&Ro(_t,B,G),dt.buffers.depth.setTest(!0),dt.buffers.depth.setMask(!0),dt.buffers.color.setMask(!0),dt.setPolygonOffset(!1)}function Gu(T,B,G,X){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new Ti(1,1,{generateMipmaps:!0,type:rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float")?ro:An,minFilter:ms,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ae.workingColorSpace}));let lt=p.state.transmissionRenderTarget[X.id],_t=X.viewport||C;lt.setSize(_t.z,_t.w);let It=M.getRenderTarget();M.setRenderTarget(lt),M.getClearColor(F),W=M.getClearAlpha(),W<1&&M.setClearColor(16777215,.5),M.clear(),K&&Vt.render(G);let zt=M.toneMapping;M.toneMapping=Xi;let qt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),Z===!0&&ct.setGlobalState(M.clippingPlanes,X),Ro(T,G,X),R.updateMultisampleRenderTarget(lt),R.updateRenderTargetMipmap(lt),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Jt=!1;for(let Lt=0,ce=B.length;Lt<ce;Lt++){let ve=B[Lt],ye=ve.object,un=ve.geometry,ue=ve.material,Dt=ve.group;if(ue.side===qn&&ye.layers.test(X.layers)){let gi=ue.side;ue.side=pn,ue.needsUpdate=!0,Wu(ye,G,X,un,ue,Dt),ue.side=gi,ue.needsUpdate=!0,Jt=!0}}Jt===!0&&(R.updateMultisampleRenderTarget(lt),R.updateRenderTargetMipmap(lt))}M.setRenderTarget(It),M.setClearColor(F,W),qt!==void 0&&(X.viewport=qt),M.toneMapping=zt}function Ro(T,B,G){let X=B.isScene===!0?B.overrideMaterial:null;for(let k=0,lt=T.length;k<lt;k++){let _t=T[k],It=_t.object,zt=_t.geometry,qt=X===null?_t.material:X,Jt=_t.group;It.layers.test(G.layers)&&Wu(It,B,G,zt,qt,Jt)}}function Wu(T,B,G,X,k,lt){T.onBeforeRender(M,B,G,X,k,lt),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(M,B,G,X,T,lt),k.transparent===!0&&k.side===qn&&k.forceSinglePass===!1?(k.side=pn,k.needsUpdate=!0,M.renderBufferDirect(G,B,X,k,T,lt),k.side=qi,k.needsUpdate=!0,M.renderBufferDirect(G,B,X,k,T,lt),k.side=qn):M.renderBufferDirect(G,B,X,k,T,lt),T.onAfterRender(M,B,G,X,k,lt)}function Co(T,B,G){B.isScene!==!0&&(B=Wt);let X=bt.get(T),k=p.state.lights,lt=p.state.shadowsArray,_t=k.state.version,It=Pt.getParameters(T,k.state,lt,B,G),zt=Pt.getProgramCacheKey(It),qt=X.programs;X.environment=T.isMeshStandardMaterial?B.environment:null,X.fog=B.fog,X.envMap=(T.isMeshStandardMaterial?V:A).get(T.envMap||X.environment),X.envMapRotation=X.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,qt===void 0&&(T.addEventListener("dispose",Zt),qt=new Map,X.programs=qt);let Jt=qt.get(zt);if(Jt!==void 0){if(X.currentProgram===Jt&&X.lightsStateVersion===_t)return qu(T,It),Jt}else It.uniforms=Pt.getUniforms(T),T.onBeforeCompile(It,M),Jt=Pt.acquireProgram(It,zt),qt.set(zt,Jt),X.uniforms=It.uniforms;let Lt=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Lt.clippingPlanes=ct.uniform),qu(T,It),X.needsLights=qp(T),X.lightsStateVersion=_t,X.needsLights&&(Lt.ambientLightColor.value=k.state.ambient,Lt.lightProbe.value=k.state.probe,Lt.directionalLights.value=k.state.directional,Lt.directionalLightShadows.value=k.state.directionalShadow,Lt.spotLights.value=k.state.spot,Lt.spotLightShadows.value=k.state.spotShadow,Lt.rectAreaLights.value=k.state.rectArea,Lt.ltc_1.value=k.state.rectAreaLTC1,Lt.ltc_2.value=k.state.rectAreaLTC2,Lt.pointLights.value=k.state.point,Lt.pointLightShadows.value=k.state.pointShadow,Lt.hemisphereLights.value=k.state.hemi,Lt.directionalShadowMap.value=k.state.directionalShadowMap,Lt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Lt.spotShadowMap.value=k.state.spotShadowMap,Lt.spotLightMatrix.value=k.state.spotLightMatrix,Lt.spotLightMap.value=k.state.spotLightMap,Lt.pointShadowMap.value=k.state.pointShadowMap,Lt.pointShadowMatrix.value=k.state.pointShadowMatrix),X.currentProgram=Jt,X.uniformsList=null,Jt}function Xu(T){if(T.uniformsList===null){let B=T.currentProgram.getUniforms();T.uniformsList=ar.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function qu(T,B){let G=bt.get(T);G.outputColorSpace=B.outputColorSpace,G.batching=B.batching,G.batchingColor=B.batchingColor,G.instancing=B.instancing,G.instancingColor=B.instancingColor,G.instancingMorph=B.instancingMorph,G.skinning=B.skinning,G.morphTargets=B.morphTargets,G.morphNormals=B.morphNormals,G.morphColors=B.morphColors,G.morphTargetsCount=B.morphTargetsCount,G.numClippingPlanes=B.numClippingPlanes,G.numIntersection=B.numClipIntersection,G.vertexAlphas=B.vertexAlphas,G.vertexTangents=B.vertexTangents,G.toneMapping=B.toneMapping}function Wp(T,B,G,X,k){B.isScene!==!0&&(B=Wt),R.resetTextureUnits();let lt=B.fog,_t=X.isMeshStandardMaterial?B.environment:null,It=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:xr,zt=(X.isMeshStandardMaterial?V:A).get(X.envMap||_t),qt=X.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Jt=!!G.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Lt=!!G.morphAttributes.position,ce=!!G.morphAttributes.normal,ve=!!G.morphAttributes.color,ye=Xi;X.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ye=M.toneMapping);let un=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ue=un!==void 0?un.length:0,Dt=bt.get(X),gi=p.state.lights;if(Z===!0&&(ft===!0||T!==b)){let Pn=T===b&&X.id===E;ct.setState(X,T,Pn)}let fe=!1;X.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==gi.state.version||Dt.outputColorSpace!==It||k.isBatchedMesh&&Dt.batching===!1||!k.isBatchedMesh&&Dt.batching===!0||k.isBatchedMesh&&Dt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Dt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Dt.instancing===!1||!k.isInstancedMesh&&Dt.instancing===!0||k.isSkinnedMesh&&Dt.skinning===!1||!k.isSkinnedMesh&&Dt.skinning===!0||k.isInstancedMesh&&Dt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Dt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Dt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Dt.instancingMorph===!1&&k.morphTexture!==null||Dt.envMap!==zt||X.fog===!0&&Dt.fog!==lt||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==ct.numPlanes||Dt.numIntersection!==ct.numIntersection)||Dt.vertexAlphas!==qt||Dt.vertexTangents!==Jt||Dt.morphTargets!==Lt||Dt.morphNormals!==ce||Dt.morphColors!==ve||Dt.toneMapping!==ye||Dt.morphTargetsCount!==ue)&&(fe=!0):(fe=!0,Dt.__version=X.version);let Hn=Dt.currentProgram;fe===!0&&(Hn=Co(X,B,k));let ks=!1,bn=!1,Dr=!1,Me=Hn.getUniforms(),ti=Dt.uniforms;if(dt.useProgram(Hn.program)&&(ks=!0,bn=!0,Dr=!0),X.id!==E&&(E=X.id,bn=!0),ks||b!==T){dt.buffers.depth.getReversed()?(it.copy(T.projectionMatrix),N0(it),F0(it),Me.setValue(z,"projectionMatrix",it)):Me.setValue(z,"projectionMatrix",T.projectionMatrix),Me.setValue(z,"viewMatrix",T.matrixWorldInverse);let Di=Me.map.cameraPosition;Di!==void 0&&Di.setValue(z,Rt.setFromMatrixPosition(T.matrixWorld)),xt.logarithmicDepthBuffer&&Me.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Me.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),b!==T&&(b=T,bn=!0,Dr=!0)}if(k.isSkinnedMesh){Me.setOptional(z,k,"bindMatrix"),Me.setOptional(z,k,"bindMatrixInverse");let Pn=k.skeleton;Pn&&(Pn.boneTexture===null&&Pn.computeBoneTexture(),Me.setValue(z,"boneTexture",Pn.boneTexture,R))}k.isBatchedMesh&&(Me.setOptional(z,k,"batchingTexture"),Me.setValue(z,"batchingTexture",k._matricesTexture,R),Me.setOptional(z,k,"batchingIdTexture"),Me.setValue(z,"batchingIdTexture",k._indirectTexture,R),Me.setOptional(z,k,"batchingColorTexture"),k._colorsTexture!==null&&Me.setValue(z,"batchingColorTexture",k._colorsTexture,R));let Nr=G.morphAttributes;if((Nr.position!==void 0||Nr.normal!==void 0||Nr.color!==void 0)&&Xt.update(k,G,Hn),(bn||Dt.receiveShadow!==k.receiveShadow)&&(Dt.receiveShadow=k.receiveShadow,Me.setValue(z,"receiveShadow",k.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(ti.envMap.value=zt,ti.flipEnvMap.value=zt.isCubeTexture&&zt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&B.environment!==null&&(ti.envMapIntensity.value=B.environmentIntensity),bn&&(Me.setValue(z,"toneMappingExposure",M.toneMappingExposure),Dt.needsLights&&Xp(ti,Dr),lt&&X.fog===!0&&mt.refreshFogUniforms(ti,lt),mt.refreshMaterialUniforms(ti,X,H,Y,p.state.transmissionRenderTarget[T.id]),ar.upload(z,Xu(Dt),ti,R)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ar.upload(z,Xu(Dt),ti,R),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Me.setValue(z,"center",k.center),Me.setValue(z,"modelViewMatrix",k.modelViewMatrix),Me.setValue(z,"normalMatrix",k.normalMatrix),Me.setValue(z,"modelMatrix",k.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){let Pn=X.uniformsGroups;for(let Di=0,Ni=Pn.length;Di<Ni;Di++){let Yu=Pn[Di];O.update(Yu,Hn),O.bind(Yu,Hn)}}return Hn}function Xp(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function qp(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(T,B,G){bt.get(T.texture).__webglTexture=B,bt.get(T.depthTexture).__webglTexture=G;let X=bt.get(T);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=G===void 0,X.__autoAllocateDepthBuffer||rt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,B){let G=bt.get(T);G.__webglFramebuffer=B,G.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,G=0){P=T,S=B,w=G;let X=!0,k=null,lt=!1,_t=!1;if(T){let zt=bt.get(T);if(zt.__useDefaultFramebuffer!==void 0)dt.bindFramebuffer(z.FRAMEBUFFER,null),X=!1;else if(zt.__webglFramebuffer===void 0)R.setupRenderTarget(T);else if(zt.__hasExternalTextures)R.rebindTextures(T,bt.get(T.texture).__webglTexture,bt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Lt=T.depthTexture;if(zt.__boundDepthTexture!==Lt){if(Lt!==null&&bt.has(Lt)&&(T.width!==Lt.image.width||T.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(T)}}let qt=T.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(_t=!0);let Jt=bt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Jt[B])?k=Jt[B][G]:k=Jt[B],lt=!0):T.samples>0&&R.useMultisampledRTT(T)===!1?k=bt.get(T).__webglMultisampledFramebuffer:Array.isArray(Jt)?k=Jt[G]:k=Jt,C.copy(T.viewport),N.copy(T.scissor),D=T.scissorTest}else C.copy(tt).multiplyScalar(H).floor(),N.copy(ht).multiplyScalar(H).floor(),D=Et;if(dt.bindFramebuffer(z.FRAMEBUFFER,k)&&X&&dt.drawBuffers(T,k),dt.viewport(C),dt.scissor(N),dt.setScissorTest(D),lt){let zt=bt.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+B,zt.__webglTexture,G)}else if(_t){let zt=bt.get(T.texture),qt=B||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,zt.__webglTexture,G||0,qt)}E=-1},this.readRenderTargetPixels=function(T,B,G,X,k,lt,_t){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=bt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_t!==void 0&&(It=It[_t]),It){dt.bindFramebuffer(z.FRAMEBUFFER,It);try{let zt=T.texture,qt=zt.format,Jt=zt.type;if(!xt.textureFormatReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xt.textureTypeReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-X&&G>=0&&G<=T.height-k&&z.readPixels(B,G,X,k,Qt.convert(qt),Qt.convert(Jt),lt)}finally{let zt=P!==null?bt.get(P).__webglFramebuffer:null;dt.bindFramebuffer(z.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(T,B,G,X,k,lt,_t){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=bt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_t!==void 0&&(It=It[_t]),It){let zt=T.texture,qt=zt.format,Jt=zt.type;if(!xt.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xt.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=T.width-X&&G>=0&&G<=T.height-k){dt.bindFramebuffer(z.FRAMEBUFFER,It);let Lt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Lt),z.bufferData(z.PIXEL_PACK_BUFFER,lt.byteLength,z.STREAM_READ),z.readPixels(B,G,X,k,Qt.convert(qt),Qt.convert(Jt),0);let ce=P!==null?bt.get(P).__webglFramebuffer:null;dt.bindFramebuffer(z.FRAMEBUFFER,ce);let ve=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await D0(z,ve,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Lt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,lt),z.deleteBuffer(Lt),z.deleteSync(ve),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,B=null,G=0){T.isTexture!==!0&&(Xr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,T=arguments[1]);let X=Math.pow(2,-G),k=Math.floor(T.image.width*X),lt=Math.floor(T.image.height*X),_t=B!==null?B.x:0,It=B!==null?B.y:0;R.setTexture2D(T,0),z.copyTexSubImage2D(z.TEXTURE_2D,G,0,0,_t,It,k,lt),dt.unbindTexture()},this.copyTextureToTexture=function(T,B,G=null,X=null,k=0){T.isTexture!==!0&&(Xr("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,T=arguments[1],B=arguments[2],k=arguments[3]||0,G=null);let lt,_t,It,zt,qt,Jt,Lt,ce,ve,ye=T.isCompressedTexture?T.mipmaps[k]:T.image;G!==null?(lt=G.max.x-G.min.x,_t=G.max.y-G.min.y,It=G.isBox3?G.max.z-G.min.z:1,zt=G.min.x,qt=G.min.y,Jt=G.isBox3?G.min.z:0):(lt=ye.width,_t=ye.height,It=ye.depth||1,zt=0,qt=0,Jt=0),X!==null?(Lt=X.x,ce=X.y,ve=X.z):(Lt=0,ce=0,ve=0);let un=Qt.convert(B.format),ue=Qt.convert(B.type),Dt;B.isData3DTexture?(R.setTexture3D(B,0),Dt=z.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(R.setTexture2DArray(B,0),Dt=z.TEXTURE_2D_ARRAY):(R.setTexture2D(B,0),Dt=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,B.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,B.unpackAlignment);let gi=z.getParameter(z.UNPACK_ROW_LENGTH),fe=z.getParameter(z.UNPACK_IMAGE_HEIGHT),Hn=z.getParameter(z.UNPACK_SKIP_PIXELS),ks=z.getParameter(z.UNPACK_SKIP_ROWS),bn=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,ye.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ye.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,zt),z.pixelStorei(z.UNPACK_SKIP_ROWS,qt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Jt);let Dr=T.isDataArrayTexture||T.isData3DTexture,Me=B.isDataArrayTexture||B.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){let ti=bt.get(T),Nr=bt.get(B),Pn=bt.get(ti.__renderTarget),Di=bt.get(Nr.__renderTarget);dt.bindFramebuffer(z.READ_FRAMEBUFFER,Pn.__webglFramebuffer),dt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Di.__webglFramebuffer);for(let Ni=0;Ni<It;Ni++)Dr&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,bt.get(T).__webglTexture,k,Jt+Ni),T.isDepthTexture?(Me&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,bt.get(B).__webglTexture,k,ve+Ni),z.blitFramebuffer(zt,qt,lt,_t,Lt,ce,lt,_t,z.DEPTH_BUFFER_BIT,z.NEAREST)):Me?z.copyTexSubImage3D(Dt,k,Lt,ce,ve+Ni,zt,qt,lt,_t):z.copyTexSubImage2D(Dt,k,Lt,ce,ve+Ni,zt,qt,lt,_t);dt.bindFramebuffer(z.READ_FRAMEBUFFER,null),dt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Me?T.isDataTexture||T.isData3DTexture?z.texSubImage3D(Dt,k,Lt,ce,ve,lt,_t,It,un,ue,ye.data):B.isCompressedArrayTexture?z.compressedTexSubImage3D(Dt,k,Lt,ce,ve,lt,_t,It,un,ye.data):z.texSubImage3D(Dt,k,Lt,ce,ve,lt,_t,It,un,ue,ye):T.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,k,Lt,ce,lt,_t,un,ue,ye.data):T.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,k,Lt,ce,ye.width,ye.height,un,ye.data):z.texSubImage2D(z.TEXTURE_2D,k,Lt,ce,lt,_t,un,ue,ye);z.pixelStorei(z.UNPACK_ROW_LENGTH,gi),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,fe),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Hn),z.pixelStorei(z.UNPACK_SKIP_ROWS,ks),z.pixelStorei(z.UNPACK_SKIP_IMAGES,bn),k===0&&B.generateMipmaps&&z.generateMipmap(Dt),dt.unbindTexture()},this.copyTextureToTexture3D=function(T,B,G=null,X=null,k=0){return T.isTexture!==!0&&(Xr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,X=arguments[1]||null,T=arguments[2],B=arguments[3],k=arguments[4]||0),Xr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,B,G,X,k)},this.initRenderTarget=function(T){bt.get(T).__webglFramebuffer===void 0&&R.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),dt.unbindTexture()},this.resetState=function(){S=0,w=0,P=null,dt.reset(),xe.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}};var Ea=class n{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Bt(t),this.near=e,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Aa=class extends Je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fe,this.environmentIntensity=1,this.environmentRotation=new Fe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var _s=class extends mn{constructor(t=null,e=1,i=1,s,r,o,a,c,l=nn,h=nn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ys=class extends pe{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},er=new ie,Zf=new ie,jo=[],Jf=new wi,I1=new ie,Vr=new le,Gr=new Ri,si=class extends le{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ys(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,I1)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new wi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,er),Jf.copy(t.boundingBox).applyMatrix4(er),this.boundingBox.union(Jf)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ri),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,er),Gr.copy(t.boundingSphere).applyMatrix4(er),this.boundingSphere.union(Gr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(Vr.geometry=this.geometry,Vr.material=this.material,Vr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gr.copy(this.boundingSphere),Gr.applyMatrix4(i),t.ray.intersectsSphere(Gr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,er),Zf.multiplyMatrices(i,er),Vr.matrixWorld=Zf,Vr.raycast(t,jo);for(let o=0,a=jo.length;o<a;o++){let c=jo[o];c.instanceId=r,c.object=this,e.push(c)}jo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ys(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new _s(new Float32Array(s*this.count),s,this.count,oo,ni));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<i.length;l++)o+=i[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Qr=class extends ii{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Ta=new U,wa=new U,jf=new ie,Wr=new dr,Ko=new Ri,rl=new U,Kf=new U,fh=class extends Je{constructor(t=new Ee,e=new Qr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Ta.fromBufferAttribute(e,s-1),wa.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Ta.distanceTo(wa);t.setAttribute("lineDistance",new ne(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ko.copy(i.boundingSphere),Ko.applyMatrix4(s),Ko.radius+=r,t.ray.intersectsSphere(Ko)===!1)return;jf.copy(s).invert(),Wr.copy(t.ray).applyMatrix4(jf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=l){let p=h.getX(v),y=h.getX(v+1),_=Qo(this,t,Wr,c,p,y);_&&e.push(_)}if(this.isLineLoop){let v=h.getX(g-1),m=h.getX(d),p=Qo(this,t,Wr,c,v,m);p&&e.push(p)}}else{let d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=l){let p=Qo(this,t,Wr,c,v,v+1);p&&e.push(p)}if(this.isLineLoop){let v=Qo(this,t,Wr,c,g-1,d);v&&e.push(v)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Qo(n,t,e,i,s,r){let o=n.geometry.attributes.position;if(Ta.fromBufferAttribute(o,s),wa.fromBufferAttribute(o,r),e.distanceSqToSegment(Ta,wa,rl,Kf)>i)return;rl.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(rl);if(!(c<t.near||c>t.far))return{distance:c,point:Kf.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var Qf=new U,td=new U,Ra=class extends fh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Qf.fromBufferAttribute(e,s),td.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Qf.distanceTo(td);t.setAttribute("lineDistance",new ne(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var dh=class extends ii{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Bt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ed=new ie,ph=new dr,ta=new Ri,ea=new U,Ca=class extends Je{constructor(t=new Ee,e=new dh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ta.copy(i.boundingSphere),ta.applyMatrix4(s),ta.radius+=r,t.ray.intersectsSphere(ta)===!1)return;ed.copy(s).invert(),ph.copy(t.ray).applyMatrix4(ed);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,v=d;g<v;g++){let m=l.getX(g);ea.fromBufferAttribute(u,m),nd(ea,m,c,s,t,e,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,v=d;g<v;g++)ea.fromBufferAttribute(u,g),nd(ea,g,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function nd(n,t,e,i,s,r,o){let a=ph.distanceSqToPoint(n);if(a<e){let c=new U;ph.closestPointToPoint(n,c),c.applyMatrix4(i);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Tn=class extends mn{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);let h=i[s],f=i[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new at:new U);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new U,s=[],r=[],o=[],a=new U,c=new ie;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new U)}r[0]=new U,o[0]=new U;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Ze(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Ze(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},to=class extends Dn{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new at){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},mh=class extends to{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Zh(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return n+t*r+e*o+i*a}}}var na=new U,ol=new Zh,al=new Zh,cl=new Zh,gh=class extends Dn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new U){let i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(na.subVectors(s[0],s[1]).add(s[0]),l=na);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(na.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=na),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),ol.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,v,m),al.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,v,m),cl.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(ol.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),al.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),cl.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return i.set(ol.calc(c),al.calc(c),cl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new U().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function id(n,t,e,i,s){let r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function z1(n,t){let e=1-n;return e*e*t}function L1(n,t){return 2*(1-n)*n*t}function U1(n,t){return n*n*t}function $r(n,t,e,i){return z1(n,t)+L1(n,e)+U1(n,i)}function D1(n,t){let e=1-n;return e*e*e*t}function N1(n,t){let e=1-n;return 3*e*e*n*t}function F1(n,t){return 3*(1-n)*n*n*t}function O1(n,t){return n*n*n*t}function Zr(n,t,e,i,s){return D1(n,t)+N1(n,e)+F1(n,i)+O1(n,s)}var Pa=class extends Dn{constructor(t=new at,e=new at,i=new at,s=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new at){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Zr(t,s.x,r.x,o.x,a.x),Zr(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},xh=class extends Dn{constructor(t=new U,e=new U,i=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new U){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Zr(t,s.x,r.x,o.x,a.x),Zr(t,s.y,r.y,o.y,a.y),Zr(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ia=class extends Dn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},vh=class extends Dn{constructor(t=new U,e=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new U){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new U){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},za=class extends Dn{constructor(t=new at,e=new at,i=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new at){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set($r(t,s.x,r.x,o.x),$r(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},_h=class extends Dn{constructor(t=new U,e=new U,i=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new U){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set($r(t,s.x,r.x,o.x),$r(t,s.y,r.y,o.y),$r(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},La=class extends Dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){let i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(id(a,c.x,l.x,h.x,u.x),id(a,c.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new at().fromArray(s))}return this}},yh=Object.freeze({__proto__:null,ArcCurve:mh,CatmullRomCurve3:gh,CubicBezierCurve:Pa,CubicBezierCurve3:xh,EllipseCurve:to,LineCurve:Ia,LineCurve3:vh,QuadraticBezierCurve:za,QuadraticBezierCurve3:_h,SplineCurve:La}),Mh=class extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yh[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new yh[s.type]().fromJSON(s))}return this}},Ua=class extends Mh{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new Ia(this.currentPoint.clone(),new at(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new za(this.currentPoint.clone(),new at(t,e),new at(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){let a=new Pa(this.currentPoint.clone(),new at(t,e),new at(i,s),new at(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new La(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){let l=new to(t,e,i,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Da=class n extends Ee{constructor(t=[new at(0,-.5),new at(.5,0),new at(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Ze(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,u=new U,f=new at,d=new U,g=new U,v=new U,m=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,d.x=p*1,d.y=-m,d.z=p*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(g)}for(let y=0;y<=e;y++){let _=i+y*h*s,M=Math.sin(_),I=Math.cos(_);for(let S=0;S<=t.length-1;S++){u.x=t[S].x*M,u.y=t[S].y,u.z=t[S].x*I,o.push(u.x,u.y,u.z),f.x=y/e,f.y=S/(t.length-1),a.push(f.x,f.y);let w=c[3*S+0]*M,P=c[3*S+1],E=c[3*S+0]*I;l.push(w,P,E)}}for(let y=0;y<e;y++)for(let _=0;_<t.length-1;_++){let M=_+y*t.length,I=M,S=M+t.length,w=M+t.length+1,P=M+1;r.push(I,S,P),r.push(w,P,S)}this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("uv",new ne(a,2)),this.setAttribute("normal",new ne(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.points,t.segments,t.phiStart,t.phiLength)}};var Na=class n extends Ee{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new U,h=new at;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=i+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("normal",new ne(a,3)),this.setAttribute("uv",new ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},xn=class n extends Ee{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,v=[],m=i/2,p=0;y(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new ne(u,3)),this.setAttribute("normal",new ne(f,3)),this.setAttribute("uv",new ne(d,2));function y(){let M=new U,I=new U,S=0,w=(e-t)/i;for(let P=0;P<=r;P++){let E=[],b=P/r,C=b*(e-t)+t;for(let N=0;N<=s;N++){let D=N/s,F=D*c+a,W=Math.sin(F),L=Math.cos(F);I.x=C*W,I.y=-b*i+m,I.z=C*L,u.push(I.x,I.y,I.z),M.set(W,w,L).normalize(),f.push(M.x,M.y,M.z),d.push(D,1-b),E.push(g++)}v.push(E)}for(let P=0;P<s;P++)for(let E=0;E<r;E++){let b=v[E][P],C=v[E+1][P],N=v[E+1][P+1],D=v[E][P+1];(t>0||E!==0)&&(h.push(b,C,D),S+=3),(e>0||E!==r-1)&&(h.push(C,N,D),S+=3)}l.addGroup(p,S,0),p+=S}function _(M){let I=g,S=new at,w=new U,P=0,E=M===!0?t:e,b=M===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,m*b,0),f.push(0,b,0),d.push(.5,.5),g++;let C=g;for(let N=0;N<=s;N++){let F=N/s*c+a,W=Math.cos(F),L=Math.sin(F);w.x=E*L,w.y=m*b,w.z=E*W,u.push(w.x,w.y,w.z),f.push(0,b,0),S.x=W*.5+.5,S.y=L*.5*b+.5,d.push(S.x,S.y),g++}for(let N=0;N<s;N++){let D=I+N,F=C+N;M===!0?h.push(F,F+1,D):h.push(F+1,F,D),P+=3}l.addGroup(p,P,M===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},eo=class n extends xn{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},bh=class n extends Ee{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],o=[];a(s),l(i),h(),this.setAttribute("position",new ne(r,3)),this.setAttribute("normal",new ne(r.slice(),3)),this.setAttribute("uv",new ne(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let _=new U,M=new U,I=new U;for(let S=0;S<e.length;S+=3)d(e[S+0],_),d(e[S+1],M),d(e[S+2],I),c(_,M,I,y)}function c(y,_,M,I){let S=I+1,w=[];for(let P=0;P<=S;P++){w[P]=[];let E=y.clone().lerp(M,P/S),b=_.clone().lerp(M,P/S),C=S-P;for(let N=0;N<=C;N++)N===0&&P===S?w[P][N]=E:w[P][N]=E.clone().lerp(b,N/C)}for(let P=0;P<S;P++)for(let E=0;E<2*(S-P)-1;E++){let b=Math.floor(E/2);E%2===0?(f(w[P][b+1]),f(w[P+1][b]),f(w[P][b])):(f(w[P][b+1]),f(w[P+1][b+1]),f(w[P+1][b]))}}function l(y){let _=new U;for(let M=0;M<r.length;M+=3)_.x=r[M+0],_.y=r[M+1],_.z=r[M+2],_.normalize().multiplyScalar(y),r[M+0]=_.x,r[M+1]=_.y,r[M+2]=_.z}function h(){let y=new U;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];let M=m(y)/2/Math.PI+.5,I=p(y)/Math.PI+.5;o.push(M,1-I)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){let _=o[y+0],M=o[y+2],I=o[y+4],S=Math.max(_,M,I),w=Math.min(_,M,I);S>.9&&w<.1&&(_<.2&&(o[y+0]+=1),M<.2&&(o[y+2]+=1),I<.2&&(o[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function d(y,_){let M=y*3;_.x=t[M+0],_.y=t[M+1],_.z=t[M+2]}function g(){let y=new U,_=new U,M=new U,I=new U,S=new at,w=new at,P=new at;for(let E=0,b=0;E<r.length;E+=9,b+=6){y.set(r[E+0],r[E+1],r[E+2]),_.set(r[E+3],r[E+4],r[E+5]),M.set(r[E+6],r[E+7],r[E+8]),S.set(o[b+0],o[b+1]),w.set(o[b+2],o[b+3]),P.set(o[b+4],o[b+5]),I.copy(y).add(_).add(M).divideScalar(3);let C=m(I);v(S,b+0,y,C),v(w,b+2,_,C),v(P,b+4,M,C)}}function v(y,_,M,I){I<0&&y.x===1&&(o[_]=y.x-1),M.x===0&&M.z===0&&(o[_]=I/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.details)}};var Ms=class extends Ua{constructor(t){super(t),this.uuid=vr(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new Ua().fromJSON(s))}return this}},B1={triangulate:function(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=Id(n,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,f,d;if(i&&(r=W1(n,t,r,e)),n.length>80*e){a=l=n[0],c=h=n[1];for(let g=e;g<s;g+=e)u=n[g],f=n[g+1],u<a&&(a=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);d=Math.max(l-a,h-c),d=d!==0?32767/d:0}return no(r,o,e,a,c,d,0),o}};function Id(n,t,e,i,s){let r,o;if(s===e_(n,t,e,i)>0)for(r=t;r<e;r+=i)o=sd(r,n[r],n[r+1],o);else for(r=e-i;r>=t;r-=i)o=sd(r,n[r],n[r+1],o);return o&&$a(o,o.next)&&(so(o),o=o.next),o}function bs(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&($a(e,e.next)||Ce(e.prev,e,e.next)===0)){if(so(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function no(n,t,e,i,s,r,o){if(!n)return;!o&&r&&Z1(n,i,s,r);let a=n,c,l;for(;n.prev!==n.next;){if(c=n.prev,l=n.next,r?H1(n,i,s,r):k1(n)){t.push(c.i/e|0),t.push(n.i/e|0),t.push(l.i/e|0),so(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=V1(bs(n),t,e),no(n,t,e,i,s,r,2)):o===2&&G1(n,t,e,i,s,r):no(bs(n),t,e,i,s,r,1);break}}}function k1(n){let t=n.prev,e=n,i=n.next;if(Ce(t,e,i)>=0)return!1;let s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,f=s>r?s>o?s:o:r>o?r:o,d=a>c?a>l?a:l:c>l?c:l,g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&ir(s,a,r,c,o,l,g.x,g.y)&&Ce(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function H1(n,t,e,i){let s=n.prev,r=n,o=n.next;if(Ce(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=a<c?a<l?a:l:c<l?c:l,g=h<u?h<f?h:f:u<f?u:f,v=a>c?a>l?a:l:c>l?c:l,m=h>u?h>f?h:f:u>f?u:f,p=Sh(d,g,t,e,i),y=Sh(v,m,t,e,i),_=n.prevZ,M=n.nextZ;for(;_&&_.z>=p&&M&&M.z<=y;){if(_.x>=d&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&ir(a,h,c,u,l,f,_.x,_.y)&&Ce(_.prev,_,_.next)>=0||(_=_.prevZ,M.x>=d&&M.x<=v&&M.y>=g&&M.y<=m&&M!==s&&M!==o&&ir(a,h,c,u,l,f,M.x,M.y)&&Ce(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;_&&_.z>=p;){if(_.x>=d&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&ir(a,h,c,u,l,f,_.x,_.y)&&Ce(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;M&&M.z<=y;){if(M.x>=d&&M.x<=v&&M.y>=g&&M.y<=m&&M!==s&&M!==o&&ir(a,h,c,u,l,f,M.x,M.y)&&Ce(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function V1(n,t,e){let i=n;do{let s=i.prev,r=i.next.next;!$a(s,r)&&zd(s,i,i.next,r)&&io(s,r)&&io(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),so(i),so(i.next),i=n=r),i=i.next}while(i!==n);return bs(i)}function G1(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&K1(o,a)){let c=Ld(o,a);o=bs(o,o.next),c=bs(c,c.next),no(o,t,e,i,s,r,0),no(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function W1(n,t,e,i){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=Id(n,a,c,i,!1),l===l.next&&(l.steiner=!0),s.push(j1(l));for(s.sort(X1),r=0;r<s.length;r++)e=q1(s[r],e);return e}function X1(n,t){return n.x-t.x}function q1(n,t){let e=Y1(n,t);if(!e)return t;let i=Ld(e,n);return bs(i,i.next),bs(e,e.next)}function Y1(n,t){let e=t,i=-1/0,s,r=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>i&&(i=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&ir(o<l?r:i,o,c,l,o<l?i:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),io(e,n)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&$1(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function $1(n,t){return Ce(n.prev,n,t.prev)<0&&Ce(t.next,n,n.next)<0}function Z1(n,t,e,i){let s=n;do s.z===0&&(s.z=Sh(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,J1(s)}function J1(n){let t,e,i,s,r,o,a,c,l=1;do{for(e=n,n=null,r=null,o=0;e;){for(o++,i=e,a=0,t=0;t<l&&(a++,i=i.nextZ,!!i);t++);for(c=l;a>0||c>0&&i;)a!==0&&(c===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,a--):(s=i,i=i.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,l*=2}while(o>1);return n}function Sh(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function j1(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function ir(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function K1(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Q1(n,t)&&(io(n,t)&&io(t,n)&&t_(n,t)&&(Ce(n.prev,n,t.prev)||Ce(n,t.prev,t))||$a(n,t)&&Ce(n.prev,n,n.next)>0&&Ce(t.prev,t,t.next)>0)}function Ce(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function $a(n,t){return n.x===t.x&&n.y===t.y}function zd(n,t,e,i){let s=sa(Ce(n,t,e)),r=sa(Ce(n,t,i)),o=sa(Ce(e,i,n)),a=sa(Ce(e,i,t));return!!(s!==r&&o!==a||s===0&&ia(n,e,t)||r===0&&ia(n,i,t)||o===0&&ia(e,n,i)||a===0&&ia(e,t,i))}function ia(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function sa(n){return n>0?1:n<0?-1:0}function Q1(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&zd(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function io(n,t){return Ce(n.prev,n,n.next)<0?Ce(n,t,n.next)>=0&&Ce(n,n.prev,t)>=0:Ce(n,t,n.prev)<0||Ce(n,n.next,t)<0}function t_(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Ld(n,t){let e=new Eh(n.i,n.x,n.y),i=new Eh(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function sd(n,t,e,i){let s=new Eh(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function so(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Eh(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function e_(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}var gs=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];rd(t),od(i,t);let o=t.length;e.forEach(rd);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,od(i,e[c]);let a=B1.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function rd(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function od(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var mr=class n extends Ee{constructor(t=new Ms([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new ne(s,3)),this.setAttribute("uv",new ne(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:n_,_,M=!1,I,S,w,P;p&&(_=p.getSpacedPoints(h),M=!0,f=!1,I=p.computeFrenetFrames(h,!1),S=new U,w=new U,P=new U),f||(m=0,d=0,g=0,v=0);let E=a.extractPoints(l),b=E.shape,C=E.holes;if(!gs.isClockWise(b)){b=b.reverse();for(let K=0,ot=C.length;K<ot;K++){let z=C[K];gs.isClockWise(z)&&(C[K]=z.reverse())}}let D=gs.triangulateShape(b,C),F=b;for(let K=0,ot=C.length;K<ot;K++){let z=C[K];b=b.concat(z)}function W(K,ot,z){return ot||console.error("THREE.ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(ot,z)}let L=b.length,Y=D.length;function H(K,ot,z){let Ct,rt,xt,dt=K.x-ot.x,Ht=K.y-ot.y,bt=z.x-K.x,R=z.y-K.y,A=dt*dt+Ht*Ht,V=dt*R-Ht*bt;if(Math.abs(V)>Number.EPSILON){let J=Math.sqrt(A),st=Math.sqrt(bt*bt+R*R),j=ot.x-Ht/J,Pt=ot.y+dt/J,mt=z.x-R/st,St=z.y+bt/st,se=((mt-j)*R-(St-Pt)*bt)/(dt*R-Ht*bt);Ct=j+dt*se-K.x,rt=Pt+Ht*se-K.y;let ct=Ct*Ct+rt*rt;if(ct<=2)return new at(Ct,rt);xt=Math.sqrt(ct/2)}else{let J=!1;dt>Number.EPSILON?bt>Number.EPSILON&&(J=!0):dt<-Number.EPSILON?bt<-Number.EPSILON&&(J=!0):Math.sign(Ht)===Math.sign(R)&&(J=!0),J?(Ct=-Ht,rt=dt,xt=Math.sqrt(A)):(Ct=dt,rt=Ht,xt=Math.sqrt(A/2))}return new at(Ct/xt,rt/xt)}let Q=[];for(let K=0,ot=F.length,z=ot-1,Ct=K+1;K<ot;K++,z++,Ct++)z===ot&&(z=0),Ct===ot&&(Ct=0),Q[K]=H(F[K],F[z],F[Ct]);let et=[],tt,ht=Q.concat();for(let K=0,ot=C.length;K<ot;K++){let z=C[K];tt=[];for(let Ct=0,rt=z.length,xt=rt-1,dt=Ct+1;Ct<rt;Ct++,xt++,dt++)xt===rt&&(xt=0),dt===rt&&(dt=0),tt[Ct]=H(z[Ct],z[xt],z[dt]);et.push(tt),ht=ht.concat(tt)}for(let K=0;K<m;K++){let ot=K/m,z=d*Math.cos(ot*Math.PI/2),Ct=g*Math.sin(ot*Math.PI/2)+v;for(let rt=0,xt=F.length;rt<xt;rt++){let dt=W(F[rt],Q[rt],Ct);it(dt.x,dt.y,-z)}for(let rt=0,xt=C.length;rt<xt;rt++){let dt=C[rt];tt=et[rt];for(let Ht=0,bt=dt.length;Ht<bt;Ht++){let R=W(dt[Ht],tt[Ht],Ct);it(R.x,R.y,-z)}}}let Et=g+v;for(let K=0;K<L;K++){let ot=f?W(b[K],ht[K],Et):b[K];M?(w.copy(I.normals[0]).multiplyScalar(ot.x),S.copy(I.binormals[0]).multiplyScalar(ot.y),P.copy(_[0]).add(w).add(S),it(P.x,P.y,P.z)):it(ot.x,ot.y,0)}for(let K=1;K<=h;K++)for(let ot=0;ot<L;ot++){let z=f?W(b[ot],ht[ot],Et):b[ot];M?(w.copy(I.normals[K]).multiplyScalar(z.x),S.copy(I.binormals[K]).multiplyScalar(z.y),P.copy(_[K]).add(w).add(S),it(P.x,P.y,P.z)):it(z.x,z.y,u/h*K)}for(let K=m-1;K>=0;K--){let ot=K/m,z=d*Math.cos(ot*Math.PI/2),Ct=g*Math.sin(ot*Math.PI/2)+v;for(let rt=0,xt=F.length;rt<xt;rt++){let dt=W(F[rt],Q[rt],Ct);it(dt.x,dt.y,u+z)}for(let rt=0,xt=C.length;rt<xt;rt++){let dt=C[rt];tt=et[rt];for(let Ht=0,bt=dt.length;Ht<bt;Ht++){let R=W(dt[Ht],tt[Ht],Ct);M?it(R.x,R.y+_[h-1].y,_[h-1].x+z):it(R.x,R.y,u+z)}}}q(),Z();function q(){let K=s.length/3;if(f){let ot=0,z=L*ot;for(let Ct=0;Ct<Y;Ct++){let rt=D[Ct];Mt(rt[2]+z,rt[1]+z,rt[0]+z)}ot=h+m*2,z=L*ot;for(let Ct=0;Ct<Y;Ct++){let rt=D[Ct];Mt(rt[0]+z,rt[1]+z,rt[2]+z)}}else{for(let ot=0;ot<Y;ot++){let z=D[ot];Mt(z[2],z[1],z[0])}for(let ot=0;ot<Y;ot++){let z=D[ot];Mt(z[0]+L*h,z[1]+L*h,z[2]+L*h)}}i.addGroup(K,s.length/3-K,0)}function Z(){let K=s.length/3,ot=0;ft(F,ot),ot+=F.length;for(let z=0,Ct=C.length;z<Ct;z++){let rt=C[z];ft(rt,ot),ot+=rt.length}i.addGroup(K,s.length/3-K,1)}function ft(K,ot){let z=K.length;for(;--z>=0;){let Ct=z,rt=z-1;rt<0&&(rt=K.length-1);for(let xt=0,dt=h+m*2;xt<dt;xt++){let Ht=L*xt,bt=L*(xt+1),R=ot+Ct+Ht,A=ot+rt+Ht,V=ot+rt+bt,J=ot+Ct+bt;Rt(R,A,V,J)}}}function it(K,ot,z){c.push(K),c.push(ot),c.push(z)}function Mt(K,ot,z){At(K),At(ot),At(z);let Ct=s.length/3,rt=y.generateTopUV(i,s,Ct-3,Ct-2,Ct-1);Wt(rt[0]),Wt(rt[1]),Wt(rt[2])}function Rt(K,ot,z,Ct){At(K),At(ot),At(Ct),At(ot),At(z),At(Ct);let rt=s.length/3,xt=y.generateSideWallUV(i,s,rt-6,rt-3,rt-2,rt-1);Wt(xt[0]),Wt(xt[1]),Wt(xt[3]),Wt(xt[1]),Wt(xt[2]),Wt(xt[3])}function At(K){s.push(c[K*3+0]),s.push(c[K*3+1]),s.push(c[K*3+2])}function Wt(K){r.push(K.x),r.push(K.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return i_(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];i.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new yh[s.type]().fromJSON(s)),new n(i,t.options)}},n_={generateTopUV:function(n,t,e,i,s){let r=t[e*3],o=t[e*3+1],a=t[i*3],c=t[i*3+1],l=t[s*3],h=t[s*3+1];return[new at(r,o),new at(a,c),new at(l,h)]},generateSideWallUV:function(n,t,e,i,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[i*3],h=t[i*3+1],u=t[i*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new at(o,1-c),new at(l,1-u),new at(f,1-g),new at(v,1-p)]:[new at(a,1-c),new at(h,1-u),new at(d,1-g),new at(m,1-p)]}};function i_(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Fa=class n extends bh{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}};var Oa=class n extends Ee{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=t,f=(e-t)/s,d=new U,g=new at;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){let p=r+m/i*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let v=0;v<s;v++){let m=v*(i+1);for(let p=0;p<i;p++){let y=p+m,_=y,M=y+i+1,I=y+i+2,S=y+1;a.push(_,M,S),a.push(M,I,S)}}this.setIndex(a),this.setAttribute("position",new ne(c,3)),this.setAttribute("normal",new ne(l,3)),this.setAttribute("uv",new ne(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var ri=class n extends Ee{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new U,f=new U,d=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){let y=[],_=p/i,M=0;p===0&&o===0?M=.5/e:p===i&&c===Math.PI&&(M=-.5/e);for(let I=0;I<=e;I++){let S=I/e;u.x=-t*Math.cos(s+S*r)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(s+S*r)*Math.sin(o+_*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(S+M,1-_),y.push(l++)}h.push(y)}for(let p=0;p<i;p++)for(let y=0;y<e;y++){let _=h[p][y+1],M=h[p][y],I=h[p+1][y],S=h[p+1][y+1];(p!==0||o>0)&&d.push(_,M,S),(p!==i-1||c<Math.PI)&&d.push(M,I,S)}this.setIndex(d),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(v,3)),this.setAttribute("uv",new ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ss=class extends ii{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Bt(16777215),this.specular=new Bt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yh,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=Wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var vn=class extends ii{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yh,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=Wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function ra(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function s_(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var gr=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ah=class extends gr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ku,endingEnd:Ku}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Qu:r=t,a=2*e-i;break;case tf:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Qu:o=t,c=2*i-e;break;case tf:o=1,c=i+s[1]-s[0];break;default:o=t-1,c=e}let l=(i-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(i-e)/(s-e),v=g*g,m=v*g,p=-f*m+2*f*v-f*g,y=(1+f)*m+(-1.5-2*f)*v+(-.5+f)*g+1,_=(-1-d)*m+(1.5+d)*v+.5*g,M=d*m-d*v;for(let I=0;I!==a;++I)r[I]=p*o[h+I]+y*o[l+I]+_*o[c+I]+M*o[u+I];return r}},Th=class extends gr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(i-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},wh=class extends gr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Yn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ra(e,this.TimeBufferType),this.values=ra(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ra(t.times,Array),values:ra(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new wh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Th(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ah(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ua:e=this.InterpolantFactoryMethodDiscrete;break;case $l:e=this.InterpolantFactoryMethodLinear;break;case Pc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ua;case this.InterpolantFactoryMethodLinear:return $l;case this.InterpolantFactoryMethodSmooth:return Pc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&s_(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Pc,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*i,f=u-i,d=u+i;for(let g=0;g!==i;++g){let v=e[u+g];if(v!==e[f+g]||v!==e[d+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*i,f=o*i;for(let d=0;d!==i;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Yn.prototype.TimeBufferType=Float32Array;Yn.prototype.ValueBufferType=Float32Array;Yn.prototype.DefaultInterpolation=$l;var Es=class extends Yn{constructor(t,e,i){super(t,e,i)}};Es.prototype.ValueTypeName="bool";Es.prototype.ValueBufferType=Array;Es.prototype.DefaultInterpolation=ua;Es.prototype.InterpolantFactoryMethodLinear=void 0;Es.prototype.InterpolantFactoryMethodSmooth=void 0;var Rh=class extends Yn{};Rh.prototype.ValueTypeName="color";var Ch=class extends Yn{};Ch.prototype.ValueTypeName="number";var Ph=class extends gr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)gn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Ba=class extends Yn{InterpolantFactoryMethodLinear(t){return new Ph(this.times,this.values,this.getValueSize(),t)}};Ba.prototype.ValueTypeName="quaternion";Ba.prototype.InterpolantFactoryMethodSmooth=void 0;var As=class extends Yn{constructor(t,e,i){super(t,e,i)}};As.prototype.ValueTypeName="string";As.prototype.ValueBufferType=Array;As.prototype.DefaultInterpolation=ua;As.prototype.InterpolantFactoryMethodLinear=void 0;As.prototype.InterpolantFactoryMethodSmooth=void 0;var Ih=class extends Yn{};Ih.prototype.ValueTypeName="vector";var zh=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],g=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}},r_=new zh,Lh=class{constructor(t){this.manager=t!==void 0?t:r_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Lh.DEFAULT_MATERIAL_NAME="__DEFAULT";var ka=class extends Je{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Ha=class extends ka{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},ll=new ie,ad=new U,cd=new U,Uh=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vs,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new De(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;ad.setFromMatrixPosition(t.matrixWorld),e.position.copy(ad),cd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(cd),e.updateMatrixWorld(),ll.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ll),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ll)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Dh=class extends Uh{constructor(){super(new ya(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Va=class extends ka{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.target=new Je,this.shadow=new Dh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Jh="\\[\\]\\.:\\/",o_=new RegExp("["+Jh+"]","g"),jh="[^"+Jh+"]",a_="[^"+Jh.replace("\\.","")+"]",c_=/((?:WC+[\/:])*)/.source.replace("WC",jh),l_=/(WCOD+)?/.source.replace("WCOD",a_),h_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jh),u_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jh),f_=new RegExp("^"+c_+l_+h_+u_+"$"),d_=["material","materials","bones","map"],Nh=class{constructor(t,e,i){let s=i||Se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Se=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(o_,"")}static parseTrackName(t){let e=f_.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);d_.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=i(a.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Se.Composite=Nh;Se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Se.prototype.GetterByBindingType=[Se.prototype._getValue_direct,Se.prototype._getValue_array,Se.prototype._getValue_arrayElement,Se.prototype._getValue_toArray];Se.prototype.SetterByBindingTypeAndVersioning=[[Se.prototype._setValue_direct,Se.prototype._setValue_direct_setNeedsUpdate,Se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_array,Se.prototype._setValue_array_setNeedsUpdate,Se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_arrayElement,Se.prototype._setValue_arrayElement_setNeedsUpdate,Se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_fromArray,Se.prototype._setValue_fromArray_setNeedsUpdate,Se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var eM=new Float32Array(1);var ld=new ie,Ga=class{constructor(t,e,i=0,s=1/0){this.ray=new dr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Kr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ld.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ld),this}intersectObject(t,e=!0,i=[]){return Fh(t,this,i,e),i.sort(hd),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Fh(t[s],this,i,e);return i.sort(hd),i}};function hd(n,t){return n.distance-t.distance}function Fh(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let o=0,a=r.length;o<a;o++)Fh(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Oh}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Oh);var x={cena:null,camera:null,renderer:null,bonecos:null,efeitos:null,unidades:[],agentes:[],projeteis:[],hashA:null,hashU:null,dinheiro:3e3,tempo:0,velocidade:1,pausado:!0,fim:!1,resgatados:0,civisMortos:0,zumbisMortos:0,perdas:0,populacao:0,meta:250,selecao:[],alertas:[],focos:0,proxFoco:25,dificuldade:"normal",base:null,porta:null,estr:{},satelite:null,cfg:{som:!0,qualidade:1},controlando:null,idSeq:1};function $t(n,t,e,i="info"){x.alertas.push({txt:n,x:t,z:e,tipo:i,t:x.tempo,criado:performance.now()}),x.alertas.length>30&&x.alertas.shift(),x.ui&&x.ui.alerta(n,t,e,i)}var au={};$u(au,{ALT:()=>Be,CEL:()=>Ae,COSTA:()=>sn,GH:()=>Te,GW:()=>Ft,LARG:()=>Oe,MAT_PREDIOS:()=>Ci,META:()=>_e,MPP:()=>Ji,T:()=>be,agua:()=>Rs,andavel:()=>Ne,canvasTerreno:()=>eu,carros:()=>Pe,cel:()=>ai,construirAgua:()=>iu,construirCarros:()=>ru,construirChao:()=>nu,construirPalmeiras:()=>su,construirPredios:()=>tu,dentroPoligono:()=>ao,ehRua:()=>Za,esmagarCarros:()=>ou,grade:()=>ke,latlon:()=>P_,lugares:()=>Le,predioEm:()=>Cs,predioId:()=>Ie,predios:()=>ze,rasterizarPredios:()=>Kh,removerPrediosEm:()=>Qh,tipo:()=>p_});function oi(n,t=!1){let e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new Ee,l=0;for(let h=0;h<n.length;++h){let u=n[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0,u=[];for(let f=0;f<n.length;++f){let d=n[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=n[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Ud(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let v=0;v<o[h].length;++v)d.push(o[h][v][f]);let g=Ud(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function Ud(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){let h=n[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new pe(o,e,i),c=0;for(let l=0;l<n.length;++l){let h=n[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){let v=h.getComponent(f,g);a.setComponent(f+u,g,v)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}var{META:_e,GRADE_RLE:Dd,PREDIOS:Nd}=window.MAPA_DADOS,hM=_e.cidade||"miami",sn=_e.costa!==!1;var Ji=_e.mpp,Ae=_e.cel*Ji,Ft=_e.gw,Te=_e.gh,Oe=Ft*Ae,Be=Te*Ae,be={AGUA:0,CHAO:1,RUA:2,PARQUE:3,AREIA:4,PREDIO:5,PONTE:6,CENTRO:7},Za=n=>n===2||n===7;function Vd(n){let t=atob(n),e=new Uint8Array(t.length);for(let i=0;i<t.length;i++)e[i]=t.charCodeAt(i);return e}var ke=new Uint8Array(Ft*Te);{let n=Vd(Dd),t=0;for(let e=0;e<n.length;e+=2)ke.fill(n[e],t,t+n[e+1]),t+=n[e+1]}var Ie=new Int32Array(Ft*Te).fill(-1);function ai(n,t){let e=Math.floor(n/Ae),i=Math.floor(t/Ae);return e<0||i<0||e>=Ft||i>=Te?-1:i*Ft+e}function p_(n,t){let e=ai(n,t);return e<0?sn?be.AGUA:be.CHAO:ke[e]}function Ne(n,t){let e=ai(n,t);return e<0?!1:ke[e]!==be.AGUA&&Ie[e]<0}function Rs(n,t){let e=ai(n,t);return e<0?sn:ke[e]===be.AGUA||ke[e]===be.PONTE}function Cs(n,t){let e=ai(n,t);return e<0?null:Ie[e]>=0?ze[Ie[e]]:null}var Le={};for(let n in _e.lugares){let[t,e,i]=_e.lugares[n];Le[n]={nome:t,x:e*Ji,z:i*Ji}}var ze=[];{let n=Vd(Nd),t=new Uint16Array(n.buffer,n.byteOffset,n.byteLength/2),e=0;for(;e<t.length;){let i=t[e],s=t[e+1]/4,r=new Float32Array(i*2);for(let g=0;g<i;g++)r[g*2]=t[e+2+g*2]/2*Ji,r[g*2+1]=t[e+3+g*2]/2*Ji;e+=2+i*2;let o=0;for(let g=0;g<i;g++){let v=(g+1)%i;o+=r[g*2]*r[v*2+1]-r[v*2]*r[g*2+1]}if(o>0)for(let g=0;g<i/2;g++){let v=i-1-g,m=r[g*2];r[g*2]=r[v*2],r[v*2]=m,m=r[g*2+1],r[g*2+1]=r[v*2+1],r[v*2+1]=m}let a=Math.abs(o)/2,c=0,l=0,h=1e9,u=-1e9,f=1e9,d=-1e9;for(let g=0;g<i;g++){let v=r[g*2],m=r[g*2+1];c+=v,l+=m,v<h&&(h=v),v>u&&(u=v),m<f&&(f=m),m>d&&(d=m)}c/=i,l/=i,ze.push({id:ze.length,pts:r,h:s,area:a,cx:c,cz:l,x0:h,x1:u,z0:f,z1:d,raio:Math.max(u-h,d-f)/2,cap:Math.max(4,Math.min(24,Math.round(a/50)+Math.floor(s/10))),guarnicao:[],civis:0,sos:!1,integridade:100,removido:!1})}}function ao(n,t,e){let i=n.pts,s=i.length/2,r=!1;for(let o=0,a=s-1;o<s;a=o++){let c=i[o*2],l=i[o*2+1],h=i[a*2],u=i[a*2+1];l>e!=u>e&&t<(h-c)*(e-l)/(u-l)+c&&(r=!r)}return r}function Kh(){Ie.fill(-1);for(let n of ze){if(n.removido)continue;let t=Math.max(0,Math.floor(n.z0/Ae)),e=Math.min(Te-1,Math.floor(n.z1/Ae)),i=Math.max(0,Math.floor(n.x0/Ae)),s=Math.min(Ft-1,Math.floor(n.x1/Ae)),r=!1;for(let o=t;o<=e;o++){let a=(o+.5)*Ae;for(let c=i;c<=s;c++)ao(n,(c+.5)*Ae,a)&&(Ie[o*Ft+c]=n.id,r=!0)}if(!r){let o=ai(n.cx,n.cz);o>=0&&(Ie[o]=n.id)}}for(let n=0;n<ke.length;n++)ke[n]===be.PREDIO&&Ie[n]<0&&(ke[n]=be.CHAO)}function Qh(n,t,e){for(let i of ze)!i.removido&&Math.hypot(i.cx-n,i.cz-t)<e+i.raio*.3&&(i.removido=!0)}var yr=3.6,Fd=3.4,je=4;function Ja(n){let t=n>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function m_(n){let e=document.createElement("canvas"),i=document.createElement("canvas");e.width=e.height=i.width=i.height=256;let s=e.getContext("2d"),r=i.getContext("2d"),o=Ja(n==="vidro"?7:n==="concreto"?11:23);r.fillStyle="#000",r.fillRect(0,0,256,256);let a=256/je;if(n==="vidro"){for(let h=0;h<je;h++)for(let u=0;u<je;u++){let f=u*a,d=h*a,g=s.createLinearGradient(f,d,f+a,d+a),v=.85+o()*.25;g.addColorStop(0,`rgb(${150*v|0},${178*v|0},${200*v|0})`),g.addColorStop(1,`rgb(${92*v|0},${118*v|0},${142*v|0})`),s.fillStyle=g,s.fillRect(f,d,a,a),s.fillStyle="rgba(255,255,255,0.18)",s.fillRect(f+a*.12,d+4,a*.18,a-10),o()<.35&&(r.fillStyle=`rgb(255,${220+o()*30|0},${150+o()*60|0})`,r.fillRect(f+3,d+6,a-6,a-12))}s.fillStyle="#d7dde2";for(let h=0;h<=je;h++)s.fillRect(0,h*a-3,256,6);s.fillStyle="#aeb8c0";for(let h=0;h<=je*2;h++)s.fillRect(h*a/2-1,0,2,256)}else if(n==="concreto"){s.fillStyle="#f2f0ec",s.fillRect(0,0,256,256);for(let h=0;h<1400;h++)s.fillStyle=`rgba(0,0,0,${o()*.05})`,s.fillRect(o()*256,o()*256,2,2);for(let h=0;h<je;h++)for(let u=0;u<je;u++){let f=u*a,d=h*a;s.fillStyle="#d9d6d0",s.fillRect(f+6,d+a*.72,a-12,4),s.fillStyle="#3c4a57",s.fillRect(f+9,d+a*.2,a-18,a*.52),s.fillStyle="rgba(160,190,215,0.55)",s.fillRect(f+9,d+a*.2,(a-18)*.45,a*.52),o()<.3&&(s.fillStyle="#e8e2d2",s.fillRect(f+9,d+a*.2,a-18,a*.52*o())),s.fillStyle="#9aa0a6",s.fillRect(f+a/2-1,d+a*.2,2,a*.52),o()<.4&&(r.fillStyle=`rgb(255,${200+o()*40|0},${120+o()*60|0})`,r.fillRect(f+9,d+a*.2,a-18,a*.52))}s.fillStyle="rgba(0,0,0,0.12)";for(let h=0;h<je;h++)s.fillRect(0,h*a+a-3,256,3)}else{s.fillStyle="#ffffff",s.fillRect(0,0,256,256);for(let h=0;h<900;h++)s.fillStyle=`rgba(0,0,0,${o()*.04})`,s.fillRect(o()*256,o()*256,2,2);for(let h=0;h<je;h++)for(let u=0;u<je;u++){let f=u*a,d=h*a;s.fillStyle="rgba(0,0,0,0.25)",s.fillRect(f+8,d+a*.22+4,a-16,5),s.fillStyle="#fafafa",s.fillRect(f+6,d+a*.2,a-12,5),s.fillStyle="#2f4a5a",s.fillRect(f+14,d+a*.3,a-28,a*.42),s.fillStyle="rgba(170,210,230,0.5)",s.fillRect(f+14,d+a*.3,(a-28)*.4,a*.42),s.fillStyle="#ffffff",s.fillRect(f+a/2-1.5,d+a*.3,3,a*.42),o()<.45&&(r.fillStyle=`rgb(255,${190+o()*50|0},${110+o()*60|0})`,r.fillRect(f+14,d+a*.3,a-28,a*.42))}s.fillStyle="rgba(0,0,0,0.08)",s.fillRect(0,248,256,8)}let c=new Tn(e),l=new Tn(i);for(let h of[c,l])h.wrapS=h.wrapT=zn,h.anisotropy=8,h.colorSpace=Re;return{t:c,te:l}}function g_(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),i=Ja(5);e.fillStyle="#8f8c86",e.fillRect(0,0,128,128);for(let r=0;r<2600;r++){let o=100+i()*90|0;e.fillStyle=`rgb(${o},${o-2},${o-6})`,e.fillRect(i()*128,i()*128,1+i()*2,1+i()*2)}e.strokeStyle="rgba(60,60,60,0.25)",e.lineWidth=1;for(let r=0;r<=4;r++)e.beginPath(),e.moveTo(r*32,0),e.lineTo(r*32,128),e.stroke();let s=new Tn(t);return s.wrapS=s.wrapT=zn,s.anisotropy=8,s.colorSpace=Re,s}function x_(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),i=Ja(31);e.fillStyle="#ffffff",e.fillRect(0,0,128,128);for(let r=0;r<128;r+=16){for(let o=r/16%2?-8:0;o<128;o+=16){let a=210+i()*45|0;e.fillStyle=`rgb(${a},${a},${a})`,e.beginPath(),e.ellipse(o+8,r+9,8,9,0,0,Math.PI),e.fill(),e.fillRect(o,r,16,9)}e.fillStyle="rgba(0,0,0,0.35)",e.fillRect(0,r+14,128,2)}let s=new Tn(t);return s.wrapS=s.wrapT=zn,s.anisotropy=8,s.colorSpace=Re,s}function v_(){let t=document.createElement("canvas"),e=document.createElement("canvas");t.width=t.height=e.width=e.height=256;let i=t.getContext("2d"),s=e.getContext("2d"),r=Ja(41);s.fillStyle="#000",s.fillRect(0,0,256,256),i.fillStyle="#c9c4bc",i.fillRect(0,0,256,256);for(let l=0;l<256;l+=6)for(let h=l/6%2?-6:0;h<256;h+=12){let u=.85+r()*.3;i.fillStyle=`rgb(${255*u|0},${230*u|0},${220*u|0})`,i.fillRect(h+1,l+1,10,4)}let o=256/je;for(let l=0;l<je;l++)for(let h=0;h<je;h++){let u=h*o,f=l*o;i.fillStyle="#efece6",i.fillRect(u+12,f+o*.18,o-24,o*.6),i.fillStyle="#2e3a44",i.fillRect(u+15,f+o*.21,o-30,o*.54),i.fillStyle="rgba(150,180,205,0.5)",i.fillRect(u+15,f+o*.21,(o-30)*.45,o*.54),i.fillStyle="#efece6",i.fillRect(u+o/2-1,f+o*.21,2,o*.54),i.fillRect(u+15,f+o*.47,o-30,2),i.fillStyle="#e4ded4",i.fillRect(u+10,f+o*.78,o-20,4),r()<.4&&(s.fillStyle=`rgb(255,${200+r()*40|0},${120+r()*50|0})`,s.fillRect(u+15,f+o*.21,o-30,o*.54))}let a=new Tn(t),c=new Tn(e);for(let l of[a,c])l.wrapS=l.wrapT=zn,l.anisotropy=8,l.colorSpace=Re;return{t:a,te:c}}var __=[14191212,14916218,13599334,15380622,15786696,13072994],Od=[11882542,11028010,12607546,10242608,6975348,5200482],y_=[16238540,12576988,16246694,12573938,16184042,16373682,14470128,16777215,13234406,16765148],M_=[15134967,13821167,14281704,15329778,15921906,13163496,14674399],b_=[15789026,14933458,16250094,14209477,15525080,15327439],Ci={};function tu(n){let t=["vidro","concreto","deco"];for(let l of t){let{t:h,te:u}=m_(l);Ci[l]=new vn({vertexColors:!0,map:h,emissiveMap:u,emissive:16777215,emissiveIntensity:0})}Ci.telhado=new vn({vertexColors:!0,map:g_()}),Ci.telha=new vn({vertexColors:!0,map:x_()});{let{t:l,te:h}=v_();Ci.tijolo=new vn({vertexColors:!0,map:l,emissiveMap:h,emissive:16777215,emissiveIntensity:0})}let e=1200,i=new Map,s=l=>{let h=i.get(l);return h||(h={pos:[],nor:[],col:[],uv:[]},i.set(l,h)),h},r=new Bt,o=(l,h,u,f,d,g,v,m,p,y,_,M,I,S,w)=>{l.pos.push(h,g,u,f,g,d,f,v,d,h,g,u,f,v,d,h,v,u);for(let b=0;b<6;b++)l.nor.push(m,0,p),l.col.push(M,I,S);let P=g/w,E=v/w;l.uv.push(y,P,_,P,_,E,y,P,_,E,y,E)},a=(l,h,u,f,d,g,v,m)=>{let p=h-f/2,y=h+f/2,_=u-d/2,M=u+d/2,I=g+v,S=[[p,M,y,M,0,1],[y,M,y,_,1,0],[y,_,p,_,0,-1],[p,_,p,M,-1,0]];for(let[w,P,E,b,C,N]of S)o(l,w,P,E,b,g,I,C,N,0,.3,m,m,m*.98,6);l.pos.push(p,I,_,p,I,M,y,I,M,p,I,_,y,I,M,y,I,_);for(let w=0;w<6;w++)l.nor.push(0,1,0),l.col.push(m*1.05,m*1.05,m*1.03);l.uv.push(0,0,0,.2,.2,.2,0,0,.2,.2,.2,0)};for(let l of ze){if(l.removido)continue;let h=Math.floor(l.cx/e)+","+Math.floor(l.cz/e),u=l.pts.length/2,f=l.h,d=l.pts,g=l.id*2654435761>>>0,v=null;if(f<11&&u>=4&&u<=6&&l.area<900){let E=[],b=[],C=0,N=0;for(let tt=0;tt<u;tt++){let ht=(tt+1)%u,Et=Math.hypot(d[ht*2]-d[tt*2],d[ht*2+1]-d[tt*2+1]);Et>N&&(N=Et,C=tt)}let D=(C+1)%u,F=(d[D*2]-d[C*2])/N,W=(d[D*2+1]-d[C*2+1])/N,L=1e9,Y=-1e9,H=1e9,Q=-1e9;for(let tt=0;tt<u;tt++){let ht=d[tt*2]-l.cx,Et=d[tt*2+1]-l.cz,q=ht*F+Et*W,Z=-ht*W+Et*F;L=Math.min(L,q),Y=Math.max(Y,q),H=Math.min(H,Z),Q=Math.max(Q,Z)}let et=(Y-L)*(Q-H);l.area/et>.82&&Q-H>4&&(v={ux:F,uz:W,a0:L,a1:Y,b0:H,b1:Q})}let m=f>45?"vidro":f>14?g%3===0&&f<30?"tijolo":"concreto":v&&g%2===0?"tijolo":"deco",p=m==="vidro"?M_:m==="concreto"?b_:m==="tijolo"?__:y_;r.setHex(p[g%p.length]),l.cor=r.getHex();let y=s(h+","+m),_=s(h+",telhado"),M=f>6&&!v?1.1:0,I=g%7*yr;for(let E=0;E<u;E++){let b=(E+1)%u,C=d[E*2],N=d[E*2+1],D=d[b*2],F=d[b*2+1],W=D-C,L=F-N,Y=Math.hypot(W,L)||1,H=-L/Y,Q=W/Y,et=Math.max(1,Math.round(Y/yr)),tt=I/(yr*je),ht=(I+et*yr)/(yr*je);I+=et*yr;let Et=Math.min(f,4);o(y,C,N,D,F,0,Et,H,Q,tt,ht,r.r*.8,r.g*.8,r.b*.82,Fd*je),f>Et&&o(y,C,N,D,F,Et,f,H,Q,tt,ht,r.r,r.g,r.b,Fd*je),M&&(o(_,C,N,D,F,f,f+M,H,Q,tt*3,ht*3,r.r*.92,r.g*.92,r.b*.92,8),o(_,D,F,C,N,f,f+M,-H,-Q,tt*3,ht*3,r.r*.7,r.g*.7,r.b*.7,8))}if(v){let E=s(h+",telha"),{ux:b,uz:C}=v,N=.5,D=v.a0-N,F=v.a1+N,W=v.b0-N,L=v.b1+N,Y=Math.min(4,(L-W)*.38),H=(W+L)/2,Q=(Z,ft,it)=>[l.cx+Z*b-ft*C,it,l.cz+Z*C+ft*b],et=new Bt(Od[(g>>4)%Od.length]),tt=(Z,ft,it,Mt,Rt)=>{let At=[ft[0]-Z[0],ft[1]-Z[1],ft[2]-Z[2]],Wt=[it[0]-Z[0],it[1]-Z[1],it[2]-Z[2]],K=At[1]*Wt[2]-At[2]*Wt[1],ot=At[2]*Wt[0]-At[0]*Wt[2],z=At[0]*Wt[1]-At[1]*Wt[0];if(ot<0){let rt=ft;ft=it,it=rt,K=-K,ot=-ot,z=-z;let xt=Rt[1];Rt[1]=Rt[2],Rt[2]=xt}let Ct=Math.hypot(K,ot,z)||1;for(let[rt,xt]of[[Z,Rt[0]],[ft,Rt[1]],[it,Rt[2]]])E.pos.push(...rt),E.nor.push(K/Ct,ot/Ct,z/Ct),E.col.push(Mt[0],Mt[1],Mt[2]),E.uv.push(xt[0],xt[1])},ht=[et.r,et.g,et.b],Et=1/2.2,q=Math.hypot(Y,(L-W)/2)/2.2;for(let[Z,ft]of[[W,1],[L,-1]]){let it=Q(D,Z,f),Mt=Q(F,Z,f),Rt=Q(F,H,f+Y),At=Q(D,H,f+Y);tt(it,Mt,Rt,ht,[[0,0],[(F-D)*Et,0],[(F-D)*Et,q]]),tt(it,Rt,At,ht,[[0,0],[(F-D)*Et,q],[0,q]])}for(let Z of[v.a0,v.a1]){let ft=Q(Z,v.b0,f),it=Q(Z,v.b1,f),Mt=Q(Z,H,f+Y*.95),Rt=Z===v.a0?-1:1,At=b*Rt,Wt=C*Rt;for(let K of[ft,it,Mt])y.pos.push(...K),y.nor.push(At,0,Wt),y.col.push(r.r,r.g,r.b),y.uv.push(.02,.02);for(let K of[ft,Mt,it])y.pos.push(...K),y.nor.push(At,0,Wt),y.col.push(r.r,r.g,r.b),y.uv.push(.02,.02)}continue}let S=[];for(let E=0;E<u;E++)S.push(new at(d[E*2],d[E*2+1]));let w;try{w=gs.triangulateShape(S,[])}catch{w=[]}let P=.85+(g>>8)%20/100;for(let E of w){let[b,C,N]=E;if((S[C].x-S[b].x)*(S[N].y-S[b].y)-(S[C].y-S[b].y)*(S[N].x-S[b].x)>0){let F=C;C=N,N=F}for(let F of[b,C,N])_.pos.push(S[F].x,f,S[F].y),_.nor.push(0,1,0),_.col.push(P,P,P*.98),_.uv.push(S[F].x/8,S[F].y/8)}if(f>8&&l.area>150){let E=1+g%3+(f>40?2:0);for(let b=0;b<E;b++){let C=(g>>b*3)%628/100,N=l.raio*.25*(b%3/2),D=l.cx+Math.sin(C)*N,F=l.cz+Math.cos(C)*N;if(!ao(l,D,F))continue;let W=f>40&&b===0;a(_,D,F,W?8:2.2+b%2,W?8:1.6+b%2,f,W?4:1.4,W?.8:.72)}}}let c=[];for(let[l,h]of i){let u=l.split(",")[2],f=new Ee;f.setAttribute("position",new ne(h.pos,3)),f.setAttribute("normal",new ne(h.nor,3)),f.setAttribute("color",new ne(h.col,3)),f.setAttribute("uv",new ne(h.uv,2)),f.computeBoundingSphere();let d=new le(f,Ci[u]);d.matrixAutoUpdate=!1,d.updateMatrix(),d.castShadow=!0,d.receiveShadow=!0,d.name="predios",n.add(d),c.push(d)}return c}var S_=[[44,104,140],[205,200,188],[86,88,94],[96,146,70],[232,214,164],[170,168,160],[110,110,114],[86,88,94]];function eu(n=1){let t=document.createElement("canvas");t.width=Math.ceil(Ft/n),t.height=Math.ceil(Te/n);let e=t.getContext("2d"),i=e.createImageData(t.width,t.height),s=i.data;for(let r=0;r<t.height;r++)for(let o=0;o<t.width;o++){let a=Math.min(Te-1,r*n)*Ft+Math.min(Ft-1,o*n),c=Ie[a]>=0?5:ke[a],l=S_[c],h=(r*t.width+o)*4;s[h]=l[0],s[h+1]=l[1],s[h+2]=l[2],s[h+3]=255}return e.putImageData(i,0,0),t}function E_(){let n=Ft*Te,t=new Uint8Array(n);for(let c=0;c<n;c++)t[c]=Za(ke[c])&&Ie[c]<0?1:0;let e=new Uint16Array(n),i=new Uint16Array(n);for(let c=0;c<Te;c++){let l=0;for(;l<Ft;){if(!t[c*Ft+l]){l++;continue}let h=l;for(;h<Ft&&t[c*Ft+h];)h++;for(let u=l;u<h;u++)e[c*Ft+u]=h-l;l=h}}for(let c=0;c<Ft;c++){let l=0;for(;l<Te;){if(!t[l*Ft+c]){l++;continue}let h=l;for(;h<Te&&t[h*Ft+c];)h++;for(let u=l;u<h;u++)i[u*Ft+c]=h-l;l=h}}let s=8,r=c=>e[c]>=s&&i[c]>=s,o=new Uint8Array(n*4);for(let c=3;c<Te-3;c++)for(let l=3;l<Ft-3;l++){let h=c*Ft+l;if(!t[h]||r(h))continue;let u=-1;if(i[h]>=s&&e[h]<s&&e[h]>=3&&(r(h-Ft)||r(h+Ft))?u=0:e[h]>=s&&i[h]<s&&i[h]>=3&&(r(h-1)||r(h+1))&&(u=1),u<0)continue;let f=!1;for(let d=-6;d<=6&&!f;d+=3)for(let g=-6;g<=6;g+=3){let v=h+d*Ft+g;if(v>=0&&v<n&&Ie[v]>=0){f=!0;break}}f&&(o[h*4+u]=255)}let a=c=>ke[c]===be.CENTRO;for(let c=2;c<Te-2;c++)for(let l=2;l<Ft-2;l++){let h=c*Ft+l;if(!a(h)||r(h)||o[h*4]||o[h*4+1])continue;let u=0,f=0,d=0,g=0;for(let v=-3;v<=3;v++)(a(h+v)||a(h+v-Ft)||a(h+v+Ft))&&u++,(a(h+v*Ft)||a(h+v*Ft-1)||a(h+v*Ft+1))&&f++,a(h+v)&&d++,a(h+v*Ft)&&g++;u>=6&&g<=3&&d>=g&&!o[(h-Ft)*4+2]?o[h*4+2]=255:f>=6&&d<=3&&g>d&&!o[(h-1)*4+3]&&(o[h*4+3]=255)}return o}function nu(n){let t=new Uint8Array(Ft*Te*4);for(let c=0;c<Ft*Te;c++){let l=ke[c],h=c*4;t[h]=l===be.RUA||l===be.PONTE||l===be.CENTRO?255:0,t[h+1]=l===be.PARQUE?255:0,t[h+2]=l===be.AREIA||l===be.CENTRO?255:0,t[h+3]=Ie[c]>=0?255:0}let e=new _s(t,Ft,Te,dn,An);e.magFilter=cn,e.minFilter=cn,e.needsUpdate=!0;let i=new _s(E_(),Ft,Te,dn,An);i.magFilter=nn,i.minFilter=nn,i.needsUpdate=!0;let s=new vn({color:16777215});s.onBeforeCompile=c=>{c.uniforms.mapa={value:e},c.uniforms.marcas={value:i},c.uniforms.tam={value:new at(Oe,Be)},c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vW = (modelMatrix * vec4(transformed, 1.0)).xyz;`),c.fragmentShader=c.fragmentShader.replace("#include <common>",`#include <common>
      uniform sampler2D mapa; uniform sampler2D marcas; uniform vec2 tam; varying vec3 vW;
      float h1(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float ru(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(h1(i), h1(i+vec2(1,0)), u.x), mix(h1(i+vec2(0,1)), h1(i+vec2(1,1)), u.x), u.y); }
      float fbm(vec2 p){ return ru(p)*0.5 + ru(p*2.07)*0.3 + ru(p*4.13)*0.2; }`).replace("#include <map_fragment>",`
      {
        vec2 uv = vW.xz / tam;
        vec4 m = texture2D(mapa, uv);
        vec4 mk = texture2D(marcas, uv);
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
        float cz = abs(abs(fract(p.y / ${Ae.toFixed(4)}) - 0.5) * ${Ae.toFixed(4)} - 0.16);
        float cx = abs(abs(fract(p.x / ${Ae.toFixed(4)}) - 0.5) * ${Ae.toFixed(4)} - 0.16);
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
        vec3 c = mix(calc, estac, ehLote * 0.9);
        c = mix(c, gr * 0.95, smoothstep(0.6, 0.7, jard) * 0.85);
        c = mix(c, gr, grama);
        c = mix(c, ar, areia);
        c = mix(c, asf, rua);
        c *= 0.9 + 0.18 * n3;
        c *= 1.0 - smoothstep(0.05, 0.6, m.a) * 0.3;
        diffuseColor.rgb = c;
      }`)};let r=new $i(Oe,Be,48,28);r.rotateX(-Math.PI/2),r.translate(Oe/2,0,Be/2);let o=new le(r,s);o.name="chao",o.receiveShadow=!0,n.add(o);let a=new le(new $i(8e4,8e4).rotateX(-Math.PI/2),new Ln({color:sn?997946:9276032}));return a.position.set(Oe/2,-4,Be/2),n.add(a),o}function iu(n){let t=new Uint8Array(Ft*Te);for(let a=0;a<t.length;a++)t[a]=ke[a]===be.AGUA?255:0;let e=new _s(t,Ft,Te,oo,An);e.magFilter=cn,e.minFilter=cn,e.needsUpdate=!0;let i={value:0},s=new Ss({color:16777215,transparent:!0,depthWrite:!1,shininess:90,specular:5596774,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4});s.onBeforeCompile=a=>{a.uniforms.mascara={value:e},a.uniforms.tam={value:new at(Oe,Be)},a.uniforms.tempo=i,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vW = (modelMatrix * vec4(transformed, 1.0)).xyz;`),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
      uniform sampler2D mascara; uniform vec2 tam; uniform float tempo; varying vec3 vW;
      float h1a(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float rua2(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(h1a(i), h1a(i+vec2(1,0)), u.x), mix(h1a(i+vec2(0,1)), h1a(i+vec2(1,1)), u.x), u.y); }`).replace("#include <map_fragment>",`
      {
        vec2 uv = vW.xz / tam;
        float mm = ${sn?"1.0":"0.0"};
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
      }`)};let r=new $i(Oe+3e4,Be+3e4,64,48);r.rotateX(-Math.PI/2);let o=new le(r,s);return o.position.set(Oe/2,.3,Be/2),o.renderOrder=1,o.receiveShadow=!0,o.userData.tempo=i,n.add(o),o}function ws(n,t){let e=n.attributes.position.count,i=new Float32Array(e*3);for(let s=0;s<e;s++){let r=t(n.attributes.position.getY(s),s);i[s*3]=r[0],i[s*3+1]=r[1],i[s*3+2]=r[2]}return n.setAttribute("color",new pe(i,3)),n.attributes.uv&&n.deleteAttribute("uv"),n}function A_(){let n=[],t=[];for(let o=0;o<6;o++){let a=new xn(.19-o*.012,.22-o*.012,1.62,6).toNonIndexed(),c=(o/6)**2*.9;a.rotateZ(-.06*o/6),a.translate(c,.81+o*1.58,0);let l=o%2?.86:1;n.push(ws(a,h=>[.62*l,.5*l,.36*l]))}let i=.9,s=9.6;for(let o=0;o<4;o++){let a=new ri(.16,6,4).toNonIndexed();a.translate(i+Math.cos(o*1.6)*.22,s-.25,Math.sin(o*1.6)*.22),n.push(ws(a,()=>[.42,.33,.12]))}let r=10;for(let o=0;o<r;o++){let a=o/r*Math.PI*2+o%2*.25,c=4+o%3*.6,l=.25+o%4*.18+(o>=8?.35:-.1),h=[],u=5,f=[],d=[],g=0,v=0;for(let p=0;p<=u;p++){let y=p/u,_=y*c,M=Math.sin(y*1.2)*.9-y*y*c*l,I=Math.sin(y*Math.PI)*.75+.05;h.push([_,M,I])}for(let p=0;p<u;p++){let[y,_,M]=h[p],[I,S,w]=h[p+1];for(let P of[-1,1]){let E=P*M,b=P*w;f.push(y,_,0,I,S,0,I,S-.25*w,b,y,_,0,I,S-.25*w,b,y,_-.25*M,E);let C=.85+p/u*.3;for(let N=0;N<6;N++)d.push(.24*C,.5*C,.2*C)}}let m=new Ee;m.setAttribute("position",new ne(f,3)),m.setAttribute("color",new ne(d,3)),m.computeVertexNormals(),m.rotateY(a),m.translate(i,s,0),t.push(m)}return{tronco:oi(n),folhas:oi(t)}}function T_(){let n=[],t=[],e=new xn(.25,.42,3.4,7).toNonIndexed();e.translate(0,1.7,0),n.push(ws(e,()=>[.42,.33,.24]));for(let s=0;s<3;s++){let r=new xn(.1,.18,2.2,5).toNonIndexed();r.rotateZ(.8),r.rotateY(s*2.1),r.translate(Math.cos(s*2.1)*.6,3.6,-Math.sin(s*2.1)*.6),n.push(ws(r,()=>[.4,.31,.22]))}let i=[[0,5.4,0,2.6],[1.7,4.8,.6,1.9],[-1.5,4.9,-.7,2],[.4,4.6,-1.8,1.8],[-.6,4.7,1.7,1.8],[.3,6.6,.2,1.7]];for(let[s,r,o,a]of i){let c=new Fa(a,0).toNonIndexed();c.scale(1,.8,1),c.translate(s,r,o),t.push(ws(c,(l,h)=>{let u=.75+(l-3.5)/4*.35+h*7919%13/100;return[.3*u,.47*u,.2*u]}))}return{tronco:oi(n),copa:oi(t)}}function w_(){for(let n=0;n<60;n++){let t=Math.random()*Oe,e=Math.random()*Be,i=ai(t,e);if(i<0||Ie[i]>=0)continue;let s=ke[i];if(s===be.PARQUE&&Math.random()<.6)return{x:t,z:e,tipo:Math.random()<.5?0:1};if(s===be.AREIA&&Math.random()<.35)return{x:t,z:e,tipo:0};if(s===be.CHAO){let r=i%Ft,o=i/Ft|0,a=!1;for(let[c,l]of[[1,0],[-1,0],[0,1],[0,-1]]){let h=(o+l)*Ft+r+c;h>=0&&h<ke.length&&Za(ke[h])&&(a=!0)}if(a&&Math.random()<.5)return{x:t,z:e,tipo:Math.random()<.7?0:1};if(!a&&Math.random()<.04)return{x:t,z:e,tipo:Math.random()<.5?0:1}}}return null}function su(n,t=2600){let e=new vn({vertexColors:!0}),i=new vn({vertexColors:!0,side:qn}),s=A_(),r=T_(),o=Math.round(t*.65),a=t-o,c=new si(s.tronco,e,o),l=new si(s.folhas,i,o),h=new si(r.tronco,e,a),u=new si(r.copa,e,a),f=new ie,d=new gn,g=new Fe,v=new U,m=new U,p=new Bt,y=0,_=0,M=0;for(;(y<o||_<a)&&M<t*6;){M++;let I=w_();if(I){if(I.tipo===0&&y<o){let S=.8+Math.random()*.5;g.set(0,Math.random()*6.28,0),d.setFromEuler(g),f.compose(m.set(I.x,0,I.z),d,v.set(S,S*(.9+Math.random()*.3),S)),c.setMatrixAt(y,f),l.setMatrixAt(y,f),p.setHSL(.24+Math.random()*.08,.5,.75+Math.random()*.4),l.setColorAt(y,p),c.setColorAt(y,p.setRGB(1,1,1)),y++}else if(I.tipo===1&&_<a){let S=.75+Math.random()*.6;g.set(0,Math.random()*6.28,0),d.setFromEuler(g),f.compose(m.set(I.x,0,I.z),d,v.set(S,S,S)),h.setMatrixAt(_,f),u.setMatrixAt(_,f),p.setHSL(.22+Math.random()*.1,.45,.8+Math.random()*.35),u.setColorAt(_,p),h.setColorAt(_,p.setRGB(1,1,1)),_++}}}c.count=l.count=y,h.count=u.count=_;for(let I of[c,l,h,u])I.computeBoundingSphere(),I.castShadow=!0,n.add(I);return[c,l,h,u]}var Pe={x:null,z:null,n:0,malha:null,esmagado:null};function ru(n,t=1600,e){let i=[],s=(p,y,_,M,I)=>{let S=p.toNonIndexed();S.translate(_,M,I),i.push(ws(S,()=>y))};s(new Ye(1.8,.62,4.4),[1,1,1],0,.55,0),s(new Ye(1.62,.5,2.2),[.95,.95,.95],0,1.1,-.25),s(new Ye(1.64,.4,2),[.18,.22,.27],0,1.1,-.25),s(new Ye(1.4,.38,.05),[.18,.22,.27],0,1.08,.88);for(let[p,y]of[[-.82,1.35],[.82,1.35],[-.82,-1.35],[.82,-1.35]]){let _=new xn(.33,.33,.24,6).toNonIndexed();_.rotateZ(Math.PI/2),_.translate(p,.33,y),i.push(ws(_,()=>[.08,.08,.08]))}s(new Ye(.3,.12,.05),[2.2,2.1,1.8],.6,.65,2.21),s(new Ye(.3,.12,.05),[2.2,2.1,1.8],-.6,.65,2.21),s(new Ye(.3,.12,.05),[1.6,.2,.15],.6,.7,-2.21),s(new Ye(.3,.12,.05),[1.6,.2,.15],-.6,.7,-2.21);let r=oi(i),o=new Ss({vertexColors:!0,shininess:60,specular:4473924}),a=new si(r,o,t),c=[15921906,1842204,10133414,11740702,2245242,6975348,14207136,2907706,15251504,5909098,13685976,3817544],l=new ie,h=new gn,u=new Fe,f=new U(1,1,1),d=new U,g=new Bt;Pe.x=new Float32Array(t),Pe.z=new Float32Array(t),Pe.ang=new Float32Array(t),Pe.esmagado=new Uint8Array(t);let v=0,m=0;for(;v<t&&m<t*80;){m++;let p=1+Math.floor(Math.random()*(Ft-2)),y=1+Math.floor(Math.random()*(Te-2)),_=y*Ft+p;if(ke[_]!==be.RUA||Ie[_]>=0)continue;let M=0,I=0;for(let[b,C]of[[1,0],[-1,0],[0,1],[0,-1]]){let N=ke[_+C*Ft+b];!Za(N)&&N!==be.AGUA&&N!==be.PONTE&&(M=b,I=C)}if(!M&&!I)continue;let S=(p+.5)*Ae+M*.9,w=(y+.5)*Ae+I*.9;if(e&&e(S,w))continue;let P=!1;for(let b=Math.max(0,v-40);b<v;b++)if(Math.abs(Pe.x[b]-S)<6&&Math.abs(Pe.z[b]-w)<6){P=!0;break}if(P)continue;let E=(M!==0?0:Math.PI/2)+(Math.random()<.5?Math.PI:0)+(Math.random()-.5)*.08;u.set(0,E,0),h.setFromEuler(u),l.compose(d.set(S,0,w),h,f),a.setMatrixAt(v,l),g.setHex(c[Math.random()*c.length|0]),a.setColorAt(v,g),Pe.x[v]=S,Pe.z[v]=w,Pe.ang[v]=E,v++}return a.count=v,Pe.n=v,Pe.malha=a,a.computeBoundingSphere(),a.castShadow=!0,a.receiveShadow=!0,n.add(a),a}var Bd=new ie,kd=new gn,Hd=new Fe,R_=new U,C_=new U;function ou(n,t,e){if(!Pe.malha)return 0;let i=0;for(let s=0;s<Pe.n;s++){if(Pe.esmagado[s])continue;let r=Pe.x[s]-n,o=Pe.z[s]-t;r*r+o*o<e*e&&(Pe.esmagado[s]=1,Hd.set(0,Pe.ang[s],(Math.random()-.5)*.2),kd.setFromEuler(Hd),Bd.compose(C_.set(Pe.x[s],-.1,Pe.z[s]),kd,R_.set(1.08,.35,1.04)),Pe.malha.setMatrixAt(s,Bd),Pe.malha.instanceMatrix.needsUpdate=!0,i++)}return i}function P_(n,t){let e=(t+180)/360*Math.pow(2,_e.z)*256-_e.gx0,i=n*Math.PI/180,s=(1-Math.asinh(Math.tan(i))/Math.PI)/2*Math.pow(2,_e.z)*256-_e.gy0;return{x:e*Ji,z:s*Ji}}var ut=(n=0,t=1)=>n+Math.random()*(t-n),ja=(n,t)=>Math.floor(ut(n,t+1)),ci=n=>n[Math.floor(Math.random()*n.length)],ln=(n,t,e)=>n<t?t:n>e?e:n,Gd=(n,t,e)=>n+(t-n)*e,Xe=(n,t,e,i)=>{let s=n-e,r=t-i;return s*s+r*r},Ot=(n,t,e,i)=>Math.sqrt(Xe(n,t,e,i));function Pi(n,t){let e=t-n;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return e}function He(n,t,e){let i=Pi(n,t);return Math.abs(i)<=e?t:n+Math.sign(i)*e}var co=class{constructor(t,e,i,s){this.cel=t,this.nx=Math.ceil(e/t)+1,this.nz=Math.ceil(i/t)+1,this.head=new Int32Array(this.nx*this.nz).fill(-1),this.next=new Int32Array(s),this.itens=[],this.usadas=[]}chave(t,e){let i=Math.floor(t/this.cel),s=Math.floor(e/this.cel);return i<0?i=0:i>=this.nx&&(i=this.nx-1),s<0?s=0:s>=this.nz&&(s=this.nz-1),s*this.nx+i}limpar(){for(let t of this.usadas)this.head[t]=-1;this.usadas.length=0,this.itens.length=0}add(t){let e=this.itens.length;if(e>=this.next.length){let s=new Int32Array(this.next.length*2);s.set(this.next),this.next=s}this.itens.push(t);let i=this.chave(t.x,t.z);this.head[i]===-1&&this.usadas.push(i),this.next[e]=this.head[i],this.head[i]=e}busca(t,e,i,s){let r=this.cel,o=Math.max(0,Math.floor((t-i)/r)),a=Math.min(this.nx-1,Math.floor((t+i)/r)),c=Math.max(0,Math.floor((e-i)/r)),l=Math.min(this.nz-1,Math.floor((e+i)/r)),h=i*i;for(let u=c;u<=l;u++)for(let f=o;f<=a;f++){let d=this.head[u*this.nx+f];for(;d!==-1;){let g=this.itens[d],v=g.x-t,m=g.z-e,p=v*v+m*m;if(p<=h&&s(g,p))return;d=this.next[d]}}}maisProximo(t,e,i,s){let r=null,o=1/0;return this.busca(t,e,i,(a,c)=>{c<o&&(!s||s(a))&&(o=c,r=a)}),r}contar(t,e,i,s){let r=0;return this.busca(t,e,i,o=>{(!s||s(o))&&r++}),r}};function Nt(n,t,e,i,s,r,o=0,a=0,c=0){let l=t.index?t.toNonIndexed():t;(o||a||c)&&l.applyMatrix4(new ie().makeRotationFromEuler(new Fe(o,a,c))),l.translate(i,s,r);let h=l.attributes.position.count,u=new Float32Array(h*3),f=Array.isArray(e)?e:[e,e,e];for(let d=0;d<h;d++)u[d*3]=f[0],u[d*3+1]=f[1],u[d*3+2]=f[2];l.setAttribute("color",new pe(u,3)),l.attributes.uv||l.setAttribute("uv",new pe(new Float32Array(h*2),2)),n.push(l)}var ge=(n,t,e)=>new Ye(n,t,e),Nn=(n,t,e,i=7)=>new xn(n,t,e,i),Ii=(n,t,e,i)=>{let s=new ri(n,9,7);return s.scale(t,e,i),s};function Ka(n,t,e,i){let s=new xn(n*.72,t*.72,e,8);return s.rotateY(Math.PI/8),s.scale(1,1,i),s}function _n(n){let t=[];n(t);let e=oi(t);return e.computeVertexNormals(),e}var I_=.93,lo=.44,Qa=.43,Mr=.29,ho=.27,li=.5;function z_(){return{quadril:_n(n=>{Nt(n,Ka(.33,.3,.2,.62),1,0,-.04,0)}),tronco:_n(n=>{Nt(n,Ka(.43,.33,li,.58),1,0,li/2,0),Nt(n,Ii(.085,1,.8,1),1,.2,li-.04,0),Nt(n,Ii(.085,1,.8,1),1,-.2,li-.04,0),Nt(n,Nn(.05,.055,.1),.93,0,li+.05,0)}),cabeca:_n(n=>{Nt(n,Ii(.112,.92,1.08,1),1,0,.12,.005),Nt(n,Ii(.05,.9,.7,.6),.97,0,.065,.075),Nt(n,ge(.04,.05,.04),.95,0,.12,.112),Nt(n,ge(.035,.02,.012),.12,.042,.15,.104),Nt(n,ge(.035,.02,.012),.12,-.042,.15,.104),Nt(n,ge(.05,.012,.01),.45,0,.068,.103),Nt(n,Ii(.03,.5,1,.8),.92,.106,.12,0),Nt(n,Ii(.03,.5,1,.8),.92,-.106,.12,0)}),cabelo:_n(n=>{let t=new ri(.118,10,6,0,Math.PI*2,0,Math.PI*.55);t.scale(.95,1.05,1.05),Nt(n,t,1,0,.13,-.008),Nt(n,Ii(.1,1,.9,.6),1,0,.1,-.06)}),capacete:_n(n=>{let t=new ri(.135,12,6,0,Math.PI*2,0,Math.PI*.52);t.scale(1,.92,1.1),Nt(n,t,1,0,.145,-.005),Nt(n,Nn(.137,.142,.035,12).scale(1,1,1.1),.85,0,.15,-.005),Nt(n,ge(.05,.04,.035),.3,0,.23,.13),Nt(n,Nn(.018,.018,.08),.2,.026,.25,.155,Math.PI/2-.4),Nt(n,Nn(.018,.018,.08),.2,-.026,.25,.155,Math.PI/2-.4),Nt(n,ge(.18,.03,.025),.25,0,.14,.115),Nt(n,ge(.04,.05,.05),.65,.128,.18,0),Nt(n,ge(.04,.05,.05),.65,-.128,.18,0),Nt(n,ge(.07,.05,.03),.4,0,.21,-.14)}),colete:_n(n=>{Nt(n,Ka(.47,.4,.36,.72),1,0,.28,0);for(let t of[-.12,0,.12])Nt(n,ge(.1,.13,.06),.8,t,.17,.15);Nt(n,ge(.17,.11,.05),.78,.08,.33,.15),Nt(n,ge(.12,.09,.05),.78,-.13,.26,.15),Nt(n,ge(.36,.06,.07),.6,0,.06,.03)}),mochila:_n(n=>{Nt(n,Ka(.3,.28,.38,.55),1,0,.28,-.18),Nt(n,ge(.26,.13,.05),.85,0,.2,-.27),Nt(n,Nn(.065,.065,.3,8),.8,0,.5,-.18,0,0,Math.PI/2),Nt(n,Nn(.008,.008,.35,4),.25,.1,.62,-.2)}),coxa:_n(n=>{Nt(n,Nn(.088,.072,lo,8),1,0,-lo/2,.005),Nt(n,Ii(.07,1,.8,1),1,0,-lo,0),Nt(n,ge(.08,.1,.05),.75,.07,-.2,.01)}),canela:_n(n=>{Nt(n,Nn(.068,.055,Qa-.06,8),1,0,-(Qa-.06)/2,0),Nt(n,ge(.1,.09,.07),.8,0,-.03,.04)}),bota:_n(n=>{Nt(n,ge(.11,.1,.25),1,0,-.04,.05),Nt(n,ge(.115,.03,.27),.5,0,-.085,.05)}),braco:_n(n=>{Nt(n,Nn(.062,.052,Mr,7),1,0,-Mr/2,0),Nt(n,Ii(.05,1,1,1),1,0,-Mr,0)}),antebraco:_n(n=>{Nt(n,Nn(.05,.04,ho-.04,7),1,0,-(ho-.04)/2,0)}),mao:_n(n=>{Nt(n,ge(.075,.095,.045),1,0,-.045,.01),Nt(n,ge(.025,.05,.03),1,.035,-.03,.03)}),arma:_n(n=>{Nt(n,ge(.045,.07,.24),.3,0,.05,-.27),Nt(n,ge(.05,.085,.3),.2,0,.06,-.02),Nt(n,ge(.058,.07,.24),.3,0,.055,.25),Nt(n,Nn(.011,.011,.3),.13,0,.055,.5,Math.PI/2),Nt(n,Nn(.017,.017,.06),.13,0,.055,.66,Math.PI/2),Nt(n,ge(.035,.13,.06),.3,0,-.04,.05,.3),Nt(n,ge(.03,.09,.04),.3,0,-.02,-.06,-.3),Nt(n,ge(.035,.055,.12),.12,0,.13,.03),Nt(n,ge(.04,.04,.02),.5,0,.13,.095)})}}function L_(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d");e.fillStyle="#b8ab84",e.fillRect(0,0,128,128);let i=77,s=()=>(i=i*1664525+1013904223>>>0,i/4294967296),r=["#8d7f58","#6f7350","#cfc4a2","#7a5f40","#9a9467"];for(let a=0;a<90;a++){e.fillStyle=r[a%r.length],e.beginPath();let c=s()*128,l=s()*128,h=3+s()*8;for(let u=0;u<6.28;u+=.7){let f=h*(.6+s()*.6);e.lineTo(c+Math.cos(u)*f,l+Math.sin(u)*f*.7)}e.fill()}let o=new Tn(t);return o.wrapS=o.wrapT=zn,o.colorSpace=Re,o}var U_={quadril:1,tronco:1,coxa:1,canela:1,braco:1,antebraco:1,mochila:1,colete:1},D_={coxa:1,canela:1,bota:1,braco:1,antebraco:1,mao:1};function Wd(n,t,e,i){let s=Math.asin(Math.max(-1,Math.min(1,n))),r=Math.atan2(-e,-t);i[0]=r,i[1]=s}var tc=class{constructor(t,e,i,s){this.m={},this.n={},this.max={};for(let r in e){let o=D_[r]?i*2:i,a=new vn({vertexColors:!0,map:s&&U_[r]?s:null}),c=new si(e[r],a,o);c.instanceMatrix.setUsage(Zi),c.instanceColor=new ys(new Float32Array(o*3),3),c.count=0,c.frustumCulled=!1,c.castShadow=!0,t.add(c),this.m[r]=c,this.n[r]=0,this.max[r]=o}}comecar(){for(let t in this.n)this.n[t]=0}terminar(){for(let t in this.m){let e=this.m[t];e.count=Math.min(this.max[t],this.n[t]),e.instanceMatrix.needsUpdate=!0,e.instanceColor.needsUpdate=!0}}parte(t,e,i,s,r,o,a,c,l,h,u,f,d){let g=this.m[t],v=this.n[t]++;if(v>=this.max[t])return;let m=g.instanceMatrix.array,p=v*16,y=Math.cos(h),_=Math.sin(h),M=Math.cos(u),I=Math.sin(u),S=r*M+o*_*I,w=-r*I+o*_*M,P=o*y,E=y*I,b=y*M,C=-_,N=-o*M+r*_*I,D=o*I+r*_*M,F=r*y;m[p]=S*f,m[p+1]=E*f,m[p+2]=N*f,m[p+3]=0,m[p+4]=w*f,m[p+5]=b*f,m[p+6]=D*f,m[p+7]=0,m[p+8]=P*f,m[p+9]=C*f,m[p+10]=F*f,m[p+11]=0,m[p+12]=e+(r*a+o*l)*f,m[p+13]=i+c*f,m[p+14]=s+(-o*a+r*l)*f,m[p+15]=1;let W=g.instanceColor.array,L=v*3;W[L]=d[0],W[L+1]=d[1],W[L+2]=d[2]}},N_=[.25,.22,.18],cu=[.13,.13,.14],F_=[.66,.6,.45],O_=[.7,.64,.48],B_=[.55,.45,.32],k_=[.2,.18,.17],ji=[0,0],ec=class{constructor(t){let e=z_();this.civ=new tc(t,e,2600,null),this.mil=new tc(t,e,600,L_())}comecar(){this.civ.comecar(),this.mil.comecar()}terminar(){this.civ.terminar(),this.mil.terminar()}_membro(t,e,i,s,r,o,a,c,l,h,u,f,d,g,v,m,p,y){let _=a[0]-o[0],M=a[1]-o[1],I=a[2]-o[2],S=Math.hypot(_,M,I)||1e-4,w=Math.min(S,(s+r)*.999),P=_/S,E=M/S,b=I/S,C=(s*s-r*r+w*w)/(2*w),N=Math.sqrt(Math.max(0,s*s-C*C)),D=c[0]*P+c[1]*E+c[2]*b,F=c[0]-D*P,W=c[1]-D*E,L=c[2]-D*b,Y=Math.hypot(F,W,L)||1;F/=Y,W/=Y,L/=Y;let H=o[0]+P*C+F*N,Q=o[1]+E*C+W*N,et=o[2]+b*C+L*N,tt=Math.hypot(H-o[0],Q-o[1],et-o[2])||1;Wd((H-o[0])/tt,(Q-o[1])/tt,(et-o[2])/tt,ji),t.parte(e,l,h,u,f,d,o[0],o[1],o[2],ji[0],ji[1],g,v);let ht=o[0]+P*w,Et=o[1]+E*w,q=o[2]+b*w,Z=Math.hypot(ht-H,Et-Q,q-et)||1;return Wd((ht-H)/Z,(Et-Q)/Z,(q-et)/Z,ji),t.parte(i,l,h,u,f,d,H,Q,et,ji[0],ji[1],g,m),p&&t.parte(p,l,h,u,f,d,ht,Et,q,ji[0],ji[1],g,y),{ex:H,ey:Q,ez:et,hx:ht,hy:Et,hz:q}}add(t,e,i,s,r,o,a,c,l,h=0,u=1,f=null,d=1){let g=h===1||h===3,v=g?this.mil:this.civ,m=Math.cos(s),p=Math.sin(s),y=h===1||h===2||h===4||h===5;if(o===3){v.parte("tronco",t,e+.15,i,m,p,0,0,0,Math.PI/2,0,u,a),v.parte("cabeca",t,e+.15,i,m,p,0,0,li+.08,Math.PI/2,0,u,l),v.parte("quadril",t,e+.12,i,m,p,0,0,0,Math.PI/2,0,u,c);for(let et of[1,-1])v.parte("coxa",t,e+.1,i,m,p,et*.1,0,-.05,-Math.PI/2,et*.15,u,c),v.parte("braco",t,e+.12,i,m,p,et*.22,0,li-.05,-Math.PI/2-.5,et*.5,u,a);return}let _=Math.sin(r),M=Math.cos(r),I=Math.min(1,d),S=o===1?.35:o===2?.12:.05+I*.08,w=Math.abs(M)*.035*I,P=I_-w,E=Math.cos(S),b=Math.sin(S),C=c,N=g?B_:h===2||h===5?cu:k_;for(let et of[1,-1]){let ht=-(et===1?_:-_)*.55*I,Et=Math.max(0,et===1?M:-M)*.9*I+(o===1?.15:.05),q=et*.1;v.parte("coxa",t,e,i,m,p,q,P,0,ht,0,u,C);let Z=q,ft=P-lo*Math.cos(ht),it=-lo*Math.sin(ht),Mt=ht+Et;v.parte("canela",t,e,i,m,p,Z,ft,it,Mt,0,u,C);let Rt=Z,At=ft-Qa*Math.cos(Mt),Wt=it-Qa*Math.sin(Mt);v.parte("bota",t,e,i,m,p,Rt,At+.06,Wt,0,0,u,N)}v.parte("quadril",t,e,i,m,p,0,P,0,0,0,u,c);let D=(et,tt,ht,Et)=>(Et[0]=et,Et[1]=P+tt*E-ht*b,Et[2]=tt*b+ht*E,Et);v.parte("tronco",t,e,i,m,p,0,P,0,-S,0,u,a);let F=D(0,li+.1,0,[0,0,0]),W=o===1?-.25:o===2?.05:0;v.parte("cabeca",t,e,i,m,p,F[0],F[1],F[2],-S*.4+W,0,u,l),g||h===2||h===5?(v.parte("colete",t,e,i,m,p,0,P+.12*E,.12*b,-S,0,u,h===2||h===5?cu:h===3?[.45,.42,.33]:F_),v.parte("capacete",t,e,i,m,p,F[0],F[1],F[2],-S*.4+W,0,u,h===2||h===5?cu:h===3?[.5,.47,.38]:O_),g&&v.parte("mochila",t,e,i,m,p,0,P+.12*E,.12*b,-S,0,u,h===3?[.6,.58,.5]:[.92,.9,.85])):f&&v.parte("cabelo",t,e,i,m,p,F[0],F[1],F[2],-S*.4+W,0,u,f);let L=D(.2,li-.05,0,[0,0,0]),Y=D(-.2,li-.05,0,[0,0,0]),H=h===0||h===3||h===4?l:N_,Q=a;if(y&&o!==1&&o!==4){let et=o===2,tt=-.11,ht=et?1.38:1+w*.5,Et=et?.16+b*.3:.2,q=et?0:.5+_*.04*I,Z=et?.03:.35;this._arma(v,t,e,i,m,p,tt,ht,Et,q,Z,u);let ft=Math.cos(q)*Math.cos(Z),it=-Math.sin(q),Mt=Math.sin(Z)*Math.cos(q),Rt=[tt+Mt*.27,ht+.05+it*.27,Et+ft*.27],At=[tt,ht+.02,Et-.02];this._membro(v,"braco","antebraco",Mr,ho,L,Rt,[1,-.6,-.3],t,e,i,m,p,u,Q,Q,"mao",H),this._membro(v,"braco","antebraco",Mr,ho,Y,At,[-1,-.7,-.6],t,e,i,m,p,u,Q,Q,"mao",H);return}for(let et of[1,-1]){let tt=et===1?L:Y,ht;if(o===1)ht=[tt[0]*.8,tt[1]-.05+(et===1?_:-_)*.05,tt[2]+.52];else if(o===4)ht=[tt[0]+et*(.2+_*.12),tt[1]+.5,tt[2]+.05];else{let Et=(et===1?-_:_)*.45*I;ht=[tt[0]+et*.05,tt[1]-.52*Math.cos(Et)+.05*I,tt[2]+.52*Math.sin(Et)+.04]}this._membro(v,"braco","antebraco",Mr,ho,tt,ht,[et*.4,.1,-1],t,e,i,m,p,u,o===1&&h!==3?l:Q,o===1||h===0||h===4?l:Q,"mao",H)}}_arma(t,e,i,s,r,o,a,c,l,h,u,f){let d=Math.cos(Math.atan2(o,r)+u),g=Math.sin(Math.atan2(o,r)+u),v=e+(r*a+o*l)*f,m=s+(-o*a+r*l)*f;t.parte("arma",v,i,m,d,g,0,c,0,h,0,f,[.38,.38,.39])}},$n=n=>[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255],Xd=[14241615,5210073,15921906,15911244,5683312,15108800,3355443,8377312,16752448,10185686,2051724,13218447,16777215,2864037].map($n),qd=[3095378,3947580,7035461,2042436,14208437,4873594,2829099,9085122].map($n),Yd=[15843965,14724201,13010498,9262372,16767916,11037500].map($n),$d=[1709072,3877406,6176806,9071163,14202218,2236962,7024158,11577760].map($n),Zd=[9413498,10135690,8228714,10725774].map($n),uo=[1,1,1],nc=[.95,.95,.93],fo=$n(14264183),ic=$n(1908774),sc=$n(2303532);var Zn=4e3,po=600,rc=class{constructor(t){this.pos=new Float32Array(Zn*3),this.cor=new Float32Array(Zn*4),this.tam=new Float32Array(Zn),this.vel=new Float32Array(Zn*3),this.vida=new Float32Array(Zn),this.vidaMax=new Float32Array(Zn),this.cresce=new Float32Array(Zn),this.grav=new Float32Array(Zn),this.corIni=new Float32Array(Zn*3),this.corFim=new Float32Array(Zn*3),this.livre=[];for(let r=Zn-1;r>=0;r--)this.livre.push(r);this.ativos=[];let e=new Ee;e.setAttribute("position",new pe(this.pos,3).setUsage(Zi)),e.setAttribute("cor",new pe(this.cor,4).setUsage(Zi)),e.setAttribute("tam",new pe(this.tam,1).setUsage(Zi)),this.geo=e;let i=new Un({transparent:!0,depthWrite:!1,uniforms:{escala:{value:600}},vertexShader:`attribute vec4 cor; attribute float tam; varying vec4 vC; uniform float escala;
        void main(){ vC = cor; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = clamp(tam * escala / -mv.z, 1.0, 256.0); gl_Position = projectionMatrix * mv; }`,fragmentShader:"varying vec4 vC; void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d,d); if (r > 0.25) discard; gl_FragColor = vec4(vC.rgb, vC.a * (1.0 - r*3.2)); }"});this.matP=i,this.pontos=new Ca(e,i),this.pontos.frustumCulled=!1,this.pontos.renderOrder=5,t.add(this.pontos),this.tPos=new Float32Array(po*6),this.tCor=new Float32Array(po*6),this.tVida=new Float32Array(po),this.tn=0;let s=new Ee;s.setAttribute("position",new pe(this.tPos,3).setUsage(Zi)),s.setAttribute("color",new pe(this.tCor,3).setUsage(Zi)),this.tgeo=s,this.linhas=new Ra(s,new Qr({vertexColors:!0,transparent:!0,opacity:.9})),this.linhas.frustumCulled=!1,this.linhas.renderOrder=4,t.add(this.linhas)}particula(t,e,i,s,r,o,a,c,l,h,u=1,f=0,d=0){if(!this.livre.length)return;let g=this.livre.pop();this.ativos.push(g),this.pos[g*3]=t,this.pos[g*3+1]=e,this.pos[g*3+2]=i,this.vel[g*3]=s,this.vel[g*3+1]=r,this.vel[g*3+2]=o,this.tam[g]=a,this.vida[g]=c,this.vidaMax[g]=c,this.grav[g]=f,this.cresce[g]=d,this.corIni[g*3]=l[0],this.corIni[g*3+1]=l[1],this.corIni[g*3+2]=l[2],this.corFim[g*3]=h[0],this.corFim[g*3+1]=h[1],this.corFim[g*3+2]=h[2],this.cor[g*4+3]=u,this.alfa0=u,this.cor[g*4]=l[0],this.cor[g*4+1]=l[1],this.cor[g*4+2]=l[2]}tracante(t,e,i,s,r,o,a=[1,.85,.4]){let c=this.tn++%po;this.tPos.set([t,e,i,s,r,o],c*6),this.tCor.set([a[0],a[1],a[2],a[0]*.6,a[1]*.6,a[2]*.6],c*6),this.tVida[c]=.07}clarao(t,e,i,s=1.2){this.particula(t,e,i,0,0,0,s,.06,[1,.95,.6],[1,.6,.2],1)}explosao(t,e,i,s=6,r=!1){let o=Math.min(40,8+s*2);for(let a=0;a<o;a++){let c=Math.random()*6.28,l=Math.random()*s*2.2;this.particula(t,e+.5,i,Math.cos(c)*l,Math.random()*s*2,Math.sin(c)*l,s*(.5+Math.random()*.5),.35+Math.random()*.3,[1,.85,.35],[.9,.25,.05],1,-2,s*.8)}for(let a=0;a<o*.7;a++){let c=Math.random()*6.28,l=Math.random()*s*.7,h=r?[.85,.92,1]:[.35,.33,.3];this.particula(t+Math.cos(c)*s*.3,e+Math.random()*s*.5,i+Math.sin(c)*s*.3,Math.cos(c)*l,s*.4+Math.random()*3,Math.sin(c)*l,s*.9,1.6+Math.random()*1.6,h,r?[.7,.8,.9]:[.15,.15,.15],.75,r?9:-.6,s*.9)}if(r)for(let a=0;a<18;a++){let c=Math.random()*6.28;this.particula(t,.3,i,Math.cos(c)*3,8+Math.random()*s*3,Math.sin(c)*3,1.5,1.4,[.9,.95,1],[.6,.75,.9],.9,14,.5)}}fumaca(t,e,i,s=2,r=[.25,.25,.25]){this.particula(t,e,i,(Math.random()-.5)*1.5,2+Math.random()*2,(Math.random()-.5)*1.5,s,2.5,r,[.5,.5,.5],.5,-.4,s)}sangue(t,e,i,s=5){for(let r=0;r<s;r++)this.particula(t,e,i,(Math.random()-.5)*4,Math.random()*3,(Math.random()-.5)*4,.35,.5,[.55,.03,.03],[.3,0,0],1,12,0)}poeira(t,e,i=2){for(let s=0;s<i;s++)this.particula(t+(Math.random()-.5)*2,.4,e+(Math.random()-.5)*2,Math.random()-.5,.8,Math.random()-.5,1.4,1,[.72,.66,.55],[.8,.76,.68],.35,0,1.5)}esteira(t,e,i){this.particula(t,e,i,0,0,0,1.6,.9,[1,.7,.4],[.5,.5,.5],.6,0,3)}atualizar(t,e){this.matP.uniforms.escala.value=e;let i=this.ativos;for(let r=i.length-1;r>=0;r--){let o=i[r];if(this.vida[o]-=t,this.vida[o]<=0){this.tam[o]=0,this.cor[o*4+3]=0,this.pos[o*3+1]=-1e3,i[r]=i[i.length-1],i.pop(),this.livre.push(o);continue}let a=1-this.vida[o]/this.vidaMax[o];this.vel[o*3+1]-=this.grav[o]*t,this.pos[o*3]+=this.vel[o*3]*t,this.pos[o*3+1]+=this.vel[o*3+1]*t,this.pos[o*3+2]+=this.vel[o*3+2]*t,this.pos[o*3+1]<.1&&this.grav[o]>0&&(this.pos[o*3+1]=.1,this.vel[o*3]*=.5,this.vel[o*3+2]*=.5,this.vel[o*3+1]=0),this.vel[o*3]*=.97,this.vel[o*3+2]*=.97,this.tam[o]+=this.cresce[o]*t;for(let c=0;c<3;c++)this.cor[o*4+c]=this.corIni[o*3+c]+(this.corFim[o*3+c]-this.corIni[o*3+c])*a;this.cor[o*4+3]=Math.min(this.cor[o*4+3],(1-a)*1.2)}let s=this.geo.attributes;s.position.needsUpdate=s.cor.needsUpdate=s.tam.needsUpdate=!0;for(let r=0;r<po;r++)if(this.tVida[r]>0&&(this.tVida[r]-=t,this.tVida[r]<=0))for(let o=0;o<6;o++)this.tPos[r*6+o]=0;this.tgeo.attributes.position.needsUpdate=!0,this.tgeo.attributes.color.needsUpdate=!0}};var Fn={fuzileiro:{nome:"Soldado",sub:"Fuzil M4A1",icone:"\u{1FA96}",classe:"inf",hp:100,vel:6.5,alcance:55,dano:16,cadencia:.38,precisao:.6,arma:"fuzil",custo:60,tempo:4,de:"quartel",slots:1,raio:.6},metralhador:{nome:"Metralhador",sub:"M249 SAW",icone:"\u{1F52B}",classe:"inf",hp:120,vel:6,alcance:62,dano:10,cadencia:.1,precisao:.42,arma:"mg",custo:100,tempo:6,de:"quartel",slots:1,raio:.6},sniper:{nome:"Atirador de Elite",sub:"M110 / Barrett M107",icone:"\u{1F3AF}",classe:"inf",hp:90,vel:6.2,alcance:150,dano:110,cadencia:1.7,precisao:.92,arma:"sniper",custo:140,tempo:8,de:"quartel",slots:1,raio:.6},medico:{nome:"M\xE9dico de Combate",sub:"Cura soldados por perto",icone:"\u2695\uFE0F",classe:"inf",hp:100,vel:6.6,alcance:40,dano:9,cadencia:.55,precisao:.5,arma:"pistola",cura:7,custo:110,tempo:6,de:"quartel",slots:1,raio:.6},humvee:{nome:"Humvee M1151",sub:"Metralhadora .50 \u2022 leva 4",icone:"\u{1F699}",classe:"veic",modelo:"humvee",hp:550,vel:26,alcance:85,dano:24,cadencia:.16,precisao:.45,arma:"50cal",carga:4,cargaTipos:["inf","civil"],custo:240,tempo:9,de:"patio",slots:6,raio:2.6,leve:!0,atropela:!0},ambulancia:{nome:"Ambul\xE2ncia M997",sub:"Leva 8 \u2022 cura passageiros",icone:"\u{1F691}",classe:"veic",modelo:"ambulancia",hp:420,vel:25,carga:8,cargaTipos:["inf","civil"],cura:12,custo:180,tempo:8,de:"patio",slots:6,raio:2.7,leve:!0,atropela:!0},stryker:{nome:"Stryker M1126",sub:"Blindado 8x8 \u2022 leva 9",icone:"\u{1F690}",classe:"veic",modelo:"stryker",hp:1100,vel:24,alcance:95,dano:26,cadencia:.15,precisao:.5,arma:"50cal",carga:9,cargaTipos:["inf","civil"],custo:450,tempo:13,de:"patio",slots:10,raio:3.6,atropela:!0},bradley:{nome:"Bradley M2A3",sub:"Canh\xE3o 25mm \u2022 leva 6",icone:"\u{1F6FB}",classe:"veic",modelo:"bradley",hp:1500,vel:20,alcance:120,dano:55,splash:3,cadencia:.32,precisao:.6,arma:"25mm",carga:6,cargaTipos:["inf","civil"],custo:620,tempo:15,de:"patio",slots:12,raio:3.4,atropela:!0},abrams:{nome:"Tanque M1A2 Abrams",sub:"Canh\xE3o 120mm",icone:"\u{1F6E1}\uFE0F",classe:"veic",modelo:"abrams",hp:3200,vel:19,alcance:170,dano:320,splash:8,cadencia:4.2,precisao:.85,arma:"120mm",sec:{alcance:90,dano:12,cadencia:.11,precisao:.45,arma:"mg"},custo:950,tempo:20,de:"patio",slots:20,raio:4.8,atropela:!0},paladin:{nome:"Obuseiro M109A7 Paladin",sub:"Artilharia 155mm \u2022 longo alcance",icone:"\u{1F4A5}",classe:"veic",modelo:"paladin",hp:1600,vel:15,alcance:700,minAlc:80,dano:300,splash:15,cadencia:6,precisao:.7,arma:"155mm",arco:!0,custo:900,tempo:20,de:"patio",slots:18,raio:4.6},himars:{nome:"HIMARS M142",sub:"Lan\xE7a-foguetes \u2022 6 foguetes",icone:"\u{1F680}",classe:"veic",modelo:"himars",hp:1100,vel:22,alcance:1100,minAlc:150,dano:230,splash:16,cadencia:.5,salva:6,recarga:20,precisao:.75,arma:"foguete",custo:1200,tempo:24,de:"patio",slots:16,raio:3.8},swat:{nome:"Policial SWAT",sub:"Pol\xEDcia de Miami \u2022 age sozinha",icone:"\u{1F693}",classe:"inf",hp:115,vel:6.4,alcance:58,dano:15,cadencia:.3,precisao:.58,arma:"fuzil",custo:0,slots:1,raio:.6,policia:!0},bearcat:{nome:"Blindado SWAT BearCat",sub:"Pol\xEDcia de Miami \u2022 leva 10",icone:"\u{1F693}",classe:"veic",modelo:"bearcat",hp:1300,vel:25,carga:10,cargaTipos:["inf","civil"],custo:0,slots:10,raio:3,atropela:!0,policia:!0},blackhawk:{nome:"UH-60 Black Hawk",sub:"Metralhadoras M134 \u2022 leva 11",icone:"\u{1F681}",classe:"aereo",modelo:"blackhawk",hp:850,vel:75,altCruz:40,alcance:95,dano:10,cadencia:.07,precisao:.35,arma:"m134",carga:11,cargaTipos:["inf","civil"],custo:750,tempo:16,de:"heliporto",raio:8},chinook:{nome:"CH-47 Chinook",sub:"Leva 33 ou um Humvee",icone:"\u{1F681}",classe:"aereo",modelo:"chinook",hp:1200,vel:68,altCruz:45,alcance:80,dano:11,cadencia:.16,precisao:.35,arma:"m240",carga:33,cargaTipos:["inf","civil","leve"],custo:950,tempo:20,de:"heliporto",raio:10},apache:{nome:"AH-64 Apache",sub:"Canh\xE3o 30mm + m\xEDsseis Hellfire",icone:"\u{1F681}",classe:"aereo",modelo:"apache",hp:1e3,vel:80,altCruz:55,alcance:280,dano:45,splash:3,cadencia:.13,precisao:.55,arma:"30mm",sec:{alcance:650,dano:420,splash:11,cadencia:7,precisao:.95,arma:"hellfire",missil:!0},custo:1150,tempo:22,de:"heliporto",raio:8},reaper:{nome:"Drone MQ-9 Reaper",sub:"Vigia em c\xEDrculos e lan\xE7a Hellfire",icone:"\u{1F6E9}\uFE0F",classe:"aereo",modelo:"reaper",hp:450,vel:70,altCruz:260,orbita:240,alcance:750,dano:420,splash:11,cadencia:6.5,precisao:.95,arma:"hellfire",missil:!0,custo:700,tempo:15,de:"heliporto",raio:10},f35:{nome:"F-35C Lightning II",sub:"Bombas guiadas GBU \u2022 ataque a\xE9reo",icone:"\u2708\uFE0F",classe:"jato",modelo:"f35",hp:900,vel:250,altCruz:160,dano:650,splash:20,municao:4,arma:"bomba",custo:1500,tempo:22,de:"porta",raio:9},f18:{nome:"F/A-18E Super Hornet",sub:"Foguetes e canh\xE3o \u2022 ataque rasante",icone:"\u2708\uFE0F",classe:"jato",modelo:"f18",hp:900,vel:260,altCruz:150,dano:180,splash:9,municao:3,rajada:6,arma:"foguete",custo:1250,tempo:20,de:"porta",raio:9},osprey:{nome:"MV-22 Osprey",sub:"Rotores basculantes \u2022 leva 24",icone:"\u{1F6EB}",classe:"aereo",modelo:"osprey",hp:1e3,vel:120,altCruz:60,carga:24,cargaTipos:["inf","civil"],custo:1200,tempo:22,de:"porta",raio:9},lancha:{nome:"Lancha Mark VI",sub:"Patrulha \u2022 leva 8",icone:"\u{1F6A4}",classe:"naval",modelo:"lancha",nav:1,hp:800,vel:28,alcance:130,dano:24,cadencia:.16,precisao:.45,arma:"50cal",carga:8,cargaTipos:["inf","civil"],custo:320,tempo:12,de:"docas",raio:8},lcac:{nome:"Hovercraft LCAC",sub:"Anf\xEDbio \u2022 leva tropas e ve\xEDculos",icone:"\u{1F6E5}\uFE0F",classe:"naval",modelo:"lcac",nav:3,hp:1400,vel:26,carga:30,cargaTipos:["inf","civil","leve","veic"],custo:750,tempo:18,de:"docas",raio:12},destroier:{nome:"Destr\xF3ier classe Arleigh Burke",sub:'Canh\xE3o naval 5" de longo alcance',icone:"\u{1F6A2}",classe:"naval",modelo:"destroier",nav:2,hp:7e3,vel:16,alcance:950,minAlc:60,dano:300,splash:14,cadencia:2.6,precisao:.8,arma:"naval",arco:!0,custo:2400,tempo:35,de:"docas",raio:30},portaavioes:{nome:"Porta-avi\xF5es USS Liberty",sub:"Classe Nimitz \u2022 base flutuante",icone:"\u2693",classe:"naval",modelo:"portaavioes",nav:2,hp:3e4,vel:7,carga:0,custo:0,de:null,raio:60,unico:!0}},lu={qg:{nome:"Quartel-General",hp:6e3,raio:26},quartel:{nome:"Quartel (Infantaria)",hp:3e3,raio:30},patio:{nome:"P\xE1tio de Ve\xEDculos",hp:3500,raio:34},heliporto:{nome:"Heliporto",hp:2500,raio:40},docas:{nome:"Docas da Marinha",hp:3e3,raio:30},zona:{nome:"Zona Segura (abrigo de civis)",hp:2e3,raio:32},torre:{nome:"Torre de Vigia",hp:900,raio:4,alcance:110,dano:22,cadencia:.18,precisao:.5,arma:"50cal"},muro:{nome:"Barreira",hp:900,raio:5},fob:{nome:"Posto Avan\xE7ado (FOB)",hp:2500,raio:28},pista:{nome:"Pista de Pouso",hp:8e3,raio:60},patriot:{nome:"Bateria Patriot",hp:1500,raio:6}},oc={quartel:["fuzileiro","metralhador","sniper","medico"],patio:["humvee","ambulancia","stryker","bradley","abrams","paladin","himars"],heliporto:["blackhawk","chinook","apache","reaper"],docas:["lancha","lcac","destroier"],porta:["f35","f18","osprey"]},Jd={quartel:"\u{1FA96} Quartel",patio:"\u{1F699} P\xE1tio",heliporto:"\u{1F681} Heliporto",docas:"\u2693 Docas",porta:"\u{1F6F3}\uFE0F Porta-avi\xF5es"},mo={fob:{nome:"Posto Avan\xE7ado (FOB)",sub:"Zona segura para civis + QG de campo",icone:"\u26FA",custo:900,tempo:25,raio:30},quartel:{nome:"Quartel",sub:"Treina infantaria aqui",icone:"\u{1FA96}",custo:1200,tempo:35,raio:34},patio:{nome:"P\xE1tio de Ve\xEDculos",sub:"Produz blindados aqui",icone:"\u{1F699}",custo:1600,tempo:45,raio:38},heliporto:{nome:"Heliporto",sub:"Produz helic\xF3pteros aqui",icone:"\u{1F681}",custo:1500,tempo:40,raio:44},docas:{nome:"Docas",sub:"Precisa ficar na beira da \xE1gua",icone:"\u2693",custo:1400,tempo:40,raio:34,agua:!0},zona:{nome:"Zona Segura",sub:"Abrigo de civis (resgate)",icone:"\u{1F3E5}",custo:700,tempo:20,raio:32},torre:{nome:"Torre de Vigia",sub:"Metralhadora .50 autom\xE1tica",icone:"\u{1F5FC}",custo:300,tempo:10,raio:6},muro:{nome:"Barreira",sub:"Gabi\xF5es contra os zumbis",icone:"\u{1F9F1}",custo:60,tempo:4,raio:6},patriot:{nome:"Bateria Patriot",sub:"Defesa antia\xE9rea",icone:"\u{1F6F0}\uFE0F",custo:500,tempo:15,raio:8}};var jd=new ie,Kd=new gn,Qd=new Fe,H_=new U,V_=new U,ac=new Bt;function G_(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d");e.fillStyle="#f4f4f4",e.fillRect(0,0,128,128);let i=9,s=()=>(i=i*1664525+1013904223>>>0,i/4294967296);for(let a=0;a<900;a++){let c=200+s()*55|0;e.fillStyle=`rgba(${c},${c},${c},0.5)`,e.fillRect(s()*128,s()*128,1+s()*3,1+s()*3)}let r=e.createLinearGradient(0,0,0,128);r.addColorStop(0,"rgba(90,70,40,0.0)"),r.addColorStop(1,"rgba(90,70,40,0.18)"),e.fillStyle=r,e.fillRect(0,0,128,128),e.strokeStyle="rgba(0,0,0,0.45)",e.lineWidth=2,e.strokeRect(1,1,126,126),e.strokeStyle="rgba(255,255,255,0.35)",e.lineWidth=1,e.strokeRect(3.5,3.5,121,121),e.fillStyle="rgba(0,0,0,0.35)";for(let a=10;a<128;a+=20)e.fillRect(a,6,2,2),e.fillRect(a,120,2,2),e.fillRect(6,a,2,2),e.fillRect(120,a,2,2);let o=new Tn(t);return o.wrapS=o.wrapT=zn,o.anisotropy=4,o.colorSpace=Re,o}var W_=G_(),hu=new Ss({vertexColors:!0,map:W_,shininess:28,specular:2763306}),go=new vn({vertexColors:!0,transparent:!0,opacity:.8}),Yt=class{constructor(){this.g=[]}add(t,e,i=0,s=0,r=0,o=0,a=0,c=0,l=1,h=1,u=1,f=0){let d=t.index?t.toNonIndexed():t;if(d.attributes.uv||d.setAttribute("uv",new pe(new Float32Array(d.attributes.position.count*2),2)),f){let m=d.attributes.uv.array;for(let p=0;p<m.length;p++)m[p]*=f}Qd.set(o,a,c),Kd.setFromEuler(Qd),jd.compose(V_.set(i,s,r),Kd,H_.set(l,h,u)),d.applyMatrix4(jd),ac.set(e);let g=d.attributes.position.count,v=new Float32Array(g*3);for(let m=0;m<g;m++)v[m*3]=ac.r,v[m*3+1]=ac.g,v[m*3+2]=ac.b;return d.setAttribute("color",new pe(v,3)),d.attributes.uv1&&d.deleteAttribute("uv1"),this.g.push(d),this}box(t,e,i,s,r,o,a,c,l,h){return this.add(new Ye(t,e,i),s,r,o,a,c,l,h)}cil(t,e,i,s,r,o,a,c,l,h,u){return this.add(new xn(t,e,i,s),r,o,a,c,l,h,u)}esf(t,e,i,s,r,o=1,a=1,c=1){return this.add(new ri(t,12,8),e,i,s,r,0,0,0,o,a,c)}planta(t,e,i,s=0,r=0){let o=new Ms;o.moveTo(t[0][0],t[0][1]);for(let c=1;c<t.length;c++)o.lineTo(t[c][0],t[c][1]);o.closePath();let a=new mr(o,{depth:e,bevelEnabled:r>0,bevelSize:r,bevelThickness:r,bevelSegments:1});return this.add(a,i,0,s+e,0,Math.PI/2,0,0,1,1,1,.25)}simetrica(t,e,i,s=0){let r=t.concat(t.slice().reverse().map(([o,a])=>[-o,a]));return this.planta(r,e,i,s)}perfil(t,e,i,s=0,r=.07){let o=new Ms;o.moveTo(t[0][0],t[0][1]);for(let l=1;l<t.length;l++)o.lineTo(t[l][0],t[l][1]);o.closePath();let a=Math.min(r,e*.2),c=new mr(o,{depth:e-2*a,bevelEnabled:a>0,bevelSize:a,bevelThickness:a,bevelSegments:2});return c.translate(0,0,a),this.add(c,i,s+e/2,0,0,0,-Math.PI/2,0,1,1,1,.3)}fuso(t,e,i=0,s=0,r=0,o=1,a=1,c=14){let l=t.map(([u,f])=>new at(Math.max(.001,f),u)),h=new Da(l,c);return h.rotateX(Math.PI/2),h.scale(o,a,1),h.computeVertexNormals(),this.add(h,e,i,s,r,0,0,0,1,1,1,.5)}bloco(t,e,i,s,r=0,o=0,a=0,c=0,l=0,h=0,u=.12){let f=Math.min(u,t/2.2,e/2.2),d=new Ms,g=t/2-f,v=e/2-f;d.moveTo(-g,-e/2),d.lineTo(g,-e/2),d.quadraticCurveTo(t/2,-e/2,t/2,-v),d.lineTo(t/2,v),d.quadraticCurveTo(t/2,e/2,g,e/2),d.lineTo(-g,e/2),d.quadraticCurveTo(-t/2,e/2,-t/2,v),d.lineTo(-t/2,-v),d.quadraticCurveTo(-t/2,-e/2,-g,-e/2);let m=Math.min(f,i*.2),p=new mr(d,{depth:i-2*m,bevelEnabled:m>0,bevelSize:m*.6,bevelThickness:m,bevelSegments:2,curveSegments:3});return p.translate(0,0,-i/2+m),this.add(p,s,r,o,a,c,l,h,1,1,1,.3)}roda(t,e,i,s,r,o){this.cil(t,t,e,14,i,s,r,o,0,0,Math.PI/2);let a=Math.sign(s)||1;return this.cil(t*.55,t*.55,.04,10,5592911,s+a*e/2,r,o,0,0,Math.PI/2),this.cil(t*.18,t*.22,.12,8,3815990,s+a*(e/2+.05),r,o,0,0,Math.PI/2),this}build(t=!0){let e=oi(this.g);if(t){let i=e.attributes.position,s=e.attributes.normal,r=e.attributes.color,o=1/0,a=-1/0;for(let l=0;l<i.count;l++){let h=i.getY(l);h<o&&(o=h),h>a&&(a=h)}let c=Math.max(.5,Math.min(3,a-o));for(let l=0;l<i.count;l++){let h=.62+.38*Math.min(1,(i.getY(l)-o)/c);s.getY(l)>.6?h*=1.08:s.getY(l)<-.6&&(h*=.6),r.setXYZ(l,r.getX(l)*h,r.getY(l)*h,r.getZ(l)*h)}}return e.computeBoundingSphere(),e}},tp={},np=5923904,ip=4673583,Ps=12100727,br=10390110,ts=2040100,jn=1842204,oe=2044994,uu=8226447,Sr=6252399,X_=5988712,du=10134444,Ke=15790314,kt=3422010;var q_=16774084,Y_=12593182;function Ar(n,t,e,i,s,r){for(let o of t)for(let a of e)n.roda(i,s,jn,o,r!=null?r:i,a)}function fu(n,t,e,i,s=.66,r=!0,o=Ps){for(let a of[-1,1]){let c=a*i;n.box(s,.12,t,ts,c,e,0),n.box(s,.12,t-1.2,ts,c,.06,0),n.box(s,e*.8,.12,ts,c,e*.5,t/2-.3,.6),n.box(s,e*.8,.12,ts,c,e*.5,-t/2+.3,-.6);let l=Math.max(5,Math.round(t/1.1));for(let h=0;h<l;h++)n.roda(e*.34,s*.9,2895402,c,e*.36,-t/2+1+h*(t-2)/(l-1));n.roda(e*.4,s*.95,3158316,c,e*.62,-t/2+.35),n.roda(e*.36,s*.95,3158316,c,e*.6,t/2-.35),r&&n.box(.1,e*.55,t-.6,o,a*(i+s/2+.06),e*.82,0)}}function Ki(n,t,e,i){for(let s of[-1,1])n.box(.22,.14,.06,q_,s*t,e,i)}function Qi(n,t,e,i){for(let s of[-1,1])n.box(.16,.12,.06,Y_,s*t,e,i)}function Jn(n,t,e,i,s=2.6){n.cil(.012,.025,s,4,ts,t,e+s/2,i)}var $_={humvee(){let n=new Yt,t=Ps,e=br;n.box(1.9,.5,4.5,e,0,.72,0),n.perfil([[-2.3,.75],[-2.3,1.5],[.75,1.5],[1.5,1.42],[2.3,1.28],[2.32,.75]],2.16,t);for(let s of[-1,1])for(let r of[-1.5,1.55])n.box(.42,.14,1.25,t,s*.95,1.22,r);n.box(2.1,.08,2.25,t,0,2,-.35);for(let[s,r]of[[-1,.72],[1,.72],[-1,-1.45],[1,-1.45],[-1,-.4],[1,-.4]])n.box(.1,.5,.1,t,s,1.75,r);n.box(1.85,.48,.05,oe,0,1.76,.78,-.12);for(let s of[-1,1])n.box(.04,.4,.95,oe,s*1.04,1.76,.15),n.box(.04,.4,.95,oe,s*1.04,1.76,-.92);n.box(2.05,.5,.05,oe,0,1.76,-1.48);for(let s of[-1,1])for(let r of[.15,-.92])n.box(.03,.62,1,e,s*1.09,1.18,r);n.box(1.3,.42,.05,2763302,0,1,2.33);for(let s=0;s<6;s++)n.box(.04,.38,.06,t,-.5+s*.2,1,2.34);Ki(n,.72,1.1,2.34),n.box(2.2,.18,.22,kt,0,.62,2.4),n.box(.6,.22,.3,3815988,0,.62,2.55),Qi(n,.85,1.3,-2.33);for(let s of[-1,1])n.box(.04,.24,.18,kt,s*1.25,1.75,.8),n.box(.18,.04,.04,kt,s*1.15,1.75,.8);Jn(n,.9,1.5,-2.1),Jn(n,-.9,1.5,-2.1,2),n.box(1.8,.35,.7,4934202,0,1.7,-1.95),n.cil(.4,.4,.22,12,jn,0,1.62,-2.42,Math.PI/2),Ar(n,[-.95,.95],[-1.5,1.55],.47,.4);let i=new Yt;i.cil(.6,.62,.18,14,e,0,0,0),i.box(1.3,.62,.06,t,0,.42,.45,-.12);for(let s of[-1,1])i.box(.06,.55,.65,t,s*.66,.38,.15,0,s*.35,0);return i.box(.5,.3,.12,oe,0,.62,.47,-.12),i.box(.18,.2,.75,kt,0,.35,.25),i.cil(.035,.035,1.25,6,kt,0,.38,1.2,Math.PI/2),i.cil(.06,.06,.12,6,kt,0,.38,1.82,Math.PI/2),i.box(.22,.2,.3,4934202,.25,.28,.1),{corpo:n.build(),torre:i.build(),torreY:2.08,torreZ:-.45,canoZ:1.85,canoY:.38}},ambulancia(){let n=new Yt,t=Ps;n.box(1.9,.5,4.9,br,0,.72,0),n.perfil([[.6,.75],[.6,1.5],[1.6,1.45],[2.45,1.3],[2.47,.75]],2.16,t),n.box(2.1,.08,1,t,0,2,1.05),n.box(1.85,.45,.05,oe,0,1.76,1.58,-.12);for(let e of[-1,1])n.box(.04,.4,.8,oe,e*1.04,1.76,1.05);n.box(2.2,1.85,2.9,15328468,0,1.75,-1.05),n.box(2.22,.32,2.92,3043246,0,2.15,-1.05),n.box(2.24,.06,2.94,9078134,0,2.7,-1.05);for(let e of[-1,1])n.box(.04,.4,.6,oe,e*1.12,2.1,-.4);return n.box(1.8,1.4,.04,14275522,0,1.6,-2.52),n.box(.3,.15,.15,3832789,-.7,2.75,-.1),n.box(.3,.15,.15,13643824,.7,2.75,-.1),Ki(n,.72,1.1,2.45),Qi(n,.85,1,-2.55),n.box(1.3,.42,.05,2763302,0,1,2.44),n.box(2.2,.18,.22,kt,0,.62,2.5),Ar(n,[-.95,.95],[-1.6,1.6],.47,.4),{corpo:n.build()}},stryker(){let n=new Yt,t=np,e=ip;n.perfil([[-3.5,.75],[-3.5,2.55],[2.2,2.55],[3.5,1.6],[3.5,.75],[2.9,.55]],2.3,t);for(let s of[-1,1])n.box(.25,1.3,6.6,e,s*1.28,1.7,-.3,0,0,s*.18);n.box(2.5,.12,5.6,e,0,2.6,-.7),n.box(1.2,.4,.8,e,-.55,2.8,1.7),n.box(.5,.25,.05,oe,-.55,2.85,2.11),n.box(1.6,1.4,.1,e,0,1.8,-3.55);for(let s=0;s<4;s++)n.box(.1,.08,.5,kt,.9,2.66,-1.5-s*.6);Ki(n,.95,1.45,3.12),Qi(n,.95,1.6,-3.56),Jn(n,1,2.6,-3,3),Jn(n,-1,2.6,-3,2.4);for(let s of[-1,1])for(let r=0;r<3;r++)n.box(.3,.45,.8,4868662,s*1.5,2.1,-2.4+r*1.1);Ar(n,[-1.25,1.25],[-2.55,-1.15,.85,2.25],.56,.48);let i=new Yt;return i.cil(.45,.5,.25,12,e,0,0,0),i.box(.7,.55,.8,t,0,.42,0),i.box(.35,.35,.35,oe,.42,.55,.2),i.box(.2,.2,.8,kt,-.15,.48,.5),i.cil(.035,.035,1.3,6,kt,-.15,.48,1.4,Math.PI/2),i.box(.25,.3,.4,4934202,.45,.25,-.3),{corpo:n.build(),torre:i.build(),torreY:2.62,torreZ:.4,canoZ:2.05,canoY:.48}},bradley(){let n=new Yt,t=Ps,e=br;n.perfil([[-3.3,.55],[-3.3,2.35],[1.5,2.35],[3.3,1.35],[3.3,.85],[2.6,.55]],3,t),fu(n,6.4,1.2,1.55,.6,!0,e),n.box(3.6,.1,6.6,e,0,1.42,0);for(let s of[-1,1])for(let r=0;r<5;r++)n.box(.14,.5,1.1,t,s*1.98,1.15,-2.4+r*1.2);n.box(1.2,1.5,.1,e,.6,1.5,-3.35),Ki(n,1.2,1.4,3.3),Qi(n,1.3,1.6,-3.32),Jn(n,-1.3,2.35,-2.8,2.8);let i=new Yt;i.simetrica([[1.05,-1.2],[1.05,.7],[.6,1.25]],.85,t,0),i.box(1.9,.14,2.2,e,0,.92,-.2),i.box(.5,.45,.6,e,-.45,.6,1.2),i.cil(.09,.09,2.3,8,kt,-.45,.6,2.6,Math.PI/2),i.cil(.12,.12,.3,8,kt,-.45,.6,3.7,Math.PI/2),i.box(.55,.55,1.4,e,1.35,.55,-.1),i.box(.42,.2,.06,ts,1.35,.68,.61),i.box(.42,.2,.06,ts,1.35,.4,.61),i.box(.35,.3,.3,oe,.5,1.05,.3);for(let s of[-1,1])for(let r=0;r<4;r++)i.cil(.06,.06,.25,6,kt,s*.95,.65+r%2*.14,.75+Math.floor(r/2)*.15,Math.PI/2.6);return{corpo:n.build(),torre:i.build(),torreY:2.36,torreZ:.1,canoZ:3.8,canoY:.6}},abrams(){let n=new Yt,t=Ps,e=br;n.perfil([[-3.95,.55],[-3.95,1.75],[3,1.75],[4,1.2],[3.9,.7],[3.2,.5]],2.6,t),fu(n,7.7,1.3,1.55,.68,!0,e),n.box(3.7,.1,7.7,e,0,1.78,-.1);for(let s=0;s<7;s++)n.box(2.2,.03,.12,4078387,0,1.84,-3.1+s*.22);for(let s of[-1,1])for(let r=0;r<6;r++)n.box(.06,.62,1.15,t,s*1.99,1.25,-3.1+r*1.22);Ki(n,1.3,1.6,3.42),Qi(n,1.5,1.55,-3.97),n.box(1.4,.4,.4,4867126,0,1.6,-4.05);let i=new Yt;i.simetrica([[1.8,-2.4],[1.8,.9],[1.25,2.2],[.55,2.55]],.95,t,0),i.simetrica([[1.6,-2.2],[1.6,.8],[1.1,1.95],[.5,2.3]],.08,e,.95),i.box(3.4,.05,1.3,kt,0,.6,-3);for(let s of[-1,1])i.box(.05,.5,1.3,kt,s*1.7,.85,-3);i.box(3.4,.5,.05,kt,0,.85,-3.65),i.box(3,.4,1.1,5985857,0,.85,-2.95),i.box(1,.75,.6,e,0,.45,2.55),i.cil(.13,.15,5.6,10,t,0,.45,5.4,Math.PI/2),i.cil(.21,.21,.8,10,e,0,.45,4,Math.PI/2),i.cil(.17,.17,.25,10,kt,0,.45,8.15,Math.PI/2),i.cil(.38,.42,.35,12,e,.75,1.12,-.5),i.box(.18,.2,.9,kt,.75,1.42,0),i.cil(.03,.03,1,5,kt,.75,1.42,.9,Math.PI/2),i.cil(.3,.3,.12,10,e,-.75,1.02,-.6),i.box(.12,.15,.7,kt,-.75,1.2,-.2),i.box(.5,.45,.45,e,-.65,1.2,.8),i.box(.3,.25,.04,oe,-.65,1.25,1.03);for(let s of[-1,1])for(let r=0;r<6;r++)i.cil(.055,.055,.3,6,kt,s*(1.35+r%3*.12),.85+Math.floor(r/3)*.13,1.25,Math.PI/2.4);return Jn(i,1.4,.95,-2.2,2.6),Jn(i,-1.4,.95,-2.2,2),{corpo:n.build(),torre:i.build(),torreY:1.83,torreZ:-.3,canoZ:8.3,canoY:.45}},paladin(){let n=new Yt,t=Ps,e=br;n.perfil([[-3.45,.55],[-3.45,1.7],[2.8,1.7],[3.5,1.2],[3.4,.7],[2.8,.5]],2.9,t),fu(n,6.9,1.2,1.6,.62,!0,e),n.box(3.5,.1,6.8,e,0,1.73,0),Ki(n,1.2,1.5,3.2),Qi(n,1.4,1.5,-3.47);let i=new Yt;i.box(3.2,1.7,4.6,t,0,.85,-.9),i.box(3.25,.1,4.65,e,0,1.72,-.9),i.box(1.5,1.2,.6,e,0,.75,1.6);for(let s of[-1,1])i.box(.05,.9,1.2,e,s*1.62,.9,-.5),i.box(.3,.3,.6,4867126,s*1.75,1.2,-2.2);return i.cil(.4,.4,.3,10,e,.8,1.85,-1.5),i.box(.15,.18,.8,kt,.8,2.05,-1),i.cil(.14,.18,6.5,10,t,0,.9,5,Math.PI/2),i.cil(.25,.25,.9,10,e,0,.9,2.6,Math.PI/2),i.box(.6,.35,.55,kt,0,.9,8.35),Jn(i,-1.3,1.75,-2.8,2.5),{corpo:n.build(),torre:i.build(),torreY:1.75,torreZ:-.1,canoZ:8.5,canoY:.9}},bearcat(){let n=new Yt,t=1513756,e=2369323;n.box(2,.5,5.6,e,0,.72,0),n.perfil([[-2.85,.8],[-2.85,2.75],[1.2,2.75],[1.6,2.2],[2.75,1.85],[2.85,.8]],2.35,t),n.box(2.37,.28,5,15329769,0,1.55,-.4),n.box(2.38,.12,5.02,2774440,0,1.36,-.4),n.box(2.1,.5,.05,oe,0,2.35,1.42,-.85);for(let i of[-1,1])n.box(.04,.42,.7,oe,i*1.19,2.3,.7),n.box(.04,.35,.45,oe,i*1.19,2.3,-.9),n.box(.04,.35,.45,oe,i*1.19,2.3,-2);return n.box(1.9,1.5,.06,e,0,1.75,-2.88),n.box(1.4,.14,.3,1118481,0,2.84,.6),n.box(.6,.15,.28,16719904,-.38,2.92,.6),n.box(.6,.15,.28,2117887,.38,2.92,.6),n.cil(.45,.5,.35,12,e,0,2.9,-1.1),n.box(2.5,.35,.3,kt,0,.75,2.95),Ki(n,.85,1.4,2.86),Qi(n,.9,1.3,-2.9),Jn(n,.9,2.75,-2.4,2.4),Ar(n,[-1.05,1.05],[-1.8,1.9],.55,.45),{corpo:n.build()}},himars(){let n=new Yt,t=Ps,e=br;n.box(1.9,.45,7,e,0,.95,0),n.box(2.4,.15,4.6,e,0,1.25,-1.1),n.perfil([[1.6,1],[1.6,3.05],[2.6,3.05],[3.45,2.3],[3.5,1]],2.45,t),n.box(2.1,.62,.05,oe,0,2.6,3.06,-.73);for(let s of[-1,1])n.box(.04,.55,.8,oe,s*1.24,2.55,2.3);Ki(n,.95,1.35,3.5),Qi(n,1,1.1,-3.5),n.box(2.5,.2,.25,kt,0,1,3.6),Jn(n,1.1,3.05,1.8,2.2);for(let s of[-1,1])n.box(.5,.6,1.2,4867126,s*1,1.6,.9);Ar(n,[-1.05,1.05],[-2.6,-1.25,2.5],.56,.48);let i=new Yt;i.box(.6,.3,4,kt,0,.15,0),i.box(2.3,1.05,4.1,t,0,.75,0),i.box(2.32,.08,4.12,e,0,1.3,0),i.box(2.1,.9,.05,ts,0,.75,2.06);for(let s=0;s<3;s++)for(let r=0;r<2;r++)i.cil(.24,.24,.06,10,9077872,-.65+s*.65,.52+r*.46,2.09,Math.PI/2);return{corpo:n.build(),torre:i.build(),torreY:1.35,torreZ:-1.5,canoZ:2.1,canoY:.75}}};function Er(n,t,e=2763306,i=.55){let s=new Yt;for(let r=0;r<n;r++){let o=r*Math.PI*2/n;s.box(i,.05,t*.9,e,Math.sin(o)*t*.5,0,Math.cos(o)*t*.5,0,o,0),s.box(i*.9,.051,.35,14204992,Math.sin(o)*t*.95,0,Math.cos(o)*t*.95,0,o,0)}return s.cil(.32,.38,.35,10,kt,0,-.08,0),s.cil(.1,.1,.5,6,kt,0,.2,0),s.build(!1)}function ep(n){let t=new Yt;return t.box(.08,n*2,.25,2763306,0,0,0),t.box(.08,.25,n*2,2763306,0,0,0),t.build()}var Z_={blackhawk(){let n=new Yt,t=6252622,e=5199682;n.fuso([[-9.6,.18],[-7.5,.32],[-5,.55],[-2.6,.95],[-1.6,1.12],[2.6,1.15],[4.2,1.05],[5.4,.8],[6.3,.45],[6.7,.1]],t,0,1.75,0,1,1.05),n.bloco(2.2,.5,4.6,e,0,.82,.8,0,0,0,.2),n.fuso([[3.9,.95],[5,.85],[5.9,.55],[6.25,.2]],oe,0,2.05,0,1.06,.9);for(let i of[-1,1])n.box(.05,.75,1.5,oe,i*1.14,2.05,1.8),n.box(.05,.6,.8,oe,i*1.12,2,3.6),n.box(.06,1.25,1.9,e,i*1.15,1.75,.1),n.cil(.04,.04,1,6,kt,i*1.35,2.1,1.6,Math.PI/2),n.box(.18,.2,.4,kt,i*1.3,2.1,1),n.cil(.05,.05,1.1,6,kt,i*1.15,.75,2.7,0,0,i*.4),n.roda(.33,.22,jn,i*1.45,.33,2.7),n.box(1.6,.08,.5,e,i*1.75,2.55,.2,0,0,i*-.25),n.fuso([[-1.6,.05],[-1.2,.3],[1.2,.3],[1.6,.05]],4606777,i*2.45,2.1,.2);n.bloco(1.5,.75,3.6,t,0,2.95,.6,0,0,0,.3);for(let i of[-1,1])n.fuso([[-1.6,.2],[-1.2,.36],[1.2,.38],[1.6,.28]],t,i*.62,3,.2);return n.cil(.22,.32,.6,10,e,0,3.45,.6),n.perfil([[-10.6,2],[-9.6,4.4],[-8.9,4.4],[-8.7,2.4],[-7.9,1.9]],.18,t,0,.04),n.box(4.4,.1,1,t,0,2.15,-9.4),n.roda(.2,.15,jn,0,.25,-8.6),n.cil(.04,.04,1.4,6,kt,0,.9,-8.6),Jn(n,0,2.7,-4,1.2),{corpo:n.build(),rotor:Er(4,8.2),rotorY:3.85,rotorZ:.6,cauda:ep(1.7),caudaPos:[.3,3.9,-9.6],caudaEixo:"x"}},chinook(){let n=new Yt,t=6581072,e=5462595;n.fuso([[-7.6,1.2],[-7,1.75],[-5,1.85],[5,1.85],[6.6,1.7],[7.6,1.25],[8.2,.6]],t,0,2.3,0,1,1.12,8),n.fuso([[6.4,1.3],[7.4,1.05],[8,.55]],oe,0,2.75,0,1,.75,8);for(let i of[-1,1]){for(let s=0;s<6;s++)n.box(.05,.38,.45,oe,i*1.86,2.75,-4+s*1.6);n.bloco(.9,.85,7.5,e,i*1.95,1,-.4,0,0,0,.3),n.roda(.45,.35,jn,i*1.55,.45,4.6),n.roda(.45,.35,jn,i*1.55,.45,-4.4),n.roda(.45,.35,jn,i*1.55,.45,-5.4),n.fuso([[-8.2,.35],[-7.6,.5],[-5.6,.55],[-5.2,.42]],5133373,i*1.4,4.35,0)}return n.perfil([[-8.2,3.6],[-7.2,6],[-5,6],[-4,3.6]],1.6,t,0,.12),n.bloco(1.3,.8,2.2,t,0,4.35,6.2,0,0,0,.3),n.box(1.6,.06,4,2764322,0,.48,-6.6,.25),{corpo:n.build(),rotor:Er(3,9.1),rotorY:6.3,rotorZ:-6.5,rotor2:Er(3,9.1),rotor2Y:5,rotor2Z:6.3}},apache(){let n=new Yt,t=6120779,e=5067840;n.fuso([[-9.4,.15],[-7,.28],[-4,.45],[-1.8,.75],[1.2,.85],[3.4,.7],[4.8,.45],[5.4,.15]],t,0,1.75,0,.75,1.2),n.fuso([[.6,.4],[1.6,.55],[3,.52],[4.4,.35],[4.9,.1]],oe,0,2.45,0,.95,.85),n.box(.06,.4,.06,e,0,2.75,2.2);for(let i of[-1,1]){n.fuso([[-2.6,.25],[-2.2,.42],[.4,.45],[.8,.32]],t,i*.95,2.55,-.4),n.cil(.2,.28,.4,8,2237470,i*.95,2.55,-2.8,Math.PI/2),n.bloco(2.4,.12,.95,e,i*1.75,1.9,.5,0,0,i*.08);for(let s=0;s<2;s++)for(let r=0;r<2;r++)n.fuso([[-.8,.08],[.7,.09],[.9,.02]],6974789,i*(2.05+s*.25),1.55-r*.22,.6);n.fuso([[-.9,.3],[.8,.32],[1,.22]],5264444,i*2.85,1.6,.5),n.cil(.05,.05,1,6,kt,i*.8,.6,2.2,0,0,i*.3),n.roda(.3,.2,jn,i*.95,.3,2.2)}return n.esf(.3,e,0,1.05,3.6),n.cil(.04,.05,1.6,6,kt,0,.95,4.4,Math.PI/2),n.esf(.25,2236962,0,1.3,5.15),n.perfil([[-10,2],[-9.2,4.2],[-8.6,4.2],[-8.6,2.2],[-7.5,1.9]],.16,t,0,.04),n.box(3.2,.1,.8,t,0,1.75,-9.3),n.roda(.18,.12,jn,0,.2,-8.9),n.cil(.04,.04,1.4,6,kt,0,.9,-8.9),n.cil(.16,.22,.9,8,e,0,3.4,.1),{corpo:n.build(),rotor:Er(4,7.3),rotorY:4.1,rotorZ:.1,cauda:ep(1.4),caudaPos:[.3,3.4,-9.4],caudaEixo:"x",armaZ:5.2,armaY:.95,radar:!0}},reaper(){let n=new Yt,t=10726321;n.fuso([[-5.4,.12],[-4,.35],[-1,.48],[2.5,.5],[4.2,.45],[5.2,.3],[5.6,.05]],t,0,.45,0,.9,1),n.fuso([[3.2,.3],[4.6,.5],[5.4,.3]],t,0,.75,0,.9,.9),n.simetrica([[10,-.3],[10,.3],[.5,1],[.5,-.6]],.14,t,.6),n.box(.1,1.5,.9,t,.65,.95,-4.8,0,0,-.75),n.box(.1,1.5,.9,t,-.65,.95,-4.8,0,0,.75),n.box(.1,.9,.7,t,0,0,-4.6);for(let e of[-1,1])for(let i of[3.2,5])n.fuso([[-.8,.04],[.7,.1],[.9,.02]],7039813,e*i,.25,.2);return n.esf(.38,2830389,0,0,4.2),{corpo:n.build(),helice:Er(3,1.4,3355443,.25),heliceZ:-5.7,heliceY:.45,heliceEixo:"z"}},f35(){let n=new Yt,t=X_;n.simetrica([[.9,-7.6],[2.5,-7.6],[2.9,-5.6],[5.35,-3.2],[5.35,-1.8],[1.6,2.8],[1,5.5],[.45,7.2],[0,8]],.9,t,.4),n.fuso([[-7,.7],[-3,.9],[2,.85],[5.5,.6],[7.5,.25],[8.3,.05]],5264988,0,1.2,0,1.3,.8),n.esf(.55,10123834,0,1.75,3.9,1,.75,2.6);for(let e of[-1,1])n.planta([[e*1.4,-7],[e*1.8,-6],[e*1.9,-4.6],[e*1.5,-4.6]],.12,t,1.2),n.box(.1,2,2,t,e*1.55,2.1,-5.6,0,0,e*.42),n.box(.9,.7,1.6,4277835,e*1.25,1,1.8);return n.cil(.55,.65,.8,10,2829099,0,.95,-7.9,Math.PI/2),{corpo:n.build(),motorZ:-8.3,motorY:.95}},f18(){let n=new Yt,t=du;n.simetrica([[1.5,-8.6],[3.6,-8.6],[3.6,-6.8],[6.8,-3.8],[6.8,-2.6],[1.5,1],[1.4,5],[.6,7.8],[0,9]],.9,t,.4),n.fuso([[-8.4,.75],[-4,.95],[3,.8],[6.5,.5],[8.6,.2],[9.2,.03]],8818842,0,1.2,0,1.25,.85),n.esf(.55,3688016,0,1.85,4.5,1,.75,2.4);for(let e of[-1,1])n.box(.12,2.4,2.4,t,e*1.4,2.4,-5.4,0,0,e*.35),n.cil(.08,.08,3.2,6,Ke,e*6.8,.6,-2.8,Math.PI/2),n.fuso([[-1.4,.05],[-1,.18],[1.1,.18],[1.4,.04]],7039813,e*3.8,0,-2.4);return n.cil(.5,.55,.8,10,2829099,.65,.95,-8.9,Math.PI/2),n.cil(.5,.55,.8,10,2829099,-.65,.95,-8.9,Math.PI/2),{corpo:n.build(),motorZ:-9.3,motorY:.95}},osprey(){let n=new Yt,t=7107448,e=6054760;n.fuso([[-9,.35],[-7,.9],[-5,1.3],[5,1.35],[6.6,1.15],[7.8,.75],[8.6,.2]],t,0,2,0,1,1.1,10),n.fuso([[6,1],[7.2,.85],[8.1,.4]],oe,0,2.35,0,1.02,.85,10);for(let r of[-1,1])n.bloco(.8,.8,4.5,e,r*1.35,1,.5,0,0,0,.3);n.bloco(14,.4,2.4,t,0,3.6,.6,0,0,0,.18),n.bloco(1.8,.7,4,t,0,3.25,.6,0,0,0,.3),n.box(5.4,.15,1.5,t,0,3.1,-8.3);for(let r of[-1,1])n.perfil([[-9.2,2.6],[-8.6,4.8],[-7.8,4.8],[-7.6,2.6]],.15,t,r*2.6,.04);for(let r of[-1,1])n.roda(.4,.3,jn,r*1.5,.4,.5);n.roda(.3,.2,jn,0,.3,6);let i=new Yt;i.fuso([[-2.2,.45],[-1.6,.68],[1.8,.66],[2.2,.4]],t,0,0,0,1,1,10),i.cil(.3,.3,.5,8,e,0,0,2.3,Math.PI/2);let s=i.build();return s.rotateX(-Math.PI/2),{corpo:n.build(),nacele:s,rotor:Er(3,5.8),naceleX:7,naceleY:3.7}}},J_={lancha(){let n=new Yt,t=8029068,e=6449778;n.simetrica([[2.7,-12],[2.8,4],[2.2,9],[1,12],[0,13.2]],1.6,t,-.4),n.simetrica([[2.4,-11.5],[2.5,4],[1.9,9],[.7,12],[0,12.6]],.6,4146507,-.9),n.simetrica([[2.65,-11.9],[2.75,4],[2.15,9],[.95,12],[0,13.1]],.1,10134443,1.2),n.perfil([[-3.5,1.3],[-3.5,3.6],[1.6,3.6],[3.4,1.3]],3.8,e,0,.12),n.box(3.4,.7,.06,oe,0,2.8,2.7,-.86);for(let s of[-1,1])n.box(.06,.6,2.6,oe,s*1.92,2.9,-.2);n.cil(.12,.12,3.2,6,kt,0,5.2,-1.5),n.box(1.8,.25,.25,kt,0,6.2,-1.5),n.esf(.5,Ke,0,6.9,-1.5,1,.5,1);for(let s of[-1,1])n.box(.08,.6,18,4870230,s*2.6,1.6,-1);n.cil(.3,.35,.6,8,e,0,1.6,-9),n.cil(.05,.05,1.6,6,kt,0,2,-8,Math.PI/2);let i=new Yt;return i.cil(.65,.75,.6,10,e,0,0,0),i.bloco(1,.7,1.2,t,0,.6,0,0,0,0,.2),i.cil(.08,.1,2.4,8,kt,0,.6,1.6,Math.PI/2),{corpo:n.build(),torre:i.build(),torreY:1.25,torreZ:8.5,canoZ:2.8,canoY:.6}},lcac(){let n=new Yt,t=8226447,e=6252399;n.bloco(14.2,1.9,26,2369322,0,.95,0,0,0,0,.9),n.box(12.6,.35,23.5,e,0,1.95,0);for(let i of[-1,1]){n.bloco(2.3,2.6,21,t,i*5.9,3.3,-.5,0,0,0,.3);for(let s=0;s<4;s++)n.box(.06,.5,.8,oe,i*7.07,3.6,-7+s*4);n.cil(2.35,2.35,1.4,18,t,i*3.6,4.6,-11.6,Math.PI/2),n.cil(1.95,1.95,1.45,16,1710618,i*3.6,4.6,-11.6,Math.PI/2),n.box(.15,3.6,.9,e,i*3.6,4.6,-12.7),n.box(.15,3.6,.9,e,i*2.6,4.6,-12.7),n.bloco(1.6,1.2,2.4,e,i*5.9,5.1,-6,0,0,0,.3)}return n.bloco(2.4,1.6,2.8,t,5.9,5.4,6.5,0,0,0,.3),n.box(2.42,.5,2,oe,5.9,5.7,7),n.box(10.5,.15,2,9080724,0,2.6,12,-.6),{corpo:n.build()}},destroier(){let n=new Yt,t=8358032,e=6713464,i=5726054;n.simetrica([[8.8,-77],[10,-60],[10.2,15],[8.6,45],[5,64],[1.2,78],[0,80]],9,t,-5),n.simetrica([[8.7,-76.5],[9.9,-60],[10.1,15],[8.5,45],[4.9,64],[1.1,77.5],[0,79.5]],.25,5791332,4),n.simetrica([[9,-77.2],[10.2,-60],[10.4,15],[8.8,45],[5.2,64]],.6,3027510,-5.4),n.perfil([[-2,4.2],[-2,13.5],[12,17.5],[24,17.5],[27,4.2]],14.5,t,0,.2),n.perfil([[8,17.5],[10,23],[20,23],[22,17.5]],10,t,0,.15),n.box(9.6,1.4,.15,oe,0,21.2,21.7,-.35);for(let r of[-1,1])n.cil(3.3,3.3,.3,8,9213340,r*7.25,13,16,0,0,Math.PI/2+r*.35),n.cil(3.3,3.3,.3,8,9213340,r*4.5,13,3.5,Math.PI/2-.35,0,0);n.cil(3.3,3.3,.3,8,9213340,0,13.5,24.5,-Math.PI/2+.6,0,0);for(let[r,o]of[[-1.2,-1.2],[1.2,-1.2],[-1.2,1.2],[1.2,1.2]])n.box(.25,16,.25,e,r,31,10+o);for(let r=0;r<4;r++)n.box(2.8,.2,2.8,e,0,25+r*4,10);n.box(7,.4,.4,e,0,36,10),n.cil(.08,.08,6,6,kt,0,42,10),n.esf(.8,Ke,2.5,34,10),n.perfil([[-12,4.2],[-11,16],[-6,16],[-5,4.2]],6,t,0,.2),n.box(5.4,.6,1.8,2236962,0,16.2,-7.8),n.box(5.4,.6,1.8,2236962,0,16.2,-9.6),n.perfil([[-34,4.2],[-33,15],[-28,15],[-27,4.2]],6,t,0,.2),n.box(5.4,.6,1.8,2236962,0,15.2,-29.8),n.box(5.4,.6,1.8,2236962,0,15.2,-31.6),n.perfil([[-26,4.2],[-26,9],[-13,9],[-13,4.2]],11,e,0,.15),n.perfil([[-50,4.2],[-50,10],[-35,12],[-35,4.2]],14,t,0,.15);for(let[r,o]of[[34,4],[-46,4]]){n.box(8,.25,o*2.2,i,0,4.35,r);for(let a=0;a<o;a++)for(let c=0;c<4;c++)n.box(1.6,.1,1.7,4278092,-3+c*2,4.5,r-(o-1)*1.1+a*2.2)}n.box(14,.12,18,4869972,0,4.3,-64),n.box(.4,.05,14,Ke,0,4.4,-64),n.cil(4.5,4.5,.05,24,15123002,0,4.36,-64),n.cil(4.2,4.2,.07,24,4869972,0,4.37,-64),n.cil(1.1,1.3,2.2,10,Ke,0,15.2,-19),n.esf(1.1,Ke,0,16.7,-19),n.cil(1.1,1.3,2.2,10,Ke,0,18.6,15),n.esf(1.1,Ke,0,20,15);for(let r of[-1,1])n.bloco(1.8,1,6,3093560,r*6.5,10,-20,0,0,0,.4);let s=new Yt;return s.perfil([[-2.2,0],[-2.2,1.8],[.8,2.2],[2.6,1],[2.6,0]],3.6,t,0,.15),s.cil(.2,.28,7,10,e,0,1.2,5.6,Math.PI/2),s.cil(.32,.32,.6,10,e,0,1.2,2.8,Math.PI/2),{corpo:n.build(),torre:s.build(),torreY:4.3,torreZ:56,canoZ:9.2,canoY:1.2}},portaavioes(){let n=new Yt;n.simetrica([[15,-150],[18,-120],[19,90],[11,140],[0,162]],18,uu,-10),n.simetrica([[33,-158],[34,-40],[32,60],[22,140],[12,158]],2.5,Sr,5.5),n.planta([[-38,-160],[36,-160],[37,-20],[24,160],[-24,160],[-26,40],[-40,-60]],1,4540491,8);let t=9.03,e=15123002,i=15790314,s=12597547,r=-.16,o=-10,a=-45,c=Math.cos(r),l=Math.sin(r),h=(v,m)=>[o+m*c+v*l,a-m*l+v*c];for(let v=-100;v<100;v+=8){let[m,p]=h(v,0);n.box(.6,.04,4.5,i,m,t+.01,p,0,r,0)}for(let v of[-14,14])for(let m=-100;m<100;m+=6){let[p,y]=h(m,v);n.box(.4,.04,3,i,p,t,y,0,r,0)}for(let v=0;v<4;v++){let[m,p]=h(-70+v*9,0);n.box(26,.05,.25,2236962,m,t+.02,p,0,r,0)}for(let v of[-6,6,-28,-18])n.box(.5,.05,80,2829099,v,t+.01,v>-10?110:30);for(let v of[-6,6])n.box(.3,.05,80,e,v+1.2,t+.02,110);n.box(.5,.04,300,e,32,t,0),n.box(.5,.04,300,s,-36,t,-10,0,.03,0);for(let[v,m]of[[36,-80],[36,30],[-40,-30]])n.box(14,.6,16,4079940,v,8.6,m);let u={6:"afedcg",8:"abcdefg"},f=(v,m,p,y,_)=>{let M={a:[0,y,p,.9],b:[p/2,y/2,.9,y/2],c:[p/2,-y/2,.9,y/2],d:[0,-y,p,.9],e:[-p/2,-y/2,.9,y/2],f:[-p/2,y/2,.9,y/2],g:[0,0,p,.9]}[_];n.box(M[2],.05,M[3],i,v+M[0],t+.02,m+M[1])};for(let[v,m]of[[6,-6],[8,6]])for(let p of u[v])f(m,128,6,5,p);n.box(11,16,30,uu,30,17,-30),n.box(10,6,22,Sr,30,27.5,-28),n.box(8.5,5,14,uu,30,33,-26),n.box(9.2,1.4,.2,oe,30,33.5,-18.95);for(let v of[24.4,35.6])n.box(.2,1.2,12,oe,v,33.5,-26);for(let v=0;v<3;v++)n.box(10.6,.15,30.4,Sr,30,12+v*5,-30);for(let v of u[6]){let m={a:[0,4,4,.8],b:[2,2,.8,4],c:[2,-2,.8,4],d:[0,-4,4,.8],e:[-2,-2,.8,4],f:[-2,2,.8,4],g:[0,0,4,.8]}[v];n.box(.2,m[3],m[2],i,24.4,22+m[1],-36+m[0])}for(let v of u[8]){let m={a:[0,4,4,.8],b:[2,2,.8,4],c:[2,-2,.8,4],d:[0,-4,4,.8],e:[-2,-2,.8,4],f:[-2,2,.8,4],g:[0,0,4,.8]}[v];n.box(.2,m[3],m[2],i,24.4,22+m[1],-30+m[0])}for(let[v,m]of[[-1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]])n.box(.35,14,.35,Sr,30+v,42,-30+m);for(let v=0;v<4;v++)n.box(3.6,.25,3.6,Sr,30,36+v*3.5,-30);n.box(8,.5,.6,Sr,30,47,-30),n.box(5,2.2,.3,13620182,30,45,-24,0,.3,0),n.esf(1.6,Ke,33,38.5,-40),n.esf(1.3,Ke,27,38,-40),n.cil(.2,.2,6,6,kt,30,52,-30);for(let v=0;v<5;v++)n.cil(.7,.7,2.5,8,14540253,34.5,6,-120+v*12,Math.PI/2);n.box(3,1.2,4,15123002,26,9.6,-55),n.box(2.5,1.6,3.5,14540253,20,9.8,10),n.box(2,1,3,15123002,-20,9.5,70);for(let[v,m]of[[33,150],[-30,-150],[33,-150]])n.cil(1.2,1.4,2,10,Ke,v,10,m),n.cil(.2,.2,2.4,6,kt,v,11,m+1.4,Math.PI/2);let d=[[.9,-7],[5,-3],[5,-2],[1.4,2.5],[0,7.5]],g=d.concat(d.slice().reverse().map(([v,m])=>[-v,m]));for(let v=0;v<9;v++){let m=-30+v%3*8,p=-140+Math.floor(v/3)*18;n.planta(g.map(([y,_])=>[y*.8+m,_*.8+p]),.7,du,9),n.box(.9,.5,2.2,3686213,m,10,p+2.5),n.box(.15,1.6,1.6,du,m,10.4,p-4.5)}return{corpo:n.build()}}},j_={pista(){let n=new Yt;n.box(40,.12,320,3882562,0,.06,0);for(let t=-140;t<140;t+=16)n.box(.8,.03,8,15790314,0,.14,t);for(let t of[-1,1])n.box(.6,.03,320,15790314,t*18,.14,0);for(let t=0;t<8;t++)for(let e of[-1,1])n.box(1.4,.03,12,15790314,-14+t*4,.14,e*150);n.box(50,.1,140,4869456,-45,.05,80);for(let t=0;t<3;t++)n.perfil([[-12,0],[-12,6],[-6,10],[6,10],[12,6],[12,0]],30,8226168,-85,.2);return n.cil(.3,.4,18,8,kt,-75,9,-120),n.box(6,4,6,11580328,-75,20,-120),n.box(6.2,1.4,6.2,oe,-75,21.5,-120),{corpo:n.build()}},acampamento(){let n=new Yt,t=13;for(let e=0;e<26;e++){let i=e/26*Math.PI*2;if(e%9===0)continue;let s=Math.sin(i)*t,r=Math.cos(i)*t;n.bloco(3.2,.5,.7,11048298,s,.25,r,0,i+Math.PI/2,0,.2),n.bloco(2.9,.5,.7,10259040,s,.72,r,0,i+Math.PI/2+.1,0,.2),e%3===0&&n.bloco(2.6,.45,.65,11574384,s,1.15,r,0,i+Math.PI/2,0,.2)}for(let[e,i,s,r]of[[t+2,3,.2,9054756],[-t-2,-4,-.3,2902650],[3,-t-2,1.5,13684944]])n.bloco(1.8,1.3,4.3,r,e,.65,i,0,s,Math.PI/2-.1,.25);for(let[e,i,s,r]of[[-5,3,.3,5208634],[4,5,-.5,3824266],[-2,-6,1.2,11758122],[6,-3,2,6974010]]){let o=new xn(.01,2,2,4,1);n.add(o,r,e,1,i,0,s,0,1.2,1,.9)}for(let e=0;e<6;e++)n.box(.9,.7,.9,8018486,-8+e*.95,.35,8-e%2*.9);for(let e=0;e<4;e++)n.cil(.4,.4,1,10,e%2?3103370:9058858,8+e%2*.9,.5,6-Math.floor(e/2)*.9);n.cil(.9,1,.25,10,5591628,0,.12,0);for(let e=0;e<4;e++)n.box(1.2,.18,.18,4863008,0,.3,0,0,e*.8,0);return n.cil(.06,.06,4.5,6,kt,-9,2.25,-5),n.box(.04,.9,1.4,15790320,-9,4,-4.3),{corpo:n.build()}},qg(){let n=new Yt;n.box(40,12,26,13352347,0,6,0),n.box(30,4,20,12036484,0,14,0),n.box(42,1,28,9208165,0,12.4,0),n.cil(.25,.25,26,6,kt,14,29,6),n.box(.4,2.4,4,2837132,14,40,8.2),n.box(.42,1.2,2,Ke,14,40.6,7.1),n.cil(2.8,2.8,.6,14,Ke,-9,16.8,-4,.5),n.cil(.3,.3,4,6,kt,-9,18,-4);for(let t=0;t<5;t++)n.box(5,2.2,.15,oe,-16+t*8,6.5,13.05);return{corpo:n.build()}},quartel(){let n=new Yt;for(let t=0;t<3;t++)n.box(14,5,40,12036742,-20+t*20,2.5,0),n.box(15,.8,41,7038032,-20+t*20,5.4,0);for(let t=0;t<24;t++)n.box(1.4,1,.7,10127970,-32+t*2.8,.5,24);return{corpo:n.build()}},patio(){let n=new Yt;n.box(60,9,30,11117199,0,4.5,-10),n.box(62,.8,32,6249295,0,9.3,-10);for(let t=0;t<5;t++)n.box(9,7,.3,7369832,-24+t*12,3.5,5.2);return n.box(64,.15,30,5593178,0,.08,22),{corpo:n.build()}},heliporto(){let n=new Yt;for(let[t,e]of[[-30,0],[0,0],[30,0],[-15,32],[15,32]])n.cil(12,12,.3,20,4540491,t,.15,e),n.box(1.2,.05,7,15921906,t-2.2,.33,e),n.box(1.2,.05,7,15921906,t+2.2,.33,e),n.box(3.4,.05,1.2,15921906,t,.33,e);return n.box(14,7,10,10133644,0,3.5,-24),n.cil(.2,.2,9,6,kt,6,4.5,-20),n.cil(.6,.1,2.2,8,16743168,6,9,-20,0,0,1.3),{corpo:n.build()}},docas(){let n=new Yt;n.box(16,1.2,70,8156264,0,.6,0);for(let t=0;t<8;t++)n.cil(.5,.5,4,6,5196354,7,-1,-32+t*9);return n.box(10,6,12,10133644,-4,4,-26),n.box(1.5,12,1.5,13934615,3,6,18),n.box(1.5,1.5,14,13934615,3,12,12),{corpo:n.build()}},zona(){let n=new Yt;for(let t=0;t<4;t++)for(let e=0;e<3;e++)n.box(8,3,14,15328466,-18+t*12,1.5,-14+e*17),n.cil(.01,4.2,1.8,4,16052450,-18+t*12,3.9,-14+e*17,0,Math.PI/4,0);return n.box(56,.1,56,7309914,0,.06,0),{corpo:n.build()}},fob(){let n=new Yt;for(let t=0;t<32;t++){let e=t/32*Math.PI*2;t%8!==0&&n.bloco(2.4,2.2,1.2,12758402,Math.sin(e)*26,1.1,Math.cos(e)*26,0,e+Math.PI/2,0,.1)}for(let[t,e,i]of[[-8,-6,0],[-8,4,0],[6,-8,1.57],[10,6,.3]])n.bloco(5,2.6,9,7304528,t,1.3,e,0,i,0,1.2);n.cil(.15,.25,14,6,kt,0,7,-14),n.box(.6,1.2,.1,Ke,0,12,-13.8),n.cil(6,6,.15,20,4474698,8,.08,14),n.box(1,.05,4,Ke,7,.18,14),n.box(1,.05,4,Ke,9,.18,14),n.box(2.4,.05,.8,Ke,8,.18,14),n.cil(.08,.08,6,6,kt,-14,3,10),n.box(.05,1,1.6,2837132,-14,5.4,10.8);for(let t=0;t<5;t++)n.box(1,.8,1,6969914,14+t%2,.4,-10+t);return{corpo:n.build()}},muro(){let n=new Yt;for(let t=0;t<5;t++)n.bloco(1.4,2.2,1.9,12758402,0,1.1,-4+t*2,0,0,0,.12),n.box(1.45,.06,1.95,7827546,0,2.22,-4+t*2);return{corpo:n.build()}},torre(){let n=new Yt;for(let[t,e]of[[-1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]])n.box(.3,9,.3,5984320,t,4.5,e);return n.box(4.5,2.2,4.5,8022607,0,10,0),n.box(5,.4,5,4866612,0,11.6,0),{corpo:n.build()}},patriot(){let n=new Yt;return n.box(2.6,1.2,9,np,0,1.3,0),Ar(n,[-1.1,1.1],[-3,-1.6,2.8],.55,.45),n.box(2.6,1.8,6,ip,0,3,-1.2,-.6),{corpo:n.build()}}},K_=Object.assign({},$_,Z_,J_,j_);function Tr(n){let t=tp["_d_"+n]||(tp["_d_"+n]=K_[n]()),e=new Ei,i={grupo:e,def:t};if(e.add(new le(t.corpo,hu)),t.torre){let s=new le(t.torre,hu);s.position.set(0,t.torreY,t.torreZ),e.add(s),i.torre=s}if(t.rotor&&!t.nacele){let s=new le(t.rotor,go);s.position.set(0,t.rotorY,t.rotorZ),e.add(s),i.rotor=s}if(t.rotor2){let s=new le(t.rotor2,go);s.position.set(0,t.rotor2Y,t.rotor2Z),e.add(s),i.rotor2=s}if(t.cauda){let s=new le(t.cauda,go);s.position.set(...t.caudaPos),e.add(s),i.cauda=s}if(t.helice){let s=new le(t.helice,go);s.position.set(0,t.heliceY,t.heliceZ),s.rotation.x=Math.PI/2,e.add(s),i.helice=s}if(t.motorZ!==void 0){let s=new eo(.55,4.2,10,1,!0);s.rotateX(-Math.PI/2),s.translate(0,0,-2.1);let r=new Ln({color:16756848,transparent:!0,opacity:.85,blending:Jr,depthWrite:!1}),o=new eo(.35,2.6,10,1,!0);o.rotateX(-Math.PI/2),o.translate(0,0,-1.3);let a=new Ln({color:10471679,transparent:!0,opacity:.9,blending:Jr,depthWrite:!1});i.chamas=[];let c=n==="f18"?[-.65,.65]:[0];for(let l of c){let h=new le(s,r),u=new le(o,a);h.position.set(l,t.motorY,t.motorZ),u.position.set(l,t.motorY,t.motorZ),e.add(h),e.add(u),i.chamas.push(h,u)}}if(t.nacele){i.naceles=[];for(let s of[-1,1]){let r=new Ei;r.position.set(s*t.naceleX,t.naceleY,.6);let o=new le(t.nacele,hu);r.add(o);let a=new le(t.rotor,go);a.position.set(0,2.65,0),r.add(a),e.add(r),i.naceles.push({piv:r,ro:a})}}return e.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),i}function sp(n,t=5046122){let e=new Oa(n*.86,n,28).rotateX(-Math.PI/2),i=new le(e,new Ln({color:t,transparent:!0,opacity:.85,depthWrite:!1}));return i.renderOrder=3,i}var yu={};$u(yu,{NCEL:()=>wn,NH:()=>hi,NW:()=>Gt,acharCaminho:()=>_u,livre:()=>wr,pontoLivreProximo:()=>Rn,prepararNavegacao:()=>vu});var zs=2,Gt=Math.ceil(Ft/zs),hi=Math.ceil(Te/zs),wn=Ae*zs,yn=Gt*hi,Ls=[new Uint8Array(yn),new Uint8Array(yn),new Uint8Array(yn),new Uint8Array(yn)];function vu(){let n=Ls[0],t=Ls[1],e=Ls[2],i=Ls[3];for(let c=0;c<hi;c++)for(let l=0;l<Gt;l++){let h=0,u=0,f=0;for(let g=0;g<zs;g++)for(let v=0;v<zs;v++){let m=l*zs+v,p=c*zs+g;if(m>=Ft||p>=Te){u++;continue}let y=p*Ft+m,_=ke[y];_===be.AGUA?u++:_===be.PONTE?(h++,u++,f++):Ie[y]<0&&h++}let d=c*Gt+l;n[d]=h>=2||f>0?1:0,t[d]=u>=3?1:0,i[d]=n[d]||t[d]?1:0}let s=new Uint8Array(yn).fill(255),r=new Int32Array(yn),o=0,a=0;for(let c=0;c<yn;c++)t[c]||(s[c]=0,r[a++]=c);for(;o<a;){let c=r[o++],l=c%Gt,h=c/Gt|0,u=s[c]+1;u>20||(l>0&&s[c-1]>u&&(s[c-1]=u,r[a++]=c-1),l<Gt-1&&s[c+1]>u&&(s[c+1]=u,r[a++]=c+1),h>0&&s[c-Gt]>u&&(s[c-Gt]=u,r[a++]=c-Gt),h<hi-1&&s[c+Gt]>u&&(s[c+Gt]=u,r[a++]=c+Gt))}for(let c=0;c<yn;c++)e[c]=s[c]>=3?1:0}function wr(n,t,e){let i=Math.floor(t/wn),s=Math.floor(e/wn);return i<0||s<0||i>=Gt||s>=hi?sn&&(n===1||n===2):Ls[n][s*Gt+i]===1}function xu(n,t,e=40){if(n[t])return t;let i=t%Gt,s=t/Gt|0;for(let r=1;r<=e;r++)for(let o=-r;o<=r;o++)for(let a=-r;a<=r;a++){if(Math.abs(a)!==r&&Math.abs(o)!==r)continue;let c=i+a,l=s+o;if(!(c<0||l<0||c>=Gt||l>=hi)&&n[l*Gt+c])return l*Gt+c}return-1}function Rn(n,t,e){let i=Math.max(0,Math.min(Gt-1,Math.floor(t/wn))),s=Math.max(0,Math.min(hi-1,Math.floor(e/wn))),r=xu(Ls[n],s*Gt+i,60);return r<0?null:{x:(r%Gt+.5)*wn,z:((r/Gt|0)+.5)*wn}}var cc=new Float32Array(yn),pu=new Int32Array(yn),mu=new Uint32Array(yn),gu=new Uint32Array(yn),Is=1,es=new Int32Array(yn),Kn=new Float32Array(yn),Us=0;function rp(n,t){let e=Us++;for(;e>0;){let i=e-1>>1;if(Kn[i]<=t)break;es[e]=es[i],Kn[e]=Kn[i],e=i}es[e]=n,Kn[e]=t}function Q_(){let n=es[0],t=es[--Us],e=Kn[Us],i=0;for(;;){let s=i*2+1;if(s>=Us||(s+1<Us&&Kn[s+1]<Kn[s]&&s++,Kn[s]>=e))break;es[i]=es[s],Kn[i]=Kn[s],i=s}return es[i]=t,Kn[i]=e,n}var ty=[1,-1,0,0,1,1,-1,-1],ey=[0,0,1,-1,1,-1,1,-1],ny=[1,1,1,1,1.4142,1.4142,1.4142,1.4142];function iy(n,t,e){let i=t%Gt,s=t/Gt|0,r=e%Gt,o=e/Gt|0,a=Math.abs(r-i),c=Math.abs(o-s),l=i<r?1:-1,h=s<o?1:-1,u=a-c;for(;;){if(!n[s*Gt+i])return!1;if(i===r&&s===o)return!0;let f=u*2;if(f>-c&&f<a&&(!n[s*Gt+i+l]||!n[(s+h)*Gt+i]))return!1;f>-c&&(u-=c,i+=l),f<a&&(u+=a,s+=h)}}function _u(n,t,e,i,s,r=7e4){let o=Ls[n],a=(S,w)=>Math.max(0,Math.min(w-1,S)),c=xu(o,a(Math.floor(e/wn),hi)*Gt+a(Math.floor(t/wn),Gt),12),l=xu(o,a(Math.floor(s/wn),hi)*Gt+a(Math.floor(i/wn),Gt),40);if(c<0||l<0)return null;if(c===l)return[{x:i,z:s}];Is++,Us=0;let h=l%Gt,u=l/Gt|0,f=S=>{let w=Math.abs(S%Gt-h),P=Math.abs((S/Gt|0)-u);return(w+P+(1.4142-2)*Math.min(w,P))*1.25};cc[c]=0,mu[c]=Is,pu[c]=-1,rp(c,f(c));let d=c,g=f(c),v=0,m=!1;for(;Us>0&&v<r;){let S=Q_();if(gu[S]===Is)continue;if(gu[S]=Is,v++,S===l){m=!0;break}let w=f(S);w<g&&(g=w,d=S);let P=S%Gt,E=S/Gt|0;for(let b=0;b<8;b++){let C=P+ty[b],N=E+ey[b];if(C<0||N<0||C>=Gt||N>=hi)continue;let D=N*Gt+C;if(!o[D]||gu[D]===Is||b>=4&&(!o[E*Gt+C]||!o[N*Gt+P]))continue;let F=cc[S]+ny[b];(mu[D]!==Is||F<cc[D])&&(mu[D]=Is,cc[D]=F,pu[D]=S,rp(D,F+f(D)))}}let p=m?l:d,y=[];for(let S=p;S!==-1;S=pu[S])y.push(S);y.reverse();let _=[y[0]],M=0;for(;M<y.length-1;){let S=Math.min(y.length-1,M+60);for(;S>M+1&&!iy(o,y[M],y[S]);)S--;_.push(y[S]),M=S}let I=_.slice(1).map(S=>({x:(S%Gt+.5)*wn,z:((S/Gt|0)+.5)*wn}));return m&&I.push({x:i,z:s}),I.length?I:[{x:i,z:s}]}var Ut=null,Cn=null,vo=null,Pr=null,On=null,Ir=!0,Mu={},Rr=null,Cr=null,xo=null;function zi(){if(Ut){Ut.state==="suspended"&&Ut.resume();return}let n=window.AudioContext||window.webkitAudioContext;if(!n)return;Ut=new n;let t=Ut.createDynamicsCompressor();t.threshold.value=-14,t.knee.value=10,t.ratio.value=6,t.attack.value=.003,t.release.value=.25,t.connect(Ut.destination),Cn=Ut.createGain(),Cn.gain.value=Ir?.6:0,Cn.connect(t);let e=Ut.sampleRate;Pr=Ut.createBuffer(1,e*2,e),On=Ut.createBuffer(1,e*2,e);let i=Pr.getChannelData(0),s=On.getChannelData(0),r=0;for(let l=0;l<i.length;l++)i[l]=Math.random()*2-1,r=(r+.02*i[l])/1.02,s[l]=r*3.5;let o=2.4,a=Ut.createBuffer(2,e*o,e);for(let l=0;l<2;l++){let h=a.getChannelData(l);for(let u=0;u<h.length;u++){let f=u/e,d=f>.06&&f<.075||f>.13&&f<.14||f>.21&&f<.22?.6:0;h[u]=(Math.random()*2-1)*(Math.exp(-f*2.6)*.5+d*Math.exp(-f*3))}}let c=Ut.createConvolver();c.buffer=a,vo=Ut.createGain(),vo.gain.value=.45,vo.connect(c),c.connect(Cn)}function yo(n){Ir=n,Cn&&(Cn.gain.value=n?.6:0)}function hn(n,t){let e=performance.now();return Mu[n]&&e-Mu[n]<t?!1:(Mu[n]=e,!0)}function he(n,t,e,i,s,r="lowpass",o=.2,a=0,c=Pr,l=0){if(!Ut||!Ir||n<.005)return;let h=Ut.currentTime+a,u=Ut.createBufferSource();u.buffer=c,u.playbackRate.value=.9+Math.random()*.2;let f=Ut.createBiquadFilter();f.type=r,f.frequency.setValueAtTime(i,h),f.Q.value=s,l&&f.frequency.exponentialRampToValueAtTime(l,h+e);let d=Ut.createGain();if(d.gain.setValueAtTime(1e-4,h),d.gain.exponentialRampToValueAtTime(n,h+t),d.gain.exponentialRampToValueAtTime(1e-4,h+t+e),u.connect(f),f.connect(d),d.connect(Cn),o>0){let g=Ut.createGain();g.gain.value=o,d.connect(g),g.connect(vo)}u.start(h,Math.random()*1.2,t+e+.05)}function we(n,t,e,i,s="sine",r=0,o=.15){if(!Ut||!Ir||n<.005)return;let a=Ut.currentTime+r,c=Ut.createOscillator();c.type=s,c.frequency.setValueAtTime(e,a),c.frequency.exponentialRampToValueAtTime(Math.max(15,i),a+t);let l=Ut.createGain();if(l.gain.setValueAtTime(n,a),l.gain.exponentialRampToValueAtTime(1e-4,a+t),c.connect(l),l.connect(Cn),o>0){let h=Ut.createGain();h.gain.value=o,l.connect(h),h.connect(vo)}c.start(a),c.stop(a+t+.05)}function Ns(n,t){if(!Ut||t<.015)return;let i=1-(1-t)*.75,s=.92+Math.random()*.16;switch(n){case"pistola":if(!hn("pist",60))return;he(t*.5*i,.001,.03,3200*s,.7,"highpass",.1),he(t*.45,.002,.09,1400*s,1.2,"bandpass",.3),we(t*.25,.06,260,90);break;case"fuzil":if(!hn("fuzil",40))return;he(t*.7*i,.001,.025,4200*s,.6,"highpass",.15),he(t*.55,.002,.1,1100*s,1.1,"bandpass",.35),we(t*.35,.08,200*s,70),he(t*.18,.01,.45,900,.7,"lowpass",.9,.02);break;case"mg":case"m240":if(!hn("mg",38))return;he(t*.6*i,.001,.022,3600*s,.6,"highpass",.12),he(t*.55,.002,.09,900*s,1,"bandpass",.35),we(t*.35,.07,170*s,60),Math.random()<.4&&he(t*.15,.01,.4,800,.7,"lowpass",.9,.02);break;case"m134":if(!hn("m134",30))return;he(t*.5,.001,.05,1500*s,.8,"bandpass",.3),we(t*.25,.05,140,70,"square");break;case"sniper":if(!hn("sn",80))return;he(t*.95*i,.001,.03,3800,.6,"highpass",.2),he(t*.8,.002,.18,700,.9,"bandpass",.5),we(t*.6,.22,140,38),he(t*.35,.02,1.4,600,.6,"lowpass",1.2,.05);break;case"50cal":if(!hn("50",55))return;he(t*.7*i,.001,.03,2800*s,.6,"highpass",.2),he(t*.75,.003,.16,520*s,1,"bandpass",.45),we(t*.55,.14,110*s,38),Math.random()<.5&&he(t*.2,.01,.6,500,.6,"lowpass",1,.03);break;case"25mm":case"30mm":if(!hn("ac",90))return;he(t*.7*i,.001,.035,2400,.6,"highpass",.2),he(t*.85,.003,.22,380*s,.9,"bandpass",.5),we(t*.7,.2,90*s,30),he(t*.25,.02,.8,400,.6,"lowpass",1,.04,On);break;case"120mm":case"155mm":case"naval":if(!hn("can",120))return;he(t*.9*i,.001,.05,2e3,.5,"highpass",.3),he(t*1.2,.004,.9,260,.7,"lowpass",.9,0,On,90),we(t*1.1,1.1,75,24),we(t*.5,.5,140,45,"triangle"),he(t*.45,.05,2,300,.6,"lowpass",1.4,.32,On),he(t*.25,.05,1.6,250,.6,"lowpass",1.4,.75,On);break;case"foguete":case"hellfire":if(!hn("fog",110))return;he(t*.8,.005,.15,600,.6,"lowpass",.4,0,On),he(t*.6,.06,.9,500,1.4,"bandpass",.6,0,Pr,2600),we(t*.4,.4,90,40);break;case"bomba":if(!hn("bmb",150))return;we(t*.18,1.2,1400,500,"sine",0,.3);break;default:if(!hn("def",100))return;he(t*.6,.002,.2,700,.9,"bandpass",.4)}}function lc(n,t=!1){if(!Ut||n<.015||!hn("exp",60))return;let e=t?1.3:1;he(n*.8,.001,.06,1800,.5,"highpass",.3),he(n*1.3*e,.005,1.4*e,420,.6,"lowpass",1,0,On,70),we(n*1.1*e,1.3*e,62,18);for(let i=0;i<6;i++)he(n*.12,.002,.05,3e3+Math.random()*3e3,1,"bandpass",.2,.15+Math.random()*.7);he(n*.4*e,.1,2.5,220,.6,"lowpass",1.5,.35,On)}function op(n){if(!(!Ut||n<.02||!hn("vidro",120))){he(n*.5,.001,.12,4500,.8,"highpass",.2);for(let t=0;t<9;t++)we(n*.08,.06+Math.random()*.12,2500+Math.random()*4e3,2e3+Math.random()*3e3,"sine",.02+Math.random()*.35,.1)}}function ap(n){if(!(!Ut||n<.02||!hn("esm",200))){he(n*.8,.002,.35,700,1.5,"bandpass",.3),we(n*.4,.25,160,60,"square");for(let t=0;t<4;t++)we(n*.06,.1,2e3+Math.random()*2500,1500,"sine",.05+Math.random()*.2,.05)}}function bu(n){if(!Ut||n<.03||!hn("zb",700))return;let t=Ut.currentTime,e=85+Math.random()*70,i=Ut.createOscillator();i.type="sawtooth",i.frequency.setValueAtTime(e,t),i.frequency.linearRampToValueAtTime(e*.75,t+1.1);let s=Ut.createOscillator();s.frequency.value=6+Math.random()*4;let r=Ut.createGain();r.gain.value=6,s.connect(r),r.connect(i.frequency);let o=Ut.createBiquadFilter();o.type="bandpass",o.frequency.value=450+Math.random()*300,o.Q.value=4;let a=Ut.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(n*.35,t+.15),a.gain.exponentialRampToValueAtTime(1e-4,t+1.2),i.connect(o),o.connect(a),a.connect(Cn),i.start(t),s.start(t),i.stop(t+1.25),s.stop(t+1.25),he(n*.06,.1,1,800,3,"bandpass",.2)}function ee(n="clique"){if(Ut){if(n==="clique")we(.1,.05,900,700,"square",0,0);else if(n==="ok")we(.12,.07,660,660,"square",0,0),we(.12,.09,990,990,"square",.07,0);else if(n==="alerta")we(.15,.15,880,880,"square",0,0),we(.15,.15,660,660,"square",.18,0);else if(n==="erro")we(.13,.2,220,160,"square",0,0);else if(n==="resgate")we(.1,.1,523,523,"triangle",0,0),we(.1,.1,659,659,"triangle",.1,0),we(.1,.2,784,784,"triangle",.2,0);else if(n==="sirene"){let t=Ut.currentTime,e=Ut.createOscillator(),i=Ut.createGain();e.type="sawtooth";for(let r=0;r<3;r++)e.frequency.setValueAtTime(700,t+r*.6),e.frequency.linearRampToValueAtTime(1300,t+r*.6+.3),e.frequency.linearRampToValueAtTime(700,t+r*.6+.6);let s=Ut.createBiquadFilter();s.type="lowpass",s.frequency.value=2200,i.gain.setValueAtTime(1e-4,t),i.gain.exponentialRampToValueAtTime(.07,t+.1),i.gain.setValueAtTime(.07,t+1.6),i.gain.exponentialRampToValueAtTime(1e-4,t+1.8),e.connect(s),s.connect(i),i.connect(Cn),e.start(t),e.stop(t+1.85)}}}function _o(n,t,e,i){let s=Ut.createBufferSource();s.buffer=n,s.loop=!0;let r=Ut.createBiquadFilter();r.type=t,r.frequency.value=e,r.Q.value=i;let o=Ut.createGain();return o.gain.value=0,s.connect(r),r.connect(o),o.connect(Cn),s.start(),{f:r,g:o}}var Ds=(n,t,e=.25)=>n.gain.setTargetAtTime(Ir?t:0,Ut.currentTime,e);function cp(n){if(Ut){if(!Rr){let t=_o(Pr,"bandpass",320,.9),e=Ut.createOscillator();e.type="sawtooth",e.frequency.value=17;let i=Ut.createGain();i.gain.value=0,e.connect(i),i.connect(t.g.gain),e.start();let s=_o(On,"lowpass",160,.7),r=Ut.createOscillator();r.type="sine",r.frequency.value=1750;let o=Ut.createGain();o.gain.value=0,r.connect(o),o.connect(Cn),r.start(),Rr={pas:t,lg:i,vento:s,tg:o}}Ds(Rr.pas.g,n*.32),Rr.lg.gain.setTargetAtTime(Ir?n*.3:0,Ut.currentTime,.25),Ds(Rr.vento.g,n*.5),Ds(Rr.tg,n*n*.012)}}function lp(n){Ut&&(Cr||(Cr={ronco:_o(On,"lowpass",300,.6),chiado:_o(Pr,"bandpass",1800,.7)}),Ds(Cr.ronco.g,n*.9,.35),Ds(Cr.chiado.g,n*n*.35,.35),Cr.ronco.f.frequency.setTargetAtTime(200+n*500,Ut.currentTime,.3),Cr.chiado.f.frequency.setTargetAtTime(1200+n*2200,Ut.currentTime,.3))}function hp(n,t=.5){if(Ut){if(!xo){let e=_o(On,"lowpass",140,.8),i=Ut.createOscillator();i.type="sawtooth",i.frequency.value=38;let s=Ut.createBiquadFilter();s.type="lowpass",s.frequency.value=180;let r=Ut.createGain();r.gain.value=0,i.connect(s),s.connect(r),r.connect(Cn),i.start(),xo={r:e,o:i,g:r}}Ds(xo.r.g,n*.6),Ds(xo.g,n*.06),xo.o.frequency.setTargetAtTime(32+t*30,Ut.currentTime,.4)}}var hc={comum:{hp:70,vel:4,vagar:.9,dano:12,cd:1,perc:32,esc:1},corredor:{hp:50,vel:7.2,vagar:1.4,dano:9,cd:.8,perc:40,esc:1},bruto:{hp:750,vel:3,vagar:.8,dano:45,cd:1.3,perc:30,esc:1.4},soldado:{hp:110,vel:4,vagar:1,dano:14,cd:1,perc:34,esc:1}},sy={raio:.4,slots:1};function Su(n,t){return{agente:!0,id:x.idSeq++,x:n,z:t,y:0,ang:ut(0,6.28),zumbi:!1,sub:"civil",hp:30,vivo:!0,estado:"vagar",lider:null,alvo:null,t:ut(0,1),fase:ut(0,6),vel:0,dx:0,dz:0,cd:0,camisa:ci(Xd),calca:ci(qd),pele:ci(Yd),cabelo:Math.random()<.9?ci($d):null,soldado:!1,dentro:null,virando:0,mortoT:0,casa:{x:n,z:t},d:sy,espera:0,acena:0,esc:1}}function uc(n,t){let e=Su(n,t);return x.agentes.push(e),e}function Eu(n,t,e){let i=uc(n,t);return i.estado="seguir",i.lider=e,i.espera=0,i}function Au(n,t,e="comum"){let i=Su(n,t);return Mo(i,e),x.agentes.push(i),i}function Mo(n,t){n.zumbi=!0,n.sub=t;let e=hc[t];n.hp=e.hp,n.esc=e.esc,n.pele=ci(Zd),t==="bruto"&&(n.camisa=$n(4864819),n.calca=$n(2829099)),n.camisa=n.camisa.map(i=>i*.75),n.estado="vagar",n.lider=null,n.alvo=null,n.t=ut(0,.5)}function up(n){let t=Su(n.x,n.z);t.soldado=!0,t.camisa=uo,t.calca=nc,Mo(t,"soldado"),t.camisa=uo.map(e=>e*.8),t.estado="morto",t.virando=3.5,t.vivo=!0,x.agentes.push(t),x.infectados++}function zr(n,t,e){if(!(!n.vivo||n.estado==="morto")&&(n.hp-=t,n.zumbi&&Math.random()<.5&&x.efeitos.sangue(n.x,1.2,n.z,3),!(n.hp>0))){if(n.zumbi){n.estado="morto",n.mortoT=12,n.virando=0,x.zumbisMortos++,x.dinheiro+=n.sub==="bruto"?30:4,x.efeitos.sangue(n.x,1,n.z,6);return}e&&e.zumbi?(n.estado="morto",n.virando=3+ut(0,3),n.lider=null,x.infectados++):(n.estado="morto",n.mortoT=15,n.virando=0,x.civisMortos++,e&&!e.zumbi&&!e.agente&&x.tempo-(x._avisoFogo||-99)>20&&(x._avisoFogo=x.tempo,$t("\u26A0\uFE0F Civis atingidos por fogo amigo!",n.x,n.z,"ruim"))),x.efeitos.sangue(n.x,1,n.z,8)}}function Bn(n,t,e){let i=n.x+t,s=n.z+e;if(Ne(i,s))return n.x=i,n.z=s,!0;let r=Math.hypot(t,e)*.25;return Math.abs(t)>r&&Ne(i,n.z)?(n.x=i,!0):Math.abs(e)>r&&Ne(n.x,s)?(n.z=s,!0):!1}function ry(n){return n.vivo&&!n.dentro&&!n.predio&&(n.classe==="inf"||n.classe==="veic"||n.estr||n.classe==="aereo"&&n.y<2)}function oy(n){let t=hc[n.sub],e=t.perc*(x.noite?1.4:1),i=null,s=e*e;if(x.hashA.busca(n.x,n.z,e,(a,c)=>{!a.zumbi&&a.vivo&&!a.dentro&&a.estado!=="morto"&&c<s&&(s=c,i=a)}),x.hashU.busca(n.x,n.z,e,(a,c)=>{ry(a)&&c<s*.9&&(s=c,i=a)}),n.alvo=i,i){n.estado="perseguir";return}let r=null,o=1/0;for(let a of x.ruidos){let c=Xe(n.x,n.z,a.x,a.z);c<a.r*a.r&&c<o&&(o=c,r=a)}if(r){n.estado="ruido",n.destino={x:r.x+ut(-15,15),z:r.z+ut(-15,15)};return}if((n.estado!=="ruido"||!n.destino||Ot(n.x,n.z,n.destino.x,n.destino.z)<5)&&(n.estado="vagar",Math.random()<.4)){let a=ut(0,6.28);n.dx=Math.sin(a),n.dz=Math.cos(a)}for(let[a,c]of[[2,0],[-2,0],[0,2],[0,-2]]){let l=Cs(n.x+a,n.z+c);if(l&&l.guarnicao.length){if(l.integridade-=4,l.integridade<=0){l.integridade=0;let h=ci(l.guarnicao);h&&x.danoUnidade(h,t.dano,!0)}break}}}function ay(n){if(n.campo){cy(n);return}let t=null,e=20*20;if(x.hashA.busca(n.x,n.z,20,(i,s)=>{i.zumbi&&i.vivo&&i.estado!=="morto"&&s<e&&(e=s,t=i)}),t&&(n.estado!=="seguir"||e<64)){n.estado="fugir";let i=Math.sqrt(e)||1;n.dx=(n.x-t.x)/i,n.dz=(n.z-t.z)/i,n.medo=4;return}if(!(n.estado==="fugir"&&n.medo>0)){if(n.estado==="fugir"&&(n.estado=n.lider?"seguir":"vagar"),n.estado!=="seguir"){let i=null,s=16*16,r=!1;if(x.hashU.busca(n.x,n.z,70,(o,a)=>{!o.vivo||o.dentro||o.estr||(o.classe==="inf"||o.classe==="veic"||o.classe==="naval"&&o.d.carga||o.classe==="aereo"&&o.pousado&&o.d.carga)&&(a<s?(s=a,i=o):r=!0)}),i){n.estado="seguir",n.lider=i;return}n.acena=r?3:0}if(n.estado==="vagar"&&Math.random()<.3){let i=ut(0,6.28),s=Math.random()<.6;if(n.dx=s?Math.sin(i):0,n.dz=s?Math.cos(i):0,Ot(n.x,n.z,n.casa.x,n.casa.z)>60){let r=Ot(n.x,n.z,n.casa.x,n.casa.z);n.dx=(n.casa.x-n.x)/r,n.dz=(n.casa.z-n.z)/r}}}}function cy(n){let t=n.campo;if(!t.ativo){n.campo=null,n.estado="vagar";return}if(n.estado="acampar",!n.armado){let e=!1;x.hashA.busca(n.x,n.z,10,i=>{i.zumbi&&i.vivo&&i.estado!=="morto"&&(e=!0)}),e&&(n.posto={x:t.x+ut(-3,3),z:t.z+ut(-3,3)})}}function ly(n,t){if(n.cdTiro=(n.cdTiro||0)-t,n.mirando>0&&(n.mirando-=t),n.cdTiro>0)return;n.cdTiro=n.policial?.45:.75+Math.random()*.4;let e=n.policial?55:40,i=null,s=e*e;if(x.hashA.busca(n.x,n.z,e,(l,h)=>{l.zumbi&&l.vivo&&l.estado!=="morto"&&l.virando<=0&&h<s&&(s=h,i=l)}),!i)return;n.ang=Math.atan2(i.x-n.x,i.z-n.z),n.mirando=.8;let r=x.efeitos,o=n.x+Math.sin(n.ang)*.7,a=n.z+Math.cos(n.ang)*.7;r.clarao(o,1.4,a,.8);let c=Math.random()<(n.policial?.55:.38);r.tracante(o,1.4,a,i.x+(c?0:ut(-3,3)),1.1,i.z+(c?0:ut(-3,3)),[1,.85,.45]),c&&zr(i,n.policial?18:22,n),Ns(n.policial?"fuzil":"pistola",x.volEm(n.x,n.z)*.8),x.ruidos.push({x:n.x,z:n.z,r:90,t:x.tempo})}function fp(n){let t=x.agentes,e=0,i=0,s=x.noite;for(let r=t.length-1;r>=0;r--){let o=t[r];if(!o.vivo){t[r]=t[t.length-1],t.pop();continue}if(o.dentro){o.dentro.vivo?(o.x=o.dentro.x,o.z=o.dentro.z):o.vivo=!1,i++;continue}if(o.estado==="morto"){o.virando>0?(o.virando-=n,o.virando<=0&&(o.zumbi?(o.estado="vagar",o.hp=hc[o.sub].hp):Mo(o,hy()),o.y=0,bu(x.volEm(o.x,o.z)))):(o.mortoT-=n,o.mortoT<=0&&(o.vivo=!1));continue}if(o.zumbi?e++:i++,o.t-=n,o.cd-=n,o.medo>0&&(o.medo-=n),o.zumbi){let a=hc[o.sub];o.t<=0&&(o.t=ut(.3,.6),oy(o));let c=0;if(o.estado==="perseguir"&&o.alvo){let l=o.alvo;if(!l.vivo||l.dentro||l.predio||l.estado==="morto"||l.classe==="aereo"&&l.y>2)o.alvo=null,o.estado="vagar";else{let h=Ot(o.x,o.z,l.x,l.z),u=(l.d?l.d.raio:.4)+.9;if(h>u){let f=Math.atan2(l.x-o.x,l.z-o.z);if(o.ang=He(o.ang,f,6*n),c=a.vel*(s?1.25:1),!Bn(o,Math.sin(o.ang)*c*n,Math.cos(o.ang)*c*n)){let d=o.id&1?1.3:-1.3;Bn(o,Math.sin(o.ang+d)*c*n,Math.cos(o.ang+d)*c*n)}}else o.cd<=0&&(o.cd=a.cd,l.agente?zr(l,a.dano+6,o):x.danoUnidade(l,l.classe==="inf"?a.dano:a.dano*(o.sub==="bruto"?1.5:.5),!0),Math.random()<.15&&bu(x.volEm(o.x,o.z)))}}else if(o.estado==="ruido"&&o.destino){let l=Math.atan2(o.destino.x-o.x,o.destino.z-o.z);o.ang=He(o.ang,l,3*n),c=a.vel*.7,Bn(o,Math.sin(o.ang)*c*n,Math.cos(o.ang)*c*n)||Bn(o,Math.sin(o.ang+1.2)*c*n,Math.cos(o.ang+1.2)*c*n)}else(o.dx||o.dz)&&(c=a.vagar,o.ang=He(o.ang,Math.atan2(o.dx,o.dz),2*n),Bn(o,Math.sin(o.ang)*c*n,Math.cos(o.ang)*c*n)||(o.dx=-o.dx,o.dz=-o.dz));o.vel=c,o.fase+=n*c*2.2}else{o.t<=0&&(o.t=ut(.35,.7),ay(o));let a=0;if(o.estado==="fugir"){a=4.2;let c=Math.atan2(o.dx,o.dz);if(o.ang=He(o.ang,c,8*n),!Bn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)){let l=o.id&1?1.4:-1.4;o.dx=Math.sin(o.ang+l),o.dz=Math.cos(o.ang+l)}}else if(o.estado==="seguir"){let c=o.lider;if(c&&c.dentro&&(c=o.lider=c.dentro),!c||!c.vivo)o.estado="vagar",o.lider=null;else if(c.predio){let l=c.predio;if(Ot(o.x,o.z,l.cx,l.cz)<l.raio+10){l.civis++,o.vivo=!1;continue}let u=Math.atan2(l.cx-o.x,l.cz-o.z);o.ang=He(o.ang,u,8*n),a=3.5,Bn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)}else{let l=Ot(o.x,o.z,c.x,c.z),h=c.d?c.d.raio:.5,u=c.d&&c.d.carga;if(u&&l<h+6&&(c.classe!=="aereo"||c.pousado)&&x.vagas(c)>=1&&o.espera<=0){x.embarcarCivil(o,c);continue}o.espera>0&&(o.espera-=n);let f=u?h+2:3+o.id%4;if(l>f){let d=Math.atan2(c.x-o.x,c.z-o.z);if(o.ang=He(o.ang,d,8*n),a=l>12?4.2:2.2,!Bn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)){let g=o.id&1?1.2:-1.2;Bn(o,Math.sin(o.ang+g)*a*n,Math.cos(o.ang+g)*a*n)}}l>160&&(o.estado="vagar",o.lider=null)}}else if(o.estado==="acampar"&&o.campo){let c=o.campo,l=Ot(o.x,o.z,o.posto.x,o.posto.z);if(l>1.5){let h=Math.atan2(o.posto.x-o.x,o.posto.z-o.z);if(o.ang=He(o.ang,h,8*n),a=l>30?4:1.6,!Bn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)){let u=o.id&1?1.3:-1.3;Bn(o,Math.sin(o.ang+u)*a*n,Math.cos(o.ang+u)*a*n)}}else(!o.mirando||o.mirando<=0)&&(o.ang=He(o.ang,Math.atan2(o.x-c.x,o.z-c.z),2*n))}else(o.dx||o.dz)&&(a=1.3,o.ang=He(o.ang,Math.atan2(o.dx,o.dz),4*n),Bn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)||(o.dx=-o.dx,o.dz=-o.dz));o.vel=a,o.fase+=n*a*2.4,o.armado&&ly(o,n),a===0&&o.acena>0&&(o.acena-=n,o.fase+=n*6),(o.id+x.quadro)%20===0&&x.naZonaSegura(o.x,o.z,0)&&(o.vivo=!1,o.resgatado=!0,x.resgatados++,x.dinheiro+=40,x.resgateAcum=(x.resgateAcum||0)+1)}}x.nZumbis=e,x.nCivis=i}function hy(){let n=x.dia,t=Math.random();return n>=3&&t<.05?"bruto":n>=2&&t<.15||x.tempo>360&&t<.06?"corredor":"comum"}function dp(n,t){let e=x.agentes;for(let i=0;i<e.length;i++){let s=e[i];if(!s.vivo||s.dentro||!t(s.x,s.z))continue;let r=s.estado==="morto"?3:s.zumbi?1:s.vel===0&&s.acena>0?4:0,o=s.soldado?3:s.armado?s.policial?5:4:0,a=s.armado&&r===0&&s.mirando>0?2:r;n.add(s.x,s.y,s.z,s.ang,s.fase,a,s.camisa,s.calca,s.pele,o,s.esc,s.policial?null:s.cabelo,Math.min(1,s.vel/2.5))}}var uy={fuzil:[1,.9,.5],mg:[1,.8,.4],sniper:[1,1,.8],pistola:[1,.9,.5],"50cal":[1,.7,.3],"25mm":[1,.6,.2],"30mm":[1,.6,.2],m134:[1,.45,.2],m240:[1,.7,.3]},fy={fuzil:110,pistola:70,mg:140,sniper:160,"50cal":200,"25mm":260,"30mm":260,m134:220,m240:160,"120mm":450,"155mm":500,naval:500,foguete:450,hellfire:450,bomba:600};function Tu(n){return n.classe==="naval"?n.d.nav:0}function $e(n,t,e,i=0,s={}){var a;let r=Fn[n],o={id:x.idSeq++,tipo:n,d:r,classe:r.classe,x:t,z:e,y:0,ang:i,hp:r.hp,hpMax:r.hp,caminho:null,wp:0,destino:null,ordem:null,alvo:null,cd:ut(0,.5),cd2:ut(0,1),busca:ut(0,.4),passageiros:[],cargaUsada:0,dentro:null,predio:null,vivo:!0,sel:!1,fase:ut(0,6),mirando:0,alt:0,altAlvo:0,torreAng:0,travado:0,salva:r.salva||0,recarga:0,municao:r.municao||0,estadoJato:"pronto",vx:0,vz:0,velAtual:0,repath:0,ultimaPos:{x:t,z:e},cura:0};return r.modelo&&(o.m=Tr(r.modelo),x.cena.add(o.m.grupo)),o.classe==="aereo"&&(o.alt=(a=s.alt)!=null?a:0,o.altAlvo=o.alt),o.classe==="jato"&&(o.estadoJato="pronto",o.alt=9.5),x.unidades.push(o),Sp(o,0),o}function Lr(n){n.vivo=!1,n.sombra&&(x.cena.remove(n.sombra),n.sombra=null),n.m&&x.cena.remove(n.m.grupo),n.anel&&(x.cena.remove(n.anel),n.anel=null);let t=x.selecao.indexOf(n);t>=0&&x.selecao.splice(t,1)}function Os(n,t){let e=x.porta;if(e&&e.vivo&&e.tipo==="portaavioes"){let s=n-e.x,r=t-e.z,o=Math.cos(-e.ang),a=Math.sin(-e.ang),c=s*o+r*a,l=-s*a+r*o;if(Math.abs(c)<34&&Math.abs(l)<158)return 9.2}let i=ai(n,t);return i>=0&&Ie[i]>=0?ze[Ie[i]].h:0}function Bs(n,t,e=0){for(let s of x.abrigos||[]){if(!s.vivo||s.construindo>0)continue;let r=s.tipoEstr==="zona"?170:s.tipoEstr==="fob"?110:120;if(Xe(n,t,s.x,s.z)<r*r)return!0}let i=x.porta;return!!(i&&i.vivo&&(e>7||i.aerodromo)&&Xe(n,t,i.x,i.z)<170*170)}function ui(n,t){if(!x.camAlvo)return 0;let e=Math.hypot(n-x.camAlvo.x,t-x.camAlvo.z)+x.camDist*.6;return ln(1-e/1400,0,1)}function xc(n,t,e){x.ruidos.push({x:n,z:t,r:e*(x.noite?1.2:1),t:x.tempo})}function fi(n,t){for(let e of n)!e.vivo||e.estr||e.dentro||(e.ordem=Object.assign({},t),e.alvo=null,e.caminho=null,e.repath=0,e.predio&&(t.tipo==="mover"||t.tipo==="embarcar"||t.tipo==="guarnecer")&&Eo(e))}function di(n,t,e){let i=n.filter(c=>c.vivo&&!c.dentro&&!c.estr);if(!i.length)return;let s=i.filter(c=>c.classe==="jato");for(let c of s)pp(c,t,e);let r=i.filter(c=>c.classe!=="jato"),o=r.length,a=Math.ceil(Math.sqrt(o));r.sort((c,l)=>Xe(c.x,c.z,t,e)-Xe(l.x,l.z,t,e)),r.forEach((c,l)=>{let h=Math.max(4,c.d.raio*2.6),u=(l%a-(a-1)/2)*h,f=(Math.floor(l/a)-(a-1)/2)*h,d=t+u,g=e+f;c.predio&&Eo(c),c.ordem={tipo:"mover",x:d,z:g},c.alvo=null,c.caminho=null,c.repath=0,c.classe==="aereo"&&(c.altAlvo=c.d.altCruz,c.pousado=!1)})}function pp(n,t,e){if(n.estadoJato==="rearmando"){$t(`${n.d.nome} est\xE1 sendo rearmado no porta-avi\xF5es`,n.x,n.z);return}n.ordem={tipo:"ataque",x:t,z:e},n.estadoJato==="pronto"?(n.estadoJato="voando",n.x=x.porta.x+Math.sin(x.porta.ang)*120,n.z=x.porta.z+Math.cos(x.porta.ang)*120,n.ang=Math.atan2(t-n.x,e-n.z),n.alt=12,n.velAtual=n.d.vel*.6,n.m&&(n.m.grupo.visible=!0)):n.estadoJato="voando",n.passe=0}function mp(n,t,e,i,s,r){n.forEach((o,a)=>{if(o.estadoJato==="rearmando"){$t(`${o.d.nome} est\xE1 sendo rearmado no porta-avi\xF5es`,o.x,o.z);return}pp(o,(t+i)/2,(e+s)/2);let c=a%2===1;o.ordem={tipo:"area",ax:c?i:t,az:c?s:e,bx:c?t:i,bz:c?e:s,w:r,fase:"aprox",soltas:0,deslocamento:(a-(n.length-1)/2)*Math.min(25,r/3)}})}function dy(n,t,e){let i=n.d,s=t.bx-t.ax,r=t.bz-t.az,o=Math.max(1,Math.hypot(s,r)),a=s/o,c=r/o,l=-c*t.deslocamento,h=a*t.deslocamento,u,f,d=i.arma==="bomba"?130:80;if(t.fase==="aprox")u=t.ax-a*900+l,f=t.az-c*900+h,d=i.altCruz,Ot(n.x,n.z,u,f)<220&&(t.fase="alinhar");else if(t.fase==="alinhar")u=t.ax+l,f=t.az+h,(Ot(n.x,n.z,u,f)<120||(n.x-t.ax)*a+(n.z-t.az)*c>-30)&&(t.fase="corrida",t.soltas=0);else{u=t.bx+a*500+l,f=t.bz+c*500+h;let g=(n.x-t.ax)*a+(n.z-t.az)*c,v=i.arma==="bomba"?6:10,m=o/v,p=i.arma==="bomba"?n.velAtual*.6*Math.sqrt(2*n.y/9.8)*.5:120;for(;t.soltas<v&&g+p>=t.soltas*m+m/2;){let y=Math.min(o,t.soltas*m+m/2),_=ut(-t.w/2,t.w/2),M=t.ax+a*y-c*_+l*.3,I=t.az+c*y+a*_+h*.3;i.arma==="bomba"?So(n.x,n.y,n.z,M,I,{arma:"bomba",dano:i.dano,splash:i.splash,precisao:1},n):So(n.x,n.y-1,n.z,M,I,{arma:"foguete",dano:i.dano,splash:i.splash,precisao:1,missil:!0},n),t.soltas++,t.soltas===1&&xc(t.ax,t.az,700),Ns(i.arma==="bomba"?"bomba":"foguete",ui(n.x,n.z))}if(g>o+450)if(n.municao--,n.municao<=0)n.estadoJato="voltando",n.ordem=null,$t(`${i.nome} lan\xE7ou toda a carga, voltando ao porta-avi\xF5es`,n.x,n.z);else{let y=t.ax,_=t.az;t.ax=t.bx,t.az=t.bz,t.bx=y,t.bz=_,t.fase="aprox",t.deslocamento=-t.deslocamento}}return{tx:u,tz:f,alt:d}}function pc(n,t,e){let i=t-n.cx,s=e-n.cz,r=Math.hypot(i,s)||1;for(let o=n.raio*.5;o<n.raio+60;o+=Ae*.7)for(let a of[0,.4,-.4,.8,-.8,1.4,-1.4,2.2,-2.2,3.1]){let c=Math.atan2(i/r,s/r)+a,l=n.cx+Math.sin(c)*o,h=n.cz+Math.cos(c)*o;if(Ne(l,h))return{x:l,z:h}}return{x:n.cx,z:n.cz}}function py(n,t){let e=Math.max(4,n.cap),i=t/e*Math.PI*2+.3;for(let s=.7;s>.05;s-=.15){let r=n.cx+Math.sin(i)*n.raio*s,o=n.cz+Math.cos(i)*n.raio*s;if(ao(n,r,o))return{x:r,z:o}}return{x:n.cx+ut(-1,1),z:n.cz+ut(-1,1)}}function my(n,t){let e=n.pts.length/2,i=Math.max(1,Math.floor((n.h-3)/3.4));for(let s=0;s<12;s++){let r=(t*5+s*3+n.id)%e,o=(r+1)%e,a=n.pts[r*2],c=n.pts[r*2+1],l=n.pts[o*2],h=n.pts[o*2+1],u=l-a,f=h-c,d=Math.hypot(u,f);if(d<4)continue;let g=.2+(t*.37+s*.21)%.6,v=-f/d,m=u/d,p=1+(t+s)%Math.min(i,6),y=Math.min(n.h-2.6,p*3.4+.2),_=a+u*g+v*.28,M=c+f*g+m*.28;if(!gy(_+v*3,M+m*3))return{x:_,z:M,y,nx:v,nz:m}}return null}function gy(n,t){let e=ai(n,t);return e>=0&&Ie[e]>=0}function xy(n,t){if(t.guarnicao.length>=t.cap)return $t(`Pr\xE9dio cheio (${t.cap} soldados)`,t.cx,t.cz),!1;t.guarnicao.push(n),n.predio=t;let e=t.guarnicao.length-1,i=t.h>6&&e%2===0?my(t,e):null;if(i)n.x=i.x,n.z=i.z,n.y=i.y,n.janela={nx:i.nx,nz:i.nz,ang:Math.atan2(i.nx,i.nz),quebrou:!1},n.ang=n.janela.ang;else{let s=py(t,e);n.x=s.x,n.z=s.z,n.y=t.h,n.janela=null}return n.ordem=null,n.caminho=null,t.integridade<=0&&(t.integridade=30),t.sos&&t.civis>0&&gp(t,n),!0}function Eo(n){let t=n.predio;if(!t)return;t.guarnicao=t.guarnicao.filter(i=>i!==n);let e=pc(t,n.x+ut(-5,5),n.z+ut(-5,5));n.x=e.x+ut(-2,2),n.z=e.z+ut(-2,2),n.y=0,Ne(n.x,n.z)||(n.x=e.x,n.z=e.z),n.predio=null,n.janela=null}function gp(n,t){if(!n.civis)return;let e=pc(n,t.x,t.z),i=n.civis;for(let s=0;s<i;s++)Eu(e.x+ut(-3,3),e.z+ut(-3,3),t);n.civis=0,n.sos=!1,$t(`${i} civis sa\xEDram do pr\xE9dio e est\xE3o seguindo suas tropas!`,n.cx,n.cz,"bom"),ee("resgate")}function vy(n){return n.classe==="inf"?"inf":n.classe==="veic"?n.d.leve?"leve":"veic":null}function vc(n,t){if(!n.d.carga||n===t)return!1;let e=vy(t);if(!e)return!1;let i=n.d.cargaTipos;return i.includes(e)||e==="leve"&&i.includes("veic")?n.cargaUsada+(t.d.slots||1)<=n.d.carga:!1}function Ur(n){return(n.d.carga||0)-n.cargaUsada}function _y(n){return n.classe==="aereo"?n.pousado:!0}function wu(n,t){if(!vc(t,n))return!1;n.dentro=t,t.passageiros.push(n),t.cargaUsada+=n.d.slots||1,n.predio&&Eo(n),n.m&&(n.m.grupo.visible=!1),n.anel&&(x.cena.remove(n.anel),n.anel=null);let e=x.selecao.indexOf(n);return e>=0&&(x.selecao.splice(e,1),n.sel=!1),n.ordem=null,n.caminho=null,!0}function Ru(n,t){return Ur(t)<1?!1:(n.dentro=t,t.passageiros.push(n),t.cargaUsada+=1,!0)}function Li(n){if(!n.passageiros.length)return;if(n.classe==="aereo"&&!n.pousado){n.ordem={tipo:"pousar",desembarcar:!0};return}let t=Bs(n.x,n.z,n.y),e=0;for(let i of n.passageiros.slice()){if(i.agente&&t)continue;let s=n.x,r=n.z;for(let o=0;o<30;o++){let a=e*.9+o*.5,c=n.d.raio+2+o*.8+e%4,l=n.x+Math.sin(a)*c,h=n.z+Math.cos(a)*c;if(Ne(l,h)){s=l,r=h;break}}e++,n.passageiros.splice(n.passageiros.indexOf(i),1),n.cargaUsada-=i.agente?1:i.d.slots||1,i.dentro=null,i.x=s,i.z=r,i.y=0,i.agente?(i.estado="seguir",i.lider=n,i.espera=6):i.m&&(i.m.grupo.visible=!0)}t&&mc(n)}function mc(n){let t=0;for(let e of n.passageiros.slice())e.agente&&(n.passageiros.splice(n.passageiros.indexOf(e),1),n.cargaUsada-=1,e.vivo=!1,e.resgatado=!0,e.dentro=null,t++);t&&(x.resgatados+=t,x.dinheiro+=t*40,$t(`\u2705 ${t} civis resgatados! (+$${t*40})`,n.x,n.z,"bom"),ee("resgate"))}function Fs(n){return n&&n.vivo&&n.zumbi&&!n.dentro&&n.virando<=0}function gc(n,t,e,i=0){let s=n.x,r=n.z;if(!e){let h=null,u=1/0,f=i*i,d=n.janela;return x.hashA.busca(s,r,t,(g,v)=>{if(g.zumbi&&g.vivo&&!g.dentro&&g.virando<=0&&v<u&&v>=f){if(d&&(g.x-s)*d.nx+(g.z-r)*d.nz<Math.sqrt(v)*.25)return;u=v,h=g}}),h}let o=[],a=i*i;if(x.hashA.busca(s,r,t,(h,u)=>{if(h.zumbi&&h.vivo&&!h.dentro&&u>=a&&(o.push(h),o.length>50))return!0}),!o.length)return null;let c=null,l=0;for(let h=0;h<o.length;h+=o.length>25?2:1){let u=o[h],f=0,d=0;x.hashA.busca(u.x,u.z,e,m=>{!m.vivo||m.dentro||(m.zumbi?f++:d++)});let g=0;if(x.hashU.busca(u.x,u.z,e+4,m=>{m.vivo&&!m.dentro&&m.classe!=="aereo"&&m.classe!=="jato"&&g++}),g>0)continue;let v=f-d*3;v>l&&(l=v,c=u)}return c}function yy(n){if(n.m&&n.m.def.canoZ!==void 0&&n.m.torre){let t=n.ang+n.torreAng,e=n.m.def,i=e.torreZ,s=e.canoZ;return{x:n.x+Math.sin(n.ang)*i+Math.sin(t)*s,y:n.y+e.torreY+e.canoY,z:n.z+Math.cos(n.ang)*i+Math.cos(t)*s}}return n.m&&n.m.def.armaZ?{x:n.x+Math.sin(n.ang)*n.m.def.armaZ,y:n.y+n.m.def.armaY,z:n.z+Math.cos(n.ang)*n.m.def.armaZ}:n.classe==="aereo"?{x:n.x+Math.sin(n.ang)*2,y:n.y+1.5,z:n.z+Math.cos(n.ang)*2}:{x:n.x+Math.sin(n.ang)*.7,y:n.y+1.25,z:n.z+Math.cos(n.ang)*.7}}function dc(n,t,e){let i=yy(n),s=t.x,r=t.z,o=(t.y||0)+1.1,a=Math.hypot(s-n.x,r-n.z),c=x.efeitos,l=ui(n.x,n.z);if(xc(n.x,n.z,fy[e.arma]||150),n.janela&&!n.janela.quebrou){n.janela.quebrou=!0;for(let d=0;d<14;d++)c.particula(n.x,n.y+1.3,n.z,n.janela.nx*ut(1,3)+ut(-1,1),ut(0,2),n.janela.nz*ut(1,3)+ut(-1,1),.18,1.2,[.8,.92,1],[.6,.75,.85],.9,9.8,0);op(l)}if(e.missil||e.arma==="120mm"||e.arco||e.arma==="foguete"){let d=s+ut(-1,1)*(1-e.precisao)*12,g=r+ut(-1,1)*(1-e.precisao)*12;So(i.x,i.y,i.z,d,g,e,n),c.clarao(i.x,i.y,i.z,e.arma==="120mm"?4:2.5);for(let v=0;v<4;v++)c.fumaca(i.x,i.y,i.z,2.5);Ns(e.arma,l);return}let h=e.precisao*(1-a/(e.alcance*1.3)*.4)*(x.noite?.85:1),u=Math.random()<h,f=uy[e.arma]||[1,.85,.4];c.clarao(i.x,i.y,i.z,e.arma==="fuzil"||e.arma==="pistola"?.9:1.5),u?(c.tracante(i.x,i.y,i.z,s,o,r,f),e.splash?vp(s,.5,r,e.splash,e.dano,n,!0):zr(t,e.dano,n)):c.tracante(i.x,i.y,i.z,s+ut(-3,3),o+ut(-1,1),r+ut(-3,3),f),Ns(e.arma,l)}function So(n,t,e,i,s,r,o){let a=Math.hypot(i-n,s-e),c=r.arma==="120mm"?900:r.arco?260:r.arma==="bomba"?0:r.missil?140:200,l={x0:n,y0:t,z0:e,tx:i,tz:s,t:0,x:n,y:t,z:e,dur:r.arma==="bomba"?Math.sqrt(2*Math.max(5,t)/9.8):Math.max(.12,a/c),arco:r.arco?Math.min(400,a*.35):r.missil?Math.min(60,a*.12):r.arma==="foguete"?a*.08:0,dano:r.dano,raio:r.splash||3,arma:r.arma,dono:o,rastro:r.arma!=="120mm",vx:o&&o.classe==="jato"?Math.sin(o.ang)*o.velAtual*.6:0,vz:o&&o.classe==="jato"?Math.cos(o.ang)*o.velAtual*.6:0};r.arma==="bomba"&&(l.tx=n+l.vx*l.dur,l.tz=e+l.vz*l.dur,l.tx=i,l.tz=s),x.projeteis.push(l)}function xp(n){let t=x.efeitos;for(let e=x.projeteis.length-1;e>=0;e--){let i=x.projeteis[e];i.t+=n;let s=Math.min(1,i.t/i.dur),r=i.x,o=i.y,a=i.z;i.x=i.x0+(i.tx-i.x0)*s,i.z=i.z0+(i.tz-i.z0)*s,i.arma==="bomba"?i.y=i.y0*(1-s*s):i.y=i.y0+(.5-i.y0)*s+Math.sin(s*Math.PI)*i.arco,i.rastro&&t.esteira(r,o,a),t.particula(i.x,i.y,i.z,0,0,0,i.arma==="naval"||i.arma==="155mm"?1.2:.9,.05,[1,.9,.6],[1,.6,.2],1),s>=1&&(vp(i.x,.5,i.z,i.raio,i.dano,i.dono,!1),x.projeteis.splice(e,1))}}function vp(n,t,e,i,s,r,o){let a=Rs(n,e)&&Os(n,e)===0;!o||i>2?x.efeitos.explosao(n,t,e,i*.8,a):x.efeitos.particula(n,t,e,0,2,0,i,.3,[1,.8,.3],[.4,.4,.4],1,0,i),i>=6&&lc(ui(n,e),i>=15),xc(n,e,i>=6?500:200);let c=i*i;x.hashA.busca(n,e,i*1.3,(l,h)=>{if(!l.vivo||l.dentro)return;let u=h<c?1-Math.sqrt(h)/i*.6:.25;zr(l,s*u,r)}),x.tremor!==void 0&&i>=10&&(x.tremor=Math.max(x.tremor,Math.min(1,i/30)*ui(n,e)))}function _p(n){for(let t=x.unidades.length-1;t>=0;t--){let e=x.unidades[t];if(!e.vivo){x.unidades.splice(t,1);continue}if(e.estr){Ry(e,n);continue}if(e.dentro){e.x=e.dentro.x,e.z=e.dentro.z,e.y=e.dentro.y,e.dentro.d.cura&&e.hp<e.hpMax&&(e.hp=Math.min(e.hpMax,e.hp+e.dentro.d.cura*n));continue}switch(e.fase+=n*(e.velAtual>.3?e.velAtual*1.6:0),e.mirando>0&&(e.mirando-=n),e.classe){case"inf":My(e,n);break;case"veic":by(e,n);break;case"naval":Sy(e,n);break;case"aereo":Ey(e,n);break;case"jato":Ay(e,n);break}e.classe!=="jato"&&Ty(e,n),e.d.carga&&wy(e,n),Sp(e,n)}}function Cu(n,t){let e=n.ordem;if(!e)return null;if(e.tipo==="mover")return{x:e.x,z:e.z,fim:()=>{n.ordem=null}};if(e.tipo==="atacar"){if(!Fs(e.alvo))return n.ordem=null,null;n.alvo=e.alvo;let i=(n.d.alcance||50)*.85;return Ot(n.x,n.z,e.alvo.x,e.alvo.z)<i?null:{x:e.alvo.x,z:e.alvo.z,dinamico:!0}}if(e.tipo==="guarnecer"){let i=e.predio;return e.e||(e.e=pc(i,n.x,n.z)),Ot(n.x,n.z,e.e.x,e.e.z)<7?(xy(n,i),null):{x:e.e.x,z:e.e.z}}if(e.tipo==="resgatar"){let i=e.predio;return!i.sos||i.civis<=0?(n.ordem=null,null):(e.e||(e.e=pc(i,n.x,n.z)),Ot(n.x,n.z,e.e.x,e.e.z)<9||Ot(n.x,n.z,i.cx,i.cz)<i.raio+12?(gp(i,n),n.ordem=null,null):{x:e.e.x,z:e.e.z})}if(e.tipo==="embarcar"){let i=e.t;return!i.vivo||!vc(i,n)?(n.ordem=null,null):Ot(n.x,n.z,i.x,i.z)<i.d.raio+6?_y(i)?(wu(n,i),null):(i.classe==="aereo"&&(!i.ordem||i.ordem.tipo!=="pousar")&&(i.ordem={tipo:"pousar"}),null):{x:i.x,z:i.z,dinamico:!0}}return null}function Pu(n,t,e,i,s){if(!e){n.velAtual=0;return}let r=Math.max(2.5,n.d.raio*1.5);if(Ot(n.x,n.z,e.x,e.z)<r){n.velAtual=0,n.caminho=null,e.fim&&e.fim();return}if(n.repath-=t,(!n.caminho||e.dinamico||n.caminhoAlvo&&Ot(n.caminhoAlvo.x,n.caminhoAlvo.z,e.x,e.z)>15)&&n.repath<=0)if(x.orcamentoCaminhos<=0){if(n.caminho||(n.velAtual=0),!n.caminho)return}else{let f=x.cacheCam||(x.cacheCam=[]),d=null;for(let g of f)if(g.modo===s&&x.tempo-g.t<4&&Ot(g.sx,g.sz,n.x,n.z)<45&&Ot(g.ex,g.ez,e.x,e.z)<45){d=g;break}if(d?n.caminho=d.pts.slice(0,-1).concat([{x:e.x,z:e.z}]):(x.orcamentoCaminhos--,n.caminho=_u(s,n.x,n.z,e.x,e.z),n.caminho&&(f.push({modo:s,sx:n.x,sz:n.z,ex:e.x,ez:e.z,pts:n.caminho,t:x.tempo}),f.length>20&&f.shift())),n.caminhoAlvo={x:e.x,z:e.z},n.wp=0,n.repath=2.5,!n.caminho){n.ordem=null,n.velAtual=0;return}}if(!n.caminho){n.velAtual=0;return}let o=n.caminho[n.wp];if(!o){n.caminho=null,n.velAtual=0,e.fim?e.fim():n.repath=1.2;return}let a=n.wp===n.caminho.length-1;if(Ot(n.x,n.z,o.x,o.z)<(a?r:Math.max(4,n.d.raio*2))&&(n.wp++,o=n.caminho[n.wp],!o)){n.caminho=null,n.velAtual=0,e.fim?e.fim():n.repath=1.2;return}let c=Math.atan2(o.x-n.x,o.z-n.z),l=n.classe==="inf"?10:n.classe==="naval"?n.d.raio>20?.25:.9:2.2;n.ang=He(n.ang,c,l*t);let h=Math.max(.15,Math.cos(Pi(n.ang,c))),u=i*h;n.velAtual=u,yp(n,Math.sin(n.ang)*u*t,Math.cos(n.ang)*u*t,s)}function bo(n,t,e,i){return i===0?Ne(t,e):i===3?Ne(t,e)||wr(1,t,e):wr(i,t,e)}function yp(n,t,e,i){let s=n.x+t,r=n.z+e;if(bo(n,s,r,i))n.x=s,n.z=r;else if(Math.abs(t)>Math.hypot(t,e)*.25&&bo(n,n.x+t,n.z,i))n.x+=t;else if(Math.abs(e)>Math.hypot(t,e)*.25&&bo(n,n.x,n.z+e,i))n.z+=e;else{let o=!1;for(let a of[.6,-.6,1.2,-1.2]){let c=Math.cos(a),l=Math.sin(a),h=t*c-e*l,u=t*l+e*c;if(bo(n,n.x+h,n.z+u,i)){n.x+=h,n.z+=u,o=!0;break}}o||(n.travado+=.1,n.travado>1.5&&(i===0||i===3)&&(n.x=s,n.z=r))}n.checa=(n.checa||0)+.016,n.checa>1.2&&(n.checa=0,Ot(n.x,n.z,n.ultimaPos.x,n.ultimaPos.z)<1&&n.velAtual>.5?(n.caminho=null,n.repath=0,n.travado++):n.travado=0,n.travado>4&&(n.ordem=null,n.caminho=null,n.travado=0),n.ultimaPos.x=n.x,n.ultimaPos.z=n.z)}function Mp(n,t){x.hashU.busca(n.x,n.z,n.d.raio*2+1,(e,i)=>{if(e===n||!e.vivo||e.dentro||e.predio||e.classe!==n.classe||e.estr)return;let s=n.d.raio+e.d.raio;if(i<s*s&&i>1e-4){let r=Math.sqrt(i),o=(s-r)/r*.5*Math.min(1,t*8),a=(n.x-e.x)*o,c=(n.z-e.z)*o;bo(n,n.x+a,n.z+c,Tu(n))&&(n.x+=a,n.z+=c)}})}function My(n,t){if(x.controlando===n){_c(n,t);return}if(n.predio){n.velAtual=0;return}let e=Cu(n,t);Pu(n,t,e,n.d.vel*(x.noite?.95:1),0),Mp(n,t),n.d.cura&&(n.cura-=t,n.cura<=0&&(n.cura=1,x.hashU.busca(n.x,n.z,14,i=>{i.vivo&&i.classe==="inf"&&!i.dentro&&i.hp<i.hpMax&&(i.hp=Math.min(i.hpMax,i.hp+n.d.cura))})))}function by(n,t){if(x.controlando===n)_c(n,t);else{let e=Cu(n,t);Pu(n,t,e,n.d.vel,0)}Mp(n,t),n.velAtual>3&&(Math.random()<t*4&&x.efeitos.poeira(n.x-Math.sin(n.ang)*n.d.raio,n.z-Math.cos(n.ang)*n.d.raio,1),n.d.raio>=3.4&&(n.tEsm=(n.tEsm||0)-t,n.tEsm<=0&&(n.tEsm=.25,ou(n.x,n.z,n.d.raio+.8)&&(ap(ui(n.x,n.z)),x.efeitos.poeira(n.x,n.z,4)))),n.d.atropela&&x.hashA.busca(n.x,n.z,n.d.raio+.6,e=>{e.vivo&&e.zumbi&&!e.dentro&&zr(e,(e.sub==="bruto"?40:200)*t*n.velAtual/8,n)}))}function Sy(n,t){if(x.controlando===n)_c(n,t);else{let e=Cu(n,t);Pu(n,t,e,n.d.vel,Tu(n))}if(n.velAtual>2&&Math.random()<t*6){let e=n.d.raio*1.2;x.efeitos.particula(n.x-Math.sin(n.ang)*e+ut(-2,2),.4,n.z-Math.cos(n.ang)*e+ut(-2,2),0,.5,0,n.d.raio*.25,2.5,[.95,.97,1],[.7,.8,.9],.5,0,n.d.raio*.15)}n.y=n.tipo==="lcac"?.4:0,n.tipo==="lcac"&&Math.random()<t*5&&x.efeitos.particula(n.x+ut(-8,8),.5,n.z+ut(-8,8),0,1,0,3,1,[.9,.9,.95],[.8,.8,.8],.35,0,3)}function Ey(n,t){let e=n.d,i=n.ordem,s=null;if(x.controlando===n)_c(n,t);else if(i)if(i.tipo==="pousar"){let o=Os(n.x,n.z);if(Rs(n.x,n.z)&&o===0){let c=Rn(0,n.x,n.z);c?n.ordem={tipo:"mover",x:c.x,z:c.z,pousar:!0,desembarcar:i.desembarcar}:n.ordem=null}else n.altAlvo=o,n.y<=o+.3&&(n.pousado=!0,i.desembarcar?(n.ordem=null,Li(n)):n.ordem=null,Bs(n.x,n.z,n.y)&&mc(n))}else if(i.tipo==="mover")s={x:i.x,z:i.z},Ot(n.x,n.z,i.x,i.z)<3&&(i.pousar?n.ordem={tipo:"pousar",desembarcar:i.desembarcar}:n.ordem=null,e.orbita&&(n.orbita={x:i.x,z:i.z}));else if(i.tipo==="resgatar"){let o=i.predio;if(s={x:o.cx,z:o.cz},Ot(n.x,n.z,o.cx,o.cz)<Math.max(4,o.raio*.5)){if(n.altAlvo=o.h+6,s=null,n.y<o.h+9){if(e.carga&&o.civis>0){let a=0;for(;o.civis>0&&Ur(n)>=1;){let c=Eu(o.cx,o.cz,n);Ru(c,n),o.civis--,a++}a&&($t(`\u{1F681} ${a} civis embarcaram pelo telhado!`,o.cx,o.cz,"bom"),ee("resgate")),o.civis<=0?o.sos=!1:$t(`Helic\xF3ptero cheio! Ainda h\xE1 ${o.civis} civis no telhado`,o.cx,o.cz)}n.ordem=null,n.altAlvo=e.altCruz}}else n.altAlvo=Math.max(e.altCruz,o.h+15)}else if(i.tipo==="atacar")Fs(i.alvo)?(n.alvo=i.alvo,Ot(n.x,n.z,i.alvo.x,i.alvo.z)>e.alcance*.7&&(s={x:i.alvo.x,z:i.alvo.z})):n.ordem=null;else if(i.tipo==="pousarPorta"){let o=x.porta;s={x:o.x+Math.sin(o.ang)*i.k,z:o.z+Math.cos(o.ang)*i.k},Ot(n.x,n.z,s.x,s.z)<4&&(n.ordem={tipo:"pousar",desembarcar:!1},s=null)}else i.tipo==="embarcar"&&(n.ordem=null);if(e.orbita&&!s&&n.orbita&&!(i&&i.tipo==="pousar")&&(n.orbAng=(n.orbAng||0)+t*e.vel/e.orbita,s={x:n.orbita.x+Math.sin(n.orbAng)*e.orbita,z:n.orbita.z+Math.cos(n.orbAng)*e.orbita}),s){n.pousado&&(n.pousado=!1),n.altAlvo<e.altCruz*.6&&!(i&&i.tipo==="resgatar")&&(n.altAlvo=e.altCruz);let o=n.y<Math.min(n.altAlvo,Os(n.x,n.z)+12)-1,a=Math.atan2(s.x-n.x,s.z-n.z);n.ang=He(n.ang,a,(e.orbita?.8:2)*t);let c=Ot(n.x,n.z,s.x,s.z),l=(o?e.vel*.15:e.vel)*Math.min(1,c/40+.15)*Math.max(.2,Math.cos(Pi(n.ang,a)));n.velAtual+=(l-n.velAtual)*Math.min(1,t*1.5),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t}else x.controlando!==n&&(n.velAtual*=Math.max(0,1-t*2),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t);let r=Os(n.x,n.z);if(n.pousado)n.y=r;else{let o=n.altAlvo;(s||i&&i.tipo!=="pousar")&&(o=Math.max(o,r+(i&&i.tipo==="resgatar"&&!s?4:10))),n.y+=ln(o-n.y,-8*t,10*t),n.y<r&&(n.y=r)}n.alt=n.y,x.hashU.busca(n.x,n.z,30,(o,a)=>{if(o===n||o.classe!=="aereo"||!o.vivo||o.dentro)return;let c=(n.d.raio+o.d.raio)*1.1;if(a<c*c&&a>.01&&!n.pousado){let l=Math.sqrt(a),h=(c-l)/l*t*2;n.x+=(n.x-o.x)*h,n.z+=(n.z-o.z)*h}})}function Ay(n,t){var h,u;let e=n.d,i=x.porta;if(n.estadoJato==="pronto"||n.estadoJato==="rearmando"){let f=(h=n.vagaConves)!=null?h:0,d=-24+f%2*10,g=40+f*22,v=Math.cos(i.ang),m=Math.sin(i.ang);n.x=i.x+d*v+g*m,n.z=i.z-d*m+g*v,n.y=((u=i.deck)!=null?u:9.2)+.2,n.ang=i.ang+Math.PI*.75,n.velAtual=0,n.estadoJato==="rearmando"&&(n.rearme-=t,n.rearme<=0&&(n.estadoJato="pronto",n.municao=e.municao,n.hp=n.hpMax,$t(`${e.nome} rearmado e pronto no porta-avi\xF5es`,n.x,n.z)));return}let s=n.ordem,r,o,a=e.altCruz;if(n.estadoJato==="voltando"||!s){if(r=i.x-Math.sin(i.ang)*200,o=i.z-Math.cos(i.ang)*200,n.estadoJato="voltando",Ot(n.x,n.z,i.x,i.z)<320&&(a=40),Ot(n.x,n.z,r,o)<120||Ot(n.x,n.z,i.x,i.z)<140){n.estadoJato="rearmando",n.rearme=18,n.ordem=null;return}}else if(s.tipo==="area"){let f=dy(n,s,t);r=f.tx,o=f.tz,a=f.alt}else{r=s.x,o=s.z;let f=Ot(n.x,n.z,r,o);f<600&&(a=e.arma==="bomba"?120:70);let d=Math.atan2(r-n.x,o-n.z);if(f<(e.arma==="bomba"?330:380)&&Math.abs(Pi(n.ang,d))<.25&&!n.lancou){let g=gc({x:r,z:o},160,e.splash);if(!g)n.lancou=!0,n.passe=(n.passe||0)+1,n.passe>=3&&(n.estadoJato="voltando",$t(`${e.nome}: nenhum alvo no local, voltando`,n.x,n.z));else if(e.arma==="bomba")for(let v=0;v<2;v++)So(n.x,n.y,n.z,g.x+ut(-6,6)+v*Math.sin(n.ang)*14,g.z+ut(-6,6)+v*Math.cos(n.ang)*14,{arma:"bomba",dano:e.dano,splash:e.splash,precisao:1},n);else for(let v=0;v<e.rajada;v++){let m=g.x+ut(-12,12),p=g.z+ut(-12,12);So(n.x+ut(-1,1),n.y-1,n.z+ut(-1,1),m,p,{arma:"foguete",dano:e.dano,splash:e.splash,precisao:1,missil:!0},n)}g&&(Ns("foguete",ui(n.x,n.z)),n.municao--,n.lancou=!0,xc(r,o,600))}n.lancou&&f>700&&(n.lancou=!1,n.municao<=0&&(n.estadoJato="voltando",$t(`${e.nome} sem muni\xE7\xE3o, voltando ao porta-avi\xF5es`,n.x,n.z)))}let c=Math.atan2(r-n.x,o-n.z),l=n.ang;n.ang=He(n.ang,c,.9*t),n.banco=ln(Pi(l,n.ang)/t*.8,-1.1,1.1),n.velAtual+=(e.vel-n.velAtual)*Math.min(1,t*.8),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t,n.y+=ln(a-n.y,-40*t,40*t),Math.random()<t*30&&x.efeitos.particula(n.x-Math.sin(n.ang)*9,n.y+.9,n.z-Math.cos(n.ang)*9,0,0,0,1.2,.5,[.8,.8,.8],[.6,.6,.6],.25,0,2)}function _c(n,t){let e=x.joy||{x:0,z:0},i=Math.hypot(e.x,e.z),s=n.d.vel*(n.classe==="inf"?1.2:1);if(i>.1){let r=Math.atan2(e.x,e.z);n.classe==="aereo"?(n.ang=He(n.ang,r,3*t),n.velAtual=s*Math.min(1,i),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t,n.pousado=!1,n.altAlvo<15&&(n.altAlvo=n.d.altCruz)):(n.ang=He(n.ang,r,(n.classe==="inf"?12:2.5)*t),n.velAtual=s*Math.min(1,i)*Math.max(.2,Math.cos(Pi(n.ang,r))),yp(n,Math.sin(n.ang)*n.velAtual*t,Math.cos(n.ang)*n.velAtual*t,Tu(n)))}else n.velAtual=0;n.ordem=null,n.caminho=null}function Ty(n,t){let e=n.d;if(!e.arma&&!e.sec||n.classe==="inf"&&n.velAtual>.5&&x.controlando!==n||n.classe==="aereo"&&n.pousado)return;n.busca-=t,n.cd-=t,n.cd2-=t,n.recarga>0&&(n.recarga-=t,n.recarga<=0&&(n.salva=e.salva));let i=n.predio?1.3:1;n.busca<=0&&(n.busca=.35+Math.random()*.2,n.ordem&&n.ordem.tipo==="atacar"&&Fs(n.ordem.alvo)||(!Fs(n.alvo)||Ot(n.x,n.z,n.alvo.x,n.alvo.z)>e.alcance*i)&&(n.alvo=gc(n,e.alcance*i,e.splash&&e.splash>=8?e.splash:0,e.minAlc||0)),e.sec&&(n.alvo2=gc(n,e.sec.alcance,e.sec.splash?e.sec.splash:0)));let s=n.alvo;if(Fs(s)&&e.arma){let r=Ot(n.x,n.z,s.x,s.z),o=Math.atan2(s.x-n.x,s.z-n.z);n.m&&n.m.torre?n.torreAng=He(n.torreAng,Pi(n.ang,o),3*t):n.janela?n.ang=He(n.ang,n.janela.ang+Math.max(-1.1,Math.min(1.1,Pi(n.janela.ang,o))),8*t):n.classe==="inf"&&n.velAtual<.5?n.ang=He(n.ang,o,8*t):n.classe==="aereo"&&!n.ordem&&n.velAtual<5&&(n.ang=He(n.ang,o,2*t)),n.cd<=0&&r<=e.alcance*i&&r>=(e.minAlc||0)&&(e.salva?n.salva>0&&(dc(n,s,e),n.salva--,n.cd=e.cadencia,n.salva<=0&&(n.recarga=e.recarga)):(dc(n,s,e),n.cd=e.cadencia*ut(.85,1.15)),n.mirando=.6)}else n.m&&n.m.torre&&(n.torreAng=He(n.torreAng,0,.8*t));e.sec&&Fs(n.alvo2)&&n.cd2<=0&&(!e.sec.splash||x.hashA.contar(n.alvo2.x,n.alvo2.z,e.sec.splash,r=>r.zumbi&&r.vivo)>=3||n.alvo2.sub==="bruto")&&(dc(n,n.alvo2,e.sec),n.cd2=e.sec.cadencia*ut(.9,1.1))}function wy(n,t){n.passageiros.length&&Bs(n.x,n.z,n.y)&&(n.classe!=="aereo"||n.pousado)&&n.passageiros.some(e=>e.agente)&&mc(n),n.classe==="naval"&&n.passageiros.length&&x.porta&&Ot(n.x,n.z,x.porta.x,x.porta.z)<200&&mc(n)}function Ry(n,t){if(n.construindo>0){n.construindo-=t;let e=1-Math.max(0,n.construindo)/n.tempoObra;n.m.grupo.scale.y=.15+.85*e,n.hp=Math.max(n.hp,n.hpMax*(.2+.8*e)),Math.random()<t*3&&x.efeitos.poeira(n.x+ut(-n.d.raio,n.d.raio)*.5,n.z+ut(-n.d.raio,n.d.raio)*.5,1),n.construindo<=0&&(n.m.grupo.scale.y=1,$t(`\u{1F3D7}\uFE0F ${n.d.nome} constru\xEDdo!`,n.x,n.z,"bom"),ee("ok"));return}if(n.d.arma&&(n.busca-=t,n.cd-=t,n.busca<=0&&(n.busca=.4,n.alvo=gc(n,n.d.alcance,0)),Fs(n.alvo)&&n.cd<=0&&(dc({...n,y:11,m:null,classe:"estr"},n.alvo,n.d),n.cd=n.d.cadencia)),n.fila&&n.fila.length){let e=n.fila[0];e.t-=t,e.t<=0&&(n.fila.shift(),x.produzir(e.tipo,n))}}function bp(n,t,e){n.vivo&&(n.classe==="inf"&&n.predio&&n.predio.integridade>0||(n.hp-=t,n.classe==="inf"&&Math.random()<.3&&x.efeitos.sangue(n.x,n.y+1.2,n.z,3),n.hp<=0&&Cy(n,e)))}function Cy(n,t){if(n.vivo){if(x.perdas+=n.estr||n.policia?0:1,n.estr){x.efeitos.explosao(n.x,5,n.z,18),lc(ui(n.x,n.z)),$t(`\u{1F4A5} ${n.d.nome} foi destru\xEDdo!`,n.x,n.z,"ruim"),Lr(n),n.tipoEstr==="qg"&&x.derrota&&x.derrota("O Quartel-General foi destru\xEDdo pelos zumbis.");return}n.predio&&(n.predio.guarnicao=n.predio.guarnicao.filter(e=>e!==n));for(let e of n.passageiros.slice())(n.classe==="aereo"&&n.y>8||n.classe==="naval")&&(e.agente?(e.vivo=!1,x.civisMortos++):(e.vivo=!1,Lr(e),x.perdas++));!(n.classe==="aereo"&&n.y>8)&&n.classe!=="naval"&&(n.pousado=!0,Li(n)),n.classe==="inf"?(t&&x.virarZumbi(n),$t(n.policia?t?"\u2623\uFE0F Um policial da SWAT foi mordido!":"Policial da SWAT abatido":t?"\u2623\uFE0F Um soldado foi mordido e virou zumbi!":"Soldado abatido",n.x,n.z,"ruim")):(x.efeitos.explosao(n.x,n.y+1,n.z,n.d.raio*2.5,Rs(n.x,n.z)),lc(ui(n.x,n.z)),$t(`\u{1F4A5} ${n.d.nome} destru\xEDdo`,n.x,n.z,"ruim")),Lr(n)}}var fc=new Fe;function Sp(n,t){if(n.anel&&(n.anel.position.set(n.x,(n.classe==="aereo"||n.classe==="jato"?Os(n.x,n.z):n.y)+.35,n.z),n.anel.visible=!n.dentro),!n.m)return;let e=n.m.grupo;if(e.position.set(n.x,n.y,n.z),n.classe==="aereo"||n.classe==="jato"){let r=n.classe==="jato"?.05:ln(n.velAtual/n.d.vel,-1,1)*.18;fc.set(r,n.ang,n.classe==="jato"?-(n.banco||0):0,"YXZ"),e.rotation.copy(fc)}else n.classe==="naval"&&n.d.raio<20?(fc.set(-Math.min(.06,n.velAtual*.004)+Math.sin(x.tempo*1.3+n.id)*.015,n.ang,Math.sin(x.tempo*.9+n.id)*.02,"YXZ"),e.rotation.copy(fc)):e.rotation.set(0,n.ang,0);if(n.m.torre&&(n.m.torre.rotation.y=n.torreAng),n.m.chamas){let r=n.estadoJato==="voando"||n.estadoJato==="voltando",o=r?.8+Math.random()*.4:0;for(let a of n.m.chamas)a.visible=r,a.scale.set(1,1,o)}if(n.classe==="aereo"||n.classe==="jato"){if(!n.sombra){let c=new Na(1,16).rotateX(-Math.PI/2);n.sombra=new le(c,new Ln({color:0,transparent:!0,opacity:.28,depthWrite:!1})),n.sombra.renderOrder=2,x.cena.add(n.sombra)}let r=Os(n.x,n.z),o=n.y-r,a=x.dirSol||{x:-.5,y:.8,z:.4};n.sombra.visible=o>2&&!n.dentro&&!(n.classe==="jato"&&n.estadoJato!=="voando"&&n.estadoJato!=="voltando"),n.sombra.position.set(n.x-a.x/a.y*o,r+.3,n.z-a.z/a.y*o),n.sombra.scale.set(n.d.raio*.7,1,n.d.raio*1),n.sombra.rotation.y=n.ang}let i=n.classe==="aereo"&&!(n.pousado&&n.y===Os(n.x,n.z)&&!n.ordem&&n.velAtual<.1&&n.parado>3);n.classe==="aereo"&&(n.parado=n.pousado?(n.parado||0)+t:0);let s=i?28:0;if(n.m.rotor&&(n.m.rotor.rotation.y+=s*t),n.m.rotor2&&(n.m.rotor2.rotation.y-=s*t),n.m.cauda&&(n.m.cauda.rotation.x+=s*2*t),n.m.helice&&(n.m.helice.rotation.y+=40*t),n.m.naceles){let r=n.velAtual>40?Math.PI/2:0;for(let o of n.m.naceles)o.piv.rotation.x+=(r-o.piv.rotation.x)*Math.min(1,t),o.ro.rotation.y+=s*t}}function Mn(n,t){n.sel=t,t&&!n.anel&&n.classe!=="inf"?(n.anel=sp(Math.max(1.2,n.d.raio*1.2)),x.cena.add(n.anel)):!t&&n.anel&&(x.cena.remove(n.anel),n.anel=null)}var yc=new Ga,Ep=new Xn(new U(0,1,0),0),Ao=new U,Mc=new at,bc=class{constructor(t){this.cam=t,this.alvo={x:0,z:0},this.dist=700,this.yaw=.35,this.inclExtra=0,this.seguir=null,this.tremor=0}pitch(){let t=ln((Math.log(this.dist)-Math.log(25))/(Math.log(6e3)-Math.log(25)),0,1);return ln(Gd(.42,1.25,t)+this.inclExtra,.2,1.45)}aplicar(t){if(this.seguir){let c=this.seguir;c.vivo?(this.alvo.x+=(c.x-this.alvo.x)*Math.min(1,t*6),this.alvo.z+=(c.z-this.alvo.z)*Math.min(1,t*6)):this.seguir=null}this.alvo.x=ln(this.alvo.x,-2e3,Oe+2e3),this.alvo.z=ln(this.alvo.z,-2e3,Be+2e3);let e=this.pitch(),i=this.seguir&&this.seguir.y||0,s=this.cam,r=0,o=0;x.tremor>.01&&(r=(Math.random()-.5)*x.tremor*3,o=(Math.random()-.5)*x.tremor*3,x.tremor*=Math.max(0,1-t*5)),s.position.set(this.alvo.x+Math.sin(this.yaw)*Math.cos(e)*this.dist+r,i+Math.sin(e)*this.dist,this.alvo.z+Math.cos(this.yaw)*Math.cos(e)*this.dist+o);let a=0;for(let c of[1,.85,.7]){let l=this.alvo.x+(s.position.x-this.alvo.x)*c,h=this.alvo.z+(s.position.z-this.alvo.z)*c;for(let[u,f]of[[0,0],[4,0],[-4,0],[0,4],[0,-4]]){let d=Cs(l+u,h+f);d&&d.h>a&&(a=d.h)}}s.position.y<a+6&&(s.position.y=a+6),s.lookAt(this.alvo.x,i,this.alvo.z),s.near=Math.max(.5,this.dist*.01),s.far=Math.max(12e3,this.dist*6),s.updateProjectionMatrix(),x.camAlvo=this.alvo,x.camDist=this.dist}chao(t,e,i=0){Mc.set(t/innerWidth*2-1,-(e/innerHeight)*2+1),yc.setFromCamera(Mc,this.cam),Ep.constant=-i;let s=yc.ray.intersectPlane(Ep,Ao);return s?{x:s.x,z:s.z}:null}irPara(t,e,i){this.alvo.x=t,this.alvo.z=e,i&&(this.dist=i),this.seguir=null}};function rn(n,t,e,i){return Ao.set(n,t,e).project(i),Ao.z>1?null:{x:(Ao.x+1)/2*innerWidth,y:(1-Ao.y)/2*innerHeight}}function Tp(n,t){let e=new Map,i=null,s=null,r=null,o=null,a={t:0,u:null};x.modoCaixa=!1,n.addEventListener("contextmenu",h=>h.preventDefault()),n.addEventListener("pointerdown",h=>{if(zi(),n.setPointerCapture(h.pointerId),e.set(h.pointerId,{x:h.clientX,y:h.clientY,x0:h.clientX,y0:h.clientY,t0:performance.now(),botao:h.button}),e.size===1){let u=t.chao(h.clientX,h.clientY);if(i={ch:u,moveu:!1,girar:h.button===2},x.modoArea&&h.button!==2&&u&&x.selecao.some(f=>f.classe==="jato")){x.area={x0:u.x,z0:u.z,x1:u.x,z1:u.z};return}x.modoCaixa||h.shiftKey?o={x0:h.clientX,y0:h.clientY,x1:h.clientX,y1:h.clientY}:(clearTimeout(r),r=setTimeout(()=>{let f=e.values().next().value;f&&e.size===1&&Math.hypot(f.x-f.x0,f.y-f.y0)<12&&(o={x0:f.x0,y0:f.y0,x1:f.x,y1:f.y},navigator.vibrate&&navigator.vibrate(25))},450))}else if(e.size===2){clearTimeout(r),o=null;let[u,f]=[...e.values()];s={d:Math.hypot(u.x-f.x,u.y-f.y),ang:Math.atan2(f.y-u.y,f.x-u.x),mx:(u.x+f.x)/2,my:(u.y+f.y)/2,dist:t.dist,yaw:t.yaw},i=null}}),n.addEventListener("pointermove",h=>{let u=e.get(h.pointerId);if(u){if(u.x=h.clientX,u.y=h.clientY,x.area&&e.size===1){let f=t.chao(u.x,u.y);f&&(x.area.x1=f.x,x.area.z1=f.z),Math.hypot(u.x-u.x0,u.y-u.y0)>10&&i&&(i.moveu=!0);return}if(o&&e.size===1){o.x1=u.x,o.y1=u.y,x.caixa=o;return}if(e.size===1&&i){if(Math.hypot(u.x-u.x0,u.y-u.y0)>10&&(i.moveu=!0,clearTimeout(r)),!i.moveu)return;if(i.girar){t.yaw-=h.movementX*.006,t.inclExtra=ln(t.inclExtra-h.movementY*.004,-.3,.3);return}t.seguir=null;let f=t.chao(u.x,u.y);f&&i.ch&&(t.alvo.x+=i.ch.x-f.x,t.alvo.z+=i.ch.z-f.z,t.aplicar(0),i.ch=t.chao(u.x,u.y))}else if(e.size===2&&s){let[f,d]=[...e.values()],g=Math.hypot(f.x-d.x,f.y-d.y),v=Math.atan2(d.y-f.y,d.x-f.x);t.dist=ln(s.dist*s.d/Math.max(10,g),25,6e3),t.yaw=s.yaw-(v-s.ang);let m=(f.x+d.x)/2,y=(f.y+d.y)/2-s.my;Math.abs(g-s.d)<40&&(t.inclExtra=ln(t.inclExtra+(y-(s.ultDy||0))*.003,-.3,.3)),s.ultDy=y}}});let c=h=>{let u=e.get(h.pointerId);if(clearTimeout(r),!!u){if(e.delete(h.pointerId),x.area){let f=x.area;x.area=null;let d=Math.hypot(f.x1-f.x0,f.z1-f.z0),g=x.selecao.filter(v=>v.classe==="jato"&&v.vivo);if(d>25&&g.length){let v=Math.max(40,Math.min(160,d*.35));mp(g,f.x0,f.z0,f.x1,f.z1,v),x.areaMarcada={...f,w:v,t:performance.now()},x.ui&&x.ui.alerta(`\u{1F3AF} \xC1rea de bombardeio marcada (${Math.round(d)} m). ${g.length>1?g.length+" jatos":"Jato"} a caminho!`,(f.x0+f.x1)/2,(f.z0+f.z1)/2,"info"),ee("ok"),e.size===0&&(s=null,i=null);return}}if(o){Py(o,t,h.shiftKey),o=null,x.caixa=null,x.modoCaixa&&x.ui&&x.ui.modoCaixa(!1);return}if(e.size===0&&i&&!i.moveu&&!s)if(h.button===2)x.selecao.slice().forEach(f=>Mn(f,!1)),x.selecao=[],x.ui&&x.ui.atualizarSelecao();else{let f=performance.now();Ly(u.x,u.y,t,f-a.t<330,a),a.t=f}e.size===0&&(s=null,i=null)}};n.addEventListener("pointerup",c),n.addEventListener("pointercancel",c),n.addEventListener("wheel",h=>{h.preventDefault(),t.dist=ln(t.dist*Math.exp(h.deltaY*.0012),25,6e3)},{passive:!1});let l=new Set;addEventListener("keydown",h=>{l.add(h.key.toLowerCase()),h.key===" "&&(x.pausado=!x.pausado,x.ui&&x.ui.atualizarTopo()),h.key==="Escape"&&(x.selecao.slice().forEach(u=>Mn(u,!1)),x.selecao=[],x.ui&&x.ui.atualizarSelecao())}),addEventListener("keyup",h=>l.delete(h.key.toLowerCase())),x.teclado=h=>{let u=0,f=0;if(x.controlando){let d={x:0,z:0};(l.has("w")||l.has("arrowup"))&&(d.z-=1),(l.has("s")||l.has("arrowdown"))&&(d.z+=1),(l.has("a")||l.has("arrowleft"))&&(d.x-=1),(l.has("d")||l.has("arrowright"))&&(d.x+=1),d.x||d.z?x.joyTeclado=d:x.joyTeclado=null;return}if((l.has("w")||l.has("arrowup"))&&(f-=1),(l.has("s")||l.has("arrowdown"))&&(f+=1),(l.has("a")||l.has("arrowleft"))&&(u-=1),(l.has("d")||l.has("arrowright"))&&(u+=1),l.has("q")&&(t.yaw+=h*1.5),l.has("e")&&(t.yaw-=h*1.5),u||f){let d=t.dist*1.2*h,g=Math.sin(t.yaw),v=Math.cos(t.yaw);t.alvo.x+=(u*v+f*g)*d,t.alvo.z+=(-u*g+f*v)*d,t.seguir=null}}}function Sc(){let n=x.selecao.length&&x.selecao.every(t=>t.classe==="jato");n&&!x.modoArea&&x.ui&&x.ui.alerta("\u{1F3AF} Arraste o dedo no mapa para marcar a \xE1rea que os jatos v\xE3o bombardear (ou toque num ponto)",null,null,"info"),x.modoArea=!!n}function Py(n,t,e){let i=Math.min(n.x0,n.x1),s=Math.max(n.x0,n.x1),r=Math.min(n.y0,n.y1),o=Math.max(n.y0,n.y1);e||(x.selecao.slice().forEach(c=>Mn(c,!1)),x.selecao=[]);let a=[];for(let c of x.unidades){if(!c.vivo||c.estr||c.dentro||c.tipo==="portaavioes"||c.policia)continue;let l=rn(c.x,c.y+1,c.z,t.cam);l&&l.x>=i&&l.x<=s&&l.y>=r&&l.y<=o&&a.push(c)}for(let c of a)x.selecao.includes(c)||(x.selecao.push(c),Mn(c,!0));a.length&&ee("clique"),Sc(),x.ui&&x.ui.atualizarSelecao()}function Iy(n,t,e,i){let s=null,r=1/0;for(let o of x.unidades){if(!o.vivo||o.dentro||o.policia||i&&!i(o))continue;let a=rn(o.x,o.y+(o.classe==="inf"?1:(o.d.raio||2)*.4),o.z,e);if(!a)continue;let c=rn(o.x+(o.d.raio||1)*Math.cos(x.cam.yaw),o.y,o.z-(o.d.raio||1)*Math.sin(x.cam.yaw),e),l=c?Math.hypot(c.x-a.x,c.y-a.y):0,h=Math.max(26,l*1.1),u=Math.hypot(a.x-n,a.y-t);u<h&&u-l*.5<r&&(r=u-l*.5,s=o)}return s}function zy(n,t,e){let i=x.cam.chao(n,t);if(!i)return null;let s=Math.max(6,x.cam.dist*.03),r=null,o=1/0;return x.hashA.busca(i.x,i.z,s,(a,c)=>{a.zumbi&&a.vivo&&a.estado!=="morto"&&c<o&&(o=c,r=a)}),r}function Ap(n,t,e){Mc.set(n/innerWidth*2-1,-(t/innerHeight)*2+1),yc.setFromCamera(Mc,e);let i=yc.intersectObjects(x.malhasPredios||[],!1);if(i.length){let r=i[0],o=r.face?r.face.normal:{x:0,y:1,z:0},a=Cs(r.point.x-o.x*.6,r.point.z-o.z*.6);if(a)return a}let s=x.cam.chao(n,t);if(s){let r=Cs(s.x,s.z);if(r)return r}return null}function Ly(n,t,e,i,s){let r=e.cam;if(x.construindo){let u=e.chao(n,t);u&&x.construir(x.construindo,u.x,u.z)&&(x.construindo=null,x.ui.atualizarConstrucao());return}let o=x.selecao.filter(u=>u.vivo&&!u.dentro);x.selecao=o;let a=Iy(n,t,r);if(a&&!a.estr){let u=o.filter(f=>f!==a&&vc(a,f));if(o.length&&a.d.carga&&u.length&&!o.includes(a)){fi(u,{tipo:"embarcar",t:a}),a.classe==="aereo"&&!a.pousado&&(a.ordem={tipo:"pousar"}),x.ui.ping(a.x,a.z,"embarque"),ee("ok");return}if(a.tipo==="portaavioes"&&o.length&&o.some(f=>f.classe==="aereo")){let f=-120;for(let g of o)g.classe==="aereo"&&(g.ordem={tipo:"pousarPorta",k:f},g.altAlvo=g.d.altCruz,f+=30);let d=o.filter(g=>g.classe==="naval");d.length&&di(d,a.x+120,a.z),x.ui.ping(a.x,a.z,"mover"),ee("ok");return}if(i&&s.u===a)for(let f of x.unidades){if(f.tipo!==a.tipo||!f.vivo||f.dentro||x.selecao.includes(f))continue;let d=rn(f.x,f.y,f.z,r);d&&d.x>0&&d.y>0&&d.x<innerWidth&&d.y<innerHeight&&(x.selecao.push(f),Mn(f,!0))}else x.selecaoMultipla?x.selecao.includes(a)?(x.selecao.splice(x.selecao.indexOf(a),1),Mn(a,!1)):(x.selecao.push(a),Mn(a,!0)):(x.selecao.slice().forEach(f=>Mn(f,!1)),x.selecao=[a],Mn(a,!0));s.u=a,ee("clique"),Sc(),x.ui.atualizarSelecao();return}if(a&&a.estr&&!o.length){x.fonteSel=a,["quartel","patio","heliporto","docas"].includes(a.tipoEstr)?x.ui.abrirProducao(a.tipoEstr):x.ui.alerta(`${a.d.nome}${a.construindo>0?" (em constru\xE7\xE3o)":""}`,a.x,a.z,"info");return}if(!o.length){let u=Ap(n,t,r);u&&x.ui.infoPredio(u);return}let c=zy(n,t,r);if(c){let u=o.filter(d=>d.d.arma&&d.classe!=="jato");fi(u,{tipo:"atacar",alvo:c});let f=o.filter(d=>d.classe==="jato");f.length&&di(f,c.x,c.z),x.ui.ping(c.x,c.z,"atacar"),ee("ok");return}let l=Ap(n,t,r);if(l){let u=o.filter(g=>g.classe==="inf"),f=o.filter(g=>g.classe==="aereo"),d=o.filter(g=>g.classe!=="inf"&&g.classe!=="aereo");if(l.civis>0){fi(o.filter(v=>v.classe==="inf"||v.classe==="veic"),{tipo:"resgatar",predio:l}),fi(f.filter(v=>v.d.carga),{tipo:"resgatar",predio:l});let g=f.filter(v=>!v.d.carga).concat(d.filter(v=>v.classe!=="veic"));g.length&&di(g,l.cx,l.cz),x.ui.ping(l.cx,l.cz,"resgate")}else{u.length&&fi(u,{tipo:"guarnecer",predio:l});let g=f.concat(d);g.length&&di(g,l.cx,l.cz),x.ui.ping(l.cx,l.cz,u.length?"guarnecer":"mover")}ee("ok");return}let h=e.chao(n,t);h&&(di(o,h.x,h.z),x.ui.ping(h.x,h.z,o.some(u=>u.classe==="jato")&&o.every(u=>u.classe==="jato")?"atacar":"mover"),ee("ok"))}var Uy=(_e.delegacias||[]).map(([n,t,e])=>({nome:n,x:t*_e.mpp,z:e*_e.mpp})),Dy=4,To=[];x.equipes=To;function Ny(n){return Ne(n.x,n.z)?n:Rn(0,n.x,n.z)||n}function zu(n,t,e){if(x.policiaDesistiu||To.filter(c=>c.vivo).length>=Dy)return;let i=Uy.slice().sort((c,l)=>Ot(c.x,c.z,n,t)-Ot(l.x,l.z,n,t))[0],s=Ny(i),r=$e("bearcat",s.x,s.z,0);r.policia=!0;let o=[];for(let c=0;c<6;c++){let l=$e("swat",s.x+ut(-3,3),s.z+ut(-3,3),0);l.policia=!0,wu(l,r),o.push(l)}let a={van:r,oficiais:o,alvo:{x:n,z:t},estado:"indo",t:0,calmo:0,vivo:!0,id:To.length+1};To.push(a),r.ordem={tipo:"mover",x:n,z:t},$t(`\u{1F693} SWAT da ${i.nome} a caminho de ${e||"um foco de infec\xE7\xE3o"}`,s.x,s.z,"info"),ee("sirene")}function wp(n,t,e){return x.hashA?x.hashA.contar(n,t,e,i=>i.zumbi&&i.vivo&&i.estado!=="morto"):0}function Rp(n,t,e){let i=null,s=e*e;for(let r of x.agentes){if(!r.zumbi||!r.vivo||r.dentro||r.estado==="morto")continue;let o=(r.x-n)**2+(r.z-t)**2;o<s&&(s=o,i=r)}return i}var Iu=0;function Cp(n){if(Iu-=n,!(Iu>0)){Iu=1;for(let t of To){if(!t.vivo)continue;t.oficiais=t.oficiais.filter(a=>a.vivo);let e=t.van.vivo?t.van:null;if(!e&&!t.oficiais.length){t.vivo=!1,$t("\u2620\uFE0F Uma equipe da SWAT foi perdida",t.alvo.x,t.alvo.z,"ruim");continue}t.t+=1;let i=t.oficiais.filter(a=>!a.dentro),s=i.length?{x:i.reduce((a,c)=>a+c.x,0)/i.length,z:i.reduce((a,c)=>a+c.z,0)/i.length}:e||t.oficiais[0];if(e){let a=e.passageiros.filter(c=>c.agente).length;if(t.estado!=="evacuar"&&a>0&&(Ur(e)<1||a>=4&&wp(e.x,e.z,60)===0&&t.t>20)){t.estado="evacuar";let c=(x.abrigos||[]).filter(l=>l.vivo&&!(l.construindo>0)).sort((l,h)=>Ot(l.x,l.z,e.x,e.z)-Ot(h.x,h.z,e.x,e.z))[0]||x.estr.zona;e.ordem={tipo:"mover",x:c.x,z:c.z},$t(`\u{1F693} Blindado da SWAT levando ${a} civis para a zona segura`,e.x,e.z,"bom")}if(t.estado==="evacuar"){e.passageiros.some(c=>c.agente)?Bs(e.x,e.z,0)&&!e.ordem&&Li(e):(t.estado="voltar",e.ordem={tipo:"mover",x:t.alvo.x,z:t.alvo.z});continue}if(t.estado==="voltar"){(Ot(e.x,e.z,t.alvo.x,t.alvo.z)<80||!e.ordem)&&(t.estado="combate");continue}}if(wp(t.alvo.x,t.alvo.z,140)===0?t.calmo++:t.calmo=0,t.calmo>12){let a=Rp(s.x,s.z,3500);a&&(t.alvo={x:a.x,z:a.z},t.calmo=0,t.estado="indo")}let o=Ot(s.x,s.z,t.alvo.x,t.alvo.z)>320;if(e&&o&&t.estado!=="indo"){t.estado="indo";let a=t.oficiais.filter(c=>!c.dentro);a.length&&fi(a,{tipo:"embarcar",t:e})}if(t.estado==="indo"&&e){let a=t.oficiais.filter(c=>!c.dentro);if(a.length&&t.t%30!==0&&a.some(c=>c.ordem&&c.ordem.tipo==="embarcar"))continue;Ot(e.x,e.z,t.alvo.x,t.alvo.z)>70?e.ordem||(e.ordem={tipo:"mover",x:t.alvo.x+ut(-20,20),z:t.alvo.z+ut(-20,20)}):(e.ordem=null,Li(e),t.estado="combate");continue}t.estado="combate";for(let a of t.oficiais){if(a.dentro||a.ordem||a.alvo&&a.alvo.vivo&&a.alvo.zumbi)continue;let l=Rp(a.x,a.z,200)||t.alvo;if(Ot(a.x,a.z,l.x,l.z)>45){let h=Math.atan2(l.x-a.x,l.z-a.z)+ut(-.4,.4);di([a],a.x+Math.sin(h)*30,a.z+Math.cos(h)*30)}}e&&!e.ordem&&s!==e&&Ot(e.x,e.z,s.x,s.z)>50&&(e.ordem={tipo:"mover",x:s.x+ut(-10,10),z:s.z+ut(-10,10)})}}}var wo=[];x.acampamentos=wo;var Lu=20,Fy=0;function Oy(n,t){let e="cidade",i=1/0;for(let s in Le){if(["base","heliporto","docas","portaavioes"].includes(s))continue;let r=Xe(n,t,Le[s].x,Le[s].z);r<i&&(i=r,e=Le[s].nome)}return e}function By(n,t,e){for(let i of x.unidades)if(i.vivo&&!i.policia&&(i.estr||i.classe==="inf"||i.classe==="veic")&&Xe(i.x,i.z,n,t)<e*e)return!1;return!0}function Pp(n,t){for(let e=0;e<30;e++){let i=n+ut(-60,60),s=t+ut(-60,60),r=!0;for(let o=0;o<6.28&&r;o+=.8)Ne(i+Math.sin(o)*12,s+Math.cos(o)*12)||(r=!1);if(r&&Ne(i,s))return{x:i,z:s}}return null}function Uu(n,t,e){let i=e/Math.max(6,n.membros.length)*Math.PI*2,s=t.armado?11.5:4+e%3*1.5;return{x:n.x+Math.sin(i)*s,z:n.z+Math.cos(i)*s}}function Ip(n,t,e,i=!1){let s=Tr("acampamento");s.grupo.position.set(n,0,t),s.grupo.rotation.y=ut(0,6.28),x.cena.add(s.grupo);let r={id:++Fy,x:n,z:t,m:s,membros:[],ativo:!0,policia:i,nome:Oy(n,t),t:0};wo.push(r);for(let o of e)ky(r,o);return r}function ky(n,t){t.campo=n,t.estado="acampar",t.lider=null,n.membros.push(t),t.posto=Uu(n,t,n.membros.length-1)}function Du(n){n.armado=!0,n.hp=Math.max(n.hp,60)}function Hy(n){let t=x.criarCivil(n.x,n.z);return t.camisa=ic,t.calca=sc,t.pele=fo,t.policial=!0,t.cabelo=null,Du(t),t.hp=115,t}function Vy(){let n=(x.equipes||[]).find(e=>e.vivo&&!e.desistiu);if(!n)return!1;n.desistiu=!0,n.vivo=!1;let t=[];for(let e of n.oficiais)e.vivo&&(e.dentro&&(e.dentro.passageiros.splice(e.dentro.passageiros.indexOf(e),1),e.dentro.cargaUsada-=1,e.dentro=null),t.push(Hy(e)),Lr(e));if(n.van.vivo){for(let s of n.van.passageiros.slice())s.agente&&(s.dentro=null,t.push(s));n.van.passageiros=n.van.passageiros.filter(s=>!s.agente);let e=n.van.x,i=n.van.z;if(Lr(n.van),t.length){let s=Pp(e,i)||{x:e,z:i},r=Ip(s.x,s.z,t,!0);$t(`\u{1F694} A SWAT desistiu! Os policiais abandonaram o servi\xE7o e montaram um acampamento em ${r.nome}`,r.x,r.z,"ruim")}}return ee("alerta"),!0}function zp(n){Lu-=n;for(let s of wo){if(!s.ativo)continue;if(s.membros=s.membros.filter(o=>o.vivo&&!o.zumbi&&o.estado!=="morto"&&o.campo===s),s.t+=n,s.t>25&&Math.random()<n*.03){let o=s.membros.find(a=>!a.armado);o&&s.membros.filter(a=>a.armado).length<s.membros.length*.7&&(Du(o),o.posto=Uu(s,o,s.membros.indexOf(o)))}if(!s.membros.length){s.ativo=!1,$t(`\u2620\uFE0F O acampamento de sobreviventes em ${s.nome} caiu`,s.x,s.z,"ruim");continue}let r=null;if(x.hashU.busca(s.x,s.z,45,o=>{r||!o.vivo||o.dentro||o.policia||o.estr||(o.classe==="inf"||o.classe==="veic"||o.classe==="aereo"&&o.pousado&&o.d.carga||o.classe==="naval"&&o.d.carga)&&(r=o)}),r){s.ativo=!1;for(let o of s.membros)o.campo=null,o.estado="seguir",o.lider=r,o.espera=0;$t(`\u{1F91D} ${s.membros.length} sobreviventes de ${s.nome} aceitaram o resgate e seguem suas tropas!`,s.x,s.z,"bom"),ee("resgate")}}if(Lu>0)return;Lu=15;let t=x.populacao?x.infectados/x.populacao:0;if(!x.policiaDesistiu&&(t>.4||x.nZumbis>250&&x.nZumbis>x.nCivis)&&(x.policiaDesistiu=!0,$t("\u{1F4FB} A cidade est\xE1 tomada. A pol\xEDcia e a SWAT est\xE3o desistindo e abandonando os postos!",null,null,"surto")),x.policiaDesistiu&&Math.random()<.6&&Vy(),x.focos<2||x.tempo<180||wo.filter(s=>s.ativo).length>=8)return;let i=x.agentes.filter(s=>s.vivo&&!s.zumbi&&!s.dentro&&!s.campo&&s.estado!=="morto"&&s.estado!=="seguir");for(let s=0;s<6;s++){let r=i[Math.random()*i.length|0];if(!r)return;if(!By(r.x,r.z,350)||wo.some(l=>l.ativo&&Xe(l.x,l.z,r.x,r.z)<500*500))continue;let o=i.filter(l=>!l.campo&&Xe(r.x,r.z,l.x,l.z)<140*140).slice(0,16);if(o.length<5)continue;let a=Pp(r.x,r.z);if(!a)continue;let c=Ip(a.x,a.z,o);for(let l=0;l<Math.min(o.length,2+(x.dia>=2?2:0));l++)Du(o[l]);for(let l of o)l.posto=Uu(c,l,c.membros.indexOf(l));$t(`\u{1F3D5}\uFE0F Sobreviventes montaram um acampamento em ${c.nome} (${o.length} pessoas). Mande tropas para resgat\xE1-los!`,c.x,c.z,"info"),ee("alerta");return}}var Lp={facil:{dinheiro:5e3,civis:600,sos:22,meta:150,intervalo:1.35,renda:7},normal:{dinheiro:3500,civis:750,sos:26,meta:250,intervalo:1,renda:5},dificil:{dinheiro:2200,civis:900,sos:30,meta:350,intervalo:.7,renda:4}};function Dp(){var o;x.danoUnidade=bp,x.naZonaSegura=Bs,x.volEm=ui,x.vagas=Ur,x.construir=Wy,x.embarcarCivil=Ru,x.criarCivil=uc,x.virarZumbi=up,x.produzir=kp;let n=Le.base;Qh(n.x,n.z,380);let t=(o=_e.baseAng)!=null?o:.43,e={x:Math.cos(t),z:Math.sin(t)},i={x:-e.z,z:e.x};x.baseEixo={ax:e,pp:i,ang:Math.atan2(e.x,e.z)};let s=(a,c)=>({x:n.x+e.x*a+i.x*c,z:n.z+e.z*a+i.z*c});x.layout={qg:s(0,-10),quartel:s(-150,-60),patio:s(-150,60),heliporto:s(150,-20),zona:s(10,110),torres:[s(-260,-120),s(-260,140),s(260,-120),s(260,140),s(0,-160)],patriot:[s(90,120),s(230,60)]};let r=[["qg",42,28,16],["quartel",56,42,6],["patio",64,34,10]];for(let[a,c,l,h]of r){let u=x.layout[a];Gy(u.x,u.z,c,l,x.baseEixo.ang+Math.PI/2,h)}Kh(),vu()}function Gy(n,t,e,i,s,r){let o=Math.cos(s),a=Math.sin(s),c=new Float32Array(8),l=[[-e/2,-i/2],[-e/2,i/2],[e/2,i/2],[e/2,-i/2]],h=1e9,u=-1e9,f=1e9,d=-1e9;l.forEach(([v,m],p)=>{let y=n+v*o+m*a,_=t-v*a+m*o;c[p*2]=y,c[p*2+1]=_,h=Math.min(h,y),u=Math.max(u,y),f=Math.min(f,_),d=Math.max(d,_)});let g=0;for(let v=0;v<4;v++){let m=(v+1)%4;g+=c[v*2]*c[m*2+1]-c[m*2]*c[v*2+1]}if(g>0){let v=new Float32Array([c[6],c[7],c[4],c[5],c[2],c[3],c[0],c[1]]);c.set(v)}ze.push({id:ze.length,pts:c,h:r,area:e*i,cx:n,cz:t,x0:h,x1:u,z0:f,z1:d,raio:Math.max(e,i)/2,cap:12,guarnicao:[],civis:0,sos:!1,integridade:600,integMax:600,removido:!1,base:!0})}function Np(){x.chao=nu(x.cena),x.agua=iu(x.cena);let n=ze.filter(e=>e.base);for(let e of n)e.removido=!0;x.malhasPredios=tu(x.cena);for(let e of n)e.removido=!1;x.decor=su(x.cena,2600);let t=Le.base;x.decor.push(ru(x.cena,3200,(e,i)=>Ot(e,i,t.x,t.z)<450));for(let e of ze)e.base||(e.integMax=150+Math.min(900,e.area*.4),e.integridade=e.integMax)}function pi(n,t,e,i){let s=lu[n],r=Tr(n);r.grupo.position.set(t,0,e),r.grupo.rotation.y=i,x.cena.add(r.grupo);let o={id:x.idSeq++,estr:!0,tipoEstr:n,tipo:n,d:s,classe:"estr",x:t,z:e,y:0,ang:i,hp:s.hp,hpMax:s.hp,vivo:!0,m:r,fila:[],passageiros:[],cargaUsada:0,busca:ut(0,1),cd:0};return x.unidades.push(o),["qg","zona","fob"].includes(n)&&(x.abrigos||(x.abrigos=[])).push(o),o}function Ec(n){if(n==="porta")return x.porta;if(x.fonteSel&&x.fonteSel.vivo&&x.fonteSel.tipoEstr===n&&!(x.fonteSel.construindo>0))return x.fonteSel;let t=null,e=1/0,i=x.camAlvo||{x:0,z:0};for(let s of x.unidades){if(!s.vivo||!s.estr||s.tipoEstr!==n||s.construindo>0)continue;let r=Xe(s.x,s.z,i.x,i.z);r<e&&(e=r,t=s)}return t}function Wy(n,t,e){let i=mo[n];if(x.dinheiro<i.custo)return $t("Dinheiro insuficiente",null,null,"ruim"),ee("erro"),!1;if(!Ne(t,e))return $t("N\xE3o d\xE1 para construir a\xED (pr\xE9dio ou \xE1gua)",t,e,"ruim"),ee("erro"),!1;let s=Math.min(i.raio,24);if(!i.agua&&n!=="muro"&&n!=="torre"){let c=0;for(let l=0;l<6.28;l+=.5)for(let h of[.5,1])Ne(t+Math.sin(l)*s*h,e+Math.cos(l)*s*h)||c++;if(c>3)return $t("Pouco espa\xE7o livre aqui: escolha um terreno aberto (pra\xE7a, estacionamento, rua larga)",t,e,"ruim"),ee("erro"),!1}for(let c of x.unidades)if(c.vivo&&c.estr&&Ot(c.x,c.z,t,e)<(c.d.raio+i.raio)*.6)return $t("Muito perto de outra estrutura",t,e,"ruim"),ee("erro"),!1;let r=x.cam?x.cam.yaw:0,o=null;if(i.agua){let c=Op(t,e);if(!c||c.r>80)return $t("As docas precisam ficar na beira da \xE1gua",t,e,"ruim"),ee("erro"),!1;t=c.x,e=c.z,r=c.ang,o=c.agua}x.dinheiro-=i.custo;let a=pi(n,t,e,r);return a.construindo=i.tempo,a.tempoObra=i.tempo,a.hp=a.hpMax*.2,a.m.grupo.scale.y=.15,o&&(a.saidaAgua=o),(n==="quartel"||n==="patio")&&(a.saida=Ui({x:t+Math.sin(r)*40,z:e+Math.cos(r)*40})),$t(`\u{1F3D7}\uFE0F Construindo ${i.nome}...`,t,e,"info"),ee("ok"),!0}function Ui(n,t=0){return t===0&&Ne(n.x,n.z)?n:Rn(t,n.x,n.z)||n}function Fp(n){let t=Lp[n]||Lp.normal;x.dificuldade=n,x.cfgDif=t,x.dinheiro=t.dinheiro,x.meta=t.meta,x.tempo=0,x.dia=1,x.focos=0,x.proxFoco=20,x.infectados=0,x.resgatados=0,x.civisMortos=0,x.zumbisMortos=0,x.perdas=0,x.ruidos=[],x.quadro=0,x.fim=!1;let e=x.baseEixo.ang+Math.PI/2,i=x.layout;x.estr.qg=pi("qg",i.qg.x,i.qg.z,e),x.estr.quartel=pi("quartel",i.quartel.x,i.quartel.z,e),x.estr.patio=pi("patio",i.patio.x,i.patio.z,e);let s=Ui(i.heliporto);x.estr.heliporto=pi("heliporto",s.x,s.z,e);let r=Ui(i.zona);x.estr.zona=pi("zona",r.x,r.z,e);for(let y of i.torres){let _=Ui(y);Ot(_.x,_.z,y.x,y.z)<60&&pi("torre",_.x,_.z,e)}for(let y of i.patriot){let _=Ui(y);pi("patriot",_.x,_.z,e+.5)}let o=sn?Op(x.estr.qg.x,x.estr.qg.z):null;o&&(x.estr.docas=pi("docas",o.x,o.z,o.ang),x.estr.docas.saidaAgua=o.agua);for(let y of["quartel","patio"]){let _=x.estr[y],M={x:_.x+x.baseEixo.pp.x*45,z:_.z+x.baseEixo.pp.z*45};_.saida=Ui(M)}let a;if(sn){a=Le.portaavioes,wr(2,a.x,a.z)||(a=Rn(2,a.x,a.z)||a),x.porta=$e("portaavioes",a.x,a.z,Math.PI),x.porta.fila=[],x.porta.deck=9.2;let y=Rn(2,a.x-250,a.z+300)||{x:a.x,z:a.z+400};$e("destroier",y.x,y.z,Math.PI);let _=x.estr.docas.saidaAgua;$e("lancha",_.x,_.z,o.ang)}else{let y=Le.base,_=x.baseEixo.ax,M=x.baseEixo.pp,S=((w,P)=>({x:y.x+_.x*w+M.x*P,z:y.z+_.z*w+M.z*P}))(0,-330);x.porta=pi("pista",S.x,S.z,x.baseEixo.ang),x.porta.deck=.3,x.porta.aerodromo=!0,a=x.porta}let c=x.estr.quartel.saida,l=x.estr.patio.saida,h={fuzileiro:8,metralhador:2,sniper:1,medico:1},u=0;for(let y in h)for(let _=0;_<h[y];_++,u++){let M=Ui({x:c.x+u%4*3-5,z:c.z+Math.floor(u/4)*3});$e(y,M.x,M.z,x.baseEixo.ang)}for(let[y,_]of[["humvee",2],["stryker",1],["ambulancia",1]])for(let M=0;M<_;M++,u++){let I=Ui({x:l.x+u%3*8-8,z:l.z+u%2*8});$e(y,I.x,I.z,x.baseEixo.ang)}let f=x.estr.heliporto,d=$e("blackhawk",f.x+x.baseEixo.ax.x*-30,f.z+x.baseEixo.ax.z*-30,x.baseEixo.ang);d.pousado=!0,d.y=0;let g=$e("apache",f.x,f.z,x.baseEixo.ang);g.pousado=!0;let v=$e("f35",a.x,a.z,0);v.vagaConves=0;let m=$e("f18",a.x,a.z,0);m.vagaConves=1,Xy(t.civis);let p=ze.filter(y=>!y.base&&!y.removido&&y.h>9&&Ot(y.cx,y.cz,x.estr.qg.x,x.estr.qg.z)>700);for(let y=0;y<t.sos&&p.length;y++){let _=p.splice(ja(0,p.length-1),1)[0];_.sos=!0,_.civis=ja(4,14)}x.populacao=x.agentes.length+ze.reduce((y,_)=>y+_.civis,0),x.pausado=!1}function Op(n,t){let e=null;for(let i=0;i<16;i++){let s=i/16*Math.PI*2,r=Math.sin(s),o=Math.cos(s);for(let a=20;a<600;a+=4){let c=n+r*a,l=t+o*a;if(Rs(c,l)){if(!e||a<e.r){let h=Rn(1,c+r*60,l+o*60)||{x:c+r*60,z:l+o*60};e={r:a,x:c-r*4,z:l-o*4,ang:s,agua:h}}break}}}return e||{x:n,z:t,ang:0,agua:{x:n,z:t}}}function Xy(n){let t=x.estr.qg,e=0,i=0;for(;i<n&&e<n*200;){e++;let s=Math.random()*Oe,r=Math.random()*Be;if(!Ne(s,r)||Xe(s,r,t.x,t.z)<600*600)continue;let o=Math.floor(s/Ae),a=Math.floor(r/Ae),c=0;for(let l=-3;l<=3;l+=3)for(let h=-3;h<=3;h+=3){let u=(a+l)*Ft+(o+h);u>=0&&u<Ie.length&&Ie[u]>=0&&c++}Math.random()>.08+c*.12||(uc(s,r),i++)}}function Ac(n){let t=Fn[n],e=Ec(t.de);return!e||!e.vivo?($t("Estrutura destru\xEDda: n\xE3o d\xE1 para produzir",0,0,"ruim"),ee("erro"),!1):x.dinheiro<t.custo?($t("Dinheiro insuficiente",null,null,"ruim"),ee("erro"),!1):e.fila.length>=8?($t("Fila cheia",null,null),ee("erro"),!1):t.classe==="jato"&&x.unidades.filter(i=>i.classe==="jato").length+e.fila.filter(i=>Fn[i.tipo].classe==="jato").length>=6?($t("O conv\xE9s comporta no m\xE1ximo 6 jatos",null,null),ee("erro"),!1):(x.dinheiro-=t.custo,e.fila.push({tipo:n,t:t.tempo,total:t.tempo}),ee("clique"),!0)}function Bp(n,t){let e=Ec(n);if(!e||!e.fila[t])return;let i=e.fila.splice(t,1)[0];x.dinheiro+=Fn[i.tipo].custo}function kp(n,t){let e=Fn[n],i;if(e.de==="porta"){let s=x.porta;if(e.classe==="jato"){i=$e(n,s.x,s.z,0);let r=new Set(x.unidades.filter(a=>a.classe==="jato"&&a!==i).map(a=>a.vagaConves)),o=0;for(;r.has(o);)o++;i.vagaConves=o}else{let r=-60-ja(0,3)*25;i=$e(n,s.x+Math.sin(s.ang)*r,s.z+Math.cos(s.ang)*r,s.ang,{alt:s.deck}),i.y=s.deck,i.pousado=!0}}else if(e.de==="heliporto"){let s=[[-30,0],[0,0],[30,0],[-15,32],[15,32]],[r,o]=ci(s),a=Math.cos(t.ang),c=Math.sin(t.ang);i=$e(n,t.x+r*a+o*c,t.z-r*c+o*a,t.ang),i.pousado=!0}else if(e.de==="docas"){let s=t.saidaAgua,r=s;e.nav===2&&(r=Rn(2,s.x,s.z)||s),i=$e(n,r.x+ut(-10,10),r.z+ut(-10,10),t.ang)}else{let s=t.saida||t,r=Ui({x:s.x+ut(-6,6),z:s.z+ut(-6,6)});i=$e(n,r.x,r.z,x.baseEixo.ang)}return $t(`${e.icone} ${e.nome} pronto!`,i.x,i.z,"bom"),ee("ok"),i}var Nu=_e.focos||["bayside"];function Fu(n,t){let e="Miami",i=1/0;for(let s in Le){if(s==="base"||s==="heliporto"||s==="docas"||s==="portaavioes")continue;let r=Xe(n,t,Le[s].x,Le[s].z);r<i&&(i=r,e=Le[s].nome)}return e}function qy(){x.focos++;let n,t,e=x.agentes.filter(a=>a.vivo&&!a.zumbi&&!a.dentro&&a.estado!=="morto"&&Ot(a.x,a.z,x.estr.qg.x,x.estr.qg.z)>700);if(x.focos<=4&&Le[Nu[x.focos-1]]){let a=Le[Nu[x.focos-1]];n=a.x,t=a.z}else if(e.length){let a=ci(e);n=a.x,t=a.z}else return;let i=Math.min(14,3+Math.floor(x.focos*.8)),s=e.sort((a,c)=>Xe(a.x,a.z,n,t)-Xe(c.x,c.z,n,t)).slice(0,i),r=0;for(let a of s){if(Ot(a.x,a.z,n,t)>250)break;Mo(a,x.dia>=2&&Math.random()<.2?"corredor":"comum"),x.infectados++,r++}for(;r<i;r++){let a=Rn(0,n+ut(-20,20),t+ut(-20,20));a&&(Au(a.x,a.z),x.infectados++,x.populacao++)}let o=Fu(n,t);(x.swatPendente||(x.swatPendente=[])).push({t:x.tempo+4,x:n,z:t,nome:o}),$t(x.focos===1?`\u2623\uFE0F Primeiro caso confirmado em ${o}! O surto come\xE7ou.`:`\u2623\uFE0F Novo foco de infec\xE7\xE3o: ${o}`,n,t,"surto"),ee("alerta")}function Yy(){let n=Math.min(30,6+x.dia*4),t,e,i=0;do{i++;let s=Math.random()*4|0,r=Math.random();t=s===0?ut(5,50):s===1?Oe-ut(5,50):r*Oe,e=s===2?ut(5,50):s===3?Be-ut(5,50):r*Be}while((!Ne(t,e)||Ot(t,e,x.estr.qg.x,x.estr.qg.z)<900)&&i<300);if(!(i>=300)){for(let s=0;s<n;s++){let r=Rn(0,t+ut(-30,30),e+ut(-30,30));if(r){let o=Au(r.x,r.z,x.dia>=3&&Math.random()<.06?"bruto":x.dia>=2&&Math.random()<.2?"corredor":"comum");o.estado="ruido";let a=Le[Nu[0]];o.destino={x:a.x,z:a.z}}}zu(t,e,Fu(t,e)),$t(`\u{1F9DF} Horda de ${n} zumbis chegando de fora da cidade (${Fu(t,e)})`,t,e,"surto"),ee("alerta")}}function Hp(n){x.tempo+=n,x.quadro++;let t=480;if(x.hora=(x.tempo/t*24+8)%24,x.dia=1+Math.floor((x.tempo/t*24+8)/24),x.noite=x.hora<6||x.hora>=19.5,x.dinheiro+=x.cfgDif.renda*n,x.ruidos=x.ruidos.filter(i=>x.tempo-i.t<3),x.ruidos.length>60&&x.ruidos.splice(0,x.ruidos.length-60),x.tempo>=x.proxFoco&&(qy(),x.proxFoco=x.tempo+Math.max(35,80-x.focos*6)*x.cfgDif.intervalo),x.dia>=2&&(x.proxHorda||(x.proxHorda=x.tempo+30),x.tempo>=x.proxHorda&&(Yy(),x.proxHorda=x.tempo+Math.max(70,160-x.dia*20)*x.cfgDif.intervalo)),x.swatPendente)for(let i=x.swatPendente.length-1;i>=0;i--){let s=x.swatPendente[i];x.tempo>=s.t&&(x.swatPendente.splice(i,1),zu(s.x,s.z,s.nome))}Cp(n),zp(n);let e=x.porta;if(e&&e.vivo&&e.fila.length){let i=e.fila[0];i.t-=n,i.t<=0&&(e.fila.shift(),kp(i.tipo,e))}if(x.resgateAcum&&(!x._ultResg||x.tempo-x._ultResg>2)&&($t(`\u2705 ${x.resgateAcum} civis chegaram \xE0 zona segura (+$${x.resgateAcum*40})`,null,null,"bom"),ee("resgate"),x.resgateAcum=0,x._ultResg=x.tempo),!x.fim&&x.quadro%30===0){let i=ze.reduce((s,r)=>s+(r.base?0:r.civis),0);x.resgatados>=x.meta?Up(`Voc\xEA resgatou ${x.resgatados} civis. Miami agradece!`):x.focos>=5&&x.nZumbis===0&&x.tempo>300?Up("O surto foi contido: n\xE3o restou nenhum zumbi em Miami!"):x.focos>=2&&x.nCivis===0&&i===0&&Vp("N\xE3o restaram civis para resgatar.")}}function Up(n){x.fim=!0,x.pausado=!0,x.ui&&x.ui.fim(!0,n)}function Vp(n){x.fim||(x.fim=!0,x.pausado=!0,x.ui&&x.ui.fim(!1,n))}x.derrota=Vp;var Kt=n=>document.querySelector(n),ns=(n,t,e)=>{let i=document.createElement(n);return t&&(i.className=t),e!==void 0&&(i.innerHTML=e),i},Gp=n=>Math.floor(n).toLocaleString("pt-BR"),Tc=class{constructor(t){this.cam=t,this.pings=[],this.raiz=Kt("#ui"),this.ov=Kt("#overlay"),this.ctx=this.ov.getContext("2d"),this.abaProd="quartel",this.montar(),x.ui=this}montar(){this.raiz.innerHTML=`
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
    `;let t=(h,u)=>Kt(h).addEventListener("click",f=>{f.stopPropagation(),zi(),u(f)});t("#b-pausa",()=>{x.pausado=!x.pausado,this.atualizarTopo()}),t("#b-vel",()=>{x.velocidade=x.velocidade>=3?1:x.velocidade+1,Kt("#b-vel").textContent=x.velocidade+"x"}),t("#b-menu",()=>this.menuPausa()),t("#b-prod",()=>this.abrirProducao()),t("#p-fechar",()=>Kt("#producao").classList.add("oculto")),t("#b-caixa",()=>this.modoCaixa(!x.modoCaixa)),t("#b-multi",()=>{x.selecaoMultipla=!x.selecaoMultipla,Kt("#b-multi").classList.toggle("ativo",x.selecaoMultipla)}),t("#b-terra",()=>this.selecionarGrupo(h=>h.classe==="inf"||h.classe==="veic")),t("#b-aereo",()=>this.selecionarGrupo(h=>h.classe==="aereo")),t("#b-naval",()=>this.selecionarGrupo(h=>h.classe==="naval"&&h.tipo!=="portaavioes")),t("#b-jato",()=>this.selecionarGrupo(h=>h.classe==="jato")),t("#b-base",()=>this.cam.irPara(x.estr.qg.x,x.estr.qg.z,450)),t("#b-porta",()=>this.cam.irPara(x.porta.x,x.porta.z,600)),t("#b-alerta",()=>{let h=[...x.alertas].reverse().find(u=>u.x!=null);h&&this.cam.irPara(h.x,h.z,Math.min(this.cam.dist,350))}),t("#b-sair-controle",()=>this.controlar(null));let e=Kt("#mini"),i=eu(10);this.miniFundo=i;let s=h=>{let u=e.getBoundingClientRect(),f=(h.clientX-u.left)/u.width*Oe,d=(h.clientY-u.top)/u.height*Be;this.cam.irPara(f,d)};e.addEventListener("pointerdown",h=>{h.stopPropagation(),s(h),e.setPointerCapture(h.pointerId),e._arr=!0}),e.addEventListener("pointermove",h=>{e._arr&&s(h)}),e.addEventListener("pointerup",()=>{e._arr=!1});let r=Kt("#joy"),o=Kt("#joy-bola"),a=null,c=h=>{let u=r.getBoundingClientRect(),f=(h.clientX-u.left-u.width/2)/(u.width/2),d=(h.clientY-u.top-u.height/2)/(u.height/2),g=Math.hypot(f,d);g>1&&(f/=g,d/=g),x.joyUI={x:f,y:d},o.style.transform=`translate(${f*40}px, ${d*40}px)`};r.addEventListener("pointerdown",h=>{h.stopPropagation(),a=h.pointerId,r.setPointerCapture(a),c(h)}),r.addEventListener("pointermove",h=>{h.pointerId===a&&c(h)});let l=()=>{a=null,x.joyUI=null,o.style.transform=""};r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l);for(let h of["#topo","#lateral","#selecao","#producao","#info","#alertas"])Kt(h).addEventListener("pointerdown",u=>u.stopPropagation())}ajustarCidade(){if(!sn){Kt("#b-naval").classList.add("oculto");let t=Kt("#b-porta");t.innerHTML="\u2708\uFE0F<small>Pista</small>"}}atualizarConstrucao(){let t=Kt("#b-cancela-constr");t||(t=ns("button","bt destaque","\u2716 Cancelar constru\xE7\xE3o"),t.id="b-cancela-constr",t.style.cssText="position:fixed;left:50%;bottom:12px;transform:translateX(-50%);pointer-events:auto",t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.stopPropagation(),x.construindo=null,this.atualizarConstrucao()}),this.raiz.appendChild(t)),t.classList.toggle("oculto",!x.construindo)}modoCaixa(t){x.modoCaixa=t,Kt("#b-caixa").classList.toggle("ativo",t)}selecionarGrupo(t){if(x.selecao.slice().forEach(e=>Mn(e,!1)),x.selecao=x.unidades.filter(e=>e.vivo&&!e.estr&&!e.dentro&&!e.policia&&t(e)),x.selecao.forEach(e=>Mn(e,!0)),ee("clique"),Sc(),this.atualizarSelecao(),x.selecao.length){let e=0,i=0;for(let s of x.selecao)e+=s.x,i+=s.z;x.selecao.length===1&&x.selecao[0].classe!=="jato"&&this.cam.irPara(e/x.selecao.length,i/x.selecao.length)}}atualizarTopo(){Kt("#t-din").textContent="\u{1F4B5} $"+Gp(x.dinheiro),Kt("#t-res").textContent=`\u2705 ${x.resgatados}/${x.meta}`;let t=this._presos||0;Kt("#t-civ").textContent=`\u{1F9CD} ${x.nCivis||0}`+(t?` +${t}\u{1F3E2}`:""),Kt("#t-zum").textContent=`\u{1F9DF} ${x.nZumbis||0}`;let e=x.populacao?Math.round(x.infectados/x.populacao*100):0;Kt("#t-inf").textContent=`\u2623\uFE0F ${e}%`;let i=Math.floor(x.hora||8),s=Math.floor((x.hora||8)%1*60);Kt("#t-hora").textContent=`${x.noite?"\u{1F319}":"\u2600\uFE0F"} Dia ${x.dia||1} ${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`,Kt("#b-pausa").textContent=x.pausado?"\u25B6":"\u23F8",Kt("#producao").classList.contains("oculto")||this.atualizarProducao()}alerta(t,e,i,s){let r=Kt("#alertas");if(!r)return;let o=ns("div","alerta "+s,t);for(e!=null&&(o.classList.add("clicavel"),o.addEventListener("click",a=>{a.stopPropagation(),this.cam.irPara(e,i,Math.min(this.cam.dist,350))})),r.prepend(o);r.children.length>4;)r.lastChild.remove();setTimeout(()=>{o.classList.add("saindo"),setTimeout(()=>o.remove(),600)},s==="surto"?9e3:5500)}ping(t,e,i){this.pings.push({x:t,z:e,tipo:i,t:0})}atualizarSelecao(){let t=x.selecao.filter(a=>a.vivo&&!a.dentro);x.selecao=t;let e=Kt("#selecao");if(!t.length){e.classList.add("oculto");return}e.classList.remove("oculto");let i={};for(let a of t)i[a.tipo]=(i[a.tipo]||0)+1;let s=Object.entries(i).map(([a,c])=>`<span class="tag">${Fn[a].icone} ${c>1?c+"\xD7 ":""}${Fn[a].nome}</span>`).join("");if(t.length===1){let a=t[0];if(s+=`<div class="sub">${a.d.sub||""}</div><div class="barra"><i style="width:${Math.max(0,a.hp/a.hpMax*100)}%"></i></div>`,a.d.carga){let c=a.passageiros.filter(h=>h.agente).length,l=a.passageiros.length-c;s+=`<div class="sub">Carga: ${a.cargaUsada}/${a.d.carga} \u2022 ${l} militares, ${c} civis</div>`}a.predio&&(s+=`<div class="sub">No telhado (${a.predio.guarnicao.length}/${a.predio.cap}) \u2022 estrutura ${Math.round(a.predio.integridade)}</div>`),a.classe==="jato"&&(s+=`<div class="sub">${{pronto:"Pronto no conv\xE9s",voando:"Em miss\xE3o",voltando:"Voltando",rearmando:"Rearmando..."}[a.estadoJato]} \u2022 muni\xE7\xE3o ${a.municao}/${a.d.municao}</div>`)}Kt("#sel-info").innerHTML=s;let r=Kt("#sel-bts");r.innerHTML="";let o=(a,c,l="")=>{let h=ns("button","bt "+l,a);h.addEventListener("click",u=>{u.stopPropagation(),zi(),ee("clique"),c(),this.atualizarSelecao()}),r.appendChild(h)};o("\u{1F6D1} Parar",()=>{for(let a of t)a.ordem=null,a.caminho=null,a.alvo=null,a.classe==="aereo"&&(a.altAlvo=Math.max(a.y,a.d.altCruz*.6))}),t.some(a=>a.passageiros&&a.passageiros.length)&&o("\u2B07\uFE0F Desembarcar",()=>{for(let a of t)a.passageiros&&a.passageiros.length&&Li(a)}),t.some(a=>a.classe==="aereo")&&o("\u{1F6EC} Pousar",()=>{for(let a of t)a.classe==="aereo"&&(a.ordem={tipo:"pousar"})}),t.some(a=>a.predio)&&o("\u{1F3C3} Sair do pr\xE9dio",()=>{for(let a of t)a.predio&&Eo(a)}),t.some(a=>a.classe==="jato")&&o(x.modoArea?"\u{1F3AF} \xC1rea: LIGADA":"\u{1F3AF} Marcar \xE1rea",()=>{x.modoArea=!x.modoArea},x.modoArea?"ativo":""),t.some(a=>a.classe==="jato")&&o("\u{1F6F3}\uFE0F Voltar",()=>{for(let a of t)a.classe==="jato"&&a.estadoJato==="voando"&&(a.estadoJato="voltando")}),t.length===1&&t[0].classe!=="jato"&&o("\u{1F3AE} Controlar",()=>this.controlar(t[0]),"destaque"),o("\u{1F3A5} Seguir",()=>{this.cam.seguir=t[0],this.cam.dist>300&&(this.cam.dist=t[0].classe==="inf"?60:150)}),o("\u2716",()=>{t.forEach(a=>Mn(a,!1)),x.selecao=[],x.modoArea=!1})}controlar(t){x.controlando&&(x.controlando.ordem=null),x.controlando=t,Kt("#joy").classList.toggle("oculto",!t),Kt("#b-sair-controle").classList.toggle("oculto",!t),Kt("#lateral").classList.toggle("oculto",!!t),Kt("#mini").classList.toggle("oculto",!!t),Kt("#selecao").classList.toggle("escondida",!!t),t?(this.cam.seguir=t,this.cam.dist=t.classe==="inf"?22:t.classe==="aereo"?90:t.classe==="naval"?t.d.raio>20?400:90:45,this.cam.inclExtra=-.1):this.cam.inclExtra=0}abrirProducao(t){t&&(this.abaProd=t),!oc[this.abaProd]&&this.abaProd!=="construir"&&(this.abaProd="quartel"),Kt("#producao").classList.remove("oculto");let e=Kt("#p-abas");e.innerHTML="";for(let s of["construir",...Object.keys(oc)]){if(!sn&&s==="docas")continue;let r=ns("button","aba"+(s===this.abaProd?" ativo":""),s==="construir"?"\u{1F528} Construir":s==="porta"&&!sn?"\u2708\uFE0F Aer\xF3dromo":Jd[s]);r.addEventListener("click",o=>{o.stopPropagation(),this.abaProd=s,this.abrirProducao()}),e.appendChild(r)}let i=Kt("#p-lista");if(i.innerHTML="",this.abaProd==="construir"){for(let s in mo){let r=mo[s];if(r.agua&&!sn)continue;let o=ns("div","carta"+(x.construindo===s?" sel":""),`<div class="ic">${r.icone}</div><div class="tx"><b>${r.nome}</b><small>${r.sub}</small><span>$${r.custo} \u2022 ${r.tempo}s</span></div>`);o.dataset.custo=r.custo,o.addEventListener("click",a=>{if(a.stopPropagation(),zi(),x.dinheiro<r.custo){ee("erro");return}x.construindo=s,Kt("#producao").classList.add("oculto"),this.alerta(`\u{1F528} Toque no mapa onde quer construir: ${r.nome}${r.agua?" (na beira da \xE1gua)":""}. Toque em \u2716 para cancelar.`,null,null,"info"),this.atualizarConstrucao()}),i.appendChild(o)}Kt("#p-fila").innerHTML="<i>Escolha a estrutura e toque no mapa. Bases novas produzem unidades e as zonas seguras/FOB recebem civis.</i>",Kt("#p-fila")._chave=null;return}for(let s of oc[this.abaProd]){let r=Fn[s],o=ns("div","carta",`<div class="ic">${r.icone}</div><div class="tx"><b>${r.nome}</b><small>${r.sub}</small><span>$${r.custo} \u2022 ${r.tempo}s</span></div>`);o.dataset.custo=r.custo,o.addEventListener("click",a=>{a.stopPropagation(),zi(),Ac(s)&&this.atualizarProducao()}),i.appendChild(o)}this.atualizarProducao()}atualizarProducao(){Kt("#p-din").textContent=" \u{1F4B5} $"+Gp(x.dinheiro);for(let s of document.querySelectorAll("#p-lista .carta"))s.classList.toggle("caro",x.dinheiro<+s.dataset.custo);if(this.abaProd==="construir")return;let t=Ec(this.abaProd),e=Kt("#p-fila");if(!t||!t.vivo){e.innerHTML="<i>Estrutura destru\xEDda</i>";return}let i=t.fila.map(s=>s.tipo).join(",");e._chave!==i&&(e._chave=i,e.innerHTML=t.fila.length?"":"<i>Fila vazia \u2014 toque numa unidade para produzir</i>",t.fila.forEach((s,r)=>{let o=ns("div","item",`${Fn[s.tipo].icone}<i></i>`);o.title="Cancelar",o.addEventListener("click",a=>{a.stopPropagation(),Bp(this.abaProd,r),this.atualizarProducao()}),e.appendChild(o)})),t.fila.forEach((s,r)=>{let o=e.children[r];o&&o.querySelector("i")&&(o.querySelector("i").style.width=100-s.t/s.total*100+"%")})}infoPredio(t){let e=Kt("#info");e.classList.remove("oculto");let i=t.base?"Pr\xE9dio da base":t.h>60?"Arranha-c\xE9u":t.h>15?"Pr\xE9dio":"Casa / loja";e.innerHTML=`<b>\u{1F3E2} ${i}</b> \u2022 ${Math.round(t.h)} m de altura<br>
      Soldados no telhado: ${t.guarnicao.length}/${t.cap}<br>
      ${t.civis?t.sos?`\u{1F198} <b>${t.civis} civis presos</b> pedindo socorro!`:`\u{1F3E0} ${t.civis} civis abrigados`:"Sem civis"}<br>
      <small>Selecione soldados e toque no pr\xE9dio para coloc\xE1-los no telhado. Com civis dentro, as tropas os resgatam; helic\xF3pteros pegam pelo telhado.</small>`,clearTimeout(this._tInfo),this._tInfo=setTimeout(()=>e.classList.add("oculto"),6e3)}desenharMini(){let t=Kt("#mini"),e=t.getContext("2d"),i=t.width/Oe,s=t.height/Be;e.drawImage(this.miniFundo,0,0,t.width,t.height),e.fillStyle="#ff3b3b";for(let o of x.agentes)o.vivo&&o.zumbi&&!o.dentro&&o.estado!=="morto"&&e.fillRect(o.x*i-.5,o.z*s-.5,1.6,1.6);e.fillStyle="#ffffff";for(let o of x.agentes)o.vivo&&!o.zumbi&&!o.dentro&&o.estado!=="morto"&&e.fillRect(o.x*i-.5,o.z*s-.5,1.2,1.2);for(let o of ze)o.civis>0&&(e.fillStyle=o.sos?"#ffd23b":"#5bc0ff",e.fillRect(o.cx*i-1.5,o.cz*s-1.5,3,3));for(let o of x.acampamentos||[])o.ativo&&(e.fillStyle=o.policia?"#3c5cff":"#ff9a2e",e.beginPath(),e.arc(o.x*i,o.z*s,3,0,6.29),e.fill());for(let o of x.unidades){if(!o.vivo||o.dentro)continue;e.fillStyle=o.estr?"#7ad1ff":o.policia?"#ffe14d":o.sel?"#7dff8a":"#3b8bff";let a=o.tipo==="portaavioes"?3.5:o.estr?2.5:2;e.fillRect(o.x*i-a/2,o.z*s-a/2,a,a)}let r=[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([o,a])=>this.cam.chao(o,a));r.every(o=>o)&&(e.strokeStyle="rgba(255,255,255,0.8)",e.lineWidth=1,e.beginPath(),r.forEach((o,a)=>(a?e.lineTo:e.moveTo).call(e,o.x*i,o.z*s)),e.closePath(),e.stroke())}desenharOverlay(t){let e=innerWidth,i=innerHeight,s=Math.min(2,devicePixelRatio||1);this.ov.width!==Math.round(e*s)&&(this.ov.width=Math.round(e*s),this.ov.height=Math.round(i*s));let r=this.ctx;r.setTransform(s,0,0,s,0,0),r.clearRect(0,0,e,i);let o=this.cam.cam,a=this.cam.dist>900;if(x.longe=a,a){for(let l of x.agentes){if(!l.vivo||l.dentro||l.estado==="morto")continue;let h=rn(l.x,0,l.z,o);!h||h.x<0||h.y<0||h.x>e||h.y>i||(r.fillStyle=l.zumbi?"#ff2a2a":"#ffffff",r.fillRect(h.x-1.5,h.y-1.5,3,3))}for(let l of x.unidades){if(!l.vivo||l.dentro||l.estr)continue;let h=rn(l.x,l.y,l.z,o);h&&(r.fillStyle=l.policia?"#ffe14d":l.sel?"#5dff6f":"#3d8bff",r.strokeStyle="#001b44",r.beginPath(),r.arc(h.x,h.y,l.classe==="inf"?3:5,0,6.29),r.fill(),r.stroke())}}r.textAlign="center",r.textBaseline="middle";for(let l of ze){if(!(l.civis>0||l.guarnicao.length))continue;let h=rn(l.cx,l.h+4,l.cz,o);if(!h||h.x<-40||h.y<-40||h.x>e+40||h.y>i+40)continue;let u=h.y;if(l.civis>0){let f=l.sos?Math.sin(performance.now()/250)>0?"#ff3030":"#ffd23b":"#2e8bd8";r.fillStyle=f,Ou(r,h.x-26,u-11,52,20,6),r.fill(),r.fillStyle="#fff",r.font="bold 12px sans-serif",r.fillText((l.sos?"SOS ":"\u{1F3E0} ")+l.civis,h.x,u),u-=24}if(l.guarnicao.length){r.fillStyle="rgba(20,70,20,0.85)",Ou(r,h.x-24,u-10,48,18,5),r.fill(),r.fillStyle="#bfffbf",r.font="bold 11px sans-serif",r.fillText("\u{1FA96} "+l.guarnicao.length+"/"+l.cap,h.x,u-1);let f=l.integridade/l.integMax;r.fillStyle="#300",r.fillRect(h.x-22,u+6,44,3),r.fillStyle=f>.5?"#4f4":f>.2?"#fd3":"#f33",r.fillRect(h.x-22,u+6,44*f,3)}}for(let l of x.acampamentos||[]){if(!l.ativo)continue;let h=rn(l.x,6,l.z,o);if(!h||h.x<-40||h.y<-40||h.x>e+40||h.y>i+40)continue;let u=l.membros.filter(f=>f.armado).length;r.fillStyle=l.policia?"rgba(40,70,200,0.9)":"rgba(210,120,30,0.92)",Ou(r,h.x-44,h.y-11,88,20,6),r.fill(),r.fillStyle="#fff",r.font="bold 11px sans-serif",r.fillText(`${l.policia?"\u{1F694}":"\u{1F3D5}\uFE0F"} ${l.membros.length} (${u}\u{1F52B})`,h.x,h.y)}for(let l of x.unidades){if(!l.vivo||l.dentro||!(l.sel||l.hp<l.hpMax*.98)||a&&!l.sel)continue;let h=l.classe==="inf"?2.3:l.estr?22:(l.d.raio||2)*.9+2,u=rn(l.x,l.y+h,l.z,o);if(!u)continue;let f=l.estr?60:l.classe==="inf"?18:34,d=Math.max(0,l.hp/l.hpMax);r.fillStyle="rgba(0,0,0,0.6)",r.fillRect(u.x-f/2-1,u.y-1,f+2,5),r.fillStyle=d>.6?"#46e05a":d>.3?"#f2d43a":"#ef3b3b",r.fillRect(u.x-f/2,u.y,f*d,3),l.sel&&l.classe==="inf"&&(r.strokeStyle="#5dff6f",r.lineWidth=1.5,r.beginPath(),r.arc(u.x,u.y+14,9,0,6.29),r.stroke()),l.d.carga&&l.passageiros.length&&(r.fillStyle="#fff",r.font="10px sans-serif",r.fillText(`${l.passageiros.length}\u{1F464}`,u.x,u.y-8))}for(let l=this.pings.length-1;l>=0;l--){let h=this.pings[l];if(h.t+=t,h.t>.8){this.pings.splice(l,1);continue}let u=rn(h.x,.5,h.z,o);if(!u)continue;let f={mover:"#5dff6f",atacar:"#ff4040",embarque:"#5bc0ff",guarnecer:"#ffd23b",resgate:"#ffd23b"}[h.tipo]||"#fff";r.strokeStyle=f,r.lineWidth=2.5,r.globalAlpha=1-h.t/.8,r.beginPath(),r.arc(u.x,u.y,6+h.t*30,0,6.29),r.stroke(),r.globalAlpha=1}let c=[];if(x.area&&c.push({...x.area,w:Math.max(40,Math.min(160,Math.hypot(x.area.x1-x.area.x0,x.area.z1-x.area.z0)*.35)),alfa:1}),x.areaMarcada){let l=(performance.now()-x.areaMarcada.t)/1e3;l<6?c.push({...x.areaMarcada,alfa:1-l/6}):x.areaMarcada=null}for(let l of c){let h=Math.hypot(l.x1-l.x0,l.z1-l.z0)||1,u=(l.x1-l.x0)/h,f=(l.z1-l.z0)/h,d=-f*l.w/2,g=u*l.w/2,v=[[l.x0+d,l.z0+g],[l.x1+d,l.z1+g],[l.x1-d,l.z1-g],[l.x0-d,l.z0-g]].map(([y,_])=>rn(y,.5,_,o));if(v.some(y=>!y))continue;r.globalAlpha=l.alfa,r.fillStyle="rgba(255,40,40,0.22)",r.strokeStyle="#ff3b3b",r.lineWidth=2.5,r.setLineDash([10,6]),r.beginPath(),v.forEach((y,_)=>(_?r.lineTo:r.moveTo).call(r,y.x,y.y)),r.closePath(),r.fill(),r.stroke(),r.setLineDash([]);let m=rn(l.x0,.5,l.z0,o),p=rn(l.x1,.5,l.z1,o);m&&p&&(r.beginPath(),r.moveTo(m.x,m.y),r.lineTo(p.x,p.y),r.stroke(),r.fillStyle="#ff3b3b",r.font="bold 13px sans-serif",r.fillText("\u{1F3AF} BOMBARDEIO",(m.x+p.x)/2,(m.y+p.y)/2-10)),r.globalAlpha=1}if(x.caixa){let l=x.caixa;r.strokeStyle="#5dff6f",r.lineWidth=1.5,r.fillStyle="rgba(93,255,111,0.12)",r.fillRect(Math.min(l.x0,l.x1),Math.min(l.y0,l.y1),Math.abs(l.x1-l.x0),Math.abs(l.y1-l.y0)),r.strokeRect(Math.min(l.x0,l.x1),Math.min(l.y0,l.y1),Math.abs(l.x1-l.x0),Math.abs(l.y1-l.y0))}}menuPausa(){x.pausado=!0,this.atualizarTopo();let t=this.modal(`<h2>Pausado</h2>
      <button class="bt grande" data-a="voltar">\u25B6 Continuar</button>
      <button class="bt" data-a="ajuda">\u2753 Como jogar</button>
      <label><input type="checkbox" data-a="som" ${x.cfg.som?"checked":""}> \u{1F50A} Som</label>
      <button class="bt" data-a="nova">\u{1F504} Nova partida</button>`);t.querySelector("[data-a=voltar]").onclick=()=>{t.remove(),x.pausado=!1,this.atualizarTopo()},t.querySelector("[data-a=ajuda]").onclick=()=>this.ajuda(),t.querySelector("[data-a=som]").onchange=e=>{x.cfg.som=e.target.checked,yo(e.target.checked),x.salvarCfg()},t.querySelector("[data-a=nova]").onclick=()=>location.reload()}ajuda(){let t=this.modal(`<h2>Como jogar</h2><div class="ajuda">${$y}</div><button class="bt grande" data-a="ok">Entendi</button>`);t.querySelector("[data-a=ok]").onclick=()=>t.remove()}modal(t){let e=ns("div","modal",`<div class="caixa">${t}</div>`);return e.addEventListener("pointerdown",i=>i.stopPropagation()),document.body.appendChild(e),e}fim(t,e){let i=Math.floor(x.tempo/60),s=this.modal(`<h2>${t?"\u{1F3C6} Vit\xF3ria!":"\u2620\uFE0F Derrota"}</h2><p>${e}</p>
      <div class="stats">\u2705 Civis resgatados: <b>${x.resgatados}</b><br>\u{1F9DF} Zumbis eliminados: <b>${x.zumbisMortos}</b><br>
      \u2623\uFE0F Pessoas infectadas: <b>${x.infectados}</b><br>\u{1F480} Civis mortos: <b>${x.civisMortos}</b><br>\u{1FA96} Unidades perdidas: <b>${x.perdas}</b><br>\u23F1\uFE0F Tempo: <b>${i} min</b> (dia ${x.dia})</div>
      ${t?'<button class="bt grande" data-a="cont">Continuar jogando</button>':""}
      <button class="bt grande" data-a="nova">\u{1F504} Nova partida</button>`),r=s.querySelector("[data-a=cont]");r&&(r.onclick=()=>{s.remove(),x.pausado=!1,x.meta=99999,this.atualizarTopo()}),s.querySelector("[data-a=nova]").onclick=()=>location.reload()}quadro(t){this._t=(this._t||0)+t,this._tm=(this._tm||0)+t,this._t>.25&&(this._t=0,this._presos=ze.reduce((e,i)=>e+(i.base?0:i.civis),0),this.atualizarTopo(),x.selecao.length&&this.atualizarSelecaoLeve()),this._tm>.5&&(this._tm=0,this.desenharMini()),this.desenharOverlay(t)}atualizarSelecaoLeve(){this._ts=(this._ts||0)+1,this._ts%4===0&&this.atualizarSelecao()}};function Ou(n,t,e,i,s,r){n.beginPath(),n.moveTo(t+r,e),n.arcTo(t+i,e,t+i,e+s,r),n.arcTo(t+i,e+s,t,e+s,r),n.arcTo(t,e+s,t,e,r),n.arcTo(t,e,t+i,e,r),n.closePath()}var $y=`
<p><b>Cidades:</b> no menu inicial escolha <b>Miami</b>, <b>S\xE3o Francisco</b> (base naval em Treasure Island, porta-avi\xF5es na ba\xEDa) ou a <b>Cidade do M\xE9xico</b> (base no Bosque de Chapultepec; sem mar, os jatos saem de uma pista de pouso).</p>
<p><b>\u{1F528} Construir:</b> no painel \u{1F3ED} Produzir, aba Construir: escolha posto avan\xE7ado (FOB), quartel, p\xE1tio, heliporto, docas, zona segura, torre ou barreira e toque no mapa. Bases novas produzem unidades perto da frente de batalha, e FOB/zonas seguras recebem civis.</p>
<p><b>Objetivo:</b> um surto zumbi come\xE7ou em Miami e se espalha aos poucos. Resgate os civis e leve-os para a <b>Zona Segura</b> da base (no Porto de Miami) ou para o <b>porta-avi\xF5es</b>. Se o Quartel-General cair, voc\xEA perde.</p>
<p><b>C\xE2mera:</b> arraste com um dedo para mover \u2022 pin\xE7a com dois dedos para zoom \u2022 gire os dois dedos para rodar \u2022 arraste dois dedos para cima/baixo para inclinar. No PC: arraste, roda do mouse, bot\xE3o direito gira, WASD e Q/E.</p>
<p><b>Selecionar:</b> toque numa unidade. Toque duplo seleciona todas do mesmo tipo na tela. Segure o dedo parado e arraste para selecionar em caixa (ou use \u2B1A Caixa). \u2795 V\xE1rias soma unidades \xE0 sele\xE7\xE3o. Os bot\xF5es \u{1FA96} \u{1F681} \u2693 \u2708\uFE0F selecionam grupos.</p>
<p><b>Ordens</b> (com unidades selecionadas): toque no ch\xE3o para mover \u2022 num zumbi para atacar \u2022 num <b>pr\xE9dio</b> para p\xF4r os soldados no telhado (atiram de cima com mais alcance) \u2022 num pr\xE9dio com <b>SOS</b> para resgatar os civis presos (helic\xF3pteros pegam pelo telhado) \u2022 num <b>ve\xEDculo, helic\xF3ptero ou barco</b> para embarcar as tropas \u2022 com aeronaves selecionadas, toque no porta-avi\xF5es para pousar no conv\xE9s.</p>
<p><b>Civis</b> seguem soldados e ve\xEDculos que chegam perto e entram sozinhos em transportes. Leve-os para a zona segura: ao chegar l\xE1, s\xE3o resgatados (+$40 cada). Civis que acenam viram voc\xEA ao longe.</p>
<p><b>Produ\xE7\xE3o:</b> \u{1F3ED} Produzir abre o Quartel (infantaria), o P\xE1tio (Humvee, Stryker, Bradley, Abrams, Paladin, HIMARS, ambul\xE2ncia), o Heliporto (Black Hawk, Chinook, Apache, drone Reaper), as Docas (lancha, hovercraft LCAC, destr\xF3ier) e o porta-avi\xF5es (F-35, F/A-18, Osprey).</p>
<p><b>Jatos:</b> selecione os jatos (toque num jato ou no bot\xE3o \u2708\uFE0F) e <b>arraste o dedo no mapa</b> para marcar a \xE1rea de bombardeio: eles decolam do porta-avi\xF5es, fazem passadas soltando bombas ao longo da faixa e voltam para rearmar. Um toque simples ataca um ponto.</p>
<p><b>Pr\xE9dios:</b> metade dos soldados fica nas janelas (quebram o vidro e atiram para fora) e metade no telhado.</p>
<p><b>\u{1F693} Pol\xEDcia SWAT:</b> quando o v\xEDrus aparece, equipes da SWAT de Miami saem das delegacias sozinhas num blindado BearCat, combatem os zumbis e levam civis para a zona segura. Voc\xEA n\xE3o controla a pol\xEDcia.</p>
<p><b>\u{1F3AE} Controlar:</b> com uma unidade selecionada, assuma o controle em 3\xAA pessoa com o joystick; ela atira sozinha nos zumbis.</p>
<p><b>\u{1F3D5}\uFE0F Sobreviventes:</b> civis que ningu\xE9m resgata se juntam, acham armas e montam acampamentos com barricadas (marcador laranja). Eles se defendem sozinhos. Leve tropas ou um ve\xEDculo at\xE9 o acampamento e eles aceitam o resgate. Se a cidade ficar muito infectada, a pol\xEDcia e a SWAT desistem e viram sobreviventes tamb\xE9m (marcador azul).</p>
<p><b>Dicas:</b> tiros e explos\xF5es fazem barulho e atraem zumbis. \xC0 noite eles ficam mais r\xE1pidos. A partir do dia 2 chegam hordas do continente e aparecem zumbis corredores; no dia 3, brutamontes. Cuidado com o fogo amigo de artilharia perto de civis.</p>`;var Qn=n=>document.querySelector(n),wc=n=>{let t=Qn("#carregando-txt");t&&(t.textContent=n)};function Zy(){try{Object.assign(x.cfg,JSON.parse(localStorage.getItem("miami-cfg")||"{}"))}catch{}}x.salvarCfg=()=>{try{localStorage.setItem("miami-cfg",JSON.stringify(x.cfg))}catch{}};var Bu=new Bt(11128808),Jy=new Bt(15774330),jy=new Bt(858160),Ky=[.78,.86,.66];async function Qy(){var I;Zy(),wc("Preparando o mapa de Miami..."),await new Promise(S=>setTimeout(S,30));let n=(I=x.cfg.qualidade)!=null?I:1,t=new Sa({antialias:n>=2,powerPreference:"high-performance"});t.setPixelRatio(n===0?Math.min(1,devicePixelRatio)*.75:Math.min(n===1?1.5:2,devicePixelRatio)),t.setSize(innerWidth,innerHeight),t.outputColorSpace=Re,t.toneMapping=kh,t.toneMappingExposure=1.05,t.shadowMap.enabled=n>=1,t.shadowMap.type=Bh,Qn("#jogo").appendChild(t.domElement);let e=new Aa;e.background=Bu.clone(),e.fog=new Ea(Bu.clone(),2500,11e3);let i=new an(50,innerWidth/innerHeight,1,15e3);x.cena=e,x.camera=i,x.renderer=t;let s=new Ha(13624319,6116422,1.1);e.add(s);let r=new Va(16773336,3.2);r.position.set(-.5,1,.35),r.castShadow=n>=1,r.shadow.mapSize.set(n>=2?4096:2048,n>=2?4096:2048),r.shadow.bias=-4e-4,r.shadow.normalBias=.6,r.shadow.camera.near=10,r.shadow.camera.far=6e3,e.add(r),e.add(r.target),x.sol=r,wc("Lendo pr\xE9dios e ruas (dados de sat\xE9lite)..."),await new Promise(S=>setTimeout(S,20)),Dp(),wc("Construindo a cidade em 3D..."),await new Promise(S=>setTimeout(S,20)),Np(),x.bonecos=new ec(e),x.efeitos=new rc(e),x.hashA=new co(16,Oe,Be,4096),x.hashU=new co(24,Oe,Be,1024);let o=new bc(i);x.cam=o;let a=Le[(_e.focos||[])[0]]||Le.base;o.irPara(a.x,a.z,1400),o.yaw=.6,Tp(t.domElement,o);let c=new Tc(o);c.ajustarCidade(),yo(x.cfg.som!==!1),addEventListener("resize",()=>{t.setSize(innerWidth,innerHeight),i.aspect=innerWidth/innerHeight,i.updateProjectionMatrix()}),window.androidBack=()=>{let S=document.querySelector(".modal");if(!(S&&!Qn("#menu").classList.contains("oculto"))){if(S){S.remove(),x.pausado=!1;return}if(x.controlando){c.controlar(null);return}c.menuPausa()}};let l=new vs,h=new ie,u=new U,f=performance.now();function d(S,w){if(x.longe)return!1;u.set(S,1,w);let P=S-i.position.x,E=w-i.position.z;return P*P+E*E>900*900?!1:l.containsPoint(u)}function g(S){x.orcamentoCaminhos=4,x.hashA.limpar();for(let w of x.agentes)w.vivo&&!w.dentro&&w.estado!=="morto"&&x.hashA.add(w);x.hashU.limpar();for(let w of x.unidades)w.vivo&&!w.dentro&&x.hashU.add(w);Hp(S),_p(S),fp(S),xp(S)}function v(S){var W;let w=(W=x.hora)!=null?W:8,P;w>=6.5&&w<=18?P=1:w>18&&w<20?P=1-(w-18)/2*.72:w>5&&w<6.5?P=.28+(w-5)/1.5*.72:P=.28;let E=w>17&&w<20?1-Math.abs(w-18.7)/1.5:w>5&&w<7.5?1-Math.abs(w-6.2)/1.3:0,b=e.background;b.copy(jy).lerp(Bu,(P-.28)/.72),E>0&&b.lerp(Jy,Math.max(0,E)*.55),e.fog.color.copy(b),r.intensity=3.2*Math.max(.12,P-.1)+(P<.5?.25:0),s.intensity=.35+.8*P;let C=(w-6)/12*Math.PI,N=w>=6&&w<=18.5,D=N?.35+.65*Math.max(0,Math.sin(C)):.9;x.dirSol={x:N?-Math.cos(C)*.9:.4,y:D,z:.45},r.color.setHex(E>.3?16758900:P<.5?9414399:16773336),x.agua.userData.tempo.value+=S;let F=Math.max(0,Math.min(1,(.85-P)/.5));for(let L in Ci)Ci[L].emissiveIntensity=F*.9}function m(S){requestAnimationFrame(m);let w=Math.min(.05,(S-f)/1e3);f=S,x.teclado&&x.teclado(w);let P=x.joyUI||(x.joyTeclado?{x:x.joyTeclado.x,y:x.joyTeclado.z}:null);if(P){let L=Math.sin(o.yaw),Y=Math.cos(o.yaw);x.joy={x:Y*P.x+L*P.y,z:-L*P.x+Y*P.y}}else x.joy=null;let E=performance.now();if(!x.pausado&&x.iniciado)for(let L=0;L<x.velocidade;L++)g(w);let b=performance.now();if(x.perfSim=(x.perfSim||0)*.95+(b-E)*.05,o.aplicar(w),x.dirSol){let L=Math.min(2200,Math.max(70,o.dist*1.25)),Y=r.shadow.camera;Math.abs(Y.right-L)>L*.1&&(Y.left=-L,Y.right=L,Y.top=L,Y.bottom=-L,Y.updateProjectionMatrix());let H=2*L/r.shadow.mapSize.x,Q=Math.round(o.alvo.x/H)*H,et=Math.round(o.alvo.z/H)*H,tt=x.dirSol,ht=Math.hypot(tt.x,tt.y,tt.z);r.target.position.set(Q,0,et),r.position.set(Q+tt.x/ht*3e3,tt.y/ht*3e3,et+tt.z/ht*3e3)}if(x.decor){let L=o.dist<2200;for(let Y of x.decor)Y.visible=L}e.fog.near=Math.max(1500,o.dist*2.2),e.fog.far=Math.max(9e3,o.dist*6),v(x.pausado?0:w),h.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),l.setFromProjectionMatrix(h);let C=x.bonecos;if(C.comecar(),o.dist<900){for(let L of x.unidades){if(L.classe!=="inf"||!L.vivo||L.dentro||!d(L.x,L.z))continue;let Y=L.mirando>0&&L.velAtual<.5?2:0,H=Math.min(1,L.velAtual/3);L.policia?C.add(L.x,L.y,L.z,L.ang,L.fase,Y,ic,sc,fo,2,1,null,H):C.add(L.x,L.y,L.z,L.ang,L.fase,Y,L.tipo==="sniper"?Ky:uo,nc,fo,1,1,null,H)}dp(C,d)}x.longe=o.dist>=900,C.terminar(),x.efeitos.atualizar(x.pausado?0:w*x.velocidade,innerHeight*.9);let N=0;for(let L of x.unidades)if(L.classe==="aereo"&&L.vivo&&!L.dentro&&!(L.pousado&&L.parado>3)){let Y=Math.hypot(L.x-o.alvo.x,L.z-o.alvo.z)+o.dist*.5;N=Math.max(N,1-Y/700)}cp(x.pausado?0:Math.max(0,N));let D=0,F=0,W=0;for(let L of x.unidades){if(!L.vivo||L.dentro)continue;let Y=Math.hypot(L.x-o.alvo.x,L.z-o.alvo.z)+o.dist*.5;if(L.classe==="jato"&&(L.estadoJato==="voando"||L.estadoJato==="voltando"))D=Math.max(D,1-Y/2600);else if(L.classe==="veic"){let H=(1-Y/350)*(L.d.raio>=3.4?1:.55);H>F&&(F=H,W=Math.min(1,L.velAtual/L.d.vel))}}lp(x.pausado?0:Math.max(0,D)),hp(x.pausado?0:Math.max(0,F),W),t.render(e,i),x.iniciado&&c.quadro(w)}requestAnimationFrame(m),Qn("#carregando").classList.add("oculto");let p=Qn("#menu");p.classList.remove("oculto");let y="normal";p.querySelectorAll("[data-dif]").forEach(S=>S.addEventListener("click",()=>{y=S.dataset.dif,p.querySelectorAll("[data-dif]").forEach(w=>w.classList.toggle("ativo",w===S))}));let _=Qn("#m-som"),M=Qn("#m-qual");_.checked=x.cfg.som!==!1,M.value=String(n),_.onchange=()=>{x.cfg.som=_.checked,yo(_.checked),x.salvarCfg()},M.onchange=()=>{x.cfg.qualidade=+M.value,x.salvarCfg(),Qn("#m-qual-aviso").textContent="A qualidade muda ao abrir o jogo de novo."},Qn("#m-ajuda").onclick=()=>c.ajuda(),p.querySelectorAll("[data-cidade]").forEach(S=>{S.classList.toggle("ativo",S.dataset.cidade===(_e.cidade||"miami")),S.addEventListener("click",()=>{if(S.dataset.cidade!==(_e.cidade||"miami")){try{localStorage.setItem("miami-cidade",S.dataset.cidade)}catch{}location.href=location.pathname+"?cidade="+S.dataset.cidade}})}),Qn("#m-jogar").onclick=()=>{zi(),p.classList.add("oculto"),Fp(y),x.iniciado=!0,o.irPara(x.estr.qg.x,x.estr.qg.z,420),o.yaw=x.baseEixo.ang+Math.PI,c.atualizarTopo(),c.alerta(`\u{1F4FB} ${Le.base.nome} operante. Relatos de ataques estranhos em ${_e.nome}...`,x.estr.qg.x,x.estr.qg.z,"info"),c.alerta("Dica: toque em \u2753 no menu \u2699\uFE0F para ver os controles",null,null,"info")},/[?&]auto/.test(location.search)&&Qn("#m-jogar").click(),window.G=x,window.__dbg={ordenar:fi,ordenarMover:di,desembarcar:Li,enfileirar:Ac,simular:g,predios:ze,NAV:yu,MAPA:au,tela:(S,w,P)=>rn(S,w,P,i)}}Qy().catch(n=>{console.error(n),wc("Erro ao iniciar: "+n.message)});})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
