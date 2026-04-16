import ReasonCard from "./ReasonCard";
import "./reasons.css";

const ReasonsSection = () => {
    const reasons = [
        {
            title: "Teach your way",
            description:
                "Publish the course you want, in the way you want, and always have control of your own content.",
            icon: "🧑‍🏫",
        },
        {
            title: "Inspire learners",
            description:
                "Teach what you know and help learners explore their interests, gain new skills, and advance their careers.",
            icon: "🌍",
        },
        {
            title: "Get rewarded",
            description:
                "Expand your professional network, build your expertise, and earn money on each paid enrollment.",
            icon: "🏆",
        },
    ];

    const stats = [
        { number: "80M", label: "Students" },
        { number: "75+", label: "Languages" },
        { number: "1.1B", label: "Enrollments" },
        { number: "180+", label: "Countries" },
        { number: "17,200+", label: "Enterprise customers" },
    ];

    return (
        <section className="reasons-section">
            <h2 className="title">So many reasons to start</h2>

            <div className="reasons-container">
                {reasons.map((item, index) => (
                    <ReasonCard key={index} {...item} />
                ))}
            </div>

            <div className="stats-bar">
                {stats.map((stat, index) => (
                    <div className="stat" key={index}>
                        <h3>{stat.number}</h3>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ReasonsSection;