import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
} from "chart.js";
import "./index.css";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default class GCAnalyzer extends Component {
    state = {
        file: null,
        positions: [],
        gcValues: [],
        prediction: "",
        chartData: null,
        gcSummary: null,
        loading: false
    };

    handleFileChange = (e) => {
        this.setState({ file: e.target.files[0] });
    };

    loadSequence = async () => {
        if (!this.state.file) {
            alert("Upload a .fna file");
            return;
        }

        this.setState({ loading: true, prediction: "", gcSummary: null });

        const formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("window_size", 1000);

        try {
            const res = await fetch("http://127.0.0.1:8000/compute-gc", {
                method: "POST",
                body: formData
            });

            if (!res.ok) throw new Error();

            const data = await res.json();

            this.setState({
                positions: data.positions,
                gcValues: data.gc_values,
                prediction: data.prediction,
                gcSummary: data.gc_summary,
                chartData: {
                    labels: data.positions,
                    datasets: [
                        {
                            label: "GC Content (%)",
                            data: data.gc_values,
                            borderWidth: 2,
                            borderColor: "white",
                            fill: false
                        }
                    ]
                },
                loading: false
            });
        } catch {
            this.setState({ loading: false });
            alert("Failed to process file.");
        }
    };

    render() {
        return (
            <div className="gc-wrapper">
                <input
                    type="file"
                    accept=".fna,.fa,.fasta"
                    onChange={this.handleFileChange}
                    className="gc-file-input"
                />

                <button
                    type="button"
                    onClick={this.loadSequence}
                    disabled={this.state.loading}
                    className="gc-btn"
                >
                    {this.state.loading ? "Analyzing..." : "Upload & Analyze"}
                </button>

                {this.state.loading && (
                    <div className="gc-loading">Processing data, please wait...</div>
                )}

                {this.state.prediction && !this.state.loading && (
                    <div className="gc-prediction">Prediction: {this.state.prediction}</div>
                )}

                {this.state.gcSummary && !this.state.loading && (
                    <div className="gc-summary">
                        <h2>GC Summary</h2>

                        <div className="gc-summary-info">
                            <div>GC Content: {this.state.gcSummary.gc_content}%</div>
                            <div>Length: {this.state.gcSummary.length} bp</div>
                        </div>

                        <table className="gc-summary-table">
                            <thead>
                                <tr>
                                    <th>Base</th>
                                    <th>Count</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(this.state.gcSummary.counts).map((b) => (
                                    <tr key={b}>
                                        <td>{b}</td>
                                        <td>{this.state.gcSummary.counts[b]}</td>
                                        <td>{this.state.gcSummary.percentages[b]}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {this.state.chartData && !this.state.loading && (
                    <div className="gc-chart">
                        <Line
                            data={this.state.chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        title: { display: true, text: "Genome Position (bp)", color: "white" },
                                        ticks: { color: "white" }
                                    },
                                    y: {
                                        title: { display: true, text: "GC Content (%)", color: "white" },
                                        ticks: { color: "white" }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        labels: { color: "white" }
                                    }
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        );
    }
}
