import { useLanguage } from '../context/LanguageContext.jsx'

function TermsPage() {
  const { tr, isHindi } = useLanguage()

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">{tr('Terms of Service')}</h1>
      <p className="mt-2 text-sm text-slate-400">{tr('Effective date: March 31, 2026')}</p>

      <section className="glass-card mt-6 space-y-4 rounded-2xl p-6 text-sm text-slate-300">
        {isHindi ? (
          <>
            <p>
              TrustServe एक प्लेटफॉर्म है जो ग्राहकों को सत्यापित स्थानीय सेवा वर्कर्स से जोड़ता है।
              इस प्लेटफॉर्म का उपयोग करके आप इन शर्तों और लागू कानूनों का पालन करने के लिए सहमत होते हैं।
            </p>
            <p>
              उपयोगकर्ताओं को सही अकाउंट जानकारी देनी होगी। वर्कर्स को अपनी सेवा, उपलब्धता
              और सत्यापन जानकारी समय-समय पर अपडेट रखनी होगी।
            </p>
            <p>
              TrustServe खोज और बुकिंग की सुविधा देता है, लेकिन सेवा की गुणवत्ता और निष्पादन
              की जिम्मेदारी सेवा के समय संबंधित वर्कर और ग्राहक की होगी।
            </p>
            <p>
              धोखाधड़ी, नीति उल्लंघन या प्लेटफॉर्म के गलत उपयोग पर अकाउंट निलंबित करने का अधिकार
              TrustServe के पास सुरक्षित है।
            </p>
          </>
        ) : (
          <>
            <p>
              TrustServe is a platform that connects customers with verified local service workers.
              By using this platform, you agree to comply with these terms and all applicable laws.
            </p>
            <p>
              Users must provide accurate account details. Workers must maintain updated service,
              availability, and verification records.
            </p>
            <p>
              TrustServe facilitates discovery and booking, but the quality of service execution remains
              the responsibility of the individual worker and customer at the time of service.
            </p>
            <p>
              We reserve the right to suspend accounts for fraudulent behavior, policy violations, or
              misuse of the platform.
            </p>
          </>
        )}
      </section>
    </main>
  )
}

export default TermsPage
