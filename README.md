# 3D Engine Designer

![The first selection screen in the simulator](https://i.imgur.com/HoEjTGW.png)

## Overview

The 3D Engine Designer is a powerful tool for engineers and car enthusiasts, designed to simulate and optimize engine configurations before building them. The software enables users to visualize and analyze key engine parameters such as power, torque, and efficiency. By adjusting various engine components and variables, users can create custom engines tailored to specific performance requirements.

## Key Features

- **Engine Simulation:** Simulate different engine configurations by adjusting variables such as piston size, turbocharger size, and fuel quality.
- **3D Visualization:** Interact with a fully 3D environment to view your engine from any angle, with dimensions provided on the X, Y, and Z axes for accurate measurement.
- **Real-Time Statistics:** Monitor key engine statistics such as horsepower, torque, efficiency, and cost in real-time as you modify the engine.
- **Comprehensive Material Database:** Select from a variety of materials for engine blocks and pistons, each with unique properties such as weight, cost, and maximum power/torque capabilities.
- **Customizable Graphs:** Generate and customize power and torque graphs to visualize engine performance across different RPM ranges.
- **Problem Detection:** Automatically detects issues with the current engine configuration, such as material strength limitations, and provides actionable feedback.
- **Cross-Platform Support:** Available as downloadable executables for Windows, macOS, and Linux built using React, TypeScript, and Tauri.

## Getting Started

### Prerequisites

Ensure your system meets the following requirements:

- **Windows:** Windows 10 or higher
- **macOS:** macOS 10.15 (Catalina) or higher
- **Linux:** A modern Linux distribution that supports `.deb` packages (e.g., Ubuntu, Debian)

### Installation

1. **Download the Installer:**
   - Visit the [GitHub Releases](https://github.com/dodderss/EngineSimulator/releases) page and download the appropriate installer for your operating system:
     - `.exe` for Windows
     - `.dmg` for macOS
     - `.deb` for Linux

2. **Run the Installer:**
   - **Windows:**
     - Double-click the downloaded `.exe` file and follow the on-screen instructions.
   - **macOS:**
     - Open the downloaded `.dmg` file and drag the 3D Engine Designer app into your `Applications` folder.
   - **Linux:**
     - Open a terminal and run:
       ```bash
       sudo dpkg -i path/to/3D-Engine-Designer.deb
       ```
       - Resolve any dependency issues by running:
       ```bash
       sudo apt-get install -f
       ```

3. **Launch the Application:**
   - After installation, launch the 3D Engine Designer from your applications menu or desktop shortcut.

### Usage

1. **Create a New Engine Design:**
   - Click on **"New Project"** to start designing a new engine.
   - Choose from various engine layouts and configurations.

2. **Customize Engine Components:**
   - Use the **Properties Panel** to adjust specifications such as:
     - **Bottom End:** Engine block type, bore, stroke, and material selection.
     - **Top End:** Head type, valve configuration, timing settings, and materials.
     - **Aspiration:** Turbocharger or supercharger options, including size and boost pressure.
     - **Fuel & Timing:** Select fuel type, quality, and ignition timing.
     - **Appearance:** Customize visual aspects of the engine for presentation purposes.

3. **Visualize in 3D:**
   - Navigate the **3D Viewport** to inspect your engine design from all angles.
   - Utilize zoom, pan, and rotate controls for detailed inspection.

4. **Analyze Performance:**
   - Access real-time **Performance Graphs** displaying power and torque across various RPM ranges.
   - Review **Efficiency Metrics** and **Material Stress Analyses** to ensure design feasibility.

5. **Detect and Resolve Issues:**
   - The **Problem Detection System** will alert you to potential issues such as:
     - Material strength limitations.
     - Incompatible component configurations.
     - Inefficient performance metrics.
   - Follow suggested solutions to optimize your engine design.

6. **Save and Export:**
   - Save your project locally or export configurations and reports for sharing and further analysis.
   - Export 3D models and performance data for use in other engineering software.
