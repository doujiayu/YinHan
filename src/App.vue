<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	export default {
		name: "App",
		data() {
			return {

			}
		},
		methods: {},
		mounted() {},

	};
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
		text-decoration: none;
		border: none;
		outline: none;
	}
</style>