import type { RequestHandler } from './$types';
export const GET: RequestHandler = async () => {
	const methods = await Promise.all(
		Object.entries(import.meta.glob('$content/methods/text/**/*.md')).map(async ([path, page]) => {
			const { metadata } = await page();
			const slug = path.split('/').pop().split('.').shift();
			return { ...metadata, slug };
		})
	);

	const isMachineLearning = methods.filter((method) => {
		if (method.phases.includes('machine learning')) {
			return true;
		}
	});

	return new Response(JSON.stringify(isMachineLearning), {
		status: 200
	});
};
