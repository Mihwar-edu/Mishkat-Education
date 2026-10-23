/* ألوان المنصة: غيّرها من هنا فقط */
var MK={C1:'#0a7ba0',C2:'#0f9bbd',C3:'#0b8cae',GOLD1:'#ffc233',GOLD2:'#ff9f1c',GOLDINK:'#4a3000',GLOW:'rgba(6,120,150,.38)',DEEP:'#086a8c'};

/* ===== 0) توجيه الصفحات حسب الشعبة (ووضع الأستاذ) ===== */
(function(){
  var br=localStorage.getItem('mishkat_branch')||'';
  var tp=new URLSearchParams(location.search).get('t');
  if(tp!=='math'&&tp!=='phys') tp=null;

  var subEl=document.querySelector('.wrap > .sub');
  if(tp&&document.querySelector('.b[data-b]')&&subEl){
    subEl.textContent='اختر شعبتك لمتابعة دروس '+(tp==='math'?'الرياضيات':'الفيزياء');
  }
  document.querySelectorAll('.b[data-b]').forEach(function(el){
    el.onclick=function(){
      var b=el.dataset.b;
      localStorage.setItem('mishkat_branch',b);
      localStorage.removeItem('mishkat_chapter');
      if(!tp){location.href='subjects.html';return;}
      var s;
      if(tp==='math'){s='الرياضيات';}
      else{s=(b==='تسيير واقتصاد')?'الاقتصاد':'الفيزياء';}
      localStorage.setItem('mishkat_subject',s);
      if(s==='الرياضيات'&&b!=='تسيير واقتصاد'){location.href='math.html';}
      else if(s==='الفيزياء'){location.href='physics.html';}
      else{location.href='section.html';}
    };
  });

  var phys=document.querySelector('.b[data-s="الفيزياء"]');
  if(phys&&br==='تسيير واقتصاد'){
    phys.dataset.s='الاقتصاد';
    phys.innerHTML='<span>📊</span>الاقتصاد';
  }

  if(phys&&(br==='علوم تجريبية'||br==='رياضيات')&&!document.querySelector('.b[data-s="العلوم"]')){
    var sc=document.createElement('button');
    sc.type='button';
    sc.className='b';
    sc.setAttribute('data-s','العلوم');
    sc.innerHTML='<span>🧬</span>العلوم';
    phys.after(sc);
  }

  var gridEl=document.querySelector('.wrap > .grid');
  if(phys&&gridEl&&!document.querySelector('.b[data-s="العلوم الإسلامية"]')){
    var bsList=[].slice.call(gridEl.children).filter(function(c){return c.classList.contains('b');});
    var isl=document.createElement('button');
    isl.type='button';
    isl.className='b';
    isl.setAttribute('data-s','العلوم الإسلامية');
    isl.innerHTML='<span>🕌</span>العلوم الإسلامية';
    bsList[bsList.length-1].after(isl);
    if((bsList.length+1)%2===1){
      isl.classList.add('solo');
      var sst=document.createElement('style');
      sst.textContent='@media (max-width:899px){.grid > .b.solo{grid-column:1/-1;justify-self:center;width:calc(50% - 8px)}}';
      document.head.appendChild(sst);
    }
  }

  document.querySelectorAll('[data-s]').forEach(function(el){
    el.onclick=function(){
      var s=el.dataset.s;
      localStorage.setItem('mishkat_subject',s);
      localStorage.removeItem('mishkat_chapter');
      if(s==='الفيزياء'){location.href='physics.html';}
      else if(s==='العلوم'){location.href='science.html';}
      else if(s==='العلوم الإسلامية'){location.href='islamic.html';}
      else if(s==='الرياضيات'&&br!=='تسيير واقتصاد'){location.href='math.html';}
      else{location.href='section.html';}
    };
  });
})();

/* ===== 1) حواف بنفسجية لامعة تضيء للبطاقات ===== */
(function(){
  var st=document.createElement('style');
  st.textContent=''
  +'.b,.eng{border-color:#b266ff!important;animation:vglow 2.8s ease-in-out infinite}'
  +'@keyframes vglow{0%,100%{box-shadow:0 0 6px 0 rgba(168,85,247,.45),0 0 16px 1px rgba(168,85,247,.28),0 10px 30px rgba(10,132,255,.10)}50%{box-shadow:0 0 10px 1px rgba(192,110,255,.9),0 0 26px 4px rgba(168,85,247,.55),0 10px 30px rgba(10,132,255,.10)}}'
  +'.b:nth-child(2n){animation-delay:-1s}.b:nth-child(3n){animation-delay:-1.9s}'
  +'.b:hover,.b:focus-visible,.eng:hover{border-color:#d9a0ff!important;animation-duration:1.5s}'
  +'@media (prefers-reduced-motion:reduce){.b,.eng{animation:none;box-shadow:0 0 12px 2px rgba(168,85,247,.6)}}';
  document.head.appendChild(st);
})();

/* ===== 1b) إطار العنوان الاسطواني (ثابت) ===== */
(function(){
  var w=document.querySelector('.wrap');
  if(!w||w.querySelector('.tpill'))return;
  var kids=[].slice.call(w.children);
  var logo=kids.filter(function(c){return c.classList.contains('logo');})[0];
  var h=kids.filter(function(c){return c.tagName==='H1';})[0];
  var sub=kids.filter(function(c){return c.classList.contains('sub');})[0];
  if(!h)return;

  var css=''
  +'.tpill{position:relative;overflow:hidden;display:block;margin:0 auto;max-width:560px;padding:20px 28px 18px;border-radius:46px;background:var(--card);border:3px solid #ff9f1c;box-shadow:0 14px 34px rgba(255,159,28,.28),inset 0 5px 10px rgba(255,255,255,.35),inset 0 -7px 14px rgba(255,159,28,.16)}'
  +'.tpill>*{position:relative;z-index:1}'
  +'.tpill .logo{margin-bottom:4px}.tpill h1{margin-bottom:4px}.tpill .sub{margin-bottom:0}'
  +'@media (min-width:900px){.tpill{max-width:680px;padding:28px 40px 24px}}';
  var st=document.createElement('style');
  st.textContent=css;
  document.head.appendChild(st);

  var pill=document.createElement('div');
  pill.className='tpill';
  w.insertBefore(pill,logo||h);
  [logo,h,sub].forEach(function(el){if(el)pill.appendChild(el);});
})();

/* ===== 1c) شعار المنصة كخلفية باهتة + أيقونة التبويب ===== */
(function(){
  var st=document.createElement('style');
  st.textContent=''
  +'body::before{content:"";position:fixed;top:50%;left:50%;width:min(86vmin,560px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:url(logo.jpg) center/cover no-repeat;opacity:.08;z-index:-1;pointer-events:none}'
  +':root[data-theme="dark"] body::before{opacity:.06}';
  document.head.appendChild(st);

  if(!document.querySelector('link[rel~="icon"]')){
    var l=document.createElement('link');
    l.rel='icon';
    l.href='logo.jpg';
    document.head.appendChild(l);
  }
})();

/* ===== 2) الأيقونات الاحترافية ===== */
(function(){
  var css=''
  +'.pi{display:inline-grid;place-items:center;width:62px;height:62px;border-radius:19px;background:linear-gradient(145deg,#4cc3ff,#0a84ff 55%,#1d57d6);box-shadow:0 12px 24px rgba(10,132,255,.38),inset 0 1px 0 rgba(255,255,255,.4);transition:transform .25s}'
  +'.pi svg{width:36px;height:36px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}'
  +'.has-pi{height:auto!important;line-height:1!important;margin-bottom:14px!important}'
  +'.b:hover .pi,.b:focus-visible .pi{transform:translateY(-3px) scale(1.07)}'
  +'@media (min-width:900px){.pi{width:72px;height:72px;border-radius:22px}.pi svg{width:42px;height:42px}}';
  var st=document.createElement('style');
  st.textContent=css;
  document.head.appendChild(st);

  var V='<svg viewBox="0 0 32 32" aria-hidden="true">';
  var ICONS={
    dna:V+'<path d="M10 3C10 10 22 10 22 16C22 22 10 22 10 29"/><path d="M22 3C22 10 10 10 10 16C10 22 22 22 22 29"/><path stroke-width="1.6" opacity=".85" d="M12 7H20M12 12.4H20M12 19.6H20M12 24.9H20"/></svg>',
    calc:V+'<rect x="7" y="3" width="18" height="26" rx="3.5"/><rect x="10" y="6.5" width="12" height="5" rx="1.2" fill="#fff" stroke="none"/><g fill="#fff" stroke="none"><circle cx="11" cy="16.5" r="1.4"/><circle cx="16" cy="16.5" r="1.4"/><circle cx="21" cy="16.5" r="1.4"/><circle cx="11" cy="21" r="1.4"/><circle cx="16" cy="21" r="1.4"/><circle cx="21" cy="21" r="1.4"/><circle cx="11" cy="25.2" r="1.4"/><circle cx="16" cy="25.2" r="1.4"/><circle cx="21" cy="25.2" r="1.4"/></g></svg>',
    gear:V+'<circle cx="16" cy="16" r="8" stroke-width="2.2"/><circle cx="16" cy="16" r="3" stroke-width="2"/><path stroke-width="3.2" d="M16 3.5V6.7M16 25.3V28.5M3.5 16H6.7M25.3 16H28.5M7.2 7.2L9.5 9.5M22.5 22.5L24.8 24.8M24.8 7.2L22.5 9.5M9.5 22.5L7.2 24.8"/></svg>',
    chart:V+'<g fill="#fff" stroke="none"><rect x="5" y="21" width="5" height="7" rx="1.2"/><rect x="13.5" y="17" width="5" height="11" rx="1.2"/><rect x="22" y="13" width="5" height="15" rx="1.2"/></g><path d="M5 15L12 10.5L17 12.5L26 4.5"/><path d="M21 4.5H26V9.5"/></svg>',
    pi:V+'<path stroke-width="2.4" d="M7 9.5H25M12.5 9.5C12.5 14.5 12 18.5 10 22.5M19.5 9.5V21C19.5 23 20.3 24 22.3 24"/></svg>',
    atom:V+'<circle cx="16" cy="16" r="2.6" fill="#fff" stroke="none"/><g stroke-width="1.8"><ellipse cx="16" cy="16" rx="13" ry="5.2"/><ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(120 16 16)"/></g></svg>',
    hat:V+'<path d="M6 21A10 10 0 0 1 26 21"/><path stroke-width="1.8" d="M16 11V21M11 12.5V21M21 12.5V21"/><rect x="4" y="21" width="24" height="4.5" rx="2.2" fill="#fff" stroke="none"/></svg>',
    book:V+'<path d="M16 7C13 5 9 4.5 5 5V24C9 23.5 13 24 16 26"/><path d="M16 7C19 5 23 4.5 27 5V24C23 23.5 19 24 16 26"/><path d="M16 7V26"/></svg>',
    quran:V+'<g transform="translate(9 0) scale(.55)" stroke-width="3.6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></g><path d="M16 15C13 13 9 12.5 5 13V26C9 25.5 13 26 16 28"/><path d="M16 15C19 13 23 12.5 27 13V26C23 25.5 19 26 16 28"/><path d="M16 15V28"/></svg>',
    pencil:V+'<path d="M5.5 26.5L7.5 20L22 5.5L26.5 10L12 24.5Z"/><path stroke-width="1.8" d="M18.5 9L23 13.5M7.5 20L12 24.5"/></svg>',
    check:V+'<circle cx="16" cy="16" r="11.5"/><path stroke-width="2.4" d="M10.5 16.5L14.5 20.5L21.5 12"/></svg>',
    scale:V+'<path d="M16 5V26M10 26H22M6 10H26"/><path stroke-width="1.8" d="M8 10L5 18M8 10L11 18M24 10L21 18M24 10L27 18"/><path stroke-width="1.8" d="M4 18A4 4 0 0 0 12 18ZM20 18A4 4 0 0 0 28 18Z"/><circle cx="16" cy="5" r="1.4" fill="#fff" stroke="none"/></svg>'
  };
  function swap(sel,key){
    document.querySelectorAll(sel).forEach(function(s){
      s.innerHTML='<i class="pi" style="font-style:normal">'+ICONS[key]+'</i>';
      s.classList.add('has-pi');
    });
  }
  swap('.b[data-b="علوم تجريبية"] > span','dna');
  swap('.b[data-b="رياضيات"] > span','calc');
  swap('.b[data-b="تقني رياضي"] > span','gear');
  swap('.b[data-b="تسيير واقتصاد"] > span','chart');
  swap('.b[data-s="الرياضيات"] > span','pi');
  swap('.b[data-s="الفيزياء"] > span','atom');
  swap('.b[data-s="العلوم"] > span','dna');
  swap('.b[data-s="العلوم الإسلامية"] > span','quran');
  swap('.b[data-s="الاقتصاد"] > span','chart');
  swap('.eng .ic','hat');
  swap('.b[data-t="sum"] > span','book');
  swap('.b[data-t="ex"] > span','pencil');
  swap('.b[data-t="cor"] > span','check');
  swap('.b[data-t="ser"] > span','scale');
})();

