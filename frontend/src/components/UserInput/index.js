import { Component } from "react";
import { MonitorUp, StepForward } from "lucide-react";
import { CustomWebcam } from "./CustomWebcam";
import { SpinnerCircular } from "spinners-react";
import { withRouter } from "../../withRouter";
import { addLogs, getMainImage, remoteConfig } from "../FirebaseService/firebaseService";
import { fetchAndActivate } from "firebase/remote-config";
import "./index.css";

class UserInput extends Component {
    state = {
        live: true,
        upload: false,
        imgSrc: null,
        loading: false,
        longitude: "",
        latitude: "",
        depth: "",
        microscope: "",
        date: "",
        time: "",
        ship_name: "",
        
        base_url: ""
    };

    componentDidMount() {
        fetchAndActivate(remoteConfig)
            .then(() => {
                const baseUrl = remoteConfig
                    .getValue("base_url")
                    .asString();

                this.setState({
                    base_url: baseUrl || ""
                });
            })
            .catch((error) => {
                console.error("Remote Config error:", error);
            });
    }


    handleCapture = (img) => {
        this.setState({ imgSrc: img });
    };

    handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            this.setState({ imgSrc: URL.createObjectURL(file) });
        }
    };

    handleFetchFirebase = async () => {
        try {
            this.setState({ loading: true });
            const data = await getMainImage();
            if (data && data.image) {
                this.setState({ imgSrc: data.image });
            } else {
                alert("No main image found in Firebase.");
            }
        } catch {
            alert("Failed to fetch image from Firebase.");
        } finally {
            this.setState({ loading: false });
        }
    };

    handleNextButton = async () => {
        const { imgSrc } = this.state;

        if (!imgSrc) {
            alert("Please capture, upload, or fetch an image first.");
            return;
        }

        try {
            this.setState({ loading: true });
            const formData = new FormData();

            const fileInput = document.querySelector(".upload-input");
            if (fileInput && fileInput.files[0]) {
                formData.append("file", fileInput.files[0]);
            } else {
                const blob = await fetch(imgSrc).then((r) => r.blob());
                formData.append("file", blob, "capture.jpg");
            }

            const baseUrl = this.state.base_url.replace(/\/$/, "");

            const response = await fetch(`${baseUrl}/yolo`, {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            console.log(data.error)
            if ("error" in data) {
                console.log(true);
            }


            await addLogs({
                longitude: this.state.longitude,
                latitude: this.state.latitude,
                depth: this.state.depth,
                microscope: this.state.microscope,
                date: this.state.date,
                time: this.state.time,
                ship_name: this.state.ship_name,
                image: imgSrc,
                yolo: data,
                timestamp: Date.now()
            });

            this.props.navigate("/showimages", {
                state: {
                    imgSrc,
                    yoloResult: data,
                    formData: {
                        longitude: this.state.longitude,
                        latitude: this.state.latitude,
                        depth: this.state.depth,
                        microscope: this.state.microscope,
                        date: this.state.date,
                        time: this.state.time,
                        ship_name: this.state.ship_name
                    }
                }
            });
        } catch {
            alert("Image processing failed.");
        } finally {
            this.setState({ loading: false });
        }
    };

    toggleLive = () => {
        this.setState({
            live: true,
            upload: false,
            imgSrc: null
        });
    };

    toggleUpload = () => {
        this.setState({
            live: false,
            upload: true,
            imgSrc: null
        });
    };

    render() {
        const { live, upload, imgSrc, loading } = this.state;

        return (
            <div className="UserInput-container">
                {loading && (
                    <div className="loading-overlay">
                        <SpinnerCircular size={90} thickness={120} speed={120} color="#4fc3f7" secondaryColor="#ffffff" />
                        <p className="loading-text">Processing...</p>
                    </div>
                )}

                <form className="form-container">
                    <div className="input-row">
                        <div className="input-group">
                            <label>Longitude</label>
                            <input
                                type="number"
                                value={this.state.longitude}
                                onChange={(e) => this.setState({ longitude: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <label>Latitude</label>
                            <input
                                type="number"
                                value={this.state.latitude}
                                onChange={(e) => this.setState({ latitude: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>Depth</label>
                            <input
                                type="number"
                                value={this.state.depth}
                                onChange={(e) => this.setState({ depth: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <label>Select Microscope</label>
                            <select
                                value={this.state.microscope}
                                onChange={(e) => this.setState({ microscope: e.target.value })}
                            >
                                <option value="">Choose Microscope</option>
                                <option value="ISIIS">ISIIS</option>
                                <option value="ZooScan">ZooScan</option>
                                <option value="FlowCam">FlowCam</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>Date</label>
                            <input
                                type="date"
                                value={this.state.date}
                                onChange={(e) => this.setState({ date: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <label>Time</label>
                            <input
                                type="time"
                                value={this.state.time}
                                onChange={(e) => this.setState({ time: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group full-width">
                            <label>Ship Name</label>
                            <input
                                type="text"
                                value={this.state.ship_name}
                                onChange={(e) => this.setState({ ship_name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        {live && (
                            <div className="input-group full-width">
                                <label>Live Image</label>
                                <CustomWebcam onCapture={this.handleCapture} />
                            </div>
                        )}

                        {upload && (
                            <div className="input-group full-width">
                                <label>Upload Image</label>
                                <label className="upload">
                                    <MonitorUp size={40} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={this.handleUpload}
                                        className="upload-input"
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    {imgSrc && <img src={imgSrc} alt="preview" className="uploaded-preview" />}

                    <div className="input-row">
                        <button type="button" onClick={this.toggleLive} className="cus-button">Live</button>
                        <button type="button" onClick={this.toggleUpload} className="cus-button">Upload</button>
                        <button type="button" onClick={this.handleFetchFirebase} className="cus-button">Fetch Firebase</button>
                    </div>

                    <button type="button" className="custom-next-button" onClick={this.handleNextButton}>
                        <span className="btn-text">Next</span>
                        <span className="btn-file"><StepForward /></span>
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(UserInput);
