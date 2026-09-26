import json
import sys
from datetime import datetime, timezone
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

import serial

puerto = sys.argv[1] if len(sys.argv) > 1 else "/dev/ttyACM0"
endpoint = sys.argv[2] if len(sys.argv) > 2 else "http://localhost:3000/api/sensores/lecturas"
baudios = int(sys.argv[3]) if len(sys.argv) > 3 else 9600

with serial.Serial(puerto, baudios, timeout=35) as arduino:
    print(f"Leyendo {puerto} a {baudios} baudios", flush=True)
    print(f"Enviando a {endpoint}", flush=True)

    while True:
        linea = arduino.readline().decode("utf-8", errors="replace").strip()

        if not linea:
            print("Esperando lectura...", flush=True)
            continue

        try:
            dato = json.loads(linea)
        except json.JSONDecodeError:
            print(f"Línea que no es JSON: {linea}", flush=True)
            continue

        lectura = {
            "sensorId": dato.get("Sensor ID"),
            "lectura": dato.get("Lectura"),
            "humedad": dato.get("Humedad"),
            "sequedad": dato.get("Sequedad"),
            "status": dato.get("Status"),
            "fecha": datetime.now(timezone.utc).isoformat(),
        }

        if (
            not lectura["sensorId"]
            or not isinstance(lectura["lectura"], (int, float))
            or not isinstance(lectura["humedad"], (int, float))
        ):
            print(f"Lectura incompleta: {dato}", flush=True)
            continue

        peticion = Request(
            endpoint,
            data=json.dumps(lectura).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        try:
            with urlopen(peticion, timeout=10) as respuesta:
                print(f"Enviado ({respuesta.status}): {lectura}", flush=True)
        except HTTPError as error:
            detalle = error.read().decode("utf-8", errors="replace")
            print(f"Endpoint respondió {error.code}: {detalle}", flush=True)
        except URLError as error:
            print(f"No se pudo conectar al endpoint: {error.reason}", flush=True)
