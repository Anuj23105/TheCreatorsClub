import { useLanguage } from '../context/LanguageContext.jsx'

function PrivacyPage() {
  const { tr, isHindi } = useLanguage()

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">{tr('Privacy Policy')}</h1>
      <p className="mt-2 text-sm text-slate-400">{tr('Effective date: March 31, 2026')}</p>

      <section className="glass-card mt-6 space-y-4 rounded-2xl p-6 text-sm text-slate-300">
        {isHindi ? (
          <>
            <p>
              TrustServe प्लेटफॉर्म सेवाएं देने के लिए अकाउंट जानकारी, बुकिंग विवरण और संचार
              प्राथमिकताएं एकत्र करता है।
            </p>
            <p>
              इस जानकारी का उपयोग प्रमाणीकरण, सेवा मिलान, बुकिंग प्रबंधन और सुरक्षा जांच के लिए
              किया जाता है।
            </p>
            <p>
              व्यक्तिगत जानकारी किसी तीसरे पक्ष को बेची नहीं जाती। कानून के अनुसार आवश्यक होने पर
              जानकारी कानूनी या नियामक अधिकारियों के साथ साझा की जा सकती है।
            </p>
            <p>
              उपयोगकर्ता trustserve.help@gmail.com पर संपर्क करके प्रोफाइल अपडेट या अकाउंट हटाने
              का अनुरोध कर सकते हैं।
            </p>
          </>
        ) : (
          <>
            <p>
              TrustServe collects account information, booking details, and communication preferences to
              provide platform services.
            </p>
            <p>
              We use this information for authentication, service matching, booking management, and
              trust and safety checks.
            </p>
            <p>
              Personal information is not sold to third parties. Data may be shared with legal or
              regulatory authorities where required by law.
            </p>
            <p>
              Users can request profile updates or account deletion by contacting
              trustserve.help@gmail.com.
            </p>
          </>
        )}
      </section>
    </main>
  )
}

export default PrivacyPage
