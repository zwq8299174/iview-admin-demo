<template>
<div>
	<div class="add-button-wrapper">
		<Button type="primary" @click="add">添加区域</Button>
	</div>
	<Table class="table-fold" border :data="tableData" :columns="tableColumns" :loading="loading"></Table>
	<div style="margin: 10px;overflow: hidden" v-if="total>pageSize">
		<div style="float: right;">
			<Page :total="total" :current="currPage" @on-change="changePage"></Page>
		</div>
	</div>
	<Modal v-model="modal" :title="modalTitle" @on-ok="modalEdit" @on-visible-change="modalChange">
		<Form class="modal-form" ref="modalForm" :model="modalForm" :rules="rules" :label-width="120">
			<FormItem prop="id" label="id" class="fn-hide">
				<Input type="text" v-model="modalForm.id" clearable></Input>
			</FormItem>
			<FormItem prop="parent" label="上级区域" class="hastree">
				<tree-dropdown :isAsync="true" v-model="modalForm.parent" :selectParent="true" placeholder="请选择上级区域"></tree-dropdown>
			</FormItem>
			<FormItem prop="name" label="区域名称">
				<Input type="text" v-model="modalForm.name" placeholder="请输入区域名称" clearable></Input>
			</FormItem>
			<FormItem prop="sort" label="排序">
				<Input type="text" v-model="modalForm.sort" placeholder="请输入排序" clearable></Input>
			</FormItem>
			<FormItem prop="code" label="区域编码">
				<Input type="text" v-model="modalForm.code" placeholder="请输入区域编码" clearable></Input>
			</FormItem>
			<FormItem prop="type" label="区域类型">
				<dict-item :transfer="true" v-model="modalForm.type" style="width:200px" label="sys_area_type"></dict-item>
			</FormItem>
			<FormItem prop="remarks" label="备注">
				<Input v-model="modalForm.remarks" type="textarea" :rows="4" placeholder="输入备注..."></Input>
			</FormItem>
		</Form>
		<div slot="footer">
			<Button type="primary" @click="modalEdit" :loading="btnLoading">{{btnTxt}}</Button>
		</div>
	</Modal>
	<Modal v-model="modalDel" width="360">
		<p slot="header" style="color:#f60;text-align:center">
			<Icon type="information-circled"></Icon>
			<span>删除确认</span>
		</p>
		<div style="text-align:center">
			删除后讲无法恢复,是否删除？
		</div>
		<div slot="footer">
			<Button type="error" size="large" long :loading="delLoading" @click="del()">删除</Button>
		</div>
	</Modal>
</div>
</template>
<script>
import treeDropdown from '@/views/my-components/tree-dropdown/tree-dropdown'
import dictItem from '@/views/my-components/custom/dict-item'

import tools from '@/libs/tools.js'

