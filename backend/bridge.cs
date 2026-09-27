#include <WiFi.h>
#include <HTTPClient.h>

const char* WIFI_NOMBRE = "Kangie Pro";
const char* WIFI_CLAVE = "1234567890";
const char* ENDPOINT = "http://172.20.10.3:3000/api/lectures";

const char* SENSOR_ID = "Sensor_1";

const int PIN_SENSOR = 34;
const int LED_ROJO = 25;
const int LED_VERDE = 26;
const int LED_AZUL = 27;

// Todavía son valores provisionales: calibra con tu tierra.
const int LECTURA_SECA = 3800;
const int LECTURA_HUMEDA = 1300;

void conectarWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;

  WiFi.mode(WIFI_STA);

  Serial.println("Buscando la red configurada...");
  int redes = WiFi.scanNetworks();
  bool encontrada = false;

  for (int i = 0; i < redes; i++) {
    if (WiFi.SSID(i) == WIFI_NOMBRE) {
      encontrada = true;
      Serial.print("Red encontrada. Señal RSSI: ");
      Serial.println(WiFi.RSSI(i));
    }
  }

  if (!encontrada) {
    Serial.println("La red configurada NO aparece en el escaneo");
  }

  Serial.println("Intentando conectar...");
  WiFi.begin(WIFI_NOMBRE, WIFI_CLAVE);

  unsigned long inicio = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - inicio < 10000) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Estado Wi-Fi: ");
  Serial.println(WiFi.status());

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("Conectado. IP del ESP32: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("No conectado; no se enviará el POST");
  }
}

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);

  pinMode(LED_ROJO, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_AZUL, OUTPUT);

  digitalWrite(LED_ROJO, LOW);
  digitalWrite(LED_VERDE, LOW);
  digitalWrite(LED_AZUL, LOW);

  delay(1000);
  Serial.println("Sensor YL-69 y LEDs listos");

  conectarWiFi();
}

void loop() {
  long suma = 0;

  for (int i = 0; i < 10; i++) {
    suma += analogRead(PIN_SENSOR);
    delay(20);
  }

  int lectura = suma / 10;

  int humedad = map(
    lectura,
    LECTURA_SECA,
    LECTURA_HUMEDA,
    0,
    100
  );
  humedad = constrain(humedad, 0, 100);

  int sequedad = 100 - humedad;
  const char* status;

  if (humedad < 35) {
    status = "SECO";
    digitalWrite(LED_ROJO, HIGH);
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_AZUL, LOW);
  } else if (humedad <= 75) {
    status = "ADECUADO";
    digitalWrite(LED_ROJO, LOW);
    digitalWrite(LED_VERDE, HIGH);
    digitalWrite(LED_AZUL, LOW);
  } else {
    status = "MUY HUMEDO";
    digitalWrite(LED_ROJO, LOW);
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_AZUL, HIGH);
  }

  // Campos que espera tu controlador postLectures.
  String json = "{\"sensorId\":\"" + String(SENSOR_ID) +
                "\",\"lectura\":" + String(lectura) +
                ",\"humedad\":" + String(humedad) +
                ",\"sequedad\":" + String(sequedad) +
                ",\"status\":\"" + String(status) + "\"}";

  Serial.print("Lectura: ");
  Serial.println(json);

  if (WiFi.status() != WL_CONNECTED) {
    conectarWiFi();
  }

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(ENDPOINT);
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(10000);

    int codigo = http.POST(json);

    Serial.print("Respuesta HTTP: ");
    Serial.println(codigo);

    if (codigo < 0) {
      Serial.print("Error de conexión: ");
      Serial.println(http.errorToString(codigo));
    } else if (codigo < 200 || codigo >= 300) {
      Serial.print("Respuesta del servidor: ");
      Serial.println(http.getString());
    }

    http.end();
  } else {
    Serial.println("Lectura no enviada: sin Wi-Fi");
  }

  delay(10000);  // Una lectura aproximadamente cada 30 segundos
}