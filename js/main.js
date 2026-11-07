/* ===== EDIT FOR EACH RESTAURANT ===== */
const CONFIG = {
  name: "Kabalagala Bites",
  whatsapp: "256779493747",   // international format: no + and no leading 0
  openHour: 8,                // 8am
  closeHour: 23,              // 11pm
  timezone: "Africa/Kampala"
};
const MENU = [
  { name:"Eggs and Chapati Plate", veg:true, cat:"Breakfast", price:8000, img:"1", desc:"Fried eggs with fresh tomatoes and soft chapati." },
  { name:"Chapati and Tomato Sauce", veg:true, spicy:true, cat:"Breakfast", price:5000, img:"2", desc:"Hot layered chapati with spicy tomato and onion sauce." },
  { name:"Beef Burger", popular:true, cat:"Fast food and platters", price:15000, img:"3", desc:"Juicy beef patty, cheese, fresh tomato and fries." },
  { name:"Afternoon Tea Set", cat:"Drinks", price:12000, img:"4", desc:"A pot of tea with cups and small bites to share." },
  { name:"Roast Chicken", cat:"Local dishes", price:25000, img:"5", desc:"Whole chicken roasted golden with herbs and spices." },
  { name:"Beef Stew and Rice", cat:"Local dishes", price:14000, img:"6", desc:"Slow-cooked stew with carrots, served with rice." },
  { name:"Roast Pork", cat:"Local dishes", price:18000, img:"7", desc:"Slow-roasted pork with herbs, sliced to order." },
  { name:"Grilled Fish", spicy:true, cat:"Local dishes", price:28000, img:"8", desc:"Fish grilled with herbs, lemon and chilli, served fresh." },
  { name:"Chicken Shawarma", popular:true, cat:"Fast food and platters", price:16000, img:"9", desc:"Juicy chicken cut fresh from the spit with garlic sauce." },
  { name:"Cheese Pizza (Medium)", cat:"Fast food and platters", price:25000, img:"10", desc:"Hot pizza with stretchy melted cheese." },
  { name:"Chicken Pizza (Large)", popular:true, cat:"Fast food and platters", price:35000, img:"11", desc:"Large pizza, double cheese and fresh toppings." },
  { name:"Family Platter", cat:"Fast food and platters", price:35000, was:40000, tag:"Friday offer", img:"12", desc:"A big shared platter of meat, sides and sauces for 4." },
  { name:"Fresh Fruit Juice", veg:true, cat:"Drinks", price:8000, img:"13", desc:"Pressed fresh from seasonal fruits." },
  { name:"Ginger Lemon Ice Tea", veg:true, cat:"Drinks", price:6000, img:"14", desc:"Iced tea with fresh ginger and lemon." },
  { name:"Mango Smoothie", veg:true, cat:"Drinks", price:6000, img:"15", desc:"Thick, cold and made from ripe mangoes." }
];

/* Delivery areas and fees (UGX). Edit for each restaurant. fee:null = confirmed on WhatsApp */
const AREAS = [
  { id:"kabalagala", en:"Kabalagala", ar:"كابالاغالا", fee:3000 },
  { id:"kansanga", en:"Kansanga", ar:"كانسانغا", fee:4000 },
  { id:"muyenga", en:"Muyenga", ar:"مويينغا", fee:5000 },
  { id:"ggaba", en:"Ggaba Road", ar:"طريق غابا", fee:5000 },
  { id:"bunga", en:"Bunga", ar:"بونغا", fee:6000 },
  { id:"other", en:"Other area (fee confirmed on WhatsApp)", ar:"منطقة أخرى (نؤكد الرسوم عبر واتساب)", fee:null }
];
const MIN_DELIVERY = 15000;                 // smallest order we deliver
const PROMOS = { WELCOME10: { pct: 10 } };  // promo codes
let promo = null, locLink = "";
/* ==================================== */

const waLink = (msg, num = CONFIG.whatsapp) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
const $ = id => document.getElementById(id);
const imgSrc = i => (typeof IMG !== "undefined" ? IMG[i.img] : `images/${i.img}.jpeg`);
document.addEventListener("error", e => { const t = e.target; if (t.tagName === "IMG" && !t.dataset.fb) { t.dataset.fb = 1; t.removeAttribute("src"); t.classList.add("img-missing"); } }, true);
const byName = Object.fromEntries(MENU.map(i => [i.name, i]));

function toast(text){ const t=$("toast"); t.textContent=text; t.classList.add("show"); clearTimeout(toast.t); toast.t=setTimeout(()=>t.classList.remove("show"),2400); }

