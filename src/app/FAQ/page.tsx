import Header from "../components/header"

export const dynamic = 'force-static'

type FAQ = {
  id: number
  title: string
  body: string
}


async function getFAQs(): Promise<FAQ[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!res.ok) {
        throw new Error('Failed to fetch FAQs')
    }

    return res.json()
}

async function FAQPage() {
    const faqs = await getFAQs()

    return <>
        <Header title="FAQ" showBack></Header>
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

            <ul className="space-y-4">
                {faqs.map((faq) => (
                    <li key={faq.id} className="border rounded p-4">
                        <h2 className="font-semibold">{faq.title}</h2>
                        <p className="text-gray-600 mt-2">{faq.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    </>
    
}

export default FAQPage