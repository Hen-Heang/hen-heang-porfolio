import React from 'react';
import {HeroContent} from "@/components/hero/HeroContent";
import {HeroImage} from "@/components/hero/HeroImage";
import {usePathname} from "next/navigation";

const HeroSection = () => {
    const pathname = usePathname();

    const useAvatar = pathname !== "/";

    return (
        <section id="home">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center py-12">
                    <HeroContent />
                    <HeroImage useAvatar={useAvatar} />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;