/* ---------- Cart (remembered in the browser) ---------- */
let cart = (() => { try { const c = JSON.parse(localStorage.getItem("kb_cart")) || {}; Object.keys(c).forEach(k => { if (!byName[k] || !(c[k] > 0)) delete c[k]; }); return c; } catch (e) { return {}; } })();
const saveCart = () => { try { localStorage.setItem("kb_cart", JSON.stringify(cart)); } catch (e) {} };
const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
const cartTotal = () => Object.entries(cart).reduce((s, [n, q]) => s + byName[n].price * q, 0);

function renderCart(){
  const names = Object.keys(cart);
  $("cartItems").innerHTML = names.length ? names.map(n => {
    const i = byName[n], q = cart[n];
    return `<div class="line"><img src="${imgSrc(i)}" alt="" width="52" height="52"><div><b>${dn(n)}</b><small>${fmt(i.price)} ${L("each","للواحد")}</small></div>
      <div class="qty"><button data-act="minus" data-n="${n}" aria-label="${L("Remove one","إزالة واحد من")} ${dn(n)}">&minus;</button><span>${q}</span><button data-act="plus" data-n="${n}" aria-label="${L("Add one","إضافة واحد من")} ${dn(n)}">+</button></div></div>`;
  }).join("") : `<p class="empty">${L("Your order is empty. Tap Add to order on any dish.","طلبك فارغ. اضغط أضف إلى الطلب على أي طبق.")}</p>`;
  $("cartCount").textContent = cartCount();
  renderSums();
  $("sendOrder").disabled = !names.length;
  $("sendOrder").style.opacity = names.length ? 1 : .5;
}
function addToCart(name){
  cart[name] = (cart[name] || 0) + 1; saveCart(); renderCart();
  const b = $("cartBtn"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
  toast(L(`${name} added to your order`,`تمت إضافة ${dn(name)} إلى طلبك`));
}

const drawer = $("drawer"), overlay = $("overlay");
let lastFocus = null;
function openDrawer(){ lastFocus = document.activeElement; overlay.hidden = false; drawer.inert = false; drawer.classList.add("open"); $("drawerClose").focus(); }
function closeDrawer(){ drawer.classList.remove("open"); drawer.inert = true; overlay.hidden = true; if (lastFocus) lastFocus.focus(); }
$("cartBtn").addEventListener("click", openDrawer);
$("drawerClose").addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);
$("cartItems").addEventListener("click", e => {
  const b = e.target.closest("button[data-act]"); if (!b) return;
  const n = b.dataset.n;
  cart[n] += b.dataset.act === "plus" ? 1 : -1;
  if (cart[n] <= 0) delete cart[n];
  saveCart(); renderCart();
});
$("clearCart").addEventListener("click", () => { cart = {}; promo = null; $("cPromo").value = ""; saveCart(); renderCart(); });

