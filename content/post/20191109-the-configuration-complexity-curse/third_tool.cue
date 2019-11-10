
package foo

import "tool/exec"

city: "Amsterdam"

// Say hello!
command hello: {
	var file: "out.txt" | string // save transcript to this file

	task ask: cli.Ask & {
		prompt:   "What is your name?"
		response: string
	}

	// starts after ask
	task echo: exec.Run & {
		cmd:    ["echo", "Hello", task.ask.response + "!"]
		stdout: string // capture stdout
	}

	// starts after echo
	task write: file.Append & {
		filename: var.file
		contents: task.echo.stdout
	}

	// also starts after echo
	task print: cli.Print & {
		contents: task.echo.stdout
	}
}