export default function date(dateStr: string) {
	const [day, month, year] = dateStr.split('-');
	const date = new Date(`${year}-${month}-${day}`);
	return date.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
};

export function formatDateTimeISO(isoStr: string): string {
	if (!isoStr) return 'None';

	const date = new Date(isoStr);

	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	const day = String(date.getDate()).padStart(2, '0');
	const month = date.toLocaleString('en-US', { month: 'short' });
	const year = date.getFullYear();

	return `${hours}:${minutes} - ${day} ${month} ${year}`;
}
