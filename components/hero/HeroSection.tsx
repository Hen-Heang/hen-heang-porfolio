import React from 'react';
import {HeroContent} from "@/components/hero/HeroContent";
import {HeroImage} from "@/components/hero/HeroImage";

const HeroSection = () => {
    return (
        <section id="home">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <HeroContent />
                    <HeroImage />
                </div>
            </div>
        </section>

    );
};

export default HeroSection;