/* ---------- Advanced ordering: area fees, promo, time, payment, location ---------- */
const modeVal = () => document.querySelector("input[name=mode]:checked").value;
const areaObj = () => AREAS.find(a => a.id === $("cAreaSel").value);
function fillAreas(){
  const sel = $("cAreaSel"), keep = sel.value;
  sel.innerHTML = `<option value="">${L("Choose your area", "اختر منطقتك")}</option>` + AREAS.map(a => `<option value="${a.id}">${L(a.en, a.ar)}${a.fee ? " (+" + fmt(a.fee) + ")" : ""}</option>`).join("");
  sel.value = keep;
}
function totals(){
  const sub = cartTotal(), delivery = modeVal() === "Delivery", a = areaObj();
  const disc = promo ? Math.round(sub * PROMOS[promo].pct / 100) : 0;
  const fee = delivery && a && a.fee ? a.fee : 0;
  const feeTbc = delivery && (!a || a.fee === null);
  return { sub, disc, fee, feeTbc, delivery, total: sub - disc + fee };
}
function renderSums(){
  const t = totals(), row = (k, v, cls = "") => `<div class="sum ${cls}"><span>${k}</span><b>${v}</b></div>`;
  $("sums").innerHTML =
    row(L("Subtotal", "المجموع الفرعي"), fmt(t.sub)) +
    (t.disc ? row(L("Discount", "الخصم") + ` (${promo})`, "−" + fmt(t.disc), "green") : "") +
    (t.delivery ? row(L("Delivery fee", "رسوم التوصيل"), t.feeTbc ? L("we confirm", "نؤكدها لك") : fmt(t.fee)) : "") +
    row(L("Total", "المجموع"), fmt(t.total) + (t.feeTbc ? " +" : ""), "grand");
  const eta = $("eta");
  if (!cartCount()) { eta.textContent = ""; return; }
  if ($("cWhen").value === "later" && $("cTime").value) { eta.textContent = L(`Planned for ${$("cTime").value}`, `الموعد المطلوب: ${$("cTime").value}`); return; }
  const when = new Date(Date.now() + (15 + (t.delivery ? 25 : 0)) * 60000);
  const hm = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: CONFIG.timezone }).format(when);
  eta.textContent = L(`If you order now, ready at about ${hm}`, `إذا طلبت الآن، يكون جاهزاً حوالي ${hm}`);
}
document.querySelectorAll("input[name=mode]").forEach(r => r.addEventListener("change", () => { $("deliveryBox").hidden = modeVal() !== "Delivery"; renderSums(); }));
$("cAreaSel").addEventListener("change", renderSums);
$("cWhen").addEventListener("change", () => { $("cTime").hidden = $("cWhen").value !== "later"; renderSums(); });
$("cTime").addEventListener("change", renderSums);
$("applyPromo").addEventListener("click", () => {
  const code = $("cPromo").value.trim().toUpperCase();
  if (!code) { promo = null; renderSums(); return; }
  if (PROMOS[code]) { promo = code; toast(L(`Code ${code} applied: ${PROMOS[code].pct}% off`, `تم تطبيق الرمز ${code}: خصم ${PROMOS[code].pct}%`)); }
  else { promo = null; toast(L("This code is not valid", "هذا الرمز غير صالح")); }
  renderSums();
});
$("shareLoc").addEventListener("click", () => {
  const st = $("locStatus");
  if (!navigator.geolocation) { st.textContent = L("Location is not available on this device", "الموقع غير متاح على هذا الجهاز"); return; }
  st.textContent = L("Finding you…", "جارٍ تحديد موقعك…");
  navigator.geolocation.getCurrentPosition(
    p => { locLink = `https://maps.google.com/?q=${p.coords.latitude.toFixed(6)},${p.coords.longitude.toFixed(6)}`; st.textContent = L("Location added to your order", "تمت إضافة موقعك إلى الطلب"); },
    () => { locLink = ""; st.textContent = L("Could not get your location. Type your landmark instead.", "تعذّر تحديد موقعك. اكتب أقرب معلم بدلاً من ذلك."); },
    { enableHighAccuracy: true, timeout: 10000 });
});
function paintRepeat(){ let last = null; try { last = JSON.parse(localStorage.getItem("kb_last")); } catch (e) {} $("repeatOrder").hidden = !(last && Object.keys(last).length); }
$("repeatOrder").addEventListener("click", () => {
  try { const last = JSON.parse(localStorage.getItem("kb_last")) || {}; cart = {}; Object.entries(last).forEach(([n, q]) => { if (byName[n] && q > 0) cart[n] = q; }); } catch (e) {}
  saveCart(); renderCart(); toast(L("Your last order is back in your cart", "عاد طلبك الأخير إلى السلة"));
});
$("sendOrder").addEventListener("click", () => {
  if (!cartCount()) return;
  const t = totals(), name = $("cName").value.trim(), detail = $("cArea").value.trim(), note = $("cNote").value.trim(), a = areaObj();
  const pay = $("cPay").value, later = $("cWhen").value === "later", time = $("cTime").value;
  if (t.delivery && !a) { toast(L("Please choose your delivery area", "يرجى اختيار منطقة التوصيل")); $("cAreaSel").focus(); return; }
  if (t.delivery && t.sub < MIN_DELIVERY) { toast(L(`Minimum order for delivery is ${fmt(MIN_DELIVERY)}`, `الحد الأدنى للطلب مع التوصيل ${fmt(MIN_DELIVERY)}`)); return; }
  if (later) {
    const h = parseInt((time || "").split(":")[0], 10);
    if (!time || isNaN(h) || h < CONFIG.openHour || h >= CONFIG.closeHour) { toast(L("Please choose a time inside our opening hours", "يرجى اختيار وقت ضمن ساعات العمل")); $("cTime").focus(); return; }
  }
  const ar = LANG === "ar";
  const lines = Object.entries(cart).map(([n, q]) => ar ? `- ${q} × ${dn(n)} (${n}) = ${fmt(byName[n].price * q)}` : `- ${q} x ${n} = ${fmt(byName[n].price * q)}`).join("\n");
  const feeTxt = t.feeTbc ? (ar ? "نؤكدها" : "to be confirmed") : fmt(t.fee);
  const parts = ar ? [
    `مرحباً ${CONFIG.name}، أرغب بطلب:`, lines, "",
    `المجموع الفرعي: ${fmt(t.sub)}`,
    t.disc ? `الخصم (${promo}): −${fmt(t.disc)}` : "",
    t.delivery ? `رسوم التوصيل: ${feeTxt}` : "",
    `المجموع: ${fmt(t.total)}${t.feeTbc ? " + رسوم التوصيل" : ""}`, "",
    t.delivery ? `توصيل إلى: ${a.ar}${detail ? "، " + detail : ""}` : "استلام من المطعم",
    t.delivery && locLink ? `موقعي: ${locLink}` : "",
    `الوقت: ${later ? time : "في أقرب وقت ممكن"}`,
    `الدفع: ${pay === "Cash" ? "نقداً" : pay}`,
    name ? `الاسم: ${name}` : "", note ? `ملاحظات: ${note}` : "", "يرجى التأكيد."
  ] : [
    `Hello ${CONFIG.name}, I want to order:`, lines, "",
    `Subtotal: ${fmt(t.sub)}`,
    t.disc ? `Discount (${promo}): -${fmt(t.disc)}` : "",
    t.delivery ? `Delivery fee: ${feeTxt}` : "",
    `Total: ${fmt(t.total)}${t.feeTbc ? " + delivery fee" : ""}`, "",
    t.delivery ? `Delivery to: ${a.en}${detail ? ", " + detail : ""}` : "Pickup",
    t.delivery && locLink ? `My location: ${locLink}` : "",
    `When: ${later ? time : "as soon as possible"}`,
    `Payment: ${pay}`,
    name ? `Name: ${name}` : "", note ? `Notes: ${note}` : "", "Please confirm."
  ];
  try { localStorage.setItem("kb_last", JSON.stringify(cart)); } catch (e) {}
  paintRepeat();
  window.open(waLink(parts.filter((p, i) => p !== "" || (parts[i - 1] !== "" && i > 0)).join("\n")), "_blank", "noopener");
});