/* ===== 3) فتح صفحة الدرس عند الضغط على أي درس ===== */
(function(){
  document.querySelectorAll('.b[data-c]').forEach(function(el){
    el.onclick=function(){
      localStorage.setItem('mishkat_chapter',el.dataset.c);
      location.href='lesson.html';
    };
  });
})();

/* ===== 3b) «الملخصات» تفتح صفحة الملخصات (ما عدا مادة الاقتصاد) ===== */
(function(){
  var sj=localStorage.getItem('mishkat_subject')||'';
  if(sj==='الاقتصاد')return;
  var el=document.querySelector('.b[data-t="sum"]');
  if(el){
    el.onclick=function(){location.href='summaries.html';};
  }
})();

/* ===== 4) بطاقة الفيديوهات الصغيرة (صفحات الدرس والأقسام) ===== */
(function(){
  var grid=document.querySelector('.wrap > .grid');
  if(!grid||!grid.querySelector('.b[data-t]')||document.getElementById('vid-card'))return;

  var css=''
  +'.vc{direction:rtl;text-align:center;max-width:300px;margin:20px auto 0;padding:16px 16px 18px;border-radius:18px;color:#fff;position:relative;overflow:hidden;background:linear-gradient(135deg,'+MK.C1+','+MK.C2+');box-shadow:0 12px 28px '+MK.GLOW+';transition:transform .25s}'
  +'.vc:hover{transform:translateY(-3px)}'
  +'.vc::before{content:"";position:absolute;left:-40px;bottom:-60px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.12)}'
  +'.vc>*{position:relative}'
  +'.vc-tag{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,'+MK.GOLD1+','+MK.GOLD2+');color:'+MK.GOLDINK+';padding:5px 14px;border-radius:999px;font-weight:800;font-size:13.5px;box-shadow:0 6px 14px rgba(255,159,28,.4)}'
  +'.vc-num{font-size:36px;font-weight:800;line-height:1.1;margin:8px 0 0;text-shadow:0 2px 4px rgba(0,60,80,.2)}'
  +'.vc-num small{font-size:14px;font-weight:700;opacity:.9;margin-right:6px}'
  +'.vc-stars{color:'+MK.GOLD1+';font-size:17px;letter-spacing:3px;direction:ltr;margin:2px 0 4px;text-shadow:0 2px 6px rgba(0,60,80,.25)}'
  +'.vc p{color:#fff;font-size:13px;line-height:1.6;margin:0 0 12px;font-weight:500;text-shadow:0 1px 2px rgba(0,60,80,.25)}'
  +'.vc-go{display:inline-block;width:auto;margin:0;padding:8px 20px;border:0;border-radius:999px;background:#fff;color:'+MK.DEEP+';font:inherit;font-size:13.5px;font-weight:800;cursor:pointer;box-shadow:0 8px 18px rgba(0,60,80,.2)}'
  +'.vc-go:hover{background:#e8fbff}'
  +'@media (min-width:900px){.vc{max-width:320px}}'
  +'@media (prefers-reduced-motion:reduce){.vc{transition:none}}';
  var st=document.createElement('style');
  st.textContent=css;
  document.head.appendChild(st);

  var d=document.createElement('div');
  d.id='vid-card';
  d.className='vc';
  d.innerHTML=''
  +'<span class="vc-tag">🎥 الفيديوهات</span>'
  +'<div class="vc-num">24/7<small>متاحة</small></div>'
  +'<div class="vc-stars" aria-hidden="true">★★★★★</div>'
  +'<p>شاهد الدروس في أي وقت وأعد المشاهدة متى شئت.</p>'
  +'<button type="button" class="vc-go" id="vc-go">شاهد الآن ←</button>';
  grid.after(d);

  var toast=document.getElementById('toast'), tm;
  document.getElementById('vc-go').onclick=function(){
    var sj=localStorage.getItem('mishkat_subject');
    if(sj==='الرياضيات'){location.href='videos.html';return;}
    if(sj==='الفيزياء'){location.href='physvideos.html';return;}
    if(sj==='العلوم'){location.href='scivideos.html';return;}
    if(sj==='العلوم الإسلامية'){location.href='islvideos.html';return;}
    if(!toast)return;
    toast.textContent='قسم «الفيديوهات» قيد الإعداد، وسيُضاف محتواه قريباً ✨';
    toast.classList.add('on');
    clearTimeout(tm);
    tm=setTimeout(function(){toast.classList.remove('on');},2800);
  };
})();

/* ===== 5) بطاقة عن المنصة (سماوي + ذهبي) ===== */
(function(){
  var mock=document.querySelector('.wrap > .mock');
  if(!mock||document.getElementById('about-card'))return;

  var C1=MK.C1,C2=MK.C2,C3=MK.C3,GOLD1=MK.GOLD1,GOLD2=MK.GOLD2,GOLDINK=MK.GOLDINK,GLOW=MK.GLOW;

  var css=''
  +'.ab{direction:rtl;text-align:right;max-width:420px;margin:22px auto 0;padding:26px 22px;border-radius:22px;color:#fff;position:relative;overflow:hidden;background:linear-gradient(120deg,'+C1+','+C2+','+C3+','+C1+');background-size:300% 300%;animation:abbg 10s ease infinite;box-shadow:0 18px 40px '+GLOW+'}'
  +'@keyframes abbg{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}'
  +'.ab::before,.ab::after{content:"";position:absolute;border-radius:50%;pointer-events:none}'
  +'.ab::before{width:200px;height:200px;left:-70px;bottom:-90px;background:rgba(255,255,255,.12);animation:abf 7s ease-in-out infinite}'
  +'.ab::after{width:120px;height:120px;right:-40px;top:-50px;background:rgba(255,194,51,.3);animation:abf 9s ease-in-out infinite reverse}'
  +'@keyframes abf{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-14px)}}'
  +'.ab>*:not(.ab-shine){position:relative;z-index:1}'
  +'.ab-shine{position:absolute;top:0;bottom:0;width:60px;left:-80px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);transform:skewX(-20deg);animation:abs 6s ease-in-out 1.5s infinite;pointer-events:none}'
  +'@keyframes abs{0%{left:-80px}40%,100%{left:110%}}'
  +'.ab-tag{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,'+GOLD1+','+GOLD2+');color:'+GOLDINK+';padding:6px 16px;border-radius:999px;font-weight:800;font-size:14px;box-shadow:0 8px 18px rgba(255,159,28,.4)}'
  +'.ab h2{font-size:22px;font-weight:800;margin:12px 0 14px;color:#fff;text-shadow:0 2px 4px rgba(0,60,80,.2)}'
  +'.ab ul{list-style:none;padding:0;margin:0;display:grid;gap:12px}'
  +'.ab li{display:flex;gap:12px;align-items:flex-start;font-size:15px;line-height:1.7;font-weight:500;color:#fff;text-shadow:0 1px 2px rgba(0,60,80,.25);opacity:0;transform:translateY(14px);transition:opacity .6s ease,transform .6s ease}'
  +'.ab li i{flex:none;width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,.25);display:grid;place-items:center;font-style:normal;font-size:17px;text-shadow:none}'
  +'.ab.in li{opacity:1;transform:none}'
  +'.ab.in li:nth-child(1){transition-delay:.1s}.ab.in li:nth-child(2){transition-delay:.35s}.ab.in li:nth-child(3){transition-delay:.6s}.ab.in li:nth-child(4){transition-delay:.85s}'
  +'@media (min-width:900px){.ab{max-width:780px;padding:36px 38px;margin-top:26px}.ab h2{font-size:28px}.ab li{font-size:17px}.ab ul{grid-template-columns:1fr 1fr;gap:18px 30px}}'
  +'@media (prefers-reduced-motion:reduce){.ab,.ab::before,.ab::after,.ab-shine{animation:none}.ab li{opacity:1;transform:none;transition:none}}';

  var st=document.createElement('style');
  st.textContent=css;
  document.head.appendChild(st);

  var d=document.createElement('section');
  d.id='about-card';
  d.className='ab';
  d.setAttribute('aria-label','عن أكاديمية مشكاة');
  d.innerHTML=''
  +'<span class="ab-shine"></span>'
  +'<span class="ab-tag">✨ عن المنصة</span>'
  +'<h2>أكاديمية مشكاة</h2>'
  +'<ul>'
  +'<li><i>🎓</i><span>أكاديمية مشكاة منصة تعليمية عربية تساعدك على التفوق بخطوات واضحة ومنظمة.</span></li>'
  +'<li><i>📚</i><span>دروس مرتبة حسب شعبتك ومادتك، من الدرس الأول حتى يوم الامتحان.</span></li>'
  +'<li><i>🎥</i><span>شروحات مبسطة وفيديوهات تعيد مشاهدتها في أي وقت ومن أي جهاز.</span></li>'
  +'<li><i>💡</i><span>اسم «مشكاة» مأخوذ من المصباح الذي ينير الطريق، وهذا ما نريده لك في رحلتك الدراسية.</span></li>'
  +'</ul>';
  mock.after(d);

  function show(){d.classList.add('in');}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){show();io.disconnect();}});
    },{threshold:.25});
    io.observe(d);
  }else{show();}
})();

