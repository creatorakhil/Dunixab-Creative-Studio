/* ===== Premium Three.js 3D background ===== */
function initBG3D(opts){
  opts=opts||{};
  const mode=opts.mode||'crystal';
  const hero=opts.hero||false; // adds a large central refractive object
  const canvas=document.createElement('canvas');
  canvas.className='bg3d';
  document.body.appendChild(canvas);

  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.15;

  const scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2(0x08080c,0.055);
  const camera=new THREE.PerspectiveCamera(52,innerWidth/innerHeight,0.1,100);
  camera.position.set(0,0,9);

  // Procedural environment map for reflections (gradient cube)
  const pmrem=new THREE.PMREMGenerator(renderer);
  const envScene=new THREE.Scene();
  const c1=new THREE.Color(0x1a1530),c2=new THREE.Color(0x3a2d12),c3=new THREE.Color(0x06221f);
  const envGeo=new THREE.SphereGeometry(50,32,32);
  const envMat=new THREE.ShaderMaterial({side:THREE.BackSide,uniforms:{a:{value:c1},b:{value:c2},c:{value:c3}},
    vertexShader:`varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader:`varying vec3 vP;uniform vec3 a,b,c;void main(){float h=normalize(vP).y*0.5+0.5;vec3 col=mix(a,b,smoothstep(0.0,0.6,h));col=mix(col,c,smoothstep(0.5,1.0,h));gl_FragColor=vec4(col,1.0);}`});
  envScene.add(new THREE.Mesh(envGeo,envMat));
  const envRT=pmrem.fromScene(envScene);
  scene.environment=envRT.texture;

  const amb=new THREE.AmbientLight(0xffffff,0.25);scene.add(amb);
  const key=new THREE.PointLight(0xf0d9a8,2.4,50);key.position.set(7,6,9);scene.add(key);
  const fill=new THREE.PointLight(0x8b6dff,1.8,50);fill.position.set(-8,-4,6);scene.add(fill);
  const rim=new THREE.PointLight(0x46e0cd,1.3,50);rim.position.set(0,8,-7);scene.add(rim);

  const group=new THREE.Group();scene.add(group);
  const objs=[];

  function makeCrystals(){
    const geoms=[new THREE.IcosahedronGeometry(1,0),new THREE.OctahedronGeometry(1,0),new THREE.TetrahedronGeometry(1,0),new THREE.TorusGeometry(0.8,0.26,16,40),new THREE.DodecahedronGeometry(1,0),new THREE.ConeGeometry(0.8,1.6,4)];
    const cols=[0xd8b06a,0x8b6dff,0x46e0cd,0xff7567,0xf0d9a8];
    for(let i=0;i<13;i++){
      const g=geoms[i%geoms.length];
      const metallic=Math.random()>0.45;
      const mat=metallic
        ? new THREE.MeshStandardMaterial({color:cols[i%cols.length],metalness:1.0,roughness:.12,flatShading:true,envMapIntensity:1.3})
        : new THREE.MeshPhysicalMaterial({color:cols[i%cols.length],metalness:0,roughness:0,transmission:.95,thickness:1.4,ior:1.5,clearcoat:1,envMapIntensity:1.5,transparent:true});
      const m=new THREE.Mesh(g,mat);
      const r=4.5+Math.random()*7;const a=Math.random()*Math.PI*2,b=Math.random()*Math.PI*2;
      m.position.set(Math.cos(a)*r,Math.sin(b)*r*0.62,(Math.random()-0.5)*8-2);
      m.scale.setScalar(0.45+Math.random()*1.15);
      m.userData={rs:(Math.random()-0.5)*0.009,rs2:(Math.random()-0.5)*0.009,fl:Math.random()*Math.PI*2,fa:0.4+Math.random()*0.6};
      group.add(m);objs.push(m);
    }
    for(let i=0;i<5;i++){
      const g=new THREE.IcosahedronGeometry(0.6+Math.random()*0.7,1);
      const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:0xf6f3ec,wireframe:true,transparent:true,opacity:.1}));
      m.position.set((Math.random()-0.5)*15,(Math.random()-0.5)*10,(Math.random()-0.5)*6-2);
      m.userData={rs:(Math.random()-0.5)*0.012,rs2:(Math.random()-0.5)*0.012,fl:Math.random()*6,fa:0.5};
      group.add(m);objs.push(m);
    }
  }

  function makeHero(){
    const g=new THREE.IcosahedronGeometry(2.1,0);
    const m=new THREE.MeshPhysicalMaterial({color:0xf0d9a8,metalness:.1,roughness:0,transmission:1,thickness:2.2,ior:1.6,clearcoat:1,clearcoatRoughness:0,envMapIntensity:2,transparent:true,iridescence:1,iridescenceIOR:1.6});
    const mesh=new THREE.Mesh(g,m);mesh.position.set(0,0,1);mesh.userData={isHero:true};
    scene.add(mesh);objs.push(mesh);
    const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(2.5,1),new THREE.MeshBasicMaterial({color:0xd8b06a,wireframe:true,transparent:true,opacity:.12}));
    wire.position.copy(mesh.position);wire.userData={isHeroWire:true};scene.add(wire);objs.push(wire);
  }

  function makeParticles(){
    const N=1000,pos=new Float32Array(N*3);
    for(let i=0;i<N;i++){const r=Math.random()*17;const t=Math.random()*Math.PI*2;const p=Math.acos(2*Math.random()-1);
      pos[i*3]=r*Math.sin(p)*Math.cos(t);pos[i*3+1]=r*Math.sin(p)*Math.sin(t)*0.7;pos[i*3+2]=r*Math.cos(p)-3;}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));
    const m=new THREE.PointsMaterial({color:0xd8b06a,size:0.045,transparent:true,opacity:.6,depthWrite:false,blending:THREE.AdditiveBlending});
    const pts=new THREE.Points(g,m);scene.add(pts);objs.push(pts);pts.userData={spin:true};
  }

  if(hero)makeHero();
  if(mode==='field'){makeParticles();makeCrystals();}else{makeCrystals();makeParticles();}

  let tx=0,ty=0,cx=0,cy=0;
  window.addEventListener('mousemove',e=>{tx=(e.clientX/innerWidth-0.5);ty=(e.clientY/innerHeight-0.5);});
  let scrollY=0;window.addEventListener('scroll',()=>{scrollY=window.scrollY;});

  const clock=new THREE.Clock();
  function animate(){
    const t=clock.getElapsedTime();
    cx+=(tx-cx)*0.045;cy+=(ty-cy)*0.045;
    group.rotation.y=t*0.035+cx*0.6;
    group.rotation.x=cy*0.4;
    group.position.y=scrollY*0.0012;
    objs.forEach(o=>{
      if(o.userData.spin){o.rotation.y=t*0.025;o.rotation.x=t*0.01;return;}
      if(o.userData.isHero){o.rotation.y=t*0.18+cx*1.2;o.rotation.x=t*0.1-cy*0.8;o.position.y=-scrollY*0.004+Math.sin(t*0.6)*0.15;return;}
      if(o.userData.isHeroWire){o.rotation.y=-t*0.12;o.rotation.z=t*0.06;o.position.y=-scrollY*0.004+Math.sin(t*0.6)*0.15;return;}
      if(o.userData.rs!==undefined){o.rotation.x+=o.userData.rs;o.rotation.y+=o.userData.rs2;o.position.y+=Math.sin(t*o.userData.fa+o.userData.fl)*0.004;}
    });
    camera.position.x+=(cx*1.5-camera.position.x)*0.04;
    camera.position.y+=(-cy*1.2-camera.position.y)*0.04;
    camera.lookAt(0,0,0);
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
}