export default {
	components: {
		dictItem,
		treeDropdown
	},
	data() {
		return {
			modalForm: {
				id:'',
				parent: '',
				name: '',
				code: '',
				type: '',
				sort:'10',
				remarks: ''
			},
			tmpForm:{},
			rules: {
				parent: [{
					validator: (rule, value, callback)=>{
						if (!value) {
							return callback(new Error('上级机构不能为空'));
						}else {
							callback();
						}
					},
					required: true,
					trigger: 'change'
				}],
				name: [{
					required: true,
					message: '名称为必填项',
					trigger: 'blur'
				}],
				sort: [{
					required: true,
					message: '排序为必填项',
					trigger: 'blur'
				},{
					type:'number',
					message: '排序必须是数字',
					trigger: 'blur',
					transform(value) {
						return Number(value);
					}
				}]
			},
			modal: false,
			modalDel:false,
			modalTitle: '新增区域',
			btnTxt:'新增',
			currPage: 1,
			infoId:'',
			pageSize: this.$store.state.app.pageSize,
			total: 0,
			loading: false,
			btnLoading:false,
			delLoading:false,
			treeDataAll:[],
			treeLoading:true,
			parentId:undefined,
			tableData: [],
			tableColumns: [
				{
					title: '区域名称',
					key: 'name',
					width: 300,
					render: (h, params) => {
						let level = params.row.path.split(',').length - 1;
						params.level = level;
						let close = (arr, row) => {
							if (!row) return;
							for (let item of row) {
								let index = arr.findIndex(function(value, index, arr) {
									return value.id == item.id;
								}); // 10
								if (item.children) {
									close(arr, item.children);
								};
								if (index == -1) return;
								arr.splice(index,1);
							};
						};
						let getIcon = (l) => {
							let tpl = [];
							for (let i = 0; i < l; i++) {
								let cless = params.row.children && i == (l - 1) ? 'ivu-icon fold-icon ivu-icon-android-arrow-dropright' : 'fold-space';
								tpl.push(h('i', {
									attrs: {
										level: params.level,
										index: params.index,
										children: JSON.stringify(params.row.children)
									},
									'class': {
										'fold-on': params.row.fold == 1,
										'ivu-icon fold-icon ivu-icon-android-arrow-dropright': params.row.children && i == (l - 1),
										'fold-space': !(params.row.children && i == (l - 1))
									},
									on: {
										click: (e) => {
											if (tools.hasClass(e.target, 'fold-space')) return;
											let index = parseInt(e.target.getAttribute('index'));
											let fold = this.tableData[index].fold;
											let children = JSON.parse(e.target.getAttribute('children'));
											this.tableData[index].fold = fold ? 0 : 1;
											let tmp = [].concat(this.tableData);
											if (tools.hasClass(e.target, 'fold-on')) {
												close(tmp, params.row.children);
											} else {
												for (let i = 0; i < children.length; i++) {
													tmp.splice(index + i + 1, 0, children[i]);
												};
											}
											this.tableData = tmp;
										}
									}
								}));
							};
							return tpl;
						};
						return h('div', {
							class: 'fold-wrapper'
						}, [...getIcon(params.level),
							h('a', {
								class: 'link',
								attrs: {
									id: params.row.id
								},
								on: {
									click: (e) => {
										this.modal = true;
										this.getDetail(e.target.id);
									}
								}
							}, params.row.name)
						]);
					}
				},
				{
					title: '区域编码',
					key: 'code',
					width:140
				},
				{
					title: '机构类型',
					key: 'typeName',
					width:140
				},
				{
					title: '备注',
					key: 'remarks'
				},
				{
					title: '操作',
					key: null,
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'info',
									size: 'small'
								},
								attrs: {
									id: params.row.id
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: (e) => {
										e.stopPropagation();
										e.preventDefault();
										this.modal = true;
										this.modalTitle='编辑区域';
										this.btnTxt='保存';
										this.getDetail(e.target.localName=='span'?e.target.parentNode.id:e.target.id);
									}
								}
							}, '修改'),
							h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								attrs: {
									id: params.row.id
								},
								on: {
									click: (e) => {
										e.stopPropagation();
										e.preventDefault();
										this.modalDel = true;
										this.infoId = e.target.localName=='span'?e.target.parentNode.id:e.target.id;
									}
								}
							}, '删除')
						]);
					}
				}
			]
		}
	},
	created(){
		this.getDataList();
	},
	methods: {
		change(e) {
			console.log(e);
		},
		getDataList() {
			this.loading = true;
			this.API_areaList(this.parentId,(d) => {
				console.log(d);
				this.tableData = d;
				setTimeout(() => {
					this.loading = false;
				}, 500);
			});
		},
		getDetail(id) {
			this.API_areaInfo(id, (d) => {
				console.log(d);
				d.sort = d.sort.toString();
				this.tmpForm = Object.assign({}, d);
				this.modalForm = Object.assign({}, this.tmpForm);
			});
		},
		add(e) {
			this.modalTitle = '新增区域';
			this.btnTxt = '新增';
			this.modal = true;
		},
		del(){
			this.delLoading = true;
			console.log(this.infoId);
			this.API_areaDelete(this.infoId,(d)=>{
				setTimeout(()=>{
					this.modalDel = false;
					this.delLoading = false;
				},500);
				this.getDataList();
			});
		},
		modalEdit() {
			console.log(this.modalForm);
			delete this.modalForm['__ob__'];
			delete this.tmpForm['__ob__'];
			this.$refs.modalForm.validate((valid) => {
				if (valid) {
					if(tools.isEqual(this.modalForm, this.tmpForm)){
						this.modal = false;
					}else{
						this.btnLoading = true;
						this.API_areaSave(this.modalForm,(d) => {
							console.log(d);
							setTimeout(()=>{
								this.$Message.success('保存成功!');
								this.btnLoading = false;
								this.modal = false;
								this.getDataList();
							},500);
						});
					}
				} else {
					this.$Message.error('请正确填写表单项!');
					return false;
				}
			});
		},
		modalChange(visible){
			if(!visible){
				this.$refs.modalForm.resetFields();
			}
		}
	}
}
</script>
