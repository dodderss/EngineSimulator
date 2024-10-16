import sqlite3
import json
from flask import Flask, request, jsonify  # type: ignore
from flask_cors import CORS  # type: ignore

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
                engineWeight REAL,
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
            exhaustSize, engineWeight, enginePrice, engineName, fileName, filePath,
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
            engineDict["engineWeight"],
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

    def recieveRequest(self):
        pass


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
            "engineWeight": engine[17],
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
            "engineWeight": engine[17],
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


if __name__ == '__main__':
    app.run(debug=True)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
