<script>
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Logo from '$lib/Logo.png';
</script>

<div class="m-5 h-[calc(100vh-2*1.25rem)] relative">
	<div>
		<div class="navbar p-5 rounded-3xl">
			<div class="navbar-start"></div>
			<div class="navbar-center"><p class="font-bold text-3xl">TipelaDesign - Lagerbestand</p></div>
			<div class="navbar-end">
				<img src={Logo} height={24} class="h-[48px]" alt={'company logo'} />
			</div>
		</div>
	</div>

	<slot />
</div>
