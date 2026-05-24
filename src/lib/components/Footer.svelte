<script>
  import commit from "$lib/assets/commit.json";
	import Icon from 'svelte-awesome';
	import github from 'svelte-awesome/icons/github';
</script>


<footer>
  <div class="footer-content">
    <div class="buttons" aria-hidden="true">
      <img src="/images/no-right-turn.gif" alt="No right turn except for regular route transit buses"/>
      <img src="/images/M2_Demo_Now.jpg" alt="Marathon 2 Demo Now!"/>
      <img src="/images/gamecube.png" alt="Nintendo GameCube logo"/>
      <img src="/images/mn-lesbian.png" alt="Minnesota and Lesbian flags combined"/>
			<img src="/images/debian2.gif" alt="Debian GNU/Linux Powered" />
    </div>
    <div class="commit">
      <a href="https://github.com/aelxna/website"><span><Icon data={github}/></span>{commit.commit}</a>
    </div>
  </div>
</footer>

<style>
  @import "/static/global.css";
	@import "/static/colors.css";

	footer {
		width: 100%;
		min-height: var(--footer-height);
		/* margin-top: 0.5rem;
		margin-bottom: 0.5rem; */

		.footer-content {
			align-items: center;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin: 0;

			.buttons {
				padding-top: 0;
				align-items: center;
				display: flex;
				gap: 0;
				flex-wrap: wrap;

				img {
					image-rendering: crisp-edges;
					image-rendering: pixelated;
					box-shadow: var(--shadow) 4px 4px;
				}
			}

			.commit {
				padding-right: 0.5rem;

				a {
					color: var(--text-black);
					text-decoration: none;
					font-family: var(--mono);
					font-size: 0.875rem;
					display: inline-block;

					span {
						vertical-align: middle;
					}
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