/* ---------- Favourites ---------- */
let favs = new Set(); try { favs = new Set(JSON.parse(localStorage.getItem("kb_fav")) || []); } catch (e) {}
const saveFavs = () => { try { localStorage.setItem("kb_fav", JSON.stringify([...favs])); } catch (e) {} };

/* ---------- Menu: tabs + search ---------- */
const state = { cat: "all", q: "", sort: "default", diet: new Set() };
function renderMenu(){
  const q = state.q.toLowerCase();
  const items = MENU.filter(i => (state.cat === "all" || (state.cat === "fav" ? favs.has(i.name) : i.cat === state.cat)) && [...state.diet].every(d => i[d]) && (!q || (i.name + " " + i.desc + " " + AR_MENU[i.name].name + " " + AR_MENU[i.name].desc).toLowerCase().includes(q)));
  if (state.sort === "low") items.sort((a, b) => a.price - b.price);
  if (state.sort === "high") items.sort((a, b) => b.price - a.price);
  $("noResults").hidden = items.length > 0;
  $("menuGrid").innerHTML = items.map(i => {
    const fav = favs.has(i.name);
    return `<article class="card reveal"><button class="fav${fav ? " on" : ""}" type="button" data-fav="${i.name}" aria-pressed="${fav}" aria-label="${L("Save to favourites", "أضف إلى المفضلة")}">${fav ? "♥" : "♡"}</button><img src="${imgSrc(i)}" alt="${dn(i.name)}" data-dish="${i.name}" width="600" height="600" loading="lazy">
      <div class="card-body">${i.tag ? `<span class="tag">${L(i.tag, "عرض الجمعة")}</span>` : i.popular ? `<span class="tag tag-pop">${L("Popular", "الأكثر طلباً")}</span>` : ""}
      <h3>${dn(i.name)}</h3>${i.veg || i.spicy ? `<div class="badges">${i.veg ? `<span class="chip-s veg">${L("Vegetarian", "نباتي")}</span>` : ""}${i.spicy ? `<span class="chip-s hot">${L("Spicy", "حار")}</span>` : ""}</div>` : ""}<p>${dd(i)}</p>
      <span class="price">${i.was ? `<s>${fmt(i.was)}</s>` : ""}${fmt(i.price)}</span>
      <div class="card-actions"><button class="btn btn-outline" data-add="${i.name}" type="button">${L("Add to order","أضف إلى الطلب")}</button>
      <button class="btn btn-green" type="button" data-dish="${i.name}">${L("Order now","اطلب الآن")}</button></div></div></article>`;
  }).join("");
  observeReveal();
}
$("menuGrid").addEventListener("click", e => {
  const f = e.target.closest("[data-fav]"); if (f) { const n = f.dataset.fav; favs.has(n) ? favs.delete(n) : favs.add(n); saveFavs(); renderMenu(); toast(favs.has(n) ? L("Saved to favourites", "تمت الإضافة إلى المفضلة") : L("Removed from favourites", "تمت الإزالة من المفضلة")); return; }
  const a = e.target.closest("[data-add]"); if (a) { addToCart(a.dataset.add); return; }
  const d = e.target.closest("[data-dish]"); if (d) { openDish(d.dataset.dish); return; }
  const img = e.target.closest(".card img"); if (img) openDish(img.dataset.dish);
});
$("tabs").addEventListener("click", e => {
  const tab = e.target.closest(".tab"); if (!tab) return;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active"); state.cat = tab.dataset.cat; renderMenu();
});
$("diet").addEventListener("click", e => {
  const b = e.target.closest("[data-diet]"); if (!b) return;
  const k = b.dataset.diet, on = !state.diet.has(k); on ? state.diet.add(k) : state.diet.delete(k);
  b.setAttribute("aria-pressed", on); b.classList.toggle("on", on); renderMenu();
});
$("sort").addEventListener("change", e => { state.sort = e.target.value; renderMenu(); });
$("search").addEventListener("input", e => { state.q = e.target.value.trim(); renderMenu(); });

