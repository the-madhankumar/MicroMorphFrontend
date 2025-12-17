import React, { Component } from "react";
import "./index.css";

class Overlap extends Component {
  state = {
    apiResult: null,
    previewImage: null
  };

  originals = Array.from({ length: 10 }, (_, i) =>
    `/selected_images/${i + 1}.jpg`
  );

  masked = Array.from({ length: 10 }, (_, i) =>
    `/masked_images/${i + 1}.jpg`
  );

  counts = [9, 11, 10, 14, 8, 10, 11, 11, 11, 6];

  handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    this.setState({ previewImage: URL.createObjectURL(file) });

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/micro-eggs", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    this.setState({ apiResult: data });
  };

  render() {
    return (
      <div className="micro-eggs-container">

        <div className="images-grid">
          {this.originals.map((img, index) => (
            <div key={index} className="image-pair">
              <img src={img} className="folder-img" alt="original" />
              <img src={this.masked[index]} className="folder-img" alt="masked" />

              <div className="info">
                <p>Detected count: {this.counts[index]}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="upload-box">
          <input type="file" accept="image/*" onChange={this.handleFileUpload} />

          {this.state.previewImage && (
            <img
              src={this.state.previewImage}
              className="uploaded-preview"
              alt="uploaded"
            />
          )}

          {this.state.apiResult && (
            <div className="api-result">
              <p>Class: {this.state.apiResult.detected_class}</p>
              <p>Confidence: {this.state.apiResult.confidence}</p>
              <p>Count: {this.state.apiResult.count}</p>

              {this.state.apiResult.masked_image && (
                <img
                  src={`data:image/png;base64,${this.state.apiResult.masked_image}`}
                  className="masked-preview"
                  alt="result"
                />
              )}
            </div>
          )}
        </div>

      </div>
    );
  }
}

export default Overlap;
