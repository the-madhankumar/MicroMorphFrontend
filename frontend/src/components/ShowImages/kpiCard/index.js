import "./index.css";

const KpiCard = ({ model, confidence, classification }) => {
    const conf =
        confidence != null && !isNaN(confidence)
            ? confidence.toFixed(2)
            : "N/A";

    return (
        <div className="kpiCard-container">
            <label>{model}</label>
            <p>{conf}</p>
            <p>{classification}</p>
        </div>
    );
};

export default KpiCard;
