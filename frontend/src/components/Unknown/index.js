import React, { Component } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "./index.css";

function importImages(r) {
  return r.keys().map(r);
}

class Unknown extends Component {
  state = {
    openFolder: null
  };

  folders = [
    { id: 1, name: "u1", images: importImages(require.context("./Unknowns/u1", false, /\.(png|jpe?g|webp)$/)) },
    { id: 2, name: "u2", images: importImages(require.context("./Unknowns/u2", false, /\.(png|jpe?g|webp)$/)) }
  ];

  downloadZip = async (folder) => {
    const zip = new JSZip();
    const imgFolder = zip.folder(folder.name);

    const promises = folder.images.map(async (img, index) => {
      const res = await fetch(img);
      const blob = await res.blob();
      imgFolder.file(`image_${index + 1}.jpg`, blob);
    });

    await Promise.all(promises);
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${folder.name}.zip`);
  };

  toggleFolder = (id) => {
    this.setState({
      openFolder: this.state.openFolder === id ? null : id
    });
  };

  render() {
    return (
      <div className="unknown-container">
        {this.folders.map((folder) => (
          <div key={folder.id} className="unknown-card">
            <div className="card-header">
              <div className="preview-box">
                <img src={folder.images[0]} alt="" className="preview-img" />
              </div>

              <span className="card-id">{folder.id}</span>
              <span className="card-name">Unknown</span>

              <button className="action-btn" onClick={() => this.downloadZip(folder)}>
                Download ZIP
              </button>

              <button className="action-btn show-btn" onClick={() => this.toggleFolder(folder.id)}>
                Show Images
              </button>
            </div>

            {this.state.openFolder === folder.id && (
              <div className="images-grid">
                {folder.images.map((img, i) => (
                  <img key={i} src={img} alt="" className="folder-img" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default Unknown;
