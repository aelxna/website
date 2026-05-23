<script>
	import { Math } from 'svelte-math';
	import { Highlight } from 'svelte-highlight';
	import { rust } from 'svelte-highlight/languages';
</script>

<p>
	Procedural terrain is a common need in 3D graphical applications. Games such as <i>Minecraft</i> generate
	random, realistic landscapes to facilitate a unique, engaging experience with each world, and tech demos
	often showcase vast generated terrain.
</p>

<p>
	These generated landscapes are built using fractional Brownian motion. fBm is a generalization of
	Brownian motion where increments are not necessarily independent, resulting in paths that remain
	rugged and random yet smoother than typical Brownian motion. The simulation of fractional Brownian
	motion has been the standard for terrain generation for decades due to the performance of the fBm
	approximation algorithm and the realistic results it achieves.
</p>

<p>
	The most common fBm algorithm involves summating multiple samples of a noise function at various
	octaves. For each octave, the sample is taken with an exponentially increasing frequency and an
	exponentially decreasing amplitude. For landscapes, this is typically done in two dimensions,
	resulting in a heightmap that, when rendered as a model, resembles natural terrain. Terraforma
	takes a similar approach, performing fBm calculations with Perlin noise to generate convincing
	terrain.
</p>

<h2 id="perlin-noise">Perlin noise</h2>
<p>
Perlin noise is the most common noise function for procedural terrain and graphics, and the noise function
used in this project. First defined in <cite
	><a href="https://doi.org/10.1145/325165.325247">An image synthesizer (1985)</a></cite
>
and later improved upon in
<cite><a href="https://doi.org/10.1145/566654.566636">Improving noise (2002)</a></cite>, Perlin
noise is a form of gradient noise designed to mimic the randomness found in the natural world. The
algorithm can be described in these steps:
</p>
<ol>
	<li>Assign a random gradient to each corner of the grid containing the point of interest.</li>
	<li>
		Find the dot products between this gradient and the distance between the corner and the point.
	</li>
	<li>Map each component point to a smoother line using some <code>fade()</code> function.</li>
	<li>
		Using the faded point, interpolate in <Math latex="N" /> dimensions across the four dot products.
	</li>
</ol>

<p>
	The Perlin noise implementation in Terraforma is object-based, so it must first be instantiated.
	This consists of creating a permutation array <Math latex="P" />, where the integers 0-255 are
	shuffled. The array is then duplicated to avoid bounding errors. Accessing the permutations array
	allows for randomness that is consistent when accessing the same point.
</p>
<Highlight
	language={rust}
	code={`pub fn new(seed: u64) -> Self {
    let mut rng = StdRng::seed_from_u64(seed);
    let mut permutations: Vec<usize> = (0..256).collect();
    permutations.shuffle(&mut rng);
    permutations.extend_from_slice(&permutations.clone()); // repeat in case of overflow
    Perlin { P: permutations }
}`}
/>

<p>
	The noise function starts by determining the given point <Math latex={'\\vec{p}'} />'s location
	within a box as well as the corners of the box. The boxes are each one square unit, so the new
	point is simply <Math latex={'\\hat{p} = (x - \\lfloor x \\rfloor, y - \\lfloor y \\rfloor)'} />.
</p>

<p>
	After the points are calculated, the <code>grad()</code> function is called. The purpose of
	<code>grad()</code>
	is to find four dot products between the gradients of the corners and the point's distance from
	the corners. Based on the corner's coordinates, it chooses from one of four gradients: <Math
		latex="(1, 1), (-1, 1), (1, -1), (-1, -1)"
	/>. The gradient <Math latex={'\\vec{g}'} /> is calculated as such, where <Math latex="G" /> is the
	array of possible gradients:
</p>
	<Math
		latex={'\\vec{g} := G [ P [ P [ \\lfloor x \\rfloor] + \\lfloor y \\rfloor]\\pmod{4}]'}
		displayMode
	/>
  <p>
	Each corner then gets assigned the following dot product:
  </p>
	<Math latex={'\\vec{g} \\cdot (\\vec{p} - \\lfloor \\vec{p} \\rfloor)'} displayMode />
