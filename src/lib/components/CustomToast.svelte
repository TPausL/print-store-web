<script>
	import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	export let toast;
	export let text = 'An error occurred.';
</script>

<div role="alert" class="alert alert-error">
	<FontAwesomeIcon icon={faExclamationTriangle} />
	<span>{text}</span>
</div>
