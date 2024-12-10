import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import css from "./Collapse.module.css";
import { Icon as CustomArrow } from "../Icon/Icon";

// A type for the FAQ item
type FAQItem = {
  key: string;
  label: string;
  children: React.ReactNode;
};

// FAQAccordion component
const FAQAccordion: React.FC = () => {
  const defaultKeys = window.innerWidth >= 1440 ? ["2"] : [];
  const faqData: FAQItem[] = [
    {
      key: "1",
      label: "1. What are the different types of virtual headsets available?",
      children: (
        <ul>
          <li>
            <strong>Standalone Headsets:</strong> These do not require a PC or
            console. Example: Meta Quest 2.
          </li>
          <li>
            <strong>PC-Tethered Headsets:</strong> Require a powerful PC for
            operation. Examples: Valve Index, HTC Vive Pro 2.
          </li>
          <li>
            <strong>Console-Specific Headsets:</strong> Designed to work with
            specific consoles. Example: Sony PlayStation VR2.
          </li>
          <li>
            <strong>Windows Mixed Reality Headsets:</strong> Offer compatibility
            with Windows platforms. Examples: HP Reverb G2, Samsung Odyssey+.
          </li>
        </ul>
      ),
    },
    {
      key: "2",
      label: "2. How does a virtual headset work?",
      children: (
        <p>
          Virtual headsets are equipped with various sensors to track the user's
          movements. These sensors can include accelerometers, gyroscopes, and
          sometimes external cameras or base stations. They constantly monitor
          the position and orientation of the headset and sometimes the user's
          hand controllers. The headset has one or two high-resolution displays,
          one for each eye, positioned in front of the user's eyes. These
          displays show stereoscopic 3D images, creating a sense of depth and
          immersion. Between the displays and the user's eyes, help focus the
          images and adjust them for the user's field of view.
        </p>
      ),
    },
    {
      key: "3",
      label: "3. Do I need a powerful computer to use a virtual headset?",
      children: (
        <div>
          It depends on the type of headset:
          <ul>
            <li>
              <strong>Standalone Headsets:</strong> No powerful computer is
              needed as these headsets operate independently.
            </li>
            <li>
              <strong>PC-Tethered Headsets:</strong> Yes, they require a capable
              computer. For example:
              <ul>
                <li>
                  Valve Index: Intel i5-4590 / AMD Ryzen 5 1500X, 8 GB RAM, USB
                  3.0, Windows 10.
                </li>
                <li>HTC Vive Pro 2: Similar requirements as Valve Index.</li>
              </ul>
            </li>
            <li>
              <strong>Console-Specific Headsets:</strong> Require the compatible
              console (e.g., PlayStation 5 for Sony PlayStation VR2).
            </li>
          </ul>
        </div>
      ),
    },
    {
      key: "4",
      label: "4. What are the main applications of virtual headsets?",
      children: (
        <div>
          Virtual headsets are used in various domains, such as:
          <ul>
            <li>
              <strong>Gaming:</strong> Immersive gaming experiences with
              platforms like Meta Quest 2 and Valve Index.
            </li>
            <li>
              <strong>Media Consumption:</strong> Watching movies or videos in
              VR (e.g., Samsung Odyssey+).
            </li>
            <li>
              <strong>Professional Applications:</strong> Design, simulation,
              and training (e.g., HTC Vive Pro 2).
            </li>
            <li>
              <strong>Education and Training:</strong> Simulations and virtual
              learning environments.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className={css.collapseWrapper}>
      <Collapse
        defaultActiveKey={defaultKeys}
        accordion
        expandIcon={({ isActive }) => (
          <CustomArrow
            id="icon-arrow-collapse"
            className={isActive ? css.activeIcon : css.defaultIcon}
          />
        )}
        expandIconPosition="end"
        items={faqData.map((item) => ({
          key: item.key,
          label: item.label,
          children: item.children,
        }))}
      />
    </div>
  );
};

export default FAQAccordion;