<Highlight
	language={rust}
	code={`fn grad(&self, trunc: [f64; 2], unit: [usize; 2]) -> (f64, f64, f64, f64) {
    let [x, y] = trunc;
    let [ux, uy] = unit;

    // pick gradient vectors for each corner
    let gtl = GRADIENTS[self.P[self.P[ux] + uy] & 3];
    let gtr = GRADIENTS[self.P[self.P[ux + 1] + uy] & 3];
    let gbl = GRADIENTS[self.P[self.P[ux] + uy + 1] & 3];
    let gbr = GRADIENTS[self.P[self.P[ux + 1] + uy + 1] & 3];

    // dot(gradient, distance)
    let dtl = dot2(gtl, [x, y]);
    let dtr = dot2(gtr, [x - 1.0, y]);
    let dbl = dot2(gbl, [x, y - 1.0]);
    let dbr = dot2(gbr, [x - 1.0, y - 1.0]);

    (dtl, dtr, dbl, dbr)
}`}
/>

<p>
	Then, <Math latex={'\\vec{p}'} /> is mapped to a smoother function <Math
		latex={'\\operatorname{fade}(t) := 6t^5 - 15t^4 + 10t^3'}
	/>. The noise function then bilinearly interpolates over the dot products based on the faded
	point. Finally, the result is divided by <Math latex={'1/\\sqrt{2}'} /> to place the range between -1
	and 1. The <code>snoise()</code> function retains this range, while the standard
	<code>noise()</code> function normalizes it to be between 0 and 1.
</p>

<Highlight
	language={rust}
	code={`pub fn snoise(&self, x: f64, y: f64) -> f64 {
    // determine location within a box
    let trunc: [f64; 2] = [x - x.floor(), y - y.floor()];
    // determine in which box coordinates are located
    let unit: [usize; 2] = [(x as usize) & 255, (y as usize) & 255];
    // apply fade function to truncated coordinates
    let faded: [f64; 2] = trunc.map(|i| fade(i));

    let (dtl, dtr, dbl, dbr) = self.grad(trunc, unit);

    bilinear_interpolate(dtl, dtr, dbl, dbr, faded) / BOUND
}`}
/>

<h2 id="fbm">Fractional Brownian motion</h2>
<p>
Let standard Brownian motion be defined as
</p>
<Math latex={"B(t) = \\int_{-\\infty}^{t}W(s) \\, ds"} displayMode />
<p>
where <Math latex={"W(s)"} /> is a sample of white noise. Brownian motion has three main properties: a path that is continuous
but not differentiable, independent increments, and stationary increments. This can be generalized into
fractional Brownian motion, where increments are not necessarily independent. Its variance is described as
</p>
<Math latex={"\\operatorname{var}(B_H(t_2) - B_H(t_1)) \\propto |t_2 - t_1|^{2H}"} displayMode />
<p>
An additional component to fractional Brownian motion is the Hurst parameter <Math latex="H" />, which describes the correlation of each increment in the following
way, corresponding with the perceived roughness of the motion:
</p>
<ul>
  <li>
    <Math latex={"H > 1/2"} />: positive correlation
  </li>
  <li>
    <Math latex={"H = 1/2"} />: standard Brownian motion
  </li>
  <li>
    <Math latex={"H < 1/2"} />: negative correlation
  </li>
