export const isScrollBehaviorSupported = (): boolean => {
	return 'scrollBehavior' in window.document.documentElement.style;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

export function debounce<F extends AnyFunction>(
	func: F,
	delay: number
): (...args: Parameters<F>) => void {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const context = this;

		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
}

export function daysInMonth(month: number, year: number) {
	return new Date(year, month + 1, 0).getDate();
}