/* ===== 6) فتح فيديوهات يوتيوب داخل المنصة (صفحة watch.html) ===== */
(function(){
  if(/watch\.html$/.test(location.pathname))return;

  function vid(u){
    var m=u.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/)||u.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
    return m?m[1]:'';
  }
  function clean(s){
    return (s||'').replace(/[←→]/g,'').replace(/^[^\u0600-\u06FFA-Za-z0-9]+/,'').replace(/\s+/g,' ').trim();
  }

  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey)return;
    var a=e.target.closest?e.target.closest('a[href]'):null;
    if(!a||a.hasAttribute('data-ext'))return;
    var id=vid(a.getAttribute('href')||'');
    if(!id)return;
    e.preventDefault();

    var label='';
    var card=a.closest('.vcard');
    if(card){
      var tag=card.querySelector('.vtag');
      label=clean(tag?tag.textContent:'');
      var part=clean(a.textContent);
      if(part&&part!=='شاهد الآن')label+=' — '+part;
    }else{
      var lc=a.closest('.lc');
      if(lc){
        var t=lc.querySelector('.lc-t');
        label=clean(t?t.textContent:'');
        if(label)label+=' — الأستاذة أميرة شنوف';
      }
    }
    location.href='watch.html?v='+encodeURIComponent(id)+(label?'&t='+encodeURIComponent(label):'');
  });
})();

/* ===== 7) ألوان بطاقات الشعب ===== */
(function(){
  var COL={
    'علوم تجريبية':['#4ade80','#16a34a'],
    'رياضيات':['#60a5fa','#1d4ed8'],
    'تسيير واقتصاد':['#fb923c','#ea580c'],
    'تقني رياضي':['#facc15','#ca8a04']
  };
  var st=document.createElement('style');
  st.textContent=''
  +'.b[data-b]{border-color:var(--bc)!important;animation:bcglow 2.8s ease-in-out infinite}'
  +'.b[data-b]:hover,.b[data-b]:focus-visible{border-color:var(--bc)!important;box-shadow:0 0 18px var(--bc),0 12px 30px var(--bc)}'
  +'.b[data-b] .pi{background:linear-gradient(145deg,var(--bl),var(--bd))!important;box-shadow:0 12px 24px var(--bc)}'
  +'@keyframes bcglow{0%,100%{box-shadow:0 0 6px var(--bc),0 0 14px var(--bc)}50%{box-shadow:0 0 12px var(--bc),0 0 26px var(--bc)}}';
  document.head.appendChild(st);
  document.querySelectorAll('.b[data-b]').forEach(function(el){
    var c=COL[el.getAttribute('data-b')];
    if(!c) return;
    el.style.setProperty('--bc',c[0]);
    el.style.setProperty('--bl',c[0]);
    el.style.setProperty('--bd',c[1]);
  });
})();

/* ===== 8) ألوان دروس كل مادة ===== */
(function(){
  var COL={
    'العلوم':['#4ade80','#16a34a'],
    'الرياضيات':['#60a5fa','#1d4ed8'],
    'العلوم الإسلامية':['#fb923c','#ea580c'],
    'الفيزياء':['#fb7185','#be123c'],
    'الاقتصاد':['#2dd4bf','#0f766e']
  };
  var sj=localStorage.getItem('mishkat_subject')||'';
  var c=COL[sj];
  if(!c) return;
  var st=document.createElement('style');
  st.textContent=''
  +'.b[data-c]{border-color:var(--sc)!important;animation:scglow 2.8s ease-in-out infinite}'
  +'.b[data-c]:hover,.b[data-c]:focus-visible{border-color:var(--sc)!important;box-shadow:0 0 18px var(--sc),0 12px 30px var(--sc)}'
  +'@keyframes scglow{0%,100%{box-shadow:0 0 6px var(--sc),0 0 14px var(--sc)}50%{box-shadow:0 0 12px var(--sc),0 0 26px var(--sc)}}'
  +'.b[data-c] span{color:var(--sd)!important}';
  document.head.appendChild(st);
  document.querySelectorAll('.b[data-c]').forEach(function(el){
    el.style.setProperty('--sc',c[0]);
    el.style.setProperty('--sd',c[1]);
  });
})();

/* ===== 9) ألوان بطاقات المواد والدروس حسب المادة ===== */
(function(){
  var SUBC={
    'الرياضيات':['#60a5fa','#1d4ed8'],
    'الفيزياء':['#fb7185','#be123c'],
    'العلوم':['#4ade80','#16a34a'],
    'العلوم الإسلامية':['#fb923c','#ea580c'],
    'الاقتصاد':['#2dd4bf','#0f766e'],
    'الهندسة':['#facc15','#ca8a04']
  };
  function colorOf(name){
    if(!name) return null;
    if(SUBC[name]) return SUBC[name];
    if(name.indexOf('الهندسة')===0) return SUBC['الهندسة'];
    return null;
  }
  var cur=localStorage.getItem('mishkat_subject')||'';
  var st=document.createElement('style');
  st.textContent=''
  +'.b[data-s],.b[data-c],.b[data-t]{border-color:var(--sc,#b266ff)!important;animation:subglow 2.8s ease-in-out infinite}'
  +'.b[data-s]:hover,.b[data-c]:hover,.b[data-t]:hover,.b[data-s]:focus-visible,.b[data-c]:focus-visible,.b[data-t]:focus-visible{border-color:var(--sc,#b266ff)!important;box-shadow:0 0 18px var(--sc,#b266ff),0 12px 30px var(--sc,#b266ff)}'
  +'@keyframes subglow{0%,100%{box-shadow:0 0 6px var(--sc,#b266ff),0 0 14px var(--sc,#b266ff)}50%{box-shadow:0 0 12px var(--sc,#b266ff),0 0 26px var(--sc,#b266ff)}}';
  document.head.appendChild(st);

  document.querySelectorAll('.b[data-s]').forEach(function(el){
    var c=colorOf(el.getAttribute('data-s'));
    if(c) el.style.setProperty('--sc',c[0]);
  });

  var cc=colorOf(cur);
  if(cc){
    document.querySelectorAll('.b[data-c],.b[data-t]').forEach(function(el){
      el.style.setProperty('--sc',cc[0]);
    });
  }
})();

/* ===== 10) بطاقة الجامعة (للصفحات القديمة فقط) ===== */
(function(){
  var acts=document.querySelector('.hero .acts');
  if(!acts||document.getElementById('uni-card')||document.querySelector('.hbtns'))return;
  var st=document.createElement('style');
  st.textContent='.ucap{display:flex;align-items:center;gap:12px;width:100%;max-width:520px;margin:0 auto 16px;padding:12px 18px;border-radius:999px;background:var(--card);border:2px solid #ffc233;box-shadow:0 0 14px rgba(255,194,51,.55),0 8px 22px rgba(255,194,51,.18);transition:transform .2s;direction:rtl;text-decoration:none;color:inherit}'
  +'.ucap:hover,.ucap:focus-visible{transform:translateY(-3px)}'
  +'.ucap-i{flex:none;width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#ffc233,#ff9f1c);display:grid;place-items:center}'
  +'.ucap-i svg{width:22px;height:22px;fill:none;stroke:#4a3000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}'
  +'.ucap-t{display:block;font-weight:800;font-size:16px;line-height:1.35}'
  +'.ucap-s{display:block;font-size:12.5px;color:var(--muted);line-height:1.35}';
  document.head.appendChild(st);
  var a=document.createElement('a');
  a.id='uni-card';
  a.className='ucap';
  a.href='university.html';
  a.innerHTML='<span class="ucap-i"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 6L3 12l13 6 13-6-13-6Z"/><path d="M8 15v6c0 2 3.6 4 8 4s8-2 8-4v-6"/><path d="M27 12v7"/></svg></span><span><span class="ucap-t">🎓 الجامعة</span><span class="ucap-s">محتوى جامعي قريباً</span></span>';
  acts.parentNode.insertBefore(a,acts);
})();

/* ===== 11) بطاقة الباكالوريا (للصفحات القديمة فقط) ===== */
(function(){
  var acts=document.querySelector('.hero .acts');
  if(!acts||document.getElementById('bac-card')||document.querySelector('.hbtns'))return;
  var st=document.createElement('style');
  st.textContent='.bcap{display:flex;align-items:center;gap:12px;width:100%;max-width:520px;margin:0 auto 16px;padding:12px 18px;border-radius:999px;background:var(--card);border:2px solid #0a84ff;box-shadow:0 0 14px rgba(10,132,255,.45),0 8px 22px rgba(10,132,255,.18);transition:transform .2s;direction:rtl;text-decoration:none;color:inherit}'
  +'.bcap:hover,.bcap:focus-visible{transform:translateY(-3px)}'
  +'.bcap-i{flex:none;width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#4cc3ff,#0a84ff);display:grid;place-items:center;color:#fff;font-size:20px}'
  +'.bcap-t{display:block;font-weight:800;font-size:16px;line-height:1.35}'
  +'.bcap-s{display:block;font-size:12.5px;color:var(--muted);line-height:1.35}';
  document.head.appendChild(st);
  var a=document.createElement('a');
  a.id='bac-card';
  a.className='bcap';
  a.href='bac.html';
  a.innerHTML='<span class="bcap-i">📝</span><span><span class="bcap-t">🎓 الباكالوريا</span><span class="bcap-s">مواضيع وحلول من 2008 إلى 2026</span></span>';
  var uni=document.getElementById('uni-card');
  var ref=uni||acts;
  ref.parentNode.insertBefore(a,ref);
})();

