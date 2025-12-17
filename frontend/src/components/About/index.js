import React from "react";

import './index.css'

export default function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Micromorph</h1>

      <p className="about-section">
        <strong>Micromorph</strong> is an intelligent embedded microscopy platform designed to
        identify, classify, and count marine micro-organisms in real time, directly at the
        field level. Marine ecosystems change rapidly, but today’s monitoring methods are
        slow, manual, and laboratory-dependent. This delay often leads to late detection of
        harmful algal blooms, biodiversity loss, and economic damage to fisheries and coastal
        communities. Micromorph was built to close that gap.
      </p>

      <h2 className="about-card-title">What Micromorph Does</h2>

      <p>
        Micromorph combines advanced machine learning, embedded systems, and digital
        microscopy to create a portable, affordable, and scalable solution for marine
        micro-organism analysis.
      </p>

      <ul className="about-section">
        <li>Captures microscopic images using a digital USB microscope</li>
        <li>Processes data on an embedded computing platform</li>
        <li>Uses a five-model ensemble intelligence for accuracy</li>
        <li>Delivers real-time identification, counting, and ecological insights</li>
      </ul>

      <p>It works in labs, coastal stations, boats, hatcheries, and remote field locations.</p>

      <h2 className="about-card-title">How Micromorph Thinks Differently</h2>

      <p>
        Unlike systems that depend on one model or manual interpretation, Micromorph uses
        multiple perspectives to understand each organism:
      </p>

      <ul className="about-section">
        <li>Fast visual detection to ensure no organism is missed</li>
        <li>Biological parameter analysis using 131 morphological features</li>
        <li>Precise shape segmentation for overlapping organisms</li>
        <li>Deep feature understanding for species-level recognition</li>
        <li>Embedding-based similarity learning for unseen organisms</li>
      </ul>

      <p>
        These viewpoints are merged using a max-voting ensemble strategy, producing results
        that are both reliable and biologically meaningful.
      </p>

      <h2 className="about-card-title">Built for Real Marine Challenges</h2>

      <p>Marine samples are complex:</p>

      <ul className="about-section">
        <li>Organisms overlap</li>
        <li>Boundaries are transparent</li>
        <li>Species look visually similar</li>
        <li>New organisms appear over time</li>
      </ul>

      <p>
        Micromorph is engineered specifically for these realities. When unseen organisms are
        detected, the system stores them, learns from expert input, and continuously improves
        over time.
      </p>

      <h2 className="about-card-title">Beyond Identification: Marine Intelligence</h2>

      <p>Micromorph also integrates water quality analysis, measuring parameters such as:</p>

      <ul className="about-section">
        <li>pH</li>
        <li>Temperature</li>
        <li>Turbidity</li>
        <li>Dissolved oxygen</li>
        <li>Salinity</li>
      </ul>

      <p>
        By combining biological and environmental data, Micromorph helps predict organism
        growth trends and ecological risks, enabling early warnings before disruptions occur.
      </p>

      <h2 className="about-card-title">Our Vision</h2>

      <p>
        To make advanced marine micro-organism analysis accessible, real-time, and
        field-deployable—supporting researchers, institutions, and policymakers in protecting
        ocean health.
      </p>
    </div>
  );
}
