/* ===== Arabic translation (English is the default) ===== */
let LANG = "en";
const L = (en, ar) => (LANG === "ar" ? ar : en);
const fmt = n => LANG === "ar" ? n.toLocaleString("en-US") + " شلن" : "UGX " + n.toLocaleString("en-UG");

const AR = {
  "Skip to content":"انتقل إلى المحتوى",
  "Call 0779 493 747":"اتصل 0779 493 747",
  "Behind Shell Kabalagala, Ggaba Road":"خلف محطة شل كابالاغالا، طريق غابا",
  "Your order":"طلبك",
  "About":"من نحن","Menu":"القائمة","Gallery":"المعرض","Reviews":"التقييمات","Book":"احجز","Find us":"موقعنا","Contact":"اتصل بنا","Order Now":"اطلب الآن",
  "Shawarma, pizza, platters and fresh food in Kabalagala":"شاورما وبيتزا وأطباق مشتركة ووجبات طازجة في كابالاغالا",
  "Fresh, tasty and affordable. Dine-in, takeaway and fast delivery in Kabalagala. Open daily, 8am to 11pm.":"طازج ولذيذ وبسعر مناسب. تناول طعامك في المطعم أو خذه معك أو اطلبه بتوصيل سريع في كابالاغالا. نفتح يومياً من 8 صباحاً حتى 11 مساءً.",
  "View Menu":"عرض القائمة",
  "Order on WhatsApp":"اطلب عبر واتساب",
  "Friday Platter Offer.":"عرض طبق الجمعة.",
  "UGX 35,000 instead of 40,000. Chicken, chips, sausages and drinks for 4.":"35,000 شلن بدلاً من 40,000. دجاج وبطاطس ونقانق ومشروبات لأربعة أشخاص.",
  "Get the offer":"احصل على العرض",
  "About us":"من نحن",
  "Behind Shell Kabalagala, Ggaba Road, Kampala":"خلف محطة شل كابالاغالا، طريق غابا، كمبالا",
  "Fresh mango smoothie, made to order.":"سموذي مانجو طازج، يُحضَّر عند الطلب.",
  "Kabalagala Bites is your neighbourhood spot for fresh shawarma, roast chicken, grilled fish, pizza, burgers, platters and hearty breakfast plates. We cook fresh daily and serve with love.":"Kabalagala Bites هو مطعم الحيّ المفضل لديكم للشاورما الطازجة والدجاج المشوي والسمك المشوي والبيتزا والبرغر والأطباق المشتركة ووجبات الفطور الشهية. نطبخ طازجاً كل يوم ونقدّم بكل حب.",
  "Whether you are passing by Ggaba Road or ordering from home, we deliver hot and fast. Add your dishes to your order, send them on WhatsApp, and we get cooking.":"سواء كنت مارّاً بطريق غابا أو تطلب من المنزل، نوصّل لك طعاماً ساخناً وبسرعة. أضف أطباقك إلى طلبك وأرسلها عبر واتساب ونبدأ بالطبخ.",
  "dishes on the menu":"طبقاً في القائمة","days open every week":"أيام عمل أسبوعياً","minutes, usual prep time":"دقيقة، وقت التحضير المعتاد","menu sections":"أقسام في القائمة",
  "See the menu":"شاهد القائمة","Book a table":"احجز طاولة",
  "Open daily":"مفتوح يومياً","8am to 11pm, 7 days a week":"من 8 صباحاً حتى 11 مساءً، 7 أيام في الأسبوع",
  "Fresh daily":"طازج كل يوم","Cooked fresh, never frozen":"مطبوخ طازجاً وليس مجمّداً",
  "Dine-in and takeaway":"داخل المطعم أو سفري","Delivery inside Kabalagala":"توصيل داخل كابالاغالا",
  "Our menu":"قائمتنا",
  "Tap Order and WhatsApp opens with your choice already written.":"اضغط على اطلب ليُفتح واتساب ورسالتك جاهزة باختيارك.",
  "All":"الكل","Breakfast":"الفطور","Local dishes":"أطباق محلية","Fast food and platters":"وجبات سريعة وأطباق مشتركة","Drinks":"المشروبات",
  "Sort by":"ترتيب حسب","Menu order":"ترتيب القائمة","Price: low to high":"السعر: من الأقل إلى الأعلى","Price: high to low":"السعر: من الأعلى إلى الأقل",
  "Nothing matches your search. Try another word or tap All.":"لا توجد نتائج مطابقة لبحثك. جرّب كلمة أخرى أو اضغط على الكل.",
  "Why choose us":"لماذا تختارنا",
  "Fast service":"خدمة سريعة","Order in 2 minutes, ready in 15":"اطلب خلال دقيقتين ويكون جاهزاً خلال 15 دقيقة",
  "Fresh ingredients":"مكوّنات طازجة","Bought fresh every morning":"تُشترى طازجة كل صباح",
  "Affordable":"أسعار مناسبة","A full meal from UGX 10,000":"وجبة كاملة تبدأ من 10,000 شلن",
  "Delivery":"التوصيل","Anywhere in Kabalagala":"إلى أي مكان في كابالاغالا",
  "How to order":"كيف تطلب",
  "Pick your food.":"اختر طعامك.","Choose from the menu.":"اختر من القائمة.",
  "Tap Order.":"اضغط اطلب.","WhatsApp opens with your message ready.":"يُفتح واتساب ورسالتك جاهزة.",
  "Send it.":"أرسلها.","We confirm the time and your food is on the way.":"نؤكد لك الوقت وطعامك في الطريق.",
  "Delivery, payment and hours":"التوصيل والدفع وساعات العمل",
  "We deliver around Kabalagala, Muyenga, Ggaba Road and Kansanga. The delivery fee depends on distance and is confirmed on WhatsApp before we leave.":"نوصّل إلى كابالاغالا ومويينغا وطريق غابا وكانسانغا. تعتمد رسوم التوصيل على المسافة ونؤكدها لك عبر واتساب قبل أن نغادر.",
  "Payment":"الدفع",
  "Pay cash on pickup or delivery, or send MTN Mobile Money or Airtel Money. Ask us for the number when you confirm your order.":"ادفع نقداً عند الاستلام أو التوصيل، أو أرسل المبلغ عبر MTN Mobile Money أو Airtel Money. اطلب منا الرقم عند تأكيد طلبك.",
  "Opening hours":"ساعات العمل",
  "What customers say":"ماذا يقول عملاؤنا",
  "Best platter in Kabalagala! I order every Friday.":"أفضل طبق في كابالاغالا! أطلبه كل يوم جمعة.",
  "Shawarma is so fresh, delivery was very fast.":"الشاورما طازجة جداً والتوصيل كان سريعاً.",
  "Good prices, clean place, friendly staff.":"أسعار جيدة ومكان نظيف وموظفون ودودون.",
  "The breakfast plate is huge. Perfect before work.":"طبق الفطور كبير جداً. مثالي قبل العمل.",
  "I ordered on WhatsApp and it was ready in 15 minutes.":"طلبت عبر واتساب وكان جاهزاً خلال 15 دقيقة.",
  "Aisha N.":"عائشة ن.","Daniel K.":"دانيال ك.","Grace M.":"غريس م.","Brian S.":"براين س.","Ritah A.":"ريتا أ.",
  "Address":"العنوان",
  "Behind Shell Kabalagala, Ggaba Road, Kabalagala, Kampala":"خلف محطة شل كابالاغالا، طريق غابا، كابالاغالا، كمبالا",
  "Hours":"ساعات العمل","Monday to Sunday, 8am to 11pm":"من الاثنين إلى الأحد، من 8 صباحاً حتى 11 مساءً",
  "Phone":"الهاتف","Get Directions":"احصل على الاتجاهات",
  "Coming with family or friends? Tell us when and how many, and we will keep a table for you.":"قادم مع العائلة أو الأصدقاء؟ أخبرنا بالموعد وعدد الأشخاص وسنحجز لك طاولة.",
  "We confirm your booking on WhatsApp.":"نؤكد حجزك عبر واتساب.",
  "Groups of 8 or more, please book a day before.":"للمجموعات من 8 أشخاص فأكثر، يُرجى الحجز قبل يوم.",
  "Your name":"اسمك","Phone number":"رقم الهاتف","Date":"التاريخ","Time":"الوقت","Number of people":"عدد الأشخاص","Book on WhatsApp":"احجز عبر واتساب",
  "Questions people ask":"أسئلة يطرحها الناس",
  "How do I order?":"كيف أطلب؟",
  "Tap Order now on any dish, or add several dishes to your order and send them together on WhatsApp.":"اضغط اطلب الآن على أي طبق، أو أضف عدة أطباق إلى طلبك وأرسلها معاً عبر واتساب.",
  "How long does food take?":"كم يستغرق تجهيز الطعام؟",
  "Most orders are ready in about 15 minutes. Delivery time depends on how far you are.":"تكون معظم الطلبات جاهزة خلال 15 دقيقة تقريباً. ويعتمد وقت التوصيل على بُعد مكانك.",
  "Do you deliver?":"هل توصّلون؟",
  "Yes, inside Kabalagala and nearby areas. The fee is confirmed on WhatsApp.":"نعم، داخل كابالاغالا والمناطق القريبة. ونؤكد الرسوم عبر واتساب.",
  "Can I pay with Mobile Money?":"هل يمكنني الدفع عبر Mobile Money؟",
  "Yes. We accept cash, MTN Mobile Money and Airtel Money.":"نعم. نقبل الدفع نقداً وعبر MTN Mobile Money وAirtel Money.",
  "Do you cook for parties and offices?":"هل تجهّزون طعاماً للحفلات والمكاتب؟",
  "Yes. Message us the number of people and the date and we will send you a price.":"نعم. أرسل لنا عدد الأشخاص والتاريخ وسنرسل لك السعر.",
  "Get offers on WhatsApp":"احصل على العروض عبر واتساب",
  "Leave your number and we will message you when there is a new offer. No spam.":"اترك رقمك وسنراسلك عند وجود عرض جديد. بدون إزعاج.",
  "Join the list":"انضم إلى القائمة",
  "Contact us":"اتصل بنا","Call, WhatsApp or send a message.":"اتصل أو راسلنا عبر واتساب أو أرسل رسالة.",
  "Phone:":"الهاتف:","WhatsApp:":"واتساب:","Chat with us":"تحدث معنا",
  "Instagram: @kabalagalabites":"إنستغرام: @kabalagalabites","Facebook: Kabalagala Bites":"فيسبوك: Kabalagala Bites","TikTok: @kabalagalabites":"تيك توك: @kabalagalabites",
  "Your message":"رسالتك","Send on WhatsApp":"أرسل عبر واتساب",
  "Home":"الرئيسية",
  "Open daily 8am to 11pm | Ggaba Road, Kabalagala":"مفتوح يومياً من 8 صباحاً حتى 11 مساءً | طريق غابا، كابالاغالا",
  "Kabalagala Bites. All rights reserved.":"Kabalagala Bites. جميع الحقوق محفوظة.",
  "Share this website":"شارك هذا الموقع","Powered by":"تطوير",
  "Konda Joseph Konda - Web Developer":"Konda Joseph Konda - مطوّر مواقع",
  "Pickup":"استلام","Total":"المجموع",
  "Delivery fee is confirmed with you on WhatsApp.":"نؤكد لك رسوم التوصيل عبر واتساب.",
  "Send order on WhatsApp":"أرسل الطلب عبر واتساب","Clear order":"مسح الطلب",
  "What would you like?":"ماذا تودّ أن تطلب؟","View your order":"عرض طلبك","Just chat with us":"فقط تحدث معنا",
  "Quantity":"الكمية","Add to order":"أضف إلى الطلب",
  /* new features */
  "Favourites":"المفضلة","Vegetarian":"نباتي","Spicy":"حار","Cash":"نقداً","When":"الموعد","As soon as possible":"في أقرب وقت ممكن","Choose a time":"اختر وقتاً",
  "Repeat my last order":"كرر طلبي الأخير","Street, house or landmark":"الشارع أو المنزل أو معلم قريب","Share my location":"شارك موقعي",
  "Notes or allergies (optional)":"ملاحظات أو حساسية (اختياري)","Promo code":"رمز الخصم","Apply":"تطبيق",
  "Allergies? Tell us when you order.":"لديك حساسية؟ أخبرنا عند الطلب.","Delivery or pickup":"توصيل أو استلام","Payment method":"طريقة الدفع","Planned time":"الوقت المطلوب",
  "Save to favourites":"أضف إلى المفضلة","Filter the menu":"تصفية القائمة",
  /* attributes */
  "Switch colour theme":"تغيير لون الموقع","Open your order":"افتح طلبك","Open menu":"افتح القائمة",
  "Roast chicken ready to serve at Kabalagala Bites":"دجاج مشوي جاهز للتقديم في Kabalagala Bites",
  "A fresh mango smoothie, one of our most loved drinks":"سموذي مانجو طازج، من أكثر مشروباتنا حباً",
  "Search the menu, for example pizza":"ابحث في القائمة، مثلاً بيتزا","Search the menu":"ابحث في القائمة",
  "Chicken shawarma on the spit":"شاورما دجاج على السيخ","Loaded pizza":"بيتزا محمّلة بالإضافات",
  "Fresh ginger and lemon drink":"مشروب الزنجبيل والليمون الطازج","Grilled fish with lemon":"سمك مشوي مع الليمون",
  "Fresh mango smoothie":"سموذي مانجو طازج","Beef burger":"برغر لحم",
  "Customer reviews":"تقييمات العملاء","Previous review":"التقييم السابق","Next review":"التقييم التالي",
  "Kabalagala Bites on Google Maps":"Kabalagala Bites على خرائط جوجل","Your phone number":"رقم هاتفك",
  "Back to top":"العودة للأعلى","Close your order":"أغلق الطلب","Delivery area or landmark":"منطقة التوصيل أو معلم قريب",
  "Photo":"صورة","Close photo":"أغلق الصورة","Close":"إغلاق","One less":"واحد أقل","One more":"واحد أكثر"
};
const AR_MENU = {
  "Eggs and Chapati Plate":{name:"طبق البيض والشاباتي",desc:"بيض مقلي مع طماطم طازجة وخبز شاباتي طري."},
  "Chapati and Tomato Sauce":{name:"شاباتي بصلصة الطماطم",desc:"شاباتي ساخن متعدد الطبقات مع صلصة الطماطم والبصل الحارة."},
  "Beef Burger":{name:"برغر لحم",desc:"قطعة لحم بقري طرية مع الجبن والطماطم الطازجة والبطاطس."},
  "Afternoon Tea Set":{name:"طقم شاي بعد الظهر",desc:"إبريق شاي مع أكواب ومأكولات خفيفة للمشاركة."},
  "Roast Chicken":{name:"دجاج مشوي",desc:"دجاجة كاملة مشوية بلون ذهبي مع الأعشاب والتوابل."},
  "Beef Stew and Rice":{name:"يخنة لحم مع الأرز",desc:"يخنة مطهوة ببطء مع الجزر، تُقدَّم مع الأرز."},
  "Roast Pork":{name:"لحم خنزير مشوي",desc:"لحم خنزير مشوي ببطء مع الأعشاب، يُقطَّع حسب الطلب."},
  "Grilled Fish":{name:"سمك مشوي",desc:"سمك مشوي بالأعشاب والليمون والفلفل الحار، يُقدَّم طازجاً."},
  "Chicken Shawarma":{name:"شاورما دجاج",desc:"دجاج طري يُقطَّع طازجاً من السيخ مع صلصة الثوم."},
  "Cheese Pizza (Medium)":{name:"بيتزا جبن (وسط)",desc:"بيتزا ساخنة بجبن ذائب ممطوط."},
  "Chicken Pizza (Large)":{name:"بيتزا دجاج (كبيرة)",desc:"بيتزا كبيرة بجبن مضاعف وإضافات طازجة."},
  "Family Platter":{name:"الطبق العائلي",desc:"طبق كبير للمشاركة من اللحم والمقبلات والصلصات لأربعة أشخاص."},
  "Fresh Fruit Juice":{name:"عصير فواكه طازج",desc:"يُعصَر طازجاً من فواكه الموسم."},
  "Ginger Lemon Ice Tea":{name:"شاي مثلج بالزنجبيل والليمون",desc:"شاي مثلج مع زنجبيل وليمون طازجين."},
  "Mango Smoothie":{name:"سموذي مانجو",desc:"كثيف وبارد ومصنوع من المانجو الناضج."}
};
const dn = n => (LANG === "ar" && AR_MENU[n] ? AR_MENU[n].name : n);
const dd = i => (LANG === "ar" && AR_MENU[i.name] ? AR_MENU[i.name].desc : i.desc);
const EN_TITLE = document.title, EN_DESC = document.querySelector('meta[name="description"]').content;
const AR_TITLE = "Kabalagala Bites | شاورما وبيتزا ووجبات طازجة في كابالاغالا، كمبالا";
const AR_DESC = "قائمة كاملة بالأسعار، اطلب عبر واتساب، وتجدنا خلف محطة شل كابالاغالا، طريق غابا.";

