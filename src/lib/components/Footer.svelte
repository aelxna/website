<script>
  import commit from "$lib/assets/commit.json";
</script>


<footer>
  <div class="footer-content">
    <div class="buttons" aria-hidden="true">
      <img src="/images/no-right-turn.gif" alt="No right turn except for regular route transit buses"/>
      <img src="/images/M2_Demo_Now.jpg" alt="Marathon 2 Demo Now!"/>
      <img src="/images/gamecube.png" alt="Nintendo GameCube logo"/>
      <img src="/images/flag-lesbian.png" alt="Lesbian flag"/>
    </div>
    <div class="commit">
      <a href="https://github.com/aelxna/website">{commit.commit}</a>
    </div>
  </div>
</footer>

<style>
  @import "/static/global.css";

	footer {
		position: absolute;
		bottom: 0;
		min-width: 100%;
		min-height: var(--footer-height);
		margin: 0;
		border-top: 1pt solid var(--page-dark);
		box-shadow:
			inset 1pt 1pt 0pt 0pt white,
			inset -1pt -1pt 0pt 0pt var(--gray-50),
			inset -3pt -3pt 0pt 0pt var(--gray-75),
			inset 3pt 3pt 0pt 0pt var(--gray-75),
			inset 4pt 4pt 0pt 0pt var(--gray-50),
			inset -4pt -4pt 0pt 0pt white;
		background-color: var(--gray-75);

		.footer-content {
			align-items: center;
			display: flex;
			justify-content: space-between;
			margin-left: 0.5rem;
			margin-right: 1rem;

			.buttons {
				padding-top: 0.5rem;
				align-items: center;

				img {
					image-rendering: crisp-edges;
					image-rendering: pixelated;
				}
			}

			.commit {

				a {
					color: var(--text-black);
					text-decoration: none;
					font-family: var(--mono);
					font-size: 0.875rem;
				}

				a:hover {
					text-decoration: underline;
				}

				a:visited {
					color: var(--text-black);
				}
			}
		}
	}
</style>