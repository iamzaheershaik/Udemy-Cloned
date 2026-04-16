import { useState } from "react";
import "./HowToBegin.css";
import img1 from "./images/img1.webp";
import img2 from "./images/img2.webp";
import img3 from "./images/img3.webp";

const HowToBegin = () => {
    const steps = [
        {
            title: "Plan your curriculum",
            text: `You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.`,
            help: `We offer plenty of resources on how to create your first course. Our instructor dashboard helps keep you organized.`,
            image: img1,
        },
        {
            title: "Record your video",
            text: `Use basic equipment to record your lessons. Our resources help you create engaging content easily.`,
            help: `Learn recording best practices and editing tips from our teaching center.`,
            image: img2,
        },
        {
            title: "Launch your course",
            text: `Publish your course and reach millions of students worldwide.`,
            help: `Our marketplace promotes your course and helps grow your audience.`,
            image: img3,
        },
    ];

    const [active, setActive] = useState(0);

    return (
        <section className="how-section">
            <h2>How to begin</h2>

            {/* Tabs */}
            <div className="tabs">
                {steps.map((step, index) => (
                    <button
                        key={index}
                        className={active === index ? "active" : ""}
                        onClick={() => setActive(index)}
                    >
                        {step.title}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="how-content">
                <div className="text">
                    <p>{steps[active].text}</p>

                    <h4>How we help you</h4>
                    <p>{steps[active].help}</p>
                </div>

                <div className="image">
                    <img src={steps[active].image} alt="step" />
                </div>
            </div>
        </section>
    );
};

export default HowToBegin;