const ReasonCard = ({ title, description, icon }) => {
    return (
        <div className="reason-card">
            <div className="icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default ReasonCard;