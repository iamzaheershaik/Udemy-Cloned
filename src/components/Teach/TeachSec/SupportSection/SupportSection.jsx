import "./SupportSection.css";
import leftImg from "./images/left.webp";
import rightImg from "./images/right.webp";

const SupportSection = () => {
    return (
        <section className="support">

            <div className="support-img left">
                <img src={leftImg} alt="support left" />
            </div>

            <div className="support-content">
                <h2>You won’t have to do it alone</h2>

                <p>
                    Our Instructor Support Team is here to answer your questions and
                    review your test video, while our Teaching Center gives you plenty
                    of resources to help you through the process. Plus, get the support
                    of experienced instructors in our online community.
                </p>

                <a href="/">Need more details before you start? Learn more.</a>
            </div>

            <div className="support-img right">
                <img src={rightImg} alt="support right" />
            </div>

        </section>
    );
};

export default SupportSection;