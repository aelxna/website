export const load = async ({ fetch }) => {
	const blog = await fetch(`/api/blog`);
	const projects = await fetch('/api/projects');
	const blog_posts = await blog.json();
	const projects_posts = await projects.json();

	const postb = blog_posts.at(0);
	const postp = blog_posts.at(0);

	let post, section;
	if (!postb && !postp) {
		post = undefined;
		section = undefined;
	} else if (!postb) {
		post = postp;
		section = 'project';
	} else if (!postp) {
		post = postb;
		section = 'blog';
	} else {
		post = postb.meta.date > postp.meta.date ? postb : postp;
		section = post === postb ? 'blog' : 'project';
	}

	return {
		post,
		section
	};
};
