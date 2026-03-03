import { ArrowRight } from "lucide-react";

export function NewsletterSection() {
    return (
        <section className="w-full bg-deity-green overflow-hidden py-12 lg:py-[174px] px-4 lg:px-[104px]">
            <div className="relative max-w-[1354px] mx-auto">
                {/* Left: Large Text */}
                <div className="mb-12 lg:mb-0">
                    <h2 className="text-deity-green-light text-left font-normal text-[clamp(60px,10vw,128px)] leading-none uppercase">
                        Unlock
                        <br />
                        <span className="block lg:ml-16">Exclusive</span>
                        <br />
                        Drops
                    </h2>
                </div>

                {/* Right: Form */}
                <div className="lg:absolute lg:right-0 lg:top-0 lg:w-[513px] space-y-12">
                    {/* Full Name */}
                    <div>
                        <label className="text-white text-xl font-semibold uppercase block mb-3">
                            Full Name
                        </label>
                        <div className="h-px bg-white w-full" />
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        <div>
                            <label className="text-white text-xl font-semibold uppercase block mb-3">
                                Email
                            </label>
                            <div className="h-px bg-white w-full" />
                        </div>
                        <div>
                            <label className="text-white text-xl font-semibold uppercase block mb-3">
                                Phone
                            </label>
                            <div className="h-px bg-white w-full" />
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="text-white text-xl font-semibold uppercase block mb-3">
                            Message
                        </label>
                        <div className="h-px bg-white w-full" />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-8">
                        <button className="text-white hover:opacity-70 transition-opacity">
                            <ArrowRight className="w-8 h-8" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewsletterSection;
