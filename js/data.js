/* =========================================================
   Content you can easily edit
   ========================================================= */
const CONFIG = {
  name: 'Kia',
  birth: new Date('1992-11-13T00:00:00+05:30'),
  viberNumber: '+94762720808',   // thank-you messages go here
  fromName: 'TJ'        // shown in letters / wishes
};

const GALLERY = [
  { src:'a01', title:'The Sigiriya Queen', note:'Oil on canvas · a crown of lotus and gold', cat:'royal', frame:'' },
  { src:'a02', title:'Golden Hour Offering', note:'Oil on canvas · sunset over the ancient kingdom', cat:'royal', frame:'' },
  { src:'a03', title:'Crowned in Bronze', note:'Watercolour · strength and grace', cat:'royal', frame:'f2' },
  { src:'a05', title:'Simply Kia', note:'Oil on canvas · that smile', cat:'moments', frame:'f3' },
  { src:'a17', title:'The Songbird', note:'Oil on canvas · music in her hands', cat:'moments', frame:'' },
  { src:'a08', title:'Lakeside Breeze', note:'Oil on canvas · Lake District, England', cat:'uk', frame:'f3' },
  { src:'a04', title:'Sunlit Meadow', note:'Watercolour · English springtime', cat:'uk', frame:'' },
  { src:'a06', title:'Shadows on the Grass', note:'Watercolour · by the water', cat:'uk', frame:'f2' },
  { src:'a10', title:'Liverpool Waterfront', note:'Watercolour · Royal Liver Building', cat:'uk', frame:'' },
  { src:'a25', title:'Free as a Bird', note:'Watercolour · Pier Head, Liverpool', cat:'uk', frame:'f3' },
  { src:'a12', title:'Stone & Denim', note:'Oil on canvas · old-town walls', cat:'uk', frame:'' },
  { src:'a14', title:'The Heights of Abraham', note:'Oil on canvas · Peak District', cat:'uk', frame:'f2' },
  { src:'a13', title:'Among the Roses', note:'Watercolour · a garden in bloom', cat:'uk', frame:'' },
  { src:'a15', title:'Daydreaming', note:'Watercolour · lying in the grass', cat:'moments', frame:'f3' },
  { src:'a29', title:'The Bridge', note:'Oil on canvas · arches of iron', cat:'uk', frame:'' },
  { src:'a22', title:'Woodland Pause', note:'Oil on canvas · dappled light', cat:'moments', frame:'f2' },
  { src:'a31', title:'Roman Holiday', note:'Watercolour · the Colosseum, Rome', cat:'europe', frame:'' },
  { src:'a37', title:'Parisian Autumn', note:'Oil on canvas · Eiffel Tower, Paris', cat:'europe', frame:'f3' },
  { src:'a35', title:'By the Seine', note:'Oil on canvas · Paris', cat:'europe', frame:'' },
  { src:'a36', title:'Golden Leaves', note:'Watercolour · an autumn walk in Paris', cat:'europe', frame:'f2' },
  { src:'a19', title:'The Professional', note:'Watercolour · at work', cat:'moments', frame:'' },
  { src:'a09', title:'Spring Flower', note:'Watercolour · a daisy and a smile', cat:'moments', frame:'f3' },
  { src:'a20', title:'Ruby Hat', note:'Oil on canvas · winter style', cat:'moments', frame:'' },
  { src:'a21', title:'Seaside Ride', note:'Watercolour · sand and sea air', cat:'moments', frame:'f2' },
  { src:'a32', title:'Home Sweet Home', note:'Oil on canvas · mint and denim', cat:'moments', frame:'' },
  { src:'a33', title:'Pretty in Pink', note:'Watercolour · cosy days', cat:'moments', frame:'f3' }
];

const WISHES = [
  { ico:'🎓', title:'Education', sub:'For the scholar in you', grad:'linear-gradient(135deg,#ff6fa8,#c95bd6)',
    text:'May your love of learning never fade. Statistics, digital marketing and whatever you choose next: may every new subject open a door to something even more wonderful.' },
  { ico:'💼', title:'Profession', sub:'For the career queen', grad:'linear-gradient(135deg,#7b5cc9,#b38cf5)',
    text:'May your work bring you pride, purpose and recognition. May every project succeed, every goal be beaten, and may you lead teams and brands to heights they never imagined.' },
  { ico:'🌟', title:'Life Goals', sub:'For every dream on your list', grad:'linear-gradient(135deg,#e9a35a,#ff6fa8)',
    text:'May every dream you’ve written down, and the ones you’ve only whispered, come true one by one. May 34 be the year you surprise even yourself.' },
  { ico:'✈️', title:'Travel', sub:'For the globetrotter', grad:'linear-gradient(135deg,#4fa3d9,#9d7cf0)',
    text:'Sri Lanka, the UK, France, Italy… and so many more to go. May your passport fill up with stamps and your heart with sunsets in places you’ve only dreamed of.' },
  { ico:'💖', title:'Happiness', sub:'For your beautiful heart', grad:'linear-gradient(135deg,#ff8fb8,#ffb38a)',
    text:'May your days be full of laughter, your evenings calm, and your life full of people who love you as much as you deserve.' },
  { ico:'🌿', title:'Health', sub:'For your wellbeing', grad:'linear-gradient(135deg,#43b98a,#7ad3b0)',
    text:'Wishing you strength, energy and peace of mind: a healthy body and a happy soul to enjoy every adventure ahead.' },
  { ico:'💰', title:'Prosperity', sub:'For abundance', grad:'linear-gradient(135deg,#c99a55,#e9c37a)',
    text:'May success and abundance follow you everywhere, and may you always have enough to live fully, give generously and travel freely.' },
  { ico:'🤝', title:'Friendship', sub:'From me to you', grad:'linear-gradient(135deg,#d65db1,#ff9671)',
    text:'Thank you for being such a wonderful friend. Here’s to many more years of laughs, stories and memories together. Happy birthday, Kia!' }
];

const MARQUEE = ['Happy Birthday Kia','34 & Fabulous','1992 → 2026','Queen of Her Story','Kalutara to the World','Statistician','Digital Marketer','Globetrotter','Forever Young','Shine On'];

/* tab -> destination for the flight transition */
const ROUTES = {
  home:      { code:'CMB', city:'Colombo',          country:'Sri Lanka', label:'Home' },
  journey:   { code:'LHR', city:'London',           country:'UK',        label:'Her Story' },
  gallery:   { code:'CDG', city:'Paris',            country:'France',    label:'The Gallery' },
  wishes:    { code:'FCO', city:'Rome',             country:'Italy',     label:'The Wishing Fountain' },
  about:     { code:'MAN', city:'Manchester',       country:'UK',        label:'All About Kia' },
  surprises: { code:'MLV', city:'Marne-la-Vallée',  country:'Disneyland Paris', label:'The Surprises' },
  thanks:    { code:'CMB', city:'Colombo',          country:'Sri Lanka', label:'Say Thanks' }
};
