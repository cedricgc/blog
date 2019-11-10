
// Schema
municipality: {
	name:    string
	pop:     int
	capital: bool
}

// Schema & Data
largeCapital: municipality & {
	name:    string
	pop:     >5M
	capital: true
}

// Data
moscow: largeCapital & {
	name:    "Moscow"
	pop:     11.92M
	capital: true
}