/* ===== 15) الصفحة الرئيسية فقط: داكنة دائماً + أزرار بحجم واحد + عنوان المشوار الدراسي ===== */
(function(){
  if(!document.querySelector('.hero.wm'))return;

  var st=document.createElement('style');
  st.textContent=''
  /* الصفحة الرئيسية داكنة دائماً */
  +'html:root{color-scheme:dark!important;--bg:#0d141c!important;--soft:#121b25!important;--card:#16212d!important;--ink:#f2f5f8!important;--muted:#9aa7b6!important;--line:#223041!important}'
  +'html body{background:#0d141c!important;color:#f2f5f8!important}'
  +'html body .hero.wm{background:linear-gradient(135deg,#0f2438,#0d141c)!important}'
  +'html body section.f.wm{background:#121b25!important}'
  +'html body .wm::before{opacity:.07!important}'
  +'html body h1{color:#fff!important}'
  +'html body .hero p{color:#9aa7b6!important}'
  +'html body .stats small{color:#9aa7b6!important}'
  /* إلغاء الإطار الافتراضي للأزرار */
  +'html body button.btn{border:0!important}'
  /* الأزرار الأربعة بالحجم نفسه: كل واحد 52 بكسل ارتفاعاً وبعرض نصف الصف */
  +'html body .hbtns{display:grid!important;grid-template-columns:1fr 1fr!important;gap:12px!important;align-items:start!important;max-width:520px!important}'
  +'html body .hbtns .btn,html body .hbtns .soc{width:100%!important;height:52px!important;min-height:52px!important;padding:8px 12px!important;margin:0!important;font-size:15px!important;border-radius:999px!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;white-space:normal!important;line-height:1.25!important;box-sizing:border-box!important}'
  +'html body .hbtns .btn.p{border:0!important}'
  +'html body .hbtns .btn.wt,html body .btn.wt{background:#16212d!important;color:#fff!important;border:1.5px solid #0a84ff!important;box-shadow:none!important}'
  +'html body .soc-wrap{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:8px!important;width:100%!important;margin:0!important}'
  +'html body .dots{justify-content:center!important}'
  /* عنوان البطاقات الثلاث */
  +'html body .mock .mshead{font-size:18px;font-weight:800;text-align:center;color:#f2f5f8;margin:2px 0 14px;letter-spacing:.2px}';
  document.head.appendChild(st);

  /* زر زورونا في الجهة اليمنى والباكالوريا في اليسرى */
  var sw=document.getElementById('socwrap');
  var bac=document.querySelector('.hbtns2 .btn.wt');
  if(sw&&bac&&bac.nextElementSibling===sw){
    bac.parentNode.insertBefore(sw,bac);
  }

  /* عنوان: اختر المشوار الدراسي */
  var mock=document.querySelector('.hero .mock');
  if(mock&&!mock.querySelector('.mshead')){
    var h=document.createElement('div');
    h.className='mshead';
    h.textContent='🎓 اختر المشوار الدراسي';
    mock.insertBefore(h,mock.firstChild);
  }
})();

/* ===== 18) ملخصات منصة مشكاة (PDF) لدروس العلوم: تُفتح داخل عارض المنصة ===== */
(function(){
  if(!document.querySelector('.vgrid')) return;
  var sj=localStorage.getItem('mishkat_subject')||'';
  var ch=localStorage.getItem('mishkat_chapter')||'';

  /* ✏️ أضف هنا ملفاً جديداً: 'اسم الدرس':'اسم-الملف.pdf' (فاصلة بين كل سطرين) */
  var PDF={
    'تركيب البروتين':'protein.pdf',
    'العلاقة بين البنية والوظيفة':'bonia.pdf',
    'دور البروتينات في التحفيز الإنزيمي':'inzymes.pdf',
    'المناعة':'manaa.pdf',
    'الاتصال العصبي':'itisal.pdf',
    'التركيب الضوئي':'Photosynthèse.pdf',
    'التنفس':'La respiration.pdf'
  };

  /* مطابقة اسم الدرس دون حساسية للهمزة والتاء المربوطة والتشكيل */
  function norm(s){
    return String(s||'')
      .replace(/[\u064B-\u065F\u0670]/g,'')
      .replace(/[أإآ]/g,'ا')
      .replace(/ى/g,'ي')
      .replace(/ة/g,'ه')
      .replace(/\s+/g,' ')
      .trim();
  }
  var map={};
  Object.keys(PDF).forEach(function(k){map[norm(k)]=PDF[k];});
  var file=map[norm(ch)];

  if(sj!=='العلوم'||!file) return;
  document.querySelectorAll('.vcard').forEach(function(card){
    var tag=card.querySelector('.vtag');
    if(!tag||tag.textContent.indexOf('ملخصات منصة مشكاة')===-1) return;
    var btn=card.querySelector('button.vgo');
    if(!btn) return;
    var a=document.createElement('a');
    a.className='vgo';
    a.href='pdfview.html?f='+encodeURIComponent(file)+'&t='+encodeURIComponent('ملخص '+ch);
    a.textContent='تصفّح الملخصات ←';
    btn.replaceWith(a);
  });
})();
/* ===== 19) تخفيف الرسوم (توهج ثابت) وتسريع التنقل ===== */
(function(){
  /* توهج ثابت بدل المتحرك: أخفّ على الهاتف، ولا بنفسجي في أي بطاقة */
  var st=document.createElement('style');
  st.textContent=''
  +'.b,.eng,.bc{animation:none!important}'
  +'.b:not([data-b]):not([data-s]):not([data-c]):not([data-t]){border-color:#ff9f1c!important;box-shadow:0 0 12px 1px #ff9f1c,0 0 24px #ff9f1c!important}'
  +'.b[data-b]{box-shadow:0 0 12px 1px var(--bc),0 0 24px var(--bc)!important}'
  +'.b[data-s],.b[data-c],.b[data-t]{box-shadow:0 0 12px 1px var(--sc,#ff9f1c),0 0 24px var(--sc,#ff9f1c)!important}'
  +'.b[data-b]:hover,.b[data-b]:focus-visible{box-shadow:0 0 18px 3px var(--bc),0 12px 30px var(--bc)!important}'
  +'.b[data-s]:hover,.b[data-c]:hover,.b[data-t]:hover,.b[data-s]:focus-visible,.b[data-c]:focus-visible,.b[data-t]:focus-visible{box-shadow:0 0 18px 3px var(--sc,#ff9f1c),0 12px 30px var(--sc,#ff9f1c)!important}'
  +'.eng{border-color:#facc15!important;box-shadow:0 0 12px 1px #facc15,0 0 24px #facc15!important}'
  +'.eng:hover,.eng:focus-visible{border-color:#fde047!important}'
  +'.bc{border-color:var(--bc,#ff9f1c)!important;box-shadow:0 0 12px 1px var(--bc,#ff9f1c),0 0 24px var(--bc,#ff9f1c)!important}'
  +'.bc:hover,.bc:focus-visible{border-color:var(--bc,#ff9f1c)!important}'
  +'.ab{animation:none!important;background-size:100% 100%!important}';
  document.head.appendChild(st);

  /* كبسولات الصفحة الرئيسية بلون كل شعبة */
  var BC={
    'علوم تجريبية':['#4ade80','#15803d'],
    'رياضيات':['#60a5fa','#1d4ed8'],
    'تقني رياضي':['#facc15','#a16207'],
    'تسيير واقتصاد':['#fb923c','#c2410c']
  };
  document.querySelectorAll('.bc[data-b]').forEach(function(el){
    var c=BC[el.getAttribute('data-b')];
    if(!c) return;
    el.style.setProperty('--bc',c[0]);
    var ic=el.querySelector('.bc-i');
    if(ic){ic.style.background=c[0]+'33';ic.style.color=c[1];}
  });
})();

