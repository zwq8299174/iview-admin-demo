<template>
<div>
	<treeselect
		:placeholder="placeholder"
		:label = "label"
		:load-root-options="getData"
    	:auto-load-root-options="true"
		@input="handleInput"
		v-model="currentValue"
		:value="currentValue"
		:multiple="multiple"
		:clearable="clearable"
		:searchable="searchable"
		:readonly="readonly"
		:open-on-focus="openOnFocus"
		:open-on-click="openOnClick"
		:clear-on-select="clearOnSelect"
	    :close-on-select="closeOnSelect"
		:maxHeight="360"
		:disableBranchNodes="selectBranch"
		:load-children-options="getData">
		<label
			slot="option-label"
			slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
			:class="labelClassName">
				<i class="iconfont option-icon" v-if="node.treeType=='office'&&node.type=='1'">&#xe623;</i>
				<i class="iconfont option-icon" v-if="node.treeType=='office'&&node.type=='2'">&#xe680;</i>
				<i class="iconfont option-icon" v-if="node.treeType=='area'">&#xe62a;</i>
				<i class="iconfont option-icon" v-if="node.treeType=='menu'">&#xe665;</i>
				<i class="iconfont option-icon" v-if="node.treeType=='user'">&#xe680;</i>
				{{ node[label] }}
		    	<span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
		</label>
	</treeselect>
</div>
</template>

<script>
import Treeselect from '../treeselect/index.js'

export default {
	name: 'tree-select',
	props: {
		multiple: {
			type: Boolean,
			default: false
		},
		value: '',
		placeholder: {
			type: String,
			default: '请选择'
		},
		type: {
			type: String,
			default: 'office'
		},
		selectBranch:{
			type: Boolean,
			default: false
		},
		label:{
			type: String,
			default: 'name'
		},
		clearable:{
			type: Boolean,
			default: true
		},
		searchable:{
			type: Boolean,
			default: true
		},
		readonly:{
			type: Boolean,
			default: true
		},
		openOnFocus:{
			type: Boolean,
			default: true
		},
		openOnClick:{
			type: Boolean,
			default: false
		},
		clearOnSelect:{
			type: Boolean,
			default: true
		},
		closeOnSelect:{
			type: Boolean,
			default: true
		}
	},
	components: {
		Treeselect
	},
	data() {
		return {
			currentTreeId: 0,
			loading: true,
			// options: [],
			options: [],
			currentValue: this.value ? this.value : this.type == 'checkbox' ? [] : ''
		}
	},
	watch: {
		value: function(n, o) {
			if (n) {
				this.currentValue = n;
			} else {
				this.currentValue = '';
			}
			this.$emit('input', this.currentValue?this.currentValue:undefined);
		}
	},
	created() {
		// this.getData();
	},
	methods: {
		getData() {
			this.API_treeData({
				id: typeof(arguments[0]) == 'object' ?arguments[0].id : this.currentTreeId,
				type: this.type
			}, (d) => {
				if (d.length == 0) return;
				console.log(d);
				if(typeof(arguments[0]) == 'object'){
					arguments[1].call(this,null,d);
				}else{
					arguments[0].call(this,null,d);
				}
			});
		},
		handleInput(val) {
			// let value = val?this.item.multiple?val.join(','):val:val;
			this.$emit('input', val); //触发 input 事件，并传入新值
		}
	}
}
</script>
<style scoped lang="less">

</style>
