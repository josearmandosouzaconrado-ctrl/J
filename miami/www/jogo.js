(()=>{var t0=Object.defineProperty;var ef=(n,t)=>{for(var e in t)t0(n,e,{get:t[e],enumerable:!0})};var Wh="170";var e0=0,nf=1,n0=2;var vd=1,Xh=2,Si=3,$i=0,pn=1,Yn=2,qi=0,rr=1,lr=2,sf=3,rf=4,i0=5,ps=100,s0=101,r0=102,o0=103,a0=104,c0=200,l0=201,h0=202,u0=203,gl=204,xl=205,f0=206,d0=207,p0=208,m0=209,g0=210,x0=211,v0=212,_0=213,y0=214,vl=0,_l=1,yl=2,hr=3,Ml=4,bl=5,Sl=6,El=7,qa=0,M0=1,b0=2,Yi=0,S0=1,E0=2,A0=3,qh=4,T0=5,w0=6,C0=7;var _d=300,ur=301,fr=302,Al=303,Tl=304,Ya=306,Dn=1e3,xs=1001,wl=1002,sn=1003,R0=1004;var Io=1005;var hn=1006,Dc=1007;var vs=1008;var wn=1009,yd=1010,Md=1011,Kr=1012,Yh=1013,ys=1014,ii=1015,oo=1016,$h=1017,Zh=1018,dr=1020,bd=35902,Sd=1021,Ed=1022,dn=1023,Ad=1024,Td=1025,or=1026,pr=1027,ao=1028,Jh=1029,wd=1030,jh=1031;var Kh=1033,aa=33776,ca=33777,la=33778,ha=33779,Cl=35840,Rl=35841,Pl=35842,Il=35843,zl=36196,Ll=37492,Ul=37496,Dl=37808,Nl=37809,Fl=37810,Ol=37811,Bl=37812,kl=37813,Hl=37814,Vl=37815,Gl=37816,Wl=37817,Xl=37818,ql=37819,Yl=37820,$l=37821,ua=36492,Zl=36494,Jl=36495,Cd=36283,jl=36284,Kl=36285,Ql=36286;var fa=2300,th=2301,Nc=2302,of=2400,af=2401,cf=2402;var P0=3200,I0=3201;var Qh=0,z0=1,Xi="",Re="srgb",vr="srgb-linear",$a="linear",me="srgb";var Vs=7680;var lf=519,L0=512,U0=513,D0=514,Rd=515,N0=516,F0=517,O0=518,B0=519,hf=35044,Ki=35048;var uf="300 es",Ei=2e3,da=2001,Zi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Fc=Math.PI/180,eh=180/Math.PI;function _r(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]+"-"+en[t&255]+en[t>>8&255]+"-"+en[t>>16&15|64]+en[t>>24&255]+"-"+en[e&63|128]+en[e>>8&255]+"-"+en[e>>16&255]+en[e>>24&255]+en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]).toLowerCase()}function Je(n,t,e){return Math.max(t,Math.min(e,n))}function k0(n,t){return(n%t+t)%t}function Oc(n,t,e){return(1-e)*n+e*t}function Br(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function fn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var at=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Je(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Kt=class n{constructor(t,e,i,s,r,o,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],d=i[5],g=i[8],v=s[0],m=s[3],p=s[6],M=s[1],_=s[4],y=s[7],I=s[2],S=s[5],T=s[8];return r[0]=o*v+a*M+c*I,r[3]=o*m+a*_+c*S,r[6]=o*p+a*y+c*T,r[1]=l*v+h*M+u*I,r[4]=l*m+h*_+u*S,r[7]=l*p+h*y+u*T,r[2]=f*v+d*M+g*I,r[5]=f*m+d*_+g*S,r[8]=f*p+d*y+g*T,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=u*v,t[1]=(s*l-h*i)*v,t[2]=(a*i-s*o)*v,t[3]=f*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(i*c-l*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Bc.makeScale(t,e)),this}rotate(t){return this.premultiply(Bc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Bc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Bc=new Kt;function Pd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function pa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function H0(){let n=pa("canvas");return n.style.display="block",n}var ff={};function Yr(n){n in ff||(ff[n]=!0,console.warn(n))}function V0(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function G0(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function W0(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var le={enabled:!0,workingColorSpace:vr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===me&&(n.r=Ti(n.r),n.g=Ti(n.g),n.b=Ti(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===me&&(n.r=ar(n.r),n.g=ar(n.g),n.b=ar(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Xi?$a:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Ti(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ar(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var df=[.64,.33,.3,.6,.15,.06],pf=[.2126,.7152,.0722],mf=[.3127,.329],gf=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xf=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);le.define({[vr]:{primaries:df,whitePoint:mf,transfer:$a,toXYZ:gf,fromXYZ:xf,luminanceCoefficients:pf,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:df,whitePoint:mf,transfer:me,toXYZ:gf,fromXYZ:xf,luminanceCoefficients:pf,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}});var Gs,nh=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Gs===void 0&&(Gs=pa("canvas")),Gs.width=t.width,Gs.height=t.height;let i=Gs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Gs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=pa("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ti(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ti(e[i]/255)*255):e[i]=Ti(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},X0=0,ma=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=_r(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(kc(s[o].image)):r.push(kc(s[o]))}else r=kc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function kc(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?nh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var q0=0,mn=class n extends Zi{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=xs,s=xs,r=hn,o=vs,a=dn,c=wn,l=n.DEFAULT_ANISOTROPY,h=Xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:q0++}),this.uuid=_r(),this.name="",this.source=new ma(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_d)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Dn:t.x=t.x-Math.floor(t.x);break;case xs:t.x=t.x<0?0:1;break;case wl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Dn:t.y=t.y-Math.floor(t.y);break;case xs:t.y=t.y<0?0:1;break;case wl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=_d;mn.DEFAULT_ANISOTROPY=1;var De=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let _=(l+1)/2,y=(d+1)/2,I=(p+1)/2,S=(h+f)/4,T=(u+v)/4,R=(g+m)/4;return _>y&&_>I?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=S/i,r=T/i):y>I?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=S/s,r=R/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=T/r,s=R/r),this.set(i,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-v)/M,this.z=(f-h)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ih=class extends Zi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new De(0,0,t,e),this.scissorTest=!1,this.viewport=new De(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new mn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new ma(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},wi=class extends ih{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},ga=class extends mn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=xs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var sh=class extends mn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=xs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var gn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3],f=r[o+0],d=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(u!==v||c!==f||l!==d||h!==g){let m=1-a,p=c*f+l*d+h*g+u*v,M=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let I=Math.sqrt(_),S=Math.atan2(I,p*M);m=Math.sin(m*S)/I,a=Math.sin(a*S)/I}let y=a*M;if(c=c*m+f*y,l=l*m+d*y,h=h*m+g*y,u=u*m+v*y,m===1-a){let I=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=I,l*=I,h*=I,u*=I}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),f=c(i/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(i>a&&i>u){let d=2*Math.sqrt(1+i-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-i-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-i-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Je(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(vf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(vf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Hc.copy(this).projectOnVector(t),this.sub(Hc)}reflect(t){return this.sub(Hc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Je(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Hc=new U,vf=new gn,Ci=class{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Gn):Gn.fromBufferAttribute(r,o),Gn.applyMatrix4(t.matrixWorld),this.expandByPoint(Gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),zo.copy(i.boundingBox)),zo.applyMatrix4(t.matrixWorld),this.union(zo)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Gn),Gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(kr),Lo.subVectors(this.max,kr),Ws.subVectors(t.a,kr),Xs.subVectors(t.b,kr),qs.subVectors(t.c,kr),Bi.subVectors(Xs,Ws),ki.subVectors(qs,Xs),as.subVectors(Ws,qs);let e=[0,-Bi.z,Bi.y,0,-ki.z,ki.y,0,-as.z,as.y,Bi.z,0,-Bi.x,ki.z,0,-ki.x,as.z,0,-as.x,-Bi.y,Bi.x,0,-ki.y,ki.x,0,-as.y,as.x,0];return!Vc(e,Ws,Xs,qs,Lo)||(e=[1,0,0,0,1,0,0,0,1],!Vc(e,Ws,Xs,qs,Lo))?!1:(Uo.crossVectors(Bi,ki),e=[Uo.x,Uo.y,Uo.z],Vc(e,Ws,Xs,qs,Lo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},vi=[new U,new U,new U,new U,new U,new U,new U,new U],Gn=new U,zo=new Ci,Ws=new U,Xs=new U,qs=new U,Bi=new U,ki=new U,as=new U,kr=new U,Lo=new U,Uo=new U,cs=new U;function Vc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){cs.fromArray(n,r);let a=s.x*Math.abs(cs.x)+s.y*Math.abs(cs.y)+s.z*Math.abs(cs.z),c=t.dot(cs),l=e.dot(cs),h=i.dot(cs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Y0=new Ci,Hr=new U,Gc=new U,Ri=class{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Y0.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Hr.subVectors(t,this.center);let e=Hr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Hr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Hr.copy(t.center).add(Gc)),this.expandByPoint(Hr.copy(t.center).sub(Gc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},_i=new U,Wc=new U,Do=new U,Hi=new U,Xc=new U,No=new U,qc=new U,mr=class{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_i)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=_i.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(_i.copy(this.origin).addScaledVector(this.direction,e),_i.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Wc.copy(t).add(e).multiplyScalar(.5),Do.copy(e).sub(t).normalize(),Hi.copy(this.origin).sub(Wc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Do),a=Hi.dot(this.direction),c=-Hi.dot(Do),l=Hi.lengthSq(),h=Math.abs(1-o*o),u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let v=1/h;u*=v,f*=v,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Wc).addScaledVector(Do,f),d}intersectSphere(t,e){_i.subVectors(t.center,this.origin);let i=_i.dot(this.direction),s=_i.dot(_i)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,_i)!==null}intersectTriangle(t,e,i,s,r){Xc.subVectors(e,t),No.subVectors(i,t),qc.crossVectors(Xc,No);let o=this.direction.dot(qc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Hi.subVectors(this.origin,t);let c=a*this.direction.dot(No.crossVectors(Hi,No));if(c<0)return null;let l=a*this.direction.dot(Xc.cross(Hi));if(l<0||c+l>o)return null;let h=-a*Hi.dot(qc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ie=class n{constructor(t,e,i,s,r,o,a,c,l,h,u,f,d,g,v,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,h,u,f,d,g,v,m)}set(t,e,i,s,r,o,a,c,l,h,u,f,d,g,v,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/Ys.setFromMatrixColumn(t,0).length(),r=1/Ys.setFromMatrixColumn(t,1).length(),o=1/Ys.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-v*l,e[9]=-a*c,e[2]=v-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,g=l*h,v=l*u;e[0]=f+v*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=v+f*a,e[10]=o*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,g=l*h,v=l*u;e[0]=f-v*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=v-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let f=o*h,d=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+v,e[1]=c*u,e[5]=v*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=v-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-v*u}else if(t.order==="XZY"){let f=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+v,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose($0,t,Z0)}lookAt(t,e,i){let s=this.elements;return An.subVectors(t,e),An.lengthSq()===0&&(An.z=1),An.normalize(),Vi.crossVectors(i,An),Vi.lengthSq()===0&&(Math.abs(i.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Vi.crossVectors(i,An)),Vi.normalize(),Fo.crossVectors(An,Vi),s[0]=Vi.x,s[4]=Fo.x,s[8]=An.x,s[1]=Vi.y,s[5]=Fo.y,s[9]=An.y,s[2]=Vi.z,s[6]=Fo.z,s[10]=An.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],d=i[13],g=i[2],v=i[6],m=i[10],p=i[14],M=i[3],_=i[7],y=i[11],I=i[15],S=s[0],T=s[4],R=s[8],E=s[12],b=s[1],P=s[5],N=s[9],D=s[13],F=s[2],W=s[6],L=s[10],Y=s[14],H=s[3],Q=s[7],et=s[11],tt=s[15];return r[0]=o*S+a*b+c*F+l*H,r[4]=o*T+a*P+c*W+l*Q,r[8]=o*R+a*N+c*L+l*et,r[12]=o*E+a*D+c*Y+l*tt,r[1]=h*S+u*b+f*F+d*H,r[5]=h*T+u*P+f*W+d*Q,r[9]=h*R+u*N+f*L+d*et,r[13]=h*E+u*D+f*Y+d*tt,r[2]=g*S+v*b+m*F+p*H,r[6]=g*T+v*P+m*W+p*Q,r[10]=g*R+v*N+m*L+p*et,r[14]=g*E+v*D+m*Y+p*tt,r[3]=M*S+_*b+y*F+I*H,r[7]=M*T+_*P+y*W+I*Q,r[11]=M*R+_*N+y*L+I*et,r[15]=M*E+_*D+y*Y+I*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*f+i*l*f+s*a*d-i*c*d)+v*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+i*o*d+r*a*h-i*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-i*o*f+i*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],M=u*m*l-v*f*l+v*c*d-a*m*d-u*c*p+a*f*p,_=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,y=h*v*l-g*u*l+g*a*d-o*v*d-h*a*p+o*u*p,I=g*u*c-h*v*c-g*a*f+o*v*f+h*a*m-o*u*m,S=e*M+i*_+s*y+r*I;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/S;return t[0]=M*T,t[1]=(v*f*r-u*m*r-v*s*d+i*m*d+u*s*p-i*f*p)*T,t[2]=(a*m*r-v*c*r+v*s*l-i*m*l-a*s*p+i*c*p)*T,t[3]=(u*c*r-a*f*r-u*s*l+i*f*l+a*s*d-i*c*d)*T,t[4]=_*T,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*T,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*T,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*T,t[8]=y*T,t[9]=(g*u*r-h*v*r-g*i*d+e*v*d+h*i*p-e*u*p)*T,t[10]=(o*v*r-g*a*r+g*i*l-e*v*l-o*i*p+e*a*p)*T,t[11]=(h*a*r-o*u*r-h*i*l+e*u*l+o*i*d-e*a*d)*T,t[12]=I*T,t[13]=(h*v*s-g*u*s+g*i*f-e*v*f-h*i*m+e*u*m)*T,t[14]=(g*a*s-o*v*s-g*i*c+e*v*c+o*i*m-e*a*m)*T,t[15]=(o*u*s-h*a*s+h*i*c-e*u*c-o*i*f+e*a*f)*T,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,v=o*h,m=o*u,p=a*u,M=c*l,_=c*h,y=c*u,I=i.x,S=i.y,T=i.z;return s[0]=(1-(v+p))*I,s[1]=(d+y)*I,s[2]=(g-_)*I,s[3]=0,s[4]=(d-y)*S,s[5]=(1-(f+p))*S,s[6]=(m+M)*S,s[7]=0,s[8]=(g+_)*T,s[9]=(m-M)*T,s[10]=(1-(f+v))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=Ys.set(s[0],s[1],s[2]).length(),o=Ys.set(s[4],s[5],s[6]).length(),a=Ys.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Wn.copy(this);let l=1/r,h=1/o,u=1/a;return Wn.elements[0]*=l,Wn.elements[1]*=l,Wn.elements[2]*=l,Wn.elements[4]*=h,Wn.elements[5]*=h,Wn.elements[6]*=h,Wn.elements[8]*=u,Wn.elements[9]*=u,Wn.elements[10]*=u,e.setFromRotationMatrix(Wn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Ei){let c=this.elements,l=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),d,g;if(a===Ei)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===da)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Ei){let c=this.elements,l=1/(e-t),h=1/(i-s),u=1/(o-r),f=(e+t)*l,d=(i+s)*h,g,v;if(a===Ei)g=(o+r)*u,v=-2*u;else if(a===da)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Ys=new U,Wn=new ie,$0=new U(0,0,0),Z0=new U(1,1,1),Vi=new U,Fo=new U,An=new U,_f=new ie,yf=new gn,Fe=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return _f.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_f,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yf.setFromEuler(this),this.setFromQuaternion(yf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fe.DEFAULT_ORDER="XYZ";var Qr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},J0=0,Mf=new U,$s=new gn,yi=new ie,Oo=new U,Vr=new U,j0=new U,K0=new gn,bf=new U(1,0,0),Sf=new U(0,1,0),Ef=new U(0,0,1),Af={type:"added"},Q0={type:"removed"},Zs={type:"childadded",child:null},Yc={type:"childremoved",child:null},je=class n extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:J0++}),this.uuid=_r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new U,e=new Fe,i=new gn,s=new U(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new Kt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $s.setFromAxisAngle(t,e),this.quaternion.multiply($s),this}rotateOnWorldAxis(t,e){return $s.setFromAxisAngle(t,e),this.quaternion.premultiply($s),this}rotateX(t){return this.rotateOnAxis(bf,t)}rotateY(t){return this.rotateOnAxis(Sf,t)}rotateZ(t){return this.rotateOnAxis(Ef,t)}translateOnAxis(t,e){return Mf.copy(t).applyQuaternion(this.quaternion),this.position.add(Mf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(bf,t)}translateY(t){return this.translateOnAxis(Sf,t)}translateZ(t){return this.translateOnAxis(Ef,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Oo.copy(t):Oo.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(Vr,Oo,this.up):yi.lookAt(Oo,Vr,this.up),this.quaternion.setFromRotationMatrix(yi),s&&(yi.extractRotation(s.matrixWorld),$s.setFromRotationMatrix(yi),this.quaternion.premultiply($s.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Af),Zs.child=t,this.dispatchEvent(Zs),Zs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Q0),Yc.child=t,this.dispatchEvent(Yc),Yc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yi.multiply(t.parent.matrixWorld)),t.applyMatrix4(yi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Af),Zs.child=t,this.dispatchEvent(Zs),Zs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,t,j0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,K0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};je.DEFAULT_UP=new U(0,1,0);je.DEFAULT_MATRIX_AUTO_UPDATE=!0;je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xn=new U,Mi=new U,$c=new U,bi=new U,Js=new U,js=new U,Tf=new U,Zc=new U,Jc=new U,jc=new U,Kc=new De,Qc=new De,tl=new De,ms=class n{constructor(t=new U,e=new U,i=new U){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Xn.subVectors(t,e),s.cross(Xn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Xn.subVectors(s,e),Mi.subVectors(i,e),$c.subVectors(t,e);let o=Xn.dot(Xn),a=Xn.dot(Mi),c=Xn.dot($c),l=Mi.dot(Mi),h=Mi.dot($c),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,bi.x),c.addScaledVector(o,bi.y),c.addScaledVector(a,bi.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return Kc.setScalar(0),Qc.setScalar(0),tl.setScalar(0),Kc.fromBufferAttribute(t,e),Qc.fromBufferAttribute(t,i),tl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Kc,r.x),o.addScaledVector(Qc,r.y),o.addScaledVector(tl,r.z),o}static isFrontFacing(t,e,i,s){return Xn.subVectors(i,e),Mi.subVectors(t,e),Xn.cross(Mi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xn.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),Xn.cross(Mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;Js.subVectors(s,i),js.subVectors(r,i),Zc.subVectors(t,i);let c=Js.dot(Zc),l=js.dot(Zc);if(c<=0&&l<=0)return e.copy(i);Jc.subVectors(t,s);let h=Js.dot(Jc),u=js.dot(Jc);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(i).addScaledVector(Js,o);jc.subVectors(t,r);let d=Js.dot(jc),g=js.dot(jc);if(g>=0&&d<=g)return e.copy(r);let v=d*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(i).addScaledVector(js,a);let m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Tf.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(Tf,a);let p=1/(m+v+f);return o=v*p,a=f*p,e.copy(i).addScaledVector(Js,o).addScaledVector(js,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},Bo={h:0,s:0,l:0};function el(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Bt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Re){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=le.workingColorSpace){return this.r=t,this.g=e,this.b=i,le.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=le.workingColorSpace){if(t=k0(t,1),e=Je(e,0,1),i=Je(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=el(o,r,t+1/3),this.g=el(o,r,t),this.b=el(o,r,t-1/3)}return le.toWorkingColorSpace(this,s),this}setStyle(t,e=Re){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Re){let i=Id[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ti(t.r),this.g=Ti(t.g),this.b=Ti(t.b),this}copyLinearToSRGB(t){return this.r=ar(t.r),this.g=ar(t.g),this.b=ar(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Re){return le.fromWorkingColorSpace(nn.copy(this),t),Math.round(Je(nn.r*255,0,255))*65536+Math.round(Je(nn.g*255,0,255))*256+Math.round(Je(nn.b*255,0,255))}getHexString(t=Re){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(nn.copy(this),e);let i=nn.r,s=nn.g,r=nn.b,o=Math.max(i,s,r),a=Math.min(i,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(nn.copy(this),e),t.r=nn.r,t.g=nn.g,t.b=nn.b,t}getStyle(t=Re){le.fromWorkingColorSpace(nn.copy(this),t);let e=nn.r,i=nn.g,s=nn.b;return t!==Re?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Gi),this.setHSL(Gi.h+t,Gi.s+e,Gi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Gi),t.getHSL(Bo);let i=Oc(Gi.h,Bo.h,e),s=Oc(Gi.s,Bo.s,e),r=Oc(Gi.l,Bo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},nn=new Bt;Bt.NAMES=Id;var tm=0,si=class extends Zi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tm++}),this.uuid=_r(),this.name="",this.blending=rr,this.side=$i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gl,this.blendDst=xl,this.blendEquation=ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vs,this.stencilZFail=Vs,this.stencilZPass=Vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==rr&&(i.blending=this.blending),this.side!==$i&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==gl&&(i.blendSrc=this.blendSrc),this.blendDst!==xl&&(i.blendDst=this.blendDst),this.blendEquation!==ps&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==hr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==lf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Vs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Vs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Cn=class extends si{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=qa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ve=new U,ko=new at,pe=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=hf,this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ko.fromBufferAttribute(this,e),ko.applyMatrix3(t),this.setXY(e,ko.x,ko.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Br(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=fn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Br(e,this.array)),e}setX(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Br(e,this.array)),e}setY(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Br(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Br(e,this.array)),e}setW(t,e){return this.normalized&&(e=fn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),i=fn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),i=fn(i,this.array),s=fn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=fn(e,this.array),i=fn(i,this.array),s=fn(s,this.array),r=fn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==hf&&(t.usage=this.usage),t}};var xa=class extends pe{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var va=class extends pe{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Zt=class extends pe{constructor(t,e,i){super(new Float32Array(t),e,i)}},em=0,Un=new ie,nl=new je,Ks=new U,Tn=new Ci,Gr=new Ci,$e=new U,be=class n extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=_r(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Pd(t)?va:xa)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Un.makeRotationFromQuaternion(t),this.applyMatrix4(Un),this}rotateX(t){return Un.makeRotationX(t),this.applyMatrix4(Un),this}rotateY(t){return Un.makeRotationY(t),this.applyMatrix4(Un),this}rotateZ(t){return Un.makeRotationZ(t),this.applyMatrix4(Un),this}translate(t,e,i){return Un.makeTranslation(t,e,i),this.applyMatrix4(Un),this}scale(t,e,i){return Un.makeScale(t,e,i),this.applyMatrix4(Un),this}lookAt(t){return nl.lookAt(t),nl.updateMatrix(),this.applyMatrix4(nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ks).negate(),this.translate(Ks.x,Ks.y,Ks.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(i,3))}else{for(let i=0,s=e.count;i<s;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ci);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){let i=this.boundingSphere.center;if(Tn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Gr.setFromBufferAttribute(a),this.morphTargetsRelative?($e.addVectors(Tn.min,Gr.min),Tn.expandByPoint($e),$e.addVectors(Tn.max,Gr.max),Tn.expandByPoint($e)):(Tn.expandByPoint(Gr.min),Tn.expandByPoint(Gr.max))}Tn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)$e.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared($e));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)$e.fromBufferAttribute(a,l),c&&(Ks.fromBufferAttribute(t,l),$e.add(Ks)),s=Math.max(s,i.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pe(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<i.count;R++)a[R]=new U,c[R]=new U;let l=new U,h=new U,u=new U,f=new at,d=new at,g=new at,v=new U,m=new U;function p(R,E,b){l.fromBufferAttribute(i,R),h.fromBufferAttribute(i,E),u.fromBufferAttribute(i,b),f.fromBufferAttribute(r,R),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,b),h.sub(l),u.sub(l),d.sub(f),g.sub(f);let P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(P),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(P),a[R].add(v),a[E].add(v),a[b].add(v),c[R].add(m),c[E].add(m),c[b].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let R=0,E=M.length;R<E;++R){let b=M[R],P=b.start,N=b.count;for(let D=P,F=P+N;D<F;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let _=new U,y=new U,I=new U,S=new U;function T(R){I.fromBufferAttribute(s,R),S.copy(I);let E=a[R];_.copy(E),_.sub(I.multiplyScalar(I.dot(E))).normalize(),y.crossVectors(S,E);let P=y.dot(c[R])<0?-1:1;o.setXYZW(R,_.x,_.y,_.z,P)}for(let R=0,E=M.length;R<E;++R){let b=M[R],P=b.start,N=b.count;for(let D=P,F=P+N;D<F;D+=3)T(t.getX(D+0)),T(t.getX(D+1)),T(t.getX(D+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);let s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,h=new U,u=new U;if(t)for(let f=0,d=t.count;f<d;f+=3){let g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,m),a.add(h),c.add(h),l.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)$e.fromBufferAttribute(t,e),$e.normalize(),t.setXYZ(e,$e.x,$e.y,$e.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new pe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,i);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let c in i){let l=i[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},wf=new ie,ls=new mr,Ho=new Ri,Cf=new U,Vo=new U,Go=new U,Wo=new U,il=new U,Xo=new U,Rf=new U,qo=new U,oe=class extends je{constructor(t=new be,e=new Cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Xo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(il.fromBufferAttribute(u,t),o?Xo.addScaledVector(il,h):Xo.addScaledVector(il.sub(e),h))}e.add(Xo)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ho.copy(i.boundingSphere),Ho.applyMatrix4(r),ls.copy(t.ray).recast(t.near),!(Ho.containsPoint(ls.origin)===!1&&(ls.intersectSphere(Ho,Cf)===null||ls.origin.distanceToSquared(Cf)>(t.far-t.near)**2))&&(wf.copy(r).invert(),ls.copy(t.ray).applyMatrix4(wf),!(i.boundingBox!==null&&ls.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ls)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){let m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),_=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,I=_;y<I;y+=3){let S=a.getX(y),T=a.getX(y+1),R=a.getX(y+2);s=Yo(this,p,t,i,l,h,u,S,T,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){let M=a.getX(m),_=a.getX(m+1),y=a.getX(m+2);s=Yo(this,o,t,i,l,h,u,M,_,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){let m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),_=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,I=_;y<I;y+=3){let S=y,T=y+1,R=y+2;s=Yo(this,p,t,i,l,h,u,S,T,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){let M=m,_=m+1,y=m+2;s=Yo(this,o,t,i,l,h,u,M,_,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function nm(n,t,e,i,s,r,o,a){let c;if(t.side===pn?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===$i,a),c===null)return null;qo.copy(a),qo.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(qo);return l<e.near||l>e.far?null:{distance:l,point:qo.clone(),object:n}}function Yo(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Vo),n.getVertexPosition(c,Go),n.getVertexPosition(l,Wo);let h=nm(n,t,e,i,Vo,Go,Wo,Rf);if(h){let u=new U;ms.getBarycoord(Rf,Vo,Go,Wo,u),s&&(h.uv=ms.getInterpolatedAttribute(s,a,c,l,u,new at)),r&&(h.uv1=ms.getInterpolatedAttribute(r,a,c,l,u,new at)),o&&(h.normal=ms.getInterpolatedAttribute(o,a,c,l,u,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new U,materialIndex:0};ms.getNormal(Vo,Go,Wo,f.normal),h.face=f,h.barycoord=u}return h}var Ze=class n extends be{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(u,2));function g(v,m,p,M,_,y,I,S,T,R,E){let b=y/T,P=I/R,N=y/2,D=I/2,F=S/2,W=T+1,L=R+1,Y=0,H=0,Q=new U;for(let et=0;et<L;et++){let tt=et*P-D;for(let ut=0;ut<W;ut++){let Et=ut*b-N;Q[v]=Et*M,Q[m]=tt*_,Q[p]=F,l.push(Q.x,Q.y,Q.z),Q[v]=0,Q[m]=0,Q[p]=S>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(ut/T),u.push(1-et/R),Y+=1}}for(let et=0;et<R;et++)for(let tt=0;tt<T;tt++){let ut=f+tt+W*et,Et=f+tt+W*(et+1),q=f+(tt+1)+W*(et+1),Z=f+(tt+1)+W*et;c.push(ut,Et,Z),c.push(Et,q,Z),H+=6}a.addGroup(d,H,E),d+=H,f+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function gr(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function cn(n){let t={};for(let e=0;e<n.length;e++){let i=gr(n[e]);for(let s in i)t[s]=i[s]}return t}function im(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function zd(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:le.workingColorSpace}var sm={clone:gr,merge:cn},rm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,om=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nn=class extends si{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rm,this.fragmentShader=om,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=gr(t.uniforms),this.uniformsGroups=im(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},_a=class extends je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=Ei}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Wi=new U,Pf=new at,If=new at,ln=class extends _a{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=eh*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Fc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return eh*2*Math.atan(Math.tan(Fc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z)}getViewSize(t,e){return this.getViewBounds(t,Pf,If),e.subVectors(If,Pf)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Fc*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Qs=-90,tr=1,rh=class extends je{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ln(Qs,tr,t,e);s.layers=this.layers,this.add(s);let r=new ln(Qs,tr,t,e);r.layers=this.layers,this.add(r);let o=new ln(Qs,tr,t,e);o.layers=this.layers,this.add(o);let a=new ln(Qs,tr,t,e);a.layers=this.layers,this.add(a);let c=new ln(Qs,tr,t,e);c.layers=this.layers,this.add(c);let l=new ln(Qs,tr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Ei)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===da)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,l),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},ya=class extends mn{constructor(t,e,i,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:ur,super(t,e,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},oh=class extends wi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new ya(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:hn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ze(5,5,5),r=new Nn({name:"CubemapFromEquirect",uniforms:gr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pn,blending:qi});r.uniforms.tEquirect.value=e;let o=new oe(s,r),a=e.minFilter;return e.minFilter===vs&&(e.minFilter=hn),new rh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},sl=new U,am=new U,cm=new Kt,qn=class{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=sl.subVectors(i,e).cross(am.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(sl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||cm.getNormalMatrix(t),s=this.coplanarPoint(sl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},hs=new Ri,$o=new U,Ms=class{constructor(t=new qn,e=new qn,i=new qn,s=new qn,r=new qn,o=new qn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ei){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],v=s[10],m=s[11],p=s[12],M=s[13],_=s[14],y=s[15];if(i[0].setComponents(c-r,f-l,m-d,y-p).normalize(),i[1].setComponents(c+r,f+l,m+d,y+p).normalize(),i[2].setComponents(c+o,f+h,m+g,y+M).normalize(),i[3].setComponents(c-o,f-h,m-g,y-M).normalize(),i[4].setComponents(c-a,f-u,m-v,y-_).normalize(),e===Ei)i[5].setComponents(c+a,f+u,m+v,y+_).normalize();else if(e===da)i[5].setComponents(a,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hs)}intersectsSprite(t){return hs.center.set(0,0,0),hs.radius=.7071067811865476,hs.applyMatrix4(t.matrixWorld),this.intersectsSphere(hs)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if($o.x=s.normal.x>0?t.max.x:t.min.x,$o.y=s.normal.y>0?t.max.y:t.min.y,$o.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint($o)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ld(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function lm(n){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){let h=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){let g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){let v=u[d];n.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Ji=class n extends be{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){let M=p*f-o;for(let _=0;_<l;_++){let y=_*u-r;g.push(y,-M,0),v.push(0,0,1),m.push(_/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){let _=M+l*p,y=M+l*(p+1),I=M+1+l*(p+1),S=M+1+l*p;d.push(_,y,S),d.push(y,I,S)}this.setIndex(d),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(v,3)),this.setAttribute("uv",new Zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},hm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,um=`#ifdef USE_ALPHAHASH
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
#endif`,fm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gm=`#ifdef USE_AOMAP
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
#endif`,xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vm=`#ifdef USE_BATCHING
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
#endif`,_m=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ym=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Sm=`#ifdef USE_IRIDESCENCE
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
#endif`,Em=`#ifdef USE_BUMPMAP
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
#endif`,Am=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Tm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Im=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Lm=`#define PI 3.141592653589793
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
} // validated`,Um=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Dm=`vec3 transformedNormal = objectNormal;
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
#endif`,Nm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Om=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,km="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vm=`#ifdef USE_ENVMAP
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
#endif`,Gm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wm=`#ifdef USE_ENVMAP
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
#endif`,Xm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qm=`#ifdef USE_ENVMAP
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
#endif`,Ym=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$m=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jm=`#ifdef USE_GRADIENTMAP
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
}`,Km=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,eg=`uniform bool receiveShadow;
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
#endif`,ng=`#ifdef USE_ENVMAP
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
#endif`,ig=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,og=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ag=`PhysicalMaterial material;
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
#endif`,cg=`struct PhysicalMaterial {
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
}`,lg=`
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
#endif`,hg=`#if defined( RE_IndirectDiffuse )
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
#endif`,ug=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_g=`#if defined( USE_POINTS_UV )
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
#endif`,yg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Mg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Eg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ag=`#ifdef USE_MORPHTARGETS
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
#endif`,Tg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Rg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ig=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zg=`#ifdef USE_NORMALMAP
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
#endif`,Lg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ug=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ng=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Og=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Bg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$g=`float getShadowMask() {
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
}`,Zg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jg=`#ifdef USE_SKINNING
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
#endif`,jg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Kg=`#ifdef USE_SKINNING
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
#endif`,Qg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ex=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ix=`#ifdef USE_TRANSMISSION
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
#endif`,sx=`#ifdef USE_TRANSMISSION
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
#endif`,rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ax=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,lx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hx=`uniform sampler2D t2D;
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
}`,ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,px=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mx=`#include <common>
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
}`,gx=`#if DEPTH_PACKING == 3200
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
}`,xx=`#define DISTANCE
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
}`,vx=`#define DISTANCE
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
}`,_x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mx=`uniform float scale;
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
}`,bx=`uniform vec3 diffuse;
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
}`,Sx=`#include <common>
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
}`,Ex=`uniform vec3 diffuse;
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
}`,Ax=`#define LAMBERT
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
}`,Tx=`#define LAMBERT
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
}`,wx=`#define MATCAP
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
}`,Cx=`#define MATCAP
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
}`,Rx=`#define NORMAL
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
}`,Px=`#define NORMAL
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
}`,Ix=`#define PHONG
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
}`,zx=`#define PHONG
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
}`,Lx=`#define STANDARD
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
}`,Ux=`#define STANDARD
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
}`,Dx=`#define TOON
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
}`,Nx=`#define TOON
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
}`,Fx=`uniform float size;
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
}`,Ox=`uniform vec3 diffuse;
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
}`,Bx=`#include <common>
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
}`,kx=`uniform vec3 color;
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
}`,Hx=`uniform float rotation;
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
}`,Vx=`uniform vec3 diffuse;
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
}`,ne={alphahash_fragment:hm,alphahash_pars_fragment:um,alphamap_fragment:fm,alphamap_pars_fragment:dm,alphatest_fragment:pm,alphatest_pars_fragment:mm,aomap_fragment:gm,aomap_pars_fragment:xm,batching_pars_vertex:vm,batching_vertex:_m,begin_vertex:ym,beginnormal_vertex:Mm,bsdfs:bm,iridescence_fragment:Sm,bumpmap_pars_fragment:Em,clipping_planes_fragment:Am,clipping_planes_pars_fragment:Tm,clipping_planes_pars_vertex:wm,clipping_planes_vertex:Cm,color_fragment:Rm,color_pars_fragment:Pm,color_pars_vertex:Im,color_vertex:zm,common:Lm,cube_uv_reflection_fragment:Um,defaultnormal_vertex:Dm,displacementmap_pars_vertex:Nm,displacementmap_vertex:Fm,emissivemap_fragment:Om,emissivemap_pars_fragment:Bm,colorspace_fragment:km,colorspace_pars_fragment:Hm,envmap_fragment:Vm,envmap_common_pars_fragment:Gm,envmap_pars_fragment:Wm,envmap_pars_vertex:Xm,envmap_physical_pars_fragment:ng,envmap_vertex:qm,fog_vertex:Ym,fog_pars_vertex:$m,fog_fragment:Zm,fog_pars_fragment:Jm,gradientmap_pars_fragment:jm,lightmap_pars_fragment:Km,lights_lambert_fragment:Qm,lights_lambert_pars_fragment:tg,lights_pars_begin:eg,lights_toon_fragment:ig,lights_toon_pars_fragment:sg,lights_phong_fragment:rg,lights_phong_pars_fragment:og,lights_physical_fragment:ag,lights_physical_pars_fragment:cg,lights_fragment_begin:lg,lights_fragment_maps:hg,lights_fragment_end:ug,logdepthbuf_fragment:fg,logdepthbuf_pars_fragment:dg,logdepthbuf_pars_vertex:pg,logdepthbuf_vertex:mg,map_fragment:gg,map_pars_fragment:xg,map_particle_fragment:vg,map_particle_pars_fragment:_g,metalnessmap_fragment:yg,metalnessmap_pars_fragment:Mg,morphinstance_vertex:bg,morphcolor_vertex:Sg,morphnormal_vertex:Eg,morphtarget_pars_vertex:Ag,morphtarget_vertex:Tg,normal_fragment_begin:wg,normal_fragment_maps:Cg,normal_pars_fragment:Rg,normal_pars_vertex:Pg,normal_vertex:Ig,normalmap_pars_fragment:zg,clearcoat_normal_fragment_begin:Lg,clearcoat_normal_fragment_maps:Ug,clearcoat_pars_fragment:Dg,iridescence_pars_fragment:Ng,opaque_fragment:Fg,packing:Og,premultiplied_alpha_fragment:Bg,project_vertex:kg,dithering_fragment:Hg,dithering_pars_fragment:Vg,roughnessmap_fragment:Gg,roughnessmap_pars_fragment:Wg,shadowmap_pars_fragment:Xg,shadowmap_pars_vertex:qg,shadowmap_vertex:Yg,shadowmask_pars_fragment:$g,skinbase_vertex:Zg,skinning_pars_vertex:Jg,skinning_vertex:jg,skinnormal_vertex:Kg,specularmap_fragment:Qg,specularmap_pars_fragment:tx,tonemapping_fragment:ex,tonemapping_pars_fragment:nx,transmission_fragment:ix,transmission_pars_fragment:sx,uv_pars_fragment:rx,uv_pars_vertex:ox,uv_vertex:ax,worldpos_vertex:cx,background_vert:lx,background_frag:hx,backgroundCube_vert:ux,backgroundCube_frag:fx,cube_vert:dx,cube_frag:px,depth_vert:mx,depth_frag:gx,distanceRGBA_vert:xx,distanceRGBA_frag:vx,equirect_vert:_x,equirect_frag:yx,linedashed_vert:Mx,linedashed_frag:bx,meshbasic_vert:Sx,meshbasic_frag:Ex,meshlambert_vert:Ax,meshlambert_frag:Tx,meshmatcap_vert:wx,meshmatcap_frag:Cx,meshnormal_vert:Rx,meshnormal_frag:Px,meshphong_vert:Ix,meshphong_frag:zx,meshphysical_vert:Lx,meshphysical_frag:Ux,meshtoon_vert:Dx,meshtoon_frag:Nx,points_vert:Fx,points_frag:Ox,shadow_vert:Bx,shadow_frag:kx,sprite_vert:Hx,sprite_frag:Vx},pt={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},ni={basic:{uniforms:cn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:cn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:cn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:cn([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:cn([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:cn([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:cn([pt.points,pt.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:cn([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:cn([pt.common,pt.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:cn([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:cn([pt.sprite,pt.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distanceRGBA:{uniforms:cn([pt.common,pt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distanceRGBA_vert,fragmentShader:ne.distanceRGBA_frag},shadow:{uniforms:cn([pt.lights,pt.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};ni.physical={uniforms:cn([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};var Zo={r:0,b:0,g:0},us=new Fe,Gx=new ie;function Wx(n,t,e,i,s,r,o){let a=new Bt(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(M){let _=M.isScene===!0?M.background:null;return _&&_.isTexture&&(_=(M.backgroundBlurriness>0?e:t).get(_)),_}function v(M){let _=!1,y=g(M);y===null?p(a,c):y&&y.isColor&&(p(y,1),_=!0);let I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(M,_){let y=g(_);y&&(y.isCubeTexture||y.mapping===Ya)?(h===void 0&&(h=new oe(new Ze(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:gr(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,S,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),us.copy(_.backgroundRotation),us.x*=-1,us.y*=-1,us.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(us.y*=-1,us.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Gx.makeRotationFromEuler(us)),h.material.toneMapped=le.getTransfer(y.colorSpace)!==me,(u!==y||f!==y.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,d=n.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new oe(new Ji(2,2),new Nn({name:"BackgroundMaterial",uniforms:gr(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:$i,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=le.getTransfer(y.colorSpace)!==me,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,d=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,_){M.getRGB(Zo,zd(n)),i.buffers.color.setClear(Zo.r,Zo.g,Zo.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(M,_=1){a.set(M),c=_,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(a,c)},render:v,addToRenderList:m}}function Xx(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,o=!1;function a(b,P,N,D,F){let W=!1,L=u(D,N,P);r!==L&&(r=L,l(r.object)),W=d(b,D,N,F),W&&g(b,D,N,F),F!==null&&t.update(F,n.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,y(b,P,N,D),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function c(){return n.createVertexArray()}function l(b){return n.bindVertexArray(b)}function h(b){return n.deleteVertexArray(b)}function u(b,P,N){let D=N.wireframe===!0,F=i[b.id];F===void 0&&(F={},i[b.id]=F);let W=F[P.id];W===void 0&&(W={},F[P.id]=W);let L=W[D];return L===void 0&&(L=f(c()),W[D]=L),L}function f(b){let P=[],N=[],D=[];for(let F=0;F<e;F++)P[F]=0,N[F]=0,D[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:N,attributeDivisors:D,object:b,attributes:{},index:null}}function d(b,P,N,D){let F=r.attributes,W=P.attributes,L=0,Y=N.getAttributes();for(let H in Y)if(Y[H].location>=0){let et=F[H],tt=W[H];if(tt===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(tt=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(tt=b.instanceColor)),et===void 0||et.attribute!==tt||tt&&et.data!==tt.data)return!0;L++}return r.attributesNum!==L||r.index!==D}function g(b,P,N,D){let F={},W=P.attributes,L=0,Y=N.getAttributes();for(let H in Y)if(Y[H].location>=0){let et=W[H];et===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(et=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(et=b.instanceColor));let tt={};tt.attribute=et,et&&et.data&&(tt.data=et.data),F[H]=tt,L++}r.attributes=F,r.attributesNum=L,r.index=D}function v(){let b=r.newAttributes;for(let P=0,N=b.length;P<N;P++)b[P]=0}function m(b){p(b,0)}function p(b,P){let N=r.newAttributes,D=r.enabledAttributes,F=r.attributeDivisors;N[b]=1,D[b]===0&&(n.enableVertexAttribArray(b),D[b]=1),F[b]!==P&&(n.vertexAttribDivisor(b,P),F[b]=P)}function M(){let b=r.newAttributes,P=r.enabledAttributes;for(let N=0,D=P.length;N<D;N++)P[N]!==b[N]&&(n.disableVertexAttribArray(N),P[N]=0)}function _(b,P,N,D,F,W,L){L===!0?n.vertexAttribIPointer(b,P,N,F,W):n.vertexAttribPointer(b,P,N,D,F,W)}function y(b,P,N,D){v();let F=D.attributes,W=N.getAttributes(),L=P.defaultAttributeValues;for(let Y in W){let H=W[Y];if(H.location>=0){let Q=F[Y];if(Q===void 0&&(Y==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),Y==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor)),Q!==void 0){let et=Q.normalized,tt=Q.itemSize,ut=t.get(Q);if(ut===void 0)continue;let Et=ut.buffer,q=ut.type,Z=ut.bytesPerElement,ft=q===n.INT||q===n.UNSIGNED_INT||Q.gpuType===Yh;if(Q.isInterleavedBufferAttribute){let it=Q.data,Mt=it.stride,Rt=Q.offset;if(it.isInstancedInterleavedBuffer){for(let At=0;At<H.locationSize;At++)p(H.location+At,it.meshPerAttribute);b.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let At=0;At<H.locationSize;At++)m(H.location+At);n.bindBuffer(n.ARRAY_BUFFER,Et);for(let At=0;At<H.locationSize;At++)_(H.location+At,tt/H.locationSize,q,et,Mt*Z,(Rt+tt/H.locationSize*At)*Z,ft)}else{if(Q.isInstancedBufferAttribute){for(let it=0;it<H.locationSize;it++)p(H.location+it,Q.meshPerAttribute);b.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let it=0;it<H.locationSize;it++)m(H.location+it);n.bindBuffer(n.ARRAY_BUFFER,Et);for(let it=0;it<H.locationSize;it++)_(H.location+it,tt/H.locationSize,q,et,tt*Z,tt/H.locationSize*it*Z,ft)}}else if(L!==void 0){let et=L[Y];if(et!==void 0)switch(et.length){case 2:n.vertexAttrib2fv(H.location,et);break;case 3:n.vertexAttrib3fv(H.location,et);break;case 4:n.vertexAttrib4fv(H.location,et);break;default:n.vertexAttrib1fv(H.location,et)}}}}M()}function I(){R();for(let b in i){let P=i[b];for(let N in P){let D=P[N];for(let F in D)h(D[F].object),delete D[F];delete P[N]}delete i[b]}}function S(b){if(i[b.id]===void 0)return;let P=i[b.id];for(let N in P){let D=P[N];for(let F in D)h(D[F].object),delete D[F];delete P[N]}delete i[b.id]}function T(b){for(let P in i){let N=i[P];if(N[b.id]===void 0)continue;let D=N[b.id];for(let F in D)h(D[F].object),delete D[F];delete N[b.id]}}function R(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:E,dispose:I,releaseStatesOfGeometry:S,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function qx(n,t,e){let i;function s(l){i=l}function r(l,h){n.drawArrays(i,l,h),e.update(h,i,1)}function o(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),e.update(h,i,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,i,1)}function c(l,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,l,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Yx(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==dn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){let R=T===oo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==wn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==ii&&!R)}function c(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,S=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:I,maxSamples:S}}function $x(n){let t=this,e=null,i=0,s=!1,r=!1,o=new qn,a=new Kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let M=r?0:i,_=M*4,y=p.clippingState||null;c.value=y,y=h(g,f,_,d);for(let I=0;I!==_;++I)y[I]=e[I];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,g){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=c.value,g!==!0||m===null){let p=d+v*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,y=d;_!==v;++_,y+=4)o.copy(u[_]).applyMatrix4(M,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Zx(n){let t=new WeakMap;function e(o,a){return a===Al?o.mapping=ur:a===Tl&&(o.mapping=fr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Al||a===Tl)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new oh(c.height);return l.fromEquirectangularTexture(n,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var Ma=class extends _a{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ir=4,zf=[.125,.215,.35,.446,.526,.582],gs=20,rl=new Ma,Lf=new Bt,ol=null,al=0,cl=0,ll=!1,ds=(1+Math.sqrt(5))/2,er=1/ds,Uf=[new U(-ds,er,0),new U(ds,er,0),new U(-er,0,ds),new U(er,0,ds),new U(0,ds,-er),new U(0,ds,er),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],ba=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){ol=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),cl=this._renderer.getActiveMipmapLevel(),ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ff(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ol,al,cl),this._renderer.xr.enabled=ll,t.scissorTest=!1,Jo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ur||t.mapping===fr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ol=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),cl=this._renderer.getActiveMipmapLevel(),ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:oo,format:dn,colorSpace:vr,depthBuffer:!1},s=Df(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Df(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jx(r)),this._blurMaterial=jx(r,t,e)}return s}_compileMaterial(t){let e=new oe(this._lodPlanes[0],t);this._renderer.compile(e,rl)}_sceneToCubeUV(t,e,i,s){let a=new ln(90,1,e,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Lf),h.toneMapping=Yi,h.autoClear=!1;let d=new Cn({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1}),g=new oe(new Ze,d),v=!1,m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,v=!0):(d.color.copy(Lf),v=!0);for(let p=0;p<6;p++){let M=p%3;M===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):M===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let _=this._cubeSize;Jo(s,M*_,p>2?_:0,_,_),h.setRenderTarget(s),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===ur||t.mapping===fr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ff()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new oe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Jo(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,rl)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Uf[(s-r-1)%Uf.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new oe(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*gs-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):gs;m>gs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gs}`);let p=[],M=0;for(let T=0;T<gs;++T){let R=T/v,E=Math.exp(-R*R/2);p.push(E),T===0?M+=E:T<m&&(M+=2*E)}for(let T=0;T<p.length;T++)p[T]=p[T]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-i;let y=this._sizeLods[s],I=3*y*(s>_-ir?s-_+ir:0),S=4*(this._cubeSize-y);Jo(e,I,S,3*y,2*y),c.setRenderTarget(e),c.render(u,rl)}};function Jx(n){let t=[],e=[],i=[],s=n,r=n-ir+1+zf.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>n-ir?c=zf[o-n+ir-1]:o===0&&(c=0),i.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,m=2,p=1,M=new Float32Array(v*g*d),_=new Float32Array(m*g*d),y=new Float32Array(p*g*d);for(let S=0;S<d;S++){let T=S%3*2/3-1,R=S>2?0:-1,E=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];M.set(E,v*g*S),_.set(f,m*g*S);let b=[S,S,S,S,S,S];y.set(b,p*g*S)}let I=new be;I.setAttribute("position",new pe(M,v)),I.setAttribute("uv",new pe(_,m)),I.setAttribute("faceIndex",new pe(y,p)),t.push(I),s>ir&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Df(n,t,e){let i=new wi(n,t,e);return i.texture.mapping=Ya,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Jo(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function jx(n,t,e){let i=new Float32Array(gs),s=new U(0,1,0);return new Nn({name:"SphericalGaussianBlur",defines:{n:gs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:tu(),fragmentShader:`

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
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Nf(){return new Nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tu(),fragmentShader:`

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
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Ff(){return new Nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qi,depthTest:!1,depthWrite:!1})}function tu(){return`

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
	`}function Kx(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let c=a.mapping,l=c===Al||c===Tl,h=c===ur||c===fr;if(l||h){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new ba(n)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new ba(n)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Qx(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&Yr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function tv(n,t,e,i){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);for(let g in f.morphAttributes){let v=f.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let g in f)t.update(f[g],n.ARRAY_BUFFER);let d=u.morphAttributes;for(let g in d){let v=d[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],n.ARRAY_BUFFER)}}function l(u){let f=[],d=u.index,g=u.attributes.position,v=0;if(d!==null){let M=d.array;v=d.version;for(let _=0,y=M.length;_<y;_+=3){let I=M[_+0],S=M[_+1],T=M[_+2];f.push(I,S,S,T,T,I)}}else if(g!==void 0){let M=g.array;v=g.version;for(let _=0,y=M.length/3-1;_<y;_+=3){let I=_+0,S=_+1,T=_+2;f.push(I,S,S,T,T,I)}}else return;let m=new(Pd(f)?va:xa)(f,1);m.version=v;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function ev(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,r,f*o),e.update(d,i,1)}function l(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,f*o,g),e.update(d,i,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,i,1)}function u(f,d,g,v){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,v,0,g);let p=0;for(let M=0;M<g;M++)p+=d[M]*v[M];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function nv(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function iv(n,t,e){let i=new WeakMap,s=new De;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=i.get(a);if(f===void 0||f.count!==u){let E=function(){T.dispose(),i.delete(a),a.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],_=0;d===!0&&(_=1),g===!0&&(_=2),v===!0&&(_=3);let y=a.attributes.position.count*_,I=1;y>t.maxTextureSize&&(I=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let S=new Float32Array(y*I*4*u),T=new ga(S,y,I,u);T.type=ii,T.needsUpdate=!0;let R=_*4;for(let b=0;b<u;b++){let P=m[b],N=p[b],D=M[b],F=y*I*4*b;for(let W=0;W<P.count;W++){let L=W*R;d===!0&&(s.fromBufferAttribute(P,W),S[F+L+0]=s.x,S[F+L+1]=s.y,S[F+L+2]=s.z,S[F+L+3]=0),g===!0&&(s.fromBufferAttribute(N,W),S[F+L+4]=s.x,S[F+L+5]=s.y,S[F+L+6]=s.z,S[F+L+7]=0),v===!0&&(s.fromBufferAttribute(D,W),S[F+L+8]=s.x,S[F+L+9]=s.y,S[F+L+10]=s.z,S[F+L+11]=D.itemSize===4?s.w:1)}}f={count:u,texture:T,size:new at(y,I)},i.set(a,f),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];let g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function sv(n,t,e,i){let s=new WeakMap;function r(c){let l=i.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var Sa=class extends mn{constructor(t,e,i,s,r,o,a,c,l,h=or){if(h!==or&&h!==pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===or&&(i=ys),i===void 0&&h===pr&&(i=dr),super(null,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:sn,this.minFilter=c!==void 0?c:sn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Ud=new mn,Of=new Sa(1,1),Dd=new ga,Nd=new sh,Fd=new ya,Bf=[],kf=[],Hf=new Float32Array(16),Vf=new Float32Array(9),Gf=new Float32Array(4);function yr(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Bf[s];if(r===void 0&&(r=new Float32Array(s),Bf[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function We(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Xe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Za(n,t){let e=kf[t];e===void 0&&(e=new Int32Array(t),kf[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function rv(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function ov(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;n.uniform2fv(this.addr,t),Xe(e,t)}}function av(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(We(e,t))return;n.uniform3fv(this.addr,t),Xe(e,t)}}function cv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;n.uniform4fv(this.addr,t),Xe(e,t)}}function lv(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(We(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,i))return;Gf.set(i),n.uniformMatrix2fv(this.addr,!1,Gf),Xe(e,i)}}function hv(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(We(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,i))return;Vf.set(i),n.uniformMatrix3fv(this.addr,!1,Vf),Xe(e,i)}}function uv(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(We(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,i))return;Hf.set(i),n.uniformMatrix4fv(this.addr,!1,Hf),Xe(e,i)}}function fv(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function dv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;n.uniform2iv(this.addr,t),Xe(e,t)}}function pv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;n.uniform3iv(this.addr,t),Xe(e,t)}}function mv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;n.uniform4iv(this.addr,t),Xe(e,t)}}function gv(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function xv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;n.uniform2uiv(this.addr,t),Xe(e,t)}}function vv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;n.uniform3uiv(this.addr,t),Xe(e,t)}}function _v(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;n.uniform4uiv(this.addr,t),Xe(e,t)}}function yv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Of.compareFunction=Rd,r=Of):r=Ud,e.setTexture2D(t||r,s)}function Mv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Nd,s)}function bv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Fd,s)}function Sv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Dd,s)}function Ev(n){switch(n){case 5126:return rv;case 35664:return ov;case 35665:return av;case 35666:return cv;case 35674:return lv;case 35675:return hv;case 35676:return uv;case 5124:case 35670:return fv;case 35667:case 35671:return dv;case 35668:case 35672:return pv;case 35669:case 35673:return mv;case 5125:return gv;case 36294:return xv;case 36295:return vv;case 36296:return _v;case 35678:case 36198:case 36298:case 36306:case 35682:return yv;case 35679:case 36299:case 36307:return Mv;case 35680:case 36300:case 36308:case 36293:return bv;case 36289:case 36303:case 36311:case 36292:return Sv}}function Av(n,t){n.uniform1fv(this.addr,t)}function Tv(n,t){let e=yr(t,this.size,2);n.uniform2fv(this.addr,e)}function wv(n,t){let e=yr(t,this.size,3);n.uniform3fv(this.addr,e)}function Cv(n,t){let e=yr(t,this.size,4);n.uniform4fv(this.addr,e)}function Rv(n,t){let e=yr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Pv(n,t){let e=yr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Iv(n,t){let e=yr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function zv(n,t){n.uniform1iv(this.addr,t)}function Lv(n,t){n.uniform2iv(this.addr,t)}function Uv(n,t){n.uniform3iv(this.addr,t)}function Dv(n,t){n.uniform4iv(this.addr,t)}function Nv(n,t){n.uniform1uiv(this.addr,t)}function Fv(n,t){n.uniform2uiv(this.addr,t)}function Ov(n,t){n.uniform3uiv(this.addr,t)}function Bv(n,t){n.uniform4uiv(this.addr,t)}function kv(n,t,e){let i=this.cache,s=t.length,r=Za(e,s);We(i,r)||(n.uniform1iv(this.addr,r),Xe(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Ud,r[o])}function Hv(n,t,e){let i=this.cache,s=t.length,r=Za(e,s);We(i,r)||(n.uniform1iv(this.addr,r),Xe(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Nd,r[o])}function Vv(n,t,e){let i=this.cache,s=t.length,r=Za(e,s);We(i,r)||(n.uniform1iv(this.addr,r),Xe(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Fd,r[o])}function Gv(n,t,e){let i=this.cache,s=t.length,r=Za(e,s);We(i,r)||(n.uniform1iv(this.addr,r),Xe(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Dd,r[o])}function Wv(n){switch(n){case 5126:return Av;case 35664:return Tv;case 35665:return wv;case 35666:return Cv;case 35674:return Rv;case 35675:return Pv;case 35676:return Iv;case 5124:case 35670:return zv;case 35667:case 35671:return Lv;case 35668:case 35672:return Uv;case 35669:case 35673:return Dv;case 5125:return Nv;case 36294:return Fv;case 36295:return Ov;case 36296:return Bv;case 35678:case 36198:case 36298:case 36306:case 35682:return kv;case 35679:case 36299:case 36307:return Hv;case 35680:case 36300:case 36308:case 36293:return Vv;case 36289:case 36303:case 36311:case 36292:return Gv}}var ah=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Ev(e.type)}},ch=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Wv(e.type)}},lh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},hl=/(\w+)(\])?(\[|\.)?/g;function Wf(n,t){n.seq.push(t),n.map[t.id]=t}function Xv(n,t,e){let i=n.name,s=i.length;for(hl.lastIndex=0;;){let r=hl.exec(i),o=hl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Wf(e,l===void 0?new ah(a,n,t):new ch(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new lh(a),Wf(e,u)),e=u}}}var cr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Xv(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function Xf(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var qv=37297,Yv=0;function $v(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var qf=new Kt;function Zv(n){le._getMatrix(qf,le.workingColorSpace,n);let t=`mat3( ${qf.elements.map(e=>e.toFixed(4))} )`;switch(le.getTransfer(n)){case $a:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Yf(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+$v(n.getShaderSource(t),o)}else return s}function Jv(n,t){let e=Zv(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function jv(n,t){let e;switch(t){case S0:e="Linear";break;case E0:e="Reinhard";break;case A0:e="Cineon";break;case qh:e="ACESFilmic";break;case w0:e="AgX";break;case C0:e="Neutral";break;case T0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var jo=new U;function Kv(){le.getLuminanceCoefficients(jo);let n=jo.x.toFixed(4),t=jo.y.toFixed(4),e=jo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Qv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($r).join(`
`)}function t1(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function e1(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function $r(n){return n!==""}function $f(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zf(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var n1=/^[ \t]*#include +<([\w\d./]+)>/gm;function hh(n){return n.replace(n1,s1)}var i1=new Map;function s1(n,t){let e=ne[t];if(e===void 0){let i=i1.get(t);if(i!==void 0)e=ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return hh(e)}var r1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jf(n){return n.replace(r1,o1)}function o1(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function jf(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function a1(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===vd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Xh?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Si&&(t="SHADOWMAP_TYPE_VSM"),t}function c1(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ur:case fr:t="ENVMAP_TYPE_CUBE";break;case Ya:t="ENVMAP_TYPE_CUBE_UV";break}return t}function l1(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case fr:t="ENVMAP_MODE_REFRACTION";break}return t}function h1(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case qa:t="ENVMAP_BLENDING_MULTIPLY";break;case M0:t="ENVMAP_BLENDING_MIX";break;case b0:t="ENVMAP_BLENDING_ADD";break}return t}function u1(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function f1(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=a1(e),l=c1(e),h=l1(e),u=h1(e),f=u1(e),d=Qv(e),g=t1(r),v=s.createProgram(),m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter($r).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter($r).join(`
`),p.length>0&&(p+=`
`)):(m=[jf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($r).join(`
`),p=[jf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Yi?"#define TONE_MAPPING":"",e.toneMapping!==Yi?ne.tonemapping_pars_fragment:"",e.toneMapping!==Yi?jv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,Jv("linearToOutputTexel",e.outputColorSpace),Kv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($r).join(`
`)),o=hh(o),o=$f(o,e),o=Zf(o,e),a=hh(a),a=$f(a,e),a=Zf(a,e),o=Jf(o),a=Jf(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===uf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===uf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=M+m+o,y=M+p+a,I=Xf(s,s.VERTEX_SHADER,_),S=Xf(s,s.FRAGMENT_SHADER,y);s.attachShader(v,I),s.attachShader(v,S),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function T(P){if(n.debug.checkShaderErrors){let N=s.getProgramInfoLog(v).trim(),D=s.getShaderInfoLog(I).trim(),F=s.getShaderInfoLog(S).trim(),W=!0,L=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,I,S);else{let Y=Yf(s,I,"vertex"),H=Yf(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+N+`
`+Y+`
`+H)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(D===""||F==="")&&(L=!1);L&&(P.diagnostics={runnable:W,programLog:N,vertexShader:{log:D,prefix:m},fragmentShader:{log:F,prefix:p}})}s.deleteShader(I),s.deleteShader(S),R=new cr(s,v),E=e1(s,v)}let R;this.getUniforms=function(){return R===void 0&&T(this),R};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(v,qv)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Yv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=S,this}var d1=0,uh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new fh(t),e.set(t,i)),i}},fh=class{constructor(t){this.id=d1++,this.code=t,this.usedTimes=0}};function p1(n,t,e,i,s,r,o){let a=new Qr,c=new uh,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,b,P,N,D){let F=N.fog,W=D.geometry,L=E.isMeshStandardMaterial?N.environment:null,Y=(E.isMeshStandardMaterial?e:t).get(E.envMap||L),H=Y&&Y.mapping===Ya?Y.image.height:null,Q=g[E.type];E.precision!==null&&(d=s.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));let et=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,tt=et!==void 0?et.length:0,ut=0;W.morphAttributes.position!==void 0&&(ut=1),W.morphAttributes.normal!==void 0&&(ut=2),W.morphAttributes.color!==void 0&&(ut=3);let Et,q,Z,ft;if(Q){let de=ni[Q];Et=de.vertexShader,q=de.fragmentShader}else Et=E.vertexShader,q=E.fragmentShader,c.update(E),Z=c.getVertexShaderID(E),ft=c.getFragmentShaderID(E);let it=n.getRenderTarget(),Mt=n.state.buffers.depth.getReversed(),Rt=D.isInstancedMesh===!0,At=D.isBatchedMesh===!0,Xt=!!E.map,K=!!E.matcap,ot=!!Y,z=!!E.aoMap,Pt=!!E.lightMap,rt=!!E.bumpMap,xt=!!E.normalMap,dt=!!E.displacementMap,Ht=!!E.emissiveMap,bt=!!E.metalnessMap,C=!!E.roughnessMap,A=E.anisotropy>0,V=E.clearcoat>0,J=E.dispersion>0,st=E.iridescence>0,j=E.sheen>0,It=E.transmission>0,mt=A&&!!E.anisotropyMap,St=V&&!!E.clearcoatMap,se=V&&!!E.clearcoatNormalMap,ct=V&&!!E.clearcoatRoughnessMap,Tt=st&&!!E.iridescenceMap,Vt=st&&!!E.iridescenceThicknessMap,qt=j&&!!E.sheenColorMap,wt=j&&!!E.sheenRoughnessMap,re=!!E.specularMap,ee=!!E.specularColorMap,xe=!!E.specularIntensityMap,O=It&&!!E.transmissionMap,gt=It&&!!E.thicknessMap,$=!!E.gradientMap,nt=!!E.alphaMap,yt=E.alphaTest>0,vt=!!E.alphaHash,Jt=!!E.extensions,Ue=Yi;E.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Ue=n.toneMapping);let tn={shaderID:Q,shaderType:E.type,shaderName:E.name,vertexShader:Et,fragmentShader:q,defines:E.defines,customVertexShaderID:Z,customFragmentShaderID:ft,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:At,batchingColor:At&&D._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&D.instanceColor!==null,instancingMorph:Rt&&D.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:it===null?n.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:vr,alphaToCoverage:!!E.alphaToCoverage,map:Xt,matcap:K,envMap:ot,envMapMode:ot&&Y.mapping,envMapCubeUVHeight:H,aoMap:z,lightMap:Pt,bumpMap:rt,normalMap:xt,displacementMap:f&&dt,emissiveMap:Ht,normalMapObjectSpace:xt&&E.normalMapType===z0,normalMapTangentSpace:xt&&E.normalMapType===Qh,metalnessMap:bt,roughnessMap:C,anisotropy:A,anisotropyMap:mt,clearcoat:V,clearcoatMap:St,clearcoatNormalMap:se,clearcoatRoughnessMap:ct,dispersion:J,iridescence:st,iridescenceMap:Tt,iridescenceThicknessMap:Vt,sheen:j,sheenColorMap:qt,sheenRoughnessMap:wt,specularMap:re,specularColorMap:ee,specularIntensityMap:xe,transmission:It,transmissionMap:O,thicknessMap:gt,gradientMap:$,opaque:E.transparent===!1&&E.blending===rr&&E.alphaToCoverage===!1,alphaMap:nt,alphaTest:yt,alphaHash:vt,combine:E.combine,mapUv:Xt&&v(E.map.channel),aoMapUv:z&&v(E.aoMap.channel),lightMapUv:Pt&&v(E.lightMap.channel),bumpMapUv:rt&&v(E.bumpMap.channel),normalMapUv:xt&&v(E.normalMap.channel),displacementMapUv:dt&&v(E.displacementMap.channel),emissiveMapUv:Ht&&v(E.emissiveMap.channel),metalnessMapUv:bt&&v(E.metalnessMap.channel),roughnessMapUv:C&&v(E.roughnessMap.channel),anisotropyMapUv:mt&&v(E.anisotropyMap.channel),clearcoatMapUv:St&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:se&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Tt&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:Vt&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:qt&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:wt&&v(E.sheenRoughnessMap.channel),specularMapUv:re&&v(E.specularMap.channel),specularColorMapUv:ee&&v(E.specularColorMap.channel),specularIntensityMapUv:xe&&v(E.specularIntensityMap.channel),transmissionMapUv:O&&v(E.transmissionMap.channel),thicknessMapUv:gt&&v(E.thicknessMap.channel),alphaMapUv:nt&&v(E.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(xt||A),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!W.attributes.uv&&(Xt||nt),fog:!!F,useFog:E.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Mt,skinning:D.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:ut,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ue,decodeVideoTexture:Xt&&E.map.isVideoTexture===!0&&le.getTransfer(E.map.colorSpace)===me,decodeVideoTextureEmissive:Ht&&E.emissiveMap.isVideoTexture===!0&&le.getTransfer(E.emissiveMap.colorSpace)===me,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Yn,flipSided:E.side===pn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Jt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Jt&&E.extensions.multiDraw===!0||At)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return tn.vertexUv1s=l.has(1),tn.vertexUv2s=l.has(2),tn.vertexUv3s=l.has(3),l.clear(),tn}function p(E){let b=[];if(E.shaderID?b.push(E.shaderID):(b.push(E.customVertexShaderID),b.push(E.customFragmentShaderID)),E.defines!==void 0)for(let P in E.defines)b.push(P),b.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(M(b,E),_(b,E),b.push(n.outputColorSpace)),b.push(E.customProgramCacheKey),b.join()}function M(E,b){E.push(b.precision),E.push(b.outputColorSpace),E.push(b.envMapMode),E.push(b.envMapCubeUVHeight),E.push(b.mapUv),E.push(b.alphaMapUv),E.push(b.lightMapUv),E.push(b.aoMapUv),E.push(b.bumpMapUv),E.push(b.normalMapUv),E.push(b.displacementMapUv),E.push(b.emissiveMapUv),E.push(b.metalnessMapUv),E.push(b.roughnessMapUv),E.push(b.anisotropyMapUv),E.push(b.clearcoatMapUv),E.push(b.clearcoatNormalMapUv),E.push(b.clearcoatRoughnessMapUv),E.push(b.iridescenceMapUv),E.push(b.iridescenceThicknessMapUv),E.push(b.sheenColorMapUv),E.push(b.sheenRoughnessMapUv),E.push(b.specularMapUv),E.push(b.specularColorMapUv),E.push(b.specularIntensityMapUv),E.push(b.transmissionMapUv),E.push(b.thicknessMapUv),E.push(b.combine),E.push(b.fogExp2),E.push(b.sizeAttenuation),E.push(b.morphTargetsCount),E.push(b.morphAttributeCount),E.push(b.numDirLights),E.push(b.numPointLights),E.push(b.numSpotLights),E.push(b.numSpotLightMaps),E.push(b.numHemiLights),E.push(b.numRectAreaLights),E.push(b.numDirLightShadows),E.push(b.numPointLightShadows),E.push(b.numSpotLightShadows),E.push(b.numSpotLightShadowsWithMaps),E.push(b.numLightProbes),E.push(b.shadowMapType),E.push(b.toneMapping),E.push(b.numClippingPlanes),E.push(b.numClipIntersection),E.push(b.depthPacking)}function _(E,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),E.push(a.mask)}function y(E){let b=g[E.type],P;if(b){let N=ni[b];P=sm.clone(N.uniforms)}else P=E.uniforms;return P}function I(E,b){let P;for(let N=0,D=h.length;N<D;N++){let F=h[N];if(F.cacheKey===b){P=F,++P.usedTimes;break}}return P===void 0&&(P=new f1(n,b,E,r),h.push(P)),P}function S(E){if(--E.usedTimes===0){let b=h.indexOf(E);h[b]=h[h.length-1],h.pop(),E.destroy()}}function T(E){c.remove(E)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:I,releaseProgram:S,releaseShaderCache:T,programs:h,dispose:R}}function m1(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function g1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Kf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Qf(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,f,d,g,v,m){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},n[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function a(u,f,d,g,v,m){let p=o(u,f,d,g,v,m);d.transmission>0?i.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,g,v,m){let p=o(u,f,d,g,v,m);d.transmission>0?i.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||g1),i.length>1&&i.sort(f||Kf),s.length>1&&s.sort(f||Kf)}function h(){for(let u=t,f=n.length;u<f;u++){let d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function x1(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Qf,n.set(i,[o])):s>=r.length?(o=new Qf,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function v1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Bt};break;case"SpotLight":e={position:new U,direction:new U,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new U,halfWidth:new U,halfHeight:new U};break}return n[t.id]=e,e}}}function _1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var y1=0;function M1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function b1(n){let t=new v1,e=_1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);let s=new U,r=new ie,o=new ie;function a(l){let h=0,u=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,M=0,_=0,y=0,I=0,S=0,T=0;l.sort(M1);for(let E=0,b=l.length;E<b;E++){let P=l[E],N=P.color,D=P.intensity,F=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=N.r*D,u+=N.g*D,f+=N.b*D;else if(P.isLightProbe){for(let L=0;L<9;L++)i.probe[L].addScaledVector(P.sh.coefficients[L],D);T++}else if(P.isDirectionalLight){let L=t.get(P);if(L.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Y=P.shadow,H=e.get(P);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,i.directionalShadow[d]=H,i.directionalShadowMap[d]=W,i.directionalShadowMatrix[d]=P.shadow.matrix,M++}i.directional[d]=L,d++}else if(P.isSpotLight){let L=t.get(P);L.position.setFromMatrixPosition(P.matrixWorld),L.color.copy(N).multiplyScalar(D),L.distance=F,L.coneCos=Math.cos(P.angle),L.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),L.decay=P.decay,i.spot[v]=L;let Y=P.shadow;if(P.map&&(i.spotLightMap[I]=P.map,I++,Y.updateMatrices(P),P.castShadow&&S++),i.spotLightMatrix[v]=Y.matrix,P.castShadow){let H=e.get(P);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,i.spotShadow[v]=H,i.spotShadowMap[v]=W,y++}v++}else if(P.isRectAreaLight){let L=t.get(P);L.color.copy(N).multiplyScalar(D),L.halfWidth.set(P.width*.5,0,0),L.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=L,m++}else if(P.isPointLight){let L=t.get(P);if(L.color.copy(P.color).multiplyScalar(P.intensity),L.distance=P.distance,L.decay=P.decay,P.castShadow){let Y=P.shadow,H=e.get(P);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,H.shadowCameraNear=Y.camera.near,H.shadowCameraFar=Y.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=W,i.pointShadowMatrix[g]=P.shadow.matrix,_++}i.point[g]=L,g++}else if(P.isHemisphereLight){let L=t.get(P);L.skyColor.copy(P.color).multiplyScalar(D),L.groundColor.copy(P.groundColor).multiplyScalar(D),i.hemi[p]=L,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pt.LTC_FLOAT_1,i.rectAreaLTC2=pt.LTC_FLOAT_2):(i.rectAreaLTC1=pt.LTC_HALF_1,i.rectAreaLTC2=pt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;let R=i.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==M||R.numPointShadows!==_||R.numSpotShadows!==y||R.numSpotMaps!==I||R.numLightProbes!==T)&&(i.directional.length=d,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=y+I-S,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=T,R.directionalLength=d,R.pointLength=g,R.spotLength=v,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=M,R.numPointShadows=_,R.numSpotShadows=y,R.numSpotMaps=I,R.numLightProbes=T,i.version=y1++)}function c(l,h){let u=0,f=0,d=0,g=0,v=0,m=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){let _=l[p];if(_.isDirectionalLight){let y=i.directional[u];y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(_.isSpotLight){let y=i.spot[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(_.isRectAreaLight){let y=i.rectArea[g];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(_.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){let y=i.point[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){let y=i.hemi[v];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:i}}function td(n){let t=new b1(n),e=[],i=[];function s(h){l.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function S1(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new td(n),t.set(s,[a])):r>=o.length?(a=new td(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var dh=class extends si{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=P0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ph=class extends si{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},E1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,A1=`uniform sampler2D shadow_pass;
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
}`;function T1(n,t,e){let i=new Ms,s=new at,r=new at,o=new De,a=new dh({depthPacking:I0}),c=new ph,l={},h=e.maxTextureSize,u={[$i]:pn,[pn]:$i,[Yn]:Yn},f=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:E1,fragmentShader:A1}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new be;g.setAttribute("position",new pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new oe(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vd;let p=this.type;this.render=function(S,T,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;let E=n.getRenderTarget(),b=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),N=n.state;N.setBlending(qi),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let D=p!==Si&&this.type===Si,F=p===Si&&this.type!==Si;for(let W=0,L=S.length;W<L;W++){let Y=S[W],H=Y.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let Q=H.getFrameExtents();if(s.multiply(Q),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,H.mapSize.y=r.y)),H.map===null||D===!0||F===!0){let tt=this.type!==Si?{minFilter:sn,magFilter:sn}:{};H.map!==null&&H.map.dispose(),H.map=new wi(s.x,s.y,tt),H.map.texture.name=Y.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();let et=H.getViewportCount();for(let tt=0;tt<et;tt++){let ut=H.getViewport(tt);o.set(r.x*ut.x,r.y*ut.y,r.x*ut.z,r.y*ut.w),N.viewport(o),H.updateMatrices(Y,tt),i=H.getFrustum(),y(T,R,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===Si&&M(H,R),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,b,P)};function M(S,T){let R=t.update(v);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new wi(s.x,s.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(T,null,R,f,v,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(T,null,R,d,v,null)}function _(S,T,R,E){let b=null,P=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)b=P;else if(b=R.isPointLight===!0?c:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){let N=b.uuid,D=T.uuid,F=l[N];F===void 0&&(F={},l[N]=F);let W=F[D];W===void 0&&(W=b.clone(),F[D]=W,T.addEventListener("dispose",I)),b=W}if(b.visible=T.visible,b.wireframe=T.wireframe,E===Si?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:u[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,R.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let N=n.properties.get(b);N.light=R}return b}function y(S,T,R,E,b){if(S.visible===!1)return;if(S.layers.test(T.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&b===Si)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);let D=t.update(S),F=S.material;if(Array.isArray(F)){let W=D.groups;for(let L=0,Y=W.length;L<Y;L++){let H=W[L],Q=F[H.materialIndex];if(Q&&Q.visible){let et=_(S,Q,E,b);S.onBeforeShadow(n,S,T,R,D,et,H),n.renderBufferDirect(R,null,D,et,S,H),S.onAfterShadow(n,S,T,R,D,et,H)}}}else if(F.visible){let W=_(S,F,E,b);S.onBeforeShadow(n,S,T,R,D,W,null),n.renderBufferDirect(R,null,D,W,S,null),S.onAfterShadow(n,S,T,R,D,W,null)}}let N=S.children;for(let D=0,F=N.length;D<F;D++)y(N[D],T,R,E,b)}function I(S){S.target.removeEventListener("dispose",I);for(let R in l){let E=l[R],b=S.target.uuid;b in E&&(E[b].dispose(),delete E[b])}}}var w1={[vl]:_l,[yl]:Sl,[Ml]:El,[hr]:bl,[_l]:vl,[Sl]:yl,[El]:Ml,[bl]:hr};function C1(n,t){function e(){let O=!1,gt=new De,$=null,nt=new De(0,0,0,0);return{setMask:function(yt){$!==yt&&!O&&(n.colorMask(yt,yt,yt,yt),$=yt)},setLocked:function(yt){O=yt},setClear:function(yt,vt,Jt,Ue,tn){tn===!0&&(yt*=Ue,vt*=Ue,Jt*=Ue),gt.set(yt,vt,Jt,Ue),nt.equals(gt)===!1&&(n.clearColor(yt,vt,Jt,Ue),nt.copy(gt))},reset:function(){O=!1,$=null,nt.set(-1,0,0,0)}}}function i(){let O=!1,gt=!1,$=null,nt=null,yt=null;return{setReversed:function(vt){if(gt!==vt){let Jt=t.get("EXT_clip_control");gt?Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.ZERO_TO_ONE_EXT):Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.NEGATIVE_ONE_TO_ONE_EXT);let Ue=yt;yt=null,this.setClear(Ue)}gt=vt},getReversed:function(){return gt},setTest:function(vt){vt?it(n.DEPTH_TEST):Mt(n.DEPTH_TEST)},setMask:function(vt){$!==vt&&!O&&(n.depthMask(vt),$=vt)},setFunc:function(vt){if(gt&&(vt=w1[vt]),nt!==vt){switch(vt){case vl:n.depthFunc(n.NEVER);break;case _l:n.depthFunc(n.ALWAYS);break;case yl:n.depthFunc(n.LESS);break;case hr:n.depthFunc(n.LEQUAL);break;case Ml:n.depthFunc(n.EQUAL);break;case bl:n.depthFunc(n.GEQUAL);break;case Sl:n.depthFunc(n.GREATER);break;case El:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}nt=vt}},setLocked:function(vt){O=vt},setClear:function(vt){yt!==vt&&(gt&&(vt=1-vt),n.clearDepth(vt),yt=vt)},reset:function(){O=!1,$=null,nt=null,yt=null,gt=!1}}}function s(){let O=!1,gt=null,$=null,nt=null,yt=null,vt=null,Jt=null,Ue=null,tn=null;return{setTest:function(de){O||(de?it(n.STENCIL_TEST):Mt(n.STENCIL_TEST))},setMask:function(de){gt!==de&&!O&&(n.stencilMask(de),gt=de)},setFunc:function(de,Hn,gi){($!==de||nt!==Hn||yt!==gi)&&(n.stencilFunc(de,Hn,gi),$=de,nt=Hn,yt=gi)},setOp:function(de,Hn,gi){(vt!==de||Jt!==Hn||Ue!==gi)&&(n.stencilOp(de,Hn,gi),vt=de,Jt=Hn,Ue=gi)},setLocked:function(de){O=de},setClear:function(de){tn!==de&&(n.clearStencil(de),tn=de)},reset:function(){O=!1,gt=null,$=null,nt=null,yt=null,vt=null,Jt=null,Ue=null,tn=null}}}let r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,M=null,_=null,y=null,I=null,S=null,T=new Bt(0,0,0),R=0,E=!1,b=null,P=null,N=null,D=null,F=null,W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),L=!1,Y=0,H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(H)[1]),L=Y>=1):H.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),L=Y>=2);let Q=null,et={},tt=n.getParameter(n.SCISSOR_BOX),ut=n.getParameter(n.VIEWPORT),Et=new De().fromArray(tt),q=new De().fromArray(ut);function Z(O,gt,$,nt){let yt=new Uint8Array(4),vt=n.createTexture();n.bindTexture(O,vt),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Jt=0;Jt<$;Jt++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(gt,0,n.RGBA,1,1,nt,0,n.RGBA,n.UNSIGNED_BYTE,yt):n.texImage2D(gt+Jt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,yt);return vt}let ft={};ft[n.TEXTURE_2D]=Z(n.TEXTURE_2D,n.TEXTURE_2D,1),ft[n.TEXTURE_CUBE_MAP]=Z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ft[n.TEXTURE_2D_ARRAY]=Z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ft[n.TEXTURE_3D]=Z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(n.DEPTH_TEST),o.setFunc(hr),rt(!1),xt(nf),it(n.CULL_FACE),z(qi);function it(O){h[O]!==!0&&(n.enable(O),h[O]=!0)}function Mt(O){h[O]!==!1&&(n.disable(O),h[O]=!1)}function Rt(O,gt){return u[O]!==gt?(n.bindFramebuffer(O,gt),u[O]=gt,O===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=gt),O===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=gt),!0):!1}function At(O,gt){let $=d,nt=!1;if(O){$=f.get(gt),$===void 0&&($=[],f.set(gt,$));let yt=O.textures;if($.length!==yt.length||$[0]!==n.COLOR_ATTACHMENT0){for(let vt=0,Jt=yt.length;vt<Jt;vt++)$[vt]=n.COLOR_ATTACHMENT0+vt;$.length=yt.length,nt=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,nt=!0);nt&&n.drawBuffers($)}function Xt(O){return g!==O?(n.useProgram(O),g=O,!0):!1}let K={[ps]:n.FUNC_ADD,[s0]:n.FUNC_SUBTRACT,[r0]:n.FUNC_REVERSE_SUBTRACT};K[o0]=n.MIN,K[a0]=n.MAX;let ot={[c0]:n.ZERO,[l0]:n.ONE,[h0]:n.SRC_COLOR,[gl]:n.SRC_ALPHA,[g0]:n.SRC_ALPHA_SATURATE,[p0]:n.DST_COLOR,[f0]:n.DST_ALPHA,[u0]:n.ONE_MINUS_SRC_COLOR,[xl]:n.ONE_MINUS_SRC_ALPHA,[m0]:n.ONE_MINUS_DST_COLOR,[d0]:n.ONE_MINUS_DST_ALPHA,[x0]:n.CONSTANT_COLOR,[v0]:n.ONE_MINUS_CONSTANT_COLOR,[_0]:n.CONSTANT_ALPHA,[y0]:n.ONE_MINUS_CONSTANT_ALPHA};function z(O,gt,$,nt,yt,vt,Jt,Ue,tn,de){if(O===qi){v===!0&&(Mt(n.BLEND),v=!1);return}if(v===!1&&(it(n.BLEND),v=!0),O!==i0){if(O!==m||de!==E){if((p!==ps||y!==ps)&&(n.blendEquation(n.FUNC_ADD),p=ps,y=ps),de)switch(O){case rr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lr:n.blendFunc(n.ONE,n.ONE);break;case sf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case rf:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case rr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lr:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case sf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case rf:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}M=null,_=null,I=null,S=null,T.set(0,0,0),R=0,m=O,E=de}return}yt=yt||gt,vt=vt||$,Jt=Jt||nt,(gt!==p||yt!==y)&&(n.blendEquationSeparate(K[gt],K[yt]),p=gt,y=yt),($!==M||nt!==_||vt!==I||Jt!==S)&&(n.blendFuncSeparate(ot[$],ot[nt],ot[vt],ot[Jt]),M=$,_=nt,I=vt,S=Jt),(Ue.equals(T)===!1||tn!==R)&&(n.blendColor(Ue.r,Ue.g,Ue.b,tn),T.copy(Ue),R=tn),m=O,E=!1}function Pt(O,gt){O.side===Yn?Mt(n.CULL_FACE):it(n.CULL_FACE);let $=O.side===pn;gt&&($=!$),rt($),O.blending===rr&&O.transparent===!1?z(qi):z(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);let nt=O.stencilWrite;a.setTest(nt),nt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ht(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?it(n.SAMPLE_ALPHA_TO_COVERAGE):Mt(n.SAMPLE_ALPHA_TO_COVERAGE)}function rt(O){b!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),b=O)}function xt(O){O!==e0?(it(n.CULL_FACE),O!==P&&(O===nf?n.cullFace(n.BACK):O===n0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Mt(n.CULL_FACE),P=O}function dt(O){O!==N&&(L&&n.lineWidth(O),N=O)}function Ht(O,gt,$){O?(it(n.POLYGON_OFFSET_FILL),(D!==gt||F!==$)&&(n.polygonOffset(gt,$),D=gt,F=$)):Mt(n.POLYGON_OFFSET_FILL)}function bt(O){O?it(n.SCISSOR_TEST):Mt(n.SCISSOR_TEST)}function C(O){O===void 0&&(O=n.TEXTURE0+W-1),Q!==O&&(n.activeTexture(O),Q=O)}function A(O,gt,$){$===void 0&&(Q===null?$=n.TEXTURE0+W-1:$=Q);let nt=et[$];nt===void 0&&(nt={type:void 0,texture:void 0},et[$]=nt),(nt.type!==O||nt.texture!==gt)&&(Q!==$&&(n.activeTexture($),Q=$),n.bindTexture(O,gt||ft[O]),nt.type=O,nt.texture=gt)}function V(){let O=et[Q];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function J(){try{n.compressedTexImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function st(){try{n.compressedTexImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function j(){try{n.texSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function It(){try{n.texSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function mt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function St(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function se(){try{n.texStorage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ct(){try{n.texStorage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Tt(){try{n.texImage2D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Vt(){try{n.texImage3D.apply(n,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function qt(O){Et.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),Et.copy(O))}function wt(O){q.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),q.copy(O))}function re(O,gt){let $=l.get(gt);$===void 0&&($=new WeakMap,l.set(gt,$));let nt=$.get(O);nt===void 0&&(nt=n.getUniformBlockIndex(gt,O.name),$.set(O,nt))}function ee(O,gt){let nt=l.get(gt).get(O);c.get(gt)!==nt&&(n.uniformBlockBinding(gt,nt,O.__bindingPointIndex),c.set(gt,nt))}function xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Q=null,et={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,M=null,_=null,y=null,I=null,S=null,T=new Bt(0,0,0),R=0,E=!1,b=null,P=null,N=null,D=null,F=null,Et.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:it,disable:Mt,bindFramebuffer:Rt,drawBuffers:At,useProgram:Xt,setBlending:z,setMaterial:Pt,setFlipSided:rt,setCullFace:xt,setLineWidth:dt,setPolygonOffset:Ht,setScissorTest:bt,activeTexture:C,bindTexture:A,unbindTexture:V,compressedTexImage2D:J,compressedTexImage3D:st,texImage2D:Tt,texImage3D:Vt,updateUBOMapping:re,uniformBlockBinding:ee,texStorage2D:se,texStorage3D:ct,texSubImage2D:j,texSubImage3D:It,compressedTexSubImage2D:mt,compressedTexSubImage3D:St,scissor:qt,viewport:wt,reset:xe}}function ed(n,t,e,i){let s=R1(i);switch(e){case Sd:return n*t;case Ad:return n*t;case Td:return n*t*2;case ao:return n*t/s.components*s.byteLength;case Jh:return n*t/s.components*s.byteLength;case wd:return n*t*2/s.components*s.byteLength;case jh:return n*t*2/s.components*s.byteLength;case Ed:return n*t*3/s.components*s.byteLength;case dn:return n*t*4/s.components*s.byteLength;case Kh:return n*t*4/s.components*s.byteLength;case aa:case ca:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case la:case ha:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Rl:case Il:return Math.max(n,16)*Math.max(t,8)/4;case Cl:case Pl:return Math.max(n,8)*Math.max(t,8)/2;case zl:case Ll:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ul:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Dl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Nl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Fl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ol:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Bl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case kl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Hl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Vl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Gl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Wl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Xl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ql:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Yl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case $l:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ua:case Zl:case Jl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Cd:case jl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Kl:case Ql:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function R1(n){switch(n){case wn:case yd:return{byteLength:1,components:1};case Kr:case Md:case oo:return{byteLength:2,components:1};case $h:case Zh:return{byteLength:2,components:4};case ys:case Yh:case ii:return{byteLength:4,components:1};case bd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function P1(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new at,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,A){return d?new OffscreenCanvas(C,A):pa("canvas")}function v(C,A,V){let J=1,st=bt(C);if((st.width>V||st.height>V)&&(J=V/Math.max(st.width,st.height)),J<1)if(typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&C instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&C instanceof ImageBitmap||typeof VideoFrame!="undefined"&&C instanceof VideoFrame){let j=Math.floor(J*st.width),It=Math.floor(J*st.height);u===void 0&&(u=g(j,It));let mt=A?g(j,It):u;return mt.width=j,mt.height=It,mt.getContext("2d").drawImage(C,0,0,j,It),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+j+"x"+It+")."),mt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){n.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(C,A,V,J,st=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let j=A;if(A===n.RED&&(V===n.FLOAT&&(j=n.R32F),V===n.HALF_FLOAT&&(j=n.R16F),V===n.UNSIGNED_BYTE&&(j=n.R8)),A===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.R8UI),V===n.UNSIGNED_SHORT&&(j=n.R16UI),V===n.UNSIGNED_INT&&(j=n.R32UI),V===n.BYTE&&(j=n.R8I),V===n.SHORT&&(j=n.R16I),V===n.INT&&(j=n.R32I)),A===n.RG&&(V===n.FLOAT&&(j=n.RG32F),V===n.HALF_FLOAT&&(j=n.RG16F),V===n.UNSIGNED_BYTE&&(j=n.RG8)),A===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.RG8UI),V===n.UNSIGNED_SHORT&&(j=n.RG16UI),V===n.UNSIGNED_INT&&(j=n.RG32UI),V===n.BYTE&&(j=n.RG8I),V===n.SHORT&&(j=n.RG16I),V===n.INT&&(j=n.RG32I)),A===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.RGB8UI),V===n.UNSIGNED_SHORT&&(j=n.RGB16UI),V===n.UNSIGNED_INT&&(j=n.RGB32UI),V===n.BYTE&&(j=n.RGB8I),V===n.SHORT&&(j=n.RGB16I),V===n.INT&&(j=n.RGB32I)),A===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),V===n.UNSIGNED_INT&&(j=n.RGBA32UI),V===n.BYTE&&(j=n.RGBA8I),V===n.SHORT&&(j=n.RGBA16I),V===n.INT&&(j=n.RGBA32I)),A===n.RGB&&V===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),A===n.RGBA){let It=st?$a:le.getTransfer(J);V===n.FLOAT&&(j=n.RGBA32F),V===n.HALF_FLOAT&&(j=n.RGBA16F),V===n.UNSIGNED_BYTE&&(j=It===me?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function y(C,A){let V;return C?A===null||A===ys||A===dr?V=n.DEPTH24_STENCIL8:A===ii?V=n.DEPTH32F_STENCIL8:A===Kr&&(V=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===ys||A===dr?V=n.DEPTH_COMPONENT24:A===ii?V=n.DEPTH_COMPONENT32F:A===Kr&&(V=n.DEPTH_COMPONENT16),V}function I(C,A){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==sn&&C.minFilter!==hn?Math.log2(Math.max(A.width,A.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?A.mipmaps.length:1}function S(C){let A=C.target;A.removeEventListener("dispose",S),R(A),A.isVideoTexture&&h.delete(A)}function T(C){let A=C.target;A.removeEventListener("dispose",T),b(A)}function R(C){let A=i.get(C);if(A.__webglInit===void 0)return;let V=C.source,J=f.get(V);if(J){let st=J[A.__cacheKey];st.usedTimes--,st.usedTimes===0&&E(C),Object.keys(J).length===0&&f.delete(V)}i.remove(C)}function E(C){let A=i.get(C);n.deleteTexture(A.__webglTexture);let V=C.source,J=f.get(V);delete J[A.__cacheKey],o.memory.textures--}function b(C){let A=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(A.__webglFramebuffer[J]))for(let st=0;st<A.__webglFramebuffer[J].length;st++)n.deleteFramebuffer(A.__webglFramebuffer[J][st]);else n.deleteFramebuffer(A.__webglFramebuffer[J]);A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer[J])}else{if(Array.isArray(A.__webglFramebuffer))for(let J=0;J<A.__webglFramebuffer.length;J++)n.deleteFramebuffer(A.__webglFramebuffer[J]);else n.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&n.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let J=0;J<A.__webglColorRenderbuffer.length;J++)A.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(A.__webglColorRenderbuffer[J]);A.__webglDepthRenderbuffer&&n.deleteRenderbuffer(A.__webglDepthRenderbuffer)}let V=C.textures;for(let J=0,st=V.length;J<st;J++){let j=i.get(V[J]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(V[J])}i.remove(C)}let P=0;function N(){P=0}function D(){let C=P;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),P+=1,C}function F(C){let A=[];return A.push(C.wrapS),A.push(C.wrapT),A.push(C.wrapR||0),A.push(C.magFilter),A.push(C.minFilter),A.push(C.anisotropy),A.push(C.internalFormat),A.push(C.format),A.push(C.type),A.push(C.generateMipmaps),A.push(C.premultiplyAlpha),A.push(C.flipY),A.push(C.unpackAlignment),A.push(C.colorSpace),A.join()}function W(C,A){let V=i.get(C);if(C.isVideoTexture&&dt(C),C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){let J=C.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(V,C,A);return}}e.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+A)}function L(C,A){let V=i.get(C);if(C.version>0&&V.__version!==C.version){q(V,C,A);return}e.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+A)}function Y(C,A){let V=i.get(C);if(C.version>0&&V.__version!==C.version){q(V,C,A);return}e.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+A)}function H(C,A){let V=i.get(C);if(C.version>0&&V.__version!==C.version){Z(V,C,A);return}e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+A)}let Q={[Dn]:n.REPEAT,[xs]:n.CLAMP_TO_EDGE,[wl]:n.MIRRORED_REPEAT},et={[sn]:n.NEAREST,[R0]:n.NEAREST_MIPMAP_NEAREST,[Io]:n.NEAREST_MIPMAP_LINEAR,[hn]:n.LINEAR,[Dc]:n.LINEAR_MIPMAP_NEAREST,[vs]:n.LINEAR_MIPMAP_LINEAR},tt={[L0]:n.NEVER,[B0]:n.ALWAYS,[U0]:n.LESS,[Rd]:n.LEQUAL,[D0]:n.EQUAL,[O0]:n.GEQUAL,[N0]:n.GREATER,[F0]:n.NOTEQUAL};function ut(C,A){if(A.type===ii&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===hn||A.magFilter===Dc||A.magFilter===Io||A.magFilter===vs||A.minFilter===hn||A.minFilter===Dc||A.minFilter===Io||A.minFilter===vs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,Q[A.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,Q[A.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,Q[A.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,et[A.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,et[A.minFilter]),A.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,tt[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===sn||A.minFilter!==Io&&A.minFilter!==vs||A.type===ii&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){let V=t.get("EXT_texture_filter_anisotropic");n.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function Et(C,A){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,A.addEventListener("dispose",S));let J=A.source,st=f.get(J);st===void 0&&(st={},f.set(J,st));let j=F(A);if(j!==C.__cacheKey){st[j]===void 0&&(st[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,V=!0),st[j].usedTimes++;let It=st[C.__cacheKey];It!==void 0&&(st[C.__cacheKey].usedTimes--,It.usedTimes===0&&E(A)),C.__cacheKey=j,C.__webglTexture=st[j].texture}return V}function q(C,A,V){let J=n.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),A.isData3DTexture&&(J=n.TEXTURE_3D);let st=Et(C,A),j=A.source;e.bindTexture(J,C.__webglTexture,n.TEXTURE0+V);let It=i.get(j);if(j.version!==It.__version||st===!0){e.activeTexture(n.TEXTURE0+V);let mt=le.getPrimaries(le.workingColorSpace),St=A.colorSpace===Xi?null:le.getPrimaries(A.colorSpace),se=A.colorSpace===Xi||mt===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let ct=v(A.image,!1,s.maxTextureSize);ct=Ht(A,ct);let Tt=r.convert(A.format,A.colorSpace),Vt=r.convert(A.type),qt=_(A.internalFormat,Tt,Vt,A.colorSpace,A.isVideoTexture);ut(J,A);let wt,re=A.mipmaps,ee=A.isVideoTexture!==!0,xe=It.__version===void 0||st===!0,O=j.dataReady,gt=I(A,ct);if(A.isDepthTexture)qt=y(A.format===pr,A.type),xe&&(ee?e.texStorage2D(n.TEXTURE_2D,1,qt,ct.width,ct.height):e.texImage2D(n.TEXTURE_2D,0,qt,ct.width,ct.height,0,Tt,Vt,null));else if(A.isDataTexture)if(re.length>0){ee&&xe&&e.texStorage2D(n.TEXTURE_2D,gt,qt,re[0].width,re[0].height);for(let $=0,nt=re.length;$<nt;$++)wt=re[$],ee?O&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,wt.width,wt.height,Tt,Vt,wt.data):e.texImage2D(n.TEXTURE_2D,$,qt,wt.width,wt.height,0,Tt,Vt,wt.data);A.generateMipmaps=!1}else ee?(xe&&e.texStorage2D(n.TEXTURE_2D,gt,qt,ct.width,ct.height),O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct.width,ct.height,Tt,Vt,ct.data)):e.texImage2D(n.TEXTURE_2D,0,qt,ct.width,ct.height,0,Tt,Vt,ct.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){ee&&xe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,qt,re[0].width,re[0].height,ct.depth);for(let $=0,nt=re.length;$<nt;$++)if(wt=re[$],A.format!==dn)if(Tt!==null)if(ee){if(O)if(A.layerUpdates.size>0){let yt=ed(wt.width,wt.height,A.format,A.type);for(let vt of A.layerUpdates){let Jt=wt.data.subarray(vt*yt/wt.data.BYTES_PER_ELEMENT,(vt+1)*yt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,vt,wt.width,wt.height,1,Tt,Jt)}A.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,wt.width,wt.height,ct.depth,Tt,wt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,qt,wt.width,wt.height,ct.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ee?O&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,wt.width,wt.height,ct.depth,Tt,Vt,wt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,$,qt,wt.width,wt.height,ct.depth,0,Tt,Vt,wt.data)}else{ee&&xe&&e.texStorage2D(n.TEXTURE_2D,gt,qt,re[0].width,re[0].height);for(let $=0,nt=re.length;$<nt;$++)wt=re[$],A.format!==dn?Tt!==null?ee?O&&e.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,wt.width,wt.height,Tt,wt.data):e.compressedTexImage2D(n.TEXTURE_2D,$,qt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?O&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,wt.width,wt.height,Tt,Vt,wt.data):e.texImage2D(n.TEXTURE_2D,$,qt,wt.width,wt.height,0,Tt,Vt,wt.data)}else if(A.isDataArrayTexture)if(ee){if(xe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,qt,ct.width,ct.height,ct.depth),O)if(A.layerUpdates.size>0){let $=ed(ct.width,ct.height,A.format,A.type);for(let nt of A.layerUpdates){let yt=ct.data.subarray(nt*$/ct.data.BYTES_PER_ELEMENT,(nt+1)*$/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,nt,ct.width,ct.height,1,Tt,Vt,yt)}A.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,Tt,Vt,ct.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,qt,ct.width,ct.height,ct.depth,0,Tt,Vt,ct.data);else if(A.isData3DTexture)ee?(xe&&e.texStorage3D(n.TEXTURE_3D,gt,qt,ct.width,ct.height,ct.depth),O&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,Tt,Vt,ct.data)):e.texImage3D(n.TEXTURE_3D,0,qt,ct.width,ct.height,ct.depth,0,Tt,Vt,ct.data);else if(A.isFramebufferTexture){if(xe)if(ee)e.texStorage2D(n.TEXTURE_2D,gt,qt,ct.width,ct.height);else{let $=ct.width,nt=ct.height;for(let yt=0;yt<gt;yt++)e.texImage2D(n.TEXTURE_2D,yt,qt,$,nt,0,Tt,Vt,null),$>>=1,nt>>=1}}else if(re.length>0){if(ee&&xe){let $=bt(re[0]);e.texStorage2D(n.TEXTURE_2D,gt,qt,$.width,$.height)}for(let $=0,nt=re.length;$<nt;$++)wt=re[$],ee?O&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,Tt,Vt,wt):e.texImage2D(n.TEXTURE_2D,$,qt,Tt,Vt,wt);A.generateMipmaps=!1}else if(ee){if(xe){let $=bt(ct);e.texStorage2D(n.TEXTURE_2D,gt,qt,$.width,$.height)}O&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Tt,Vt,ct)}else e.texImage2D(n.TEXTURE_2D,0,qt,Tt,Vt,ct);m(A)&&p(J),It.__version=j.version,A.onUpdate&&A.onUpdate(A)}C.__version=A.version}function Z(C,A,V){if(A.image.length!==6)return;let J=Et(C,A),st=A.source;e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+V);let j=i.get(st);if(st.version!==j.__version||J===!0){e.activeTexture(n.TEXTURE0+V);let It=le.getPrimaries(le.workingColorSpace),mt=A.colorSpace===Xi?null:le.getPrimaries(A.colorSpace),St=A.colorSpace===Xi||It===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let se=A.isCompressedTexture||A.image[0].isCompressedTexture,ct=A.image[0]&&A.image[0].isDataTexture,Tt=[];for(let nt=0;nt<6;nt++)!se&&!ct?Tt[nt]=v(A.image[nt],!0,s.maxCubemapSize):Tt[nt]=ct?A.image[nt].image:A.image[nt],Tt[nt]=Ht(A,Tt[nt]);let Vt=Tt[0],qt=r.convert(A.format,A.colorSpace),wt=r.convert(A.type),re=_(A.internalFormat,qt,wt,A.colorSpace),ee=A.isVideoTexture!==!0,xe=j.__version===void 0||J===!0,O=st.dataReady,gt=I(A,Vt);ut(n.TEXTURE_CUBE_MAP,A);let $;if(se){ee&&xe&&e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,re,Vt.width,Vt.height);for(let nt=0;nt<6;nt++){$=Tt[nt].mipmaps;for(let yt=0;yt<$.length;yt++){let vt=$[yt];A.format!==dn?qt!==null?ee?O&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,0,0,vt.width,vt.height,qt,vt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,re,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ee?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,0,0,vt.width,vt.height,qt,wt,vt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,re,vt.width,vt.height,0,qt,wt,vt.data)}}}else{if($=A.mipmaps,ee&&xe){$.length>0&&gt++;let nt=bt(Tt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,re,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(ct){ee?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Tt[nt].width,Tt[nt].height,qt,wt,Tt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,re,Tt[nt].width,Tt[nt].height,0,qt,wt,Tt[nt].data);for(let yt=0;yt<$.length;yt++){let Jt=$[yt].image[nt].image;ee?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,0,0,Jt.width,Jt.height,qt,wt,Jt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,re,Jt.width,Jt.height,0,qt,wt,Jt.data)}}else{ee?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,qt,wt,Tt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,re,qt,wt,Tt[nt]);for(let yt=0;yt<$.length;yt++){let vt=$[yt];ee?O&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,0,0,qt,wt,vt.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,re,qt,wt,vt.image[nt])}}}m(A)&&p(n.TEXTURE_CUBE_MAP),j.__version=st.version,A.onUpdate&&A.onUpdate(A)}C.__version=A.version}function ft(C,A,V,J,st,j){let It=r.convert(V.format,V.colorSpace),mt=r.convert(V.type),St=_(V.internalFormat,It,mt,V.colorSpace),se=i.get(A),ct=i.get(V);if(ct.__renderTarget=A,!se.__hasExternalTextures){let Tt=Math.max(1,A.width>>j),Vt=Math.max(1,A.height>>j);st===n.TEXTURE_3D||st===n.TEXTURE_2D_ARRAY?e.texImage3D(st,j,St,Tt,Vt,A.depth,0,It,mt,null):e.texImage2D(st,j,St,Tt,Vt,0,It,mt,null)}e.bindFramebuffer(n.FRAMEBUFFER,C),xt(A)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,st,ct.__webglTexture,0,rt(A)):(st===n.TEXTURE_2D||st>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,st,ct.__webglTexture,j),e.bindFramebuffer(n.FRAMEBUFFER,null)}function it(C,A,V){if(n.bindRenderbuffer(n.RENDERBUFFER,C),A.depthBuffer){let J=A.depthTexture,st=J&&J.isDepthTexture?J.type:null,j=y(A.stencilBuffer,st),It=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,mt=rt(A);xt(A)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt,j,A.width,A.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt,j,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,j,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,It,n.RENDERBUFFER,C)}else{let J=A.textures;for(let st=0;st<J.length;st++){let j=J[st],It=r.convert(j.format,j.colorSpace),mt=r.convert(j.type),St=_(j.internalFormat,It,mt,j.colorSpace),se=rt(A);V&&xt(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,se,St,A.width,A.height):xt(A)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,se,St,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,St,A.width,A.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Mt(C,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,C),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let J=i.get(A.depthTexture);J.__renderTarget=A,(!J.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),W(A.depthTexture,0);let st=J.__webglTexture,j=rt(A);if(A.depthTexture.format===or)xt(A)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,st,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,st,0);else if(A.depthTexture.format===pr)xt(A)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,st,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function Rt(C){let A=i.get(C),V=C.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==C.depthTexture){let J=C.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),J){let st=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,J.removeEventListener("dispose",st)};J.addEventListener("dispose",st),A.__depthDisposeCallback=st}A.__boundDepthTexture=J}if(C.depthTexture&&!A.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Mt(A.__webglFramebuffer,C)}else if(V){A.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer[J]),A.__webglDepthbuffer[J]===void 0)A.__webglDepthbuffer[J]=n.createRenderbuffer(),it(A.__webglDepthbuffer[J],C,!1);else{let st=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=A.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,st,n.RENDERBUFFER,j)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=n.createRenderbuffer(),it(A.__webglDepthbuffer,C,!1);else{let J=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=A.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,st)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function At(C,A,V){let J=i.get(C);A!==void 0&&ft(J.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&Rt(C)}function Xt(C){let A=C.texture,V=i.get(C),J=i.get(A);C.addEventListener("dispose",T);let st=C.textures,j=C.isWebGLCubeRenderTarget===!0,It=st.length>1;if(It||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=A.version,o.memory.textures++),j){V.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(A.mipmaps&&A.mipmaps.length>0){V.__webglFramebuffer[mt]=[];for(let St=0;St<A.mipmaps.length;St++)V.__webglFramebuffer[mt][St]=n.createFramebuffer()}else V.__webglFramebuffer[mt]=n.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){V.__webglFramebuffer=[];for(let mt=0;mt<A.mipmaps.length;mt++)V.__webglFramebuffer[mt]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(It)for(let mt=0,St=st.length;mt<St;mt++){let se=i.get(st[mt]);se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&xt(C)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let mt=0;mt<st.length;mt++){let St=st[mt];V.__webglColorRenderbuffer[mt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[mt]);let se=r.convert(St.format,St.colorSpace),ct=r.convert(St.type),Tt=_(St.internalFormat,se,ct,St.colorSpace,C.isXRRenderTarget===!0),Vt=rt(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Vt,Tt,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,V.__webglColorRenderbuffer[mt])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),it(V.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),ut(n.TEXTURE_CUBE_MAP,A);for(let mt=0;mt<6;mt++)if(A.mipmaps&&A.mipmaps.length>0)for(let St=0;St<A.mipmaps.length;St++)ft(V.__webglFramebuffer[mt][St],C,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,St);else ft(V.__webglFramebuffer[mt],C,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(A)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(It){for(let mt=0,St=st.length;mt<St;mt++){let se=st[mt],ct=i.get(se);e.bindTexture(n.TEXTURE_2D,ct.__webglTexture),ut(n.TEXTURE_2D,se),ft(V.__webglFramebuffer,C,se,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,0),m(se)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let mt=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(mt=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(mt,J.__webglTexture),ut(mt,A),A.mipmaps&&A.mipmaps.length>0)for(let St=0;St<A.mipmaps.length;St++)ft(V.__webglFramebuffer[St],C,A,n.COLOR_ATTACHMENT0,mt,St);else ft(V.__webglFramebuffer,C,A,n.COLOR_ATTACHMENT0,mt,0);m(A)&&p(mt),e.unbindTexture()}C.depthBuffer&&Rt(C)}function K(C){let A=C.textures;for(let V=0,J=A.length;V<J;V++){let st=A[V];if(m(st)){let j=M(C),It=i.get(st).__webglTexture;e.bindTexture(j,It),p(j),e.unbindTexture()}}}let ot=[],z=[];function Pt(C){if(C.samples>0){if(xt(C)===!1){let A=C.textures,V=C.width,J=C.height,st=n.COLOR_BUFFER_BIT,j=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,It=i.get(C),mt=A.length>1;if(mt)for(let St=0;St<A.length;St++)e.bindFramebuffer(n.FRAMEBUFFER,It.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,It.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,It.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let St=0;St<A.length;St++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(st|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(st|=n.STENCIL_BUFFER_BIT)),mt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,It.__webglColorRenderbuffer[St]);let se=i.get(A[St]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,se,0)}n.blitFramebuffer(0,0,V,J,0,0,V,J,st,n.NEAREST),c===!0&&(ot.length=0,z.length=0,ot.push(n.COLOR_ATTACHMENT0+St),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ot.push(j),z.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,z)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ot))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),mt)for(let St=0;St<A.length;St++){e.bindFramebuffer(n.FRAMEBUFFER,It.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,It.__webglColorRenderbuffer[St]);let se=i.get(A[St]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,It.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,se,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,It.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let A=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[A])}}}function rt(C){return Math.min(s.maxSamples,C.samples)}function xt(C){let A=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function dt(C){let A=o.render.frame;h.get(C)!==A&&(h.set(C,A),C.update())}function Ht(C,A){let V=C.colorSpace,J=C.format,st=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==vr&&V!==Xi&&(le.getTransfer(V)===me?(J!==dn||st!==wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),A}function bt(C){return typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame!="undefined"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=N,this.setTexture2D=W,this.setTexture2DArray=L,this.setTexture3D=Y,this.setTextureCube=H,this.rebindTextures=At,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=xt}function I1(n,t){function e(i,s=Xi){let r,o=le.getTransfer(s);if(i===wn)return n.UNSIGNED_BYTE;if(i===$h)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Zh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===bd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===yd)return n.BYTE;if(i===Md)return n.SHORT;if(i===Kr)return n.UNSIGNED_SHORT;if(i===Yh)return n.INT;if(i===ys)return n.UNSIGNED_INT;if(i===ii)return n.FLOAT;if(i===oo)return n.HALF_FLOAT;if(i===Sd)return n.ALPHA;if(i===Ed)return n.RGB;if(i===dn)return n.RGBA;if(i===Ad)return n.LUMINANCE;if(i===Td)return n.LUMINANCE_ALPHA;if(i===or)return n.DEPTH_COMPONENT;if(i===pr)return n.DEPTH_STENCIL;if(i===ao)return n.RED;if(i===Jh)return n.RED_INTEGER;if(i===wd)return n.RG;if(i===jh)return n.RG_INTEGER;if(i===Kh)return n.RGBA_INTEGER;if(i===aa||i===ca||i===la||i===ha)if(o===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===aa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===aa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===la)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ha)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Cl||i===Rl||i===Pl||i===Il)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Cl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Rl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Pl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Il)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===zl||i===Ll||i===Ul)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===zl||i===Ll)return o===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ul)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Dl||i===Nl||i===Fl||i===Ol||i===Bl||i===kl||i===Hl||i===Vl||i===Gl||i===Wl||i===Xl||i===ql||i===Yl||i===$l)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Dl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Nl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Fl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ol)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Bl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===kl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Hl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Vl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Gl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Wl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ql)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Yl)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===$l)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ua||i===Zl||i===Jl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===ua)return o===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Zl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Jl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Cd||i===jl||i===Kl||i===Ql)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ua)return r.COMPRESSED_RED_RGTC1_EXT;if(i===jl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Kl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ql)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===dr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var mh=class extends ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Ai=class extends je{constructor(){super(),this.isGroup=!0,this.type="Group"}},z1={type:"move"},Zr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let v of t.hand.values()){let m=e.getJointPose(v,i),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(z1)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ai;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},L1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,U1=`
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

}`,gh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new mn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Nn({vertexShader:L1,fragmentShader:U1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new oe(new Ji(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},xh=class extends Zi{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null,v=new gh,m=e.getContextAttributes(),p=null,M=null,_=[],y=[],I=new at,S=null,T=new ln;T.viewport=new De;let R=new ln;R.viewport=new De;let E=[T,R],b=new mh,P=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=_[q];return Z===void 0&&(Z=new Zr,_[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=_[q];return Z===void 0&&(Z=new Zr,_[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=_[q];return Z===void 0&&(Z=new Zr,_[q]=Z),Z.getHandSpace()};function D(q){let Z=y.indexOf(q.inputSource);if(Z===-1)return;let ft=_[Z];ft!==void 0&&(ft.update(q.inputSource,q.frame,l||o),ft.dispatchEvent({type:q.type,data:q.inputSource}))}function F(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",W);for(let q=0;q<_.length;q++){let Z=y[q];Z!==null&&(y[q]=null,_[q].disconnect(Z))}P=null,N=null,v.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,M=null,Et.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",F),s.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){let Z={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,Z),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new wi(d.framebufferWidth,d.framebufferHeight,{format:dn,type:wn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let Z=null,ft=null,it=null;m.depth&&(it=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Z=m.stencil?pr:or,ft=m.stencil?dr:ys);let Mt={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Mt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new wi(f.textureWidth,f.textureHeight,{format:dn,type:wn,depthTexture:new Sa(f.textureWidth,f.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Et.setContext(s),Et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function W(q){for(let Z=0;Z<q.removed.length;Z++){let ft=q.removed[Z],it=y.indexOf(ft);it>=0&&(y[it]=null,_[it].disconnect(ft))}for(let Z=0;Z<q.added.length;Z++){let ft=q.added[Z],it=y.indexOf(ft);if(it===-1){for(let Rt=0;Rt<_.length;Rt++)if(Rt>=y.length){y.push(ft),it=Rt;break}else if(y[Rt]===null){y[Rt]=ft,it=Rt;break}if(it===-1)break}let Mt=_[it];Mt&&Mt.connect(ft)}}let L=new U,Y=new U;function H(q,Z,ft){L.setFromMatrixPosition(Z.matrixWorld),Y.setFromMatrixPosition(ft.matrixWorld);let it=L.distanceTo(Y),Mt=Z.projectionMatrix.elements,Rt=ft.projectionMatrix.elements,At=Mt[14]/(Mt[10]-1),Xt=Mt[14]/(Mt[10]+1),K=(Mt[9]+1)/Mt[5],ot=(Mt[9]-1)/Mt[5],z=(Mt[8]-1)/Mt[0],Pt=(Rt[8]+1)/Rt[0],rt=At*z,xt=At*Pt,dt=it/(-z+Pt),Ht=dt*-z;if(Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ht),q.translateZ(dt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Mt[10]===-1)q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let bt=At+dt,C=Xt+dt,A=rt-Ht,V=xt+(it-Ht),J=K*Xt/C*bt,st=ot*Xt/C*bt;q.projectionMatrix.makePerspective(A,V,J,st,bt,C),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Q(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let Z=q.near,ft=q.far;v.texture!==null&&(v.depthNear>0&&(Z=v.depthNear),v.depthFar>0&&(ft=v.depthFar)),b.near=R.near=T.near=Z,b.far=R.far=T.far=ft,(P!==b.near||N!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),P=b.near,N=b.far),T.layers.mask=q.layers.mask|2,R.layers.mask=q.layers.mask|4,b.layers.mask=T.layers.mask|R.layers.mask;let it=q.parent,Mt=b.cameras;Q(b,it);for(let Rt=0;Rt<Mt.length;Rt++)Q(Mt[Rt],it);Mt.length===2?H(b,T,R):b.projectionMatrix.copy(T.projectionMatrix),et(q,b,it)};function et(q,Z,ft){ft===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(ft.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=eh*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(b)};let tt=null;function ut(q,Z){if(h=Z.getViewerPose(l||o),g=Z,h!==null){let ft=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let it=!1;ft.length!==b.cameras.length&&(b.cameras.length=0,it=!0);for(let Rt=0;Rt<ft.length;Rt++){let At=ft[Rt],Xt=null;if(d!==null)Xt=d.getViewport(At);else{let ot=u.getViewSubImage(f,At);Xt=ot.viewport,Rt===0&&(t.setRenderTargetTextures(M,ot.colorTexture,f.ignoreDepthValues?void 0:ot.depthStencilTexture),t.setRenderTarget(M))}let K=E[Rt];K===void 0&&(K=new ln,K.layers.enable(Rt),K.viewport=new De,E[Rt]=K),K.matrix.fromArray(At.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(At.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(Xt.x,Xt.y,Xt.width,Xt.height),Rt===0&&(b.matrix.copy(K.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),it===!0&&b.cameras.push(K)}let Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")){let Rt=u.getDepthInformation(ft[0]);Rt&&Rt.isValid&&Rt.texture&&v.init(t,Rt,s.renderState)}}for(let ft=0;ft<_.length;ft++){let it=y[ft],Mt=_[ft];it!==null&&Mt!==void 0&&Mt.update(it,Z,l||o)}tt&&tt(q,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}let Et=new Ld;Et.setAnimationLoop(ut),this.setAnimationLoop=function(q){tt=q},this.dispose=function(){}}},fs=new Fe,D1=new ie;function N1(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,zd(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,_,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,_):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===pn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===pn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=t.get(p),_=M.envMap,y=M.envMapRotation;_&&(m.envMap.value=_,fs.copy(y),fs.x*=-1,fs.y*=-1,fs.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),m.envMapRotation.value.setFromMatrix4(D1.makeRotationFromEuler(fs)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=_*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===pn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){let M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function F1(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,_){let y=_.program;i.uniformBlockBinding(M,y)}function l(M,_){let y=s[M.id];y===void 0&&(g(M),y=h(M),s[M.id]=y,M.addEventListener("dispose",m));let I=_.program;i.updateUBOMapping(M,I);let S=t.render.frame;r[M.id]!==S&&(f(M),r[M.id]=S)}function h(M){let _=u();M.__bindingPointIndex=_;let y=n.createBuffer(),I=M.__size,S=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,I,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,y),y}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){let _=s[M.id],y=M.uniforms,I=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let S=0,T=y.length;S<T;S++){let R=Array.isArray(y[S])?y[S]:[y[S]];for(let E=0,b=R.length;E<b;E++){let P=R[E];if(d(P,S,E,I)===!0){let N=P.__offset,D=Array.isArray(P.value)?P.value:[P.value],F=0;for(let W=0;W<D.length;W++){let L=D[W],Y=v(L);typeof L=="number"||typeof L=="boolean"?(P.__data[0]=L,n.bufferSubData(n.UNIFORM_BUFFER,N+F,P.__data)):L.isMatrix3?(P.__data[0]=L.elements[0],P.__data[1]=L.elements[1],P.__data[2]=L.elements[2],P.__data[3]=0,P.__data[4]=L.elements[3],P.__data[5]=L.elements[4],P.__data[6]=L.elements[5],P.__data[7]=0,P.__data[8]=L.elements[6],P.__data[9]=L.elements[7],P.__data[10]=L.elements[8],P.__data[11]=0):(L.toArray(P.__data,F),F+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,_,y,I){let S=M.value,T=_+"_"+y;if(I[T]===void 0)return typeof S=="number"||typeof S=="boolean"?I[T]=S:I[T]=S.clone(),!0;{let R=I[T];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return I[T]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function g(M){let _=M.uniforms,y=0,I=16;for(let T=0,R=_.length;T<R;T++){let E=Array.isArray(_[T])?_[T]:[_[T]];for(let b=0,P=E.length;b<P;b++){let N=E[b],D=Array.isArray(N.value)?N.value:[N.value];for(let F=0,W=D.length;F<W;F++){let L=D[F],Y=v(L),H=y%I,Q=H%Y.boundary,et=H+Q;y+=Q,et!==0&&I-et<Y.storage&&(y+=I-et),N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=Y.storage}}}let S=y%I;return S>0&&(y+=I-S),M.__size=y,M.__cache={},this}function v(M){let _={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(_.boundary=4,_.storage=4):M.isVector2?(_.boundary=8,_.storage=8):M.isVector3||M.isColor?(_.boundary=16,_.storage=12):M.isVector4?(_.boundary=16,_.storage=16):M.isMatrix3?(_.boundary=48,_.storage=48):M.isMatrix4?(_.boundary=64,_.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),_}function m(M){let _=M.target;_.removeEventListener("dispose",m);let y=o.indexOf(_.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(let M in s)n.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Ea=class{constructor(t={}){let{canvas:e=H0(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext!="undefined"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;let g=new Uint32Array(4),v=new Int32Array(4),m=null,p=null,M=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Re,this.toneMapping=Yi,this.toneMappingExposure=1;let y=this,I=!1,S=0,T=0,R=null,E=-1,b=null,P=new De,N=new De,D=null,F=new Bt(0),W=0,L=e.width,Y=e.height,H=1,Q=null,et=null,tt=new De(0,0,L,Y),ut=new De(0,0,L,Y),Et=!1,q=new Ms,Z=!1,ft=!1,it=new ie,Mt=new ie,Rt=new U,At=new De,Xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},K=!1;function ot(){return R===null?H:1}let z=i;function Pt(w,B){return e.getContext(w,B)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Wh}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",vt,!1),z===null){let B="webgl2";if(z=Pt(B,w),z===null)throw Pt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let rt,xt,dt,Ht,bt,C,A,V,J,st,j,It,mt,St,se,ct,Tt,Vt,qt,wt,re,ee,xe,O;function gt(){rt=new Qx(z),rt.init(),ee=new I1(z,rt),xt=new Yx(z,rt,t,ee),dt=new C1(z,rt),xt.reverseDepthBuffer&&f&&dt.buffers.depth.setReversed(!0),Ht=new nv(z),bt=new m1,C=new P1(z,rt,dt,bt,xt,ee,Ht),A=new Zx(y),V=new Kx(y),J=new lm(z),xe=new Xx(z,J),st=new tv(z,J,Ht,xe),j=new sv(z,st,J,Ht),qt=new iv(z,xt,C),ct=new $x(bt),It=new p1(y,A,V,rt,xt,xe,ct),mt=new N1(y,bt),St=new x1,se=new S1(rt),Vt=new Wx(y,A,V,dt,j,d,c),Tt=new T1(y,j,xt),O=new F1(z,Ht,xt,dt),wt=new qx(z,rt,Ht),re=new ev(z,rt,Ht),Ht.programs=It.programs,y.capabilities=xt,y.extensions=rt,y.properties=bt,y.renderLists=St,y.shadowMap=Tt,y.state=dt,y.info=Ht}gt();let $=new xh(y,z);this.xr=$,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let w=rt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=rt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(w){w!==void 0&&(H=w,this.setSize(L,Y,!1))},this.getSize=function(w){return w.set(L,Y)},this.setSize=function(w,B,G=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=w,Y=B,e.width=Math.floor(w*H),e.height=Math.floor(B*H),G===!0&&(e.style.width=w+"px",e.style.height=B+"px"),this.setViewport(0,0,w,B)},this.getDrawingBufferSize=function(w){return w.set(L*H,Y*H).floor()},this.setDrawingBufferSize=function(w,B,G){L=w,Y=B,H=G,e.width=Math.floor(w*G),e.height=Math.floor(B*G),this.setViewport(0,0,w,B)},this.getCurrentViewport=function(w){return w.copy(P)},this.getViewport=function(w){return w.copy(tt)},this.setViewport=function(w,B,G,X){w.isVector4?tt.set(w.x,w.y,w.z,w.w):tt.set(w,B,G,X),dt.viewport(P.copy(tt).multiplyScalar(H).round())},this.getScissor=function(w){return w.copy(ut)},this.setScissor=function(w,B,G,X){w.isVector4?ut.set(w.x,w.y,w.z,w.w):ut.set(w,B,G,X),dt.scissor(N.copy(ut).multiplyScalar(H).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(w){dt.setScissorTest(Et=w)},this.setOpaqueSort=function(w){Q=w},this.setTransparentSort=function(w){et=w},this.getClearColor=function(w){return w.copy(Vt.getClearColor())},this.setClearColor=function(){Vt.setClearColor.apply(Vt,arguments)},this.getClearAlpha=function(){return Vt.getClearAlpha()},this.setClearAlpha=function(){Vt.setClearAlpha.apply(Vt,arguments)},this.clear=function(w=!0,B=!0,G=!0){let X=0;if(w){let k=!1;if(R!==null){let ht=R.texture.format;k=ht===Kh||ht===jh||ht===Jh}if(k){let ht=R.texture.type,_t=ht===wn||ht===ys||ht===Kr||ht===dr||ht===$h||ht===Zh,zt=Vt.getClearColor(),Lt=Vt.getClearAlpha(),$t=zt.r,jt=zt.g,Ut=zt.b;_t?(g[0]=$t,g[1]=jt,g[2]=Ut,g[3]=Lt,z.clearBufferuiv(z.COLOR,0,g)):(v[0]=$t,v[1]=jt,v[2]=Ut,v[3]=Lt,z.clearBufferiv(z.COLOR,0,v))}else X|=z.COLOR_BUFFER_BIT}B&&(X|=z.DEPTH_BUFFER_BIT),G&&(X|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),St.dispose(),se.dispose(),bt.dispose(),A.dispose(),V.dispose(),j.dispose(),xe.dispose(),O.dispose(),It.dispose(),$.dispose(),$.removeEventListener("sessionstart",Yu),$.removeEventListener("sessionend",$u),os.stop()};function nt(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;let w=Ht.autoReset,B=Tt.enabled,G=Tt.autoUpdate,X=Tt.needsUpdate,k=Tt.type;gt(),Ht.autoReset=w,Tt.enabled=B,Tt.autoUpdate=G,Tt.needsUpdate=X,Tt.type=k}function vt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Jt(w){let B=w.target;B.removeEventListener("dispose",Jt),Ue(B)}function Ue(w){tn(w),bt.remove(w)}function tn(w){let B=bt.get(w).programs;B!==void 0&&(B.forEach(function(G){It.releaseProgram(G)}),w.isShaderMaterial&&It.releaseShaderCache(w))}this.renderBufferDirect=function(w,B,G,X,k,ht){B===null&&(B=Xt);let _t=k.isMesh&&k.matrixWorld.determinant()<0,zt=jp(w,B,G,X,k);dt.setMaterial(X,_t);let Lt=G.index,$t=1;if(X.wireframe===!0){if(Lt=st.getWireframeAttribute(G),Lt===void 0)return;$t=2}let jt=G.drawRange,Ut=G.attributes.position,he=jt.start*$t,ve=(jt.start+jt.count)*$t;ht!==null&&(he=Math.max(he,ht.start*$t),ve=Math.min(ve,(ht.start+ht.count)*$t)),Lt!==null?(he=Math.max(he,0),ve=Math.min(ve,Lt.count)):Ut!=null&&(he=Math.max(he,0),ve=Math.min(ve,Ut.count));let ye=ve-he;if(ye<0||ye===1/0)return;xe.setup(k,X,zt,G,Lt);let un,ue=wt;if(Lt!==null&&(un=J.get(Lt),ue=re,ue.setIndex(un)),k.isMesh)X.wireframe===!0?(dt.setLineWidth(X.wireframeLinewidth*ot()),ue.setMode(z.LINES)):ue.setMode(z.TRIANGLES);else if(k.isLine){let Dt=X.linewidth;Dt===void 0&&(Dt=1),dt.setLineWidth(Dt*ot()),k.isLineSegments?ue.setMode(z.LINES):k.isLineLoop?ue.setMode(z.LINE_LOOP):ue.setMode(z.LINE_STRIP)}else k.isPoints?ue.setMode(z.POINTS):k.isSprite&&ue.setMode(z.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ue.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(rt.get("WEBGL_multi_draw"))ue.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Dt=k._multiDrawStarts,xi=k._multiDrawCounts,fe=k._multiDrawCount,Vn=Lt?J.get(Lt).bytesPerElement:1,Hs=bt.get(X).currentProgram.getUniforms();for(let En=0;En<fe;En++)Hs.setValue(z,"_gl_DrawID",En),ue.render(Dt[En]/Vn,xi[En])}else if(k.isInstancedMesh)ue.renderInstances(he,ye,k.count);else if(G.isInstancedBufferGeometry){let Dt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,xi=Math.min(G.instanceCount,Dt);ue.renderInstances(he,ye,xi)}else ue.render(he,ye)};function de(w,B,G){w.transparent===!0&&w.side===Yn&&w.forceSinglePass===!1?(w.side=pn,w.needsUpdate=!0,Po(w,B,G),w.side=$i,w.needsUpdate=!0,Po(w,B,G),w.side=Yn):Po(w,B,G)}this.compile=function(w,B,G=null){G===null&&(G=w),p=se.get(G),p.init(B),_.push(p),G.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),w!==G&&w.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let X=new Set;return w.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ht=k.material;if(ht)if(Array.isArray(ht))for(let _t=0;_t<ht.length;_t++){let zt=ht[_t];de(zt,G,k),X.add(zt)}else de(ht,G,k),X.add(ht)}),_.pop(),p=null,X},this.compileAsync=function(w,B,G=null){let X=this.compile(w,B,G);return new Promise(k=>{function ht(){if(X.forEach(function(_t){bt.get(_t).currentProgram.isReady()&&X.delete(_t)}),X.size===0){k(w);return}setTimeout(ht,10)}rt.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Hn=null;function gi(w){Hn&&Hn(w)}function Yu(){os.stop()}function $u(){os.start()}let os=new Ld;os.setAnimationLoop(gi),typeof self!="undefined"&&os.setContext(self),this.setAnimationLoop=function(w){Hn=w,$.setAnimationLoop(w),w===null?os.stop():os.start()},$.addEventListener("sessionstart",Yu),$.addEventListener("sessionend",$u),this.render=function(w,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(B),B=$.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,B,R),p=se.get(w,_.length),p.init(B),_.push(p),Mt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),q.setFromProjectionMatrix(Mt),ft=this.localClippingEnabled,Z=ct.init(this.clippingPlanes,ft),m=St.get(w,M.length),m.init(),M.push(m),$.enabled===!0&&$.isPresenting===!0){let ht=y.xr.getDepthSensingMesh();ht!==null&&Uc(ht,B,-1/0,y.sortObjects)}Uc(w,B,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(Q,et),K=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,K&&Vt.addToRenderList(m,w),this.info.render.frame++,Z===!0&&ct.beginShadows();let G=p.state.shadowsArray;Tt.render(G,w,B),Z===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();let X=m.opaque,k=m.transmissive;if(p.setupLights(),B.isArrayCamera){let ht=B.cameras;if(k.length>0)for(let _t=0,zt=ht.length;_t<zt;_t++){let Lt=ht[_t];Ju(X,k,w,Lt)}K&&Vt.render(w);for(let _t=0,zt=ht.length;_t<zt;_t++){let Lt=ht[_t];Zu(m,w,Lt,Lt.viewport)}}else k.length>0&&Ju(X,k,w,B),K&&Vt.render(w),Zu(m,w,B);R!==null&&(C.updateMultisampleRenderTarget(R),C.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(y,w,B),xe.resetDefaultState(),E=-1,b=null,_.pop(),_.length>0?(p=_[_.length-1],Z===!0&&ct.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Uc(w,B,G,X){if(w.visible===!1)return;if(w.layers.test(B.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(B);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||q.intersectsSprite(w)){X&&At.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Mt);let _t=j.update(w),zt=w.material;zt.visible&&m.push(w,_t,zt,G,At.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||q.intersectsObject(w))){let _t=j.update(w),zt=w.material;if(X&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),At.copy(w.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),At.copy(_t.boundingSphere.center)),At.applyMatrix4(w.matrixWorld).applyMatrix4(Mt)),Array.isArray(zt)){let Lt=_t.groups;for(let $t=0,jt=Lt.length;$t<jt;$t++){let Ut=Lt[$t],he=zt[Ut.materialIndex];he&&he.visible&&m.push(w,_t,he,G,At.z,Ut)}}else zt.visible&&m.push(w,_t,zt,G,At.z,null)}}let ht=w.children;for(let _t=0,zt=ht.length;_t<zt;_t++)Uc(ht[_t],B,G,X)}function Zu(w,B,G,X){let k=w.opaque,ht=w.transmissive,_t=w.transparent;p.setupLightsView(G),Z===!0&&ct.setGlobalState(y.clippingPlanes,G),X&&dt.viewport(P.copy(X)),k.length>0&&Ro(k,B,G),ht.length>0&&Ro(ht,B,G),_t.length>0&&Ro(_t,B,G),dt.buffers.depth.setTest(!0),dt.buffers.depth.setMask(!0),dt.buffers.color.setMask(!0),dt.setPolygonOffset(!1)}function Ju(w,B,G,X){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new wi(1,1,{generateMipmaps:!0,type:rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float")?oo:wn,minFilter:vs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:le.workingColorSpace}));let ht=p.state.transmissionRenderTarget[X.id],_t=X.viewport||P;ht.setSize(_t.z,_t.w);let zt=y.getRenderTarget();y.setRenderTarget(ht),y.getClearColor(F),W=y.getClearAlpha(),W<1&&y.setClearColor(16777215,.5),y.clear(),K&&Vt.render(G);let Lt=y.toneMapping;y.toneMapping=Yi;let $t=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),Z===!0&&ct.setGlobalState(y.clippingPlanes,X),Ro(w,G,X),C.updateMultisampleRenderTarget(ht),C.updateRenderTargetMipmap(ht),rt.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let Ut=0,he=B.length;Ut<he;Ut++){let ve=B[Ut],ye=ve.object,un=ve.geometry,ue=ve.material,Dt=ve.group;if(ue.side===Yn&&ye.layers.test(X.layers)){let xi=ue.side;ue.side=pn,ue.needsUpdate=!0,ju(ye,G,X,un,ue,Dt),ue.side=xi,ue.needsUpdate=!0,jt=!0}}jt===!0&&(C.updateMultisampleRenderTarget(ht),C.updateRenderTargetMipmap(ht))}y.setRenderTarget(zt),y.setClearColor(F,W),$t!==void 0&&(X.viewport=$t),y.toneMapping=Lt}function Ro(w,B,G){let X=B.isScene===!0?B.overrideMaterial:null;for(let k=0,ht=w.length;k<ht;k++){let _t=w[k],zt=_t.object,Lt=_t.geometry,$t=X===null?_t.material:X,jt=_t.group;zt.layers.test(G.layers)&&ju(zt,B,G,Lt,$t,jt)}}function ju(w,B,G,X,k,ht){w.onBeforeRender(y,B,G,X,k,ht),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),k.onBeforeRender(y,B,G,X,w,ht),k.transparent===!0&&k.side===Yn&&k.forceSinglePass===!1?(k.side=pn,k.needsUpdate=!0,y.renderBufferDirect(G,B,X,k,w,ht),k.side=$i,k.needsUpdate=!0,y.renderBufferDirect(G,B,X,k,w,ht),k.side=Yn):y.renderBufferDirect(G,B,X,k,w,ht),w.onAfterRender(y,B,G,X,k,ht)}function Po(w,B,G){B.isScene!==!0&&(B=Xt);let X=bt.get(w),k=p.state.lights,ht=p.state.shadowsArray,_t=k.state.version,zt=It.getParameters(w,k.state,ht,B,G),Lt=It.getProgramCacheKey(zt),$t=X.programs;X.environment=w.isMeshStandardMaterial?B.environment:null,X.fog=B.fog,X.envMap=(w.isMeshStandardMaterial?V:A).get(w.envMap||X.environment),X.envMapRotation=X.environment!==null&&w.envMap===null?B.environmentRotation:w.envMapRotation,$t===void 0&&(w.addEventListener("dispose",Jt),$t=new Map,X.programs=$t);let jt=$t.get(Lt);if(jt!==void 0){if(X.currentProgram===jt&&X.lightsStateVersion===_t)return Qu(w,zt),jt}else zt.uniforms=It.getUniforms(w),w.onBeforeCompile(zt,y),jt=It.acquireProgram(zt,Lt),$t.set(Lt,jt),X.uniforms=zt.uniforms;let Ut=X.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ut.clippingPlanes=ct.uniform),Qu(w,zt),X.needsLights=Qp(w),X.lightsStateVersion=_t,X.needsLights&&(Ut.ambientLightColor.value=k.state.ambient,Ut.lightProbe.value=k.state.probe,Ut.directionalLights.value=k.state.directional,Ut.directionalLightShadows.value=k.state.directionalShadow,Ut.spotLights.value=k.state.spot,Ut.spotLightShadows.value=k.state.spotShadow,Ut.rectAreaLights.value=k.state.rectArea,Ut.ltc_1.value=k.state.rectAreaLTC1,Ut.ltc_2.value=k.state.rectAreaLTC2,Ut.pointLights.value=k.state.point,Ut.pointLightShadows.value=k.state.pointShadow,Ut.hemisphereLights.value=k.state.hemi,Ut.directionalShadowMap.value=k.state.directionalShadowMap,Ut.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ut.spotShadowMap.value=k.state.spotShadowMap,Ut.spotLightMatrix.value=k.state.spotLightMatrix,Ut.spotLightMap.value=k.state.spotLightMap,Ut.pointShadowMap.value=k.state.pointShadowMap,Ut.pointShadowMatrix.value=k.state.pointShadowMatrix),X.currentProgram=jt,X.uniformsList=null,jt}function Ku(w){if(w.uniformsList===null){let B=w.currentProgram.getUniforms();w.uniformsList=cr.seqWithValue(B.seq,w.uniforms)}return w.uniformsList}function Qu(w,B){let G=bt.get(w);G.outputColorSpace=B.outputColorSpace,G.batching=B.batching,G.batchingColor=B.batchingColor,G.instancing=B.instancing,G.instancingColor=B.instancingColor,G.instancingMorph=B.instancingMorph,G.skinning=B.skinning,G.morphTargets=B.morphTargets,G.morphNormals=B.morphNormals,G.morphColors=B.morphColors,G.morphTargetsCount=B.morphTargetsCount,G.numClippingPlanes=B.numClippingPlanes,G.numIntersection=B.numClipIntersection,G.vertexAlphas=B.vertexAlphas,G.vertexTangents=B.vertexTangents,G.toneMapping=B.toneMapping}function jp(w,B,G,X,k){B.isScene!==!0&&(B=Xt),C.resetTextureUnits();let ht=B.fog,_t=X.isMeshStandardMaterial?B.environment:null,zt=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:vr,Lt=(X.isMeshStandardMaterial?V:A).get(X.envMap||_t),$t=X.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,jt=!!G.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ut=!!G.morphAttributes.position,he=!!G.morphAttributes.normal,ve=!!G.morphAttributes.color,ye=Yi;X.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ye=y.toneMapping);let un=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ue=un!==void 0?un.length:0,Dt=bt.get(X),xi=p.state.lights;if(Z===!0&&(ft===!0||w!==b)){let Ln=w===b&&X.id===E;ct.setState(X,w,Ln)}let fe=!1;X.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==xi.state.version||Dt.outputColorSpace!==zt||k.isBatchedMesh&&Dt.batching===!1||!k.isBatchedMesh&&Dt.batching===!0||k.isBatchedMesh&&Dt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Dt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Dt.instancing===!1||!k.isInstancedMesh&&Dt.instancing===!0||k.isSkinnedMesh&&Dt.skinning===!1||!k.isSkinnedMesh&&Dt.skinning===!0||k.isInstancedMesh&&Dt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Dt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Dt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Dt.instancingMorph===!1&&k.morphTexture!==null||Dt.envMap!==Lt||X.fog===!0&&Dt.fog!==ht||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==ct.numPlanes||Dt.numIntersection!==ct.numIntersection)||Dt.vertexAlphas!==$t||Dt.vertexTangents!==jt||Dt.morphTargets!==Ut||Dt.morphNormals!==he||Dt.morphColors!==ve||Dt.toneMapping!==ye||Dt.morphTargetsCount!==ue)&&(fe=!0):(fe=!0,Dt.__version=X.version);let Vn=Dt.currentProgram;fe===!0&&(Vn=Po(X,B,k));let Hs=!1,En=!1,Fr=!1,Me=Vn.getUniforms(),ei=Dt.uniforms;if(dt.useProgram(Vn.program)&&(Hs=!0,En=!0,Fr=!0),X.id!==E&&(E=X.id,En=!0),Hs||b!==w){dt.buffers.depth.getReversed()?(it.copy(w.projectionMatrix),G0(it),W0(it),Me.setValue(z,"projectionMatrix",it)):Me.setValue(z,"projectionMatrix",w.projectionMatrix),Me.setValue(z,"viewMatrix",w.matrixWorldInverse);let Fi=Me.map.cameraPosition;Fi!==void 0&&Fi.setValue(z,Rt.setFromMatrixPosition(w.matrixWorld)),xt.logarithmicDepthBuffer&&Me.setValue(z,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Me.setValue(z,"isOrthographic",w.isOrthographicCamera===!0),b!==w&&(b=w,En=!0,Fr=!0)}if(k.isSkinnedMesh){Me.setOptional(z,k,"bindMatrix"),Me.setOptional(z,k,"bindMatrixInverse");let Ln=k.skeleton;Ln&&(Ln.boneTexture===null&&Ln.computeBoneTexture(),Me.setValue(z,"boneTexture",Ln.boneTexture,C))}k.isBatchedMesh&&(Me.setOptional(z,k,"batchingTexture"),Me.setValue(z,"batchingTexture",k._matricesTexture,C),Me.setOptional(z,k,"batchingIdTexture"),Me.setValue(z,"batchingIdTexture",k._indirectTexture,C),Me.setOptional(z,k,"batchingColorTexture"),k._colorsTexture!==null&&Me.setValue(z,"batchingColorTexture",k._colorsTexture,C));let Or=G.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0)&&qt.update(k,G,Vn),(En||Dt.receiveShadow!==k.receiveShadow)&&(Dt.receiveShadow=k.receiveShadow,Me.setValue(z,"receiveShadow",k.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(ei.envMap.value=Lt,ei.flipEnvMap.value=Lt.isCubeTexture&&Lt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&B.environment!==null&&(ei.envMapIntensity.value=B.environmentIntensity),En&&(Me.setValue(z,"toneMappingExposure",y.toneMappingExposure),Dt.needsLights&&Kp(ei,Fr),ht&&X.fog===!0&&mt.refreshFogUniforms(ei,ht),mt.refreshMaterialUniforms(ei,X,H,Y,p.state.transmissionRenderTarget[w.id]),cr.upload(z,Ku(Dt),ei,C)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(cr.upload(z,Ku(Dt),ei,C),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Me.setValue(z,"center",k.center),Me.setValue(z,"modelViewMatrix",k.modelViewMatrix),Me.setValue(z,"normalMatrix",k.normalMatrix),Me.setValue(z,"modelMatrix",k.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){let Ln=X.uniformsGroups;for(let Fi=0,Oi=Ln.length;Fi<Oi;Fi++){let tf=Ln[Fi];O.update(tf,Vn),O.bind(tf,Vn)}}return Vn}function Kp(w,B){w.ambientLightColor.needsUpdate=B,w.lightProbe.needsUpdate=B,w.directionalLights.needsUpdate=B,w.directionalLightShadows.needsUpdate=B,w.pointLights.needsUpdate=B,w.pointLightShadows.needsUpdate=B,w.spotLights.needsUpdate=B,w.spotLightShadows.needsUpdate=B,w.rectAreaLights.needsUpdate=B,w.hemisphereLights.needsUpdate=B}function Qp(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,B,G){bt.get(w.texture).__webglTexture=B,bt.get(w.depthTexture).__webglTexture=G;let X=bt.get(w);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=G===void 0,X.__autoAllocateDepthBuffer||rt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,B){let G=bt.get(w);G.__webglFramebuffer=B,G.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(w,B=0,G=0){R=w,S=B,T=G;let X=!0,k=null,ht=!1,_t=!1;if(w){let Lt=bt.get(w);if(Lt.__useDefaultFramebuffer!==void 0)dt.bindFramebuffer(z.FRAMEBUFFER,null),X=!1;else if(Lt.__webglFramebuffer===void 0)C.setupRenderTarget(w);else if(Lt.__hasExternalTextures)C.rebindTextures(w,bt.get(w.texture).__webglTexture,bt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Ut=w.depthTexture;if(Lt.__boundDepthTexture!==Ut){if(Ut!==null&&bt.has(Ut)&&(w.width!==Ut.image.width||w.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(w)}}let $t=w.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(_t=!0);let jt=bt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(jt[B])?k=jt[B][G]:k=jt[B],ht=!0):w.samples>0&&C.useMultisampledRTT(w)===!1?k=bt.get(w).__webglMultisampledFramebuffer:Array.isArray(jt)?k=jt[G]:k=jt,P.copy(w.viewport),N.copy(w.scissor),D=w.scissorTest}else P.copy(tt).multiplyScalar(H).floor(),N.copy(ut).multiplyScalar(H).floor(),D=Et;if(dt.bindFramebuffer(z.FRAMEBUFFER,k)&&X&&dt.drawBuffers(w,k),dt.viewport(P),dt.scissor(N),dt.setScissorTest(D),ht){let Lt=bt.get(w.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+B,Lt.__webglTexture,G)}else if(_t){let Lt=bt.get(w.texture),$t=B||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Lt.__webglTexture,G||0,$t)}E=-1},this.readRenderTargetPixels=function(w,B,G,X,k,ht,_t){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let zt=bt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(zt=zt[_t]),zt){dt.bindFramebuffer(z.FRAMEBUFFER,zt);try{let Lt=w.texture,$t=Lt.format,jt=Lt.type;if(!xt.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xt.textureTypeReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=w.width-X&&G>=0&&G<=w.height-k&&z.readPixels(B,G,X,k,ee.convert($t),ee.convert(jt),ht)}finally{let Lt=R!==null?bt.get(R).__webglFramebuffer:null;dt.bindFramebuffer(z.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(w,B,G,X,k,ht,_t){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let zt=bt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(zt=zt[_t]),zt){let Lt=w.texture,$t=Lt.format,jt=Lt.type;if(!xt.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xt.textureTypeReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=w.width-X&&G>=0&&G<=w.height-k){dt.bindFramebuffer(z.FRAMEBUFFER,zt);let Ut=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Ut),z.bufferData(z.PIXEL_PACK_BUFFER,ht.byteLength,z.STREAM_READ),z.readPixels(B,G,X,k,ee.convert($t),ee.convert(jt),0);let he=R!==null?bt.get(R).__webglFramebuffer:null;dt.bindFramebuffer(z.FRAMEBUFFER,he);let ve=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await V0(z,ve,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Ut),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ht),z.deleteBuffer(Ut),z.deleteSync(ve),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,B=null,G=0){w.isTexture!==!0&&(Yr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,w=arguments[1]);let X=Math.pow(2,-G),k=Math.floor(w.image.width*X),ht=Math.floor(w.image.height*X),_t=B!==null?B.x:0,zt=B!==null?B.y:0;C.setTexture2D(w,0),z.copyTexSubImage2D(z.TEXTURE_2D,G,0,0,_t,zt,k,ht),dt.unbindTexture()},this.copyTextureToTexture=function(w,B,G=null,X=null,k=0){w.isTexture!==!0&&(Yr("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,w=arguments[1],B=arguments[2],k=arguments[3]||0,G=null);let ht,_t,zt,Lt,$t,jt,Ut,he,ve,ye=w.isCompressedTexture?w.mipmaps[k]:w.image;G!==null?(ht=G.max.x-G.min.x,_t=G.max.y-G.min.y,zt=G.isBox3?G.max.z-G.min.z:1,Lt=G.min.x,$t=G.min.y,jt=G.isBox3?G.min.z:0):(ht=ye.width,_t=ye.height,zt=ye.depth||1,Lt=0,$t=0,jt=0),X!==null?(Ut=X.x,he=X.y,ve=X.z):(Ut=0,he=0,ve=0);let un=ee.convert(B.format),ue=ee.convert(B.type),Dt;B.isData3DTexture?(C.setTexture3D(B,0),Dt=z.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(C.setTexture2DArray(B,0),Dt=z.TEXTURE_2D_ARRAY):(C.setTexture2D(B,0),Dt=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,B.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,B.unpackAlignment);let xi=z.getParameter(z.UNPACK_ROW_LENGTH),fe=z.getParameter(z.UNPACK_IMAGE_HEIGHT),Vn=z.getParameter(z.UNPACK_SKIP_PIXELS),Hs=z.getParameter(z.UNPACK_SKIP_ROWS),En=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,ye.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ye.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Lt),z.pixelStorei(z.UNPACK_SKIP_ROWS,$t),z.pixelStorei(z.UNPACK_SKIP_IMAGES,jt);let Fr=w.isDataArrayTexture||w.isData3DTexture,Me=B.isDataArrayTexture||B.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){let ei=bt.get(w),Or=bt.get(B),Ln=bt.get(ei.__renderTarget),Fi=bt.get(Or.__renderTarget);dt.bindFramebuffer(z.READ_FRAMEBUFFER,Ln.__webglFramebuffer),dt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Fi.__webglFramebuffer);for(let Oi=0;Oi<zt;Oi++)Fr&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,bt.get(w).__webglTexture,k,jt+Oi),w.isDepthTexture?(Me&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,bt.get(B).__webglTexture,k,ve+Oi),z.blitFramebuffer(Lt,$t,ht,_t,Ut,he,ht,_t,z.DEPTH_BUFFER_BIT,z.NEAREST)):Me?z.copyTexSubImage3D(Dt,k,Ut,he,ve+Oi,Lt,$t,ht,_t):z.copyTexSubImage2D(Dt,k,Ut,he,ve+Oi,Lt,$t,ht,_t);dt.bindFramebuffer(z.READ_FRAMEBUFFER,null),dt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Me?w.isDataTexture||w.isData3DTexture?z.texSubImage3D(Dt,k,Ut,he,ve,ht,_t,zt,un,ue,ye.data):B.isCompressedArrayTexture?z.compressedTexSubImage3D(Dt,k,Ut,he,ve,ht,_t,zt,un,ye.data):z.texSubImage3D(Dt,k,Ut,he,ve,ht,_t,zt,un,ue,ye):w.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,k,Ut,he,ht,_t,un,ue,ye.data):w.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,k,Ut,he,ye.width,ye.height,un,ye.data):z.texSubImage2D(z.TEXTURE_2D,k,Ut,he,ht,_t,un,ue,ye);z.pixelStorei(z.UNPACK_ROW_LENGTH,xi),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,fe),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Vn),z.pixelStorei(z.UNPACK_SKIP_ROWS,Hs),z.pixelStorei(z.UNPACK_SKIP_IMAGES,En),k===0&&B.generateMipmaps&&z.generateMipmap(Dt),dt.unbindTexture()},this.copyTextureToTexture3D=function(w,B,G=null,X=null,k=0){return w.isTexture!==!0&&(Yr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,X=arguments[1]||null,w=arguments[2],B=arguments[3],k=arguments[4]||0),Yr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,B,G,X,k)},this.initRenderTarget=function(w){bt.get(w).__webglFramebuffer===void 0&&C.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?C.setTextureCube(w,0):w.isData3DTexture?C.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?C.setTexture2DArray(w,0):C.setTexture2D(w,0),dt.unbindTexture()},this.resetState=function(){S=0,T=0,R=null,dt.reset(),xe.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=le._getDrawingBufferColorSpace(t),e.unpackColorSpace=le._getUnpackColorSpace()}};var Aa=class n{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Bt(t),this.near=e,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ta=class extends je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fe,this.environmentIntensity=1,this.environmentRotation=new Fe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var bs=class extends mn{constructor(t=null,e=1,i=1,s,r,o,a,c,l=sn,h=sn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ss=class extends pe{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},nr=new ie,nd=new ie,Ko=[],id=new Ci,O1=new ie,Wr=new oe,Xr=new Ri,ri=class extends oe{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ss(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,O1)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ci),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,nr),id.copy(t.boundingBox).applyMatrix4(nr),this.boundingBox.union(id)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ri),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,nr),Xr.copy(t.boundingSphere).applyMatrix4(nr),this.boundingSphere.union(Xr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(Wr.geometry=this.geometry,Wr.material=this.material,Wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xr.copy(this.boundingSphere),Xr.applyMatrix4(i),t.ray.intersectsSphere(Xr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,nr),nd.multiplyMatrices(i,nr),Wr.matrixWorld=nd,Wr.raycast(t,Ko);for(let o=0,a=Ko.length;o<a;o++){let c=Ko[o];c.instanceId=r,c.object=this,e.push(c)}Ko.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ss(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new bs(new Float32Array(s*this.count),s,this.count,ao,ii));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<i.length;l++)o+=i[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var to=class extends si{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},wa=new U,Ca=new U,sd=new ie,qr=new mr,Qo=new Ri,ul=new U,rd=new U,vh=class extends je{constructor(t=new be,e=new to){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)wa.fromBufferAttribute(e,s-1),Ca.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=wa.distanceTo(Ca);t.setAttribute("lineDistance",new Zt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qo.copy(i.boundingSphere),Qo.applyMatrix4(s),Qo.radius+=r,t.ray.intersectsSphere(Qo)===!1)return;sd.copy(s).invert(),qr.copy(t.ray).applyMatrix4(sd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=l){let p=h.getX(v),M=h.getX(v+1),_=ta(this,t,qr,c,p,M);_&&e.push(_)}if(this.isLineLoop){let v=h.getX(g-1),m=h.getX(d),p=ta(this,t,qr,c,v,m);p&&e.push(p)}}else{let d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=l){let p=ta(this,t,qr,c,v,v+1);p&&e.push(p)}if(this.isLineLoop){let v=ta(this,t,qr,c,g-1,d);v&&e.push(v)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ta(n,t,e,i,s,r){let o=n.geometry.attributes.position;if(wa.fromBufferAttribute(o,s),Ca.fromBufferAttribute(o,r),e.distanceSqToSegment(wa,Ca,ul,rd)>i)return;ul.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(ul);if(!(c<t.near||c>t.far))return{distance:c,point:rd.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var od=new U,ad=new U,Ra=class extends vh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)od.fromBufferAttribute(e,s),ad.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+od.distanceTo(ad);t.setAttribute("lineDistance",new Zt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var _h=class extends si{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Bt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},cd=new ie,yh=new mr,ea=new Ri,na=new U,Pa=class extends je{constructor(t=new be,e=new _h){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ea.copy(i.boundingSphere),ea.applyMatrix4(s),ea.radius+=r,t.ray.intersectsSphere(ea)===!1)return;cd.copy(s).invert(),yh.copy(t.ray).applyMatrix4(cd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,v=d;g<v;g++){let m=l.getX(g);na.fromBufferAttribute(u,m),ld(na,m,c,s,t,e,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,v=d;g<v;g++)na.fromBufferAttribute(u,g),ld(na,g,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ld(n,t,e,i,s,r,o){let a=yh.distanceSqToPoint(n);if(a<e){let c=new U;yh.closestPointToPoint(n,c),c.applyMatrix4(i);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Rn=class extends mn{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Fn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);let h=i[s],f=i[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new at:new U);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new U,s=[],r=[],o=[],a=new U,c=new ie;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new U)}r[0]=new U,o[0]=new U;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Je(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Je(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},eo=class extends Fn{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new at){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Mh=class extends eo{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function eu(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return n+t*r+e*o+i*a}}}var ia=new U,fl=new eu,dl=new eu,pl=new eu,bh=class extends Fn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new U){let i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(ia.subVectors(s[0],s[1]).add(s[0]),l=ia);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(ia.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ia),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),fl.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,v,m),dl.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,v,m),pl.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(fl.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),dl.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),pl.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return i.set(fl.calc(c),dl.calc(c),pl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new U().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function hd(n,t,e,i,s){let r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function B1(n,t){let e=1-n;return e*e*t}function k1(n,t){return 2*(1-n)*n*t}function H1(n,t){return n*n*t}function Jr(n,t,e,i){return B1(n,t)+k1(n,e)+H1(n,i)}function V1(n,t){let e=1-n;return e*e*e*t}function G1(n,t){let e=1-n;return 3*e*e*n*t}function W1(n,t){return 3*(1-n)*n*n*t}function X1(n,t){return n*n*n*t}function jr(n,t,e,i,s){return V1(n,t)+G1(n,e)+W1(n,i)+X1(n,s)}var Ia=class extends Fn{constructor(t=new at,e=new at,i=new at,s=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new at){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(jr(t,s.x,r.x,o.x,a.x),jr(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Sh=class extends Fn{constructor(t=new U,e=new U,i=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new U){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(jr(t,s.x,r.x,o.x,a.x),jr(t,s.y,r.y,o.y,a.y),jr(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},za=class extends Fn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Eh=class extends Fn{constructor(t=new U,e=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new U){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new U){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},La=class extends Fn{constructor(t=new at,e=new at,i=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new at){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Jr(t,s.x,r.x,o.x),Jr(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ah=class extends Fn{constructor(t=new U,e=new U,i=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new U){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Jr(t,s.x,r.x,o.x),Jr(t,s.y,r.y,o.y),Jr(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ua=class extends Fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){let i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(hd(a,c.x,l.x,h.x,u.x),hd(a,c.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new at().fromArray(s))}return this}},Th=Object.freeze({__proto__:null,ArcCurve:Mh,CatmullRomCurve3:bh,CubicBezierCurve:Ia,CubicBezierCurve3:Sh,EllipseCurve:eo,LineCurve:za,LineCurve3:Eh,QuadraticBezierCurve:La,QuadraticBezierCurve3:Ah,SplineCurve:Ua}),wh=class extends Fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Th[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new Th[s.type]().fromJSON(s))}return this}},Da=class extends wh{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new za(this.currentPoint.clone(),new at(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new La(this.currentPoint.clone(),new at(t,e),new at(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){let a=new Ia(this.currentPoint.clone(),new at(t,e),new at(i,s),new at(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new Ua(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){let l=new eo(t,e,i,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Na=class n extends be{constructor(t=[new at(0,-.5),new at(.5,0),new at(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Je(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,u=new U,f=new at,d=new U,g=new U,v=new U,m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(g)}for(let M=0;M<=e;M++){let _=i+M*h*s,y=Math.sin(_),I=Math.cos(_);for(let S=0;S<=t.length-1;S++){u.x=t[S].x*y,u.y=t[S].y,u.z=t[S].x*I,o.push(u.x,u.y,u.z),f.x=M/e,f.y=S/(t.length-1),a.push(f.x,f.y);let T=c[3*S+0]*y,R=c[3*S+1],E=c[3*S+0]*I;l.push(T,R,E)}}for(let M=0;M<e;M++)for(let _=0;_<t.length-1;_++){let y=_+M*t.length,I=y,S=y+t.length,T=y+t.length+1,R=y+1;r.push(I,S,R),r.push(T,R,S)}this.setIndex(r),this.setAttribute("position",new Zt(o,3)),this.setAttribute("uv",new Zt(a,2)),this.setAttribute("normal",new Zt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.points,t.segments,t.phiStart,t.phiLength)}};var Fa=class n extends be{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new U,h=new at;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=i+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Zt(o,3)),this.setAttribute("normal",new Zt(a,3)),this.setAttribute("uv",new Zt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},xn=class n extends be{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,v=[],m=i/2,p=0;M(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Zt(u,3)),this.setAttribute("normal",new Zt(f,3)),this.setAttribute("uv",new Zt(d,2));function M(){let y=new U,I=new U,S=0,T=(e-t)/i;for(let R=0;R<=r;R++){let E=[],b=R/r,P=b*(e-t)+t;for(let N=0;N<=s;N++){let D=N/s,F=D*c+a,W=Math.sin(F),L=Math.cos(F);I.x=P*W,I.y=-b*i+m,I.z=P*L,u.push(I.x,I.y,I.z),y.set(W,T,L).normalize(),f.push(y.x,y.y,y.z),d.push(D,1-b),E.push(g++)}v.push(E)}for(let R=0;R<s;R++)for(let E=0;E<r;E++){let b=v[E][R],P=v[E+1][R],N=v[E+1][R+1],D=v[E][R+1];(t>0||E!==0)&&(h.push(b,P,D),S+=3),(e>0||E!==r-1)&&(h.push(P,N,D),S+=3)}l.addGroup(p,S,0),p+=S}function _(y){let I=g,S=new at,T=new U,R=0,E=y===!0?t:e,b=y===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,m*b,0),f.push(0,b,0),d.push(.5,.5),g++;let P=g;for(let N=0;N<=s;N++){let F=N/s*c+a,W=Math.cos(F),L=Math.sin(F);T.x=E*L,T.y=m*b,T.z=E*W,u.push(T.x,T.y,T.z),f.push(0,b,0),S.x=W*.5+.5,S.y=L*.5*b+.5,d.push(S.x,S.y),g++}for(let N=0;N<s;N++){let D=I+N,F=P+N;y===!0?h.push(F,F+1,D):h.push(F+1,F,D),R+=3}l.addGroup(p,R,y===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},no=class n extends xn{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ch=class n extends be{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],o=[];a(s),l(i),h(),this.setAttribute("position",new Zt(r,3)),this.setAttribute("normal",new Zt(r.slice(),3)),this.setAttribute("uv",new Zt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let _=new U,y=new U,I=new U;for(let S=0;S<e.length;S+=3)d(e[S+0],_),d(e[S+1],y),d(e[S+2],I),c(_,y,I,M)}function c(M,_,y,I){let S=I+1,T=[];for(let R=0;R<=S;R++){T[R]=[];let E=M.clone().lerp(y,R/S),b=_.clone().lerp(y,R/S),P=S-R;for(let N=0;N<=P;N++)N===0&&R===S?T[R][N]=E:T[R][N]=E.clone().lerp(b,N/P)}for(let R=0;R<S;R++)for(let E=0;E<2*(S-R)-1;E++){let b=Math.floor(E/2);E%2===0?(f(T[R][b+1]),f(T[R+1][b]),f(T[R][b])):(f(T[R][b+1]),f(T[R+1][b+1]),f(T[R+1][b]))}}function l(M){let _=new U;for(let y=0;y<r.length;y+=3)_.x=r[y+0],_.y=r[y+1],_.z=r[y+2],_.normalize().multiplyScalar(M),r[y+0]=_.x,r[y+1]=_.y,r[y+2]=_.z}function h(){let M=new U;for(let _=0;_<r.length;_+=3){M.x=r[_+0],M.y=r[_+1],M.z=r[_+2];let y=m(M)/2/Math.PI+.5,I=p(M)/Math.PI+.5;o.push(y,1-I)}g(),u()}function u(){for(let M=0;M<o.length;M+=6){let _=o[M+0],y=o[M+2],I=o[M+4],S=Math.max(_,y,I),T=Math.min(_,y,I);S>.9&&T<.1&&(_<.2&&(o[M+0]+=1),y<.2&&(o[M+2]+=1),I<.2&&(o[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function d(M,_){let y=M*3;_.x=t[y+0],_.y=t[y+1],_.z=t[y+2]}function g(){let M=new U,_=new U,y=new U,I=new U,S=new at,T=new at,R=new at;for(let E=0,b=0;E<r.length;E+=9,b+=6){M.set(r[E+0],r[E+1],r[E+2]),_.set(r[E+3],r[E+4],r[E+5]),y.set(r[E+6],r[E+7],r[E+8]),S.set(o[b+0],o[b+1]),T.set(o[b+2],o[b+3]),R.set(o[b+4],o[b+5]),I.copy(M).add(_).add(y).divideScalar(3);let P=m(I);v(S,b+0,M,P),v(T,b+2,_,P),v(R,b+4,y,P)}}function v(M,_,y,I){I<0&&M.x===1&&(o[_]=M.x-1),y.x===0&&y.z===0&&(o[_]=I/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.details)}};var ji=class extends Da{constructor(t){super(t),this.uuid=_r(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new Da().fromJSON(s))}return this}},q1={triangulate:function(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=Od(n,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,f,d;if(i&&(r=j1(n,t,r,e)),n.length>80*e){a=l=n[0],c=h=n[1];for(let g=e;g<s;g+=e)u=n[g],f=n[g+1],u<a&&(a=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);d=Math.max(l-a,h-c),d=d!==0?32767/d:0}return io(r,o,e,a,c,d,0),o}};function Od(n,t,e,i,s){let r,o;if(s===c_(n,t,e,i)>0)for(r=t;r<e;r+=i)o=ud(r,n[r],n[r+1],o);else for(r=e-i;r>=t;r-=i)o=ud(r,n[r],n[r+1],o);return o&&Ja(o,o.next)&&(ro(o),o=o.next),o}function Es(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Ja(e,e.next)||Pe(e.prev,e,e.next)===0)){if(ro(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function io(n,t,e,i,s,r,o){if(!n)return;!o&&r&&n_(n,i,s,r);let a=n,c,l;for(;n.prev!==n.next;){if(c=n.prev,l=n.next,r?$1(n,i,s,r):Y1(n)){t.push(c.i/e|0),t.push(n.i/e|0),t.push(l.i/e|0),ro(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=Z1(Es(n),t,e),io(n,t,e,i,s,r,2)):o===2&&J1(n,t,e,i,s,r):io(Es(n),t,e,i,s,r,1);break}}}function Y1(n){let t=n.prev,e=n,i=n.next;if(Pe(t,e,i)>=0)return!1;let s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,f=s>r?s>o?s:o:r>o?r:o,d=a>c?a>l?a:l:c>l?c:l,g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&sr(s,a,r,c,o,l,g.x,g.y)&&Pe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function $1(n,t,e,i){let s=n.prev,r=n,o=n.next;if(Pe(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=a<c?a<l?a:l:c<l?c:l,g=h<u?h<f?h:f:u<f?u:f,v=a>c?a>l?a:l:c>l?c:l,m=h>u?h>f?h:f:u>f?u:f,p=Rh(d,g,t,e,i),M=Rh(v,m,t,e,i),_=n.prevZ,y=n.nextZ;for(;_&&_.z>=p&&y&&y.z<=M;){if(_.x>=d&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&sr(a,h,c,u,l,f,_.x,_.y)&&Pe(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=d&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&sr(a,h,c,u,l,f,y.x,y.y)&&Pe(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=p;){if(_.x>=d&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&sr(a,h,c,u,l,f,_.x,_.y)&&Pe(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=M;){if(y.x>=d&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&sr(a,h,c,u,l,f,y.x,y.y)&&Pe(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Z1(n,t,e){let i=n;do{let s=i.prev,r=i.next.next;!Ja(s,r)&&Bd(s,i,i.next,r)&&so(s,r)&&so(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),ro(i),ro(i.next),i=n=r),i=i.next}while(i!==n);return Es(i)}function J1(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&r_(o,a)){let c=kd(o,a);o=Es(o,o.next),c=Es(c,c.next),io(o,t,e,i,s,r,0),io(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function j1(n,t,e,i){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=Od(n,a,c,i,!1),l===l.next&&(l.steiner=!0),s.push(s_(l));for(s.sort(K1),r=0;r<s.length;r++)e=Q1(s[r],e);return e}function K1(n,t){return n.x-t.x}function Q1(n,t){let e=t_(n,t);if(!e)return t;let i=kd(e,n);return Es(i,i.next),Es(e,e.next)}function t_(n,t){let e=t,i=-1/0,s,r=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>i&&(i=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&sr(o<l?r:i,o,c,l,o<l?i:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),so(e,n)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&e_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function e_(n,t){return Pe(n.prev,n,t.prev)<0&&Pe(t.next,n,n.next)<0}function n_(n,t,e,i){let s=n;do s.z===0&&(s.z=Rh(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,i_(s)}function i_(n){let t,e,i,s,r,o,a,c,l=1;do{for(e=n,n=null,r=null,o=0;e;){for(o++,i=e,a=0,t=0;t<l&&(a++,i=i.nextZ,!!i);t++);for(c=l;a>0||c>0&&i;)a!==0&&(c===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,a--):(s=i,i=i.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,l*=2}while(o>1);return n}function Rh(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function s_(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function sr(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function r_(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!o_(n,t)&&(so(n,t)&&so(t,n)&&a_(n,t)&&(Pe(n.prev,n,t.prev)||Pe(n,t.prev,t))||Ja(n,t)&&Pe(n.prev,n,n.next)>0&&Pe(t.prev,t,t.next)>0)}function Pe(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Ja(n,t){return n.x===t.x&&n.y===t.y}function Bd(n,t,e,i){let s=ra(Pe(n,t,e)),r=ra(Pe(n,t,i)),o=ra(Pe(e,i,n)),a=ra(Pe(e,i,t));return!!(s!==r&&o!==a||s===0&&sa(n,e,t)||r===0&&sa(n,i,t)||o===0&&sa(e,n,i)||a===0&&sa(e,t,i))}function sa(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function ra(n){return n>0?1:n<0?-1:0}function o_(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Bd(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function so(n,t){return Pe(n.prev,n,n.next)<0?Pe(n,t,n.next)>=0&&Pe(n,n.prev,t)>=0:Pe(n,t,n.prev)<0||Pe(n,n.next,t)<0}function a_(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function kd(n,t){let e=new Ph(n.i,n.x,n.y),i=new Ph(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function ud(n,t,e,i){let s=new Ph(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function ro(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ph(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function c_(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}var _s=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];fd(t),dd(i,t);let o=t.length;e.forEach(fd);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,dd(i,e[c]);let a=q1.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function fd(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function dd(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var As=class n extends be{constructor(t=new ji([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new Zt(s,3)),this.setAttribute("uv",new Zt(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:l_,_,y=!1,I,S,T,R;p&&(_=p.getSpacedPoints(h),y=!0,f=!1,I=p.computeFrenetFrames(h,!1),S=new U,T=new U,R=new U),f||(m=0,d=0,g=0,v=0);let E=a.extractPoints(l),b=E.shape,P=E.holes;if(!_s.isClockWise(b)){b=b.reverse();for(let K=0,ot=P.length;K<ot;K++){let z=P[K];_s.isClockWise(z)&&(P[K]=z.reverse())}}let D=_s.triangulateShape(b,P),F=b;for(let K=0,ot=P.length;K<ot;K++){let z=P[K];b=b.concat(z)}function W(K,ot,z){return ot||console.error("THREE.ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(ot,z)}let L=b.length,Y=D.length;function H(K,ot,z){let Pt,rt,xt,dt=K.x-ot.x,Ht=K.y-ot.y,bt=z.x-K.x,C=z.y-K.y,A=dt*dt+Ht*Ht,V=dt*C-Ht*bt;if(Math.abs(V)>Number.EPSILON){let J=Math.sqrt(A),st=Math.sqrt(bt*bt+C*C),j=ot.x-Ht/J,It=ot.y+dt/J,mt=z.x-C/st,St=z.y+bt/st,se=((mt-j)*C-(St-It)*bt)/(dt*C-Ht*bt);Pt=j+dt*se-K.x,rt=It+Ht*se-K.y;let ct=Pt*Pt+rt*rt;if(ct<=2)return new at(Pt,rt);xt=Math.sqrt(ct/2)}else{let J=!1;dt>Number.EPSILON?bt>Number.EPSILON&&(J=!0):dt<-Number.EPSILON?bt<-Number.EPSILON&&(J=!0):Math.sign(Ht)===Math.sign(C)&&(J=!0),J?(Pt=-Ht,rt=dt,xt=Math.sqrt(A)):(Pt=dt,rt=Ht,xt=Math.sqrt(A/2))}return new at(Pt/xt,rt/xt)}let Q=[];for(let K=0,ot=F.length,z=ot-1,Pt=K+1;K<ot;K++,z++,Pt++)z===ot&&(z=0),Pt===ot&&(Pt=0),Q[K]=H(F[K],F[z],F[Pt]);let et=[],tt,ut=Q.concat();for(let K=0,ot=P.length;K<ot;K++){let z=P[K];tt=[];for(let Pt=0,rt=z.length,xt=rt-1,dt=Pt+1;Pt<rt;Pt++,xt++,dt++)xt===rt&&(xt=0),dt===rt&&(dt=0),tt[Pt]=H(z[Pt],z[xt],z[dt]);et.push(tt),ut=ut.concat(tt)}for(let K=0;K<m;K++){let ot=K/m,z=d*Math.cos(ot*Math.PI/2),Pt=g*Math.sin(ot*Math.PI/2)+v;for(let rt=0,xt=F.length;rt<xt;rt++){let dt=W(F[rt],Q[rt],Pt);it(dt.x,dt.y,-z)}for(let rt=0,xt=P.length;rt<xt;rt++){let dt=P[rt];tt=et[rt];for(let Ht=0,bt=dt.length;Ht<bt;Ht++){let C=W(dt[Ht],tt[Ht],Pt);it(C.x,C.y,-z)}}}let Et=g+v;for(let K=0;K<L;K++){let ot=f?W(b[K],ut[K],Et):b[K];y?(T.copy(I.normals[0]).multiplyScalar(ot.x),S.copy(I.binormals[0]).multiplyScalar(ot.y),R.copy(_[0]).add(T).add(S),it(R.x,R.y,R.z)):it(ot.x,ot.y,0)}for(let K=1;K<=h;K++)for(let ot=0;ot<L;ot++){let z=f?W(b[ot],ut[ot],Et):b[ot];y?(T.copy(I.normals[K]).multiplyScalar(z.x),S.copy(I.binormals[K]).multiplyScalar(z.y),R.copy(_[K]).add(T).add(S),it(R.x,R.y,R.z)):it(z.x,z.y,u/h*K)}for(let K=m-1;K>=0;K--){let ot=K/m,z=d*Math.cos(ot*Math.PI/2),Pt=g*Math.sin(ot*Math.PI/2)+v;for(let rt=0,xt=F.length;rt<xt;rt++){let dt=W(F[rt],Q[rt],Pt);it(dt.x,dt.y,u+z)}for(let rt=0,xt=P.length;rt<xt;rt++){let dt=P[rt];tt=et[rt];for(let Ht=0,bt=dt.length;Ht<bt;Ht++){let C=W(dt[Ht],tt[Ht],Pt);y?it(C.x,C.y+_[h-1].y,_[h-1].x+z):it(C.x,C.y,u+z)}}}q(),Z();function q(){let K=s.length/3;if(f){let ot=0,z=L*ot;for(let Pt=0;Pt<Y;Pt++){let rt=D[Pt];Mt(rt[2]+z,rt[1]+z,rt[0]+z)}ot=h+m*2,z=L*ot;for(let Pt=0;Pt<Y;Pt++){let rt=D[Pt];Mt(rt[0]+z,rt[1]+z,rt[2]+z)}}else{for(let ot=0;ot<Y;ot++){let z=D[ot];Mt(z[2],z[1],z[0])}for(let ot=0;ot<Y;ot++){let z=D[ot];Mt(z[0]+L*h,z[1]+L*h,z[2]+L*h)}}i.addGroup(K,s.length/3-K,0)}function Z(){let K=s.length/3,ot=0;ft(F,ot),ot+=F.length;for(let z=0,Pt=P.length;z<Pt;z++){let rt=P[z];ft(rt,ot),ot+=rt.length}i.addGroup(K,s.length/3-K,1)}function ft(K,ot){let z=K.length;for(;--z>=0;){let Pt=z,rt=z-1;rt<0&&(rt=K.length-1);for(let xt=0,dt=h+m*2;xt<dt;xt++){let Ht=L*xt,bt=L*(xt+1),C=ot+Pt+Ht,A=ot+rt+Ht,V=ot+rt+bt,J=ot+Pt+bt;Rt(C,A,V,J)}}}function it(K,ot,z){c.push(K),c.push(ot),c.push(z)}function Mt(K,ot,z){At(K),At(ot),At(z);let Pt=s.length/3,rt=M.generateTopUV(i,s,Pt-3,Pt-2,Pt-1);Xt(rt[0]),Xt(rt[1]),Xt(rt[2])}function Rt(K,ot,z,Pt){At(K),At(ot),At(Pt),At(ot),At(z),At(Pt);let rt=s.length/3,xt=M.generateSideWallUV(i,s,rt-6,rt-3,rt-2,rt-1);Xt(xt[0]),Xt(xt[1]),Xt(xt[3]),Xt(xt[1]),Xt(xt[2]),Xt(xt[3])}function At(K){s.push(c[K*3+0]),s.push(c[K*3+1]),s.push(c[K*3+2])}function Xt(K){r.push(K.x),r.push(K.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return h_(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];i.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Th[s.type]().fromJSON(s)),new n(i,t.options)}},l_={generateTopUV:function(n,t,e,i,s){let r=t[e*3],o=t[e*3+1],a=t[i*3],c=t[i*3+1],l=t[s*3],h=t[s*3+1];return[new at(r,o),new at(a,c),new at(l,h)]},generateSideWallUV:function(n,t,e,i,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[i*3],h=t[i*3+1],u=t[i*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new at(o,1-c),new at(l,1-u),new at(f,1-g),new at(v,1-p)]:[new at(a,1-c),new at(h,1-u),new at(d,1-g),new at(m,1-p)]}};function h_(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Oa=class n extends Ch{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}};var Ba=class n extends be{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=t,f=(e-t)/s,d=new U,g=new at;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){let p=r+m/i*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let v=0;v<s;v++){let m=v*(i+1);for(let p=0;p<i;p++){let M=p+m,_=M,y=M+i+1,I=M+i+2,S=M+1;a.push(_,y,S),a.push(y,I,S)}}this.setIndex(a),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(l,3)),this.setAttribute("uv",new Zt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var oi=class n extends be{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new U,f=new U,d=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){let M=[],_=p/i,y=0;p===0&&o===0?y=.5/e:p===i&&c===Math.PI&&(y=-.5/e);for(let I=0;I<=e;I++){let S=I/e;u.x=-t*Math.cos(s+S*r)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(s+S*r)*Math.sin(o+_*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(S+y,1-_),M.push(l++)}h.push(M)}for(let p=0;p<i;p++)for(let M=0;M<e;M++){let _=h[p][M+1],y=h[p][M],I=h[p+1][M],S=h[p+1][M+1];(p!==0||o>0)&&d.push(_,y,S),(p!==i-1||c<Math.PI)&&d.push(y,I,S)}this.setIndex(d),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(v,3)),this.setAttribute("uv",new Zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ka=class n extends be{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new U,u=new U,f=new U;for(let d=0;d<=i;d++)for(let g=0;g<=s;g++){let v=g/s*r,m=d/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=s;g++){let v=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,M=(s+1)*d+g;o.push(v,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new Zt(a,3)),this.setAttribute("normal",new Zt(c,3)),this.setAttribute("uv",new Zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Ts=class extends si{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Bt(16777215),this.specular=new Bt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qh,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=qa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var vn=class extends si{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qh,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fe,this.combine=qa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function oa(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function u_(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var xr=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ih=class extends xr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:of,endingEnd:of}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case af:r=t,a=2*e-i;break;case cf:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case af:o=t,c=2*i-e;break;case cf:o=1,c=i+s[1]-s[0];break;default:o=t-1,c=e}let l=(i-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(i-e)/(s-e),v=g*g,m=v*g,p=-f*m+2*f*v-f*g,M=(1+f)*m+(-1.5-2*f)*v+(-.5+f)*g+1,_=(-1-d)*m+(1.5+d)*v+.5*g,y=d*m-d*v;for(let I=0;I!==a;++I)r[I]=p*o[h+I]+M*o[l+I]+_*o[c+I]+y*o[u+I];return r}},zh=class extends xr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(i-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},Lh=class extends xr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},$n=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=oa(e,this.TimeBufferType),this.values=oa(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:oa(t.times,Array),values:oa(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Lh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new zh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ih(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case fa:e=this.InterpolantFactoryMethodDiscrete;break;case th:e=this.InterpolantFactoryMethodLinear;break;case Nc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fa;case this.InterpolantFactoryMethodLinear:return th;case this.InterpolantFactoryMethodSmooth:return Nc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&u_(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Nc,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*i,f=u-i,d=u+i;for(let g=0;g!==i;++g){let v=e[u+g];if(v!==e[f+g]||v!==e[d+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*i,f=o*i;for(let d=0;d!==i;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};$n.prototype.TimeBufferType=Float32Array;$n.prototype.ValueBufferType=Float32Array;$n.prototype.DefaultInterpolation=th;var ws=class extends $n{constructor(t,e,i){super(t,e,i)}};ws.prototype.ValueTypeName="bool";ws.prototype.ValueBufferType=Array;ws.prototype.DefaultInterpolation=fa;ws.prototype.InterpolantFactoryMethodLinear=void 0;ws.prototype.InterpolantFactoryMethodSmooth=void 0;var Uh=class extends $n{};Uh.prototype.ValueTypeName="color";var Dh=class extends $n{};Dh.prototype.ValueTypeName="number";var Nh=class extends xr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)gn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Ha=class extends $n{InterpolantFactoryMethodLinear(t){return new Nh(this.times,this.values,this.getValueSize(),t)}};Ha.prototype.ValueTypeName="quaternion";Ha.prototype.InterpolantFactoryMethodSmooth=void 0;var Cs=class extends $n{constructor(t,e,i){super(t,e,i)}};Cs.prototype.ValueTypeName="string";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=fa;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;var Fh=class extends $n{};Fh.prototype.ValueTypeName="vector";var Oh=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],g=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}},f_=new Oh,Bh=class{constructor(t){this.manager=t!==void 0?t:f_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Bh.DEFAULT_MATERIAL_NAME="__DEFAULT";var Va=class extends je{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Ga=class extends Va{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(je.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},ml=new ie,pd=new U,md=new U,kh=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ms,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new De(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;pd.setFromMatrixPosition(t.matrixWorld),e.position.copy(pd),md.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(md),e.updateMatrixWorld(),ml.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ml),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ml)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Hh=class extends kh{constructor(){super(new Ma(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Wa=class extends Va{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(je.DEFAULT_UP),this.updateMatrix(),this.target=new je,this.shadow=new Hh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var nu="\\[\\]\\.:\\/",d_=new RegExp("["+nu+"]","g"),iu="[^"+nu+"]",p_="[^"+nu.replace("\\.","")+"]",m_=/((?:WC+[\/:])*)/.source.replace("WC",iu),g_=/(WCOD+)?/.source.replace("WCOD",p_),x_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",iu),v_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",iu),__=new RegExp("^"+m_+g_+x_+v_+"$"),y_=["material","materials","bones","map"],Vh=class{constructor(t,e,i){let s=i||Ee.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Ee=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(d_,"")}static parseTrackName(t){let e=__.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);y_.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=i(a.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ee.Composite=Vh;Ee.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ee.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ee.prototype.GetterByBindingType=[Ee.prototype._getValue_direct,Ee.prototype._getValue_array,Ee.prototype._getValue_arrayElement,Ee.prototype._getValue_toArray];Ee.prototype.SetterByBindingTypeAndVersioning=[[Ee.prototype._setValue_direct,Ee.prototype._setValue_direct_setNeedsUpdate,Ee.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_array,Ee.prototype._setValue_array_setNeedsUpdate,Ee.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_arrayElement,Ee.prototype._setValue_arrayElement_setNeedsUpdate,Ee.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_fromArray,Ee.prototype._setValue_fromArray_setNeedsUpdate,Ee.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var aM=new Float32Array(1);var gd=new ie,Xa=class{constructor(t,e,i=0,s=1/0){this.ray=new mr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Qr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return gd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gd),this}intersectObject(t,e=!0,i=[]){return Gh(t,this,i,e),i.sort(xd),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Gh(t[s],this,i,e);return i.sort(xd),i}};function xd(n,t){return n.distance-t.distance}function Gh(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let o=0,a=r.length;o<a;o++)Gh(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wh}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wh);var x={cena:null,camera:null,renderer:null,bonecos:null,efeitos:null,unidades:[],agentes:[],projeteis:[],hashA:null,hashU:null,dinheiro:3e3,tempo:0,velocidade:1,pausado:!0,fim:!1,resgatados:0,civisMortos:0,zumbisMortos:0,perdas:0,populacao:0,meta:250,selecao:[],alertas:[],focos:0,proxFoco:25,dificuldade:"normal",base:null,porta:null,estr:{},satelite:null,cfg:{som:!0,qualidade:1},controlando:null,idSeq:1};function Yt(n,t,e,i="info"){x.alertas.push({txt:n,x:t,z:e,tipo:i,t:x.tempo,criado:performance.now()}),x.alertas.length>30&&x.alertas.shift(),x.ui&&x.ui.alerta(n,t,e,i)}var du={};ef(du,{ALT:()=>Be,CEL:()=>Ae,COSTA:()=>Ge,GH:()=>Te,GW:()=>Ft,LARG:()=>Oe,MAT_PREDIOS:()=>Pi,META:()=>_e,MPP:()=>Qi,T:()=>Se,agua:()=>Is,andavel:()=>Ne,canvasTerreno:()=>au,carros:()=>Ie,cel:()=>ci,construirAgua:()=>lu,construirCarros:()=>uu,construirChao:()=>cu,construirPalmeiras:()=>hu,construirPredios:()=>ou,dentroPoligono:()=>co,ehRua:()=>ja,esmagarCarros:()=>fu,grade:()=>ke,latlon:()=>F_,lugares:()=>we,predioEm:()=>zs,predioId:()=>ze,predios:()=>Le,rasterizarPredios:()=>su,removerPrediosEm:()=>ru,tipo:()=>M_});function ai(n,t=!1){let e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new be,l=0;for(let h=0;h<n.length;++h){let u=n[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0,u=[];for(let f=0;f<n.length;++f){let d=n[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=n[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Hd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let v=0;v<o[h].length;++v)d.push(o[h][v][f]);let g=Hd(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function Hd(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){let h=n[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new pe(o,e,i),c=0;for(let l=0;l<n.length;++l){let h=n[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){let v=h.getComponent(f,g);a.setComponent(f+u,g,v)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}var{META:_e,GRADE_RLE:Vd,PREDIOS:Gd}=window.MAPA_DADOS,gM=_e.cidade||"miami",Ge=_e.costa!==!1;var Qi=_e.mpp,Ae=_e.cel*Qi,Ft=_e.gw,Te=_e.gh,Oe=Ft*Ae,Be=Te*Ae,Se={AGUA:0,CHAO:1,RUA:2,PARQUE:3,AREIA:4,PREDIO:5,PONTE:6,CENTRO:7},ja=n=>n===2||n===7;function Zd(n){let t=atob(n),e=new Uint8Array(t.length);for(let i=0;i<t.length;i++)e[i]=t.charCodeAt(i);return e}var ke=new Uint8Array(Ft*Te);{let n=Zd(Vd),t=0;for(let e=0;e<n.length;e+=2)ke.fill(n[e],t,t+n[e+1]),t+=n[e+1]}var ze=new Int32Array(Ft*Te).fill(-1);function ci(n,t){let e=Math.floor(n/Ae),i=Math.floor(t/Ae);return e<0||i<0||e>=Ft||i>=Te?-1:i*Ft+e}function M_(n,t){let e=ci(n,t);return e<0?Ge?Se.AGUA:Se.CHAO:ke[e]}function Ne(n,t){let e=ci(n,t);return e<0?!1:ke[e]!==Se.AGUA&&ze[e]<0}function Is(n,t){let e=ci(n,t);return e<0?Ge:ke[e]===Se.AGUA||ke[e]===Se.PONTE}function zs(n,t){let e=ci(n,t);return e<0?null:ze[e]>=0?Le[ze[e]]:null}var we={};for(let n in _e.lugares){let[t,e,i]=_e.lugares[n];we[n]={nome:t,x:e*Qi,z:i*Qi}}var Le=[];{let n=Zd(Gd),t=new Uint16Array(n.buffer,n.byteOffset,n.byteLength/2),e=0;for(;e<t.length;){let i=t[e],s=t[e+1]/4,r=new Float32Array(i*2);for(let g=0;g<i;g++)r[g*2]=t[e+2+g*2]/2*Qi,r[g*2+1]=t[e+3+g*2]/2*Qi;e+=2+i*2;let o=0;for(let g=0;g<i;g++){let v=(g+1)%i;o+=r[g*2]*r[v*2+1]-r[v*2]*r[g*2+1]}if(o>0)for(let g=0;g<i/2;g++){let v=i-1-g,m=r[g*2];r[g*2]=r[v*2],r[v*2]=m,m=r[g*2+1],r[g*2+1]=r[v*2+1],r[v*2+1]=m}let a=Math.abs(o)/2,c=0,l=0,h=1e9,u=-1e9,f=1e9,d=-1e9;for(let g=0;g<i;g++){let v=r[g*2],m=r[g*2+1];c+=v,l+=m,v<h&&(h=v),v>u&&(u=v),m<f&&(f=m),m>d&&(d=m)}c/=i,l/=i,Le.push({id:Le.length,pts:r,h:s,area:a,cx:c,cz:l,x0:h,x1:u,z0:f,z1:d,raio:Math.max(u-h,d-f)/2,cap:Math.max(4,Math.min(24,Math.round(a/50)+Math.floor(s/10))),guarnicao:[],civis:0,sos:!1,integridade:100,removido:!1})}}function co(n,t,e){let i=n.pts,s=i.length/2,r=!1;for(let o=0,a=s-1;o<s;a=o++){let c=i[o*2],l=i[o*2+1],h=i[a*2],u=i[a*2+1];l>e!=u>e&&t<(h-c)*(e-l)/(u-l)+c&&(r=!r)}return r}function su(){ze.fill(-1);for(let n of Le){if(n.removido)continue;let t=Math.max(0,Math.floor(n.z0/Ae)),e=Math.min(Te-1,Math.floor(n.z1/Ae)),i=Math.max(0,Math.floor(n.x0/Ae)),s=Math.min(Ft-1,Math.floor(n.x1/Ae)),r=!1;for(let o=t;o<=e;o++){let a=(o+.5)*Ae;for(let c=i;c<=s;c++)co(n,(c+.5)*Ae,a)&&(ze[o*Ft+c]=n.id,r=!0)}if(!r){let o=ci(n.cx,n.cz);o>=0&&(ze[o]=n.id)}}for(let n=0;n<ke.length;n++)ke[n]===Se.PREDIO&&ze[n]<0&&(ke[n]=Se.CHAO)}function ru(n,t,e){for(let i of Le)!i.removido&&Math.hypot(i.cx-n,i.cz-t)<e+i.raio*.3&&(i.removido=!0)}var Mr=3.6,Wd=3.4,Ke=4;function Ka(n){let t=n>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function b_(n){let e=document.createElement("canvas"),i=document.createElement("canvas");e.width=e.height=i.width=i.height=256;let s=e.getContext("2d"),r=i.getContext("2d"),o=Ka(n==="vidro"?7:n==="concreto"?11:23);r.fillStyle="#000",r.fillRect(0,0,256,256);let a=256/Ke;if(n==="vidro"){for(let h=0;h<Ke;h++)for(let u=0;u<Ke;u++){let f=u*a,d=h*a,g=s.createLinearGradient(f,d,f+a,d+a),v=.85+o()*.25;g.addColorStop(0,`rgb(${150*v|0},${178*v|0},${200*v|0})`),g.addColorStop(1,`rgb(${92*v|0},${118*v|0},${142*v|0})`),s.fillStyle=g,s.fillRect(f,d,a,a),s.fillStyle="rgba(255,255,255,0.18)",s.fillRect(f+a*.12,d+4,a*.18,a-10),o()<.35&&(r.fillStyle=`rgb(255,${220+o()*30|0},${150+o()*60|0})`,r.fillRect(f+3,d+6,a-6,a-12))}s.fillStyle="#d7dde2";for(let h=0;h<=Ke;h++)s.fillRect(0,h*a-3,256,6);s.fillStyle="#aeb8c0";for(let h=0;h<=Ke*2;h++)s.fillRect(h*a/2-1,0,2,256)}else if(n==="concreto"){s.fillStyle="#f2f0ec",s.fillRect(0,0,256,256);for(let h=0;h<1400;h++)s.fillStyle=`rgba(0,0,0,${o()*.05})`,s.fillRect(o()*256,o()*256,2,2);for(let h=0;h<Ke;h++)for(let u=0;u<Ke;u++){let f=u*a,d=h*a;s.fillStyle="#d9d6d0",s.fillRect(f+6,d+a*.72,a-12,4),s.fillStyle="#3c4a57",s.fillRect(f+9,d+a*.2,a-18,a*.52),s.fillStyle="rgba(160,190,215,0.55)",s.fillRect(f+9,d+a*.2,(a-18)*.45,a*.52),o()<.3&&(s.fillStyle="#e8e2d2",s.fillRect(f+9,d+a*.2,a-18,a*.52*o())),s.fillStyle="#9aa0a6",s.fillRect(f+a/2-1,d+a*.2,2,a*.52),o()<.4&&(r.fillStyle=`rgb(255,${200+o()*40|0},${120+o()*60|0})`,r.fillRect(f+9,d+a*.2,a-18,a*.52))}s.fillStyle="rgba(0,0,0,0.12)";for(let h=0;h<Ke;h++)s.fillRect(0,h*a+a-3,256,3)}else{s.fillStyle="#ffffff",s.fillRect(0,0,256,256);for(let h=0;h<900;h++)s.fillStyle=`rgba(0,0,0,${o()*.04})`,s.fillRect(o()*256,o()*256,2,2);for(let h=0;h<Ke;h++)for(let u=0;u<Ke;u++){let f=u*a,d=h*a;s.fillStyle="rgba(0,0,0,0.25)",s.fillRect(f+8,d+a*.22+4,a-16,5),s.fillStyle="#fafafa",s.fillRect(f+6,d+a*.2,a-12,5),s.fillStyle="#2f4a5a",s.fillRect(f+14,d+a*.3,a-28,a*.42),s.fillStyle="rgba(170,210,230,0.5)",s.fillRect(f+14,d+a*.3,(a-28)*.4,a*.42),s.fillStyle="#ffffff",s.fillRect(f+a/2-1.5,d+a*.3,3,a*.42),o()<.45&&(r.fillStyle=`rgb(255,${190+o()*50|0},${110+o()*60|0})`,r.fillRect(f+14,d+a*.3,a-28,a*.42))}s.fillStyle="rgba(0,0,0,0.08)",s.fillRect(0,248,256,8)}let c=new Rn(e),l=new Rn(i);for(let h of[c,l])h.wrapS=h.wrapT=Dn,h.anisotropy=8,h.colorSpace=Re;return{t:c,te:l}}function S_(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),i=Ka(5);e.fillStyle="#8f8c86",e.fillRect(0,0,128,128);for(let r=0;r<2600;r++){let o=100+i()*90|0;e.fillStyle=`rgb(${o},${o-2},${o-6})`,e.fillRect(i()*128,i()*128,1+i()*2,1+i()*2)}e.strokeStyle="rgba(60,60,60,0.25)",e.lineWidth=1;for(let r=0;r<=4;r++)e.beginPath(),e.moveTo(r*32,0),e.lineTo(r*32,128),e.stroke();let s=new Rn(t);return s.wrapS=s.wrapT=Dn,s.anisotropy=8,s.colorSpace=Re,s}function E_(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),i=Ka(31);e.fillStyle="#ffffff",e.fillRect(0,0,128,128);for(let r=0;r<128;r+=16){for(let o=r/16%2?-8:0;o<128;o+=16){let a=210+i()*45|0;e.fillStyle=`rgb(${a},${a},${a})`,e.beginPath(),e.ellipse(o+8,r+9,8,9,0,0,Math.PI),e.fill(),e.fillRect(o,r,16,9)}e.fillStyle="rgba(0,0,0,0.35)",e.fillRect(0,r+14,128,2)}let s=new Rn(t);return s.wrapS=s.wrapT=Dn,s.anisotropy=8,s.colorSpace=Re,s}function A_(){let t=document.createElement("canvas"),e=document.createElement("canvas");t.width=t.height=e.width=e.height=256;let i=t.getContext("2d"),s=e.getContext("2d"),r=Ka(41);s.fillStyle="#000",s.fillRect(0,0,256,256),i.fillStyle="#c9c4bc",i.fillRect(0,0,256,256);for(let l=0;l<256;l+=6)for(let h=l/6%2?-6:0;h<256;h+=12){let u=.85+r()*.3;i.fillStyle=`rgb(${255*u|0},${230*u|0},${220*u|0})`,i.fillRect(h+1,l+1,10,4)}let o=256/Ke;for(let l=0;l<Ke;l++)for(let h=0;h<Ke;h++){let u=h*o,f=l*o;i.fillStyle="#efece6",i.fillRect(u+12,f+o*.18,o-24,o*.6),i.fillStyle="#2e3a44",i.fillRect(u+15,f+o*.21,o-30,o*.54),i.fillStyle="rgba(150,180,205,0.5)",i.fillRect(u+15,f+o*.21,(o-30)*.45,o*.54),i.fillStyle="#efece6",i.fillRect(u+o/2-1,f+o*.21,2,o*.54),i.fillRect(u+15,f+o*.47,o-30,2),i.fillStyle="#e4ded4",i.fillRect(u+10,f+o*.78,o-20,4),r()<.4&&(s.fillStyle=`rgb(255,${200+r()*40|0},${120+r()*50|0})`,s.fillRect(u+15,f+o*.21,o-30,o*.54))}let a=new Rn(t),c=new Rn(e);for(let l of[a,c])l.wrapS=l.wrapT=Dn,l.anisotropy=8,l.colorSpace=Re;return{t:a,te:c}}var T_=[14191212,14916218,13599334,15380622,15786696,13072994],Xd=[11882542,11028010,12607546,10242608,6975348,5200482],w_=[16238540,12576988,16246694,12573938,16184042,16373682,14470128,16777215,13234406,16765148],C_=[15134967,13821167,14281704,15329778,15921906,13163496,14674399],R_=[15789026,14933458,16250094,14209477,15525080,15327439],Pi={};function ou(n){let t=["vidro","concreto","deco"];for(let l of t){let{t:h,te:u}=b_(l);Pi[l]=new vn({vertexColors:!0,map:h,emissiveMap:u,emissive:16777215,emissiveIntensity:0})}Pi.telhado=new vn({vertexColors:!0,map:S_()}),Pi.telha=new vn({vertexColors:!0,map:E_()});{let{t:l,te:h}=A_();Pi.tijolo=new vn({vertexColors:!0,map:l,emissiveMap:h,emissive:16777215,emissiveIntensity:0})}let e=1200,i=new Map,s=l=>{let h=i.get(l);return h||(h={pos:[],nor:[],col:[],uv:[]},i.set(l,h)),h},r=new Bt,o=(l,h,u,f,d,g,v,m,p,M,_,y,I,S,T)=>{l.pos.push(h,g,u,f,g,d,f,v,d,h,g,u,f,v,d,h,v,u);for(let b=0;b<6;b++)l.nor.push(m,0,p),l.col.push(y,I,S);let R=g/T,E=v/T;l.uv.push(M,R,_,R,_,E,M,R,_,E,M,E)},a=(l,h,u,f,d,g,v,m)=>{let p=h-f/2,M=h+f/2,_=u-d/2,y=u+d/2,I=g+v,S=[[p,y,M,y,0,1],[M,y,M,_,1,0],[M,_,p,_,0,-1],[p,_,p,y,-1,0]];for(let[T,R,E,b,P,N]of S)o(l,T,R,E,b,g,I,P,N,0,.3,m,m,m*.98,6);l.pos.push(p,I,_,p,I,y,M,I,y,p,I,_,M,I,y,M,I,_);for(let T=0;T<6;T++)l.nor.push(0,1,0),l.col.push(m*1.05,m*1.05,m*1.03);l.uv.push(0,0,0,.2,.2,.2,0,0,.2,.2,.2,0)};for(let l of Le){if(l.removido)continue;let h=Math.floor(l.cx/e)+","+Math.floor(l.cz/e),u=l.pts.length/2,f=l.h,d=l.pts,g=l.id*2654435761>>>0,v=null;if(f<11&&u>=4&&u<=6&&l.area<900){let E=[],b=[],P=0,N=0;for(let tt=0;tt<u;tt++){let ut=(tt+1)%u,Et=Math.hypot(d[ut*2]-d[tt*2],d[ut*2+1]-d[tt*2+1]);Et>N&&(N=Et,P=tt)}let D=(P+1)%u,F=(d[D*2]-d[P*2])/N,W=(d[D*2+1]-d[P*2+1])/N,L=1e9,Y=-1e9,H=1e9,Q=-1e9;for(let tt=0;tt<u;tt++){let ut=d[tt*2]-l.cx,Et=d[tt*2+1]-l.cz,q=ut*F+Et*W,Z=-ut*W+Et*F;L=Math.min(L,q),Y=Math.max(Y,q),H=Math.min(H,Z),Q=Math.max(Q,Z)}let et=(Y-L)*(Q-H);l.area/et>.82&&Q-H>4&&(v={ux:F,uz:W,a0:L,a1:Y,b0:H,b1:Q})}let m=f>45?"vidro":f>14?g%3===0&&f<30?"tijolo":"concreto":v&&g%2===0?"tijolo":"deco",p=m==="vidro"?C_:m==="concreto"?R_:m==="tijolo"?T_:w_;r.setHex(p[g%p.length]),l.cor=r.getHex();let M=s(h+","+m),_=s(h+",telhado"),y=f>6&&!v?1.1:0,I=g%7*Mr;for(let E=0;E<u;E++){let b=(E+1)%u,P=d[E*2],N=d[E*2+1],D=d[b*2],F=d[b*2+1],W=D-P,L=F-N,Y=Math.hypot(W,L)||1,H=-L/Y,Q=W/Y,et=Math.max(1,Math.round(Y/Mr)),tt=I/(Mr*Ke),ut=(I+et*Mr)/(Mr*Ke);I+=et*Mr;let Et=Math.min(f,4);o(M,P,N,D,F,0,Et,H,Q,tt,ut,r.r*.8,r.g*.8,r.b*.82,Wd*Ke),f>Et&&o(M,P,N,D,F,Et,f,H,Q,tt,ut,r.r,r.g,r.b,Wd*Ke),y&&(o(_,P,N,D,F,f,f+y,H,Q,tt*3,ut*3,r.r*.92,r.g*.92,r.b*.92,8),o(_,D,F,P,N,f,f+y,-H,-Q,tt*3,ut*3,r.r*.7,r.g*.7,r.b*.7,8))}if(v){let E=s(h+",telha"),{ux:b,uz:P}=v,N=.5,D=v.a0-N,F=v.a1+N,W=v.b0-N,L=v.b1+N,Y=Math.min(4,(L-W)*.38),H=(W+L)/2,Q=(Z,ft,it)=>[l.cx+Z*b-ft*P,it,l.cz+Z*P+ft*b],et=new Bt(Xd[(g>>4)%Xd.length]),tt=(Z,ft,it,Mt,Rt)=>{let At=[ft[0]-Z[0],ft[1]-Z[1],ft[2]-Z[2]],Xt=[it[0]-Z[0],it[1]-Z[1],it[2]-Z[2]],K=At[1]*Xt[2]-At[2]*Xt[1],ot=At[2]*Xt[0]-At[0]*Xt[2],z=At[0]*Xt[1]-At[1]*Xt[0];if(ot<0){let rt=ft;ft=it,it=rt,K=-K,ot=-ot,z=-z;let xt=Rt[1];Rt[1]=Rt[2],Rt[2]=xt}let Pt=Math.hypot(K,ot,z)||1;for(let[rt,xt]of[[Z,Rt[0]],[ft,Rt[1]],[it,Rt[2]]])E.pos.push(...rt),E.nor.push(K/Pt,ot/Pt,z/Pt),E.col.push(Mt[0],Mt[1],Mt[2]),E.uv.push(xt[0],xt[1])},ut=[et.r,et.g,et.b],Et=1/2.2,q=Math.hypot(Y,(L-W)/2)/2.2;for(let[Z,ft]of[[W,1],[L,-1]]){let it=Q(D,Z,f),Mt=Q(F,Z,f),Rt=Q(F,H,f+Y),At=Q(D,H,f+Y);tt(it,Mt,Rt,ut,[[0,0],[(F-D)*Et,0],[(F-D)*Et,q]]),tt(it,Rt,At,ut,[[0,0],[(F-D)*Et,q],[0,q]])}for(let Z of[v.a0,v.a1]){let ft=Q(Z,v.b0,f),it=Q(Z,v.b1,f),Mt=Q(Z,H,f+Y*.95),Rt=Z===v.a0?-1:1,At=b*Rt,Xt=P*Rt;for(let K of[ft,it,Mt])M.pos.push(...K),M.nor.push(At,0,Xt),M.col.push(r.r,r.g,r.b),M.uv.push(.02,.02);for(let K of[ft,Mt,it])M.pos.push(...K),M.nor.push(At,0,Xt),M.col.push(r.r,r.g,r.b),M.uv.push(.02,.02)}continue}let S=[];for(let E=0;E<u;E++)S.push(new at(d[E*2],d[E*2+1]));let T;try{T=_s.triangulateShape(S,[])}catch{T=[]}let R=.85+(g>>8)%20/100;for(let E of T){let[b,P,N]=E;if((S[P].x-S[b].x)*(S[N].y-S[b].y)-(S[P].y-S[b].y)*(S[N].x-S[b].x)>0){let F=P;P=N,N=F}for(let F of[b,P,N])_.pos.push(S[F].x,f,S[F].y),_.nor.push(0,1,0),_.col.push(R,R,R*.98),_.uv.push(S[F].x/8,S[F].y/8)}if(f>8&&l.area>150){let E=1+g%3+(f>40?2:0);for(let b=0;b<E;b++){let P=(g>>b*3)%628/100,N=l.raio*.25*(b%3/2),D=l.cx+Math.sin(P)*N,F=l.cz+Math.cos(P)*N;if(!co(l,D,F))continue;let W=f>40&&b===0;a(_,D,F,W?8:2.2+b%2,W?8:1.6+b%2,f,W?4:1.4,W?.8:.72)}}}let c=[];for(let[l,h]of i){let u=l.split(",")[2],f=new be;f.setAttribute("position",new Zt(h.pos,3)),f.setAttribute("normal",new Zt(h.nor,3)),f.setAttribute("color",new Zt(h.col,3)),f.setAttribute("uv",new Zt(h.uv,2)),f.computeBoundingSphere();let d=new oe(f,Pi[u]);d.matrixAutoUpdate=!1,d.updateMatrix(),d.castShadow=!0,d.receiveShadow=!0,d.name="predios",n.add(d),c.push(d)}return c}var P_=[[44,104,140],[205,200,188],[86,88,94],[96,146,70],[232,214,164],[170,168,160],[110,110,114],[86,88,94]];function au(n=1){let t=document.createElement("canvas");t.width=Math.ceil(Ft/n),t.height=Math.ceil(Te/n);let e=t.getContext("2d"),i=e.createImageData(t.width,t.height),s=i.data;for(let r=0;r<t.height;r++)for(let o=0;o<t.width;o++){let a=Math.min(Te-1,r*n)*Ft+Math.min(Ft-1,o*n),c=ze[a]>=0?5:ke[a],l=P_[c],h=(r*t.width+o)*4;s[h]=l[0],s[h+1]=l[1],s[h+2]=l[2],s[h+3]=255}return e.putImageData(i,0,0),t}function I_(){let n=Ft*Te,t=new Uint8Array(n);for(let c=0;c<n;c++)t[c]=ja(ke[c])&&ze[c]<0?1:0;let e=new Uint16Array(n),i=new Uint16Array(n);for(let c=0;c<Te;c++){let l=0;for(;l<Ft;){if(!t[c*Ft+l]){l++;continue}let h=l;for(;h<Ft&&t[c*Ft+h];)h++;for(let u=l;u<h;u++)e[c*Ft+u]=h-l;l=h}}for(let c=0;c<Ft;c++){let l=0;for(;l<Te;){if(!t[l*Ft+c]){l++;continue}let h=l;for(;h<Te&&t[h*Ft+c];)h++;for(let u=l;u<h;u++)i[u*Ft+c]=h-l;l=h}}let s=8,r=c=>e[c]>=s&&i[c]>=s,o=new Uint8Array(n*4);for(let c=3;c<Te-3;c++)for(let l=3;l<Ft-3;l++){let h=c*Ft+l;if(!t[h]||r(h))continue;let u=-1;if(i[h]>=s&&e[h]<s&&e[h]>=3&&(r(h-Ft)||r(h+Ft))?u=0:e[h]>=s&&i[h]<s&&i[h]>=3&&(r(h-1)||r(h+1))&&(u=1),u<0)continue;let f=!1;for(let d=-6;d<=6&&!f;d+=3)for(let g=-6;g<=6;g+=3){let v=h+d*Ft+g;if(v>=0&&v<n&&ze[v]>=0){f=!0;break}}f&&(o[h*4+u]=255)}let a=c=>ke[c]===Se.CENTRO;for(let c=2;c<Te-2;c++)for(let l=2;l<Ft-2;l++){let h=c*Ft+l;if(!a(h)||r(h)||o[h*4]||o[h*4+1])continue;let u=0,f=0,d=0,g=0;for(let v=-3;v<=3;v++)(a(h+v)||a(h+v-Ft)||a(h+v+Ft))&&u++,(a(h+v*Ft)||a(h+v*Ft-1)||a(h+v*Ft+1))&&f++,a(h+v)&&d++,a(h+v*Ft)&&g++;u>=6&&g<=3&&d>=g&&!o[(h-Ft)*4+2]?o[h*4+2]=255:f>=6&&d<=3&&g>d&&!o[(h-1)*4+3]&&(o[h*4+3]=255)}return o}function cu(n){let t=new Uint8Array(Ft*Te*4);for(let c=0;c<Ft*Te;c++){let l=ke[c],h=c*4;t[h]=l===Se.RUA||l===Se.PONTE||l===Se.CENTRO?255:0,t[h+1]=l===Se.PARQUE?255:0,t[h+2]=l===Se.AREIA||l===Se.CENTRO?255:0,t[h+3]=ze[c]>=0?255:0}let e=new bs(t,Ft,Te,dn,wn);e.magFilter=hn,e.minFilter=hn,e.needsUpdate=!0;let i=new bs(I_(),Ft,Te,dn,wn);i.magFilter=sn,i.minFilter=sn,i.needsUpdate=!0;let s=new vn({color:16777215});s.onBeforeCompile=c=>{c.uniforms.mapa={value:e},c.uniforms.marcas={value:i},c.uniforms.tam={value:new at(Oe,Be)},c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
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
      }`)};let r=new Ji(Oe,Be,48,28);r.rotateX(-Math.PI/2),r.translate(Oe/2,0,Be/2);let o=new oe(r,s);o.name="chao",o.receiveShadow=!0,n.add(o);let a=new oe(new Ji(8e4,8e4).rotateX(-Math.PI/2),new Cn({color:Ge?997946:9276032}));return a.position.set(Oe/2,-4,Be/2),n.add(a),o}function lu(n){let t=new Uint8Array(Ft*Te);for(let a=0;a<t.length;a++)t[a]=ke[a]===Se.AGUA?255:0;let e=new bs(t,Ft,Te,ao,wn);e.magFilter=hn,e.minFilter=hn,e.needsUpdate=!0;let i={value:0},s=new Ts({color:16777215,transparent:!0,depthWrite:!1,shininess:90,specular:5596774,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4});s.onBeforeCompile=a=>{a.uniforms.mascara={value:e},a.uniforms.tam={value:new at(Oe,Be)},a.uniforms.tempo=i,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vW = (modelMatrix * vec4(transformed, 1.0)).xyz;`),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
      uniform sampler2D mascara; uniform vec2 tam; uniform float tempo; varying vec3 vW;
      float h1a(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float rua2(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(h1a(i), h1a(i+vec2(1,0)), u.x), mix(h1a(i+vec2(0,1)), h1a(i+vec2(1,1)), u.x), u.y); }`).replace("#include <map_fragment>",`
      {
        vec2 uv = vW.xz / tam;
        float mm = ${Ge?"1.0":"0.0"};
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
      }`)};let r=new Ji(Oe+3e4,Be+3e4,64,48);r.rotateX(-Math.PI/2);let o=new oe(r,s);return o.position.set(Oe/2,.3,Be/2),o.renderOrder=1,o.receiveShadow=!0,o.userData.tempo=i,n.add(o),o}function Ps(n,t){let e=n.attributes.position.count,i=new Float32Array(e*3);for(let s=0;s<e;s++){let r=t(n.attributes.position.getY(s),s);i[s*3]=r[0],i[s*3+1]=r[1],i[s*3+2]=r[2]}return n.setAttribute("color",new pe(i,3)),n.attributes.uv&&n.deleteAttribute("uv"),n}function z_(){let n=[],t=[];for(let o=0;o<6;o++){let a=new xn(.19-o*.012,.22-o*.012,1.62,6).toNonIndexed(),c=(o/6)**2*.9;a.rotateZ(-.06*o/6),a.translate(c,.81+o*1.58,0);let l=o%2?.86:1;n.push(Ps(a,h=>[.62*l,.5*l,.36*l]))}let i=.9,s=9.6;for(let o=0;o<4;o++){let a=new oi(.16,6,4).toNonIndexed();a.translate(i+Math.cos(o*1.6)*.22,s-.25,Math.sin(o*1.6)*.22),n.push(Ps(a,()=>[.42,.33,.12]))}let r=10;for(let o=0;o<r;o++){let a=o/r*Math.PI*2+o%2*.25,c=4+o%3*.6,l=.25+o%4*.18+(o>=8?.35:-.1),h=[],u=5,f=[],d=[],g=0,v=0;for(let p=0;p<=u;p++){let M=p/u,_=M*c,y=Math.sin(M*1.2)*.9-M*M*c*l,I=Math.sin(M*Math.PI)*.75+.05;h.push([_,y,I])}for(let p=0;p<u;p++){let[M,_,y]=h[p],[I,S,T]=h[p+1];for(let R of[-1,1]){let E=R*y,b=R*T;f.push(M,_,0,I,S,0,I,S-.25*T,b,M,_,0,I,S-.25*T,b,M,_-.25*y,E);let P=.85+p/u*.3;for(let N=0;N<6;N++)d.push(.24*P,.5*P,.2*P)}}let m=new be;m.setAttribute("position",new Zt(f,3)),m.setAttribute("color",new Zt(d,3)),m.computeVertexNormals(),m.rotateY(a),m.translate(i,s,0),t.push(m)}return{tronco:ai(n),folhas:ai(t)}}function L_(){let n=[],t=[],e=new xn(.25,.42,3.4,7).toNonIndexed();e.translate(0,1.7,0),n.push(Ps(e,()=>[.42,.33,.24]));for(let s=0;s<3;s++){let r=new xn(.1,.18,2.2,5).toNonIndexed();r.rotateZ(.8),r.rotateY(s*2.1),r.translate(Math.cos(s*2.1)*.6,3.6,-Math.sin(s*2.1)*.6),n.push(Ps(r,()=>[.4,.31,.22]))}let i=[[0,5.4,0,2.6],[1.7,4.8,.6,1.9],[-1.5,4.9,-.7,2],[.4,4.6,-1.8,1.8],[-.6,4.7,1.7,1.8],[.3,6.6,.2,1.7]];for(let[s,r,o,a]of i){let c=new Oa(a,0).toNonIndexed();c.scale(1,.8,1),c.translate(s,r,o),t.push(Ps(c,(l,h)=>{let u=.75+(l-3.5)/4*.35+h*7919%13/100;return[.3*u,.47*u,.2*u]}))}return{tronco:ai(n),copa:ai(t)}}function U_(){for(let n=0;n<60;n++){let t=Math.random()*Oe,e=Math.random()*Be,i=ci(t,e);if(i<0||ze[i]>=0)continue;let s=ke[i];if(s===Se.PARQUE&&Math.random()<.6)return{x:t,z:e,tipo:Math.random()<.5?0:1};if(s===Se.AREIA&&Math.random()<.35)return{x:t,z:e,tipo:0};if(s===Se.CHAO){let r=i%Ft,o=i/Ft|0,a=!1;for(let[c,l]of[[1,0],[-1,0],[0,1],[0,-1]]){let h=(o+l)*Ft+r+c;h>=0&&h<ke.length&&ja(ke[h])&&(a=!0)}if(a&&Math.random()<.5)return{x:t,z:e,tipo:Math.random()<.7?0:1};if(!a&&Math.random()<.04)return{x:t,z:e,tipo:Math.random()<.5?0:1}}}return null}function hu(n,t=2600,e=null){let i=new vn({vertexColors:!0}),s=new vn({vertexColors:!0,side:Yn}),r=z_(),o=L_(),a=Math.round(t*.65),c=t-a,l=new ri(r.tronco,i,a),h=new ri(r.folhas,s,a),u=new ri(o.tronco,i,c),f=new ri(o.copa,i,c),d=new ie,g=new gn,v=new Fe,m=new U,p=new U,M=new Bt,_=0,y=0,I=0;for(;(_<a||y<c)&&I<t*6;){I++;let S=U_();if(!(!S||e&&e(S.x,S.z))){if(S.tipo===0&&_<a){let T=.8+Math.random()*.5;v.set(0,Math.random()*6.28,0),g.setFromEuler(v),d.compose(p.set(S.x,0,S.z),g,m.set(T,T*(.9+Math.random()*.3),T)),l.setMatrixAt(_,d),h.setMatrixAt(_,d),M.setHSL(.24+Math.random()*.08,.5,.75+Math.random()*.4),h.setColorAt(_,M),l.setColorAt(_,M.setRGB(1,1,1)),_++}else if(S.tipo===1&&y<c){let T=.75+Math.random()*.6;v.set(0,Math.random()*6.28,0),g.setFromEuler(v),d.compose(p.set(S.x,0,S.z),g,m.set(T,T,T)),u.setMatrixAt(y,d),f.setMatrixAt(y,d),M.setHSL(.22+Math.random()*.1,.45,.8+Math.random()*.35),f.setColorAt(y,M),u.setColorAt(y,M.setRGB(1,1,1)),y++}}}l.count=h.count=_,u.count=f.count=y;for(let S of[l,h,u,f])S.computeBoundingSphere(),S.castShadow=!0,n.add(S);return[l,h,u,f]}var Ie={x:null,z:null,n:0,malha:null,esmagado:null};function uu(n,t=1600,e){let i=[],s=(p,M,_,y,I)=>{let S=p.toNonIndexed();S.translate(_,y,I),i.push(Ps(S,()=>M))};s(new Ze(1.8,.62,4.4),[1,1,1],0,.55,0),s(new Ze(1.62,.5,2.2),[.95,.95,.95],0,1.1,-.25),s(new Ze(1.64,.4,2),[.18,.22,.27],0,1.1,-.25),s(new Ze(1.4,.38,.05),[.18,.22,.27],0,1.08,.88);for(let[p,M]of[[-.82,1.35],[.82,1.35],[-.82,-1.35],[.82,-1.35]]){let _=new xn(.33,.33,.24,6).toNonIndexed();_.rotateZ(Math.PI/2),_.translate(p,.33,M),i.push(Ps(_,()=>[.08,.08,.08]))}s(new Ze(.3,.12,.05),[2.2,2.1,1.8],.6,.65,2.21),s(new Ze(.3,.12,.05),[2.2,2.1,1.8],-.6,.65,2.21),s(new Ze(.3,.12,.05),[1.6,.2,.15],.6,.7,-2.21),s(new Ze(.3,.12,.05),[1.6,.2,.15],-.6,.7,-2.21);let r=ai(i),o=new Ts({vertexColors:!0,shininess:60,specular:4473924}),a=new ri(r,o,t),c=[15921906,1842204,10133414,11740702,2245242,6975348,14207136,2907706,15251504,5909098,13685976,3817544],l=new ie,h=new gn,u=new Fe,f=new U(1,1,1),d=new U,g=new Bt;Ie.x=new Float32Array(t),Ie.z=new Float32Array(t),Ie.ang=new Float32Array(t),Ie.esmagado=new Uint8Array(t);let v=0,m=0;for(;v<t&&m<t*80;){m++;let p=1+Math.floor(Math.random()*(Ft-2)),M=1+Math.floor(Math.random()*(Te-2)),_=M*Ft+p;if(ke[_]!==Se.RUA||ze[_]>=0)continue;let y=0,I=0;for(let[b,P]of[[1,0],[-1,0],[0,1],[0,-1]]){let N=ke[_+P*Ft+b];!ja(N)&&N!==Se.AGUA&&N!==Se.PONTE&&(y=b,I=P)}if(!y&&!I)continue;let S=(p+.5)*Ae+y*.9,T=(M+.5)*Ae+I*.9;if(e&&e(S,T))continue;let R=!1;for(let b=Math.max(0,v-40);b<v;b++)if(Math.abs(Ie.x[b]-S)<6&&Math.abs(Ie.z[b]-T)<6){R=!0;break}if(R)continue;let E=(y!==0?0:Math.PI/2)+(Math.random()<.5?Math.PI:0)+(Math.random()-.5)*.08;u.set(0,E,0),h.setFromEuler(u),l.compose(d.set(S,0,T),h,f),a.setMatrixAt(v,l),g.setHex(c[Math.random()*c.length|0]),a.setColorAt(v,g),Ie.x[v]=S,Ie.z[v]=T,Ie.ang[v]=E,v++}return a.count=v,Ie.n=v,Ie.malha=a,a.computeBoundingSphere(),a.castShadow=!0,a.receiveShadow=!0,n.add(a),a}var qd=new ie,Yd=new gn,$d=new Fe,D_=new U,N_=new U;function fu(n,t,e){if(!Ie.malha)return 0;let i=0;for(let s=0;s<Ie.n;s++){if(Ie.esmagado[s])continue;let r=Ie.x[s]-n,o=Ie.z[s]-t;r*r+o*o<e*e&&(Ie.esmagado[s]=1,$d.set(0,Ie.ang[s],(Math.random()-.5)*.2),Yd.setFromEuler($d),qd.compose(N_.set(Ie.x[s],-.1,Ie.z[s]),Yd,D_.set(1.08,.35,1.04)),Ie.malha.setMatrixAt(s,qd),Ie.malha.instanceMatrix.needsUpdate=!0,i++)}return i}function F_(n,t){let e=(t+180)/360*Math.pow(2,_e.z)*256-_e.gx0,i=n*Math.PI/180,s=(1-Math.asinh(Math.tan(i))/Math.PI)/2*Math.pow(2,_e.z)*256-_e.gy0;return{x:e*Qi,z:s*Qi}}var lt=(n=0,t=1)=>n+Math.random()*(t-n),Qa=(n,t)=>Math.floor(lt(n,t+1)),li=n=>n[Math.floor(Math.random()*n.length)],Qe=(n,t,e)=>n<t?t:n>e?e:n,Jd=(n,t,e)=>n+(t-n)*e,qe=(n,t,e,i)=>{let s=n-e,r=t-i;return s*s+r*r},Ot=(n,t,e,i)=>Math.sqrt(qe(n,t,e,i));function Ii(n,t){let e=t-n;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return e}function He(n,t,e){let i=Ii(n,t);return Math.abs(i)<=e?t:n+Math.sign(i)*e}var lo=class{constructor(t,e,i,s){this.cel=t,this.nx=Math.ceil(e/t)+1,this.nz=Math.ceil(i/t)+1,this.head=new Int32Array(this.nx*this.nz).fill(-1),this.next=new Int32Array(s),this.itens=[],this.usadas=[]}chave(t,e){let i=Math.floor(t/this.cel),s=Math.floor(e/this.cel);return i<0?i=0:i>=this.nx&&(i=this.nx-1),s<0?s=0:s>=this.nz&&(s=this.nz-1),s*this.nx+i}limpar(){for(let t of this.usadas)this.head[t]=-1;this.usadas.length=0,this.itens.length=0}add(t){let e=this.itens.length;if(e>=this.next.length){let s=new Int32Array(this.next.length*2);s.set(this.next),this.next=s}this.itens.push(t);let i=this.chave(t.x,t.z);this.head[i]===-1&&this.usadas.push(i),this.next[e]=this.head[i],this.head[i]=e}busca(t,e,i,s){let r=this.cel,o=Math.max(0,Math.floor((t-i)/r)),a=Math.min(this.nx-1,Math.floor((t+i)/r)),c=Math.max(0,Math.floor((e-i)/r)),l=Math.min(this.nz-1,Math.floor((e+i)/r)),h=i*i;for(let u=c;u<=l;u++)for(let f=o;f<=a;f++){let d=this.head[u*this.nx+f];for(;d!==-1;){let g=this.itens[d],v=g.x-t,m=g.z-e,p=v*v+m*m;if(p<=h&&s(g,p))return;d=this.next[d]}}}maisProximo(t,e,i,s){let r=null,o=1/0;return this.busca(t,e,i,(a,c)=>{c<o&&(!s||s(a))&&(o=c,r=a)}),r}contar(t,e,i,s){let r=0;return this.busca(t,e,i,o=>{(!s||s(o))&&r++}),r}};function Nt(n,t,e,i,s,r,o=0,a=0,c=0){let l=t.index?t.toNonIndexed():t;(o||a||c)&&l.applyMatrix4(new ie().makeRotationFromEuler(new Fe(o,a,c))),l.translate(i,s,r);let h=l.attributes.position.count,u=new Float32Array(h*3),f=Array.isArray(e)?e:[e,e,e];for(let d=0;d<h;d++)u[d*3]=f[0],u[d*3+1]=f[1],u[d*3+2]=f[2];l.setAttribute("color",new pe(u,3)),l.attributes.uv||l.setAttribute("uv",new pe(new Float32Array(h*2),2)),n.push(l)}var ge=(n,t,e)=>new Ze(n,t,e),On=(n,t,e,i=7)=>new xn(n,t,e,i),zi=(n,t,e,i)=>{let s=new oi(n,9,7);return s.scale(t,e,i),s};function tc(n,t,e,i){let s=new xn(n*.72,t*.72,e,8);return s.rotateY(Math.PI/8),s.scale(1,1,i),s}function _n(n){let t=[];n(t);let e=ai(t);return e.computeVertexNormals(),e}var O_=.93,ho=.44,ec=.43,br=.29,uo=.27,hi=.5;function B_(){return{quadril:_n(n=>{Nt(n,tc(.33,.3,.2,.62),1,0,-.04,0)}),tronco:_n(n=>{Nt(n,tc(.43,.33,hi,.58),1,0,hi/2,0),Nt(n,zi(.085,1,.8,1),1,.2,hi-.04,0),Nt(n,zi(.085,1,.8,1),1,-.2,hi-.04,0),Nt(n,On(.05,.055,.1),.93,0,hi+.05,0)}),cabeca:_n(n=>{Nt(n,zi(.112,.92,1.08,1),1,0,.12,.005),Nt(n,zi(.05,.9,.7,.6),.97,0,.065,.075),Nt(n,ge(.04,.05,.04),.95,0,.12,.112),Nt(n,ge(.035,.02,.012),.12,.042,.15,.104),Nt(n,ge(.035,.02,.012),.12,-.042,.15,.104),Nt(n,ge(.05,.012,.01),.45,0,.068,.103),Nt(n,zi(.03,.5,1,.8),.92,.106,.12,0),Nt(n,zi(.03,.5,1,.8),.92,-.106,.12,0)}),cabelo:_n(n=>{let t=new oi(.118,10,6,0,Math.PI*2,0,Math.PI*.55);t.scale(.95,1.05,1.05),Nt(n,t,1,0,.13,-.008),Nt(n,zi(.1,1,.9,.6),1,0,.1,-.06)}),capacete:_n(n=>{let t=new oi(.135,12,6,0,Math.PI*2,0,Math.PI*.52);t.scale(1,.92,1.1),Nt(n,t,1,0,.145,-.005),Nt(n,On(.137,.142,.035,12).scale(1,1,1.1),.85,0,.15,-.005),Nt(n,ge(.05,.04,.035),.3,0,.23,.13),Nt(n,On(.018,.018,.08),.2,.026,.25,.155,Math.PI/2-.4),Nt(n,On(.018,.018,.08),.2,-.026,.25,.155,Math.PI/2-.4),Nt(n,ge(.18,.03,.025),.25,0,.14,.115),Nt(n,ge(.04,.05,.05),.65,.128,.18,0),Nt(n,ge(.04,.05,.05),.65,-.128,.18,0),Nt(n,ge(.07,.05,.03),.4,0,.21,-.14)}),colete:_n(n=>{Nt(n,tc(.47,.4,.36,.72),1,0,.28,0);for(let t of[-.12,0,.12])Nt(n,ge(.1,.13,.06),.8,t,.17,.15);Nt(n,ge(.17,.11,.05),.78,.08,.33,.15),Nt(n,ge(.12,.09,.05),.78,-.13,.26,.15),Nt(n,ge(.36,.06,.07),.6,0,.06,.03)}),mochila:_n(n=>{Nt(n,tc(.3,.28,.38,.55),1,0,.28,-.18),Nt(n,ge(.26,.13,.05),.85,0,.2,-.27),Nt(n,On(.065,.065,.3,8),.8,0,.5,-.18,0,0,Math.PI/2),Nt(n,On(.008,.008,.35,4),.25,.1,.62,-.2)}),coxa:_n(n=>{Nt(n,On(.088,.072,ho,8),1,0,-ho/2,.005),Nt(n,zi(.07,1,.8,1),1,0,-ho,0),Nt(n,ge(.08,.1,.05),.75,.07,-.2,.01)}),canela:_n(n=>{Nt(n,On(.068,.055,ec-.06,8),1,0,-(ec-.06)/2,0),Nt(n,ge(.1,.09,.07),.8,0,-.03,.04)}),bota:_n(n=>{Nt(n,ge(.11,.1,.25),1,0,-.04,.05),Nt(n,ge(.115,.03,.27),.5,0,-.085,.05)}),braco:_n(n=>{Nt(n,On(.062,.052,br,7),1,0,-br/2,0),Nt(n,zi(.05,1,1,1),1,0,-br,0)}),antebraco:_n(n=>{Nt(n,On(.05,.04,uo-.04,7),1,0,-(uo-.04)/2,0)}),mao:_n(n=>{Nt(n,ge(.075,.095,.045),1,0,-.045,.01),Nt(n,ge(.025,.05,.03),1,.035,-.03,.03)}),arma:_n(n=>{Nt(n,ge(.045,.07,.24),.3,0,.05,-.27),Nt(n,ge(.05,.085,.3),.2,0,.06,-.02),Nt(n,ge(.058,.07,.24),.3,0,.055,.25),Nt(n,On(.011,.011,.3),.13,0,.055,.5,Math.PI/2),Nt(n,On(.017,.017,.06),.13,0,.055,.66,Math.PI/2),Nt(n,ge(.035,.13,.06),.3,0,-.04,.05,.3),Nt(n,ge(.03,.09,.04),.3,0,-.02,-.06,-.3),Nt(n,ge(.035,.055,.12),.12,0,.13,.03),Nt(n,ge(.04,.04,.02),.5,0,.13,.095)})}}function k_(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d");e.fillStyle="#b8ab84",e.fillRect(0,0,128,128);let i=77,s=()=>(i=i*1664525+1013904223>>>0,i/4294967296),r=["#8d7f58","#6f7350","#cfc4a2","#7a5f40","#9a9467"];for(let a=0;a<90;a++){e.fillStyle=r[a%r.length],e.beginPath();let c=s()*128,l=s()*128,h=3+s()*8;for(let u=0;u<6.28;u+=.7){let f=h*(.6+s()*.6);e.lineTo(c+Math.cos(u)*f,l+Math.sin(u)*f*.7)}e.fill()}let o=new Rn(t);return o.wrapS=o.wrapT=Dn,o.colorSpace=Re,o}var H_={quadril:1,tronco:1,coxa:1,canela:1,braco:1,antebraco:1,mochila:1,colete:1},V_={coxa:1,canela:1,bota:1,braco:1,antebraco:1,mao:1};function jd(n,t,e,i){let s=Math.asin(Math.max(-1,Math.min(1,n))),r=Math.atan2(-e,-t);i[0]=r,i[1]=s}var nc=class{constructor(t,e,i,s){this.m={},this.n={},this.max={};for(let r in e){let o=V_[r]?i*2:i,a=new vn({vertexColors:!0,map:s&&H_[r]?s:null}),c=new ri(e[r],a,o);c.instanceMatrix.setUsage(Ki),c.instanceColor=new Ss(new Float32Array(o*3),3),c.count=0,c.frustumCulled=!1,c.castShadow=!0,t.add(c),this.m[r]=c,this.n[r]=0,this.max[r]=o}}comecar(){for(let t in this.n)this.n[t]=0}terminar(){for(let t in this.m){let e=this.m[t];e.count=Math.min(this.max[t],this.n[t]),e.instanceMatrix.needsUpdate=!0,e.instanceColor.needsUpdate=!0}}parte(t,e,i,s,r,o,a,c,l,h,u,f,d){let g=this.m[t],v=this.n[t]++;if(v>=this.max[t])return;let m=g.instanceMatrix.array,p=v*16,M=Math.cos(h),_=Math.sin(h),y=Math.cos(u),I=Math.sin(u),S=r*y+o*_*I,T=-r*I+o*_*y,R=o*M,E=M*I,b=M*y,P=-_,N=-o*y+r*_*I,D=o*I+r*_*y,F=r*M;m[p]=S*f,m[p+1]=E*f,m[p+2]=N*f,m[p+3]=0,m[p+4]=T*f,m[p+5]=b*f,m[p+6]=D*f,m[p+7]=0,m[p+8]=R*f,m[p+9]=P*f,m[p+10]=F*f,m[p+11]=0,m[p+12]=e+(r*a+o*l)*f,m[p+13]=i+c*f,m[p+14]=s+(-o*a+r*l)*f,m[p+15]=1;let W=g.instanceColor.array,L=v*3;W[L]=d[0],W[L+1]=d[1],W[L+2]=d[2]}},G_=[.25,.22,.18],pu=[.13,.13,.14],W_=[.66,.6,.45],X_=[.7,.64,.48],q_=[.55,.45,.32],Y_=[.2,.18,.17],ts=[0,0],ic=class{constructor(t){let e=B_();this.civ=new nc(t,e,2600,null),this.mil=new nc(t,e,600,k_())}comecar(){this.civ.comecar(),this.mil.comecar()}terminar(){this.civ.terminar(),this.mil.terminar()}_membro(t,e,i,s,r,o,a,c,l,h,u,f,d,g,v,m,p,M){let _=a[0]-o[0],y=a[1]-o[1],I=a[2]-o[2],S=Math.hypot(_,y,I)||1e-4,T=Math.min(S,(s+r)*.999),R=_/S,E=y/S,b=I/S,P=(s*s-r*r+T*T)/(2*T),N=Math.sqrt(Math.max(0,s*s-P*P)),D=c[0]*R+c[1]*E+c[2]*b,F=c[0]-D*R,W=c[1]-D*E,L=c[2]-D*b,Y=Math.hypot(F,W,L)||1;F/=Y,W/=Y,L/=Y;let H=o[0]+R*P+F*N,Q=o[1]+E*P+W*N,et=o[2]+b*P+L*N,tt=Math.hypot(H-o[0],Q-o[1],et-o[2])||1;jd((H-o[0])/tt,(Q-o[1])/tt,(et-o[2])/tt,ts),t.parte(e,l,h,u,f,d,o[0],o[1],o[2],ts[0],ts[1],g,v);let ut=o[0]+R*T,Et=o[1]+E*T,q=o[2]+b*T,Z=Math.hypot(ut-H,Et-Q,q-et)||1;return jd((ut-H)/Z,(Et-Q)/Z,(q-et)/Z,ts),t.parte(i,l,h,u,f,d,H,Q,et,ts[0],ts[1],g,m),p&&t.parte(p,l,h,u,f,d,ut,Et,q,ts[0],ts[1],g,M),{ex:H,ey:Q,ez:et,hx:ut,hy:Et,hz:q}}add(t,e,i,s,r,o,a,c,l,h=0,u=1,f=null,d=1){let g=h===1||h===3,v=g?this.mil:this.civ,m=Math.cos(s),p=Math.sin(s),M=h===1||h===2||h===4||h===5;if(o===3){v.parte("tronco",t,e+.15,i,m,p,0,0,0,Math.PI/2,0,u,a),v.parte("cabeca",t,e+.15,i,m,p,0,0,hi+.08,Math.PI/2,0,u,l),v.parte("quadril",t,e+.12,i,m,p,0,0,0,Math.PI/2,0,u,c);for(let et of[1,-1])v.parte("coxa",t,e+.1,i,m,p,et*.1,0,-.05,-Math.PI/2,et*.15,u,c),v.parte("braco",t,e+.12,i,m,p,et*.22,0,hi-.05,-Math.PI/2-.5,et*.5,u,a);return}let _=Math.sin(r),y=Math.cos(r),I=Math.min(1,d),S=o===1?.35:o===2?.12:.05+I*.08,T=Math.abs(y)*.035*I,R=O_-T,E=Math.cos(S),b=Math.sin(S),P=c,N=g?q_:h===2||h===5?pu:Y_;for(let et of[1,-1]){let ut=-(et===1?_:-_)*.55*I,Et=Math.max(0,et===1?y:-y)*.9*I+(o===1?.15:.05),q=et*.1;v.parte("coxa",t,e,i,m,p,q,R,0,ut,0,u,P);let Z=q,ft=R-ho*Math.cos(ut),it=-ho*Math.sin(ut),Mt=ut+Et;v.parte("canela",t,e,i,m,p,Z,ft,it,Mt,0,u,P);let Rt=Z,At=ft-ec*Math.cos(Mt),Xt=it-ec*Math.sin(Mt);v.parte("bota",t,e,i,m,p,Rt,At+.06,Xt,0,0,u,N)}v.parte("quadril",t,e,i,m,p,0,R,0,0,0,u,c);let D=(et,tt,ut,Et)=>(Et[0]=et,Et[1]=R+tt*E-ut*b,Et[2]=tt*b+ut*E,Et);v.parte("tronco",t,e,i,m,p,0,R,0,-S,0,u,a);let F=D(0,hi+.1,0,[0,0,0]),W=o===1?-.25:o===2?.05:0;v.parte("cabeca",t,e,i,m,p,F[0],F[1],F[2],-S*.4+W,0,u,l),g||h===2||h===5?(v.parte("colete",t,e,i,m,p,0,R+.12*E,.12*b,-S,0,u,h===2||h===5?pu:h===3?[.45,.42,.33]:W_),v.parte("capacete",t,e,i,m,p,F[0],F[1],F[2],-S*.4+W,0,u,h===2||h===5?pu:h===3?[.5,.47,.38]:X_),g&&v.parte("mochila",t,e,i,m,p,0,R+.12*E,.12*b,-S,0,u,h===3?[.6,.58,.5]:[.92,.9,.85])):f&&v.parte("cabelo",t,e,i,m,p,F[0],F[1],F[2],-S*.4+W,0,u,f);let L=D(.2,hi-.05,0,[0,0,0]),Y=D(-.2,hi-.05,0,[0,0,0]),H=h===0||h===3||h===4?l:G_,Q=a;if(M&&o!==1&&o!==4){let et=o===2,tt=-.11,ut=et?1.38:1+T*.5,Et=et?.16+b*.3:.2,q=et?0:.5+_*.04*I,Z=et?.03:.35;this._arma(v,t,e,i,m,p,tt,ut,Et,q,Z,u);let ft=Math.cos(q)*Math.cos(Z),it=-Math.sin(q),Mt=Math.sin(Z)*Math.cos(q),Rt=[tt+Mt*.27,ut+.05+it*.27,Et+ft*.27],At=[tt,ut+.02,Et-.02];this._membro(v,"braco","antebraco",br,uo,L,Rt,[1,-.6,-.3],t,e,i,m,p,u,Q,Q,"mao",H),this._membro(v,"braco","antebraco",br,uo,Y,At,[-1,-.7,-.6],t,e,i,m,p,u,Q,Q,"mao",H);return}for(let et of[1,-1]){let tt=et===1?L:Y,ut;if(o===1)ut=[tt[0]*.8,tt[1]-.05+(et===1?_:-_)*.05,tt[2]+.52];else if(o===4)ut=[tt[0]+et*(.2+_*.12),tt[1]+.5,tt[2]+.05];else{let Et=(et===1?-_:_)*.45*I;ut=[tt[0]+et*.05,tt[1]-.52*Math.cos(Et)+.05*I,tt[2]+.52*Math.sin(Et)+.04]}this._membro(v,"braco","antebraco",br,uo,tt,ut,[et*.4,.1,-1],t,e,i,m,p,u,o===1&&h!==3?l:Q,o===1||h===0||h===4?l:Q,"mao",H)}}_arma(t,e,i,s,r,o,a,c,l,h,u,f){let d=Math.cos(Math.atan2(o,r)+u),g=Math.sin(Math.atan2(o,r)+u),v=e+(r*a+o*l)*f,m=s+(-o*a+r*l)*f;t.parte("arma",v,i,m,d,g,0,c,0,h,0,f,[.38,.38,.39])}},Zn=n=>[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255],Kd=[14241615,5210073,15921906,15911244,5683312,15108800,3355443,8377312,16752448,10185686,2051724,13218447,16777215,2864037].map(Zn),Qd=[3095378,3947580,7035461,2042436,14208437,4873594,2829099,9085122].map(Zn),tp=[15843965,14724201,13010498,9262372,16767916,11037500].map(Zn),ep=[1709072,3877406,6176806,9071163,14202218,2236962,7024158,11577760].map(Zn),np=[9413498,10135690,8228714,10725774].map(Zn),fo=[1,1,1],sc=[.95,.95,.93],po=Zn(14264183),rc=Zn(1908774),oc=Zn(2303532);var Jn=4e3,mo=600,ac=class{constructor(t){this.pos=new Float32Array(Jn*3),this.cor=new Float32Array(Jn*4),this.tam=new Float32Array(Jn),this.vel=new Float32Array(Jn*3),this.vida=new Float32Array(Jn),this.vidaMax=new Float32Array(Jn),this.cresce=new Float32Array(Jn),this.grav=new Float32Array(Jn),this.corIni=new Float32Array(Jn*3),this.corFim=new Float32Array(Jn*3),this.livre=[];for(let r=Jn-1;r>=0;r--)this.livre.push(r);this.ativos=[];let e=new be;e.setAttribute("position",new pe(this.pos,3).setUsage(Ki)),e.setAttribute("cor",new pe(this.cor,4).setUsage(Ki)),e.setAttribute("tam",new pe(this.tam,1).setUsage(Ki)),this.geo=e;let i=new Nn({transparent:!0,depthWrite:!1,uniforms:{escala:{value:600}},vertexShader:`attribute vec4 cor; attribute float tam; varying vec4 vC; uniform float escala;
        void main(){ vC = cor; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = clamp(tam * escala / -mv.z, 1.0, 256.0); gl_Position = projectionMatrix * mv; }`,fragmentShader:"varying vec4 vC; void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d,d); if (r > 0.25) discard; gl_FragColor = vec4(vC.rgb, vC.a * (1.0 - r*3.2)); }"});this.matP=i,this.pontos=new Pa(e,i),this.pontos.frustumCulled=!1,this.pontos.renderOrder=5,t.add(this.pontos),this.tPos=new Float32Array(mo*6),this.tCor=new Float32Array(mo*6),this.tVida=new Float32Array(mo),this.tn=0;let s=new be;s.setAttribute("position",new pe(this.tPos,3).setUsage(Ki)),s.setAttribute("color",new pe(this.tCor,3).setUsage(Ki)),this.tgeo=s,this.linhas=new Ra(s,new to({vertexColors:!0,transparent:!0,opacity:.9})),this.linhas.frustumCulled=!1,this.linhas.renderOrder=4,t.add(this.linhas)}particula(t,e,i,s,r,o,a,c,l,h,u=1,f=0,d=0){if(!this.livre.length)return;let g=this.livre.pop();this.ativos.push(g),this.pos[g*3]=t,this.pos[g*3+1]=e,this.pos[g*3+2]=i,this.vel[g*3]=s,this.vel[g*3+1]=r,this.vel[g*3+2]=o,this.tam[g]=a,this.vida[g]=c,this.vidaMax[g]=c,this.grav[g]=f,this.cresce[g]=d,this.corIni[g*3]=l[0],this.corIni[g*3+1]=l[1],this.corIni[g*3+2]=l[2],this.corFim[g*3]=h[0],this.corFim[g*3+1]=h[1],this.corFim[g*3+2]=h[2],this.cor[g*4+3]=u,this.alfa0=u,this.cor[g*4]=l[0],this.cor[g*4+1]=l[1],this.cor[g*4+2]=l[2]}tracante(t,e,i,s,r,o,a=[1,.85,.4]){let c=this.tn++%mo;this.tPos.set([t,e,i,s,r,o],c*6),this.tCor.set([a[0],a[1],a[2],a[0]*.6,a[1]*.6,a[2]*.6],c*6),this.tVida[c]=.07}clarao(t,e,i,s=1.2){this.particula(t,e,i,0,0,0,s,.06,[1,.95,.6],[1,.6,.2],1)}explosao(t,e,i,s=6,r=!1){let o=Math.min(40,8+s*2);for(let a=0;a<o;a++){let c=Math.random()*6.28,l=Math.random()*s*2.2;this.particula(t,e+.5,i,Math.cos(c)*l,Math.random()*s*2,Math.sin(c)*l,s*(.5+Math.random()*.5),.35+Math.random()*.3,[1,.85,.35],[.9,.25,.05],1,-2,s*.8)}for(let a=0;a<o*.7;a++){let c=Math.random()*6.28,l=Math.random()*s*.7,h=r?[.85,.92,1]:[.35,.33,.3];this.particula(t+Math.cos(c)*s*.3,e+Math.random()*s*.5,i+Math.sin(c)*s*.3,Math.cos(c)*l,s*.4+Math.random()*3,Math.sin(c)*l,s*.9,1.6+Math.random()*1.6,h,r?[.7,.8,.9]:[.15,.15,.15],.75,r?9:-.6,s*.9)}if(r)for(let a=0;a<18;a++){let c=Math.random()*6.28;this.particula(t,.3,i,Math.cos(c)*3,8+Math.random()*s*3,Math.sin(c)*3,1.5,1.4,[.9,.95,1],[.6,.75,.9],.9,14,.5)}}fumaca(t,e,i,s=2,r=[.25,.25,.25]){this.particula(t,e,i,(Math.random()-.5)*1.5,2+Math.random()*2,(Math.random()-.5)*1.5,s,2.5,r,[.5,.5,.5],.5,-.4,s)}sangue(t,e,i,s=5){for(let r=0;r<s;r++)this.particula(t,e,i,(Math.random()-.5)*4,Math.random()*3,(Math.random()-.5)*4,.35,.5,[.55,.03,.03],[.3,0,0],1,12,0)}poeira(t,e,i=2){for(let s=0;s<i;s++)this.particula(t+(Math.random()-.5)*2,.4,e+(Math.random()-.5)*2,Math.random()-.5,.8,Math.random()-.5,1.4,1,[.72,.66,.55],[.8,.76,.68],.35,0,1.5)}esteira(t,e,i){this.particula(t,e,i,0,0,0,1.6,.9,[1,.7,.4],[.5,.5,.5],.6,0,3)}atualizar(t,e){this.matP.uniforms.escala.value=e;let i=this.ativos;for(let r=i.length-1;r>=0;r--){let o=i[r];if(this.vida[o]-=t,this.vida[o]<=0){this.tam[o]=0,this.cor[o*4+3]=0,this.pos[o*3+1]=-1e3,i[r]=i[i.length-1],i.pop(),this.livre.push(o);continue}let a=1-this.vida[o]/this.vidaMax[o];this.vel[o*3+1]-=this.grav[o]*t,this.pos[o*3]+=this.vel[o*3]*t,this.pos[o*3+1]+=this.vel[o*3+1]*t,this.pos[o*3+2]+=this.vel[o*3+2]*t,this.pos[o*3+1]<.1&&this.grav[o]>0&&(this.pos[o*3+1]=.1,this.vel[o*3]*=.5,this.vel[o*3+2]*=.5,this.vel[o*3+1]=0),this.vel[o*3]*=.97,this.vel[o*3+2]*=.97,this.tam[o]+=this.cresce[o]*t;for(let c=0;c<3;c++)this.cor[o*4+c]=this.corIni[o*3+c]+(this.corFim[o*3+c]-this.corIni[o*3+c])*a;this.cor[o*4+3]=Math.min(this.cor[o*4+3],(1-a)*1.2)}let s=this.geo.attributes;s.position.needsUpdate=s.cor.needsUpdate=s.tam.needsUpdate=!0;for(let r=0;r<mo;r++)if(this.tVida[r]>0&&(this.tVida[r]-=t,this.tVida[r]<=0))for(let o=0;o<6;o++)this.tPos[r*6+o]=0;this.tgeo.attributes.position.needsUpdate=!0,this.tgeo.attributes.color.needsUpdate=!0}};var Bn={fuzileiro:{nome:"Soldado",sub:"Fuzil M4A1",icone:"\u{1FA96}",classe:"inf",hp:100,vel:6.5,alcance:55,dano:16,cadencia:.38,precisao:.6,arma:"fuzil",custo:60,tempo:4,de:"quartel",slots:1,raio:.6},metralhador:{nome:"Metralhador",sub:"M249 SAW",icone:"\u{1F52B}",classe:"inf",hp:120,vel:6,alcance:62,dano:10,cadencia:.1,precisao:.42,arma:"mg",custo:100,tempo:6,de:"quartel",slots:1,raio:.6},sniper:{nome:"Atirador de Elite",sub:"M110 / Barrett M107",icone:"\u{1F3AF}",classe:"inf",hp:90,vel:6.2,alcance:150,dano:110,cadencia:1.7,precisao:.92,arma:"sniper",custo:140,tempo:8,de:"quartel",slots:1,raio:.6},medico:{nome:"M\xE9dico de Combate",sub:"Cura soldados por perto",icone:"\u2695\uFE0F",classe:"inf",hp:100,vel:6.6,alcance:40,dano:9,cadencia:.55,precisao:.5,arma:"pistola",cura:7,custo:110,tempo:6,de:"quartel",slots:1,raio:.6},humvee:{nome:"Humvee M1151",sub:"Metralhadora .50 \u2022 leva 4",icone:"\u{1F699}",classe:"veic",modelo:"humvee",hp:550,vel:26,alcance:85,dano:24,cadencia:.16,precisao:.45,arma:"50cal",carga:4,cargaTipos:["inf","civil"],custo:240,tempo:9,de:"patio",slots:6,raio:2.6,leve:!0,atropela:!0},ambulancia:{nome:"Ambul\xE2ncia M997",sub:"Leva 8 \u2022 cura passageiros",icone:"\u{1F691}",classe:"veic",modelo:"ambulancia",hp:420,vel:25,carga:8,cargaTipos:["inf","civil"],cura:12,custo:180,tempo:8,de:"patio",slots:6,raio:2.7,leve:!0,atropela:!0},stryker:{nome:"Stryker M1126",sub:"Blindado 8x8 \u2022 leva 9",icone:"\u{1F690}",classe:"veic",modelo:"stryker",hp:1100,vel:24,alcance:95,dano:26,cadencia:.15,precisao:.5,arma:"50cal",carga:9,cargaTipos:["inf","civil"],custo:450,tempo:13,de:"patio",slots:10,raio:3.6,atropela:!0},bradley:{nome:"Bradley M2A3",sub:"Canh\xE3o 25mm \u2022 leva 6",icone:"\u{1F6FB}",classe:"veic",modelo:"bradley",hp:1500,vel:20,alcance:120,dano:55,splash:3,cadencia:.32,precisao:.6,arma:"25mm",carga:6,cargaTipos:["inf","civil"],custo:620,tempo:15,de:"patio",slots:12,raio:3.4,atropela:!0},abrams:{nome:"Tanque M1A2 Abrams",sub:"Canh\xE3o 120mm",icone:"\u{1F6E1}\uFE0F",classe:"veic",modelo:"abrams",hp:3200,vel:19,alcance:170,dano:320,splash:8,cadencia:4.2,precisao:.85,arma:"120mm",sec:{alcance:90,dano:12,cadencia:.11,precisao:.45,arma:"mg"},custo:950,tempo:20,de:"patio",slots:20,raio:4.8,atropela:!0},paladin:{nome:"Obuseiro M109A7 Paladin",sub:"Artilharia 155mm \u2022 longo alcance",icone:"\u{1F4A5}",classe:"veic",modelo:"paladin",hp:1600,vel:15,alcance:700,minAlc:80,dano:300,splash:15,cadencia:6,precisao:.7,arma:"155mm",arco:!0,custo:900,tempo:20,de:"patio",slots:18,raio:4.6},himars:{nome:"HIMARS M142",sub:"Lan\xE7a-foguetes \u2022 6 foguetes",icone:"\u{1F680}",classe:"veic",modelo:"himars",hp:1100,vel:22,alcance:1100,minAlc:150,dano:230,splash:16,cadencia:.5,salva:6,recarga:20,precisao:.75,arma:"foguete",custo:1200,tempo:24,de:"patio",slots:16,raio:3.8},swat:{nome:"Policial SWAT",sub:"Pol\xEDcia de Miami \u2022 age sozinha",icone:"\u{1F693}",classe:"inf",hp:115,vel:6.4,alcance:58,dano:15,cadencia:.3,precisao:.58,arma:"fuzil",custo:0,slots:1,raio:.6,policia:!0},bearcat:{nome:"Blindado SWAT BearCat",sub:"Pol\xEDcia de Miami \u2022 leva 10",icone:"\u{1F693}",classe:"veic",modelo:"bearcat",hp:1300,vel:25,carga:10,cargaTipos:["inf","civil"],custo:0,slots:10,raio:3,atropela:!0,policia:!0},blackhawk:{nome:"UH-60 Black Hawk",sub:"Metralhadoras M134 \u2022 leva 11",icone:"\u{1F681}",classe:"aereo",modelo:"blackhawk",hp:850,vel:75,altCruz:40,alcance:95,dano:10,cadencia:.07,precisao:.35,arma:"m134",carga:11,cargaTipos:["inf","civil"],custo:750,tempo:16,de:"heliporto",raio:8},chinook:{nome:"CH-47 Chinook",sub:"Leva 33 ou um Humvee",icone:"\u{1F681}",classe:"aereo",modelo:"chinook",hp:1200,vel:68,altCruz:45,alcance:80,dano:11,cadencia:.16,precisao:.35,arma:"m240",carga:33,cargaTipos:["inf","civil","leve"],custo:950,tempo:20,de:"heliporto",raio:10},apache:{nome:"AH-64 Apache",sub:"Canh\xE3o 30mm + m\xEDsseis Hellfire",icone:"\u{1F681}",classe:"aereo",modelo:"apache",hp:1e3,vel:80,altCruz:55,alcance:280,dano:45,splash:3,cadencia:.13,precisao:.55,arma:"30mm",sec:{alcance:650,dano:420,splash:11,cadencia:7,precisao:.95,arma:"hellfire",missil:!0},custo:1150,tempo:22,de:"heliporto",raio:8},reaper:{nome:"Drone MQ-9 Reaper",sub:"Vigia em c\xEDrculos e lan\xE7a Hellfire",icone:"\u{1F6E9}\uFE0F",classe:"aereo",modelo:"reaper",hp:450,vel:70,altCruz:260,orbita:240,alcance:750,dano:420,splash:11,cadencia:6.5,precisao:.95,arma:"hellfire",missil:!0,custo:700,tempo:15,de:"heliporto",raio:10},f35:{nome:"F-35C Lightning II",sub:"Ca\xE7a furtivo \u2022 bombas guiadas GBU-31",icone:"\u2708\uFE0F",classe:"jato",modelo:"f35",hp:900,vel:250,altCruz:160,dano:650,splash:20,municao:4,arma:"bomba",custo:1500,tempo:22,de:"porta",raio:9},f18:{nome:"F/A-18E Super Hornet",sub:"Foguetes e bombas \u2022 ataque rasante",icone:"\u2708\uFE0F",classe:"jato",modelo:"f18",hp:900,vel:260,altCruz:150,dano:180,splash:9,municao:3,rajada:6,arma:"foguete",custo:1250,tempo:20,de:"porta",raio:9},a10:{nome:"A-10 Thunderbolt II",sub:"Canh\xE3o GAU-8 de 30mm \u2022 metralha a faixa toda",icone:"\u{1F6E9}\uFE0F",classe:"jato",modelo:"a10",hp:1600,vel:150,altCruz:90,dano:70,splash:4,municao:5,arma:"canhao",custo:1400,tempo:22,de:"pista",raio:10},f22:{nome:"F-22 Raptor",sub:"Mais r\xE1pido \u2022 8 bombas pequenas SDB",icone:"\u2708\uFE0F",classe:"jato",modelo:"f22",hp:1e3,vel:300,altCruz:200,dano:380,splash:13,municao:4,bombas:4,arma:"bomba",custo:1700,tempo:24,de:"pista",raio:9},osprey:{nome:"MV-22 Osprey",sub:"Rotores basculantes \u2022 leva 24",icone:"\u{1F6EB}",classe:"aereo",modelo:"osprey",hp:1e3,vel:120,altCruz:60,carga:24,cargaTipos:["inf","civil"],custo:1200,tempo:22,de:"porta",raio:9},lancha:{nome:"Lancha Mark VI",sub:"Patrulha \u2022 leva 8",icone:"\u{1F6A4}",classe:"naval",modelo:"lancha",nav:1,hp:800,vel:28,alcance:130,dano:24,cadencia:.16,precisao:.45,arma:"50cal",carga:8,cargaTipos:["inf","civil"],custo:320,tempo:12,de:"docas",raio:8},lcac:{nome:"Hovercraft LCAC",sub:"Anf\xEDbio \u2022 leva tropas e ve\xEDculos",icone:"\u{1F6E5}\uFE0F",classe:"naval",modelo:"lcac",nav:3,hp:1400,vel:26,carga:30,cargaTipos:["inf","civil","leve","veic"],custo:750,tempo:18,de:"docas",raio:12},destroier:{nome:"Destr\xF3ier classe Arleigh Burke",sub:'Canh\xE3o naval 5" de longo alcance',icone:"\u{1F6A2}",classe:"naval",modelo:"destroier",nav:2,hp:7e3,vel:16,alcance:950,minAlc:60,dano:300,splash:14,cadencia:2.6,precisao:.8,arma:"naval",arco:!0,custo:2400,tempo:35,de:"docas",raio:30},portaavioes:{nome:"Porta-avi\xF5es USS Liberty",sub:"Classe Nimitz \u2022 base flutuante",icone:"\u2693",classe:"naval",modelo:"portaavioes",nav:2,hp:3e4,vel:7,carga:0,custo:0,de:null,raio:60,unico:!0}},mu={qg:{nome:"Quartel-General",hp:6e3,raio:26},quartel:{nome:"Quartel (Infantaria)",hp:3e3,raio:30},patio:{nome:"P\xE1tio de Ve\xEDculos",hp:3500,raio:34},heliporto:{nome:"Heliporto",hp:2500,raio:40},docas:{nome:"Docas da Marinha",hp:3e3,raio:30},zona:{nome:"Zona Segura (abrigo de civis)",hp:2e3,raio:32},torre:{nome:"Torre de Vigia",hp:900,raio:4,alcance:110,dano:22,cadencia:.18,precisao:.5,arma:"50cal"},muro:{nome:"Barreira",hp:900,raio:5},fob:{nome:"Posto Avan\xE7ado (FOB)",hp:2500,raio:28},pista:{nome:"Pista de Pouso",hp:8e3,raio:60},patriot:{nome:"Bateria Patriot",hp:1500,raio:6}},cc={quartel:["fuzileiro","metralhador","sniper","medico"],patio:["humvee","ambulancia","stryker","bradley","abrams","paladin","himars"],heliporto:["blackhawk","chinook","apache","reaper"],docas:["lancha","lcac","destroier"],porta:["f35","f18","osprey"],pista:["f22","a10","f35","f18"]},ip={quartel:"\u{1FA96} Quartel",patio:"\u{1F699} P\xE1tio",heliporto:"\u{1F681} Heliporto",docas:"\u2693 Docas",porta:"\u{1F6F3}\uFE0F Porta-avi\xF5es",pista:"\u{1F6EB} Pista de pouso"},go={fob:{nome:"Posto Avan\xE7ado (FOB)",sub:"Zona segura para civis + QG de campo",icone:"\u26FA",custo:900,tempo:25,raio:30},quartel:{nome:"Quartel",sub:"Treina infantaria aqui",icone:"\u{1FA96}",custo:1200,tempo:35,raio:34},patio:{nome:"P\xE1tio de Ve\xEDculos",sub:"Produz blindados aqui",icone:"\u{1F699}",custo:1600,tempo:45,raio:38},heliporto:{nome:"Heliporto",sub:"Produz helic\xF3pteros aqui",icone:"\u{1F681}",custo:1500,tempo:40,raio:44},docas:{nome:"Docas",sub:"Precisa ficar na beira da \xE1gua",icone:"\u2693",custo:1400,tempo:40,raio:34,agua:!0},zona:{nome:"Zona Segura",sub:"Abrigo de civis (resgate)",icone:"\u{1F3E5}",custo:700,tempo:20,raio:32},torre:{nome:"Torre de Vigia",sub:"Metralhadora .50 autom\xE1tica",icone:"\u{1F5FC}",custo:300,tempo:10,raio:6},muro:{nome:"Barreira",sub:"Gabi\xF5es contra os zumbis",icone:"\u{1F9F1}",custo:60,tempo:4,raio:6},patriot:{nome:"Bateria Patriot",sub:"Defesa antia\xE9rea",icone:"\u{1F6F0}\uFE0F",custo:500,tempo:15,raio:8},pista:{nome:"Pista de Pouso",sub:"Base a\xE9rea: F-22 e A-10 (precisa de muito espa\xE7o)",icone:"\u{1F6EB}",custo:2500,tempo:50,raio:60,grande:!0}};var sp=new ie,rp=new gn,op=new Fe,$_=new U,Z_=new U,lc=new Bt;function J_(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d");e.fillStyle="#f4f4f4",e.fillRect(0,0,128,128);let i=9,s=()=>(i=i*1664525+1013904223>>>0,i/4294967296);for(let a=0;a<900;a++){let c=200+s()*55|0;e.fillStyle=`rgba(${c},${c},${c},0.5)`,e.fillRect(s()*128,s()*128,1+s()*3,1+s()*3)}let r=e.createLinearGradient(0,0,0,128);r.addColorStop(0,"rgba(90,70,40,0.0)"),r.addColorStop(1,"rgba(90,70,40,0.18)"),e.fillStyle=r,e.fillRect(0,0,128,128),e.strokeStyle="rgba(0,0,0,0.45)",e.lineWidth=2,e.strokeRect(1,1,126,126),e.strokeStyle="rgba(255,255,255,0.35)",e.lineWidth=1,e.strokeRect(3.5,3.5,121,121),e.fillStyle="rgba(0,0,0,0.35)";for(let a=10;a<128;a+=20)e.fillRect(a,6,2,2),e.fillRect(a,120,2,2),e.fillRect(6,a,2,2),e.fillRect(120,a,2,2);let o=new Rn(t);return o.wrapS=o.wrapT=Dn,o.anisotropy=4,o.colorSpace=Re,o}var j_=J_(),hc=new Ts({vertexColors:!0,map:j_,shininess:28,specular:2763306}),xo=new vn({vertexColors:!0,transparent:!0,opacity:.8}),Gt=class{constructor(){this.g=[]}add(t,e,i=0,s=0,r=0,o=0,a=0,c=0,l=1,h=1,u=1,f=0){let d=t.index?t.toNonIndexed():t;if(d.attributes.uv||d.setAttribute("uv",new pe(new Float32Array(d.attributes.position.count*2),2)),f){let m=d.attributes.uv.array;for(let p=0;p<m.length;p++)m[p]*=f}op.set(o,a,c),rp.setFromEuler(op),sp.compose(Z_.set(i,s,r),rp,$_.set(l,h,u)),d.applyMatrix4(sp),lc.set(e);let g=d.attributes.position.count,v=new Float32Array(g*3);for(let m=0;m<g;m++)v[m*3]=lc.r,v[m*3+1]=lc.g,v[m*3+2]=lc.b;return d.setAttribute("color",new pe(v,3)),d.attributes.uv1&&d.deleteAttribute("uv1"),this.g.push(d),this}box(t,e,i,s,r,o,a,c,l,h){return this.add(new Ze(t,e,i),s,r,o,a,c,l,h)}cil(t,e,i,s,r,o,a,c,l,h,u){return this.add(new xn(t,e,i,s),r,o,a,c,l,h,u)}esf(t,e,i,s,r,o=1,a=1,c=1){return this.add(new oi(t,12,8),e,i,s,r,0,0,0,o,a,c)}planta(t,e,i,s=0,r=0){let o=new ji;o.moveTo(t[0][0],t[0][1]);for(let c=1;c<t.length;c++)o.lineTo(t[c][0],t[c][1]);o.closePath();let a=new As(o,{depth:e,bevelEnabled:r>0,bevelSize:r,bevelThickness:r,bevelSegments:1});return this.add(a,i,0,s+e,0,Math.PI/2,0,0,1,1,1,.25)}simetrica(t,e,i,s=0){let r=t.concat(t.slice().reverse().map(([o,a])=>[-o,a]));return this.planta(r,e,i,s)}perfil(t,e,i,s=0,r=.07){let o=new ji;o.moveTo(t[0][0],t[0][1]);for(let l=1;l<t.length;l++)o.lineTo(t[l][0],t[l][1]);o.closePath();let a=Math.min(r,e*.2),c=new As(o,{depth:e-2*a,bevelEnabled:a>0,bevelSize:a,bevelThickness:a,bevelSegments:2});return c.translate(0,0,a),this.add(c,i,s+e/2,0,0,0,-Math.PI/2,0,1,1,1,.3)}fuso(t,e,i=0,s=0,r=0,o=1,a=1,c=14){let l=t.map(([u,f])=>new at(Math.max(.001,f),u)),h=new Na(l,c);return h.rotateX(Math.PI/2),h.scale(o,a,1),h.computeVertexNormals(),this.add(h,e,i,s,r,0,0,0,1,1,1,.5)}bloco(t,e,i,s,r=0,o=0,a=0,c=0,l=0,h=0,u=.12){let f=Math.min(u,t/2.2,e/2.2),d=new ji,g=t/2-f,v=e/2-f;d.moveTo(-g,-e/2),d.lineTo(g,-e/2),d.quadraticCurveTo(t/2,-e/2,t/2,-v),d.lineTo(t/2,v),d.quadraticCurveTo(t/2,e/2,g,e/2),d.lineTo(-g,e/2),d.quadraticCurveTo(-t/2,e/2,-t/2,v),d.lineTo(-t/2,-v),d.quadraticCurveTo(-t/2,-e/2,-g,-e/2);let m=Math.min(f,i*.2),p=new As(d,{depth:i-2*m,bevelEnabled:m>0,bevelSize:m*.6,bevelThickness:m,bevelSegments:2,curveSegments:3});return p.translate(0,0,-i/2+m),this.add(p,s,r,o,a,c,l,h,1,1,1,.3)}roda(t,e,i,s,r,o){this.cil(t,t,e,14,i,s,r,o,0,0,Math.PI/2);let a=Math.sign(s)||1;return this.cil(t*.55,t*.55,.04,10,5592911,s+a*e/2,r,o,0,0,Math.PI/2),this.cil(t*.18,t*.22,.12,8,3815990,s+a*(e/2+.05),r,o,0,0,Math.PI/2),this}build(t=!0){let e=ai(this.g);if(t){let i=e.attributes.position,s=e.attributes.normal,r=e.attributes.color,o=1/0,a=-1/0;for(let l=0;l<i.count;l++){let h=i.getY(l);h<o&&(o=h),h>a&&(a=h)}let c=Math.max(.5,Math.min(3,a-o));for(let l=0;l<i.count;l++){let h=.62+.38*Math.min(1,(i.getY(l)-o)/c);s.getY(l)>.6?h*=1.08:s.getY(l)<-.6&&(h*=.6),r.setXYZ(l,r.getX(l)*h,r.getY(l)*h,r.getZ(l)*h)}}return e.computeBoundingSphere(),e}},ap={},hp=5923904,up=4673583,Ls=12100727,Sr=10390110,is=2040100,Kn=1842204,ae=2044994,gu=8226447,Er=6252399;var cp=10134444,rn=15790314,kt=3422010;var K_=16774084,Q_=12593182;function Tr(n,t,e,i,s,r){for(let o of t)for(let a of e)n.roda(i,s,Kn,o,r!=null?r:i,a)}function xu(n,t,e,i,s=.66,r=!0,o=Ls){for(let a of[-1,1]){let c=a*i;n.box(s,.12,t,is,c,e,0),n.box(s,.12,t-1.2,is,c,.06,0),n.box(s,e*.8,.12,is,c,e*.5,t/2-.3,.6),n.box(s,e*.8,.12,is,c,e*.5,-t/2+.3,-.6);let l=Math.max(5,Math.round(t/1.1));for(let h=0;h<l;h++)n.roda(e*.34,s*.9,2895402,c,e*.36,-t/2+1+h*(t-2)/(l-1));n.roda(e*.4,s*.95,3158316,c,e*.62,-t/2+.35),n.roda(e*.36,s*.95,3158316,c,e*.6,t/2-.35),r&&n.box(.1,e*.55,t-.6,o,a*(i+s/2+.06),e*.82,0)}}function es(n,t,e,i){for(let s of[-1,1])n.box(.22,.14,.06,K_,s*t,e,i)}function ns(n,t,e,i){for(let s of[-1,1])n.box(.16,.12,.06,Q_,s*t,e,i)}function jn(n,t,e,i,s=2.6){n.cil(.012,.025,s,4,is,t,e+s/2,i)}var ty={humvee(){let n=new Gt,t=Ls,e=Sr;n.box(1.9,.5,4.5,e,0,.72,0),n.perfil([[-2.3,.75],[-2.3,1.5],[.75,1.5],[1.5,1.42],[2.3,1.28],[2.32,.75]],2.16,t);for(let s of[-1,1])for(let r of[-1.5,1.55])n.box(.42,.14,1.25,t,s*.95,1.22,r);n.box(2.1,.08,2.25,t,0,2,-.35);for(let[s,r]of[[-1,.72],[1,.72],[-1,-1.45],[1,-1.45],[-1,-.4],[1,-.4]])n.box(.1,.5,.1,t,s,1.75,r);n.box(1.85,.48,.05,ae,0,1.76,.78,-.12);for(let s of[-1,1])n.box(.04,.4,.95,ae,s*1.04,1.76,.15),n.box(.04,.4,.95,ae,s*1.04,1.76,-.92);n.box(2.05,.5,.05,ae,0,1.76,-1.48);for(let s of[-1,1])for(let r of[.15,-.92])n.box(.03,.62,1,e,s*1.09,1.18,r);n.box(1.3,.42,.05,2763302,0,1,2.33);for(let s=0;s<6;s++)n.box(.04,.38,.06,t,-.5+s*.2,1,2.34);es(n,.72,1.1,2.34),n.box(2.2,.18,.22,kt,0,.62,2.4),n.box(.6,.22,.3,3815988,0,.62,2.55),ns(n,.85,1.3,-2.33);for(let s of[-1,1])n.box(.04,.24,.18,kt,s*1.25,1.75,.8),n.box(.18,.04,.04,kt,s*1.15,1.75,.8);jn(n,.9,1.5,-2.1),jn(n,-.9,1.5,-2.1,2),n.box(1.8,.35,.7,4934202,0,1.7,-1.95),n.cil(.4,.4,.22,12,Kn,0,1.62,-2.42,Math.PI/2),Tr(n,[-.95,.95],[-1.5,1.55],.47,.4);let i=new Gt;i.cil(.6,.62,.18,14,e,0,0,0),i.box(1.3,.62,.06,t,0,.42,.45,-.12);for(let s of[-1,1])i.box(.06,.55,.65,t,s*.66,.38,.15,0,s*.35,0);return i.box(.5,.3,.12,ae,0,.62,.47,-.12),i.box(.18,.2,.75,kt,0,.35,.25),i.cil(.035,.035,1.25,6,kt,0,.38,1.2,Math.PI/2),i.cil(.06,.06,.12,6,kt,0,.38,1.82,Math.PI/2),i.box(.22,.2,.3,4934202,.25,.28,.1),{corpo:n.build(),torre:i.build(),torreY:2.08,torreZ:-.45,canoZ:1.85,canoY:.38}},ambulancia(){let n=new Gt,t=Ls;n.box(1.9,.5,4.9,Sr,0,.72,0),n.perfil([[.6,.75],[.6,1.5],[1.6,1.45],[2.45,1.3],[2.47,.75]],2.16,t),n.box(2.1,.08,1,t,0,2,1.05),n.box(1.85,.45,.05,ae,0,1.76,1.58,-.12);for(let e of[-1,1])n.box(.04,.4,.8,ae,e*1.04,1.76,1.05);n.box(2.2,1.85,2.9,15328468,0,1.75,-1.05),n.box(2.22,.32,2.92,3043246,0,2.15,-1.05),n.box(2.24,.06,2.94,9078134,0,2.7,-1.05);for(let e of[-1,1])n.box(.04,.4,.6,ae,e*1.12,2.1,-.4);return n.box(1.8,1.4,.04,14275522,0,1.6,-2.52),n.box(.3,.15,.15,3832789,-.7,2.75,-.1),n.box(.3,.15,.15,13643824,.7,2.75,-.1),es(n,.72,1.1,2.45),ns(n,.85,1,-2.55),n.box(1.3,.42,.05,2763302,0,1,2.44),n.box(2.2,.18,.22,kt,0,.62,2.5),Tr(n,[-.95,.95],[-1.6,1.6],.47,.4),{corpo:n.build()}},stryker(){let n=new Gt,t=hp,e=up;n.perfil([[-3.5,.75],[-3.5,2.55],[2.2,2.55],[3.5,1.6],[3.5,.75],[2.9,.55]],2.3,t);for(let s of[-1,1])n.box(.25,1.3,6.6,e,s*1.28,1.7,-.3,0,0,s*.18);n.box(2.5,.12,5.6,e,0,2.6,-.7),n.box(1.2,.4,.8,e,-.55,2.8,1.7),n.box(.5,.25,.05,ae,-.55,2.85,2.11),n.box(1.6,1.4,.1,e,0,1.8,-3.55);for(let s=0;s<4;s++)n.box(.1,.08,.5,kt,.9,2.66,-1.5-s*.6);es(n,.95,1.45,3.12),ns(n,.95,1.6,-3.56),jn(n,1,2.6,-3,3),jn(n,-1,2.6,-3,2.4);for(let s of[-1,1])for(let r=0;r<3;r++)n.box(.3,.45,.8,4868662,s*1.5,2.1,-2.4+r*1.1);Tr(n,[-1.25,1.25],[-2.55,-1.15,.85,2.25],.56,.48);let i=new Gt;return i.cil(.45,.5,.25,12,e,0,0,0),i.box(.7,.55,.8,t,0,.42,0),i.box(.35,.35,.35,ae,.42,.55,.2),i.box(.2,.2,.8,kt,-.15,.48,.5),i.cil(.035,.035,1.3,6,kt,-.15,.48,1.4,Math.PI/2),i.box(.25,.3,.4,4934202,.45,.25,-.3),{corpo:n.build(),torre:i.build(),torreY:2.62,torreZ:.4,canoZ:2.05,canoY:.48}},bradley(){let n=new Gt,t=Ls,e=Sr;n.perfil([[-3.3,.55],[-3.3,2.35],[1.5,2.35],[3.3,1.35],[3.3,.85],[2.6,.55]],3,t),xu(n,6.4,1.2,1.55,.6,!0,e),n.box(3.6,.1,6.6,e,0,1.42,0);for(let s of[-1,1])for(let r=0;r<5;r++)n.box(.14,.5,1.1,t,s*1.98,1.15,-2.4+r*1.2);n.box(1.2,1.5,.1,e,.6,1.5,-3.35),es(n,1.2,1.4,3.3),ns(n,1.3,1.6,-3.32),jn(n,-1.3,2.35,-2.8,2.8);let i=new Gt;i.simetrica([[1.05,-1.2],[1.05,.7],[.6,1.25]],.85,t,0),i.box(1.9,.14,2.2,e,0,.92,-.2),i.box(.5,.45,.6,e,-.45,.6,1.2),i.cil(.09,.09,2.3,8,kt,-.45,.6,2.6,Math.PI/2),i.cil(.12,.12,.3,8,kt,-.45,.6,3.7,Math.PI/2),i.box(.55,.55,1.4,e,1.35,.55,-.1),i.box(.42,.2,.06,is,1.35,.68,.61),i.box(.42,.2,.06,is,1.35,.4,.61),i.box(.35,.3,.3,ae,.5,1.05,.3);for(let s of[-1,1])for(let r=0;r<4;r++)i.cil(.06,.06,.25,6,kt,s*.95,.65+r%2*.14,.75+Math.floor(r/2)*.15,Math.PI/2.6);return{corpo:n.build(),torre:i.build(),torreY:2.36,torreZ:.1,canoZ:3.8,canoY:.6}},abrams(){let n=new Gt,t=Ls,e=Sr;n.perfil([[-3.95,.55],[-3.95,1.75],[3,1.75],[4,1.2],[3.9,.7],[3.2,.5]],2.6,t),xu(n,7.7,1.3,1.55,.68,!0,e),n.box(3.7,.1,7.7,e,0,1.78,-.1);for(let s=0;s<7;s++)n.box(2.2,.03,.12,4078387,0,1.84,-3.1+s*.22);for(let s of[-1,1])for(let r=0;r<6;r++)n.box(.06,.62,1.15,t,s*1.99,1.25,-3.1+r*1.22);es(n,1.3,1.6,3.42),ns(n,1.5,1.55,-3.97),n.box(1.4,.4,.4,4867126,0,1.6,-4.05);let i=new Gt;i.simetrica([[1.8,-2.4],[1.8,.9],[1.25,2.2],[.55,2.55]],.95,t,0),i.simetrica([[1.6,-2.2],[1.6,.8],[1.1,1.95],[.5,2.3]],.08,e,.95),i.box(3.4,.05,1.3,kt,0,.6,-3);for(let s of[-1,1])i.box(.05,.5,1.3,kt,s*1.7,.85,-3);i.box(3.4,.5,.05,kt,0,.85,-3.65),i.box(3,.4,1.1,5985857,0,.85,-2.95),i.box(1,.75,.6,e,0,.45,2.55),i.cil(.13,.15,5.6,10,t,0,.45,5.4,Math.PI/2),i.cil(.21,.21,.8,10,e,0,.45,4,Math.PI/2),i.cil(.17,.17,.25,10,kt,0,.45,8.15,Math.PI/2),i.cil(.38,.42,.35,12,e,.75,1.12,-.5),i.box(.18,.2,.9,kt,.75,1.42,0),i.cil(.03,.03,1,5,kt,.75,1.42,.9,Math.PI/2),i.cil(.3,.3,.12,10,e,-.75,1.02,-.6),i.box(.12,.15,.7,kt,-.75,1.2,-.2),i.box(.5,.45,.45,e,-.65,1.2,.8),i.box(.3,.25,.04,ae,-.65,1.25,1.03);for(let s of[-1,1])for(let r=0;r<6;r++)i.cil(.055,.055,.3,6,kt,s*(1.35+r%3*.12),.85+Math.floor(r/3)*.13,1.25,Math.PI/2.4);return jn(i,1.4,.95,-2.2,2.6),jn(i,-1.4,.95,-2.2,2),{corpo:n.build(),torre:i.build(),torreY:1.83,torreZ:-.3,canoZ:8.3,canoY:.45}},paladin(){let n=new Gt,t=Ls,e=Sr;n.perfil([[-3.45,.55],[-3.45,1.7],[2.8,1.7],[3.5,1.2],[3.4,.7],[2.8,.5]],2.9,t),xu(n,6.9,1.2,1.6,.62,!0,e),n.box(3.5,.1,6.8,e,0,1.73,0),es(n,1.2,1.5,3.2),ns(n,1.4,1.5,-3.47);let i=new Gt;i.box(3.2,1.7,4.6,t,0,.85,-.9),i.box(3.25,.1,4.65,e,0,1.72,-.9),i.box(1.5,1.2,.6,e,0,.75,1.6);for(let s of[-1,1])i.box(.05,.9,1.2,e,s*1.62,.9,-.5),i.box(.3,.3,.6,4867126,s*1.75,1.2,-2.2);return i.cil(.4,.4,.3,10,e,.8,1.85,-1.5),i.box(.15,.18,.8,kt,.8,2.05,-1),i.cil(.14,.18,6.5,10,t,0,.9,5,Math.PI/2),i.cil(.25,.25,.9,10,e,0,.9,2.6,Math.PI/2),i.box(.6,.35,.55,kt,0,.9,8.35),jn(i,-1.3,1.75,-2.8,2.5),{corpo:n.build(),torre:i.build(),torreY:1.75,torreZ:-.1,canoZ:8.5,canoY:.9}},bearcat(){let n=new Gt,t=1513756,e=2369323;n.box(2,.5,5.6,e,0,.72,0),n.perfil([[-2.85,.8],[-2.85,2.75],[1.2,2.75],[1.6,2.2],[2.75,1.85],[2.85,.8]],2.35,t),n.box(2.37,.28,5,15329769,0,1.55,-.4),n.box(2.38,.12,5.02,2774440,0,1.36,-.4),n.box(2.1,.5,.05,ae,0,2.35,1.42,-.85);for(let i of[-1,1])n.box(.04,.42,.7,ae,i*1.19,2.3,.7),n.box(.04,.35,.45,ae,i*1.19,2.3,-.9),n.box(.04,.35,.45,ae,i*1.19,2.3,-2);return n.box(1.9,1.5,.06,e,0,1.75,-2.88),n.box(1.4,.14,.3,1118481,0,2.84,.6),n.box(.6,.15,.28,16719904,-.38,2.92,.6),n.box(.6,.15,.28,2117887,.38,2.92,.6),n.cil(.45,.5,.35,12,e,0,2.9,-1.1),n.box(2.5,.35,.3,kt,0,.75,2.95),es(n,.85,1.4,2.86),ns(n,.9,1.3,-2.9),jn(n,.9,2.75,-2.4,2.4),Tr(n,[-1.05,1.05],[-1.8,1.9],.55,.45),{corpo:n.build()}},himars(){let n=new Gt,t=Ls,e=Sr;n.box(1.9,.45,7,e,0,.95,0),n.box(2.4,.15,4.6,e,0,1.25,-1.1),n.perfil([[1.6,1],[1.6,3.05],[2.6,3.05],[3.45,2.3],[3.5,1]],2.45,t),n.box(2.1,.62,.05,ae,0,2.6,3.06,-.73);for(let s of[-1,1])n.box(.04,.55,.8,ae,s*1.24,2.55,2.3);es(n,.95,1.35,3.5),ns(n,1,1.1,-3.5),n.box(2.5,.2,.25,kt,0,1,3.6),jn(n,1.1,3.05,1.8,2.2);for(let s of[-1,1])n.box(.5,.6,1.2,4867126,s*1,1.6,.9);Tr(n,[-1.05,1.05],[-2.6,-1.25,2.5],.56,.48);let i=new Gt;i.box(.6,.3,4,kt,0,.15,0),i.box(2.3,1.05,4.1,t,0,.75,0),i.box(2.32,.08,4.12,e,0,1.3,0),i.box(2.1,.9,.05,is,0,.75,2.06);for(let s=0;s<3;s++)for(let r=0;r<2;r++)i.cil(.24,.24,.06,10,9077872,-.65+s*.65,.52+r*.46,2.09,Math.PI/2);return{corpo:n.build(),torre:i.build(),torreY:1.35,torreZ:-1.5,canoZ:2.1,canoY:.75}}};function Ar(n,t,e=2763306,i=.55){let s=new Gt;for(let r=0;r<n;r++){let o=r*Math.PI*2/n;s.box(i,.05,t*.9,e,Math.sin(o)*t*.5,0,Math.cos(o)*t*.5,0,o,0),s.box(i*.9,.051,.35,14204992,Math.sin(o)*t*.95,0,Math.cos(o)*t*.95,0,o,0)}return s.cil(.32,.38,.35,10,kt,0,-.08,0),s.cil(.1,.1,.5,6,kt,0,.2,0),s.build(!1)}function lp(n){let t=new Gt;return t.box(.08,n*2,.25,2763306,0,0,0),t.box(.08,.25,n*2,2763306,0,0,0),t.build()}function uc(n,t,e,i,s,r,o){let a=new ji;a.moveTo(t[0][0],t[0][1]);for(let l=1;l<t.length;l++)a.lineTo(t[l][0],t[l][1]);a.closePath();let c=new As(a,{depth:e,bevelEnabled:!1});c.translate(0,0,-e/2),c.rotateY(-Math.PI/2),c.rotateZ(-o),c.translate(s,r,0),n.add(c,i)}function fc(n,t,e,i,s=0){let r=new Gt,o=9080724,a=1447446;r.cil(.06,.06,1+s*.1,6,o,0,.55,n),r.roda(i*.8,.2,a,.16,i*.8,n),r.roda(i*.8,.2,a,-.16,i*.8,n),r.box(.05,.6,.9,o,.4,.7,n-.2);for(let c of[-1,1])r.cil(.08,.08,1.1,6,o,c*e,.65,t,0,0,c*.12),r.roda(i,.32,a,c*(e+.1),i,t),r.box(.05,.7,1.2,o,c*(e-.35),.8,t);return r.build(!1)}var ey={blackhawk(){let n=new Gt,t=8358504,e=7239769;n.fuso([[-9.6,.18],[-7.5,.32],[-5,.55],[-2.6,.95],[-1.6,1.12],[2.6,1.15],[4.2,1.05],[5.4,.8],[6.3,.45],[6.7,.1]],t,0,1.75,0,1,1.05),n.bloco(2.2,.5,4.6,e,0,.82,.8,0,0,0,.2),n.fuso([[3.9,.95],[5,.85],[5.9,.55],[6.25,.2]],ae,0,2.05,0,1.06,.9);for(let i of[-1,1])n.box(.05,.75,1.5,ae,i*1.14,2.05,1.8),n.box(.05,.6,.8,ae,i*1.12,2,3.6),n.box(.06,1.25,1.9,e,i*1.15,1.75,.1),n.cil(.04,.04,1,6,kt,i*1.35,2.1,1.6,Math.PI/2),n.box(.18,.2,.4,kt,i*1.3,2.1,1),n.cil(.05,.05,1.1,6,kt,i*1.15,.75,2.7,0,0,i*.4),n.roda(.33,.22,Kn,i*1.45,.33,2.7),n.box(1.6,.08,.5,e,i*1.75,2.55,.2,0,0,i*-.25),n.fuso([[-1.6,.05],[-1.2,.3],[1.2,.3],[1.6,.05]],4606777,i*2.45,2.1,.2);n.bloco(1.5,.75,3.6,t,0,2.95,.6,0,0,0,.3);for(let i of[-1,1])n.fuso([[-1.6,.2],[-1.2,.36],[1.2,.38],[1.6,.28]],t,i*.62,3,.2);return n.cil(.22,.32,.6,10,e,0,3.45,.6),n.perfil([[-10.6,2],[-9.6,4.4],[-8.9,4.4],[-8.7,2.4],[-7.9,1.9]],.18,t,0,.04),n.box(4.4,.1,1,t,0,2.15,-9.4),n.roda(.2,.15,Kn,0,.25,-8.6),n.cil(.04,.04,1.4,6,kt,0,.9,-8.6),jn(n,0,2.7,-4,1.2),{corpo:n.build(),rotor:Ar(4,8.2),rotorY:3.85,rotorZ:.6,cauda:lp(1.7),caudaPos:[.3,3.9,-9.6],caudaEixo:"x"}},chinook(){let n=new Gt,t=8752492,e=7568220;n.fuso([[-7.6,1.2],[-7,1.75],[-5,1.85],[5,1.85],[6.6,1.7],[7.6,1.25],[8.2,.6]],t,0,2.3,0,1,1.12,8),n.fuso([[6.4,1.3],[7.4,1.05],[8,.55]],ae,0,2.75,0,1,.75,8);for(let i of[-1,1]){for(let s=0;s<6;s++)n.box(.05,.38,.45,ae,i*1.86,2.75,-4+s*1.6);n.bloco(.9,.85,7.5,e,i*1.95,1,-.4,0,0,0,.3),n.roda(.45,.35,Kn,i*1.55,.45,4.6),n.roda(.45,.35,Kn,i*1.55,.45,-4.4),n.roda(.45,.35,Kn,i*1.55,.45,-5.4),n.fuso([[-8.2,.35],[-7.6,.5],[-5.6,.55],[-5.2,.42]],5133373,i*1.4,4.35,0)}return n.perfil([[-8.2,3.6],[-7.2,6],[-5,6],[-4,3.6]],1.6,t,0,.12),n.bloco(1.3,.8,2.2,t,0,4.35,6.2,0,0,0,.3),n.box(1.6,.06,4,2764322,0,.48,-6.6,.25),{corpo:n.build(),rotor:Ar(3,9.1),rotorY:6.3,rotorZ:-6.5,rotor2:Ar(3,9.1),rotor2Y:5,rotor2Z:6.3}},apache(){let n=new Gt,t=8160868,e=7042133;n.fuso([[-9.4,.15],[-7,.28],[-4,.45],[-1.8,.75],[1.2,.85],[3.4,.7],[4.8,.45],[5.4,.15]],t,0,1.75,0,.75,1.2),n.fuso([[.6,.4],[1.6,.55],[3,.52],[4.4,.35],[4.9,.1]],ae,0,2.45,0,.95,.85),n.box(.06,.4,.06,e,0,2.75,2.2);for(let i of[-1,1]){n.fuso([[-2.6,.25],[-2.2,.42],[.4,.45],[.8,.32]],t,i*.95,2.55,-.4),n.cil(.2,.28,.4,8,2237470,i*.95,2.55,-2.8,Math.PI/2),n.bloco(2.4,.12,.95,e,i*1.75,1.9,.5,0,0,i*.08);for(let s=0;s<2;s++)for(let r=0;r<2;r++)n.fuso([[-.8,.08],[.7,.09],[.9,.02]],6974789,i*(2.05+s*.25),1.55-r*.22,.6);n.fuso([[-.9,.3],[.8,.32],[1,.22]],5264444,i*2.85,1.6,.5),n.cil(.05,.05,1,6,kt,i*.8,.6,2.2,0,0,i*.3),n.roda(.3,.2,Kn,i*.95,.3,2.2)}return n.esf(.3,e,0,1.05,3.6),n.cil(.04,.05,1.6,6,kt,0,.95,4.4,Math.PI/2),n.esf(.25,2236962,0,1.3,5.15),n.perfil([[-10,2],[-9.2,4.2],[-8.6,4.2],[-8.6,2.2],[-7.5,1.9]],.16,t,0,.04),n.box(3.2,.1,.8,t,0,1.75,-9.3),n.roda(.18,.12,Kn,0,.2,-8.9),n.cil(.04,.04,1.4,6,kt,0,.9,-8.9),n.cil(.16,.22,.9,8,e,0,3.4,.1),{corpo:n.build(),rotor:Ar(4,7.3),rotorY:4.1,rotorZ:.1,cauda:lp(1.4),caudaPos:[.3,3.4,-9.4],caudaEixo:"x",armaZ:5.2,armaY:.95,radar:!0}},reaper(){let n=new Gt,t=10726321;n.fuso([[-5.4,.12],[-4,.35],[-1,.48],[2.5,.5],[4.2,.45],[5.2,.3],[5.6,.05]],t,0,.45,0,.9,1),n.fuso([[3.2,.3],[4.6,.5],[5.4,.3]],t,0,.75,0,.9,.9),n.simetrica([[10,-.3],[10,.3],[.5,1],[.5,-.6]],.14,t,.6),n.box(.1,1.5,.9,t,.65,.95,-4.8,0,0,-.75),n.box(.1,1.5,.9,t,-.65,.95,-4.8,0,0,.75),n.box(.1,.9,.7,t,0,0,-4.6);for(let e of[-1,1])for(let i of[3.2,5])n.fuso([[-.8,.04],[.7,.1],[.9,.02]],7039813,e*i,.25,.2);return n.esf(.38,2830389,0,0,4.2),{corpo:n.build(),helice:Ar(3,1.4,3355443,.25),heliceZ:-5.7,heliceY:.45,heliceEixo:"z"}},f35(){let n=new Gt,t=11121080,e=10002600,i=3817284;n.fuso([[-7.4,.55],[-6.2,.9],[-3.5,1.15],[0,1.2],[2.6,1.05],[4.6,.75],[6.6,.4],[8,.08]],t,0,1.25,0,1.45,.62,16),n.simetrica([[1.1,-6.8],[1.7,-3],[1.6,2.6],[.9,5.5],[.2,7.6]],.18,e,1.05),n.fuso([[.5,.42],[1.5,.6],[3.4,.62],[5,.42],[5.7,.05]],11898170,0,1.78,0,.9,.7,14),n.box(.06,.12,.08,i,0,2.18,3);for(let s of[-1,1])n.planta([[s*.9,1],[s*1.75,1.6],[s*1.75,-1.4],[s*.9,-1.4]],.7,t,.8),n.box(.7,.62,.06,i,s*1.35,1.15,1.58);n.simetrica([[1.3,-5.2],[6.55,-3],[6.55,-1.85],[3,.4],[1.5,2.2]],.2,t,1.12),n.simetrica([[1.2,-7.6],[3.9,-7.3],[3.9,-6.4],[1.4,-4.8]],.12,t,1.2);for(let s of[-1,1])uc(n,[[-7.5,0],[-6,2.3],[-5,2.3],[-4.3,0]],.1,t,s*1.35,1.55,s*.42);return n.cil(.6,.66,.9,14,3815478,0,1.2,-7.55,Math.PI/2),n.cil(.48,.48,.92,14,1447446,0,1.2,-7.56,Math.PI/2),n.box(.12,.08,.2,13639712,-6.5,1.25,-2.3),n.box(.12,.08,.2,2146368,6.5,1.25,-2.3),n.box(.06,.06,.6,i,0,.6,-7,-.3),{corpo:n.build(),trem:fc(4.2,-.6,1.5,.3),motorZ:-8,motorY:1.2,chamaR:.5,pontas:6.5}},f18(){let n=new Gt,t=12897234,e=11778754,i=3817284;n.fuso([[-8.6,.65],[-7.4,.9],[-4,1.05],[.5,.95],[3.5,.75],[6.5,.5],[8.6,.25],[9.3,.02]],t,0,1.3,0,1.4,.75,16),n.fuso([[3,.38],[4,.52],[5.6,.5],[6.6,.3],[7,.04]],3688015,0,1.92,0,.9,.75,14),n.simetrica([[1,-1],[2.6,-.6],[1.6,2.5],[.8,5.2]],.12,e,1.3);for(let s of[-1,1])n.bloco(.95,.85,3.4,t,s*1.25,.95,.4,0,0,0,.12),n.box(.8,.7,.06,i,s*1.25,.95,2.12);n.simetrica([[1.6,-4.4],[6.8,-2.8],[6.8,-1.9],[2.2,1]],.2,t,1.15);for(let s of[-1,1])n.fuso([[-1.4,.03],[-1.2,.07],[1.2,.07],[1.6,.01]],15263968,s*6.95,1.15,-2.4,1,1,8),n.box(.04,.5,.4,15263968,s*6.95,1.15,-3.6),n.box(.08,.4,1.2,e,s*2.9,.85,-1.5),n.fuso([[-1.8,.05],[-1.4,.24],[1,.24],[1.6,.04]],7170890,s*2.9,.48,-1.4,1,1,10),n.box(.08,.4,1,e,s*4.6,.9,-2),n.fuso([[-1.2,.05],[-.8,.17],[.9,.17],[1.3,.03]],7170890,s*4.6,.6,-2,1,1,10);n.fuso([[-2.6,.05],[-2,.35],[1.8,.35],[2.6,.05]],e,0,.45,-1,1,1,12),n.simetrica([[1.2,-9.3],[3.7,-8.8],[3.7,-8],[1.4,-6.3]],.12,t,1.25);for(let s of[-1,1])uc(n,[[-8.5,0],[-6.6,2.6],[-5.5,2.6],[-4.6,0]],.12,t,s*1.45,1.75,s*.35);for(let s of[-.62,.62])n.cil(.5,.55,.9,12,3815478,s,1.2,-8.95,Math.PI/2),n.cil(.4,.4,.92,12,1447446,s,1.2,-8.96,Math.PI/2);return n.box(.6,.04,.6,1710618,0,1.55,.2),n.box(.12,.08,.2,13639712,-6.9,1.2,-1.2),n.box(.12,.08,.2,2146368,6.9,1.2,-1.2),{corpo:n.build(),trem:fc(5,-1,1.6,.35),motorZ:-9.4,motorY:1.2,chamaR:.45,motores:[-.62,.62],pontas:6.9}},a10(){let n=new Gt,t=10726578,e=9673890,i=3817284;n.fuso([[-8,.25],[-6.5,.55],[-3,.9],[1.5,1],[4,.95],[6.2,.75],[7.6,.45],[8.1,.12]],t,0,1.6,0,1,1.05,14),n.fuso([[4.4,.45],[5.2,.6],[6.4,.55],[7,.3]],3162186,0,2.3,0,.9,.85,12),n.cil(.08,.1,1.6,8,2236962,0,1.25,8.6,Math.PI/2),n.cil(.2,.2,.25,8,i,0,1.25,8.2,Math.PI/2),n.simetrica([[.9,-.9],[7.3,-.4],[8.6,-.3],[8.6,.9],[7.3,1.2],[.9,2.3]],.3,t,1);for(let s of[-1,1]){n.box(1.1,.3,1.3,e,s*9.1,.85,.4,0,0,s*-.35),n.fuso([[-2,.42],[-1.6,.62],[1.2,.65],[1.6,.55]],e,s*1.55,2.75,-3,1,1,14),n.cil(.5,.5,.06,14,i,s*1.55,2.75,-1.42,Math.PI/2),n.box(.3,.6,1.4,t,s*1,2.35,-3);for(let[r,o,a]of[[2.4,7170890,.2],[3.6,7170890,.2],[4.8,14540253,.15],[6,3817285,.25]])n.box(.08,.3,.9,e,s*r,.75,.6),n.fuso([[-1.2,.03],[-.9,a],[.9,a],[1.3,.02]],o,s*r,.5,.6,1,1,8)}n.simetrica([[.5,-8],[3.6,-7.7],[3.6,-6.7],[.5,-6.4]],.15,t,1.8);for(let s of[-1,1])uc(n,[[-8.2,-1],[-7.9,2.3],[-6.7,2.3],[-6.4,-1]],.15,t,s*3.6,1.9,0);return n.box(.12,.08,.2,13639712,-8.9,.95,.4),n.box(.12,.08,.2,2146368,8.9,.95,.4),{corpo:n.build(),trem:fc(1.2,.4,2.2,.38,5),pontas:8.8,semChama:!0}},f22(){let n=new Gt,t=12239304,e=11120824,i=3817284;n.fuso([[-7.8,.6],[-6,.95],[-2.5,1.2],[1,1.15],[4,.8],[6.6,.45],[8.6,.12],[9.4,.02]],t,0,1.3,0,1.6,.6,16),n.fuso([[3.8,.42],[4.9,.58],[6.6,.55],[7.6,.3],[8,.04]],11898170,0,1.78,0,.9,.72,14);for(let s of[-1,1])n.planta([[s*1,4],[s*2.15,2.6],[s*2.15,-2],[s*1,-2]],.85,e,.75),n.box(.95,.75,.06,i,s*1.6,1.15,2.58,0,s*.5,0);n.simetrica([[1.6,-5.6],[6.8,-2.6],[6.8,-1.6],[2.2,2.4]],.2,t,1.12),n.simetrica([[1.6,-8],[4.4,-7],[4.4,-6.1],[1.8,-5]],.12,t,1.15);for(let s of[-1,1])uc(n,[[-7.4,0],[-5.4,2.6],[-4.2,2.6],[-3.4,0]],.1,t,s*1.75,1.55,s*.5);for(let s of[-.75,.75])n.box(1.2,.55,1,3815478,s,1.2,-7.9),n.box(1,.36,1.02,1447446,s,1.2,-7.92);return n.box(.12,.08,.2,13639712,-6.8,1.2,-2.1),n.box(.12,.08,.2,2146368,6.8,1.2,-2.1),{corpo:n.build(),trem:fc(4.8,-.8,1.6,.32),motorZ:-8.4,motorY:1.2,chamaR:.42,motores:[-.75,.75],pontas:6.8}},osprey(){let n=new Gt,t=10133926,e=9015445;n.fuso([[-9,.35],[-7,.9],[-5,1.3],[5,1.35],[6.6,1.15],[7.8,.75],[8.6,.2]],t,0,2,0,1,1.1,10),n.fuso([[6,1],[7.2,.85],[8.1,.4]],ae,0,2.35,0,1.02,.85,10);for(let r of[-1,1])n.bloco(.8,.8,4.5,e,r*1.35,1,.5,0,0,0,.3);n.bloco(14,.4,2.4,t,0,3.6,.6,0,0,0,.18),n.bloco(1.8,.7,4,t,0,3.25,.6,0,0,0,.3),n.box(5.4,.15,1.5,t,0,3.1,-8.3);for(let r of[-1,1])n.perfil([[-9.2,2.6],[-8.6,4.8],[-7.8,4.8],[-7.6,2.6]],.15,t,r*2.6,.04);for(let r of[-1,1])n.roda(.4,.3,Kn,r*1.5,.4,.5);n.roda(.3,.2,Kn,0,.3,6);let i=new Gt;i.fuso([[-2.2,.45],[-1.6,.68],[1.8,.66],[2.2,.4]],t,0,0,0,1,1,10),i.cil(.3,.3,.5,8,e,0,0,2.3,Math.PI/2);let s=i.build();return s.rotateX(-Math.PI/2),{corpo:n.build(),nacele:s,rotor:Ar(3,5.8),naceleX:7,naceleY:3.7}}},ny={lancha(){let n=new Gt,t=8029068,e=6449778;n.simetrica([[2.7,-12],[2.8,4],[2.2,9],[1,12],[0,13.2]],1.6,t,-.4),n.simetrica([[2.4,-11.5],[2.5,4],[1.9,9],[.7,12],[0,12.6]],.6,4146507,-.9),n.simetrica([[2.65,-11.9],[2.75,4],[2.15,9],[.95,12],[0,13.1]],.1,10134443,1.2),n.perfil([[-3.5,1.3],[-3.5,3.6],[1.6,3.6],[3.4,1.3]],3.8,e,0,.12),n.box(3.4,.7,.06,ae,0,2.8,2.7,-.86);for(let s of[-1,1])n.box(.06,.6,2.6,ae,s*1.92,2.9,-.2);n.cil(.12,.12,3.2,6,kt,0,5.2,-1.5),n.box(1.8,.25,.25,kt,0,6.2,-1.5),n.esf(.5,rn,0,6.9,-1.5,1,.5,1);for(let s of[-1,1])n.box(.08,.6,18,4870230,s*2.6,1.6,-1);n.cil(.3,.35,.6,8,e,0,1.6,-9),n.cil(.05,.05,1.6,6,kt,0,2,-8,Math.PI/2);let i=new Gt;return i.cil(.65,.75,.6,10,e,0,0,0),i.bloco(1,.7,1.2,t,0,.6,0,0,0,0,.2),i.cil(.08,.1,2.4,8,kt,0,.6,1.6,Math.PI/2),{corpo:n.build(),torre:i.build(),torreY:1.25,torreZ:8.5,canoZ:2.8,canoY:.6}},lcac(){let n=new Gt,t=8226447,e=6252399;n.bloco(14.2,1.9,26,2369322,0,.95,0,0,0,0,.9),n.box(12.6,.35,23.5,e,0,1.95,0);for(let i of[-1,1]){n.bloco(2.3,2.6,21,t,i*5.9,3.3,-.5,0,0,0,.3);for(let s=0;s<4;s++)n.box(.06,.5,.8,ae,i*7.07,3.6,-7+s*4);n.cil(2.35,2.35,1.4,18,t,i*3.6,4.6,-11.6,Math.PI/2),n.cil(1.95,1.95,1.45,16,1710618,i*3.6,4.6,-11.6,Math.PI/2),n.box(.15,3.6,.9,e,i*3.6,4.6,-12.7),n.box(.15,3.6,.9,e,i*2.6,4.6,-12.7),n.bloco(1.6,1.2,2.4,e,i*5.9,5.1,-6,0,0,0,.3)}return n.bloco(2.4,1.6,2.8,t,5.9,5.4,6.5,0,0,0,.3),n.box(2.42,.5,2,ae,5.9,5.7,7),n.box(10.5,.15,2,9080724,0,2.6,12,-.6),{corpo:n.build()}},destroier(){let n=new Gt,t=8358032,e=6713464,i=5726054;n.simetrica([[8.8,-77],[10,-60],[10.2,15],[8.6,45],[5,64],[1.2,78],[0,80]],9,t,-5),n.simetrica([[8.7,-76.5],[9.9,-60],[10.1,15],[8.5,45],[4.9,64],[1.1,77.5],[0,79.5]],.25,5791332,4),n.simetrica([[9,-77.2],[10.2,-60],[10.4,15],[8.8,45],[5.2,64]],.6,3027510,-5.4),n.perfil([[-2,4.2],[-2,13.5],[12,17.5],[24,17.5],[27,4.2]],14.5,t,0,.2),n.perfil([[8,17.5],[10,23],[20,23],[22,17.5]],10,t,0,.15),n.box(9.6,1.4,.15,ae,0,21.2,21.7,-.35);for(let r of[-1,1])n.cil(3.3,3.3,.3,8,9213340,r*7.25,13,16,0,0,Math.PI/2+r*.35),n.cil(3.3,3.3,.3,8,9213340,r*4.5,13,3.5,Math.PI/2-.35,0,0);n.cil(3.3,3.3,.3,8,9213340,0,13.5,24.5,-Math.PI/2+.6,0,0);for(let[r,o]of[[-1.2,-1.2],[1.2,-1.2],[-1.2,1.2],[1.2,1.2]])n.box(.25,16,.25,e,r,31,10+o);for(let r=0;r<4;r++)n.box(2.8,.2,2.8,e,0,25+r*4,10);n.box(7,.4,.4,e,0,36,10),n.cil(.08,.08,6,6,kt,0,42,10),n.esf(.8,rn,2.5,34,10),n.perfil([[-12,4.2],[-11,16],[-6,16],[-5,4.2]],6,t,0,.2),n.box(5.4,.6,1.8,2236962,0,16.2,-7.8),n.box(5.4,.6,1.8,2236962,0,16.2,-9.6),n.perfil([[-34,4.2],[-33,15],[-28,15],[-27,4.2]],6,t,0,.2),n.box(5.4,.6,1.8,2236962,0,15.2,-29.8),n.box(5.4,.6,1.8,2236962,0,15.2,-31.6),n.perfil([[-26,4.2],[-26,9],[-13,9],[-13,4.2]],11,e,0,.15),n.perfil([[-50,4.2],[-50,10],[-35,12],[-35,4.2]],14,t,0,.15);for(let[r,o]of[[34,4],[-46,4]]){n.box(8,.25,o*2.2,i,0,4.35,r);for(let a=0;a<o;a++)for(let c=0;c<4;c++)n.box(1.6,.1,1.7,4278092,-3+c*2,4.5,r-(o-1)*1.1+a*2.2)}n.box(14,.12,18,4869972,0,4.3,-64),n.box(.4,.05,14,rn,0,4.4,-64),n.cil(4.5,4.5,.05,24,15123002,0,4.36,-64),n.cil(4.2,4.2,.07,24,4869972,0,4.37,-64),n.cil(1.1,1.3,2.2,10,rn,0,15.2,-19),n.esf(1.1,rn,0,16.7,-19),n.cil(1.1,1.3,2.2,10,rn,0,18.6,15),n.esf(1.1,rn,0,20,15);for(let r of[-1,1])n.bloco(1.8,1,6,3093560,r*6.5,10,-20,0,0,0,.4);let s=new Gt;return s.perfil([[-2.2,0],[-2.2,1.8],[.8,2.2],[2.6,1],[2.6,0]],3.6,t,0,.15),s.cil(.2,.28,7,10,e,0,1.2,5.6,Math.PI/2),s.cil(.32,.32,.6,10,e,0,1.2,2.8,Math.PI/2),{corpo:n.build(),torre:s.build(),torreY:4.3,torreZ:56,canoZ:9.2,canoY:1.2}},portaavioes(){let n=new Gt;n.simetrica([[15,-150],[18,-120],[19,90],[11,140],[0,162]],18,gu,-10),n.simetrica([[33,-158],[34,-40],[32,60],[22,140],[12,158]],2.5,Er,5.5),n.planta([[-38,-160],[36,-160],[37,-20],[24,160],[-24,160],[-26,40],[-40,-60]],1,4540491,8);let t=9.03,e=15123002,i=15790314,s=12597547,r=-.16,o=-10,a=-45,c=Math.cos(r),l=Math.sin(r),h=(v,m)=>[o+m*c+v*l,a-m*l+v*c];for(let v=-100;v<100;v+=8){let[m,p]=h(v,0);n.box(.6,.04,4.5,i,m,t+.01,p,0,r,0)}for(let v of[-14,14])for(let m=-100;m<100;m+=6){let[p,M]=h(m,v);n.box(.4,.04,3,i,p,t,M,0,r,0)}for(let v=0;v<4;v++){let[m,p]=h(-70+v*9,0);n.box(26,.05,.25,2236962,m,t+.02,p,0,r,0)}for(let v of[-6,6,-28,-18])n.box(.5,.05,80,2829099,v,t+.01,v>-10?110:30);for(let v of[-6,6])n.box(.3,.05,80,e,v+1.2,t+.02,110);n.box(.5,.04,300,e,32,t,0),n.box(.5,.04,300,s,-36,t,-10,0,.03,0);for(let[v,m]of[[36,-80],[36,30],[-40,-30]])n.box(14,.6,16,4079940,v,8.6,m);let u={6:"afedcg",8:"abcdefg"},f=(v,m,p,M,_)=>{let y={a:[0,M,p,.9],b:[p/2,M/2,.9,M/2],c:[p/2,-M/2,.9,M/2],d:[0,-M,p,.9],e:[-p/2,-M/2,.9,M/2],f:[-p/2,M/2,.9,M/2],g:[0,0,p,.9]}[_];n.box(y[2],.05,y[3],i,v+y[0],t+.02,m+y[1])};for(let[v,m]of[[6,-6],[8,6]])for(let p of u[v])f(m,128,6,5,p);n.box(11,16,30,gu,30,17,-30),n.box(10,6,22,Er,30,27.5,-28),n.box(8.5,5,14,gu,30,33,-26),n.box(9.2,1.4,.2,ae,30,33.5,-18.95);for(let v of[24.4,35.6])n.box(.2,1.2,12,ae,v,33.5,-26);for(let v=0;v<3;v++)n.box(10.6,.15,30.4,Er,30,12+v*5,-30);for(let v of u[6]){let m={a:[0,4,4,.8],b:[2,2,.8,4],c:[2,-2,.8,4],d:[0,-4,4,.8],e:[-2,-2,.8,4],f:[-2,2,.8,4],g:[0,0,4,.8]}[v];n.box(.2,m[3],m[2],i,24.4,22+m[1],-36+m[0])}for(let v of u[8]){let m={a:[0,4,4,.8],b:[2,2,.8,4],c:[2,-2,.8,4],d:[0,-4,4,.8],e:[-2,-2,.8,4],f:[-2,2,.8,4],g:[0,0,4,.8]}[v];n.box(.2,m[3],m[2],i,24.4,22+m[1],-30+m[0])}for(let[v,m]of[[-1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]])n.box(.35,14,.35,Er,30+v,42,-30+m);for(let v=0;v<4;v++)n.box(3.6,.25,3.6,Er,30,36+v*3.5,-30);n.box(8,.5,.6,Er,30,47,-30),n.box(5,2.2,.3,13620182,30,45,-24,0,.3,0),n.esf(1.6,rn,33,38.5,-40),n.esf(1.3,rn,27,38,-40),n.cil(.2,.2,6,6,kt,30,52,-30);for(let v=0;v<5;v++)n.cil(.7,.7,2.5,8,14540253,34.5,6,-120+v*12,Math.PI/2);n.box(3,1.2,4,15123002,26,9.6,-55),n.box(2.5,1.6,3.5,14540253,20,9.8,10),n.box(2,1,3,15123002,-20,9.5,70);for(let[v,m]of[[33,150],[-30,-150],[33,-150]])n.cil(1.2,1.4,2,10,rn,v,10,m),n.cil(.2,.2,2.4,6,kt,v,11,m+1.4,Math.PI/2);let d=[[.9,-7],[5,-3],[5,-2],[1.4,2.5],[0,7.5]],g=d.concat(d.slice().reverse().map(([v,m])=>[-v,m]));for(let v=0;v<9;v++){let m=-30+v%3*8,p=-140+Math.floor(v/3)*18;n.planta(g.map(([M,_])=>[M*.8+m,_*.8+p]),.7,cp,9),n.box(.9,.5,2.2,3686213,m,10,p+2.5),n.box(.15,1.6,1.6,cp,m,10.4,p-4.5)}return{corpo:n.build()}}},iy={pista(){let n=new Gt;n.box(40,.12,320,3882562,0,.06,0);for(let t=-140;t<140;t+=16)n.box(.8,.03,8,15790314,0,.14,t);for(let t of[-1,1])n.box(.6,.03,320,15790314,t*18,.14,0);for(let t=0;t<8;t++)for(let e of[-1,1])n.box(1.4,.03,12,15790314,-14+t*4,.14,e*150);n.box(50,.1,140,4869456,-45,.05,80);for(let t=0;t<3;t++)n.perfil([[-12,0],[-12,6],[-6,10],[6,10],[12,6],[12,0]],30,8226168,-85,.2);return n.cil(.3,.4,18,8,kt,-75,9,-120),n.box(6,4,6,11580328,-75,20,-120),n.box(6.2,1.4,6.2,ae,-75,21.5,-120),{corpo:n.build()}},acampamento(){let n=new Gt,t=13;for(let e=0;e<26;e++){let i=e/26*Math.PI*2;if(e%9===0)continue;let s=Math.sin(i)*t,r=Math.cos(i)*t;n.bloco(3.2,.5,.7,11048298,s,.25,r,0,i+Math.PI/2,0,.2),n.bloco(2.9,.5,.7,10259040,s,.72,r,0,i+Math.PI/2+.1,0,.2),e%3===0&&n.bloco(2.6,.45,.65,11574384,s,1.15,r,0,i+Math.PI/2,0,.2)}for(let[e,i,s,r]of[[t+2,3,.2,9054756],[-t-2,-4,-.3,2902650],[3,-t-2,1.5,13684944]])n.bloco(1.8,1.3,4.3,r,e,.65,i,0,s,Math.PI/2-.1,.25);for(let[e,i,s,r]of[[-5,3,.3,5208634],[4,5,-.5,3824266],[-2,-6,1.2,11758122],[6,-3,2,6974010]]){let o=new xn(.01,2,2,4,1);n.add(o,r,e,1,i,0,s,0,1.2,1,.9)}for(let e=0;e<6;e++)n.box(.9,.7,.9,8018486,-8+e*.95,.35,8-e%2*.9);for(let e=0;e<4;e++)n.cil(.4,.4,1,10,e%2?3103370:9058858,8+e%2*.9,.5,6-Math.floor(e/2)*.9);n.cil(.9,1,.25,10,5591628,0,.12,0);for(let e=0;e<4;e++)n.box(1.2,.18,.18,4863008,0,.3,0,0,e*.8,0);return n.cil(.06,.06,4.5,6,kt,-9,2.25,-5),n.box(.04,.9,1.4,15790320,-9,4,-4.3),{corpo:n.build()}},qg(){let n=new Gt;n.box(40,12,26,13352347,0,6,0),n.box(30,4,20,12036484,0,14,0),n.box(42,1,28,9208165,0,12.4,0),n.cil(.25,.25,26,6,kt,14,29,6),n.box(.4,2.4,4,2837132,14,40,8.2),n.box(.42,1.2,2,rn,14,40.6,7.1),n.cil(2.8,2.8,.6,14,rn,-9,16.8,-4,.5),n.cil(.3,.3,4,6,kt,-9,18,-4);for(let t=0;t<5;t++)n.box(5,2.2,.15,ae,-16+t*8,6.5,13.05);return{corpo:n.build()}},quartel(){let n=new Gt;for(let t=0;t<3;t++)n.box(14,5,40,12036742,-20+t*20,2.5,0),n.box(15,.8,41,7038032,-20+t*20,5.4,0);for(let t=0;t<24;t++)n.box(1.4,1,.7,10127970,-32+t*2.8,.5,24);return{corpo:n.build()}},patio(){let n=new Gt;n.box(60,9,30,11117199,0,4.5,-10),n.box(62,.8,32,6249295,0,9.3,-10);for(let t=0;t<5;t++)n.box(9,7,.3,7369832,-24+t*12,3.5,5.2);return n.box(64,.15,30,5593178,0,.08,22),{corpo:n.build()}},heliporto(){let n=new Gt;for(let[t,e]of[[-30,0],[0,0],[30,0],[-15,32],[15,32]])n.cil(12,12,.3,20,4540491,t,.15,e),n.box(1.2,.05,7,15921906,t-2.2,.33,e),n.box(1.2,.05,7,15921906,t+2.2,.33,e),n.box(3.4,.05,1.2,15921906,t,.33,e);return n.box(14,7,10,10133644,0,3.5,-24),n.cil(.2,.2,9,6,kt,6,4.5,-20),n.cil(.6,.1,2.2,8,16743168,6,9,-20,0,0,1.3),{corpo:n.build()}},docas(){let n=new Gt;n.box(16,1.2,70,8156264,0,.6,0);for(let t=0;t<8;t++)n.cil(.5,.5,4,6,5196354,7,-1,-32+t*9);return n.box(10,6,12,10133644,-4,4,-26),n.box(1.5,12,1.5,13934615,3,6,18),n.box(1.5,1.5,14,13934615,3,12,12),{corpo:n.build()}},zona(){let n=new Gt;for(let t=0;t<4;t++)for(let e=0;e<3;e++)n.box(8,3,14,15328466,-18+t*12,1.5,-14+e*17),n.cil(.01,4.2,1.8,4,16052450,-18+t*12,3.9,-14+e*17,0,Math.PI/4,0);return n.box(56,.1,56,7309914,0,.06,0),{corpo:n.build()}},fob(){let n=new Gt;for(let t=0;t<32;t++){let e=t/32*Math.PI*2;t%8!==0&&n.bloco(2.4,2.2,1.2,12758402,Math.sin(e)*26,1.1,Math.cos(e)*26,0,e+Math.PI/2,0,.1)}for(let[t,e,i]of[[-8,-6,0],[-8,4,0],[6,-8,1.57],[10,6,.3]])n.bloco(5,2.6,9,7304528,t,1.3,e,0,i,0,1.2);n.cil(.15,.25,14,6,kt,0,7,-14),n.box(.6,1.2,.1,rn,0,12,-13.8),n.cil(6,6,.15,20,4474698,8,.08,14),n.box(1,.05,4,rn,7,.18,14),n.box(1,.05,4,rn,9,.18,14),n.box(2.4,.05,.8,rn,8,.18,14),n.cil(.08,.08,6,6,kt,-14,3,10),n.box(.05,1,1.6,2837132,-14,5.4,10.8);for(let t=0;t<5;t++)n.box(1,.8,1,6969914,14+t%2,.4,-10+t);return{corpo:n.build()}},muro(){let n=new Gt;for(let t=0;t<5;t++)n.bloco(1.4,2.2,1.9,12758402,0,1.1,-4+t*2,0,0,0,.12),n.box(1.45,.06,1.95,7827546,0,2.22,-4+t*2);return{corpo:n.build()}},torre(){let n=new Gt;for(let[t,e]of[[-1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]])n.box(.3,9,.3,5984320,t,4.5,e);return n.box(4.5,2.2,4.5,8022607,0,10,0),n.box(5,.4,5,4866612,0,11.6,0),{corpo:n.build()}},patriot(){let n=new Gt;return n.box(2.6,1.2,9,hp,0,1.3,0),Tr(n,[-1.1,1.1],[-3,-1.6,2.8],.55,.45),n.box(2.6,1.8,6,up,0,3,-1.2,-.6),{corpo:n.build()}}},sy=Object.assign({},ty,ey,ny,iy);function wr(n){let t=ap["_d_"+n]||(ap["_d_"+n]=sy[n]()),e=new Ai,i={grupo:e,def:t};if(e.add(new oe(t.corpo,hc)),t.torre){let s=new oe(t.torre,hc);s.position.set(0,t.torreY,t.torreZ),e.add(s),i.torre=s}if(t.rotor&&!t.nacele){let s=new oe(t.rotor,xo);s.position.set(0,t.rotorY,t.rotorZ),e.add(s),i.rotor=s}if(t.rotor2){let s=new oe(t.rotor2,xo);s.position.set(0,t.rotor2Y,t.rotor2Z),e.add(s),i.rotor2=s}if(t.cauda){let s=new oe(t.cauda,xo);s.position.set(...t.caudaPos),e.add(s),i.cauda=s}if(t.helice){let s=new oe(t.helice,xo);s.position.set(0,t.heliceY,t.heliceZ),s.rotation.x=Math.PI/2,e.add(s),i.helice=s}if(t.motorZ!==void 0&&!t.semChama){let s=t.chamaR||.5,r=new no(s,s*8,12,1,!0);r.rotateX(-Math.PI/2),r.translate(0,0,-s*4);let o=new Cn({color:16751184,transparent:!0,opacity:.75,blending:lr,depthWrite:!1}),a=new no(s*.7,s*5,12,1,!0);a.rotateX(-Math.PI/2),a.translate(0,0,-s*2.5);let c=new Cn({color:10471679,transparent:!0,opacity:.9,blending:lr,depthWrite:!1}),l=new ka(s*.45,s*.12,6,12),h=new Cn({color:16769200,transparent:!0,opacity:.8,blending:lr,depthWrite:!1});i.chamas=[];for(let u of t.motores||[0]){let f=new oe(r,o),d=new oe(a,c);f.position.set(u,t.motorY,t.motorZ),d.position.set(u,t.motorY,t.motorZ),e.add(f),e.add(d),i.chamas.push(f,d);for(let g=1;g<=3;g++){let v=new oe(l,h);v.position.set(u,t.motorY,t.motorZ-g*s*1.6),e.add(v),i.chamas.push(v)}}}if(t.trem&&(i.trem=new oe(t.trem,hc),e.add(i.trem)),t.nacele){i.naceles=[];for(let s of[-1,1]){let r=new Ai;r.position.set(s*t.naceleX,t.naceleY,.6);let o=new oe(t.nacele,hc);r.add(o);let a=new oe(t.rotor,xo);a.position.set(0,2.65,0),r.add(a),e.add(r),i.naceles.push({piv:r,ro:a})}}return e.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),i}function fp(n,t=5046122){let e=new Ba(n*.86,n,28).rotateX(-Math.PI/2),i=new oe(e,new Cn({color:t,transparent:!0,opacity:.85,depthWrite:!1}));return i.renderOrder=3,i}var Eu={};ef(Eu,{NCEL:()=>Pn,NH:()=>ui,NW:()=>Wt,acharCaminho:()=>Su,livre:()=>Cr,pontoLivreProximo:()=>In,prepararNavegacao:()=>bu});var Ds=2,Wt=Math.ceil(Ft/Ds),ui=Math.ceil(Te/Ds),Pn=Ae*Ds,yn=Wt*ui,Ns=[new Uint8Array(yn),new Uint8Array(yn),new Uint8Array(yn),new Uint8Array(yn)];function bu(){let n=Ns[0],t=Ns[1],e=Ns[2],i=Ns[3];for(let c=0;c<ui;c++)for(let l=0;l<Wt;l++){let h=0,u=0,f=0;for(let g=0;g<Ds;g++)for(let v=0;v<Ds;v++){let m=l*Ds+v,p=c*Ds+g;if(m>=Ft||p>=Te){u++;continue}let M=p*Ft+m,_=ke[M];_===Se.AGUA?u++:_===Se.PONTE?(h++,u++,f++):ze[M]<0&&h++}let d=c*Wt+l;n[d]=h>=2||f>0?1:0,t[d]=u>=3?1:0,i[d]=n[d]||t[d]?1:0}let s=new Uint8Array(yn).fill(255),r=new Int32Array(yn),o=0,a=0;for(let c=0;c<yn;c++)t[c]||(s[c]=0,r[a++]=c);for(;o<a;){let c=r[o++],l=c%Wt,h=c/Wt|0,u=s[c]+1;u>20||(l>0&&s[c-1]>u&&(s[c-1]=u,r[a++]=c-1),l<Wt-1&&s[c+1]>u&&(s[c+1]=u,r[a++]=c+1),h>0&&s[c-Wt]>u&&(s[c-Wt]=u,r[a++]=c-Wt),h<ui-1&&s[c+Wt]>u&&(s[c+Wt]=u,r[a++]=c+Wt))}for(let c=0;c<yn;c++)e[c]=s[c]>=3?1:0}function Cr(n,t,e){let i=Math.floor(t/Pn),s=Math.floor(e/Pn);return i<0||s<0||i>=Wt||s>=ui?Ge&&(n===1||n===2):Ns[n][s*Wt+i]===1}function Mu(n,t,e=40){if(n[t])return t;let i=t%Wt,s=t/Wt|0;for(let r=1;r<=e;r++)for(let o=-r;o<=r;o++)for(let a=-r;a<=r;a++){if(Math.abs(a)!==r&&Math.abs(o)!==r)continue;let c=i+a,l=s+o;if(!(c<0||l<0||c>=Wt||l>=ui)&&n[l*Wt+c])return l*Wt+c}return-1}function In(n,t,e){let i=Math.max(0,Math.min(Wt-1,Math.floor(t/Pn))),s=Math.max(0,Math.min(ui-1,Math.floor(e/Pn))),r=Mu(Ns[n],s*Wt+i,60);return r<0?null:{x:(r%Wt+.5)*Pn,z:((r/Wt|0)+.5)*Pn}}var dc=new Float32Array(yn),vu=new Int32Array(yn),_u=new Uint32Array(yn),yu=new Uint32Array(yn),Us=1,ss=new Int32Array(yn),Qn=new Float32Array(yn),Fs=0;function dp(n,t){let e=Fs++;for(;e>0;){let i=e-1>>1;if(Qn[i]<=t)break;ss[e]=ss[i],Qn[e]=Qn[i],e=i}ss[e]=n,Qn[e]=t}function ry(){let n=ss[0],t=ss[--Fs],e=Qn[Fs],i=0;for(;;){let s=i*2+1;if(s>=Fs||(s+1<Fs&&Qn[s+1]<Qn[s]&&s++,Qn[s]>=e))break;ss[i]=ss[s],Qn[i]=Qn[s],i=s}return ss[i]=t,Qn[i]=e,n}var oy=[1,-1,0,0,1,1,-1,-1],ay=[0,0,1,-1,1,-1,1,-1],cy=[1,1,1,1,1.4142,1.4142,1.4142,1.4142];function ly(n,t,e){let i=t%Wt,s=t/Wt|0,r=e%Wt,o=e/Wt|0,a=Math.abs(r-i),c=Math.abs(o-s),l=i<r?1:-1,h=s<o?1:-1,u=a-c;for(;;){if(!n[s*Wt+i])return!1;if(i===r&&s===o)return!0;let f=u*2;if(f>-c&&f<a&&(!n[s*Wt+i+l]||!n[(s+h)*Wt+i]))return!1;f>-c&&(u-=c,i+=l),f<a&&(u+=a,s+=h)}}function Su(n,t,e,i,s,r=7e4){let o=Ns[n],a=(S,T)=>Math.max(0,Math.min(T-1,S)),c=Mu(o,a(Math.floor(e/Pn),ui)*Wt+a(Math.floor(t/Pn),Wt),12),l=Mu(o,a(Math.floor(s/Pn),ui)*Wt+a(Math.floor(i/Pn),Wt),40);if(c<0||l<0)return null;if(c===l)return[{x:i,z:s}];Us++,Fs=0;let h=l%Wt,u=l/Wt|0,f=S=>{let T=Math.abs(S%Wt-h),R=Math.abs((S/Wt|0)-u);return(T+R+(1.4142-2)*Math.min(T,R))*1.25};dc[c]=0,_u[c]=Us,vu[c]=-1,dp(c,f(c));let d=c,g=f(c),v=0,m=!1;for(;Fs>0&&v<r;){let S=ry();if(yu[S]===Us)continue;if(yu[S]=Us,v++,S===l){m=!0;break}let T=f(S);T<g&&(g=T,d=S);let R=S%Wt,E=S/Wt|0;for(let b=0;b<8;b++){let P=R+oy[b],N=E+ay[b];if(P<0||N<0||P>=Wt||N>=ui)continue;let D=N*Wt+P;if(!o[D]||yu[D]===Us||b>=4&&(!o[E*Wt+P]||!o[N*Wt+R]))continue;let F=dc[S]+cy[b];(_u[D]!==Us||F<dc[D])&&(_u[D]=Us,dc[D]=F,vu[D]=S,dp(D,F+f(D)))}}let p=m?l:d,M=[];for(let S=p;S!==-1;S=vu[S])M.push(S);M.reverse();let _=[M[0]],y=0;for(;y<M.length-1;){let S=Math.min(M.length-1,y+60);for(;S>y+1&&!ly(o,M[y],M[S]);)S--;_.push(M[S]),y=S}let I=_.slice(1).map(S=>({x:(S%Wt+.5)*Pn,z:((S/Wt|0)+.5)*Pn}));return m&&I.push({x:i,z:s}),I.length?I:[{x:i,z:s}]}var Ct=null,Mn=null,Ir=null,zr=null,zn=null,Lr=!0,Au={},Rr=null,Pr=null,vo=null;function Li(){if(Ct){Ct.state==="suspended"&&Ct.resume();return}let n=window.AudioContext||window.webkitAudioContext;if(!n)return;Ct=new n;let t=Ct.createDynamicsCompressor();t.threshold.value=-14,t.knee.value=10,t.ratio.value=6,t.attack.value=.003,t.release.value=.25,t.connect(Ct.destination),Mn=Ct.createGain(),Mn.gain.value=Lr?.6:0,Mn.connect(t);let e=Ct.sampleRate;zr=Ct.createBuffer(1,e*2,e),zn=Ct.createBuffer(1,e*2,e);let i=zr.getChannelData(0),s=zn.getChannelData(0),r=0;for(let l=0;l<i.length;l++)i[l]=Math.random()*2-1,r=(r+.02*i[l])/1.02,s[l]=r*3.5;let o=2.4,a=Ct.createBuffer(2,e*o,e);for(let l=0;l<2;l++){let h=a.getChannelData(l);for(let u=0;u<h.length;u++){let f=u/e,d=f>.06&&f<.075||f>.13&&f<.14||f>.21&&f<.22?.6:0;h[u]=(Math.random()*2-1)*(Math.exp(-f*2.6)*.5+d*Math.exp(-f*3))}}let c=Ct.createConvolver();c.buffer=a,Ir=Ct.createGain(),Ir.gain.value=.45,Ir.connect(c),c.connect(Mn)}function yo(n){Lr=n,Mn&&(Mn.gain.value=n?.6:0)}function on(n,t){let e=performance.now();return Au[n]&&e-Au[n]<t?!1:(Au[n]=e,!0)}function ce(n,t,e,i,s,r="lowpass",o=.2,a=0,c=zr,l=0){if(!Ct||!Lr||n<.005)return;let h=Ct.currentTime+a,u=Ct.createBufferSource();u.buffer=c,u.playbackRate.value=.9+Math.random()*.2;let f=Ct.createBiquadFilter();f.type=r,f.frequency.setValueAtTime(i,h),f.Q.value=s,l&&f.frequency.exponentialRampToValueAtTime(l,h+e);let d=Ct.createGain();if(d.gain.setValueAtTime(1e-4,h),d.gain.exponentialRampToValueAtTime(n,h+t),d.gain.exponentialRampToValueAtTime(1e-4,h+t+e),u.connect(f),f.connect(d),d.connect(Mn),o>0){let g=Ct.createGain();g.gain.value=o,d.connect(g),g.connect(Ir)}u.start(h,Math.random()*1.2,t+e+.05)}function Ce(n,t,e,i,s="sine",r=0,o=.15){if(!Ct||!Lr||n<.005)return;let a=Ct.currentTime+r,c=Ct.createOscillator();c.type=s,c.frequency.setValueAtTime(e,a),c.frequency.exponentialRampToValueAtTime(Math.max(15,i),a+t);let l=Ct.createGain();if(l.gain.setValueAtTime(n,a),l.gain.exponentialRampToValueAtTime(1e-4,a+t),c.connect(l),l.connect(Mn),o>0){let h=Ct.createGain();h.gain.value=o,l.connect(h),h.connect(Ir)}c.start(a),c.stop(a+t+.05)}function fi(n,t){if(!Ct||t<.015)return;let i=1-(1-t)*.75,s=.92+Math.random()*.16;switch(n){case"pistola":if(!on("pist",60))return;ce(t*.5*i,.001,.03,3200*s,.7,"highpass",.1),ce(t*.45,.002,.09,1400*s,1.2,"bandpass",.3),Ce(t*.25,.06,260,90);break;case"fuzil":if(!on("fuzil",40))return;ce(t*.7*i,.001,.025,4200*s,.6,"highpass",.15),ce(t*.55,.002,.1,1100*s,1.1,"bandpass",.35),Ce(t*.35,.08,200*s,70),ce(t*.18,.01,.45,900,.7,"lowpass",.9,.02);break;case"mg":case"m240":if(!on("mg",38))return;ce(t*.6*i,.001,.022,3600*s,.6,"highpass",.12),ce(t*.55,.002,.09,900*s,1,"bandpass",.35),Ce(t*.35,.07,170*s,60),Math.random()<.4&&ce(t*.15,.01,.4,800,.7,"lowpass",.9,.02);break;case"m134":if(!on("m134",30))return;ce(t*.5,.001,.05,1500*s,.8,"bandpass",.3),Ce(t*.25,.05,140,70,"square");break;case"sniper":if(!on("sn",80))return;ce(t*.95*i,.001,.03,3800,.6,"highpass",.2),ce(t*.8,.002,.18,700,.9,"bandpass",.5),Ce(t*.6,.22,140,38),ce(t*.35,.02,1.4,600,.6,"lowpass",1.2,.05);break;case"50cal":if(!on("50",55))return;ce(t*.7*i,.001,.03,2800*s,.6,"highpass",.2),ce(t*.75,.003,.16,520*s,1,"bandpass",.45),Ce(t*.55,.14,110*s,38),Math.random()<.5&&ce(t*.2,.01,.6,500,.6,"lowpass",1,.03);break;case"25mm":case"30mm":if(!on("ac",90))return;ce(t*.7*i,.001,.035,2400,.6,"highpass",.2),ce(t*.85,.003,.22,380*s,.9,"bandpass",.5),Ce(t*.7,.2,90*s,30),ce(t*.25,.02,.8,400,.6,"lowpass",1,.04,zn);break;case"120mm":case"155mm":case"naval":if(!on("can",120))return;ce(t*.9*i,.001,.05,2e3,.5,"highpass",.3),ce(t*1.2,.004,.9,260,.7,"lowpass",.9,0,zn,90),Ce(t*1.1,1.1,75,24),Ce(t*.5,.5,140,45,"triangle"),ce(t*.45,.05,2,300,.6,"lowpass",1.4,.32,zn),ce(t*.25,.05,1.6,250,.6,"lowpass",1.4,.75,zn);break;case"foguete":case"hellfire":if(!on("fog",110))return;ce(t*.8,.005,.15,600,.6,"lowpass",.4,0,zn),ce(t*.6,.06,.9,500,1.4,"bandpass",.6,0,zr,2600),Ce(t*.4,.4,90,40);break;case"gau8":{if(!on("gau",900))return;let r=Ct.currentTime,o=Ct.createOscillator();o.type="sawtooth",o.frequency.value=66;let a=Ct.createBiquadFilter();a.type="lowpass",a.frequency.value=900*i+200;let c=Ct.createGain();c.gain.setValueAtTime(1e-4,r),c.gain.exponentialRampToValueAtTime(t*.9,r+.05),c.gain.setValueAtTime(t*.9,r+1.6),c.gain.exponentialRampToValueAtTime(1e-4,r+1.9),o.connect(a),a.connect(c),c.connect(Mn);let l=Ct.createGain();l.gain.value=.6,c.connect(l),l.connect(Ir),o.start(r),o.stop(r+2),ce(t*.5,.01,1.7,500,.8,"bandpass",.6),ce(t*.4,.1,2.2,250,.6,"lowpass",1.2,1.7,zn);break}case"bomba":if(!on("bmb",150))return;Ce(t*.18,1.2,1400,500,"sine",0,.3);break;default:if(!on("def",100))return;ce(t*.6,.002,.2,700,.9,"bandpass",.4)}}function pc(n,t=!1){if(!Ct||n<.015||!on("exp",60))return;let e=t?1.3:1;ce(n*.8,.001,.06,1800,.5,"highpass",.3),ce(n*1.3*e,.005,1.4*e,420,.6,"lowpass",1,0,zn,70),Ce(n*1.1*e,1.3*e,62,18);for(let i=0;i<6;i++)ce(n*.12,.002,.05,3e3+Math.random()*3e3,1,"bandpass",.2,.15+Math.random()*.7);ce(n*.4*e,.1,2.5,220,.6,"lowpass",1.5,.35,zn)}function pp(n){if(!(!Ct||n<.02||!on("vidro",120))){ce(n*.5,.001,.12,4500,.8,"highpass",.2);for(let t=0;t<9;t++)Ce(n*.08,.06+Math.random()*.12,2500+Math.random()*4e3,2e3+Math.random()*3e3,"sine",.02+Math.random()*.35,.1)}}function Tu(n){if(!(!Ct||n<.02||!on("esm",200))){ce(n*.8,.002,.35,700,1.5,"bandpass",.3),Ce(n*.4,.25,160,60,"square");for(let t=0;t<4;t++)Ce(n*.06,.1,2e3+Math.random()*2500,1500,"sine",.05+Math.random()*.2,.05)}}function wu(n){if(!Ct||n<.03||!on("zb",700))return;let t=Ct.currentTime,e=85+Math.random()*70,i=Ct.createOscillator();i.type="sawtooth",i.frequency.setValueAtTime(e,t),i.frequency.linearRampToValueAtTime(e*.75,t+1.1);let s=Ct.createOscillator();s.frequency.value=6+Math.random()*4;let r=Ct.createGain();r.gain.value=6,s.connect(r),r.connect(i.frequency);let o=Ct.createBiquadFilter();o.type="bandpass",o.frequency.value=450+Math.random()*300,o.Q.value=4;let a=Ct.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(n*.35,t+.15),a.gain.exponentialRampToValueAtTime(1e-4,t+1.2),i.connect(o),o.connect(a),a.connect(Mn),i.start(t),s.start(t),i.stop(t+1.25),s.stop(t+1.25),ce(n*.06,.1,1,800,3,"bandpass",.2)}function Qt(n="clique"){if(Ct){if(n==="clique")Ce(.1,.05,900,700,"square",0,0);else if(n==="ok")Ce(.12,.07,660,660,"square",0,0),Ce(.12,.09,990,990,"square",.07,0);else if(n==="alerta")Ce(.15,.15,880,880,"square",0,0),Ce(.15,.15,660,660,"square",.18,0);else if(n==="erro")Ce(.13,.2,220,160,"square",0,0);else if(n==="resgate")Ce(.1,.1,523,523,"triangle",0,0),Ce(.1,.1,659,659,"triangle",.1,0),Ce(.1,.2,784,784,"triangle",.2,0);else if(n==="sirene"){let t=Ct.currentTime,e=Ct.createOscillator(),i=Ct.createGain();e.type="sawtooth";for(let r=0;r<3;r++)e.frequency.setValueAtTime(700,t+r*.6),e.frequency.linearRampToValueAtTime(1300,t+r*.6+.3),e.frequency.linearRampToValueAtTime(700,t+r*.6+.6);let s=Ct.createBiquadFilter();s.type="lowpass",s.frequency.value=2200,i.gain.setValueAtTime(1e-4,t),i.gain.exponentialRampToValueAtTime(.07,t+.1),i.gain.setValueAtTime(.07,t+1.6),i.gain.exponentialRampToValueAtTime(1e-4,t+1.8),e.connect(s),s.connect(i),i.connect(Mn),e.start(t),e.stop(t+1.85)}}}function _o(n,t,e,i){let s=Ct.createBufferSource();s.buffer=n,s.loop=!0;let r=Ct.createBiquadFilter();r.type=t,r.frequency.value=e,r.Q.value=i;let o=Ct.createGain();return o.gain.value=0,s.connect(r),r.connect(o),o.connect(Mn),s.start(),{f:r,g:o}}var Os=(n,t,e=.25)=>n.gain.setTargetAtTime(Lr?t:0,Ct.currentTime,e);function mp(n){if(Ct){if(!Rr){let t=_o(zr,"bandpass",320,.9),e=Ct.createOscillator();e.type="sawtooth",e.frequency.value=17;let i=Ct.createGain();i.gain.value=0,e.connect(i),i.connect(t.g.gain),e.start();let s=_o(zn,"lowpass",160,.7),r=Ct.createOscillator();r.type="sine",r.frequency.value=1750;let o=Ct.createGain();o.gain.value=0,r.connect(o),o.connect(Mn),r.start(),Rr={pas:t,lg:i,vento:s,tg:o}}Os(Rr.pas.g,n*.32),Rr.lg.gain.setTargetAtTime(Lr?n*.3:0,Ct.currentTime,.25),Os(Rr.vento.g,n*.5),Os(Rr.tg,n*n*.012)}}function gp(n){Ct&&(Pr||(Pr={ronco:_o(zn,"lowpass",300,.6),chiado:_o(zr,"bandpass",1800,.7)}),Os(Pr.ronco.g,n*.9,.35),Os(Pr.chiado.g,n*n*.35,.35),Pr.ronco.f.frequency.setTargetAtTime(200+n*500,Ct.currentTime,.3),Pr.chiado.f.frequency.setTargetAtTime(1200+n*2200,Ct.currentTime,.3))}function xp(n,t=.5){if(Ct){if(!vo){let e=_o(zn,"lowpass",140,.8),i=Ct.createOscillator();i.type="sawtooth",i.frequency.value=38;let s=Ct.createBiquadFilter();s.type="lowpass",s.frequency.value=180;let r=Ct.createGain();r.gain.value=0,i.connect(s),s.connect(r),r.connect(Mn),i.start(),vo={r:e,o:i,g:r}}Os(vo.r.g,n*.6),Os(vo.g,n*.06),vo.o.frequency.setTargetAtTime(32+t*30,Ct.currentTime,.4)}}var mc={comum:{hp:70,vel:4,vagar:.9,dano:12,cd:1,perc:32,esc:1},corredor:{hp:50,vel:7.2,vagar:1.4,dano:9,cd:.8,perc:40,esc:1},bruto:{hp:750,vel:3,vagar:.8,dano:45,cd:1.3,perc:30,esc:1.4},soldado:{hp:110,vel:4,vagar:1,dano:14,cd:1,perc:34,esc:1}},hy={raio:.4,slots:1};function Cu(n,t){return{agente:!0,id:x.idSeq++,x:n,z:t,y:0,ang:lt(0,6.28),zumbi:!1,sub:"civil",hp:30,vivo:!0,estado:"vagar",lider:null,alvo:null,t:lt(0,1),fase:lt(0,6),vel:0,dx:0,dz:0,cd:0,camisa:li(Kd),calca:li(Qd),pele:li(tp),cabelo:Math.random()<.9?li(ep):null,soldado:!1,dentro:null,virando:0,mortoT:0,casa:{x:n,z:t},d:hy,espera:0,acena:0,esc:1}}function gc(n,t){let e=Cu(n,t);return x.agentes.push(e),e}function Ru(n,t,e){let i=gc(n,t);return i.estado="seguir",i.lider=e,i.espera=0,i}function Pu(n,t,e="comum"){let i=Cu(n,t);return Mo(i,e),x.agentes.push(i),i}function Mo(n,t){n.zumbi=!0,n.sub=t;let e=mc[t];n.hp=e.hp,n.esc=e.esc,n.pele=li(np),t==="bruto"&&(n.camisa=Zn(4864819),n.calca=Zn(2829099)),n.camisa=n.camisa.map(i=>i*.75),n.estado="vagar",n.lider=null,n.alvo=null,n.t=lt(0,.5)}function vp(n){let t=Cu(n.x,n.z);t.soldado=!0,t.camisa=fo,t.calca=sc,Mo(t,"soldado"),t.camisa=fo.map(e=>e*.8),t.estado="morto",t.virando=3.5,t.vivo=!0,x.agentes.push(t),x.infectados++}function Ur(n,t,e){if(!(!n.vivo||n.estado==="morto")&&(n.hp-=t,n.zumbi&&Math.random()<.5&&x.efeitos.sangue(n.x,1.2,n.z,3),!(n.hp>0))){if(n.zumbi){n.estado="morto",n.mortoT=12,n.virando=0,x.zumbisMortos++,x.dinheiro+=n.sub==="bruto"?30:4,x.efeitos.sangue(n.x,1,n.z,6);return}e&&e.zumbi?(n.estado="morto",n.virando=3+lt(0,3),n.lider=null,x.infectados++):(n.estado="morto",n.mortoT=15,n.virando=0,x.civisMortos++,e&&!e.zumbi&&!e.agente&&x.tempo-(x._avisoFogo||-99)>20&&(x._avisoFogo=x.tempo,Yt("\u26A0\uFE0F Civis atingidos por fogo amigo!",n.x,n.z,"ruim"))),x.efeitos.sangue(n.x,1,n.z,8)}}function kn(n,t,e){let i=n.x+t,s=n.z+e;if(Ne(i,s))return n.x=i,n.z=s,!0;let r=Math.hypot(t,e)*.25;return Math.abs(t)>r&&Ne(i,n.z)?(n.x=i,!0):Math.abs(e)>r&&Ne(n.x,s)?(n.z=s,!0):!1}function uy(n){return n.vivo&&!n.dentro&&!n.predio&&(n.classe==="inf"||n.classe==="veic"||n.estr||n.classe==="aereo"&&n.y<2)}function fy(n){let t=mc[n.sub],e=t.perc*(x.noite?1.4:1),i=null,s=e*e;if(x.hashA.busca(n.x,n.z,e,(a,c)=>{!a.zumbi&&a.vivo&&!a.dentro&&a.estado!=="morto"&&c<s&&(s=c,i=a)}),x.hashU.busca(n.x,n.z,e,(a,c)=>{uy(a)&&c<s*.9&&(s=c,i=a)}),n.alvo=i,i){n.estado="perseguir";return}let r=null,o=1/0;for(let a of x.ruidos){let c=qe(n.x,n.z,a.x,a.z);c<a.r*a.r&&c<o&&(o=c,r=a)}if(r){n.estado="ruido",n.destino={x:r.x+lt(-15,15),z:r.z+lt(-15,15)};return}if((n.estado!=="ruido"||!n.destino||Ot(n.x,n.z,n.destino.x,n.destino.z)<5)&&(n.estado="vagar",Math.random()<.4)){let a=lt(0,6.28);n.dx=Math.sin(a),n.dz=Math.cos(a)}for(let[a,c]of[[2,0],[-2,0],[0,2],[0,-2]]){let l=zs(n.x+a,n.z+c);if(l&&l.guarnicao.length){if(l.integridade-=4,l.integridade<=0){l.integridade=0;let h=li(l.guarnicao);h&&x.danoUnidade(h,t.dano,!0)}break}}}function dy(n){if(n.campo){py(n);return}let t=null,e=20*20;if(x.hashA.busca(n.x,n.z,20,(i,s)=>{i.zumbi&&i.vivo&&i.estado!=="morto"&&s<e&&(e=s,t=i)}),t&&(n.estado!=="seguir"||e<64)){n.estado="fugir";let i=Math.sqrt(e)||1;n.dx=(n.x-t.x)/i,n.dz=(n.z-t.z)/i,n.medo=4;return}if(!(n.estado==="fugir"&&n.medo>0)){if(n.estado==="fugir"&&(n.estado=n.lider?"seguir":"vagar"),n.estado!=="seguir"){let i=null,s=16*16,r=!1;if(x.hashU.busca(n.x,n.z,70,(o,a)=>{!o.vivo||o.dentro||o.estr||(o.classe==="inf"||o.classe==="veic"||o.classe==="naval"&&o.d.carga||o.classe==="aereo"&&o.pousado&&o.d.carga)&&(a<s?(s=a,i=o):r=!0)}),i){n.estado="seguir",n.lider=i;return}n.acena=r?3:0}if(n.estado==="vagar"&&Math.random()<.3){let i=lt(0,6.28),s=Math.random()<.6;if(n.dx=s?Math.sin(i):0,n.dz=s?Math.cos(i):0,Ot(n.x,n.z,n.casa.x,n.casa.z)>60){let r=Ot(n.x,n.z,n.casa.x,n.casa.z);n.dx=(n.casa.x-n.x)/r,n.dz=(n.casa.z-n.z)/r}}}}function py(n){let t=n.campo;if(!t.ativo){n.campo=null,n.estado="vagar";return}if(n.estado="acampar",!n.armado){let e=!1;x.hashA.busca(n.x,n.z,10,i=>{i.zumbi&&i.vivo&&i.estado!=="morto"&&(e=!0)}),e&&(n.posto={x:t.x+lt(-3,3),z:t.z+lt(-3,3)})}}function my(n,t){if(n.cdTiro=(n.cdTiro||0)-t,n.mirando>0&&(n.mirando-=t),n.cdTiro>0)return;n.cdTiro=n.policial?.45:.75+Math.random()*.4;let e=n.policial?55:40,i=null,s=e*e;if(x.hashA.busca(n.x,n.z,e,(l,h)=>{l.zumbi&&l.vivo&&l.estado!=="morto"&&l.virando<=0&&h<s&&(s=h,i=l)}),!i)return;n.ang=Math.atan2(i.x-n.x,i.z-n.z),n.mirando=.8;let r=x.efeitos,o=n.x+Math.sin(n.ang)*.7,a=n.z+Math.cos(n.ang)*.7;r.clarao(o,1.4,a,.8);let c=Math.random()<(n.policial?.55:.38);r.tracante(o,1.4,a,i.x+(c?0:lt(-3,3)),1.1,i.z+(c?0:lt(-3,3)),[1,.85,.45]),c&&Ur(i,n.policial?18:22,n),fi(n.policial?"fuzil":"pistola",x.volEm(n.x,n.z)*.8),x.ruidos.push({x:n.x,z:n.z,r:90,t:x.tempo})}function _p(n){let t=x.agentes,e=0,i=0,s=x.noite;for(let r=t.length-1;r>=0;r--){let o=t[r];if(!o.vivo){t[r]=t[t.length-1],t.pop();continue}if(o.dentro){o.dentro.vivo?(o.x=o.dentro.x,o.z=o.dentro.z):o.vivo=!1,i++;continue}if(o.estado==="morto"){o.virando>0?(o.virando-=n,o.virando<=0&&(o.zumbi?(o.estado="vagar",o.hp=mc[o.sub].hp):Mo(o,gy()),o.y=0,wu(x.volEm(o.x,o.z)))):(o.mortoT-=n,o.mortoT<=0&&(o.vivo=!1));continue}if(o.zumbi?e++:i++,o.t-=n,o.cd-=n,o.medo>0&&(o.medo-=n),o.zumbi){let a=mc[o.sub];o.t<=0&&(o.t=lt(.3,.6),fy(o));let c=0;if(o.estado==="perseguir"&&o.alvo){let l=o.alvo;if(!l.vivo||l.dentro||l.predio||l.estado==="morto"||l.classe==="aereo"&&l.y>2)o.alvo=null,o.estado="vagar";else{let h=Ot(o.x,o.z,l.x,l.z),u=(l.d?l.d.raio:.4)+.9;if(h>u){let f=Math.atan2(l.x-o.x,l.z-o.z);if(o.ang=He(o.ang,f,6*n),c=a.vel*(s?1.25:1),!kn(o,Math.sin(o.ang)*c*n,Math.cos(o.ang)*c*n)){let d=o.id&1?1.3:-1.3;kn(o,Math.sin(o.ang+d)*c*n,Math.cos(o.ang+d)*c*n)}}else o.cd<=0&&(o.cd=a.cd,l.agente?Ur(l,a.dano+6,o):x.danoUnidade(l,l.classe==="inf"?a.dano:a.dano*(o.sub==="bruto"?1.5:.5),!0),Math.random()<.15&&wu(x.volEm(o.x,o.z)))}}else if(o.estado==="ruido"&&o.destino){let l=Math.atan2(o.destino.x-o.x,o.destino.z-o.z);o.ang=He(o.ang,l,3*n),c=a.vel*.7,kn(o,Math.sin(o.ang)*c*n,Math.cos(o.ang)*c*n)||kn(o,Math.sin(o.ang+1.2)*c*n,Math.cos(o.ang+1.2)*c*n)}else(o.dx||o.dz)&&(c=a.vagar,o.ang=He(o.ang,Math.atan2(o.dx,o.dz),2*n),kn(o,Math.sin(o.ang)*c*n,Math.cos(o.ang)*c*n)||(o.dx=-o.dx,o.dz=-o.dz));o.vel=c,o.fase+=n*c*2.2}else{o.t<=0&&(o.t=lt(.35,.7),dy(o));let a=0;if(o.estado==="fugir"){a=4.2;let c=Math.atan2(o.dx,o.dz);if(o.ang=He(o.ang,c,8*n),!kn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)){let l=o.id&1?1.4:-1.4;o.dx=Math.sin(o.ang+l),o.dz=Math.cos(o.ang+l)}}else if(o.estado==="seguir"){let c=o.lider;if(c&&c.dentro&&(c=o.lider=c.dentro),!c||!c.vivo)o.estado="vagar",o.lider=null;else if(c.predio){let l=c.predio;if(Ot(o.x,o.z,l.cx,l.cz)<l.raio+10){l.civis++,o.vivo=!1;continue}let u=Math.atan2(l.cx-o.x,l.cz-o.z);o.ang=He(o.ang,u,8*n),a=3.5,kn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)}else{let l=Ot(o.x,o.z,c.x,c.z),h=c.d?c.d.raio:.5,u=c.d&&c.d.carga;if(u&&l<h+6&&(c.classe!=="aereo"||c.pousado)&&x.vagas(c)>=1&&o.espera<=0){x.embarcarCivil(o,c);continue}o.espera>0&&(o.espera-=n);let f=u?h+2:3+o.id%4;if(l>f){let d=Math.atan2(c.x-o.x,c.z-o.z);if(o.ang=He(o.ang,d,8*n),a=l>12?4.2:2.2,!kn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)){let g=o.id&1?1.2:-1.2;kn(o,Math.sin(o.ang+g)*a*n,Math.cos(o.ang+g)*a*n)}}l>160&&(o.estado="vagar",o.lider=null)}}else if(o.estado==="acampar"&&o.campo){let c=o.campo,l=Ot(o.x,o.z,o.posto.x,o.posto.z);if(l>1.5){let h=Math.atan2(o.posto.x-o.x,o.posto.z-o.z);if(o.ang=He(o.ang,h,8*n),a=l>30?4:1.6,!kn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)){let u=o.id&1?1.3:-1.3;kn(o,Math.sin(o.ang+u)*a*n,Math.cos(o.ang+u)*a*n)}}else(!o.mirando||o.mirando<=0)&&(o.ang=He(o.ang,Math.atan2(o.x-c.x,o.z-c.z),2*n))}else(o.dx||o.dz)&&(a=1.3,o.ang=He(o.ang,Math.atan2(o.dx,o.dz),4*n),kn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)||(o.dx=-o.dx,o.dz=-o.dz));o.vel=a,o.fase+=n*a*2.4,o.armado&&my(o,n),a===0&&o.acena>0&&(o.acena-=n,o.fase+=n*6),(o.id+x.quadro)%20===0&&x.naZonaSegura(o.x,o.z,0)&&(o.vivo=!1,o.resgatado=!0,x.resgatados++,x.dinheiro+=40,x.resgateAcum=(x.resgateAcum||0)+1)}}x.nZumbis=e,x.nCivis=i}function gy(){let n=x.dia,t=Math.random();return n>=3&&t<.05?"bruto":n>=2&&t<.15||x.tempo>360&&t<.06?"corredor":"comum"}function yp(n,t){let e=x.agentes;for(let i=0;i<e.length;i++){let s=e[i];if(!s.vivo||s.dentro||!t(s.x,s.z))continue;let r=s.estado==="morto"?3:s.zumbi?1:s.vel===0&&s.acena>0?4:0,o=s.soldado?3:s.armado?s.policial?5:4:0,a=s.armado&&r===0&&s.mirando>0?2:r;n.add(s.x,s.y,s.z,s.ang,s.fase,a,s.camisa,s.calca,s.pele,o,s.esc,s.policial?null:s.cabelo,Math.min(1,s.vel/2.5))}}var xy={fuzil:[1,.9,.5],mg:[1,.8,.4],sniper:[1,1,.8],pistola:[1,.9,.5],"50cal":[1,.7,.3],"25mm":[1,.6,.2],"30mm":[1,.6,.2],m134:[1,.45,.2],m240:[1,.7,.3]},vy={fuzil:110,pistola:70,mg:140,sniper:160,"50cal":200,"25mm":260,"30mm":260,m134:220,m240:160,"120mm":450,"155mm":500,naval:500,foguete:450,hellfire:450,bomba:600};function Iu(n){return n.classe==="naval"?n.d.nav:0}function Ye(n,t,e,i=0,s={}){var a;let r=Bn[n],o={id:x.idSeq++,tipo:n,d:r,classe:r.classe,x:t,z:e,y:0,ang:i,hp:r.hp,hpMax:r.hp,caminho:null,wp:0,destino:null,ordem:null,alvo:null,cd:lt(0,.5),cd2:lt(0,1),busca:lt(0,.4),passageiros:[],cargaUsada:0,dentro:null,predio:null,vivo:!0,sel:!1,fase:lt(0,6),mirando:0,alt:0,altAlvo:0,torreAng:0,travado:0,salva:r.salva||0,recarga:0,municao:r.municao||0,estadoJato:"pronto",vx:0,vz:0,velAtual:0,repath:0,ultimaPos:{x:t,z:e},cura:0};return r.modelo&&(o.m=wr(r.modelo),x.cena.add(o.m.grupo)),o.classe==="aereo"&&(o.alt=(a=s.alt)!=null?a:0,o.altAlvo=o.alt),o.classe==="jato"&&(o.estadoJato="pronto",o.alt=9.5),x.unidades.push(o),Pp(o,0),o}function Dr(n){n.vivo=!1,n.sombra&&(x.cena.remove(n.sombra),n.sombra=null),n.m&&x.cena.remove(n.m.grupo),n.anel&&(x.cena.remove(n.anel),n.anel=null);let t=x.selecao.indexOf(n);t>=0&&x.selecao.splice(t,1)}function Ui(n,t){let e=x.porta;if(e&&e.vivo&&e.tipo==="portaavioes"){let s=n-e.x,r=t-e.z,o=Math.cos(-e.ang),a=Math.sin(-e.ang),c=s*o+r*a,l=-s*a+r*o;if(Math.abs(c)<34&&Math.abs(l)<158)return 9.2}let i=ci(n,t);return i>=0&&ze[i]>=0?Le[ze[i]].h:0}function ks(n,t,e=0){for(let s of x.abrigos||[]){if(!s.vivo||s.construindo>0)continue;let r=s.tipoEstr==="zona"?170:s.tipoEstr==="fob"?110:120;if(qe(n,t,s.x,s.z)<r*r)return!0}let i=x.porta;return!!(i&&i.vivo&&(e>7||i.aerodromo)&&qe(n,t,i.x,i.z)<170*170)}function bn(n,t){if(!x.camAlvo)return 0;let e=Math.hypot(n-x.camAlvo.x,t-x.camAlvo.z)+x.camDist*.6;return Qe(1-e/1400,0,1)}function Sc(n,t,e){x.ruidos.push({x:n,z:t,r:e*(x.noite?1.2:1),t:x.tempo})}function di(n,t){for(let e of n)!e.vivo||e.estr||e.dentro||(e.ordem=Object.assign({},t),e.alvo=null,e.caminho=null,e.repath=0,e.predio&&(t.tipo==="mover"||t.tipo==="embarcar"||t.tipo==="guarnecer")&&Eo(e))}function pi(n,t,e){let i=n.filter(c=>c.vivo&&!c.dentro&&!c.estr);if(!i.length)return;let s=i.filter(c=>c.classe==="jato");for(let c of s)Mp(c,t,e);let r=i.filter(c=>c.classe!=="jato"),o=r.length,a=Math.ceil(Math.sqrt(o));r.sort((c,l)=>qe(c.x,c.z,t,e)-qe(l.x,l.z,t,e)),r.forEach((c,l)=>{let h=Math.max(4,c.d.raio*2.6),u=(l%a-(a-1)/2)*h,f=(Math.floor(l/a)-(a-1)/2)*h,d=t+u,g=e+f;c.predio&&Eo(c),c.ordem={tipo:"mover",x:d,z:g},c.alvo=null,c.caminho=null,c.repath=0,c.classe==="aereo"&&(c.altAlvo=c.d.altCruz,c.pousado=!1)})}function Mp(n,t,e){var i;if(n.estadoJato==="rearmando"){Yt(`${n.d.nome} est\xE1 sendo rearmado`,n.x,n.z);return}if(n.estadoJato==="pousando"){Yt(`${n.d.nome} est\xE1 pousando`,n.x,n.z);return}if(n.ordem={tipo:"ataque",x:t,z:e},n.estadoJato==="pronto"){let s=Nu(n),r=Cp(s),o=_c(s,r.dx,r.d0);n.x=o.x,n.z=o.z,n.y=((i=s.deck)!=null?i:9.2)+.2,n.ang=s.ang,n.velAtual=Fu(s)?15:0,n.estadoJato="decolando",n.lancou=!1,n.saidaPt=null,n.m&&(n.m.grupo.visible=!0)}else n.estadoJato!=="decolando"&&(n.estadoJato="voando");n.passe=0}function bp(n,t,e,i,s,r){n.forEach((o,a)=>{if(o.estadoJato==="rearmando"||o.estadoJato==="pousando"){Yt(`${o.d.nome} est\xE1 pousando/rearmando`,o.x,o.z);return}Mp(o,(t+i)/2,(e+s)/2);let c=a%2===1;o.ordem={tipo:"area",ax:c?i:t,az:c?s:e,bx:c?t:i,bz:c?e:s,w:r,fase:"aprox",soltas:0,deslocamento:(a-(n.length-1)/2)*Math.min(25,r/3)}})}function _y(n,t,e){let i=n.d,s=t.bx-t.ax,r=t.bz-t.az,o=Math.max(1,Math.hypot(s,r)),a=s/o,c=r/o,l=-c*t.deslocamento,h=a*t.deslocamento,u,f,d=i.arma==="canhao"?45:i.arma==="bomba"?130:80;if(t.fase==="aprox")u=t.ax-a*900+l,f=t.az-c*900+h,d=i.altCruz,Ot(n.x,n.z,u,f)<220&&(t.fase="alinhar");else if(t.fase==="alinhar")u=t.ax+l,f=t.az+h,(Ot(n.x,n.z,u,f)<120||(n.x-t.ax)*a+(n.z-t.az)*c>-30)&&(t.fase="corrida",t.soltas=0);else{u=t.bx+a*500+l,f=t.bz+c*500+h;let g=(n.x-t.ax)*a+(n.z-t.az)*c,v=i.arma==="canhao"?40:i.arma==="bomba"?i.bombas?8:6:10,m=o/v,p=i.arma==="canhao"?170:i.arma==="bomba"?n.velAtual*.6*Math.sqrt(2*n.y/9.8)*.5:120;for(;t.soltas<v&&g+p>=t.soltas*m+m/2;){let M=Math.min(o,t.soltas*m+m/2),_=lt(-t.w/2,t.w/2),y=t.ax+a*M-c*_+l*.3,I=t.az+c*M+a*_+h*.3;i.arma==="canhao"?(x.efeitos.tracante(n.x+Math.sin(n.ang)*9,n.y-.4,n.z+Math.cos(n.ang)*9,y,.5,I,[1,.55,.2]),Ac(y,.3,I,i.splash,i.dano,n,!0),t.soltas===0&&fi("gau8",bn(n.x,n.z))):i.arma==="bomba"?So(n.x,n.y,n.z,y,I,{arma:"bomba",dano:i.dano,splash:i.splash,precisao:1},n):So(n.x,n.y-1,n.z,y,I,{arma:"foguete",dano:i.dano,splash:i.splash,precisao:1,missil:!0},n),t.soltas++,t.soltas===1&&Sc(t.ax,t.az,700),i.arma!=="canhao"&&fi(i.arma==="bomba"?"bomba":"foguete",bn(n.x,n.z))}if(g>o+450)if(n.municao--,n.municao<=0)n.estadoJato="voltando",n.ordem=null,Yt(`${i.nome} lan\xE7ou toda a carga, voltando ao porta-avi\xF5es`,n.x,n.z);else{let M=t.ax,_=t.az;t.ax=t.bx,t.az=t.bz,t.bx=M,t.bz=_,t.fase="aprox",t.deslocamento=-t.deslocamento}}return{tx:u,tz:f,alt:d}}function yc(n,t,e){let i=t-n.cx,s=e-n.cz,r=Math.hypot(i,s)||1;for(let o=n.raio*.5;o<n.raio+60;o+=Ae*.7)for(let a of[0,.4,-.4,.8,-.8,1.4,-1.4,2.2,-2.2,3.1]){let c=Math.atan2(i/r,s/r)+a,l=n.cx+Math.sin(c)*o,h=n.cz+Math.cos(c)*o;if(Ne(l,h))return{x:l,z:h}}return{x:n.cx,z:n.cz}}function yy(n,t){let e=Math.max(4,n.cap),i=t/e*Math.PI*2+.3;for(let s=.7;s>.05;s-=.15){let r=n.cx+Math.sin(i)*n.raio*s,o=n.cz+Math.cos(i)*n.raio*s;if(co(n,r,o))return{x:r,z:o}}return{x:n.cx+lt(-1,1),z:n.cz+lt(-1,1)}}function My(n,t){let e=n.pts.length/2,i=Math.max(1,Math.floor((n.h-3)/3.4));for(let s=0;s<12;s++){let r=(t*5+s*3+n.id)%e,o=(r+1)%e,a=n.pts[r*2],c=n.pts[r*2+1],l=n.pts[o*2],h=n.pts[o*2+1],u=l-a,f=h-c,d=Math.hypot(u,f);if(d<4)continue;let g=.2+(t*.37+s*.21)%.6,v=-f/d,m=u/d,p=1+(t+s)%Math.min(i,6),M=Math.min(n.h-2.6,p*3.4+.2),_=a+u*g+v*.28,y=c+f*g+m*.28;if(!by(_+v*3,y+m*3))return{x:_,z:y,y:M,nx:v,nz:m}}return null}function by(n,t){let e=ci(n,t);return e>=0&&ze[e]>=0}function Sy(n,t){if(t.guarnicao.length>=t.cap)return Yt(`Pr\xE9dio cheio (${t.cap} soldados)`,t.cx,t.cz),!1;t.guarnicao.push(n),n.predio=t;let e=t.guarnicao.length-1,i=t.h>6&&e%2===0?My(t,e):null;if(i)n.x=i.x,n.z=i.z,n.y=i.y,n.janela={nx:i.nx,nz:i.nz,ang:Math.atan2(i.nx,i.nz),quebrou:!1},n.ang=n.janela.ang;else{let s=yy(t,e);n.x=s.x,n.z=s.z,n.y=t.h,n.janela=null}return n.ordem=null,n.caminho=null,t.integridade<=0&&(t.integridade=30),t.sos&&t.civis>0&&Sp(t,n),!0}function Eo(n){let t=n.predio;if(!t)return;t.guarnicao=t.guarnicao.filter(i=>i!==n);let e=yc(t,n.x+lt(-5,5),n.z+lt(-5,5));n.x=e.x+lt(-2,2),n.z=e.z+lt(-2,2),n.y=0,Ne(n.x,n.z)||(n.x=e.x,n.z=e.z),n.predio=null,n.janela=null}function Sp(n,t){if(!n.civis)return;let e=yc(n,t.x,t.z),i=n.civis;for(let s=0;s<i;s++)Ru(e.x+lt(-3,3),e.z+lt(-3,3),t);n.civis=0,n.sos=!1,Yt(`${i} civis sa\xEDram do pr\xE9dio e est\xE3o seguindo suas tropas!`,n.cx,n.cz,"bom"),Qt("resgate")}function Ey(n){return n.classe==="inf"?"inf":n.classe==="veic"?n.d.leve?"leve":"veic":null}function Ec(n,t){if(!n.d.carga||n===t)return!1;let e=Ey(t);if(!e)return!1;let i=n.d.cargaTipos;return i.includes(e)||e==="leve"&&i.includes("veic")?n.cargaUsada+(t.d.slots||1)<=n.d.carga:!1}function Nr(n){return(n.d.carga||0)-n.cargaUsada}function Ay(n){return n.classe==="aereo"?n.pousado:!0}function zu(n,t){if(!Ec(t,n))return!1;n.dentro=t,t.passageiros.push(n),t.cargaUsada+=n.d.slots||1,n.predio&&Eo(n),n.m&&(n.m.grupo.visible=!1),n.anel&&(x.cena.remove(n.anel),n.anel=null);let e=x.selecao.indexOf(n);return e>=0&&(x.selecao.splice(e,1),n.sel=!1),n.ordem=null,n.caminho=null,!0}function Lu(n,t){return Nr(t)<1?!1:(n.dentro=t,t.passageiros.push(n),t.cargaUsada+=1,!0)}function Di(n){if(!n.passageiros.length)return;if(n.classe==="aereo"&&!n.pousado){n.ordem={tipo:"pousar",desembarcar:!0};return}let t=ks(n.x,n.z,n.y),e=0;for(let i of n.passageiros.slice()){if(i.agente&&t)continue;let s=n.x,r=n.z;for(let o=0;o<30;o++){let a=e*.9+o*.5,c=n.d.raio+2+o*.8+e%4,l=n.x+Math.sin(a)*c,h=n.z+Math.cos(a)*c;if(Ne(l,h)){s=l,r=h;break}}e++,n.passageiros.splice(n.passageiros.indexOf(i),1),n.cargaUsada-=i.agente?1:i.d.slots||1,i.dentro=null,i.x=s,i.z=r,i.y=0,i.agente?(i.estado="seguir",i.lider=n,i.espera=6):i.m&&(i.m.grupo.visible=!0)}t&&Mc(n)}function Mc(n){let t=0;for(let e of n.passageiros.slice())e.agente&&(n.passageiros.splice(n.passageiros.indexOf(e),1),n.cargaUsada-=1,e.vivo=!1,e.resgatado=!0,e.dentro=null,t++);t&&(x.resgatados+=t,x.dinheiro+=t*40,Yt(`\u2705 ${t} civis resgatados! (+$${t*40})`,n.x,n.z,"bom"),Qt("resgate"))}function Bs(n){return n&&n.vivo&&n.zumbi&&!n.dentro&&n.virando<=0}function bc(n,t,e,i=0){let s=n.x,r=n.z;if(!e){let h=null,u=1/0,f=i*i,d=n.janela;return x.hashA.busca(s,r,t,(g,v)=>{if(g.zumbi&&g.vivo&&!g.dentro&&g.virando<=0&&v<u&&v>=f){if(d&&(g.x-s)*d.nx+(g.z-r)*d.nz<Math.sqrt(v)*.25)return;u=v,h=g}}),h}let o=[],a=i*i;if(x.hashA.busca(s,r,t,(h,u)=>{if(h.zumbi&&h.vivo&&!h.dentro&&u>=a&&(o.push(h),o.length>50))return!0}),!o.length)return null;let c=null,l=0;for(let h=0;h<o.length;h+=o.length>25?2:1){let u=o[h],f=0,d=0;x.hashA.busca(u.x,u.z,e,m=>{!m.vivo||m.dentro||(m.zumbi?f++:d++)});let g=0;if(x.hashU.busca(u.x,u.z,e+4,m=>{m.vivo&&!m.dentro&&m.classe!=="aereo"&&m.classe!=="jato"&&g++}),g>0)continue;let v=f-d*3;v>l&&(l=v,c=u)}return c}function Ty(n){if(n.m&&n.m.def.canoZ!==void 0&&n.m.torre){let t=n.ang+n.torreAng,e=n.m.def,i=e.torreZ,s=e.canoZ;return{x:n.x+Math.sin(n.ang)*i+Math.sin(t)*s,y:n.y+e.torreY+e.canoY,z:n.z+Math.cos(n.ang)*i+Math.cos(t)*s}}return n.m&&n.m.def.armaZ?{x:n.x+Math.sin(n.ang)*n.m.def.armaZ,y:n.y+n.m.def.armaY,z:n.z+Math.cos(n.ang)*n.m.def.armaZ}:n.classe==="aereo"?{x:n.x+Math.sin(n.ang)*2,y:n.y+1.5,z:n.z+Math.cos(n.ang)*2}:{x:n.x+Math.sin(n.ang)*.7,y:n.y+1.25,z:n.z+Math.cos(n.ang)*.7}}function vc(n,t,e){let i=Ty(n),s=t.x,r=t.z,o=(t.y||0)+1.1,a=Math.hypot(s-n.x,r-n.z),c=x.efeitos,l=bn(n.x,n.z);if(Sc(n.x,n.z,vy[e.arma]||150),n.janela&&!n.janela.quebrou){n.janela.quebrou=!0;for(let d=0;d<14;d++)c.particula(n.x,n.y+1.3,n.z,n.janela.nx*lt(1,3)+lt(-1,1),lt(0,2),n.janela.nz*lt(1,3)+lt(-1,1),.18,1.2,[.8,.92,1],[.6,.75,.85],.9,9.8,0);pp(l)}if(e.missil||e.arma==="120mm"||e.arco||e.arma==="foguete"){let d=s+lt(-1,1)*(1-e.precisao)*12,g=r+lt(-1,1)*(1-e.precisao)*12;So(i.x,i.y,i.z,d,g,e,n),c.clarao(i.x,i.y,i.z,e.arma==="120mm"?4:2.5);for(let v=0;v<4;v++)c.fumaca(i.x,i.y,i.z,2.5);fi(e.arma,l);return}let h=e.precisao*(1-a/(e.alcance*1.3)*.4)*(x.noite?.85:1),u=Math.random()<h,f=xy[e.arma]||[1,.85,.4];c.clarao(i.x,i.y,i.z,e.arma==="fuzil"||e.arma==="pistola"?.9:1.5),u?(c.tracante(i.x,i.y,i.z,s,o,r,f),e.splash?Ac(s,.5,r,e.splash,e.dano,n,!0):Ur(t,e.dano,n)):c.tracante(i.x,i.y,i.z,s+lt(-3,3),o+lt(-1,1),r+lt(-3,3),f),fi(e.arma,l)}function So(n,t,e,i,s,r,o){let a=Math.hypot(i-n,s-e),c=r.arma==="120mm"?900:r.arco?260:r.arma==="bomba"?0:r.missil?140:200,l={x0:n,y0:t,z0:e,tx:i,tz:s,t:0,x:n,y:t,z:e,dur:r.arma==="bomba"?Math.sqrt(2*Math.max(5,t)/9.8):Math.max(.12,a/c),arco:r.arco?Math.min(400,a*.35):r.missil?Math.min(60,a*.12):r.arma==="foguete"?a*.08:0,dano:r.dano,raio:r.splash||3,arma:r.arma,dono:o,rastro:r.arma!=="120mm",vx:o&&o.classe==="jato"?Math.sin(o.ang)*o.velAtual*.6:0,vz:o&&o.classe==="jato"?Math.cos(o.ang)*o.velAtual*.6:0};r.arma==="bomba"&&(l.tx=n+l.vx*l.dur,l.tz=e+l.vz*l.dur,l.tx=i,l.tz=s),x.projeteis.push(l)}function Ep(n){let t=x.efeitos;for(let e=x.projeteis.length-1;e>=0;e--){let i=x.projeteis[e];i.t+=n;let s=Math.min(1,i.t/i.dur),r=i.x,o=i.y,a=i.z;i.x=i.x0+(i.tx-i.x0)*s,i.z=i.z0+(i.tz-i.z0)*s,i.arma==="bomba"?i.y=i.y0*(1-s*s):i.y=i.y0+(.5-i.y0)*s+Math.sin(s*Math.PI)*i.arco,i.rastro&&t.esteira(r,o,a),t.particula(i.x,i.y,i.z,0,0,0,i.arma==="naval"||i.arma==="155mm"?1.2:.9,.05,[1,.9,.6],[1,.6,.2],1),s>=1&&(Ac(i.x,.5,i.z,i.raio,i.dano,i.dono,!1),x.projeteis.splice(e,1))}}function Ac(n,t,e,i,s,r,o){let a=Is(n,e)&&Ui(n,e)===0;!o||i>2?x.efeitos.explosao(n,t,e,i*.8,a):x.efeitos.particula(n,t,e,0,2,0,i,.3,[1,.8,.3],[.4,.4,.4],1,0,i),i>=6&&pc(bn(n,e),i>=15),Sc(n,e,i>=6?500:200);let c=i*i;x.hashA.busca(n,e,i*1.3,(l,h)=>{if(!l.vivo||l.dentro)return;let u=h<c?1-Math.sqrt(h)/i*.6:.25;Ur(l,s*u,r)}),x.tremor!==void 0&&i>=10&&(x.tremor=Math.max(x.tremor,Math.min(1,i/30)*bn(n,e)))}function Ap(n){for(let t=x.unidades.length-1;t>=0;t--){let e=x.unidades[t];if(!e.vivo){x.unidades.splice(t,1);continue}if(e.estr){Uy(e,n);continue}if(e.dentro){e.x=e.dentro.x,e.z=e.dentro.z,e.y=e.dentro.y,e.dentro.d.cura&&e.hp<e.hpMax&&(e.hp=Math.min(e.hpMax,e.hp+e.dentro.d.cura*n));continue}switch(e.fase+=n*(e.velAtual>.3?e.velAtual*1.6:0),e.mirando>0&&(e.mirando-=n),e.classe){case"inf":wy(e,n);break;case"veic":Cy(e,n);break;case"naval":Ry(e,n);break;case"aereo":Py(e,n);break;case"jato":Iy(e,n);break}e.classe!=="jato"&&zy(e,n),e.d.carga&&Ly(e,n),Pp(e,n)}}function Uu(n,t){let e=n.ordem;if(!e)return null;if(e.tipo==="mover")return{x:e.x,z:e.z,fim:()=>{n.ordem=null}};if(e.tipo==="atacar"){if(!Bs(e.alvo))return n.ordem=null,null;n.alvo=e.alvo;let i=(n.d.alcance||50)*.85;return Ot(n.x,n.z,e.alvo.x,e.alvo.z)<i?null:{x:e.alvo.x,z:e.alvo.z,dinamico:!0}}if(e.tipo==="guarnecer"){let i=e.predio;return e.e||(e.e=yc(i,n.x,n.z)),Ot(n.x,n.z,e.e.x,e.e.z)<7?(Sy(n,i),null):{x:e.e.x,z:e.e.z}}if(e.tipo==="resgatar"){let i=e.predio;return!i.sos||i.civis<=0?(n.ordem=null,null):(e.e||(e.e=yc(i,n.x,n.z)),Ot(n.x,n.z,e.e.x,e.e.z)<9||Ot(n.x,n.z,i.cx,i.cz)<i.raio+12?(Sp(i,n),n.ordem=null,null):{x:e.e.x,z:e.e.z})}if(e.tipo==="embarcar"){let i=e.t;return!i.vivo||!Ec(i,n)?(n.ordem=null,null):Ot(n.x,n.z,i.x,i.z)<i.d.raio+6?Ay(i)?(zu(n,i),null):(i.classe==="aereo"&&(!i.ordem||i.ordem.tipo!=="pousar")&&(i.ordem={tipo:"pousar"}),null):{x:i.x,z:i.z,dinamico:!0}}return null}function Du(n,t,e,i,s){if(!e){n.velAtual=0;return}let r=Math.max(2.5,n.d.raio*1.5);if(Ot(n.x,n.z,e.x,e.z)<r){n.velAtual=0,n.caminho=null,e.fim&&e.fim();return}if(n.repath-=t,(!n.caminho||e.dinamico||n.caminhoAlvo&&Ot(n.caminhoAlvo.x,n.caminhoAlvo.z,e.x,e.z)>15)&&n.repath<=0)if(x.orcamentoCaminhos<=0){if(n.caminho||(n.velAtual=0),!n.caminho)return}else{let f=x.cacheCam||(x.cacheCam=[]),d=null;for(let g of f)if(g.modo===s&&x.tempo-g.t<4&&Ot(g.sx,g.sz,n.x,n.z)<45&&Ot(g.ex,g.ez,e.x,e.z)<45){d=g;break}if(d?n.caminho=d.pts.slice(0,-1).concat([{x:e.x,z:e.z}]):(x.orcamentoCaminhos--,n.caminho=Su(s,n.x,n.z,e.x,e.z),n.caminho&&(f.push({modo:s,sx:n.x,sz:n.z,ex:e.x,ez:e.z,pts:n.caminho,t:x.tempo}),f.length>20&&f.shift())),n.caminhoAlvo={x:e.x,z:e.z},n.wp=0,n.repath=2.5,!n.caminho){n.ordem=null,n.velAtual=0;return}}if(!n.caminho){n.velAtual=0;return}let o=n.caminho[n.wp];if(!o){n.caminho=null,n.velAtual=0,e.fim?e.fim():n.repath=1.2;return}let a=n.wp===n.caminho.length-1;if(Ot(n.x,n.z,o.x,o.z)<(a?r:Math.max(4,n.d.raio*2))&&(n.wp++,o=n.caminho[n.wp],!o)){n.caminho=null,n.velAtual=0,e.fim?e.fim():n.repath=1.2;return}let c=Math.atan2(o.x-n.x,o.z-n.z),l=n.classe==="inf"?10:n.classe==="naval"?n.d.raio>20?.25:.9:2.2;n.ang=He(n.ang,c,l*t);let h=Math.max(.15,Math.cos(Ii(n.ang,c))),u=i*h;n.velAtual=u,Tp(n,Math.sin(n.ang)*u*t,Math.cos(n.ang)*u*t,s)}function bo(n,t,e,i){return i===0?Ne(t,e):i===3?Ne(t,e)||Cr(1,t,e):Cr(i,t,e)}function Tp(n,t,e,i){let s=n.x+t,r=n.z+e;if(bo(n,s,r,i))n.x=s,n.z=r;else if(Math.abs(t)>Math.hypot(t,e)*.25&&bo(n,n.x+t,n.z,i))n.x+=t;else if(Math.abs(e)>Math.hypot(t,e)*.25&&bo(n,n.x,n.z+e,i))n.z+=e;else{let o=!1;for(let a of[.6,-.6,1.2,-1.2]){let c=Math.cos(a),l=Math.sin(a),h=t*c-e*l,u=t*l+e*c;if(bo(n,n.x+h,n.z+u,i)){n.x+=h,n.z+=u,o=!0;break}}o||(n.travado+=.1,n.travado>1.5&&(i===0||i===3)&&(n.x=s,n.z=r))}n.checa=(n.checa||0)+.016,n.checa>1.2&&(n.checa=0,Ot(n.x,n.z,n.ultimaPos.x,n.ultimaPos.z)<1&&n.velAtual>.5?(n.caminho=null,n.repath=0,n.travado++):n.travado=0,n.travado>4&&(n.ordem=null,n.caminho=null,n.travado=0),n.ultimaPos.x=n.x,n.ultimaPos.z=n.z)}function wp(n,t){x.hashU.busca(n.x,n.z,n.d.raio*2+1,(e,i)=>{if(e===n||!e.vivo||e.dentro||e.predio||e.classe!==n.classe||e.estr)return;let s=n.d.raio+e.d.raio;if(i<s*s&&i>1e-4){let r=Math.sqrt(i),o=(s-r)/r*.5*Math.min(1,t*8),a=(n.x-e.x)*o,c=(n.z-e.z)*o;bo(n,n.x+a,n.z+c,Iu(n))&&(n.x+=a,n.z+=c)}})}function wy(n,t){if(x.controlando===n){Tc(n,t);return}if(n.predio){n.velAtual=0;return}let e=Uu(n,t);Du(n,t,e,n.d.vel*(x.noite?.95:1),0),wp(n,t),n.d.cura&&(n.cura-=t,n.cura<=0&&(n.cura=1,x.hashU.busca(n.x,n.z,14,i=>{i.vivo&&i.classe==="inf"&&!i.dentro&&i.hp<i.hpMax&&(i.hp=Math.min(i.hpMax,i.hp+n.d.cura))})))}function Cy(n,t){if(x.controlando===n)Tc(n,t);else{let e=Uu(n,t);Du(n,t,e,n.d.vel,0)}wp(n,t),n.velAtual>3&&(Math.random()<t*4&&x.efeitos.poeira(n.x-Math.sin(n.ang)*n.d.raio,n.z-Math.cos(n.ang)*n.d.raio,1),n.d.raio>=3.4&&(n.tEsm=(n.tEsm||0)-t,n.tEsm<=0&&(n.tEsm=.25,fu(n.x,n.z,n.d.raio+.8)&&(Tu(bn(n.x,n.z)),x.efeitos.poeira(n.x,n.z,4)))),n.d.atropela&&x.hashA.busca(n.x,n.z,n.d.raio+.6,e=>{e.vivo&&e.zumbi&&!e.dentro&&Ur(e,(e.sub==="bruto"?40:200)*t*n.velAtual/8,n)}))}function Ry(n,t){if(x.controlando===n)Tc(n,t);else{let e=Uu(n,t);Du(n,t,e,n.d.vel,Iu(n))}if(n.velAtual>2&&Math.random()<t*6){let e=n.d.raio*1.2;x.efeitos.particula(n.x-Math.sin(n.ang)*e+lt(-2,2),.4,n.z-Math.cos(n.ang)*e+lt(-2,2),0,.5,0,n.d.raio*.25,2.5,[.95,.97,1],[.7,.8,.9],.5,0,n.d.raio*.15)}n.y=n.tipo==="lcac"?.4:0,n.tipo==="lcac"&&Math.random()<t*5&&x.efeitos.particula(n.x+lt(-8,8),.5,n.z+lt(-8,8),0,1,0,3,1,[.9,.9,.95],[.8,.8,.8],.35,0,3)}function Py(n,t){let e=n.d,i=n.ordem,s=null;if(x.controlando===n)Tc(n,t);else if(i)if(i.tipo==="pousar"){let o=Ui(n.x,n.z);if(Is(n.x,n.z)&&o===0){let c=In(0,n.x,n.z);c?n.ordem={tipo:"mover",x:c.x,z:c.z,pousar:!0,desembarcar:i.desembarcar}:n.ordem=null}else n.altAlvo=o,n.y<=o+.3&&(n.pousado=!0,i.desembarcar?(n.ordem=null,Di(n)):n.ordem=null,ks(n.x,n.z,n.y)&&Mc(n))}else if(i.tipo==="mover")s={x:i.x,z:i.z},Ot(n.x,n.z,i.x,i.z)<3&&(i.pousar?n.ordem={tipo:"pousar",desembarcar:i.desembarcar}:n.ordem=null,e.orbita&&(n.orbita={x:i.x,z:i.z}));else if(i.tipo==="resgatar"){let o=i.predio;if(s={x:o.cx,z:o.cz},Ot(n.x,n.z,o.cx,o.cz)<Math.max(4,o.raio*.5)){if(n.altAlvo=o.h+6,s=null,n.y<o.h+9){if(e.carga&&o.civis>0){let a=0;for(;o.civis>0&&Nr(n)>=1;){let c=Ru(o.cx,o.cz,n);Lu(c,n),o.civis--,a++}a&&(Yt(`\u{1F681} ${a} civis embarcaram pelo telhado!`,o.cx,o.cz,"bom"),Qt("resgate")),o.civis<=0?o.sos=!1:Yt(`Helic\xF3ptero cheio! Ainda h\xE1 ${o.civis} civis no telhado`,o.cx,o.cz)}n.ordem=null,n.altAlvo=e.altCruz}}else n.altAlvo=Math.max(e.altCruz,o.h+15)}else if(i.tipo==="atacar")Bs(i.alvo)?(n.alvo=i.alvo,Ot(n.x,n.z,i.alvo.x,i.alvo.z)>e.alcance*.7&&(s={x:i.alvo.x,z:i.alvo.z})):n.ordem=null;else if(i.tipo==="pousarPorta"){let o=x.porta;s={x:o.x+Math.sin(o.ang)*i.k,z:o.z+Math.cos(o.ang)*i.k},Ot(n.x,n.z,s.x,s.z)<4&&(n.ordem={tipo:"pousar",desembarcar:!1},s=null)}else i.tipo==="embarcar"&&(n.ordem=null);if(e.orbita&&!s&&n.orbita&&!(i&&i.tipo==="pousar")&&(n.orbAng=(n.orbAng||0)+t*e.vel/e.orbita,s={x:n.orbita.x+Math.sin(n.orbAng)*e.orbita,z:n.orbita.z+Math.cos(n.orbAng)*e.orbita}),s){n.pousado&&(n.pousado=!1),n.altAlvo<e.altCruz*.6&&!(i&&i.tipo==="resgatar")&&(n.altAlvo=e.altCruz);let o=n.y<Math.min(n.altAlvo,Ui(n.x,n.z)+12)-1,a=Math.atan2(s.x-n.x,s.z-n.z);n.ang=He(n.ang,a,(e.orbita?.8:2)*t);let c=Ot(n.x,n.z,s.x,s.z),l=(o?e.vel*.15:e.vel)*Math.min(1,c/40+.15)*Math.max(.2,Math.cos(Ii(n.ang,a)));n.velAtual+=(l-n.velAtual)*Math.min(1,t*1.5),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t}else x.controlando!==n&&(n.velAtual*=Math.max(0,1-t*2),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t);let r=Ui(n.x,n.z);if(n.pousado)n.y=r;else{let o=n.altAlvo;(s||i&&i.tipo!=="pousar")&&(o=Math.max(o,r+(i&&i.tipo==="resgatar"&&!s?4:10))),n.y+=Qe(o-n.y,-8*t,10*t),n.y<r&&(n.y=r)}n.alt=n.y,x.hashU.busca(n.x,n.z,30,(o,a)=>{if(o===n||o.classe!=="aereo"||!o.vivo||o.dentro)return;let c=(n.d.raio+o.d.raio)*1.1;if(a<c*c&&a>.01&&!n.pousado){let l=Math.sqrt(a),h=(c-l)/l*t*2;n.x+=(n.x-o.x)*h,n.z+=(n.z-o.z)*h}})}function _c(n,t,e){let i=Math.cos(n.ang),s=Math.sin(n.ang);return{x:n.x+t*i+e*s,z:n.z-t*s+e*i}}function Nu(n){let t=n.base;return t&&t.vivo?t:x.porta}function Fu(n){return n.tipo==="portaavioes"}function Cp(n){return Fu(n)?{dx:6,d0:20,d1:160,td:-110,frear:30,vaga:t=>[-24+t%2*10,40+t*22]}:{dx:0,d0:-140,d1:80,td:-130,frear:11,vaga:t=>[-40+t%2*10,25+t*18]}}function Iy(n,t){var p,M;let e=n.d,i=Nu(n);if(!i)return;let s=Cp(i),r=((p=i.deck)!=null?p:9.2)+.2,o=Math.sin(i.ang),a=Math.cos(i.ang);if(n.vy=0,n.estadoJato==="pronto"||n.estadoJato==="rearmando"){let[_,y]=s.vaga((M=n.vagaConves)!=null?M:0),I=_c(i,_,y);n.x=I.x,n.z=I.z,n.y=r,n.ang=i.ang+Math.PI*.75,n.velAtual=0,n.banco=0,n.estadoJato==="rearmando"&&(n.rearme-=t,n.rearme<=0&&(n.estadoJato="pronto",n.municao=e.municao,n.hp=n.hpMax,Yt(`${e.nome} rearmado e pronto`,n.x,n.z)));return}if(n.estadoJato==="decolando"){let _=e.vel*.42;n.velAtual=Math.min(_,n.velAtual+(Fu(i)?28:16)*t),n.ang=i.ang,n.x+=o*n.velAtual*t,n.z+=a*n.velAtual*t,(n.x-i.x)*o+(n.z-i.z)*a>s.d1?(n.y+=14*t,n.vy=14):n.y=r,n.y>r+25&&(n.estadoJato="voando"),Math.random()<t*40&&x.efeitos.particula(n.x-o*9,n.y+.5,n.z-a*9,lt(-2,2),1,lt(-2,2),2,.8,[.85,.85,.85],[.7,.7,.7],.4,0,3);return}if(n.estadoJato==="pousando"){n.velAtual=Math.max(0,n.velAtual-s.frear*t),n.ang=i.ang,n.y=r,n.banco=0,n.x+=o*n.velAtual*t,n.z+=a*n.velAtual*t,n.velAtual<3&&(n.estadoJato="rearmando",n.rearme=18,n.ordem=null);return}let c=n.ordem,l,h,u=e.altCruz,f=e.vel,d=.9;if(n.estadoJato==="aproximando"){let _=_c(i,s.dx*0,s.td),y=Ot(n.x,n.z,_.x,_.z);l=_.x,h=_.z,u=r+Math.min(90,y*.07),f=Math.max(65,e.vel*.32),d=1.2;let I=(n.x-i.x)*o+(n.z-i.z)*a;if(y<30||I>s.td&&Math.abs((n.x-i.x)*a-(n.z-i.z)*o)<25){n.estadoJato="pousando",n.y=r,x.efeitos.poeira(n.x,n.z,3),Tu(bn(n.x,n.z)*.6);return}y>2500&&(n.estadoJato="voltando")}else if(n.estadoJato==="voltando"||!c){n.estadoJato="voltando";let _=_c(i,0,s.td-1300);l=_.x,h=_.z,Ot(n.x,n.z,_.x,_.z)<700&&(u=r+100),Ot(n.x,n.z,_.x,_.z)<180&&(n.estadoJato="aproximando")}else if(c.tipo==="area"){let _=_y(n,c,t);l=_.tx,h=_.tz,u=_.alt}else{l=c.x,h=c.z;let _=Ot(n.x,n.z,l,h),y=e.arma==="canhao";n.lancou&&!n.saidaPt&&(n.saidaPt={x:n.x+Math.sin(n.ang)*1400,z:n.z+Math.cos(n.ang)*1400}),_<900&&(u=y?45:e.arma==="bomba"?120:70),y&&(f=e.vel*.85);let I=Math.atan2(l-n.x,h-n.z),S=y||e.arma==="bomba"?330:380;if(_<S&&Math.abs(Ii(n.ang,I))<.25&&!n.lancou){let T=bc({x:l,z:h},160,e.splash);if(!T)n.lancou=!0,n.passe=(n.passe||0)+1,n.passe>=3&&(n.estadoJato="voltando",Yt(`${e.nome}: nenhum alvo no local, voltando`,n.x,n.z));else{if(y)n.rajadaT=1.7,fi("gau8",bn(n.x,n.z));else if(e.arma==="bomba"){let R=e.bombas||2;for(let E=0;E<R;E++)So(n.x,n.y,n.z,T.x+lt(-6,6)+(E-(R-1)/2)*Math.sin(n.ang)*14,T.z+lt(-6,6)+(E-(R-1)/2)*Math.cos(n.ang)*14,{arma:"bomba",dano:e.dano,splash:e.splash,precisao:1},n);fi("bomba",bn(n.x,n.z))}else{for(let R=0;R<e.rajada;R++){let E=T.x+lt(-12,12),b=T.z+lt(-12,12);So(n.x+lt(-1,1),n.y-1,n.z+lt(-1,1),E,b,{arma:"foguete",dano:e.dano,splash:e.splash,precisao:1,missil:!0},n)}fi("foguete",bn(n.x,n.z))}n.municao--,n.lancou=!0,Sc(l,h,600)}}n.lancou&&n.saidaPt&&(n.municao<=0&&!(n.rajadaT>0)?(n.estadoJato="voltando",n.lancou=!1,n.saidaPt=null,Yt(`${e.nome} sem muni\xE7\xE3o, voltando para a base`,n.x,n.z)):Ot(n.x,n.z,n.saidaPt.x,n.saidaPt.z)<250?(n.lancou=!1,n.saidaPt=null):(l=n.saidaPt.x,h=n.saidaPt.z))}if(n.rajadaT>0)for(n.rajadaT-=t,n.lancou||(n.rajadaT=0),n.cdGau=(n.cdGau||0)-t;n.cdGau<=0;){n.cdGau+=.04;let _=120+lt(-15,15),y=n.x+Math.sin(n.ang)*_+lt(-5,5),I=n.z+Math.cos(n.ang)*_+lt(-5,5);x.efeitos.tracante(n.x+Math.sin(n.ang)*9,n.y-.4,n.z+Math.cos(n.ang)*9,y,.5,I,[1,.55,.2]),Ac(y,.3,I,e.splash,e.dano,n,!0)}let g=Math.atan2(l-n.x,h-n.z),v=n.ang;n.ang=He(n.ang,g,d*t),n.banco+=(Qe(Ii(v,n.ang)/t*.9,-1.2,1.2)-(n.banco||0))*Math.min(1,t*4),n.velAtual+=(f-n.velAtual)*Math.min(1,t*.8),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t,n.vy=Qe((u-n.y)*.8,-40,40),n.y+=Qe(u-n.y,-40*t,40*t),n.y<Ui(n.x,n.z)+15&&n.estadoJato!=="aproximando"&&(n.y=Ui(n.x,n.z)+15);let m=x.efeitos;if(Math.random()<t*25&&m.particula(n.x-Math.sin(n.ang)*9,n.y+.9,n.z-Math.cos(n.ang)*9,0,0,0,1.2,.5,[.8,.8,.8],[.6,.6,.6],.22,0,2),Math.abs(n.banco)>.5&&n.velAtual>120){let _=n.m&&n.m.def.pontas||6,y=Math.cos(n.ang),I=Math.sin(n.ang);for(let S of[-1,1]){let T=S*_,R=1.2+S*Math.sin(-n.banco)*_*.3;m.particula(n.x+y*T-I*3,n.y+R,n.z-I*T-y*3,0,0,0,.5,.7,[1,1,1],[.9,.9,.9],.55,0,.4)}}}function Tc(n,t){let e=x.joy||{x:0,z:0},i=Math.hypot(e.x,e.z),s=n.d.vel*(n.classe==="inf"?1.2:1);if(i>.1){let r=Math.atan2(e.x,e.z);n.classe==="aereo"?(n.ang=He(n.ang,r,3*t),n.velAtual=s*Math.min(1,i),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t,n.pousado=!1,n.altAlvo<15&&(n.altAlvo=n.d.altCruz)):(n.ang=He(n.ang,r,(n.classe==="inf"?12:2.5)*t),n.velAtual=s*Math.min(1,i)*Math.max(.2,Math.cos(Ii(n.ang,r))),Tp(n,Math.sin(n.ang)*n.velAtual*t,Math.cos(n.ang)*n.velAtual*t,Iu(n)))}else n.velAtual=0;n.ordem=null,n.caminho=null}function zy(n,t){let e=n.d;if(!e.arma&&!e.sec||n.classe==="inf"&&n.velAtual>.5&&x.controlando!==n||n.classe==="aereo"&&n.pousado)return;n.busca-=t,n.cd-=t,n.cd2-=t,n.recarga>0&&(n.recarga-=t,n.recarga<=0&&(n.salva=e.salva));let i=n.predio?1.3:1;n.busca<=0&&(n.busca=.35+Math.random()*.2,n.ordem&&n.ordem.tipo==="atacar"&&Bs(n.ordem.alvo)||(!Bs(n.alvo)||Ot(n.x,n.z,n.alvo.x,n.alvo.z)>e.alcance*i)&&(n.alvo=bc(n,e.alcance*i,e.splash&&e.splash>=8?e.splash:0,e.minAlc||0)),e.sec&&(n.alvo2=bc(n,e.sec.alcance,e.sec.splash?e.sec.splash:0)));let s=n.alvo;if(Bs(s)&&e.arma){let r=Ot(n.x,n.z,s.x,s.z),o=Math.atan2(s.x-n.x,s.z-n.z);n.m&&n.m.torre?n.torreAng=He(n.torreAng,Ii(n.ang,o),3*t):n.janela?n.ang=He(n.ang,n.janela.ang+Math.max(-1.1,Math.min(1.1,Ii(n.janela.ang,o))),8*t):n.classe==="inf"&&n.velAtual<.5?n.ang=He(n.ang,o,8*t):n.classe==="aereo"&&!n.ordem&&n.velAtual<5&&(n.ang=He(n.ang,o,2*t)),n.cd<=0&&r<=e.alcance*i&&r>=(e.minAlc||0)&&(e.salva?n.salva>0&&(vc(n,s,e),n.salva--,n.cd=e.cadencia,n.salva<=0&&(n.recarga=e.recarga)):(vc(n,s,e),n.cd=e.cadencia*lt(.85,1.15)),n.mirando=.6)}else n.m&&n.m.torre&&(n.torreAng=He(n.torreAng,0,.8*t));e.sec&&Bs(n.alvo2)&&n.cd2<=0&&(!e.sec.splash||x.hashA.contar(n.alvo2.x,n.alvo2.z,e.sec.splash,r=>r.zumbi&&r.vivo)>=3||n.alvo2.sub==="bruto")&&(vc(n,n.alvo2,e.sec),n.cd2=e.sec.cadencia*lt(.9,1.1))}function Ly(n,t){n.passageiros.length&&ks(n.x,n.z,n.y)&&(n.classe!=="aereo"||n.pousado)&&n.passageiros.some(e=>e.agente)&&Mc(n),n.classe==="naval"&&n.passageiros.length&&x.porta&&Ot(n.x,n.z,x.porta.x,x.porta.z)<200&&Mc(n)}function Uy(n,t){if(n.construindo>0){n.construindo-=t;let e=1-Math.max(0,n.construindo)/n.tempoObra;n.m.grupo.scale.y=.15+.85*e,n.hp=Math.max(n.hp,n.hpMax*(.2+.8*e)),Math.random()<t*3&&x.efeitos.poeira(n.x+lt(-n.d.raio,n.d.raio)*.5,n.z+lt(-n.d.raio,n.d.raio)*.5,1),n.construindo<=0&&(n.m.grupo.scale.y=1,Yt(`\u{1F3D7}\uFE0F ${n.d.nome} constru\xEDdo!`,n.x,n.z,"bom"),Qt("ok"));return}if(n.d.arma&&(n.busca-=t,n.cd-=t,n.busca<=0&&(n.busca=.4,n.alvo=bc(n,n.d.alcance,0)),Bs(n.alvo)&&n.cd<=0&&(vc({...n,y:11,m:null,classe:"estr"},n.alvo,n.d),n.cd=n.d.cadencia)),n.fila&&n.fila.length){let e=n.fila[0];e.t-=t,e.t<=0&&(n.fila.shift(),x.produzir(e.tipo,n))}}function Rp(n,t,e){n.vivo&&(n.classe==="inf"&&n.predio&&n.predio.integridade>0||(n.hp-=t,n.classe==="inf"&&Math.random()<.3&&x.efeitos.sangue(n.x,n.y+1.2,n.z,3),n.hp<=0&&Dy(n,e)))}function Dy(n,t){if(n.vivo){if(x.perdas+=n.estr||n.policia?0:1,n.estr){x.efeitos.explosao(n.x,5,n.z,18),pc(bn(n.x,n.z)),Yt(`\u{1F4A5} ${n.d.nome} foi destru\xEDdo!`,n.x,n.z,"ruim"),Dr(n),n.tipoEstr==="qg"&&x.derrota&&x.derrota("O Quartel-General foi destru\xEDdo pelos zumbis.");return}n.predio&&(n.predio.guarnicao=n.predio.guarnicao.filter(e=>e!==n));for(let e of n.passageiros.slice())(n.classe==="aereo"&&n.y>8||n.classe==="naval")&&(e.agente?(e.vivo=!1,x.civisMortos++):(e.vivo=!1,Dr(e),x.perdas++));!(n.classe==="aereo"&&n.y>8)&&n.classe!=="naval"&&(n.pousado=!0,Di(n)),n.classe==="inf"?(t&&x.virarZumbi(n),Yt(n.policia?t?"\u2623\uFE0F Um policial da SWAT foi mordido!":"Policial da SWAT abatido":t?"\u2623\uFE0F Um soldado foi mordido e virou zumbi!":"Soldado abatido",n.x,n.z,"ruim")):(x.efeitos.explosao(n.x,n.y+1,n.z,n.d.raio*2.5,Is(n.x,n.z)),pc(bn(n.x,n.z)),Yt(`\u{1F4A5} ${n.d.nome} destru\xEDdo`,n.x,n.z,"ruim")),Dr(n)}}var xc=new Fe;function Pp(n,t){var r,o;if(n.anel&&(n.anel.position.set(n.x,(n.classe==="aereo"||n.classe==="jato"?Ui(n.x,n.z):n.y)+.35,n.z),n.anel.visible=!n.dentro),!n.m)return;let e=n.m.grupo;if(e.position.set(n.x,n.y,n.z),n.classe==="aereo"||n.classe==="jato"){let a=n.classe==="jato"?-Qe(Math.atan2(n.vy||0,Math.max(30,n.velAtual)),-.5,.5):Qe(n.velAtual/n.d.vel,-1,1)*.18;xc.set(a,n.ang,n.classe==="jato"?-(n.banco||0):0,"YXZ"),e.rotation.copy(xc)}else n.classe==="naval"&&n.d.raio<20?(xc.set(-Math.min(.06,n.velAtual*.004)+Math.sin(x.tempo*1.3+n.id)*.015,n.ang,Math.sin(x.tempo*.9+n.id)*.02,"YXZ"),e.rotation.copy(xc)):e.rotation.set(0,n.ang,0);if(n.m.torre&&(n.m.torre.rotation.y=n.torreAng),n.m.trem){let a=n.estadoJato,c=(o=(r=Nu(n))==null?void 0:r.deck)!=null?o:9.2;n.m.trem.visible=a==="pronto"||a==="rearmando"||a==="pousando"||a==="decolando"&&n.y<c+12||a==="aproximando"&&n.y<c+60}if(n.m.chamas){let a=n.estadoJato==="voando"||n.estadoJato==="voltando"||n.estadoJato==="decolando",c=a?.8+Math.random()*.4:0;for(let l of n.m.chamas)l.visible=a,l.scale.set(1,1,c)}if(n.classe==="aereo"||n.classe==="jato"){if(!n.sombra){let h=new Fa(1,16).rotateX(-Math.PI/2);n.sombra=new oe(h,new Cn({color:0,transparent:!0,opacity:.28,depthWrite:!1})),n.sombra.renderOrder=2,x.cena.add(n.sombra)}let a=Ui(n.x,n.z),c=n.y-a,l=x.dirSol||{x:-.5,y:.8,z:.4};n.sombra.visible=c>2&&!n.dentro&&!(n.classe==="jato"&&(n.estadoJato==="pronto"||n.estadoJato==="rearmando")),n.sombra.position.set(n.x-l.x/l.y*c,a+.3,n.z-l.z/l.y*c),n.sombra.scale.set(n.d.raio*.7,1,n.d.raio*1),n.sombra.rotation.y=n.ang}let i=n.classe==="aereo"&&!(n.pousado&&n.y===Ui(n.x,n.z)&&!n.ordem&&n.velAtual<.1&&n.parado>3);n.classe==="aereo"&&(n.parado=n.pousado?(n.parado||0)+t:0);let s=i?28:0;if(n.m.rotor&&(n.m.rotor.rotation.y+=s*t),n.m.rotor2&&(n.m.rotor2.rotation.y-=s*t),n.m.cauda&&(n.m.cauda.rotation.x+=s*2*t),n.m.helice&&(n.m.helice.rotation.y+=40*t),n.m.naceles){let a=n.velAtual>40?Math.PI/2:0;for(let c of n.m.naceles)c.piv.rotation.x+=(a-c.piv.rotation.x)*Math.min(1,t),c.ro.rotation.y+=s*t}}function Sn(n,t){n.sel=t,t&&!n.anel&&n.classe!=="inf"?(n.anel=fp(Math.max(1.2,n.d.raio*1.2)),x.cena.add(n.anel)):!t&&n.anel&&(x.cena.remove(n.anel),n.anel=null)}var wc=new Xa,Ip=new qn(new U(0,1,0),0),Ao=new U,Cc=new at,Rc=class{constructor(t){this.cam=t,this.alvo={x:0,z:0},this.dist=700,this.yaw=.35,this.inclExtra=0,this.seguir=null,this.tremor=0}pitch(){let t=Qe((Math.log(this.dist)-Math.log(25))/(Math.log(6e3)-Math.log(25)),0,1);return Qe(Jd(.42,1.25,t)+this.inclExtra,.2,1.45)}aplicar(t){if(this.seguir){let c=this.seguir;c.vivo?(this.alvo.x+=(c.x-this.alvo.x)*Math.min(1,t*6),this.alvo.z+=(c.z-this.alvo.z)*Math.min(1,t*6)):this.seguir=null}this.alvo.x=Qe(this.alvo.x,-2e3,Oe+2e3),this.alvo.z=Qe(this.alvo.z,-2e3,Be+2e3);let e=this.pitch(),i=this.seguir&&this.seguir.y||0,s=this.cam,r=0,o=0;x.tremor>.01&&(r=(Math.random()-.5)*x.tremor*3,o=(Math.random()-.5)*x.tremor*3,x.tremor*=Math.max(0,1-t*5)),s.position.set(this.alvo.x+Math.sin(this.yaw)*Math.cos(e)*this.dist+r,i+Math.sin(e)*this.dist,this.alvo.z+Math.cos(this.yaw)*Math.cos(e)*this.dist+o);let a=0;for(let c of[1,.85,.7]){let l=this.alvo.x+(s.position.x-this.alvo.x)*c,h=this.alvo.z+(s.position.z-this.alvo.z)*c;for(let[u,f]of[[0,0],[4,0],[-4,0],[0,4],[0,-4]]){let d=zs(l+u,h+f);d&&d.h>a&&(a=d.h)}}s.position.y<a+6&&(s.position.y=a+6),s.lookAt(this.alvo.x,i,this.alvo.z),s.near=Math.max(.5,this.dist*.01),s.far=Math.max(12e3,this.dist*6),s.updateProjectionMatrix(),x.camAlvo=this.alvo,x.camDist=this.dist}chao(t,e,i=0){Cc.set(t/innerWidth*2-1,-(e/innerHeight)*2+1),wc.setFromCamera(Cc,this.cam),Ip.constant=-i;let s=wc.ray.intersectPlane(Ip,Ao);return s?{x:s.x,z:s.z}:null}irPara(t,e,i){this.alvo.x=t,this.alvo.z=e,i&&(this.dist=i),this.seguir=null}};function an(n,t,e,i){return Ao.set(n,t,e).project(i),Ao.z>1?null:{x:(Ao.x+1)/2*innerWidth,y:(1-Ao.y)/2*innerHeight}}function Lp(n,t){let e=new Map,i=null,s=null,r=null,o=null,a={t:0,u:null};x.modoCaixa=!1,n.addEventListener("contextmenu",h=>h.preventDefault()),n.addEventListener("pointerdown",h=>{if(Li(),n.setPointerCapture(h.pointerId),e.set(h.pointerId,{x:h.clientX,y:h.clientY,x0:h.clientX,y0:h.clientY,t0:performance.now(),botao:h.button}),e.size===1){let u=t.chao(h.clientX,h.clientY);if(i={ch:u,moveu:!1,girar:h.button===2},x.modoArea&&h.button!==2&&u&&x.selecao.some(f=>f.classe==="jato")){x.area={x0:u.x,z0:u.z,x1:u.x,z1:u.z};return}x.modoCaixa||h.shiftKey?o={x0:h.clientX,y0:h.clientY,x1:h.clientX,y1:h.clientY}:(clearTimeout(r),r=setTimeout(()=>{let f=e.values().next().value;f&&e.size===1&&Math.hypot(f.x-f.x0,f.y-f.y0)<12&&(o={x0:f.x0,y0:f.y0,x1:f.x,y1:f.y},navigator.vibrate&&navigator.vibrate(25))},450))}else if(e.size===2){clearTimeout(r),o=null;let[u,f]=[...e.values()];s={d:Math.hypot(u.x-f.x,u.y-f.y),ang:Math.atan2(f.y-u.y,f.x-u.x),mx:(u.x+f.x)/2,my:(u.y+f.y)/2,dist:t.dist,yaw:t.yaw},i=null}}),n.addEventListener("pointermove",h=>{let u=e.get(h.pointerId);if(u){if(u.x=h.clientX,u.y=h.clientY,x.area&&e.size===1){let f=t.chao(u.x,u.y);f&&(x.area.x1=f.x,x.area.z1=f.z),Math.hypot(u.x-u.x0,u.y-u.y0)>10&&i&&(i.moveu=!0);return}if(o&&e.size===1){o.x1=u.x,o.y1=u.y,x.caixa=o;return}if(e.size===1&&i){if(Math.hypot(u.x-u.x0,u.y-u.y0)>10&&(i.moveu=!0,clearTimeout(r)),!i.moveu)return;if(i.girar){t.yaw-=h.movementX*.006,t.inclExtra=Qe(t.inclExtra-h.movementY*.004,-.3,.3);return}t.seguir=null;let f=t.chao(u.x,u.y);f&&i.ch&&(t.alvo.x+=i.ch.x-f.x,t.alvo.z+=i.ch.z-f.z,t.aplicar(0),i.ch=t.chao(u.x,u.y))}else if(e.size===2&&s){let[f,d]=[...e.values()],g=Math.hypot(f.x-d.x,f.y-d.y),v=Math.atan2(d.y-f.y,d.x-f.x);t.dist=Qe(s.dist*s.d/Math.max(10,g),25,6e3),t.yaw=s.yaw-(v-s.ang);let m=(f.x+d.x)/2,M=(f.y+d.y)/2-s.my;Math.abs(g-s.d)<40&&(t.inclExtra=Qe(t.inclExtra+(M-(s.ultDy||0))*.003,-.3,.3)),s.ultDy=M}}});let c=h=>{let u=e.get(h.pointerId);if(clearTimeout(r),!!u){if(e.delete(h.pointerId),x.area){let f=x.area;x.area=null;let d=Math.hypot(f.x1-f.x0,f.z1-f.z0),g=x.selecao.filter(v=>v.classe==="jato"&&v.vivo);if(d>25&&g.length){let v=Math.max(40,Math.min(160,d*.35));bp(g,f.x0,f.z0,f.x1,f.z1,v),x.areaMarcada={...f,w:v,t:performance.now()},x.ui&&x.ui.alerta(`\u{1F3AF} \xC1rea de bombardeio marcada (${Math.round(d)} m). ${g.length>1?g.length+" jatos":"Jato"} a caminho!`,(f.x0+f.x1)/2,(f.z0+f.z1)/2,"info"),Qt("ok"),e.size===0&&(s=null,i=null);return}}if(o){Ny(o,t,h.shiftKey),o=null,x.caixa=null,x.modoCaixa&&x.ui&&x.ui.modoCaixa(!1);return}if(e.size===0&&i&&!i.moveu&&!s)if(h.button===2)x.selecao.slice().forEach(f=>Sn(f,!1)),x.selecao=[],x.ui&&x.ui.atualizarSelecao();else{let f=performance.now();By(u.x,u.y,t,f-a.t<330,a),a.t=f}e.size===0&&(s=null,i=null)}};n.addEventListener("pointerup",c),n.addEventListener("pointercancel",c),n.addEventListener("wheel",h=>{h.preventDefault(),t.dist=Qe(t.dist*Math.exp(h.deltaY*.0012),25,6e3)},{passive:!1});let l=new Set;addEventListener("keydown",h=>{l.add(h.key.toLowerCase()),h.key===" "&&(x.pausado=!x.pausado,x.ui&&x.ui.atualizarTopo()),h.key==="Escape"&&(x.selecao.slice().forEach(u=>Sn(u,!1)),x.selecao=[],x.ui&&x.ui.atualizarSelecao())}),addEventListener("keyup",h=>l.delete(h.key.toLowerCase())),x.teclado=h=>{let u=0,f=0;if(x.controlando){let d={x:0,z:0};(l.has("w")||l.has("arrowup"))&&(d.z-=1),(l.has("s")||l.has("arrowdown"))&&(d.z+=1),(l.has("a")||l.has("arrowleft"))&&(d.x-=1),(l.has("d")||l.has("arrowright"))&&(d.x+=1),d.x||d.z?x.joyTeclado=d:x.joyTeclado=null;return}if((l.has("w")||l.has("arrowup"))&&(f-=1),(l.has("s")||l.has("arrowdown"))&&(f+=1),(l.has("a")||l.has("arrowleft"))&&(u-=1),(l.has("d")||l.has("arrowright"))&&(u+=1),l.has("q")&&(t.yaw+=h*1.5),l.has("e")&&(t.yaw-=h*1.5),u||f){let d=t.dist*1.2*h,g=Math.sin(t.yaw),v=Math.cos(t.yaw);t.alvo.x+=(u*v+f*g)*d,t.alvo.z+=(-u*g+f*v)*d,t.seguir=null}}}function Pc(){let n=x.selecao.length&&x.selecao.every(t=>t.classe==="jato");n&&!x.modoArea&&x.ui&&x.ui.alerta("\u{1F3AF} Arraste o dedo no mapa para marcar a \xE1rea que os jatos v\xE3o bombardear (ou toque num ponto)",null,null,"info"),x.modoArea=!!n}function Ny(n,t,e){let i=Math.min(n.x0,n.x1),s=Math.max(n.x0,n.x1),r=Math.min(n.y0,n.y1),o=Math.max(n.y0,n.y1);e||(x.selecao.slice().forEach(c=>Sn(c,!1)),x.selecao=[]);let a=[];for(let c of x.unidades){if(!c.vivo||c.estr||c.dentro||c.tipo==="portaavioes"||c.policia)continue;let l=an(c.x,c.y+1,c.z,t.cam);l&&l.x>=i&&l.x<=s&&l.y>=r&&l.y<=o&&a.push(c)}for(let c of a)x.selecao.includes(c)||(x.selecao.push(c),Sn(c,!0));a.length&&Qt("clique"),Pc(),x.ui&&x.ui.atualizarSelecao()}function Fy(n,t,e,i){let s=null,r=1/0;for(let o of x.unidades){if(!o.vivo||o.dentro||o.policia||i&&!i(o))continue;let a=an(o.x,o.y+(o.classe==="inf"?1:(o.d.raio||2)*.4),o.z,e);if(!a)continue;let c=an(o.x+(o.d.raio||1)*Math.cos(x.cam.yaw),o.y,o.z-(o.d.raio||1)*Math.sin(x.cam.yaw),e),l=c?Math.hypot(c.x-a.x,c.y-a.y):0,h=Math.max(26,l*1.1),u=Math.hypot(a.x-n,a.y-t);u<h&&u-l*.5<r&&(r=u-l*.5,s=o)}return s}function Oy(n,t,e){let i=x.cam.chao(n,t);if(!i)return null;let s=Math.max(6,x.cam.dist*.03),r=null,o=1/0;return x.hashA.busca(i.x,i.z,s,(a,c)=>{a.zumbi&&a.vivo&&a.estado!=="morto"&&c<o&&(o=c,r=a)}),r}function zp(n,t,e){Cc.set(n/innerWidth*2-1,-(t/innerHeight)*2+1),wc.setFromCamera(Cc,e);let i=wc.intersectObjects(x.malhasPredios||[],!1);if(i.length){let r=i[0],o=r.face?r.face.normal:{x:0,y:1,z:0},a=zs(r.point.x-o.x*.6,r.point.z-o.z*.6);if(a)return a}let s=x.cam.chao(n,t);if(s){let r=zs(s.x,s.z);if(r)return r}return null}function By(n,t,e,i,s){let r=e.cam;if(x.construindo){let u=e.chao(n,t);u&&x.construir(x.construindo,u.x,u.z)&&(x.construindo=null,x.ui.atualizarConstrucao());return}let o=x.selecao.filter(u=>u.vivo&&!u.dentro);x.selecao=o;let a=Fy(n,t,r);if(a&&!a.estr){let u=o.filter(f=>f!==a&&Ec(a,f));if(o.length&&a.d.carga&&u.length&&!o.includes(a)){di(u,{tipo:"embarcar",t:a}),a.classe==="aereo"&&!a.pousado&&(a.ordem={tipo:"pousar"}),x.ui.ping(a.x,a.z,"embarque"),Qt("ok");return}if(a.tipo==="portaavioes"&&o.length&&o.some(f=>f.classe==="aereo")){let f=-120;for(let g of o)g.classe==="aereo"&&(g.ordem={tipo:"pousarPorta",k:f},g.altAlvo=g.d.altCruz,f+=30);let d=o.filter(g=>g.classe==="naval");d.length&&pi(d,a.x+120,a.z),x.ui.ping(a.x,a.z,"mover"),Qt("ok");return}if(i&&s.u===a)for(let f of x.unidades){if(f.tipo!==a.tipo||!f.vivo||f.dentro||x.selecao.includes(f))continue;let d=an(f.x,f.y,f.z,r);d&&d.x>0&&d.y>0&&d.x<innerWidth&&d.y<innerHeight&&(x.selecao.push(f),Sn(f,!0))}else x.selecaoMultipla?x.selecao.includes(a)?(x.selecao.splice(x.selecao.indexOf(a),1),Sn(a,!1)):(x.selecao.push(a),Sn(a,!0)):(x.selecao.slice().forEach(f=>Sn(f,!1)),x.selecao=[a],Sn(a,!0));s.u=a,Qt("clique"),Pc(),x.ui.atualizarSelecao();return}if(a&&a.estr&&!o.length){x.fonteSel=a,["quartel","patio","heliporto","docas"].includes(a.tipoEstr)?x.ui.abrirProducao(a.tipoEstr):x.ui.alerta(`${a.d.nome}${a.construindo>0?" (em constru\xE7\xE3o)":""}`,a.x,a.z,"info");return}if(!o.length){let u=zp(n,t,r);u&&x.ui.infoPredio(u);return}let c=Oy(n,t,r);if(c){let u=o.filter(d=>d.d.arma&&d.classe!=="jato");di(u,{tipo:"atacar",alvo:c});let f=o.filter(d=>d.classe==="jato");f.length&&pi(f,c.x,c.z),x.ui.ping(c.x,c.z,"atacar"),Qt("ok");return}let l=zp(n,t,r);if(l){let u=o.filter(g=>g.classe==="inf"),f=o.filter(g=>g.classe==="aereo"),d=o.filter(g=>g.classe!=="inf"&&g.classe!=="aereo");if(l.civis>0){di(o.filter(v=>v.classe==="inf"||v.classe==="veic"),{tipo:"resgatar",predio:l}),di(f.filter(v=>v.d.carga),{tipo:"resgatar",predio:l});let g=f.filter(v=>!v.d.carga).concat(d.filter(v=>v.classe!=="veic"));g.length&&pi(g,l.cx,l.cz),x.ui.ping(l.cx,l.cz,"resgate")}else{u.length&&di(u,{tipo:"guarnecer",predio:l});let g=f.concat(d);g.length&&pi(g,l.cx,l.cz),x.ui.ping(l.cx,l.cz,u.length?"guarnecer":"mover")}Qt("ok");return}let h=e.chao(n,t);h&&(pi(o,h.x,h.z),x.ui.ping(h.x,h.z,o.some(u=>u.classe==="jato")&&o.every(u=>u.classe==="jato")?"atacar":"mover"),Qt("ok"))}var ky=(_e.delegacias||[]).map(([n,t,e])=>({nome:n,x:t*_e.mpp,z:e*_e.mpp})),Hy=4,To=[];x.equipes=To;function Vy(n){return Ne(n.x,n.z)?n:In(0,n.x,n.z)||n}function Bu(n,t,e){if(x.policiaDesistiu||To.filter(c=>c.vivo).length>=Hy)return;let i=ky.slice().sort((c,l)=>Ot(c.x,c.z,n,t)-Ot(l.x,l.z,n,t))[0],s=Vy(i),r=Ye("bearcat",s.x,s.z,0);r.policia=!0;let o=[];for(let c=0;c<6;c++){let l=Ye("swat",s.x+lt(-3,3),s.z+lt(-3,3),0);l.policia=!0,zu(l,r),o.push(l)}let a={van:r,oficiais:o,alvo:{x:n,z:t},estado:"indo",t:0,calmo:0,vivo:!0,id:To.length+1};To.push(a),r.ordem={tipo:"mover",x:n,z:t},Yt(`\u{1F693} SWAT da ${i.nome} a caminho de ${e||"um foco de infec\xE7\xE3o"}`,s.x,s.z,"info"),Qt("sirene")}function Up(n,t,e){return x.hashA?x.hashA.contar(n,t,e,i=>i.zumbi&&i.vivo&&i.estado!=="morto"):0}function Dp(n,t,e){let i=null,s=e*e;for(let r of x.agentes){if(!r.zumbi||!r.vivo||r.dentro||r.estado==="morto")continue;let o=(r.x-n)**2+(r.z-t)**2;o<s&&(s=o,i=r)}return i}var Ou=0;function Np(n){if(Ou-=n,!(Ou>0)){Ou=1;for(let t of To){if(!t.vivo)continue;t.oficiais=t.oficiais.filter(a=>a.vivo);let e=t.van.vivo?t.van:null;if(!e&&!t.oficiais.length){t.vivo=!1,Yt("\u2620\uFE0F Uma equipe da SWAT foi perdida",t.alvo.x,t.alvo.z,"ruim");continue}t.t+=1;let i=t.oficiais.filter(a=>!a.dentro),s=i.length?{x:i.reduce((a,c)=>a+c.x,0)/i.length,z:i.reduce((a,c)=>a+c.z,0)/i.length}:e||t.oficiais[0];if(e){let a=e.passageiros.filter(c=>c.agente).length;if(t.estado!=="evacuar"&&a>0&&(Nr(e)<1||a>=4&&Up(e.x,e.z,60)===0&&t.t>20)){t.estado="evacuar";let c=(x.abrigos||[]).filter(l=>l.vivo&&!(l.construindo>0)).sort((l,h)=>Ot(l.x,l.z,e.x,e.z)-Ot(h.x,h.z,e.x,e.z))[0]||x.estr.zona;e.ordem={tipo:"mover",x:c.x,z:c.z},Yt(`\u{1F693} Blindado da SWAT levando ${a} civis para a zona segura`,e.x,e.z,"bom")}if(t.estado==="evacuar"){e.passageiros.some(c=>c.agente)?ks(e.x,e.z,0)&&!e.ordem&&Di(e):(t.estado="voltar",e.ordem={tipo:"mover",x:t.alvo.x,z:t.alvo.z});continue}if(t.estado==="voltar"){(Ot(e.x,e.z,t.alvo.x,t.alvo.z)<80||!e.ordem)&&(t.estado="combate");continue}}if(Up(t.alvo.x,t.alvo.z,140)===0?t.calmo++:t.calmo=0,t.calmo>12){let a=Dp(s.x,s.z,3500);a&&(t.alvo={x:a.x,z:a.z},t.calmo=0,t.estado="indo")}let o=Ot(s.x,s.z,t.alvo.x,t.alvo.z)>320;if(e&&o&&t.estado!=="indo"){t.estado="indo";let a=t.oficiais.filter(c=>!c.dentro);a.length&&di(a,{tipo:"embarcar",t:e})}if(t.estado==="indo"&&e){let a=t.oficiais.filter(c=>!c.dentro);if(a.length&&t.t%30!==0&&a.some(c=>c.ordem&&c.ordem.tipo==="embarcar"))continue;Ot(e.x,e.z,t.alvo.x,t.alvo.z)>70?e.ordem||(e.ordem={tipo:"mover",x:t.alvo.x+lt(-20,20),z:t.alvo.z+lt(-20,20)}):(e.ordem=null,Di(e),t.estado="combate");continue}t.estado="combate";for(let a of t.oficiais){if(a.dentro||a.ordem||a.alvo&&a.alvo.vivo&&a.alvo.zumbi)continue;let l=Dp(a.x,a.z,200)||t.alvo;if(Ot(a.x,a.z,l.x,l.z)>45){let h=Math.atan2(l.x-a.x,l.z-a.z)+lt(-.4,.4);pi([a],a.x+Math.sin(h)*30,a.z+Math.cos(h)*30)}}e&&!e.ordem&&s!==e&&Ot(e.x,e.z,s.x,s.z)>50&&(e.ordem={tipo:"mover",x:s.x+lt(-10,10),z:s.z+lt(-10,10)})}}}var wo=[];x.acampamentos=wo;var ku=20,Gy=0;function Wy(n,t){let e="cidade",i=1/0;for(let s in we){if(["base","heliporto","docas","portaavioes"].includes(s))continue;let r=qe(n,t,we[s].x,we[s].z);r<i&&(i=r,e=we[s].nome)}return e}function Xy(n,t,e){for(let i of x.unidades)if(i.vivo&&!i.policia&&(i.estr||i.classe==="inf"||i.classe==="veic")&&qe(i.x,i.z,n,t)<e*e)return!1;return!0}function Fp(n,t){for(let e=0;e<30;e++){let i=n+lt(-60,60),s=t+lt(-60,60),r=!0;for(let o=0;o<6.28&&r;o+=.8)Ne(i+Math.sin(o)*12,s+Math.cos(o)*12)||(r=!1);if(r&&Ne(i,s))return{x:i,z:s}}return null}function Hu(n,t,e){let i=e/Math.max(6,n.membros.length)*Math.PI*2,s=t.armado?11.5:4+e%3*1.5;return{x:n.x+Math.sin(i)*s,z:n.z+Math.cos(i)*s}}function Op(n,t,e,i=!1){let s=wr("acampamento");s.grupo.position.set(n,0,t),s.grupo.rotation.y=lt(0,6.28),x.cena.add(s.grupo);let r={id:++Gy,x:n,z:t,m:s,membros:[],ativo:!0,policia:i,nome:Wy(n,t),t:0};wo.push(r);for(let o of e)qy(r,o);return r}function qy(n,t){t.campo=n,t.estado="acampar",t.lider=null,n.membros.push(t),t.posto=Hu(n,t,n.membros.length-1)}function Vu(n){n.armado=!0,n.hp=Math.max(n.hp,60)}function Yy(n){let t=x.criarCivil(n.x,n.z);return t.camisa=rc,t.calca=oc,t.pele=po,t.policial=!0,t.cabelo=null,Vu(t),t.hp=115,t}function $y(){let n=(x.equipes||[]).find(e=>e.vivo&&!e.desistiu);if(!n)return!1;n.desistiu=!0,n.vivo=!1;let t=[];for(let e of n.oficiais)e.vivo&&(e.dentro&&(e.dentro.passageiros.splice(e.dentro.passageiros.indexOf(e),1),e.dentro.cargaUsada-=1,e.dentro=null),t.push(Yy(e)),Dr(e));if(n.van.vivo){for(let s of n.van.passageiros.slice())s.agente&&(s.dentro=null,t.push(s));n.van.passageiros=n.van.passageiros.filter(s=>!s.agente);let e=n.van.x,i=n.van.z;if(Dr(n.van),t.length){let s=Fp(e,i)||{x:e,z:i},r=Op(s.x,s.z,t,!0);Yt(`\u{1F694} A SWAT desistiu! Os policiais abandonaram o servi\xE7o e montaram um acampamento em ${r.nome}`,r.x,r.z,"ruim")}}return Qt("alerta"),!0}function Bp(n){ku-=n;for(let s of wo){if(!s.ativo)continue;if(s.membros=s.membros.filter(o=>o.vivo&&!o.zumbi&&o.estado!=="morto"&&o.campo===s),s.t+=n,s.t>25&&Math.random()<n*.03){let o=s.membros.find(a=>!a.armado);o&&s.membros.filter(a=>a.armado).length<s.membros.length*.7&&(Vu(o),o.posto=Hu(s,o,s.membros.indexOf(o)))}if(!s.membros.length){s.ativo=!1,Yt(`\u2620\uFE0F O acampamento de sobreviventes em ${s.nome} caiu`,s.x,s.z,"ruim");continue}let r=null;if(x.hashU.busca(s.x,s.z,45,o=>{r||!o.vivo||o.dentro||o.policia||o.estr||(o.classe==="inf"||o.classe==="veic"||o.classe==="aereo"&&o.pousado&&o.d.carga||o.classe==="naval"&&o.d.carga)&&(r=o)}),r){s.ativo=!1;for(let o of s.membros)o.campo=null,o.estado="seguir",o.lider=r,o.espera=0;Yt(`\u{1F91D} ${s.membros.length} sobreviventes de ${s.nome} aceitaram o resgate e seguem suas tropas!`,s.x,s.z,"bom"),Qt("resgate")}}if(ku>0)return;ku=15;let t=x.populacao?x.infectados/x.populacao:0;if(!x.policiaDesistiu&&(t>.4||x.nZumbis>250&&x.nZumbis>x.nCivis)&&(x.policiaDesistiu=!0,Yt("\u{1F4FB} A cidade est\xE1 tomada. A pol\xEDcia e a SWAT est\xE3o desistindo e abandonando os postos!",null,null,"surto")),x.policiaDesistiu&&Math.random()<.6&&$y(),x.focos<2||x.tempo<180||wo.filter(s=>s.ativo).length>=8)return;let i=x.agentes.filter(s=>s.vivo&&!s.zumbi&&!s.dentro&&!s.campo&&s.estado!=="morto"&&s.estado!=="seguir");for(let s=0;s<6;s++){let r=i[Math.random()*i.length|0];if(!r)return;if(!Xy(r.x,r.z,350)||wo.some(l=>l.ativo&&qe(l.x,l.z,r.x,r.z)<500*500))continue;let o=i.filter(l=>!l.campo&&qe(r.x,r.z,l.x,l.z)<140*140).slice(0,16);if(o.length<5)continue;let a=Fp(r.x,r.z);if(!a)continue;let c=Op(a.x,a.z,o);for(let l=0;l<Math.min(o.length,2+(x.dia>=2?2:0));l++)Vu(o[l]);for(let l of o)l.posto=Hu(c,l,c.membros.indexOf(l));Yt(`\u{1F3D5}\uFE0F Sobreviventes montaram um acampamento em ${c.nome} (${o.length} pessoas). Mande tropas para resgat\xE1-los!`,c.x,c.z,"info"),Qt("alerta");return}}var kp={facil:{dinheiro:5e3,civis:600,sos:22,meta:150,intervalo:1.35,renda:7},normal:{dinheiro:3500,civis:750,sos:26,meta:250,intervalo:1,renda:5},dificil:{dinheiro:2200,civis:900,sos:30,meta:350,intervalo:.7,renda:4}};function Vp(){var o;x.danoUnidade=Rp,x.naZonaSegura=ks,x.volEm=bn,x.vagas=Nr,x.construir=Jy,x.embarcarCivil=Lu,x.criarCivil=gc,x.virarZumbi=vp,x.produzir=Yp;let n=we.base;ru(n.x,n.z,380);let t=(o=_e.baseAng)!=null?o:.43,e={x:Math.cos(t),z:Math.sin(t)},i={x:-e.z,z:e.x};x.baseEixo={ax:e,pp:i,ang:Math.atan2(e.x,e.z)};let s=(a,c)=>({x:n.x+e.x*a+i.x*c,z:n.z+e.z*a+i.z*c});x.layout={qg:s(0,-10),quartel:s(-150,-60),patio:s(-150,60),heliporto:s(150,-20),zona:s(10,110),torres:[s(-260,-120),s(-260,140),s(260,-120),s(260,140),s(0,-160)],patriot:[s(90,120),s(230,60)]};let r=[["qg",42,28,16],["quartel",56,42,6],["patio",64,34,10]];for(let[a,c,l,h]of r){let u=x.layout[a];Zy(u.x,u.z,c,l,x.baseEixo.ang+Math.PI/2,h)}su(),bu()}function Zy(n,t,e,i,s,r){let o=Math.cos(s),a=Math.sin(s),c=new Float32Array(8),l=[[-e/2,-i/2],[-e/2,i/2],[e/2,i/2],[e/2,-i/2]],h=1e9,u=-1e9,f=1e9,d=-1e9;l.forEach(([v,m],p)=>{let M=n+v*o+m*a,_=t-v*a+m*o;c[p*2]=M,c[p*2+1]=_,h=Math.min(h,M),u=Math.max(u,M),f=Math.min(f,_),d=Math.max(d,_)});let g=0;for(let v=0;v<4;v++){let m=(v+1)%4;g+=c[v*2]*c[m*2+1]-c[m*2]*c[v*2+1]}if(g>0){let v=new Float32Array([c[6],c[7],c[4],c[5],c[2],c[3],c[0],c[1]]);c.set(v)}Le.push({id:Le.length,pts:c,h:r,area:e*i,cx:n,cz:t,x0:h,x1:u,z0:f,z1:d,raio:Math.max(e,i)/2,cap:12,guarnicao:[],civis:0,sos:!1,integridade:600,integMax:600,removido:!1,base:!0})}function Gp(){x.chao=cu(x.cena),x.agua=lu(x.cena);let n=Le.filter(r=>r.base);for(let r of n)r.removido=!0;x.malhasPredios=ou(x.cena);for(let r of n)r.removido=!1;let t=we.base,e=x.baseEixo,i=Ge?null:{x:t.x+e.pp.x*-330,z:t.z+e.pp.z*-330};x.decor=hu(x.cena,2600,i?(r,o)=>{let a=r-i.x,c=o-i.z,l=e.ang,h=a*Math.sin(l)+c*Math.cos(l),u=a*Math.cos(l)-c*Math.sin(l);return Math.abs(h)<180&&u>-110&&u<40}:null);let s=we.base;x.decor.push(uu(x.cena,3200,(r,o)=>Ot(r,o,s.x,s.z)<450));for(let r of Le)r.base||(r.integMax=150+Math.min(900,r.area*.4),r.integridade=r.integMax)}function mi(n,t,e,i){let s=mu[n],r=wr(n);r.grupo.position.set(t,0,e),r.grupo.rotation.y=i,x.cena.add(r.grupo);let o={id:x.idSeq++,estr:!0,tipoEstr:n,tipo:n,d:s,classe:"estr",x:t,z:e,y:0,ang:i,hp:s.hp,hpMax:s.hp,vivo:!0,m:r,fila:[],passageiros:[],cargaUsada:0,busca:lt(0,1),cd:0};return x.unidades.push(o),["qg","zona","fob"].includes(n)&&(x.abrigos||(x.abrigos=[])).push(o),o}function Co(n){if(n==="porta")return Ge?x.porta:Co("pista");if(x.fonteSel&&x.fonteSel.vivo&&x.fonteSel.tipoEstr===n&&!(x.fonteSel.construindo>0))return x.fonteSel;let t=null,e=1/0,i=x.camAlvo||{x:0,z:0};for(let s of x.unidades){if(!s.vivo||!s.estr||s.tipoEstr!==n||s.construindo>0)continue;let r=qe(s.x,s.z,i.x,i.z);r<e&&(e=r,t=s)}return t}function Jy(n,t,e){let i=go[n];if(x.dinheiro<i.custo)return Yt("Dinheiro insuficiente",null,null,"ruim"),Qt("erro"),!1;if(!Ne(t,e))return Yt("N\xE3o d\xE1 para construir a\xED (pr\xE9dio ou \xE1gua)",t,e,"ruim"),Qt("erro"),!1;let s=Math.min(i.raio,24);if(!i.agua&&n!=="muro"&&n!=="torre"){let c=0;for(let l=0;l<6.28;l+=.5)for(let h of[.5,1])Ne(t+Math.sin(l)*s*h,e+Math.cos(l)*s*h)||c++;if(c>3)return Yt("Pouco espa\xE7o livre aqui: escolha um terreno aberto (pra\xE7a, estacionamento, rua larga)",t,e,"ruim"),Qt("erro"),!1}for(let c of x.unidades)if(c.vivo&&c.estr&&Ot(c.x,c.z,t,e)<(c.d.raio+i.raio)*.6)return Yt("Muito perto de outra estrutura",t,e,"ruim"),Qt("erro"),!1;let r=x.cam?x.cam.yaw:0,o=null;if(i.agua){let c=Xp(t,e);if(!c||c.r>80)return Yt("As docas precisam ficar na beira da \xE1gua",t,e,"ruim"),Qt("erro"),!1;t=c.x,e=c.z,r=c.ang,o=c.agua}x.dinheiro-=i.custo;let a=mi(n,t,e,r);return a.construindo=i.tempo,a.tempoObra=i.tempo,a.hp=a.hpMax*.2,a.m.grupo.scale.y=.15,o&&(a.saidaAgua=o),n==="pista"&&(a.deck=.3,a.fila=[]),(n==="quartel"||n==="patio")&&(a.saida=Ni({x:t+Math.sin(r)*40,z:e+Math.cos(r)*40})),Yt(`\u{1F3D7}\uFE0F Construindo ${i.nome}...`,t,e,"info"),Qt("ok"),!0}function Ni(n,t=0){return t===0&&Ne(n.x,n.z)?n:In(t,n.x,n.z)||n}function Wp(n){let t=kp[n]||kp.normal;x.dificuldade=n,x.cfgDif=t,x.dinheiro=t.dinheiro,x.meta=t.meta,x.tempo=0,x.dia=1,x.focos=0,x.proxFoco=20,x.infectados=0,x.resgatados=0,x.civisMortos=0,x.zumbisMortos=0,x.perdas=0,x.ruidos=[],x.quadro=0,x.fim=!1;let e=x.baseEixo.ang+Math.PI/2,i=x.layout;x.estr.qg=mi("qg",i.qg.x,i.qg.z,e),x.estr.quartel=mi("quartel",i.quartel.x,i.quartel.z,e),x.estr.patio=mi("patio",i.patio.x,i.patio.z,e);let s=Ni(i.heliporto);x.estr.heliporto=mi("heliporto",s.x,s.z,e);let r=Ni(i.zona);x.estr.zona=mi("zona",r.x,r.z,e);for(let M of i.torres){let _=Ni(M);Ot(_.x,_.z,M.x,M.z)<60&&mi("torre",_.x,_.z,e)}for(let M of i.patriot){let _=Ni(M);mi("patriot",_.x,_.z,e+.5)}let o=Ge?Xp(x.estr.qg.x,x.estr.qg.z):null;o&&(x.estr.docas=mi("docas",o.x,o.z,o.ang),x.estr.docas.saidaAgua=o.agua);for(let M of["quartel","patio"]){let _=x.estr[M],y={x:_.x+x.baseEixo.pp.x*45,z:_.z+x.baseEixo.pp.z*45};_.saida=Ni(y)}let a;if(Ge){a=we.portaavioes,Cr(2,a.x,a.z)||(a=In(2,a.x,a.z)||a),x.porta=Ye("portaavioes",a.x,a.z,Math.PI),x.porta.fila=[],x.porta.deck=9.2;let M=In(2,a.x-250,a.z+300)||{x:a.x,z:a.z+400};Ye("destroier",M.x,M.z,Math.PI);let _=x.estr.docas.saidaAgua;Ye("lancha",_.x,_.z,o.ang)}else{let M=we.base,_=x.baseEixo.ax,y=x.baseEixo.pp,S=((T,R)=>({x:M.x+_.x*T+y.x*R,z:M.z+_.z*T+y.z*R}))(0,-330);x.porta=mi("pista",S.x,S.z,x.baseEixo.ang),x.porta.deck=.3,x.porta.aerodromo=!0,a=x.porta}let c=x.estr.quartel.saida,l=x.estr.patio.saida,h={fuzileiro:8,metralhador:2,sniper:1,medico:1},u=0;for(let M in h)for(let _=0;_<h[M];_++,u++){let y=Ni({x:c.x+u%4*3-5,z:c.z+Math.floor(u/4)*3});Ye(M,y.x,y.z,x.baseEixo.ang)}for(let[M,_]of[["humvee",2],["stryker",1],["ambulancia",1]])for(let y=0;y<_;y++,u++){let I=Ni({x:l.x+u%3*8-8,z:l.z+u%2*8});Ye(M,I.x,I.z,x.baseEixo.ang)}let f=x.estr.heliporto,d=Ye("blackhawk",f.x+x.baseEixo.ax.x*-30,f.z+x.baseEixo.ax.z*-30,x.baseEixo.ang);d.pousado=!0,d.y=0;let g=Ye("apache",f.x,f.z,x.baseEixo.ang);g.pousado=!0;let v=Ye("f35",a.x,a.z,0);v.vagaConves=0,v.base=x.porta;let m=Ye("f18",a.x,a.z,0);if(m.vagaConves=1,m.base=x.porta,!Ge){let M=Ye("a10",a.x,a.z,0);M.vagaConves=2,M.base=x.porta}jy(t.civis);let p=Le.filter(M=>!M.base&&!M.removido&&M.h>9&&Ot(M.cx,M.cz,x.estr.qg.x,x.estr.qg.z)>700);for(let M=0;M<t.sos&&p.length;M++){let _=p.splice(Qa(0,p.length-1),1)[0];_.sos=!0,_.civis=Qa(4,14)}x.populacao=x.agentes.length+Le.reduce((M,_)=>M+_.civis,0),x.pausado=!1}function Xp(n,t){let e=null;for(let i=0;i<16;i++){let s=i/16*Math.PI*2,r=Math.sin(s),o=Math.cos(s);for(let a=20;a<600;a+=4){let c=n+r*a,l=t+o*a;if(Is(c,l)){if(!e||a<e.r){let h=In(1,c+r*60,l+o*60)||{x:c+r*60,z:l+o*60};e={r:a,x:c-r*4,z:l-o*4,ang:s,agua:h}}break}}}return e||{x:n,z:t,ang:0,agua:{x:n,z:t}}}function jy(n){let t=x.estr.qg,e=0,i=0;for(;i<n&&e<n*200;){e++;let s=Math.random()*Oe,r=Math.random()*Be;if(!Ne(s,r)||qe(s,r,t.x,t.z)<600*600)continue;let o=Math.floor(s/Ae),a=Math.floor(r/Ae),c=0;for(let l=-3;l<=3;l+=3)for(let h=-3;h<=3;h+=3){let u=(a+l)*Ft+(o+h);u>=0&&u<ze.length&&ze[u]>=0&&c++}Math.random()>.08+c*.12||(gc(s,r),i++)}}function Ic(n,t){let e=Bn[n],i=Co(t||e.de);return!i&&(t||e.de)==="pista"?(Yt(x.unidades.some(s=>s.vivo&&s.tipoEstr==="pista")?"A pista de pouso ainda est\xE1 em constru\xE7\xE3o":"Construa uma Pista de Pouso (\u{1F528} Construir) para usar F-22 e A-10",null,null,"ruim"),Qt("erro"),!1):!i||!i.vivo?(Yt("Estrutura destru\xEDda: n\xE3o d\xE1 para produzir",0,0,"ruim"),Qt("erro"),!1):x.dinheiro<e.custo?(Yt("Dinheiro insuficiente",null,null,"ruim"),Qt("erro"),!1):i.fila.length>=8?(Yt("Fila cheia",null,null),Qt("erro"),!1):e.classe==="jato"&&x.unidades.filter(s=>s.classe==="jato"&&s.vivo&&(s.base||x.porta)===i).length+i.fila.filter(s=>Bn[s.tipo].classe==="jato").length>=6?(Yt("Esta base comporta no m\xE1ximo 6 jatos",null,null),Qt("erro"),!1):(x.dinheiro-=e.custo,i.fila.push({tipo:n,t:e.tempo,total:e.tempo}),Qt("clique"),!0)}function qp(n,t){let e=Co(n);if(!e||!e.fila[t])return;let i=e.fila.splice(t,1)[0];x.dinheiro+=Bn[i.tipo].custo}function Yp(n,t){let e=Bn[n],i;if(t&&(t===x.porta||t.tipoEstr==="pista")){let s=t;if(e.classe==="jato"){i=Ye(n,s.x,s.z,0),i.base=s;let r=new Set(x.unidades.filter(a=>a.classe==="jato"&&a!==i&&a.vivo&&(a.base||x.porta)===s).map(a=>a.vagaConves)),o=0;for(;r.has(o);)o++;i.vagaConves=o}else{let r=-60-Qa(0,3)*25;i=Ye(n,s.x+Math.sin(s.ang)*r,s.z+Math.cos(s.ang)*r,s.ang,{alt:s.deck}),i.y=s.deck,i.pousado=!0}}else if(e.de==="heliporto"){let s=[[-30,0],[0,0],[30,0],[-15,32],[15,32]],[r,o]=li(s),a=Math.cos(t.ang),c=Math.sin(t.ang);i=Ye(n,t.x+r*a+o*c,t.z-r*c+o*a,t.ang),i.pousado=!0}else if(e.de==="docas"){let s=t.saidaAgua,r=s;e.nav===2&&(r=In(2,s.x,s.z)||s),i=Ye(n,r.x+lt(-10,10),r.z+lt(-10,10),t.ang)}else{let s=t.saida||t,r=Ni({x:s.x+lt(-6,6),z:s.z+lt(-6,6)});i=Ye(n,r.x,r.z,x.baseEixo.ang)}return Yt(`${e.icone} ${e.nome} pronto!`,i.x,i.z,"bom"),Qt("ok"),i}var Gu=_e.focos||["bayside"];function Wu(n,t){let e="Miami",i=1/0;for(let s in we){if(s==="base"||s==="heliporto"||s==="docas"||s==="portaavioes")continue;let r=qe(n,t,we[s].x,we[s].z);r<i&&(i=r,e=we[s].nome)}return e}function Ky(){x.focos++;let n,t,e=x.agentes.filter(a=>a.vivo&&!a.zumbi&&!a.dentro&&a.estado!=="morto"&&Ot(a.x,a.z,x.estr.qg.x,x.estr.qg.z)>700);if(x.focos<=4&&we[Gu[x.focos-1]]){let a=we[Gu[x.focos-1]];n=a.x,t=a.z}else if(e.length){let a=li(e);n=a.x,t=a.z}else return;let i=Math.min(14,3+Math.floor(x.focos*.8)),s=e.sort((a,c)=>qe(a.x,a.z,n,t)-qe(c.x,c.z,n,t)).slice(0,i),r=0;for(let a of s){if(Ot(a.x,a.z,n,t)>250)break;Mo(a,x.dia>=2&&Math.random()<.2?"corredor":"comum"),x.infectados++,r++}for(;r<i;r++){let a=In(0,n+lt(-20,20),t+lt(-20,20));a&&(Pu(a.x,a.z),x.infectados++,x.populacao++)}let o=Wu(n,t);(x.swatPendente||(x.swatPendente=[])).push({t:x.tempo+4,x:n,z:t,nome:o}),Yt(x.focos===1?`\u2623\uFE0F Primeiro caso confirmado em ${o}! O surto come\xE7ou.`:`\u2623\uFE0F Novo foco de infec\xE7\xE3o: ${o}`,n,t,"surto"),Qt("alerta")}function Qy(){let n=Math.min(30,6+x.dia*4),t,e,i=0;do{i++;let s=Math.random()*4|0,r=Math.random();t=s===0?lt(5,50):s===1?Oe-lt(5,50):r*Oe,e=s===2?lt(5,50):s===3?Be-lt(5,50):r*Be}while((!Ne(t,e)||Ot(t,e,x.estr.qg.x,x.estr.qg.z)<900)&&i<300);if(!(i>=300)){for(let s=0;s<n;s++){let r=In(0,t+lt(-30,30),e+lt(-30,30));if(r){let o=Pu(r.x,r.z,x.dia>=3&&Math.random()<.06?"bruto":x.dia>=2&&Math.random()<.2?"corredor":"comum");o.estado="ruido";let a=we[Gu[0]];o.destino={x:a.x,z:a.z}}}Bu(t,e,Wu(t,e)),Yt(`\u{1F9DF} Horda de ${n} zumbis chegando de fora da cidade (${Wu(t,e)})`,t,e,"surto"),Qt("alerta")}}function $p(n){x.tempo+=n,x.quadro++;let t=480;if(x.hora=(x.tempo/t*24+8)%24,x.dia=1+Math.floor((x.tempo/t*24+8)/24),x.noite=x.hora<6||x.hora>=19.5,x.dinheiro+=x.cfgDif.renda*n,x.ruidos=x.ruidos.filter(i=>x.tempo-i.t<3),x.ruidos.length>60&&x.ruidos.splice(0,x.ruidos.length-60),x.tempo>=x.proxFoco&&(Ky(),x.proxFoco=x.tempo+Math.max(35,80-x.focos*6)*x.cfgDif.intervalo),x.dia>=2&&(x.proxHorda||(x.proxHorda=x.tempo+30),x.tempo>=x.proxHorda&&(Qy(),x.proxHorda=x.tempo+Math.max(70,160-x.dia*20)*x.cfgDif.intervalo)),x.swatPendente)for(let i=x.swatPendente.length-1;i>=0;i--){let s=x.swatPendente[i];x.tempo>=s.t&&(x.swatPendente.splice(i,1),Bu(s.x,s.z,s.nome))}Np(n),Bp(n);let e=x.porta;if(e&&e.vivo&&e.fila.length){let i=e.fila[0];i.t-=n,i.t<=0&&(e.fila.shift(),Yp(i.tipo,e))}if(x.resgateAcum&&(!x._ultResg||x.tempo-x._ultResg>2)&&(Yt(`\u2705 ${x.resgateAcum} civis chegaram \xE0 zona segura (+$${x.resgateAcum*40})`,null,null,"bom"),Qt("resgate"),x.resgateAcum=0,x._ultResg=x.tempo),!x.fim&&x.quadro%30===0){let i=Le.reduce((s,r)=>s+(r.base?0:r.civis),0);x.resgatados>=x.meta?Hp(`Voc\xEA resgatou ${x.resgatados} civis. Miami agradece!`):x.focos>=5&&x.nZumbis===0&&x.tempo>300?Hp("O surto foi contido: n\xE3o restou nenhum zumbi em Miami!"):x.focos>=2&&x.nCivis===0&&i===0&&Zp("N\xE3o restaram civis para resgatar.")}}function Hp(n){x.fim=!0,x.pausado=!0,x.ui&&x.ui.fim(!0,n)}function Zp(n){x.fim||(x.fim=!0,x.pausado=!0,x.ui&&x.ui.fim(!1,n))}x.derrota=Zp;var te=n=>document.querySelector(n),rs=(n,t,e)=>{let i=document.createElement(n);return t&&(i.className=t),e!==void 0&&(i.innerHTML=e),i},Jp=n=>Math.floor(n).toLocaleString("pt-BR"),zc=class{constructor(t){this.cam=t,this.pings=[],this.raiz=te("#ui"),this.ov=te("#overlay"),this.ctx=this.ov.getContext("2d"),this.abaProd="quartel",this.montar(),x.ui=this}montar(){this.raiz.innerHTML=`
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
    `;let t=(h,u)=>te(h).addEventListener("click",f=>{f.stopPropagation(),Li(),u(f)});t("#b-pausa",()=>{x.pausado=!x.pausado,this.atualizarTopo()}),t("#b-vel",()=>{x.velocidade=x.velocidade>=3?1:x.velocidade+1,te("#b-vel").textContent=x.velocidade+"x"}),t("#b-menu",()=>this.menuPausa()),t("#b-prod",()=>this.abrirProducao()),t("#p-fechar",()=>te("#producao").classList.add("oculto")),t("#b-caixa",()=>this.modoCaixa(!x.modoCaixa)),t("#b-multi",()=>{x.selecaoMultipla=!x.selecaoMultipla,te("#b-multi").classList.toggle("ativo",x.selecaoMultipla)}),t("#b-terra",()=>this.selecionarGrupo(h=>h.classe==="inf"||h.classe==="veic")),t("#b-aereo",()=>this.selecionarGrupo(h=>h.classe==="aereo")),t("#b-naval",()=>this.selecionarGrupo(h=>h.classe==="naval"&&h.tipo!=="portaavioes")),t("#b-jato",()=>this.selecionarGrupo(h=>h.classe==="jato")),t("#b-base",()=>this.cam.irPara(x.estr.qg.x,x.estr.qg.z,450)),t("#b-porta",()=>this.cam.irPara(x.porta.x,x.porta.z,600)),t("#b-alerta",()=>{let h=[...x.alertas].reverse().find(u=>u.x!=null);h&&this.cam.irPara(h.x,h.z,Math.min(this.cam.dist,350))}),t("#b-sair-controle",()=>this.controlar(null));let e=te("#mini"),i=au(10);this.miniFundo=i;let s=h=>{let u=e.getBoundingClientRect(),f=(h.clientX-u.left)/u.width*Oe,d=(h.clientY-u.top)/u.height*Be;this.cam.irPara(f,d)};e.addEventListener("pointerdown",h=>{h.stopPropagation(),s(h),e.setPointerCapture(h.pointerId),e._arr=!0}),e.addEventListener("pointermove",h=>{e._arr&&s(h)}),e.addEventListener("pointerup",()=>{e._arr=!1});let r=te("#joy"),o=te("#joy-bola"),a=null,c=h=>{let u=r.getBoundingClientRect(),f=(h.clientX-u.left-u.width/2)/(u.width/2),d=(h.clientY-u.top-u.height/2)/(u.height/2),g=Math.hypot(f,d);g>1&&(f/=g,d/=g),x.joyUI={x:f,y:d},o.style.transform=`translate(${f*40}px, ${d*40}px)`};r.addEventListener("pointerdown",h=>{h.stopPropagation(),a=h.pointerId,r.setPointerCapture(a),c(h)}),r.addEventListener("pointermove",h=>{h.pointerId===a&&c(h)});let l=()=>{a=null,x.joyUI=null,o.style.transform=""};r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l);for(let h of["#topo","#lateral","#selecao","#producao","#info","#alertas"])te(h).addEventListener("pointerdown",u=>u.stopPropagation())}ajustarCidade(){if(!Ge){te("#b-naval").classList.add("oculto");let t=te("#b-porta");t.innerHTML="\u2708\uFE0F<small>Pista</small>"}}atualizarConstrucao(){let t=te("#b-cancela-constr");t||(t=rs("button","bt destaque","\u2716 Cancelar constru\xE7\xE3o"),t.id="b-cancela-constr",t.style.cssText="position:fixed;left:50%;bottom:12px;transform:translateX(-50%);pointer-events:auto",t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.stopPropagation(),x.construindo=null,this.atualizarConstrucao()}),this.raiz.appendChild(t)),t.classList.toggle("oculto",!x.construindo)}modoCaixa(t){x.modoCaixa=t,te("#b-caixa").classList.toggle("ativo",t)}selecionarGrupo(t){if(x.selecao.slice().forEach(e=>Sn(e,!1)),x.selecao=x.unidades.filter(e=>e.vivo&&!e.estr&&!e.dentro&&!e.policia&&t(e)),x.selecao.forEach(e=>Sn(e,!0)),Qt("clique"),Pc(),this.atualizarSelecao(),x.selecao.length){let e=0,i=0;for(let s of x.selecao)e+=s.x,i+=s.z;x.selecao.length===1&&x.selecao[0].classe!=="jato"&&this.cam.irPara(e/x.selecao.length,i/x.selecao.length)}}atualizarTopo(){te("#t-din").textContent="\u{1F4B5} $"+Jp(x.dinheiro),te("#t-res").textContent=`\u2705 ${x.resgatados}/${x.meta}`;let t=this._presos||0;te("#t-civ").textContent=`\u{1F9CD} ${x.nCivis||0}`+(t?` +${t}\u{1F3E2}`:""),te("#t-zum").textContent=`\u{1F9DF} ${x.nZumbis||0}`;let e=x.populacao?Math.round(x.infectados/x.populacao*100):0;te("#t-inf").textContent=`\u2623\uFE0F ${e}%`;let i=Math.floor(x.hora||8),s=Math.floor((x.hora||8)%1*60);te("#t-hora").textContent=`${x.noite?"\u{1F319}":"\u2600\uFE0F"} Dia ${x.dia||1} ${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`,te("#b-pausa").textContent=x.pausado?"\u25B6":"\u23F8",te("#producao").classList.contains("oculto")||this.atualizarProducao()}alerta(t,e,i,s){let r=te("#alertas");if(!r)return;let o=rs("div","alerta "+s,t);for(e!=null&&(o.classList.add("clicavel"),o.addEventListener("click",a=>{a.stopPropagation(),this.cam.irPara(e,i,Math.min(this.cam.dist,350))})),r.prepend(o);r.children.length>4;)r.lastChild.remove();setTimeout(()=>{o.classList.add("saindo"),setTimeout(()=>o.remove(),600)},s==="surto"?9e3:5500)}ping(t,e,i){this.pings.push({x:t,z:e,tipo:i,t:0})}atualizarSelecao(){let t=x.selecao.filter(a=>a.vivo&&!a.dentro);x.selecao=t;let e=te("#selecao");if(!t.length){e.classList.add("oculto");return}e.classList.remove("oculto");let i={};for(let a of t)i[a.tipo]=(i[a.tipo]||0)+1;let s=Object.entries(i).map(([a,c])=>`<span class="tag">${Bn[a].icone} ${c>1?c+"\xD7 ":""}${Bn[a].nome}</span>`).join("");if(t.length===1){let a=t[0];if(s+=`<div class="sub">${a.d.sub||""}</div><div class="barra"><i style="width:${Math.max(0,a.hp/a.hpMax*100)}%"></i></div>`,a.d.carga){let c=a.passageiros.filter(h=>h.agente).length,l=a.passageiros.length-c;s+=`<div class="sub">Carga: ${a.cargaUsada}/${a.d.carga} \u2022 ${l} militares, ${c} civis</div>`}a.predio&&(s+=`<div class="sub">No telhado (${a.predio.guarnicao.length}/${a.predio.cap}) \u2022 estrutura ${Math.round(a.predio.integridade)}</div>`),a.classe==="jato"&&(s+=`<div class="sub">${{pronto:"Pronto para decolar",decolando:"Decolando",voando:"Em miss\xE3o",voltando:"Voltando para a base",aproximando:"Aproxima\xE7\xE3o para pouso",pousando:"Pousando",rearmando:"Rearmando..."}[a.estadoJato]} \u2022 muni\xE7\xE3o ${a.municao}/${a.d.municao}</div>`)}te("#sel-info").innerHTML=s;let r=te("#sel-bts");r.innerHTML="";let o=(a,c,l="")=>{let h=rs("button","bt "+l,a);h.addEventListener("click",u=>{u.stopPropagation(),Li(),Qt("clique"),c(),this.atualizarSelecao()}),r.appendChild(h)};o("\u{1F6D1} Parar",()=>{for(let a of t)a.ordem=null,a.caminho=null,a.alvo=null,a.classe==="aereo"&&(a.altAlvo=Math.max(a.y,a.d.altCruz*.6))}),t.some(a=>a.passageiros&&a.passageiros.length)&&o("\u2B07\uFE0F Desembarcar",()=>{for(let a of t)a.passageiros&&a.passageiros.length&&Di(a)}),t.some(a=>a.classe==="aereo")&&o("\u{1F6EC} Pousar",()=>{for(let a of t)a.classe==="aereo"&&(a.ordem={tipo:"pousar"})}),t.some(a=>a.predio)&&o("\u{1F3C3} Sair do pr\xE9dio",()=>{for(let a of t)a.predio&&Eo(a)}),t.some(a=>a.classe==="jato")&&o(x.modoArea?"\u{1F3AF} \xC1rea: LIGADA":"\u{1F3AF} Marcar \xE1rea",()=>{x.modoArea=!x.modoArea},x.modoArea?"ativo":""),t.some(a=>a.classe==="jato")&&o("\u{1F6F3}\uFE0F Voltar",()=>{for(let a of t)a.classe==="jato"&&a.estadoJato==="voando"&&(a.estadoJato="voltando")}),t.length===1&&t[0].classe!=="jato"&&o("\u{1F3AE} Controlar",()=>this.controlar(t[0]),"destaque"),o("\u{1F3A5} Seguir",()=>{this.cam.seguir=t[0],this.cam.dist>300&&(this.cam.dist=t[0].classe==="inf"?60:150)}),o("\u2716",()=>{t.forEach(a=>Sn(a,!1)),x.selecao=[],x.modoArea=!1})}controlar(t){x.controlando&&(x.controlando.ordem=null),x.controlando=t,te("#joy").classList.toggle("oculto",!t),te("#b-sair-controle").classList.toggle("oculto",!t),te("#lateral").classList.toggle("oculto",!!t),te("#mini").classList.toggle("oculto",!!t),te("#selecao").classList.toggle("escondida",!!t),t?(this.cam.seguir=t,this.cam.dist=t.classe==="inf"?22:t.classe==="aereo"?90:t.classe==="naval"?t.d.raio>20?400:90:45,this.cam.inclExtra=-.1):this.cam.inclExtra=0}abrirProducao(t){t&&(this.abaProd=t),!cc[this.abaProd]&&this.abaProd!=="construir"&&(this.abaProd="quartel"),te("#producao").classList.remove("oculto");let e=te("#p-abas");e.innerHTML="";for(let s of["construir",...Object.keys(cc)]){if(!Ge&&(s==="docas"||s==="porta")||Ge&&s==="pista"&&!x.unidades.some(o=>o.vivo&&o.tipoEstr==="pista"))continue;let r=rs("button","aba"+(s===this.abaProd?" ativo":""),s==="construir"?"\u{1F528} Construir":s==="porta"&&!Ge?"\u2708\uFE0F Aer\xF3dromo":ip[s]);r.addEventListener("click",o=>{o.stopPropagation(),this.abaProd=s,this.abrirProducao()}),e.appendChild(r)}let i=te("#p-lista");if(i.innerHTML="",this.abaProd==="construir"){for(let s in go){let r=go[s];if(r.agua&&!Ge)continue;let o=rs("div","carta"+(x.construindo===s?" sel":""),`<div class="ic">${r.icone}</div><div class="tx"><b>${r.nome}</b><small>${r.sub}</small><span>$${r.custo} \u2022 ${r.tempo}s</span></div>`);o.dataset.custo=r.custo,o.addEventListener("click",a=>{if(a.stopPropagation(),Li(),x.dinheiro<r.custo){Qt("erro");return}x.construindo=s,te("#producao").classList.add("oculto"),this.alerta(`\u{1F528} Toque no mapa onde quer construir: ${r.nome}${r.agua?" (na beira da \xE1gua)":""}. Toque em \u2716 para cancelar.`,null,null,"info"),this.atualizarConstrucao()}),i.appendChild(o)}te("#p-fila").innerHTML="<i>Escolha a estrutura e toque no mapa. Bases novas produzem unidades e as zonas seguras/FOB recebem civis.</i>",te("#p-fila")._chave=null;return}for(let s of cc[this.abaProd]){let r=Bn[s],o=rs("div","carta",`<div class="ic">${r.icone}</div><div class="tx"><b>${r.nome}</b><small>${r.sub}</small><span>$${r.custo} \u2022 ${r.tempo}s</span></div>`);o.dataset.custo=r.custo,o.addEventListener("click",a=>{a.stopPropagation(),Li(),Ic(s,this.abaProd)&&this.atualizarProducao()}),i.appendChild(o)}this.atualizarProducao()}atualizarProducao(){te("#p-din").textContent=" \u{1F4B5} $"+Jp(x.dinheiro);for(let s of document.querySelectorAll("#p-lista .carta"))s.classList.toggle("caro",x.dinheiro<+s.dataset.custo);if(this.abaProd==="construir")return;let t=Co(this.abaProd),e=te("#p-fila");if(!t||!t.vivo){e.innerHTML="<i>Estrutura destru\xEDda</i>";return}let i=t.fila.map(s=>s.tipo).join(",");e._chave!==i&&(e._chave=i,e.innerHTML=t.fila.length?"":"<i>Fila vazia \u2014 toque numa unidade para produzir</i>",t.fila.forEach((s,r)=>{let o=rs("div","item",`${Bn[s.tipo].icone}<i></i>`);o.title="Cancelar",o.addEventListener("click",a=>{a.stopPropagation(),qp(this.abaProd,r),this.atualizarProducao()}),e.appendChild(o)})),t.fila.forEach((s,r)=>{let o=e.children[r];o&&o.querySelector("i")&&(o.querySelector("i").style.width=100-s.t/s.total*100+"%")})}infoPredio(t){let e=te("#info");e.classList.remove("oculto");let i=t.base?"Pr\xE9dio da base":t.h>60?"Arranha-c\xE9u":t.h>15?"Pr\xE9dio":"Casa / loja";e.innerHTML=`<b>\u{1F3E2} ${i}</b> \u2022 ${Math.round(t.h)} m de altura<br>
      Soldados no telhado: ${t.guarnicao.length}/${t.cap}<br>
      ${t.civis?t.sos?`\u{1F198} <b>${t.civis} civis presos</b> pedindo socorro!`:`\u{1F3E0} ${t.civis} civis abrigados`:"Sem civis"}<br>
      <small>Selecione soldados e toque no pr\xE9dio para coloc\xE1-los no telhado. Com civis dentro, as tropas os resgatam; helic\xF3pteros pegam pelo telhado.</small>`,clearTimeout(this._tInfo),this._tInfo=setTimeout(()=>e.classList.add("oculto"),6e3)}desenharMini(){let t=te("#mini"),e=t.getContext("2d"),i=t.width/Oe,s=t.height/Be;e.drawImage(this.miniFundo,0,0,t.width,t.height),e.fillStyle="#ff3b3b";for(let o of x.agentes)o.vivo&&o.zumbi&&!o.dentro&&o.estado!=="morto"&&e.fillRect(o.x*i-.5,o.z*s-.5,1.6,1.6);e.fillStyle="#ffffff";for(let o of x.agentes)o.vivo&&!o.zumbi&&!o.dentro&&o.estado!=="morto"&&e.fillRect(o.x*i-.5,o.z*s-.5,1.2,1.2);for(let o of Le)o.civis>0&&(e.fillStyle=o.sos?"#ffd23b":"#5bc0ff",e.fillRect(o.cx*i-1.5,o.cz*s-1.5,3,3));for(let o of x.acampamentos||[])o.ativo&&(e.fillStyle=o.policia?"#3c5cff":"#ff9a2e",e.beginPath(),e.arc(o.x*i,o.z*s,3,0,6.29),e.fill());for(let o of x.unidades){if(!o.vivo||o.dentro)continue;e.fillStyle=o.estr?"#7ad1ff":o.policia?"#ffe14d":o.sel?"#7dff8a":"#3b8bff";let a=o.tipo==="portaavioes"?3.5:o.estr?2.5:2;e.fillRect(o.x*i-a/2,o.z*s-a/2,a,a)}let r=[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([o,a])=>this.cam.chao(o,a));r.every(o=>o)&&(e.strokeStyle="rgba(255,255,255,0.8)",e.lineWidth=1,e.beginPath(),r.forEach((o,a)=>(a?e.lineTo:e.moveTo).call(e,o.x*i,o.z*s)),e.closePath(),e.stroke())}desenharOverlay(t){let e=innerWidth,i=innerHeight,s=Math.min(2,devicePixelRatio||1);this.ov.width!==Math.round(e*s)&&(this.ov.width=Math.round(e*s),this.ov.height=Math.round(i*s));let r=this.ctx;r.setTransform(s,0,0,s,0,0),r.clearRect(0,0,e,i);let o=this.cam.cam,a=this.cam.dist>900;if(x.longe=a,a){for(let l of x.agentes){if(!l.vivo||l.dentro||l.estado==="morto")continue;let h=an(l.x,0,l.z,o);!h||h.x<0||h.y<0||h.x>e||h.y>i||(r.fillStyle=l.zumbi?"#ff2a2a":"#ffffff",r.fillRect(h.x-1.5,h.y-1.5,3,3))}for(let l of x.unidades){if(!l.vivo||l.dentro||l.estr)continue;let h=an(l.x,l.y,l.z,o);h&&(r.fillStyle=l.policia?"#ffe14d":l.sel?"#5dff6f":"#3d8bff",r.strokeStyle="#001b44",r.beginPath(),r.arc(h.x,h.y,l.classe==="inf"?3:5,0,6.29),r.fill(),r.stroke())}}r.textAlign="center",r.textBaseline="middle";for(let l of Le){if(!(l.civis>0||l.guarnicao.length))continue;let h=an(l.cx,l.h+4,l.cz,o);if(!h||h.x<-40||h.y<-40||h.x>e+40||h.y>i+40)continue;let u=h.y;if(l.civis>0){let f=l.sos?Math.sin(performance.now()/250)>0?"#ff3030":"#ffd23b":"#2e8bd8";r.fillStyle=f,Xu(r,h.x-26,u-11,52,20,6),r.fill(),r.fillStyle="#fff",r.font="bold 12px sans-serif",r.fillText((l.sos?"SOS ":"\u{1F3E0} ")+l.civis,h.x,u),u-=24}if(l.guarnicao.length){r.fillStyle="rgba(20,70,20,0.85)",Xu(r,h.x-24,u-10,48,18,5),r.fill(),r.fillStyle="#bfffbf",r.font="bold 11px sans-serif",r.fillText("\u{1FA96} "+l.guarnicao.length+"/"+l.cap,h.x,u-1);let f=l.integridade/l.integMax;r.fillStyle="#300",r.fillRect(h.x-22,u+6,44,3),r.fillStyle=f>.5?"#4f4":f>.2?"#fd3":"#f33",r.fillRect(h.x-22,u+6,44*f,3)}}for(let l of x.acampamentos||[]){if(!l.ativo)continue;let h=an(l.x,6,l.z,o);if(!h||h.x<-40||h.y<-40||h.x>e+40||h.y>i+40)continue;let u=l.membros.filter(f=>f.armado).length;r.fillStyle=l.policia?"rgba(40,70,200,0.9)":"rgba(210,120,30,0.92)",Xu(r,h.x-44,h.y-11,88,20,6),r.fill(),r.fillStyle="#fff",r.font="bold 11px sans-serif",r.fillText(`${l.policia?"\u{1F694}":"\u{1F3D5}\uFE0F"} ${l.membros.length} (${u}\u{1F52B})`,h.x,h.y)}for(let l of x.unidades){if(!l.vivo||l.dentro||!(l.sel||l.hp<l.hpMax*.98)||a&&!l.sel)continue;let h=l.classe==="inf"?2.3:l.estr?22:(l.d.raio||2)*.9+2,u=an(l.x,l.y+h,l.z,o);if(!u)continue;let f=l.estr?60:l.classe==="inf"?18:34,d=Math.max(0,l.hp/l.hpMax);r.fillStyle="rgba(0,0,0,0.6)",r.fillRect(u.x-f/2-1,u.y-1,f+2,5),r.fillStyle=d>.6?"#46e05a":d>.3?"#f2d43a":"#ef3b3b",r.fillRect(u.x-f/2,u.y,f*d,3),l.sel&&l.classe==="inf"&&(r.strokeStyle="#5dff6f",r.lineWidth=1.5,r.beginPath(),r.arc(u.x,u.y+14,9,0,6.29),r.stroke()),l.d.carga&&l.passageiros.length&&(r.fillStyle="#fff",r.font="10px sans-serif",r.fillText(`${l.passageiros.length}\u{1F464}`,u.x,u.y-8))}for(let l=this.pings.length-1;l>=0;l--){let h=this.pings[l];if(h.t+=t,h.t>.8){this.pings.splice(l,1);continue}let u=an(h.x,.5,h.z,o);if(!u)continue;let f={mover:"#5dff6f",atacar:"#ff4040",embarque:"#5bc0ff",guarnecer:"#ffd23b",resgate:"#ffd23b"}[h.tipo]||"#fff";r.strokeStyle=f,r.lineWidth=2.5,r.globalAlpha=1-h.t/.8,r.beginPath(),r.arc(u.x,u.y,6+h.t*30,0,6.29),r.stroke(),r.globalAlpha=1}let c=[];if(x.area&&c.push({...x.area,w:Math.max(40,Math.min(160,Math.hypot(x.area.x1-x.area.x0,x.area.z1-x.area.z0)*.35)),alfa:1}),x.areaMarcada){let l=(performance.now()-x.areaMarcada.t)/1e3;l<6?c.push({...x.areaMarcada,alfa:1-l/6}):x.areaMarcada=null}for(let l of c){let h=Math.hypot(l.x1-l.x0,l.z1-l.z0)||1,u=(l.x1-l.x0)/h,f=(l.z1-l.z0)/h,d=-f*l.w/2,g=u*l.w/2,v=[[l.x0+d,l.z0+g],[l.x1+d,l.z1+g],[l.x1-d,l.z1-g],[l.x0-d,l.z0-g]].map(([M,_])=>an(M,.5,_,o));if(v.some(M=>!M))continue;r.globalAlpha=l.alfa,r.fillStyle="rgba(255,40,40,0.22)",r.strokeStyle="#ff3b3b",r.lineWidth=2.5,r.setLineDash([10,6]),r.beginPath(),v.forEach((M,_)=>(_?r.lineTo:r.moveTo).call(r,M.x,M.y)),r.closePath(),r.fill(),r.stroke(),r.setLineDash([]);let m=an(l.x0,.5,l.z0,o),p=an(l.x1,.5,l.z1,o);m&&p&&(r.beginPath(),r.moveTo(m.x,m.y),r.lineTo(p.x,p.y),r.stroke(),r.fillStyle="#ff3b3b",r.font="bold 13px sans-serif",r.fillText("\u{1F3AF} BOMBARDEIO",(m.x+p.x)/2,(m.y+p.y)/2-10)),r.globalAlpha=1}if(x.caixa){let l=x.caixa;r.strokeStyle="#5dff6f",r.lineWidth=1.5,r.fillStyle="rgba(93,255,111,0.12)",r.fillRect(Math.min(l.x0,l.x1),Math.min(l.y0,l.y1),Math.abs(l.x1-l.x0),Math.abs(l.y1-l.y0)),r.strokeRect(Math.min(l.x0,l.x1),Math.min(l.y0,l.y1),Math.abs(l.x1-l.x0),Math.abs(l.y1-l.y0))}}menuPausa(){x.pausado=!0,this.atualizarTopo();let t=this.modal(`<h2>Pausado</h2>
      <button class="bt grande" data-a="voltar">\u25B6 Continuar</button>
      <button class="bt" data-a="ajuda">\u2753 Como jogar</button>
      <label><input type="checkbox" data-a="som" ${x.cfg.som?"checked":""}> \u{1F50A} Som</label>
      <button class="bt" data-a="nova">\u{1F504} Nova partida</button>`);t.querySelector("[data-a=voltar]").onclick=()=>{t.remove(),x.pausado=!1,this.atualizarTopo()},t.querySelector("[data-a=ajuda]").onclick=()=>this.ajuda(),t.querySelector("[data-a=som]").onchange=e=>{x.cfg.som=e.target.checked,yo(e.target.checked),x.salvarCfg()},t.querySelector("[data-a=nova]").onclick=()=>location.reload()}ajuda(){let t=this.modal(`<h2>Como jogar</h2><div class="ajuda">${tM}</div><button class="bt grande" data-a="ok">Entendi</button>`);t.querySelector("[data-a=ok]").onclick=()=>t.remove()}modal(t){let e=rs("div","modal",`<div class="caixa">${t}</div>`);return e.addEventListener("pointerdown",i=>i.stopPropagation()),document.body.appendChild(e),e}fim(t,e){let i=Math.floor(x.tempo/60),s=this.modal(`<h2>${t?"\u{1F3C6} Vit\xF3ria!":"\u2620\uFE0F Derrota"}</h2><p>${e}</p>
      <div class="stats">\u2705 Civis resgatados: <b>${x.resgatados}</b><br>\u{1F9DF} Zumbis eliminados: <b>${x.zumbisMortos}</b><br>
      \u2623\uFE0F Pessoas infectadas: <b>${x.infectados}</b><br>\u{1F480} Civis mortos: <b>${x.civisMortos}</b><br>\u{1FA96} Unidades perdidas: <b>${x.perdas}</b><br>\u23F1\uFE0F Tempo: <b>${i} min</b> (dia ${x.dia})</div>
      ${t?'<button class="bt grande" data-a="cont">Continuar jogando</button>':""}
      <button class="bt grande" data-a="nova">\u{1F504} Nova partida</button>`),r=s.querySelector("[data-a=cont]");r&&(r.onclick=()=>{s.remove(),x.pausado=!1,x.meta=99999,this.atualizarTopo()}),s.querySelector("[data-a=nova]").onclick=()=>location.reload()}quadro(t){this._t=(this._t||0)+t,this._tm=(this._tm||0)+t,this._t>.25&&(this._t=0,this._presos=Le.reduce((e,i)=>e+(i.base?0:i.civis),0),this.atualizarTopo(),x.selecao.length&&this.atualizarSelecaoLeve()),this._tm>.5&&(this._tm=0,this.desenharMini()),this.desenharOverlay(t)}atualizarSelecaoLeve(){this._ts=(this._ts||0)+1,this._ts%4===0&&this.atualizarSelecao()}};function Xu(n,t,e,i,s,r){n.beginPath(),n.moveTo(t+r,e),n.arcTo(t+i,e,t+i,e+s,r),n.arcTo(t+i,e+s,t,e+s,r),n.arcTo(t,e+s,t,e,r),n.arcTo(t,e,t+i,e,r),n.closePath()}var tM=`
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
<p><b>\u{1F3D5}\uFE0F Sobreviventes:</b> civis que ningu\xE9m resgata se juntam, acham armas e montam acampamentos com barricadas (marcador laranja). Eles se defendem sozinhos. Leve tropas ou um ve\xEDculo at\xE9 o acampamento e eles aceitam o resgate. Se a cidade ficar muito infectada, a pol\xEDcia e a SWAT desistem e viram sobreviventes tamb\xE9m (marcador azul).</p>
<p><b>Dicas:</b> tiros e explos\xF5es fazem barulho e atraem zumbis. \xC0 noite eles ficam mais r\xE1pidos. A partir do dia 2 chegam hordas do continente e aparecem zumbis corredores; no dia 3, brutamontes. Cuidado com o fogo amigo de artilharia perto de civis.</p>`;var ti=n=>document.querySelector(n),Lc=n=>{let t=ti("#carregando-txt");t&&(t.textContent=n)};function eM(){try{Object.assign(x.cfg,JSON.parse(localStorage.getItem("miami-cfg")||"{}"))}catch{}}x.salvarCfg=()=>{try{localStorage.setItem("miami-cfg",JSON.stringify(x.cfg))}catch{}};var qu=new Bt(11128808),nM=new Bt(15774330),iM=new Bt(858160),sM=[.78,.86,.66];async function rM(){var I;eM(),Lc("Preparando o mapa de Miami..."),await new Promise(S=>setTimeout(S,30));let n=(I=x.cfg.qualidade)!=null?I:1,t=new Ea({antialias:n>=2,powerPreference:"high-performance"});t.setPixelRatio(n===0?Math.min(1,devicePixelRatio)*.75:Math.min(n===1?1.5:2,devicePixelRatio)),t.setSize(innerWidth,innerHeight),t.outputColorSpace=Re,t.toneMapping=qh,t.toneMappingExposure=1.05,t.shadowMap.enabled=n>=1,t.shadowMap.type=Xh,ti("#jogo").appendChild(t.domElement);let e=new Ta;e.background=qu.clone(),e.fog=new Aa(qu.clone(),2500,11e3);let i=new ln(50,innerWidth/innerHeight,1,15e3);x.cena=e,x.camera=i,x.renderer=t;let s=new Ga(13624319,6116422,1.1);e.add(s);let r=new Wa(16773336,3.2);r.position.set(-.5,1,.35),r.castShadow=n>=1,r.shadow.mapSize.set(n>=2?4096:2048,n>=2?4096:2048),r.shadow.bias=-4e-4,r.shadow.normalBias=.6,r.shadow.camera.near=10,r.shadow.camera.far=6e3,e.add(r),e.add(r.target),x.sol=r,Lc("Lendo pr\xE9dios e ruas (dados de sat\xE9lite)..."),await new Promise(S=>setTimeout(S,20)),Vp(),Lc("Construindo a cidade em 3D..."),await new Promise(S=>setTimeout(S,20)),Gp(),x.bonecos=new ic(e),x.efeitos=new ac(e),x.hashA=new lo(16,Oe,Be,4096),x.hashU=new lo(24,Oe,Be,1024);let o=new Rc(i);x.cam=o;let a=we[(_e.focos||[])[0]]||we.base;o.irPara(a.x,a.z,1400),o.yaw=.6,Lp(t.domElement,o);let c=new zc(o);c.ajustarCidade(),yo(x.cfg.som!==!1),addEventListener("resize",()=>{t.setSize(innerWidth,innerHeight),i.aspect=innerWidth/innerHeight,i.updateProjectionMatrix()}),window.androidBack=()=>{let S=document.querySelector(".modal");if(!(S&&!ti("#menu").classList.contains("oculto"))){if(S){S.remove(),x.pausado=!1;return}if(x.controlando){c.controlar(null);return}c.menuPausa()}};let l=new Ms,h=new ie,u=new U,f=performance.now();function d(S,T){if(x.longe)return!1;u.set(S,1,T);let R=S-i.position.x,E=T-i.position.z;return R*R+E*E>900*900?!1:l.containsPoint(u)}function g(S){x.orcamentoCaminhos=4,x.hashA.limpar();for(let T of x.agentes)T.vivo&&!T.dentro&&T.estado!=="morto"&&x.hashA.add(T);x.hashU.limpar();for(let T of x.unidades)T.vivo&&!T.dentro&&x.hashU.add(T);$p(S),Ap(S),_p(S),Ep(S)}function v(S){var W;let T=(W=x.hora)!=null?W:8,R;T>=6.5&&T<=18?R=1:T>18&&T<20?R=1-(T-18)/2*.72:T>5&&T<6.5?R=.28+(T-5)/1.5*.72:R=.28;let E=T>17&&T<20?1-Math.abs(T-18.7)/1.5:T>5&&T<7.5?1-Math.abs(T-6.2)/1.3:0,b=e.background;b.copy(iM).lerp(qu,(R-.28)/.72),E>0&&b.lerp(nM,Math.max(0,E)*.55),e.fog.color.copy(b),r.intensity=3.2*Math.max(.12,R-.1)+(R<.5?.25:0),s.intensity=.35+.8*R;let P=(T-6)/12*Math.PI,N=T>=6&&T<=18.5,D=N?.35+.65*Math.max(0,Math.sin(P)):.9;x.dirSol={x:N?-Math.cos(P)*.9:.4,y:D,z:.45},r.color.setHex(E>.3?16758900:R<.5?9414399:16773336),x.agua.userData.tempo.value+=S;let F=Math.max(0,Math.min(1,(.85-R)/.5));for(let L in Pi)Pi[L].emissiveIntensity=F*.9}function m(S){requestAnimationFrame(m);let T=Math.min(.05,(S-f)/1e3);f=S,x.teclado&&x.teclado(T);let R=x.joyUI||(x.joyTeclado?{x:x.joyTeclado.x,y:x.joyTeclado.z}:null);if(R){let L=Math.sin(o.yaw),Y=Math.cos(o.yaw);x.joy={x:Y*R.x+L*R.y,z:-L*R.x+Y*R.y}}else x.joy=null;let E=performance.now();if(!x.pausado&&x.iniciado)for(let L=0;L<x.velocidade;L++)g(T);let b=performance.now();if(x.perfSim=(x.perfSim||0)*.95+(b-E)*.05,o.aplicar(T),x.dirSol){let L=Math.min(2200,Math.max(70,o.dist*1.25)),Y=r.shadow.camera;Math.abs(Y.right-L)>L*.1&&(Y.left=-L,Y.right=L,Y.top=L,Y.bottom=-L,Y.updateProjectionMatrix());let H=2*L/r.shadow.mapSize.x,Q=Math.round(o.alvo.x/H)*H,et=Math.round(o.alvo.z/H)*H,tt=x.dirSol,ut=Math.hypot(tt.x,tt.y,tt.z);r.target.position.set(Q,0,et),r.position.set(Q+tt.x/ut*3e3,tt.y/ut*3e3,et+tt.z/ut*3e3)}if(x.decor){let L=o.dist<2200;for(let Y of x.decor)Y.visible=L}e.fog.near=Math.max(1500,o.dist*2.2),e.fog.far=Math.max(9e3,o.dist*6),v(x.pausado?0:T),h.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),l.setFromProjectionMatrix(h);let P=x.bonecos;if(P.comecar(),o.dist<900){for(let L of x.unidades){if(L.classe!=="inf"||!L.vivo||L.dentro||!d(L.x,L.z))continue;let Y=L.mirando>0&&L.velAtual<.5?2:0,H=Math.min(1,L.velAtual/3);L.policia?P.add(L.x,L.y,L.z,L.ang,L.fase,Y,rc,oc,po,2,1,null,H):P.add(L.x,L.y,L.z,L.ang,L.fase,Y,L.tipo==="sniper"?sM:fo,sc,po,1,1,null,H)}yp(P,d)}x.longe=o.dist>=900,P.terminar(),x.efeitos.atualizar(x.pausado?0:T*x.velocidade,innerHeight*.9);let N=0;for(let L of x.unidades)if(L.classe==="aereo"&&L.vivo&&!L.dentro&&!(L.pousado&&L.parado>3)){let Y=Math.hypot(L.x-o.alvo.x,L.z-o.alvo.z)+o.dist*.5;N=Math.max(N,1-Y/700)}mp(x.pausado?0:Math.max(0,N));let D=0,F=0,W=0;for(let L of x.unidades){if(!L.vivo||L.dentro)continue;let Y=Math.hypot(L.x-o.alvo.x,L.z-o.alvo.z)+o.dist*.5;if(L.classe==="jato"&&L.estadoJato!=="pronto"&&L.estadoJato!=="rearmando")D=Math.max(D,(1-Y/2600)*(L.estadoJato==="pousando"?.5:1));else if(L.classe==="veic"){let H=(1-Y/350)*(L.d.raio>=3.4?1:.55);H>F&&(F=H,W=Math.min(1,L.velAtual/L.d.vel))}}gp(x.pausado?0:Math.max(0,D)),xp(x.pausado?0:Math.max(0,F),W),t.render(e,i),x.iniciado&&c.quadro(T)}requestAnimationFrame(m),ti("#carregando").classList.add("oculto");let p=ti("#menu");p.classList.remove("oculto");let M="normal";p.querySelectorAll("[data-dif]").forEach(S=>S.addEventListener("click",()=>{M=S.dataset.dif,p.querySelectorAll("[data-dif]").forEach(T=>T.classList.toggle("ativo",T===S))}));let _=ti("#m-som"),y=ti("#m-qual");_.checked=x.cfg.som!==!1,y.value=String(n),_.onchange=()=>{x.cfg.som=_.checked,yo(_.checked),x.salvarCfg()},y.onchange=()=>{x.cfg.qualidade=+y.value,x.salvarCfg(),ti("#m-qual-aviso").textContent="A qualidade muda ao abrir o jogo de novo."},ti("#m-ajuda").onclick=()=>c.ajuda(),p.querySelectorAll("[data-cidade]").forEach(S=>{S.classList.toggle("ativo",S.dataset.cidade===(_e.cidade||"miami")),S.addEventListener("click",()=>{if(S.dataset.cidade!==(_e.cidade||"miami")){try{localStorage.setItem("miami-cidade",S.dataset.cidade)}catch{}location.href=location.pathname+"?cidade="+S.dataset.cidade}})}),ti("#m-jogar").onclick=()=>{Li(),p.classList.add("oculto"),Wp(M),x.iniciado=!0,o.irPara(x.estr.qg.x,x.estr.qg.z,420),o.yaw=x.baseEixo.ang+Math.PI,c.atualizarTopo(),c.alerta(`\u{1F4FB} ${we.base.nome} operante. Relatos de ataques estranhos em ${_e.nome}...`,x.estr.qg.x,x.estr.qg.z,"info"),c.alerta("Dica: toque em \u2753 no menu \u2699\uFE0F para ver os controles",null,null,"info")},/[?&]auto/.test(location.search)&&ti("#m-jogar").click(),window.G=x,window.__dbg={ordenar:di,ordenarMover:pi,desembarcar:Di,enfileirar:Ic,simular:g,predios:Le,NAV:Eu,MAPA:du,tela:(S,T,R)=>an(S,T,R,i)}}rM().catch(n=>{console.error(n),Lc("Erro ao iniciar: "+n.message)});})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