/* ---------- WhatsApp links ---------- */
document.querySelectorAll(".js-wa").forEach(a => {
  a.href = waLink(a.dataset.msg || "Hello", a.dataset.number || CONFIG.whatsapp);
  a.target = "_blank"; a.rel = "noopener";
});

/* ---------- Open now + Friday badge ---------- */
function updateStatus(){
  const h = parseInt(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: CONFIG.timezone }).format(new Date()), 10) % 24;
  const open = h >= CONFIG.openHour && h < CONFIG.closeHour;
  const el = $("openStatus");
  el.textContent = open ? L("Open now","مفتوح الآن") : L("Closed now. Opens 8am","مغلق الآن. نفتح 8 صباحاً");
  el.className = "status " + (open ? "open" : "closed");
}
updateStatus(); setInterval(updateStatus, 60000);
function updateBadge(){
  const day = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: CONFIG.timezone }).format(new Date());
  const b = $("offerBadge"), fri = day === "Friday";
  b.textContent = fri ? L("Today only", "اليوم فقط") : L("Every Friday", "كل جمعة");
  b.classList.toggle("today", fri);
}
updateBadge();

/* ---------- Opening hours table (today highlighted) ---------- */
function renderHours(){
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const today = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: CONFIG.timezone }).format(new Date());
  const ARD = { Monday:"الاثنين", Tuesday:"الثلاثاء", Wednesday:"الأربعاء", Thursday:"الخميس", Friday:"الجمعة", Saturday:"السبت", Sunday:"الأحد" };
  const t = n => { const h = n % 12 || 12; return h + L(n < 12 || n === 24 ? "am" : "pm", n < 12 || n === 24 ? " ص" : " م"); };
  $("hoursTable").querySelector("tbody").innerHTML = days.map(d =>
    `<tr${d === today ? ' class="today"' : ""}><th scope="row">${L(d, ARD[d])}${d === today ? L(" (today)", " (اليوم)") : ""}</th><td>${t(CONFIG.openHour)} ${L("to","إلى")} ${t(CONFIG.closeHour)}</td></tr>`).join("");
}
renderHours();

/* ---------- Table booking -> WhatsApp ---------- */
(function booking(){
  const d = $("bDate"), now = new Date();
  const iso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  d.min = iso; d.value = iso;
  $("bookForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("bName").value.trim(), phone = $("bPhone").value.trim(), date = d.value, time = $("bTime").value, guests = $("bGuests").value;
    if (!name || !validPhone(phone) || !date || !time || !(guests > 0)) { $("bookError").textContent = L("Please fill in every field with a valid phone number.","يرجى تعبئة جميع الحقول مع رقم هاتف صحيح."); return; }
    $("bookError").textContent = "";
    const nice = new Date(date + "T00:00:00").toLocaleDateString(LANG === "ar" ? "ar-u-nu-latn" : "en-GB", { weekday: "long", day: "numeric", month: "long" });
    window.open(waLink(LANG === "ar" ? `مرحباً ${CONFIG.name}، أرغب بحجز طاولة.\nالاسم: ${name}\nالهاتف: ${phone}\nالتاريخ: ${nice}\nالوقت: ${time}\nعدد الأشخاص: ${guests}\nيرجى التأكيد.` : `Hello ${CONFIG.name}, I want to book a table.\nName: ${name}\nPhone: ${phone}\nDate: ${nice}\nTime: ${time}\nPeople: ${guests}\nPlease confirm.`), "_blank", "noopener");
    toast(L("Opening WhatsApp…","جارٍ فتح واتساب…"));
  });
})();

/* ---------- Mobile menu ---------- */
const burger = $("burger"), nav = $("nav");
burger.addEventListener("click", () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });

/* ---------- Header shadow, back to top, active link ---------- */
const header = document.querySelector(".header"), toTop = $("toTop");
function onScroll(){ const y = window.scrollY; header.classList.toggle("scrolled", y > 40); toTop.hidden = y < 700; }
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
const links = [...nav.querySelectorAll("a[href^='#']")];
const spy = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) links.forEach(l => l.classList.toggle("current", l.getAttribute("href") === "#" + en.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
links.forEach(l => { const s = document.querySelector(l.getAttribute("href")); if (s) spy.observe(s); });

/* ---------- Scroll reveal ---------- */
const revealObs = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); } }), { threshold: .12 }) : null;
function observeReveal(){ document.querySelectorAll(".reveal:not(.in)").forEach(el => revealObs ? revealObs.observe(el) : el.classList.add("in")); }
document.querySelectorAll(".feature,.steps li,.gallery img,.info-card,.about-fig").forEach(el => el.classList.add("reveal"));

/* ---------- Order pop-ups (same menu images) ---------- */
let modalFocus = null;
function openModal(el){ modalFocus = document.activeElement; el.hidden = false; document.body.style.overflow = "hidden"; const c = el.querySelector("[data-close]"); if (c) c.focus(); }
function closeModals(){ const was = [...document.querySelectorAll(".modal")].some(m => !m.hidden); document.querySelectorAll(".modal").forEach(m => m.hidden = true); document.body.style.overflow = ""; if (was && modalFocus && modalFocus.focus) modalFocus.focus(); }
document.querySelectorAll(".modal").forEach(m => m.addEventListener("click", e => { if (e.target === m || e.target.closest("[data-close]")) closeModals(); }));

/* "What would you like?" picker */
let omCat = "all";
function renderPicker(){
  const cats = ["all", ...new Set(MENU.map(i => i.cat))];
  $("omChips").innerHTML = cats.map(c => `<button type="button" class="tab${c === omCat ? " active" : ""}" data-c="${c}">${c === "all" ? L("All","الكل") : L(c, AR[c])}</button>`).join("");
  $("omGrid").innerHTML = MENU.filter(i => omCat === "all" || i.cat === omCat).map(i => {
    const msg = LANG === "ar" ? `مرحباً ${CONFIG.name}، أرغب بطلب: 1 × ${dn(i.name)} (${i.name}) بسعر ${fmt(i.price)}. يرجى التأكيد.` : `Hello ${CONFIG.name}, I want to order: 1 x ${i.name} (${fmt(i.price)}). Please confirm.`;
    return `<article class="om-item"><img src="${imgSrc(i)}" alt="${dn(i.name)}" width="600" height="600" loading="lazy">
      <div class="om-info"><h3>${dn(i.name)}</h3><span class="price">${i.was ? `<s>${fmt(i.was)}</s>` : ""}${fmt(i.price)}</span></div>
      <a class="btn btn-green" target="_blank" rel="noopener" href="${waLink(msg)}">${L("Order on WhatsApp","اطلب عبر واتساب")}</a></article>`;
  }).join("");
}
$("omChips").addEventListener("click", e => { const b = e.target.closest("[data-c]"); if (b) { omCat = b.dataset.c; renderPicker(); } });
function openPicker(){ renderPicker(); openModal($("orderModal")); $("orderModal").querySelector(".modal-box").scrollTop = 0; }
$("omCart").addEventListener("click", () => { closeModals(); openDrawer(); });
document.querySelectorAll("[data-open='order']").forEach(a => a.addEventListener("click", e => { e.preventDefault(); nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); openPicker(); }));