(function(){
  /* تحميل الصفحات المحتملة مسبقاً ليكون الانتقال شبه فوري */
  var cn=navigator.connection||{};
  if(cn.saveData||/(^|-)2g$/.test(cn.effectiveType||'')) return;

  var here=location.pathname.split('/').pop()||'index.html';
  var NEXT={
    'index.html':['subjects.html','branches.html','bac.html','primary.html','beam.html','university.html'],
    'branches.html':['subjects.html'],
    'subjects.html':['math.html','physics.html','science.html','islamic.html','section.html'],
    'math.html':['lesson.html'],
    'physics.html':['lesson.html'],
    'science.html':['lesson.html'],
    'islamic.html':['lesson.html'],
    'section.html':['summaries.html'],
    'lesson.html':['summaries.html','videos.html','physvideos.html','scivideos.html','islvideos.html'],
    'summaries.html':['pdfview.html'],
    'videos.html':['watch.html'],
    'physvideos.html':['watch.html','physlessons.html'],
    'physlessons.html':['watch.html'],
    'scivideos.html':['watch.html'],
    'islvideos.html':['watch.html']
  };

  var done={};
  function prefetch(u){
    if(!u||done[u]||u===here) return;
    done[u]=1;
    var l=document.createElement('link');
    l.rel='prefetch';
    l.href=u;
    document.head.appendChild(l);
  }

  function go(){(NEXT[here]||[]).forEach(prefetch);}
  if('requestIdleCallback' in window){requestIdleCallback(go,{timeout:2500});}
  else{setTimeout(go,1500);}

  /* وعند لمس أو تمرير الفأرة على أي رابط داخلي نحمّل صفحته فوراً */
  function hint(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;
    if(!a||a.target==='_blank'||a.hasAttribute('download')) return;
    var u;
    try{u=new URL(a.getAttribute('href'),location.href);}catch(x){return;}
    if(u.origin!==location.origin||!/\.html$/.test(u.pathname)) return;
    prefetch(u.pathname.split('/').pop()+u.search);
  }
  document.addEventListener('touchstart',hint,{passive:true,capture:true});
  document.addEventListener('mouseover',hint,{passive:true,capture:true});
})();
/* ===== 20) ملخصات الرياضيات (PDF) لشعب: علوم تجريبية، رياضيات، تقني رياضي ===== */
(function(){
  if(!document.querySelector('.vgrid')) return;
  var sj=localStorage.getItem('mishkat_subject')||'';
  if(sj!=='الرياضيات') return;
  var br=localStorage.getItem('mishkat_branch')||'';
  var ch=localStorage.getItem('mishkat_chapter')||'';

  var BR={'علوم تجريبية':'se','رياضيات':'m','تقني رياضي':'tm'};
  var b=BR[br];
  if(!b) return;

  function norm(s){
    return String(s||'')
      .replace(/[\u064B-\u065F\u0670]/g,'')
      .replace(/[أإآ]/g,'ا')
      .replace(/ى/g,'ي')
      .replace(/ة/g,'ه')
      .replace(/\s+/g,' ')
      .trim();
  }

  /* رمز كل درس، ويُتعرَّف عليه من كلمة داخل اسمه */
  var CH=[
    ['func','العدديه'],
    ['exp','اسيه'],
    ['ln','اللوغاريتميه'],
    ['seq','المتتاليات'],
    ['prob','الاحتمالات'],
    ['complex','المركبه'],
    ['div','القسمه'],
    ['prim','الاصليه']
  ];
  var n=norm(ch), code='';
  for(var i=0;i<CH.length;i++){
    if(n.indexOf(CH[i][1])>-1){code=CH[i][0];break;}
  }
  if(!code) return;

  /* يبحث أولاً عن ملف الشعبة، ثم عن ملف مشترك بين الشعب */
  var cands=['math-'+b+'-'+code+'.pdf','math-'+code+'.pdf'];

  var card=null;
  document.querySelectorAll('.vcard').forEach(function(c){
    var tag=c.querySelector('.vtag');
    if(tag&&tag.textContent.indexOf('ملخصات منصة مشكاة')>-1) card=c;
  });
  if(!card) return;
  var btn=card.querySelector('button.vgo');
  if(!btn) return;

  function show(file){
    var a=document.createElement('a');
    a.className='vgo';
    a.href='pdfview.html?f='+encodeURIComponent(file)+'&t='+encodeURIComponent('ملخص '+ch+' — شعبة '+br);
    a.textContent='تصفّح الملخصات ←';
    btn.replaceWith(a);
  }
  function tryNext(k){
    if(k>=cands.length) return;
    fetch(cands[k],{method:'HEAD',cache:'no-store'}).then(function(r){
      if(r.ok){show(cands[k]);}else{tryNext(k+1);}
    }).catch(function(){tryNext(k+1);});
  }
  tryNext(0);
})();
/* ===== 21) العلوم الإسلامية: كتاب السلسلة الخضراء + ملخصات بوسعادي وشمس الدين ===== */
(function(){
  var sj=localStorage.getItem('mishkat_subject')||'';
  if(sj!=='العلوم الإسلامية') return;

  /* 1) صفحة الدرس: بطاقة سلاسل الميزان تصبح «كتاب السلسلة الخضراء» */
  var ser=document.querySelector('.b[data-t="ser"]');
  if(ser){
    var COLOR='#fb923c';   /* لون الحواف: للأخضر اجعله #4ade80 */
    var FILE='green.pdf';
    var TITLE='كتاب السلسلة الخضراء';

    var n=ser.cloneNode(true);
    n.removeAttribute('data-t');
    n.setAttribute('data-g','green');

    /* تغيير النص */
    var tw=document.createTreeWalker(n,NodeFilter.SHOW_TEXT,null);
    var first=true, tn;
    while((tn=tw.nextNode())){
      if(!tn.nodeValue.trim()) continue;
      if(first){tn.nodeValue=TITLE;first=false;}else{tn.nodeValue='';}
    }

    /* أيقونة كتاب مغلق */
    var pi=n.querySelector('.pi');
    if(pi){
      pi.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 4h16a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H8z"/><path d="M8 4v24"/><path d="M13 10h9M13 15h9"/></svg>';
    }

    /* لون الحواف */
    var st=document.createElement('style');
    st.textContent='.b.b.b.b.b.b[data-g]{border-color:'+COLOR+'!important;box-shadow:0 0 12px 1px '+COLOR+',0 0 24px '+COLOR+'!important;animation:none!important}'
      +'.b.b.b.b.b.b[data-g]:hover,.b.b.b.b.b.b[data-g]:focus-visible{box-shadow:0 0 18px 3px '+COLOR+',0 12px 30px '+COLOR+'!important}';
    document.head.appendChild(st);

    var note=function(){
      var toast=document.getElementById('toast');
      if(!toast) return;
      toast.textContent='«'+TITLE+'» قيد الإعداد، وسيُضاف قريباً ✨';
      toast.classList.add('on');
      setTimeout(function(){toast.classList.remove('on');},2800);
    };

    /* عند الضغط: يفتح الكتاب إن وُجد، وإلا تظهر رسالة قيد الإعداد */
    n.addEventListener('click',function(){
      fetch(FILE,{method:'HEAD',cache:'no-store'}).then(function(r){
        if(r.ok){
          location.href='pdfview.html?f='+encodeURIComponent(FILE)+'&t='+encodeURIComponent(TITLE);
        }else{note();}
      }).catch(note);
    });

    ser.replaceWith(n);
  }

  /* 2) صفحة الملخصات: حذف ملخصات منصة مشكاة، وربط كتابي بوسعادي وشمس الدين */
  var vg=document.querySelector('.vgrid');
  if(vg&&/summaries/.test(location.pathname)){
    var BOOKS=[
      ['بوسعادي','bousaadi.pdf','ملخصات كتاب الأستاذة بوسعادي'],
      ['شمس الدين','shams.pdf','ملخصات كتاب الأستاذ شمس الدين']
    ];
    [].slice.call(vg.querySelectorAll('.vcard')).forEach(function(card){
      var tag=card.querySelector('.vtag');
      var txt=tag?tag.textContent:'';
      if(txt.indexOf('ملخصات منصة مشكاة')>-1){card.remove();return;}
      BOOKS.forEach(function(b){
        if(txt.indexOf(b[0])===-1) return;
        var btn=card.querySelector('button.vgo');
        if(!btn) return;
        fetch(b[1],{method:'HEAD',cache:'no-store'}).then(function(r){
          if(!r.ok) return;
          var a=document.createElement('a');
          a.className='vgo';
          a.href='pdfview.html?f='+encodeURIComponent(b[1])+'&t='+encodeURIComponent(b[2]);
          a.textContent='تصفّح الملخصات ←';
          btn.replaceWith(a);
        }).catch(function(){});
      });
    });
  }
})();
/* ===== 22) حواف زرقاء عادية بلا توهج، وبطاقات أصغر قليلاً ===== */
(function(){
  var BLUE='#0a84ff';   /* لون الحواف: نفس لون زر «تعرّف على المنصة» */
  var TINT=0.15;        /* نسبة الأزرق داخل البطاقة (15%) */
  var tint='rgba(10,132,255,'+TINT+')';
  var fill='linear-gradient('+tint+','+tint+')';

  var css=''
  /* حواف زرقاء عادية بلا توهج وبلا حركة */
  +'html body .b.b.b.b.b.b.b,html body .b.b.b.b.b.b.b:hover,html body .b.b.b.b.b.b.b:focus-visible,'
  +'html body .eng.eng.eng.eng,html body .eng.eng.eng.eng:hover,'
  +'html body .tl.tl.tl.tl,html body .tl.tl.tl.tl:hover{'
  +'border:2px solid '+BLUE+'!important;box-shadow:none!important;animation:none!important;background-image:'+fill+'!important}'

  /* حجم أصغر لبطاقات الشعب والمواد والدروس */
  +'html body .b.b.b.b.b.b.b{padding:14px 8px!important;border-radius:16px!important;font-size:15px!important}'

  /* الأيقونات: أزرق موحد وحجم أصغر */
  +'html body .pi.pi{width:52px!important;height:52px!important;border-radius:16px!important}'
  +'html body .pi.pi svg{width:30px!important;height:30px!important}'
  +'html body .b.b .pi.pi{background:linear-gradient(145deg,#4cc3ff,#0a84ff 55%,#1d57d6)!important;box-shadow:0 8px 16px rgba(10,132,255,.25)!important}'
  +'html body .has-pi.has-pi{margin-bottom:10px!important}'
  +'@media (min-width:900px){html body .pi.pi{width:60px!important;height:60px!important}html body .pi.pi svg{width:34px!important;height:34px!important}}'

  /* أرقام الدروس بالأزرق الموحد */
  +'html body .b.b.b[data-c] span{color:'+BLUE+'!important}'

  /* كبسولات الشعب في الصفحة الرئيسية */
  +'html body .bc.bc.bc.bc,html body .bc.bc.bc.bc:hover,html body .bc.bc.bc.bc:focus-visible{'
  +'border:2px solid '+BLUE+'!important;box-shadow:none!important;animation:none!important;background-image:'+fill+'!important;'
  +'min-width:186px!important;min-height:58px!important;padding:7px 14px 7px 16px!important}'
  +'@media (min-width:801px){html body .bc.bc.bc.bc{min-width:212px!important;min-height:64px!important}}'
  +'html body .bc .bc-i.bc-i{width:34px!important;height:34px!important;background:rgba(10,132,255,.16)!important;color:'+BLUE+'!important}'
  +'html body .bc .bc-t{font-size:13.5px!important}'
  +'html body .bc .bc-s{font-size:11px!important}'

  /* بطاقات الباكالوريا */
  +'html body .tl.tl.tl.tl{min-height:92px!important;padding:14px 8px!important;font-size:15px!important}'
  +'html body .tl.tl.tl.tl.year{min-height:70px!important;font-size:22px!important}'
  +'html body .tl .tl-ic.tl-ic{width:46px!important;height:46px!important;margin-bottom:6px!important}'
  +'html body .tl .tl-ic.tl-ic svg{width:24px!important;height:24px!important}';

  var st=document.createElement('style');
  st.textContent=css;
  document.head.appendChild(st);

  /* الصفحة الرئيسية: إعادة حساب الشريط المتحرك بعد تغيير الأحجام */
  if(document.getElementById('bq')){
    try{window.dispatchEvent(new Event('resize'));}catch(e){}
  }
})();
/* ===== 23) الصفحة الرئيسية: نهارية افتراضياً + زر الوضع الليلي/النهاري بجانب «سجّل الآن» ===== */
(function(){
  if(!document.querySelector('.hero.wm')) return;
  var root=document.documentElement;

  /* منع المتصفح من تحويل الصفحة إلى الوضع الليلي تلقائياً */
  var m=document.createElement('meta');
  m.name='color-scheme';
  m.content='only light';
  document.head.appendChild(m);

  var P='html body:not(.x) ';
  var D='html[data-home="dark"] body:not(.x) ';
  var css=''
  /* ===== الوضع النهاري ===== */
  +'html:root:root:root{color-scheme:light!important;--bg:#fff!important;--soft:#f7f9fb!important;--card:#fff!important;--ink:#101828!important;--muted:#667085!important;--line:#eaeef3!important}'
  +'html body:not(.x){background:#fff!important;color:#101828!important}'
  +P+'.hero.wm{background:linear-gradient(135deg,#e3f4ff,#f4fbff 60%,#fffbea)!important}'
  +P+'section.f.wm{background:#f7f9fb!important}'
  +P+'.wm::before{opacity:.09!important}'
  +P+'.hero h1{color:#101828!important}'
  +P+'.hero p{color:#667085!important}'
  +P+'.stats small{color:#667085!important}'
  +P+'.mock .mshead{color:#101828!important}'
  +P+'.hbtns .btn.wt,'+P+'.btn.wt{background:#fff!important;color:#101828!important;border:1.5px solid #0a84ff!important;box-shadow:none!important}'

  /* ===== شكل الزر ===== */
  +'.tg{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:40px;margin:0;padding:0 14px;border-radius:999px;background:var(--card);color:#0a84ff;border:1.5px solid #0a84ff;font:inherit;font-size:13.5px;font-weight:700;cursor:pointer;white-space:nowrap}'
  +'.tg:hover,.tg:focus-visible{background:#0a84ff;color:#fff}'
  /* الهاتف: الزر رمز فقط، والشريط العلوي أضيق قليلاً */
  +'@media (max-width:480px){'
  +'.tg{width:40px;padding:0}.tg-t{display:none}.tg-i{font-size:18px}'
  +'html body header{gap:8px}'
  +'html body header .logo{font-size:16px}'
  +'html body header .lg-img{width:36px;height:36px}'
  +'html body header nav{gap:8px}'
  +'html body header nav .btn.p{padding:8px 14px;font-size:14px}'
  +'}'

  /* ===== الوضع الليلي ===== */
  +'html[data-home="dark"]:root:root:root{color-scheme:dark!important;--bg:#0d141c!important;--soft:#121b25!important;--card:#16212d!important;--ink:#f2f5f8!important;--muted:#9aa7b6!important;--line:#223041!important}'
  +'html[data-home="dark"] body:not(.x){background:#0d141c!important;color:#f2f5f8!important}'
  +D+'.hero.wm{background:linear-gradient(135deg,#0f2438,#0d141c)!important}'
  +D+'section.f.wm{background:#121b25!important}'
  +D+'.wm::before{opacity:.07!important}'
  +D+'.hero h1{color:#fff!important}'
  +D+'.hero p{color:#9aa7b6!important}'
  +D+'.stats small{color:#9aa7b6!important}'
  +D+'.mock .mshead{color:#f2f5f8!important}'
  +D+'.hbtns .btn.wt,'+D+'.btn.wt{background:#16212d!important;color:#fff!important;border:1.5px solid #0a84ff!important;box-shadow:none!important}';

  var st=document.createElement('style');
  st.textContent=css;
  document.head.appendChild(st);

  /* ===== الزر بجانب «سجّل الآن» ===== */
  var nav=document.querySelector('header nav');
  if(!nav||document.getElementById('home-theme')) return;

  var btn=document.createElement('button');
  btn.id='home-theme';
  btn.type='button';
  btn.className='tg';
  btn.innerHTML='<span class="tg-i"></span><span class="tg-t"></span>';
  var ic=btn.querySelector('.tg-i'), tx=btn.querySelector('.tg-t');

  function apply(dark){
    if(dark){root.setAttribute('data-home','dark');}else{root.removeAttribute('data-home');}
    ic.textContent=dark?'☀️':'🌙';
    tx.textContent=dark?'الوضع النهاري':'الوضع الليلي';
    btn.setAttribute('aria-label',dark?'الوضع النهاري':'الوضع الليلي');
  }

  var dark=false;
  try{dark=localStorage.getItem('mishkat_theme')==='dark';}catch(e){}
  apply(dark);

  btn.addEventListener('click',function(){
    dark=!dark;
    apply(dark);
    try{localStorage.setItem('mishkat_theme',dark?'dark':'light');}catch(e){}
  });

  nav.insertBefore(btn,nav.querySelector('.btn.p')||null);
})();
/* ===== 25) إصلاح أيقونة بطاقة «تسيير واقتصاد» في الصفحة الرئيسية ===== */
(function(){
  if(!document.querySelector('.bc')) return;
  var st=document.createElement('style');
  st.textContent='html body .bc .bc-i.b.b.b.b.b.b.b,html body .bc .bc-i.b.b.b.b.b.b.b:hover{padding:0!important;border:0!important;border-radius:50%!important;background-image:none!important;box-shadow:none!important;font-size:inherit!important}';
  document.head.appendChild(st);
})();
/* ===== 26) ملخصات الفيزياء (PDF) لشعب: علوم تجريبية، رياضيات، تقني رياضي ===== */
(function(){
  if(!document.querySelector('.vgrid')) return;
  var sj=localStorage.getItem('mishkat_subject')||'';
  if(sj!=='الفيزياء') return;
  var br=localStorage.getItem('mishkat_branch')||'';
  var ch=localStorage.getItem('mishkat_chapter')||'';

  var BR={'علوم تجريبية':'se','رياضيات':'m','تقني رياضي':'tm'};
  var b=BR[br];
  if(!b) return;

  function norm(s){
    return String(s||'')
      .replace(/[\u064B-\u065F\u0670]/g,'')
      .replace(/[أإآ]/g,'ا')
      .replace(/ى/g,'ي')
      .replace(/ة/g,'ه')
      .replace(/\s+/g,' ')
      .trim()
      .toLowerCase();
  }

  /* رمز كل درس، ويُتعرَّف عليه من كلمة داخل اسمه */
  var CH=[
    ['ester','استره'],
    ['time','الزمنيه'],
    ['mech','الميكانيك'],
    ['elec','كهرب'],
    ['ph','توازن'],
    ['ph','ph'],
    ['nucl','النوويه'],
    ['osc','اهتزاز']
  ];
  var n=norm(ch), code='';
  for(var i=0;i<CH.length;i++){
    if(n.indexOf(CH[i][1])>-1){code=CH[i][0];break;}
  }
  if(!code) return;

  /* يبحث أولاً عن ملف الشعبة، ثم عن ملف مشترك بين الشعب */
  var cands=['phys-'+b+'-'+code+'.pdf','phys-'+code+'.pdf'];

  var card=null;
  document.querySelectorAll('.vcard').forEach(function(c){
    var tag=c.querySelector('.vtag');
    if(tag&&tag.textContent.indexOf('ملخصات منصة مشكاة')>-1) card=c;
  });
  if(!card) return;
  var btn=card.querySelector('button.vgo');
  if(!btn) return;

  function show(file){
    var a=document.createElement('a');
    a.className='vgo';
    a.href='pdfview.html?f='+encodeURIComponent(file)+'&t='+encodeURIComponent('ملخص '+ch+' — شعبة '+br);
    a.textContent='تصفّح الملخصات ←';
    btn.replaceWith(a);
  }
  function tryNext(k){
    if(k>=cands.length) return;
    fetch(cands[k],{method:'HEAD',cache:'no-store'}).then(function(r){
      if(r.ok){show(cands[k]);}else{tryNext(k+1);}
    }).catch(function(){tryNext(k+1);});
  }
  tryNext(0);
})();
/* ===== 27) نافذة «تعرّف على المنصة»: بطاقة عن همة + اسم المطور ===== */
(function(){
  var mb=document.querySelector('#ov .mb');
  if(!mb||document.getElementById('hm-card')) return;

  var st=document.createElement('style');
  st.textContent=''
  +'.hm{margin-top:22px;opacity:0;transform:translateY(16px);transition:opacity .55s ease .75s,transform .55s ease .75s}'
  +'.ov.show .hm{opacity:1;transform:none}'
  +'.hm-pill{position:relative;overflow:hidden;border-radius:38px;padding:22px 20px 24px;text-align:center;color:#eaf2ff;background:linear-gradient(135deg,#0b2a5b 0%,#071a3d 45%,#02060f 100%);border:2px solid rgba(120,170,255,.35);box-shadow:0 16px 34px rgba(0,10,40,.55)}'
  +'.hm-pill::before{content:"";position:absolute;right:-50px;top:-60px;width:150px;height:150px;border-radius:50%;background:rgba(80,140,255,.16);pointer-events:none}'
  +'.hm-pill>*{position:relative}'
  +'.hm-tag{display:inline-block;background:#fff;color:#0b2a5b;padding:6px 18px;border-radius:999px;font-weight:800;font-size:14.5px;box-shadow:0 6px 14px rgba(0,0,0,.25)}'
  +'.hm-it{display:flex;gap:12px;align-items:flex-start;text-align:right;margin-top:16px}'
  +'.hm-n{flex:none;width:40px;height:40px;border-radius:12px;display:grid;place-items:center;direction:ltr;font-weight:800;font-size:15px;color:#9cc4ff;background:rgba(120,170,255,.16);border:1px solid rgba(120,170,255,.4)}'
  +'.hm-t{display:block;font-weight:800;font-size:15.5px;color:#fff;text-shadow:none}'
  +'.hm-d{margin:3px 0 0;font-size:14px;line-height:1.85;font-weight:500;color:#c9d9f5;text-shadow:none}'
  +'.hm-note{margin:18px 0 0;padding:11px 14px;border-radius:18px;background:rgba(255,255,255,.07);color:#ffd27a;font-size:13.5px;line-height:1.85;font-weight:600;text-shadow:none}'
  +'.hm-dv{margin:16px 0 0;font-size:14.5px;font-weight:800;color:#fff;text-shadow:none}'
  +'.hm-go{display:inline-block;margin-top:14px;background:#fff;color:#0b2a5b;padding:10px 24px;border-radius:999px;font-weight:800;font-size:14px;text-decoration:none;box-shadow:0 8px 18px rgba(0,0,0,.3)}'
  +'.hm-go:hover,.hm-go:focus-visible{background:#e6efff}'
  +'@media (prefers-reduced-motion:reduce){.hm{opacity:1;transform:none;transition:none}}';
  document.head.appendChild(st);

  var d=document.createElement('div');
  d.id='hm-card';
  d.className='hm';
  d.innerHTML=''
  +'<div class="hm-pill">'
  +'<span class="hm-tag">🌟 عن منصة همة</span>'

  +'<div class="hm-it"><span class="hm-n">01</span><div>'
  +'<span class="hm-t">مجانية بالكامل</span>'
  +'<p class="hm-d">لا حسابات ولا اشتراكات ولا دفع. تموّل المنصة بإعلانات خفيفة لا تعيق المراجعة.</p>'
  +'</div></div>'

  +'<div class="hm-it"><span class="hm-n">02</span><div>'
  +'<span class="hm-t">مرتبة كما تدرس</span>'
  +'<p class="hm-d">الشعبة ← المادة ← الوحدة ← نوع المورد. تصل إلى ما تريده في خطوات قليلة.</p>'
  +'</div></div>'

  +'<div class="hm-it"><span class="hm-n">03</span><div>'
  +'<span class="hm-t">مصممة للهاتف</span>'
  +'<p class="hm-d">واجهة عربية خفيفة وسريعة، مع تنقل سفلي يسهل الوصول إليه بإبهام واحد.</p>'
  +'</div></div>'

  +'<p class="hm-note">المحتوى يُضاف تدريجيًا. الأقسام التي تحمل علامة «قيد الإضافة» جاهزة هيكليًا وسيُنشر فيها المحتوى الحقيقي فور تجهيزه</p>'
  +'<p class="hm-dv">المطور: داودي محمد جلال الدين 👨‍💻</p>'
  +'<a class="hm-go" href="https://himma-sigma.vercel.app/" target="_blank" rel="noopener">زيارة منصة همة ←</a>'
  +'</div>';
  mb.appendChild(d);
})();
/* ===== 28) نافذة «تعرّف على المنصة»: عن همة، كل عنصر في اسطوانة خاصة ===== */
(function(){
  var mb=document.querySelector('#ov .mb');
  if(!mb) return;

  /* حذف البطاقة القديمة (الكتلة 27) إن وُجدت */
  var old=document.getElementById('hm-card');
  if(old) old.remove();
  if(document.getElementById('hx-wrap')) return;

  var st=document.createElement('style');
  st.textContent=''
  +'.hx{margin-top:22px;display:grid;gap:10px}'
  +'.hx-head{text-align:center;margin-bottom:2px}'
  +'.hx-tag{display:inline-block;background:#fff;color:#0b2a5b;padding:6px 18px;border-radius:999px;font-weight:800;font-size:14.5px;box-shadow:0 6px 14px rgba(0,0,0,.2)}'
  +'.hx-p{display:flex;align-items:center;gap:12px;padding:12px 16px 12px 18px;border-radius:30px;text-align:right;color:#eaf2ff;'
  +'background:linear-gradient(135deg,#10305f 0%,#08142e 55%,#03060f 100%);border:1px solid rgba(148,187,255,.25);'
  +'box-shadow:0 10px 22px rgba(0,8,30,.45),inset 0 1px 0 rgba(255,255,255,.08);'
  +'opacity:0;transform:translateY(14px);transition:opacity .5s ease var(--d,.7s),transform .5s ease var(--d,.7s)}'
  +'.ov.show .hx-p{opacity:1;transform:none}'
  +'.hx-b{flex:none;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;direction:ltr;font-weight:800;font-size:15px;color:var(--ac,#38bdf8);background:rgba(255,255,255,.06);border:1.5px solid var(--ac,#38bdf8)}'
  +'.hx-x{min-width:0}'
  +'.hx-x b{display:block;font-size:15px;font-weight:800;line-height:1.5;color:#fff;text-shadow:none}'
  +'.hx-x p{margin:2px 0 0;font-size:13.5px;line-height:1.75;font-weight:500;color:#b9cdee;text-shadow:none}'
  +'.hx-note .hx-x p{margin:0;color:#f6dca3;font-weight:600}'
  +'.hx-go{justify-self:center;display:inline-block;margin-top:6px;background:#fff;color:#0b2a5b;padding:10px 26px;border-radius:999px;font-weight:800;font-size:14px;text-decoration:none;box-shadow:0 8px 18px rgba(0,0,0,.28)}'
  +'.hx-go:hover,.hx-go:focus-visible{background:#e6efff}'
  +'@media (prefers-reduced-motion:reduce){.hx-p{opacity:1;transform:none;transition:none}}';
  document.head.appendChild(st);

  var d=document.createElement('div');
  d.id='hx-wrap';
  d.className='hx';
  d.innerHTML=''
  +'<div class="hx-head"><span class="hx-tag">🌟 عن منصة همة</span></div>'

  +'<div class="hx-p" style="--ac:#38bdf8;--d:.65s"><span class="hx-b">01</span><div class="hx-x">'
  +'<b>مجانية بالكامل</b>'
  +'<p>لا حسابات ولا اشتراكات ولا دفع. تموّل المنصة بإعلانات خفيفة لا تعيق المراجعة.</p>'
  +'</div></div>'

  +'<div class="hx-p" style="--ac:#fbbf24;--d:.8s"><span class="hx-b">02</span><div class="hx-x">'
  +'<b>مرتبة كما تدرس</b>'
  +'<p>الشعبة ← المادة ← الوحدة ← نوع المورد. تصل إلى ما تريده في خطوات قليلة.</p>'
  +'</div></div>'

  +'<div class="hx-p" style="--ac:#34d399;--d:.95s"><span class="hx-b">03</span><div class="hx-x">'
  +'<b>مصممة للهاتف</b>'
  +'<p>واجهة عربية خفيفة وسريعة، مع تنقل سفلي يسهل الوصول إليه بإبهام واحد.</p>'
  +'</div></div>'

  +'<div class="hx-p hx-note" style="--ac:#f59e0b;--d:1.1s"><span class="hx-b">⏳</span><div class="hx-x">'
  +'<p>المحتوى يُضاف تدريجيًا. الأقسام التي تحمل علامة «قيد الإضافة» جاهزة هيكليًا وسيُنشر فيها المحتوى الحقيقي فور تجهيزه</p>'
  +'</div></div>'

  +'<div class="hx-p" style="--ac:#93c5fd;--d:1.25s"><span class="hx-b">👨‍💻</span><div class="hx-x">'
  +'<b>المطور: داودي محمد جلال الدين</b>'
  +'</div></div>'

  +'<a class="hx-go" href="https://himma-sigma.vercel.app/" target="_blank" rel="noopener">زيارة منصة همة ←</a>';
  mb.appendChild(d);
})();
/* ===== 29) نافذة «تعرّف على المنصة»: عن همة في إطار شامل وبداخله اسطوانات ===== */
(function(){
  var mb=document.querySelector('#ov .mb');
  if(!mb) return;

  /* حذف النسخ القديمة (الكتلتان 27 و28) إن وُجدت */
  ['hm-card','hx-wrap'].forEach(function(id){
    var o=document.getElementById(id);
    if(o) o.remove();
  });
  if(document.getElementById('hf-wrap')) return;

  var st=document.createElement('style');
  st.textContent=''
  +'.hf{margin-top:22px;opacity:0;transform:translateY(16px);transition:opacity .55s ease .6s,transform .55s ease .6s}'
  +'.ov.show .hf{opacity:1;transform:none}'
  /* الإطار الشامل */
  +'.hf-frame{border-radius:34px;padding:18px 14px;background:linear-gradient(160deg,#0a1f45 0%,#050b18 60%,#010307 100%);border:2px solid rgba(148,187,255,.38);box-shadow:0 18px 40px rgba(0,8,30,.6),inset 0 1px 0 rgba(255,255,255,.08)}'
  +'.hf-head{text-align:center;margin-bottom:14px}'
  +'.hf-tag{display:inline-block;background:#fff;color:#0b2a5b;padding:6px 18px;border-radius:999px;font-weight:800;font-size:14.5px;box-shadow:0 6px 14px rgba(0,0,0,.25)}'
  +'.hf-list{display:grid;gap:10px}'
  /* الاسطوانات */
  +'.hf-p{display:flex;align-items:center;gap:12px;padding:11px 14px 11px 16px;border-radius:28px;text-align:right;color:#eaf2ff;'
  +'background:linear-gradient(135deg,#17407f 0%,#0c2350 55%,#071329 100%);border:1px solid rgba(148,187,255,.28);'
  +'box-shadow:0 8px 18px rgba(0,8,30,.4),inset 0 1px 0 rgba(255,255,255,.1);'
  +'opacity:0;transform:translateY(12px);transition:opacity .5s ease var(--d,.8s),transform .5s ease var(--d,.8s)}'
  +'.ov.show .hf-p{opacity:1;transform:none}'
  +'.hf-b{flex:none;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;direction:ltr;font-weight:800;font-size:15px;color:var(--ac,#38bdf8);background:rgba(255,255,255,.07);border:1.5px solid var(--ac,#38bdf8)}'
  +'.hf-x{min-width:0}'
  +'.hf-x b{display:block;font-size:15px;font-weight:800;line-height:1.5;color:#fff;text-shadow:none}'
  +'.hf-x p{margin:2px 0 0;font-size:13.5px;line-height:1.75;font-weight:500;color:#c3d6f3;text-shadow:none}'
  +'.hf-note .hf-x p{margin:0;color:#f6dca3;font-weight:600}'
  +'.hf-go{display:block;width:fit-content;margin:16px auto 0;background:#fff;color:#0b2a5b;padding:10px 26px;border-radius:999px;font-weight:800;font-size:14px;text-decoration:none;box-shadow:0 8px 18px rgba(0,0,0,.3)}'
  +'.hf-go:hover,.hf-go:focus-visible{background:#e6efff}'
  +'@media (prefers-reduced-motion:reduce){.hf,.hf-p{opacity:1;transform:none;transition:none}}';
  document.head.appendChild(st);

  var d=document.createElement('div');
  d.id='hf-wrap';
  d.className='hf';
  d.innerHTML=''
  +'<div class="hf-frame">'
  +'<div class="hf-head"><span class="hf-tag">🌟 عن منصة همة</span></div>'
  +'<div class="hf-list">'

  +'<div class="hf-p" style="--ac:#38bdf8;--d:.75s"><span class="hf-b">01</span><div class="hf-x">'
  +'<b>مجانية بالكامل</b>'
  +'<p>لا حسابات ولا اشتراكات ولا دفع. تموّل المنصة بإعلانات خفيفة لا تعيق المراجعة.</p>'
  +'</div></div>'

  +'<div class="hf-p" style="--ac:#fbbf24;--d:.9s"><span class="hf-b">02</span><div class="hf-x">'
  +'<b>مرتبة كما تدرس</b>'
  +'<p>الشعبة ← المادة ← الوحدة ← نوع المورد. تصل إلى ما تريده في خطوات قليلة.</p>'
  +'</div></div>'

  +'<div class="hf-p" style="--ac:#34d399;--d:1.05s"><span class="hf-b">03</span><div class="hf-x">'
  +'<b>مصممة للهاتف</b>'
  +'<p>واجهة عربية خفيفة وسريعة، مع تنقل سفلي يسهل الوصول إليه بإبهام واحد.</p>'
  +'</div></div>'

  +'<div class="hf-p hf-note" style="--ac:#f59e0b;--d:1.2s"><span class="hf-b">⏳</span><div class="hf-x">'
  +'<p>المحتوى يُضاف تدريجيًا. الأقسام التي تحمل علامة «قيد الإضافة» جاهزة هيكليًا وسيُنشر فيها المحتوى الحقيقي فور تجهيزه</p>'
  +'</div></div>'

  +'<div class="hf-p" style="--ac:#93c5fd;--d:1.35s"><span class="hf-b">👨‍💻</span><div class="hf-x">'
  +'<b>مؤسس ومطور منصة همة: داودي محمد جلال الدين</b>'
  +'</div></div>'

  +'</div>'
  +'<a class="hf-go" href="https://himma-sigma.vercel.app/" target="_blank" rel="noopener">زيارة منصة همة ←</a>'
  +'</div>';
  mb.appendChild(d);
})();
/* ===== 30) بطاقة «سلاسل الميزان» (PDF) للرياضيات والفيزياء والعلوم ===== */
(function(){
  var ser=document.querySelector('.b[data-t="ser"]');
  if(!ser) return;

  var sj=localStorage.getItem('mishkat_subject')||'';
  var SJ={'الرياضيات':'math','الفيزياء':'phys','العلوم':'sci'};
  var s=SJ[sj];
  if(!s) return;

  var br=localStorage.getItem('mishkat_branch')||'';
  var ch=localStorage.getItem('mishkat_chapter')||'';
  var BR={'علوم تجريبية':'se','رياضيات':'m','تقني رياضي':'tm','تسيير واقتصاد':'ge'};
  var b=BR[br]||'';

  function norm(x){
    return String(x||'')
      .replace(/[\u064B-\u065F\u0670]/g,'')
      .replace(/[أإآ]/g,'ا')
      .replace(/ى/g,'ي')
      .replace(/ة/g,'ه')
      .replace(/\s+/g,' ')
      .trim()
      .toLowerCase();
  }

  /* رمز كل درس، ويُتعرَّف عليه من كلمة داخل اسمه (الترتيب مهم) */
  var CODES={
    math:[['seq','المتتاليات'],['func','العدديه'],['exp','اسيه'],['ln','اللوغاريتميه'],['prob','الاحتمالات'],['complex','المركبه'],['div','القسمه'],['prim','الاصليه']],
    phys:[['ester','استره'],['time','الزمنيه'],['mech','الميكانيك'],['elec','كهرب'],['ph','توازن'],['ph','ph'],['nucl','النوويه'],['osc','اهتزاز']],
    sci:[['enz','التحفيز'],['photo','الضوئي'],['nerve','العصبي'],['imm','المناعه'],['struct','البنيه'],['prot','تركيب'],['resp','التنفس']]
  };
  var nm=norm(ch), code='', list=CODES[s];
  for(var i=0;i<list.length;i++){
    if(nm.indexOf(list[i][1])>-1){code=list[i][0];break;}
  }

  /* الملفات المحتملة بالترتيب: ملف الشعبة والدرس، ثم ملف الدرس، ثم ملف الشعبة والمادة، ثم ملف المادة */
  var cands=[];
  if(code){
    if(b) cands.push('ser-'+b+'-'+s+'-'+code+'.pdf');
    cands.push('ser-'+s+'-'+code+'.pdf');
  }
  if(b) cands.push('ser-'+b+'-'+s+'.pdf');
  cands.push('ser-'+s+'.pdf');

  /* نسخة جديدة من البطاقة بلا أي حدث قديم */
  var n2=ser.cloneNode(true);
  n2.removeAttribute('data-t');
  n2.setAttribute('data-g','ser');
  ser.replaceWith(n2);

  var toast=document.getElementById('toast'), tm;
  function note(){
    if(!toast) return;
    toast.textContent='سلاسل الميزان لدرس «'+ch+'» قيد الإعداد، وستُضاف قريباً ✨';
    toast.classList.add('on');
    clearTimeout(tm);
    tm=setTimeout(function(){toast.classList.remove('on');},2800);
  }

  n2.addEventListener('click',function(){
    (function tryNext(k){
      if(k>=cands.length){note();return;}
      fetch(cands[k],{method:'HEAD',cache:'no-store'}).then(function(r){
        if(r.ok){
          location.href='pdfview.html?f='+encodeURIComponent(cands[k])+'&t='+encodeURIComponent('سلاسل الميزان — '+ch);
        }else{tryNext(k+1);}
      }).catch(function(){tryNext(k+1);});
    })(0);
  });
})();
/* ===== 31) «سلاسل الميزان» تصبح «حقيبة عكاشة (فيديو)» ===== */
(function(){
  var card=document.querySelector('.b[data-t="ser"],.b[data-g="ser"]');
  if(!card) return;

  var sj=localStorage.getItem('mishkat_subject')||'';
  var ch=localStorage.getItem('mishkat_chapter')||'';
  var SJ={'الرياضيات':'math','الفيزياء':'phys','العلوم':'sci'};
  var s=SJ[sj]||'';
  var TITLE='حقيبة عكاشة (فيديو)';
  if(sj==='الفيزياء') return;
  /* ✏️ روابط حقيبة عكاشة: رمز الدرس : معرّف الفيديو (الجزء بعد youtu.be/ وقبل علامة ؟)
     رموز دروس الرياضيات: func exp ln seq prob complex div prim
     رموز دروس الفيزياء: time mech elec ph nucl ester osc */
  var OK={
    sci:{
      prot:'Lg7awTpB74s',
      struct:'hRmKwvYBK0o',
      enz:'b-PzhqsxESo',
      imm:'MCl6EpL0dWA',
      nerve:'Jlho7146fJw',
      photo:'sXE2BTy7tsY',
      resp:'sXE2BTy7tsY'
    },
    math:{},
    phys:{}
  };

  function norm(x){
    return String(x||'')
      .replace(/[\u064B-\u065F\u0670]/g,'')
      .replace(/[أإآ]/g,'ا')
      .replace(/ى/g,'ي')
      .replace(/ة/g,'ه')
      .replace(/\s+/g,' ')
      .trim()
      .toLowerCase();
  }

  /* رمز كل درس، ويُتعرَّف عليه من كلمة داخل اسمه (الترتيب مهم) */
  var CODES={
    math:[['seq','المتتاليات'],['func','العدديه'],['exp','اسيه'],['ln','اللوغاريتميه'],['prob','الاحتمالات'],['complex','المركبه'],['div','القسمه'],['prim','الاصليه']],
    phys:[['ester','استره'],['time','الزمنيه'],['mech','الميكانيك'],['elec','كهرب'],['ph','توازن'],['ph','ph'],['nucl','النوويه'],['osc','اهتزاز']],
    sci:[['enz','التحفيز'],['photo','الضوئي'],['nerve','العصبي'],['imm','المناعه'],['struct','البنيه'],['prot','تركيب'],['resp','التنفس']]
  };
  var id='';
  if(s){
    var nm=norm(ch), list=CODES[s], code='';
    for(var i=0;i<list.length;i++){
      if(nm.indexOf(list[i][1])>-1){code=list[i][0];break;}
    }
    id=(OK[s]&&OK[s][code])||'';
  }

  /* نسخة جديدة من البطاقة بلا أي حدث قديم، وباسم جديد */
  var n2=card.cloneNode(true);
  n2.removeAttribute('data-t');
  n2.setAttribute('data-g','okacha');
  var tw=document.createTreeWalker(n2,NodeFilter.SHOW_TEXT,null);
  var first=true, tn;
  while((tn=tw.nextNode())){
    if(!tn.nodeValue.trim()) continue;
    if(first){tn.nodeValue=TITLE;first=false;}else{tn.nodeValue='';}
  }
  card.replaceWith(n2);

  var toast=document.getElementById('toast'), tm;
  function note(){
    if(!toast) return;
    toast.textContent='حقيبة عكاشة لدرس «'+ch+'» قيد الإعداد، وستُضاف قريباً ✨';
    toast.classList.add('on');
    clearTimeout(tm);
    tm=setTimeout(function(){toast.classList.remove('on');},2800);
  }

  n2.addEventListener('click',function(){
    if(id){
      location.href='watch.html?v='+encodeURIComponent(id)+'&t='+encodeURIComponent(TITLE+' — '+ch);
    }else{note();}
  });
})();
/* ===== 32) بطاقة «التمارين» تصبح «التمارين والتصحيح» ===== */
(function(){
  var ex=document.querySelector('.b[data-t="ex"]');
  if(!ex) return;
  var tw=document.createTreeWalker(ex,NodeFilter.SHOW_TEXT,null);
  var first=true, t;
  while((t=tw.nextNode())){
    if(!t.nodeValue.trim()) continue;
    if(first){t.nodeValue='التمارين والتصحيح';first=false;}else{t.nodeValue='';}
  }
})();
/* ===== 33)بطاقة «التصحيح » تصبح «حقيبة  عكاشة» ===== */
(function(){
  var ex=document.querySelector('.b[data-t="ex"]');
  if(!ex) return;
  var tw=document.createTreeWalker(ex,NodeFilter.SHOW_TEXT,null);
  var first=true, t;
  while((t=tw.nextNode())){
    if(!t.nodeValue.trim()) continue;
    if(first){t.nodeValue='حقيية  عكاشة';first=false;}else{t.nodeValue='';}
  }
})();