<script>
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
</script>

<div class="m-5 h-[calc(100vh-2*1.25rem)] relative">
	<div>
		<div class="navbar shadow-primary p-5 shadow-md rounded-3xl">
			<div class="navbar-start"></div>
			<div class="navbar-center"><h1 class="font-bold text-xl">PrintStore</h1></div>
			<div class="navbar-end"></div>
		</div>
	</div>

	<slot />
</div>
