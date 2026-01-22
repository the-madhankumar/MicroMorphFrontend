import { Component } from "react";
import { withRouter } from "../../withRouter";
import BasicPie from "./PieChart";
import BasicLineChart from "./LineChart";
import KpiCard from "./kpiCard";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { getAllSensorData, getAllInferenceImages, getClassCounts, geo, getshowMainImage, getOrigImage } from "../FirebaseService/firebaseService.js";
import "./index.css";
import { RingLoader } from 'react-spinners';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class ShowImages extends Component {
    state = {
        showImageData: [],
        carouselIndex: 0,
        currentImageSpec: null,
        mainImage: null,
        origImage: null,
        piechartDataValues: [],
        sensorDataTime: [],
        sensorDataPh: [],
        sensorDatatds: [],
        sensorDataTemperature: [],
        sensorDataTurbidity: [],

        modalImage: null,
        showDataPh: true,
        showDataTemperature: false,
        showDataTurbidity: false,
        showDatatds: false,


        latitude: 0.0,
        longitude: 0.0,

        isLoading: false
    };

    componentDidUpdate(prevProps, prevState) {
        const prevClass = prevState.currentImageSpec?.final_class;
        const currClass = this.state.currentImageSpec?.final_class;

        if (currClass === "unknown" && prevClass !== "unknown") {
            fetch("http://localhost:8000/save")
                .then(res => res.json())
                .then(data => console.log("Saved:", data))
                .catch(err => console.error("Error:", err));
        }
    }


    async componentDidMount() {
        this.setState({
            isLoading: true,
        })
        const base64MainImage = await getshowMainImage();
        const imgSrc = `data:image/jpeg;base64,${base64MainImage}` || null;

        const base64MainImageOrig = await getOrigImage();
        const imgSrcOrig = `data:image/jpeg;base64,${base64MainImageOrig}` || null;

        const inferenceData = await getAllInferenceImages();
        const classCounts = await getClassCounts();
        const inferenceArray = Object.values(inferenceData || {});

        const piechartData = Object.entries(classCounts || {}).map(([label, value], i) => ({
            id: i,
            value: Number(value),
            label
        }));

        const sensor = await getAllSensorData();

        const sensorArr = Object.values(sensor || {}).slice(-10);
        console.log("[DEBUG enno vela panrom] sensor data : ", sensorArr.length)
        console.log("[DEBUG idhu mudiya ve mudiyadha] last data : ", sensorArr[sensorArr.length - 1])

        const geos = await geo();

        this.setState({
            mainImage: imgSrc,
            showImageData: inferenceArray,
            currentImageSpec: inferenceArray[0] || null,
            piechartDataValues: piechartData,
            sensorDataPh: sensorArr.map(x => x.ph),
            sensorDatatds: sensorArr.map(x => x.tds),
            sensorDataTemperature: sensorArr.map(x => x.temperature),
            sensorDataTurbidity: sensorArr.map(x => x.turbidity),
            sensorDataTime: sensorArr.map(x => x.timestamp),

            latitude: (geos.latitude == 0) ? 12.971581 : geos.latitude,
            longitude: (geos.longitude == 0) ? 80.043419 : geos.longitude,
            origImage: imgSrcOrig,
        });

        this.setState({
            isLoading: false,
        })
    }

    componentWillUnmount() {
        if (this.intervalId) clearInterval(this.intervalId);
    }

    showModal = (img) => {
        this.setState({ modalImage: img });
    };

    closeModal = () => {
        this.setState({ modalImage: null });
    };

    left = () => {
        const index = Math.max(this.state.carouselIndex - 1, 0);
        this.setState({
            carouselIndex: index,
            currentImageSpec: this.state.showImageData[index]
        });
    };

    right = () => {
        const index = Math.min(this.state.carouselIndex + 1, this.state.showImageData.length - 1);
        this.setState({
            carouselIndex: index,
            currentImageSpec: this.state.showImageData[index]
        });
    };

    pick = (type) => {
        this.setState({
            showDataPh: type === "ph",
            showDataTemperature: type === "temp",
            showDataTurbidity: type === "turb",
            showDatatds: type === "tds"
        });
    };

    render() {
        const s = this.state;
        console.log("[CHECK] currentImage specs : ", s.showImageData[s.carouselIndex])

        const yoloResult = this.props.location?.state?.yoloResult ?? false;
        const unknown = yoloResult === true;

        const lineData =
            s.showDataPh ? s.sensorDataPh :
                s.showDataTemperature ? s.sensorDataTemperature :
                    s.showDataTurbidity ? s.sensorDataTurbidity :
                        s.showDatatds ? s.sensorDatatds : [];

        return s.isLoading ? (
            <div className="global-loader">
                <RingLoader
                    color="#123abc"
                    size={180}
                />
            </div>) : (<div className="dashboard">

                <label className="panels">Image Panel</label>
                <div className="first-panel">
                    {s.modalImage && (
                        <div className="modal" onClick={this.closeModal}>
                            <img src={s.modalImage} className="modal-img" alt="main-image" />
                        </div>
                    )}

                    <div className="panel-row">
                        <button
                            className="main-btn"
                            onClick={() => this.showModal(s.origImage)}
                        >
                            Show Main Image
                        </button>

                        <div className="carousel">
                            <button
                                className="arrow"
                                disabled={s.carouselIndex === 0}
                                onClick={this.left}
                            >
                                <ArrowBigLeftDash size={40} />
                            </button>

                            {s.showImageData[s.carouselIndex] && (
                                <div
                                    className="crop-box"
                                    onClick={() =>
                                        this.showModal(
                                            `data:image/png;base64,${s.showImageData[s.carouselIndex].crop_image_url}`
                                        )
                                    }
                                >
                                    {/* <img
                                        className="crop-img"
                                        src={`data:image/png;base64,${s.showImageData[s.carouselIndex].crop_image_url}`}
                                    /> */}
                                    <div className="crop-index">{s.carouselIndex + 1}</div>
                                </div>
                            )}

                            <button
                                className="arrow"
                                disabled={s.carouselIndex === s.showImageData.length - 1}
                                onClick={this.right}
                            >
                                <ArrowBigRightDash size={40} />
                            </button>
                        </div>

                        <button
                            className="current-btn"
                            onClick={() =>
                                this.showModal(
                                    s.mainImage
                                )
                            }
                            disabled={!s.showImageData[s.carouselIndex]}
                        >
                            Show Current Crop
                        </button>
                    </div>
                </div>

                <label className="panels">
                    <div>KPI Panel</div>
                    <div className="result">Aggregated Result : {(unknown) ? "UNKNOWN" : s.currentImageSpec?.final_class ?? null}</div>
                </label>

                <div className="panel kpi-panel">
                    {s.currentImageSpec && s.currentImageSpec.model_outputs ? (
                        Object.entries(s.currentImageSpec.model_outputs).map(([model]) => (
                            <KpiCard
                                key={model}
                                model={model}
                                confidence={(unknown || s.currentImageSpec.confidence < 0.45) ? "N/A" : s.currentImageSpec.confidence?.[model] ?? null}
                                classification={(unknown || s.currentImageSpec.confidence < 0.45) ? "UNKNOWN" : s.currentImageSpec.model_outputs?.[model] ?? null}
                            />
                        ))
                    ) : (
                        <div>No Results</div>
                    )}
                </div>

                <div className="panel flex-row">
                    <div className="pie-area">
                        <label className="panels">Count Specification</label>
                        {(unknown) ? <img src="/images/un.png" alt="not found" style={{ height: '400px', width: '100%' }} /> : <BasicPie datavalues={s.piechartDataValues} />}
                    </div>

                    <div className="line-area">
                        <label className="panels">Geo Location</label>
                        {s.latitude && s.longitude && (
                            <MapContainer
                                center={[s.latitude, s.longitude]}
                                zoom={13}
                                scrollWheelZoom={false}
                                style={{ height: '400px', width: '100%' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={[s.latitude, s.longitude]} />
                            </MapContainer>
                        )}
                    </div>
                </div>

                <label className="panels">Water Analysis Specification</label>
                <div className="panel flex-row">
                    <div className="line-area">
                        <div className="line-select">
                            <div className={s.showDataPh ? "sel active" : "sel"} onClick={() => this.pick("ph")}>
                                pH : {s.sensorDataPh[s.sensorDataPh.length - 1]}
                            </div>
                            <div className={s.showDataTemperature ? "sel active" : "sel"} onClick={() => this.pick("temp")}>
                                Temp : {s.sensorDataTemperature[s.sensorDataPh.length - 1]}
                            </div>
                            <div className={s.showDataTurbidity ? "sel active" : "sel"} onClick={() => this.pick("turb")}>
                                Turb : {s.sensorDataTurbidity[s.sensorDataPh.length - 1]}
                            </div>
                            <div className={s.showDatatds ? "sel active" : "sel"} onClick={() => this.pick("tds")}>
                                TDS : {s.sensorDatatds[s.sensorDataPh.length - 1]}
                            </div>
                        </div>

                        <BasicLineChart xdata={s.sensorDataTime} ydata={lineData} />
                    </div>
                </div>
            </div>)
    }

}

export default withRouter(ShowImages);
