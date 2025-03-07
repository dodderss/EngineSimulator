import sqlite3
import json
from flask import Flask, request, jsonify  # type: ignore
from flask_cors import CORS  # type: ignore
import tkinter as tk
from tkinter import messagebox
from threading import Thread

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*",
     "methods": ["GET", "POST", "OPTIONS"]}})


class Database:
    def __init__(self):
        connection = sqlite3.connect("database.db")
        cursor = connection.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS engines (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                bore REAL,
                stroke REAL,
                compressionRatio REAL,
                displacement REAL,
                power REAL,
                torque REAL,
                powerList TEXT,
                torqueList TEXT,
                rpmLimit INTEGER,
                fuelQuality TEXT,
                aspirationType TEXT,
                engineType TEXT,
                engineCylinders INTEGER,
                boostPressure REAL,
                boostProviderSize REAL,
                exhaustSize REAL,
                engineMass REAL,
                enginePrice REAL,
                engineName TEXT,
                fileName TEXT,
                filePath TEXT,
                blockMaterial TEXT,
                headMaterial TEXT,
                pistonMaterial TEXT,
                headType TEXT,
                intakeType TEXT,
                vvl BOOLEAN,
                vvt BOOLEAN,
                vvlRpm INTEGER,
                volumetricEfficiency REAL,
                mechanicalEfficiency REAL,
                totalEfficiency REAL,
                engineLength REAL,
                engineWidth REAL,
                engineHeight REAL       
            );
        ''')

    def encodeLists(self, engineDict):
        newPowerList = ""
        for i in engineDict["powerList"]:
            newPowerList += str(i) + ", "

        newTorqueList = ""
        for i in engineDict["torqueList"]:
            newTorqueList += str(i) + ", "

        # Strip trailing comma and space if lists are not empty
        newPowerList = newPowerList.rstrip(", ")
        newTorqueList = newTorqueList.rstrip(", ")

        return {
            **engineDict,
            "powerList": newPowerList,
            "torqueList": newTorqueList,
        }

    def delete_engine(self, engine_id):
        connection = sqlite3.connect("database.db")
        cursor = connection.cursor()
        cursor.execute('DELETE FROM engines WHERE id = ?', (engine_id,))
        connection.commit()
        connection.close()

    def addEngine(self, engineJSON):
        connection = sqlite3.connect("database.db")
        cursor = connection.cursor()

        engineDict = json.loads(engineJSON)
        engineDict = self.encodeLists(engineDict)

        cursor.execute('''
        INSERT INTO engines (
            bore, stroke, compressionRatio, displacement, power, torque,
            powerList, torqueList, rpmLimit, fuelQuality, aspirationType,
            engineType, engineCylinders, boostPressure, boostProviderSize,
            exhaustSize, engineMass, enginePrice, engineName, fileName, filePath,
            blockMaterial, headMaterial, pistonMaterial, headType,
            intakeType, vvl, vvt, vvlRpm, volumetricEfficiency,
            mechanicalEfficiency, totalEfficiency, engineLength,
            engineWidth, engineHeight
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            engineDict["bore"],
            engineDict["stroke"],
            engineDict["compressionRatio"],
            engineDict["displacement"],
            engineDict["power"],
            engineDict["torque"],
            engineDict["powerList"],
            engineDict["torqueList"],
            engineDict["rpmLimit"],
            engineDict["fuelQuality"],
            engineDict["aspirationType"],
            engineDict["engineType"],
            engineDict["engineCylinders"],
            engineDict["boostPressure"],
            engineDict["boostProviderSize"],
            engineDict["exhaustSize"],
            engineDict["engineMass"],
            engineDict["enginePrice"],
            engineDict["engineName"],
            engineDict["fileName"],
            engineDict["filePath"],
            engineDict["blockMaterial"],
            engineDict["headMaterial"],
            engineDict["pistonMaterial"],
            engineDict["headType"],
            engineDict["intakeType"],
            engineDict["vvl"],
            engineDict["vvt"],
            engineDict["vvlRpm"],
            engineDict["volumetricEfficiency"],
            engineDict["mechanicalEfficiency"],
            engineDict["totalEfficiency"],
            engineDict["engineLength"],
            engineDict["engineWidth"],
            engineDict["engineHeight"],
        ))

        connection.commit()
        connection.close()

    def getEngine(self, engineID):
        connection = sqlite3.connect("database.db")
        cursor = connection.cursor()
        connection = sqlite3.connect("database.db")
        cursor.execute('SELECT * FROM engines WHERE id = ?', (engineID,))
        engine = cursor.fetchone()
        connection.close()
        return engine

    def getEngines(self):
        connection = sqlite3.connect("database.db")
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM engines')
        engines = cursor.fetchall()
        connection.close()
        return engines

    def getSortedEngines(self):
        def merge(left, right):
            # Create final list, and two temp variables for iteration
            final = []
            temp1 = 0
            temp2 = 0

            # While both lists have items
            while temp1 < len(left) and temp2 < len(right):
                # Compare the 5th element of each list
                if left[temp1][5] > right[temp2][5]:
                    # If the left list's element is bigger, add it to the final list
                    final.append(left[temp1])
                    temp1 += 1
                else:
                    # Otherwise, add the right list's element to the final list
                    final.append(right[temp2])
                    temp2 += 1

            final += left[temp1:]
            final += right[temp2:]

            return final

        def mergeSort(engines):
            # Checks if the list is empty or has only one item
            if len(engines) <= 1:
                return engines

            middle = len(engines) // 2  # Finds the middle engine
            # Cuts from the start to the middle engine
            leftSection = engines[:middle]
            # Cuts from the middle to the end engine
            rightSection = engines[middle:]

            # Uses iteration to sort remaining items
            sortedLeft = mergeSort(leftSection)
            sortedRight = mergeSort(rightSection)  # and again

            # Returns the sorted list
            return merge(sortedLeft, sortedRight)

        engines = self.getEngines()
        sortedEngines = mergeSort(engines)
        sortedEngines.reverse()
        return sortedEngines


