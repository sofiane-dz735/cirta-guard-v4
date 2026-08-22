
// CIRTA-GUARD ELITE V4 - Multilingual (AR / FR / EN) - Vercel Webhook
// Deploy as /api/webhook.js in Vercel
// ENV needed: BOT_TOKEN, ADMIN_ID

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID; // your telegram id
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// In-memory lang store (use KV/DB in production)
const userLang = new Map(); // userId -> 'ar'|'fr'|'en'

const translations = {
  ar: {
    welcome: `🛡️ مرحباً بك في *CIRTA\\-GUARD*\\!
    
أكبر منصة تطبيقات بريميوم آمنة \\(Premium Apps, Zero Risk\\) 🚀

✨ ماذا نقدم؟
• نتفليكس، يوتيوب بريميوم، سبوتيفاي...
• تطبيقات التصميم والمونتاج
• ضمان كامل + تحديثات مدى الحياة

📋 الأوامر:
/help \\- كيفية التثبيت
/apps \\- قائمة التطبيقات
/price \\- الأسعار وطرق الدفع
/lang \\- تغيير اللغة

💬 أرسل بريدك الإلكتروني لبدء الطلب!`,
    help: `❓ *كيفية تثبيت التطبيقات \\- CIRTA\\-GUARD*

1️⃣ بعد الدفع، سيصلك رابط تحميل مباشر
2️⃣ حمل التطبيق \\(IPA / APK\\)
3️⃣ للتثبيت على iOS:
   • افتح موقع ESign أو Scarlet
   • ارفع ملف IPA
   • ثبّت الشهادة
4️⃣ على Android: ثبّت APK مباشرة
5️⃣ أدخل كود التفعيل المرسل لبريدك

🎥 فيديو الشرح: https://t.me/cirtaguard\\_support\\_bot
💬 دعم فني 24/7`,
    apps: `📱 *قائمة التطبيقات المتاحة \\- CIRTA\\-GUARD*

🎬 ترفيه:
• Netflix Premium 4K
• YouTube Premium \\+ Music
• Spotify Premium
• Shahid VIP

🎨 تصميم:
• Adobe Creative Cloud
• Canva Pro
• CapCut Pro

💼 إنتاجية:
• Microsoft 365
• Notion Pro

أرسل اسم التطبيق الذي تريده!`,
    price: `💰 *الأسعار وطرق الدفع*

🔹 اشتراك واحد: 1500 دج / 10$
🔹 باقة 3 تطبيقات: 3000 دج / 20$
🔹 الباقة الذهبية \\(الكل\\): 5000 دج / 35$

💳 طرق الدفع:
• CCP BaridiMob: 00799999...
• PayPal: paypal.me/cirtaguard
• Apple Pay: اطلب رابط
• Binance / USDT

📸 بعد الدفع، أرسل صورة الإيصال هنا!`,
    lang_prompt: `🌐 *اختر لغتك / Choose your language / Choisissez votre langue*`,
    lang_set_ar: `✅ تم تغيير اللغة إلى العربية`,
    lang_set_fr: `✅ Langue changée en Français`,
    lang_set_en: `✅ Language changed to English`,
    ask_email: `📧 أرسل بريدك الإلكتروني الصحيح لإرسال التطبيقات والكود`,
    email_ok: `✅ تم حفظ بريدك: `,
    download: `📥 *رابط التحميل المباشر*\n\nسيتم إرسال الرابط بعد تأكيد الدفع مباشرة إلى بريدك.\n\nإذا دفعت بالفعل، أرسل صورة الإيصال!`,
    receipt_received: `✅ تم استلام الإيصال! سيتم التأكد خلال 5 دقائق وإرسال التطبيقات لبريدك.`,
    unknown: `🤖 لم أفهم رسالتك.\nاستخدم /help للمساعدة أو /lang لتغيير اللغة.`
  },
  fr: {
    welcome: `🛡️ Bienvenue chez *CIRTA\\-GUARD*\\!

Plateforme Premium Apps, Zero Risk 🚀

✨ Que proposons\\-nous ?
• Netflix, YouTube Premium, Spotify...
• Apps de design et montage
• Garantie complète \\+ mises à jour à vie

📋 Commandes:
/help \\- Comment installer
/apps \\- Liste des apps
/price \\- Prix et paiement
/lang \\- Changer de langue

💬 Envoyez votre email pour commencer\\!`,
    help: `❓ *Comment installer \\- CIRTA\\-GUARD*

1️⃣ Après paiement, vous recevrez un lien direct
2️⃣ Téléchargez l'app \\(IPA / APK\\)
3️⃣ Sur iOS:
   • Ouvrez ESign ou Scarlet
   • Importez le fichier IPA
   • Installez le certificat
4️⃣ Sur Android: installez l'APK directement
5️⃣ Entrez le code d'activation envoyé par email

🎥 Tutoriel: https://t.me/cirtaguard\\_support\\_bot
💬 Support 24/7`,
    apps: `📱 *Liste des applications \\- CIRTA\\-GUARD*

🎬 Divertissement:
• Netflix Premium 4K
• YouTube Premium
• Spotify Premium

🎨 Design:
• Adobe Creative Cloud
• Canva Pro
• CapCut Pro

Envoyez le nom de l'app souhaitée\\!`,
    price: `💰 *Tarifs et paiement*

🔹 1 app: 10€
🔹 Pack 3 apps: 20€
🔹 Pack Gold \\(tout\\): 35€

💳 Paiement:
• PayPal: paypal.me/cirtaguard
• Apple Pay: demandez le lien
• CCP / Binance disponible

📸 Envoyez la capture du reçu ici\\!`,
    lang_prompt: `🌐 *Choisissez votre langue / Choose your language / اختر لغتك*`,
    lang_set_ar: `✅ Langue changée en Arabe`,
    lang_set_fr: `✅ Langue changée en Français`,
    lang_set_en: `✅ Language changed to English`,
    ask_email: `📧 Envoyez votre email correct pour recevoir les apps`,
    email_ok: `✅ Email enregistré: `,
    download: `📥 *Lien de téléchargement*\n\nLe lien sera envoyé après confirmation du paiement à votre email.`,
    receipt_received: `✅ Reçu bien reçu\\! Vérification en 5 min et envoi à votre email.`,
    unknown: `🤖 Je n'ai pas compris.\nUtilisez /help pour l'aide ou /lang pour changer de langue.`
  },
  en: {
    welcome: `🛡️ Welcome to *CIRTA\\-GUARD*\\!

Premium Apps, Zero Risk Platform 🚀

✨ What we offer:
• Netflix, YouTube Premium, Spotify...
• Design & Editing Apps
• Full warranty \\+ lifetime updates

📋 Commands:
/help \\- How to install
/apps \\- App list
/price \\- Pricing & Payment
/lang \\- Change language

💬 Send your email to start\\!`,
    help: `❓ *How to install \\- CIRTA\\-GUARD*

1️⃣ After payment, you'll get direct download link
2️⃣ Download app \\(IPA / APK\\)
3️⃣ On iOS:
   • Open ESign or Scarlet
   • Upload IPA file
   • Install certificate
4️⃣ On Android: install APK directly
5️⃣ Enter activation code sent to your email

🎥 Tutorial: https://t.me/cirtaguard\\_support\\_bot
💬 24/7 Support`,
    apps: `📱 *Available Apps \\- CIRTA\\-GUARD*

🎬 Entertainment:
• Netflix Premium 4K
• YouTube Premium
• Spotify Premium

🎨 Design:
• Adobe Creative Cloud
• Canva Pro
• CapCut Pro

Send the app name you want\\!`,
    price: `💰 *Pricing & Payment*

🔹 Single app: $10
🔹 3 apps pack: $20
🔹 Gold Pack \\(all\\): $35

💳 Payment:
• PayPal: paypal.me/cirtaguard
• Apple Pay: ask for link
• CCP / Binance available

📸 Send payment receipt screenshot here\\!`,
    lang_prompt: `🌐 *Choose your language / Choisissez votre langue / اختر لغتك*`,
    lang_set_ar: `✅ Language changed to Arabic`,
    lang_set_fr: `✅ Langue changée en Français`,
    lang_set_en: `✅ Language changed to English`,
    ask_email: `📧 Send your correct email to receive apps and code`,
    email_ok: `✅ Email saved: `,
    download: `📥 *Direct Download Link*\n\nLink will be sent after payment confirmation to your email.`,
    receipt_received: `✅ Receipt received\\! Verification within 5 mins and delivery to your email.`,
    unknown: `🤖 I didn't understand.\nUse /help for help or /lang to change language.`
  }
};

