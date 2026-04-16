import { useState } from "react";
import "./TestimonialSlider.css";

import img1 from "./images/img1.webp";
import img2 from "./images/img2.webp";
import img3 from "./images/img3.webp";

const TestimonialSlider = () => {
    const testimonials = [
        {
            image: img2,
            text:
                "“I’m proud to wake up knowing my work is helping people around the world improve their careers and build great things. While being a full-time instructor is hard work, it lets you work when, where, and how you want.”",
            name: "Frank Kane",
            role: "Data Science & IT Certifications",
        },
        {
            image: img1,
            text:
                "“Udemy has changed my life. It’s allowed me to follow my passion and become a teacher I love to see my students succeed and hear them say they’ve learned more, quicker, from my courses than they did in college. It’s so humbling.”",
            name: "Paulo Dichone",
            role: "Developer (Android Speciality)",
        },
        {
            image: img3,
            text:
                "“Teaching on Udemy has provided me with two important elements: the opportunity to reach more learners than I ever would be able to on my own and a steady stream of extra income.”",
            name: "Deborah Grayson Riege",
            role: "Leadership, Communication",
        },
    ];

    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
    };

    return (
        <section className="slider-section">
            <button className="arrow left" onClick={prevSlide}>
                ❮
            </button>

            <div className="slider">
                <img
                    src={testimonials[current].image}
                    alt="user"
                    className="slider-img"
                />

                <div className="slider-text">
                    <p>"{testimonials[current].text}"</p>
                    <h4>{testimonials[current].name}</h4>
                    <span>{testimonials[current].role}</span>
                </div>
            </div>

            <button className="arrow right" onClick={nextSlide}>
                ❯
            </button>
        </section>
    );
};

export default TestimonialSlider;