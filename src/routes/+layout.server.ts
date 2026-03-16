import { execSync } from 'node:child_process';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		commit: execSync('git rev-parse --short HEAD').toString()
	};
};
