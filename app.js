const origin='https://usr-food-safety-hub.ci-opt.chatgpt.site';

const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.site-header nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));

const slides=[
  ['1','於食品實習教室拍攝食品科學系招生宣傳影片，呈現師生教學與實作過程。'],
  ['2','社區長輩完成醃漬鳳梨製作後，開心展示成品並合影留念。'],
  ['3','授課講師指導社區長輩操作糖度計，學習測量食品糖度。'],
  ['4','授課講師於新埔下寮社區講解食品保存概念與食品安全知識。'],
  ['5','元培科大食品科學系學生向社區長輩講解潔淨標章的意義與分類。'],
  ['6','員山社區長輩動手製作醃漬鳳梨，體驗食品加工與保存方法。'],
  ['7','員山社區長輩動手處理鳳梨，準備製作醃漬鳳梨。'],
  ['8','員山社區長輩將鳳梨與醃漬材料裝入瓶中，完成醃漬鳳梨製作。']
];
let slideIndex=0;
const slideImage=document.querySelector('#slide-image'),slideCaption=document.querySelector('#slide-caption'),slideCount=document.querySelector('#slide-count'),slideDots=document.querySelector('#slide-dots');
slides.forEach((_,index)=>{const button=document.createElement('button');button.setAttribute('aria-label',`查看第 ${index+1} 張`);button.addEventListener('click',()=>showSlide(index));slideDots.append(button)});
function showSlide(index){slideIndex=(index+slides.length)%slides.length;slideImage.src=`${origin}/api/impact-slides/${slides[slideIndex][0]}`;slideCaption.textContent=slides[slideIndex][1];slideCount.textContent=`${slideIndex+1} / ${slides.length}`;[...slideDots.children].forEach((dot,i)=>dot.classList.toggle('active',i===slideIndex))}
document.querySelector('#slide-prev').addEventListener('click',()=>showSlide(slideIndex-1));
document.querySelector('#slide-next').addEventListener('click',()=>showSlide(slideIndex+1));
showSlide(0);setInterval(()=>showSlide(slideIndex+1),5000);

const topics=[
  {tab:'食品添加物',number:'01',question:'成分表很長，就代表食品比較不健康嗎？',answer:'不能只看字數判斷。更重要的是了解用途、合法使用範圍，以及自己的飲食頻率與份量。',points:['先看原料排列順序','了解添加物的功能','回到整體飲食評估'],note:'科普內容可由計畫團隊審定後替換'},
  {tab:'食品標示',number:'02',question:'零添加、天然、無糖，看到這些字就能放心嗎？',answer:'先別急著只看包裝正面。翻到營養標示與成分欄，確認每份量、糖與鈉，才是完整判讀。',points:['確認每份與本包裝份數','比較每 100 公克數值','檢查過敏原資訊'],note:'內容示例，正式版可連結完整文章'},
  {tab:'保存與期限',number:'03',question:'過了有效日期一天，食品一定立刻壞掉嗎？',answer:'日期只是判讀的一部分。未開封、開封後、保存溫度與食品類型，都會影響是否適合食用。',points:['依包裝條件正確保存','開封後重新計算風險','有異味或異狀就不食用'],note:'涉及安全疑慮時，以官方指引為準'}
];
let topicIndex=0,tutorialStep=0;
const tabs=document.querySelector('#topic-tabs'),question=document.querySelector('#topic-question'),answer=document.querySelector('#topic-answer'),points=document.querySelector('#topic-points'),note=document.querySelector('#topic-note');
topics.forEach((topic,index)=>{const button=document.createElement('button');button.innerHTML=`<span>${topic.number}</span> ${topic.tab}`;button.addEventListener('click',()=>renderTopic(index));tabs.append(button)});
function renderTopic(index){topicIndex=index;const topic=topics[index];[...tabs.children].forEach((button,i)=>button.classList.toggle('active',i===index));question.textContent=topic.question;answer.textContent=topic.answer;points.innerHTML=topic.points.map(point=>`<li>${point}</li>`).join('');note.textContent=topic.note}
renderTopic(0);