</ul>
<p>
While there are many methods for approximating fBm, the following method from <cite><a href="https://doi.org/10.1007/978-1-4612-3034-2_6">Random Fractals in Image Synthesis (1991)</a></cite>,
inspired by Perlin's turbulence function, has become the go-to fBm approximation for the purposes of terrain generation (and many other forms of procedural graphics!):
</p>
<Math latex={"B_H(x) = \\sum_{k=0}^{\\infty} \\frac{1}{\\Lambda^{kH}} S(\\Lambda^k x)"} displayMode/>
<p>
where <Math latex="\Lambda" /> is the lacunarity (a parameter that alters the frequency with each octave) and <Math latex={"S(x)"} /> is some sample, typically of a noise function. In most scenarios, the lacunarity is set to 2 and the Hurst exponent is set to 1, meaning that with each octave the image will become twice as detailed while each octave will have half the influence. This is the fBm approximation algorithm implemented in Terraforma, albeit with one tweak: the sum given by the fBm algorithm is divided by the sum of the amplitudes so that the values are guaranteed to be between 0 and 1. Here's my implementation:
</p>
<Highlight language={rust} code={`pub fn fbm(
  x: f64, y: f64, period: f64, hurst: f64, lacunarity: f64, octaves: usize, p: &Perlin
) -> f64 {
    let mut total: f64 = 0.0;
    let mut amp_total: f64 = 0.0;
    let mut amp: f64 = 1.0;
    let mut freq: f64 = 1.0 / period;
    let gain: f64 = f64::powf(lacunarity, -hurst);
    for _ in 0..octaves {
        total += amp * p.noise(x * freq, y * freq);
        amp_total += amp;
        amp *= gain;
        freq *= lacunarity;
    }
    total /= amp_total; // guarantee within the range 0-1
    total
}`} />
<p>
  Here's the result:
</p>

<figure>
  <img src="/posts/terraforma/standard.png" alt="A heightmap generated with fBm">
</figure>

<p>
  Some additional transformations are also available. There are contrast, exponent, and offset parameters to adjust the shape of the surface after the other calculations. In addition, the algorithm can be modified to use the absolute value of the signed noise to form valleys <a href="https://thebookofshaders.com/13/">(see here for more)</a>:
</p>

<Highlight language={rust} code={`for _ in 0..octaves {
    total += amp * p.snoise(x * freq, y * freq).abs();
    amp_total += amp;
    amp *= gain;
    freq *= lacunarity;
}
total /= amp_total; // guarantee within the range 0-1
total`} />
<p>
  which yields the following with Perlin noise:
</p>
<figure>
  <img src="/posts/terraforma/valleys.png" alt="fBm heightmap with the valleys algorithm">
</figure>

<p>
  Last but not least, taking the absolute value at the end and inverting the result forms sharp ridges that look electric:
</p>
<Highlight language={rust} code={`for _ in 0..octaves {
    total += amp * p.snoise(x * freq, y * freq);
    amp_total += amp;
    amp *= gain;
    freq *= lacunarity;
}
total /= amp_total; // guarantee within the range 0-1
1.0 - total.abs()`} />
<figure>
  <img src="/posts/terraforma/ridges.png" alt="fBm heightmap with the ridges algorithm">
</figure>

<h2 id="misc">Importing into Unity</h2>
<p>
The nice thing about Terraforma is that it outputs a heightmap that can be used anywhere else, such as game engines. Because the program outputs an 8-bit PNG instead of a 16-bit RAW, if you want to use it in Unity you have to convert it to RAW (I used GIMP for this purpose). However, once you do that, it's really simple to just import and use:
</p>
<figure>
  <img src="/posts/terraforma/unityheightmap.png" alt="The heightmap that was imported into Unity">
  <img src="/posts/terraforma/unity.png" alt="A screenshot in the Unity Engine with the imported terrain">
</figure>

<h2 id="future">Future improvements</h2>
<p>
  While I'm proud of what I've done so far with Terraforma, it still has a ways to go until I'm truly content with its state. For one, the current program is an ugly amalgamation of Python for the CLI and Rust for the calculations. This is an artifact of the original intent of it being written entirely in Python (It proved <i>way</i> too slow), but eventually I would replace the CLI with a TOML config file and build the heightmap using the <code>image</code> crate in Rust. If I really want to keep the other graphs generated by the Python script, it will be an entirely optional program run afterward.
</p>
<p>
  Aside from the organization of the project, I also want to add more features. The main one I have in mind is extra noise functions, particularly value noise and simplex noise. Terraforma in its current state is already very versatile, but this will open even more possibilities.
</p>
<p>
  That being said, this project was really fun to make and I can't wait to iterate on it even more!
</p>