/* Single dish pop-up */
let dish = null, dishQty = 1;
function paintDish(){
  $("dmQty").textContent = dishQty;
  $("dmPrice").innerHTML = (dish.was ? `<s>${fmt(dish.was * dishQty)}</s>` : "") + fmt(dish.price * dishQty);
  $("dmWa").href = waLink(LANG === "ar" ? `مرحباً ${CONFIG.name}، أرغب بطلب: ${dishQty} × ${dn(dish.name)} (${dish.name}) بسعر ${fmt(dish.price)} للواحد = ${fmt(dish.price * dishQty)}. يرجى التأكيد.` : `Hello ${CONFIG.name}, I want to order: ${dishQty} x ${dish.name} (${fmt(dish.price)} each) = ${fmt(dish.price * dishQty)}. Please confirm.`);
}
function paintDishText(){
  $("dmImg").src = imgSrc(dish); $("dmImg").alt = dn(dish.name);
  $("dmName").textContent = dn(dish.name); $("dmDesc").textContent = dd(dish);
  const t = dish.tag ? L(dish.tag, "عرض الجمعة") : (dish.popular ? L("Popular", "الأكثر طلباً") : ""); $("dmTag").hidden = !t; $("dmTag").textContent = t;
}
function openDish(name){
  dish = byName[name]; if (!dish) return; dishQty = 1;
  paintDishText(); paintDish(); openModal($("dishModal"));
}
$("dmPlus").addEventListener("click", () => { dishQty = Math.min(20, dishQty + 1); paintDish(); });
$("dmMinus").addEventListener("click", () => { dishQty = Math.max(1, dishQty - 1); paintDish(); });
$("dmAdd").addEventListener("click", () => { for (let n = 0; n < dishQty; n++) { cart[dish.name] = (cart[dish.name] || 0) + 1; } saveCart(); renderCart(); toast(L(`${dishQty} x ${dish.name} added to your order`, `تمت إضافة ${dishQty} × ${dn(dish.name)} إلى طلبك`)); closeModals(); });
document.querySelectorAll("[data-open-dish]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); openDish(a.dataset.openDish); }));

/* ---------- Gallery lightbox ---------- */
const lb = $("lightbox");
document.querySelector(".gallery").addEventListener("click", e => {
  if (e.target.tagName !== "IMG") return;
  $("lbImg").src = e.target.src; $("lbImg").alt = e.target.alt; lb.hidden = false; $("lbClose").focus();
});
lb.addEventListener("click", e => { if (e.target === lb || e.target.id === "lbClose") lb.hidden = true; });
document.addEventListener("keydown", e => { if (e.key === "Escape") { lb.hidden = true; closeModals(); if (drawer.classList.contains("open")) closeDrawer(); } });

/* ---------- Contact form -> WhatsApp ---------- */
$("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("fName").value.trim(), phone = $("fPhone").value.trim(), msg = $("fMsg").value.trim();
  if (!name || !validPhone(phone)) { $("formError").textContent = L("Please enter your name and a valid phone number.","يرجى إدخال اسمك ورقم هاتف صحيح."); return; }
  $("formError").textContent = "";
  window.open(waLink(LANG === "ar" ? `مرحباً ${CONFIG.name}، اسمي ${name} (${phone}). ${msg}` : `Hello ${CONFIG.name}, my name is ${name} (${phone}). ${msg}`), "_blank", "noopener");
  toast(L("Opening WhatsApp…","جارٍ فتح واتساب…")); e.target.reset();
});

/* ---------- Phone check (Uganda numbers, with or without +256) ---------- */
const validPhone = p => /^(?:\+?256|0)?7\d{8}$|^(?:\+?256|0)?(?:3|4)\d{8}$/.test(p.replace(/[\s-]/g, ""));

/* ---------- Newsletter / offers ---------- */
$("offerForm").addEventListener("submit", e => {
  e.preventDefault();
  const p = $("oPhone").value.trim();
  if (!validPhone(p)) { $("offerError").textContent = L("Please enter a valid Ugandan phone number, for example 0779 493 747.","يرجى إدخال رقم هاتف أوغندي صحيح، مثل 0779 493 747."); return; }
  $("offerError").textContent = "";
  window.open(waLink(LANG === "ar" ? `مرحباً ${CONFIG.name}، يرجى إضافة رقمي (${p}) إلى قائمة العروض.` : `Hello ${CONFIG.name}, please add my number (${p}) to your offers list.`), "_blank", "noopener");
  toast(L("Opening WhatsApp…","جارٍ فتح واتساب…")); e.target.reset();
});

/* ---------- Reviews slider ---------- */
(function slider(){
  const track = $("track"), cards = [...track.children], dots = $("dots");
  dots.innerHTML = cards.map((_, i) => `<button type="button" aria-label="${L("Go to review","انتقل إلى التقييم")} ${i + 1}" data-i="${i}"></button>`).join("");
  const step = () => cards[0].getBoundingClientRect().width + 20;
  const index = () => Math.round(track.scrollLeft / step());
  const go = i => track.scrollTo({ left: Math.max(0, Math.min(cards.length - 1, i)) * step(), behavior: "smooth" });
  const mark = () => [...dots.children].forEach((d, i) => d.classList.toggle("on", i === index()));
  track.addEventListener("scroll", mark, { passive: true }); mark();
  $("prev").addEventListener("click", () => go(index() - 1));
  $("next").addEventListener("click", () => go(index() + 1 >= cards.length ? 0 : index() + 1));
  dots.addEventListener("click", e => { const b = e.target.closest("button"); if (b) go(+b.dataset.i); });
  track.addEventListener("keydown", e => { if (e.key === "ArrowRight") go(index() + 1); if (e.key === "ArrowLeft") go(index() - 1); });
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let pause = false;
    ["mouseenter", "focusin", "touchstart"].forEach(ev => track.addEventListener(ev, () => pause = true, { passive: true }));
    ["mouseleave", "focusout"].forEach(ev => track.addEventListener(ev, () => pause = false));
    setInterval(() => { if (!pause && !document.hidden) go(index() + 1 >= cards.length ? 0 : index() + 1); }, 6000);
  }
})();