/* Swap every fixed piece of text and attribute on the page */
const SKIP = "#menuGrid,#omGrid,#omChips,#cartItems,#hoursTable,#dmName,#dmDesc,#dmPrice,#dmTag,#countdown,#openStatus,#offerBadge,#cartTotal,#cartCount,#dots,#statDishes,.stat b,script,style,noscript,#dmQty,.error,#toast,#themeBtn,#langBtn,#sums,#eta,#locStatus,#cAreaSel";
const origText = new WeakMap();
function translateStatic(){
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), nodes = [];
  while (w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n => {
    const p = n.parentElement; if (!p || p.closest(SKIP)) return;
    if (!origText.has(n)) { const k = n.nodeValue.trim(); if (!k || !(k in AR)) return; origText.set(n, n.nodeValue); }
    const o = origText.get(n), k = o.trim();
    n.nodeValue = LANG === "ar" ? o.replace(k, AR[k]) : o;
  });
  document.querySelectorAll("[placeholder],[aria-label],[alt],[title]").forEach(el => {
    if (el.closest(SKIP)) return;
    ["placeholder", "aria-label", "alt", "title"].forEach(a => {
      const v = el.getAttribute(a); if (v === null) return;
      const key = "o_" + a.replace("-", "_");
      if (el.dataset[key] === undefined) { if (!(v in AR)) return; el.dataset[key] = v; }
      el.setAttribute(a, LANG === "ar" ? AR[el.dataset[key]] : el.dataset[key]);
    });
  });
  document.title = LANG === "ar" ? AR_TITLE : EN_TITLE;
  document.querySelector('meta[name="description"]').content = LANG === "ar" ? AR_DESC : EN_DESC;
}