const tutorialDialog=document.querySelector('#tutorial-dialog'),tutorialCount=document.querySelector('#tutorial-count'),tutorialTitle=document.querySelector('#tutorial-title'),tutorialText=document.querySelector('#tutorial-text');
const tutorialTexts=['先找到包裝上與這個重點有關的資訊，慢慢看，不必先被陌生名詞或醒目宣稱嚇到。','把名稱、用途、份量與實際食用情境一起理解，再比較相關數值。','用最後一個重點做總整理，再判斷這項食品是否符合自己與家人的需求。'];
function renderTutorial(){const topic=topics[topicIndex];tutorialCount.textContent=`STEP ${tutorialStep+1} / 3｜${topic.tab}`;tutorialTitle.textContent=topic.points[tutorialStep];tutorialText.textContent=tutorialTexts[tutorialStep];document.querySelector('#tutorial-prev').disabled=tutorialStep===0;document.querySelector('#tutorial-next').textContent=tutorialStep===2?'完成':'下一步 →'}
function openTutorial(index=topicIndex){renderTopic(index);tutorialStep=0;renderTutorial();tutorialDialog.showModal()}
document.querySelector('#tutorial-start').addEventListener('click',()=>openTutorial());
document.querySelectorAll('.science-card').forEach(card=>card.addEventListener('click',()=>{document.querySelector('#knowledge').scrollIntoView();setTimeout(()=>openTutorial(Number(card.dataset.topic)),350)}));
document.querySelector('#tutorial-prev').addEventListener('click',()=>{tutorialStep=Math.max(0,tutorialStep-1);renderTutorial()});
document.querySelector('#tutorial-next').addEventListener('click',()=>{if(tutorialStep===2)tutorialDialog.close();else{tutorialStep++;renderTutorial()}});

const stories=[
  {label:'其他',title:'EP01｜食科系學生的一天',text:'你以為食科系每天都在吃東西？\n其實從糖度、酸度、水分，到溫度與品質，每一項都要靠數據來判斷。',video:`${origin}/api/media/1`,meta:'食品為什麼好吃、為什麼安全、又為什麼能保存。'},
  {label:'其他',title:'EP02｜食科系的實驗課',text:'你以為做軟糖只是把材料加一加？\n配方比例、加熱溫度、pH 到凝固時間，每一步都會影響口感與品質。',video:`${origin}/api/media/2`,meta:'食科實驗課不只做出來，還要知道它為什麼成功。'},
  {label:'其他',title:'EP03｜食品加工：味覺大挑戰',text:'低添加一定比較好？有添加就一定不好嗎？\n從軟糖盲測、口感與彈性，認識食品添加物真正的作用。',video:`${origin}/api/media/3`,meta:'重點是功能、用量與合法使用。'},
  {label:'其他',title:'EP04｜食品檢驗',text:'食品看起來正常，就代表沒問題嗎？\n從油品檢驗到酸價分析，食品安全背後都是檢測與數據。',video:`${origin}/api/media/4`,meta:'食品安全不是靠運氣，是靠檢驗守住的。'}
];
const storyList=document.querySelector('#story-list'),storyDialog=document.querySelector('#story-dialog');
function renderStories(category='全部'){const visible=category==='全部'?stories:stories.filter(story=>story.label===category);storyList.innerHTML='';visible.forEach((story,index)=>{const button=document.createElement('button');button.className='story-card';button.innerHTML=`<span class="story-visual">EP ${String(index+1).padStart(2,'0')}</span><div><small>${story.label}</small><h3>${story.title}</h3><p>${story.text}</p></div><i>›</i>`;button.addEventListener('click',()=>openStory(story));storyList.append(button)})}
function openStory(story){document.querySelector('#story-label').textContent=story.label;document.querySelector('#story-title').textContent=story.title;document.querySelector('#story-text').textContent=story.text;document.querySelector('#story-meta').textContent=story.meta;document.querySelector('#story-video').href=story.video;storyDialog.showModal()}
document.querySelectorAll('.story-filter button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.story-filter button').forEach(item=>item.classList.remove('active'));button.classList.add('active');renderStories(button.dataset.category)}));
renderStories();

document.querySelectorAll('dialog .dialog-close').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()}));
