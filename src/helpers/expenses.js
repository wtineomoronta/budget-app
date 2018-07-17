import moment from 'moment'

export function getVisibleExpenses(expenses, { text, sortBy, startDate, endDate }) {
	return expenses.filter((expense) => {
		const createdAtMoment = moment(expense.createdAt)
		const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
		const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
		const textMatch = expense.title.toLowerCase().includes(text.toLowerCase())

		return startDateMatch && endDateMatch && textMatch
	}).sort((a, b) => {
		if (sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1
		} else if (sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1
		}
	})
}

export function getTotalExpenses(expenses) {
	return expenses.reduce((total, expense) => {
		return total + parseFloat(expense.amount)
	}, 0)
}