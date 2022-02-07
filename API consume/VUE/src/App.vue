<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="text-h5 align-center">
				Universidades
			</div>
			<v-spacer></v-spacer>
		</v-app-bar>

		<v-main>
			<DataTable/>
		</v-main>
	</v-app>
</template>

<script>
import DataTable from './components/DataTable';

export default {
	name: 'App',
	components: {
		DataTable,
	},
};
</script>