db = Database()


@app.route('/add_engine', methods=['POST'])
def add_engine():
    engine_json = request.data
    try:
        db.addEngine(engine_json)
        return jsonify({"status": "success", "message": "Engine added succesfully"}), 201
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "message": str(e)}), 400


@app.route('/get_engine/<int:engine_id>', methods=['GET'])
def get_engine(engine_id):
    engine = db.getEngine(engine_id)
    if engine:
        engine_data = {
            "id": engine[0],
            "bore": engine[1],
            "stroke": engine[2],
            "compressionRatio": engine[3],
            "displacement": engine[4],
            "power": engine[5],
            "torque": engine[6],
            # Convert string lists to python lists and convert into int lists
            "powerList": [float(item) for item in engine[7].split(', ')],
            "torqueList": [float(item) for item in engine[8].split(', ')],
            "rpmLimit": engine[9],
            "fuelQuality": engine[10],
            "aspirationType": engine[11],
            "engineType": engine[12],
            "engineCylinders": engine[13],
            "boostPressure": engine[14],
            "boostProviderSize": engine[15],
            "exhaustSize": engine[16],
            "engineMass": engine[17],
            "enginePrice": engine[18],
            "engineName": engine[19],
            "fileName": engine[20],
            "filePath": engine[21],
            "blockMaterial": engine[22],
            "headMaterial": engine[23],
            "pistonMaterial": engine[24],
            "headType": engine[25],
            "intakeType": engine[26],
            "vvl": engine[27],
            "vvt": engine[28],
            "vvlRpm": engine[29],
            "volumetricEfficiency": engine[30],
            "mechanicalEfficiency": engine[31],
            "totalEfficiency": engine[32],
            "engineLength": engine[33],
            "engineWidth": engine[34],
            "engineHeight": engine[35],
        }
        return jsonify({"status": "success", "data": engine_data}), 200
    else:
        return jsonify({"status": "error", "message": "Engine not found"}), 404


