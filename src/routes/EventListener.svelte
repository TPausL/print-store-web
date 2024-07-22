<script>
	var source = new EventSource('https://localhost:5000/stream');
	source.addEventListener(
		'new_product',
		function (event) {
			var data = JSON.parse(event.data);
			alert('The server says ' + data.message);
		},
		false
	);
	source.addEventListener(
		'error',
		function (event) {
			alert('Failed to connect to event stream. Is Redis running?');
		},
		false
	);
</script>

'use client'
