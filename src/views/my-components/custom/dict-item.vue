<template>
	<div >
		<Select v-model="currentValue" :transfer="transfer" @on-change="change" clearable v-if="type=='select'">
			<Option v-for="opt in data.list" :key="opt.value" :value="opt.value">{{opt.name}}</Option>
		</Select>
		<RadioGroup v-model="currentValue" v-if="type=='radio'&&label!='yeno'" @on-change="change">
			<Radio label="1" v-for="opt in data.list" :key="opt.value" :label="opt.value">{{opt.name}}</Radio>
		</RadioGroup>
		<CheckboxGroup v-model="currentValue" v-if="type=='checkbox'" @on-change="change">
			<Checkbox v-for="opt in data.list" :key="opt.value" :label="opt.value">{{opt.name}}</Checkbox>
		</CheckboxGroup>
		<RadioGroup v-model="currentValue" v-if="type=='radio'&&label=='yeno'" @on-change="change">
			<Radio label="1">是</Radio>
			<Radio label="0">否</Radio>
		</RadioGroup>
	</div>
</template>
<script>
export default {
	name: 'dict-item',
	props: {
		value:'',
		transfer:{
			type:Boolean,
			default:true
		},
		label:{
			type:String,
			default:'sys_user_type'
		},
		type:{
			type:String,
			default:'select'
		},
	},
	data() {
		return {
			model:'',
			currentValue: this.value?this.value:this.type=='checkbox'?[]:'',
			data:[]
		}
	},
	watch: {
		value: function(n, o) {
			if(n){
				this.currentValue = n;
			}else{
				this.currentValue = '';
			}
		}
	},
	created(){
		if(this.label!='yeno'){
			this.getData();
		}
	},
	methods: {
		getData(){
			this.API_selectData(this.label,(d)=>{
				this.data = d;
			});
		},
		change(item){
			console.log(item);
			this.$emit('input', this.currentValue);
		}
	}
}
</script>