function getLang(user) {
  if (userLang.has(user.id)) return userLang.get(user.id);
  const code = user.language_code || 'ar';
  if (code.startsWith('fr')) return 'fr';
  if (code.startsWith('en')) return 'en';
  return 'ar';
}

async function sendMessage(chatId, text, opts = {}) {
  const body = { chat_id: chatId, text, parse_mode: 'MarkdownV2', ...opts };
  await fetch(`${API}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}

async function sendLangKeyboard(chatId, t) {
  await sendMessage(chatId, t.lang_prompt, {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🇩🇿 العربية', callback_data: 'lang_ar' }, { text: '🇫🇷 Français', callback_data: 'lang_fr' }],
        [{ text: '🇬🇧 English', callback_data: 'lang_en' }]
      ]
    }
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('CIRTA-GUARD V4 Running');
  
  const update = req.body;
  
  try {
    if (update.message) {
      const msg = update.message;
      const chatId = msg.chat.id;
      const user = msg.from;
      const text = (msg.text || '').trim();
      const lang = getLang(user);
      const t = translations[lang];

      // Commands
      if (text.startsWith('/start')) {
        await sendMessage(chatId, t.welcome);
      } else if (text.startsWith('/help')) {
        await sendMessage(chatId, t.help);
      } else if (text.startsWith('/apps')) {
        await sendMessage(chatId, t.apps);
      } else if (text.startsWith('/price')) {
        await sendMessage(chatId, t.price);
      } else if (text.startsWith('/download')) {
        await sendMessage(chatId, t.download);
      } else if (text.startsWith('/lang')) {
        await sendLangKeyboard(chatId, t);
      } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        // Email detected
        await sendMessage(chatId, `${t.email_ok} \`${text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&')}\`\n\n${t.price}`);
        // Notify admin
        if (ADMIN_ID) await fetch(`${API}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: ADMIN_ID, text: `📧 New client email: ${text} from @${user.username || user.id} lang:${lang}` }) });
      } else if (msg.photo) {
        await sendMessage(chatId, t.receipt_received);
        if (ADMIN_ID) await fetch(`${API}/forwardMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: ADMIN_ID, from_chat_id: chatId, message_id: msg.message_id }) });
      } else {
        // Auto detect language from text
        let detected = lang;
        if (/[a-zA-Z]/.test(text) && !/[ء-ي]/.test(text)) {
          if (text.toLowerCase().includes('prix') || text.toLowerCase().includes('comment')) detected = 'fr';
          else detected = 'en';
        }
        const td = translations[detected];
        if (text.length < 3) await sendMessage(chatId, td.unknown);
        else await sendMessage(chatId, td.welcome);
      }
    }

    if (update.callback_query) {
      const cb = update.callback_query;
      const chatId = cb.message.chat.id;
      const userId = cb.from.id;
      const data = cb.data;

      if (data.startsWith('lang_')) {
        const newLang = data.split('_')[1]; // ar, fr, en
        userLang.set(userId, newLang);
        const t = translations[newLang];
        let confirm = t.lang_set_ar;
        if (newLang === 'fr') confirm = t.lang_set_fr;
        if (newLang === 'en') confirm = t.lang_set_en;

        await fetch(`${API}/answerCallbackQuery`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ callback_query_id: cb.id, text: confirm }) });
        await sendMessage(chatId, confirm + '\n\n' + t.welcome);
      }
    }

  } catch (e) {
    console.error(e);
  }

  res.status(200).send('OK');
}
