import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, get, update, remove, onValue } from "firebase/database";
import firebaseConfig from "./config.mjs";
import { getRemoteConfig } from "firebase/remote-config";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const remoteConfig = getRemoteConfig(app);

export function addSensorData(data) {
  const newRef = push(ref(db, "sensor_data"));
  return set(newRef, {
    temperature: data.temperature,
    tds: data.tds,
    turbidity: data.turbidity,
    ph: data.ph,
    latitude: 25.3356491,
    longitude: 83.0076292,
    timestamp: Date.now()
  });
}

export function addLogs(data) {
  const newRef = push(ref(db, "logs"));
  return set(newRef, {
    longitude: data.longitude,
    latitude: data.latitude,
    depth: data.depth,
    microscope: data.microscope,
    date: data.date,
    time: data.time,
    ship_name: data.ship_name,
    image: data.image,
    yolo: data.yolo,
    timestamp: Date.now()
  });
}

export async function getAllSensorData() {
  const s = await get(ref(db, "sensor_data"));
  return s.exists() ? s.val() : {};
}

export async function getSensorDataById(id) {
  const s = await get(ref(db, `sensor_data/${id}`));
  return s.exists() ? s.val() : null;
}

export function updateSensorData(id, updatedData) {
  return update(ref(db, `sensor_data/${id}`), updatedData);
}

export function deleteSensorData(id) {
  return remove(ref(db, `sensor_data/${id}`));
}

export function listenSensorData(callback) {
  onValue(ref(db, "sensor_data"), snap => {
    callback(snap.exists() ? snap.val() : {});
  });
}

export async function getAllInferenceImages() {
  const s = await get(ref(db, "inference_images"));
  return s.exists() ? s.val() : {};
}

export async function getInferenceImageById(id) {
  const s = await get(ref(db, `inference_images/${id}`));
  return s.exists() ? s.val() : null;
}

export function listenInferenceImages(callback) {
  onValue(ref(db, "inference_images"), snap => {
    callback(snap.exists() ? snap.val() : {});
  });
}

export async function getMainImages() {
  const s = await get(ref(db, "/main_image/yolo_output"));
  return s.exists() ? s.val() : {};
}

export async function getMainImage() {
  const s = await get(ref(db, "/main_image"));
  return s.exists() ? s.val() : {};
}

export async function getshowMainImage(params) {
  const s = await get(ref(db, "/main_image_/yolo_output"));
  return s.exists() ? s.val() : {};
}

export async function getOrigImage(params) {
  const s = await get(ref(db, "/main_image_/orig_image"));
  return s.exists() ? s.val() : {};
}

export async function getClassCounts() {
  const s = await get(ref(db, "class_counts"));
  return s.exists() ? s.val() : {};
}

export function listenClassCounts(callback) {
  onValue(ref(db, "class_counts"), snap => {
    callback(snap.exists() ? snap.val() : {});
  });
}

export async function geo() {
  const s = await get(ref(db, "sensor_data"));
  if (!s.exists()) return null;

  const data = s.val();
  const keys = Object.keys(data);
  const last = data[keys[keys.length - 1]];

  return {
    latitude: last.latitude,
    longitude: last.longitude
  };
}

export { db };
