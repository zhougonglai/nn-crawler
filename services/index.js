export const searchUrl = async (params) =>
	await fetch(`/api/hello?${params}`).then((res) => res.json());
