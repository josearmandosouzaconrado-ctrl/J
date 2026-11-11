(()=>{var Ep=Object.defineProperty;var bf=(n,t)=>{for(var e in t)Ep(n,e,{get:t[e],enumerable:!0})};var Qh="170";var Tp=0,Sf=1,wp=2;var Fd=1,tu=2,Ri=3,Qi=0,cn=1,ti=2,ji=0,cr=1,fr=2,Ef=3,Tf=4,Ap=5,ys=100,Rp=101,Cp=102,Pp=103,Ip=104,zp=200,Lp=201,Up=202,Dp=203,Tl=204,wl=205,Np=206,Bp=207,Fp=208,Op=209,kp=210,Hp=211,Vp=212,Gp=213,Wp=214,Al=0,Rl=1,Cl=2,dr=3,Pl=4,Il=5,zl=6,Ll=7,ec=0,Xp=1,qp=2,Ki=0,Yp=1,$p=2,Zp=3,eu=4,Jp=5,jp=6,Kp=7;var Od=300,pr=301,mr=302,Ul=303,Dl=304,nc=306,Gn=1e3,Ss=1001,Nl=1002,ln=1003,Qp=1004;var Wo=1005;var mn=1006,Wc=1007;var Es=1008;var Un=1009,kd=1010,Hd=1011,ao=1012,nu=1013,Ts=1014,ui=1015,vo=1016,iu=1017,su=1018,gr=1020,Vd=35902,Gd=1021,Wd=1022,vn=1023,Xd=1024,qd=1025,lr=1026,xr=1027,_o=1028,ru=1029,Yd=1030,ou=1031;var au=1033,ya=33776,Ma=33777,ba=33778,Sa=33779,Bl=35840,Fl=35841,Ol=35842,kl=35843,Hl=36196,Vl=37492,Gl=37496,Wl=37808,Xl=37809,ql=37810,Yl=37811,$l=37812,Zl=37813,Jl=37814,jl=37815,Kl=37816,Ql=37817,th=37818,eh=37819,nh=37820,ih=37821,Ea=36492,sh=36494,rh=36495,$d=36283,oh=36284,ah=36285,ch=36286;var Ta=2300,lh=2301,Xc=2302,wf=2400,Af=2401,Rf=2402;var tm=3200,em=3201;var ic=0,nm=1,Ji="",Ie="srgb",wr="srgb-linear",sc="linear",ve="srgb";var Xs=7680;var Cf=519,im=512,sm=513,rm=514,Zd=515,om=516,am=517,cm=518,lm=519,Pf=35044,is=35048;var If="300 es",Ci=2e3,wa=2001,ts=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var qc=Math.PI/180,hh=180/Math.PI;function Ar(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]+"-"+on[t&255]+on[t>>8&255]+"-"+on[t>>16&15|64]+on[t>>24&255]+"-"+on[e&63|128]+on[e>>8&255]+"-"+on[e>>16&255]+on[e>>24&255]+on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]).toLowerCase()}function Ke(n,t,e){return Math.max(t,Math.min(e,n))}function hm(n,t){return(n%t+t)%t}function Yc(n,t,e){return(1-e)*n+e*t}function $r(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function xn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var at=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ke(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qt=class n{constructor(t,e,i,s,r,o,a,c,h){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,h)}set(t,e,i,s,r,o,a,c,h){let l=this.elements;return l[0]=t,l[1]=s,l[2]=a,l[3]=e,l[4]=r,l[5]=c,l[6]=i,l[7]=o,l[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],h=i[1],l=i[4],u=i[7],f=i[2],d=i[5],p=i[8],v=s[0],m=s[3],g=s[6],M=s[1],_=s[4],y=s[7],R=s[2],w=s[5],A=s[8];return r[0]=o*v+a*M+c*R,r[3]=o*m+a*_+c*w,r[6]=o*g+a*y+c*A,r[1]=h*v+l*M+u*R,r[4]=h*m+l*_+u*w,r[7]=h*g+l*y+u*A,r[2]=f*v+d*M+p*R,r[5]=f*m+d*_+p*w,r[8]=f*g+d*y+p*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],l=t[8];return e*o*l-e*a*h-i*r*l+i*a*c+s*r*h-s*o*c}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],l=t[8],u=l*o-a*h,f=a*c-l*r,d=h*r-o*c,p=e*u+i*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/p;return t[0]=u*v,t[1]=(s*h-l*i)*v,t[2]=(a*i-s*o)*v,t[3]=f*v,t[4]=(l*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(i*c-h*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let c=Math.cos(r),h=Math.sin(r);return this.set(i*c,i*h,-i*(c*o+h*a)+o+t,-s*h,s*c,-s*(-h*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply($c.makeScale(t,e)),this}rotate(t){return this.premultiply($c.makeRotation(-t)),this}translate(t,e){return this.premultiply($c.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},$c=new Qt;function Jd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Aa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function um(){let n=Aa("canvas");return n.style.display="block",n}var zf={};function no(n){n in zf||(zf[n]=!0,console.warn(n))}function fm(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function dm(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function pm(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var he={enabled:!0,workingColorSpace:wr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ve&&(n.r=Ii(n.r),n.g=Ii(n.g),n.b=Ii(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ve&&(n.r=hr(n.r),n.g=hr(n.g),n.b=hr(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ji?sc:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Ii(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function hr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Lf=[.64,.33,.3,.6,.15,.06],Uf=[.2126,.7152,.0722],Df=[.3127,.329],Nf=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bf=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);he.define({[wr]:{primaries:Lf,whitePoint:Df,transfer:sc,toXYZ:Nf,fromXYZ:Bf,luminanceCoefficients:Uf,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:Lf,whitePoint:Df,transfer:ve,toXYZ:Nf,fromXYZ:Bf,luminanceCoefficients:Uf,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}});var qs,uh=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{qs===void 0&&(qs=Aa("canvas")),qs.width=t.width,qs.height=t.height;let i=qs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=qs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Aa("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ii(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ii(e[i]/255)*255):e[i]=Ii(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},mm=0,Ra=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=Ar(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Zc(s[o].image)):r.push(Zc(s[o]))}else r=Zc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Zc(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?uh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var gm=0,_n=class n extends ts{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Ss,s=Ss,r=mn,o=Es,a=vn,c=Un,h=n.DEFAULT_ANISOTROPY,l=Ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=Ar(),this.name="",this.source=new Ra(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=c,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Od)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Gn:t.x=t.x-Math.floor(t.x);break;case Ss:t.x=t.x<0?0:1;break;case Nl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Gn:t.y=t.y-Math.floor(t.y);break;case Ss:t.y=t.y<0?0:1;break;case Nl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};_n.DEFAULT_IMAGE=null;_n.DEFAULT_MAPPING=Od;_n.DEFAULT_ANISOTROPY=1;var Ne=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,c=t.elements,h=c[0],l=c[4],u=c[8],f=c[1],d=c[5],p=c[9],v=c[2],m=c[6],g=c[10];if(Math.abs(l-f)<.01&&Math.abs(u-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(l+f)<.1&&Math.abs(u+v)<.1&&Math.abs(p+m)<.1&&Math.abs(h+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let _=(h+1)/2,y=(d+1)/2,R=(g+1)/2,w=(l+f)/4,A=(u+v)/4,I=(p+m)/4;return _>y&&_>R?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=w/i,r=A/i):y>R?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=w/s,r=I/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=A/r,s=I/r),this.set(i,s,r,e),this}let M=Math.sqrt((m-p)*(m-p)+(u-v)*(u-v)+(f-l)*(f-l));return Math.abs(M)<.001&&(M=1),this.x=(m-p)/M,this.y=(u-v)/M,this.z=(f-l)/M,this.w=Math.acos((h+d+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},fh=class extends ts{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ne(0,0,t,e),this.scissorTest=!1,this.viewport=new Ne(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new _n(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Ra(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},zi=class extends fh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Ca=class extends _n{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var dh=class extends _n{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var yn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],h=i[s+1],l=i[s+2],u=i[s+3],f=r[o+0],d=r[o+1],p=r[o+2],v=r[o+3];if(a===0){t[e+0]=c,t[e+1]=h,t[e+2]=l,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=p,t[e+3]=v;return}if(u!==v||c!==f||h!==d||l!==p){let m=1-a,g=c*f+h*d+l*p+u*v,M=g>=0?1:-1,_=1-g*g;if(_>Number.EPSILON){let R=Math.sqrt(_),w=Math.atan2(R,g*M);m=Math.sin(m*w)/R,a=Math.sin(a*w)/R}let y=a*M;if(c=c*m+f*y,h=h*m+d*y,l=l*m+p*y,u=u*m+v*y,m===1-a){let R=1/Math.sqrt(c*c+h*h+l*l+u*u);c*=R,h*=R,l*=R,u*=R}}t[e]=c,t[e+1]=h,t[e+2]=l,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],c=i[s+1],h=i[s+2],l=i[s+3],u=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return t[e]=a*p+l*u+c*d-h*f,t[e+1]=c*p+l*f+h*u-a*d,t[e+2]=h*p+l*d+a*f-c*u,t[e+3]=l*p-a*u-c*f-h*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,h=a(i/2),l=a(s/2),u=a(r/2),f=c(i/2),d=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=f*l*u+h*d*p,this._y=h*d*u-f*l*p,this._z=h*l*p+f*d*u,this._w=h*l*u-f*d*p;break;case"YXZ":this._x=f*l*u+h*d*p,this._y=h*d*u-f*l*p,this._z=h*l*p-f*d*u,this._w=h*l*u+f*d*p;break;case"ZXY":this._x=f*l*u-h*d*p,this._y=h*d*u+f*l*p,this._z=h*l*p+f*d*u,this._w=h*l*u-f*d*p;break;case"ZYX":this._x=f*l*u-h*d*p,this._y=h*d*u+f*l*p,this._z=h*l*p-f*d*u,this._w=h*l*u+f*d*p;break;case"YZX":this._x=f*l*u+h*d*p,this._y=h*d*u+f*l*p,this._z=h*l*p-f*d*u,this._w=h*l*u-f*d*p;break;case"XZY":this._x=f*l*u-h*d*p,this._y=h*d*u-f*l*p,this._z=h*l*p+f*d*u,this._w=h*l*u+f*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],h=e[2],l=e[6],u=e[10],f=i+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(l-c)*d,this._y=(r-h)*d,this._z=(o-s)*d}else if(i>a&&i>u){let d=2*Math.sqrt(1+i-a-u);this._w=(l-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+h)/d}else if(a>u){let d=2*Math.sqrt(1+a-i-u);this._w=(r-h)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+l)/d}else{let d=2*Math.sqrt(1+u-i-a);this._w=(o-s)/d,this._x=(r+h)/d,this._y=(c+l)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ke(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,h=e._z,l=e._w;return this._x=i*l+o*a+s*h-r*c,this._y=s*l+o*c+r*a-i*h,this._z=r*l+o*h+i*c-s*a,this._w=o*l-i*a-s*c-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let h=Math.sqrt(c),l=Math.atan2(h,a),u=Math.sin((1-e)*l)/h,f=Math.sin(e*l)/h;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ff.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ff.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,h=2*(o*s-a*i),l=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+c*h+o*u-a*l,this.y=i+c*l+a*h-r*u,this.z=s+c*u+r*l-o*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Jc.copy(this).projectOnVector(t),this.sub(Jc)}reflect(t){return this.sub(Jc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ke(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jc=new N,Ff=new yn,Li=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Jn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Jn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Jn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Jn):Jn.fromBufferAttribute(r,o),Jn.applyMatrix4(t.matrixWorld),this.expandByPoint(Jn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xo.copy(i.boundingBox)),Xo.applyMatrix4(t.matrixWorld),this.union(Xo)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Jn),Jn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Zr),qo.subVectors(this.max,Zr),Ys.subVectors(t.a,Zr),$s.subVectors(t.b,Zr),Zs.subVectors(t.c,Zr),Wi.subVectors($s,Ys),Xi.subVectors(Zs,$s),ds.subVectors(Ys,Zs);let e=[0,-Wi.z,Wi.y,0,-Xi.z,Xi.y,0,-ds.z,ds.y,Wi.z,0,-Wi.x,Xi.z,0,-Xi.x,ds.z,0,-ds.x,-Wi.y,Wi.x,0,-Xi.y,Xi.x,0,-ds.y,ds.x,0];return!jc(e,Ys,$s,Zs,qo)||(e=[1,0,0,0,1,0,0,0,1],!jc(e,Ys,$s,Zs,qo))?!1:(Yo.crossVectors(Wi,Xi),e=[Yo.x,Yo.y,Yo.z],jc(e,Ys,$s,Zs,qo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Jn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Jn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Si=[new N,new N,new N,new N,new N,new N,new N,new N],Jn=new N,Xo=new Li,Ys=new N,$s=new N,Zs=new N,Wi=new N,Xi=new N,ds=new N,Zr=new N,qo=new N,Yo=new N,ps=new N;function jc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ps.fromArray(n,r);let a=s.x*Math.abs(ps.x)+s.y*Math.abs(ps.y)+s.z*Math.abs(ps.z),c=t.dot(ps),h=e.dot(ps),l=i.dot(ps);if(Math.max(-Math.max(c,h,l),Math.min(c,h,l))>a)return!1}return!0}var xm=new Li,Jr=new N,Kc=new N,Ui=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):xm.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Jr.subVectors(t,this.center);let e=Jr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Jr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Kc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Jr.copy(t.center).add(Kc)),this.expandByPoint(Jr.copy(t.center).sub(Kc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ei=new N,Qc=new N,$o=new N,qi=new N,tl=new N,Zo=new N,el=new N,vr=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ei)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ei.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ei.copy(this.origin).addScaledVector(this.direction,e),Ei.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Qc.copy(t).add(e).multiplyScalar(.5),$o.copy(e).sub(t).normalize(),qi.copy(this.origin).sub(Qc);let r=t.distanceTo(e)*.5,o=-this.direction.dot($o),a=qi.dot(this.direction),c=-qi.dot($o),h=qi.lengthSq(),l=Math.abs(1-o*o),u,f,d,p;if(l>0)if(u=o*c-a,f=o*a-c,p=r*l,u>=0)if(f>=-p)if(f<=p){let v=1/l;u*=v,f*=v,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+h}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+h;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+h;else f<=-p?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+h):f<=p?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+h):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+h);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Qc).addScaledVector($o,f),d}intersectSphere(t,e){Ei.subVectors(t.center,this.origin);let i=Ei.dot(this.direction),s=Ei.dot(Ei)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c,h=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,f=this.origin;return h>=0?(i=(t.min.x-f.x)*h,s=(t.max.x-f.x)*h):(i=(t.max.x-f.x)*h,s=(t.min.x-f.x)*h),l>=0?(r=(t.min.y-f.y)*l,o=(t.max.y-f.y)*l):(r=(t.max.y-f.y)*l,o=(t.min.y-f.y)*l),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Ei)!==null}intersectTriangle(t,e,i,s,r){tl.subVectors(e,t),Zo.subVectors(i,t),el.crossVectors(tl,Zo);let o=this.direction.dot(el),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qi.subVectors(this.origin,t);let c=a*this.direction.dot(Zo.crossVectors(qi,Zo));if(c<0)return null;let h=a*this.direction.dot(tl.cross(qi));if(h<0||c+h>o)return null;let l=-a*qi.dot(el);return l<0?null:this.at(l/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},se=class n{constructor(t,e,i,s,r,o,a,c,h,l,u,f,d,p,v,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,h,l,u,f,d,p,v,m)}set(t,e,i,s,r,o,a,c,h,l,u,f,d,p,v,m){let g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=h,g[6]=l,g[10]=u,g[14]=f,g[3]=d,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/Js.setFromMatrixColumn(t,0).length(),r=1/Js.setFromMatrixColumn(t,1).length(),o=1/Js.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),h=Math.sin(s),l=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*l,d=o*u,p=a*l,v=a*u;e[0]=c*l,e[4]=-c*u,e[8]=h,e[1]=d+p*h,e[5]=f-v*h,e[9]=-a*c,e[2]=v-f*h,e[6]=p+d*h,e[10]=o*c}else if(t.order==="YXZ"){let f=c*l,d=c*u,p=h*l,v=h*u;e[0]=f+v*a,e[4]=p*a-d,e[8]=o*h,e[1]=o*u,e[5]=o*l,e[9]=-a,e[2]=d*a-p,e[6]=v+f*a,e[10]=o*c}else if(t.order==="ZXY"){let f=c*l,d=c*u,p=h*l,v=h*u;e[0]=f-v*a,e[4]=-o*u,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*l,e[9]=v-f*a,e[2]=-o*h,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let f=o*l,d=o*u,p=a*l,v=a*u;e[0]=c*l,e[4]=p*h-d,e[8]=f*h+v,e[1]=c*u,e[5]=v*h+f,e[9]=d*h-p,e[2]=-h,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,d=o*h,p=a*c,v=a*h;e[0]=c*l,e[4]=v-f*u,e[8]=p*u+d,e[1]=u,e[5]=o*l,e[9]=-a*l,e[2]=-h*l,e[6]=d*u+p,e[10]=f-v*u}else if(t.order==="XZY"){let f=o*c,d=o*h,p=a*c,v=a*h;e[0]=c*l,e[4]=-u,e[8]=h*l,e[1]=f*u+v,e[5]=o*l,e[9]=d*u-p,e[2]=p*u-d,e[6]=a*l,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vm,t,_m)}lookAt(t,e,i){let s=this.elements;return zn.subVectors(t,e),zn.lengthSq()===0&&(zn.z=1),zn.normalize(),Yi.crossVectors(i,zn),Yi.lengthSq()===0&&(Math.abs(i.z)===1?zn.x+=1e-4:zn.z+=1e-4,zn.normalize(),Yi.crossVectors(i,zn)),Yi.normalize(),Jo.crossVectors(zn,Yi),s[0]=Yi.x,s[4]=Jo.x,s[8]=zn.x,s[1]=Yi.y,s[5]=Jo.y,s[9]=zn.y,s[2]=Yi.z,s[6]=Jo.z,s[10]=zn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],h=i[12],l=i[1],u=i[5],f=i[9],d=i[13],p=i[2],v=i[6],m=i[10],g=i[14],M=i[3],_=i[7],y=i[11],R=i[15],w=s[0],A=s[4],I=s[8],S=s[12],b=s[1],P=s[5],L=s[9],U=s[13],D=s[2],W=s[6],H=s[10],Q=s[14],V=s[3],Z=s[7],j=s[11],tt=s[15];return r[0]=o*w+a*b+c*D+h*V,r[4]=o*A+a*P+c*W+h*Z,r[8]=o*I+a*L+c*H+h*j,r[12]=o*S+a*U+c*Q+h*tt,r[1]=l*w+u*b+f*D+d*V,r[5]=l*A+u*P+f*W+d*Z,r[9]=l*I+u*L+f*H+d*j,r[13]=l*S+u*U+f*Q+d*tt,r[2]=p*w+v*b+m*D+g*V,r[6]=p*A+v*P+m*W+g*Z,r[10]=p*I+v*L+m*H+g*j,r[14]=p*S+v*U+m*Q+g*tt,r[3]=M*w+_*b+y*D+R*V,r[7]=M*A+_*P+y*W+R*Z,r[11]=M*I+_*L+y*H+R*j,r[15]=M*S+_*U+y*Q+R*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],h=t[13],l=t[2],u=t[6],f=t[10],d=t[14],p=t[3],v=t[7],m=t[11],g=t[15];return p*(+r*c*u-s*h*u-r*a*f+i*h*f+s*a*d-i*c*d)+v*(+e*c*d-e*h*f+r*o*f-s*o*d+s*h*l-r*c*l)+m*(+e*h*u-e*a*d-r*o*u+i*o*d+r*a*l-i*h*l)+g*(-s*a*l-e*c*u+e*a*f+s*o*u-i*o*f+i*c*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],l=t[8],u=t[9],f=t[10],d=t[11],p=t[12],v=t[13],m=t[14],g=t[15],M=u*m*h-v*f*h+v*c*d-a*m*d-u*c*g+a*f*g,_=p*f*h-l*m*h-p*c*d+o*m*d+l*c*g-o*f*g,y=l*v*h-p*u*h+p*a*d-o*v*d-l*a*g+o*u*g,R=p*u*c-l*v*c-p*a*f+o*v*f+l*a*m-o*u*m,w=e*M+i*_+s*y+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/w;return t[0]=M*A,t[1]=(v*f*r-u*m*r-v*s*d+i*m*d+u*s*g-i*f*g)*A,t[2]=(a*m*r-v*c*r+v*s*h-i*m*h-a*s*g+i*c*g)*A,t[3]=(u*c*r-a*f*r-u*s*h+i*f*h+a*s*d-i*c*d)*A,t[4]=_*A,t[5]=(l*m*r-p*f*r+p*s*d-e*m*d-l*s*g+e*f*g)*A,t[6]=(p*c*r-o*m*r-p*s*h+e*m*h+o*s*g-e*c*g)*A,t[7]=(o*f*r-l*c*r+l*s*h-e*f*h-o*s*d+e*c*d)*A,t[8]=y*A,t[9]=(p*u*r-l*v*r-p*i*d+e*v*d+l*i*g-e*u*g)*A,t[10]=(o*v*r-p*a*r+p*i*h-e*v*h-o*i*g+e*a*g)*A,t[11]=(l*a*r-o*u*r-l*i*h+e*u*h+o*i*d-e*a*d)*A,t[12]=R*A,t[13]=(l*v*s-p*u*s+p*i*f-e*v*f-l*i*m+e*u*m)*A,t[14]=(p*a*s-o*v*s-p*i*c+e*v*c+o*i*m-e*a*m)*A,t[15]=(o*u*s-l*a*s+l*i*c-e*u*c-o*i*f+e*a*f)*A,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,h=r*o,l=r*a;return this.set(h*o+i,h*a-s*c,h*c+s*a,0,h*a+s*c,l*a+i,l*c-s*o,0,h*c-s*a,l*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,h=r+r,l=o+o,u=a+a,f=r*h,d=r*l,p=r*u,v=o*l,m=o*u,g=a*u,M=c*h,_=c*l,y=c*u,R=i.x,w=i.y,A=i.z;return s[0]=(1-(v+g))*R,s[1]=(d+y)*R,s[2]=(p-_)*R,s[3]=0,s[4]=(d-y)*w,s[5]=(1-(f+g))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(p+_)*A,s[9]=(m-M)*A,s[10]=(1-(f+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=Js.set(s[0],s[1],s[2]).length(),o=Js.set(s[4],s[5],s[6]).length(),a=Js.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],jn.copy(this);let h=1/r,l=1/o,u=1/a;return jn.elements[0]*=h,jn.elements[1]*=h,jn.elements[2]*=h,jn.elements[4]*=l,jn.elements[5]*=l,jn.elements[6]*=l,jn.elements[8]*=u,jn.elements[9]*=u,jn.elements[10]*=u,e.setFromRotationMatrix(jn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Ci){let c=this.elements,h=2*r/(e-t),l=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),d,p;if(a===Ci)d=-(o+r)/(o-r),p=-2*o*r/(o-r);else if(a===wa)d=-o/(o-r),p=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=l,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Ci){let c=this.elements,h=1/(e-t),l=1/(i-s),u=1/(o-r),f=(e+t)*h,d=(i+s)*l,p,v;if(a===Ci)p=(o+r)*u,v=-2*u;else if(a===wa)p=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*h,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*l,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=v,c[14]=-p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Js=new N,jn=new se,vm=new N(0,0,0),_m=new N(1,1,1),Yi=new N,Jo=new N,zn=new N,Of=new se,kf=new yn,Be=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],h=s[5],l=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-l,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(Ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-l,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Of.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Of,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return kf.setFromEuler(this),this.setFromQuaternion(kf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Be.DEFAULT_ORDER="XYZ";var co=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ym=0,Hf=new N,js=new yn,Ti=new se,jo=new N,jr=new N,Mm=new N,bm=new yn,Vf=new N(1,0,0),Gf=new N(0,1,0),Wf=new N(0,0,1),Xf={type:"added"},Sm={type:"removed"},Ks={type:"childadded",child:null},nl={type:"childremoved",child:null},Qe=class n extends ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ym++}),this.uuid=Ar(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new N,e=new Be,i=new yn,s=new N(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Qt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new co,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return js.setFromAxisAngle(t,e),this.quaternion.multiply(js),this}rotateOnWorldAxis(t,e){return js.setFromAxisAngle(t,e),this.quaternion.premultiply(js),this}rotateX(t){return this.rotateOnAxis(Vf,t)}rotateY(t){return this.rotateOnAxis(Gf,t)}rotateZ(t){return this.rotateOnAxis(Wf,t)}translateOnAxis(t,e){return Hf.copy(t).applyQuaternion(this.quaternion),this.position.add(Hf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Vf,t)}translateY(t){return this.translateOnAxis(Gf,t)}translateZ(t){return this.translateOnAxis(Wf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?jo.copy(t):jo.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),jr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(jr,jo,this.up):Ti.lookAt(jo,jr,this.up),this.quaternion.setFromRotationMatrix(Ti),s&&(Ti.extractRotation(s.matrixWorld),js.setFromRotationMatrix(Ti),this.quaternion.premultiply(js.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Xf),Ks.child=t,this.dispatchEvent(Ks),Ks.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Sm),nl.child=t,this.dispatchEvent(nl),nl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Xf),Ks.child=t,this.dispatchEvent(Ks),Ks.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(jr,t,Mm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(jr,bm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let h=0,l=c.length;h<l;h++){let u=c[h];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,h=this.material.length;c<h;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),h=o(t.textures),l=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),h.length>0&&(i.textures=h),l.length>0&&(i.images=l),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=s,i;function o(a){let c=[];for(let h in a){let l=a[h];delete l.metadata,c.push(l)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Qe.DEFAULT_UP=new N(0,1,0);Qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Kn=new N,wi=new N,il=new N,Ai=new N,Qs=new N,tr=new N,qf=new N,sl=new N,rl=new N,ol=new N,al=new Ne,cl=new Ne,ll=new Ne,Ms=class n{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Kn.subVectors(t,e),s.cross(Kn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Kn.subVectors(s,e),wi.subVectors(i,e),il.subVectors(t,e);let o=Kn.dot(Kn),a=Kn.dot(wi),c=Kn.dot(il),h=wi.dot(wi),l=wi.dot(il),u=o*h-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(h*c-a*l)*f,p=(o*l-a*c)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Ai)===null?!1:Ai.x>=0&&Ai.y>=0&&Ai.x+Ai.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,Ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ai.x),c.addScaledVector(o,Ai.y),c.addScaledVector(a,Ai.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return al.setScalar(0),cl.setScalar(0),ll.setScalar(0),al.fromBufferAttribute(t,e),cl.fromBufferAttribute(t,i),ll.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(al,r.x),o.addScaledVector(cl,r.y),o.addScaledVector(ll,r.z),o}static isFrontFacing(t,e,i,s){return Kn.subVectors(i,e),wi.subVectors(t,e),Kn.cross(wi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Kn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Kn.cross(wi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;Qs.subVectors(s,i),tr.subVectors(r,i),sl.subVectors(t,i);let c=Qs.dot(sl),h=tr.dot(sl);if(c<=0&&h<=0)return e.copy(i);rl.subVectors(t,s);let l=Qs.dot(rl),u=tr.dot(rl);if(l>=0&&u<=l)return e.copy(s);let f=c*u-l*h;if(f<=0&&c>=0&&l<=0)return o=c/(c-l),e.copy(i).addScaledVector(Qs,o);ol.subVectors(t,r);let d=Qs.dot(ol),p=tr.dot(ol);if(p>=0&&d<=p)return e.copy(r);let v=d*h-c*p;if(v<=0&&h>=0&&p<=0)return a=h/(h-p),e.copy(i).addScaledVector(tr,a);let m=l*p-d*u;if(m<=0&&u-l>=0&&d-p>=0)return qf.subVectors(r,s),a=(u-l)/(u-l+(d-p)),e.copy(s).addScaledVector(qf,a);let g=1/(m+v+f);return o=v*g,a=f*g,e.copy(i).addScaledVector(Qs,o).addScaledVector(tr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},jd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},Ko={h:0,s:0,l:0};function hl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Ht=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=he.workingColorSpace){return this.r=t,this.g=e,this.b=i,he.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=he.workingColorSpace){if(t=hm(t,1),e=Ke(e,0,1),i=Ke(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=hl(o,r,t+1/3),this.g=hl(o,r,t),this.b=hl(o,r,t-1/3)}return he.toWorkingColorSpace(this,s),this}setStyle(t,e=Ie){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){let i=jd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ii(t.r),this.g=Ii(t.g),this.b=Ii(t.b),this}copyLinearToSRGB(t){return this.r=hr(t.r),this.g=hr(t.g),this.b=hr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return he.fromWorkingColorSpace(an.copy(this),t),Math.round(Ke(an.r*255,0,255))*65536+Math.round(Ke(an.g*255,0,255))*256+Math.round(Ke(an.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=he.workingColorSpace){he.fromWorkingColorSpace(an.copy(this),e);let i=an.r,s=an.g,r=an.b,o=Math.max(i,s,r),a=Math.min(i,s,r),c,h,l=(a+o)/2;if(a===o)c=0,h=0;else{let u=o-a;switch(h=l<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=h,t.l=l,t}getRGB(t,e=he.workingColorSpace){return he.fromWorkingColorSpace(an.copy(this),e),t.r=an.r,t.g=an.g,t.b=an.b,t}getStyle(t=Ie){he.fromWorkingColorSpace(an.copy(this),t);let e=an.r,i=an.g,s=an.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL($i),this.setHSL($i.h+t,$i.s+e,$i.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL($i),t.getHSL(Ko);let i=Yc($i.h,Ko.h,e),s=Yc($i.s,Ko.s,e),r=Yc($i.l,Ko.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},an=new Ht;Ht.NAMES=jd;var Em=0,ei=class extends ts{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Em++}),this.uuid=Ar(),this.name="",this.blending=cr,this.side=Qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Tl,this.blendDst=wl,this.blendEquation=ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=dr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xs,this.stencilZFail=Xs,this.stencilZPass=Xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==cr&&(i.blending=this.blending),this.side!==Qi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Tl&&(i.blendSrc=this.blendSrc),this.blendDst!==wl&&(i.blendDst=this.blendDst),this.blendEquation!==ys&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==dr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Xs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Xs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Dn=class extends ei{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Be,this.combine=ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ge=new N,Qo=new at,ue=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Pf,this.updateRanges=[],this.gpuType=ui,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Qo.fromBufferAttribute(this,e),Qo.applyMatrix3(t),this.setXY(e,Qo.x,Qo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix3(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix4(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyNormalMatrix(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.transformDirection(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=$r(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=xn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=$r(e,this.array)),e}setX(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=$r(e,this.array)),e}setY(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=$r(e,this.array)),e}setZ(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=$r(e,this.array)),e}setW(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=xn(e,this.array),i=xn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=xn(e,this.array),i=xn(i,this.array),s=xn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=xn(e,this.array),i=xn(i,this.array),s=xn(s,this.array),r=xn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Pf&&(t.usage=this.usage),t}};var Pa=class extends ue{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Ia=class extends ue{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Vt=class extends ue{constructor(t,e,i){super(new Float32Array(t),e,i)}},Tm=0,Vn=new se,ul=new Qe,er=new N,Ln=new Li,Kr=new Li,Ze=new N,me=class n extends ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Ar(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Jd(t)?Ia:Pa)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Qt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Vn.makeRotationFromQuaternion(t),this.applyMatrix4(Vn),this}rotateX(t){return Vn.makeRotationX(t),this.applyMatrix4(Vn),this}rotateY(t){return Vn.makeRotationY(t),this.applyMatrix4(Vn),this}rotateZ(t){return Vn.makeRotationZ(t),this.applyMatrix4(Vn),this}translate(t,e,i){return Vn.makeTranslation(t,e,i),this.applyMatrix4(Vn),this}scale(t,e,i){return Vn.makeScale(t,e,i),this.applyMatrix4(Vn),this}lookAt(t){return ul.lookAt(t),ul.updateMatrix(),this.applyMatrix4(ul.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Vt(i,3))}else{for(let i=0,s=e.count;i<s;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];Ln.setFromBufferAttribute(r),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ui);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let i=this.boundingSphere.center;if(Ln.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Kr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ze.addVectors(Ln.min,Kr.min),Ln.expandByPoint(Ze),Ze.addVectors(Ln.max,Kr.max),Ln.expandByPoint(Ze)):(Ln.expandByPoint(Kr.min),Ln.expandByPoint(Kr.max))}Ln.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ze.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ze));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let h=0,l=a.count;h<l;h++)Ze.fromBufferAttribute(a,h),c&&(er.fromBufferAttribute(t,h),Ze.add(er)),s=Math.max(s,i.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ue(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<i.count;I++)a[I]=new N,c[I]=new N;let h=new N,l=new N,u=new N,f=new at,d=new at,p=new at,v=new N,m=new N;function g(I,S,b){h.fromBufferAttribute(i,I),l.fromBufferAttribute(i,S),u.fromBufferAttribute(i,b),f.fromBufferAttribute(r,I),d.fromBufferAttribute(r,S),p.fromBufferAttribute(r,b),l.sub(h),u.sub(h),d.sub(f),p.sub(f);let P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(v.copy(l).multiplyScalar(p.y).addScaledVector(u,-d.y).multiplyScalar(P),m.copy(u).multiplyScalar(d.x).addScaledVector(l,-p.x).multiplyScalar(P),a[I].add(v),a[S].add(v),a[b].add(v),c[I].add(m),c[S].add(m),c[b].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let I=0,S=M.length;I<S;++I){let b=M[I],P=b.start,L=b.count;for(let U=P,D=P+L;U<D;U+=3)g(t.getX(U+0),t.getX(U+1),t.getX(U+2))}let _=new N,y=new N,R=new N,w=new N;function A(I){R.fromBufferAttribute(s,I),w.copy(R);let S=a[I];_.copy(S),_.sub(R.multiplyScalar(R.dot(S))).normalize(),y.crossVectors(w,S);let P=y.dot(c[I])<0?-1:1;o.setXYZW(I,_.x,_.y,_.z,P)}for(let I=0,S=M.length;I<S;++I){let b=M[I],P=b.start,L=b.count;for(let U=P,D=P+L;U<D;U+=3)A(t.getX(U+0)),A(t.getX(U+1)),A(t.getX(U+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ue(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);let s=new N,r=new N,o=new N,a=new N,c=new N,h=new N,l=new N,u=new N;if(t)for(let f=0,d=t.count;f<d;f+=3){let p=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),a.fromBufferAttribute(i,p),c.fromBufferAttribute(i,v),h.fromBufferAttribute(i,m),a.add(l),c.add(l),h.add(l),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(m,h.x,h.y,h.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),l.subVectors(o,r),u.subVectors(s,r),l.cross(u),i.setXYZ(f+0,l.x,l.y,l.z),i.setXYZ(f+1,l.x,l.y,l.z),i.setXYZ(f+2,l.x,l.y,l.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(a,c){let h=a.array,l=a.itemSize,u=a.normalized,f=new h.constructor(c.length*l),d=0,p=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*l;for(let g=0;g<l;g++)f[p++]=h[d++]}return new ue(f,l,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let c=s[a],h=t(c,i);e.setAttribute(a,h)}let r=this.morphAttributes;for(let a in r){let c=[],h=r[a];for(let l=0,u=h.length;l<u;l++){let f=h[l],d=t(f,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let h=o[a];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let h in c)c[h]!==void 0&&(t[h]=c[h]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let c in i){let h=i[c];t.data.attributes[c]=h.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let h=this.morphAttributes[c],l=[];for(let u=0,f=h.length;u<f;u++){let d=h[u];l.push(d.toJSON(t.data))}l.length>0&&(s[c]=l,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let h in s){let l=s[h];this.setAttribute(h,l.clone(e))}let r=t.morphAttributes;for(let h in r){let l=[],u=r[h];for(let f=0,d=u.length;f<d;f++)l.push(u[f].clone(e));this.morphAttributes[h]=l}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let h=0,l=o.length;h<l;h++){let u=o[h];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yf=new se,ms=new vr,ta=new Ui,$f=new N,ea=new N,na=new N,ia=new N,fl=new N,sa=new N,Zf=new N,ra=new N,ae=class extends Qe{constructor(t=new me,e=new Dn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){sa.set(0,0,0);for(let c=0,h=r.length;c<h;c++){let l=a[c],u=r[c];l!==0&&(fl.fromBufferAttribute(u,t),o?sa.addScaledVector(fl,l):sa.addScaledVector(fl.sub(e),l))}e.add(sa)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ta.copy(i.boundingSphere),ta.applyMatrix4(r),ms.copy(t.ray).recast(t.near),!(ta.containsPoint(ms.origin)===!1&&(ms.intersectSphere(ta,$f)===null||ms.origin.distanceToSquared($f)>(t.far-t.near)**2))&&(Yf.copy(r).invert(),ms.copy(t.ray).applyMatrix4(Yf),!(i.boundingBox!==null&&ms.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ms)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,h=r.attributes.uv,l=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){let m=f[p],g=o[m.materialIndex],M=Math.max(m.start,d.start),_=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,R=_;y<R;y+=3){let w=a.getX(y),A=a.getX(y+1),I=a.getX(y+2);s=oa(this,g,t,i,h,l,u,w,A,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){let M=a.getX(m),_=a.getX(m+1),y=a.getX(m+2);s=oa(this,o,t,i,h,l,u,M,_,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){let m=f[p],g=o[m.materialIndex],M=Math.max(m.start,d.start),_=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,R=_;y<R;y+=3){let w=y,A=y+1,I=y+2;s=oa(this,g,t,i,h,l,u,w,A,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){let M=m,_=m+1,y=m+2;s=oa(this,o,t,i,h,l,u,M,_,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function wm(n,t,e,i,s,r,o,a){let c;if(t.side===cn?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===Qi,a),c===null)return null;ra.copy(a),ra.applyMatrix4(n.matrixWorld);let h=e.ray.origin.distanceTo(ra);return h<e.near||h>e.far?null:{distance:h,point:ra.clone(),object:n}}function oa(n,t,e,i,s,r,o,a,c,h){n.getVertexPosition(a,ea),n.getVertexPosition(c,na),n.getVertexPosition(h,ia);let l=wm(n,t,e,i,ea,na,ia,Zf);if(l){let u=new N;Ms.getBarycoord(Zf,ea,na,ia,u),s&&(l.uv=Ms.getInterpolatedAttribute(s,a,c,h,u,new at)),r&&(l.uv1=Ms.getInterpolatedAttribute(r,a,c,h,u,new at)),o&&(l.normal=Ms.getInterpolatedAttribute(o,a,c,h,u,new N),l.normal.dot(i.direction)>0&&l.normal.multiplyScalar(-1));let f={a,b:c,c:h,normal:new N,materialIndex:0};Ms.getNormal(ea,na,ia,f.normal),l.face=f,l.barycoord=u}return l}var hn=class n extends me{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],h=[],l=[],u=[],f=0,d=0;p("z","y","x",-1,-1,i,e,t,o,r,0),p("z","y","x",1,-1,i,e,-t,o,r,1),p("x","z","y",1,1,t,i,e,s,o,2),p("x","z","y",1,-1,t,i,-e,s,o,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Vt(h,3)),this.setAttribute("normal",new Vt(l,3)),this.setAttribute("uv",new Vt(u,2));function p(v,m,g,M,_,y,R,w,A,I,S){let b=y/A,P=R/I,L=y/2,U=R/2,D=w/2,W=A+1,H=I+1,Q=0,V=0,Z=new N;for(let j=0;j<H;j++){let tt=j*P-U;for(let ut=0;ut<W;ut++){let Et=ut*b-L;Z[v]=Et*M,Z[m]=tt*_,Z[g]=D,h.push(Z.x,Z.y,Z.z),Z[v]=0,Z[m]=0,Z[g]=w>0?1:-1,l.push(Z.x,Z.y,Z.z),u.push(ut/A),u.push(1-j/I),Q+=1}}for(let j=0;j<I;j++)for(let tt=0;tt<A;tt++){let ut=f+tt+W*j,Et=f+tt+W*(j+1),Y=f+(tt+1)+W*(j+1),F=f+(tt+1)+W*j;c.push(ut,Et,F),c.push(Et,Y,F),V+=6}a.addGroup(d,V,S),d+=V,f+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function _r(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function dn(n){let t={};for(let e=0;e<n.length;e++){let i=_r(n[e]);for(let s in i)t[s]=i[s]}return t}function Am(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Kd(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}var Rm={clone:_r,merge:dn},Cm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Mn=class extends ei{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cm,this.fragmentShader=Pm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_r(t.uniforms),this.uniformsGroups=Am(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},za=class extends Qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=Ci}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Zi=new N,Jf=new at,jf=new at,pn=class extends za{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=hh*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(qc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return hh*2*Math.atan(Math.tan(qc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z),Zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z)}getViewSize(t,e){return this.getViewBounds(t,Jf,jf),e.subVectors(jf,Jf)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(qc*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,h=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/h,s*=o.width/c,i*=o.height/h}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},nr=-90,ir=1,ph=class extends Qe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new pn(nr,ir,t,e);s.layers=this.layers,this.add(s);let r=new pn(nr,ir,t,e);r.layers=this.layers,this.add(r);let o=new pn(nr,ir,t,e);o.layers=this.layers,this.add(o);let a=new pn(nr,ir,t,e);a.layers=this.layers,this.add(a);let c=new pn(nr,ir,t,e);c.layers=this.layers,this.add(c);let h=new pn(nr,ir,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(let h of e)this.remove(h);if(t===Ci)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===wa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,h,l]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,h),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,l),t.setRenderTarget(u,f,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},La=class extends _n{constructor(t,e,i,s,r,o,a,c,h,l){t=t!==void 0?t:[],e=e!==void 0?e:pr,super(t,e,i,s,r,o,a,c,h,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},mh=class extends zi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new La(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:mn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new hn(5,5,5),r=new Mn({name:"CubemapFromEquirect",uniforms:_r(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:ji});r.uniforms.tEquirect.value=e;let o=new ae(s,r),a=e.minFilter;return e.minFilter===Es&&(e.minFilter=mn),new ph(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},dl=new N,Im=new N,zm=new Qt,Qn=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=dl.subVectors(i,e).cross(Im.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(dl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||zm.getNormalMatrix(t),s=this.coplanarPoint(dl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},gs=new Ui,aa=new N,ws=class{constructor(t=new Qn,e=new Qn,i=new Qn,s=new Qn,r=new Qn,o=new Qn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ci){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],h=s[4],l=s[5],u=s[6],f=s[7],d=s[8],p=s[9],v=s[10],m=s[11],g=s[12],M=s[13],_=s[14],y=s[15];if(i[0].setComponents(c-r,f-h,m-d,y-g).normalize(),i[1].setComponents(c+r,f+h,m+d,y+g).normalize(),i[2].setComponents(c+o,f+l,m+p,y+M).normalize(),i[3].setComponents(c-o,f-l,m-p,y-M).normalize(),i[4].setComponents(c-a,f-u,m-v,y-_).normalize(),e===Ci)i[5].setComponents(c+a,f+u,m+v,y+_).normalize();else if(e===wa)i[5].setComponents(a,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gs)}intersectsSprite(t){return gs.center.set(0,0,0),gs.radius=.7071067811865476,gs.applyMatrix4(t.matrixWorld),this.intersectsSphere(gs)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(aa.x=s.normal.x>0?t.max.x:t.min.x,aa.y=s.normal.y>0?t.max.y:t.min.y,aa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(aa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Qd(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Lm(n){let t=new WeakMap;function e(a,c){let h=a.array,l=a.usage,u=h.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,h,l),a.onUploadCallback();let d;if(h instanceof Float32Array)d=n.FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)d=n.SHORT;else if(h instanceof Uint32Array)d=n.UNSIGNED_INT;else if(h instanceof Int32Array)d=n.INT;else if(h instanceof Int8Array)d=n.BYTE;else if(h instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:f,type:d,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,h){let l=c.array,u=c.updateRanges;if(n.bindBuffer(h,a),u.length===0)n.bufferSubData(h,0,l);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){let p=u[f],v=u[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){let v=u[d];n.bufferSubData(h,v.start*l.BYTES_PER_ELEMENT,l,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let l=t.get(a);(!l||l.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let h=t.get(a);if(h===void 0)t.set(a,e(a,c));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,a,c),h.version=a.version}}return{get:s,remove:r,update:o}}var es=class n extends me{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),h=a+1,l=c+1,u=t/a,f=e/c,d=[],p=[],v=[],m=[];for(let g=0;g<l;g++){let M=g*f-o;for(let _=0;_<h;_++){let y=_*u-r;p.push(y,-M,0),v.push(0,0,1),m.push(_/a),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let M=0;M<a;M++){let _=M+h*g,y=M+h*(g+1),R=M+1+h*(g+1),w=M+1+h*g;d.push(_,y,w),d.push(y,R,w)}this.setIndex(d),this.setAttribute("position",new Vt(p,3)),this.setAttribute("normal",new Vt(v,3)),this.setAttribute("uv",new Vt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},Um=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dm=`#ifdef USE_ALPHAHASH
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
#endif`,Nm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Om=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,km=`#ifdef USE_AOMAP
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
#endif`,Hm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vm=`#ifdef USE_BATCHING
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
#endif`,Gm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ym=`#ifdef USE_IRIDESCENCE
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
#endif`,$m=`#ifdef USE_BUMPMAP
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
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,eg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ng=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ig=`#define PI 3.141592653589793
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
} // validated`,sg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rg=`vec3 transformedNormal = objectNormal;
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
#endif`,og=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ag=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hg="gl_FragColor = linearToOutputTexel( gl_FragColor );",ug=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fg=`#ifdef USE_ENVMAP
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
#endif`,dg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pg=`#ifdef USE_ENVMAP
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
#endif`,mg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gg=`#ifdef USE_ENVMAP
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
#endif`,xg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_g=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mg=`#ifdef USE_GRADIENTMAP
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
}`,bg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Eg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tg=`uniform bool receiveShadow;
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
#endif`,wg=`#ifdef USE_ENVMAP
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
#endif`,Ag=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ig=`PhysicalMaterial material;
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
#endif`,zg=`struct PhysicalMaterial {
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
}`,Lg=`
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
#endif`,Ug=`#if defined( RE_IndirectDiffuse )
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
#endif`,Dg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ng=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Og=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gg=`#if defined( USE_POINTS_UV )
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
#endif`,Wg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$g=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zg=`#ifdef USE_MORPHTARGETS
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
#endif`,Jg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Kg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ex=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nx=`#ifdef USE_NORMALMAP
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
#endif`,ix=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ox=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ax=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,lx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ux=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,px=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vx=`float getShadowMask() {
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
}`,_x=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yx=`#ifdef USE_SKINNING
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
#endif`,Mx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bx=`#ifdef USE_SKINNING
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
#endif`,Sx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ex=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ax=`#ifdef USE_TRANSMISSION
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
#endif`,Rx=`#ifdef USE_TRANSMISSION
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
#endif`,Cx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Lx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ux=`uniform sampler2D t2D;
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
}`,Dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ox=`#include <common>
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
}`,kx=`#if DEPTH_PACKING == 3200
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
}`,Hx=`#define DISTANCE
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
}`,Vx=`#define DISTANCE
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
}`,Gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xx=`uniform float scale;
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
}`,qx=`uniform vec3 diffuse;
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
}`,Yx=`#include <common>
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
}`,$x=`uniform vec3 diffuse;
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
}`,Zx=`#define LAMBERT
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
}`,Jx=`#define LAMBERT
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
}`,jx=`#define MATCAP
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
}`,Kx=`#define MATCAP
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
}`,Qx=`#define NORMAL
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
}`,t1=`#define NORMAL
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
}`,e1=`#define PHONG
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
}`,n1=`#define PHONG
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
}`,i1=`#define STANDARD
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
}`,s1=`#define STANDARD
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
}`,r1=`#define TOON
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
}`,o1=`#define TOON
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
}`,a1=`uniform float size;
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
}`,c1=`uniform vec3 diffuse;
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
}`,l1=`#include <common>
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
}`,h1=`uniform vec3 color;
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
}`,u1=`uniform float rotation;
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
}`,f1=`uniform vec3 diffuse;
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
}`,ie={alphahash_fragment:Um,alphahash_pars_fragment:Dm,alphamap_fragment:Nm,alphamap_pars_fragment:Bm,alphatest_fragment:Fm,alphatest_pars_fragment:Om,aomap_fragment:km,aomap_pars_fragment:Hm,batching_pars_vertex:Vm,batching_vertex:Gm,begin_vertex:Wm,beginnormal_vertex:Xm,bsdfs:qm,iridescence_fragment:Ym,bumpmap_pars_fragment:$m,clipping_planes_fragment:Zm,clipping_planes_pars_fragment:Jm,clipping_planes_pars_vertex:jm,clipping_planes_vertex:Km,color_fragment:Qm,color_pars_fragment:tg,color_pars_vertex:eg,color_vertex:ng,common:ig,cube_uv_reflection_fragment:sg,defaultnormal_vertex:rg,displacementmap_pars_vertex:og,displacementmap_vertex:ag,emissivemap_fragment:cg,emissivemap_pars_fragment:lg,colorspace_fragment:hg,colorspace_pars_fragment:ug,envmap_fragment:fg,envmap_common_pars_fragment:dg,envmap_pars_fragment:pg,envmap_pars_vertex:mg,envmap_physical_pars_fragment:wg,envmap_vertex:gg,fog_vertex:xg,fog_pars_vertex:vg,fog_fragment:_g,fog_pars_fragment:yg,gradientmap_pars_fragment:Mg,lightmap_pars_fragment:bg,lights_lambert_fragment:Sg,lights_lambert_pars_fragment:Eg,lights_pars_begin:Tg,lights_toon_fragment:Ag,lights_toon_pars_fragment:Rg,lights_phong_fragment:Cg,lights_phong_pars_fragment:Pg,lights_physical_fragment:Ig,lights_physical_pars_fragment:zg,lights_fragment_begin:Lg,lights_fragment_maps:Ug,lights_fragment_end:Dg,logdepthbuf_fragment:Ng,logdepthbuf_pars_fragment:Bg,logdepthbuf_pars_vertex:Fg,logdepthbuf_vertex:Og,map_fragment:kg,map_pars_fragment:Hg,map_particle_fragment:Vg,map_particle_pars_fragment:Gg,metalnessmap_fragment:Wg,metalnessmap_pars_fragment:Xg,morphinstance_vertex:qg,morphcolor_vertex:Yg,morphnormal_vertex:$g,morphtarget_pars_vertex:Zg,morphtarget_vertex:Jg,normal_fragment_begin:jg,normal_fragment_maps:Kg,normal_pars_fragment:Qg,normal_pars_vertex:tx,normal_vertex:ex,normalmap_pars_fragment:nx,clearcoat_normal_fragment_begin:ix,clearcoat_normal_fragment_maps:sx,clearcoat_pars_fragment:rx,iridescence_pars_fragment:ox,opaque_fragment:ax,packing:cx,premultiplied_alpha_fragment:lx,project_vertex:hx,dithering_fragment:ux,dithering_pars_fragment:fx,roughnessmap_fragment:dx,roughnessmap_pars_fragment:px,shadowmap_pars_fragment:mx,shadowmap_pars_vertex:gx,shadowmap_vertex:xx,shadowmask_pars_fragment:vx,skinbase_vertex:_x,skinning_pars_vertex:yx,skinning_vertex:Mx,skinnormal_vertex:bx,specularmap_fragment:Sx,specularmap_pars_fragment:Ex,tonemapping_fragment:Tx,tonemapping_pars_fragment:wx,transmission_fragment:Ax,transmission_pars_fragment:Rx,uv_pars_fragment:Cx,uv_pars_vertex:Px,uv_vertex:Ix,worldpos_vertex:zx,background_vert:Lx,background_frag:Ux,backgroundCube_vert:Dx,backgroundCube_frag:Nx,cube_vert:Bx,cube_frag:Fx,depth_vert:Ox,depth_frag:kx,distanceRGBA_vert:Hx,distanceRGBA_frag:Vx,equirect_vert:Gx,equirect_frag:Wx,linedashed_vert:Xx,linedashed_frag:qx,meshbasic_vert:Yx,meshbasic_frag:$x,meshlambert_vert:Zx,meshlambert_frag:Jx,meshmatcap_vert:jx,meshmatcap_frag:Kx,meshnormal_vert:Qx,meshnormal_frag:t1,meshphong_vert:e1,meshphong_frag:n1,meshphysical_vert:i1,meshphysical_frag:s1,meshtoon_vert:r1,meshtoon_frag:o1,points_vert:a1,points_frag:c1,shadow_vert:l1,shadow_frag:h1,sprite_vert:u1,sprite_frag:f1},pt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},hi={basic:{uniforms:dn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:dn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:dn([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:dn([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:dn([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:dn([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:dn([pt.points,pt.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:dn([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:dn([pt.common,pt.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:dn([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:dn([pt.sprite,pt.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distanceRGBA:{uniforms:dn([pt.common,pt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distanceRGBA_vert,fragmentShader:ie.distanceRGBA_frag},shadow:{uniforms:dn([pt.lights,pt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};hi.physical={uniforms:dn([hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};var ca={r:0,b:0,g:0},xs=new Be,d1=new se;function p1(n,t,e,i,s,r,o){let a=new Ht(0),c=r===!0?0:1,h,l,u=null,f=0,d=null;function p(M){let _=M.isScene===!0?M.background:null;return _&&_.isTexture&&(_=(M.backgroundBlurriness>0?e:t).get(_)),_}function v(M){let _=!1,y=p(M);y===null?g(a,c):y&&y.isColor&&(g(y,1),_=!0);let R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(M,_){let y=p(_);y&&(y.isCubeTexture||y.mapping===nc)?(l===void 0&&(l=new ae(new hn(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:_r(hi.backgroundCube.uniforms),vertexShader:hi.backgroundCube.vertexShader,fragmentShader:hi.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(l)),xs.copy(_.backgroundRotation),xs.x*=-1,xs.y*=-1,xs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(d1.makeRotationFromEuler(xs)),l.material.toneMapped=he.getTransfer(y.colorSpace)!==ve,(u!==y||f!==y.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,d=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(h===void 0&&(h=new ae(new es(2,2),new Mn({name:"BackgroundMaterial",uniforms:_r(hi.background.uniforms),vertexShader:hi.background.vertexShader,fragmentShader:hi.background.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=y,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.toneMapped=he.getTransfer(y.colorSpace)!==ve,y.matrixAutoUpdate===!0&&y.updateMatrix(),h.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,d=n.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null))}function g(M,_){M.getRGB(ca,Kd(n)),i.buffers.color.setClear(ca.r,ca.g,ca.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(M,_=1){a.set(M),c=_,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,g(a,c)},render:v,addToRenderList:m}}function m1(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,o=!1;function a(b,P,L,U,D){let W=!1,H=u(U,L,P);r!==H&&(r=H,h(r.object)),W=d(b,U,L,D),W&&p(b,U,L,D),D!==null&&t.update(D,n.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,y(b,P,L,U),D!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function c(){return n.createVertexArray()}function h(b){return n.bindVertexArray(b)}function l(b){return n.deleteVertexArray(b)}function u(b,P,L){let U=L.wireframe===!0,D=i[b.id];D===void 0&&(D={},i[b.id]=D);let W=D[P.id];W===void 0&&(W={},D[P.id]=W);let H=W[U];return H===void 0&&(H=f(c()),W[U]=H),H}function f(b){let P=[],L=[],U=[];for(let D=0;D<e;D++)P[D]=0,L[D]=0,U[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:L,attributeDivisors:U,object:b,attributes:{},index:null}}function d(b,P,L,U){let D=r.attributes,W=P.attributes,H=0,Q=L.getAttributes();for(let V in Q)if(Q[V].location>=0){let j=D[V],tt=W[V];if(tt===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(tt=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(tt=b.instanceColor)),j===void 0||j.attribute!==tt||tt&&j.data!==tt.data)return!0;H++}return r.attributesNum!==H||r.index!==U}function p(b,P,L,U){let D={},W=P.attributes,H=0,Q=L.getAttributes();for(let V in Q)if(Q[V].location>=0){let j=W[V];j===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(j=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(j=b.instanceColor));let tt={};tt.attribute=j,j&&j.data&&(tt.data=j.data),D[V]=tt,H++}r.attributes=D,r.attributesNum=H,r.index=U}function v(){let b=r.newAttributes;for(let P=0,L=b.length;P<L;P++)b[P]=0}function m(b){g(b,0)}function g(b,P){let L=r.newAttributes,U=r.enabledAttributes,D=r.attributeDivisors;L[b]=1,U[b]===0&&(n.enableVertexAttribArray(b),U[b]=1),D[b]!==P&&(n.vertexAttribDivisor(b,P),D[b]=P)}function M(){let b=r.newAttributes,P=r.enabledAttributes;for(let L=0,U=P.length;L<U;L++)P[L]!==b[L]&&(n.disableVertexAttribArray(L),P[L]=0)}function _(b,P,L,U,D,W,H){H===!0?n.vertexAttribIPointer(b,P,L,D,W):n.vertexAttribPointer(b,P,L,U,D,W)}function y(b,P,L,U){v();let D=U.attributes,W=L.getAttributes(),H=P.defaultAttributeValues;for(let Q in W){let V=W[Q];if(V.location>=0){let Z=D[Q];if(Z===void 0&&(Q==="instanceMatrix"&&b.instanceMatrix&&(Z=b.instanceMatrix),Q==="instanceColor"&&b.instanceColor&&(Z=b.instanceColor)),Z!==void 0){let j=Z.normalized,tt=Z.itemSize,ut=t.get(Z);if(ut===void 0)continue;let Et=ut.buffer,Y=ut.type,F=ut.bytesPerElement,st=Y===n.INT||Y===n.UNSIGNED_INT||Z.gpuType===nu;if(Z.isInterleavedBufferAttribute){let nt=Z.data,vt=nt.stride,At=Z.offset;if(nt.isInstancedInterleavedBuffer){for(let _t=0;_t<V.locationSize;_t++)g(V.location+_t,nt.meshPerAttribute);b.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let _t=0;_t<V.locationSize;_t++)m(V.location+_t);n.bindBuffer(n.ARRAY_BUFFER,Et);for(let _t=0;_t<V.locationSize;_t++)_(V.location+_t,tt/V.locationSize,Y,j,vt*F,(At+tt/V.locationSize*_t)*F,st)}else{if(Z.isInstancedBufferAttribute){for(let nt=0;nt<V.locationSize;nt++)g(V.location+nt,Z.meshPerAttribute);b.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let nt=0;nt<V.locationSize;nt++)m(V.location+nt);n.bindBuffer(n.ARRAY_BUFFER,Et);for(let nt=0;nt<V.locationSize;nt++)_(V.location+nt,tt/V.locationSize,Y,j,tt*F,tt/V.locationSize*nt*F,st)}}else if(H!==void 0){let j=H[Q];if(j!==void 0)switch(j.length){case 2:n.vertexAttrib2fv(V.location,j);break;case 3:n.vertexAttrib3fv(V.location,j);break;case 4:n.vertexAttrib4fv(V.location,j);break;default:n.vertexAttrib1fv(V.location,j)}}}}M()}function R(){I();for(let b in i){let P=i[b];for(let L in P){let U=P[L];for(let D in U)l(U[D].object),delete U[D];delete P[L]}delete i[b]}}function w(b){if(i[b.id]===void 0)return;let P=i[b.id];for(let L in P){let U=P[L];for(let D in U)l(U[D].object),delete U[D];delete P[L]}delete i[b.id]}function A(b){for(let P in i){let L=i[P];if(L[b.id]===void 0)continue;let U=L[b.id];for(let D in U)l(U[D].object),delete U[D];delete L[b.id]}}function I(){S(),o=!0,r!==s&&(r=s,h(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function g1(n,t,e){let i;function s(h){i=h}function r(h,l){n.drawArrays(i,h,l),e.update(l,i,1)}function o(h,l,u){u!==0&&(n.drawArraysInstanced(i,h,l,u),e.update(l,i,u))}function a(h,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,l,0,u);let d=0;for(let p=0;p<u;p++)d+=l[p];e.update(d,i,1)}function c(h,l,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<h.length;p++)o(h[p],l[p],f[p]);else{d.multiDrawArraysInstancedWEBGL(i,h,0,l,0,f,0,u);let p=0;for(let v=0;v<u;v++)p+=l[v]*f[v];e.update(p,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function x1(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==vn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let I=A===vo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Un&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==ui&&!I)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp",l=c(h);l!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",l,"instead."),h=l);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=p>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:M,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:R,maxSamples:w}}function v1(n){let t=this,e=null,i=0,s=!1,r=!1,o=new Qn,a=new Qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,l(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=l(u,f,0)},this.setState=function(u,f,d){let p=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,g=n.get(u);if(!s||p===null||p.length===0||r&&!m)r?l(null):h();else{let M=r?0:i,_=M*4,y=g.clippingState||null;c.value=y,y=l(p,f,_,d);for(let R=0;R!==_;++R)y[R]=e[R];g.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function h(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function l(u,f,d,p){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=c.value,p!==!0||m===null){let g=d+v*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<g)&&(m=new Float32Array(g));for(let _=0,y=d;_!==v;++_,y+=4)o.copy(u[_]).applyMatrix4(M,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function _1(n){let t=new WeakMap;function e(o,a){return a===Ul?o.mapping=pr:a===Dl&&(o.mapping=mr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ul||a===Dl)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let h=new mh(c.height);return h.fromEquirectangularTexture(n,o),t.set(o,h),o.addEventListener("dispose",s),e(h.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var Ua=class extends za{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,o=r+h*this.view.width,a-=l*this.view.offsetY,c=a-l*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},or=4,Kf=[.125,.215,.35,.446,.526,.582],bs=20,pl=new Ua,Qf=new Ht,ml=null,gl=0,xl=0,vl=!1,_s=(1+Math.sqrt(5))/2,sr=1/_s,td=[new N(-_s,sr,0),new N(_s,sr,0),new N(-sr,0,_s),new N(sr,0,_s),new N(0,_s,-sr),new N(0,_s,sr),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],yr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){ml=this._renderer.getRenderTarget(),gl=this._renderer.getActiveCubeFace(),xl=this._renderer.getActiveMipmapLevel(),vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=id(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ml,gl,xl),this._renderer.xr.enabled=vl,t.scissorTest=!1,la(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===pr||t.mapping===mr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ml=this._renderer.getRenderTarget(),gl=this._renderer.getActiveCubeFace(),xl=this._renderer.getActiveMipmapLevel(),vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:mn,minFilter:mn,generateMipmaps:!1,type:vo,format:vn,colorSpace:wr,depthBuffer:!1},s=ed(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ed(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=y1(r)),this._blurMaterial=M1(r,t,e)}return s}_compileMaterial(t){let e=new ae(this._lodPlanes[0],t);this._renderer.compile(e,pl)}_sceneToCubeUV(t,e,i,s){let a=new pn(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],l=this._renderer,u=l.autoClear,f=l.toneMapping;l.getClearColor(Qf),l.toneMapping=Ki,l.autoClear=!1;let d=new Dn({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),p=new ae(new hn,d),v=!1,m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,v=!0):(d.color.copy(Qf),v=!0);for(let g=0;g<6;g++){let M=g%3;M===0?(a.up.set(0,c[g],0),a.lookAt(h[g],0,0)):M===1?(a.up.set(0,0,c[g]),a.lookAt(0,h[g],0)):(a.up.set(0,c[g],0),a.lookAt(0,0,h[g]));let _=this._cubeSize;la(s,M*_,g>2?_:0,_,_),l.setRenderTarget(s),v&&l.render(p,a),l.render(t,a)}p.geometry.dispose(),p.material.dispose(),l.toneMapping=f,l.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===pr||t.mapping===mr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=id()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nd());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new ae(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;la(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,pl)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=td[(s-r-1)%td.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let c=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let l=3,u=new ae(this._lodPlanes[s],h),f=h.uniforms,d=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*bs-1),v=r/p,m=isFinite(r)?1+Math.floor(l*v):bs;m>bs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bs}`);let g=[],M=0;for(let A=0;A<bs;++A){let I=A/v,S=Math.exp(-I*I/2);g.push(S),A===0?M+=S:A<m&&(M+=2*S)}for(let A=0;A<g.length;A++)g[A]=g[A]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=g,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:_}=this;f.dTheta.value=p,f.mipInt.value=_-i;let y=this._sizeLods[s],R=3*y*(s>_-or?s-_+or:0),w=4*(this._cubeSize-y);la(e,R,w,3*y,2*y),c.setRenderTarget(e),c.render(u,pl)}};function y1(n){let t=[],e=[],i=[],s=n,r=n-or+1+Kf.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>n-or?c=Kf[o-n+or-1]:o===0&&(c=0),i.push(c);let h=1/(a-2),l=-h,u=1+h,f=[l,l,u,l,u,u,l,l,u,u,l,u],d=6,p=6,v=3,m=2,g=1,M=new Float32Array(v*p*d),_=new Float32Array(m*p*d),y=new Float32Array(g*p*d);for(let w=0;w<d;w++){let A=w%3*2/3-1,I=w>2?0:-1,S=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];M.set(S,v*p*w),_.set(f,m*p*w);let b=[w,w,w,w,w,w];y.set(b,g*p*w)}let R=new me;R.setAttribute("position",new ue(M,v)),R.setAttribute("uv",new ue(_,m)),R.setAttribute("faceIndex",new ue(y,g)),t.push(R),s>or&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function ed(n,t,e){let i=new zi(n,t,e);return i.texture.mapping=nc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function la(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function M1(n,t,e){let i=new Float32Array(bs),s=new N(0,1,0);return new Mn({name:"SphericalGaussianBlur",defines:{n:bs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:cu(),fragmentShader:`

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
		`,blending:ji,depthTest:!1,depthWrite:!1})}function nd(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cu(),fragmentShader:`

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
		`,blending:ji,depthTest:!1,depthWrite:!1})}function id(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function cu(){return`

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
	`}function b1(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let c=a.mapping,h=c===Ul||c===Dl,l=c===pr||c===mr;if(h||l){let u=t.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new yr(n)),u=h?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return h&&d&&d.height>0||l&&d&&s(d)?(e===null&&(e=new yr(n)),u=h?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,h=6;for(let l=0;l<h;l++)a[l]!==void 0&&c++;return c===h}function r(a){let c=a.target;c.removeEventListener("dispose",r);let h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function S1(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&no("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function E1(n,t,e,i){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let p in f.attributes)t.remove(f.attributes[p]);for(let p in f.morphAttributes){let v=f.morphAttributes[p];for(let m=0,g=v.length;m<g;m++)t.remove(v[m])}f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let p in f)t.update(f[p],n.ARRAY_BUFFER);let d=u.morphAttributes;for(let p in d){let v=d[p];for(let m=0,g=v.length;m<g;m++)t.update(v[m],n.ARRAY_BUFFER)}}function h(u){let f=[],d=u.index,p=u.attributes.position,v=0;if(d!==null){let M=d.array;v=d.version;for(let _=0,y=M.length;_<y;_+=3){let R=M[_+0],w=M[_+1],A=M[_+2];f.push(R,w,w,A,A,R)}}else if(p!==void 0){let M=p.array;v=p.version;for(let _=0,y=M.length/3-1;_<y;_+=3){let R=_+0,w=_+1,A=_+2;f.push(R,w,w,A,A,R)}}else return;let m=new(Jd(f)?Ia:Pa)(f,1);m.version=v;let g=r.get(u);g&&t.remove(g),r.set(u,m)}function l(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&h(u)}else h(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:l}}function T1(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,r,f*o),e.update(d,i,1)}function h(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,r,f*o,p),e.update(d,i,p))}function l(f,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,p);let m=0;for(let g=0;g<p;g++)m+=d[g];e.update(m,i,1)}function u(f,d,p,v){if(p===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f.length;g++)h(f[g]/o,d[g],v[g]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,v,0,p);let g=0;for(let M=0;M<p;M++)g+=d[M]*v[M];e.update(g,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=h,this.renderMultiDraw=l,this.renderMultiDrawInstances=u}function w1(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function A1(n,t,e){let i=new WeakMap,s=new Ne;function r(o,a,c){let h=o.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=l!==void 0?l.length:0,f=i.get(a);if(f===void 0||f.count!==u){let S=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],_=0;d===!0&&(_=1),p===!0&&(_=2),v===!0&&(_=3);let y=a.attributes.position.count*_,R=1;y>t.maxTextureSize&&(R=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let w=new Float32Array(y*R*4*u),A=new Ca(w,y,R,u);A.type=ui,A.needsUpdate=!0;let I=_*4;for(let b=0;b<u;b++){let P=m[b],L=g[b],U=M[b],D=y*R*4*b;for(let W=0;W<P.count;W++){let H=W*I;d===!0&&(s.fromBufferAttribute(P,W),w[D+H+0]=s.x,w[D+H+1]=s.y,w[D+H+2]=s.z,w[D+H+3]=0),p===!0&&(s.fromBufferAttribute(L,W),w[D+H+4]=s.x,w[D+H+5]=s.y,w[D+H+6]=s.z,w[D+H+7]=0),v===!0&&(s.fromBufferAttribute(U,W),w[D+H+8]=s.x,w[D+H+9]=s.y,w[D+H+10]=s.z,w[D+H+11]=U.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new at(y,R)},i.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<h.length;v++)d+=h[v];let p=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",p),c.getUniforms().setValue(n,"morphTargetInfluences",h)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function R1(n,t,e,i){let s=new WeakMap;function r(c){let h=i.render.frame,l=c.geometry,u=t.get(c,l);if(s.get(u)!==h&&(t.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function a(c){let h=c.target;h.removeEventListener("dispose",a),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:o}}var Da=class extends _n{constructor(t,e,i,s,r,o,a,c,h,l=lr){if(l!==lr&&l!==xr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&l===lr&&(i=Ts),i===void 0&&l===xr&&(i=gr),super(null,s,r,o,a,c,l,i,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ln,this.minFilter=c!==void 0?c:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},t0=new _n,sd=new Da(1,1),e0=new Ca,n0=new dh,i0=new La,rd=[],od=[],ad=new Float32Array(16),cd=new Float32Array(9),ld=new Float32Array(4);function Rr(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=rd[s];if(r===void 0&&(r=new Float32Array(s),rd[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Xe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function qe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function rc(n,t){let e=od[t];e===void 0&&(e=new Int32Array(t),od[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function C1(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function P1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;n.uniform2fv(this.addr,t),qe(e,t)}}function I1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Xe(e,t))return;n.uniform3fv(this.addr,t),qe(e,t)}}function z1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;n.uniform4fv(this.addr,t),qe(e,t)}}function L1(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Xe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),qe(e,t)}else{if(Xe(e,i))return;ld.set(i),n.uniformMatrix2fv(this.addr,!1,ld),qe(e,i)}}function U1(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Xe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),qe(e,t)}else{if(Xe(e,i))return;cd.set(i),n.uniformMatrix3fv(this.addr,!1,cd),qe(e,i)}}function D1(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Xe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),qe(e,t)}else{if(Xe(e,i))return;ad.set(i),n.uniformMatrix4fv(this.addr,!1,ad),qe(e,i)}}function N1(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function B1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;n.uniform2iv(this.addr,t),qe(e,t)}}function F1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Xe(e,t))return;n.uniform3iv(this.addr,t),qe(e,t)}}function O1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;n.uniform4iv(this.addr,t),qe(e,t)}}function k1(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function H1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;n.uniform2uiv(this.addr,t),qe(e,t)}}function V1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Xe(e,t))return;n.uniform3uiv(this.addr,t),qe(e,t)}}function G1(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;n.uniform4uiv(this.addr,t),qe(e,t)}}function W1(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(sd.compareFunction=Zd,r=sd):r=t0,e.setTexture2D(t||r,s)}function X1(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||n0,s)}function q1(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||i0,s)}function Y1(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||e0,s)}function $1(n){switch(n){case 5126:return C1;case 35664:return P1;case 35665:return I1;case 35666:return z1;case 35674:return L1;case 35675:return U1;case 35676:return D1;case 5124:case 35670:return N1;case 35667:case 35671:return B1;case 35668:case 35672:return F1;case 35669:case 35673:return O1;case 5125:return k1;case 36294:return H1;case 36295:return V1;case 36296:return G1;case 35678:case 36198:case 36298:case 36306:case 35682:return W1;case 35679:case 36299:case 36307:return X1;case 35680:case 36300:case 36308:case 36293:return q1;case 36289:case 36303:case 36311:case 36292:return Y1}}function Z1(n,t){n.uniform1fv(this.addr,t)}function J1(n,t){let e=Rr(t,this.size,2);n.uniform2fv(this.addr,e)}function j1(n,t){let e=Rr(t,this.size,3);n.uniform3fv(this.addr,e)}function K1(n,t){let e=Rr(t,this.size,4);n.uniform4fv(this.addr,e)}function Q1(n,t){let e=Rr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function tv(n,t){let e=Rr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function ev(n,t){let e=Rr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function nv(n,t){n.uniform1iv(this.addr,t)}function iv(n,t){n.uniform2iv(this.addr,t)}function sv(n,t){n.uniform3iv(this.addr,t)}function rv(n,t){n.uniform4iv(this.addr,t)}function ov(n,t){n.uniform1uiv(this.addr,t)}function av(n,t){n.uniform2uiv(this.addr,t)}function cv(n,t){n.uniform3uiv(this.addr,t)}function lv(n,t){n.uniform4uiv(this.addr,t)}function hv(n,t,e){let i=this.cache,s=t.length,r=rc(e,s);Xe(i,r)||(n.uniform1iv(this.addr,r),qe(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||t0,r[o])}function uv(n,t,e){let i=this.cache,s=t.length,r=rc(e,s);Xe(i,r)||(n.uniform1iv(this.addr,r),qe(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||n0,r[o])}function fv(n,t,e){let i=this.cache,s=t.length,r=rc(e,s);Xe(i,r)||(n.uniform1iv(this.addr,r),qe(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||i0,r[o])}function dv(n,t,e){let i=this.cache,s=t.length,r=rc(e,s);Xe(i,r)||(n.uniform1iv(this.addr,r),qe(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||e0,r[o])}function pv(n){switch(n){case 5126:return Z1;case 35664:return J1;case 35665:return j1;case 35666:return K1;case 35674:return Q1;case 35675:return tv;case 35676:return ev;case 5124:case 35670:return nv;case 35667:case 35671:return iv;case 35668:case 35672:return sv;case 35669:case 35673:return rv;case 5125:return ov;case 36294:return av;case 36295:return cv;case 36296:return lv;case 35678:case 36198:case 36298:case 36306:case 35682:return hv;case 35679:case 36299:case 36307:return uv;case 35680:case 36300:case 36308:case 36293:return fv;case 36289:case 36303:case 36311:case 36292:return dv}}var gh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=$1(e.type)}},xh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=pv(e.type)}},vh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},_l=/(\w+)(\])?(\[|\.)?/g;function hd(n,t){n.seq.push(t),n.map[t.id]=t}function mv(n,t,e){let i=n.name,s=i.length;for(_l.lastIndex=0;;){let r=_l.exec(i),o=_l.lastIndex,a=r[1],c=r[2]==="]",h=r[3];if(c&&(a=a|0),h===void 0||h==="["&&o+2===s){hd(e,h===void 0?new gh(a,n,t):new xh(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new vh(a),hd(e,u)),e=u}}}var ur=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);mv(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function ud(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var gv=37297,xv=0;function vv(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var fd=new Qt;function _v(n){he._getMatrix(fd,he.workingColorSpace,n);let t=`mat3( ${fd.elements.map(e=>e.toFixed(4))} )`;switch(he.getTransfer(n)){case sc:return[t,"LinearTransferOETF"];case ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function dd(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+vv(n.getShaderSource(t),o)}else return s}function yv(n,t){let e=_v(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Mv(n,t){let e;switch(t){case Yp:e="Linear";break;case $p:e="Reinhard";break;case Zp:e="Cineon";break;case eu:e="ACESFilmic";break;case jp:e="AgX";break;case Kp:e="Neutral";break;case Jp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ha=new N;function bv(){he.getLuminanceCoefficients(ha);let n=ha.x.toFixed(4),t=ha.y.toFixed(4),e=ha.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(io).join(`
`)}function Ev(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Tv(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function io(n){return n!==""}function pd(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function md(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var wv=/^[ \t]*#include +<([\w\d./]+)>/gm;function _h(n){return n.replace(wv,Rv)}var Av=new Map;function Rv(n,t){let e=ie[t];if(e===void 0){let i=Av.get(t);if(i!==void 0)e=ie[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return _h(e)}var Cv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gd(n){return n.replace(Cv,Pv)}function Pv(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xd(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function Iv(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Fd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===tu?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ri&&(t="SHADOWMAP_TYPE_VSM"),t}function zv(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case pr:case mr:t="ENVMAP_TYPE_CUBE";break;case nc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Lv(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case mr:t="ENVMAP_MODE_REFRACTION";break}return t}function Uv(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ec:t="ENVMAP_BLENDING_MULTIPLY";break;case Xp:t="ENVMAP_BLENDING_MIX";break;case qp:t="ENVMAP_BLENDING_ADD";break}return t}function Dv(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Nv(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Iv(e),h=zv(e),l=Lv(e),u=Uv(e),f=Dv(e),d=Sv(e),p=Ev(r),v=s.createProgram(),m,g,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(io).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(io).join(`
`),g.length>0&&(g+=`
`)):(m=[xd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(io).join(`
`),g=[xd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ki?"#define TONE_MAPPING":"",e.toneMapping!==Ki?ie.tonemapping_pars_fragment:"",e.toneMapping!==Ki?Mv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,yv("linearToOutputTexel",e.outputColorSpace),bv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(io).join(`
`)),o=_h(o),o=pd(o,e),o=md(o,e),a=_h(a),a=pd(a,e),a=md(a,e),o=gd(o),a=gd(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",e.glslVersion===If?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===If?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let _=M+m+o,y=M+g+a,R=ud(s,s.VERTEX_SHADER,_),w=ud(s,s.FRAGMENT_SHADER,y);s.attachShader(v,R),s.attachShader(v,w),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(P){if(n.debug.checkShaderErrors){let L=s.getProgramInfoLog(v).trim(),U=s.getShaderInfoLog(R).trim(),D=s.getShaderInfoLog(w).trim(),W=!0,H=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,R,w);else{let Q=dd(s,R,"vertex"),V=dd(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+L+`
`+Q+`
`+V)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(U===""||D==="")&&(H=!1);H&&(P.diagnostics={runnable:W,programLog:L,vertexShader:{log:U,prefix:m},fragmentShader:{log:D,prefix:g}})}s.deleteShader(R),s.deleteShader(w),I=new ur(s,v),S=Tv(s,v)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(v,gv)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=xv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=w,this}var Bv=0,yh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Mh(t),e.set(t,i)),i}},Mh=class{constructor(t){this.id=Bv++,this.code=t,this.usedTimes=0}};function Fv(n,t,e,i,s,r,o){let a=new co,c=new yh,h=new Set,l=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return h.add(S),S===0?"uv":`uv${S}`}function m(S,b,P,L,U){let D=L.fog,W=U.geometry,H=S.isMeshStandardMaterial?L.environment:null,Q=(S.isMeshStandardMaterial?e:t).get(S.envMap||H),V=Q&&Q.mapping===nc?Q.image.height:null,Z=p[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));let j=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,tt=j!==void 0?j.length:0,ut=0;W.morphAttributes.position!==void 0&&(ut=1),W.morphAttributes.normal!==void 0&&(ut=2),W.morphAttributes.color!==void 0&&(ut=3);let Et,Y,F,st;if(Z){let ge=hi[Z];Et=ge.vertexShader,Y=ge.fragmentShader}else Et=S.vertexShader,Y=S.fragmentShader,c.update(S),F=c.getVertexShaderID(S),st=c.getFragmentShaderID(S);let nt=n.getRenderTarget(),vt=n.state.buffers.depth.getReversed(),At=U.isInstancedMesh===!0,_t=U.isBatchedMesh===!0,Gt=!!S.map,et=!!S.matcap,ct=!!Q,z=!!S.aoMap,It=!!S.lightMap,ot=!!S.bumpMap,yt=!!S.normalMap,dt=!!S.displacementMap,Wt=!!S.emissiveMap,Tt=!!S.metalnessMap,C=!!S.roughnessMap,E=S.anisotropy>0,G=S.clearcoat>0,J=S.dispersion>0,rt=S.iridescence>0,K=S.sheen>0,Lt=S.transmission>0,gt=E&&!!S.anisotropyMap,wt=G&&!!S.clearcoatMap,oe=G&&!!S.clearcoatNormalMap,lt=G&&!!S.clearcoatRoughnessMap,Rt=rt&&!!S.iridescenceMap,Xt=rt&&!!S.iridescenceThicknessMap,Yt=K&&!!S.sheenColorMap,Ct=K&&!!S.sheenRoughnessMap,ce=!!S.specularMap,ne=!!S.specularColorMap,ye=!!S.specularIntensityMap,B=Lt&&!!S.transmissionMap,xt=Lt&&!!S.thicknessMap,$=!!S.gradientMap,it=!!S.alphaMap,St=S.alphaTest>0,Mt=!!S.alphaHash,jt=!!S.extensions,De=Ki;S.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(De=n.toneMapping);let rn={shaderID:Z,shaderType:S.type,shaderName:S.name,vertexShader:Et,fragmentShader:Y,defines:S.defines,customVertexShaderID:F,customFragmentShaderID:st,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:_t,batchingColor:_t&&U._colorsTexture!==null,instancing:At,instancingColor:At&&U.instanceColor!==null,instancingMorph:At&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:nt===null?n.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:wr,alphaToCoverage:!!S.alphaToCoverage,map:Gt,matcap:et,envMap:ct,envMapMode:ct&&Q.mapping,envMapCubeUVHeight:V,aoMap:z,lightMap:It,bumpMap:ot,normalMap:yt,displacementMap:f&&dt,emissiveMap:Wt,normalMapObjectSpace:yt&&S.normalMapType===nm,normalMapTangentSpace:yt&&S.normalMapType===ic,metalnessMap:Tt,roughnessMap:C,anisotropy:E,anisotropyMap:gt,clearcoat:G,clearcoatMap:wt,clearcoatNormalMap:oe,clearcoatRoughnessMap:lt,dispersion:J,iridescence:rt,iridescenceMap:Rt,iridescenceThicknessMap:Xt,sheen:K,sheenColorMap:Yt,sheenRoughnessMap:Ct,specularMap:ce,specularColorMap:ne,specularIntensityMap:ye,transmission:Lt,transmissionMap:B,thicknessMap:xt,gradientMap:$,opaque:S.transparent===!1&&S.blending===cr&&S.alphaToCoverage===!1,alphaMap:it,alphaTest:St,alphaHash:Mt,combine:S.combine,mapUv:Gt&&v(S.map.channel),aoMapUv:z&&v(S.aoMap.channel),lightMapUv:It&&v(S.lightMap.channel),bumpMapUv:ot&&v(S.bumpMap.channel),normalMapUv:yt&&v(S.normalMap.channel),displacementMapUv:dt&&v(S.displacementMap.channel),emissiveMapUv:Wt&&v(S.emissiveMap.channel),metalnessMapUv:Tt&&v(S.metalnessMap.channel),roughnessMapUv:C&&v(S.roughnessMap.channel),anisotropyMapUv:gt&&v(S.anisotropyMap.channel),clearcoatMapUv:wt&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:oe&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Xt&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&v(S.sheenRoughnessMap.channel),specularMapUv:ce&&v(S.specularMap.channel),specularColorMapUv:ne&&v(S.specularColorMap.channel),specularIntensityMapUv:ye&&v(S.specularIntensityMap.channel),transmissionMapUv:B&&v(S.transmissionMap.channel),thicknessMapUv:xt&&v(S.thicknessMap.channel),alphaMapUv:it&&v(S.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(yt||E),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!W.attributes.uv&&(Gt||it),fog:!!D,useFog:S.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:vt,skinning:U.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:ut,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:De,decodeVideoTexture:Gt&&S.map.isVideoTexture===!0&&he.getTransfer(S.map.colorSpace)===ve,decodeVideoTextureEmissive:Wt&&S.emissiveMap.isVideoTexture===!0&&he.getTransfer(S.emissiveMap.colorSpace)===ve,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ti,flipSided:S.side===cn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:jt&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(jt&&S.extensions.multiDraw===!0||_t)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return rn.vertexUv1s=h.has(1),rn.vertexUv2s=h.has(2),rn.vertexUv3s=h.has(3),h.clear(),rn}function g(S){let b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(let P in S.defines)b.push(P),b.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(M(b,S),_(b,S),b.push(n.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function M(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function _(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){let b=p[S.type],P;if(b){let L=hi[b];P=Rm.clone(L.uniforms)}else P=S.uniforms;return P}function R(S,b){let P;for(let L=0,U=l.length;L<U;L++){let D=l[L];if(D.cacheKey===b){P=D,++P.usedTimes;break}}return P===void 0&&(P=new Nv(n,b,S,r),l.push(P)),P}function w(S){if(--S.usedTimes===0){let b=l.indexOf(S);l[b]=l[l.length-1],l.pop(),S.destroy()}}function A(S){c.remove(S)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:y,acquireProgram:R,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:I}}function Ov(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function kv(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function vd(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function _d(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,f,d,p,v,m){let g=n[t];return g===void 0?(g={id:u.id,object:u,geometry:f,material:d,groupOrder:p,renderOrder:u.renderOrder,z:v,group:m},n[t]=g):(g.id=u.id,g.object=u,g.geometry=f,g.material=d,g.groupOrder=p,g.renderOrder=u.renderOrder,g.z=v,g.group=m),t++,g}function a(u,f,d,p,v,m){let g=o(u,f,d,p,v,m);d.transmission>0?i.push(g):d.transparent===!0?s.push(g):e.push(g)}function c(u,f,d,p,v,m){let g=o(u,f,d,p,v,m);d.transmission>0?i.unshift(g):d.transparent===!0?s.unshift(g):e.unshift(g)}function h(u,f){e.length>1&&e.sort(u||kv),i.length>1&&i.sort(f||vd),s.length>1&&s.sort(f||vd)}function l(){for(let u=t,f=n.length;u<f;u++){let d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:l,sort:h}}function Hv(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new _d,n.set(i,[o])):s>=r.length?(o=new _d,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Vv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Ht};break;case"SpotLight":e={position:new N,direction:new N,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new N,halfWidth:new N,halfHeight:new N};break}return n[t.id]=e,e}}}function Gv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var Wv=0;function Xv(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function qv(n){let t=new Vv,e=Gv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new N);let s=new N,r=new se,o=new se;function a(h){let l=0,u=0,f=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let d=0,p=0,v=0,m=0,g=0,M=0,_=0,y=0,R=0,w=0,A=0;h.sort(Xv);for(let S=0,b=h.length;S<b;S++){let P=h[S],L=P.color,U=P.intensity,D=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)l+=L.r*U,u+=L.g*U,f+=L.b*U;else if(P.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(P.sh.coefficients[H],U);A++}else if(P.isDirectionalLight){let H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Q=P.shadow,V=e.get(P);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,i.directionalShadow[d]=V,i.directionalShadowMap[d]=W,i.directionalShadowMatrix[d]=P.shadow.matrix,M++}i.directional[d]=H,d++}else if(P.isSpotLight){let H=t.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(L).multiplyScalar(U),H.distance=D,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,i.spot[v]=H;let Q=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,Q.updateMatrices(P),P.castShadow&&w++),i.spotLightMatrix[v]=Q.matrix,P.castShadow){let V=e.get(P);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,i.spotShadow[v]=V,i.spotShadowMap[v]=W,y++}v++}else if(P.isRectAreaLight){let H=t.get(P);H.color.copy(L).multiplyScalar(U),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=H,m++}else if(P.isPointLight){let H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){let Q=P.shadow,V=e.get(P);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,V.shadowCameraNear=Q.camera.near,V.shadowCameraFar=Q.camera.far,i.pointShadow[p]=V,i.pointShadowMap[p]=W,i.pointShadowMatrix[p]=P.shadow.matrix,_++}i.point[p]=H,p++}else if(P.isHemisphereLight){let H=t.get(P);H.skyColor.copy(P.color).multiplyScalar(U),H.groundColor.copy(P.groundColor).multiplyScalar(U),i.hemi[g]=H,g++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pt.LTC_FLOAT_1,i.rectAreaLTC2=pt.LTC_FLOAT_2):(i.rectAreaLTC1=pt.LTC_HALF_1,i.rectAreaLTC2=pt.LTC_HALF_2)),i.ambient[0]=l,i.ambient[1]=u,i.ambient[2]=f;let I=i.hash;(I.directionalLength!==d||I.pointLength!==p||I.spotLength!==v||I.rectAreaLength!==m||I.hemiLength!==g||I.numDirectionalShadows!==M||I.numPointShadows!==_||I.numSpotShadows!==y||I.numSpotMaps!==R||I.numLightProbes!==A)&&(i.directional.length=d,i.spot.length=v,i.rectArea.length=m,i.point.length=p,i.hemi.length=g,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=y+R-w,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,I.directionalLength=d,I.pointLength=p,I.spotLength=v,I.rectAreaLength=m,I.hemiLength=g,I.numDirectionalShadows=M,I.numPointShadows=_,I.numSpotShadows=y,I.numSpotMaps=R,I.numLightProbes=A,i.version=Wv++)}function c(h,l){let u=0,f=0,d=0,p=0,v=0,m=l.matrixWorldInverse;for(let g=0,M=h.length;g<M;g++){let _=h[g];if(_.isDirectionalLight){let y=i.directional[u];y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(_.isSpotLight){let y=i.spot[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(_.isRectAreaLight){let y=i.rectArea[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(_.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(_.isPointLight){let y=i.point[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){let y=i.hemi[v];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:i}}function yd(n){let t=new qv(n),e=[],i=[];function s(l){h.camera=l,e.length=0,i.length=0}function r(l){e.push(l)}function o(l){i.push(l)}function a(){t.setup(e)}function c(l){t.setupView(e,l)}let h={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Yv(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new yd(n),t.set(s,[a])):r>=o.length?(a=new yd(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var bh=class extends ei{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=tm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Sh=class extends ei{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},$v=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zv=`uniform sampler2D shadow_pass;
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
}`;function Jv(n,t,e){let i=new ws,s=new at,r=new at,o=new Ne,a=new bh({depthPacking:em}),c=new Sh,h={},l=e.maxTextureSize,u={[Qi]:cn,[cn]:Qi,[ti]:ti},f=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:$v,fragmentShader:Zv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let p=new me;p.setAttribute("position",new ue(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ae(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fd;let g=this.type;this.render=function(w,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let S=n.getRenderTarget(),b=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),L=n.state;L.setBlending(ji),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let U=g!==Ri&&this.type===Ri,D=g===Ri&&this.type!==Ri;for(let W=0,H=w.length;W<H;W++){let Q=w[W],V=Q.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let Z=V.getFrameExtents();if(s.multiply(Z),r.copy(V.mapSize),(s.x>l||s.y>l)&&(s.x>l&&(r.x=Math.floor(l/Z.x),s.x=r.x*Z.x,V.mapSize.x=r.x),s.y>l&&(r.y=Math.floor(l/Z.y),s.y=r.y*Z.y,V.mapSize.y=r.y)),V.map===null||U===!0||D===!0){let tt=this.type!==Ri?{minFilter:ln,magFilter:ln}:{};V.map!==null&&V.map.dispose(),V.map=new zi(s.x,s.y,tt),V.map.texture.name=Q.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();let j=V.getViewportCount();for(let tt=0;tt<j;tt++){let ut=V.getViewport(tt);o.set(r.x*ut.x,r.y*ut.y,r.x*ut.z,r.y*ut.w),L.viewport(o),V.updateMatrices(Q,tt),i=V.getFrustum(),y(A,I,V.camera,Q,this.type)}V.isPointLightShadow!==!0&&this.type===Ri&&M(V,I),V.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(S,b,P)};function M(w,A){let I=t.update(v);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new zi(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(A,null,I,f,v,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(A,null,I,d,v,null)}function _(w,A,I,S){let b=null,P=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)b=P;else if(b=I.isPointLight===!0?c:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let L=b.uuid,U=A.uuid,D=h[L];D===void 0&&(D={},h[L]=D);let W=D[U];W===void 0&&(W=b.clone(),D[U]=W,A.addEventListener("dispose",R)),b=W}if(b.visible=A.visible,b.wireframe=A.wireframe,S===Ri?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:u[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,I.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let L=n.properties.get(b);L.light=I}return b}function y(w,A,I,S,b){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===Ri)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);let U=t.update(w),D=w.material;if(Array.isArray(D)){let W=U.groups;for(let H=0,Q=W.length;H<Q;H++){let V=W[H],Z=D[V.materialIndex];if(Z&&Z.visible){let j=_(w,Z,S,b);w.onBeforeShadow(n,w,A,I,U,j,V),n.renderBufferDirect(I,null,U,j,w,V),w.onAfterShadow(n,w,A,I,U,j,V)}}}else if(D.visible){let W=_(w,D,S,b);w.onBeforeShadow(n,w,A,I,U,W,null),n.renderBufferDirect(I,null,U,W,w,null),w.onAfterShadow(n,w,A,I,U,W,null)}}let L=w.children;for(let U=0,D=L.length;U<D;U++)y(L[U],A,I,S,b)}function R(w){w.target.removeEventListener("dispose",R);for(let I in h){let S=h[I],b=w.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}var jv={[Al]:Rl,[Cl]:zl,[Pl]:Ll,[dr]:Il,[Rl]:Al,[zl]:Cl,[Ll]:Pl,[Il]:dr};function Kv(n,t){function e(){let B=!1,xt=new Ne,$=null,it=new Ne(0,0,0,0);return{setMask:function(St){$!==St&&!B&&(n.colorMask(St,St,St,St),$=St)},setLocked:function(St){B=St},setClear:function(St,Mt,jt,De,rn){rn===!0&&(St*=De,Mt*=De,jt*=De),xt.set(St,Mt,jt,De),it.equals(xt)===!1&&(n.clearColor(St,Mt,jt,De),it.copy(xt))},reset:function(){B=!1,$=null,it.set(-1,0,0,0)}}}function i(){let B=!1,xt=!1,$=null,it=null,St=null;return{setReversed:function(Mt){if(xt!==Mt){let jt=t.get("EXT_clip_control");xt?jt.clipControlEXT(jt.LOWER_LEFT_EXT,jt.ZERO_TO_ONE_EXT):jt.clipControlEXT(jt.LOWER_LEFT_EXT,jt.NEGATIVE_ONE_TO_ONE_EXT);let De=St;St=null,this.setClear(De)}xt=Mt},getReversed:function(){return xt},setTest:function(Mt){Mt?nt(n.DEPTH_TEST):vt(n.DEPTH_TEST)},setMask:function(Mt){$!==Mt&&!B&&(n.depthMask(Mt),$=Mt)},setFunc:function(Mt){if(xt&&(Mt=jv[Mt]),it!==Mt){switch(Mt){case Al:n.depthFunc(n.NEVER);break;case Rl:n.depthFunc(n.ALWAYS);break;case Cl:n.depthFunc(n.LESS);break;case dr:n.depthFunc(n.LEQUAL);break;case Pl:n.depthFunc(n.EQUAL);break;case Il:n.depthFunc(n.GEQUAL);break;case zl:n.depthFunc(n.GREATER);break;case Ll:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}it=Mt}},setLocked:function(Mt){B=Mt},setClear:function(Mt){St!==Mt&&(xt&&(Mt=1-Mt),n.clearDepth(Mt),St=Mt)},reset:function(){B=!1,$=null,it=null,St=null,xt=!1}}}function s(){let B=!1,xt=null,$=null,it=null,St=null,Mt=null,jt=null,De=null,rn=null;return{setTest:function(ge){B||(ge?nt(n.STENCIL_TEST):vt(n.STENCIL_TEST))},setMask:function(ge){xt!==ge&&!B&&(n.stencilMask(ge),xt=ge)},setFunc:function(ge,$n,Mi){($!==ge||it!==$n||St!==Mi)&&(n.stencilFunc(ge,$n,Mi),$=ge,it=$n,St=Mi)},setOp:function(ge,$n,Mi){(Mt!==ge||jt!==$n||De!==Mi)&&(n.stencilOp(ge,$n,Mi),Mt=ge,jt=$n,De=Mi)},setLocked:function(ge){B=ge},setClear:function(ge){rn!==ge&&(n.clearStencil(ge),rn=ge)},reset:function(){B=!1,xt=null,$=null,it=null,St=null,Mt=null,jt=null,De=null,rn=null}}}let r=new e,o=new i,a=new s,c=new WeakMap,h=new WeakMap,l={},u={},f=new WeakMap,d=[],p=null,v=!1,m=null,g=null,M=null,_=null,y=null,R=null,w=null,A=new Ht(0,0,0),I=0,S=!1,b=null,P=null,L=null,U=null,D=null,W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,Q=0,V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(V)[1]),H=Q>=1):V.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),H=Q>=2);let Z=null,j={},tt=n.getParameter(n.SCISSOR_BOX),ut=n.getParameter(n.VIEWPORT),Et=new Ne().fromArray(tt),Y=new Ne().fromArray(ut);function F(B,xt,$,it){let St=new Uint8Array(4),Mt=n.createTexture();n.bindTexture(B,Mt),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let jt=0;jt<$;jt++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(xt,0,n.RGBA,1,1,it,0,n.RGBA,n.UNSIGNED_BYTE,St):n.texImage2D(xt+jt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,St);return Mt}let st={};st[n.TEXTURE_2D]=F(n.TEXTURE_2D,n.TEXTURE_2D,1),st[n.TEXTURE_CUBE_MAP]=F(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[n.TEXTURE_2D_ARRAY]=F(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),st[n.TEXTURE_3D]=F(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(n.DEPTH_TEST),o.setFunc(dr),ot(!1),yt(Sf),nt(n.CULL_FACE),z(ji);function nt(B){l[B]!==!0&&(n.enable(B),l[B]=!0)}function vt(B){l[B]!==!1&&(n.disable(B),l[B]=!1)}function At(B,xt){return u[B]!==xt?(n.bindFramebuffer(B,xt),u[B]=xt,B===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=xt),B===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=xt),!0):!1}function _t(B,xt){let $=d,it=!1;if(B){$=f.get(xt),$===void 0&&($=[],f.set(xt,$));let St=B.textures;if($.length!==St.length||$[0]!==n.COLOR_ATTACHMENT0){for(let Mt=0,jt=St.length;Mt<jt;Mt++)$[Mt]=n.COLOR_ATTACHMENT0+Mt;$.length=St.length,it=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,it=!0);it&&n.drawBuffers($)}function Gt(B){return p!==B?(n.useProgram(B),p=B,!0):!1}let et={[ys]:n.FUNC_ADD,[Rp]:n.FUNC_SUBTRACT,[Cp]:n.FUNC_REVERSE_SUBTRACT};et[Pp]=n.MIN,et[Ip]=n.MAX;let ct={[zp]:n.ZERO,[Lp]:n.ONE,[Up]:n.SRC_COLOR,[Tl]:n.SRC_ALPHA,[kp]:n.SRC_ALPHA_SATURATE,[Fp]:n.DST_COLOR,[Np]:n.DST_ALPHA,[Dp]:n.ONE_MINUS_SRC_COLOR,[wl]:n.ONE_MINUS_SRC_ALPHA,[Op]:n.ONE_MINUS_DST_COLOR,[Bp]:n.ONE_MINUS_DST_ALPHA,[Hp]:n.CONSTANT_COLOR,[Vp]:n.ONE_MINUS_CONSTANT_COLOR,[Gp]:n.CONSTANT_ALPHA,[Wp]:n.ONE_MINUS_CONSTANT_ALPHA};function z(B,xt,$,it,St,Mt,jt,De,rn,ge){if(B===ji){v===!0&&(vt(n.BLEND),v=!1);return}if(v===!1&&(nt(n.BLEND),v=!0),B!==Ap){if(B!==m||ge!==S){if((g!==ys||y!==ys)&&(n.blendEquation(n.FUNC_ADD),g=ys,y=ys),ge)switch(B){case cr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fr:n.blendFunc(n.ONE,n.ONE);break;case Ef:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Tf:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case cr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fr:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ef:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Tf:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}M=null,_=null,R=null,w=null,A.set(0,0,0),I=0,m=B,S=ge}return}St=St||xt,Mt=Mt||$,jt=jt||it,(xt!==g||St!==y)&&(n.blendEquationSeparate(et[xt],et[St]),g=xt,y=St),($!==M||it!==_||Mt!==R||jt!==w)&&(n.blendFuncSeparate(ct[$],ct[it],ct[Mt],ct[jt]),M=$,_=it,R=Mt,w=jt),(De.equals(A)===!1||rn!==I)&&(n.blendColor(De.r,De.g,De.b,rn),A.copy(De),I=rn),m=B,S=!1}function It(B,xt){B.side===ti?vt(n.CULL_FACE):nt(n.CULL_FACE);let $=B.side===cn;xt&&($=!$),ot($),B.blending===cr&&B.transparent===!1?z(ji):z(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);let it=B.stencilWrite;a.setTest(it),it&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Wt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?nt(n.SAMPLE_ALPHA_TO_COVERAGE):vt(n.SAMPLE_ALPHA_TO_COVERAGE)}function ot(B){b!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),b=B)}function yt(B){B!==Tp?(nt(n.CULL_FACE),B!==P&&(B===Sf?n.cullFace(n.BACK):B===wp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):vt(n.CULL_FACE),P=B}function dt(B){B!==L&&(H&&n.lineWidth(B),L=B)}function Wt(B,xt,$){B?(nt(n.POLYGON_OFFSET_FILL),(U!==xt||D!==$)&&(n.polygonOffset(xt,$),U=xt,D=$)):vt(n.POLYGON_OFFSET_FILL)}function Tt(B){B?nt(n.SCISSOR_TEST):vt(n.SCISSOR_TEST)}function C(B){B===void 0&&(B=n.TEXTURE0+W-1),Z!==B&&(n.activeTexture(B),Z=B)}function E(B,xt,$){$===void 0&&(Z===null?$=n.TEXTURE0+W-1:$=Z);let it=j[$];it===void 0&&(it={type:void 0,texture:void 0},j[$]=it),(it.type!==B||it.texture!==xt)&&(Z!==$&&(n.activeTexture($),Z=$),n.bindTexture(B,xt||st[B]),it.type=B,it.texture=xt)}function G(){let B=j[Z];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function J(){try{n.compressedTexImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function rt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function K(){try{n.texSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Lt(){try{n.texSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function gt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function wt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function oe(){try{n.texStorage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function lt(){try{n.texStorage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Rt(){try{n.texImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Xt(){try{n.texImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Yt(B){Et.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),Et.copy(B))}function Ct(B){Y.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),Y.copy(B))}function ce(B,xt){let $=h.get(xt);$===void 0&&($=new WeakMap,h.set(xt,$));let it=$.get(B);it===void 0&&(it=n.getUniformBlockIndex(xt,B.name),$.set(B,it))}function ne(B,xt){let it=h.get(xt).get(B);c.get(xt)!==it&&(n.uniformBlockBinding(xt,it,B.__bindingPointIndex),c.set(xt,it))}function ye(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},Z=null,j={},u={},f=new WeakMap,d=[],p=null,v=!1,m=null,g=null,M=null,_=null,y=null,R=null,w=null,A=new Ht(0,0,0),I=0,S=!1,b=null,P=null,L=null,U=null,D=null,Et.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:vt,bindFramebuffer:At,drawBuffers:_t,useProgram:Gt,setBlending:z,setMaterial:It,setFlipSided:ot,setCullFace:yt,setLineWidth:dt,setPolygonOffset:Wt,setScissorTest:Tt,activeTexture:C,bindTexture:E,unbindTexture:G,compressedTexImage2D:J,compressedTexImage3D:rt,texImage2D:Rt,texImage3D:Xt,updateUBOMapping:ce,uniformBlockBinding:ne,texStorage2D:oe,texStorage3D:lt,texSubImage2D:K,texSubImage3D:Lt,compressedTexSubImage2D:gt,compressedTexSubImage3D:wt,scissor:Yt,viewport:Ct,reset:ye}}function Md(n,t,e,i){let s=Qv(i);switch(e){case Gd:return n*t;case Xd:return n*t;case qd:return n*t*2;case _o:return n*t/s.components*s.byteLength;case ru:return n*t/s.components*s.byteLength;case Yd:return n*t*2/s.components*s.byteLength;case ou:return n*t*2/s.components*s.byteLength;case Wd:return n*t*3/s.components*s.byteLength;case vn:return n*t*4/s.components*s.byteLength;case au:return n*t*4/s.components*s.byteLength;case ya:case Ma:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ba:case Sa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Fl:case kl:return Math.max(n,16)*Math.max(t,8)/4;case Bl:case Ol:return Math.max(n,8)*Math.max(t,8)/2;case Hl:case Vl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Gl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Wl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Xl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ql:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Yl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case $l:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Zl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Jl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case jl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Kl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ql:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case th:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case eh:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case nh:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ih:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ea:case sh:case rh:return Math.ceil(n/4)*Math.ceil(t/4)*16;case $d:case oh:return Math.ceil(n/4)*Math.ceil(t/4)*8;case ah:case ch:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Qv(n){switch(n){case Un:case kd:return{byteLength:1,components:1};case ao:case Hd:case vo:return{byteLength:2,components:1};case iu:case su:return{byteLength:2,components:4};case Ts:case nu:case ui:return{byteLength:4,components:1};case Vd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function t_(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new at,l=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(C,E){return d?new OffscreenCanvas(C,E):Aa("canvas")}function v(C,E,G){let J=1,rt=Tt(C);if((rt.width>G||rt.height>G)&&(J=G/Math.max(rt.width,rt.height)),J<1)if(typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&C instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&C instanceof ImageBitmap||typeof VideoFrame!="undefined"&&C instanceof VideoFrame){let K=Math.floor(J*rt.width),Lt=Math.floor(J*rt.height);u===void 0&&(u=p(K,Lt));let gt=E?p(K,Lt):u;return gt.width=K,gt.height=Lt,gt.getContext("2d").drawImage(C,0,0,K,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+K+"x"+Lt+")."),gt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),C;return C}function m(C){return C.generateMipmaps}function g(C){n.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(C,E,G,J,rt=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let K=E;if(E===n.RED&&(G===n.FLOAT&&(K=n.R32F),G===n.HALF_FLOAT&&(K=n.R16F),G===n.UNSIGNED_BYTE&&(K=n.R8)),E===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.R8UI),G===n.UNSIGNED_SHORT&&(K=n.R16UI),G===n.UNSIGNED_INT&&(K=n.R32UI),G===n.BYTE&&(K=n.R8I),G===n.SHORT&&(K=n.R16I),G===n.INT&&(K=n.R32I)),E===n.RG&&(G===n.FLOAT&&(K=n.RG32F),G===n.HALF_FLOAT&&(K=n.RG16F),G===n.UNSIGNED_BYTE&&(K=n.RG8)),E===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.RG8UI),G===n.UNSIGNED_SHORT&&(K=n.RG16UI),G===n.UNSIGNED_INT&&(K=n.RG32UI),G===n.BYTE&&(K=n.RG8I),G===n.SHORT&&(K=n.RG16I),G===n.INT&&(K=n.RG32I)),E===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.RGB8UI),G===n.UNSIGNED_SHORT&&(K=n.RGB16UI),G===n.UNSIGNED_INT&&(K=n.RGB32UI),G===n.BYTE&&(K=n.RGB8I),G===n.SHORT&&(K=n.RGB16I),G===n.INT&&(K=n.RGB32I)),E===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),G===n.UNSIGNED_INT&&(K=n.RGBA32UI),G===n.BYTE&&(K=n.RGBA8I),G===n.SHORT&&(K=n.RGBA16I),G===n.INT&&(K=n.RGBA32I)),E===n.RGB&&G===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),E===n.RGBA){let Lt=rt?sc:he.getTransfer(J);G===n.FLOAT&&(K=n.RGBA32F),G===n.HALF_FLOAT&&(K=n.RGBA16F),G===n.UNSIGNED_BYTE&&(K=Lt===ve?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(C,E){let G;return C?E===null||E===Ts||E===gr?G=n.DEPTH24_STENCIL8:E===ui?G=n.DEPTH32F_STENCIL8:E===ao&&(G=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ts||E===gr?G=n.DEPTH_COMPONENT24:E===ui?G=n.DEPTH_COMPONENT32F:E===ao&&(G=n.DEPTH_COMPONENT16),G}function R(C,E){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==ln&&C.minFilter!==mn?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function w(C){let E=C.target;E.removeEventListener("dispose",w),I(E),E.isVideoTexture&&l.delete(E)}function A(C){let E=C.target;E.removeEventListener("dispose",A),b(E)}function I(C){let E=i.get(C);if(E.__webglInit===void 0)return;let G=C.source,J=f.get(G);if(J){let rt=J[E.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&S(C),Object.keys(J).length===0&&f.delete(G)}i.remove(C)}function S(C){let E=i.get(C);n.deleteTexture(E.__webglTexture);let G=C.source,J=f.get(G);delete J[E.__cacheKey],o.memory.textures--}function b(C){let E=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let rt=0;rt<E.__webglFramebuffer[J].length;rt++)n.deleteFramebuffer(E.__webglFramebuffer[J][rt]);else n.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)n.deleteFramebuffer(E.__webglFramebuffer[J]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let G=C.textures;for(let J=0,rt=G.length;J<rt;J++){let K=i.get(G[J]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),o.memory.textures--),i.remove(G[J])}i.remove(C)}let P=0;function L(){P=0}function U(){let C=P;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),P+=1,C}function D(C){let E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function W(C,E){let G=i.get(C);if(C.isVideoTexture&&dt(C),C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){let J=C.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(G,C,E);return}}e.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+E)}function H(C,E){let G=i.get(C);if(C.version>0&&G.__version!==C.version){Y(G,C,E);return}e.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+E)}function Q(C,E){let G=i.get(C);if(C.version>0&&G.__version!==C.version){Y(G,C,E);return}e.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+E)}function V(C,E){let G=i.get(C);if(C.version>0&&G.__version!==C.version){F(G,C,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+E)}let Z={[Gn]:n.REPEAT,[Ss]:n.CLAMP_TO_EDGE,[Nl]:n.MIRRORED_REPEAT},j={[ln]:n.NEAREST,[Qp]:n.NEAREST_MIPMAP_NEAREST,[Wo]:n.NEAREST_MIPMAP_LINEAR,[mn]:n.LINEAR,[Wc]:n.LINEAR_MIPMAP_NEAREST,[Es]:n.LINEAR_MIPMAP_LINEAR},tt={[im]:n.NEVER,[lm]:n.ALWAYS,[sm]:n.LESS,[Zd]:n.LEQUAL,[rm]:n.EQUAL,[cm]:n.GEQUAL,[om]:n.GREATER,[am]:n.NOTEQUAL};function ut(C,E){if(E.type===ui&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===mn||E.magFilter===Wc||E.magFilter===Wo||E.magFilter===Es||E.minFilter===mn||E.minFilter===Wc||E.minFilter===Wo||E.minFilter===Es)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,Z[E.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,Z[E.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,Z[E.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,j[E.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,j[E.minFilter]),E.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,tt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ln||E.minFilter!==Wo&&E.minFilter!==Es||E.type===ui&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){let G=t.get("EXT_texture_filter_anisotropic");n.texParameterf(C,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Et(C,E){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",w));let J=E.source,rt=f.get(J);rt===void 0&&(rt={},f.set(J,rt));let K=D(E);if(K!==C.__cacheKey){rt[K]===void 0&&(rt[K]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,G=!0),rt[K].usedTimes++;let Lt=rt[C.__cacheKey];Lt!==void 0&&(rt[C.__cacheKey].usedTimes--,Lt.usedTimes===0&&S(E)),C.__cacheKey=K,C.__webglTexture=rt[K].texture}return G}function Y(C,E,G){let J=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(J=n.TEXTURE_3D);let rt=Et(C,E),K=E.source;e.bindTexture(J,C.__webglTexture,n.TEXTURE0+G);let Lt=i.get(K);if(K.version!==Lt.__version||rt===!0){e.activeTexture(n.TEXTURE0+G);let gt=he.getPrimaries(he.workingColorSpace),wt=E.colorSpace===Ji?null:he.getPrimaries(E.colorSpace),oe=E.colorSpace===Ji||gt===wt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let lt=v(E.image,!1,s.maxTextureSize);lt=Wt(E,lt);let Rt=r.convert(E.format,E.colorSpace),Xt=r.convert(E.type),Yt=_(E.internalFormat,Rt,Xt,E.colorSpace,E.isVideoTexture);ut(J,E);let Ct,ce=E.mipmaps,ne=E.isVideoTexture!==!0,ye=Lt.__version===void 0||rt===!0,B=K.dataReady,xt=R(E,lt);if(E.isDepthTexture)Yt=y(E.format===xr,E.type),ye&&(ne?e.texStorage2D(n.TEXTURE_2D,1,Yt,lt.width,lt.height):e.texImage2D(n.TEXTURE_2D,0,Yt,lt.width,lt.height,0,Rt,Xt,null));else if(E.isDataTexture)if(ce.length>0){ne&&ye&&e.texStorage2D(n.TEXTURE_2D,xt,Yt,ce[0].width,ce[0].height);for(let $=0,it=ce.length;$<it;$++)Ct=ce[$],ne?B&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,Ct.width,Ct.height,Rt,Xt,Ct.data):e.texImage2D(n.TEXTURE_2D,$,Yt,Ct.width,Ct.height,0,Rt,Xt,Ct.data);E.generateMipmaps=!1}else ne?(ye&&e.texStorage2D(n.TEXTURE_2D,xt,Yt,lt.width,lt.height),B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,lt.width,lt.height,Rt,Xt,lt.data)):e.texImage2D(n.TEXTURE_2D,0,Yt,lt.width,lt.height,0,Rt,Xt,lt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ne&&ye&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,Yt,ce[0].width,ce[0].height,lt.depth);for(let $=0,it=ce.length;$<it;$++)if(Ct=ce[$],E.format!==vn)if(Rt!==null)if(ne){if(B)if(E.layerUpdates.size>0){let St=Md(Ct.width,Ct.height,E.format,E.type);for(let Mt of E.layerUpdates){let jt=Ct.data.subarray(Mt*St/Ct.data.BYTES_PER_ELEMENT,(Mt+1)*St/Ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,Mt,Ct.width,Ct.height,1,Rt,jt)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,Ct.width,Ct.height,lt.depth,Rt,Ct.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,Yt,Ct.width,Ct.height,lt.depth,0,Ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ne?B&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,Ct.width,Ct.height,lt.depth,Rt,Xt,Ct.data):e.texImage3D(n.TEXTURE_2D_ARRAY,$,Yt,Ct.width,Ct.height,lt.depth,0,Rt,Xt,Ct.data)}else{ne&&ye&&e.texStorage2D(n.TEXTURE_2D,xt,Yt,ce[0].width,ce[0].height);for(let $=0,it=ce.length;$<it;$++)Ct=ce[$],E.format!==vn?Rt!==null?ne?B&&e.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,Ct.width,Ct.height,Rt,Ct.data):e.compressedTexImage2D(n.TEXTURE_2D,$,Yt,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?B&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,Ct.width,Ct.height,Rt,Xt,Ct.data):e.texImage2D(n.TEXTURE_2D,$,Yt,Ct.width,Ct.height,0,Rt,Xt,Ct.data)}else if(E.isDataArrayTexture)if(ne){if(ye&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,Yt,lt.width,lt.height,lt.depth),B)if(E.layerUpdates.size>0){let $=Md(lt.width,lt.height,E.format,E.type);for(let it of E.layerUpdates){let St=lt.data.subarray(it*$/lt.data.BYTES_PER_ELEMENT,(it+1)*$/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,it,lt.width,lt.height,1,Rt,Xt,St)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,Rt,Xt,lt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Yt,lt.width,lt.height,lt.depth,0,Rt,Xt,lt.data);else if(E.isData3DTexture)ne?(ye&&e.texStorage3D(n.TEXTURE_3D,xt,Yt,lt.width,lt.height,lt.depth),B&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,Rt,Xt,lt.data)):e.texImage3D(n.TEXTURE_3D,0,Yt,lt.width,lt.height,lt.depth,0,Rt,Xt,lt.data);else if(E.isFramebufferTexture){if(ye)if(ne)e.texStorage2D(n.TEXTURE_2D,xt,Yt,lt.width,lt.height);else{let $=lt.width,it=lt.height;for(let St=0;St<xt;St++)e.texImage2D(n.TEXTURE_2D,St,Yt,$,it,0,Rt,Xt,null),$>>=1,it>>=1}}else if(ce.length>0){if(ne&&ye){let $=Tt(ce[0]);e.texStorage2D(n.TEXTURE_2D,xt,Yt,$.width,$.height)}for(let $=0,it=ce.length;$<it;$++)Ct=ce[$],ne?B&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,Rt,Xt,Ct):e.texImage2D(n.TEXTURE_2D,$,Yt,Rt,Xt,Ct);E.generateMipmaps=!1}else if(ne){if(ye){let $=Tt(lt);e.texStorage2D(n.TEXTURE_2D,xt,Yt,$.width,$.height)}B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Rt,Xt,lt)}else e.texImage2D(n.TEXTURE_2D,0,Yt,Rt,Xt,lt);m(E)&&g(J),Lt.__version=K.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function F(C,E,G){if(E.image.length!==6)return;let J=Et(C,E),rt=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+G);let K=i.get(rt);if(rt.version!==K.__version||J===!0){e.activeTexture(n.TEXTURE0+G);let Lt=he.getPrimaries(he.workingColorSpace),gt=E.colorSpace===Ji?null:he.getPrimaries(E.colorSpace),wt=E.colorSpace===Ji||Lt===gt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);let oe=E.isCompressedTexture||E.image[0].isCompressedTexture,lt=E.image[0]&&E.image[0].isDataTexture,Rt=[];for(let it=0;it<6;it++)!oe&&!lt?Rt[it]=v(E.image[it],!0,s.maxCubemapSize):Rt[it]=lt?E.image[it].image:E.image[it],Rt[it]=Wt(E,Rt[it]);let Xt=Rt[0],Yt=r.convert(E.format,E.colorSpace),Ct=r.convert(E.type),ce=_(E.internalFormat,Yt,Ct,E.colorSpace),ne=E.isVideoTexture!==!0,ye=K.__version===void 0||J===!0,B=rt.dataReady,xt=R(E,Xt);ut(n.TEXTURE_CUBE_MAP,E);let $;if(oe){ne&&ye&&e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,ce,Xt.width,Xt.height);for(let it=0;it<6;it++){$=Rt[it].mipmaps;for(let St=0;St<$.length;St++){let Mt=$[St];E.format!==vn?Yt!==null?ne?B&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,St,0,0,Mt.width,Mt.height,Yt,Mt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,St,ce,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ne?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,St,0,0,Mt.width,Mt.height,Yt,Ct,Mt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,St,ce,Mt.width,Mt.height,0,Yt,Ct,Mt.data)}}}else{if($=E.mipmaps,ne&&ye){$.length>0&&xt++;let it=Tt(Rt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,ce,it.width,it.height)}for(let it=0;it<6;it++)if(lt){ne?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Rt[it].width,Rt[it].height,Yt,Ct,Rt[it].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,ce,Rt[it].width,Rt[it].height,0,Yt,Ct,Rt[it].data);for(let St=0;St<$.length;St++){let jt=$[St].image[it].image;ne?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,St+1,0,0,jt.width,jt.height,Yt,Ct,jt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,St+1,ce,jt.width,jt.height,0,Yt,Ct,jt.data)}}else{ne?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Yt,Ct,Rt[it]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,ce,Yt,Ct,Rt[it]);for(let St=0;St<$.length;St++){let Mt=$[St];ne?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,St+1,0,0,Yt,Ct,Mt.image[it]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,St+1,ce,Yt,Ct,Mt.image[it])}}}m(E)&&g(n.TEXTURE_CUBE_MAP),K.__version=rt.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function st(C,E,G,J,rt,K){let Lt=r.convert(G.format,G.colorSpace),gt=r.convert(G.type),wt=_(G.internalFormat,Lt,gt,G.colorSpace),oe=i.get(E),lt=i.get(G);if(lt.__renderTarget=E,!oe.__hasExternalTextures){let Rt=Math.max(1,E.width>>K),Xt=Math.max(1,E.height>>K);rt===n.TEXTURE_3D||rt===n.TEXTURE_2D_ARRAY?e.texImage3D(rt,K,wt,Rt,Xt,E.depth,0,Lt,gt,null):e.texImage2D(rt,K,wt,Rt,Xt,0,Lt,gt,null)}e.bindFramebuffer(n.FRAMEBUFFER,C),yt(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,rt,lt.__webglTexture,0,ot(E)):(rt===n.TEXTURE_2D||rt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,rt,lt.__webglTexture,K),e.bindFramebuffer(n.FRAMEBUFFER,null)}function nt(C,E,G){if(n.bindRenderbuffer(n.RENDERBUFFER,C),E.depthBuffer){let J=E.depthTexture,rt=J&&J.isDepthTexture?J.type:null,K=y(E.stencilBuffer,rt),Lt=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=ot(E);yt(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt,K,E.width,E.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt,K,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,K,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Lt,n.RENDERBUFFER,C)}else{let J=E.textures;for(let rt=0;rt<J.length;rt++){let K=J[rt],Lt=r.convert(K.format,K.colorSpace),gt=r.convert(K.type),wt=_(K.internalFormat,Lt,gt,K.colorSpace),oe=ot(E);G&&yt(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,wt,E.width,E.height):yt(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,wt,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,wt,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function vt(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let J=i.get(E.depthTexture);J.__renderTarget=E,(!J.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),W(E.depthTexture,0);let rt=J.__webglTexture,K=ot(E);if(E.depthTexture.format===lr)yt(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0);else if(E.depthTexture.format===xr)yt(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function At(C){let E=i.get(C),G=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){let J=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),J){let rt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,J.removeEventListener("dispose",rt)};J.addEventListener("dispose",rt),E.__depthDisposeCallback=rt}E.__boundDepthTexture=J}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");vt(E.__webglFramebuffer,C)}else if(G){E.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[J]),E.__webglDepthbuffer[J]===void 0)E.__webglDepthbuffer[J]=n.createRenderbuffer(),nt(E.__webglDepthbuffer[J],C,!1);else{let rt=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,K)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),nt(E.__webglDepthbuffer,C,!1);else{let J=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,rt),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,rt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function _t(C,E,G){let J=i.get(C);E!==void 0&&st(J.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&At(C)}function Gt(C){let E=C.texture,G=i.get(C),J=i.get(E);C.addEventListener("dispose",A);let rt=C.textures,K=C.isWebGLCubeRenderTarget===!0,Lt=rt.length>1;if(Lt||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=E.version,o.memory.textures++),K){G.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer[gt]=[];for(let wt=0;wt<E.mipmaps.length;wt++)G.__webglFramebuffer[gt][wt]=n.createFramebuffer()}else G.__webglFramebuffer[gt]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer=[];for(let gt=0;gt<E.mipmaps.length;gt++)G.__webglFramebuffer[gt]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(Lt)for(let gt=0,wt=rt.length;gt<wt;gt++){let oe=i.get(rt[gt]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&yt(C)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let gt=0;gt<rt.length;gt++){let wt=rt[gt];G.__webglColorRenderbuffer[gt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[gt]);let oe=r.convert(wt.format,wt.colorSpace),lt=r.convert(wt.type),Rt=_(wt.internalFormat,oe,lt,wt.colorSpace,C.isXRRenderTarget===!0),Xt=ot(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt,Rt,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,G.__webglColorRenderbuffer[gt])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),nt(G.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),ut(n.TEXTURE_CUBE_MAP,E);for(let gt=0;gt<6;gt++)if(E.mipmaps&&E.mipmaps.length>0)for(let wt=0;wt<E.mipmaps.length;wt++)st(G.__webglFramebuffer[gt][wt],C,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,wt);else st(G.__webglFramebuffer[gt],C,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);m(E)&&g(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let gt=0,wt=rt.length;gt<wt;gt++){let oe=rt[gt],lt=i.get(oe);e.bindTexture(n.TEXTURE_2D,lt.__webglTexture),ut(n.TEXTURE_2D,oe),st(G.__webglFramebuffer,C,oe,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,0),m(oe)&&g(n.TEXTURE_2D)}e.unbindTexture()}else{let gt=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(gt=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(gt,J.__webglTexture),ut(gt,E),E.mipmaps&&E.mipmaps.length>0)for(let wt=0;wt<E.mipmaps.length;wt++)st(G.__webglFramebuffer[wt],C,E,n.COLOR_ATTACHMENT0,gt,wt);else st(G.__webglFramebuffer,C,E,n.COLOR_ATTACHMENT0,gt,0);m(E)&&g(gt),e.unbindTexture()}C.depthBuffer&&At(C)}function et(C){let E=C.textures;for(let G=0,J=E.length;G<J;G++){let rt=E[G];if(m(rt)){let K=M(C),Lt=i.get(rt).__webglTexture;e.bindTexture(K,Lt),g(K),e.unbindTexture()}}}let ct=[],z=[];function It(C){if(C.samples>0){if(yt(C)===!1){let E=C.textures,G=C.width,J=C.height,rt=n.COLOR_BUFFER_BIT,K=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Lt=i.get(C),gt=E.length>1;if(gt)for(let wt=0;wt<E.length;wt++)e.bindFramebuffer(n.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+wt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Lt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+wt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let wt=0;wt<E.length;wt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(rt|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(rt|=n.STENCIL_BUFFER_BIT)),gt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Lt.__webglColorRenderbuffer[wt]);let oe=i.get(E[wt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,oe,0)}n.blitFramebuffer(0,0,G,J,0,0,G,J,rt,n.NEAREST),c===!0&&(ct.length=0,z.length=0,ct.push(n.COLOR_ATTACHMENT0+wt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ct.push(K),z.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,z)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ct))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),gt)for(let wt=0;wt<E.length;wt++){e.bindFramebuffer(n.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+wt,n.RENDERBUFFER,Lt.__webglColorRenderbuffer[wt]);let oe=i.get(E[wt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Lt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+wt,n.TEXTURE_2D,oe,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let E=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function ot(C){return Math.min(s.maxSamples,C.samples)}function yt(C){let E=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function dt(C){let E=o.render.frame;l.get(C)!==E&&(l.set(C,E),C.update())}function Wt(C,E){let G=C.colorSpace,J=C.format,rt=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||G!==wr&&G!==Ji&&(he.getTransfer(G)===ve?(J!==vn||rt!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),E}function Tt(C){return typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement?(h.width=C.naturalWidth||C.width,h.height=C.naturalHeight||C.height):typeof VideoFrame!="undefined"&&C instanceof VideoFrame?(h.width=C.displayWidth,h.height=C.displayHeight):(h.width=C.width,h.height=C.height),h}this.allocateTextureUnit=U,this.resetTextureUnits=L,this.setTexture2D=W,this.setTexture2DArray=H,this.setTexture3D=Q,this.setTextureCube=V,this.rebindTextures=_t,this.setupRenderTarget=Gt,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=At,this.setupFrameBufferTexture=st,this.useMultisampledRTT=yt}function e_(n,t){function e(i,s=Ji){let r,o=he.getTransfer(s);if(i===Un)return n.UNSIGNED_BYTE;if(i===iu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===su)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Vd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===kd)return n.BYTE;if(i===Hd)return n.SHORT;if(i===ao)return n.UNSIGNED_SHORT;if(i===nu)return n.INT;if(i===Ts)return n.UNSIGNED_INT;if(i===ui)return n.FLOAT;if(i===vo)return n.HALF_FLOAT;if(i===Gd)return n.ALPHA;if(i===Wd)return n.RGB;if(i===vn)return n.RGBA;if(i===Xd)return n.LUMINANCE;if(i===qd)return n.LUMINANCE_ALPHA;if(i===lr)return n.DEPTH_COMPONENT;if(i===xr)return n.DEPTH_STENCIL;if(i===_o)return n.RED;if(i===ru)return n.RED_INTEGER;if(i===Yd)return n.RG;if(i===ou)return n.RG_INTEGER;if(i===au)return n.RGBA_INTEGER;if(i===ya||i===Ma||i===ba||i===Sa)if(o===ve)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ya)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ya)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ma)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ba)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Sa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Bl||i===Fl||i===Ol||i===kl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Bl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Fl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ol)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===kl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Hl||i===Vl||i===Gl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Hl||i===Vl)return o===ve?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Gl)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Wl||i===Xl||i===ql||i===Yl||i===$l||i===Zl||i===Jl||i===jl||i===Kl||i===Ql||i===th||i===eh||i===nh||i===ih)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Wl)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xl)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ql)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Yl)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===$l)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Zl)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Jl)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===jl)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Kl)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ql)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===th)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===eh)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===nh)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ih)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ea||i===sh||i===rh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ea)return o===ve?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===sh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===rh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===$d||i===oh||i===ah||i===ch)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ea)return r.COMPRESSED_RED_RGTC1_EXT;if(i===oh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ah)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ch)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===gr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var Eh=class extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Pi=class extends Qe{constructor(){super(),this.isGroup=!0,this.type="Group"}},n_={type:"move"},so=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){o=!0;for(let v of t.hand.values()){let m=e.getJointPose(v,i),g=this._getHandJoint(h,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let l=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],f=l.position.distanceTo(u.position),d=.02,p=.005;h.inputState.pinching&&f>d+p?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&f<=d-p&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(n_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Pi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},i_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,s_=`
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

}`,Th=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new _n,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Mn({vertexShader:i_,fragmentShader:s_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ae(new es(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wh=class extends ts{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",c=1,h=null,l=null,u=null,f=null,d=null,p=null,v=new Th,m=e.getContextAttributes(),g=null,M=null,_=[],y=[],R=new at,w=null,A=new pn;A.viewport=new Ne;let I=new pn;I.viewport=new Ne;let S=[A,I],b=new Eh,P=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let F=_[Y];return F===void 0&&(F=new so,_[Y]=F),F.getTargetRaySpace()},this.getControllerGrip=function(Y){let F=_[Y];return F===void 0&&(F=new so,_[Y]=F),F.getGripSpace()},this.getHand=function(Y){let F=_[Y];return F===void 0&&(F=new so,_[Y]=F),F.getHandSpace()};function U(Y){let F=y.indexOf(Y.inputSource);if(F===-1)return;let st=_[F];st!==void 0&&(st.update(Y.inputSource,Y.frame,h||o),st.dispatchEvent({type:Y.type,data:Y.inputSource}))}function D(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",W);for(let Y=0;Y<_.length;Y++){let F=y[Y];F!==null&&(y[Y]=null,_[Y].disconnect(F))}P=null,L=null,v.reset(),t.setRenderTarget(g),d=null,f=null,u=null,s=null,M=null,Et.stop(),i.isPresenting=!1,t.setPixelRatio(w),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(Y){h=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(g=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",D),s.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){let F={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,F),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new zi(d.framebufferWidth,d.framebufferHeight,{format:vn,type:Un,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let F=null,st=null,nt=null;m.depth&&(nt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,F=m.stencil?xr:lr,st=m.stencil?gr:Ts);let vt={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(vt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new zi(f.textureWidth,f.textureHeight,{format:vn,type:Un,depthTexture:new Da(f.textureWidth,f.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,F),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),h=null,o=await s.requestReferenceSpace(a),Et.setContext(s),Et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function W(Y){for(let F=0;F<Y.removed.length;F++){let st=Y.removed[F],nt=y.indexOf(st);nt>=0&&(y[nt]=null,_[nt].disconnect(st))}for(let F=0;F<Y.added.length;F++){let st=Y.added[F],nt=y.indexOf(st);if(nt===-1){for(let At=0;At<_.length;At++)if(At>=y.length){y.push(st),nt=At;break}else if(y[At]===null){y[At]=st,nt=At;break}if(nt===-1)break}let vt=_[nt];vt&&vt.connect(st)}}let H=new N,Q=new N;function V(Y,F,st){H.setFromMatrixPosition(F.matrixWorld),Q.setFromMatrixPosition(st.matrixWorld);let nt=H.distanceTo(Q),vt=F.projectionMatrix.elements,At=st.projectionMatrix.elements,_t=vt[14]/(vt[10]-1),Gt=vt[14]/(vt[10]+1),et=(vt[9]+1)/vt[5],ct=(vt[9]-1)/vt[5],z=(vt[8]-1)/vt[0],It=(At[8]+1)/At[0],ot=_t*z,yt=_t*It,dt=nt/(-z+It),Wt=dt*-z;if(F.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Wt),Y.translateZ(dt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),vt[10]===-1)Y.projectionMatrix.copy(F.projectionMatrix),Y.projectionMatrixInverse.copy(F.projectionMatrixInverse);else{let Tt=_t+dt,C=Gt+dt,E=ot-Wt,G=yt+(nt-Wt),J=et*Gt/C*Tt,rt=ct*Gt/C*Tt;Y.projectionMatrix.makePerspective(E,G,J,rt,Tt,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Z(Y,F){F===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(F.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let F=Y.near,st=Y.far;v.texture!==null&&(v.depthNear>0&&(F=v.depthNear),v.depthFar>0&&(st=v.depthFar)),b.near=I.near=A.near=F,b.far=I.far=A.far=st,(P!==b.near||L!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),P=b.near,L=b.far),A.layers.mask=Y.layers.mask|2,I.layers.mask=Y.layers.mask|4,b.layers.mask=A.layers.mask|I.layers.mask;let nt=Y.parent,vt=b.cameras;Z(b,nt);for(let At=0;At<vt.length;At++)Z(vt[At],nt);vt.length===2?V(b,A,I):b.projectionMatrix.copy(A.projectionMatrix),j(Y,b,nt)};function j(Y,F,st){st===null?Y.matrix.copy(F.matrixWorld):(Y.matrix.copy(st.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(F.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(F.projectionMatrix),Y.projectionMatrixInverse.copy(F.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=hh*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(b)};let tt=null;function ut(Y,F){if(l=F.getViewerPose(h||o),p=F,l!==null){let st=l.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let nt=!1;st.length!==b.cameras.length&&(b.cameras.length=0,nt=!0);for(let At=0;At<st.length;At++){let _t=st[At],Gt=null;if(d!==null)Gt=d.getViewport(_t);else{let ct=u.getViewSubImage(f,_t);Gt=ct.viewport,At===0&&(t.setRenderTargetTextures(M,ct.colorTexture,f.ignoreDepthValues?void 0:ct.depthStencilTexture),t.setRenderTarget(M))}let et=S[At];et===void 0&&(et=new pn,et.layers.enable(At),et.viewport=new Ne,S[At]=et),et.matrix.fromArray(_t.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(_t.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(Gt.x,Gt.y,Gt.width,Gt.height),At===0&&(b.matrix.copy(et.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),nt===!0&&b.cameras.push(et)}let vt=s.enabledFeatures;if(vt&&vt.includes("depth-sensing")){let At=u.getDepthInformation(st[0]);At&&At.isValid&&At.texture&&v.init(t,At,s.renderState)}}for(let st=0;st<_.length;st++){let nt=y[st],vt=_[st];nt!==null&&vt!==void 0&&vt.update(nt,F,h||o)}tt&&tt(Y,F),F.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:F}),p=null}let Et=new Qd;Et.setAnimationLoop(ut),this.setAnimationLoop=function(Y){tt=Y},this.dispose=function(){}}},vs=new Be,r_=new se;function o_(n,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,Kd(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,M,_,y){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(m,g):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),l(m,g)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,y)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),v(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?c(m,g,M,_):g.isSpriteMaterial?h(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===cn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===cn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let M=t.get(g),_=M.envMap,y=M.envMapRotation;_&&(m.envMap.value=_,vs.copy(y),vs.x*=-1,vs.y*=-1,vs.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(vs.y*=-1,vs.z*=-1),m.envMapRotation.value.setFromMatrix4(r_.makeRotationFromEuler(vs)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,M,_){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*M,m.scale.value=_*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,M){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===cn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){let M=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function a_(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,_){let y=_.program;i.uniformBlockBinding(M,y)}function h(M,_){let y=s[M.id];y===void 0&&(p(M),y=l(M),s[M.id]=y,M.addEventListener("dispose",m));let R=_.program;i.updateUBOMapping(M,R);let w=t.render.frame;r[M.id]!==w&&(f(M),r[M.id]=w)}function l(M){let _=u();M.__bindingPointIndex=_;let y=n.createBuffer(),R=M.__size,w=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,R,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,y),y}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){let _=s[M.id],y=M.uniforms,R=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let w=0,A=y.length;w<A;w++){let I=Array.isArray(y[w])?y[w]:[y[w]];for(let S=0,b=I.length;S<b;S++){let P=I[S];if(d(P,w,S,R)===!0){let L=P.__offset,U=Array.isArray(P.value)?P.value:[P.value],D=0;for(let W=0;W<U.length;W++){let H=U[W],Q=v(H);typeof H=="number"||typeof H=="boolean"?(P.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,L+D,P.__data)):H.isMatrix3?(P.__data[0]=H.elements[0],P.__data[1]=H.elements[1],P.__data[2]=H.elements[2],P.__data[3]=0,P.__data[4]=H.elements[3],P.__data[5]=H.elements[4],P.__data[6]=H.elements[5],P.__data[7]=0,P.__data[8]=H.elements[6],P.__data[9]=H.elements[7],P.__data[10]=H.elements[8],P.__data[11]=0):(H.toArray(P.__data,D),D+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,L,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,_,y,R){let w=M.value,A=_+"_"+y;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{let I=R[A];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return R[A]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function p(M){let _=M.uniforms,y=0,R=16;for(let A=0,I=_.length;A<I;A++){let S=Array.isArray(_[A])?_[A]:[_[A]];for(let b=0,P=S.length;b<P;b++){let L=S[b],U=Array.isArray(L.value)?L.value:[L.value];for(let D=0,W=U.length;D<W;D++){let H=U[D],Q=v(H),V=y%R,Z=V%Q.boundary,j=V+Z;y+=Z,j!==0&&R-j<Q.storage&&(y+=R-j),L.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=y,y+=Q.storage}}}let w=y%R;return w>0&&(y+=R-w),M.__size=y,M.__cache={},this}function v(M){let _={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(_.boundary=4,_.storage=4):M.isVector2?(_.boundary=8,_.storage=8):M.isVector3||M.isColor?(_.boundary=16,_.storage=12):M.isVector4?(_.boundary=16,_.storage=16):M.isMatrix3?(_.boundary=48,_.storage=48):M.isMatrix4?(_.boundary=64,_.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),_}function m(M){let _=M.target;_.removeEventListener("dispose",m);let y=o.indexOf(_.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function g(){for(let M in s)n.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:h,dispose:g}}var Na=class{constructor(t={}){let{canvas:e=um(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext!="undefined"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;let p=new Uint32Array(4),v=new Int32Array(4),m=null,g=null,M=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ie,this.toneMapping=Ki,this.toneMappingExposure=1;let y=this,R=!1,w=0,A=0,I=null,S=-1,b=null,P=new Ne,L=new Ne,U=null,D=new Ht(0),W=0,H=e.width,Q=e.height,V=1,Z=null,j=null,tt=new Ne(0,0,H,Q),ut=new Ne(0,0,H,Q),Et=!1,Y=new ws,F=!1,st=!1,nt=new se,vt=new se,At=new N,_t=new Ne,Gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},et=!1;function ct(){return I===null?V:1}let z=i;function It(T,O){return e.getContext(T,O)}try{let T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:l,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Qh}`),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",Mt,!1),z===null){let O="webgl2";if(z=It(O,T),z===null)throw It(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ot,yt,dt,Wt,Tt,C,E,G,J,rt,K,Lt,gt,wt,oe,lt,Rt,Xt,Yt,Ct,ce,ne,ye,B;function xt(){ot=new S1(z),ot.init(),ne=new e_(z,ot),yt=new x1(z,ot,t,ne),dt=new Kv(z,ot),yt.reverseDepthBuffer&&f&&dt.buffers.depth.setReversed(!0),Wt=new w1(z),Tt=new Ov,C=new t_(z,ot,dt,Tt,yt,ne,Wt),E=new _1(y),G=new b1(y),J=new Lm(z),ye=new m1(z,J),rt=new E1(z,J,Wt,ye),K=new R1(z,rt,J,Wt),Yt=new A1(z,yt,C),lt=new v1(Tt),Lt=new Fv(y,E,G,ot,yt,ye,lt),gt=new o_(y,Tt),wt=new Hv,oe=new Yv(ot),Xt=new p1(y,E,G,dt,K,d,c),Rt=new Jv(y,K,yt),B=new a_(z,Wt,yt,dt),Ct=new g1(z,ot,Wt),ce=new T1(z,ot,Wt),Wt.programs=Lt.programs,y.capabilities=yt,y.extensions=ot,y.properties=Tt,y.renderLists=wt,y.shadowMap=Rt,y.state=dt,y.info=Wt}xt();let $=new wh(y,z);this.xr=$,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let T=ot.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=ot.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(T){T!==void 0&&(V=T,this.setSize(H,Q,!1))},this.getSize=function(T){return T.set(H,Q)},this.setSize=function(T,O,X=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=T,Q=O,e.width=Math.floor(T*V),e.height=Math.floor(O*V),X===!0&&(e.style.width=T+"px",e.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(H*V,Q*V).floor()},this.setDrawingBufferSize=function(T,O,X){H=T,Q=O,V=X,e.width=Math.floor(T*X),e.height=Math.floor(O*X),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(tt)},this.setViewport=function(T,O,X,q){T.isVector4?tt.set(T.x,T.y,T.z,T.w):tt.set(T,O,X,q),dt.viewport(P.copy(tt).multiplyScalar(V).round())},this.getScissor=function(T){return T.copy(ut)},this.setScissor=function(T,O,X,q){T.isVector4?ut.set(T.x,T.y,T.z,T.w):ut.set(T,O,X,q),dt.scissor(L.copy(ut).multiplyScalar(V).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(T){dt.setScissorTest(Et=T)},this.setOpaqueSort=function(T){Z=T},this.setTransparentSort=function(T){j=T},this.getClearColor=function(T){return T.copy(Xt.getClearColor())},this.setClearColor=function(){Xt.setClearColor.apply(Xt,arguments)},this.getClearAlpha=function(){return Xt.getClearAlpha()},this.setClearAlpha=function(){Xt.setClearAlpha.apply(Xt,arguments)},this.clear=function(T=!0,O=!0,X=!0){let q=0;if(T){let k=!1;if(I!==null){let ft=I.texture.format;k=ft===au||ft===ou||ft===ru}if(k){let ft=I.texture.type,bt=ft===Un||ft===Ts||ft===ao||ft===gr||ft===iu||ft===su,Ut=Xt.getClearColor(),Dt=Xt.getClearAlpha(),Zt=Ut.r,Kt=Ut.g,Nt=Ut.b;bt?(p[0]=Zt,p[1]=Kt,p[2]=Nt,p[3]=Dt,z.clearBufferuiv(z.COLOR,0,p)):(v[0]=Zt,v[1]=Kt,v[2]=Nt,v[3]=Dt,z.clearBufferiv(z.COLOR,0,v))}else q|=z.COLOR_BUFFER_BIT}O&&(q|=z.DEPTH_BUFFER_BIT),X&&(q|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",Mt,!1),wt.dispose(),oe.dispose(),Tt.dispose(),E.dispose(),G.dispose(),K.dispose(),ye.dispose(),B.dispose(),Lt.dispose(),$.dispose(),$.removeEventListener("sessionstart",pf),$.removeEventListener("sessionend",mf),fs.stop()};function it(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let T=Wt.autoReset,O=Rt.enabled,X=Rt.autoUpdate,q=Rt.needsUpdate,k=Rt.type;xt(),Wt.autoReset=T,Rt.enabled=O,Rt.autoUpdate=X,Rt.needsUpdate=q,Rt.type=k}function Mt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function jt(T){let O=T.target;O.removeEventListener("dispose",jt),De(O)}function De(T){rn(T),Tt.remove(T)}function rn(T){let O=Tt.get(T).programs;O!==void 0&&(O.forEach(function(X){Lt.releaseProgram(X)}),T.isShaderMaterial&&Lt.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,X,q,k,ft){O===null&&(O=Gt);let bt=k.isMesh&&k.matrixWorld.determinant()<0,Ut=Mp(T,O,X,q,k);dt.setMaterial(q,bt);let Dt=X.index,Zt=1;if(q.wireframe===!0){if(Dt=rt.getWireframeAttribute(X),Dt===void 0)return;Zt=2}let Kt=X.drawRange,Nt=X.attributes.position,fe=Kt.start*Zt,Me=(Kt.start+Kt.count)*Zt;ft!==null&&(fe=Math.max(fe,ft.start*Zt),Me=Math.min(Me,(ft.start+ft.count)*Zt)),Dt!==null?(fe=Math.max(fe,0),Me=Math.min(Me,Dt.count)):Nt!=null&&(fe=Math.max(fe,0),Me=Math.min(Me,Nt.count));let Se=Me-fe;if(Se<0||Se===1/0)return;ye.setup(k,q,Ut,X,Dt);let gn,de=Ct;if(Dt!==null&&(gn=J.get(Dt),de=ce,de.setIndex(gn)),k.isMesh)q.wireframe===!0?(dt.setLineWidth(q.wireframeLinewidth*ct()),de.setMode(z.LINES)):de.setMode(z.TRIANGLES);else if(k.isLine){let Bt=q.linewidth;Bt===void 0&&(Bt=1),dt.setLineWidth(Bt*ct()),k.isLineSegments?de.setMode(z.LINES):k.isLineLoop?de.setMode(z.LINE_LOOP):de.setMode(z.LINE_STRIP)}else k.isPoints?de.setMode(z.POINTS):k.isSprite&&de.setMode(z.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)de.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(ot.get("WEBGL_multi_draw"))de.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Bt=k._multiDrawStarts,bi=k._multiDrawCounts,pe=k._multiDrawCount,Zn=Dt?J.get(Dt).bytesPerElement:1,Ws=Tt.get(q).currentProgram.getUniforms();for(let In=0;In<pe;In++)Ws.setValue(z,"_gl_DrawID",In),de.render(Bt[In]/Zn,bi[In])}else if(k.isInstancedMesh)de.renderInstances(fe,Se,k.count);else if(X.isInstancedBufferGeometry){let Bt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,bi=Math.min(X.instanceCount,Bt);de.renderInstances(fe,Se,bi)}else de.render(fe,Se)};function ge(T,O,X){T.transparent===!0&&T.side===ti&&T.forceSinglePass===!1?(T.side=cn,T.needsUpdate=!0,Go(T,O,X),T.side=Qi,T.needsUpdate=!0,Go(T,O,X),T.side=ti):Go(T,O,X)}this.compile=function(T,O,X=null){X===null&&(X=T),g=oe.get(X),g.init(O),_.push(g),X.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(g.pushLight(k),k.castShadow&&g.pushShadow(k))}),T!==X&&T.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(g.pushLight(k),k.castShadow&&g.pushShadow(k))}),g.setupLights();let q=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ft=k.material;if(ft)if(Array.isArray(ft))for(let bt=0;bt<ft.length;bt++){let Ut=ft[bt];ge(Ut,X,k),q.add(Ut)}else ge(ft,X,k),q.add(ft)}),_.pop(),g=null,q},this.compileAsync=function(T,O,X=null){let q=this.compile(T,O,X);return new Promise(k=>{function ft(){if(q.forEach(function(bt){Tt.get(bt).currentProgram.isReady()&&q.delete(bt)}),q.size===0){k(T);return}setTimeout(ft,10)}ot.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let $n=null;function Mi(T){$n&&$n(T)}function pf(){fs.stop()}function mf(){fs.start()}let fs=new Qd;fs.setAnimationLoop(Mi),typeof self!="undefined"&&fs.setContext(self),this.setAnimationLoop=function(T){$n=T,$.setAnimationLoop(T),T===null?fs.stop():fs.start()},$.addEventListener("sessionstart",pf),$.addEventListener("sessionend",mf),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(O),O=$.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,O,I),g=oe.get(T,_.length),g.init(O),_.push(g),vt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Y.setFromProjectionMatrix(vt),st=this.localClippingEnabled,F=lt.init(this.clippingPlanes,st),m=wt.get(T,M.length),m.init(),M.push(m),$.enabled===!0&&$.isPresenting===!0){let ft=y.xr.getDepthSensingMesh();ft!==null&&Gc(ft,O,-1/0,y.sortObjects)}Gc(T,O,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(Z,j),et=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,et&&Xt.addToRenderList(m,T),this.info.render.frame++,F===!0&&lt.beginShadows();let X=g.state.shadowsArray;Rt.render(X,T,O),F===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();let q=m.opaque,k=m.transmissive;if(g.setupLights(),O.isArrayCamera){let ft=O.cameras;if(k.length>0)for(let bt=0,Ut=ft.length;bt<Ut;bt++){let Dt=ft[bt];xf(q,k,T,Dt)}et&&Xt.render(T);for(let bt=0,Ut=ft.length;bt<Ut;bt++){let Dt=ft[bt];gf(m,T,Dt,Dt.viewport)}}else k.length>0&&xf(q,k,T,O),et&&Xt.render(T),gf(m,T,O);I!==null&&(C.updateMultisampleRenderTarget(I),C.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(y,T,O),ye.resetDefaultState(),S=-1,b=null,_.pop(),_.length>0?(g=_[_.length-1],F===!0&&lt.setGlobalState(y.clippingPlanes,g.state.camera)):g=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Gc(T,O,X,q){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Y.intersectsSprite(T)){q&&_t.setFromMatrixPosition(T.matrixWorld).applyMatrix4(vt);let bt=K.update(T),Ut=T.material;Ut.visible&&m.push(T,bt,Ut,X,_t.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Y.intersectsObject(T))){let bt=K.update(T),Ut=T.material;if(q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),_t.copy(T.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),_t.copy(bt.boundingSphere.center)),_t.applyMatrix4(T.matrixWorld).applyMatrix4(vt)),Array.isArray(Ut)){let Dt=bt.groups;for(let Zt=0,Kt=Dt.length;Zt<Kt;Zt++){let Nt=Dt[Zt],fe=Ut[Nt.materialIndex];fe&&fe.visible&&m.push(T,bt,fe,X,_t.z,Nt)}}else Ut.visible&&m.push(T,bt,Ut,X,_t.z,null)}}let ft=T.children;for(let bt=0,Ut=ft.length;bt<Ut;bt++)Gc(ft[bt],O,X,q)}function gf(T,O,X,q){let k=T.opaque,ft=T.transmissive,bt=T.transparent;g.setupLightsView(X),F===!0&&lt.setGlobalState(y.clippingPlanes,X),q&&dt.viewport(P.copy(q)),k.length>0&&Vo(k,O,X),ft.length>0&&Vo(ft,O,X),bt.length>0&&Vo(bt,O,X),dt.buffers.depth.setTest(!0),dt.buffers.depth.setMask(!0),dt.buffers.color.setMask(!0),dt.setPolygonOffset(!1)}function xf(T,O,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[q.id]===void 0&&(g.state.transmissionRenderTarget[q.id]=new zi(1,1,{generateMipmaps:!0,type:ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float")?vo:Un,minFilter:Es,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));let ft=g.state.transmissionRenderTarget[q.id],bt=q.viewport||P;ft.setSize(bt.z,bt.w);let Ut=y.getRenderTarget();y.setRenderTarget(ft),y.getClearColor(D),W=y.getClearAlpha(),W<1&&y.setClearColor(16777215,.5),y.clear(),et&&Xt.render(X);let Dt=y.toneMapping;y.toneMapping=Ki;let Zt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),g.setupLightsView(q),F===!0&&lt.setGlobalState(y.clippingPlanes,q),Vo(T,X,q),C.updateMultisampleRenderTarget(ft),C.updateRenderTargetMipmap(ft),ot.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let Nt=0,fe=O.length;Nt<fe;Nt++){let Me=O[Nt],Se=Me.object,gn=Me.geometry,de=Me.material,Bt=Me.group;if(de.side===ti&&Se.layers.test(q.layers)){let bi=de.side;de.side=cn,de.needsUpdate=!0,vf(Se,X,q,gn,de,Bt),de.side=bi,de.needsUpdate=!0,Kt=!0}}Kt===!0&&(C.updateMultisampleRenderTarget(ft),C.updateRenderTargetMipmap(ft))}y.setRenderTarget(Ut),y.setClearColor(D,W),Zt!==void 0&&(q.viewport=Zt),y.toneMapping=Dt}function Vo(T,O,X){let q=O.isScene===!0?O.overrideMaterial:null;for(let k=0,ft=T.length;k<ft;k++){let bt=T[k],Ut=bt.object,Dt=bt.geometry,Zt=q===null?bt.material:q,Kt=bt.group;Ut.layers.test(X.layers)&&vf(Ut,O,X,Dt,Zt,Kt)}}function vf(T,O,X,q,k,ft){T.onBeforeRender(y,O,X,q,k,ft),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(y,O,X,q,T,ft),k.transparent===!0&&k.side===ti&&k.forceSinglePass===!1?(k.side=cn,k.needsUpdate=!0,y.renderBufferDirect(X,O,q,k,T,ft),k.side=Qi,k.needsUpdate=!0,y.renderBufferDirect(X,O,q,k,T,ft),k.side=ti):y.renderBufferDirect(X,O,q,k,T,ft),T.onAfterRender(y,O,X,q,k,ft)}function Go(T,O,X){O.isScene!==!0&&(O=Gt);let q=Tt.get(T),k=g.state.lights,ft=g.state.shadowsArray,bt=k.state.version,Ut=Lt.getParameters(T,k.state,ft,O,X),Dt=Lt.getProgramCacheKey(Ut),Zt=q.programs;q.environment=T.isMeshStandardMaterial?O.environment:null,q.fog=O.fog,q.envMap=(T.isMeshStandardMaterial?G:E).get(T.envMap||q.environment),q.envMapRotation=q.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,Zt===void 0&&(T.addEventListener("dispose",jt),Zt=new Map,q.programs=Zt);let Kt=Zt.get(Dt);if(Kt!==void 0){if(q.currentProgram===Kt&&q.lightsStateVersion===bt)return yf(T,Ut),Kt}else Ut.uniforms=Lt.getUniforms(T),T.onBeforeCompile(Ut,y),Kt=Lt.acquireProgram(Ut,Dt),Zt.set(Dt,Kt),q.uniforms=Ut.uniforms;let Nt=q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Nt.clippingPlanes=lt.uniform),yf(T,Ut),q.needsLights=Sp(T),q.lightsStateVersion=bt,q.needsLights&&(Nt.ambientLightColor.value=k.state.ambient,Nt.lightProbe.value=k.state.probe,Nt.directionalLights.value=k.state.directional,Nt.directionalLightShadows.value=k.state.directionalShadow,Nt.spotLights.value=k.state.spot,Nt.spotLightShadows.value=k.state.spotShadow,Nt.rectAreaLights.value=k.state.rectArea,Nt.ltc_1.value=k.state.rectAreaLTC1,Nt.ltc_2.value=k.state.rectAreaLTC2,Nt.pointLights.value=k.state.point,Nt.pointLightShadows.value=k.state.pointShadow,Nt.hemisphereLights.value=k.state.hemi,Nt.directionalShadowMap.value=k.state.directionalShadowMap,Nt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Nt.spotShadowMap.value=k.state.spotShadowMap,Nt.spotLightMatrix.value=k.state.spotLightMatrix,Nt.spotLightMap.value=k.state.spotLightMap,Nt.pointShadowMap.value=k.state.pointShadowMap,Nt.pointShadowMatrix.value=k.state.pointShadowMatrix),q.currentProgram=Kt,q.uniformsList=null,Kt}function _f(T){if(T.uniformsList===null){let O=T.currentProgram.getUniforms();T.uniformsList=ur.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function yf(T,O){let X=Tt.get(T);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function Mp(T,O,X,q,k){O.isScene!==!0&&(O=Gt),C.resetTextureUnits();let ft=O.fog,bt=q.isMeshStandardMaterial?O.environment:null,Ut=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:wr,Dt=(q.isMeshStandardMaterial?G:E).get(q.envMap||bt),Zt=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Kt=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Nt=!!X.morphAttributes.position,fe=!!X.morphAttributes.normal,Me=!!X.morphAttributes.color,Se=Ki;q.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Se=y.toneMapping);let gn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,de=gn!==void 0?gn.length:0,Bt=Tt.get(q),bi=g.state.lights;if(F===!0&&(st===!0||T!==b)){let Hn=T===b&&q.id===S;lt.setState(q,T,Hn)}let pe=!1;q.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==bi.state.version||Bt.outputColorSpace!==Ut||k.isBatchedMesh&&Bt.batching===!1||!k.isBatchedMesh&&Bt.batching===!0||k.isBatchedMesh&&Bt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Bt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Bt.instancing===!1||!k.isInstancedMesh&&Bt.instancing===!0||k.isSkinnedMesh&&Bt.skinning===!1||!k.isSkinnedMesh&&Bt.skinning===!0||k.isInstancedMesh&&Bt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Bt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Bt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Bt.instancingMorph===!1&&k.morphTexture!==null||Bt.envMap!==Dt||q.fog===!0&&Bt.fog!==ft||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==lt.numPlanes||Bt.numIntersection!==lt.numIntersection)||Bt.vertexAlphas!==Zt||Bt.vertexTangents!==Kt||Bt.morphTargets!==Nt||Bt.morphNormals!==fe||Bt.morphColors!==Me||Bt.toneMapping!==Se||Bt.morphTargetsCount!==de)&&(pe=!0):(pe=!0,Bt.__version=q.version);let Zn=Bt.currentProgram;pe===!0&&(Zn=Go(q,O,k));let Ws=!1,In=!1,qr=!1,Ee=Zn.getUniforms(),li=Bt.uniforms;if(dt.useProgram(Zn.program)&&(Ws=!0,In=!0,qr=!0),q.id!==S&&(S=q.id,In=!0),Ws||b!==T){dt.buffers.depth.getReversed()?(nt.copy(T.projectionMatrix),dm(nt),pm(nt),Ee.setValue(z,"projectionMatrix",nt)):Ee.setValue(z,"projectionMatrix",T.projectionMatrix),Ee.setValue(z,"viewMatrix",T.matrixWorldInverse);let Vi=Ee.map.cameraPosition;Vi!==void 0&&Vi.setValue(z,At.setFromMatrixPosition(T.matrixWorld)),yt.logarithmicDepthBuffer&&Ee.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Ee.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),b!==T&&(b=T,In=!0,qr=!0)}if(k.isSkinnedMesh){Ee.setOptional(z,k,"bindMatrix"),Ee.setOptional(z,k,"bindMatrixInverse");let Hn=k.skeleton;Hn&&(Hn.boneTexture===null&&Hn.computeBoneTexture(),Ee.setValue(z,"boneTexture",Hn.boneTexture,C))}k.isBatchedMesh&&(Ee.setOptional(z,k,"batchingTexture"),Ee.setValue(z,"batchingTexture",k._matricesTexture,C),Ee.setOptional(z,k,"batchingIdTexture"),Ee.setValue(z,"batchingIdTexture",k._indirectTexture,C),Ee.setOptional(z,k,"batchingColorTexture"),k._colorsTexture!==null&&Ee.setValue(z,"batchingColorTexture",k._colorsTexture,C));let Yr=X.morphAttributes;if((Yr.position!==void 0||Yr.normal!==void 0||Yr.color!==void 0)&&Yt.update(k,X,Zn),(In||Bt.receiveShadow!==k.receiveShadow)&&(Bt.receiveShadow=k.receiveShadow,Ee.setValue(z,"receiveShadow",k.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(li.envMap.value=Dt,li.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&O.environment!==null&&(li.envMapIntensity.value=O.environmentIntensity),In&&(Ee.setValue(z,"toneMappingExposure",y.toneMappingExposure),Bt.needsLights&&bp(li,qr),ft&&q.fog===!0&&gt.refreshFogUniforms(li,ft),gt.refreshMaterialUniforms(li,q,V,Q,g.state.transmissionRenderTarget[T.id]),ur.upload(z,_f(Bt),li,C)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(ur.upload(z,_f(Bt),li,C),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Ee.setValue(z,"center",k.center),Ee.setValue(z,"modelViewMatrix",k.modelViewMatrix),Ee.setValue(z,"normalMatrix",k.normalMatrix),Ee.setValue(z,"modelMatrix",k.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let Hn=q.uniformsGroups;for(let Vi=0,Gi=Hn.length;Vi<Gi;Vi++){let Mf=Hn[Vi];B.update(Mf,Zn),B.bind(Mf,Zn)}}return Zn}function bp(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function Sp(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,O,X){Tt.get(T.texture).__webglTexture=O,Tt.get(T.depthTexture).__webglTexture=X;let q=Tt.get(T);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,O){let X=Tt.get(T);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,X=0){I=T,w=O,A=X;let q=!0,k=null,ft=!1,bt=!1;if(T){let Dt=Tt.get(T);if(Dt.__useDefaultFramebuffer!==void 0)dt.bindFramebuffer(z.FRAMEBUFFER,null),q=!1;else if(Dt.__webglFramebuffer===void 0)C.setupRenderTarget(T);else if(Dt.__hasExternalTextures)C.rebindTextures(T,Tt.get(T.texture).__webglTexture,Tt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Nt=T.depthTexture;if(Dt.__boundDepthTexture!==Nt){if(Nt!==null&&Tt.has(Nt)&&(T.width!==Nt.image.width||T.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(T)}}let Zt=T.texture;(Zt.isData3DTexture||Zt.isDataArrayTexture||Zt.isCompressedArrayTexture)&&(bt=!0);let Kt=Tt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Kt[O])?k=Kt[O][X]:k=Kt[O],ft=!0):T.samples>0&&C.useMultisampledRTT(T)===!1?k=Tt.get(T).__webglMultisampledFramebuffer:Array.isArray(Kt)?k=Kt[X]:k=Kt,P.copy(T.viewport),L.copy(T.scissor),U=T.scissorTest}else P.copy(tt).multiplyScalar(V).floor(),L.copy(ut).multiplyScalar(V).floor(),U=Et;if(dt.bindFramebuffer(z.FRAMEBUFFER,k)&&q&&dt.drawBuffers(T,k),dt.viewport(P),dt.scissor(L),dt.setScissorTest(U),ft){let Dt=Tt.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+O,Dt.__webglTexture,X)}else if(bt){let Dt=Tt.get(T.texture),Zt=O||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Dt.__webglTexture,X||0,Zt)}S=-1},this.readRenderTargetPixels=function(T,O,X,q,k,ft,bt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=Tt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&bt!==void 0&&(Ut=Ut[bt]),Ut){dt.bindFramebuffer(z.FRAMEBUFFER,Ut);try{let Dt=T.texture,Zt=Dt.format,Kt=Dt.type;if(!yt.textureFormatReadable(Zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!yt.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-q&&X>=0&&X<=T.height-k&&z.readPixels(O,X,q,k,ne.convert(Zt),ne.convert(Kt),ft)}finally{let Dt=I!==null?Tt.get(I).__webglFramebuffer:null;dt.bindFramebuffer(z.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(T,O,X,q,k,ft,bt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=Tt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&bt!==void 0&&(Ut=Ut[bt]),Ut){let Dt=T.texture,Zt=Dt.format,Kt=Dt.type;if(!yt.textureFormatReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!yt.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=T.width-q&&X>=0&&X<=T.height-k){dt.bindFramebuffer(z.FRAMEBUFFER,Ut);let Nt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Nt),z.bufferData(z.PIXEL_PACK_BUFFER,ft.byteLength,z.STREAM_READ),z.readPixels(O,X,q,k,ne.convert(Zt),ne.convert(Kt),0);let fe=I!==null?Tt.get(I).__webglFramebuffer:null;dt.bindFramebuffer(z.FRAMEBUFFER,fe);let Me=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await fm(z,Me,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Nt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ft),z.deleteBuffer(Nt),z.deleteSync(Me),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,O=null,X=0){T.isTexture!==!0&&(no("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,T=arguments[1]);let q=Math.pow(2,-X),k=Math.floor(T.image.width*q),ft=Math.floor(T.image.height*q),bt=O!==null?O.x:0,Ut=O!==null?O.y:0;C.setTexture2D(T,0),z.copyTexSubImage2D(z.TEXTURE_2D,X,0,0,bt,Ut,k,ft),dt.unbindTexture()},this.copyTextureToTexture=function(T,O,X=null,q=null,k=0){T.isTexture!==!0&&(no("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,T=arguments[1],O=arguments[2],k=arguments[3]||0,X=null);let ft,bt,Ut,Dt,Zt,Kt,Nt,fe,Me,Se=T.isCompressedTexture?T.mipmaps[k]:T.image;X!==null?(ft=X.max.x-X.min.x,bt=X.max.y-X.min.y,Ut=X.isBox3?X.max.z-X.min.z:1,Dt=X.min.x,Zt=X.min.y,Kt=X.isBox3?X.min.z:0):(ft=Se.width,bt=Se.height,Ut=Se.depth||1,Dt=0,Zt=0,Kt=0),q!==null?(Nt=q.x,fe=q.y,Me=q.z):(Nt=0,fe=0,Me=0);let gn=ne.convert(O.format),de=ne.convert(O.type),Bt;O.isData3DTexture?(C.setTexture3D(O,0),Bt=z.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(C.setTexture2DArray(O,0),Bt=z.TEXTURE_2D_ARRAY):(C.setTexture2D(O,0),Bt=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,O.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,O.unpackAlignment);let bi=z.getParameter(z.UNPACK_ROW_LENGTH),pe=z.getParameter(z.UNPACK_IMAGE_HEIGHT),Zn=z.getParameter(z.UNPACK_SKIP_PIXELS),Ws=z.getParameter(z.UNPACK_SKIP_ROWS),In=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,Se.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Se.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Dt),z.pixelStorei(z.UNPACK_SKIP_ROWS,Zt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Kt);let qr=T.isDataArrayTexture||T.isData3DTexture,Ee=O.isDataArrayTexture||O.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){let li=Tt.get(T),Yr=Tt.get(O),Hn=Tt.get(li.__renderTarget),Vi=Tt.get(Yr.__renderTarget);dt.bindFramebuffer(z.READ_FRAMEBUFFER,Hn.__webglFramebuffer),dt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Vi.__webglFramebuffer);for(let Gi=0;Gi<Ut;Gi++)qr&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Tt.get(T).__webglTexture,k,Kt+Gi),T.isDepthTexture?(Ee&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Tt.get(O).__webglTexture,k,Me+Gi),z.blitFramebuffer(Dt,Zt,ft,bt,Nt,fe,ft,bt,z.DEPTH_BUFFER_BIT,z.NEAREST)):Ee?z.copyTexSubImage3D(Bt,k,Nt,fe,Me+Gi,Dt,Zt,ft,bt):z.copyTexSubImage2D(Bt,k,Nt,fe,Me+Gi,Dt,Zt,ft,bt);dt.bindFramebuffer(z.READ_FRAMEBUFFER,null),dt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Ee?T.isDataTexture||T.isData3DTexture?z.texSubImage3D(Bt,k,Nt,fe,Me,ft,bt,Ut,gn,de,Se.data):O.isCompressedArrayTexture?z.compressedTexSubImage3D(Bt,k,Nt,fe,Me,ft,bt,Ut,gn,Se.data):z.texSubImage3D(Bt,k,Nt,fe,Me,ft,bt,Ut,gn,de,Se):T.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,k,Nt,fe,ft,bt,gn,de,Se.data):T.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,k,Nt,fe,Se.width,Se.height,gn,Se.data):z.texSubImage2D(z.TEXTURE_2D,k,Nt,fe,ft,bt,gn,de,Se);z.pixelStorei(z.UNPACK_ROW_LENGTH,bi),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,pe),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Zn),z.pixelStorei(z.UNPACK_SKIP_ROWS,Ws),z.pixelStorei(z.UNPACK_SKIP_IMAGES,In),k===0&&O.generateMipmaps&&z.generateMipmap(Bt),dt.unbindTexture()},this.copyTextureToTexture3D=function(T,O,X=null,q=null,k=0){return T.isTexture!==!0&&(no("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,T=arguments[2],O=arguments[3],k=arguments[4]||0),no('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,O,X,q,k)},this.initRenderTarget=function(T){Tt.get(T).__webglFramebuffer===void 0&&C.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?C.setTextureCube(T,0):T.isData3DTexture?C.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?C.setTexture2DArray(T,0):C.setTexture2D(T,0),dt.unbindTexture()},this.resetState=function(){w=0,A=0,I=null,dt.reset(),ye.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=he._getDrawingBufferColorSpace(t),e.unpackColorSpace=he._getUnpackColorSpace()}};var Ba=class n{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ht(t),this.near=e,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Mr=class extends Qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Be,this.environmentIntensity=1,this.environmentRotation=new Be,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var As=class extends _n{constructor(t=null,e=1,i=1,s,r,o,a,c,h=ln,l=ln,u,f){super(null,o,a,c,h,l,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rs=class extends ue{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},rr=new se,bd=new se,ua=[],Sd=new Li,c_=new se,Qr=new ae,to=new Ui,br=class extends ae{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Rs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,c_)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Li),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,rr),Sd.copy(t.boundingBox).applyMatrix4(rr),this.boundingBox.union(Sd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ui),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,rr),to.copy(t.boundingSphere).applyMatrix4(rr),this.boundingSphere.union(to)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(Qr.geometry=this.geometry,Qr.material=this.material,Qr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),to.copy(this.boundingSphere),to.applyMatrix4(i),t.ray.intersectsSphere(to)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,rr),bd.multiplyMatrices(i,rr),Qr.matrixWorld=bd,Qr.raycast(t,ua);for(let o=0,a=ua.length;o<a;o++){let c=ua[o];c.instanceId=r,c.object=this,e.push(c)}ua.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Rs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new As(new Float32Array(s*this.count),s,this.count,_o,ui));let r=this.morphTexture.source.data.data,o=0;for(let h=0;h<i.length;h++)o+=i[h];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var lo=class extends ei{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Fa=new N,Oa=new N,Ed=new se,eo=new vr,fa=new Ui,yl=new N,Td=new N,Ah=class extends Qe{constructor(t=new me,e=new lo){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Fa.fromBufferAttribute(e,s-1),Oa.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Fa.distanceTo(Oa);t.setAttribute("lineDistance",new Vt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fa.copy(i.boundingSphere),fa.applyMatrix4(s),fa.radius+=r,t.ray.intersectsSphere(fa)===!1)return;Ed.copy(s).invert(),eo.copy(t.ray).applyMatrix4(Ed);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,h=this.isLineSegments?2:1,l=i.index,f=i.attributes.position;if(l!==null){let d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let v=d,m=p-1;v<m;v+=h){let g=l.getX(v),M=l.getX(v+1),_=da(this,t,eo,c,g,M);_&&e.push(_)}if(this.isLineLoop){let v=l.getX(p-1),m=l.getX(d),g=da(this,t,eo,c,v,m);g&&e.push(g)}}else{let d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let v=d,m=p-1;v<m;v+=h){let g=da(this,t,eo,c,v,v+1);g&&e.push(g)}if(this.isLineLoop){let v=da(this,t,eo,c,p-1,d);v&&e.push(v)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function da(n,t,e,i,s,r){let o=n.geometry.attributes.position;if(Fa.fromBufferAttribute(o,s),Oa.fromBufferAttribute(o,r),e.distanceSqToSegment(Fa,Oa,yl,Td)>i)return;yl.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(yl);if(!(c<t.near||c>t.far))return{distance:c,point:Td.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var wd=new N,Ad=new N,ka=class extends Ah{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)wd.fromBufferAttribute(e,s),Ad.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+wd.distanceTo(Ad);t.setAttribute("lineDistance",new Vt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Rh=class extends ei{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Rd=new se,Ch=new vr,pa=new Ui,ma=new N,Ha=class extends Qe{constructor(t=new me,e=new Rh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),pa.copy(i.boundingSphere),pa.applyMatrix4(s),pa.radius+=r,t.ray.intersectsSphere(pa)===!1)return;Rd.copy(s).invert(),Ch.copy(t.ray).applyMatrix4(Rd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,h=i.index,u=i.attributes.position;if(h!==null){let f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let p=f,v=d;p<v;p++){let m=h.getX(p);ma.fromBufferAttribute(u,m),Cd(ma,m,c,s,t,e,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let p=f,v=d;p<v;p++)ma.fromBufferAttribute(u,p),Cd(ma,p,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Cd(n,t,e,i,s,r,o){let a=Ch.distanceSqToPoint(n);if(a<e){let c=new N;Ch.closestPointToPoint(n,c),c.applyMatrix4(i);let h=s.ray.origin.distanceTo(c);if(h<s.near||h>s.far)return;r.push({distance:h,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Nn=class extends _n{constructor(t,e,i,s,r,o,a,c,h){super(t,e,i,s,r,o,a,c,h),this.isCanvasTexture=!0,this.needsUpdate=!0}},Wn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,o;e?o=e:o=t*i[r-1];let a=0,c=r-1,h;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),h=i[s]-o,h<0)a=s+1;else if(h>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);let l=i[s],f=i[s+1]-l,d=(o-l)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new at:new N);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new N,s=[],r=[],o=[],a=new N,c=new se;for(let d=0;d<=t;d++){let p=d/t;s[d]=this.getTangentAt(p,new N)}r[0]=new N,o[0]=new N;let h=Number.MAX_VALUE,l=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);l<=h&&(h=l,i.set(1,0,0)),u<=h&&(h=u,i.set(0,1,0)),f<=h&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(Ke(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Ke(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},ho=class extends Wn{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new at){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let l=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=h-this.aY;c=f*l-d*u+this.aX,h=f*u+d*l+this.aY}return i.set(c,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ph=class extends ho{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function lu(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,h){s(o,a,h*(a-r),h*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,h,l,u){let f=(o-r)/h-(a-r)/(h+l)+(a-o)/l,d=(a-o)/l-(c-o)/(l+u)+(c-a)/u;f*=l,d*=l,s(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return n+t*r+e*o+i*a}}}var ga=new N,Ml=new lu,bl=new lu,Sl=new lu,Ih=class extends Wn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new N){let i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let h,l;this.closed||a>0?h=s[(a-1)%r]:(ga.subVectors(s[0],s[1]).add(s[0]),h=ga);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?l=s[(a+2)%r]:(ga.subVectors(s[r-1],s[r-2]).add(s[r-1]),l=ga),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(h.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(l),d);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),Ml.initNonuniformCatmullRom(h.x,u.x,f.x,l.x,p,v,m),bl.initNonuniformCatmullRom(h.y,u.y,f.y,l.y,p,v,m),Sl.initNonuniformCatmullRom(h.z,u.z,f.z,l.z,p,v,m)}else this.curveType==="catmullrom"&&(Ml.initCatmullRom(h.x,u.x,f.x,l.x,this.tension),bl.initCatmullRom(h.y,u.y,f.y,l.y,this.tension),Sl.initCatmullRom(h.z,u.z,f.z,l.z,this.tension));return i.set(Ml.calc(c),bl.calc(c),Sl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Pd(n,t,e,i,s){let r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function l_(n,t){let e=1-n;return e*e*t}function h_(n,t){return 2*(1-n)*n*t}function u_(n,t){return n*n*t}function ro(n,t,e,i){return l_(n,t)+h_(n,e)+u_(n,i)}function f_(n,t){let e=1-n;return e*e*e*t}function d_(n,t){let e=1-n;return 3*e*e*n*t}function p_(n,t){return 3*(1-n)*n*n*t}function m_(n,t){return n*n*n*t}function oo(n,t,e,i,s){return f_(n,t)+d_(n,e)+p_(n,i)+m_(n,s)}var Va=class extends Wn{constructor(t=new at,e=new at,i=new at,s=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new at){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(oo(t,s.x,r.x,o.x,a.x),oo(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},zh=class extends Wn{constructor(t=new N,e=new N,i=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new N){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(oo(t,s.x,r.x,o.x,a.x),oo(t,s.y,r.y,o.y,a.y),oo(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ga=class extends Wn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Lh=class extends Wn{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wa=class extends Wn{constructor(t=new at,e=new at,i=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new at){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(ro(t,s.x,r.x,o.x),ro(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Uh=class extends Wn{constructor(t=new N,e=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new N){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(ro(t,s.x,r.x,o.x),ro(t,s.y,r.y,o.y),ro(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xa=class extends Wn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){let i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],h=s[o],l=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(Pd(a,c.x,h.x,l.x,u.x),Pd(a,c.y,h.y,l.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new at().fromArray(s))}return this}},Dh=Object.freeze({__proto__:null,ArcCurve:Ph,CatmullRomCurve3:Ih,CubicBezierCurve:Va,CubicBezierCurve3:zh,EllipseCurve:ho,LineCurve:Ga,LineCurve3:Lh,QuadraticBezierCurve:Wa,QuadraticBezierCurve3:Uh,SplineCurve:Xa}),Nh=class extends Wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Dh[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let o=s[r]-i,a=this.curves[r],c=a.getLength(),h=c===0?0:1-o/c;return a.getPointAt(h,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let h=0;h<c.length;h++){let l=c[h];i&&i.equals(l)||(e.push(l),i=l)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new Dh[s.type]().fromJSON(s))}return this}},qa=class extends Nh{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new Ga(this.currentPoint.clone(),new at(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new Wa(this.currentPoint.clone(),new at(t,e),new at(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){let a=new Va(this.currentPoint.clone(),new at(t,e),new at(i,s),new at(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new Xa(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){let h=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(t+h,e+l,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){let h=new ho(t,e,i,s,r,o,a,c);if(this.curves.length>0){let u=h.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(h);let l=h.getPoint(1);return this.currentPoint.copy(l),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Ya=class n extends me{constructor(t=[new at(0,-.5),new at(.5,0),new at(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Ke(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],h=[],l=1/e,u=new N,f=new at,d=new N,p=new N,v=new N,m=0,g=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,g=t[M+1].y-t[M].y,d.x=g*1,d.y=-m,d.z=g*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:m=t[M+1].x-t[M].x,g=t[M+1].y-t[M].y,d.x=g*1,d.y=-m,d.z=g*0,p.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(p)}for(let M=0;M<=e;M++){let _=i+M*l*s,y=Math.sin(_),R=Math.cos(_);for(let w=0;w<=t.length-1;w++){u.x=t[w].x*y,u.y=t[w].y,u.z=t[w].x*R,o.push(u.x,u.y,u.z),f.x=M/e,f.y=w/(t.length-1),a.push(f.x,f.y);let A=c[3*w+0]*y,I=c[3*w+1],S=c[3*w+0]*R;h.push(A,I,S)}}for(let M=0;M<e;M++)for(let _=0;_<t.length-1;_++){let y=_+M*t.length,R=y,w=y+t.length,A=y+t.length+1,I=y+1;r.push(R,w,I),r.push(A,I,w)}this.setIndex(r),this.setAttribute("position",new Vt(o,3)),this.setAttribute("uv",new Vt(a,2)),this.setAttribute("normal",new Vt(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.points,t.segments,t.phiStart,t.phiLength)}};var ns=class n extends me{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],h=new N,l=new at;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=i+u/e*s;h.x=t*Math.cos(d),h.y=t*Math.sin(d),o.push(h.x,h.y,h.z),a.push(0,0,1),l.x=(o[f]/t+1)/2,l.y=(o[f+1]/t+1)/2,c.push(l.x,l.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Vt(o,3)),this.setAttribute("normal",new Vt(a,3)),this.setAttribute("uv",new Vt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Bn=class n extends me{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let h=this;s=Math.floor(s),r=Math.floor(r);let l=[],u=[],f=[],d=[],p=0,v=[],m=i/2,g=0;M(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(l),this.setAttribute("position",new Vt(u,3)),this.setAttribute("normal",new Vt(f,3)),this.setAttribute("uv",new Vt(d,2));function M(){let y=new N,R=new N,w=0,A=(e-t)/i;for(let I=0;I<=r;I++){let S=[],b=I/r,P=b*(e-t)+t;for(let L=0;L<=s;L++){let U=L/s,D=U*c+a,W=Math.sin(D),H=Math.cos(D);R.x=P*W,R.y=-b*i+m,R.z=P*H,u.push(R.x,R.y,R.z),y.set(W,A,H).normalize(),f.push(y.x,y.y,y.z),d.push(U,1-b),S.push(p++)}v.push(S)}for(let I=0;I<s;I++)for(let S=0;S<r;S++){let b=v[S][I],P=v[S+1][I],L=v[S+1][I+1],U=v[S][I+1];(t>0||S!==0)&&(l.push(b,P,U),w+=3),(e>0||S!==r-1)&&(l.push(P,L,U),w+=3)}h.addGroup(g,w,0),g+=w}function _(y){let R=p,w=new at,A=new N,I=0,S=y===!0?t:e,b=y===!0?1:-1;for(let L=1;L<=s;L++)u.push(0,m*b,0),f.push(0,b,0),d.push(.5,.5),p++;let P=p;for(let L=0;L<=s;L++){let D=L/s*c+a,W=Math.cos(D),H=Math.sin(D);A.x=S*H,A.y=m*b,A.z=S*W,u.push(A.x,A.y,A.z),f.push(0,b,0),w.x=W*.5+.5,w.y=H*.5*b+.5,d.push(w.x,w.y),p++}for(let L=0;L<s;L++){let U=R+L,D=P+L;y===!0?l.push(D,D+1,U):l.push(D+1,D,U),I+=3}h.addGroup(g,I,y===!0?1:2),g+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},uo=class n extends Bn{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Bh=class n extends me{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],o=[];a(s),h(i),l(),this.setAttribute("position",new Vt(r,3)),this.setAttribute("normal",new Vt(r.slice(),3)),this.setAttribute("uv",new Vt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let _=new N,y=new N,R=new N;for(let w=0;w<e.length;w+=3)d(e[w+0],_),d(e[w+1],y),d(e[w+2],R),c(_,y,R,M)}function c(M,_,y,R){let w=R+1,A=[];for(let I=0;I<=w;I++){A[I]=[];let S=M.clone().lerp(y,I/w),b=_.clone().lerp(y,I/w),P=w-I;for(let L=0;L<=P;L++)L===0&&I===w?A[I][L]=S:A[I][L]=S.clone().lerp(b,L/P)}for(let I=0;I<w;I++)for(let S=0;S<2*(w-I)-1;S++){let b=Math.floor(S/2);S%2===0?(f(A[I][b+1]),f(A[I+1][b]),f(A[I][b])):(f(A[I][b+1]),f(A[I+1][b+1]),f(A[I+1][b]))}}function h(M){let _=new N;for(let y=0;y<r.length;y+=3)_.x=r[y+0],_.y=r[y+1],_.z=r[y+2],_.normalize().multiplyScalar(M),r[y+0]=_.x,r[y+1]=_.y,r[y+2]=_.z}function l(){let M=new N;for(let _=0;_<r.length;_+=3){M.x=r[_+0],M.y=r[_+1],M.z=r[_+2];let y=m(M)/2/Math.PI+.5,R=g(M)/Math.PI+.5;o.push(y,1-R)}p(),u()}function u(){for(let M=0;M<o.length;M+=6){let _=o[M+0],y=o[M+2],R=o[M+4],w=Math.max(_,y,R),A=Math.min(_,y,R);w>.9&&A<.1&&(_<.2&&(o[M+0]+=1),y<.2&&(o[M+2]+=1),R<.2&&(o[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function d(M,_){let y=M*3;_.x=t[y+0],_.y=t[y+1],_.z=t[y+2]}function p(){let M=new N,_=new N,y=new N,R=new N,w=new at,A=new at,I=new at;for(let S=0,b=0;S<r.length;S+=9,b+=6){M.set(r[S+0],r[S+1],r[S+2]),_.set(r[S+3],r[S+4],r[S+5]),y.set(r[S+6],r[S+7],r[S+8]),w.set(o[b+0],o[b+1]),A.set(o[b+2],o[b+3]),I.set(o[b+4],o[b+5]),R.copy(M).add(_).add(y).divideScalar(3);let P=m(R);v(w,b+0,M,P),v(A,b+2,_,P),v(I,b+4,y,P)}}function v(M,_,y,R){R<0&&M.x===1&&(o[_]=M.x-1),y.x===0&&y.z===0&&(o[_]=R/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function g(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.details)}};var bn=class extends qa{constructor(t){super(t),this.uuid=Ar(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new qa().fromJSON(s))}return this}},g_={triangulate:function(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=s0(n,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,h,l,u,f,d;if(i&&(r=M_(n,t,r,e)),n.length>80*e){a=h=n[0],c=l=n[1];for(let p=e;p<s;p+=e)u=n[p],f=n[p+1],u<a&&(a=u),f<c&&(c=f),u>h&&(h=u),f>l&&(l=f);d=Math.max(h-a,l-c),d=d!==0?32767/d:0}return fo(r,o,e,a,c,d,0),o}};function s0(n,t,e,i,s){let r,o;if(s===z_(n,t,e,i)>0)for(r=t;r<e;r+=i)o=Id(r,n[r],n[r+1],o);else for(r=e-i;r>=t;r-=i)o=Id(r,n[r],n[r+1],o);return o&&oc(o,o.next)&&(mo(o),o=o.next),o}function Cs(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(oc(e,e.next)||ze(e.prev,e,e.next)===0)){if(mo(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function fo(n,t,e,i,s,r,o){if(!n)return;!o&&r&&w_(n,i,s,r);let a=n,c,h;for(;n.prev!==n.next;){if(c=n.prev,h=n.next,r?v_(n,i,s,r):x_(n)){t.push(c.i/e|0),t.push(n.i/e|0),t.push(h.i/e|0),mo(n),n=h.next,a=h.next;continue}if(n=h,n===a){o?o===1?(n=__(Cs(n),t,e),fo(n,t,e,i,s,r,2)):o===2&&y_(n,t,e,i,s,r):fo(Cs(n),t,e,i,s,r,1);break}}}function x_(n){let t=n.prev,e=n,i=n.next;if(ze(t,e,i)>=0)return!1;let s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,h=i.y,l=s<r?s<o?s:o:r<o?r:o,u=a<c?a<h?a:h:c<h?c:h,f=s>r?s>o?s:o:r>o?r:o,d=a>c?a>h?a:h:c>h?c:h,p=i.next;for(;p!==t;){if(p.x>=l&&p.x<=f&&p.y>=u&&p.y<=d&&ar(s,a,r,c,o,h,p.x,p.y)&&ze(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function v_(n,t,e,i){let s=n.prev,r=n,o=n.next;if(ze(s,r,o)>=0)return!1;let a=s.x,c=r.x,h=o.x,l=s.y,u=r.y,f=o.y,d=a<c?a<h?a:h:c<h?c:h,p=l<u?l<f?l:f:u<f?u:f,v=a>c?a>h?a:h:c>h?c:h,m=l>u?l>f?l:f:u>f?u:f,g=Fh(d,p,t,e,i),M=Fh(v,m,t,e,i),_=n.prevZ,y=n.nextZ;for(;_&&_.z>=g&&y&&y.z<=M;){if(_.x>=d&&_.x<=v&&_.y>=p&&_.y<=m&&_!==s&&_!==o&&ar(a,l,c,u,h,f,_.x,_.y)&&ze(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=d&&y.x<=v&&y.y>=p&&y.y<=m&&y!==s&&y!==o&&ar(a,l,c,u,h,f,y.x,y.y)&&ze(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=g;){if(_.x>=d&&_.x<=v&&_.y>=p&&_.y<=m&&_!==s&&_!==o&&ar(a,l,c,u,h,f,_.x,_.y)&&ze(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=M;){if(y.x>=d&&y.x<=v&&y.y>=p&&y.y<=m&&y!==s&&y!==o&&ar(a,l,c,u,h,f,y.x,y.y)&&ze(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function __(n,t,e){let i=n;do{let s=i.prev,r=i.next.next;!oc(s,r)&&r0(s,i,i.next,r)&&po(s,r)&&po(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),mo(i),mo(i.next),i=n=r),i=i.next}while(i!==n);return Cs(i)}function y_(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&C_(o,a)){let c=o0(o,a);o=Cs(o,o.next),c=Cs(c,c.next),fo(o,t,e,i,s,r,0),fo(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function M_(n,t,e,i){let s=[],r,o,a,c,h;for(r=0,o=t.length;r<o;r++)a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,h=s0(n,a,c,i,!1),h===h.next&&(h.steiner=!0),s.push(R_(h));for(s.sort(b_),r=0;r<s.length;r++)e=S_(s[r],e);return e}function b_(n,t){return n.x-t.x}function S_(n,t){let e=E_(n,t);if(!e)return t;let i=o0(e,n);return Cs(i,i.next),Cs(e,e.next)}function E_(n,t){let e=t,i=-1/0,s,r=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>i&&(i=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,h=s.y,l=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&ar(o<h?r:i,o,c,h,o<h?i:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),po(e,n)&&(u<l||u===l&&(e.x>s.x||e.x===s.x&&T_(s,e)))&&(s=e,l=u)),e=e.next;while(e!==a);return s}function T_(n,t){return ze(n.prev,n,t.prev)<0&&ze(t.next,n,n.next)<0}function w_(n,t,e,i){let s=n;do s.z===0&&(s.z=Fh(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,A_(s)}function A_(n){let t,e,i,s,r,o,a,c,h=1;do{for(e=n,n=null,r=null,o=0;e;){for(o++,i=e,a=0,t=0;t<h&&(a++,i=i.nextZ,!!i);t++);for(c=h;a>0||c>0&&i;)a!==0&&(c===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,a--):(s=i,i=i.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,h*=2}while(o>1);return n}function Fh(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function R_(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function ar(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function C_(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!P_(n,t)&&(po(n,t)&&po(t,n)&&I_(n,t)&&(ze(n.prev,n,t.prev)||ze(n,t.prev,t))||oc(n,t)&&ze(n.prev,n,n.next)>0&&ze(t.prev,t,t.next)>0)}function ze(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function oc(n,t){return n.x===t.x&&n.y===t.y}function r0(n,t,e,i){let s=va(ze(n,t,e)),r=va(ze(n,t,i)),o=va(ze(e,i,n)),a=va(ze(e,i,t));return!!(s!==r&&o!==a||s===0&&xa(n,e,t)||r===0&&xa(n,i,t)||o===0&&xa(e,n,i)||a===0&&xa(e,t,i))}function xa(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function va(n){return n>0?1:n<0?-1:0}function P_(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&r0(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function po(n,t){return ze(n.prev,n,n.next)<0?ze(n,t,n.next)>=0&&ze(n,n.prev,t)>=0:ze(n,t,n.prev)<0||ze(n,n.next,t)<0}function I_(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function o0(n,t){let e=new Oh(n.i,n.x,n.y),i=new Oh(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Id(n,t,e,i){let s=new Oh(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function mo(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Oh(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function z_(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}var fi=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];zd(t),Ld(i,t);let o=t.length;e.forEach(zd);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Ld(i,e[c]);let a=g_.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function zd(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Ld(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var Sr=class n extends me{constructor(t=new bn([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let h=t[a];o(h)}this.setAttribute("position",new Vt(s,3)),this.setAttribute("uv",new Vt(r,2)),this.computeVertexNormals();function o(a){let c=[],h=e.curveSegments!==void 0?e.curveSegments:12,l=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:L_,_,y=!1,R,w,A,I;g&&(_=g.getSpacedPoints(l),y=!0,f=!1,R=g.computeFrenetFrames(l,!1),w=new N,A=new N,I=new N),f||(m=0,d=0,p=0,v=0);let S=a.extractPoints(h),b=S.shape,P=S.holes;if(!fi.isClockWise(b)){b=b.reverse();for(let et=0,ct=P.length;et<ct;et++){let z=P[et];fi.isClockWise(z)&&(P[et]=z.reverse())}}let U=fi.triangulateShape(b,P),D=b;for(let et=0,ct=P.length;et<ct;et++){let z=P[et];b=b.concat(z)}function W(et,ct,z){return ct||console.error("THREE.ExtrudeGeometry: vec does not exist"),et.clone().addScaledVector(ct,z)}let H=b.length,Q=U.length;function V(et,ct,z){let It,ot,yt,dt=et.x-ct.x,Wt=et.y-ct.y,Tt=z.x-et.x,C=z.y-et.y,E=dt*dt+Wt*Wt,G=dt*C-Wt*Tt;if(Math.abs(G)>Number.EPSILON){let J=Math.sqrt(E),rt=Math.sqrt(Tt*Tt+C*C),K=ct.x-Wt/J,Lt=ct.y+dt/J,gt=z.x-C/rt,wt=z.y+Tt/rt,oe=((gt-K)*C-(wt-Lt)*Tt)/(dt*C-Wt*Tt);It=K+dt*oe-et.x,ot=Lt+Wt*oe-et.y;let lt=It*It+ot*ot;if(lt<=2)return new at(It,ot);yt=Math.sqrt(lt/2)}else{let J=!1;dt>Number.EPSILON?Tt>Number.EPSILON&&(J=!0):dt<-Number.EPSILON?Tt<-Number.EPSILON&&(J=!0):Math.sign(Wt)===Math.sign(C)&&(J=!0),J?(It=-Wt,ot=dt,yt=Math.sqrt(E)):(It=dt,ot=Wt,yt=Math.sqrt(E/2))}return new at(It/yt,ot/yt)}let Z=[];for(let et=0,ct=D.length,z=ct-1,It=et+1;et<ct;et++,z++,It++)z===ct&&(z=0),It===ct&&(It=0),Z[et]=V(D[et],D[z],D[It]);let j=[],tt,ut=Z.concat();for(let et=0,ct=P.length;et<ct;et++){let z=P[et];tt=[];for(let It=0,ot=z.length,yt=ot-1,dt=It+1;It<ot;It++,yt++,dt++)yt===ot&&(yt=0),dt===ot&&(dt=0),tt[It]=V(z[It],z[yt],z[dt]);j.push(tt),ut=ut.concat(tt)}for(let et=0;et<m;et++){let ct=et/m,z=d*Math.cos(ct*Math.PI/2),It=p*Math.sin(ct*Math.PI/2)+v;for(let ot=0,yt=D.length;ot<yt;ot++){let dt=W(D[ot],Z[ot],It);nt(dt.x,dt.y,-z)}for(let ot=0,yt=P.length;ot<yt;ot++){let dt=P[ot];tt=j[ot];for(let Wt=0,Tt=dt.length;Wt<Tt;Wt++){let C=W(dt[Wt],tt[Wt],It);nt(C.x,C.y,-z)}}}let Et=p+v;for(let et=0;et<H;et++){let ct=f?W(b[et],ut[et],Et):b[et];y?(A.copy(R.normals[0]).multiplyScalar(ct.x),w.copy(R.binormals[0]).multiplyScalar(ct.y),I.copy(_[0]).add(A).add(w),nt(I.x,I.y,I.z)):nt(ct.x,ct.y,0)}for(let et=1;et<=l;et++)for(let ct=0;ct<H;ct++){let z=f?W(b[ct],ut[ct],Et):b[ct];y?(A.copy(R.normals[et]).multiplyScalar(z.x),w.copy(R.binormals[et]).multiplyScalar(z.y),I.copy(_[et]).add(A).add(w),nt(I.x,I.y,I.z)):nt(z.x,z.y,u/l*et)}for(let et=m-1;et>=0;et--){let ct=et/m,z=d*Math.cos(ct*Math.PI/2),It=p*Math.sin(ct*Math.PI/2)+v;for(let ot=0,yt=D.length;ot<yt;ot++){let dt=W(D[ot],Z[ot],It);nt(dt.x,dt.y,u+z)}for(let ot=0,yt=P.length;ot<yt;ot++){let dt=P[ot];tt=j[ot];for(let Wt=0,Tt=dt.length;Wt<Tt;Wt++){let C=W(dt[Wt],tt[Wt],It);y?nt(C.x,C.y+_[l-1].y,_[l-1].x+z):nt(C.x,C.y,u+z)}}}Y(),F();function Y(){let et=s.length/3;if(f){let ct=0,z=H*ct;for(let It=0;It<Q;It++){let ot=U[It];vt(ot[2]+z,ot[1]+z,ot[0]+z)}ct=l+m*2,z=H*ct;for(let It=0;It<Q;It++){let ot=U[It];vt(ot[0]+z,ot[1]+z,ot[2]+z)}}else{for(let ct=0;ct<Q;ct++){let z=U[ct];vt(z[2],z[1],z[0])}for(let ct=0;ct<Q;ct++){let z=U[ct];vt(z[0]+H*l,z[1]+H*l,z[2]+H*l)}}i.addGroup(et,s.length/3-et,0)}function F(){let et=s.length/3,ct=0;st(D,ct),ct+=D.length;for(let z=0,It=P.length;z<It;z++){let ot=P[z];st(ot,ct),ct+=ot.length}i.addGroup(et,s.length/3-et,1)}function st(et,ct){let z=et.length;for(;--z>=0;){let It=z,ot=z-1;ot<0&&(ot=et.length-1);for(let yt=0,dt=l+m*2;yt<dt;yt++){let Wt=H*yt,Tt=H*(yt+1),C=ct+It+Wt,E=ct+ot+Wt,G=ct+ot+Tt,J=ct+It+Tt;At(C,E,G,J)}}}function nt(et,ct,z){c.push(et),c.push(ct),c.push(z)}function vt(et,ct,z){_t(et),_t(ct),_t(z);let It=s.length/3,ot=M.generateTopUV(i,s,It-3,It-2,It-1);Gt(ot[0]),Gt(ot[1]),Gt(ot[2])}function At(et,ct,z,It){_t(et),_t(ct),_t(It),_t(ct),_t(z),_t(It);let ot=s.length/3,yt=M.generateSideWallUV(i,s,ot-6,ot-3,ot-2,ot-1);Gt(yt[0]),Gt(yt[1]),Gt(yt[3]),Gt(yt[1]),Gt(yt[2]),Gt(yt[3])}function _t(et){s.push(c[et*3+0]),s.push(c[et*3+1]),s.push(c[et*3+2])}function Gt(et){r.push(et.x),r.push(et.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return U_(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];i.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Dh[s.type]().fromJSON(s)),new n(i,t.options)}},L_={generateTopUV:function(n,t,e,i,s){let r=t[e*3],o=t[e*3+1],a=t[i*3],c=t[i*3+1],h=t[s*3],l=t[s*3+1];return[new at(r,o),new at(a,c),new at(h,l)]},generateSideWallUV:function(n,t,e,i,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],h=t[i*3],l=t[i*3+1],u=t[i*3+2],f=t[s*3],d=t[s*3+1],p=t[s*3+2],v=t[r*3],m=t[r*3+1],g=t[r*3+2];return Math.abs(a-l)<Math.abs(o-h)?[new at(o,1-c),new at(h,1-u),new at(f,1-p),new at(v,1-g)]:[new at(a,1-c),new at(l,1-u),new at(d,1-p),new at(m,1-g)]}};function U_(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var $a=class n extends Bh{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}};var Za=class n extends me{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);let a=[],c=[],h=[],l=[],u=t,f=(e-t)/s,d=new N,p=new at;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){let g=r+m/i*o;d.x=u*Math.cos(g),d.y=u*Math.sin(g),c.push(d.x,d.y,d.z),h.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,l.push(p.x,p.y)}u+=f}for(let v=0;v<s;v++){let m=v*(i+1);for(let g=0;g<i;g++){let M=g+m,_=M,y=M+i+1,R=M+i+2,w=M+1;a.push(_,y,w),a.push(y,R,w)}}this.setIndex(a),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(h,3)),this.setAttribute("uv",new Vt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Di=class n extends me{constructor(t=new bn([new at(0,.5),new at(-.5,-.5),new at(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let i=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)h(t);else for(let l=0;l<t.length;l++)h(t[l]),this.addGroup(a,c,l),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new Vt(s,3)),this.setAttribute("normal",new Vt(r,3)),this.setAttribute("uv",new Vt(o,2));function h(l){let u=s.length/3,f=l.extractPoints(e),d=f.shape,p=f.holes;fi.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,g=p.length;m<g;m++){let M=p[m];fi.isClockWise(M)===!0&&(p[m]=M.reverse())}let v=fi.triangulateShape(d,p);for(let m=0,g=p.length;m<g;m++){let M=p[m];d=d.concat(M)}for(let m=0,g=d.length;m<g;m++){let M=d[m];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let m=0,g=v.length;m<g;m++){let M=v[m],_=M[0]+u,y=M[1]+u,R=M[2]+u;i.push(_,y,R),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return D_(e,t)}static fromJSON(t,e){let i=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];i.push(o)}return new n(i,t.curveSegments)}};function D_(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){let s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}var Xn=class n extends me{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),h=0,l=[],u=new N,f=new N,d=[],p=[],v=[],m=[];for(let g=0;g<=i;g++){let M=[],_=g/i,y=0;g===0&&o===0?y=.5/e:g===i&&c===Math.PI&&(y=-.5/e);for(let R=0;R<=e;R++){let w=R/e;u.x=-t*Math.cos(s+w*r)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(s+w*r)*Math.sin(o+_*a),p.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(w+y,1-_),M.push(h++)}l.push(M)}for(let g=0;g<i;g++)for(let M=0;M<e;M++){let _=l[g][M+1],y=l[g][M],R=l[g+1][M],w=l[g+1][M+1];(g!==0||o>0)&&d.push(_,y,w),(g!==i-1||c<Math.PI)&&d.push(y,R,w)}this.setIndex(d),this.setAttribute("position",new Vt(p,3)),this.setAttribute("normal",new Vt(v,3)),this.setAttribute("uv",new Vt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Er=class n extends me{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],c=[],h=[],l=new N,u=new N,f=new N;for(let d=0;d<=i;d++)for(let p=0;p<=s;p++){let v=p/s*r,m=d/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),l.x=t*Math.cos(v),l.y=t*Math.sin(v),f.subVectors(u,l).normalize(),c.push(f.x,f.y,f.z),h.push(p/s),h.push(d/i)}for(let d=1;d<=i;d++)for(let p=1;p<=s;p++){let v=(s+1)*d+p-1,m=(s+1)*(d-1)+p-1,g=(s+1)*(d-1)+p,M=(s+1)*d+p;o.push(v,m,M),o.push(m,g,M)}this.setIndex(o),this.setAttribute("position",new Vt(a,3)),this.setAttribute("normal",new Vt(c,3)),this.setAttribute("uv",new Vt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var go=class extends ei{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ic,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Be,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var xo=class extends ei{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Ht(16777215),this.specular=new Ht(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ic,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Be,this.combine=ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var tn=class extends ei{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ic,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Be,this.combine=ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function _a(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function N_(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var Tr=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},kh=class extends Tr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wf,endingEnd:wf}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Af:r=t,a=2*e-i;break;case Rf:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Af:o=t,c=2*i-e;break;case Rf:o=1,c=i+s[1]-s[0];break;default:o=t-1,c=e}let h=(i-e)*.5,l=this.valueSize;this._weightPrev=h/(e-a),this._weightNext=h/(c-i),this._offsetPrev=r*l,this._offsetNext=o*l}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,h=c-a,l=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(i-e)/(s-e),v=p*p,m=v*p,g=-f*m+2*f*v-f*p,M=(1+f)*m+(-1.5-2*f)*v+(-.5+f)*p+1,_=(-1-d)*m+(1.5+d)*v+.5*p,y=d*m-d*v;for(let R=0;R!==a;++R)r[R]=g*o[l+R]+M*o[h+R]+_*o[c+R]+y*o[u+R];return r}},Hh=class extends Tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,h=c-a,l=(i-e)/(s-e),u=1-l;for(let f=0;f!==a;++f)r[f]=o[h+f]*u+o[c+f]*l;return r}},Vh=class extends Tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ni=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=_a(e,this.TimeBufferType),this.values=_a(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:_a(t.times,Array),values:_a(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Vh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Hh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new kh(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ta:e=this.InterpolantFactoryMethodDiscrete;break;case lh:e=this.InterpolantFactoryMethodLinear;break;case Xc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ta;case this.InterpolantFactoryMethodLinear:return lh;case this.InterpolantFactoryMethodSmooth:return Xc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&N_(s))for(let a=0,c=s.length;a!==c;++a){let h=s[a];if(isNaN(h)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,h),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Xc,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,h=t[a],l=t[a+1];if(h!==l&&(a!==1||h!==t[0]))if(s)c=!0;else{let u=a*i,f=u-i,d=u+i;for(let p=0;p!==i;++p){let v=e[u+p];if(v!==e[f+p]||v!==e[d+p]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*i,f=o*i;for(let d=0;d!==i;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,c=o*i,h=0;h!==i;++h)e[c+h]=e[a+h];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};ni.prototype.TimeBufferType=Float32Array;ni.prototype.ValueBufferType=Float32Array;ni.prototype.DefaultInterpolation=lh;var Ps=class extends ni{constructor(t,e,i){super(t,e,i)}};Ps.prototype.ValueTypeName="bool";Ps.prototype.ValueBufferType=Array;Ps.prototype.DefaultInterpolation=Ta;Ps.prototype.InterpolantFactoryMethodLinear=void 0;Ps.prototype.InterpolantFactoryMethodSmooth=void 0;var Gh=class extends ni{};Gh.prototype.ValueTypeName="color";var Wh=class extends ni{};Wh.prototype.ValueTypeName="number";var Xh=class extends Tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-e)/(s-e),h=t*a;for(let l=h+a;h!==l;h+=4)yn.slerpFlat(r,0,o,h-a,o,h,c);return r}},Ja=class extends ni{InterpolantFactoryMethodLinear(t){return new Xh(this.times,this.values,this.getValueSize(),t)}};Ja.prototype.ValueTypeName="quaternion";Ja.prototype.InterpolantFactoryMethodSmooth=void 0;var Is=class extends ni{constructor(t,e,i){super(t,e,i)}};Is.prototype.ValueTypeName="string";Is.prototype.ValueBufferType=Array;Is.prototype.DefaultInterpolation=Ta;Is.prototype.InterpolantFactoryMethodLinear=void 0;Is.prototype.InterpolantFactoryMethodSmooth=void 0;var qh=class extends ni{};qh.prototype.ValueTypeName="vector";var Yh=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,c,h=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(l){a++,r===!1&&s.onStart!==void 0&&s.onStart(l,o,a),r=!0},this.itemEnd=function(l){o++,s.onProgress!==void 0&&s.onProgress(l,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(l){s.onError!==void 0&&s.onError(l)},this.resolveURL=function(l){return c?c(l):l},this.setURLModifier=function(l){return c=l,this},this.addHandler=function(l,u){return h.push(l,u),this},this.removeHandler=function(l){let u=h.indexOf(l);return u!==-1&&h.splice(u,2),this},this.getHandler=function(l){for(let u=0,f=h.length;u<f;u+=2){let d=h[u],p=h[u+1];if(d.global&&(d.lastIndex=0),d.test(l))return p}return null}}},B_=new Yh,$h=class{constructor(t){this.manager=t!==void 0?t:B_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};$h.DEFAULT_MATERIAL_NAME="__DEFAULT";var ja=class extends Qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Ka=class extends ja{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},El=new se,Ud=new N,Dd=new N,Zh=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ws,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new Ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Ud.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ud),Dd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Dd),e.updateMatrixWorld(),El.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(El),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(El)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Jh=class extends Zh{constructor(){super(new Ua(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qa=class extends ja{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.target=new Qe,this.shadow=new Jh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var hu="\\[\\]\\.:\\/",F_=new RegExp("["+hu+"]","g"),uu="[^"+hu+"]",O_="[^"+hu.replace("\\.","")+"]",k_=/((?:WC+[\/:])*)/.source.replace("WC",uu),H_=/(WCOD+)?/.source.replace("WCOD",O_),V_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uu),G_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uu),W_=new RegExp("^"+k_+H_+V_+G_+"$"),X_=["material","materials","bones","map"],jh=class{constructor(t,e,i){let s=i||we.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},we=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(F_,"")}static parseTrackName(t){let e=W_.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);X_.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=i(a.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let h=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let l=0;l<t.length;l++)if(t[l].name===h){h=l;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(h!==void 0){if(t[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[h]}}let o=t[s];if(o===void 0){let h=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};we.Composite=jh;we.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};we.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};we.prototype.GetterByBindingType=[we.prototype._getValue_direct,we.prototype._getValue_array,we.prototype._getValue_arrayElement,we.prototype._getValue_toArray];we.prototype.SetterByBindingTypeAndVersioning=[[we.prototype._setValue_direct,we.prototype._setValue_direct_setNeedsUpdate,we.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[we.prototype._setValue_array,we.prototype._setValue_array_setNeedsUpdate,we.prototype._setValue_array_setMatrixWorldNeedsUpdate],[we.prototype._setValue_arrayElement,we.prototype._setValue_arrayElement_setNeedsUpdate,we.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[we.prototype._setValue_fromArray,we.prototype._setValue_fromArray_setNeedsUpdate,we.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var N2=new Float32Array(1);var Nd=new se,tc=class{constructor(t,e,i=0,s=1/0){this.ray=new vr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new co,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Nd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Nd),this}intersectObject(t,e=!0,i=[]){return Kh(t,this,i,e),i.sort(Bd),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Kh(t[s],this,i,e);return i.sort(Bd),i}};function Bd(n,t){return n.distance-t.distance}function Kh(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let o=0,a=r.length;o<a;o++)Kh(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qh}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qh);var x={cena:null,camera:null,renderer:null,bonecos:null,efeitos:null,unidades:[],agentes:[],projeteis:[],hashA:null,hashU:null,dinheiro:3e3,tempo:0,velocidade:1,pausado:!0,fim:!1,resgatados:0,civisMortos:0,zumbisMortos:0,perdas:0,populacao:0,meta:250,selecao:[],alertas:[],focos:0,proxFoco:25,dificuldade:"normal",base:null,porta:null,estr:{},satelite:null,cfg:{som:!0,qualidade:1},controlando:null,idSeq:1};function $t(n,t,e,i="info"){x.alertas.push({txt:n,x:t,z:e,tipo:i,t:x.tempo,criado:performance.now()}),x.alertas.length>30&&x.alertas.shift(),x.ui&&x.ui.alerta(n,t,e,i)}var wu={};bf(wu,{ALT:()=>ke,CEL:()=>Ae,COSTA:()=>We,GH:()=>Re,GW:()=>Ft,LARG:()=>Oe,MAT_PREDIOS:()=>Ni,META:()=>be,MPP:()=>rs,QUAL:()=>xe,T:()=>Te,agua:()=>zs,andavel:()=>Fe,atualizarDecoracao:()=>Su,atualizarPredios:()=>Eu,canvasTerreno:()=>xu,carros:()=>Mu,cel:()=>pi,construirAgua:()=>_u,construirCarros:()=>bu,construirChao:()=>vu,construirPalmeiras:()=>yu,construirPredios:()=>gu,definirQualidade:()=>du,dentroPoligono:()=>Mo,ehRua:()=>ac,esmagarCarros:()=>Tu,grade:()=>He,latlon:()=>cy,lugares:()=>Ce,predioEm:()=>Ls,predioId:()=>Le,predios:()=>Ue,rasterizarPredios:()=>pu,removerPrediosEm:()=>mu,tipo:()=>q_});function di(n,t=!1){let e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new me,h=0;for(let l=0;l<n.length;++l){let u=n[l],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". The geometry must have either an index or a position attribute"),null;c.addGroup(h,d,l),h+=d}}if(e){let l=0,u=[];for(let f=0;f<n.length;++f){let d=n[f].index;for(let p=0;p<d.count;++p)u.push(d.getX(p)+l);l+=n[f].attributes.position.count}c.setIndex(u)}for(let l in r){let u=a0(r[l]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" attribute."),null;c.setAttribute(l,u)}for(let l in o){let u=o[l][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[l]=[];for(let f=0;f<u;++f){let d=[];for(let v=0;v<o[l].length;++v)d.push(o[l][v][f]);let p=a0(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" morphAttribute."),null;c.morphAttributes[l].push(p)}}return c}function a0(n){let t,e,i,s=-1,r=0;for(let h=0;h<n.length;++h){let l=n[h];if(t===void 0&&(t=l.array.constructor),t!==l.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=l.itemSize),e!==l.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=l.normalized),i!==l.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=l.gpuType),s!==l.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=l.count*e}let o=new t(r),a=new ue(o,e,i),c=0;for(let h=0;h<n.length;++h){let l=n[h];if(l.isInterleavedBufferAttribute){let u=c/e;for(let f=0,d=l.count;f<d;f++)for(let p=0;p<e;p++){let v=l.getComponent(f,p);a.setComponent(f+u,p,v)}}else o.set(l.array,c);c+=l.count*e}return s!==void 0&&(a.gpuType=s),a}var{META:be,GRADE_RLE:c0,PREDIOS:l0}=window.MAPA_DADOS,X2=be.cidade||"miami",We=be.costa!==!1;var rs=be.mpp,Ae=be.cel*rs,Ft=be.gw,Re=be.gh,Oe=Ft*Ae,ke=Re*Ae,Te={AGUA:0,CHAO:1,RUA:2,PARQUE:3,AREIA:4,PREDIO:5,PONTE:6,CENTRO:7},ac=n=>n===2||n===7,xe=1;function du(n){xe=n}function p0(n){let t=atob(n),e=new Uint8Array(t.length);for(let i=0;i<t.length;i++)e[i]=t.charCodeAt(i);return e}var He=new Uint8Array(Ft*Re);{let n=p0(c0),t=0;for(let e=0;e<n.length;e+=2)He.fill(n[e],t,t+n[e+1]),t+=n[e+1]}var Le=new Int32Array(Ft*Re).fill(-1);function pi(n,t){let e=Math.floor(n/Ae),i=Math.floor(t/Ae);return e<0||i<0||e>=Ft||i>=Re?-1:i*Ft+e}function q_(n,t){let e=pi(n,t);return e<0?We?Te.AGUA:Te.CHAO:He[e]}function Fe(n,t){let e=pi(n,t);return e<0?!1:He[e]!==Te.AGUA&&Le[e]<0}function zs(n,t){let e=pi(n,t);return e<0?We:He[e]===Te.AGUA||He[e]===Te.PONTE}function Ls(n,t){let e=pi(n,t);return e<0?null:Le[e]>=0?Ue[Le[e]]:null}var Ce={};for(let n in be.lugares){let[t,e,i]=be.lugares[n];Ce[n]={nome:t,x:e*rs,z:i*rs}}var Ue=[];{let n=p0(l0),t=new Uint16Array(n.buffer,n.byteOffset,n.byteLength/2),e=0;for(;e<t.length;){let i=t[e],s=t[e+1]/4,r=new Float32Array(i*2);for(let p=0;p<i;p++)r[p*2]=t[e+2+p*2]/2*rs,r[p*2+1]=t[e+3+p*2]/2*rs;e+=2+i*2;let o=0;for(let p=0;p<i;p++){let v=(p+1)%i;o+=r[p*2]*r[v*2+1]-r[v*2]*r[p*2+1]}if(o>0)for(let p=0;p<i/2;p++){let v=i-1-p,m=r[p*2];r[p*2]=r[v*2],r[v*2]=m,m=r[p*2+1],r[p*2+1]=r[v*2+1],r[v*2+1]=m}let a=Math.abs(o)/2,c=0,h=0,l=1e9,u=-1e9,f=1e9,d=-1e9;for(let p=0;p<i;p++){let v=r[p*2],m=r[p*2+1];c+=v,h+=m,v<l&&(l=v),v>u&&(u=v),m<f&&(f=m),m>d&&(d=m)}c/=i,h/=i,Ue.push({id:Ue.length,pts:r,h:s,area:a,cx:c,cz:h,x0:l,x1:u,z0:f,z1:d,raio:Math.max(u-l,d-f)/2,cap:Math.max(4,Math.min(24,Math.round(a/50)+Math.floor(s/10))),guarnicao:[],civis:0,sos:!1,integridade:100,removido:!1})}}function Mo(n,t,e){let i=n.pts,s=i.length/2,r=!1;for(let o=0,a=s-1;o<s;a=o++){let c=i[o*2],h=i[o*2+1],l=i[a*2],u=i[a*2+1];h>e!=u>e&&t<(l-c)*(e-h)/(u-h)+c&&(r=!r)}return r}function pu(){Le.fill(-1);for(let n of Ue){if(n.removido)continue;let t=Math.max(0,Math.floor(n.z0/Ae)),e=Math.min(Re-1,Math.floor(n.z1/Ae)),i=Math.max(0,Math.floor(n.x0/Ae)),s=Math.min(Ft-1,Math.floor(n.x1/Ae)),r=!1;for(let o=t;o<=e;o++){let a=(o+.5)*Ae;for(let c=i;c<=s;c++)Mo(n,(c+.5)*Ae,a)&&(Le[o*Ft+c]=n.id,r=!0)}if(!r){let o=pi(n.cx,n.cz);o>=0&&(Le[o]=n.id)}}for(let n=0;n<He.length;n++)He[n]===Te.PREDIO&&Le[n]<0&&(He[n]=Te.CHAO)}function mu(n,t,e){for(let i of Ue)!i.removido&&Math.hypot(i.cx-n,i.cz-t)<e+i.raio*.3&&(i.removido=!0)}var Cr=3.6,fu=3.4,Je=4;function cc(n){let t=n>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Y_(n){let e=document.createElement("canvas"),i=document.createElement("canvas");e.width=e.height=i.width=i.height=256;let s=e.getContext("2d"),r=i.getContext("2d"),o=cc(n==="vidro"?7:n==="concreto"?11:23);r.fillStyle="#000",r.fillRect(0,0,256,256);let a=256/Je;if(n==="vidro"){for(let l=0;l<Je;l++)for(let u=0;u<Je;u++){let f=u*a,d=l*a,p=s.createLinearGradient(f,d,f+a,d+a),v=.85+o()*.25;p.addColorStop(0,`rgb(${150*v|0},${178*v|0},${200*v|0})`),p.addColorStop(1,`rgb(${92*v|0},${118*v|0},${142*v|0})`),s.fillStyle=p,s.fillRect(f,d,a,a),s.fillStyle="rgba(255,255,255,0.18)",s.fillRect(f+a*.12,d+4,a*.18,a-10),o()<.35&&(r.fillStyle=`rgb(255,${220+o()*30|0},${150+o()*60|0})`,r.fillRect(f+3,d+6,a-6,a-12))}s.fillStyle="#d7dde2";for(let l=0;l<=Je;l++)s.fillRect(0,l*a-3,256,6);s.fillStyle="#aeb8c0";for(let l=0;l<=Je*2;l++)s.fillRect(l*a/2-1,0,2,256)}else if(n==="concreto"){s.fillStyle="#f2f0ec",s.fillRect(0,0,256,256);for(let l=0;l<1400;l++)s.fillStyle=`rgba(0,0,0,${o()*.05})`,s.fillRect(o()*256,o()*256,2,2);for(let l=0;l<Je;l++)for(let u=0;u<Je;u++){let f=u*a,d=l*a;s.fillStyle="#d9d6d0",s.fillRect(f+6,d+a*.72,a-12,4),s.fillStyle="#3c4a57",s.fillRect(f+9,d+a*.2,a-18,a*.52),s.fillStyle="rgba(160,190,215,0.55)",s.fillRect(f+9,d+a*.2,(a-18)*.45,a*.52),o()<.3&&(s.fillStyle="#e8e2d2",s.fillRect(f+9,d+a*.2,a-18,a*.52*o())),s.fillStyle="#9aa0a6",s.fillRect(f+a/2-1,d+a*.2,2,a*.52),o()<.4&&(r.fillStyle=`rgb(255,${200+o()*40|0},${120+o()*60|0})`,r.fillRect(f+9,d+a*.2,a-18,a*.52))}s.fillStyle="rgba(0,0,0,0.12)";for(let l=0;l<Je;l++)s.fillRect(0,l*a+a-3,256,3)}else{s.fillStyle="#ffffff",s.fillRect(0,0,256,256);for(let l=0;l<900;l++)s.fillStyle=`rgba(0,0,0,${o()*.04})`,s.fillRect(o()*256,o()*256,2,2);for(let l=0;l<Je;l++)for(let u=0;u<Je;u++){let f=u*a,d=l*a;s.fillStyle="rgba(0,0,0,0.25)",s.fillRect(f+8,d+a*.22+4,a-16,5),s.fillStyle="#fafafa",s.fillRect(f+6,d+a*.2,a-12,5),s.fillStyle="#2f4a5a",s.fillRect(f+14,d+a*.3,a-28,a*.42),s.fillStyle="rgba(170,210,230,0.5)",s.fillRect(f+14,d+a*.3,(a-28)*.4,a*.42),s.fillStyle="#ffffff",s.fillRect(f+a/2-1.5,d+a*.3,3,a*.42),o()<.45&&(r.fillStyle=`rgb(255,${190+o()*50|0},${110+o()*60|0})`,r.fillRect(f+14,d+a*.3,a-28,a*.42))}s.fillStyle="rgba(0,0,0,0.08)",s.fillRect(0,248,256,8)}let c=new Nn(e),h=new Nn(i);for(let l of[c,h])l.wrapS=l.wrapT=Gn,l.anisotropy=8,l.colorSpace=Ie;return{t:c,te:h}}function $_(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),i=cc(5);e.fillStyle="#8f8c86",e.fillRect(0,0,128,128);for(let r=0;r<2600;r++){let o=100+i()*90|0;e.fillStyle=`rgb(${o},${o-2},${o-6})`,e.fillRect(i()*128,i()*128,1+i()*2,1+i()*2)}e.strokeStyle="rgba(60,60,60,0.25)",e.lineWidth=1;for(let r=0;r<=4;r++)e.beginPath(),e.moveTo(r*32,0),e.lineTo(r*32,128),e.stroke();let s=new Nn(t);return s.wrapS=s.wrapT=Gn,s.anisotropy=8,s.colorSpace=Ie,s}function Z_(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),i=cc(31);e.fillStyle="#ffffff",e.fillRect(0,0,128,128);for(let r=0;r<128;r+=16){for(let o=r/16%2?-8:0;o<128;o+=16){let a=210+i()*45|0;e.fillStyle=`rgb(${a},${a},${a})`,e.beginPath(),e.ellipse(o+8,r+9,8,9,0,0,Math.PI),e.fill(),e.fillRect(o,r,16,9)}e.fillStyle="rgba(0,0,0,0.35)",e.fillRect(0,r+14,128,2)}let s=new Nn(t);return s.wrapS=s.wrapT=Gn,s.anisotropy=8,s.colorSpace=Ie,s}function J_(){let t=document.createElement("canvas"),e=document.createElement("canvas");t.width=t.height=e.width=e.height=256;let i=t.getContext("2d"),s=e.getContext("2d"),r=cc(41);s.fillStyle="#000",s.fillRect(0,0,256,256),i.fillStyle="#c9c4bc",i.fillRect(0,0,256,256);for(let h=0;h<256;h+=6)for(let l=h/6%2?-6:0;l<256;l+=12){let u=.85+r()*.3;i.fillStyle=`rgb(${255*u|0},${230*u|0},${220*u|0})`,i.fillRect(l+1,h+1,10,4)}let o=256/Je;for(let h=0;h<Je;h++)for(let l=0;l<Je;l++){let u=l*o,f=h*o;i.fillStyle="#efece6",i.fillRect(u+12,f+o*.18,o-24,o*.6),i.fillStyle="#2e3a44",i.fillRect(u+15,f+o*.21,o-30,o*.54),i.fillStyle="rgba(150,180,205,0.5)",i.fillRect(u+15,f+o*.21,(o-30)*.45,o*.54),i.fillStyle="#efece6",i.fillRect(u+o/2-1,f+o*.21,2,o*.54),i.fillRect(u+15,f+o*.47,o-30,2),i.fillStyle="#e4ded4",i.fillRect(u+10,f+o*.78,o-20,4),r()<.4&&(s.fillStyle=`rgb(255,${200+r()*40|0},${120+r()*50|0})`,s.fillRect(u+15,f+o*.21,o-30,o*.54))}let a=new Nn(t),c=new Nn(e);for(let h of[a,c])h.wrapS=h.wrapT=Gn,h.anisotropy=8,h.colorSpace=Ie;return{t:a,te:c}}var j_=[14191212,14916218,13599334,15380622,15786696,13072994],h0=[11882542,11028010,12607546,10242608,6975348,5200482],K_=[16238540,12576988,16246694,12573938,16184042,16373682,14470128,16777215,13234406,16765148],Q_=[15134967,13821167,14281704,15329778,15921906,13163496,14674399],ty=[15789026,14933458,16250094,14209477,15525080,15327439],Ni={};function gu(n){let t=["vidro","concreto","deco"];for(let h of t){let{t:l,te:u}=Y_(h);Ni[h]=new tn({vertexColors:!0,map:l,emissiveMap:u,emissive:16777215,emissiveIntensity:0})}Ni.telhado=new tn({vertexColors:!0,map:$_()}),Ni.telha=new tn({vertexColors:!0,map:Z_()});{let{t:h,te:l}=J_();Ni.tijolo=new tn({vertexColors:!0,map:h,emissiveMap:l,emissive:16777215,emissiveIntensity:0})}let e=700,i=new Map,s=h=>{let l=i.get(h);return l||(l={pos:[],nor:[],col:[],uv:[]},i.set(h,l)),l},r=new Ht,o=(h,l,u,f,d,p,v,m,g,M,_,y,R,w,A)=>{h.pos.push(l,p,u,f,p,d,f,v,d,l,p,u,f,v,d,l,v,u);for(let b=0;b<6;b++)h.nor.push(m,0,g),h.col.push(y,R,w);let I=p/A,S=v/A;h.uv.push(M,I,_,I,_,S,M,I,_,S,M,S)},a=(h,l,u,f,d,p,v,m)=>{let g=l-f/2,M=l+f/2,_=u-d/2,y=u+d/2,R=p+v,w=[[g,y,M,y,0,1],[M,y,M,_,1,0],[M,_,g,_,0,-1],[g,_,g,y,-1,0]];for(let[A,I,S,b,P,L]of w)o(h,A,I,S,b,p,R,P,L,0,.3,m,m,m*.98,6);h.pos.push(g,R,_,g,R,y,M,R,y,g,R,_,M,R,y,M,R,_);for(let A=0;A<6;A++)h.nor.push(0,1,0),h.col.push(m*1.05,m*1.05,m*1.03);h.uv.push(0,0,0,.2,.2,.2,0,0,.2,.2,.2,0)};for(let h of Ue){if(h.removido)continue;let l=Math.floor(h.cx/e)+","+Math.floor(h.cz/e),u=h.pts.length/2,f=h.h,d=h.pts,p=h.id*2654435761>>>0,v=null;if(f<11&&u>=4&&u<=6&&h.area<900){let S=[],b=[],P=0,L=0;for(let tt=0;tt<u;tt++){let ut=(tt+1)%u,Et=Math.hypot(d[ut*2]-d[tt*2],d[ut*2+1]-d[tt*2+1]);Et>L&&(L=Et,P=tt)}let U=(P+1)%u,D=(d[U*2]-d[P*2])/L,W=(d[U*2+1]-d[P*2+1])/L,H=1e9,Q=-1e9,V=1e9,Z=-1e9;for(let tt=0;tt<u;tt++){let ut=d[tt*2]-h.cx,Et=d[tt*2+1]-h.cz,Y=ut*D+Et*W,F=-ut*W+Et*D;H=Math.min(H,Y),Q=Math.max(Q,Y),V=Math.min(V,F),Z=Math.max(Z,F)}let j=(Q-H)*(Z-V);h.area/j>.82&&Z-V>4&&(v={ux:D,uz:W,a0:H,a1:Q,b0:V,b1:Z})}let m=f>45?"vidro":f>14?p%3===0&&f<30?"tijolo":"concreto":v&&p%2===0?"tijolo":"deco",g=m==="vidro"?Q_:m==="concreto"?ty:m==="tijolo"?j_:K_;r.setHex(g[p%g.length]),h.cor=r.getHex();let M=s(l+","+m),_=s(l+",telhado"),y=f>6&&!v&&xe>=1?1.1:0,R=p%7*Cr;for(let S=0;S<u;S++){let b=(S+1)%u,P=d[S*2],L=d[S*2+1],U=d[b*2],D=d[b*2+1],W=U-P,H=D-L,Q=Math.hypot(W,H)||1,V=-H/Q,Z=W/Q,j=Math.max(1,Math.round(Q/Cr)),tt=R/(Cr*Je),ut=(R+j*Cr)/(Cr*Je);if(R+=j*Cr,xe===0)o(M,P,L,U,D,0,f,V,Z,tt,ut,r.r,r.g,r.b,fu*Je);else{let Et=Math.min(f,4);o(M,P,L,U,D,0,Et,V,Z,tt,ut,r.r*.8,r.g*.8,r.b*.82,fu*Je),f>Et&&o(M,P,L,U,D,Et,f,V,Z,tt,ut,r.r,r.g,r.b,fu*Je)}y&&(o(_,P,L,U,D,f,f+y,V,Z,tt*3,ut*3,r.r*.92,r.g*.92,r.b*.92,8),o(_,U,D,P,L,f,f+y,-V,-Z,tt*3,ut*3,r.r*.7,r.g*.7,r.b*.7,8))}if(v){let S=s(l+",telha"),{ux:b,uz:P}=v,L=.5,U=v.a0-L,D=v.a1+L,W=v.b0-L,H=v.b1+L,Q=Math.min(4,(H-W)*.38),V=(W+H)/2,Z=(F,st,nt)=>[h.cx+F*b-st*P,nt,h.cz+F*P+st*b],j=new Ht(h0[(p>>4)%h0.length]),tt=(F,st,nt,vt,At)=>{let _t=[st[0]-F[0],st[1]-F[1],st[2]-F[2]],Gt=[nt[0]-F[0],nt[1]-F[1],nt[2]-F[2]],et=_t[1]*Gt[2]-_t[2]*Gt[1],ct=_t[2]*Gt[0]-_t[0]*Gt[2],z=_t[0]*Gt[1]-_t[1]*Gt[0];if(ct<0){let ot=st;st=nt,nt=ot,et=-et,ct=-ct,z=-z;let yt=At[1];At[1]=At[2],At[2]=yt}let It=Math.hypot(et,ct,z)||1;for(let[ot,yt]of[[F,At[0]],[st,At[1]],[nt,At[2]]])S.pos.push(...ot),S.nor.push(et/It,ct/It,z/It),S.col.push(vt[0],vt[1],vt[2]),S.uv.push(yt[0],yt[1])},ut=[j.r,j.g,j.b],Et=1/2.2,Y=Math.hypot(Q,(H-W)/2)/2.2;for(let[F,st]of[[W,1],[H,-1]]){let nt=Z(U,F,f),vt=Z(D,F,f),At=Z(D,V,f+Q),_t=Z(U,V,f+Q);tt(nt,vt,At,ut,[[0,0],[(D-U)*Et,0],[(D-U)*Et,Y]]),tt(nt,At,_t,ut,[[0,0],[(D-U)*Et,Y],[0,Y]])}for(let F of[v.a0,v.a1]){let st=Z(F,v.b0,f),nt=Z(F,v.b1,f),vt=Z(F,V,f+Q*.95),At=F===v.a0?-1:1,_t=b*At,Gt=P*At;for(let et of[st,nt,vt])M.pos.push(...et),M.nor.push(_t,0,Gt),M.col.push(r.r,r.g,r.b),M.uv.push(.02,.02);for(let et of[st,vt,nt])M.pos.push(...et),M.nor.push(_t,0,Gt),M.col.push(r.r,r.g,r.b),M.uv.push(.02,.02)}continue}let w=[];for(let S=0;S<u;S++)w.push(new at(d[S*2],d[S*2+1]));let A;try{A=fi.triangulateShape(w,[])}catch{A=[]}let I=.85+(p>>8)%20/100;for(let S of A){let[b,P,L]=S;if((w[P].x-w[b].x)*(w[L].y-w[b].y)-(w[P].y-w[b].y)*(w[L].x-w[b].x)>0){let D=P;P=L,L=D}for(let D of[b,P,L])_.pos.push(w[D].x,f,w[D].y),_.nor.push(0,1,0),_.col.push(I,I,I*.98),_.uv.push(w[D].x/8,w[D].y/8)}if(xe>=1&&f>8&&h.area>150){let S=1+p%3+(f>40?2:0);for(let b=0;b<S;b++){let P=(p>>b*3)%628/100,L=h.raio*.25*(b%3/2),U=h.cx+Math.sin(P)*L,D=h.cz+Math.cos(P)*L;if(!Mo(h,U,D))continue;let W=f>40&&b===0;a(_,U,D,W?8:2.2+b%2,W?8:1.6+b%2,f,W?4:1.4,W?.8:.72)}}}let c=[];for(let[h,l]of i){let u=h.split(",")[2],[f,d]=h.split(",").map(Number),p=new me;p.setAttribute("position",new Vt(l.pos,3)),p.setAttribute("normal",new Vt(l.nor,3)),p.setAttribute("color",new Vt(l.col,3)),p.setAttribute("uv",new Vt(l.uv,2)),p.computeBoundingSphere();let v=new ae(p,Ni[u]);v.matrixAutoUpdate=!1,v.updateMatrix(),v.castShadow=xe>=1,v.receiveShadow=xe>=1,v.userData.cx=(f+.5)*e,v.userData.cz=(d+.5)*e,v.name="predios",n.add(v),c.push(v)}return c}var ey=[[44,104,140],[205,200,188],[86,88,94],[96,146,70],[232,214,164],[170,168,160],[110,110,114],[86,88,94]];function xu(n=1){let t=document.createElement("canvas");t.width=Math.ceil(Ft/n),t.height=Math.ceil(Re/n);let e=t.getContext("2d"),i=e.createImageData(t.width,t.height),s=i.data;for(let r=0;r<t.height;r++)for(let o=0;o<t.width;o++){let a=Math.min(Re-1,r*n)*Ft+Math.min(Ft-1,o*n),c=Le[a]>=0?5:He[a],h=ey[c],l=(r*t.width+o)*4;s[l]=h[0],s[l+1]=h[1],s[l+2]=h[2],s[l+3]=255}return e.putImageData(i,0,0),t}function ny(){let n=Ft*Re,t=new Uint8Array(n);for(let c=0;c<n;c++)t[c]=ac(He[c])&&Le[c]<0?1:0;let e=new Uint16Array(n),i=new Uint16Array(n);for(let c=0;c<Re;c++){let h=0;for(;h<Ft;){if(!t[c*Ft+h]){h++;continue}let l=h;for(;l<Ft&&t[c*Ft+l];)l++;for(let u=h;u<l;u++)e[c*Ft+u]=l-h;h=l}}for(let c=0;c<Ft;c++){let h=0;for(;h<Re;){if(!t[h*Ft+c]){h++;continue}let l=h;for(;l<Re&&t[l*Ft+c];)l++;for(let u=h;u<l;u++)i[u*Ft+c]=l-h;h=l}}let s=8,r=c=>e[c]>=s&&i[c]>=s,o=new Uint8Array(n*4);for(let c=3;c<Re-3;c++)for(let h=3;h<Ft-3;h++){let l=c*Ft+h;if(!t[l]||r(l))continue;let u=-1;if(i[l]>=s&&e[l]<s&&e[l]>=3&&(r(l-Ft)||r(l+Ft))?u=0:e[l]>=s&&i[l]<s&&i[l]>=3&&(r(l-1)||r(l+1))&&(u=1),u<0)continue;let f=!1;for(let d=-6;d<=6&&!f;d+=3)for(let p=-6;p<=6;p+=3){let v=l+d*Ft+p;if(v>=0&&v<n&&Le[v]>=0){f=!0;break}}f&&(o[l*4+u]=255)}let a=c=>He[c]===Te.CENTRO;for(let c=2;c<Re-2;c++)for(let h=2;h<Ft-2;h++){let l=c*Ft+h;if(!a(l)||r(l)||o[l*4]||o[l*4+1])continue;let u=0,f=0,d=0,p=0;for(let v=-3;v<=3;v++)(a(l+v)||a(l+v-Ft)||a(l+v+Ft))&&u++,(a(l+v*Ft)||a(l+v*Ft-1)||a(l+v*Ft+1))&&f++,a(l+v)&&d++,a(l+v*Ft)&&p++;u>=6&&p<=3&&d>=p&&!o[(l-Ft)*4+2]?o[l*4+2]=255:f>=6&&d<=3&&p>d&&!o[(l-1)*4+3]&&(o[l*4+3]=255)}return o}function vu(n){let t=new Uint8Array(Ft*Re*4);for(let c=0;c<Ft*Re;c++){let h=He[c],l=c*4;t[l]=h===Te.RUA||h===Te.PONTE||h===Te.CENTRO?255:0,t[l+1]=h===Te.PARQUE?255:0,t[l+2]=h===Te.AREIA||h===Te.CENTRO?255:0,t[l+3]=Le[c]>=0?255:0}let e=new As(t,Ft,Re,vn,Un);e.magFilter=mn,e.minFilter=mn,e.needsUpdate=!0;let i=new As(ny(),Ft,Re,vn,Un);i.magFilter=ln,i.minFilter=ln,i.needsUpdate=!0;let s=new tn({color:16777215});s.onBeforeCompile=c=>{c.uniforms.mapa={value:e},c.uniforms.marcas={value:i},c.uniforms.tam={value:new at(Oe,ke)},c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vW = (modelMatrix * vec4(transformed, 1.0)).xyz;`),c.fragmentShader=c.fragmentShader.replace("#include <common>",`#include <common>
      uniform sampler2D mapa; uniform sampler2D marcas; uniform vec2 tam; varying vec3 vW;
      ${xe===0?`float ru(vec2 p){ return 0.5; }
      float fbm(vec2 p){ return 0.5; }`:`float h1(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float ru(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(h1(i), h1(i+vec2(1,0)), u.x), mix(h1(i+vec2(0,1)), h1(i+vec2(1,1)), u.x), u.y); }
      float fbm(vec2 p){ return ru(p)*0.5 + ru(p*2.07)*0.3 + ru(p*4.13)*0.2; }`}`).replace("#include <map_fragment>",`
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
      }`)};let r=new es(Oe,ke,48,28);r.rotateX(-Math.PI/2),r.translate(Oe/2,0,ke/2);let o=new ae(r,s);o.name="chao",o.receiveShadow=!0,n.add(o);let a=new ae(new es(8e4,8e4).rotateX(-Math.PI/2),new Dn({color:We?997946:9276032}));return a.position.set(Oe/2,-4,ke/2),n.add(a),o}function _u(n){let t=new Uint8Array(Ft*Re);for(let a=0;a<t.length;a++)t[a]=He[a]===Te.AGUA?255:0;let e=new As(t,Ft,Re,_o,Un);e.magFilter=mn,e.minFilter=mn,e.needsUpdate=!0;let i={value:0},s=new xo({color:16777215,transparent:!0,depthWrite:!1,shininess:90,specular:5596774,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4});s.onBeforeCompile=a=>{a.uniforms.mascara={value:e},a.uniforms.tam={value:new at(Oe,ke)},a.uniforms.tempo=i,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vW = (modelMatrix * vec4(transformed, 1.0)).xyz;`),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
      uniform sampler2D mascara; uniform vec2 tam; uniform float tempo; varying vec3 vW;
      ${xe===0?"float rua2(vec2 p){ return 0.45 + 0.1 * sin(p.x * 3.0 + p.y * 2.0); }":`float h1a(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
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
      }`)};let r=new es(Oe+3e4,ke+3e4,64,48);r.rotateX(-Math.PI/2);let o=new ae(r,s);return o.position.set(Oe/2,.3,ke/2),o.renderOrder=1,o.receiveShadow=!0,o.userData.tempo=i,n.add(o),o}function Ir(n,t){let e=n.attributes.position.count,i=new Float32Array(e*3);for(let s=0;s<e;s++){let r=t(n.attributes.position.getY(s),s);i[s*3]=r[0],i[s*3+1]=r[1],i[s*3+2]=r[2]}return n.setAttribute("color",new ue(i,3)),n.attributes.uv&&n.deleteAttribute("uv"),n}function iy(){let n=[],t=[],e=xe>=2?6:3;for(let o=0;o<e;o++){let a=9.5/e,c=new Bn(.19-o*.02,.22-o*.02,a*1.03,5,1,!0).toNonIndexed(),h=(o/e)**2*.9;c.rotateZ(-.06*o/e),c.translate(h,a/2+o*a,0);let l=o%2?.86:1;n.push(Ir(c,u=>[.62*l,.5*l,.36*l]))}let i=.9,s=9.6;for(let o=0;o<(xe>=2?4:0);o++){let a=new Xn(.16,6,4).toNonIndexed();a.translate(i+Math.cos(o*1.6)*.22,s-.25,Math.sin(o*1.6)*.22),n.push(Ir(a,()=>[.42,.33,.12]))}let r=xe>=2?10:xe===1?8:7;for(let o=0;o<r;o++){let a=o/r*Math.PI*2+o%2*.25,c=4+o%3*.6,h=.25+o%4*.18+(o>=8?.35:-.1),l=[],u=xe>=2?5:2,f=[],d=[],p=0,v=0;for(let g=0;g<=u;g++){let M=g/u,_=M*c,y=Math.sin(M*1.2)*.9-M*M*c*h,R=Math.sin(M*Math.PI)*.75+.05;l.push([_,y,R])}for(let g=0;g<u;g++){let[M,_,y]=l[g],[R,w,A]=l[g+1];for(let I of[-1,1]){let S=I*y,b=I*A;f.push(M,_,0,R,w,0,R,w-.25*A,b,M,_,0,R,w-.25*A,b,M,_-.25*y,S);let P=.85+g/u*.3;for(let L=0;L<6;L++)d.push(.24*P,.5*P,.2*P)}}let m=new me;m.setAttribute("position",new Vt(f,3)),m.setAttribute("color",new Vt(d,3)),m.computeVertexNormals(),m.rotateY(a),m.translate(i,s,0),t.push(m)}return{tronco:di(n),folhas:di(t)}}function sy(){let n=[],t=[],e=new Bn(.25,.42,3.4,5,1,!0).toNonIndexed();e.translate(0,1.7,0),n.push(Ir(e,()=>[.42,.33,.24]));for(let s=0;s<(xe>=1?3:0);s++){let r=new Bn(.1,.18,2.2,4,1,!0).toNonIndexed();r.rotateZ(.8),r.rotateY(s*2.1),r.translate(Math.cos(s*2.1)*.6,3.6,-Math.sin(s*2.1)*.6),n.push(Ir(r,()=>[.4,.31,.22]))}let i=[[0,5.4,0,2.6],[1.7,4.8,.6,1.9],[-1.5,4.9,-.7,2],[.4,4.6,-1.8,1.8],[-.6,4.7,1.7,1.8],[.3,6.6,.2,1.7]];for(let[s,r,o,a]of xe>=1?i:[[0,5.2,0,3],[.6,6.4,.3,2]]){let c=new $a(a,0).toNonIndexed();c.scale(1,.8,1),c.translate(s,r,o),t.push(Ir(c,(h,l)=>{let u=.75+(h-3.5)/4*.35+l*7919%13/100;return[.3*u,.47*u,.2*u]}))}return{tronco:di(n),copa:di(t)}}function ry(){for(let n=0;n<60;n++){let t=Math.random()*Oe,e=Math.random()*ke,i=pi(t,e);if(i<0||Le[i]>=0)continue;let s=He[i];if(s===Te.PARQUE&&Math.random()<.6)return{x:t,z:e,tipo:Math.random()<.5?0:1};if(s===Te.AREIA&&Math.random()<.35)return{x:t,z:e,tipo:0};if(s===Te.CHAO){let r=i%Ft,o=i/Ft|0,a=!1;for(let[c,h]of[[1,0],[-1,0],[0,1],[0,-1]]){let l=(o+h)*Ft+r+c;l>=0&&l<He.length&&ac(He[l])&&(a=!0)}if(a&&Math.random()<.5)return{x:t,z:e,tipo:Math.random()<.7?0:1};if(!a&&Math.random()<.04)return{x:t,z:e,tipo:Math.random()<.5?0:1}}}return null}var Pr=400;function yo(n,t,e,i,s,r){let o=new Map;for(let p of i){let v=Math.floor(p.x/Pr)+","+Math.floor(p.z/Pr),m=o.get(v);m||(m=[],o.set(v,m)),m.push(p)}let a=[],c=new se,h=new yn,l=new Be,u=new N,f=new N,d=new Ht;for(let[p,v]of o){let m=new br(t,e,v.length);v.forEach((_,y)=>{l.set(0,_.ang,0),h.setFromEuler(l),c.compose(f.set(_.x,_.y||0,_.z),h,u.set(_.sx,_.sy,_.sz)),m.setMatrixAt(y,c),_.cor?m.setColorAt(y,d.setHex(_.cor)):_.hsl&&m.setColorAt(y,d.setHSL(..._.hsl)),_.malha=m,_.idx=y}),m.computeBoundingSphere(),m.castShadow=s,m.receiveShadow=!1;let[g,M]=p.split(",").map(Number);m.userData.cx=(g+.5)*Pr,m.userData.cz=(M+.5)*Pr,m.userData.tipo=r,n.add(m),a.push(m)}return a}function yu(n,t=2600,e=null){let i=new tn({vertexColors:!0}),s=new tn({vertexColors:!0,side:ti}),r=iy(),o=sy();xe===0&&(t=Math.round(t*.7));let a=Math.round(t*.65),c=t-a,h=[],l=[],u=0;for(;(h.length<a||l.length<c)&&u<t*6;){u++;let v=ry();if(!(!v||e&&e(v.x,v.z))){if(v.tipo===0&&h.length<a){let m=.8+Math.random()*.5;h.push({x:v.x,z:v.z,ang:Math.random()*6.28,sx:m,sy:m*(.9+Math.random()*.3),sz:m,hsl:[.24+Math.random()*.08,.5,.75+Math.random()*.4]})}else if(v.tipo===1&&l.length<c){let m=.75+Math.random()*.6;l.push({x:v.x,z:v.z,ang:Math.random()*6.28,sx:m,sy:m,sz:m,hsl:[.22+Math.random()*.1,.45,.8+Math.random()*.35]})}}}let f=xe>=2,d=h.map(v=>({...v,hsl:null,cor:16777215})),p=l.map(v=>({...v,hsl:null,cor:16777215}));return[...yo(n,r.tronco,i,d,f,"arvore"),...yo(n,r.folhas,s,h,f,"arvore"),...yo(n,o.tronco,i,p,f,"arvore"),...yo(n,o.copa,i,l,f,"arvore")]}var Mu={lista:[]};function bu(n,t=1600,e){let i=[],s=(l,u,f,d,p)=>{let v=l.toNonIndexed();v.translate(f,d,p),i.push(Ir(v,()=>u))};s(new hn(1.8,.62,4.4),[1,1,1],0,.6,0),s(new hn(1.62,.5,2.2),[.95,.95,.95],0,1.15,-.25),s(new hn(1.64,.36,2.04),[.18,.22,.27],0,1.15,-.25),s(new hn(1.7,.42,3.4),[.08,.08,.08],0,.26,0),xe>=1&&(s(new hn(1.2,.12,.05),[2.2,2.1,1.8],0,.7,2.21),s(new hn(1.2,.12,.05),[1.6,.2,.15],0,.75,-2.21));let r=di(i),o=xe>=1?new xo({vertexColors:!0,shininess:60,specular:4473924}):new tn({vertexColors:!0}),a=[15921906,1842204,10133414,11740702,2245242,6975348,14207136,2907706,15251504,5909098,13685976,3817544];xe===0&&(t=Math.round(t*.6));let c=[],h=0;for(;c.length<t&&h<t*80;){h++;let l=1+Math.floor(Math.random()*(Ft-2)),u=1+Math.floor(Math.random()*(Re-2)),f=u*Ft+l;if(He[f]!==Te.RUA||Le[f]>=0)continue;let d=0,p=0;for(let[_,y]of[[1,0],[-1,0],[0,1],[0,-1]]){let R=He[f+y*Ft+_];!ac(R)&&R!==Te.AGUA&&R!==Te.PONTE&&(d=_,p=y)}if(!d&&!p)continue;let v=(l+.5)*Ae+d*.9,m=(u+.5)*Ae+p*.9;if(e&&e(v,m))continue;let g=!1;for(let _=Math.max(0,c.length-40);_<c.length;_++)if(Math.abs(c[_].x-v)<6&&Math.abs(c[_].z-m)<6){g=!0;break}if(g)continue;let M=(d!==0?0:Math.PI/2)+(Math.random()<.5?Math.PI:0)+(Math.random()-.5)*.08;c.push({x:v,z:m,ang:M,sx:1,sy:1,sz:1,cor:a[Math.random()*a.length|0]})}return Mu.lista=c,yo(n,r,o,c,!1,"carro")}function Su(n,t,e){let i=xe===0?1:xe===1?1.4:2,s=e>1600?0:Math.max(300,Math.min(1400,e*1.3*i+200)),r=e>900?0:Math.max(250,Math.min(900,e*1*i+150));for(let o of n){let a=o.userData.tipo==="carro"?r:s,c=o.userData.cx-t.x,h=o.userData.cz-t.z;o.visible=a>0&&c*c+h*h<(a+Pr*.7)*(a+Pr*.7)}}function Eu(n,t,e,i){for(let s of n){let r=s.userData.cx-t.x,o=s.userData.cz-t.z;s.visible=r*r+o*o<(i+400)*(i+400)}}var u0=new se,f0=new yn,d0=new Be,oy=new N,ay=new N;function Tu(n,t,e){let i=0;for(let s of Mu.lista){if(s.esmagado)continue;let r=s.x-n,o=s.z-t;r*r+o*o<e*e&&(s.esmagado=!0,d0.set(0,s.ang,(Math.random()-.5)*.2),f0.setFromEuler(d0),u0.compose(ay.set(s.x,-.1,s.z),f0,oy.set(1.08,.35,1.04)),s.malha.setMatrixAt(s.idx,u0),s.malha.instanceMatrix.needsUpdate=!0,i++)}return i}function cy(n,t){let e=(t+180)/360*Math.pow(2,be.z)*256-be.gx0,i=n*Math.PI/180,s=(1-Math.asinh(Math.tan(i))/Math.PI)/2*Math.pow(2,be.z)*256-be.gy0;return{x:e*rs,z:s*rs}}var ht=(n=0,t=1)=>n+Math.random()*(t-n),lc=(n,t)=>Math.floor(ht(n,t+1)),mi=n=>n[Math.floor(Math.random()*n.length)],en=(n,t,e)=>n<t?t:n>e?e:n,m0=(n,t,e)=>n+(t-n)*e,Ye=(n,t,e,i)=>{let s=n-e,r=t-i;return s*s+r*r},Ot=(n,t,e,i)=>Math.sqrt(Ye(n,t,e,i));function Bi(n,t){let e=t-n;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return e}function Ve(n,t,e){let i=Bi(n,t);return Math.abs(i)<=e?t:n+Math.sign(i)*e}var bo=class{constructor(t,e,i,s){this.cel=t,this.nx=Math.ceil(e/t)+1,this.nz=Math.ceil(i/t)+1,this.head=new Int32Array(this.nx*this.nz).fill(-1),this.next=new Int32Array(s),this.itens=[],this.usadas=[]}chave(t,e){let i=Math.floor(t/this.cel),s=Math.floor(e/this.cel);return i<0?i=0:i>=this.nx&&(i=this.nx-1),s<0?s=0:s>=this.nz&&(s=this.nz-1),s*this.nx+i}limpar(){for(let t of this.usadas)this.head[t]=-1;this.usadas.length=0,this.itens.length=0}add(t){let e=this.itens.length;if(e>=this.next.length){let s=new Int32Array(this.next.length*2);s.set(this.next),this.next=s}this.itens.push(t);let i=this.chave(t.x,t.z);this.head[i]===-1&&this.usadas.push(i),this.next[e]=this.head[i],this.head[i]=e}busca(t,e,i,s){let r=this.cel,o=Math.max(0,Math.floor((t-i)/r)),a=Math.min(this.nx-1,Math.floor((t+i)/r)),c=Math.max(0,Math.floor((e-i)/r)),h=Math.min(this.nz-1,Math.floor((e+i)/r)),l=i*i;for(let u=c;u<=h;u++)for(let f=o;f<=a;f++){let d=this.head[u*this.nx+f];for(;d!==-1;){let p=this.itens[d],v=p.x-t,m=p.z-e,g=v*v+m*m;if(g<=l&&s(p,g))return;d=this.next[d]}}}maisProximo(t,e,i,s){let r=null,o=1/0;return this.busca(t,e,i,(a,c)=>{c<o&&(!s||s(a))&&(o=c,r=a)}),r}contar(t,e,i,s){let r=0;return this.busca(t,e,i,o=>{(!s||s(o))&&r++}),r}};function Au(n,t=!0){let e=n[0].length,i=n.length,s=[],r=[],o=[],a=0;for(let m=0;m<i;m++){if(m>0){let M=0;for(let _=0;_<e;_++){let y=n[m][_],R=n[m-1][_];M+=Math.hypot(y[0]-R[0],y[1]-R[1],y[2]-R[2])}a+=M/e}let g=0;for(let M=0;M<e;M++){let _=n[m][M];if(M>0){let y=n[m][M-1];g+=Math.hypot(_[0]-y[0],_[1]-y[1],_[2]-y[2])}s.push(_[0],_[1],_[2]),r.push(g/2.2,a/2.2)}}for(let m=0;m<i-1;m++)for(let g=0;g<e;g++){let M=m*e+g,_=m*e+(g+1)%e,y=(m+1)*e+g,R=(m+1)*e+(g+1)%e;o.push(M,y,_,_,y,R)}let c=new me;c.setAttribute("position",new Vt(s,3)),c.setAttribute("uv",new Vt(r,2)),c.setIndex(o);let h=0,l=0,u=0;for(let m=0;m<s.length;m+=3)h+=s[m],l+=s[m+1],u+=s[m+2];let f=s.length/3;h/=f,l/=f,u/=f;let d=0;for(let m=0;m<o.length;m+=3){let g=o[m]*3,M=o[m+1]*3,_=o[m+2]*3,y=s[g]-h,R=s[g+1]-l,w=s[g+2]-u,A=s[M]-h,I=s[M+1]-l,S=s[M+2]-u,b=s[_]-h,P=s[_+1]-l,L=s[_+2]-u;d+=y*(I*L-S*P)-R*(A*L-S*b)+w*(A*P-I*b)}let p=d<0;if(p){for(let m=0;m<o.length;m+=3){let g=o[m+1];o[m+1]=o[m+2],o[m+2]=g}c.setIndex(o)}if(c.computeVertexNormals(),c=c.toNonIndexed(),!t)return c;let v=[c];for(let[m,g]of[[0,-1],[i-1,1]]){let M=n[m],_=0,y=0,R=0;for(let b of M)_+=b[0],y+=b[1],R+=b[2];_/=e,y/=e,R/=e;let w=0;for(let b of M)w=Math.max(w,Math.hypot(b[0]-_,b[1]-y,b[2]-R));if(w<.001)continue;let A=[],I=[];for(let b=0;b<e;b++){let P=M[b],L=M[(b+1)%e],U=[[_,y,R],P,L];g<0!==p&&(U=[[_,y,R],L,P]);for(let D of U)A.push(D[0],D[1],D[2]),I.push(.5,.5)}let S=new me;S.setAttribute("position",new Vt(A,3)),S.setAttribute("uv",new Vt(I,2)),S.computeVertexNormals(),v.push(S)}return ly(v)}function ly(n){let t=0;for(let a of n)t+=a.attributes.position.count;let e=new Float32Array(t*3),i=new Float32Array(t*3),s=new Float32Array(t*2),r=0;for(let a of n)e.set(a.attributes.position.array,r*3),i.set(a.attributes.normal.array,r*3),s.set(a.attributes.uv.array,r*2),r+=a.attributes.position.count;let o=new me;return o.setAttribute("position",new ue(e,3)),o.setAttribute("normal",new ue(i,3)),o.setAttribute("uv",new ue(s,2)),o}var hc=(n,t)=>Math.sign(n)*Math.pow(Math.abs(n),2/t);function hy(n,t,e){var s,r,o,a,c,h;let i=[];for(let l=0;l<e;l++){let u=-Math.PI/2+l/e*Math.PI*2,f=Math.cos(u),d=Math.sin(u),p=d>=0?(r=(s=t.nT)!=null?s:t.n)!=null?r:2.4:(a=(o=t.nB)!=null?o:t.n)!=null?a:2.4,v=(f>=0?(c=t.wR)!=null?c:t.w:(h=t.wL)!=null?h:t.w)/2;i.push([(t.x||0)+v*hc(f,p),(t.y||0)+(d>=0?t.hT:t.hB)*hc(d,p),n])}return i}function Jt(n,t=18,e=!0){return Au(n.map(i=>hy(i.z,i,t)),e)}function So(n,t=14,e=!0){return Au(n.map(i=>{var r;let s=[];for(let o=0;o<t;o++){let a=o/t*Math.PI*2,c=Math.cos(a),h=Math.sin(a),l=(r=i.n)!=null?r:2.2;s.push([(i.x||0)+i.w/2*hc(c,l),i.y,(i.z||0)+(h>=0?i.f:i.t)*hc(h,l)])}return s}),e)}function je(n,t,e=null,i=9){if(!e){let r=t.p[0]-n.p[0],o=t.p[1]-n.p[1],a=t.p[2]-n.p[2],c=o,h=-r,l=0,u=Math.hypot(c,h,l)||1;e=[c/u,h/u,l/u],(e[1]<0||Math.abs(e[1])<1e-6&&e[0]<0)&&(e=e.map(f=>-f))}let s=r=>{var f;let[o,a,c]=r.p,h=r.corda,l=(f=r.esp)!=null?f:.08,u=[];for(let d=0;d<i*2;d++){let p=d<i,v=p?1-d/(i-1):(d-i)/(i-1),m=Math.pow(v,1.6),g=5*l*(.2969*Math.sqrt(m)-.126*m-.3516*m*m+.2843*m**3-.1036*m**4),M=(p?1:-1)*g*h;u.push([o+e[0]*M,a+e[1]*M,c-m*h+e[2]*M])}return u};return Au([s(n),s(t)],!0)}var g0=new se,x0=new yn,v0=new Be,uy=new N,fy=new N,uc=new Ht;function dy(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d");e.fillStyle="#f4f4f4",e.fillRect(0,0,128,128);let i=9,s=()=>(i=i*1664525+1013904223>>>0,i/4294967296);for(let a=0;a<900;a++){let c=200+s()*55|0;e.fillStyle=`rgba(${c},${c},${c},0.5)`,e.fillRect(s()*128,s()*128,1+s()*3,1+s()*3)}let r=e.createLinearGradient(0,0,0,128);r.addColorStop(0,"rgba(90,70,40,0.0)"),r.addColorStop(1,"rgba(90,70,40,0.18)"),e.fillStyle=r,e.fillRect(0,0,128,128),e.strokeStyle="rgba(0,0,0,0.18)",e.lineWidth=1.5,e.strokeRect(1,1,126,126),e.strokeStyle="rgba(255,255,255,0.12)",e.lineWidth=1,e.strokeRect(3.5,3.5,121,121),e.fillStyle="rgba(0,0,0,0.18)";for(let a=10;a<128;a+=20)e.fillRect(a,6,2,2),e.fillRect(a,120,2,2),e.fillRect(6,a,2,2),e.fillRect(120,a,2,2);let o=new Nn(t);return o.wrapS=o.wrapT=Gn,o.anisotropy=4,o.colorSpace=Ie,o}var _0=dy(),Ru=null,Cu=null;function fc(){return Ru||(Ru=xe===0?new tn({vertexColors:!0,map:_0}):new go({vertexColors:!0,map:_0,roughness:.52,metalness:.32,envMapIntensity:.9})),Ru}function py(){return Cu||(Cu=xe===0?new tn({color:1845299}):new go({color:1713714,roughness:.06,metalness:.9,envMapIntensity:1.6})),Cu}function S0(n,t){if(xe===0)return;let e=new Mr,i=new Xn(10,32,16),s=new Mn({side:cn,vertexShader:"varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`varying vec3 vP; void main(){
      float h = normalize(vP).y;
      vec3 c = h > 0.0 ? mix(vec3(0.85,0.9,0.95), vec3(0.38,0.6,0.88), pow(h, 0.6)) : mix(vec3(0.62,0.6,0.55), vec3(0.3,0.3,0.28), pow(-h, 0.5));
      // sol
      vec3 s = normalize(vec3(-0.5, 0.75, 0.4));
      c += vec3(1.0,0.9,0.7) * pow(max(0.0, dot(normalize(vP), s)), 300.0) * 6.0;
      gl_FragColor = vec4(c, 1.0);
    }`});e.add(new ae(i,s));let r=new yr(n);t.environment=r.fromScene(e,.02).texture,r.dispose()}var Eo=new tn({vertexColors:!0,transparent:!0,opacity:.8}),zt=class{constructor(){this.g=[]}add(t,e,i=0,s=0,r=0,o=0,a=0,c=0,h=1,l=1,u=1,f=0){let d=t.index?t.toNonIndexed():t;if(d.attributes.uv||d.setAttribute("uv",new ue(new Float32Array(d.attributes.position.count*2),2)),f){let m=d.attributes.uv.array;for(let g=0;g<m.length;g++)m[g]*=f}v0.set(o,a,c),x0.setFromEuler(v0),g0.compose(fy.set(i,s,r),x0,uy.set(h,l,u)),d.applyMatrix4(g0),uc.set(e);let p=d.attributes.position.count,v=new Float32Array(p*3);for(let m=0;m<p;m++)v[m*3]=uc.r,v[m*3+1]=uc.g,v[m*3+2]=uc.b;return d.setAttribute("color",new ue(v,3)),d.attributes.uv1&&d.deleteAttribute("uv1"),this.g.push(d),this}box(t,e,i,s,r,o,a,c,h,l){return this.add(new hn(t,e,i),s,r,o,a,c,h,l)}cil(t,e,i,s,r,o,a,c,h,l,u){return this.add(new Bn(t,e,i,s),r,o,a,c,h,l,u)}esf(t,e,i,s,r,o=1,a=1,c=1){return this.add(new Xn(t,12,8),e,i,s,r,0,0,0,o,a,c)}planta(t,e,i,s=0,r=0){let o=new bn;o.moveTo(t[0][0],t[0][1]);for(let c=1;c<t.length;c++)o.lineTo(t[c][0],t[c][1]);o.closePath();let a=new Sr(o,{depth:e,bevelEnabled:r>0,bevelSize:r,bevelThickness:r,bevelSegments:1});return this.add(a,i,0,s+e,0,Math.PI/2,0,0,1,1,1,.25)}simetrica(t,e,i,s=0){let r=t.concat(t.slice().reverse().map(([o,a])=>[-o,a]));return this.planta(r,e,i,s)}perfil(t,e,i,s=0,r=.07){let o=new bn;o.moveTo(t[0][0],t[0][1]);for(let h=1;h<t.length;h++)o.lineTo(t[h][0],t[h][1]);o.closePath();let a=Math.min(r,e*.2),c=new Sr(o,{depth:e-2*a,bevelEnabled:a>0,bevelSize:a,bevelThickness:a,bevelSegments:2});return c.translate(0,0,a),this.add(c,i,s+e/2,0,0,0,-Math.PI/2,0,1,1,1,.3)}fuso(t,e,i=0,s=0,r=0,o=1,a=1,c=14){let h=t.map(([u,f])=>new at(Math.max(.001,f),u)),l=new Ya(h,c);return l.rotateX(Math.PI/2),l.scale(o,a,1),l.computeVertexNormals(),this.add(l,e,i,s,r,0,0,0,1,1,1,.5)}bloco(t,e,i,s,r=0,o=0,a=0,c=0,h=0,l=0,u=.12){let f=Math.min(u,t/2.2,e/2.2),d=new bn,p=t/2-f,v=e/2-f;d.moveTo(-p,-e/2),d.lineTo(p,-e/2),d.quadraticCurveTo(t/2,-e/2,t/2,-v),d.lineTo(t/2,v),d.quadraticCurveTo(t/2,e/2,p,e/2),d.lineTo(-p,e/2),d.quadraticCurveTo(-t/2,e/2,-t/2,v),d.lineTo(-t/2,-v),d.quadraticCurveTo(-t/2,-e/2,-p,-e/2);let m=Math.min(f,i*.2),g=new Sr(d,{depth:i-2*m,bevelEnabled:m>0,bevelSize:m*.6,bevelThickness:m,bevelSegments:2,curveSegments:3});return g.translate(0,0,-i/2+m),this.add(g,s,r,o,a,c,h,l,1,1,1,.3)}roda(t,e,i,s,r,o){let a=new Er(t*.74,t*.26,8,18);a.scale(1,1,e/(t*.52)*.95),this.add(a,i,s,r,o,0,Math.PI/2,0),this.cil(t*.62,t*.62,e*.7,14,3947832,s,r,o,0,0,Math.PI/2);let c=Math.sign(s)||1;return this.cil(t*.55,t*.55,.04,10,5592911,s+c*e/2,r,o,0,0,Math.PI/2),this.cil(t*.18,t*.22,.12,8,3815990,s+c*(e/2+.05),r,o,0,0,Math.PI/2),this}build(t=!0){let e=di(this.g);if(t){let i=e.attributes.position,s=e.attributes.normal,r=e.attributes.color,o=1/0,a=-1/0;for(let h=0;h<i.count;h++){let l=i.getY(h);l<o&&(o=l),l>a&&(a=l)}let c=Math.max(.5,Math.min(3,a-o));for(let h=0;h<i.count;h++){let l=.62+.38*Math.min(1,(i.getY(h)-o)/c);s.getY(h)>.6?l*=1.08:s.getY(h)<-.6&&(l*=.6),r.setXYZ(h,r.getX(h)*l,r.getY(h)*l,r.getZ(h)*l)}}return e.computeBoundingSphere(),e}},y0={},E0=5923904,T0=4673583,Us=12100727,zr=10390110,Ds=2040100,si=1842204,re=2044994,Pu=8226447,Lr=6252399;var sn=15790314,mt=3422010;var my=16774084,gy=12593182;function Dr(n,t,e,i,s,r){for(let o of t)for(let a of e)n.roda(i,s,si,o,r!=null?r:i,a)}function Iu(n,t,e,i,s=.66,r=!0,o=Us){for(let a of[-1,1]){let c=a*i;n.box(s,.12,t,Ds,c,e,0),n.box(s,.12,t-1.2,Ds,c,.06,0),n.box(s,e*.8,.12,Ds,c,e*.5,t/2-.3,.6),n.box(s,e*.8,.12,Ds,c,e*.5,-t/2+.3,-.6);let h=Math.max(5,Math.round(t/1.1));for(let l=0;l<h;l++)n.roda(e*.34,s*.9,2895402,c,e*.36,-t/2+1+l*(t-2)/(h-1));n.roda(e*.4,s*.95,3158316,c,e*.62,-t/2+.35),n.roda(e*.36,s*.95,3158316,c,e*.6,t/2-.35),r&&n.box(.1,e*.55,t-.6,o,a*(i+s/2+.06),e*.82,0)}}function os(n,t,e,i){for(let s of[-1,1])n.box(.22,.14,.06,my,s*t,e,i)}function as(n,t,e,i){for(let s of[-1,1])n.box(.16,.12,.06,gy,s*t,e,i)}function nn(n,t,e,i,s=2.6){n.cil(.012,.025,s,4,Ds,t,e+s/2,i)}var xy={0:"abcdef",1:"bc",2:"abged",3:"abgcd",4:"fgbc",5:"afgcd",6:"afgedc",7:"abc",8:"abcdefg",9:"abcdfg"};function Tn(n,t,e,i,s,r,o,a=15921906){let c=r*.58,h=r*.14,l=c*1.45,u=o==="+x"?[0,0,-1]:o==="-x"?[0,0,1]:[-1,0,0],f=o==="+y"?[0,0,1]:[0,1,0],d=o==="+x"?[1,0,0]:o==="-x"?[-1,0,0]:[0,1,0],p=t.length;[...t].forEach((v,m)=>{let g=(m-(p-1)/2)*l;for(let M of xy[v]||""){let[_,y,R]={a:[0,r/2,1],d:[0,-r/2,1],g:[0,0,1],b:[c/2,r/4,0],c:[c/2,-r/4,0],e:[-c/2,-r/4,0],f:[-c/2,r/4,0]}[M],w=R?c+h:h,A=R?h:r/2+h,I=e+u[0]*(g+_)+f[0]*y+d[0]*.02,S=i+u[1]*(g+_)+f[1]*y+d[1]*.02,b=s+u[2]*(g+_)+f[2]*y+d[2]*.02,P=[0,0,0];for(let L=0;L<3;L++)P[L]=Math.abs(u[L])*w+Math.abs(f[L])*A+Math.abs(d[L])*.02;n.box(P[0],P[1],P[2],a,I,S,b)}})}function ii(n,t,e,i,s,r,o=!1){let a=o?6120297:1847147,c=o?8817810:15921906,h=o?6120297:11674164,l=r==="+x"?[0,Math.PI/2,0]:r==="-x"?[0,-Math.PI/2,0]:[-Math.PI/2,0,0],u=r==="+x"?[1,0,0]:r==="-x"?[-1,0,0]:[0,1,0],f=M=>[t+u[0]*M,e+u[1]*M,i+u[2]*M],d=(M,_,y)=>{let R=f(y);n.add(M,_,R[0],R[1],R[2],l[0],l[1],l[2])},p=new bn;p.moveTo(-s*2,-s*.42),p.lineTo(s*2,-s*.42),p.lineTo(s*2,s*.42),p.lineTo(-s*2,s*.42),p.closePath(),d(new Di(p),a,.012);let v=new bn;v.moveTo(-s*1.85,-s*.3),v.lineTo(s*1.85,-s*.3),v.lineTo(s*1.85,s*.3),v.lineTo(-s*1.85,s*.3),v.closePath(),d(new Di(v),c,.016);let m=new bn;m.moveTo(-s*1.85,-s*.08),m.lineTo(s*1.85,-s*.08),m.lineTo(s*1.85,s*.08),m.lineTo(-s*1.85,s*.08),m.closePath(),d(new Di(m),h,.02),d(new ns(s,20),a,.024);let g=new bn;for(let M=0;M<10;M++){let _=Math.PI/2+M*Math.PI/5,y=M%2?s*.38:s*.95,R=Math.cos(_)*y,w=Math.sin(_)*y;M===0?g.moveTo(R,w):g.lineTo(R,w)}g.closePath(),d(new Di(g),c,.03)}function zu(n,t,e,i,s,r){let o=r==="+x"?[0,Math.PI/2,0]:r==="-x"?[0,-Math.PI/2,0]:r==="-z"?[0,Math.PI,0]:r==="+z"?[0,0,0]:[-Math.PI/2,0,0],a=r==="+x"?[1,0,0]:r==="-x"?[-1,0,0]:r==="-z"?[0,0,-1]:r==="+z"?[0,0,1]:[0,1,0],c=new bn;c.moveTo(-s,-s),c.lineTo(s,-s),c.lineTo(s,s),c.lineTo(-s,s),c.closePath(),n.add(new Di(c),16053488,t+a[0]*.012,e+a[1]*.012,i+a[2]*.012,o[0],o[1],o[2]);let h=s*.3,l=s*.8,u=new bn;u.moveTo(-h,-l),u.lineTo(h,-l),u.lineTo(h,-h),u.lineTo(l,-h),u.lineTo(l,h),u.lineTo(h,h),u.lineTo(h,l),u.lineTo(-h,l),u.lineTo(-h,h),u.lineTo(-l,h),u.lineTo(-l,-h),u.lineTo(-h,-h),u.closePath(),n.add(new Di(u),13114910,t+a[0]*.02,e+a[1]*.02,i+a[2]*.02,o[0],o[1],o[2])}function To(n,t,e,i,s,r,o=9080981,a=1){let c=Math.hypot(i-t,s-e),h=Math.atan2(i-t,s-e),l=(t+i)/2,u=(e+s)/2;n.box(.05,.05,c,o,l,r+a,u,0,h,0),n.box(.04,.04,c,o,l,r+a*.5,u,0,h,0);let f=Math.max(1,Math.round(c/2));for(let d=0;d<=f;d++){let p=d/f;n.cil(.025,.025,a,4,o,t+(i-t)*p,r+a/2,e+(s-e)*p)}}function M0(n,t,e,i,s,r=0,o=1){let a=t.clone();a.applyMatrix4(new se().compose(new N(e,i,s),new yn().setFromEuler(new Be(0,r,0)),new N(o,o,o))),n.g.push(a)}var vy={humvee(){let n=new zt,t=new zt,e=Us,i=zr;n.box(1.9,.45,4.4,i,0,.72,0),n.add(Jt([{z:-2.35,w:2.14,hT:.36,hB:.32,y:1.12,n:7},{z:.7,w:2.18,hT:.38,hB:.34,y:1.12,n:7},{z:1.5,w:2.16,hT:.27,hB:.34,y:1.1,n:6},{z:2.25,w:2.12,hT:.16,hB:.32,y:1.06,n:6},{z:2.38,w:1.9,hT:.1,hB:.26,y:1.04,n:5}],22),e);for(let r of[-1,1])for(let o of[-1.5,1.55])n.add(Jt([{z:o-.68,w:.48,hT:.06,hB:.06,y:1.42,x:r*.92,n:4},{z:o-.55,w:.48,hT:.1,hB:.06,y:1.48,x:r*.92,n:4},{z:o+.55,w:.48,hT:.1,hB:.06,y:1.48,x:r*.92,n:4},{z:o+.68,w:.48,hT:.06,hB:.06,y:1.42,x:r*.92,n:4}],12),e);n.add(Jt([{z:-1.5,w:2.06,hT:.44,hB:.05,y:1.52,n:7},{z:.35,w:2.06,hT:.44,hB:.05,y:1.52,n:7},{z:.75,w:2,hT:.2,hB:.05,y:1.52,n:6}],20),e),t.box(1.75,.34,.05,re,0,1.8,.58,-.75);for(let r of[-1,1])t.box(.04,.3,.75,re,r*1.035,1.78,0),t.box(.04,.3,.75,re,r*1.035,1.78,-.95);for(let r of[-1,1])for(let o of[0,-.95])n.box(.03,.66,.98,i,r*1.1,1.18,o);n.box(1.3,.36,.05,2763302,0,1,2.37);for(let r=0;r<6;r++)n.box(.04,.32,.06,e,-.5+r*.2,1,2.38);os(n,.72,1.12,2.36),n.bloco(2.2,.18,.22,mt,0,.62,2.42,0,0,0,.06),n.box(.6,.22,.3,3815988,0,.62,2.58),as(n,.85,1.3,-2.36);for(let r of[-1,1])n.box(.04,.24,.18,mt,r*1.25,1.75,.65),n.box(.18,.04,.04,mt,r*1.15,1.75,.65);nn(n,.9,1.5,-2.1),nn(n,-.9,1.5,-2.1,2),n.bloco(1.8,.35,.7,4934202,0,1.68,-1.95,0,0,0,.1),n.roda(.38,.22,si,0,1.62,-2.42),Dr(n,[-.95,.95],[-1.5,1.55],.47,.4);let s=new zt;s.cil(.6,.62,.18,16,i,0,0,0),s.bloco(1.3,.62,.07,e,0,.42,.45,-.12,0,0,.05);for(let r of[-1,1])s.bloco(.07,.55,.65,e,r*.66,.38,.15,0,r*.35,0,.03);return s.box(.5,.26,.1,re,0,.62,.47,-.12),s.bloco(.18,.2,.75,mt,0,.35,.25,0,0,0,.04),s.cil(.035,.035,1.25,8,mt,0,.38,1.2,Math.PI/2),s.cil(.06,.06,.12,8,mt,0,.38,1.82,Math.PI/2),s.bloco(.22,.2,.3,4934202,.25,.28,.1,0,0,0,.04),{corpo:n.build(),vidro:t.build(!1),torre:s.build(),torreY:2.08,torreZ:-.45,canoZ:1.85,canoY:.38}},ambulancia(){let n=new zt,t=new zt,e=Us,i=zr,s=14867659;n.box(1.9,.45,4.8,i,0,.72,0),n.add(Jt([{z:.55,w:2.16,hT:.36,hB:.32,y:1.12,n:7},{z:1.65,w:2.16,hT:.27,hB:.34,y:1.1,n:6},{z:2.4,w:2.12,hT:.16,hB:.32,y:1.06,n:6},{z:2.52,w:1.9,hT:.1,hB:.26,y:1.04,n:5}],20),e);for(let r of[-1,1])for(let o of[-1.6,1.65])n.add(Jt([{z:o-.66,w:.48,hT:.06,hB:.06,y:1.42,x:r*.92,n:4},{z:o-.52,w:.48,hT:.1,hB:.06,y:1.48,x:r*.92,n:4},{z:o+.52,w:.48,hT:.1,hB:.06,y:1.48,x:r*.92,n:4},{z:o+.66,w:.48,hT:.06,hB:.06,y:1.42,x:r*.92,n:4}],12),e);n.add(Jt([{z:-.2,w:2.06,hT:.44,hB:.05,y:1.52,n:7},{z:.6,w:2.06,hT:.44,hB:.05,y:1.52,n:7},{z:.95,w:2,hT:.2,hB:.05,y:1.52,n:6}],18),e),t.box(1.75,.34,.05,re,0,1.8,.8,-.75);for(let r of[-1,1])t.box(.04,.3,.6,re,r*1.035,1.78,.25);n.add(Jt([{z:-2.62,w:2.22,hT:.95,hB:.95,y:1.95,n:9},{z:-.25,w:2.22,hT:.95,hB:.95,y:1.95,n:9}],24),s),n.box(2.24,.08,2.4,9078134,0,2.92,-1.42);for(let r of[-1,1])zu(n,r*1.11,2.15,-1.6,.42,r>0?"+x":"-x"),t.box(.04,.35,.5,re,r*1.12,2.3,-.65);zu(n,0,2.95,-1.42,.5,"+y"),zu(n,0,2.15,-2.63,.32,"-z"),n.box(.05,1.5,.04,9078134,0,1.85,-2.64);for(let r of[-1,1])n.box(.12,.04,.04,mt,r*.15,1.9,-2.66);n.box(1.2,.12,.35,mt,0,.75,-2.6),n.bloco(1.4,.14,.28,2236962,0,1.98,.35,0,0,0,.05),n.box(.55,.14,.26,16722474,-.36,2.05,.35),n.box(.55,.14,.26,3174655,.36,2.05,.35);for(let r of[-1,1])for(let o of[-.3,-2.55])n.box(.18,.18,.06,16724016,r*1,2.82,o);return n.box(1.3,.36,.05,2763302,0,1,2.51),os(n,.72,1.12,2.5),as(n,.85,1.1,-2.64),n.bloco(2.2,.18,.22,mt,0,.62,2.56,0,0,0,.06),nn(n,.9,2.9,-2.3,1.2),Dr(n,[-.95,.95],[-1.6,1.65],.47,.4),{corpo:n.build(),vidro:t.build(!1)}},stryker(){let n=new zt,t=E0,e=T0;n.add(Jt([{z:-3.5,w:2.6,hT:.9,hB:.85,y:1.65,nT:7,nB:2.6},{z:2,w:2.7,hT:.9,hB:.88,y:1.65,nT:7,nB:2.6},{z:3,w:2.6,hT:.35,hB:.85,y:1.55,nT:6,nB:2.4},{z:3.55,w:2.3,hT:.08,hB:.5,y:1.25,n:4}],24),t),n.box(1.2,.4,.8,e,-.55,2.8,1.7),n.box(.5,.25,.05,re,-.55,2.85,2.11),n.box(1.6,1.4,.1,e,0,1.8,-3.55);for(let s=0;s<4;s++)n.box(.1,.08,.5,mt,.9,2.66,-1.5-s*.6);os(n,.95,1.45,3.12),as(n,.95,1.6,-3.56),nn(n,1,2.6,-3,3),nn(n,-1,2.6,-3,2.4);for(let s of[-1,1])for(let r=0;r<3;r++)n.box(.3,.45,.8,4868662,s*1.5,2.1,-2.4+r*1.1);Dr(n,[-1.25,1.25],[-2.55,-1.15,.85,2.25],.56,.48);let i=new zt;return i.cil(.45,.5,.25,12,e,0,0,0),i.box(.7,.55,.8,t,0,.42,0),i.box(.35,.35,.35,re,.42,.55,.2),i.box(.2,.2,.8,mt,-.15,.48,.5),i.cil(.035,.035,1.3,6,mt,-.15,.48,1.4,Math.PI/2),i.box(.25,.3,.4,4934202,.45,.25,-.3),{corpo:n.build(),torre:i.build(),torreY:2.62,torreZ:.4,canoZ:2.05,canoY:.48}},bradley(){let n=new zt,t=Us,e=zr;n.add(Jt([{z:-3.3,w:2.9,hT:.9,hB:.85,y:1.45,n:7},{z:1.4,w:3,hT:.9,hB:.85,y:1.45,n:7},{z:2.7,w:2.95,hT:.25,hB:.8,y:1.4,n:6},{z:3.35,w:2.8,hT:.05,hB:.5,y:1.15,n:5}],24),t),Iu(n,6.4,1.2,1.55,.6,!0,e),n.box(3.6,.1,6.6,e,0,1.42,0);for(let s of[-1,1])for(let r=0;r<5;r++)n.box(.14,.5,1.1,t,s*1.98,1.15,-2.4+r*1.2);n.box(1.2,1.5,.1,e,.6,1.5,-3.35),os(n,1.2,1.4,3.3),as(n,1.3,1.6,-3.32),nn(n,-1.3,2.35,-2.8,2.8);let i=new zt;i.add(Jt([{z:-1.25,w:2,hT:.42,hB:.42,y:.43,n:6},{z:.6,w:2.1,hT:.44,hB:.42,y:.43,n:6},{z:1.3,w:1.2,hT:.32,hB:.4,y:.42,n:5}],20),t),i.box(1.9,.14,2.2,e,0,.92,-.2),i.box(.5,.45,.6,e,-.45,.6,1.2),i.cil(.09,.09,2.3,8,mt,-.45,.6,2.6,Math.PI/2),i.cil(.12,.12,.3,8,mt,-.45,.6,3.7,Math.PI/2),i.box(.55,.55,1.4,e,1.35,.55,-.1),i.box(.42,.2,.06,Ds,1.35,.68,.61),i.box(.42,.2,.06,Ds,1.35,.4,.61),i.box(.35,.3,.3,re,.5,1.05,.3);for(let s of[-1,1])for(let r=0;r<4;r++)i.cil(.06,.06,.25,6,mt,s*.95,.65+r%2*.14,.75+Math.floor(r/2)*.15,Math.PI/2.6);return{corpo:n.build(),torre:i.build(),torreY:2.36,torreZ:.1,canoZ:3.8,canoY:.6}},abrams(){let n=new zt,t=Us,e=zr;n.add(Jt([{z:-3.95,w:2.7,hT:.45,hB:.5,y:1.25,n:7},{z:-3.7,w:2.75,hT:.52,hB:.6,y:1.22,n:7},{z:2.7,w:2.75,hT:.52,hB:.6,y:1.22,n:7},{z:3.65,w:2.75,hT:.2,hB:.6,y:1.22,n:6},{z:4.05,w:2.6,hT:.05,hB:.3,y:1,n:5}],24),t),Iu(n,7.7,1.3,1.55,.68,!0,e),n.box(3.7,.1,7.7,e,0,1.78,-.1);for(let s=0;s<7;s++)n.box(2.2,.03,.12,4078387,0,1.84,-3.1+s*.22);for(let s of[-1,1])for(let r=0;r<6;r++)n.box(.06,.62,1.15,t,s*1.99,1.25,-3.1+r*1.22);os(n,1.3,1.6,3.42),as(n,1.5,1.55,-3.97),n.box(1.4,.4,.4,4867126,0,1.6,-4.05);let i=new zt;i.add(Jt([{z:-2.65,w:3.2,hT:.42,hB:.42,y:.45,n:7},{z:-1.2,w:3.5,hT:.5,hB:.45,y:.45,n:7},{z:.9,w:3.5,hT:.5,hB:.45,y:.45,n:7},{z:1.9,w:2.7,hT:.45,hB:.42,y:.43,n:6},{z:2.55,w:1.3,hT:.35,hB:.38,y:.42,n:5}],24),t),i.box(3.4,.05,1.3,mt,0,.6,-3);for(let s of[-1,1])i.box(.05,.5,1.3,mt,s*1.7,.85,-3);i.box(3.4,.5,.05,mt,0,.85,-3.65),i.box(3,.4,1.1,5985857,0,.85,-2.95),i.box(1,.75,.6,e,0,.45,2.55),i.cil(.13,.15,5.6,10,t,0,.45,5.4,Math.PI/2),i.cil(.21,.21,.8,10,e,0,.45,4,Math.PI/2),i.cil(.17,.17,.25,10,mt,0,.45,8.15,Math.PI/2),i.cil(.38,.42,.35,12,e,.75,1.12,-.5),i.box(.18,.2,.9,mt,.75,1.42,0),i.cil(.03,.03,1,5,mt,.75,1.42,.9,Math.PI/2),i.cil(.3,.3,.12,10,e,-.75,1.02,-.6),i.box(.12,.15,.7,mt,-.75,1.2,-.2),i.box(.5,.45,.45,e,-.65,1.2,.8),i.box(.3,.25,.04,re,-.65,1.25,1.03);for(let s of[-1,1])for(let r=0;r<6;r++)i.cil(.055,.055,.3,6,mt,s*(1.35+r%3*.12),.85+Math.floor(r/3)*.13,1.25,Math.PI/2.4);return nn(i,1.4,.95,-2.2,2.6),nn(i,-1.4,.95,-2.2,2),{corpo:n.build(),torre:i.build(),torreY:1.83,torreZ:-.3,canoZ:8.3,canoY:.45}},paladin(){let n=new zt,t=Us,e=zr;n.add(Jt([{z:-3.45,w:2.9,hT:.5,hB:.55,y:1.15,n:7},{z:2.5,w:2.95,hT:.5,hB:.55,y:1.15,n:7},{z:3.3,w:2.9,hT:.12,hB:.5,y:1.1,n:6},{z:3.6,w:2.7,hT:.04,hB:.25,y:.9,n:5}],22),t),Iu(n,6.9,1.2,1.6,.62,!0,e),os(n,1.2,1.4,3.3),as(n,1.4,1.45,-3.47),n.bloco(1.6,.5,.3,e,0,1.05,-3.55,0,0,0,.08);for(let s of[-1,1])n.box(.1,.9,.1,mt,s*.25,1.95,3.1,.35);n.bloco(.7,.18,.25,mt,0,2.35,3.25,0,0,0,.05);let i=new zt;i.add(Jt([{z:-3.2,w:3,hT:.85,hB:.85,y:.85,n:8},{z:.4,w:3.15,hT:.88,hB:.85,y:.85,n:8},{z:1.5,w:2.9,hT:.6,hB:.85,y:.85,n:7},{z:1.85,w:2.2,hT:.35,hB:.75,y:.8,n:6}],22),t);for(let s of[-1,1]){i.bloco(.35,.55,2.6,e,s*1.7,1.05,-1.2,0,0,0,.08);for(let r=0;r<3;r++)i.bloco(.32,.4,.7,6249029,s*1.75,1.6,-2.2+r*.85,0,0,0,.1)}i.box(3,.08,.8,mt,0,.55,-3.6),i.cil(.42,.45,.22,12,e,.85,1.8,-1.6),i.bloco(.15,.18,.85,mt,.85,2,-1.1,0,0,0,.03),i.cil(.03,.03,1,6,mt,.85,2,-.3,Math.PI/2),i.cil(.32,.36,.18,12,e,-.8,1.76,-.9),i.cil(.32,.32,1,14,e,0,.95,2.3,Math.PI/2),i.cil(.15,.18,6.6,14,t,0,.95,5.4,Math.PI/2),i.cil(.24,.24,.9,14,e,0,.95,4.4,Math.PI/2),i.bloco(.62,.4,.75,6972496,0,.95,8.75,0,0,0,.08);for(let s of[-1,1])i.box(.06,.26,.5,2763306,s*.315,.95,8.75);return nn(i,-1.2,1.7,-2.6,2.6),nn(i,1.2,1.7,-2.6,2),{corpo:n.build(),torre:i.build(),torreY:1.75,torreZ:-.2,canoZ:9.1,canoY:.95}},bearcat(){let n=new zt,t=new zt,e=1842979,i=2764339;n.box(1.95,.5,5.6,i,0,.75,0),n.add(Jt([{z:-2.85,w:2.36,hT:1.05,hB:.75,y:1.75,n:8},{z:.85,w:2.36,hT:1.05,hB:.75,y:1.75,n:8},{z:1.35,w:2.34,hT:.55,hB:.75,y:1.65,nT:6,nB:8},{z:2.6,w:2.3,hT:.38,hB:.7,y:1.55,n:6},{z:2.9,w:2.1,hT:.25,hB:.6,y:1.5,n:5}],24),e);for(let s of[-1,1]){n.box(.02,.26,4.6,15790320,s*1.19,1.7,-.3),n.box(.02,.1,4.6,2774440,s*1.195,1.52,-.3),t.box(.04,.42,.62,re,s*1.19,2.3,.45),t.box(.04,.36,.4,re,s*1.19,2.3,-.7),t.box(.04,.36,.4,re,s*1.19,2.3,-1.8);for(let r of[-.7,-1.8])n.cil(.05,.05,.05,8,921102,s*1.2,2,r,0,0,Math.PI/2);n.bloco(.3,.08,1.6,mt,s*1.25,.95,0,0,0,0,.03),n.box(.05,.25,.18,mt,s*1.27,2.3,1.05)}t.box(2,.55,.05,re,0,2.38,1.08,-.6),n.cil(.48,.52,.3,14,i,0,2.95,-1.1),n.bloco(.8,.45,.12,i,0,3.2,-.7,0,0,0,.04),n.bloco(1.5,.14,.3,1118481,0,2.86,.6,0,0,0,.05),n.box(.62,.15,.28,16719904,-.38,2.94,.6),n.box(.62,.15,.28,2117887,.38,2.94,.6);for(let s of[-1,1])n.cil(.1,.1,.12,10,16774084,s*.9,2.86,.95,Math.PI/2);n.box(1.4,.4,.05,789516,0,1.4,2.91);for(let s=0;s<7;s++)n.box(.04,.36,.06,i,-.6+s*.2,1.4,2.92);os(n,.85,1.45,2.88),as(n,.95,1.4,-2.88),n.bloco(2.5,.3,.3,mt,0,.82,3,0,0,0,.06);for(let s of[-1,1])n.box(.1,.8,.1,mt,s*.9,1.15,3.05);return n.box(.6,.3,.25,3355443,0,.82,3.25),n.box(1.9,1.6,.06,i,0,1.8,-2.89),nn(n,.9,2.8,-2.4,2.4),Dr(n,[-1.05,1.05],[-1.8,1.9],.55,.45),{corpo:n.build(),vidro:t.build(!1)}},himars(){let n=new zt,t=new zt,e=Us,i=zr;n.box(1.9,.45,7,i,0,.95,0),n.box(2.4,.15,4.6,i,0,1.25,-1.1),n.add(Jt([{z:1.55,w:2.45,hT:1,hB:.95,y:2.05,n:8},{z:2.65,w:2.45,hT:1,hB:.95,y:2.05,n:8},{z:3.25,w:2.42,hT:.45,hB:.95,y:2,nT:6,nB:8},{z:3.5,w:2.3,hT:.1,hB:.85,y:1.85,n:6}],22),e),t.box(2.15,.62,.05,re,0,2.6,3,-.72);for(let r of[-1,1])t.box(.04,.5,.75,re,r*1.23,2.55,2.25),n.bloco(.5,.6,1.2,6249029,r*1,1.6,.9,0,0,0,.1);n.bloco(2.5,.2,.25,mt,0,1,3.6,0,0,0,.06),os(n,.95,1.35,3.52),as(n,1,1.1,-3.5),nn(n,1.1,3.05,1.8,2.2),nn(n,-1.1,3.05,1.8,1.6);for(let r of[-1,1])n.box(.18,.7,.18,mt,r*1.05,.65,-3.3),n.cil(.2,.2,.06,10,mt,r*1.05,.3,-3.3);n.bloco(2.2,.35,.6,i,0,1.6,-3.2,0,0,0,.08);for(let r of[-1,1])n.box(.08,.5,4.8,i,r*1.2,1.15,-1.1);Dr(n,[-1.05,1.05],[-2.65,-1.3,2.5],.56,.48);let s=new zt;s.cil(1,1.05,.25,16,i,0,.12,.6),s.bloco(.8,.35,3.6,mt,0,.3,0,0,0,0,.06),s.add(Jt([{z:-2.05,w:2.3,hT:.55,hB:.55,y:.9,n:9},{z:2.05,w:2.3,hT:.55,hB:.55,y:.9,n:9}],22),e),s.box(2.32,.1,4.1,i,0,1.47,0),s.box(2.1,.95,.05,1710618,0,.9,2.08);for(let r=0;r<3;r++)for(let o=0;o<2;o++)s.cil(.25,.25,.08,14,9077872,-.68+r*.68,.66+o*.48,2.1,Math.PI/2),s.cil(.12,.12,.09,10,3815472,-.68+r*.68,.66+o*.48,2.12,Math.PI/2);for(let r of[-1,1])s.box(.05,.9,3.4,i,r*1.17,.9,0);return{corpo:n.build(),vidro:t.build(!1),torre:s.build(),torreY:1.35,torreZ:-1.5,canoZ:2.1,canoY:.9}}};function Ur(n,t,e=2763306,i=.55){let s=new zt;for(let r=0;r<n;r++){let o=r*Math.PI*2/n,a=je({p:[.55,0,i/2],corda:i,esp:.12},{p:[t*.97,0,i/2],corda:i*.92,esp:.1});s.add(a,e,0,0,0,0,o,0),s.box(.36,.06,i*.95,14204992,Math.cos(o)*t*.93,0,-Math.sin(o)*t*.93,0,o,0),s.box(.7,.12,.18,mt,Math.cos(o)*.45,0,-Math.sin(o)*.45,0,o,0),s.cil(.025,.025,.45,4,mt,Math.cos(o)*.35,-.25,-Math.sin(o)*.35)}return s.cil(.3,.36,.3,12,mt,0,-.05,0),s.cil(.42,.42,.08,14,3816768,0,-.42,0),s.cil(.12,.12,.6,8,mt,0,-.3,0),s.build(!1)}function b0(n){let t=new zt;return t.box(.08,n*2,.25,2763306,0,0,0),t.box(.08,.25,n*2,2763306,0,0,0),t.build()}function dc(n,t,e,i,s=0){let r=new zt,o=9080724,a=1447446;r.cil(.06,.06,1+s*.1,6,o,0,.55,n),r.roda(i*.8,.2,a,.16,i*.8,n),r.roda(i*.8,.2,a,-.16,i*.8,n),r.box(.05,.6,.9,o,.4,.7,n-.2);for(let c of[-1,1])r.cil(.08,.08,1.1,6,o,c*e,.65,t,0,0,c*.12),r.roda(i,.32,a,c*(e+.1),i,t),r.box(.05,.7,1.2,o,c*(e-.35),.8,t);return r.build(!1)}function Sn(n,t,e,i,s=!0){if(n.add(je(t,e),i),s){let r=o=>({...o,p:[-o.p[0],o.p[1],o.p[2]]});n.add(je(r(t),r(e)),i)}}function En(n,t,e,i,s,r,o=1,a=1,c=12){n.add(Jt(t.map(([h,l])=>({z:h+r,x:i,y:s,w:l*2*o,hT:l*a,hB:l*a,n:2})),c),e)}var w0={blackhawk(){let n=new zt,t=new zt,e=7305820,i=6253134,s=2895658;n.add(Jt([{z:-10.1,w:.22,hT:.22,hB:.14,y:2.45},{z:-8.6,w:.36,hT:.32,hB:.24,y:2.3},{z:-5.6,w:.55,hT:.45,hB:.36,y:2.12},{z:-3.2,w:1.05,hT:.8,hB:.6,y:1.92,n:2.6},{z:-2.1,w:2,hT:1,hB:.86,y:1.76,nT:3,nB:4.5},{z:2.4,w:2.25,hT:1.06,hB:.92,y:1.76,nT:3,nB:4.5},{z:3.7,w:2.12,hT:.96,hB:.86,y:1.72,nT:2.8,nB:4},{z:4.9,w:1.8,hT:.72,hB:.76,y:1.58,nT:2.4,nB:3},{z:5.75,w:1.15,hT:.42,hB:.55,y:1.42},{z:6.25,w:.35,hT:.12,hB:.18,y:1.36}],22),e),t.add(Jt([{z:3.9,w:2,hT:.95,hB:.05,y:1.73,nT:2.8,nB:2},{z:4.85,w:1.83,hT:.74,hB:.05,y:1.6,nT:2.4,nB:2},{z:5.6,w:1.25,hT:.47,hB:.05,y:1.44,nT:2.2,nB:2}],18),re);for(let r of[-1,1])t.box(.04,.62,1.05,re,r*1.105,2.2,3.2),t.box(.04,.5,.75,re,r*1.12,2.15,1.5),t.box(.04,.5,.75,re,r*1.12,2.15,.2),n.box(.05,1.3,2.2,i,r*1.13,1.7,.6),n.box(.05,.05,2.4,s,r*1.16,2.38,.6),n.cil(.035,.035,.9,6,mt,r*1.42,2.05,2.2,Math.PI/2),n.box(.16,.2,.4,mt,r*1.36,2.05,1.65),n.cil(.05,.05,1,6,mt,r*1.25,.72,2.9,0,0,r*.45),n.roda(.33,.22,si,r*1.55,.33,2.9),n.add(je({p:[r*1.1,2.5,.8],corda:1,esp:.12},{p:[r*2.9,2.2,.75],corda:.7,esp:.1}),i),En(n,[[-1.8,.05],[-1.3,.32],[1.1,.32],[1.7,.06]],5923912,r*2.6,1.75,.4);n.add(Jt([{z:-2.6,w:.9,hT:.35,hB:.1,y:2.75},{z:-1.6,w:1.8,hT:.55,hB:.1,y:2.8,n:3},{z:2.6,w:1.8,hT:.58,hB:.1,y:2.8,n:3},{z:3.6,w:1.1,hT:.25,hB:.1,y:2.72}],16),e);for(let r of[-1,1])En(n,[[-1.6,.18],[-1.1,.38],[1,.4],[1.5,.3]],i,r*.72,3.05,.3),n.cil(.25,.25,.05,10,s,r*.72,3.05,1.82,Math.PI/2);n.cil(.26,.34,.55,12,i,0,3.55,.6),n.add(je({p:[0,2.35,-8.2],corda:1.7,esp:.12},{p:[0,4.35,-9.3],corda:1,esp:.1}),e),Sn(n,{p:[.1,2.25,-8.7],corda:.95,esp:.1},{p:[2.3,2.25,-8.9],corda:.75,esp:.08},e),n.roda(.2,.15,si,0,.25,-8.4),n.cil(.04,.04,1.6,6,mt,0,1,-8.4),nn(n,0,2.7,-4,1),n.bloco(.38,.3,.7,i,1.35,2.8,1.7,0,0,0,.08),n.box(.7,.06,.08,mt,1.55,2.72,1.95),n.cil(.008,.008,.9,3,2236962,1.88,2.25,1.95),n.box(.05,.35,.9,mt,0,2.62,5,-.9),n.box(.05,.3,.7,mt,0,.92,5.4,.9),n.esf(.19,2764080,0,.82,5.35),t.esf(.12,re,0,.8,5.5);for(let r of[-1,1])n.bloco(.35,.4,1.3,5199683,r*1.15,3,-1.6,0,r*.4,0,.1),n.box(.25,.08,.35,mt,r*1.12,.62,4),n.box(.04,.03,.18,mt,r*1.15,1.85,3.2),ii(n,r*.31,2.2,-6.6,.22,r>0?"+x":"-x",!0),Tn(n,"26543",r*.08,3.5,-8.8,.22,r>0?"+x":"-x",1973790);return nn(n,.4,2.75,-2.6,.8),nn(n,-.4,.95,2,.5),{corpo:n.build(),vidro:t.build(!1),rotor:Ur(4,8.2),rotorY:3.95,rotorZ:.6,cauda:b0(1.7),caudaPos:[.3,3.9,-9.4],caudaEixo:"x"}},chinook(){let n=new zt,t=new zt,e=7766110,i=6713168;n.add(Jt([{z:-7.6,w:2.6,hT:1.4,hB:.9,y:2.55,n:3},{z:-6.6,w:3.6,hT:1.8,hB:1.55,y:2.35,nT:3.5,nB:5},{z:5.4,w:3.6,hT:1.8,hB:1.55,y:2.35,nT:3.5,nB:5},{z:6.9,w:3.3,hT:1.55,hB:1.4,y:2.3,nT:3,nB:4},{z:7.9,w:2.6,hT:1.05,hB:1,y:2.1,n:2.6},{z:8.5,w:1.4,hT:.45,hB:.5,y:1.85}],22),e),t.add(Jt([{z:6.7,w:3.36,hT:1.58,hB:.05,y:2.32,nT:3,nB:2},{z:7.8,w:2.66,hT:1.08,hB:.05,y:2.12,nT:2.6,nB:2},{z:8.35,w:1.6,hT:.55,hB:.05,y:1.9}],18),re);for(let s of[-1,1]){for(let r=0;r<6;r++)t.box(.04,.42,.5,re,s*1.81,2.9,-4.2+r*1.6);n.add(Jt([{z:-4.6,w:.7,hT:.45,hB:.42,y:1.15,x:s*1.95},{z:-3.6,w:.95,hT:.55,hB:.5,y:1.1,x:s*2},{z:3.4,w:.95,hT:.55,hB:.5,y:1.1,x:s*2},{z:4.4,w:.6,hT:.35,hB:.4,y:1.15,x:s*1.9}],14),i),n.roda(.45,.35,si,s*1.6,.45,4.8),n.roda(.45,.35,si,s*1.6,.45,-4.3),n.roda(.45,.35,si,s*1.6,.45,-5.3),En(n,[[-2.4,.3],[-1.9,.52],[.6,.55],[1.2,.42]],7107927,s*1.55,4.3,-6)}n.add(Jt([{z:-8.2,w:1,hT:.4,hB:.1,y:4.2},{z:-7.6,w:1.8,hT:1.6,hB:.1,y:4.1,n:3},{z:-5.2,w:1.8,hT:1.6,hB:.1,y:4.1,n:3},{z:-3.4,w:1.4,hT:.25,hB:.1,y:4.1}],16),e),n.add(Jt([{z:4.8,w:1,hT:.15,hB:.1,y:4.12},{z:5.6,w:1.4,hT:.6,hB:.1,y:4.1,n:3},{z:7,w:1.3,hT:.55,hB:.1,y:4.05,n:3},{z:7.6,w:.8,hT:.2,hB:.1,y:3.95}],14),e),n.box(1.6,.06,4,2764322,0,.5,-6.6,.25);for(let s of[-1,1])ii(n,s*1.8,2.6,-1,.45,s>0?"+x":"-x",!0),Tn(n,"12",s*.92,5.2,-6.4,.45,s>0?"+x":"-x",1973790);return n.cil(.06,.06,2.4,6,mt,1,2.3,9.2,Math.PI/2),{corpo:n.build(),vidro:t.build(!1),rotor:Ur(3,9.1),rotorY:6.3,rotorZ:-6.5,rotor2:Ur(3,9.1),rotor2Y:5.15,rotor2Z:6.2}},apache(){let n=new zt,t=new zt,e=7108182,i=6055497,s=2763815;n.add(Jt([{z:-9.6,w:.22,hT:.22,hB:.18,y:2.05},{z:-7,w:.34,hT:.3,hB:.28,y:1.98},{z:-3.6,w:.6,hT:.5,hB:.45,y:1.88},{z:-1.6,w:1,hT:.85,hB:.62,y:1.82,n:3},{z:1.4,w:1.05,hT:.88,hB:.62,y:1.8,n:3},{z:3.4,w:.86,hT:.62,hB:.56,y:1.7,n:2.6},{z:4.8,w:.58,hT:.38,hB:.45,y:1.55},{z:5.45,w:.24,hT:.14,hB:.2,y:1.45}],20),e),t.add(Jt([{z:.4,w:.9,hT:.65,hB:.05,y:2.55,n:3},{z:1.6,w:.96,hT:.62,hB:.05,y:2.55,n:3},{z:2.3,w:.9,hT:.45,hB:.05,y:2.4,n:2.8},{z:3.6,w:.8,hT:.42,hB:.05,y:2.25,n:2.6},{z:4.5,w:.55,hT:.2,hB:.05,y:2}],16),re),n.box(.04,.5,.06,s,0,3,1.95);for(let r of[-1,1]){En(n,[[-2.8,.22],[-2.3,.42],[.2,.45],[.7,.3]],e,r*.98,2.62,-.4),n.cil(.22,.26,.5,10,s,r*1.05,2.62,-3.3,Math.PI/2-.15),n.add(Jt([{z:-1.4,w:.4,hT:.25,hB:.25,y:1.55,x:r*.7},{z:-.6,w:.55,hT:.38,hB:.32,y:1.5,x:r*.75},{z:2,w:.55,hT:.38,hB:.32,y:1.5,x:r*.75},{z:2.8,w:.35,hT:.2,hB:.2,y:1.55,x:r*.7}],12),i),n.add(je({p:[r*.8,2,1.1],corda:1.05,esp:.14},{p:[r*3,1.85,1],corda:.85,esp:.12}),i);for(let o=0;o<2;o++)for(let a=0;a<2;a++)En(n,[[-.8,.02],[-.6,.09],[.6,.09],[.85,.01]],8026706,r*(1.95+o*.24),1.62-a*.22,.8,1,1,8);En(n,[[-.9,.24],[-.7,.33],[.7,.33],[.9,.26]],5593407,r*2.8,1.62,.6),n.cil(.05,.05,1,6,mt,r*.85,.62,2.3,0,0,r*.3),n.roda(.3,.2,si,r*1,.3,2.3)}n.esf(.32,i,0,1,3.6),n.cil(.04,.05,1.7,6,mt,0,.9,4.45,Math.PI/2),n.esf(.28,2763306,0,1.25,5.3),n.box(.5,.25,.3,i,0,1.25,5.05),n.add(je({p:[0,2.15,-8.4],corda:1.4,esp:.12},{p:[0,4.25,-9.3],corda:.95,esp:.1}),e),Sn(n,{p:[.1,1.85,-8.9],corda:.85,esp:.1},{p:[1.65,1.85,-9.1],corda:.7,esp:.08},e),n.roda(.18,.12,si,0,.2,-8.9),n.cil(.04,.04,1.4,6,mt,0,.9,-8.9),n.cil(.16,.22,.9,8,i,0,3.5,.1),n.box(.05,.4,.9,mt,0,2.95,4.2,-.9),n.box(.05,.3,.7,mt,0,1.05,5.3,.9);for(let r of[-1,1])ii(n,r*.3,2,-6,.2,r>0?"+x":"-x",!0),Tn(n,"445",r*.08,3.3,-8.95,.25,r>0?"+x":"-x",1973790),n.box(.2,.15,.2,mt,r*1,1.25,-1);return n.box(.12,.1,.12,13639712,0,4.3,-9.2),{corpo:n.build(),vidro:t.build(!1),rotor:Ur(4,7.3),rotorY:4.2,rotorZ:.1,cauda:b0(1.4),caudaPos:[.3,3.4,-9.4],caudaEixo:"x",armaZ:5.2,armaY:.9,radar:!0}},reaper(){let n=new zt,t=11779009;n.add(Jt([{z:-5.5,w:.2,hT:.12,hB:.12,y:.45},{z:-4,w:.6,hT:.32,hB:.32,y:.45},{z:0,w:.95,hT:.48,hB:.45,y:.45},{z:3,w:1,hT:.55,hB:.42,y:.5},{z:4.7,w:.85,hT:.62,hB:.32,y:.55},{z:5.6,w:.3,hT:.2,hB:.12,y:.5}],16),t),Sn(n,{p:[.4,.75,1.2],corda:1.15,esp:.14},{p:[10,.95,.5],corda:.55,esp:.1},t);for(let e of[-1,1])n.add(je({p:[e*.15,.6,-4.2],corda:1,esp:.1},{p:[e*1.5,1.6,-4.8],corda:.5,esp:.08}),t);n.add(je({p:[0,.3,-4],corda:.8,esp:.1},{p:[0,-.5,-4.4],corda:.45,esp:.08}),t);for(let e of[-1,1])for(let i of[3.2,5])En(n,[[-.8,.02],[-.6,.1],[.7,.1],[.9,.02]],8026706,e*i,.4,.4,1,1,8);return n.esf(.36,2830389,0,.05,4.2),{corpo:n.build(),helice:Ur(3,1.4,3355443,.25),heliceZ:-5.7,heliceY:.45,heliceEixo:"z"}},f35(){let n=new zt,t=new zt,e=10726322,i=9344669,s=3356733;n.add(Jt([{z:-7.55,w:1.25,hT:.55,hB:.5,y:1.2,n:2},{z:-6.4,w:2.4,hT:.62,hB:.48,y:1.2,nT:2.4,nB:3},{z:-3.4,w:3.3,hT:.72,hB:.52,y:1.2,nT:2.8,nB:3.5},{z:0,w:3.2,hT:.86,hB:.58,y:1.2,nT:3,nB:3.5},{z:2,w:2.6,hT:.82,hB:.56,y:1.2,nT:2.8,nB:3},{z:3.6,w:1.6,hT:.66,hB:.48,y:1.18,nT:2.4,nB:2.6},{z:5.6,w:1,hT:.44,hB:.36,y:1.12},{z:7.2,w:.46,hT:.2,hB:.17,y:1.06},{z:8.1,w:.06,hT:.03,hB:.03,y:1.03}],22),e),t.add(Jt([{z:1.6,w:.75,hT:.25,hB:.05,y:1.95},{z:2.6,w:.95,hT:.52,hB:.05,y:1.92},{z:4,w:.9,hT:.45,hB:.05,y:1.78},{z:5.3,w:.62,hT:.2,hB:.05,y:1.52}],16),11569728);for(let r of[-1,1])n.box(.52,.55,.08,s,r*1.35,1.12,2.15,0,r*.35,0);Sn(n,{p:[1.4,1.12,.8],corda:6,esp:.05},{p:[6.55,1.08,-3.2],corda:2,esp:.04},e),Sn(n,{p:[1.15,1.2,-5.2],corda:2.6,esp:.05},{p:[3.95,1.2,-6.6],corda:1.2,esp:.04},e);for(let r of[-1,1])n.add(je({p:[r*1.3,1.65,-4.1],corda:3,esp:.05},{p:[r*2.05,3.65,-5.7],corda:1.3,esp:.04}),i);n.cil(.62,.68,.9,16,4209978,0,1.2,-7.55,Math.PI/2),n.cil(.5,.5,.92,16,1315860,0,1.2,-7.56,Math.PI/2),n.box(.12,.06,.25,13639712,-6.5,1.1,-2.4),n.box(.12,.06,.25,2146368,6.5,1.1,-2.4),n.box(.06,.06,.7,s,0,.62,-7,-.3),ii(n,-4,1.14,-1.6,.42,"+y",!0);for(let r of[-1,1])ii(n,r*1.62,1.25,-4.4,.32,r>0?"+x":"-x",!0),Tn(n,"100",r*.63,1.2,4.6,.32,r>0?"+x":"-x",6317676),n.box(.04,.03,4.2,6975863,r*.55,.64,-.6),n.add(je({p:[r*1.4,1.13,.85],corda:.12,esp:.3},{p:[r*6.55,1.09,-3.15],corda:.08,esp:.3}),6120554);return t.esf(.18,re,0,.72,5.4,1,.7,1.4),n.box(.06,.03,1.6,6975863,0,.64,-.6),{corpo:n.build(),vidro:t.build(!1),trem:dc(4.2,-.6,1.5,.3),motorZ:-8,motorY:1.2,chamaR:.5,pontas:6.5}},f18(){let n=new zt,t=new zt,e=12370890,i=11121080,s=3356733;n.add(Jt([{z:-8.9,w:2.2,hT:.5,hB:.45,y:1.2,n:3},{z:-6,w:2.6,hT:.6,hB:.52,y:1.2,n:3.2},{z:-2,w:2.5,hT:.68,hB:.6,y:1.2,n:3.2},{z:1,w:1.6,hT:.74,hB:.66,y:1.25,n:2.8},{z:4,w:1.15,hT:.65,hB:.55,y:1.28,n:2.4},{z:6.6,w:.78,hT:.44,hB:.38,y:1.25},{z:8.6,w:.32,hT:.18,hB:.16,y:1.2},{z:9.3,w:.04,hT:.02,hB:.02,y:1.2}],22),e),t.add(Jt([{z:2.8,w:.7,hT:.25,hB:.05,y:1.92},{z:4,w:.92,hT:.55,hB:.05,y:1.9},{z:5.6,w:.85,hT:.45,hB:.05,y:1.78},{z:6.7,w:.5,hT:.15,hB:.05,y:1.6}],16),re),Sn(n,{p:[.65,1.38,5.6],corda:6,esp:.03},{p:[1.65,1.36,0],corda:.6,esp:.03},i);for(let r of[-1,1])n.bloco(.95,.85,3.6,e,r*1.25,.95,.3,0,0,0,.18),n.box(.78,.7,.06,s,r*1.25,.95,2.12);Sn(n,{p:[1.4,1.22,.4],corda:4.8,esp:.05},{p:[6.8,1.15,-2.3],corda:1.8,esp:.04},e),Sn(n,{p:[1.3,1.25,-6.1],corda:3,esp:.05},{p:[3.85,1.2,-8.2],corda:1.3,esp:.04},e);for(let r of[-1,1])n.add(je({p:[r*1.2,1.75,-4.4],corda:3.4,esp:.05},{p:[r*2.15,4.35,-6.6],corda:1.4,esp:.04}),i),En(n,[[-1.5,.02],[-1.2,.07],[1.3,.07],[1.6,.01]],15263968,r*6.95,1.15,-2.5,1,1,8),n.box(.08,.4,1.2,i,r*2.9,.85,-1.5),En(n,[[-1.8,.05],[-1.3,.24],[1,.24],[1.6,.04]],7170890,r*2.9,.48,-1.4,1,1,10),n.box(.08,.4,1,i,r*4.6,.9,-2),En(n,[[-1.2,.05],[-.8,.17],[.9,.17],[1.3,.03]],7170890,r*4.6,.6,-2,1,1,10);En(n,[[-2.6,.05],[-2,.35],[1.8,.35],[2.6,.05]],i,0,.45,-1);for(let r of[-.62,.62])n.cil(.5,.55,.9,14,4209978,r,1.2,-8.95,Math.PI/2),n.cil(.4,.4,.92,14,1315860,r,1.2,-8.96,Math.PI/2);n.box(.12,.06,.25,13639712,-6.9,1.15,-1.1),n.box(.12,.06,.25,2146368,6.9,1.15,-1.1),ii(n,-4,1.21,-1,.42,"+y",!0);for(let r of[-1,1])ii(n,r*1.31,1.25,-4.6,.3,r>0?"+x":"-x",!0),Tn(n,"300",r*.44,1.25,6,.3,r>0?"+x":"-x",5922918);n.cil(.02,.03,.9,6,mt,0,1.2,9.65,Math.PI/2),n.bloco(.12,.12,1.4,i,.5,1.75,5.6,0,0,0,.04),n.box(.05,.09,.05,1118481,0,1.6,7.8),t.box(.04,.06,1.8,s,0,2.43,4.6);for(let r of[-1,1])En(n,[[-1.6,.02],[-1.3,.09],[1.4,.09],[1.7,.01]],14737624,r*1.35,.72,-2.6,1,1,8);return{corpo:n.build(),vidro:t.build(!1),trem:dc(5,-1,1.6,.35),motorZ:-9.4,motorY:1.2,chamaR:.45,motores:[-.62,.62],pontas:6.9}},a10(){let n=new zt,t=new zt,e=10134441,i=9081753,s=3356733;n.add(Jt([{z:-8,w:.3,hT:.25,hB:.25,y:1.75},{z:-6.4,w:.65,hT:.55,hB:.5,y:1.7},{z:-2.5,w:1.25,hT:.95,hB:.85,y:1.6,n:2.4},{z:2,w:1.45,hT:1,hB:.95,y:1.6,n:2.6},{z:4.6,w:1.4,hT:.95,hB:.95,y:1.6,n:2.6},{z:6.6,w:1.1,hT:.7,hB:.75,y:1.5},{z:7.9,w:.65,hT:.38,hB:.42,y:1.35},{z:8.3,w:.3,hT:.15,hB:.2,y:1.3}],20),e),t.add(Jt([{z:4,w:1,hT:.55,hB:.05,y:2.4},{z:5.1,w:1.1,hT:.62,hB:.05,y:2.35},{z:6.4,w:.85,hT:.45,hB:.05,y:2.1},{z:7.1,w:.5,hT:.15,hB:.05,y:1.95}],16),re),n.cil(.08,.1,1.5,8,2236962,0,1.25,8.9,Math.PI/2),Sn(n,{p:[.6,1.1,2.3],corda:3,esp:.16},{p:[8.3,1.25,1.4],corda:1.8,esp:.12},e);for(let r of[-1,1]){n.add(je({p:[r*8.3,1.25,1.4],corda:1.8,esp:.1},{p:[r*9,.95,1.3],corda:1.4,esp:.08}),i),En(n,[[-2.2,.35],[-1.8,.62],[1,.66],[1.5,.58]],i,r*1.55,2.8,-3),n.cil(.52,.52,.06,14,s,r*1.55,2.8,-1.48,Math.PI/2),n.add(je({p:[r*.6,2.3,-2.2],corda:1.4,esp:.15},{p:[r*1.2,2.6,-2.4],corda:1.2,esp:.15}),i);for(let[o,a,c]of[[2.4,7170890,.2],[3.6,7170890,.2],[4.8,14540253,.15],[6,3817285,.25]])n.box(.08,.3,.9,i,r*o,.82,.8),En(n,[[-1.2,.03],[-.9,c],[.9,c],[1.3,.02]],a,r*o,.55,.8,1,1,8)}Sn(n,{p:[.3,1.8,-6.5],corda:1.6,esp:.1},{p:[3.6,1.8,-6.7],corda:1.3,esp:.09},e);for(let r of[-1,1])n.add(je({p:[r*3.6,.9,-6.5],corda:1.6,esp:.1},{p:[r*3.6,3.2,-6.9],corda:1.2,esp:.09}),e);n.box(.12,.06,.25,13639712,-9,.95,.6),n.box(.12,.06,.25,2146368,9,.95,.6);for(let r of[-1,1]){let o=r>0?"+x":"-x";n.add(new ns(.42,3,-.6,1.2),11018272,r*.62,1.15,7,0,r*Math.PI/2,0);for(let a=0;a<5;a++)n.add(new ns(.07,3),15921906,r*.64,1.25-a%2*.12,6.75+a*.12,0,r*Math.PI/2,Math.PI/2*(a%2?1:-1));n.box(.03,.12,.12,1118481,r*.64,1.3,7.15),ii(n,r*2.21,2.8,-3,.32,o,!0),Tn(n,"81",r*3.67,2.2,-6.7,.35,o,2764339)}for(let r=0;r<7;r++){let o=r/7*Math.PI*2;n.cil(.025,.025,1,4,1710618,Math.cos(o)*.07,1.25+Math.sin(o)*.07,9.2,Math.PI/2)}return n.box(.3,.04,.3,2764339,0,2.55,3.8),{corpo:n.build(),vidro:t.build(!1),trem:dc(1.2,.4,2.2,.38,5),pontas:8.8,semChama:!0}},f22(){let n=new zt,t=new zt,e=11712960,i=10397357;n.add(Jt([{z:-7.8,w:2.4,hT:.45,hB:.42,y:1.2,n:4},{z:-5.8,w:3,hT:.62,hB:.5,y:1.2,n:3.5},{z:-2,w:3.6,hT:.8,hB:.58,y:1.2,n:3.4},{z:1.4,w:3.4,hT:.84,hB:.6,y:1.2,nT:3.2,nB:3.6},{z:3.8,w:1.8,hT:.7,hB:.52,y:1.2,nT:2.4,nB:2.6},{z:6.6,w:.95,hT:.42,hB:.32,y:1.12},{z:8.6,w:.3,hT:.12,hB:.1,y:1.06},{z:9.4,w:.04,hT:.02,hB:.02,y:1.04}],22),e),t.add(Jt([{z:3.6,w:.75,hT:.25,hB:.05,y:1.92},{z:4.8,w:.95,hT:.55,hB:.05,y:1.9},{z:6.6,w:.85,hT:.42,hB:.05,y:1.72},{z:7.8,w:.45,hT:.12,hB:.05,y:1.5}],16),11569728);for(let s of[-1,1])n.box(.6,.6,.08,3356733,s*1.55,1.1,3.05,0,s*.5,0);Sn(n,{p:[1.6,1.12,2.6],corda:8,esp:.04},{p:[6.8,1.1,-1.6],corda:1.2,esp:.035},e),Sn(n,{p:[1.6,1.15,-5],corda:3,esp:.04},{p:[4.4,1.15,-6.4],corda:1.4,esp:.035},e);for(let s of[-1,1])n.add(je({p:[s*1.7,1.6,-3.4],corda:3.6,esp:.04},{p:[s*2.8,3.9,-5.4],corda:1.4,esp:.035}),i);for(let s of[-.75,.75])n.box(1.2,.55,1,4209978,s,1.2,-7.9),n.box(1,.36,1.02,1315860,s,1.2,-7.92);n.box(.12,.06,.25,13639712,-6.8,1.1,-2.2),n.box(.12,.06,.25,2146368,6.8,1.1,-2.2),ii(n,-4,1.13,0,.42,"+y",!0);for(let s of[-1,1])ii(n,s*1.81,1.25,-4.2,.3,s>0?"+x":"-x",!0),Tn(n,"04",s*.48,1.12,6.6,.3,s>0?"+x":"-x",6317676),n.box(.04,.03,3.6,8225931,s*.6,.64,-1);return{corpo:n.build(),vidro:t.build(!1),trem:dc(4.8,-.8,1.6,.32),motorZ:-8.4,motorY:1.2,chamaR:.42,motores:[-.75,.75],pontas:6.8}},osprey(){let n=new zt,t=new zt,e=10133926,i=9015445;n.add(Jt([{z:-9.2,w:.5,hT:.35,hB:.2,y:3},{z:-7,w:1.4,hT:.8,hB:.6,y:2.4},{z:-5,w:2.4,hT:1.25,hB:1.1,y:2,nT:3,nB:4},{z:5,w:2.5,hT:1.3,hB:1.15,y:2,nT:3,nB:4},{z:6.8,w:2.2,hT:1.05,hB:1,y:1.95,n:2.8},{z:8,w:1.4,hT:.6,hB:.7,y:1.8},{z:8.7,w:.4,hT:.15,hB:.25,y:1.7}],22),e),t.add(Jt([{z:6.4,w:2.26,hT:1.08,hB:.05,y:1.95,n:2.8},{z:7.6,w:1.66,hT:.75,hB:.05,y:1.85},{z:8.4,w:.9,hT:.32,hB:.05,y:1.75}],16),re);for(let o of[-1,1])n.add(Jt([{z:-2.8,w:.5,hT:.4,hB:.35,y:1.15,x:o*1.35},{z:-2,w:.8,hT:.5,hB:.45,y:1.1,x:o*1.4},{z:2.6,w:.8,hT:.5,hB:.45,y:1.1,x:o*1.4},{z:3.4,w:.5,hT:.3,hB:.3,y:1.15,x:o*1.35}],12),i);Sn(n,{p:[0,3.55,2],corda:2.6,esp:.16},{p:[7,3.6,1.9],corda:2.2,esp:.14},e),Sn(n,{p:[0,3,-7.6],corda:1.6,esp:.1},{p:[2.7,3,-8],corda:1.2,esp:.09},e);for(let o of[-1,1])n.add(je({p:[o*2.7,2.6,-7.8],corda:1.5,esp:.1},{p:[o*2.7,4.9,-8.3],corda:1.1,esp:.09}),e);for(let o of[-1,1])n.roda(.4,.3,si,o*1.5,.4,.5);n.roda(.3,.2,si,0,.3,6);let s=new zt;s.add(Jt([{z:-2.2,w:.85,hT:.42,hB:.42,y:0},{z:-1.6,w:1.4,hT:.68,hB:.68,y:0},{z:1.8,w:1.36,hT:.66,hB:.66,y:0},{z:2.3,w:.7,hT:.35,hB:.35,y:0}],14),e),s.cil(.3,.3,.5,10,i,0,0,2.4,Math.PI/2);let r=s.build();r.rotateX(-Math.PI/2);for(let o of[-1,1])ii(n,o*1.26,2.2,-2.5,.4,o>0?"+x":"-x",!0);for(let o of[-1,1])Tn(n,"00",o*2.78,3.9,-8.3,.4,o>0?"+x":"-x",1973790);return n.cil(.06,.06,2.6,6,mt,.85,2.3,8.6,Math.PI/2),{corpo:n.build(),vidro:t.build(!1),nacele:r,rotor:Ur(3,5.8),naceleX:7,naceleY:3.7}}};function Lu(n,t,e,i,s={}){var a,c;let r=[];for(let h=0;h<=14;h++){let l=h/14,u=-n/2+l*n,f=t;l>.6&&(f=t*Math.sqrt(Math.max(0,1-Math.pow((l-.6)/.4,2.2)))),l<.08&&(f=t*(.86+.14*l/.08));let d=l>.7?Math.pow((l-.7)/.3,2)*((a=s.sheer)!=null?a:e*.25):0,p=i*(l>.85?1-(l-.85)/.15*.6:1),v=l>.65?1.3+(1-l)*3:(c=s.fundoChato)!=null?c:3.2;r.push({z:u,w:Math.max(.05,f),hT:e+d,hB:Math.max(.05,p),y:0,nT:9,nB:v})}return Jt(r,20)}var _y={lancha(){let n=new zt,t=new zt,e=8358032,i=6910586;n.add(Lu(25,5.4,1.6,1,{fundoChato:1.6,sheer:.7}),e),n.box(5,.06,23,5923176,0,1.62,-.5),n.perfil([[-3.5,1.6],[-3.5,3.7],[1.4,3.7],[3.4,1.6]],3.8,i,0,.15),t.box(3.4,.75,.06,re,0,2.85,2.55,-.86);for(let r of[-1,1])t.box(.06,.6,2.6,re,r*1.92,3,-.2);n.cil(.12,.12,3.2,6,mt,0,5.3,-1.5),n.box(1.8,.25,.25,mt,0,6.3,-1.5),n.esf(.5,sn,0,7,-1.5,1,.5,1);for(let r of[-1,1])n.box(.06,.6,18,4870230,r*2.55,1.95,-1);n.cil(.3,.35,.6,8,i,0,1.9,-9),n.cil(.05,.05,1.6,6,mt,0,2.3,-8,Math.PI/2);let s=new zt;s.cil(.65,.75,.6,10,i,0,0,0),s.bloco(1,.7,1.2,e,0,.6,0,0,0,0,.2),s.cil(.08,.1,2.4,8,mt,0,.6,1.6,Math.PI/2),Tn(n,"602",2.62,.7,6,.7,"+x",15921906),Tn(n,"602",-2.62,.7,6,.7,"-x",15921906);for(let r of[-1,1])n.add(new Er(.32,.07,6,14),16738842,r*1.95,2.6,-2.6,0,Math.PI/2,0);return n.cil(.03,.03,1.6,4,mt,0,2.4,-11.6),n.box(.02,.5,.8,1847147,0,3,-12),n.cil(.45,.45,.35,12,15263976,0,4,.3),{corpo:n.build(),vidro:t.build(!1),torre:s.build(),torreY:1.95,torreZ:8,canoZ:2.8,canoY:.6}},lcac(){let n=new zt,t=8226447,e=6252399;n.bloco(14.2,1.9,26,2369322,0,.95,0,0,0,0,.9),n.box(12.6,.35,23.5,e,0,1.95,0);for(let i of[-1,1]){n.bloco(2.3,2.6,21,t,i*5.9,3.3,-.5,0,0,0,.3);for(let s=0;s<4;s++)n.box(.06,.5,.8,re,i*7.07,3.6,-7+s*4);n.cil(2.35,2.35,1.4,18,t,i*3.6,4.6,-11.6,Math.PI/2),n.cil(1.95,1.95,1.45,16,1710618,i*3.6,4.6,-11.6,Math.PI/2),n.box(.15,3.6,.9,e,i*3.6,4.6,-12.7),n.box(.15,3.6,.9,e,i*2.6,4.6,-12.7),n.bloco(1.6,1.2,2.4,e,i*5.9,5.1,-6,0,0,0,.3)}return n.bloco(2.4,1.6,2.8,t,5.9,5.4,6.5,0,0,0,.3),n.box(2.42,.5,2,re,5.9,5.7,7),n.box(10.5,.15,2,9080724,0,2.6,12,-.6),{corpo:n.build()}},destroier(){let n=new zt,t=8358032,e=6713464,i=5726054;n.add(Lu(158,20.4,4.2,5,{sheer:2.2}),t),n.box(18.5,.1,120,5791332,0,4.25,-10),n.perfil([[-2,4.2],[-2,13.5],[12,17.5],[24,17.5],[27,4.2]],14.5,t,0,.2),n.perfil([[8,17.5],[10,23],[20,23],[22,17.5]],10,t,0,.15),n.box(9.6,1.4,.15,re,0,21.2,21.7,-.35);for(let r of[-1,1])n.cil(3.3,3.3,.3,8,9213340,r*7.25,13,16,0,0,Math.PI/2+r*.35),n.cil(3.3,3.3,.3,8,9213340,r*4.5,13,3.5,Math.PI/2-.35,0,0);n.cil(3.3,3.3,.3,8,9213340,0,13.5,24.5,-Math.PI/2+.6,0,0);for(let[r,o]of[[-1.2,-1.2],[1.2,-1.2],[-1.2,1.2],[1.2,1.2]])n.box(.25,16,.25,e,r,31,10+o);for(let r=0;r<4;r++)n.box(2.8,.2,2.8,e,0,25+r*4,10);n.box(7,.4,.4,e,0,36,10),n.cil(.08,.08,6,6,mt,0,42,10),n.esf(.8,sn,2.5,34,10),n.perfil([[-12,4.2],[-11,16],[-6,16],[-5,4.2]],6,t,0,.2),n.box(5.4,.6,1.8,2236962,0,16.2,-7.8),n.box(5.4,.6,1.8,2236962,0,16.2,-9.6),n.perfil([[-34,4.2],[-33,15],[-28,15],[-27,4.2]],6,t,0,.2),n.box(5.4,.6,1.8,2236962,0,15.2,-29.8),n.box(5.4,.6,1.8,2236962,0,15.2,-31.6),n.perfil([[-26,4.2],[-26,9],[-13,9],[-13,4.2]],11,e,0,.15),n.perfil([[-50,4.2],[-50,10],[-35,12],[-35,4.2]],14,t,0,.15);for(let[r,o]of[[34,4],[-46,4]]){n.box(8,.25,o*2.2,i,0,4.35,r);for(let a=0;a<o;a++)for(let c=0;c<4;c++)n.box(1.6,.1,1.7,4278092,-3+c*2,4.5,r-(o-1)*1.1+a*2.2)}n.box(14,.12,18,4869972,0,4.3,-64),n.box(.4,.05,14,sn,0,4.4,-64),n.cil(4.5,4.5,.05,24,15123002,0,4.36,-64),n.cil(4.2,4.2,.07,24,4869972,0,4.37,-64),n.cil(1.1,1.3,2.2,10,sn,0,15.2,-19),n.esf(1.1,sn,0,16.7,-19),n.cil(1.1,1.3,2.2,10,sn,0,18.6,15),n.esf(1.1,sn,0,20,15);for(let r of[-1,1])n.bloco(1.8,1,6,3093560,r*6.5,10,-20,0,0,0,.4);let s=new zt;s.perfil([[-2.2,0],[-2.2,1.8],[.8,2.2],[2.6,1],[2.6,0]],3.6,t,0,.15),s.cil(.2,.28,7,10,e,0,1.2,5.6,Math.PI/2),s.cil(.32,.32,.6,10,e,0,1.2,2.8,Math.PI/2),Tn(n,"117",8.4,1.6,52,2.4,"+x"),Tn(n,"117",-8.4,1.6,52,2.4,"-x");for(let r of[-1,1]){To(n,r*9.9,-76,r*10.05,20,4.2),To(n,r*10.05,20,r*7.5,50,4.2),To(n,r*7.5,50,r*2,74,4.2+1.4),n.bloco(.6,1.2,1.4,2764080,r*5.2,3.2,66,0,0,0,.2);for(let o=0;o<4;o++)n.cil(.35,.35,1.6,10,sn,r*7.6,9.4,-4+o*2.2,0,0,Math.PI/2);for(let o=0;o<4;o++)n.cil(.22,.22,3.4,8,4870230,r*(1.2+o*.5),6,-24,.25,0,0)}n.cil(.05,.05,3,4,mt,0,45,10),n.box(.02,1,1.6,1847147,0,46,9.1),n.box(.02,.5,.8,11674164,0,46.2,8.7);for(let r of[-1,1])nn(n,r*3.5,26,10,4);return{corpo:n.build(),torre:s.build(),torreY:4.3,torreZ:56,canoZ:9.2,canoY:1.2}},portaavioes(){let n=new zt;n.add(Lu(320,40,8,10,{sheer:1}),Pu),n.simetrica([[33,-158],[34,-40],[32,60],[22,140],[12,158]],2.5,Lr,5.5),n.planta([[-38,-160],[36,-160],[37,-20],[24,160],[-24,160],[-26,40],[-40,-60]],1,4540491,8);let t=9.03,e=15123002,i=15790314,s=12597547,r=-.16,o=-10,a=-45,c=Math.cos(r),h=Math.sin(r),l=(p,v)=>[o+v*c+p*h,a-v*h+p*c];for(let p=-100;p<100;p+=8){let[v,m]=l(p,0);n.box(.6,.04,4.5,i,v,t+.01,m,0,r,0)}for(let p of[-14,14])for(let v=-100;v<100;v+=6){let[m,g]=l(v,p);n.box(.4,.04,3,i,m,t,g,0,r,0)}for(let p=0;p<4;p++){let[v,m]=l(-70+p*9,0);n.box(26,.05,.25,2236962,v,t+.02,m,0,r,0)}for(let p of[-6,6,-28,-18])n.box(.5,.05,80,2829099,p,t+.01,p>-10?110:30);for(let p of[-6,6])n.box(.3,.05,80,e,p+1.2,t+.02,110);n.box(.5,.04,300,e,32,t,0),n.box(.5,.04,300,s,-36,t,-10,0,.03,0);for(let[p,v]of[[36,-80],[36,30],[-40,-30]])n.box(14,.6,16,4079940,p,8.6,v);let u={6:"afedcg",8:"abcdefg"},f=(p,v,m,g,M)=>{let _={a:[0,g,m,.9],b:[m/2,g/2,.9,g/2],c:[m/2,-g/2,.9,g/2],d:[0,-g,m,.9],e:[-m/2,-g/2,.9,g/2],f:[-m/2,g/2,.9,g/2],g:[0,0,m,.9]}[M];n.box(_[2],.05,_[3],i,p+_[0],t+.02,v+_[1])};for(let[p,v]of[[6,-6],[8,6]])for(let m of u[p])f(v,128,6,5,m);n.box(11,16,30,Pu,30,17,-30),n.box(10,6,22,Lr,30,27.5,-28),n.box(8.5,5,14,Pu,30,33,-26),n.box(9.2,1.4,.2,re,30,33.5,-18.95);for(let p of[24.4,35.6])n.box(.2,1.2,12,re,p,33.5,-26);for(let p=0;p<3;p++)n.box(10.6,.15,30.4,Lr,30,12+p*5,-30);for(let p of u[6]){let v={a:[0,4,4,.8],b:[2,2,.8,4],c:[2,-2,.8,4],d:[0,-4,4,.8],e:[-2,-2,.8,4],f:[-2,2,.8,4],g:[0,0,4,.8]}[p];n.box(.2,v[3],v[2],i,24.4,22+v[1],-36+v[0])}for(let p of u[8]){let v={a:[0,4,4,.8],b:[2,2,.8,4],c:[2,-2,.8,4],d:[0,-4,4,.8],e:[-2,-2,.8,4],f:[-2,2,.8,4],g:[0,0,4,.8]}[p];n.box(.2,v[3],v[2],i,24.4,22+v[1],-30+v[0])}for(let[p,v]of[[-1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]])n.box(.35,14,.35,Lr,30+p,42,-30+v);for(let p=0;p<4;p++)n.box(3.6,.25,3.6,Lr,30,36+p*3.5,-30);n.box(8,.5,.6,Lr,30,47,-30),n.box(5,2.2,.3,13620182,30,45,-24,0,.3,0),n.esf(1.6,sn,33,38.5,-40),n.esf(1.3,sn,27,38,-40),n.cil(.2,.2,6,6,mt,30,52,-30);for(let p=0;p<5;p++)n.cil(.7,.7,2.5,8,14540253,34.5,6,-120+p*12,Math.PI/2);n.box(3,1.2,4,15123002,26,9.6,-55),n.box(2.5,1.6,3.5,14540253,20,9.8,10),n.box(2,1,3,15123002,-20,9.5,70);for(let[p,v]of[[33,150],[-30,-150],[33,-150]])n.cil(1.2,1.4,2,10,sn,p,10,v),n.cil(.2,.2,2.4,6,mt,p,11,v+1.4,Math.PI/2);Tn(n,"68",19.5,3,125,6,"+x"),Tn(n,"68",-19.5,3,125,6,"-x"),To(n,37.5,-150,37.5,-25,9,9080981,1.2),To(n,-40.5,-150,-40.5,-65,9,9080981,1.2);let d=w0.f18();for(let p=0;p<6;p++)M0(n,d.corpo,-28+p%2*14,9,70+Math.floor(p/2)*22,Math.PI*.8,1);for(let p=0;p<3;p++)M0(n,d.corpo,30,9,40+p*24,-Math.PI*.5,1);return{corpo:n.build()}}},yy={pista(){let n=new zt;n.box(40,.12,320,3882562,0,.06,0);for(let t=-140;t<140;t+=16)n.box(.8,.03,8,15790314,0,.14,t);for(let t of[-1,1])n.box(.6,.03,320,15790314,t*18,.14,0);for(let t=0;t<8;t++)for(let e of[-1,1])n.box(1.4,.03,12,15790314,-14+t*4,.14,e*150);n.box(50,.1,140,4869456,-45,.05,80);for(let t=0;t<3;t++)n.perfil([[-12,0],[-12,6],[-6,10],[6,10],[12,6],[12,0]],30,8226168,-85,.2);return n.cil(.3,.4,18,8,mt,-75,9,-120),n.box(6,4,6,11580328,-75,20,-120),n.box(6.2,1.4,6.2,re,-75,21.5,-120),{corpo:n.build()}},acampamento(){let n=new zt,t=13;for(let e=0;e<26;e++){let i=e/26*Math.PI*2;if(e%9===0)continue;let s=Math.sin(i)*t,r=Math.cos(i)*t;n.bloco(3.2,.5,.7,11048298,s,.25,r,0,i+Math.PI/2,0,.2),n.bloco(2.9,.5,.7,10259040,s,.72,r,0,i+Math.PI/2+.1,0,.2),e%3===0&&n.bloco(2.6,.45,.65,11574384,s,1.15,r,0,i+Math.PI/2,0,.2)}for(let[e,i,s,r]of[[t+2,3,.2,9054756],[-t-2,-4,-.3,2902650],[3,-t-2,1.5,13684944]])n.bloco(1.8,1.3,4.3,r,e,.65,i,0,s,Math.PI/2-.1,.25);for(let[e,i,s,r]of[[-5,3,.3,5208634],[4,5,-.5,3824266],[-2,-6,1.2,11758122],[6,-3,2,6974010]]){let o=new Bn(.01,2,2,4,1);n.add(o,r,e,1,i,0,s,0,1.2,1,.9)}for(let e=0;e<6;e++)n.box(.9,.7,.9,8018486,-8+e*.95,.35,8-e%2*.9);for(let e=0;e<4;e++)n.cil(.4,.4,1,10,e%2?3103370:9058858,8+e%2*.9,.5,6-Math.floor(e/2)*.9);n.cil(.9,1,.25,10,5591628,0,.12,0);for(let e=0;e<4;e++)n.box(1.2,.18,.18,4863008,0,.3,0,0,e*.8,0);return n.cil(.06,.06,4.5,6,mt,-9,2.25,-5),n.box(.04,.9,1.4,15790320,-9,4,-4.3),{corpo:n.build()}},qg(){let n=new zt;n.box(40,12,26,13352347,0,6,0),n.box(30,4,20,12036484,0,14,0),n.box(42,1,28,9208165,0,12.4,0),n.cil(.25,.25,26,6,mt,14,29,6),n.box(.4,2.4,4,2837132,14,40,8.2),n.box(.42,1.2,2,sn,14,40.6,7.1),n.cil(2.8,2.8,.6,14,sn,-9,16.8,-4,.5),n.cil(.3,.3,4,6,mt,-9,18,-4);for(let t=0;t<5;t++)n.box(5,2.2,.15,re,-16+t*8,6.5,13.05);return{corpo:n.build()}},quartel(){let n=new zt;for(let t=0;t<3;t++)n.box(14,5,40,12036742,-20+t*20,2.5,0),n.box(15,.8,41,7038032,-20+t*20,5.4,0);for(let t=0;t<24;t++)n.box(1.4,1,.7,10127970,-32+t*2.8,.5,24);return{corpo:n.build()}},patio(){let n=new zt;n.box(60,9,30,11117199,0,4.5,-10),n.box(62,.8,32,6249295,0,9.3,-10);for(let t=0;t<5;t++)n.box(9,7,.3,7369832,-24+t*12,3.5,5.2);return n.box(64,.15,30,5593178,0,.08,22),{corpo:n.build()}},heliporto(){let n=new zt;for(let[t,e]of[[-30,0],[0,0],[30,0],[-15,32],[15,32]])n.cil(12,12,.3,20,4540491,t,.15,e),n.box(1.2,.05,7,15921906,t-2.2,.33,e),n.box(1.2,.05,7,15921906,t+2.2,.33,e),n.box(3.4,.05,1.2,15921906,t,.33,e);return n.box(14,7,10,10133644,0,3.5,-24),n.cil(.2,.2,9,6,mt,6,4.5,-20),n.cil(.6,.1,2.2,8,16743168,6,9,-20,0,0,1.3),{corpo:n.build()}},docas(){let n=new zt;n.box(16,1.2,70,8156264,0,.6,0);for(let t=0;t<8;t++)n.cil(.5,.5,4,6,5196354,7,-1,-32+t*9);return n.box(10,6,12,10133644,-4,4,-26),n.box(1.5,12,1.5,13934615,3,6,18),n.box(1.5,1.5,14,13934615,3,12,12),{corpo:n.build()}},zona(){let n=new zt;for(let t=0;t<4;t++)for(let e=0;e<3;e++)n.box(8,3,14,15328466,-18+t*12,1.5,-14+e*17),n.cil(.01,4.2,1.8,4,16052450,-18+t*12,3.9,-14+e*17,0,Math.PI/4,0);return n.box(56,.1,56,7309914,0,.06,0),{corpo:n.build()}},fob(){let n=new zt;for(let t=0;t<32;t++){let e=t/32*Math.PI*2;t%8!==0&&n.bloco(2.4,2.2,1.2,12758402,Math.sin(e)*26,1.1,Math.cos(e)*26,0,e+Math.PI/2,0,.1)}for(let[t,e,i]of[[-8,-6,0],[-8,4,0],[6,-8,1.57],[10,6,.3]])n.bloco(5,2.6,9,7304528,t,1.3,e,0,i,0,1.2);n.cil(.15,.25,14,6,mt,0,7,-14),n.box(.6,1.2,.1,sn,0,12,-13.8),n.cil(6,6,.15,20,4474698,8,.08,14),n.box(1,.05,4,sn,7,.18,14),n.box(1,.05,4,sn,9,.18,14),n.box(2.4,.05,.8,sn,8,.18,14),n.cil(.08,.08,6,6,mt,-14,3,10),n.box(.05,1,1.6,2837132,-14,5.4,10.8);for(let t=0;t<5;t++)n.box(1,.8,1,6969914,14+t%2,.4,-10+t);return{corpo:n.build()}},muro(){let n=new zt;for(let t=0;t<5;t++)n.bloco(1.4,2.2,1.9,12758402,0,1.1,-4+t*2,0,0,0,.12),n.box(1.45,.06,1.95,7827546,0,2.22,-4+t*2);return{corpo:n.build()}},torre(){let n=new zt;for(let[t,e]of[[-1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]])n.box(.3,9,.3,5984320,t,4.5,e);return n.box(4.5,2.2,4.5,8022607,0,10,0),n.box(5,.4,5,4866612,0,11.6,0),{corpo:n.build()}},patriot(){let n=new zt;return n.box(2.6,1.2,9,E0,0,1.3,0),Dr(n,[-1.1,1.1],[-3,-1.6,2.8],.55,.45),n.box(2.6,1.8,6,T0,0,3,-1.2,-.6),{corpo:n.build()}}},My=Object.assign({},vy,w0,_y,yy);function Nr(n){let t=y0["_d_"+n]||(y0["_d_"+n]=My[n]()),e=new Pi,i={grupo:e,def:t};if(e.add(new ae(t.corpo,fc())),t.vidro&&e.add(new ae(t.vidro,py())),t.torre){let s=new ae(t.torre,fc());s.position.set(0,t.torreY,t.torreZ),e.add(s),i.torre=s}if(t.rotor&&!t.nacele){let s=new ae(t.rotor,Eo);s.position.set(0,t.rotorY,t.rotorZ),e.add(s),i.rotor=s}if(t.rotor2){let s=new ae(t.rotor2,Eo);s.position.set(0,t.rotor2Y,t.rotor2Z),e.add(s),i.rotor2=s}if(t.cauda){let s=new ae(t.cauda,Eo);s.position.set(...t.caudaPos),e.add(s),i.cauda=s}if(t.helice){let s=new ae(t.helice,Eo);s.position.set(0,t.heliceY,t.heliceZ),s.rotation.x=Math.PI/2,e.add(s),i.helice=s}if(t.motorZ!==void 0&&!t.semChama){let s=t.chamaR||.5,r=new uo(s,s*8,12,1,!0);r.rotateX(-Math.PI/2),r.translate(0,0,-s*4);let o=new Dn({color:16751184,transparent:!0,opacity:.75,blending:fr,depthWrite:!1}),a=new uo(s*.7,s*5,12,1,!0);a.rotateX(-Math.PI/2),a.translate(0,0,-s*2.5);let c=new Dn({color:10471679,transparent:!0,opacity:.9,blending:fr,depthWrite:!1}),h=new Er(s*.45,s*.12,6,12),l=new Dn({color:16769200,transparent:!0,opacity:.8,blending:fr,depthWrite:!1});i.chamas=[];for(let u of t.motores||[0]){let f=new ae(r,o),d=new ae(a,c);f.position.set(u,t.motorY,t.motorZ),d.position.set(u,t.motorY,t.motorZ),e.add(f),e.add(d),i.chamas.push(f,d);for(let p=1;p<=3;p++){let v=new ae(h,l);v.position.set(u,t.motorY,t.motorZ-p*s*1.6),e.add(v),i.chamas.push(v)}}}if(t.trem&&(i.trem=new ae(t.trem,fc()),e.add(i.trem)),t.nacele){i.naceles=[];for(let s of[-1,1]){let r=new Pi;r.position.set(s*t.naceleX,t.naceleY,.6);let o=new ae(t.nacele,fc());r.add(o);let a=new ae(t.rotor,Eo);a.position.set(0,2.65,0),r.add(a),e.add(r),i.naceles.push({piv:r,ro:a})}}return e.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),i}function A0(n,t=5046122){let e=new Za(n*.86,n,28).rotateX(-Math.PI/2),i=new ae(e,new Dn({color:t,transparent:!0,opacity:.85,depthWrite:!1}));return i.renderOrder=3,i}var pc=(n,t=10)=>So(n.map(([e,i,s,r])=>({y:e,w:i,f:s,t:r,n:2.1})),t),by=()=>xe;function kt(n,t,e,i,s,r,o=0,a=0,c=0){let h=t.index?t.toNonIndexed():t;(o||a||c)&&h.applyMatrix4(new se().makeRotationFromEuler(new Be(o,a,c))),h.translate(i,s,r);let l=h.attributes.position.count,u=new Float32Array(l*3),f=Array.isArray(e)?e:[e,e,e];for(let d=0;d<l;d++)u[d*3]=f[0],u[d*3+1]=f[1],u[d*3+2]=f[2];h.setAttribute("color",new ue(u,3)),h.attributes.uv||h.setAttribute("uv",new ue(new Float32Array(l*2),2)),n.push(h)}var _e=(n,t,e)=>new hn(n,t,e),cs=(n,t,e,i=7)=>new Bn(n,t,e,i),Ns=(n,t,e,i)=>{let s=new Xn(n,12,8);return s.scale(t,e,i),s};function Sy(n,t,e,i){let s=new Bn(n*.72,t*.72,e,8);return s.rotateY(Math.PI/8),s.scale(1,1,i),s}function wn(n){let t=[];return n(t),di(t)}var Ey=.93,R0=.44,C0=.43,Uu=.29,Du=.27,wo=.5;function Ty(){return{quadril:wn(n=>{kt(n,So([{y:.03,w:.29,f:.105,t:.1,n:2.4},{y:-.07,w:.315,f:.11,t:.115,n:2.4},{y:-.15,w:.27,f:.085,t:.1,n:2.2},{y:-.19,w:.16,f:.05,t:.06}],14),1,0,0,0)}),tronco:wn(n=>{kt(n,So([{y:-.03,w:.29,f:.105,t:.1,n:2.4},{y:.07,w:.275,f:.11,t:.095,n:2.4},{y:.19,w:.315,f:.125,t:.1,n:2.5},{y:.31,w:.365,f:.137,t:.11,n:2.6},{y:.41,w:.395,f:.128,t:.115,n:2.8},{y:.47,w:.37,f:.095,t:.105,n:2.8},{y:.515,w:.22,f:.07,t:.08},{y:.545,w:.11,f:.05,t:.05}],16),1,0,0,0),kt(n,Ns(.072,1.05,.95,1.05),1,.19,.445,0),kt(n,Ns(.072,1.05,.95,1.05),1,-.19,.445,0),kt(n,cs(.048,.055,.1,10),.93,0,.58,.005)}),cabeca:wn(n=>{kt(n,new Xn(.112,14,10).scale(.9,1.08,1),1,0,.12,.005),kt(n,Ns(.05,.9,.7,.6),.97,0,.065,.075),kt(n,_e(.04,.05,.04),.95,0,.12,.112),kt(n,_e(.035,.02,.012),.12,.042,.15,.104),kt(n,_e(.035,.02,.012),.12,-.042,.15,.104),kt(n,_e(.05,.012,.01),.45,0,.068,.103),kt(n,Ns(.03,.5,1,.8),.92,.106,.12,0),kt(n,Ns(.03,.5,1,.8),.92,-.106,.12,0)}),cabelo:wn(n=>{let t=new Xn(.118,10,6,0,Math.PI*2,0,Math.PI*.55);t.scale(.95,1.05,1.05),kt(n,t,1,0,.13,-.008),kt(n,Ns(.1,1,.9,.6),1,0,.1,-.06)}),capacete:wn(n=>{let t=new Xn(.135,12,6,0,Math.PI*2,0,Math.PI*.52);t.scale(1,.92,1.1),kt(n,t,1,0,.145,-.005),kt(n,cs(.137,.142,.035,12).scale(1,1,1.1),.85,0,.15,-.005),kt(n,_e(.05,.04,.035),.3,0,.23,.13),kt(n,cs(.018,.018,.08),.2,.026,.25,.155,Math.PI/2-.4),kt(n,cs(.018,.018,.08),.2,-.026,.25,.155,Math.PI/2-.4),kt(n,_e(.18,.03,.025),.25,0,.14,.115),kt(n,_e(.04,.05,.05),.65,.128,.18,0),kt(n,_e(.04,.05,.05),.65,-.128,.18,0),kt(n,_e(.07,.05,.03),.4,0,.21,-.14)}),colete:wn(n=>{kt(n,So([{y:0,w:.33,f:.145,t:.135,n:3},{y:.16,w:.375,f:.16,t:.14,n:3.2},{y:.29,w:.405,f:.155,t:.135,n:3.2},{y:.35,w:.34,f:.125,t:.125,n:3}],16),1,0,0,0);for(let t of[-.11,0,.11])kt(n,_e(.095,.12,.055),.8,t,.07,.17);kt(n,_e(.16,.1,.045),.78,.07,.2,.17),kt(n,_e(.11,.08,.045),.78,-.12,.15,.165);for(let t of[-.13,.13])kt(n,_e(.06,.06,.26),.7,t,.355,0);kt(n,_e(.34,.055,.25),.55,0,-.07,0)}),mochila:wn(n=>{kt(n,Sy(.3,.28,.38,.55),1,0,.28,-.18),kt(n,_e(.26,.13,.05),.85,0,.2,-.27),kt(n,cs(.065,.065,.3,8),.8,0,.5,-.18,0,0,Math.PI/2),kt(n,cs(.008,.008,.35,4),.25,.1,.62,-.2)}),coxa:wn(n=>{kt(n,pc([[.04,.15,.08,.075],[-.05,.175,.098,.085],[-.2,.162,.09,.08],[-.34,.128,.07,.066],[-.43,.112,.062,.06],[-.47,.085,.045,.045]]),1,0,0,0),kt(n,_e(.05,.11,.09),.75,.085,-.2,0)}),canela:wn(n=>{kt(n,pc([[.03,.105,.058,.058],[-.1,.112,.055,.072],[-.24,.092,.046,.052],[-.37,.078,.04,.042],[-.4,.06,.03,.03]]),1,0,0,0),kt(n,Ns(.055,1.1,1,.7),.75,0,-.02,.05)}),bota:wn(n=>{kt(n,_e(.11,.1,.25),1,0,-.04,.05),kt(n,_e(.115,.03,.27),.5,0,-.085,.05)}),braco:wn(n=>{kt(n,pc([[.03,.1,.05,.05],[-.08,.112,.06,.056],[-.2,.094,.048,.046],[-.29,.084,.042,.042],[-.32,.06,.03,.03]]),1,0,0,0)}),antebraco:wn(n=>{kt(n,pc([[.02,.082,.04,.04],[-.07,.09,.046,.044],[-.2,.068,.034,.033],[-.25,.058,.03,.03]]),1,0,0,0)}),mao:wn(n=>{kt(n,_e(.075,.095,.045),1,0,-.045,.01),kt(n,_e(.025,.05,.03),1,.035,-.03,.03)}),arma:wn(n=>{kt(n,_e(.045,.07,.24),.3,0,.05,-.27),kt(n,_e(.05,.085,.3),.2,0,.06,-.02),kt(n,_e(.058,.07,.24),.3,0,.055,.25),kt(n,cs(.011,.011,.3),.13,0,.055,.5,Math.PI/2),kt(n,cs(.017,.017,.06),.13,0,.055,.66,Math.PI/2),kt(n,_e(.035,.13,.06),.3,0,-.04,.05,.3),kt(n,_e(.03,.09,.04),.3,0,-.02,-.06,-.3),kt(n,_e(.035,.055,.12),.12,0,.13,.03),kt(n,_e(.04,.04,.02),.5,0,.13,.095)})}}function wy(){let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d");e.fillStyle="#b8ab84",e.fillRect(0,0,128,128);let i=77,s=()=>(i=i*1664525+1013904223>>>0,i/4294967296),r=["#8d7f58","#6f7350","#cfc4a2","#7a5f40","#9a9467"];for(let a=0;a<90;a++){e.fillStyle=r[a%r.length],e.beginPath();let c=s()*128,h=s()*128,l=3+s()*8;for(let u=0;u<6.28;u+=.7){let f=l*(.6+s()*.6);e.lineTo(c+Math.cos(u)*f,h+Math.sin(u)*f*.7)}e.fill()}let o=new Nn(t);return o.wrapS=o.wrapT=Gn,o.colorSpace=Ie,o}var Ay={quadril:1,tronco:1,coxa:1,canela:1,braco:1,antebraco:1,mochila:1,colete:1},Ry={coxa:1,canela:1,bota:1,braco:1,antebraco:1,mao:1};function P0(n,t,e,i){let s=Math.asin(Math.max(-1,Math.min(1,n))),r=Math.atan2(-e,-t);i[0]=r,i[1]=s}var mc=class{constructor(t,e,i,s){this.m={},this.n={},this.max={};for(let r in e){let o=Ry[r]?i*2:i,a=new tn({vertexColors:!0,map:s&&Ay[r]?s:null}),c=new br(e[r],a,o);c.instanceMatrix.setUsage(is),c.instanceColor=new Rs(new Float32Array(o*3),3),c.count=0,c.frustumCulled=!1,c.castShadow=by()>=2,t.add(c),this.m[r]=c,this.n[r]=0,this.max[r]=o}}comecar(){for(let t in this.n)this.n[t]=0}terminar(){for(let t in this.m){let e=this.m[t];e.count=Math.min(this.max[t],this.n[t]),e.instanceMatrix.needsUpdate=!0,e.instanceColor.needsUpdate=!0}}parte(t,e,i,s,r,o,a,c,h,l,u,f,d){let p=this.m[t],v=this.n[t]++;if(v>=this.max[t])return;let m=p.instanceMatrix.array,g=v*16,M=Math.cos(l),_=Math.sin(l),y=Math.cos(u),R=Math.sin(u),w=r*y+o*_*R,A=-r*R+o*_*y,I=o*M,S=M*R,b=M*y,P=-_,L=-o*y+r*_*R,U=o*R+r*_*y,D=r*M;m[g]=w*f,m[g+1]=S*f,m[g+2]=L*f,m[g+3]=0,m[g+4]=A*f,m[g+5]=b*f,m[g+6]=U*f,m[g+7]=0,m[g+8]=I*f,m[g+9]=P*f,m[g+10]=D*f,m[g+11]=0,m[g+12]=e+(r*a+o*h)*f,m[g+13]=i+c*f,m[g+14]=s+(-o*a+r*h)*f,m[g+15]=1;let W=p.instanceColor.array,H=v*3;W[H]=d[0],W[H+1]=d[1],W[H+2]=d[2]}},Cy=[.25,.22,.18],Nu=[.13,.13,.14],Py=[.62,.56,.42],Iy=[.52,.48,.36],zy=[.55,.45,.32],Ly=[.2,.18,.17],ls=[0,0],gc=class{constructor(t){let e=Ty();this.civ=new mc(t,e,2600,null),this.mil=new mc(t,e,600,wy())}comecar(){this.civ.comecar(),this.mil.comecar()}terminar(){this.civ.terminar(),this.mil.terminar()}_membro(t,e,i,s,r,o,a,c,h,l,u,f,d,p,v,m,g,M){let _=a[0]-o[0],y=a[1]-o[1],R=a[2]-o[2],w=Math.hypot(_,y,R)||1e-4,A=Math.min(w,(s+r)*.999),I=_/w,S=y/w,b=R/w,P=(s*s-r*r+A*A)/(2*A),L=Math.sqrt(Math.max(0,s*s-P*P)),U=c[0]*I+c[1]*S+c[2]*b,D=c[0]-U*I,W=c[1]-U*S,H=c[2]-U*b,Q=Math.hypot(D,W,H)||1;D/=Q,W/=Q,H/=Q;let V=o[0]+I*P+D*L,Z=o[1]+S*P+W*L,j=o[2]+b*P+H*L,tt=Math.hypot(V-o[0],Z-o[1],j-o[2])||1;P0((V-o[0])/tt,(Z-o[1])/tt,(j-o[2])/tt,ls),t.parte(e,h,l,u,f,d,o[0],o[1],o[2],ls[0],ls[1],p,v);let ut=o[0]+I*A,Et=o[1]+S*A,Y=o[2]+b*A,F=Math.hypot(ut-V,Et-Z,Y-j)||1;return P0((ut-V)/F,(Et-Z)/F,(Y-j)/F,ls),t.parte(i,h,l,u,f,d,V,Z,j,ls[0],ls[1],p,m),g&&t.parte(g,h,l,u,f,d,ut,Et,Y,ls[0],ls[1],p,M),{ex:V,ey:Z,ez:j,hx:ut,hy:Et,hz:Y}}add(t,e,i,s,r,o,a,c,h,l=0,u=1,f=null,d=1){let p=l===1||l===3,v=p?this.mil:this.civ,m=Math.cos(s),g=Math.sin(s),M=l===1||l===2||l===4||l===5;if(o===3){v.parte("tronco",t,e+.15,i,m,g,0,0,0,Math.PI/2,0,u,a),v.parte("cabeca",t,e+.15,i,m,g,0,0,wo+.08,Math.PI/2,0,u,h),v.parte("quadril",t,e+.12,i,m,g,0,0,0,Math.PI/2,0,u,c);for(let j of[1,-1])v.parte("coxa",t,e+.1,i,m,g,j*.1,0,-.05,-Math.PI/2,j*.15,u,c),v.parte("braco",t,e+.12,i,m,g,j*.22,0,wo-.05,-Math.PI/2-.5,j*.5,u,a);return}let _=Math.sin(r),y=Math.cos(r),R=Math.min(1,d),w=o===1?.35:o===2?.12:.05+R*.08,A=Math.abs(y)*.035*R,I=Ey-A,S=Math.cos(w),b=Math.sin(w),P=c,L=p?zy:l===2||l===5?Nu:Ly;for(let j of[1,-1]){let ut=-(j===1?_:-_)*.55*R,Et=Math.max(0,j===1?y:-y)*.9*R+(o===1?.15:.05),Y=j*.1;v.parte("coxa",t,e,i,m,g,Y,I,0,ut,0,u,P);let F=Y,st=I-R0*Math.cos(ut),nt=-R0*Math.sin(ut),vt=ut+Et;v.parte("canela",t,e,i,m,g,F,st,nt,vt,0,u,P);let At=F,_t=st-C0*Math.cos(vt),Gt=nt-C0*Math.sin(vt);v.parte("bota",t,e,i,m,g,At,_t+.06,Gt,0,0,u,L)}v.parte("quadril",t,e,i,m,g,0,I,0,0,0,u,c);let U=(j,tt,ut,Et)=>(Et[0]=j,Et[1]=I+tt*S-ut*b,Et[2]=tt*b+ut*S,Et);v.parte("tronco",t,e,i,m,g,0,I,0,-w,0,u,a);let D=U(0,wo+.1,0,[0,0,0]),W=o===1?-.25:o===2?.05:0;v.parte("cabeca",t,e,i,m,g,D[0],D[1],D[2],-w*.4+W,0,u,h),p||l===2||l===5?(v.parte("colete",t,e,i,m,g,0,I+.12*S,.12*b,-w,0,u,l===2||l===5?Nu:l===3?[.45,.42,.33]:Py),v.parte("capacete",t,e,i,m,g,D[0],D[1],D[2],-w*.4+W,0,u,l===2||l===5?Nu:l===3?[.5,.47,.38]:Iy),p&&v.parte("mochila",t,e,i,m,g,0,I+.12*S,.12*b,-w,0,u,l===3?[.6,.58,.5]:[.92,.9,.85])):f&&v.parte("cabelo",t,e,i,m,g,D[0],D[1],D[2],-w*.4+W,0,u,f);let H=U(.2,wo-.05,0,[0,0,0]),Q=U(-.2,wo-.05,0,[0,0,0]),V=l===0||l===3||l===4?h:Cy,Z=a;if(M&&o!==1&&o!==4){let j=o===2,tt=-.11,ut=j?1.38:1+A*.5,Et=j?.16+b*.3:.2,Y=j?0:.5+_*.04*R,F=j?.03:.35;this._arma(v,t,e,i,m,g,tt,ut,Et,Y,F,u);let st=Math.cos(Y)*Math.cos(F),nt=-Math.sin(Y),vt=Math.sin(F)*Math.cos(Y),At=[tt+vt*.27,ut+.05+nt*.27,Et+st*.27],_t=[tt,ut+.02,Et-.02];this._membro(v,"braco","antebraco",Uu,Du,H,At,[1,-.6,-.3],t,e,i,m,g,u,Z,Z,"mao",V),this._membro(v,"braco","antebraco",Uu,Du,Q,_t,[-1,-.7,-.6],t,e,i,m,g,u,Z,Z,"mao",V);return}for(let j of[1,-1]){let tt=j===1?H:Q,ut;if(o===1)ut=[tt[0]*.8,tt[1]-.05+(j===1?_:-_)*.05,tt[2]+.52];else if(o===4)ut=[tt[0]+j*(.2+_*.12),tt[1]+.5,tt[2]+.05];else{let Et=(j===1?-_:_)*.45*R;ut=[tt[0]+j*.05,tt[1]-.52*Math.cos(Et)+.05*R,tt[2]+.52*Math.sin(Et)+.04]}this._membro(v,"braco","antebraco",Uu,Du,tt,ut,[j*.4,.1,-1],t,e,i,m,g,u,o===1&&l!==3?h:Z,o===1||l===0||l===4?h:Z,"mao",V)}}_arma(t,e,i,s,r,o,a,c,h,l,u,f){let d=Math.cos(Math.atan2(o,r)+u),p=Math.sin(Math.atan2(o,r)+u),v=e+(r*a+o*h)*f,m=s+(-o*a+r*h)*f;t.parte("arma",v,i,m,d,p,0,c,0,l,0,f,[.38,.38,.39])}},ri=n=>[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255],I0=[14241615,5210073,15921906,15911244,5683312,15108800,3355443,8377312,16752448,10185686,2051724,13218447,16777215,2864037].map(ri),z0=[3095378,3947580,7035461,2042436,14208437,4873594,2829099,9085122].map(ri),L0=[15843965,14724201,13010498,9262372,16767916,11037500].map(ri),U0=[1709072,3877406,6176806,9071163,14202218,2236962,7024158,11577760].map(ri),D0=[9413498,10135690,8228714,10725774].map(ri),Ao=[1,1,1],xc=[.95,.95,.93],Ro=ri(14264183),vc=ri(1908774),_c=ri(2303532);var oi=4e3,Co=600,yc=class{constructor(t){this.pos=new Float32Array(oi*3),this.cor=new Float32Array(oi*4),this.tam=new Float32Array(oi),this.vel=new Float32Array(oi*3),this.vida=new Float32Array(oi),this.vidaMax=new Float32Array(oi),this.cresce=new Float32Array(oi),this.grav=new Float32Array(oi),this.corIni=new Float32Array(oi*3),this.corFim=new Float32Array(oi*3),this.livre=[];for(let r=oi-1;r>=0;r--)this.livre.push(r);this.ativos=[];let e=new me;e.setAttribute("position",new ue(this.pos,3).setUsage(is)),e.setAttribute("cor",new ue(this.cor,4).setUsage(is)),e.setAttribute("tam",new ue(this.tam,1).setUsage(is)),this.geo=e;let i=new Mn({transparent:!0,depthWrite:!1,uniforms:{escala:{value:600}},vertexShader:`attribute vec4 cor; attribute float tam; varying vec4 vC; uniform float escala;
        void main(){ vC = cor; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = clamp(tam * escala / -mv.z, 1.0, 256.0); gl_Position = projectionMatrix * mv; }`,fragmentShader:"varying vec4 vC; void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d,d); if (r > 0.25) discard; gl_FragColor = vec4(vC.rgb, vC.a * (1.0 - r*3.2)); }"});this.matP=i,this.pontos=new Ha(e,i),this.pontos.frustumCulled=!1,this.pontos.renderOrder=5,t.add(this.pontos),this.tPos=new Float32Array(Co*6),this.tCor=new Float32Array(Co*6),this.tVida=new Float32Array(Co),this.tn=0;let s=new me;s.setAttribute("position",new ue(this.tPos,3).setUsage(is)),s.setAttribute("color",new ue(this.tCor,3).setUsage(is)),this.tgeo=s,this.linhas=new ka(s,new lo({vertexColors:!0,transparent:!0,opacity:.9})),this.linhas.frustumCulled=!1,this.linhas.renderOrder=4,t.add(this.linhas)}particula(t,e,i,s,r,o,a,c,h,l,u=1,f=0,d=0){if(!this.livre.length)return;let p=this.livre.pop();this.ativos.push(p),this.pos[p*3]=t,this.pos[p*3+1]=e,this.pos[p*3+2]=i,this.vel[p*3]=s,this.vel[p*3+1]=r,this.vel[p*3+2]=o,this.tam[p]=a,this.vida[p]=c,this.vidaMax[p]=c,this.grav[p]=f,this.cresce[p]=d,this.corIni[p*3]=h[0],this.corIni[p*3+1]=h[1],this.corIni[p*3+2]=h[2],this.corFim[p*3]=l[0],this.corFim[p*3+1]=l[1],this.corFim[p*3+2]=l[2],this.cor[p*4+3]=u,this.alfa0=u,this.cor[p*4]=h[0],this.cor[p*4+1]=h[1],this.cor[p*4+2]=h[2]}tracante(t,e,i,s,r,o,a=[1,.85,.4]){let c=this.tn++%Co;this.tPos.set([t,e,i,s,r,o],c*6),this.tCor.set([a[0],a[1],a[2],a[0]*.6,a[1]*.6,a[2]*.6],c*6),this.tVida[c]=.07}clarao(t,e,i,s=1.2){this.particula(t,e,i,0,0,0,s,.06,[1,.95,.6],[1,.6,.2],1)}explosao(t,e,i,s=6,r=!1){let o=Math.min(40,8+s*2);for(let a=0;a<o;a++){let c=Math.random()*6.28,h=Math.random()*s*2.2;this.particula(t,e+.5,i,Math.cos(c)*h,Math.random()*s*2,Math.sin(c)*h,s*(.5+Math.random()*.5),.35+Math.random()*.3,[1,.85,.35],[.9,.25,.05],1,-2,s*.8)}for(let a=0;a<o*.7;a++){let c=Math.random()*6.28,h=Math.random()*s*.7,l=r?[.85,.92,1]:[.35,.33,.3];this.particula(t+Math.cos(c)*s*.3,e+Math.random()*s*.5,i+Math.sin(c)*s*.3,Math.cos(c)*h,s*.4+Math.random()*3,Math.sin(c)*h,s*.9,1.6+Math.random()*1.6,l,r?[.7,.8,.9]:[.15,.15,.15],.75,r?9:-.6,s*.9)}if(r)for(let a=0;a<18;a++){let c=Math.random()*6.28;this.particula(t,.3,i,Math.cos(c)*3,8+Math.random()*s*3,Math.sin(c)*3,1.5,1.4,[.9,.95,1],[.6,.75,.9],.9,14,.5)}}fumaca(t,e,i,s=2,r=[.25,.25,.25]){this.particula(t,e,i,(Math.random()-.5)*1.5,2+Math.random()*2,(Math.random()-.5)*1.5,s,2.5,r,[.5,.5,.5],.5,-.4,s)}sangue(t,e,i,s=5){for(let r=0;r<s;r++)this.particula(t,e,i,(Math.random()-.5)*4,Math.random()*3,(Math.random()-.5)*4,.35,.5,[.55,.03,.03],[.3,0,0],1,12,0)}poeira(t,e,i=2){for(let s=0;s<i;s++)this.particula(t+(Math.random()-.5)*2,.4,e+(Math.random()-.5)*2,Math.random()-.5,.8,Math.random()-.5,1.4,1,[.72,.66,.55],[.8,.76,.68],.35,0,1.5)}esteira(t,e,i){this.particula(t,e,i,0,0,0,1.6,.9,[1,.7,.4],[.5,.5,.5],.6,0,3)}atualizar(t,e){this.matP.uniforms.escala.value=e;let i=this.ativos;for(let r=i.length-1;r>=0;r--){let o=i[r];if(this.vida[o]-=t,this.vida[o]<=0){this.tam[o]=0,this.cor[o*4+3]=0,this.pos[o*3+1]=-1e3,i[r]=i[i.length-1],i.pop(),this.livre.push(o);continue}let a=1-this.vida[o]/this.vidaMax[o];this.vel[o*3+1]-=this.grav[o]*t,this.pos[o*3]+=this.vel[o*3]*t,this.pos[o*3+1]+=this.vel[o*3+1]*t,this.pos[o*3+2]+=this.vel[o*3+2]*t,this.pos[o*3+1]<.1&&this.grav[o]>0&&(this.pos[o*3+1]=.1,this.vel[o*3]*=.5,this.vel[o*3+2]*=.5,this.vel[o*3+1]=0),this.vel[o*3]*=.97,this.vel[o*3+2]*=.97,this.tam[o]+=this.cresce[o]*t;for(let c=0;c<3;c++)this.cor[o*4+c]=this.corIni[o*3+c]+(this.corFim[o*3+c]-this.corIni[o*3+c])*a;this.cor[o*4+3]=Math.min(this.cor[o*4+3],(1-a)*1.2)}let s=this.geo.attributes;s.position.needsUpdate=s.cor.needsUpdate=s.tam.needsUpdate=!0;for(let r=0;r<Co;r++)if(this.tVida[r]>0&&(this.tVida[r]-=t,this.tVida[r]<=0))for(let o=0;o<6;o++)this.tPos[r*6+o]=0;this.tgeo.attributes.position.needsUpdate=!0,this.tgeo.attributes.color.needsUpdate=!0}};var qn={fuzileiro:{nome:"Soldado",sub:"Fuzil M4A1",icone:"\u{1FA96}",classe:"inf",hp:100,vel:6.5,alcance:55,dano:16,cadencia:.38,precisao:.6,arma:"fuzil",custo:60,tempo:4,de:"quartel",slots:1,raio:.6},metralhador:{nome:"Metralhador",sub:"M249 SAW",icone:"\u{1F52B}",classe:"inf",hp:120,vel:6,alcance:62,dano:10,cadencia:.1,precisao:.42,arma:"mg",custo:100,tempo:6,de:"quartel",slots:1,raio:.6},sniper:{nome:"Atirador de Elite",sub:"M110 / Barrett M107",icone:"\u{1F3AF}",classe:"inf",hp:90,vel:6.2,alcance:150,dano:110,cadencia:1.7,precisao:.92,arma:"sniper",custo:140,tempo:8,de:"quartel",slots:1,raio:.6},medico:{nome:"M\xE9dico de Combate",sub:"Cura soldados por perto",icone:"\u2695\uFE0F",classe:"inf",hp:100,vel:6.6,alcance:40,dano:9,cadencia:.55,precisao:.5,arma:"pistola",cura:7,custo:110,tempo:6,de:"quartel",slots:1,raio:.6},humvee:{nome:"Humvee M1151",sub:"Metralhadora .50 \u2022 leva 4",icone:"\u{1F699}",classe:"veic",modelo:"humvee",hp:550,vel:26,alcance:85,dano:24,cadencia:.16,precisao:.45,arma:"50cal",carga:4,cargaTipos:["inf","civil"],custo:240,tempo:9,de:"patio",slots:6,raio:2.6,leve:!0,atropela:!0},ambulancia:{nome:"Ambul\xE2ncia M997",sub:"Leva 8 \u2022 cura passageiros",icone:"\u{1F691}",classe:"veic",modelo:"ambulancia",hp:420,vel:25,carga:8,cargaTipos:["inf","civil"],cura:12,custo:180,tempo:8,de:"patio",slots:6,raio:2.7,leve:!0,atropela:!0},stryker:{nome:"Stryker M1126",sub:"Blindado 8x8 \u2022 leva 9",icone:"\u{1F690}",classe:"veic",modelo:"stryker",hp:1100,vel:24,alcance:95,dano:26,cadencia:.15,precisao:.5,arma:"50cal",carga:9,cargaTipos:["inf","civil"],custo:450,tempo:13,de:"patio",slots:10,raio:3.6,atropela:!0},bradley:{nome:"Bradley M2A3",sub:"Canh\xE3o 25mm \u2022 leva 6",icone:"\u{1F6FB}",classe:"veic",modelo:"bradley",hp:1500,vel:20,alcance:120,dano:55,splash:3,cadencia:.32,precisao:.6,arma:"25mm",carga:6,cargaTipos:["inf","civil"],custo:620,tempo:15,de:"patio",slots:12,raio:3.4,atropela:!0},abrams:{nome:"Tanque M1A2 Abrams",sub:"Canh\xE3o 120mm",icone:"\u{1F6E1}\uFE0F",classe:"veic",modelo:"abrams",hp:3200,vel:19,alcance:170,dano:320,splash:8,cadencia:4.2,precisao:.85,arma:"120mm",sec:{alcance:90,dano:12,cadencia:.11,precisao:.45,arma:"mg"},custo:950,tempo:20,de:"patio",slots:20,raio:4.8,atropela:!0},paladin:{nome:"Obuseiro M109A7 Paladin",sub:"Artilharia 155mm \u2022 longo alcance",icone:"\u{1F4A5}",classe:"veic",modelo:"paladin",hp:1600,vel:15,alcance:700,minAlc:80,dano:300,splash:15,cadencia:6,precisao:.7,arma:"155mm",arco:!0,custo:900,tempo:20,de:"patio",slots:18,raio:4.6},himars:{nome:"HIMARS M142",sub:"Lan\xE7a-foguetes \u2022 6 foguetes",icone:"\u{1F680}",classe:"veic",modelo:"himars",hp:1100,vel:22,alcance:1100,minAlc:150,dano:230,splash:16,cadencia:.5,salva:6,recarga:20,precisao:.75,arma:"foguete",custo:1200,tempo:24,de:"patio",slots:16,raio:3.8},swat:{nome:"Policial SWAT",sub:"Pol\xEDcia de Miami \u2022 age sozinha",icone:"\u{1F693}",classe:"inf",hp:115,vel:6.4,alcance:58,dano:15,cadencia:.3,precisao:.58,arma:"fuzil",custo:0,slots:1,raio:.6,policia:!0},bearcat:{nome:"Blindado SWAT BearCat",sub:"Pol\xEDcia de Miami \u2022 leva 10",icone:"\u{1F693}",classe:"veic",modelo:"bearcat",hp:1300,vel:25,carga:10,cargaTipos:["inf","civil"],custo:0,slots:10,raio:3,atropela:!0,policia:!0},blackhawk:{nome:"UH-60 Black Hawk",sub:"Metralhadoras M134 \u2022 leva 11",icone:"\u{1F681}",classe:"aereo",modelo:"blackhawk",hp:850,vel:75,altCruz:40,alcance:95,dano:10,cadencia:.07,precisao:.35,arma:"m134",carga:11,cargaTipos:["inf","civil"],custo:750,tempo:16,de:"heliporto",raio:8},chinook:{nome:"CH-47 Chinook",sub:"Leva 33 ou um Humvee",icone:"\u{1F681}",classe:"aereo",modelo:"chinook",hp:1200,vel:68,altCruz:45,alcance:80,dano:11,cadencia:.16,precisao:.35,arma:"m240",carga:33,cargaTipos:["inf","civil","leve"],custo:950,tempo:20,de:"heliporto",raio:10},apache:{nome:"AH-64 Apache",sub:"Canh\xE3o 30mm + m\xEDsseis Hellfire",icone:"\u{1F681}",classe:"aereo",modelo:"apache",hp:1e3,vel:80,altCruz:55,alcance:280,dano:45,splash:3,cadencia:.13,precisao:.55,arma:"30mm",sec:{alcance:650,dano:420,splash:11,cadencia:7,precisao:.95,arma:"hellfire",missil:!0},custo:1150,tempo:22,de:"heliporto",raio:8},reaper:{nome:"Drone MQ-9 Reaper",sub:"Vigia em c\xEDrculos e lan\xE7a Hellfire",icone:"\u{1F6E9}\uFE0F",classe:"aereo",modelo:"reaper",hp:450,vel:70,altCruz:260,orbita:240,alcance:750,dano:420,splash:11,cadencia:6.5,precisao:.95,arma:"hellfire",missil:!0,custo:700,tempo:15,de:"heliporto",raio:10},f35:{nome:"F-35C Lightning II",sub:"Ca\xE7a furtivo \u2022 bombas guiadas GBU-31",icone:"\u2708\uFE0F",classe:"jato",modelo:"f35",hp:900,vel:250,altCruz:160,dano:650,splash:20,municao:4,arma:"bomba",custo:1500,tempo:22,de:"porta",raio:9},f18:{nome:"F/A-18E Super Hornet",sub:"Foguetes e bombas \u2022 ataque rasante",icone:"\u2708\uFE0F",classe:"jato",modelo:"f18",hp:900,vel:260,altCruz:150,dano:180,splash:9,municao:3,rajada:6,arma:"foguete",custo:1250,tempo:20,de:"porta",raio:9},a10:{nome:"A-10 Thunderbolt II",sub:"Canh\xE3o GAU-8 de 30mm \u2022 metralha a faixa toda",icone:"\u{1F6E9}\uFE0F",classe:"jato",modelo:"a10",hp:1600,vel:150,altCruz:90,dano:70,splash:4,municao:5,arma:"canhao",custo:1400,tempo:22,de:"pista",raio:10},f22:{nome:"F-22 Raptor",sub:"Mais r\xE1pido \u2022 8 bombas pequenas SDB",icone:"\u2708\uFE0F",classe:"jato",modelo:"f22",hp:1e3,vel:300,altCruz:200,dano:380,splash:13,municao:4,bombas:4,arma:"bomba",custo:1700,tempo:24,de:"pista",raio:9},osprey:{nome:"MV-22 Osprey",sub:"Rotores basculantes \u2022 leva 24",icone:"\u{1F6EB}",classe:"aereo",modelo:"osprey",hp:1e3,vel:120,altCruz:60,carga:24,cargaTipos:["inf","civil"],custo:1200,tempo:22,de:"porta",raio:9},lancha:{nome:"Lancha Mark VI",sub:"Patrulha \u2022 leva 8",icone:"\u{1F6A4}",classe:"naval",modelo:"lancha",nav:1,hp:800,vel:28,alcance:130,dano:24,cadencia:.16,precisao:.45,arma:"50cal",carga:8,cargaTipos:["inf","civil"],custo:320,tempo:12,de:"docas",raio:8},lcac:{nome:"Hovercraft LCAC",sub:"Anf\xEDbio \u2022 leva tropas e ve\xEDculos",icone:"\u{1F6E5}\uFE0F",classe:"naval",modelo:"lcac",nav:3,hp:1400,vel:26,carga:30,cargaTipos:["inf","civil","leve","veic"],custo:750,tempo:18,de:"docas",raio:12},destroier:{nome:"Destr\xF3ier classe Arleigh Burke",sub:'Canh\xE3o naval 5" de longo alcance',icone:"\u{1F6A2}",classe:"naval",modelo:"destroier",nav:2,hp:7e3,vel:16,alcance:950,minAlc:60,dano:300,splash:14,cadencia:2.6,precisao:.8,arma:"naval",arco:!0,custo:2400,tempo:35,de:"docas",raio:30},portaavioes:{nome:"Porta-avi\xF5es USS Liberty",sub:"Classe Nimitz \u2022 base flutuante",icone:"\u2693",classe:"naval",modelo:"portaavioes",nav:2,hp:3e4,vel:7,carga:0,custo:0,de:null,raio:60,unico:!0}},Bu={qg:{nome:"Quartel-General",hp:6e3,raio:26},quartel:{nome:"Quartel (Infantaria)",hp:3e3,raio:30},patio:{nome:"P\xE1tio de Ve\xEDculos",hp:3500,raio:34},heliporto:{nome:"Heliporto",hp:2500,raio:40},docas:{nome:"Docas da Marinha",hp:3e3,raio:30},zona:{nome:"Zona Segura (abrigo de civis)",hp:2e3,raio:32},torre:{nome:"Torre de Vigia",hp:900,raio:4,alcance:110,dano:22,cadencia:.18,precisao:.5,arma:"50cal"},muro:{nome:"Barreira",hp:900,raio:5},fob:{nome:"Posto Avan\xE7ado (FOB)",hp:2500,raio:28},pista:{nome:"Pista de Pouso",hp:8e3,raio:60},patriot:{nome:"Bateria Patriot",hp:1500,raio:6}},Mc={quartel:["fuzileiro","metralhador","sniper","medico"],patio:["humvee","ambulancia","stryker","bradley","abrams","paladin","himars"],heliporto:["blackhawk","chinook","apache","reaper"],docas:["lancha","lcac","destroier"],porta:["f35","f18","osprey"],pista:["f22","a10","f35","f18"]},N0={quartel:"\u{1FA96} Quartel",patio:"\u{1F699} P\xE1tio",heliporto:"\u{1F681} Heliporto",docas:"\u2693 Docas",porta:"\u{1F6F3}\uFE0F Porta-avi\xF5es",pista:"\u{1F6EB} Pista de pouso"},Po={fob:{nome:"Posto Avan\xE7ado (FOB)",sub:"Zona segura para civis + QG de campo",icone:"\u26FA",custo:900,tempo:25,raio:30},quartel:{nome:"Quartel",sub:"Treina infantaria aqui",icone:"\u{1FA96}",custo:1200,tempo:35,raio:34},patio:{nome:"P\xE1tio de Ve\xEDculos",sub:"Produz blindados aqui",icone:"\u{1F699}",custo:1600,tempo:45,raio:38},heliporto:{nome:"Heliporto",sub:"Produz helic\xF3pteros aqui",icone:"\u{1F681}",custo:1500,tempo:40,raio:44},docas:{nome:"Docas",sub:"Precisa ficar na beira da \xE1gua",icone:"\u2693",custo:1400,tempo:40,raio:34,agua:!0},zona:{nome:"Zona Segura",sub:"Abrigo de civis (resgate)",icone:"\u{1F3E5}",custo:700,tempo:20,raio:32},torre:{nome:"Torre de Vigia",sub:"Metralhadora .50 autom\xE1tica",icone:"\u{1F5FC}",custo:300,tempo:10,raio:6},muro:{nome:"Barreira",sub:"Gabi\xF5es contra os zumbis",icone:"\u{1F9F1}",custo:60,tempo:4,raio:6},patriot:{nome:"Bateria Patriot",sub:"Defesa antia\xE9rea",icone:"\u{1F6F0}\uFE0F",custo:500,tempo:15,raio:8},pista:{nome:"Pista de Pouso",sub:"Base a\xE9rea: F-22 e A-10 (precisa de muito espa\xE7o)",icone:"\u{1F6EB}",custo:2500,tempo:50,raio:60,grande:!0}};var Wu={};bf(Wu,{NCEL:()=>Fn,NH:()=>gi,NW:()=>qt,acharCaminho:()=>Gu,livre:()=>Br,pontoLivreProximo:()=>On,prepararNavegacao:()=>Vu});var Fs=2,qt=Math.ceil(Ft/Fs),gi=Math.ceil(Re/Fs),Fn=Ae*Fs,An=qt*gi,Os=[new Uint8Array(An),new Uint8Array(An),new Uint8Array(An),new Uint8Array(An)];function Vu(){let n=Os[0],t=Os[1],e=Os[2],i=Os[3];for(let c=0;c<gi;c++)for(let h=0;h<qt;h++){let l=0,u=0,f=0;for(let p=0;p<Fs;p++)for(let v=0;v<Fs;v++){let m=h*Fs+v,g=c*Fs+p;if(m>=Ft||g>=Re){u++;continue}let M=g*Ft+m,_=He[M];_===Te.AGUA?u++:_===Te.PONTE?(l++,u++,f++):Le[M]<0&&l++}let d=c*qt+h;n[d]=l>=2||f>0?1:0,t[d]=u>=3?1:0,i[d]=n[d]||t[d]?1:0}let s=new Uint8Array(An).fill(255),r=new Int32Array(An),o=0,a=0;for(let c=0;c<An;c++)t[c]||(s[c]=0,r[a++]=c);for(;o<a;){let c=r[o++],h=c%qt,l=c/qt|0,u=s[c]+1;u>20||(h>0&&s[c-1]>u&&(s[c-1]=u,r[a++]=c-1),h<qt-1&&s[c+1]>u&&(s[c+1]=u,r[a++]=c+1),l>0&&s[c-qt]>u&&(s[c-qt]=u,r[a++]=c-qt),l<gi-1&&s[c+qt]>u&&(s[c+qt]=u,r[a++]=c+qt))}for(let c=0;c<An;c++)e[c]=s[c]>=3?1:0}function Br(n,t,e){let i=Math.floor(t/Fn),s=Math.floor(e/Fn);return i<0||s<0||i>=qt||s>=gi?We&&(n===1||n===2):Os[n][s*qt+i]===1}function Hu(n,t,e=40){if(n[t])return t;let i=t%qt,s=t/qt|0;for(let r=1;r<=e;r++)for(let o=-r;o<=r;o++)for(let a=-r;a<=r;a++){if(Math.abs(a)!==r&&Math.abs(o)!==r)continue;let c=i+a,h=s+o;if(!(c<0||h<0||c>=qt||h>=gi)&&n[h*qt+c])return h*qt+c}return-1}function On(n,t,e){let i=Math.max(0,Math.min(qt-1,Math.floor(t/Fn))),s=Math.max(0,Math.min(gi-1,Math.floor(e/Fn))),r=Hu(Os[n],s*qt+i,60);return r<0?null:{x:(r%qt+.5)*Fn,z:((r/qt|0)+.5)*Fn}}var bc=new Float32Array(An),Fu=new Int32Array(An),Ou=new Uint32Array(An),ku=new Uint32Array(An),Bs=1,hs=new Int32Array(An),ai=new Float32Array(An),ks=0;function B0(n,t){let e=ks++;for(;e>0;){let i=e-1>>1;if(ai[i]<=t)break;hs[e]=hs[i],ai[e]=ai[i],e=i}hs[e]=n,ai[e]=t}function Uy(){let n=hs[0],t=hs[--ks],e=ai[ks],i=0;for(;;){let s=i*2+1;if(s>=ks||(s+1<ks&&ai[s+1]<ai[s]&&s++,ai[s]>=e))break;hs[i]=hs[s],ai[i]=ai[s],i=s}return hs[i]=t,ai[i]=e,n}var Dy=[1,-1,0,0,1,1,-1,-1],Ny=[0,0,1,-1,1,-1,1,-1],By=[1,1,1,1,1.4142,1.4142,1.4142,1.4142];function Fy(n,t,e){let i=t%qt,s=t/qt|0,r=e%qt,o=e/qt|0,a=Math.abs(r-i),c=Math.abs(o-s),h=i<r?1:-1,l=s<o?1:-1,u=a-c;for(;;){if(!n[s*qt+i])return!1;if(i===r&&s===o)return!0;let f=u*2;if(f>-c&&f<a&&(!n[s*qt+i+h]||!n[(s+l)*qt+i]))return!1;f>-c&&(u-=c,i+=h),f<a&&(u+=a,s+=l)}}function Gu(n,t,e,i,s,r=7e4){let o=Os[n],a=(A,I)=>Math.max(0,Math.min(I-1,A)),c=Hu(o,a(Math.floor(e/Fn),gi)*qt+a(Math.floor(t/Fn),qt),12),h=Hu(o,a(Math.floor(s/Fn),gi)*qt+a(Math.floor(i/Fn),qt),40);if(c<0||h<0)return null;if(c===h)return[{x:i,z:s}];Bs++,ks=0;let l=h%qt,u=h/qt|0,f=A=>{let I=Math.abs(A%qt-l),S=Math.abs((A/qt|0)-u);return(I+S+(1.4142-2)*Math.min(I,S))*1.25};bc[c]=0,Ou[c]=Bs,Fu[c]=-1,B0(c,f(c));let d=c,p=f(c),v=0,m=!1;for(;ks>0&&v<r;){let A=Uy();if(ku[A]===Bs)continue;if(ku[A]=Bs,v++,A===h){m=!0;break}let I=f(A);I<p&&(p=I,d=A);let S=A%qt,b=A/qt|0;for(let P=0;P<8;P++){let L=S+Dy[P],U=b+Ny[P];if(L<0||U<0||L>=qt||U>=gi)continue;let D=U*qt+L;if(!o[D]||ku[D]===Bs||P>=4&&(!o[b*qt+L]||!o[U*qt+S]))continue;let W=bc[A]+By[P];(Ou[D]!==Bs||W<bc[D])&&(Ou[D]=Bs,bc[D]=W,Fu[D]=A,B0(D,W+f(D)))}}let g=m?h:d,M=[];for(let A=g;A!==-1;A=Fu[A])M.push(A);M.reverse();let _=[M[0]],y=0;for(;y<M.length-1;){let A=Math.min(M.length-1,y+60);for(;A>y+1&&!Fy(o,M[y],M[A]);)A--;_.push(M[A]),y=A}let R=_.slice(1).map(A=>({x:(A%qt+.5)*Fn,z:((A/qt|0)+.5)*Fn}));m&&R.push({x:i,z:s});let w=R.length?R:[{x:i,z:s}];return w.parcial=!m,w}var Pt=null,Rn=null,kr=null,Hr=null,kn=null,Vr=!0,Xu={},Fr=null,Or=null,Io=null;function Fi(){if(Pt){Pt.state==="suspended"&&Pt.resume();return}let n=window.AudioContext||window.webkitAudioContext;if(!n)return;Pt=new n;let t=Pt.createDynamicsCompressor();t.threshold.value=-14,t.knee.value=10,t.ratio.value=6,t.attack.value=.003,t.release.value=.25,t.connect(Pt.destination),Rn=Pt.createGain(),Rn.gain.value=Vr?.6:0,Rn.connect(t);let e=Pt.sampleRate;Hr=Pt.createBuffer(1,e*2,e),kn=Pt.createBuffer(1,e*2,e);let i=Hr.getChannelData(0),s=kn.getChannelData(0),r=0;for(let h=0;h<i.length;h++)i[h]=Math.random()*2-1,r=(r+.02*i[h])/1.02,s[h]=r*3.5;let o=2.4,a=Pt.createBuffer(2,e*o,e);for(let h=0;h<2;h++){let l=a.getChannelData(h);for(let u=0;u<l.length;u++){let f=u/e,d=f>.06&&f<.075||f>.13&&f<.14||f>.21&&f<.22?.6:0;l[u]=(Math.random()*2-1)*(Math.exp(-f*2.6)*.5+d*Math.exp(-f*3))}}let c=Pt.createConvolver();c.buffer=a,kr=Pt.createGain(),kr.gain.value=.45,kr.connect(c),c.connect(Rn)}function Lo(n){Vr=n,Rn&&(Rn.gain.value=n?.6:0)}function un(n,t){let e=performance.now();return Xu[n]&&e-Xu[n]<t?!1:(Xu[n]=e,!0)}function le(n,t,e,i,s,r="lowpass",o=.2,a=0,c=Hr,h=0){if(!Pt||!Vr||n<.005)return;let l=Pt.currentTime+a,u=Pt.createBufferSource();u.buffer=c,u.playbackRate.value=.9+Math.random()*.2;let f=Pt.createBiquadFilter();f.type=r,f.frequency.setValueAtTime(i,l),f.Q.value=s,h&&f.frequency.exponentialRampToValueAtTime(h,l+e);let d=Pt.createGain();if(d.gain.setValueAtTime(1e-4,l),d.gain.exponentialRampToValueAtTime(n,l+t),d.gain.exponentialRampToValueAtTime(1e-4,l+t+e),u.connect(f),f.connect(d),d.connect(Rn),o>0){let p=Pt.createGain();p.gain.value=o,d.connect(p),p.connect(kr)}u.start(l,Math.random()*1.2,t+e+.05)}function Pe(n,t,e,i,s="sine",r=0,o=.15){if(!Pt||!Vr||n<.005)return;let a=Pt.currentTime+r,c=Pt.createOscillator();c.type=s,c.frequency.setValueAtTime(e,a),c.frequency.exponentialRampToValueAtTime(Math.max(15,i),a+t);let h=Pt.createGain();if(h.gain.setValueAtTime(n,a),h.gain.exponentialRampToValueAtTime(1e-4,a+t),c.connect(h),h.connect(Rn),o>0){let l=Pt.createGain();l.gain.value=o,h.connect(l),l.connect(kr)}c.start(a),c.stop(a+t+.05)}function xi(n,t){if(!Pt||t<.015)return;let i=1-(1-t)*.75,s=.92+Math.random()*.16;switch(n){case"pistola":if(!un("pist",60))return;le(t*.5*i,.001,.03,3200*s,.7,"highpass",.1),le(t*.45,.002,.09,1400*s,1.2,"bandpass",.3),Pe(t*.25,.06,260,90);break;case"fuzil":if(!un("fuzil",40))return;le(t*.7*i,.001,.025,4200*s,.6,"highpass",.15),le(t*.55,.002,.1,1100*s,1.1,"bandpass",.35),Pe(t*.35,.08,200*s,70),le(t*.18,.01,.45,900,.7,"lowpass",.9,.02);break;case"mg":case"m240":if(!un("mg",38))return;le(t*.6*i,.001,.022,3600*s,.6,"highpass",.12),le(t*.55,.002,.09,900*s,1,"bandpass",.35),Pe(t*.35,.07,170*s,60),Math.random()<.4&&le(t*.15,.01,.4,800,.7,"lowpass",.9,.02);break;case"m134":if(!un("m134",30))return;le(t*.5,.001,.05,1500*s,.8,"bandpass",.3),Pe(t*.25,.05,140,70,"square");break;case"sniper":if(!un("sn",80))return;le(t*.95*i,.001,.03,3800,.6,"highpass",.2),le(t*.8,.002,.18,700,.9,"bandpass",.5),Pe(t*.6,.22,140,38),le(t*.35,.02,1.4,600,.6,"lowpass",1.2,.05);break;case"50cal":if(!un("50",55))return;le(t*.7*i,.001,.03,2800*s,.6,"highpass",.2),le(t*.75,.003,.16,520*s,1,"bandpass",.45),Pe(t*.55,.14,110*s,38),Math.random()<.5&&le(t*.2,.01,.6,500,.6,"lowpass",1,.03);break;case"25mm":case"30mm":if(!un("ac",90))return;le(t*.7*i,.001,.035,2400,.6,"highpass",.2),le(t*.85,.003,.22,380*s,.9,"bandpass",.5),Pe(t*.7,.2,90*s,30),le(t*.25,.02,.8,400,.6,"lowpass",1,.04,kn);break;case"120mm":case"155mm":case"naval":if(!un("can",120))return;le(t*.9*i,.001,.05,2e3,.5,"highpass",.3),le(t*1.2,.004,.9,260,.7,"lowpass",.9,0,kn,90),Pe(t*1.1,1.1,75,24),Pe(t*.5,.5,140,45,"triangle"),le(t*.45,.05,2,300,.6,"lowpass",1.4,.32,kn),le(t*.25,.05,1.6,250,.6,"lowpass",1.4,.75,kn);break;case"foguete":case"hellfire":if(!un("fog",110))return;le(t*.8,.005,.15,600,.6,"lowpass",.4,0,kn),le(t*.6,.06,.9,500,1.4,"bandpass",.6,0,Hr,2600),Pe(t*.4,.4,90,40);break;case"gau8":{if(!un("gau",900))return;let r=Pt.currentTime,o=Pt.createOscillator();o.type="sawtooth",o.frequency.value=66;let a=Pt.createBiquadFilter();a.type="lowpass",a.frequency.value=900*i+200;let c=Pt.createGain();c.gain.setValueAtTime(1e-4,r),c.gain.exponentialRampToValueAtTime(t*.9,r+.05),c.gain.setValueAtTime(t*.9,r+1.6),c.gain.exponentialRampToValueAtTime(1e-4,r+1.9),o.connect(a),a.connect(c),c.connect(Rn);let h=Pt.createGain();h.gain.value=.6,c.connect(h),h.connect(kr),o.start(r),o.stop(r+2),le(t*.5,.01,1.7,500,.8,"bandpass",.6),le(t*.4,.1,2.2,250,.6,"lowpass",1.2,1.7,kn);break}case"bomba":if(!un("bmb",150))return;Pe(t*.18,1.2,1400,500,"sine",0,.3);break;default:if(!un("def",100))return;le(t*.6,.002,.2,700,.9,"bandpass",.4)}}function Sc(n,t=!1){if(!Pt||n<.015||!un("exp",60))return;let e=t?1.3:1;le(n*.8,.001,.06,1800,.5,"highpass",.3),le(n*1.3*e,.005,1.4*e,420,.6,"lowpass",1,0,kn,70),Pe(n*1.1*e,1.3*e,62,18);for(let i=0;i<6;i++)le(n*.12,.002,.05,3e3+Math.random()*3e3,1,"bandpass",.2,.15+Math.random()*.7);le(n*.4*e,.1,2.5,220,.6,"lowpass",1.5,.35,kn)}function F0(n){if(!(!Pt||n<.02||!un("vidro",120))){le(n*.5,.001,.12,4500,.8,"highpass",.2);for(let t=0;t<9;t++)Pe(n*.08,.06+Math.random()*.12,2500+Math.random()*4e3,2e3+Math.random()*3e3,"sine",.02+Math.random()*.35,.1)}}function qu(n){if(!(!Pt||n<.02||!un("esm",200))){le(n*.8,.002,.35,700,1.5,"bandpass",.3),Pe(n*.4,.25,160,60,"square");for(let t=0;t<4;t++)Pe(n*.06,.1,2e3+Math.random()*2500,1500,"sine",.05+Math.random()*.2,.05)}}function Yu(n){if(!Pt||n<.03||!un("zb",700))return;let t=Pt.currentTime,e=85+Math.random()*70,i=Pt.createOscillator();i.type="sawtooth",i.frequency.setValueAtTime(e,t),i.frequency.linearRampToValueAtTime(e*.75,t+1.1);let s=Pt.createOscillator();s.frequency.value=6+Math.random()*4;let r=Pt.createGain();r.gain.value=6,s.connect(r),r.connect(i.frequency);let o=Pt.createBiquadFilter();o.type="bandpass",o.frequency.value=450+Math.random()*300,o.Q.value=4;let a=Pt.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(n*.35,t+.15),a.gain.exponentialRampToValueAtTime(1e-4,t+1.2),i.connect(o),o.connect(a),a.connect(Rn),i.start(t),s.start(t),i.stop(t+1.25),s.stop(t+1.25),le(n*.06,.1,1,800,3,"bandpass",.2)}function te(n="clique"){if(Pt){if(n==="clique")Pe(.1,.05,900,700,"square",0,0);else if(n==="ok")Pe(.12,.07,660,660,"square",0,0),Pe(.12,.09,990,990,"square",.07,0);else if(n==="alerta")Pe(.15,.15,880,880,"square",0,0),Pe(.15,.15,660,660,"square",.18,0);else if(n==="erro")Pe(.13,.2,220,160,"square",0,0);else if(n==="resgate")Pe(.1,.1,523,523,"triangle",0,0),Pe(.1,.1,659,659,"triangle",.1,0),Pe(.1,.2,784,784,"triangle",.2,0);else if(n==="sirene"){let t=Pt.currentTime,e=Pt.createOscillator(),i=Pt.createGain();e.type="sawtooth";for(let r=0;r<3;r++)e.frequency.setValueAtTime(700,t+r*.6),e.frequency.linearRampToValueAtTime(1300,t+r*.6+.3),e.frequency.linearRampToValueAtTime(700,t+r*.6+.6);let s=Pt.createBiquadFilter();s.type="lowpass",s.frequency.value=2200,i.gain.setValueAtTime(1e-4,t),i.gain.exponentialRampToValueAtTime(.07,t+.1),i.gain.setValueAtTime(.07,t+1.6),i.gain.exponentialRampToValueAtTime(1e-4,t+1.8),e.connect(s),s.connect(i),i.connect(Rn),e.start(t),e.stop(t+1.85)}}}function zo(n,t,e,i){let s=Pt.createBufferSource();s.buffer=n,s.loop=!0;let r=Pt.createBiquadFilter();r.type=t,r.frequency.value=e,r.Q.value=i;let o=Pt.createGain();return o.gain.value=0,s.connect(r),r.connect(o),o.connect(Rn),s.start(),{f:r,g:o}}var Hs=(n,t,e=.25)=>n.gain.setTargetAtTime(Vr?t:0,Pt.currentTime,e);function O0(n){if(Pt){if(!Fr){let t=zo(Hr,"bandpass",320,.9),e=Pt.createOscillator();e.type="sawtooth",e.frequency.value=17;let i=Pt.createGain();i.gain.value=0,e.connect(i),i.connect(t.g.gain),e.start();let s=zo(kn,"lowpass",160,.7),r=Pt.createOscillator();r.type="sine",r.frequency.value=1750;let o=Pt.createGain();o.gain.value=0,r.connect(o),o.connect(Rn),r.start(),Fr={pas:t,lg:i,vento:s,tg:o}}Hs(Fr.pas.g,n*.32),Fr.lg.gain.setTargetAtTime(Vr?n*.3:0,Pt.currentTime,.25),Hs(Fr.vento.g,n*.5),Hs(Fr.tg,n*n*.012)}}function k0(n){Pt&&(Or||(Or={ronco:zo(kn,"lowpass",300,.6),chiado:zo(Hr,"bandpass",1800,.7)}),Hs(Or.ronco.g,n*.9,.35),Hs(Or.chiado.g,n*n*.35,.35),Or.ronco.f.frequency.setTargetAtTime(200+n*500,Pt.currentTime,.3),Or.chiado.f.frequency.setTargetAtTime(1200+n*2200,Pt.currentTime,.3))}function H0(n,t=.5){if(Pt){if(!Io){let e=zo(kn,"lowpass",140,.8),i=Pt.createOscillator();i.type="sawtooth",i.frequency.value=38;let s=Pt.createBiquadFilter();s.type="lowpass",s.frequency.value=180;let r=Pt.createGain();r.gain.value=0,i.connect(s),s.connect(r),r.connect(Rn),i.start(),Io={r:e,o:i,g:r}}Hs(Io.r.g,n*.6),Hs(Io.g,n*.06),Io.o.frequency.setTargetAtTime(32+t*30,Pt.currentTime,.4)}}var Ec={comum:{hp:70,vel:4,vagar:.9,dano:12,cd:1,perc:32,esc:1},corredor:{hp:50,vel:7.2,vagar:1.4,dano:9,cd:.8,perc:40,esc:1},bruto:{hp:750,vel:3,vagar:.8,dano:45,cd:1.3,perc:30,esc:1.4},soldado:{hp:110,vel:4,vagar:1,dano:14,cd:1,perc:34,esc:1}},Oy={raio:.4,slots:1};function $u(n,t){return{agente:!0,id:x.idSeq++,x:n,z:t,y:0,ang:ht(0,6.28),zumbi:!1,sub:"civil",hp:30,vivo:!0,estado:"vagar",lider:null,alvo:null,t:ht(0,1),fase:ht(0,6),vel:0,dx:0,dz:0,cd:0,camisa:mi(I0),calca:mi(z0),pele:mi(L0),cabelo:Math.random()<.9?mi(U0):null,soldado:!1,dentro:null,virando:0,mortoT:0,casa:{x:n,z:t},d:Oy,espera:0,acena:0,esc:1}}function Tc(n,t){let e=$u(n,t);return x.agentes.push(e),e}function Zu(n,t,e){let i=Tc(n,t);return i.estado="seguir",i.lider=e,i.espera=0,i}function Ju(n,t,e="comum"){let i=$u(n,t);return Uo(i,e),x.agentes.push(i),i}function Uo(n,t){n.zumbi=!0,n.sub=t;let e=Ec[t];n.hp=e.hp,n.esc=e.esc,n.pele=mi(D0),t==="bruto"&&(n.camisa=ri(4864819),n.calca=ri(2829099)),n.camisa=n.camisa.map(i=>i*.75),n.estado="vagar",n.lider=null,n.alvo=null,n.t=ht(0,.5)}function V0(n){let t=$u(n.x,n.z);t.soldado=!0,t.camisa=Ao,t.calca=xc,Uo(t,"soldado"),t.camisa=Ao.map(e=>e*.8),t.estado="morto",t.virando=3.5,t.vivo=!0,x.agentes.push(t),x.infectados++}function Gr(n,t,e){if(!(!n.vivo||n.estado==="morto")&&(n.hp-=t,n.zumbi&&Math.random()<.5&&x.efeitos.sangue(n.x,1.2,n.z,3),!(n.hp>0))){if(n.zumbi){n.estado="morto",n.mortoT=12,n.virando=0,x.zumbisMortos++,x.dinheiro+=n.sub==="bruto"?30:4,x.efeitos.sangue(n.x,1,n.z,6);return}e&&e.zumbi?(n.estado="morto",n.virando=3+ht(0,3),n.lider=null,x.infectados++):(n.estado="morto",n.mortoT=15,n.virando=0,x.civisMortos++,e&&!e.zumbi&&!e.agente&&x.tempo-(x._avisoFogo||-99)>20&&(x._avisoFogo=x.tempo,$t("\u26A0\uFE0F Civis atingidos por fogo amigo!",n.x,n.z,"ruim"))),x.efeitos.sangue(n.x,1,n.z,8)}}function Yn(n,t,e){let i=n.x+t,s=n.z+e;if(Fe(i,s))return n.x=i,n.z=s,!0;let r=Math.hypot(t,e)*.25;return Math.abs(t)>r&&Fe(i,n.z)?(n.x=i,!0):Math.abs(e)>r&&Fe(n.x,s)?(n.z=s,!0):!1}function ky(n){return n.vivo&&!n.dentro&&!n.predio&&(n.classe==="inf"||n.classe==="veic"||n.estr||n.classe==="aereo"&&n.y<2)}function Hy(n){let t=Ec[n.sub],e=t.perc*(x.noite?1.4:1),i=null,s=e*e;if(x.hashA.busca(n.x,n.z,e,(a,c)=>{!a.zumbi&&a.vivo&&!a.dentro&&a.estado!=="morto"&&c<s&&(s=c,i=a)}),x.hashU.busca(n.x,n.z,e,(a,c)=>{ky(a)&&c<s*.9&&(s=c,i=a)}),n.alvo=i,i){n.estado="perseguir";return}let r=null,o=1/0;for(let a of x.ruidos){let c=Ye(n.x,n.z,a.x,a.z);c<a.r*a.r&&c<o&&(o=c,r=a)}if(r){n.estado="ruido",n.destino={x:r.x+ht(-15,15),z:r.z+ht(-15,15)};return}if((n.estado!=="ruido"||!n.destino||Ot(n.x,n.z,n.destino.x,n.destino.z)<5)&&(n.estado="vagar",Math.random()<.4)){let a=ht(0,6.28);n.dx=Math.sin(a),n.dz=Math.cos(a)}for(let[a,c]of[[2,0],[-2,0],[0,2],[0,-2]]){let h=Ls(n.x+a,n.z+c);if(h&&h.guarnicao.length){if(h.integridade-=4,h.integridade<=0){h.integridade=0;let l=mi(h.guarnicao);l&&x.danoUnidade(l,t.dano,!0)}break}}}function Vy(n){if(n.campo){Gy(n);return}let t=null,e=20*20;if(x.hashA.busca(n.x,n.z,20,(i,s)=>{i.zumbi&&i.vivo&&i.estado!=="morto"&&s<e&&(e=s,t=i)}),t&&(n.estado!=="seguir"||e<64)){n.estado="fugir";let i=Math.sqrt(e)||1;n.dx=(n.x-t.x)/i,n.dz=(n.z-t.z)/i,n.medo=4;return}if(!(n.estado==="fugir"&&n.medo>0)){if(n.estado==="fugir"&&(n.estado=n.lider?"seguir":"vagar"),n.estado!=="seguir"){let i=null,s=16*16,r=!1;if(x.hashU.busca(n.x,n.z,70,(o,a)=>{!o.vivo||o.dentro||o.estr||(o.classe==="inf"||o.classe==="veic"||o.classe==="naval"&&o.d.carga||o.classe==="aereo"&&o.pousado&&o.d.carga)&&(a<s?(s=a,i=o):r=!0)}),i){n.estado="seguir",n.lider=i;return}n.acena=r?3:0}if(n.estado==="vagar"&&Math.random()<.3){let i=ht(0,6.28),s=Math.random()<.6;if(n.dx=s?Math.sin(i):0,n.dz=s?Math.cos(i):0,Ot(n.x,n.z,n.casa.x,n.casa.z)>60){let r=Ot(n.x,n.z,n.casa.x,n.casa.z);n.dx=(n.casa.x-n.x)/r,n.dz=(n.casa.z-n.z)/r}}}}function Gy(n){let t=n.campo;if(!t.ativo){n.campo=null,n.estado="vagar";return}if(n.estado="acampar",!n.armado){let e=!1;x.hashA.busca(n.x,n.z,10,i=>{i.zumbi&&i.vivo&&i.estado!=="morto"&&(e=!0)}),e&&(n.posto={x:t.x+ht(-3,3),z:t.z+ht(-3,3)})}}function Wy(n,t){if(n.cdTiro=(n.cdTiro||0)-t,n.mirando>0&&(n.mirando-=t),n.cdTiro>0)return;n.cdTiro=n.policial?.45:.75+Math.random()*.4;let e=n.policial?55:40,i=null,s=e*e;if(x.hashA.busca(n.x,n.z,e,(h,l)=>{h.zumbi&&h.vivo&&h.estado!=="morto"&&h.virando<=0&&l<s&&(s=l,i=h)}),!i)return;n.ang=Math.atan2(i.x-n.x,i.z-n.z),n.mirando=.8;let r=x.efeitos,o=n.x+Math.sin(n.ang)*.7,a=n.z+Math.cos(n.ang)*.7;r.clarao(o,1.4,a,.8);let c=Math.random()<(n.policial?.55:.38);r.tracante(o,1.4,a,i.x+(c?0:ht(-3,3)),1.1,i.z+(c?0:ht(-3,3)),[1,.85,.45]),c&&Gr(i,n.policial?18:22,n),xi(n.policial?"fuzil":"pistola",x.volEm(n.x,n.z)*.8),x.ruidos.push({x:n.x,z:n.z,r:90,t:x.tempo})}function G0(n){let t=x.agentes,e=0,i=0,s=x.noite;for(let r=t.length-1;r>=0;r--){let o=t[r];if(!o.vivo){t[r]=t[t.length-1],t.pop();continue}if(o.dentro){o.dentro.vivo?(o.x=o.dentro.x,o.z=o.dentro.z):o.vivo=!1,i++;continue}if(o.estado==="morto"){o.virando>0?(o.virando-=n,o.virando<=0&&(o.zumbi?(o.estado="vagar",o.hp=Ec[o.sub].hp):Uo(o,Xy()),o.y=0,Yu(x.volEm(o.x,o.z)))):(o.mortoT-=n,o.mortoT<=0&&(o.vivo=!1));continue}if(o.zumbi?e++:i++,o.t-=n,o.cd-=n,o.medo>0&&(o.medo-=n),o.zumbi){let a=Ec[o.sub];o.t<=0&&(o.t=ht(.3,.6),Hy(o));let c=0;if(o.estado==="perseguir"&&o.alvo){let h=o.alvo;if(!h.vivo||h.dentro||h.predio||h.estado==="morto"||h.classe==="aereo"&&h.y>2)o.alvo=null,o.estado="vagar";else{let l=Ot(o.x,o.z,h.x,h.z),u=(h.d?h.d.raio:.4)+.9;if(l>u){let f=Math.atan2(h.x-o.x,h.z-o.z);if(o.ang=Ve(o.ang,f,6*n),c=a.vel*(s?1.25:1),!Yn(o,Math.sin(o.ang)*c*n,Math.cos(o.ang)*c*n)){let d=o.id&1?1.3:-1.3;Yn(o,Math.sin(o.ang+d)*c*n,Math.cos(o.ang+d)*c*n)}}else o.cd<=0&&(o.cd=a.cd,h.agente?Gr(h,a.dano+6,o):x.danoUnidade(h,h.classe==="inf"?a.dano:a.dano*(o.sub==="bruto"?1.5:.5),!0),Math.random()<.15&&Yu(x.volEm(o.x,o.z)))}}else if(o.estado==="ruido"&&o.destino){let h=Math.atan2(o.destino.x-o.x,o.destino.z-o.z);o.ang=Ve(o.ang,h,3*n),c=a.vel*.7,Yn(o,Math.sin(o.ang)*c*n,Math.cos(o.ang)*c*n)||Yn(o,Math.sin(o.ang+1.2)*c*n,Math.cos(o.ang+1.2)*c*n)}else(o.dx||o.dz)&&(c=a.vagar,o.ang=Ve(o.ang,Math.atan2(o.dx,o.dz),2*n),Yn(o,Math.sin(o.ang)*c*n,Math.cos(o.ang)*c*n)||(o.dx=-o.dx,o.dz=-o.dz));o.vel=c,o.fase+=n*c*2.2}else{o.t<=0&&(o.t=ht(.35,.7),Vy(o));let a=0;if(o.estado==="fugir"){a=4.2;let c=Math.atan2(o.dx,o.dz);if(o.ang=Ve(o.ang,c,8*n),!Yn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)){let h=o.id&1?1.4:-1.4;o.dx=Math.sin(o.ang+h),o.dz=Math.cos(o.ang+h)}}else if(o.estado==="seguir"){let c=o.lider;if(c&&c.dentro&&(c=o.lider=c.dentro),!c||!c.vivo)o.estado="vagar",o.lider=null;else if(c.predio){let h=c.predio;if(Ot(o.x,o.z,h.cx,h.cz)<h.raio+10){h.civis++,o.vivo=!1;continue}let u=Math.atan2(h.cx-o.x,h.cz-o.z);o.ang=Ve(o.ang,u,8*n),a=3.5,Yn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)}else{let h=Ot(o.x,o.z,c.x,c.z),l=c.d?c.d.raio:.5,u=c.d&&c.d.carga;if(u&&h<l+6&&(c.classe!=="aereo"||c.pousado)&&x.vagas(c)>=1&&o.espera<=0){x.embarcarCivil(o,c);continue}o.espera>0&&(o.espera-=n);let f=u?l+2:3+o.id%4;if(h>f){let d=Math.atan2(c.x-o.x,c.z-o.z);if(o.ang=Ve(o.ang,d,8*n),a=h>12?4.2:2.2,!Yn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)){let p=o.id&1?1.2:-1.2;Yn(o,Math.sin(o.ang+p)*a*n,Math.cos(o.ang+p)*a*n)}}h>160&&(o.estado="vagar",o.lider=null)}}else if(o.estado==="acampar"&&o.campo){let c=o.campo,h=Ot(o.x,o.z,o.posto.x,o.posto.z);if(h>1.5){let l=Math.atan2(o.posto.x-o.x,o.posto.z-o.z);if(o.ang=Ve(o.ang,l,8*n),a=h>30?4:1.6,!Yn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)){let u=o.id&1?1.3:-1.3;Yn(o,Math.sin(o.ang+u)*a*n,Math.cos(o.ang+u)*a*n)}}else(!o.mirando||o.mirando<=0)&&(o.ang=Ve(o.ang,Math.atan2(o.x-c.x,o.z-c.z),2*n))}else(o.dx||o.dz)&&(a=1.3,o.ang=Ve(o.ang,Math.atan2(o.dx,o.dz),4*n),Yn(o,Math.sin(o.ang)*a*n,Math.cos(o.ang)*a*n)||(o.dx=-o.dx,o.dz=-o.dz));o.vel=a,o.fase+=n*a*2.4,o.armado&&Wy(o,n),a===0&&o.acena>0&&(o.acena-=n,o.fase+=n*6),(o.id+x.quadro)%20===0&&x.naZonaSegura(o.x,o.z,0)&&(o.vivo=!1,o.resgatado=!0,x.resgatados++,x.dinheiro+=40,x.resgateAcum=(x.resgateAcum||0)+1)}}x.nZumbis=e,x.nCivis=i}function Xy(){let n=x.dia,t=Math.random();return n>=3&&t<.05?"bruto":n>=2&&t<.15||x.tempo>360&&t<.06?"corredor":"comum"}function W0(n,t){let e=x.agentes;for(let i=0;i<e.length;i++){let s=e[i];if(!s.vivo||s.dentro||!t(s.x,s.z))continue;let r=s.estado==="morto"?3:s.zumbi?1:s.vel===0&&s.acena>0?4:0,o=s.soldado?3:s.armado?s.policial?5:4:0,a=s.armado&&r===0&&s.mirando>0?2:r;n.add(s.x,s.y,s.z,s.ang,s.fase,a,s.camisa,s.calca,s.pele,o,s.esc,s.policial?null:s.cabelo,Math.min(1,s.vel/2.5))}}var qy={fuzil:[1,.9,.5],mg:[1,.8,.4],sniper:[1,1,.8],pistola:[1,.9,.5],"50cal":[1,.7,.3],"25mm":[1,.6,.2],"30mm":[1,.6,.2],m134:[1,.45,.2],m240:[1,.7,.3]},Yy={fuzil:110,pistola:70,mg:140,sniper:160,"50cal":200,"25mm":260,"30mm":260,m134:220,m240:160,"120mm":450,"155mm":500,naval:500,foguete:450,hellfire:450,bomba:600};function ju(n){return n.classe==="naval"?n.d.nav:0}function $e(n,t,e,i=0,s={}){var a;let r=qn[n],o={id:x.idSeq++,tipo:n,d:r,classe:r.classe,x:t,z:e,y:0,ang:i,hp:r.hp,hpMax:r.hp,caminho:null,wp:0,destino:null,ordem:null,alvo:null,cd:ht(0,.5),cd2:ht(0,1),busca:ht(0,.4),passageiros:[],cargaUsada:0,dentro:null,predio:null,vivo:!0,sel:!1,fase:ht(0,6),mirando:0,alt:0,altAlvo:0,torreAng:0,travado:0,salva:r.salva||0,recarga:0,municao:r.municao||0,estadoJato:"pronto",vx:0,vz:0,velAtual:0,repath:0,ultimaPos:{x:t,z:e},cura:0};return r.modelo&&(o.m=Nr(r.modelo),x.cena.add(o.m.grupo)),o.classe==="aereo"&&(o.alt=(a=s.alt)!=null?a:0,o.altAlvo=o.alt),o.classe==="jato"&&(o.estadoJato="pronto",o.alt=9.5),x.unidades.push(o),tp(o,0),o}function Wr(n){n.vivo=!1,n.sombra&&(x.cena.remove(n.sombra),n.sombra=null),n.m&&x.cena.remove(n.m.grupo),n.anel&&(x.cena.remove(n.anel),n.anel=null);let t=x.selecao.indexOf(n);t>=0&&x.selecao.splice(t,1)}function Oi(n,t){let e=x.porta;if(e&&e.vivo&&e.tipo==="portaavioes"){let s=n-e.x,r=t-e.z,o=Math.cos(-e.ang),a=Math.sin(-e.ang),c=s*o+r*a,h=-s*a+r*o;if(Math.abs(c)<34&&Math.abs(h)<158)return 9.2}let i=pi(n,t);return i>=0&&Le[i]>=0?Ue[Le[i]].h:0}function Gs(n,t,e=0){for(let s of x.abrigos||[]){if(!s.vivo||s.construindo>0)continue;let r=s.tipoEstr==="zona"?170:s.tipoEstr==="fob"?110:120;if(Ye(n,t,s.x,s.z)<r*r)return!0}let i=x.porta;return!!(i&&i.vivo&&(e>7||i.aerodromo)&&Ye(n,t,i.x,i.z)<170*170)}function Cn(n,t){if(!x.camAlvo)return 0;let e=Math.hypot(n-x.camAlvo.x,t-x.camAlvo.z)+x.camDist*.6;return en(1-e/1400,0,1)}function zc(n,t,e){x.ruidos.push({x:n,z:t,r:e*(x.noite?1.2:1),t:x.tempo})}function vi(n,t){for(let e of n)!e.vivo||e.estr||e.dentro||(e.ordem=Object.assign({},t),e.alvo=null,e.caminho=null,e.repath=0,e.predio&&(t.tipo==="mover"||t.tipo==="embarcar"||t.tipo==="guarnecer")&&Bo(e))}function _i(n,t,e){let i=n.filter(c=>c.vivo&&!c.dentro&&!c.estr);if(!i.length)return;let s=i.filter(c=>c.classe==="jato");for(let c of s)X0(c,t,e);let r=i.filter(c=>c.classe!=="jato"),o=r.length,a=Math.ceil(Math.sqrt(o));r.sort((c,h)=>Ye(c.x,c.z,t,e)-Ye(h.x,h.z,t,e)),r.forEach((c,h)=>{let l=Math.max(4,c.d.raio*2.6),u=(h%a-(a-1)/2)*l,f=(Math.floor(h/a)-(a-1)/2)*l,d=t+u,p=e+f;c.predio&&Bo(c),c.ordem={tipo:"mover",x:d,z:p},c.alvo=null,c.caminho=null,c.repath=0,c.classe==="aereo"&&(c.altAlvo=c.d.altCruz,c.pousado=!1)})}function X0(n,t,e){var i;if(n.estadoJato==="rearmando"){$t(`${n.d.nome} est\xE1 sendo rearmado`,n.x,n.z);return}if(n.estadoJato==="pousando"){$t(`${n.d.nome} est\xE1 pousando`,n.x,n.z);return}if(n.ordem={tipo:"ataque",x:t,z:e},n.estadoJato==="pronto"){let s=nf(n),r=K0(s),o=Rc(s,r.dx,r.d0);n.x=o.x,n.z=o.z,n.y=((i=s.deck)!=null?i:9.2)+.2,n.ang=s.ang,n.velAtual=sf(s)?15:0,n.estadoJato="decolando",n.lancou=!1,n.saidaPt=null,n.m&&(n.m.grupo.visible=!0)}else n.estadoJato!=="decolando"&&(n.estadoJato="voando");n.passe=0}function q0(n,t,e,i,s,r){n.forEach((o,a)=>{if(o.estadoJato==="rearmando"||o.estadoJato==="pousando"){$t(`${o.d.nome} est\xE1 pousando/rearmando`,o.x,o.z);return}X0(o,(t+i)/2,(e+s)/2);let c=a%2===1;o.ordem={tipo:"area",ax:c?i:t,az:c?s:e,bx:c?t:i,bz:c?e:s,w:r,fase:"aprox",soltas:0,deslocamento:(a-(n.length-1)/2)*Math.min(25,r/3)}})}function $y(n,t,e){let i=n.d,s=t.bx-t.ax,r=t.bz-t.az,o=Math.max(1,Math.hypot(s,r)),a=s/o,c=r/o,h=-c*t.deslocamento,l=a*t.deslocamento,u,f,d=i.arma==="canhao"?45:i.arma==="bomba"?130:80;if(t.fase==="aprox")u=t.ax-a*900+h,f=t.az-c*900+l,d=i.altCruz,Ot(n.x,n.z,u,f)<220&&(t.fase="alinhar");else if(t.fase==="alinhar")u=t.ax+h,f=t.az+l,(Ot(n.x,n.z,u,f)<120||(n.x-t.ax)*a+(n.z-t.az)*c>-30)&&(t.fase="corrida",t.soltas=0);else{u=t.bx+a*500+h,f=t.bz+c*500+l;let p=(n.x-t.ax)*a+(n.z-t.az)*c,v=i.arma==="canhao"?40:i.arma==="bomba"?i.bombas?8:6:10,m=o/v,g=i.arma==="canhao"?170:i.arma==="bomba"?n.velAtual*.6*Math.sqrt(2*n.y/9.8)*.5:120;for(;t.soltas<v&&p+g>=t.soltas*m+m/2;){let M=Math.min(o,t.soltas*m+m/2),_=ht(-t.w/2,t.w/2),y=t.ax+a*M-c*_+h*.3,R=t.az+c*M+a*_+l*.3;i.arma==="canhao"?(x.efeitos.tracante(n.x+Math.sin(n.ang)*9,n.y-.4,n.z+Math.cos(n.ang)*9,y,.5,R,[1,.55,.2]),Uc(y,.3,R,i.splash,i.dano,n,!0),t.soltas===0&&xi("gau8",Cn(n.x,n.z))):i.arma==="bomba"?No(n.x,n.y,n.z,y,R,{arma:"bomba",dano:i.dano,splash:i.splash,precisao:1},n):No(n.x,n.y-1,n.z,y,R,{arma:"foguete",dano:i.dano,splash:i.splash,precisao:1,missil:!0},n),t.soltas++,t.soltas===1&&zc(t.ax,t.az,700),i.arma!=="canhao"&&xi(i.arma==="bomba"?"bomba":"foguete",Cn(n.x,n.z))}if(p>o+450)if(n.municao--,n.municao<=0)n.estadoJato="voltando",n.ordem=null,$t(`${i.nome} lan\xE7ou toda a carga, voltando ao porta-avi\xF5es`,n.x,n.z);else{let M=t.ax,_=t.az;t.ax=t.bx,t.az=t.bz,t.bx=M,t.bz=_,t.fase="aprox",t.deslocamento=-t.deslocamento}}return{tx:u,tz:f,alt:d}}function Cc(n,t,e){let i=t-n.cx,s=e-n.cz,r=Math.hypot(i,s)||1;for(let o=n.raio*.5;o<n.raio+60;o+=Ae*.7)for(let a of[0,.4,-.4,.8,-.8,1.4,-1.4,2.2,-2.2,3.1]){let c=Math.atan2(i/r,s/r)+a,h=n.cx+Math.sin(c)*o,l=n.cz+Math.cos(c)*o;if(Fe(h,l))return{x:h,z:l}}return{x:n.cx,z:n.cz}}function Zy(n,t){let e=Math.max(4,n.cap),i=t/e*Math.PI*2+.3;for(let s=.7;s>.05;s-=.15){let r=n.cx+Math.sin(i)*n.raio*s,o=n.cz+Math.cos(i)*n.raio*s;if(Mo(n,r,o))return{x:r,z:o}}return{x:n.cx+ht(-1,1),z:n.cz+ht(-1,1)}}function Jy(n,t){let e=n.pts.length/2,i=Math.max(1,Math.floor((n.h-3)/3.4));for(let s=0;s<12;s++){let r=(t*5+s*3+n.id)%e,o=(r+1)%e,a=n.pts[r*2],c=n.pts[r*2+1],h=n.pts[o*2],l=n.pts[o*2+1],u=h-a,f=l-c,d=Math.hypot(u,f);if(d<4)continue;let p=.2+(t*.37+s*.21)%.6,v=-f/d,m=u/d,g=1+(t+s)%Math.min(i,6),M=Math.min(n.h-2.6,g*3.4+.2),_=a+u*p+v*.28,y=c+f*p+m*.28;if(!jy(_+v*3,y+m*3))return{x:_,z:y,y:M,nx:v,nz:m}}return null}function jy(n,t){let e=pi(n,t);return e>=0&&Le[e]>=0}function Ky(n,t){if(t.guarnicao.length>=t.cap)return $t(`Pr\xE9dio cheio (${t.cap} soldados)`,t.cx,t.cz),!1;t.guarnicao.push(n),n.predio=t;let e=t.guarnicao.length-1,i=t.h>6&&e%2===0?Jy(t,e):null;if(i)n.x=i.x,n.z=i.z,n.y=i.y,n.janela={nx:i.nx,nz:i.nz,ang:Math.atan2(i.nx,i.nz),quebrou:!1},n.ang=n.janela.ang;else{let s=Zy(t,e);n.x=s.x,n.z=s.z,n.y=t.h,n.janela=null}return n.ordem=null,n.caminho=null,t.integridade<=0&&(t.integridade=30),t.sos&&t.civis>0&&Y0(t,n),!0}function Bo(n){let t=n.predio;if(!t)return;t.guarnicao=t.guarnicao.filter(i=>i!==n);let e=Cc(t,n.x+ht(-5,5),n.z+ht(-5,5));n.x=e.x+ht(-2,2),n.z=e.z+ht(-2,2),n.y=0,Fe(n.x,n.z)||(n.x=e.x,n.z=e.z),n.predio=null,n.janela=null}function Y0(n,t){if(!n.civis)return;let e=Cc(n,t.x,t.z),i=n.civis;for(let s=0;s<i;s++)Zu(e.x+ht(-3,3),e.z+ht(-3,3),t);n.civis=0,n.sos=!1,$t(`${i} civis sa\xEDram do pr\xE9dio e est\xE3o seguindo suas tropas!`,n.cx,n.cz,"bom"),te("resgate")}function Qy(n){return n.classe==="inf"?"inf":n.classe==="veic"?n.d.leve?"leve":"veic":null}function Lc(n,t){if(!n.d.carga||n===t)return!1;let e=Qy(t);if(!e)return!1;let i=n.d.cargaTipos;return i.includes(e)||e==="leve"&&i.includes("veic")?n.cargaUsada+(t.d.slots||1)<=n.d.carga:!1}function Xr(n){return(n.d.carga||0)-n.cargaUsada}function t2(n){return n.classe==="aereo"?n.pousado:!0}function Ku(n,t){if(!Lc(t,n))return!1;n.dentro=t,t.passageiros.push(n),t.cargaUsada+=n.d.slots||1,n.predio&&Bo(n),n.m&&(n.m.grupo.visible=!1),n.anel&&(x.cena.remove(n.anel),n.anel=null);let e=x.selecao.indexOf(n);return e>=0&&(x.selecao.splice(e,1),n.sel=!1),n.ordem=null,n.caminho=null,!0}function Qu(n,t){return Xr(t)<1?!1:(n.dentro=t,t.passageiros.push(n),t.cargaUsada+=1,!0)}function ki(n){if(!n.passageiros.length)return;if(n.classe==="aereo"&&!n.pousado){n.ordem={tipo:"pousar",desembarcar:!0};return}let t=Gs(n.x,n.z,n.y),e=0;for(let i of n.passageiros.slice()){if(i.agente&&t)continue;let s=n.x,r=n.z;for(let o=0;o<30;o++){let a=e*.9+o*.5,c=n.d.raio+2+o*.8+e%4,h=n.x+Math.sin(a)*c,l=n.z+Math.cos(a)*c;if(Fe(h,l)){s=h,r=l;break}}e++,n.passageiros.splice(n.passageiros.indexOf(i),1),n.cargaUsada-=i.agente?1:i.d.slots||1,i.dentro=null,i.x=s,i.z=r,i.y=0,i.agente?(i.estado="seguir",i.lider=n,i.espera=6):i.m&&(i.m.grupo.visible=!0)}t&&Pc(n)}function Pc(n){let t=0;for(let e of n.passageiros.slice())e.agente&&(n.passageiros.splice(n.passageiros.indexOf(e),1),n.cargaUsada-=1,e.vivo=!1,e.resgatado=!0,e.dentro=null,t++);t&&(x.resgatados+=t,x.dinheiro+=t*40,$t(`\u2705 ${t} civis resgatados! (+$${t*40})`,n.x,n.z,"bom"),te("resgate"))}function Vs(n){return n&&n.vivo&&n.zumbi&&!n.dentro&&n.virando<=0}function Ic(n,t,e,i=0){let s=n.x,r=n.z;if(!e){let l=null,u=1/0,f=i*i,d=n.janela;return x.hashA.busca(s,r,t,(p,v)=>{if(p.zumbi&&p.vivo&&!p.dentro&&p.virando<=0&&v<u&&v>=f){if(d&&(p.x-s)*d.nx+(p.z-r)*d.nz<Math.sqrt(v)*.25)return;u=v,l=p}}),l}let o=[],a=i*i;if(x.hashA.busca(s,r,t,(l,u)=>{if(l.zumbi&&l.vivo&&!l.dentro&&u>=a&&(o.push(l),o.length>50))return!0}),!o.length)return null;let c=null,h=0;for(let l=0;l<o.length;l+=o.length>25?2:1){let u=o[l],f=0,d=0;x.hashA.busca(u.x,u.z,e,m=>{!m.vivo||m.dentro||(m.zumbi?f++:d++)});let p=0;if(x.hashU.busca(u.x,u.z,e+4,m=>{m.vivo&&!m.dentro&&m.classe!=="aereo"&&m.classe!=="jato"&&p++}),p>0)continue;let v=f-d*3;v>h&&(h=v,c=u)}return c}function e2(n){if(n.m&&n.m.def.canoZ!==void 0&&n.m.torre){let t=n.ang+n.torreAng,e=n.m.def,i=e.torreZ,s=e.canoZ;return{x:n.x+Math.sin(n.ang)*i+Math.sin(t)*s,y:n.y+e.torreY+e.canoY,z:n.z+Math.cos(n.ang)*i+Math.cos(t)*s}}return n.m&&n.m.def.armaZ?{x:n.x+Math.sin(n.ang)*n.m.def.armaZ,y:n.y+n.m.def.armaY,z:n.z+Math.cos(n.ang)*n.m.def.armaZ}:n.classe==="aereo"?{x:n.x+Math.sin(n.ang)*2,y:n.y+1.5,z:n.z+Math.cos(n.ang)*2}:{x:n.x+Math.sin(n.ang)*.7,y:n.y+1.25,z:n.z+Math.cos(n.ang)*.7}}function Ac(n,t,e){let i=e2(n),s=t.x,r=t.z,o=(t.y||0)+1.1,a=Math.hypot(s-n.x,r-n.z),c=x.efeitos,h=Cn(n.x,n.z);if(zc(n.x,n.z,Yy[e.arma]||150),n.janela&&!n.janela.quebrou){n.janela.quebrou=!0;for(let d=0;d<14;d++)c.particula(n.x,n.y+1.3,n.z,n.janela.nx*ht(1,3)+ht(-1,1),ht(0,2),n.janela.nz*ht(1,3)+ht(-1,1),.18,1.2,[.8,.92,1],[.6,.75,.85],.9,9.8,0);F0(h)}if(e.missil||e.arma==="120mm"||e.arco||e.arma==="foguete"){let d=s+ht(-1,1)*(1-e.precisao)*12,p=r+ht(-1,1)*(1-e.precisao)*12;No(i.x,i.y,i.z,d,p,e,n),c.clarao(i.x,i.y,i.z,e.arma==="120mm"?4:2.5);for(let v=0;v<4;v++)c.fumaca(i.x,i.y,i.z,2.5);xi(e.arma,h);return}let l=e.precisao*(1-a/(e.alcance*1.3)*.4)*(x.noite?.85:1),u=Math.random()<l,f=qy[e.arma]||[1,.85,.4];c.clarao(i.x,i.y,i.z,e.arma==="fuzil"||e.arma==="pistola"?.9:1.5),u?(c.tracante(i.x,i.y,i.z,s,o,r,f),e.splash?Uc(s,.5,r,e.splash,e.dano,n,!0):Gr(t,e.dano,n)):c.tracante(i.x,i.y,i.z,s+ht(-3,3),o+ht(-1,1),r+ht(-3,3),f),xi(e.arma,h)}function No(n,t,e,i,s,r,o){let a=Math.hypot(i-n,s-e),c=r.arma==="120mm"?900:r.arco?260:r.arma==="bomba"?0:r.missil?140:200,h={x0:n,y0:t,z0:e,tx:i,tz:s,t:0,x:n,y:t,z:e,dur:r.arma==="bomba"?Math.sqrt(2*Math.max(5,t)/9.8):Math.max(.12,a/c),arco:r.arco?Math.min(400,a*.35):r.missil?Math.min(60,a*.12):r.arma==="foguete"?a*.08:0,dano:r.dano,raio:r.splash||3,arma:r.arma,dono:o,rastro:r.arma!=="120mm",vx:o&&o.classe==="jato"?Math.sin(o.ang)*o.velAtual*.6:0,vz:o&&o.classe==="jato"?Math.cos(o.ang)*o.velAtual*.6:0};r.arma==="bomba"&&(h.tx=n+h.vx*h.dur,h.tz=e+h.vz*h.dur,h.tx=i,h.tz=s),x.projeteis.push(h)}function $0(n){let t=x.efeitos;for(let e=x.projeteis.length-1;e>=0;e--){let i=x.projeteis[e];i.t+=n;let s=Math.min(1,i.t/i.dur),r=i.x,o=i.y,a=i.z;i.x=i.x0+(i.tx-i.x0)*s,i.z=i.z0+(i.tz-i.z0)*s,i.arma==="bomba"?i.y=i.y0*(1-s*s):i.y=i.y0+(.5-i.y0)*s+Math.sin(s*Math.PI)*i.arco,i.rastro&&t.esteira(r,o,a),t.particula(i.x,i.y,i.z,0,0,0,i.arma==="naval"||i.arma==="155mm"?1.2:.9,.05,[1,.9,.6],[1,.6,.2],1),s>=1&&(Uc(i.x,.5,i.z,i.raio,i.dano,i.dono,!1),x.projeteis.splice(e,1))}}function Uc(n,t,e,i,s,r,o){let a=zs(n,e)&&Oi(n,e)===0;!o||i>2?x.efeitos.explosao(n,t,e,i*.8,a):x.efeitos.particula(n,t,e,0,2,0,i,.3,[1,.8,.3],[.4,.4,.4],1,0,i),i>=6&&Sc(Cn(n,e),i>=15),zc(n,e,i>=6?500:200);let c=i*i;x.hashA.busca(n,e,i*1.3,(h,l)=>{if(!h.vivo||h.dentro)return;let u=l<c?1-Math.sqrt(l)/i*.6:.25;Gr(h,s*u,r)}),x.tremor!==void 0&&i>=10&&(x.tremor=Math.max(x.tremor,Math.min(1,i/30)*Cn(n,e)))}function Z0(n){for(let t=x.unidades.length-1;t>=0;t--){let e=x.unidades[t];if(!e.vivo){x.unidades.splice(t,1);continue}if(e.estr){l2(e,n);continue}if(e.dentro){e.x=e.dentro.x,e.z=e.dentro.z,e.y=e.dentro.y,e.dentro.d.cura&&e.hp<e.hpMax&&(e.hp=Math.min(e.hpMax,e.hp+e.dentro.d.cura*n));continue}switch(e.fase+=n*(e.velAtual>.3?e.velAtual*1.6:0),e.mirando>0&&(e.mirando-=n),e.classe){case"inf":n2(e,n);break;case"veic":i2(e,n);break;case"naval":s2(e,n);break;case"aereo":r2(e,n);break;case"jato":o2(e,n);break}e.classe!=="jato"&&a2(e,n),e.d.carga&&c2(e,n),tp(e,n)}}function tf(n,t){let e=n.ordem;if(!e)return null;if(e.tipo==="mover")return{x:e.x,z:e.z,fim:()=>{n.ordem=null}};if(e.tipo==="atacar"){if(!Vs(e.alvo))return n.ordem=null,null;n.alvo=e.alvo;let i=(n.d.alcance||50)*.85;return Ot(n.x,n.z,e.alvo.x,e.alvo.z)<i?null:{x:e.alvo.x,z:e.alvo.z,dinamico:!0}}if(e.tipo==="guarnecer"){let i=e.predio;return e.e||(e.e=Cc(i,n.x,n.z)),Ot(n.x,n.z,e.e.x,e.e.z)<7?(Ky(n,i),null):{x:e.e.x,z:e.e.z}}if(e.tipo==="resgatar"){let i=e.predio;return!i.sos||i.civis<=0?(n.ordem=null,null):(e.e||(e.e=Cc(i,n.x,n.z)),Ot(n.x,n.z,e.e.x,e.e.z)<9||Ot(n.x,n.z,i.cx,i.cz)<i.raio+12?(Y0(i,n),n.ordem=null,null):{x:e.e.x,z:e.e.z})}if(e.tipo==="embarcar"){let i=e.t;return!i.vivo||!Lc(i,n)?(n.ordem=null,null):Ot(n.x,n.z,i.x,i.z)<i.d.raio+6?t2(i)?(Ku(n,i),null):(i.classe==="aereo"&&(!i.ordem||i.ordem.tipo!=="pousar")&&(i.ordem={tipo:"pousar"}),null):{x:i.x,z:i.z,dinamico:!0}}return null}function ef(n,t,e,i,s){if(!e){n.velAtual=0;return}let r=Math.max(2.5,n.d.raio*1.5);if(Ot(n.x,n.z,e.x,e.z)<r){n.velAtual=0,n.caminho=null,e.fim&&e.fim();return}if(n.repath-=t,(!n.caminho||e.dinamico||n.caminhoAlvo&&Ot(n.caminhoAlvo.x,n.caminhoAlvo.z,e.x,e.z)>15)&&n.repath<=0)if(x.orcamentoCaminhos<=0){if(n.caminho||(n.velAtual=0),!n.caminho)return}else{let f=x.cacheCam||(x.cacheCam=[]),d=null;for(let p of f)if(p.modo===s&&x.tempo-p.t<4&&Ot(p.sx,p.sz,n.x,n.z)<45&&Ot(p.ex,p.ez,e.x,e.z)<45){d=p;break}if(d?n.caminho=d.pts.slice(0,-1).concat([{x:e.x,z:e.z}]):(x.orcamentoCaminhos--,n.caminho=Gu(s,n.x,n.z,e.x,e.z,x.limiteCaminho||4e4),n.caminho&&!n.caminho.parcial&&(f.push({modo:s,sx:n.x,sz:n.z,ex:e.x,ez:e.z,pts:n.caminho,t:x.tempo}),f.length>20&&f.shift())),n.caminhoAlvo={x:e.x,z:e.z},n.wp=0,n.repath=2.5,!n.caminho){n.ordem=null,n.velAtual=0;return}}if(!n.caminho){n.velAtual=0;return}let o=n.caminho[n.wp];if(!o){let f=n.caminho&&n.caminho.parcial;n.caminho=null,n.velAtual=0,e.fim&&!f?e.fim():n.repath=f?0:1.2;return}let a=n.wp===n.caminho.length-1;if(Ot(n.x,n.z,o.x,o.z)<(a?r:Math.max(4,n.d.raio*2))&&(n.wp++,o=n.caminho[n.wp],!o)){let f=n.caminho&&n.caminho.parcial;n.caminho=null,n.velAtual=0,e.fim&&!f?e.fim():n.repath=f?0:1.2;return}let c=Math.atan2(o.x-n.x,o.z-n.z),h=n.classe==="inf"?10:n.classe==="naval"?n.d.raio>20?.25:.9:2.2;n.ang=Ve(n.ang,c,h*t);let l=Math.max(.15,Math.cos(Bi(n.ang,c))),u=i*l;n.velAtual=u,J0(n,Math.sin(n.ang)*u*t,Math.cos(n.ang)*u*t,s)}function Do(n,t,e,i){return i===0?Fe(t,e):i===3?Fe(t,e)||Br(1,t,e):Br(i,t,e)}function J0(n,t,e,i){let s=n.x+t,r=n.z+e;if(Do(n,s,r,i))n.x=s,n.z=r;else if(Math.abs(t)>Math.hypot(t,e)*.25&&Do(n,n.x+t,n.z,i))n.x+=t;else if(Math.abs(e)>Math.hypot(t,e)*.25&&Do(n,n.x,n.z+e,i))n.z+=e;else{let o=!1;for(let a of[.6,-.6,1.2,-1.2]){let c=Math.cos(a),h=Math.sin(a),l=t*c-e*h,u=t*h+e*c;if(Do(n,n.x+l,n.z+u,i)){n.x+=l,n.z+=u,o=!0;break}}o||(n.travado+=.1,n.travado>1.5&&(i===0||i===3)&&(n.x=s,n.z=r))}n.checa=(n.checa||0)+.016,n.checa>1.2&&(n.checa=0,Ot(n.x,n.z,n.ultimaPos.x,n.ultimaPos.z)<1&&n.velAtual>.5?(n.caminho=null,n.repath=0,n.travado++):n.travado=0,n.travado>4&&(n.ordem=null,n.caminho=null,n.travado=0),n.ultimaPos.x=n.x,n.ultimaPos.z=n.z)}function j0(n,t){x.hashU.busca(n.x,n.z,n.d.raio*2+1,(e,i)=>{if(e===n||!e.vivo||e.dentro||e.predio||e.classe!==n.classe||e.estr)return;let s=n.d.raio+e.d.raio;if(i<s*s&&i>1e-4){let r=Math.sqrt(i),o=(s-r)/r*.5*Math.min(1,t*8),a=(n.x-e.x)*o,c=(n.z-e.z)*o;Do(n,n.x+a,n.z+c,ju(n))&&(n.x+=a,n.z+=c)}})}function n2(n,t){if(x.controlando===n){Dc(n,t);return}if(n.predio){n.velAtual=0;return}let e=tf(n,t);ef(n,t,e,n.d.vel*(x.noite?.95:1),0),j0(n,t),n.d.cura&&(n.cura-=t,n.cura<=0&&(n.cura=1,x.hashU.busca(n.x,n.z,14,i=>{i.vivo&&i.classe==="inf"&&!i.dentro&&i.hp<i.hpMax&&(i.hp=Math.min(i.hpMax,i.hp+n.d.cura))})))}function i2(n,t){if(x.controlando===n)Dc(n,t);else{let e=tf(n,t);ef(n,t,e,n.d.vel,0)}j0(n,t),n.velAtual>3&&(Math.random()<t*4&&x.efeitos.poeira(n.x-Math.sin(n.ang)*n.d.raio,n.z-Math.cos(n.ang)*n.d.raio,1),n.d.raio>=3.4&&(n.tEsm=(n.tEsm||0)-t,n.tEsm<=0&&(n.tEsm=.25,Tu(n.x,n.z,n.d.raio+.8)&&(qu(Cn(n.x,n.z)),x.efeitos.poeira(n.x,n.z,4)))),n.d.atropela&&x.hashA.busca(n.x,n.z,n.d.raio+.6,e=>{e.vivo&&e.zumbi&&!e.dentro&&Gr(e,(e.sub==="bruto"?40:200)*t*n.velAtual/8,n)}))}function s2(n,t){if(x.controlando===n)Dc(n,t);else{let e=tf(n,t);ef(n,t,e,n.d.vel,ju(n))}if(n.velAtual>2&&Math.random()<t*6){let e=n.d.raio*1.2;x.efeitos.particula(n.x-Math.sin(n.ang)*e+ht(-2,2),.4,n.z-Math.cos(n.ang)*e+ht(-2,2),0,.5,0,n.d.raio*.25,2.5,[.95,.97,1],[.7,.8,.9],.5,0,n.d.raio*.15)}n.y=n.tipo==="lcac"?.4:0,n.tipo==="lcac"&&Math.random()<t*5&&x.efeitos.particula(n.x+ht(-8,8),.5,n.z+ht(-8,8),0,1,0,3,1,[.9,.9,.95],[.8,.8,.8],.35,0,3)}function r2(n,t){let e=n.d,i=n.ordem,s=null;if(x.controlando===n)Dc(n,t);else if(i)if(i.tipo==="pousar"){let o=Oi(n.x,n.z);if(zs(n.x,n.z)&&o===0){let c=On(0,n.x,n.z);c?n.ordem={tipo:"mover",x:c.x,z:c.z,pousar:!0,desembarcar:i.desembarcar}:n.ordem=null}else n.altAlvo=o,n.y<=o+.3&&(n.pousado=!0,i.desembarcar?(n.ordem=null,ki(n)):n.ordem=null,Gs(n.x,n.z,n.y)&&Pc(n))}else if(i.tipo==="mover")s={x:i.x,z:i.z},Ot(n.x,n.z,i.x,i.z)<3&&(i.pousar?n.ordem={tipo:"pousar",desembarcar:i.desembarcar}:n.ordem=null,e.orbita&&(n.orbita={x:i.x,z:i.z}));else if(i.tipo==="resgatar"){let o=i.predio;if(s={x:o.cx,z:o.cz},Ot(n.x,n.z,o.cx,o.cz)<Math.max(4,o.raio*.5)){if(n.altAlvo=o.h+6,s=null,n.y<o.h+9){if(e.carga&&o.civis>0){let a=0;for(;o.civis>0&&Xr(n)>=1;){let c=Zu(o.cx,o.cz,n);Qu(c,n),o.civis--,a++}a&&($t(`\u{1F681} ${a} civis embarcaram pelo telhado!`,o.cx,o.cz,"bom"),te("resgate")),o.civis<=0?o.sos=!1:$t(`Helic\xF3ptero cheio! Ainda h\xE1 ${o.civis} civis no telhado`,o.cx,o.cz)}n.ordem=null,n.altAlvo=e.altCruz}}else n.altAlvo=Math.max(e.altCruz,o.h+15)}else if(i.tipo==="atacar")Vs(i.alvo)?(n.alvo=i.alvo,Ot(n.x,n.z,i.alvo.x,i.alvo.z)>e.alcance*.7&&(s={x:i.alvo.x,z:i.alvo.z})):n.ordem=null;else if(i.tipo==="pousarPorta"){let o=x.porta;s={x:o.x+Math.sin(o.ang)*i.k,z:o.z+Math.cos(o.ang)*i.k},Ot(n.x,n.z,s.x,s.z)<4&&(n.ordem={tipo:"pousar",desembarcar:!1},s=null)}else i.tipo==="embarcar"&&(n.ordem=null);if(e.orbita&&!s&&n.orbita&&!(i&&i.tipo==="pousar")&&(n.orbAng=(n.orbAng||0)+t*e.vel/e.orbita,s={x:n.orbita.x+Math.sin(n.orbAng)*e.orbita,z:n.orbita.z+Math.cos(n.orbAng)*e.orbita}),s){n.pousado&&(n.pousado=!1),n.altAlvo<e.altCruz*.6&&!(i&&i.tipo==="resgatar")&&(n.altAlvo=e.altCruz);let o=n.y<Math.min(n.altAlvo,Oi(n.x,n.z)+12)-1,a=Math.atan2(s.x-n.x,s.z-n.z);n.ang=Ve(n.ang,a,(e.orbita?.8:2)*t);let c=Ot(n.x,n.z,s.x,s.z),h=(o?e.vel*.15:e.vel)*Math.min(1,c/40+.15)*Math.max(.2,Math.cos(Bi(n.ang,a)));n.velAtual+=(h-n.velAtual)*Math.min(1,t*1.5),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t}else x.controlando!==n&&(n.velAtual*=Math.max(0,1-t*2),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t);let r=Oi(n.x,n.z);if(n.pousado)n.y=r;else{let o=n.altAlvo;(s||i&&i.tipo!=="pousar")&&(o=Math.max(o,r+(i&&i.tipo==="resgatar"&&!s?4:10))),n.y+=en(o-n.y,-8*t,10*t),n.y<r&&(n.y=r)}n.alt=n.y,x.hashU.busca(n.x,n.z,30,(o,a)=>{if(o===n||o.classe!=="aereo"||!o.vivo||o.dentro)return;let c=(n.d.raio+o.d.raio)*1.1;if(a<c*c&&a>.01&&!n.pousado){let h=Math.sqrt(a),l=(c-h)/h*t*2;n.x+=(n.x-o.x)*l,n.z+=(n.z-o.z)*l}})}function Rc(n,t,e){let i=Math.cos(n.ang),s=Math.sin(n.ang);return{x:n.x+t*i+e*s,z:n.z-t*s+e*i}}function nf(n){let t=n.base;return t&&t.vivo?t:x.porta}function sf(n){return n.tipo==="portaavioes"}function K0(n){return sf(n)?{dx:6,d0:20,d1:160,td:-110,frear:30,vaga:t=>[-24+t%2*10,40+t*22]}:{dx:0,d0:-140,d1:80,td:-130,frear:11,vaga:t=>[-40+t%2*10,25+t*18]}}function o2(n,t){var g,M;let e=n.d,i=nf(n);if(!i)return;let s=K0(i),r=((g=i.deck)!=null?g:9.2)+.2,o=Math.sin(i.ang),a=Math.cos(i.ang);if(n.vy=0,n.estadoJato==="pronto"||n.estadoJato==="rearmando"){let[_,y]=s.vaga((M=n.vagaConves)!=null?M:0),R=Rc(i,_,y);n.x=R.x,n.z=R.z,n.y=r,n.ang=i.ang+Math.PI*.75,n.velAtual=0,n.banco=0,n.estadoJato==="rearmando"&&(n.rearme-=t,n.rearme<=0&&(n.estadoJato="pronto",n.municao=e.municao,n.hp=n.hpMax,$t(`${e.nome} rearmado e pronto`,n.x,n.z)));return}if(n.estadoJato==="decolando"){let _=e.vel*.42;n.velAtual=Math.min(_,n.velAtual+(sf(i)?28:16)*t),n.ang=i.ang,n.x+=o*n.velAtual*t,n.z+=a*n.velAtual*t,(n.x-i.x)*o+(n.z-i.z)*a>s.d1?(n.y+=14*t,n.vy=14):n.y=r,n.y>r+25&&(n.estadoJato="voando"),Math.random()<t*40&&x.efeitos.particula(n.x-o*9,n.y+.5,n.z-a*9,ht(-2,2),1,ht(-2,2),2,.8,[.85,.85,.85],[.7,.7,.7],.4,0,3);return}if(n.estadoJato==="pousando"){n.velAtual=Math.max(0,n.velAtual-s.frear*t),n.ang=i.ang,n.y=r,n.banco=0,n.x+=o*n.velAtual*t,n.z+=a*n.velAtual*t,n.velAtual<3&&(n.estadoJato="rearmando",n.rearme=18,n.ordem=null);return}let c=n.ordem,h,l,u=e.altCruz,f=e.vel,d=.9;if(n.estadoJato==="aproximando"){let _=Rc(i,s.dx*0,s.td),y=Ot(n.x,n.z,_.x,_.z);h=_.x,l=_.z,u=r+Math.min(90,y*.07),f=Math.max(65,e.vel*.32),d=1.2;let R=(n.x-i.x)*o+(n.z-i.z)*a;if(y<30||R>s.td&&Math.abs((n.x-i.x)*a-(n.z-i.z)*o)<25){n.estadoJato="pousando",n.y=r,x.efeitos.poeira(n.x,n.z,3),qu(Cn(n.x,n.z)*.6);return}y>2500&&(n.estadoJato="voltando")}else if(n.estadoJato==="voltando"||!c){n.estadoJato="voltando";let _=Rc(i,0,s.td-1300);h=_.x,l=_.z,Ot(n.x,n.z,_.x,_.z)<700&&(u=r+100),Ot(n.x,n.z,_.x,_.z)<180&&(n.estadoJato="aproximando")}else if(c.tipo==="area"){let _=$y(n,c,t);h=_.tx,l=_.tz,u=_.alt}else{h=c.x,l=c.z;let _=Ot(n.x,n.z,h,l),y=e.arma==="canhao";n.lancou&&!n.saidaPt&&(n.saidaPt={x:n.x+Math.sin(n.ang)*1400,z:n.z+Math.cos(n.ang)*1400}),_<900&&(u=y?45:e.arma==="bomba"?120:70),y&&(f=e.vel*.85);let R=Math.atan2(h-n.x,l-n.z),w=y||e.arma==="bomba"?330:380;if(_<w&&Math.abs(Bi(n.ang,R))<.25&&!n.lancou){let A=Ic({x:h,z:l},160,e.splash);if(!A)n.lancou=!0,n.passe=(n.passe||0)+1,n.passe>=3&&(n.estadoJato="voltando",$t(`${e.nome}: nenhum alvo no local, voltando`,n.x,n.z));else{if(y)n.rajadaT=1.7,xi("gau8",Cn(n.x,n.z));else if(e.arma==="bomba"){let I=e.bombas||2;for(let S=0;S<I;S++)No(n.x,n.y,n.z,A.x+ht(-6,6)+(S-(I-1)/2)*Math.sin(n.ang)*14,A.z+ht(-6,6)+(S-(I-1)/2)*Math.cos(n.ang)*14,{arma:"bomba",dano:e.dano,splash:e.splash,precisao:1},n);xi("bomba",Cn(n.x,n.z))}else{for(let I=0;I<e.rajada;I++){let S=A.x+ht(-12,12),b=A.z+ht(-12,12);No(n.x+ht(-1,1),n.y-1,n.z+ht(-1,1),S,b,{arma:"foguete",dano:e.dano,splash:e.splash,precisao:1,missil:!0},n)}xi("foguete",Cn(n.x,n.z))}n.municao--,n.lancou=!0,zc(h,l,600)}}n.lancou&&n.saidaPt&&(n.municao<=0&&!(n.rajadaT>0)?(n.estadoJato="voltando",n.lancou=!1,n.saidaPt=null,$t(`${e.nome} sem muni\xE7\xE3o, voltando para a base`,n.x,n.z)):Ot(n.x,n.z,n.saidaPt.x,n.saidaPt.z)<250?(n.lancou=!1,n.saidaPt=null):(h=n.saidaPt.x,l=n.saidaPt.z))}if(n.rajadaT>0)for(n.rajadaT-=t,n.lancou||(n.rajadaT=0),n.cdGau=(n.cdGau||0)-t;n.cdGau<=0;){n.cdGau+=.04;let _=120+ht(-15,15),y=n.x+Math.sin(n.ang)*_+ht(-5,5),R=n.z+Math.cos(n.ang)*_+ht(-5,5);x.efeitos.tracante(n.x+Math.sin(n.ang)*9,n.y-.4,n.z+Math.cos(n.ang)*9,y,.5,R,[1,.55,.2]),Uc(y,.3,R,e.splash,e.dano,n,!0)}let p=Math.atan2(h-n.x,l-n.z),v=n.ang;n.ang=Ve(n.ang,p,d*t),n.banco+=(en(Bi(v,n.ang)/t*.9,-1.2,1.2)-(n.banco||0))*Math.min(1,t*4),n.velAtual+=(f-n.velAtual)*Math.min(1,t*.8),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t,n.vy=en((u-n.y)*.8,-40,40),n.y+=en(u-n.y,-40*t,40*t),n.y<Oi(n.x,n.z)+15&&n.estadoJato!=="aproximando"&&(n.y=Oi(n.x,n.z)+15);let m=x.efeitos;if(Math.random()<t*25&&m.particula(n.x-Math.sin(n.ang)*9,n.y+.9,n.z-Math.cos(n.ang)*9,0,0,0,1.2,.5,[.8,.8,.8],[.6,.6,.6],.22,0,2),Math.abs(n.banco)>.5&&n.velAtual>120){let _=n.m&&n.m.def.pontas||6,y=Math.cos(n.ang),R=Math.sin(n.ang);for(let w of[-1,1]){let A=w*_,I=1.2+w*Math.sin(-n.banco)*_*.3;m.particula(n.x+y*A-R*3,n.y+I,n.z-R*A-y*3,0,0,0,.5,.7,[1,1,1],[.9,.9,.9],.55,0,.4)}}}function Dc(n,t){let e=x.joy||{x:0,z:0},i=Math.hypot(e.x,e.z),s=n.d.vel*(n.classe==="inf"?1.2:1);if(i>.1){let r=Math.atan2(e.x,e.z);n.classe==="aereo"?(n.ang=Ve(n.ang,r,3*t),n.velAtual=s*Math.min(1,i),n.x+=Math.sin(n.ang)*n.velAtual*t,n.z+=Math.cos(n.ang)*n.velAtual*t,n.pousado=!1,n.altAlvo<15&&(n.altAlvo=n.d.altCruz)):(n.ang=Ve(n.ang,r,(n.classe==="inf"?12:2.5)*t),n.velAtual=s*Math.min(1,i)*Math.max(.2,Math.cos(Bi(n.ang,r))),J0(n,Math.sin(n.ang)*n.velAtual*t,Math.cos(n.ang)*n.velAtual*t,ju(n)))}else n.velAtual=0;n.ordem=null,n.caminho=null}function a2(n,t){let e=n.d;if(!e.arma&&!e.sec||n.classe==="inf"&&n.velAtual>.5&&x.controlando!==n||n.classe==="aereo"&&n.pousado)return;n.busca-=t,n.cd-=t,n.cd2-=t,n.recarga>0&&(n.recarga-=t,n.recarga<=0&&(n.salva=e.salva));let i=n.predio?1.3:1;n.busca<=0&&(n.busca=.35+Math.random()*.2,n.ordem&&n.ordem.tipo==="atacar"&&Vs(n.ordem.alvo)||(!Vs(n.alvo)||Ot(n.x,n.z,n.alvo.x,n.alvo.z)>e.alcance*i)&&(n.alvo=Ic(n,e.alcance*i,e.splash&&e.splash>=8?e.splash:0,e.minAlc||0)),e.sec&&(n.alvo2=Ic(n,e.sec.alcance,e.sec.splash?e.sec.splash:0)));let s=n.alvo;if(Vs(s)&&e.arma){let r=Ot(n.x,n.z,s.x,s.z),o=Math.atan2(s.x-n.x,s.z-n.z);n.m&&n.m.torre?n.torreAng=Ve(n.torreAng,Bi(n.ang,o),3*t):n.janela?n.ang=Ve(n.ang,n.janela.ang+Math.max(-1.1,Math.min(1.1,Bi(n.janela.ang,o))),8*t):n.classe==="inf"&&n.velAtual<.5?n.ang=Ve(n.ang,o,8*t):n.classe==="aereo"&&!n.ordem&&n.velAtual<5&&(n.ang=Ve(n.ang,o,2*t)),n.cd<=0&&r<=e.alcance*i&&r>=(e.minAlc||0)&&(e.salva?n.salva>0&&(Ac(n,s,e),n.salva--,n.cd=e.cadencia,n.salva<=0&&(n.recarga=e.recarga)):(Ac(n,s,e),n.cd=e.cadencia*ht(.85,1.15)),n.mirando=.6)}else n.m&&n.m.torre&&(n.torreAng=Ve(n.torreAng,0,.8*t));e.sec&&Vs(n.alvo2)&&n.cd2<=0&&(!e.sec.splash||x.hashA.contar(n.alvo2.x,n.alvo2.z,e.sec.splash,r=>r.zumbi&&r.vivo)>=3||n.alvo2.sub==="bruto")&&(Ac(n,n.alvo2,e.sec),n.cd2=e.sec.cadencia*ht(.9,1.1))}function c2(n,t){n.passageiros.length&&Gs(n.x,n.z,n.y)&&(n.classe!=="aereo"||n.pousado)&&n.passageiros.some(e=>e.agente)&&Pc(n),n.classe==="naval"&&n.passageiros.length&&x.porta&&Ot(n.x,n.z,x.porta.x,x.porta.z)<200&&Pc(n)}function l2(n,t){if(n.construindo>0){n.construindo-=t;let e=1-Math.max(0,n.construindo)/n.tempoObra;n.m.grupo.scale.y=.15+.85*e,n.hp=Math.max(n.hp,n.hpMax*(.2+.8*e)),Math.random()<t*3&&x.efeitos.poeira(n.x+ht(-n.d.raio,n.d.raio)*.5,n.z+ht(-n.d.raio,n.d.raio)*.5,1),n.construindo<=0&&(n.m.grupo.scale.y=1,$t(`\u{1F3D7}\uFE0F ${n.d.nome} constru\xEDdo!`,n.x,n.z,"bom"),te("ok"));return}if(n.d.arma&&(n.busca-=t,n.cd-=t,n.busca<=0&&(n.busca=.4,n.alvo=Ic(n,n.d.alcance,0)),Vs(n.alvo)&&n.cd<=0&&(Ac({...n,y:11,m:null,classe:"estr"},n.alvo,n.d),n.cd=n.d.cadencia)),n.fila&&n.fila.length){let e=n.fila[0];e.t-=t,e.t<=0&&(n.fila.shift(),x.produzir(e.tipo,n))}}function Q0(n,t,e){n.vivo&&(n.classe==="inf"&&n.predio&&n.predio.integridade>0||(n.hp-=t,n.classe==="inf"&&Math.random()<.3&&x.efeitos.sangue(n.x,n.y+1.2,n.z,3),n.hp<=0&&h2(n,e)))}function h2(n,t){if(n.vivo){if(x.perdas+=n.estr||n.policia?0:1,n.estr){x.efeitos.explosao(n.x,5,n.z,18),Sc(Cn(n.x,n.z)),$t(`\u{1F4A5} ${n.d.nome} foi destru\xEDdo!`,n.x,n.z,"ruim"),Wr(n),n.tipoEstr==="qg"&&x.derrota&&x.derrota("O Quartel-General foi destru\xEDdo pelos zumbis.");return}n.predio&&(n.predio.guarnicao=n.predio.guarnicao.filter(e=>e!==n));for(let e of n.passageiros.slice())(n.classe==="aereo"&&n.y>8||n.classe==="naval")&&(e.agente?(e.vivo=!1,x.civisMortos++):(e.vivo=!1,Wr(e),x.perdas++));!(n.classe==="aereo"&&n.y>8)&&n.classe!=="naval"&&(n.pousado=!0,ki(n)),n.classe==="inf"?(t&&x.virarZumbi(n),$t(n.policia?t?"\u2623\uFE0F Um policial da SWAT foi mordido!":"Policial da SWAT abatido":t?"\u2623\uFE0F Um soldado foi mordido e virou zumbi!":"Soldado abatido",n.x,n.z,"ruim")):(x.efeitos.explosao(n.x,n.y+1,n.z,n.d.raio*2.5,zs(n.x,n.z)),Sc(Cn(n.x,n.z)),$t(`\u{1F4A5} ${n.d.nome} destru\xEDdo`,n.x,n.z,"ruim")),Wr(n)}}var wc=new Be;function tp(n,t){var r,o;if(n.anel&&(n.anel.position.set(n.x,(n.classe==="aereo"||n.classe==="jato"?Oi(n.x,n.z):n.y)+.35,n.z),n.anel.visible=!n.dentro),!n.m)return;let e=n.m.grupo;if(e.position.set(n.x,n.y,n.z),n.classe==="aereo"||n.classe==="jato"){let a=n.classe==="jato"?-en(Math.atan2(n.vy||0,Math.max(30,n.velAtual)),-.5,.5):en(n.velAtual/n.d.vel,-1,1)*.18;wc.set(a,n.ang,n.classe==="jato"?-(n.banco||0):0,"YXZ"),e.rotation.copy(wc)}else n.classe==="naval"&&n.d.raio<20?(wc.set(-Math.min(.06,n.velAtual*.004)+Math.sin(x.tempo*1.3+n.id)*.015,n.ang,Math.sin(x.tempo*.9+n.id)*.02,"YXZ"),e.rotation.copy(wc)):e.rotation.set(0,n.ang,0);if(n.m.torre&&(n.m.torre.rotation.y=n.torreAng),n.m.trem){let a=n.estadoJato,c=(o=(r=nf(n))==null?void 0:r.deck)!=null?o:9.2;n.m.trem.visible=a==="pronto"||a==="rearmando"||a==="pousando"||a==="decolando"&&n.y<c+12||a==="aproximando"&&n.y<c+60}if(n.m.chamas){let a=n.estadoJato==="voando"||n.estadoJato==="voltando"||n.estadoJato==="decolando",c=a?.8+Math.random()*.4:0;for(let h of n.m.chamas)h.visible=a,h.scale.set(1,1,c)}if(n.classe==="aereo"||n.classe==="jato"){if(!n.sombra){let l=new ns(1,16).rotateX(-Math.PI/2);n.sombra=new ae(l,new Dn({color:0,transparent:!0,opacity:.28,depthWrite:!1})),n.sombra.renderOrder=2,x.cena.add(n.sombra)}let a=Oi(n.x,n.z),c=n.y-a,h=x.dirSol||{x:-.5,y:.8,z:.4};n.sombra.visible=c>2&&!n.dentro&&!(n.classe==="jato"&&(n.estadoJato==="pronto"||n.estadoJato==="rearmando")),n.sombra.position.set(n.x-h.x/h.y*c,a+.3,n.z-h.z/h.y*c),n.sombra.scale.set(n.d.raio*.7,1,n.d.raio*1),n.sombra.rotation.y=n.ang}let i=n.classe==="aereo"&&!(n.pousado&&n.y===Oi(n.x,n.z)&&!n.ordem&&n.velAtual<.1&&n.parado>3);n.classe==="aereo"&&(n.parado=n.pousado?(n.parado||0)+t:0);let s=i?28:0;if(n.m.rotor&&(n.m.rotor.rotation.y+=s*t),n.m.rotor2&&(n.m.rotor2.rotation.y-=s*t),n.m.cauda&&(n.m.cauda.rotation.x+=s*2*t),n.m.helice&&(n.m.helice.rotation.y+=40*t),n.m.naceles){let a=n.velAtual>40?Math.PI/2:0;for(let c of n.m.naceles)c.piv.rotation.x+=(a-c.piv.rotation.x)*Math.min(1,t),c.ro.rotation.y+=s*t}}function Pn(n,t){n.sel=t,t&&!n.anel&&n.classe!=="inf"?(n.anel=A0(Math.max(1.2,n.d.raio*1.2)),x.cena.add(n.anel)):!t&&n.anel&&(x.cena.remove(n.anel),n.anel=null)}var Nc=new tc,ep=new Qn(new N(0,1,0),0),Fo=new N,Bc=new at,Fc=class{constructor(t){this.cam=t,this.alvo={x:0,z:0},this.dist=700,this.yaw=.35,this.inclExtra=0,this.seguir=null,this.tremor=0}pitch(){let t=en((Math.log(this.dist)-Math.log(25))/(Math.log(6e3)-Math.log(25)),0,1);return en(m0(.42,1.25,t)+this.inclExtra,.2,1.45)}aplicar(t){if(this.seguir){let c=this.seguir;c.vivo?(this.alvo.x+=(c.x-this.alvo.x)*Math.min(1,t*6),this.alvo.z+=(c.z-this.alvo.z)*Math.min(1,t*6)):this.seguir=null}this.alvo.x=en(this.alvo.x,-2e3,Oe+2e3),this.alvo.z=en(this.alvo.z,-2e3,ke+2e3);let e=this.pitch(),i=this.seguir&&this.seguir.y||0,s=this.cam,r=0,o=0;x.tremor>.01&&(r=(Math.random()-.5)*x.tremor*3,o=(Math.random()-.5)*x.tremor*3,x.tremor*=Math.max(0,1-t*5)),s.position.set(this.alvo.x+Math.sin(this.yaw)*Math.cos(e)*this.dist+r,i+Math.sin(e)*this.dist,this.alvo.z+Math.cos(this.yaw)*Math.cos(e)*this.dist+o);let a=0;for(let c of[1,.85,.7]){let h=this.alvo.x+(s.position.x-this.alvo.x)*c,l=this.alvo.z+(s.position.z-this.alvo.z)*c;for(let[u,f]of[[0,0],[4,0],[-4,0],[0,4],[0,-4]]){let d=Ls(h+u,l+f);d&&d.h>a&&(a=d.h)}}s.position.y<a+6&&(s.position.y=a+6),s.lookAt(this.alvo.x,i,this.alvo.z),s.near=Math.max(.5,this.dist*.01),s.updateProjectionMatrix(),x.camAlvo=this.alvo,x.camDist=this.dist}chao(t,e,i=0){Bc.set(t/innerWidth*2-1,-(e/innerHeight)*2+1),Nc.setFromCamera(Bc,this.cam),ep.constant=-i;let s=Nc.ray.intersectPlane(ep,Fo);return s?{x:s.x,z:s.z}:null}irPara(t,e,i){this.alvo.x=t,this.alvo.z=e,i&&(this.dist=i),this.seguir=null}};function fn(n,t,e,i){return Fo.set(n,t,e).project(i),Fo.z>1?null:{x:(Fo.x+1)/2*innerWidth,y:(1-Fo.y)/2*innerHeight}}function ip(n,t){let e=new Map,i=null,s=null,r=null,o=null,a={t:0,u:null};x.modoCaixa=!1,n.addEventListener("contextmenu",l=>l.preventDefault()),n.addEventListener("pointerdown",l=>{if(Fi(),n.setPointerCapture(l.pointerId),e.set(l.pointerId,{x:l.clientX,y:l.clientY,x0:l.clientX,y0:l.clientY,t0:performance.now(),botao:l.button}),e.size===1){let u=t.chao(l.clientX,l.clientY);if(i={ch:u,moveu:!1,girar:l.button===2},x.modoArea&&l.button!==2&&u&&x.selecao.some(f=>f.classe==="jato")){x.area={x0:u.x,z0:u.z,x1:u.x,z1:u.z};return}x.modoCaixa||l.shiftKey?o={x0:l.clientX,y0:l.clientY,x1:l.clientX,y1:l.clientY}:(clearTimeout(r),r=setTimeout(()=>{let f=e.values().next().value;f&&e.size===1&&Math.hypot(f.x-f.x0,f.y-f.y0)<12&&(o={x0:f.x0,y0:f.y0,x1:f.x,y1:f.y},navigator.vibrate&&navigator.vibrate(25))},450))}else if(e.size===2){clearTimeout(r),o=null;let[u,f]=[...e.values()];s={d:Math.hypot(u.x-f.x,u.y-f.y),ang:Math.atan2(f.y-u.y,f.x-u.x),mx:(u.x+f.x)/2,my:(u.y+f.y)/2,dist:t.dist,yaw:t.yaw},i=null}}),n.addEventListener("pointermove",l=>{let u=e.get(l.pointerId);if(u){if(u.x=l.clientX,u.y=l.clientY,x.area&&e.size===1){let f=t.chao(u.x,u.y);f&&(x.area.x1=f.x,x.area.z1=f.z),Math.hypot(u.x-u.x0,u.y-u.y0)>10&&i&&(i.moveu=!0);return}if(o&&e.size===1){o.x1=u.x,o.y1=u.y,x.caixa=o;return}if(e.size===1&&i){if(Math.hypot(u.x-u.x0,u.y-u.y0)>10&&(i.moveu=!0,clearTimeout(r)),!i.moveu)return;if(i.girar){t.yaw-=l.movementX*.006,t.inclExtra=en(t.inclExtra-l.movementY*.004,-.3,.3);return}t.seguir=null;let f=t.chao(u.x,u.y);f&&i.ch&&(t.alvo.x+=i.ch.x-f.x,t.alvo.z+=i.ch.z-f.z,t.aplicar(0),i.ch=t.chao(u.x,u.y))}else if(e.size===2&&s){let[f,d]=[...e.values()],p=Math.hypot(f.x-d.x,f.y-d.y),v=Math.atan2(d.y-f.y,d.x-f.x);t.dist=en(s.dist*s.d/Math.max(10,p),25,6e3),t.yaw=s.yaw-(v-s.ang);let m=(f.x+d.x)/2,M=(f.y+d.y)/2-s.my;Math.abs(p-s.d)<40&&(t.inclExtra=en(t.inclExtra+(M-(s.ultDy||0))*.003,-.3,.3)),s.ultDy=M}}});let c=l=>{let u=e.get(l.pointerId);if(clearTimeout(r),!!u){if(e.delete(l.pointerId),x.area){let f=x.area;x.area=null;let d=Math.hypot(f.x1-f.x0,f.z1-f.z0),p=x.selecao.filter(v=>v.classe==="jato"&&v.vivo);if(d>25&&p.length){let v=Math.max(40,Math.min(160,d*.35));q0(p,f.x0,f.z0,f.x1,f.z1,v),x.areaMarcada={...f,w:v,t:performance.now()},x.ui&&x.ui.alerta(`\u{1F3AF} \xC1rea de bombardeio marcada (${Math.round(d)} m). ${p.length>1?p.length+" jatos":"Jato"} a caminho!`,(f.x0+f.x1)/2,(f.z0+f.z1)/2,"info"),te("ok"),e.size===0&&(s=null,i=null);return}}if(o){u2(o,t,l.shiftKey),o=null,x.caixa=null,x.modoCaixa&&x.ui&&x.ui.modoCaixa(!1);return}if(e.size===0&&i&&!i.moveu&&!s)if(l.button===2)x.selecao.slice().forEach(f=>Pn(f,!1)),x.selecao=[],x.ui&&x.ui.atualizarSelecao();else{let f=performance.now();p2(u.x,u.y,t,f-a.t<330,a),a.t=f}e.size===0&&(s=null,i=null)}};n.addEventListener("pointerup",c),n.addEventListener("pointercancel",c),n.addEventListener("wheel",l=>{l.preventDefault(),t.dist=en(t.dist*Math.exp(l.deltaY*.0012),25,6e3)},{passive:!1});let h=new Set;addEventListener("keydown",l=>{h.add(l.key.toLowerCase()),l.key===" "&&(x.pausado=!x.pausado,x.ui&&x.ui.atualizarTopo()),l.key==="Escape"&&(x.selecao.slice().forEach(u=>Pn(u,!1)),x.selecao=[],x.ui&&x.ui.atualizarSelecao())}),addEventListener("keyup",l=>h.delete(l.key.toLowerCase())),x.teclado=l=>{let u=0,f=0;if(x.controlando){let d={x:0,z:0};(h.has("w")||h.has("arrowup"))&&(d.z-=1),(h.has("s")||h.has("arrowdown"))&&(d.z+=1),(h.has("a")||h.has("arrowleft"))&&(d.x-=1),(h.has("d")||h.has("arrowright"))&&(d.x+=1),d.x||d.z?x.joyTeclado=d:x.joyTeclado=null;return}if((h.has("w")||h.has("arrowup"))&&(f-=1),(h.has("s")||h.has("arrowdown"))&&(f+=1),(h.has("a")||h.has("arrowleft"))&&(u-=1),(h.has("d")||h.has("arrowright"))&&(u+=1),h.has("q")&&(t.yaw+=l*1.5),h.has("e")&&(t.yaw-=l*1.5),u||f){let d=t.dist*1.2*l,p=Math.sin(t.yaw),v=Math.cos(t.yaw);t.alvo.x+=(u*v+f*p)*d,t.alvo.z+=(-u*p+f*v)*d,t.seguir=null}}}function Oc(){let n=x.selecao.length&&x.selecao.every(t=>t.classe==="jato");n&&!x.modoArea&&x.ui&&x.ui.alerta("\u{1F3AF} Arraste o dedo no mapa para marcar a \xE1rea que os jatos v\xE3o bombardear (ou toque num ponto)",null,null,"info"),x.modoArea=!!n}function u2(n,t,e){let i=Math.min(n.x0,n.x1),s=Math.max(n.x0,n.x1),r=Math.min(n.y0,n.y1),o=Math.max(n.y0,n.y1);e||(x.selecao.slice().forEach(c=>Pn(c,!1)),x.selecao=[]);let a=[];for(let c of x.unidades){if(!c.vivo||c.estr||c.dentro||c.tipo==="portaavioes"||c.policia)continue;let h=fn(c.x,c.y+1,c.z,t.cam);h&&h.x>=i&&h.x<=s&&h.y>=r&&h.y<=o&&a.push(c)}for(let c of a)x.selecao.includes(c)||(x.selecao.push(c),Pn(c,!0));a.length&&te("clique"),Oc(),x.ui&&x.ui.atualizarSelecao()}function f2(n,t,e,i){let s=null,r=1/0;for(let o of x.unidades){if(!o.vivo||o.dentro||o.policia||i&&!i(o))continue;let a=fn(o.x,o.y+(o.classe==="inf"?1:(o.d.raio||2)*.4),o.z,e);if(!a)continue;let c=fn(o.x+(o.d.raio||1)*Math.cos(x.cam.yaw),o.y,o.z-(o.d.raio||1)*Math.sin(x.cam.yaw),e),h=c?Math.hypot(c.x-a.x,c.y-a.y):0,l=Math.max(26,h*1.1),u=Math.hypot(a.x-n,a.y-t);u<l&&u-h*.5<r&&(r=u-h*.5,s=o)}return s}function d2(n,t,e){let i=x.cam.chao(n,t);if(!i)return null;let s=Math.max(6,x.cam.dist*.03),r=null,o=1/0;return x.hashA.busca(i.x,i.z,s,(a,c)=>{a.zumbi&&a.vivo&&a.estado!=="morto"&&c<o&&(o=c,r=a)}),r}function np(n,t,e){Bc.set(n/innerWidth*2-1,-(t/innerHeight)*2+1),Nc.setFromCamera(Bc,e);let i=Nc.intersectObjects(x.malhasPredios||[],!1);if(i.length){let r=i[0],o=r.face?r.face.normal:{x:0,y:1,z:0},a=Ls(r.point.x-o.x*.6,r.point.z-o.z*.6);if(a)return a}let s=x.cam.chao(n,t);if(s){let r=Ls(s.x,s.z);if(r)return r}return null}function p2(n,t,e,i,s){let r=e.cam;if(x.construindo){let u=e.chao(n,t);u&&x.construir(x.construindo,u.x,u.z)&&(x.construindo=null,x.ui.atualizarConstrucao());return}let o=x.selecao.filter(u=>u.vivo&&!u.dentro);x.selecao=o;let a=f2(n,t,r);if(a&&!a.estr){let u=o.filter(f=>f!==a&&Lc(a,f));if(o.length&&a.d.carga&&u.length&&!o.includes(a)){vi(u,{tipo:"embarcar",t:a}),a.classe==="aereo"&&!a.pousado&&(a.ordem={tipo:"pousar"}),x.ui.ping(a.x,a.z,"embarque"),te("ok");return}if(a.tipo==="portaavioes"&&o.length&&o.some(f=>f.classe==="aereo")){let f=-120;for(let p of o)p.classe==="aereo"&&(p.ordem={tipo:"pousarPorta",k:f},p.altAlvo=p.d.altCruz,f+=30);let d=o.filter(p=>p.classe==="naval");d.length&&_i(d,a.x+120,a.z),x.ui.ping(a.x,a.z,"mover"),te("ok");return}if(i&&s.u===a)for(let f of x.unidades){if(f.tipo!==a.tipo||!f.vivo||f.dentro||x.selecao.includes(f))continue;let d=fn(f.x,f.y,f.z,r);d&&d.x>0&&d.y>0&&d.x<innerWidth&&d.y<innerHeight&&(x.selecao.push(f),Pn(f,!0))}else x.selecaoMultipla?x.selecao.includes(a)?(x.selecao.splice(x.selecao.indexOf(a),1),Pn(a,!1)):(x.selecao.push(a),Pn(a,!0)):(x.selecao.slice().forEach(f=>Pn(f,!1)),x.selecao=[a],Pn(a,!0));s.u=a,te("clique"),Oc(),x.ui.atualizarSelecao();return}if(a&&a.estr&&!o.length){x.fonteSel=a,["quartel","patio","heliporto","docas"].includes(a.tipoEstr)?x.ui.abrirProducao(a.tipoEstr):x.ui.alerta(`${a.d.nome}${a.construindo>0?" (em constru\xE7\xE3o)":""}`,a.x,a.z,"info");return}if(!o.length){let u=np(n,t,r);u&&x.ui.infoPredio(u);return}let c=d2(n,t,r);if(c){let u=o.filter(d=>d.d.arma&&d.classe!=="jato");vi(u,{tipo:"atacar",alvo:c});let f=o.filter(d=>d.classe==="jato");f.length&&_i(f,c.x,c.z),x.ui.ping(c.x,c.z,"atacar"),te("ok");return}let h=np(n,t,r);if(h){let u=o.filter(p=>p.classe==="inf"),f=o.filter(p=>p.classe==="aereo"),d=o.filter(p=>p.classe!=="inf"&&p.classe!=="aereo");if(h.civis>0){vi(o.filter(v=>v.classe==="inf"||v.classe==="veic"),{tipo:"resgatar",predio:h}),vi(f.filter(v=>v.d.carga),{tipo:"resgatar",predio:h});let p=f.filter(v=>!v.d.carga).concat(d.filter(v=>v.classe!=="veic"));p.length&&_i(p,h.cx,h.cz),x.ui.ping(h.cx,h.cz,"resgate")}else{u.length&&vi(u,{tipo:"guarnecer",predio:h});let p=f.concat(d);p.length&&_i(p,h.cx,h.cz),x.ui.ping(h.cx,h.cz,u.length?"guarnecer":"mover")}te("ok");return}let l=e.chao(n,t);l&&(_i(o,l.x,l.z),x.ui.ping(l.x,l.z,o.some(u=>u.classe==="jato")&&o.every(u=>u.classe==="jato")?"atacar":"mover"),te("ok"))}var m2=(be.delegacias||[]).map(([n,t,e])=>({nome:n,x:t*be.mpp,z:e*be.mpp})),g2=4,Oo=[];x.equipes=Oo;function x2(n){return Fe(n.x,n.z)?n:On(0,n.x,n.z)||n}function of(n,t,e){if(x.policiaDesistiu||Oo.filter(c=>c.vivo).length>=g2)return;let i=m2.slice().sort((c,h)=>Ot(c.x,c.z,n,t)-Ot(h.x,h.z,n,t))[0],s=x2(i),r=$e("bearcat",s.x,s.z,0);r.policia=!0;let o=[];for(let c=0;c<6;c++){let h=$e("swat",s.x+ht(-3,3),s.z+ht(-3,3),0);h.policia=!0,Ku(h,r),o.push(h)}let a={van:r,oficiais:o,alvo:{x:n,z:t},estado:"indo",t:0,calmo:0,vivo:!0,id:Oo.length+1};Oo.push(a),r.ordem={tipo:"mover",x:n,z:t},$t(`\u{1F693} SWAT da ${i.nome} a caminho de ${e||"um foco de infec\xE7\xE3o"}`,s.x,s.z,"info"),te("sirene")}function sp(n,t,e){return x.hashA?x.hashA.contar(n,t,e,i=>i.zumbi&&i.vivo&&i.estado!=="morto"):0}function rp(n,t,e){let i=null,s=e*e;for(let r of x.agentes){if(!r.zumbi||!r.vivo||r.dentro||r.estado==="morto")continue;let o=(r.x-n)**2+(r.z-t)**2;o<s&&(s=o,i=r)}return i}var rf=0;function op(n){if(rf-=n,!(rf>0)){rf=1;for(let t of Oo){if(!t.vivo)continue;t.oficiais=t.oficiais.filter(a=>a.vivo);let e=t.van.vivo?t.van:null;if(!e&&!t.oficiais.length){t.vivo=!1,$t("\u2620\uFE0F Uma equipe da SWAT foi perdida",t.alvo.x,t.alvo.z,"ruim");continue}t.t+=1;let i=t.oficiais.filter(a=>!a.dentro),s=i.length?{x:i.reduce((a,c)=>a+c.x,0)/i.length,z:i.reduce((a,c)=>a+c.z,0)/i.length}:e||t.oficiais[0];if(e){let a=e.passageiros.filter(c=>c.agente).length;if(t.estado!=="evacuar"&&a>0&&(Xr(e)<1||a>=4&&sp(e.x,e.z,60)===0&&t.t>20)){t.estado="evacuar";let c=(x.abrigos||[]).filter(h=>h.vivo&&!(h.construindo>0)).sort((h,l)=>Ot(h.x,h.z,e.x,e.z)-Ot(l.x,l.z,e.x,e.z))[0]||x.estr.zona;e.ordem={tipo:"mover",x:c.x,z:c.z},$t(`\u{1F693} Blindado da SWAT levando ${a} civis para a zona segura`,e.x,e.z,"bom")}if(t.estado==="evacuar"){e.passageiros.some(c=>c.agente)?Gs(e.x,e.z,0)&&!e.ordem&&ki(e):(t.estado="voltar",e.ordem={tipo:"mover",x:t.alvo.x,z:t.alvo.z});continue}if(t.estado==="voltar"){(Ot(e.x,e.z,t.alvo.x,t.alvo.z)<80||!e.ordem)&&(t.estado="combate");continue}}if(sp(t.alvo.x,t.alvo.z,140)===0?t.calmo++:t.calmo=0,t.calmo>12){let a=rp(s.x,s.z,3500);a&&(t.alvo={x:a.x,z:a.z},t.calmo=0,t.estado="indo")}let o=Ot(s.x,s.z,t.alvo.x,t.alvo.z)>320;if(e&&o&&t.estado!=="indo"){t.estado="indo";let a=t.oficiais.filter(c=>!c.dentro);a.length&&vi(a,{tipo:"embarcar",t:e})}if(t.estado==="indo"&&e){let a=t.oficiais.filter(c=>!c.dentro);if(a.length&&t.t%30!==0&&a.some(c=>c.ordem&&c.ordem.tipo==="embarcar"))continue;Ot(e.x,e.z,t.alvo.x,t.alvo.z)>70?e.ordem||(e.ordem={tipo:"mover",x:t.alvo.x+ht(-20,20),z:t.alvo.z+ht(-20,20)}):(e.ordem=null,ki(e),t.estado="combate");continue}t.estado="combate";for(let a of t.oficiais){if(a.dentro||a.ordem||a.alvo&&a.alvo.vivo&&a.alvo.zumbi)continue;let h=rp(a.x,a.z,200)||t.alvo;if(Ot(a.x,a.z,h.x,h.z)>45){let l=Math.atan2(h.x-a.x,h.z-a.z)+ht(-.4,.4);_i([a],a.x+Math.sin(l)*30,a.z+Math.cos(l)*30)}}e&&!e.ordem&&s!==e&&Ot(e.x,e.z,s.x,s.z)>50&&(e.ordem={tipo:"mover",x:s.x+ht(-10,10),z:s.z+ht(-10,10)})}}}var ko=[];x.acampamentos=ko;var af=20,v2=0;function _2(n,t){let e="cidade",i=1/0;for(let s in Ce){if(["base","heliporto","docas","portaavioes"].includes(s))continue;let r=Ye(n,t,Ce[s].x,Ce[s].z);r<i&&(i=r,e=Ce[s].nome)}return e}function y2(n,t,e){for(let i of x.unidades)if(i.vivo&&!i.policia&&(i.estr||i.classe==="inf"||i.classe==="veic")&&Ye(i.x,i.z,n,t)<e*e)return!1;return!0}function ap(n,t){for(let e=0;e<30;e++){let i=n+ht(-60,60),s=t+ht(-60,60),r=!0;for(let o=0;o<6.28&&r;o+=.8)Fe(i+Math.sin(o)*12,s+Math.cos(o)*12)||(r=!1);if(r&&Fe(i,s))return{x:i,z:s}}return null}function cf(n,t,e){let i=e/Math.max(6,n.membros.length)*Math.PI*2,s=t.armado?11.5:4+e%3*1.5;return{x:n.x+Math.sin(i)*s,z:n.z+Math.cos(i)*s}}function cp(n,t,e,i=!1){let s=Nr("acampamento");s.grupo.position.set(n,0,t),s.grupo.rotation.y=ht(0,6.28),x.cena.add(s.grupo);let r={id:++v2,x:n,z:t,m:s,membros:[],ativo:!0,policia:i,nome:_2(n,t),t:0};ko.push(r);for(let o of e)M2(r,o);return r}function M2(n,t){t.campo=n,t.estado="acampar",t.lider=null,n.membros.push(t),t.posto=cf(n,t,n.membros.length-1)}function lf(n){n.armado=!0,n.hp=Math.max(n.hp,60)}function b2(n){let t=x.criarCivil(n.x,n.z);return t.camisa=vc,t.calca=_c,t.pele=Ro,t.policial=!0,t.cabelo=null,lf(t),t.hp=115,t}function S2(){let n=(x.equipes||[]).find(e=>e.vivo&&!e.desistiu);if(!n)return!1;n.desistiu=!0,n.vivo=!1;let t=[];for(let e of n.oficiais)e.vivo&&(e.dentro&&(e.dentro.passageiros.splice(e.dentro.passageiros.indexOf(e),1),e.dentro.cargaUsada-=1,e.dentro=null),t.push(b2(e)),Wr(e));if(n.van.vivo){for(let s of n.van.passageiros.slice())s.agente&&(s.dentro=null,t.push(s));n.van.passageiros=n.van.passageiros.filter(s=>!s.agente);let e=n.van.x,i=n.van.z;if(Wr(n.van),t.length){let s=ap(e,i)||{x:e,z:i},r=cp(s.x,s.z,t,!0);$t(`\u{1F694} A SWAT desistiu! Os policiais abandonaram o servi\xE7o e montaram um acampamento em ${r.nome}`,r.x,r.z,"ruim")}}return te("alerta"),!0}function lp(n){af-=n;for(let s of ko){if(!s.ativo)continue;if(s.membros=s.membros.filter(o=>o.vivo&&!o.zumbi&&o.estado!=="morto"&&o.campo===s),s.t+=n,s.t>25&&Math.random()<n*.03){let o=s.membros.find(a=>!a.armado);o&&s.membros.filter(a=>a.armado).length<s.membros.length*.7&&(lf(o),o.posto=cf(s,o,s.membros.indexOf(o)))}if(!s.membros.length){s.ativo=!1,$t(`\u2620\uFE0F O acampamento de sobreviventes em ${s.nome} caiu`,s.x,s.z,"ruim");continue}let r=null;if(x.hashU.busca(s.x,s.z,45,o=>{r||!o.vivo||o.dentro||o.policia||o.estr||(o.classe==="inf"||o.classe==="veic"||o.classe==="aereo"&&o.pousado&&o.d.carga||o.classe==="naval"&&o.d.carga)&&(r=o)}),r){s.ativo=!1;for(let o of s.membros)o.campo=null,o.estado="seguir",o.lider=r,o.espera=0;$t(`\u{1F91D} ${s.membros.length} sobreviventes de ${s.nome} aceitaram o resgate e seguem suas tropas!`,s.x,s.z,"bom"),te("resgate")}}if(af>0)return;af=15;let t=x.populacao?x.infectados/x.populacao:0;if(!x.policiaDesistiu&&(t>.4||x.nZumbis>250&&x.nZumbis>x.nCivis)&&(x.policiaDesistiu=!0,$t("\u{1F4FB} A cidade est\xE1 tomada. A pol\xEDcia e a SWAT est\xE3o desistindo e abandonando os postos!",null,null,"surto")),x.policiaDesistiu&&Math.random()<.6&&S2(),x.focos<2||x.tempo<180||ko.filter(s=>s.ativo).length>=8)return;let i=x.agentes.filter(s=>s.vivo&&!s.zumbi&&!s.dentro&&!s.campo&&s.estado!=="morto"&&s.estado!=="seguir");for(let s=0;s<6;s++){let r=i[Math.random()*i.length|0];if(!r)return;if(!y2(r.x,r.z,350)||ko.some(h=>h.ativo&&Ye(h.x,h.z,r.x,r.z)<500*500))continue;let o=i.filter(h=>!h.campo&&Ye(r.x,r.z,h.x,h.z)<140*140).slice(0,16);if(o.length<5)continue;let a=ap(r.x,r.z);if(!a)continue;let c=cp(a.x,a.z,o);for(let h=0;h<Math.min(o.length,2+(x.dia>=2?2:0));h++)lf(o[h]);for(let h of o)h.posto=cf(c,h,c.membros.indexOf(h));$t(`\u{1F3D5}\uFE0F Sobreviventes montaram um acampamento em ${c.nome} (${o.length} pessoas). Mande tropas para resgat\xE1-los!`,c.x,c.z,"info"),te("alerta");return}}var hp={facil:{dinheiro:5e3,civis:600,sos:22,meta:150,intervalo:1.35,renda:7},normal:{dinheiro:3500,civis:750,sos:26,meta:250,intervalo:1,renda:5},dificil:{dinheiro:2200,civis:900,sos:30,meta:350,intervalo:.7,renda:4}};function fp(){var o;x.danoUnidade=Q0,x.naZonaSegura=Gs,x.volEm=Cn,x.vagas=Xr,x.construir=T2,x.embarcarCivil=Qu,x.criarCivil=Tc,x.virarZumbi=V0,x.produzir=xp;let n=Ce.base;mu(n.x,n.z,380);let t=(o=be.baseAng)!=null?o:.43,e={x:Math.cos(t),z:Math.sin(t)},i={x:-e.z,z:e.x};x.baseEixo={ax:e,pp:i,ang:Math.atan2(e.x,e.z)};let s=(a,c)=>({x:n.x+e.x*a+i.x*c,z:n.z+e.z*a+i.z*c});x.layout={qg:s(0,-10),quartel:s(-150,-60),patio:s(-150,60),heliporto:s(150,-20),zona:s(10,110),torres:[s(-260,-120),s(-260,140),s(260,-120),s(260,140),s(0,-160)],patriot:[s(90,120),s(230,60)]};let r=[["qg",42,28,16],["quartel",56,42,6],["patio",64,34,10]];for(let[a,c,h,l]of r){let u=x.layout[a];E2(u.x,u.z,c,h,x.baseEixo.ang+Math.PI/2,l)}pu(),Vu()}function E2(n,t,e,i,s,r){let o=Math.cos(s),a=Math.sin(s),c=new Float32Array(8),h=[[-e/2,-i/2],[-e/2,i/2],[e/2,i/2],[e/2,-i/2]],l=1e9,u=-1e9,f=1e9,d=-1e9;h.forEach(([v,m],g)=>{let M=n+v*o+m*a,_=t-v*a+m*o;c[g*2]=M,c[g*2+1]=_,l=Math.min(l,M),u=Math.max(u,M),f=Math.min(f,_),d=Math.max(d,_)});let p=0;for(let v=0;v<4;v++){let m=(v+1)%4;p+=c[v*2]*c[m*2+1]-c[m*2]*c[v*2+1]}if(p>0){let v=new Float32Array([c[6],c[7],c[4],c[5],c[2],c[3],c[0],c[1]]);c.set(v)}Ue.push({id:Ue.length,pts:c,h:r,area:e*i,cx:n,cz:t,x0:l,x1:u,z0:f,z1:d,raio:Math.max(e,i)/2,cap:12,guarnicao:[],civis:0,sos:!1,integridade:600,integMax:600,removido:!1,base:!0})}function dp(){x.chao=vu(x.cena),x.agua=_u(x.cena);let n=Ue.filter(r=>r.base);for(let r of n)r.removido=!0;x.malhasPredios=gu(x.cena);for(let r of n)r.removido=!1;let t=Ce.base,e=x.baseEixo,i=We?null:{x:t.x+e.pp.x*-330,z:t.z+e.pp.z*-330};x.decor=yu(x.cena,2600,i?(r,o)=>{let a=r-i.x,c=o-i.z,h=e.ang,l=a*Math.sin(h)+c*Math.cos(h),u=a*Math.cos(h)-c*Math.sin(h);return Math.abs(l)<180&&u>-110&&u<40}:null);let s=Ce.base;x.decor.push(...bu(x.cena,3200,(r,o)=>Ot(r,o,s.x,s.z)<450));for(let r of Ue)r.base||(r.integMax=150+Math.min(900,r.area*.4),r.integridade=r.integMax)}function yi(n,t,e,i){let s=Bu[n],r=Nr(n);r.grupo.position.set(t,0,e),r.grupo.rotation.y=i,x.cena.add(r.grupo);let o={id:x.idSeq++,estr:!0,tipoEstr:n,tipo:n,d:s,classe:"estr",x:t,z:e,y:0,ang:i,hp:s.hp,hpMax:s.hp,vivo:!0,m:r,fila:[],passageiros:[],cargaUsada:0,busca:ht(0,1),cd:0};return x.unidades.push(o),["qg","zona","fob"].includes(n)&&(x.abrigos||(x.abrigos=[])).push(o),o}function Ho(n){if(n==="porta")return We?x.porta:Ho("pista");if(x.fonteSel&&x.fonteSel.vivo&&x.fonteSel.tipoEstr===n&&!(x.fonteSel.construindo>0))return x.fonteSel;let t=null,e=1/0,i=x.camAlvo||{x:0,z:0};for(let s of x.unidades){if(!s.vivo||!s.estr||s.tipoEstr!==n||s.construindo>0)continue;let r=Ye(s.x,s.z,i.x,i.z);r<e&&(e=r,t=s)}return t}function T2(n,t,e){let i=Po[n];if(x.dinheiro<i.custo)return $t("Dinheiro insuficiente",null,null,"ruim"),te("erro"),!1;if(!Fe(t,e))return $t("N\xE3o d\xE1 para construir a\xED (pr\xE9dio ou \xE1gua)",t,e,"ruim"),te("erro"),!1;let s=Math.min(i.raio,24);if(!i.agua&&n!=="muro"&&n!=="torre"){let c=0;for(let h=0;h<6.28;h+=.5)for(let l of[.5,1])Fe(t+Math.sin(h)*s*l,e+Math.cos(h)*s*l)||c++;if(c>3)return $t("Pouco espa\xE7o livre aqui: escolha um terreno aberto (pra\xE7a, estacionamento, rua larga)",t,e,"ruim"),te("erro"),!1}for(let c of x.unidades)if(c.vivo&&c.estr&&Ot(c.x,c.z,t,e)<(c.d.raio+i.raio)*.6)return $t("Muito perto de outra estrutura",t,e,"ruim"),te("erro"),!1;let r=x.cam?x.cam.yaw:0,o=null;if(i.agua){let c=mp(t,e);if(!c||c.r>80)return $t("As docas precisam ficar na beira da \xE1gua",t,e,"ruim"),te("erro"),!1;t=c.x,e=c.z,r=c.ang,o=c.agua}x.dinheiro-=i.custo;let a=yi(n,t,e,r);return a.construindo=i.tempo,a.tempoObra=i.tempo,a.hp=a.hpMax*.2,a.m.grupo.scale.y=.15,o&&(a.saidaAgua=o),n==="pista"&&(a.deck=.3,a.fila=[]),(n==="quartel"||n==="patio")&&(a.saida=Hi({x:t+Math.sin(r)*40,z:e+Math.cos(r)*40})),$t(`\u{1F3D7}\uFE0F Construindo ${i.nome}...`,t,e,"info"),te("ok"),!0}function Hi(n,t=0){return t===0&&Fe(n.x,n.z)?n:On(t,n.x,n.z)||n}function pp(n){let t=hp[n]||hp.normal;x.dificuldade=n,x.cfgDif=t,x.dinheiro=t.dinheiro,x.meta=t.meta,x.tempo=0,x.dia=1,x.focos=0,x.proxFoco=20,x.infectados=0,x.resgatados=0,x.civisMortos=0,x.zumbisMortos=0,x.perdas=0,x.ruidos=[],x.quadro=0,x.fim=!1;let e=x.baseEixo.ang+Math.PI/2,i=x.layout;x.estr.qg=yi("qg",i.qg.x,i.qg.z,e),x.estr.quartel=yi("quartel",i.quartel.x,i.quartel.z,e),x.estr.patio=yi("patio",i.patio.x,i.patio.z,e);let s=Hi(i.heliporto);x.estr.heliporto=yi("heliporto",s.x,s.z,e);let r=Hi(i.zona);x.estr.zona=yi("zona",r.x,r.z,e);for(let M of i.torres){let _=Hi(M);Ot(_.x,_.z,M.x,M.z)<60&&yi("torre",_.x,_.z,e)}for(let M of i.patriot){let _=Hi(M);yi("patriot",_.x,_.z,e+.5)}let o=We?mp(x.estr.qg.x,x.estr.qg.z):null;o&&(x.estr.docas=yi("docas",o.x,o.z,o.ang),x.estr.docas.saidaAgua=o.agua);for(let M of["quartel","patio"]){let _=x.estr[M],y={x:_.x+x.baseEixo.pp.x*45,z:_.z+x.baseEixo.pp.z*45};_.saida=Hi(y)}let a;if(We){a=Ce.portaavioes,Br(2,a.x,a.z)||(a=On(2,a.x,a.z)||a),x.porta=$e("portaavioes",a.x,a.z,Math.PI),x.porta.fila=[],x.porta.deck=9.2;let M=On(2,a.x-250,a.z+300)||{x:a.x,z:a.z+400};$e("destroier",M.x,M.z,Math.PI);let _=x.estr.docas.saidaAgua;$e("lancha",_.x,_.z,o.ang)}else{let M=Ce.base,_=x.baseEixo.ax,y=x.baseEixo.pp,w=((A,I)=>({x:M.x+_.x*A+y.x*I,z:M.z+_.z*A+y.z*I}))(0,-330);x.porta=yi("pista",w.x,w.z,x.baseEixo.ang),x.porta.deck=.3,x.porta.aerodromo=!0,a=x.porta}let c=x.estr.quartel.saida,h=x.estr.patio.saida,l={fuzileiro:8,metralhador:2,sniper:1,medico:1},u=0;for(let M in l)for(let _=0;_<l[M];_++,u++){let y=Hi({x:c.x+u%4*3-5,z:c.z+Math.floor(u/4)*3});$e(M,y.x,y.z,x.baseEixo.ang)}for(let[M,_]of[["humvee",2],["stryker",1],["ambulancia",1]])for(let y=0;y<_;y++,u++){let R=Hi({x:h.x+u%3*8-8,z:h.z+u%2*8});$e(M,R.x,R.z,x.baseEixo.ang)}let f=x.estr.heliporto,d=$e("blackhawk",f.x+x.baseEixo.ax.x*-30,f.z+x.baseEixo.ax.z*-30,x.baseEixo.ang);d.pousado=!0,d.y=0;let p=$e("apache",f.x,f.z,x.baseEixo.ang);p.pousado=!0;let v=$e("f35",a.x,a.z,0);v.vagaConves=0,v.base=x.porta;let m=$e("f18",a.x,a.z,0);if(m.vagaConves=1,m.base=x.porta,!We){let M=$e("a10",a.x,a.z,0);M.vagaConves=2,M.base=x.porta}w2(t.civis);let g=Ue.filter(M=>!M.base&&!M.removido&&M.h>9&&Ot(M.cx,M.cz,x.estr.qg.x,x.estr.qg.z)>700);for(let M=0;M<t.sos&&g.length;M++){let _=g.splice(lc(0,g.length-1),1)[0];_.sos=!0,_.civis=lc(4,14)}x.populacao=x.agentes.length+Ue.reduce((M,_)=>M+_.civis,0),x.pausado=!1}function mp(n,t){let e=null;for(let i=0;i<16;i++){let s=i/16*Math.PI*2,r=Math.sin(s),o=Math.cos(s);for(let a=20;a<600;a+=4){let c=n+r*a,h=t+o*a;if(zs(c,h)){if(!e||a<e.r){let l=On(1,c+r*60,h+o*60)||{x:c+r*60,z:h+o*60};e={r:a,x:c-r*4,z:h-o*4,ang:s,agua:l}}break}}}return e||{x:n,z:t,ang:0,agua:{x:n,z:t}}}function w2(n){let t=x.estr.qg,e=0,i=0;for(;i<n&&e<n*200;){e++;let s=Math.random()*Oe,r=Math.random()*ke;if(!Fe(s,r)||Ye(s,r,t.x,t.z)<600*600)continue;let o=Math.floor(s/Ae),a=Math.floor(r/Ae),c=0;for(let h=-3;h<=3;h+=3)for(let l=-3;l<=3;l+=3){let u=(a+h)*Ft+(o+l);u>=0&&u<Le.length&&Le[u]>=0&&c++}Math.random()>.08+c*.12||(Tc(s,r),i++)}}function kc(n,t){let e=qn[n],i=Ho(t||e.de);return!i&&(t||e.de)==="pista"?($t(x.unidades.some(s=>s.vivo&&s.tipoEstr==="pista")?"A pista de pouso ainda est\xE1 em constru\xE7\xE3o":"Construa uma Pista de Pouso (\u{1F528} Construir) para usar F-22 e A-10",null,null,"ruim"),te("erro"),!1):!i||!i.vivo?($t("Estrutura destru\xEDda: n\xE3o d\xE1 para produzir",0,0,"ruim"),te("erro"),!1):x.dinheiro<e.custo?($t("Dinheiro insuficiente",null,null,"ruim"),te("erro"),!1):i.fila.length>=8?($t("Fila cheia",null,null),te("erro"),!1):e.classe==="jato"&&x.unidades.filter(s=>s.classe==="jato"&&s.vivo&&(s.base||x.porta)===i).length+i.fila.filter(s=>qn[s.tipo].classe==="jato").length>=6?($t("Esta base comporta no m\xE1ximo 6 jatos",null,null),te("erro"),!1):(x.dinheiro-=e.custo,i.fila.push({tipo:n,t:e.tempo,total:e.tempo}),te("clique"),!0)}function gp(n,t){let e=Ho(n);if(!e||!e.fila[t])return;let i=e.fila.splice(t,1)[0];x.dinheiro+=qn[i.tipo].custo}function xp(n,t){let e=qn[n],i;if(t&&(t===x.porta||t.tipoEstr==="pista")){let s=t;if(e.classe==="jato"){i=$e(n,s.x,s.z,0),i.base=s;let r=new Set(x.unidades.filter(a=>a.classe==="jato"&&a!==i&&a.vivo&&(a.base||x.porta)===s).map(a=>a.vagaConves)),o=0;for(;r.has(o);)o++;i.vagaConves=o}else{let r=-60-lc(0,3)*25;i=$e(n,s.x+Math.sin(s.ang)*r,s.z+Math.cos(s.ang)*r,s.ang,{alt:s.deck}),i.y=s.deck,i.pousado=!0}}else if(e.de==="heliporto"){let s=[[-30,0],[0,0],[30,0],[-15,32],[15,32]],[r,o]=mi(s),a=Math.cos(t.ang),c=Math.sin(t.ang);i=$e(n,t.x+r*a+o*c,t.z-r*c+o*a,t.ang),i.pousado=!0}else if(e.de==="docas"){let s=t.saidaAgua,r=s;e.nav===2&&(r=On(2,s.x,s.z)||s),i=$e(n,r.x+ht(-10,10),r.z+ht(-10,10),t.ang)}else{let s=t.saida||t,r=Hi({x:s.x+ht(-6,6),z:s.z+ht(-6,6)});i=$e(n,r.x,r.z,x.baseEixo.ang)}return $t(`${e.icone} ${e.nome} pronto!`,i.x,i.z,"bom"),te("ok"),i}var hf=be.focos||["bayside"];function uf(n,t){let e="Miami",i=1/0;for(let s in Ce){if(s==="base"||s==="heliporto"||s==="docas"||s==="portaavioes")continue;let r=Ye(n,t,Ce[s].x,Ce[s].z);r<i&&(i=r,e=Ce[s].nome)}return e}function A2(){x.focos++;let n,t,e=x.agentes.filter(a=>a.vivo&&!a.zumbi&&!a.dentro&&a.estado!=="morto"&&Ot(a.x,a.z,x.estr.qg.x,x.estr.qg.z)>700);if(x.focos<=4&&Ce[hf[x.focos-1]]){let a=Ce[hf[x.focos-1]];n=a.x,t=a.z}else if(e.length){let a=mi(e);n=a.x,t=a.z}else return;let i=Math.min(14,3+Math.floor(x.focos*.8)),s=e.sort((a,c)=>Ye(a.x,a.z,n,t)-Ye(c.x,c.z,n,t)).slice(0,i),r=0;for(let a of s){if(Ot(a.x,a.z,n,t)>250)break;Uo(a,x.dia>=2&&Math.random()<.2?"corredor":"comum"),x.infectados++,r++}for(;r<i;r++){let a=On(0,n+ht(-20,20),t+ht(-20,20));a&&(Ju(a.x,a.z),x.infectados++,x.populacao++)}let o=uf(n,t);(x.swatPendente||(x.swatPendente=[])).push({t:x.tempo+4,x:n,z:t,nome:o}),$t(x.focos===1?`\u2623\uFE0F Primeiro caso confirmado em ${o}! O surto come\xE7ou.`:`\u2623\uFE0F Novo foco de infec\xE7\xE3o: ${o}`,n,t,"surto"),te("alerta")}function R2(){let n=Math.min(30,6+x.dia*4),t,e,i=0;do{i++;let s=Math.random()*4|0,r=Math.random();t=s===0?ht(5,50):s===1?Oe-ht(5,50):r*Oe,e=s===2?ht(5,50):s===3?ke-ht(5,50):r*ke}while((!Fe(t,e)||Ot(t,e,x.estr.qg.x,x.estr.qg.z)<900)&&i<300);if(!(i>=300)){for(let s=0;s<n;s++){let r=On(0,t+ht(-30,30),e+ht(-30,30));if(r){let o=Ju(r.x,r.z,x.dia>=3&&Math.random()<.06?"bruto":x.dia>=2&&Math.random()<.2?"corredor":"comum");o.estado="ruido";let a=Ce[hf[0]];o.destino={x:a.x,z:a.z}}}of(t,e,uf(t,e)),$t(`\u{1F9DF} Horda de ${n} zumbis chegando de fora da cidade (${uf(t,e)})`,t,e,"surto"),te("alerta")}}function vp(n){x.tempo+=n,x.quadro++;let t=480;if(x.hora=(x.tempo/t*24+8)%24,x.dia=1+Math.floor((x.tempo/t*24+8)/24),x.noite=x.hora<6||x.hora>=19.5,x.dinheiro+=x.cfgDif.renda*n,x.ruidos=x.ruidos.filter(i=>x.tempo-i.t<3),x.ruidos.length>60&&x.ruidos.splice(0,x.ruidos.length-60),x.tempo>=x.proxFoco&&(A2(),x.proxFoco=x.tempo+Math.max(35,80-x.focos*6)*x.cfgDif.intervalo),x.dia>=2&&(x.proxHorda||(x.proxHorda=x.tempo+30),x.tempo>=x.proxHorda&&(R2(),x.proxHorda=x.tempo+Math.max(70,160-x.dia*20)*x.cfgDif.intervalo)),x.swatPendente)for(let i=x.swatPendente.length-1;i>=0;i--){let s=x.swatPendente[i];x.tempo>=s.t&&(x.swatPendente.splice(i,1),of(s.x,s.z,s.nome))}op(n),lp(n);let e=x.porta;if(e&&e.vivo&&e.fila.length){let i=e.fila[0];i.t-=n,i.t<=0&&(e.fila.shift(),xp(i.tipo,e))}if(x.resgateAcum&&(!x._ultResg||x.tempo-x._ultResg>2)&&($t(`\u2705 ${x.resgateAcum} civis chegaram \xE0 zona segura (+$${x.resgateAcum*40})`,null,null,"bom"),te("resgate"),x.resgateAcum=0,x._ultResg=x.tempo),!x.fim&&x.quadro%30===0){let i=Ue.reduce((s,r)=>s+(r.base?0:r.civis),0);x.resgatados>=x.meta?up(`Voc\xEA resgatou ${x.resgatados} civis. Miami agradece!`):x.focos>=5&&x.nZumbis===0&&x.tempo>300?up("O surto foi contido: n\xE3o restou nenhum zumbi em Miami!"):x.focos>=2&&x.nCivis===0&&i===0&&_p("N\xE3o restaram civis para resgatar.")}}function up(n){x.fim=!0,x.pausado=!0,x.ui&&x.ui.fim(!0,n)}function _p(n){x.fim||(x.fim=!0,x.pausado=!0,x.ui&&x.ui.fim(!1,n))}x.derrota=_p;var ee=n=>document.querySelector(n),us=(n,t,e)=>{let i=document.createElement(n);return t&&(i.className=t),e!==void 0&&(i.innerHTML=e),i},yp=n=>Math.floor(n).toLocaleString("pt-BR"),Hc=class{constructor(t){this.cam=t,this.pings=[],this.raiz=ee("#ui"),this.ov=ee("#overlay"),this.ctx=this.ov.getContext("2d"),this.abaProd="quartel",this.montar(),x.ui=this}montar(){this.raiz.innerHTML=`
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
    `;let t=(l,u)=>ee(l).addEventListener("click",f=>{f.stopPropagation(),Fi(),u(f)});t("#b-pausa",()=>{x.pausado=!x.pausado,this.atualizarTopo()}),t("#b-vel",()=>{x.velocidade=x.velocidade>=3?1:x.velocidade+1,ee("#b-vel").textContent=x.velocidade+"x"}),t("#b-menu",()=>this.menuPausa()),t("#b-prod",()=>this.abrirProducao()),t("#p-fechar",()=>ee("#producao").classList.add("oculto")),t("#b-caixa",()=>this.modoCaixa(!x.modoCaixa)),t("#b-multi",()=>{x.selecaoMultipla=!x.selecaoMultipla,ee("#b-multi").classList.toggle("ativo",x.selecaoMultipla)}),t("#b-terra",()=>this.selecionarGrupo(l=>l.classe==="inf"||l.classe==="veic")),t("#b-aereo",()=>this.selecionarGrupo(l=>l.classe==="aereo")),t("#b-naval",()=>this.selecionarGrupo(l=>l.classe==="naval"&&l.tipo!=="portaavioes")),t("#b-jato",()=>this.selecionarGrupo(l=>l.classe==="jato")),t("#b-base",()=>this.cam.irPara(x.estr.qg.x,x.estr.qg.z,450)),t("#b-porta",()=>this.cam.irPara(x.porta.x,x.porta.z,600)),t("#b-alerta",()=>{let l=[...x.alertas].reverse().find(u=>u.x!=null);l&&this.cam.irPara(l.x,l.z,Math.min(this.cam.dist,350))}),t("#b-sair-controle",()=>this.controlar(null));let e=ee("#mini"),i=xu(10);this.miniFundo=i;let s=l=>{let u=e.getBoundingClientRect(),f=(l.clientX-u.left)/u.width*Oe,d=(l.clientY-u.top)/u.height*ke;this.cam.irPara(f,d)};e.addEventListener("pointerdown",l=>{l.stopPropagation(),s(l),e.setPointerCapture(l.pointerId),e._arr=!0}),e.addEventListener("pointermove",l=>{e._arr&&s(l)}),e.addEventListener("pointerup",()=>{e._arr=!1});let r=ee("#joy"),o=ee("#joy-bola"),a=null,c=l=>{let u=r.getBoundingClientRect(),f=(l.clientX-u.left-u.width/2)/(u.width/2),d=(l.clientY-u.top-u.height/2)/(u.height/2),p=Math.hypot(f,d);p>1&&(f/=p,d/=p),x.joyUI={x:f,y:d},o.style.transform=`translate(${f*40}px, ${d*40}px)`};r.addEventListener("pointerdown",l=>{l.stopPropagation(),a=l.pointerId,r.setPointerCapture(a),c(l)}),r.addEventListener("pointermove",l=>{l.pointerId===a&&c(l)});let h=()=>{a=null,x.joyUI=null,o.style.transform=""};r.addEventListener("pointerup",h),r.addEventListener("pointercancel",h);for(let l of["#topo","#lateral","#selecao","#producao","#info","#alertas"])ee(l).addEventListener("pointerdown",u=>u.stopPropagation())}ajustarCidade(){if(!We){ee("#b-naval").classList.add("oculto");let t=ee("#b-porta");t.innerHTML="\u2708\uFE0F<small>Pista</small>"}}atualizarConstrucao(){let t=ee("#b-cancela-constr");t||(t=us("button","bt destaque","\u2716 Cancelar constru\xE7\xE3o"),t.id="b-cancela-constr",t.style.cssText="position:fixed;left:50%;bottom:12px;transform:translateX(-50%);pointer-events:auto",t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.stopPropagation(),x.construindo=null,this.atualizarConstrucao()}),this.raiz.appendChild(t)),t.classList.toggle("oculto",!x.construindo)}modoCaixa(t){x.modoCaixa=t,ee("#b-caixa").classList.toggle("ativo",t)}selecionarGrupo(t){if(x.selecao.slice().forEach(e=>Pn(e,!1)),x.selecao=x.unidades.filter(e=>e.vivo&&!e.estr&&!e.dentro&&!e.policia&&t(e)),x.selecao.forEach(e=>Pn(e,!0)),te("clique"),Oc(),this.atualizarSelecao(),x.selecao.length){let e=0,i=0;for(let s of x.selecao)e+=s.x,i+=s.z;x.selecao.length===1&&x.selecao[0].classe!=="jato"&&this.cam.irPara(e/x.selecao.length,i/x.selecao.length)}}atualizarTopo(){ee("#t-din").textContent="\u{1F4B5} $"+yp(x.dinheiro),ee("#t-res").textContent=`\u2705 ${x.resgatados}/${x.meta}`;let t=this._presos||0;ee("#t-civ").textContent=`\u{1F9CD} ${x.nCivis||0}`+(t?` +${t}\u{1F3E2}`:""),ee("#t-zum").textContent=`\u{1F9DF} ${x.nZumbis||0}`;let e=x.populacao?Math.round(x.infectados/x.populacao*100):0;ee("#t-inf").textContent=`\u2623\uFE0F ${e}%`;let i=Math.floor(x.hora||8),s=Math.floor((x.hora||8)%1*60);ee("#t-hora").textContent=`${x.noite?"\u{1F319}":"\u2600\uFE0F"} Dia ${x.dia||1} ${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`,ee("#b-pausa").textContent=x.pausado?"\u25B6":"\u23F8",ee("#producao").classList.contains("oculto")||this.atualizarProducao()}alerta(t,e,i,s){let r=ee("#alertas");if(!r)return;let o=us("div","alerta "+s,t);for(e!=null&&(o.classList.add("clicavel"),o.addEventListener("click",a=>{a.stopPropagation(),this.cam.irPara(e,i,Math.min(this.cam.dist,350))})),r.prepend(o);r.children.length>4;)r.lastChild.remove();setTimeout(()=>{o.classList.add("saindo"),setTimeout(()=>o.remove(),600)},s==="surto"?9e3:5500)}ping(t,e,i){this.pings.push({x:t,z:e,tipo:i,t:0})}atualizarSelecao(){let t=x.selecao.filter(a=>a.vivo&&!a.dentro);x.selecao=t;let e=ee("#selecao");if(!t.length){e.classList.add("oculto");return}e.classList.remove("oculto");let i={};for(let a of t)i[a.tipo]=(i[a.tipo]||0)+1;let s=Object.entries(i).map(([a,c])=>`<span class="tag">${qn[a].icone} ${c>1?c+"\xD7 ":""}${qn[a].nome}</span>`).join("");if(t.length===1){let a=t[0];if(s+=`<div class="sub">${a.d.sub||""}</div><div class="barra"><i style="width:${Math.max(0,a.hp/a.hpMax*100)}%"></i></div>`,a.d.carga){let c=a.passageiros.filter(l=>l.agente).length,h=a.passageiros.length-c;s+=`<div class="sub">Carga: ${a.cargaUsada}/${a.d.carga} \u2022 ${h} militares, ${c} civis</div>`}a.predio&&(s+=`<div class="sub">No telhado (${a.predio.guarnicao.length}/${a.predio.cap}) \u2022 estrutura ${Math.round(a.predio.integridade)}</div>`),a.classe==="jato"&&(s+=`<div class="sub">${{pronto:"Pronto para decolar",decolando:"Decolando",voando:"Em miss\xE3o",voltando:"Voltando para a base",aproximando:"Aproxima\xE7\xE3o para pouso",pousando:"Pousando",rearmando:"Rearmando..."}[a.estadoJato]} \u2022 muni\xE7\xE3o ${a.municao}/${a.d.municao}</div>`)}ee("#sel-info").innerHTML=s;let r=ee("#sel-bts");r.innerHTML="";let o=(a,c,h="")=>{let l=us("button","bt "+h,a);l.addEventListener("click",u=>{u.stopPropagation(),Fi(),te("clique"),c(),this.atualizarSelecao()}),r.appendChild(l)};o("\u{1F6D1} Parar",()=>{for(let a of t)a.ordem=null,a.caminho=null,a.alvo=null,a.classe==="aereo"&&(a.altAlvo=Math.max(a.y,a.d.altCruz*.6))}),t.some(a=>a.passageiros&&a.passageiros.length)&&o("\u2B07\uFE0F Desembarcar",()=>{for(let a of t)a.passageiros&&a.passageiros.length&&ki(a)}),t.some(a=>a.classe==="aereo")&&o("\u{1F6EC} Pousar",()=>{for(let a of t)a.classe==="aereo"&&(a.ordem={tipo:"pousar"})}),t.some(a=>a.predio)&&o("\u{1F3C3} Sair do pr\xE9dio",()=>{for(let a of t)a.predio&&Bo(a)}),t.some(a=>a.classe==="jato")&&o(x.modoArea?"\u{1F3AF} \xC1rea: LIGADA":"\u{1F3AF} Marcar \xE1rea",()=>{x.modoArea=!x.modoArea},x.modoArea?"ativo":""),t.some(a=>a.classe==="jato")&&o("\u{1F6F3}\uFE0F Voltar",()=>{for(let a of t)a.classe==="jato"&&a.estadoJato==="voando"&&(a.estadoJato="voltando")}),t.length===1&&t[0].classe!=="jato"&&o("\u{1F3AE} Controlar",()=>this.controlar(t[0]),"destaque"),o("\u{1F3A5} Seguir",()=>{this.cam.seguir=t[0],this.cam.dist>300&&(this.cam.dist=t[0].classe==="inf"?60:150)}),o("\u2716",()=>{t.forEach(a=>Pn(a,!1)),x.selecao=[],x.modoArea=!1})}controlar(t){x.controlando&&(x.controlando.ordem=null),x.controlando=t,ee("#joy").classList.toggle("oculto",!t),ee("#b-sair-controle").classList.toggle("oculto",!t),ee("#lateral").classList.toggle("oculto",!!t),ee("#mini").classList.toggle("oculto",!!t),ee("#selecao").classList.toggle("escondida",!!t),t?(this.cam.seguir=t,this.cam.dist=t.classe==="inf"?22:t.classe==="aereo"?90:t.classe==="naval"?t.d.raio>20?400:90:45,this.cam.inclExtra=-.1):this.cam.inclExtra=0}abrirProducao(t){t&&(this.abaProd=t),!Mc[this.abaProd]&&this.abaProd!=="construir"&&(this.abaProd="quartel"),ee("#producao").classList.remove("oculto");let e=ee("#p-abas");e.innerHTML="";for(let s of["construir",...Object.keys(Mc)]){if(!We&&(s==="docas"||s==="porta")||We&&s==="pista"&&!x.unidades.some(o=>o.vivo&&o.tipoEstr==="pista"))continue;let r=us("button","aba"+(s===this.abaProd?" ativo":""),s==="construir"?"\u{1F528} Construir":s==="porta"&&!We?"\u2708\uFE0F Aer\xF3dromo":N0[s]);r.addEventListener("click",o=>{o.stopPropagation(),this.abaProd=s,this.abrirProducao()}),e.appendChild(r)}let i=ee("#p-lista");if(i.innerHTML="",this.abaProd==="construir"){for(let s in Po){let r=Po[s];if(r.agua&&!We)continue;let o=us("div","carta"+(x.construindo===s?" sel":""),`<div class="ic">${r.icone}</div><div class="tx"><b>${r.nome}</b><small>${r.sub}</small><span>$${r.custo} \u2022 ${r.tempo}s</span></div>`);o.dataset.custo=r.custo,o.addEventListener("click",a=>{if(a.stopPropagation(),Fi(),x.dinheiro<r.custo){te("erro");return}x.construindo=s,ee("#producao").classList.add("oculto"),this.alerta(`\u{1F528} Toque no mapa onde quer construir: ${r.nome}${r.agua?" (na beira da \xE1gua)":""}. Toque em \u2716 para cancelar.`,null,null,"info"),this.atualizarConstrucao()}),i.appendChild(o)}ee("#p-fila").innerHTML="<i>Escolha a estrutura e toque no mapa. Bases novas produzem unidades e as zonas seguras/FOB recebem civis.</i>",ee("#p-fila")._chave=null;return}for(let s of Mc[this.abaProd]){let r=qn[s],o=us("div","carta",`<div class="ic">${r.icone}</div><div class="tx"><b>${r.nome}</b><small>${r.sub}</small><span>$${r.custo} \u2022 ${r.tempo}s</span></div>`);o.dataset.custo=r.custo,o.addEventListener("click",a=>{a.stopPropagation(),Fi(),kc(s,this.abaProd)&&this.atualizarProducao()}),i.appendChild(o)}this.atualizarProducao()}atualizarProducao(){ee("#p-din").textContent=" \u{1F4B5} $"+yp(x.dinheiro);for(let s of document.querySelectorAll("#p-lista .carta"))s.classList.toggle("caro",x.dinheiro<+s.dataset.custo);if(this.abaProd==="construir")return;let t=Ho(this.abaProd),e=ee("#p-fila");if(!t||!t.vivo){e.innerHTML="<i>Estrutura destru\xEDda</i>";return}let i=t.fila.map(s=>s.tipo).join(",");e._chave!==i&&(e._chave=i,e.innerHTML=t.fila.length?"":"<i>Fila vazia \u2014 toque numa unidade para produzir</i>",t.fila.forEach((s,r)=>{let o=us("div","item",`${qn[s.tipo].icone}<i></i>`);o.title="Cancelar",o.addEventListener("click",a=>{a.stopPropagation(),gp(this.abaProd,r),this.atualizarProducao()}),e.appendChild(o)})),t.fila.forEach((s,r)=>{let o=e.children[r];o&&o.querySelector("i")&&(o.querySelector("i").style.width=100-s.t/s.total*100+"%")})}infoPredio(t){let e=ee("#info");e.classList.remove("oculto");let i=t.base?"Pr\xE9dio da base":t.h>60?"Arranha-c\xE9u":t.h>15?"Pr\xE9dio":"Casa / loja";e.innerHTML=`<b>\u{1F3E2} ${i}</b> \u2022 ${Math.round(t.h)} m de altura<br>
      Soldados no telhado: ${t.guarnicao.length}/${t.cap}<br>
      ${t.civis?t.sos?`\u{1F198} <b>${t.civis} civis presos</b> pedindo socorro!`:`\u{1F3E0} ${t.civis} civis abrigados`:"Sem civis"}<br>
      <small>Selecione soldados e toque no pr\xE9dio para coloc\xE1-los no telhado. Com civis dentro, as tropas os resgatam; helic\xF3pteros pegam pelo telhado.</small>`,clearTimeout(this._tInfo),this._tInfo=setTimeout(()=>e.classList.add("oculto"),6e3)}desenharMini(){let t=ee("#mini"),e=t.getContext("2d"),i=t.width/Oe,s=t.height/ke;e.drawImage(this.miniFundo,0,0,t.width,t.height),e.fillStyle="#ff3b3b";for(let o of x.agentes)o.vivo&&o.zumbi&&!o.dentro&&o.estado!=="morto"&&e.fillRect(o.x*i-.5,o.z*s-.5,1.6,1.6);e.fillStyle="#ffffff";for(let o of x.agentes)o.vivo&&!o.zumbi&&!o.dentro&&o.estado!=="morto"&&e.fillRect(o.x*i-.5,o.z*s-.5,1.2,1.2);for(let o of Ue)o.civis>0&&(e.fillStyle=o.sos?"#ffd23b":"#5bc0ff",e.fillRect(o.cx*i-1.5,o.cz*s-1.5,3,3));for(let o of x.acampamentos||[])o.ativo&&(e.fillStyle=o.policia?"#3c5cff":"#ff9a2e",e.beginPath(),e.arc(o.x*i,o.z*s,3,0,6.29),e.fill());for(let o of x.unidades){if(!o.vivo||o.dentro)continue;e.fillStyle=o.estr?"#7ad1ff":o.policia?"#ffe14d":o.sel?"#7dff8a":"#3b8bff";let a=o.tipo==="portaavioes"?3.5:o.estr?2.5:2;e.fillRect(o.x*i-a/2,o.z*s-a/2,a,a)}let r=[[0,0],[innerWidth,0],[innerWidth,innerHeight],[0,innerHeight]].map(([o,a])=>this.cam.chao(o,a));r.every(o=>o)&&(e.strokeStyle="rgba(255,255,255,0.8)",e.lineWidth=1,e.beginPath(),r.forEach((o,a)=>(a?e.lineTo:e.moveTo).call(e,o.x*i,o.z*s)),e.closePath(),e.stroke())}desenharOverlay(t){var h;let e=innerWidth,i=innerHeight,s=((h=x.cfg.qualidade)!=null?h:1)===0?1:Math.min(1.5,devicePixelRatio||1);this.ov.width!==Math.round(e*s)&&(this.ov.width=Math.round(e*s),this.ov.height=Math.round(i*s));let r=this.ctx;r.setTransform(s,0,0,s,0,0),r.clearRect(0,0,e,i);let o=this.cam.cam,a=this.cam.dist>900;if(x.longe=a,a){for(let l of x.agentes){if(!l.vivo||l.dentro||l.estado==="morto")continue;let u=fn(l.x,0,l.z,o);!u||u.x<0||u.y<0||u.x>e||u.y>i||(r.fillStyle=l.zumbi?"#ff2a2a":"#ffffff",r.fillRect(u.x-1.5,u.y-1.5,3,3))}for(let l of x.unidades){if(!l.vivo||l.dentro||l.estr)continue;let u=fn(l.x,l.y,l.z,o);u&&(r.fillStyle=l.policia?"#ffe14d":l.sel?"#5dff6f":"#3d8bff",r.strokeStyle="#001b44",r.beginPath(),r.arc(u.x,u.y,l.classe==="inf"?3:5,0,6.29),r.fill(),r.stroke())}}r.textAlign="center",r.textBaseline="middle";for(let l of Ue){if(!(l.civis>0||l.guarnicao.length))continue;let u=fn(l.cx,l.h+4,l.cz,o);if(!u||u.x<-40||u.y<-40||u.x>e+40||u.y>i+40)continue;let f=u.y;if(l.civis>0){let d=l.sos?Math.sin(performance.now()/250)>0?"#ff3030":"#ffd23b":"#2e8bd8";r.fillStyle=d,ff(r,u.x-26,f-11,52,20,6),r.fill(),r.fillStyle="#fff",r.font="bold 12px sans-serif",r.fillText((l.sos?"SOS ":"\u{1F3E0} ")+l.civis,u.x,f),f-=24}if(l.guarnicao.length){r.fillStyle="rgba(20,70,20,0.85)",ff(r,u.x-24,f-10,48,18,5),r.fill(),r.fillStyle="#bfffbf",r.font="bold 11px sans-serif",r.fillText("\u{1FA96} "+l.guarnicao.length+"/"+l.cap,u.x,f-1);let d=l.integridade/l.integMax;r.fillStyle="#300",r.fillRect(u.x-22,f+6,44,3),r.fillStyle=d>.5?"#4f4":d>.2?"#fd3":"#f33",r.fillRect(u.x-22,f+6,44*d,3)}}for(let l of x.acampamentos||[]){if(!l.ativo)continue;let u=fn(l.x,6,l.z,o);if(!u||u.x<-40||u.y<-40||u.x>e+40||u.y>i+40)continue;let f=l.membros.filter(d=>d.armado).length;r.fillStyle=l.policia?"rgba(40,70,200,0.9)":"rgba(210,120,30,0.92)",ff(r,u.x-44,u.y-11,88,20,6),r.fill(),r.fillStyle="#fff",r.font="bold 11px sans-serif",r.fillText(`${l.policia?"\u{1F694}":"\u{1F3D5}\uFE0F"} ${l.membros.length} (${f}\u{1F52B})`,u.x,u.y)}for(let l of x.unidades){if(!l.vivo||l.dentro||!(l.sel||l.hp<l.hpMax*.98)||a&&!l.sel)continue;let u=l.classe==="inf"?2.3:l.estr?22:(l.d.raio||2)*.9+2,f=fn(l.x,l.y+u,l.z,o);if(!f)continue;let d=l.estr?60:l.classe==="inf"?18:34,p=Math.max(0,l.hp/l.hpMax);r.fillStyle="rgba(0,0,0,0.6)",r.fillRect(f.x-d/2-1,f.y-1,d+2,5),r.fillStyle=p>.6?"#46e05a":p>.3?"#f2d43a":"#ef3b3b",r.fillRect(f.x-d/2,f.y,d*p,3),l.sel&&l.classe==="inf"&&(r.strokeStyle="#5dff6f",r.lineWidth=1.5,r.beginPath(),r.arc(f.x,f.y+14,9,0,6.29),r.stroke()),l.d.carga&&l.passageiros.length&&(r.fillStyle="#fff",r.font="10px sans-serif",r.fillText(`${l.passageiros.length}\u{1F464}`,f.x,f.y-8))}for(let l=this.pings.length-1;l>=0;l--){let u=this.pings[l];if(u.t+=t,u.t>.8){this.pings.splice(l,1);continue}let f=fn(u.x,.5,u.z,o);if(!f)continue;let d={mover:"#5dff6f",atacar:"#ff4040",embarque:"#5bc0ff",guarnecer:"#ffd23b",resgate:"#ffd23b"}[u.tipo]||"#fff";r.strokeStyle=d,r.lineWidth=2.5,r.globalAlpha=1-u.t/.8,r.beginPath(),r.arc(f.x,f.y,6+u.t*30,0,6.29),r.stroke(),r.globalAlpha=1}let c=[];if(x.area&&c.push({...x.area,w:Math.max(40,Math.min(160,Math.hypot(x.area.x1-x.area.x0,x.area.z1-x.area.z0)*.35)),alfa:1}),x.areaMarcada){let l=(performance.now()-x.areaMarcada.t)/1e3;l<6?c.push({...x.areaMarcada,alfa:1-l/6}):x.areaMarcada=null}for(let l of c){let u=Math.hypot(l.x1-l.x0,l.z1-l.z0)||1,f=(l.x1-l.x0)/u,d=(l.z1-l.z0)/u,p=-d*l.w/2,v=f*l.w/2,m=[[l.x0+p,l.z0+v],[l.x1+p,l.z1+v],[l.x1-p,l.z1-v],[l.x0-p,l.z0-v]].map(([_,y])=>fn(_,.5,y,o));if(m.some(_=>!_))continue;r.globalAlpha=l.alfa,r.fillStyle="rgba(255,40,40,0.22)",r.strokeStyle="#ff3b3b",r.lineWidth=2.5,r.setLineDash([10,6]),r.beginPath(),m.forEach((_,y)=>(y?r.lineTo:r.moveTo).call(r,_.x,_.y)),r.closePath(),r.fill(),r.stroke(),r.setLineDash([]);let g=fn(l.x0,.5,l.z0,o),M=fn(l.x1,.5,l.z1,o);g&&M&&(r.beginPath(),r.moveTo(g.x,g.y),r.lineTo(M.x,M.y),r.stroke(),r.fillStyle="#ff3b3b",r.font="bold 13px sans-serif",r.fillText("\u{1F3AF} BOMBARDEIO",(g.x+M.x)/2,(g.y+M.y)/2-10)),r.globalAlpha=1}if(x.caixa){let l=x.caixa;r.strokeStyle="#5dff6f",r.lineWidth=1.5,r.fillStyle="rgba(93,255,111,0.12)",r.fillRect(Math.min(l.x0,l.x1),Math.min(l.y0,l.y1),Math.abs(l.x1-l.x0),Math.abs(l.y1-l.y0)),r.strokeRect(Math.min(l.x0,l.x1),Math.min(l.y0,l.y1),Math.abs(l.x1-l.x0),Math.abs(l.y1-l.y0))}}menuPausa(){x.pausado=!0,this.atualizarTopo();let t=this.modal(`<h2>Pausado</h2>
      <button class="bt grande" data-a="voltar">\u25B6 Continuar</button>
      <button class="bt" data-a="ajuda">\u2753 Como jogar</button>
      <label><input type="checkbox" data-a="som" ${x.cfg.som?"checked":""}> \u{1F50A} Som</label>
      <button class="bt" data-a="nova">\u{1F504} Nova partida</button>`);t.querySelector("[data-a=voltar]").onclick=()=>{t.remove(),x.pausado=!1,this.atualizarTopo()},t.querySelector("[data-a=ajuda]").onclick=()=>this.ajuda(),t.querySelector("[data-a=som]").onchange=e=>{x.cfg.som=e.target.checked,Lo(e.target.checked),x.salvarCfg()},t.querySelector("[data-a=nova]").onclick=()=>location.reload()}ajuda(){let t=this.modal(`<h2>Como jogar</h2><div class="ajuda">${C2}</div><button class="bt grande" data-a="ok">Entendi</button>`);t.querySelector("[data-a=ok]").onclick=()=>t.remove()}modal(t){let e=us("div","modal",`<div class="caixa">${t}</div>`);return e.addEventListener("pointerdown",i=>i.stopPropagation()),document.body.appendChild(e),e}fim(t,e){let i=Math.floor(x.tempo/60),s=this.modal(`<h2>${t?"\u{1F3C6} Vit\xF3ria!":"\u2620\uFE0F Derrota"}</h2><p>${e}</p>
      <div class="stats">\u2705 Civis resgatados: <b>${x.resgatados}</b><br>\u{1F9DF} Zumbis eliminados: <b>${x.zumbisMortos}</b><br>
      \u2623\uFE0F Pessoas infectadas: <b>${x.infectados}</b><br>\u{1F480} Civis mortos: <b>${x.civisMortos}</b><br>\u{1FA96} Unidades perdidas: <b>${x.perdas}</b><br>\u23F1\uFE0F Tempo: <b>${i} min</b> (dia ${x.dia})</div>
      ${t?'<button class="bt grande" data-a="cont">Continuar jogando</button>':""}
      <button class="bt grande" data-a="nova">\u{1F504} Nova partida</button>`),r=s.querySelector("[data-a=cont]");r&&(r.onclick=()=>{s.remove(),x.pausado=!1,x.meta=99999,this.atualizarTopo()}),s.querySelector("[data-a=nova]").onclick=()=>location.reload()}quadro(t){this._t=(this._t||0)+t,this._tm=(this._tm||0)+t,this._t>.25&&(this._t=0,this._presos=Ue.reduce((e,i)=>e+(i.base?0:i.civis),0),this.atualizarTopo(),x.selecao.length&&this.atualizarSelecaoLeve()),this._tm>.5&&(this._tm=0,this.desenharMini()),this.desenharOverlay(t)}atualizarSelecaoLeve(){this._ts=(this._ts||0)+1,this._ts%4===0&&this.atualizarSelecao()}};function ff(n,t,e,i,s,r){n.beginPath(),n.moveTo(t+r,e),n.arcTo(t+i,e,t+i,e+s,r),n.arcTo(t+i,e+s,t,e+s,r),n.arcTo(t,e+s,t,e,r),n.arcTo(t,e,t+i,e,r),n.closePath()}var C2=`
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
<p><b>Dicas:</b> tiros e explos\xF5es fazem barulho e atraem zumbis. \xC0 noite eles ficam mais r\xE1pidos. A partir do dia 2 chegam hordas do continente e aparecem zumbis corredores; no dia 3, brutamontes. Cuidado com o fogo amigo de artilharia perto de civis.</p>`;var ci=n=>document.querySelector(n),Vc=n=>{let t=ci("#carregando-txt");t&&(t.textContent=n)};function P2(){try{Object.assign(x.cfg,JSON.parse(localStorage.getItem("miami-cfg")||"{}"))}catch{}if(x.cfg.qualidade===void 0){let n=/Android|iPhone|iPad|Mobile|MiamiZumbiAPK/i.test(navigator.userAgent)||navigator.deviceMemory&&navigator.deviceMemory<=4;x.cfg.qualidade=n?0:1}}x.salvarCfg=()=>{try{localStorage.setItem("miami-cfg",JSON.stringify(x.cfg))}catch{}};var df=new Ht(11128808),I2=new Ht(15774330),z2=new Ht(858160),L2=[.78,.86,.66];async function U2(){var P;P2(),Vc("Preparando o mapa de Miami..."),await new Promise(L=>setTimeout(L,30));let n=(P=x.cfg.qualidade)!=null?P:1;du(n);let t=new Na({antialias:n>=2,powerPreference:"high-performance",stencil:!1}),e=n===0?Math.min(1,devicePixelRatio)*.7:Math.min(n===1?1.25:2,devicePixelRatio),i=1;t.setPixelRatio(e),t.setSize(innerWidth,innerHeight),t.outputColorSpace=Ie,t.toneMapping=eu,t.toneMappingExposure=1.05,t.shadowMap.enabled=n>=1,t.shadowMap.autoUpdate=!1,t.shadowMap.type=tu,ci("#jogo").appendChild(t.domElement);let s=new Mr;s.background=df.clone(),s.fog=new Ba(df.clone(),2500,11e3);let r=new pn(50,innerWidth/innerHeight,1,15e3);x.cena=s,x.camera=r,x.renderer=t;let o=new Ka(13624319,6116422,1.1);s.add(o);let a=new Qa(16773336,3.2);a.position.set(-.5,1,.35),a.castShadow=n>=1,a.shadow.mapSize.set(n>=2?2048:1024,n>=2?2048:1024),a.shadow.bias=-4e-4,a.shadow.normalBias=.6,a.shadow.camera.near=10,a.shadow.camera.far=6e3,s.add(a),s.add(a.target),x.sol=a,Vc("Lendo pr\xE9dios e ruas (dados de sat\xE9lite)..."),await new Promise(L=>setTimeout(L,20)),fp(),Vc("Construindo a cidade em 3D..."),await new Promise(L=>setTimeout(L,20)),dp(),S0(t,s),x.bonecos=new gc(s),x.efeitos=new yc(s),x.hashA=new bo(16,Oe,ke,4096),x.hashU=new bo(24,Oe,ke,1024);let c=new Fc(r);x.cam=c;let h=Ce[(be.focos||[])[0]]||Ce.base;c.irPara(h.x,h.z,1400),c.yaw=.6,ip(t.domElement,c);let l=new Hc(c);l.ajustarCidade(),Lo(x.cfg.som!==!1),addEventListener("resize",()=>{t.setSize(innerWidth,innerHeight),r.aspect=innerWidth/innerHeight,r.updateProjectionMatrix()}),window.androidBack=()=>{let L=document.querySelector(".modal");if(!(L&&!ci("#menu").classList.contains("oculto"))){if(L){L.remove(),x.pausado=!1;return}if(x.controlando){l.controlar(null);return}l.menuPausa()}};let u=new ws,f=new se,d=new N,p=performance.now(),v=n===0?450:n===1?700:900;function m(L,U){if(x.longe)return!1;d.set(L,1,U);let D=L-r.position.x,W=U-r.position.z;return D*D+W*W>v*v?!1:u.containsPoint(d)}function g(L){x.orcamentoCaminhos=n===0?1:2,x.limiteCaminho=n===0?12e3:3e4,x.hashA.limpar();for(let U of x.agentes)U.vivo&&!U.dentro&&U.estado!=="morto"&&x.hashA.add(U);x.hashU.limpar();for(let U of x.unidades)U.vivo&&!U.dentro&&x.hashU.add(U);vp(L),Z0(L),G0(L),$0(L)}function M(L){var tt;let U=(tt=x.hora)!=null?tt:8,D;U>=6.5&&U<=18?D=1:U>18&&U<20?D=1-(U-18)/2*.72:U>5&&U<6.5?D=.28+(U-5)/1.5*.72:D=.28;let W=U>17&&U<20?1-Math.abs(U-18.7)/1.5:U>5&&U<7.5?1-Math.abs(U-6.2)/1.3:0,H=s.background;H.copy(z2).lerp(df,(D-.28)/.72),W>0&&H.lerp(I2,Math.max(0,W)*.55),s.fog.color.copy(H),a.intensity=3.2*Math.max(.12,D-.1)+(D<.5?.25:0),o.intensity=.35+.8*D;let Q=(U-6)/12*Math.PI,V=U>=6&&U<=18.5,Z=V?.35+.65*Math.max(0,Math.sin(Q)):.9;x.dirSol={x:V?-Math.cos(Q)*.9:.4,y:Z,z:.45},a.color.setHex(W>.3?16758900:D<.5?9414399:16773336),x.agua.userData.tempo.value+=L;let j=Math.max(0,Math.min(1,(.85-D)/.5));for(let ut in Ni)Ni[ut].emissiveIntensity=j*.9}let _=16,y=0,R=0;function w(L){if(requestAnimationFrame(w),n===0&&L-p<30)return;let U=L-p,D=Math.min(.05,U/1e3);if(p=L,R++,_=_*.95+Math.min(200,U)*.05,x.iniciado&&++y>90){y=0;let F=n===0?40:24,st=i;_>F*1.25&&i>.55?st=i-.1:_<F*.75&&i<1&&(st=Math.min(1,i+.1)),st!==i&&(i=st,t.setPixelRatio(e*i))}let W=n>=1&&c.dist<(n>=2?1400:800);t.shadowMap.needsUpdate=W&&R%2===0,x.teclado&&x.teclado(D);let H=x.joyUI||(x.joyTeclado?{x:x.joyTeclado.x,y:x.joyTeclado.z}:null);if(H){let F=Math.sin(c.yaw),st=Math.cos(c.yaw);x.joy={x:st*H.x+F*H.y,z:-F*H.x+st*H.y}}else x.joy=null;let Q=performance.now();if(!x.pausado&&x.iniciado)for(let F=0;F<x.velocidade;F++)g(D);let V=performance.now();if(x.perfSim=(x.perfSim||0)*.95+(V-Q)*.05,c.aplicar(D),x.dirSol){let F=Math.min(2200,Math.max(70,c.dist*1.25)),st=a.shadow.camera;Math.abs(st.right-F)>F*.1&&(st.left=-F,st.right=F,st.top=F,st.bottom=-F,st.updateProjectionMatrix());let nt=2*F/a.shadow.mapSize.x,vt=Math.round(c.alvo.x/nt)*nt,At=Math.round(c.alvo.z/nt)*nt,_t=x.dirSol,Gt=Math.hypot(_t.x,_t.y,_t.z);a.target.position.set(vt,0,At),a.position.set(vt+_t.x/Gt*3e3,_t.y/Gt*3e3,At+_t.z/Gt*3e3)}let Z=n===0?[700,1.6,2600,3.6]:n===1?[1200,2,5e3,5]:[1500,2.2,9e3,6];s.fog.near=Math.max(Z[0],c.dist*Z[1]),s.fog.far=Math.max(Z[2],c.dist*Z[3]),r.far!==s.fog.far+300&&(r.far=s.fog.far+300,r.updateProjectionMatrix()),x.decor&&Su(x.decor,c.alvo,c.dist),x.malhasPredios&&Eu(x.malhasPredios,c.alvo,c.dist,s.fog.far+c.dist*.5),M(x.pausado?0:D),f.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),u.setFromProjectionMatrix(f);let j=x.bonecos;if(j.comecar(),c.dist<(n===0?500:900)){for(let F of x.unidades){if(F.classe!=="inf"||!F.vivo||F.dentro||!m(F.x,F.z))continue;let st=F.mirando>0&&F.velAtual<.5?2:0,nt=Math.min(1,F.velAtual/3);F.policia?j.add(F.x,F.y,F.z,F.ang,F.fase,st,vc,_c,Ro,2,1,null,nt):j.add(F.x,F.y,F.z,F.ang,F.fase,st,F.tipo==="sniper"?L2:Ao,xc,Ro,1,1,null,nt)}W0(j,m)}x.longe=c.dist>=900,j.terminar(),x.efeitos.atualizar(x.pausado?0:D*x.velocidade,innerHeight*.9);let tt=0;for(let F of x.unidades)if(F.classe==="aereo"&&F.vivo&&!F.dentro&&!(F.pousado&&F.parado>3)){let st=Math.hypot(F.x-c.alvo.x,F.z-c.alvo.z)+c.dist*.5;tt=Math.max(tt,1-st/700)}O0(x.pausado?0:Math.max(0,tt));let ut=0,Et=0,Y=0;for(let F of x.unidades){if(!F.vivo||F.dentro)continue;let st=Math.hypot(F.x-c.alvo.x,F.z-c.alvo.z)+c.dist*.5;if(F.classe==="jato"&&F.estadoJato!=="pronto"&&F.estadoJato!=="rearmando")ut=Math.max(ut,(1-st/2600)*(F.estadoJato==="pousando"?.5:1));else if(F.classe==="veic"){let nt=(1-st/350)*(F.d.raio>=3.4?1:.55);nt>Et&&(Et=nt,Y=Math.min(1,F.velAtual/F.d.vel))}}k0(x.pausado?0:Math.max(0,ut)),H0(x.pausado?0:Math.max(0,Et),Y),t.render(s,r),x.iniciado&&l.quadro(D)}requestAnimationFrame(w),ci("#carregando").classList.add("oculto");let A=ci("#menu");A.classList.remove("oculto");let I="normal";A.querySelectorAll("[data-dif]").forEach(L=>L.addEventListener("click",()=>{I=L.dataset.dif,A.querySelectorAll("[data-dif]").forEach(U=>U.classList.toggle("ativo",U===L))}));let S=ci("#m-som"),b=ci("#m-qual");S.checked=x.cfg.som!==!1,b.value=String(n),S.onchange=()=>{x.cfg.som=S.checked,Lo(S.checked),x.salvarCfg()},b.onchange=()=>{x.cfg.qualidade=+b.value,x.salvarCfg(),ci("#m-qual-aviso").textContent="A qualidade muda ao abrir o jogo de novo."},ci("#m-ajuda").onclick=()=>l.ajuda(),A.querySelectorAll("[data-cidade]").forEach(L=>{L.classList.toggle("ativo",L.dataset.cidade===(be.cidade||"miami")),L.addEventListener("click",()=>{if(L.dataset.cidade!==(be.cidade||"miami")){try{localStorage.setItem("miami-cidade",L.dataset.cidade)}catch{}location.href=location.pathname+"?cidade="+L.dataset.cidade}})}),ci("#m-jogar").onclick=()=>{Fi(),A.classList.add("oculto"),pp(I),x.iniciado=!0,c.irPara(x.estr.qg.x,x.estr.qg.z,420),c.yaw=x.baseEixo.ang+Math.PI,l.atualizarTopo(),l.alerta(`\u{1F4FB} ${Ce.base.nome} operante. Relatos de ataques estranhos em ${be.nome}...`,x.estr.qg.x,x.estr.qg.z,"info"),l.alerta("Dica: toque em \u2753 no menu \u2699\uFE0F para ver os controles",null,null,"info")},/[?&]auto/.test(location.search)&&ci("#m-jogar").click(),window.G=x,window.__dbg={ordenar:vi,ordenarMover:_i,desembarcar:ki,enfileirar:kc,simular:g,predios:Ue,NAV:Wu,MAPA:wu,tela:(L,U,D)=>fn(L,U,D,r)}}U2().catch(n=>{console.error(n),Vc("Erro ao iniciar: "+n.message)});})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