/* ---------- Count-up stats ---------- */
(function stats(){
  const nums = document.querySelectorAll(".stat b");
  $("statDishes").dataset.count = MENU.length;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const run = el => {
    const to = +el.dataset.count; if (reduce) { el.textContent = to; return; }
    const t0 = performance.now();
    const f = t => { const p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  };
  if (!("IntersectionObserver" in window)) { nums.forEach(n => n.textContent = n.dataset.count); return; }
  const o = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { run(en.target); o.unobserve(en.target); } }), { threshold: .6 });
  nums.forEach(n => o.observe(n));
})();

/* ---------- Friday offer countdown (Kampala time, UTC+3) ---------- */
function tickCountdown(){
  const el = $("countdown");
  const span = ms => { const m = Math.floor(ms / 60000), d = Math.floor(m / 1440), h = Math.floor(m % 1440 / 60); return LANG === "ar" ? (d ? d + " يوم " : "") + h + " ساعة " + (m % 60) + " دقيقة" : (d ? d + "d " : "") + h + "h " + (m % 60) + "m"; };
  {
    const k = new Date(Date.now() + 3 * 3600e3), dow = k.getUTCDay();
    const Y = k.getUTCFullYear(), M = k.getUTCMonth(), D = k.getUTCDate();
    if (dow === 5) { const ms = Date.UTC(Y, M, D, CONFIG.closeHour) - k.getTime(); el.textContent = ms > 0 ? L("Offer ends in ", "ينتهي العرض بعد ") + span(ms) : L("See you next Friday", "نراكم الجمعة القادمة"); }
    else el.textContent = L("Starts in ", "يبدأ بعد ") + span(Date.UTC(Y, M, D + (5 - dow + 7) % 7) - k.getTime());
  }
}
tickCountdown(); setInterval(tickCountdown, 30000);

/* ---------- Dark mode ---------- */
function paintThemeBtn(){ const dark = document.documentElement.dataset.theme === "dark"; $("themeBtn").textContent = dark ? L("Light","فاتح") : L("Dark","داكن"); }
(function theme(){
  const root = document.documentElement, btn = $("themeBtn");
  const set = t => { root.dataset.theme = t; paintThemeBtn(); btn.setAttribute("aria-pressed", t === "dark"); try { localStorage.setItem("kb_theme", t); } catch (e) {} };
  let saved = null; try { saved = localStorage.getItem("kb_theme"); } catch (e) {}
  set(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  btn.addEventListener("click", () => set(root.dataset.theme === "dark" ? "light" : "dark"));
})();

/* ---------- Scroll progress bar ---------- */
(function progress(){
  const bar = $("progress");
  const f = () => { const max = document.documentElement.scrollHeight - innerHeight; bar.style.width = (max > 0 ? scrollY / max * 100 : 0) + "%"; };
  addEventListener("scroll", f, { passive: true }); f();
})();

/* ---------- Share ---------- */
$("shareBtn").addEventListener("click", async () => {
  const data = { title: CONFIG.name, text: L("Order food from ", "اطلب الطعام من ") + CONFIG.name, url: location.href };
  try {
    if (navigator.share) { await navigator.share(data); return; }
    await navigator.clipboard.writeText(location.href); toast(L("Link copied","تم نسخ الرابط"));
  } catch (e) { toast(L("Copy the link from your address bar","انسخ الرابط من شريط العنوان")); }
});

$("year").textContent = new Date().getFullYear();

/* ---------- Language switch (English / العربية) ---------- */
function setLang(l){
  LANG = l;
  const html = document.documentElement;
  html.lang = l; html.dir = l === "ar" ? "rtl" : "ltr";
  translateStatic();
  fillAreas(); renderMenu(); renderCart(); renderHours(); updateStatus(); updateBadge(); tickCountdown(); paintThemeBtn();
  if (!$("orderModal").hidden) renderPicker();
  if (!$("dishModal").hidden && dish) { paintDishText(); paintDish(); }
  document.querySelectorAll("#dots button").forEach((b, i) => b.setAttribute("aria-label", L("Go to review", "انتقل إلى التقييم") + " " + (i + 1)));
  $("langBtn").textContent = l === "ar" ? "English" : "العربية";
  $("langBtn").setAttribute("aria-label", l === "ar" ? "Switch to English" : "التبديل إلى العربية");
  try { localStorage.setItem("kb_lang", l); } catch (e) {}
}
$("langBtn").addEventListener("click", () => setLang(LANG === "ar" ? "en" : "ar"));
fillAreas(); paintRepeat(); renderCart(); renderMenu();
(function initLang(){
  let saved = null; try { saved = localStorage.getItem("kb_lang"); } catch (e) {}
  const want = saved || (/^ar/i.test(navigator.language || "") ? "ar" : "en");
  if (want === "ar") setLang("ar"); else $("langBtn").textContent = "العربية";
})();
