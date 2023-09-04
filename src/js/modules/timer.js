const timer = (id, deadline) => {
	const addZero = figure => {
		if (figure <= 9) {
			return '0' + figure
		} else {
			return figure
		}
	}

	const getTimeRemaining = finalDate => {
		const time = Date.parse(finalDate) - Date.parse(new Date()),
			days = Math.floor(time / (1000 * 60 * 60 * 24)),
			hours = Math.floor((time / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((time / 1000 / 60) % 60),
			seconds = Math.floor((time / 1000) % 60)

		return {
			totalTime: time,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		}
	}

	const setClockToPage = (selector, finalDate) => {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000)

		updateClock()

		function updateClock() {
			const time = getTimeRemaining(finalDate)

			days.textContent = addZero(time.days)
			hours.textContent = addZero(time.hours)
			minutes.textContent = addZero(time.minutes)
			seconds.textContent = addZero(time.seconds)

			if (time.totalTime <= 0) {
				days.textContent = '00'
				hours.textContent = '00'
				minutes.textContent = '00'
				seconds.textContent = '00'

				clearInterval(timeInterval)
			}
		}
	}

	setClockToPage(id, deadline)
}

export default timer;