@app.route('/get_engines', methods=['GET'])
def get_engines():
    engines = db.getEngines()
    engines_data = []
    for engine in engines:
        engine_data = {
            "id": engine[0],
            "bore": engine[1],
            "stroke": engine[2],
            "compressionRatio": engine[3],
            "displacement": engine[4],
            "power": engine[5],
            "torque": engine[6],
            # Convert string lists to python lists and convert into int lists
            "powerList": [float(item) for item in engine[7].split(', ')],
            "torqueList": [float(item) for item in engine[8].split(', ')],
            "rpmLimit": engine[9],
            "fuelQuality": engine[10],
            "aspirationType": engine[11],
            "engineType": engine[12],
            "engineCylinders": engine[13],
            "boostPressure": engine[14],
            "boostProviderSize": engine[15],
            "exhaustSize": engine[16],
            "engineMass": engine[17],
            "enginePrice": engine[18],
            "engineName": engine[19],
            "fileName": engine[20],
            "filePath": engine[21],
            "blockMaterial": engine[22],
            "headMaterial": engine[23],
            "pistonMaterial": engine[24],
            "headType": engine[25],
            "intakeType": engine[26],
            "vvl": engine[27],
            "vvt": engine[28],
            "vvlRpm": engine[29],
            "volumetricEfficiency": engine[30],
            "mechanicalEfficiency": engine[31],
            "totalEfficiency": engine[32],
            "engineLength": engine[33],
            "engineWidth": engine[34],
            "engineHeight": engine[35],
        }
        engines_data.append(engine_data)
    return jsonify({"status": "success", "data": engines_data}), 200


def window():
    def show_engine_details(engine_id):
        db = Database()
        engine = db.getEngine(engine_id)

        if engine:
            details_window = tk.Toplevel(root)
            details_window.title(f"Engine Details: {engine[19]}")

            details_text = "\n".join([
                f"Engine Name: {engine[19]}",
                f"Bore: {engine[1]}",
                f"Stroke: {engine[2]}",
                f"Compression Ratio: {engine[3]}",
                f"Displacement: {engine[4]}",
                f"Power: {engine[5]} HP",
                f"Torque: {engine[6]} Nm",
                f"RPM Limit: {engine[9]}",
                f"Fuel Quality: {engine[10]}",
                f"Engine Type: {engine[12]}",
                f"Engine Cylinders: {engine[13]}",
                f"Boost Pressure: {engine[14]} bar",
                f"Exhaust Size: {engine[16]} inches",
                f"Engine Weight: {engine[17]} kg",
                f"Engine Price: £{engine[18]}",
                f"Block Material: {engine[21]}",
                f"Head Material: {engine[22]}",
                f"Piston Material: {engine[23]}",
                f"Head Type: {engine[24]}",
                f"Intake Type: {engine[25]}",
            ])

            label = tk.Label(details_window, text=details_text, justify='left')
            label.pack(padx=10, pady=10)

            # Delete button
            delete_button = tk.Button(details_window, text="Delete Engine", command=lambda: [
                db.delete_engine(engine_id), details_window.destroy()])
            delete_button.pack(pady=10)

        else:
            messagebox.showerror("Error", "Engine not found!")

    # Function to update the list of engines in the UI

    def update_engine_list():

        engines = Database().getSortedEngines()

        engine_listbox.delete(0, tk.END)
        for engine in engines:
            engine_listbox.insert(tk.END, f"{engine[19]} (ID: {engine[0]})")

    # Main Tkinter window
    root = tk.Tk()
    root.title("Engine Management")

    # Listbox to display engines
    engine_listbox = tk.Listbox(root, height=10, width=50)
    engine_listbox.pack(padx=20, pady=20)

    # Button to show details of selected engine
    details_button = tk.Button(root, text="Show Details", command=lambda: show_engine_details(
        int(engine_listbox.get(tk.ACTIVE).split()[-1][:-1])))
    details_button.pack(pady=10)

    # Update the engine list initially
    update_engine_list()

    root.mainloop()


if __name__ == '__main__':
    Thread(target=lambda: app.run(debug=True, use_reloader=False)).start()
    window()


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
