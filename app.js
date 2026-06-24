document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const voiceBtn = document.getElementById('voice-btn');
    const trySampleBtn = document.getElementById('try-sample-btn');
    const clearBtn = document.getElementById('clear-btn');
    
    // Model Comparison button
    const tokenizerInfoBtn = document.getElementById('tokenizer-info-btn');

    // Language Selector elements
    const selectLangBtn = document.getElementById('select-lang-btn');
    const langSelectorContainer = document.getElementById('lang-selector-container');
    const langModalClose = document.getElementById('lang-modal-close');
    const langCards = document.querySelectorAll('.lang-card:not(.disabled)');
    const activeLangStatus = document.getElementById('active-lang-status');

    // Tokenizer elements
    const tokenizerOutput = document.getElementById('tokenizer-output');
    const tokenBadgesList = document.getElementById('token-badges-list');
    const statTokensValue = document.getElementById('stat-tokens-value');
    const statCharsValue = document.getElementById('stat-chars-value');
    const statFertilityValue = document.getElementById('stat-fertility-value');

    const languageSamples = {
        "English": [
            "The rapid advancement of artificial intelligence and machine learning is fundamentally reshaping our world. From natural language processing algorithms that can fluently translate between dozens of languages in real-time, to generative models that assist in writing code and composing music, the possibilities seem limitless. This technology not only enhances productivity but also challenges our traditional understanding of creativity and problem-solving. As we continue to develop these complex systems, understanding how they process information through techniques like tokenization becomes increasingly critical.",
            "Exploring the depths of the universe has always been one of humanity's greatest ambitions. With the launch of next-generation space telescopes and robotic explorers, we are now able to peer further back in time and space than ever before. These incredible instruments capture breathtaking images of distant galaxies, nebulae, and exoplanets, providing scientists with an unprecedented wealth of data. Analyzing this vast cosmic information requires powerful computational models capable of deciphering the fundamental laws that govern the cosmos."
        ],
        "Hindi": [
            "कृत्रिम बुद्धिमत्ता और मशीन लर्निंग की तीव्र प्रगति हमारी दुनिया को मौलिक रूप से नया आकार दे रही है। प्राकृतिक भाषा प्रसंस्करण एल्गोरिदम से लेकर जो वास्तविक समय में दर्जनों भाषाओं के बीच धाराप्रवाह अनुवाद कर सकते हैं, जनरेटिव मॉडल तक जो कोड लिखने और संगीत तैयार करने में सहायता करते हैं, संभावनाएं असीमित लगती हैं। यह तकनीक न केवल उत्पादकता को बढ़ाती है बल्कि रचनात्मकता और समस्या-समाधान की हमारी पारंपरिक समझ को भी चुनौती देती है। जैसे-जैसे हम इन जटिल प्रणालियों को विकसित करना जारी रखते हैं, यह समझना कि वे टोकनाइजेशन जैसी तकनीकों के माध्यम से जानकारी को कैसे संसाधित करते हैं, तेजी से महत्वपूर्ण होता जा रहा है।",
            "ब्रह्मांड की गहराईयों की खोज हमेशा से मानवता की सबसे बड़ी महत्वाकांक्षाओं में से एक रही है। अगली पीढ़ी के अंतरिक्ष दूरबीनों और रोबोटिक खोजकर्ताओं के लॉन्च के साथ, हम अब अंतरिक्ष और समय में पहले से कहीं अधिक दूर तक देखने में सक्षम हैं। ये अविश्वसनीय उपकरण दूर की आकाशगंगाओं, निहारिकाओं और एक्सोप्लैनेट की लुभावनी छवियां कैप्चर करते हैं, जो वैज्ञानिकों को डेटा का अभूतपूर्व खजाना प्रदान करते हैं। इस विशाल ब्रह्मांडीय जानकारी का विश्लेषण करने के लिए ब्रह्मांड को नियंत्रित करने वाले मूलभूत नियमों को समझने में सक्षम शक्तिशाली कम्प्यूटेशनल मॉडल की आवश्यकता होती है।"
        ],
        "Telugu": [
            "కృత్రిమ మేధస్సు మరియు మెషిన్ లెర్నింగ్ యొక్క వేగవంతమైన పురోగతి మన ప్రపంచాన్ని ప్రాథమికంగా మారుస్తోంది. నిజ సమయంలో డజన్ల కొద్దీ భాషల మధ్య అనర్గళంగా అనువదించగల సహజ భాషా ప్రాసెసింగ్ అల్గారిథమ్‌ల నుండి, కోడ్ రాయడం మరియు సంగీతాన్ని స్వరపరచడంలో సహాయపడే ఉత్పాదక నమూనాల వరకు, అవకాశాలు అపరిమితంగా కనిపిస్తాయి. ఈ సాంకేతికత ఉత్పాదకతను పెంచడమే కాకుండా సృజనాత్మకత మరియు సమస్య పరిష్కారం పట్ల మన సాంప్రదాయ అవగాహనను కూడా సవాలు చేస్తుంది. మనం ఈ సంక్లిష్ట వ్యవస్థలను అభివృద్ధి చేయడం కొనసాగిస్తున్నప్పుడు, టోకనైజేషన్ వంటి సాంకేతికతల ద్వారా అవి సమాచారాన్ని ఎలా ప్రాసెస్ చేస్తాయో అర్థం చేసుకోవడం చాలా కీలకం.",
            "విశ్వం యొక్క లోతులను అన్వేషించడం ఎల్లప్పుడూ మానవత్వం యొక్క గొప్ప ఆశయాలలో ఒకటి. తదుపరి తరం అంతరిక్ష టెలిస్కోప్‌లు మరియు రోబోటిక్ అన్వేషకుల ప్రయోగంతో, మనం ఇప్పుడు మునుపెన్నడూ లేని విధంగా సమయం మరియు అంతరిక్షంలోకి చూడగలుగుతున్నాము. ఈ అద్భుతమైన సాధనాలు సుదూర గెలాక్సీలు, నిహారికలు మరియు ఎక్సోప్లానెట్‌ల ఉత్కంఠభరితమైన చిత్రాలను సంగ్రహిస్తాయి, శాస్త్రవేత్తలకు అపూర్వమైన డేటాను అందిస్తాయి. ఈ విస్తారమైన విశ్వ సమాచారాన్ని విశ్లేషించడానికి విశ్వాన్ని నియంత్రించే ప్రాథమిక చట్టాలను అర్థం చేసుకోగల శక్తివంతమైన గణన నమూనాలు అవసరం."
        ],
        "Tamil": [
            "செயற்கை நுண்ணறிவு மற்றும் இயந்திர கற்றலின் விரைவான முன்னேற்றம் நமது உலகத்தை அடிப்படையில் மறுவடிவமைக்கிறது. நிகழ்நேரத்தில் டஜன் கணக்கான மொழிகளுக்கு இடையே சரளமாக மொழிபெயர்க்கக்கூடிய இயற்கை மொழி செயலாக்க வழிமுறைகள் முதல், குறியீடு எழுதுவதற்கும் இசையமைப்பதற்கும் உதவும் உற்பத்தி மாதிரிகள் வரை, சாத்தியங்கள் வரம்பற்றதாகத் தெரிகிறது. இந்த தொழில்நுட்பம் உற்பத்தித்திறனை மேம்படுத்துவதோடு மட்டுமல்லாமல், படைப்பாற்றல் மற்றும் சிக்கலைத் தீர்ப்பது பற்றிய நமது பாரம்பரிய புரிதலுக்கும் சவால் விடுகிறது. இந்த சிக்கலான அமைப்புகளை நாங்கள் தொடர்ந்து உருவாக்கும்போது, ​​டோக்கனைசேஷன் போன்ற நுட்பங்கள் மூலம் அவை எவ்வாறு தகவல்களை செயலாக்குகின்றன என்பதைப் புரிந்துகொள்வது மிகவும் முக்கியமானது.",
            "பிரபஞ்சத்தின் ஆழத்தை ஆராய்வது எப்போதும் மனிதகுலத்தின் மிகப்பெரிய லட்சியங்களில் ஒன்றாகும். அடுத்த தலைமுறை விண்வெளி தொலைநோக்கிகள் மற்றும் ரோபோடிக் ஆய்வாளர்கள் அறிமுகப்படுத்தப்பட்டதன் மூலம், நாம் இப்போது முன்பை விட நேரம் மற்றும் விண்வெளியில் மேலும் பின்னோக்கிப் பார்க்க முடிகிறது. இந்த நம்பமுடியாத கருவிகள் தொலைதூர விண்மீன் திரள்கள், நெபுலாக்கள் மற்றும் புறக்கோள்களின் மூச்சடைக்கக்கூடிய படங்களை படம்பிடித்து, விஞ்ஞானிகளுக்கு முன்னோடியில்லாத தரவுகளை வழங்குகின்றன. இந்த பரந்த அண்ட தகவல்களை பகுப்பாய்வு செய்ய பிரபஞ்சத்தை நிர்வகிக்கும் அடிப்படை விதிகளை புரிந்து கொள்ளக்கூடிய சக்திவாய்ந்த கணக்கீட்டு மாதிரிகள் தேவை."
        ],
        "Kannada": [
            "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಮತ್ತು ಯಂತ್ರ ಕಲಿಕೆಯ ತ್ವರಿತ ಪ್ರಗತಿಯು ನಮ್ಮ ಪ್ರಪಂಚವನ್ನು ಮೂಲಭೂತವಾಗಿ ಮರುರೂಪಿಸುತ್ತಿದೆ. ನೈಜ ಸಮಯದಲ್ಲಿ ಡಜನ್ಗಟ್ಟಲೆ ಭಾಷೆಗಳ ನಡುವೆ ನಿರರ್ಗಳವಾಗಿ ಅನುವಾದಿಸಬಲ್ಲ ನೈಸರ್ಗಿಕ ಭಾಷಾ ಸಂಸ್ಕರಣಾ ಅಲ್ಗಾರಿದಮ್‌ಗಳಿಂದ ಹಿಡಿದು, ಕೋಡ್ ಬರೆಯಲು ಮತ್ತು ಸಂಗೀತವನ್ನು ಸಂಯೋಜಿಸಲು ಸಹಾಯ ಮಾಡುವ ಉತ್ಪಾದಕ ಮಾದರಿಗಳವರೆಗೆ, ಸಾಧ್ಯತೆಗಳು ಮಿತಿಯಿಲ್ಲದಂತೆ ತೋರುತ್ತದೆ. ಈ ತಂತ್ರಜ್ಞಾನವು ಉತ್ಪಾದಕತೆಯನ್ನು ಹೆಚ್ಚಿಸುವುದಲ್ಲದೆ ಸೃಜನಶೀಲತೆ ಮತ್ತು ಸಮಸ್ಯೆ-ಪರಿಹರಿಸುವ ನಮ್ಮ ಸಾಂಪ್ರದಾಯಿಕ ತಿಳುವಳಿಕೆಯನ್ನು ಸವಾಲು ಮಾಡುತ್ತದೆ. ನಾವು ಈ ಸಂಕೀರ್ಣ ವ್ಯವಸ್ಥೆಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿದಾಗ, ಟೋಕನೈಸೇಶನ್‌ನಂತಹ ತಂತ್ರಗಳ ಮೂಲಕ ಅವರು ಮಾಹಿತಿಯನ್ನು ಹೇಗೆ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತಾರೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ಹೆಚ್ಚು ನಿರ್ಣಾಯಕವಾಗುತ್ತದೆ.",
            "ಬ್ರಹ್ಮಾಂಡದ ಆಳವನ್ನು ಅನ್ವೇಷಿಸುವುದು ಯಾವಾಗಲೂ ಮಾನವೀಯತೆಯ ದೊಡ್ಡ ಮಹತ್ವಾಕಾಂಕ್ಷೆಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಮುಂದಿನ ಪೀಳಿಗೆಯ ಬಾಹ್ಯಾಕಾಶ ದೂರದರ್ಶಕಗಳು ಮತ್ತು ರೋಬೋಟಿಕ್ ಅನ್ವೇಷಕರ ಉಡಾವಣೆಯೊಂದಿಗೆ, ನಾವು ಇದೀಗ ಹಿಂದೆಂದಿಗಿಂತಲೂ ಬಾಹ್ಯಾಕಾಶ ಮತ್ತು ಸಮಯವನ್ನು ಹಿಂತಿರುಗಿ ನೋಡಲು ಸಾಧ್ಯವಾಗುತ್ತದೆ. ಈ ನಂಬಲಾಗದ ಉಪಕರಣಗಳು ದೂರದ ಗೆಲಕ್ಸಿಗಳು, ನೀಹಾರಿಕೆಗಳು ಮತ್ತು ಎಕ್ಸೋಪ್ಲಾನೆಟ್‌ಗಳ ಉಸಿರುಕಟ್ಟುವ ಚಿತ್ರಗಳನ್ನು ಸೆರೆಹಿಡಿಯುತ್ತವೆ, ವಿಜ್ಞಾನಿಗಳಿಗೆ ಅಭೂತಪೂರ್ವ ಡೇಟಾವನ್ನು ಒದಗಿಸುತ್ತವೆ. ಈ ಅಗಾಧವಾದ ಕಾಸ್ಮಿಕ್ ಮಾಹಿತಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಲು ಬ್ರಹ್ಮಾಂಡವನ್ನು ನಿಯಂತ್ರಿಸುವ ಮೂಲಭೂತ ನಿಯಮಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಸಾಮರ್ಥ್ಯವಿರುವ ಪ್ರಬಲ ಕಂಪ್ಯೂಟೇಶನಲ್ ಮಾದರಿಗಳ ಅಗತ್ಯವಿದೆ."
        ],
        "Malayalam": [
            "ആർട്ടിഫിഷ്യൽ ഇൻ്റലിജൻസിൻ്റെയും മെഷീൻ ലേണിംഗിൻ്റെയും ദ്രുതഗതിയിലുള്ള പുരോഗതി നമ്മുടെ ലോകത്തെ അടിസ്ഥാനപരമായി മാറ്റിമറിക്കുകയാണ്. തത്സമയം ഡസൻ കണക്കിന് ഭാഷകൾക്കിടയിൽ സുഗമമായി വിവർത്തനം ചെയ്യാൻ കഴിയുന്ന നാച്ചുറൽ ലാംഗ്വേജ് പ്രോസസ്സിംഗ് അൽഗോരിതങ്ങൾ മുതൽ, കോഡ് എഴുതുന്നതിനും സംഗീതം രചിക്കുന്നതിനും സഹായിക്കുന്ന ജനറേറ്റീവ് മോഡലുകൾ വരെ, സാധ്യതകൾ പരിധിയില്ലാത്തതായി തോന്നുന്നു. ഈ സാങ്കേതികവിദ്യ ഉൽപ്പാദനക്ഷമത വർദ്ധിപ്പിക്കുക മാത്രമല്ല, സർഗ്ഗാത്മകതയെയും പ്രശ്നപരിഹാരത്തെയും കുറിച്ചുള്ള നമ്മുടെ പരമ്പരാഗത ധാരണകളെ വെല്ലുവിളിക്കുകയും ചെയ്യുന്നു. ഈ സങ്കീർണ്ണ സംവിധാനങ്ങൾ വികസിപ്പിക്കുന്നത് നാം തുടരുമ്പോൾ, ടോക്കണൈസേഷൻ പോലെയുള്ള സാങ്കേതിക വിദ്യകളിലൂടെ അവ എങ്ങനെ വിവരങ്ങൾ പ്രോസസ്സ് ചെയ്യുന്നുവെന്ന് മനസ്സിലാക്കുന്നത് കൂടുതൽ നിർണായകമാകും.",
            "പ്രപഞ്ചത്തിൻ്റെ ആഴങ്ങൾ പര്യവേക്ഷണം ചെയ്യുന്നത് എക്കാലത്തെയും മനുഷ്യരാശിയുടെ ഏറ്റവും വലിയ അഭിലാഷങ്ങളിലൊന്നാണ്. അടുത്ത തലമുറ ബഹിരാകാശ ദൂരദർശിനികളുടെയും റോബോട്ടിക് പര്യവേക്ഷകരുടെയും വിക്ഷേപണത്തോടെ, നമുക്കിപ്പോൾ മുമ്പത്തേക്കാളും സമയത്തിലും ബഹിരാകാശത്തിലും തിരിഞ്ഞുനോക്കാൻ കഴിയും. ഈ അവിശ്വസനീയമായ ഉപകരണങ്ങൾ വിദൂര ഗാലക്സികൾ, നെബുലകൾ, എക്സോപ്ലാനറ്റുകൾ എന്നിവയുടെ ആശ്വാസകരമായ ചിത്രങ്ങൾ പകർത്തുകയും ശാസ്ത്രജ്ഞർക്ക് അഭൂതപൂർവമായ ഡാറ്റ നൽകുകയും ചെയ്യുന്നു. ഈ വിശാലമായ കോസ്മിക് വിവരങ്ങളെ വിശകലനം ചെയ്യുന്നതിന് പ്രപഞ്ചത്തെ നിയന്ത്രിക്കുന്ന അടിസ്ഥാന നിയമങ്ങളെ മനസ്സിലാക്കാൻ കഴിവുള്ള ശക്തമായ കമ്പ്യൂട്ടേഷണൽ മോഡലുകൾ ആവശ്യമാണ്."
        ],
        "Bengali": [
            "কৃত্রিম বুদ্ধিমত্তা এবং মেশিন লার্নিংয়ের দ্রুত অগ্রগতি আমাদের বিশ্বকে মৌলিকভাবে নতুন আকার দিচ্ছে। প্রাকৃতিক ভাষা প্রক্রিয়াকরণ অ্যালগরিদম যা রিয়েল-টাইমে ডজন খানেক ভাষার মধ্যে সাবলীলভাবে অনুবাদ করতে পারে, জেনারেটিভ মডেল যা কোড লিখতে এবং সঙ্গীত রচনা করতে সহায়তা করে, সম্ভাবনাগুলি সীমাহীন বলে মনে হয়। এই প্রযুক্তি কেবল উত্পাদনশীলতা বাড়ায় না বরং সৃজনশীলতা এবং সমস্যা সমাধানের আমাদের ঐতিহ্যগত বোঝার প্রতিও চ্যালেঞ্জ জানায়। আমরা যখন এই জটিল সিস্টেমগুলি বিকাশ করতে থাকি, টোকেনাইজেশনের মতো কৌশলগুলির মাধ্যমে তারা কীভাবে তথ্য প্রক্রিয়া করে তা বোঝা ক্রমশ গুরুত্বপূর্ণ হয়ে ওঠে।",
            "মহাবিশ্বের গভীরতা অন্বেষণ সর্বদা মানবতার সর্বশ্রেষ্ঠ উচ্চাকাঙ্ক্ষার একটি। পরবর্তী প্রজন্মের স্পেস টেলিস্কোপ এবং রোবোটিক এক্সপ্লোরার চালু করার সাথে সাথে আমরা এখন আগের চেয়ে অনেক দূরে সময় এবং স্থান দেখতে সক্ষম। এই অবিশ্বাস্য যন্ত্রগুলি দূরবর্তী ছায়াপথ, নীহারিকা এবং এক্সোপ্ল্যানেটগুলির শ্বাসরুদ্ধকর ছবি ক্যাপচার করে, বিজ্ঞানীদের একটি অভূতপূর্ব সম্পদের ডেটা প্রদান করে। এই বিশাল মহাজাগতিক তথ্য বিশ্লেষণ করার জন্য মহাজগতকে পরিচালনা করে এমন মৌলিক আইনগুলি বোঝার জন্য সক্ষম শক্তিশালী গণনামূলক মডেলের প্রয়োজন।"
        ],
        "Gujarati": [
            "આર્ટિફિશિયલ ઇન્ટેલિજન્સ અને મશીન લર્નિંગની ઝડપી પ્રગતિ આપણી દુનિયાને મૂળભૂત રીતે નવો આકાર આપી રહી છે. કુદરતી ભાષા પ્રક્રિયા અલ્ગોરિધમ્સથી જે રીઅલ-ટાઇમમાં ડઝનેક ભાષાઓ વચ્ચે અસ્ખલિત રીતે ભાષાંતર કરી શકે છે, જનરેટિવ મોડલ્સ કે જે કોડ લખવા અને સંગીત કંપોઝ કરવામાં મદદ કરે છે, શક્યતાઓ અમર્યાદિત લાગે છે. આ ટેક્નોલોજી માત્ર ઉત્પાદકતામાં વધારો જ નથી કરતી પણ સર્જનાત્મકતા અને સમસ્યા-નિરાકરણ વિશેની આપણી પરંપરાગત સમજને પણ પડકારે છે. જેમ જેમ આપણે આ જટિલ પ્રણાલીઓનો વિકાસ કરવાનું ચાલુ રાખીએ છીએ, તેમ તેઓ ટોકનાઈઝેશન જેવી તકનીકો દ્વારા માહિતીની પ્રક્રિયા કેવી રીતે કરે છે તે સમજવું વધુને વધુ નિર્ણાયક બને છે.",
            "બ્રહ્માંડની ઊંડાણોનું અન્વેષણ કરવું હંમેશા માનવતાની સૌથી મોટી મહત્વાકાંક્ષાઓમાંની એક છે. નેક્સ્ટ જનરેશન સ્પેસ ટેલિસ્કોપ અને રોબોટિક એક્સપ્લોરર્સના લોન્ચિંગ સાથે, અમે હવે પહેલા કરતા વધુ સમય અને અવકાશમાં પાછા જોવા માટે સક્ષમ છીએ. આ અકલ્પનીય સાધનો દૂરની તારાવિશ્વો, નિહારિકાઓ અને એક્સોપ્લેનેટ્સની આકર્ષક છબીઓ ખેંચે છે, જે વૈજ્ઞાનિકોને અભૂતપૂર્વ ડેટા પ્રદાન કરે છે. આ વિશાળ કોસ્મિક માહિતીનું પૃથ્થકરણ કરવા માટે બ્રહ્માંડનું સંચાલન કરતા મૂળભૂત નિયમોને સમજવા સક્ષમ શક્તિશાળી કોમ્પ્યુટેશનલ મોડલની જરૂર છે."
        ],
        "Marathi": [
            "कृत्रिम बुद्धिमत्ता आणि मशीन लर्निंगची वेगवान प्रगती आपले जग मूलभूतपणे बदलत आहे. रिअल-टाइममध्ये डझनभर भाषांमध्ये अस्खलितपणे भाषांतर करू शकणार्‍या नैसर्गिक भाषा प्रक्रियेच्या अल्गोरिदमपासून ते जनरेटिव्ह मॉडेल्सपर्यंत जे कोड लिहिण्यास आणि संगीत तयार करण्यात मदत करतात, शक्यता अमर्यादित वाटतात. हे तंत्रज्ञान केवळ उत्पादकतेतच वाढ करत नाही तर कल्पकता आणि समस्या-निराकरणाच्या आपल्या पारंपारिक समजालाही आव्हान देते. जसजसे आपण या जटिल प्रणाली विकसित करत राहतो, तसतसे ते टोकनायझेशन सारख्या तंत्राद्वारे माहितीवर प्रक्रिया कशी करतात हे समजून घेणे अधिक गंभीर बनते.",
            "विश्वाच्या खोलीचा शोध घेणे ही नेहमीच मानवतेच्या सर्वात मोठ्या महत्त्वाकांक्षांपैकी एक आहे. नेक्स्ट-जनरेशन स्पेस टेलिस्कोप आणि रोबोटिक एक्सप्लोरर्सच्या प्रक्षेपणासह, आम्ही आता पूर्वीपेक्षा खूप दूरपर्यंत वेळ आणि जागेत मागे पाहण्यास सक्षम आहोत. ही अविश्वसनीय उपकरणे दूरवरच्या आकाशगंगा, तेजोमेघ आणि एक्सोप्लॅनेटच्या चित्तथरारक प्रतिमा कॅप्चर करतात, ज्यामुळे शास्त्रज्ञांना डेटाचा अभूतपूर्व खजिना मिळतो. या अफाट वैश्विक माहितीचे विश्लेषण करण्यासाठी विश्वाचे नियमन करणार्‍या मूलभूत नियमांची उकल करण्यास सक्षम शक्तिशाली संगणकीय मॉडेल्सची आवश्यकता असते."
        ],
        "Urdu": [
            "مصنوعی ذہانت اور مشین لرننگ کی تیز رفتار ترقی ہماری دنیا کو بنیادی طور پر نئی شکل دے رہی ہے۔ قدرتی زبان کی پروسیسنگ الگورتھم سے لے کر جو حقیقی وقت میں درجنوں زبانوں کے درمیان روانی سے ترجمہ کر سکتے ہیں، جنریٹو ماڈلز تک جو کوڈ لکھنے اور موسیقی ترتیب دینے میں مدد کرتے ہیں، امکانات لامحدود نظر آتے ہیں۔ یہ ٹیکنالوجی نہ صرف پیداواری صلاحیت کو بڑھاتی ہے بلکہ تخلیقی صلاحیتوں اور مسئلہ حل کرنے کی ہماری روایتی سمجھ کو بھی چیلنج کرتی ہے۔ جیسے جیسے ہم ان پیچیدہ نظاموں کو تیار کرنا جاری رکھتے ہیں، یہ سمجھنا کہ وہ ٹوکنائزیشن جیسی تکنیکوں کے ذریعے معلومات پر کس طرح کارروائی کرتے ہیں تیزی سے اہم ہوتا جا رہا ہے۔",
            "کائنات کی گہرائیوں کو تلاش کرنا ہمیشہ سے انسانیت کی سب سے بڑی خواہشات میں سے ایک رہا ہے۔ اگلی نسل کی خلائی دوربینوں اور روبوٹک متلاشیوں کے آغاز کے ساتھ، ہم اب پہلے سے کہیں زیادہ وقت اور خلا میں پیچھے دیکھنے کے قابل ہیں۔ یہ ناقابل یقین آلات دور دراز کی کہکشاؤں، نیبولا اور ایکسپوپلینٹس کی دلکش تصاویر کھینچتے ہیں، جو سائنسدانوں کو بے مثال ڈیٹا فراہم کرتے ہیں۔ اس وسیع کائناتی معلومات کا تجزیہ کرنے کے لیے طاقتور کمپیوٹیشنل ماڈلز کی ضرورت ہوتی ہے جو کائنات کو چلانے والے بنیادی قوانین کو سمجھنے کے قابل ہوں۔"
        ]
    };

    // Make samples extremely large to fill the new UI layout
    Object.keys(languageSamples).forEach(lang => {
        languageSamples[lang] = languageSamples[lang].map(text => {
            return text + " " + text + " " + text + " " + text;
        });
    });

    let activeLanguage = "English";
    let currentSampleIndex = 0;

    // Tokenizer logic: split by words (Unicode-aware) or punctuation marks
    const tokenizeText = (text) => {
        if (!text) return [];
        return text.match(/[\p{L}\p{N}]+|[^\p{L}\p{N}\s]/gu) || [];
    };

    // Background Glow Trigger State
    let isLanguageSelected = false;

    const checkGlowState = () => {
        const isPromptEntered = searchInput && searchInput.value.trim().length > 0;
        const glowBg = document.getElementById('interactive-glow-bg');
        if (glowBg) {
            if (isLanguageSelected || isPromptEntered) {
                glowBg.classList.add('active');
            } else {
                glowBg.classList.remove('active');
            }
        }
    };

    // Live update tokenizer badges and stats
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const currentStats = { tokens: 0, chars: 0, fertility: 0 };

    const animateValue = (element, start, end, duration, isFloat = false) => {
        let startTime = null;
        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeProgress = easeOutExpo(progress);
            const current = start + (end - start) * easeProgress;
            element.textContent = isFloat ? current.toFixed(2) : Math.round(current);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = isFloat ? end.toFixed(2) : end;
            }
        };
        requestAnimationFrame(step);
    };

    const updateTokenizer = (text) => {
        if (!tokenizerOutput || !tokenBadgesList || !statTokensValue || !statCharsValue || !statFertilityValue) return;
        
        const trimmed = text.trim();
        if (!trimmed) {
            tokenBadgesList.innerHTML = '';
            checkGlowState();
            statTokensValue.textContent = '0';
            statCharsValue.textContent = '0';
            statFertilityValue.textContent = '0.00';
            currentStats.tokens = 0;
            currentStats.chars = 0;
            currentStats.fertility = 0;
            const gaugeFill = document.getElementById('stat-fertility-gauge');
            if (gaugeFill) gaugeFill.style.strokeDasharray = '0, 100';
            return;
        }
        
        const tokens = tokenizeText(trimmed);
        
        // Calculate stats
        const charCount = text.length;
        const words = trimmed.split(/[\s\p{P}]+/gu).filter(Boolean); // Split by space or punctuation to count words
        const wordCount = words.length;
        const fertility = wordCount > 0 ? (tokens.length / wordCount) : 1.00;
        
        // Animate DOM values
        animateValue(statTokensValue, currentStats.tokens, tokens.length, 500, false);
        animateValue(statCharsValue, currentStats.chars, charCount, 500, false);
        animateValue(statFertilityValue, currentStats.fertility, fertility, 500, true);
        
        currentStats.tokens = tokens.length;
        currentStats.chars = charCount;
        currentStats.fertility = fertility;

        // Update Gauge
        const gaugeFill = document.getElementById('stat-fertility-gauge');
        if (gaugeFill) {
            const maxFertility = 6.0;
            const percentage = Math.min((fertility / maxFertility) * 100, 100);
            gaugeFill.style.strokeDasharray = `${percentage}, 100`;
            
            if (fertility <= 2.0) {
                gaugeFill.style.stroke = '#10b981'; // Green for excellent fertility
            } else if (fertility <= 4.0) {
                gaugeFill.style.stroke = '#f59e0b'; // Orange for average
            } else {
                gaugeFill.style.stroke = '#ef4444'; // Red for poor
            }
        }
        
        // Render badges
        tokenBadgesList.innerHTML = '';
        tokens.forEach((token, index) => {
            const badge = document.createElement('div');
            badge.className = `token-badge ${index % 2 === 0 ? 'odd-token' : 'even-token'}`;
            
            // Format token text
            let displayToken = token;
            if (token === ' ') displayToken = ' ';
            badge.textContent = displayToken;
            
            tokenBadgesList.appendChild(badge);
        });

        checkGlowState();
    };

    // Helper to load a sample phrase
    const loadSampleForLanguage = (lang, cycle = false) => {
        if (!languageSamples[lang]) return;
        const samples = languageSamples[lang];
        if (cycle) {
            currentSampleIndex = (currentSampleIndex + 1) % samples.length;
        } else {
            currentSampleIndex = 0; // Default to first sample when switching languages
        }
        if (searchInput) {
            searchInput.value = samples[currentSampleIndex];
            
            // No more JS auto-resizing.
            
            // Update tokenizer
            
            // Update tokenizer
            updateTokenizer(searchInput.value);
            
            // Dispatch input event to trigger button toggles
            searchInput.dispatchEvent(new Event('input'));
            
            // Reset scroll positions to top so we don't stay scrolled down
            setTimeout(() => {
                searchInput.scrollTop = 0;
                const tokenList = document.getElementById('token-badges-list');
                if (tokenList) tokenList.scrollTop = 0;
            }, 10);
        }
    };

    // "TRY SAMPLE" Button
    if (trySampleBtn) {
        trySampleBtn.addEventListener('click', () => {
            loadSampleForLanguage(activeLanguage, false);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            loadSampleForLanguage(activeLanguage, true);
        });
    }



    // 2. Main Input Search Handler
    searchInput.addEventListener('input', () => {
        checkGlowState();

        // No more JS auto-resizing. Let CSS handle the 55% height.

        // Update tokenizer live display
        updateTokenizer(searchInput.value);

        // Toggle buttons
        if (searchInput.value.trim().length > 0) {
            if (voiceBtn) voiceBtn.style.display = 'none';
            if (trySampleBtn) trySampleBtn.style.display = 'none';
            if (clearBtn) clearBtn.style.display = 'flex';
        } else {
            if (voiceBtn) voiceBtn.style.display = 'flex';
            if (trySampleBtn) trySampleBtn.style.display = 'flex';
            if (clearBtn) clearBtn.style.display = 'none';
        }
    });

    // 3. Model Comparison Modal Handler
    const modelComparisonOverlay = document.getElementById('model-comparison-overlay');
    const modelComparisonClose = document.getElementById('model-comparison-close');
    
    if (tokenizerInfoBtn && modelComparisonOverlay) {
        tokenizerInfoBtn.addEventListener('click', () => {
            modelComparisonOverlay.classList.add('show');
            tokenizerInfoBtn.classList.add('comparison-active-btn');
        });
    }

    if (modelComparisonClose && modelComparisonOverlay) {
        modelComparisonClose.addEventListener('click', () => {
            modelComparisonOverlay.classList.remove('show');
            tokenizerInfoBtn.classList.remove('comparison-active-btn');
        });
    }

    // 4. Language Selection Dialog Handler
    if (selectLangBtn && langSelectorContainer && langModalClose) {
        selectLangBtn.addEventListener('click', () => {
            langSelectorContainer.classList.add('show');
        });

        langModalClose.addEventListener('click', () => {
            langSelectorContainer.classList.remove('show');
        });
    }

    // 5. Toggle Tokenizer Output Collapsible Content on Header Click
    const tokenizerHeader = document.getElementById('tokenizer-header');
    if (tokenizerHeader && tokenizerOutput) {
        tokenizerHeader.addEventListener('click', () => {
            tokenizerOutput.classList.toggle('expanded');
        });
    }

    // Language Grid Selection
    langCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            document.querySelectorAll('.lang-card').forEach(c => c.classList.remove('active'));
            // Add active class to selected card
            card.classList.add('active');

            // Update active status
            const lang = card.getAttribute('data-lang');
            activeLanguage = lang; // Update current active language
            
            if (activeLangStatus) {
                activeLangStatus.textContent = `Active: ${lang} • Model: Akshara 32K`;
            }

            // Trigger background gradient
            isLanguageSelected = true;
            checkGlowState();
            
            // Load new sample for this language immediately
            loadSampleForLanguage(lang, false);

            // Close modal with short delay
            setTimeout(() => {
                langSelectorContainer.classList.remove('show');
            }, 300);
        });
    });

    // Clear search and reset heights on mock send
    const handleSend = () => {
        // Clear voice state if active
        if (voiceBtn && voiceBtn.classList.contains('listening')) {
            voiceBtn.classList.remove('listening');
            searchInput.placeholder = "TYPE TO SEE TOKENS";
        }

        const text = searchInput.value.trim();
        if (text) {
            console.log(`Prompt submitted: ${text}`);
            searchInput.value = '';
            searchInput.style.height = 'auto';
            if (voiceBtn) voiceBtn.style.display = 'flex';
            updateTokenizer(''); // Clear tokenizer display
        }
    };

    // Toggle voice recording mockup
    if (voiceBtn) {
        voiceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            voiceBtn.classList.toggle('listening');
            if (voiceBtn.classList.contains('listening')) {
                searchInput.value = '';
                updateTokenizer('');
                searchInput.placeholder = "Listening...";
                searchInput.focus();
            } else {
                searchInput.placeholder = "TYPE TO SEE TOKENS";
            }
        });
    }

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // Generate starfield space theme
    const initStarfield = () => {
        const starfield = document.getElementById('starfield');
        if (!starfield) return;

        const starCount = 350;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 1; // 1px to 3px
            
            star.className = 'star glow'; // All stars can twinkle now!
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Duration between 4s and 12s so it twinkles infrequently
            star.style.animationDuration = `${Math.random() * 8 + 4}s`;
            // Random negative delay so they are all completely desynchronized from the start
            star.style.animationDelay = `-${Math.random() * 12}s`;
            
            fragment.appendChild(star);
        }
        starfield.appendChild(fragment);
    };

    initStarfield();
    
    // Load default sample immediately on page load
    loadSampleForLanguage(activeLanguage, false);
    
});
