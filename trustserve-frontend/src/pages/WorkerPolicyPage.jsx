import { useLanguage } from '../context/LanguageContext.jsx'

function WorkerPolicyPage() {
  const { tr, isHindi } = useLanguage()

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">{tr('Worker Policy')}</h1>
      <p className="mt-2 text-sm text-slate-400">{tr('Effective date: March 31, 2026')}</p>

      <section className="glass-card mt-6 space-y-4 rounded-2xl p-6 text-sm text-slate-300">
        {isHindi ? (
          <>
            <p>
              सेवा वर्कर्स को KYC पूरा करना होगा और सही प्रोफाइल विवरण, सेवा श्रेणियां और स्पष्ट
              मूल्य जानकारी देनी होगी।
            </p>
            <p>
              वर्कर्स से अपेक्षा है कि वे पेशेवर व्यवहार रखें, समय पर संवाद करें और ग्राहक के
              स्थान पर सुरक्षित सेवा प्रथाओं का पालन करें।
            </p>
            <p>
              बार-बार रद्द करना, बिना बताए न पहुंचना, दुर्व्यवहार या नकली दस्तावेज देने पर
              प्लेटफॉर्म से निलंबन या स्थायी हटाने की कार्रवाई हो सकती है।
            </p>
            <p>
              जहां लागू हो, वर्कर्स को स्थानीय लाइसेंस नियमों और शहर स्तर के नियमों का पालन करना
              आवश्यक है।
            </p>
          </>
        ) : (
          <>
            <p>
              Service workers must complete KYC and provide accurate profile details, service categories,
              and pricing transparency.
            </p>
            <p>
              Workers are expected to maintain professional behavior, timely communication, and safe
              service practices at customer locations.
            </p>
            <p>
              Repeated cancellations, no-shows, abuse, or fake documentation can lead to suspension or
              permanent removal from the platform.
            </p>
            <p>
              Workers must comply with local licensing requirements and city-level regulations where
              applicable.
            </p>
          </>
        )}
      </section>
    </main>
  )
}

export default WorkerPolicyPage
