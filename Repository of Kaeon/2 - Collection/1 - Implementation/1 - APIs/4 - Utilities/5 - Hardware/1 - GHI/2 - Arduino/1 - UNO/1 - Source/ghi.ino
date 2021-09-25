char receivedChar;
String message = "";

int myPins[] = {
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false
};

void setup() {
	Serial.begin(9600);
}

void loop() {
	
	if(Serial.available() > 0)
		Serial.println(getInput());
		
	getChar();
}

String getInput() {
	
	String input = "{\"protocol\":[\"ghi\",\"serial\"],\"device\":[\"arduino\",\"uno\"],\"data\":[";
	
	for(int i = 2; i < strlen(message); i++) {
		
		if((i == 2 || i == 4 || i = 7 || i == 8 || i == 12 || i == 13) && !myPins[i - 2])
			input = String(input + (48 + digitalRead(i) + ","));
		
		else
			input = String(input + "0,");
	}
	
	return String(
		input +
		analogRead(A0) +
		"," +
		analogRead(A1) +
		"," +
		analogRead(A2) +
		"," +
		analogRead(A3) +
		"," +
		analogRead(A4) +
		"," +
		analogRead(A5) +
		"]}"
	);
}

void getChar() {
	
	if(Serial.available() > 0) {
		
		receivedChar = Serial.read();
		
		if(receivedChar == 0) {
			
			execute(message);
			
			message = "";
		}
		
		else
			message = String(message + receivedChar);
	}
}

void execute(String message) {
	
	for(int i = 2; i < strlen(message); i++) {
		
		char c = message[i - 2];
		
		if(i == 2 || i == 4 || i = 7 || i == 8 || i == 12 || i == 13) {
			
			if(c != 0) {
				
				if(!myPins[i - 2]) {
					
					pinMode(i, OUTPUT);
					digitalWrite(i, HIGH);
					
					myPins[i - 2] = true;
				}
			}
			
			else {
				
				if(myPins[i - 2]) {
					
					digitalWrite(i, LOW);
					pinMode(i, INPUT);
					
					myPins[i - 2] = false;
				}
			}
		}
		
		else {
			analogWrite(i, c);
		}
	}
}