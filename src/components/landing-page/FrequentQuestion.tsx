import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

function CustomAccordionItem({ title, des, value }: { title: string, des: string, value: string }) {
    return (
        <AccordionItem value={value}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent className="text-gray-500">
                {des}
            </AccordionContent>
        </AccordionItem>

    )
}


const accordionItems = [
    {
        title: "Why ShareRes exist?",
        des: "My goal is make everyone can findout learning resources as fast as possible and make them not stuck on the learning process."
    },
    {
        title: "Who developed this app?",
        des: "This app is developed by Kaung Myat Kyaw who is also still on learning process."
    },
    {
        title: "What is next?",
        des: "I will also make this app to can upload blog , ask questions like stackoverflow , etc....."
    }
]

export const FrequentQuestion = () => {
    return (
        <section id='qus' className='py-32 pt-12 flex justify-center items-center'>
            <div className='md:w-[500px] w-full space-y-8 h-fit'>
                <h1 className='font-bold text-3xl text-center'>Frequently asked questions?</h1>
                <Accordion type="single" collapsible className="w-full">
                    {accordionItems.map((ac, index) => <CustomAccordionItem title={ac.title} des={ac.des} value={`${index}`} key={index} />)}
                </Accordion>
                <p className="text-gray-500 text-center">You can ask more questions via my <Link target="__blank" href={"mailto:kaungmyatkyaw2030@gmail.com"} className="underline">email</Link>.</p>
            </div>
        </section>
    )
}
